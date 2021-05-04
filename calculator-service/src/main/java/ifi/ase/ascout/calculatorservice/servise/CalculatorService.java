package ifi.ase.ascout.calculatorservice.servise;

import com.google.maps.DistanceMatrixApi;
import com.google.maps.GeoApiContext;
import com.google.maps.errors.ApiException;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.TravelMode;
import ifi.ase.ascout.calculatorservice.data.dto.BestNeighborhoodsQueryDTO;
import ifi.ase.ascout.calculatorservice.data.model.NeighborhoodModel;
import ifi.ase.ascout.calculatorservice.utils.UTILS;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.IntStream;

@Service
public class CalculatorService implements ICalculatorService{
    private final GeoApiContext context;

    public CalculatorService(@Value("${api.key}") String apiKey) {
        this.context = new GeoApiContext.Builder()
                .apiKey(apiKey)
                .build();
    }

    public long[][] getCostMatrix(DistanceMatrix dMatrix){
        // TODO regulation and balance
        int rlen = dMatrix.rows.length;
        int clen = dMatrix.rows[0].elements.length;
        long[][] cMatrix = new long[rlen][clen];
        for(int i=0;i<rlen;++i){
            for(int j=0;j<clen;++j){
                long distance = dMatrix.rows[0].elements[j].distance.inMeters;
                long duration = dMatrix.rows[0].elements[j].duration.inSeconds;
                cMatrix[i][j] = distance;
            }
        }
        return cMatrix;
    }

    public long[] getNeighborhoodCosts(long[][] costMatrix, int[] groupIds){
        //rlen = number of neighborhoods, as destinations;
        int rlen = costMatrix.length;
        //clen = number of attractions, as origins;
        int clen = costMatrix[0].length;
        long[] neiToAllCosts = new long[clen];
        IntStream.range(0, clen).forEach(i -> neiToAllCosts[i] = 0);
        long[] neiToGroupCost = costMatrix[0];
        for(int i=1;i<rlen;++i){
            if(groupIds[i]==groupIds[i-1]){//Same group, take minimum
                //neiToGroupCost = min{costMatrix[i],neiToGroupCost}
                for(int j=0;j<clen;++j){
                    UTILS.min_rows(neiToGroupCost,costMatrix[i]);
                }
            }else{//Change group, adds to neiToAllCosts, optionally with weight
                //neiToAllCosts += neiToGroupCost
                UTILS.add_rows(neiToAllCosts,neiToGroupCost);
                neiToGroupCost = costMatrix[i];
            }
        }
        UTILS.add_rows(neiToAllCosts,neiToGroupCost);
        return neiToAllCosts;
    }

    @Override
    public List<NeighborhoodModel> bestNeighborhoods(BestNeighborhoodsQueryDTO query) {
        String travelModeStr = query.getTravelMode();
        //TODO what if name is null : java.lang.NullPointerException
        TravelMode travelMode = TravelMode.valueOf(travelModeStr);
        String[] origin_attractions = query.getOrigins();//row names,origin/attraction names

        for(String s :origin_attractions) System.err.println(s.toString());

        //TODO Get Neighborhoods List from real database
        List<NeighborhoodModel> neiList = UTILS.dummyNList();
        String[] destination_neighborhoods = UTILS.getNeiIDs(neiList);// col names,destination/neighborhood names

        DistanceMatrix matrix = null;
        try{
            matrix = DistanceMatrixApi.getDistanceMatrix(
                            this.context,
                            origin_attractions,
                            destination_neighborhoods)
                            .mode(travelMode).await();
            //FIXME examine matrix, for example invalid attractions
        }catch(InterruptedException | ApiException | IOException e){
            
        }
        System.err.println(matrix);
        long[][] costMatrix = getCostMatrix(matrix);
        int[] groupIds = query.getGroupIds();
        long[] neighborhoodCosts = getNeighborhoodCosts(costMatrix,groupIds);
        UTILS.fillInScores(neiList,neighborhoodCosts);
        return UTILS.getTopNeighborhoods(neiList,3);
    }
}
