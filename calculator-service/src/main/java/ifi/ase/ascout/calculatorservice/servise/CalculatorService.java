package ifi.ase.ascout.calculatorservice.servise;

import com.google.maps.DistanceMatrixApi;
import com.google.maps.GeoApiContext;
import com.google.maps.errors.ApiException;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.TravelMode;
import ifi.ase.ascout.calculatorservice.data.dto.BestNeighborhoodsQueryDTO;
import ifi.ase.ascout.calculatorservice.data.model.CostMatrix;
import ifi.ase.ascout.calculatorservice.data.model.NeighborhoodModel;
import ifi.ase.ascout.calculatorservice.data.repository.NeighborhoodsRepository;
import ifi.ase.ascout.calculatorservice.utils.UTILS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;

@Service
public class CalculatorService implements ICalculatorService{
    private final Logger logger;
    private final GeoApiContext context;
    @Autowired
    private NeighborhoodsRepository repository;
    @Value("${api.max_num}")
    private int apiMaxNum;
    @Value("${api.max_len}")
    private int apiMaxLen;

    public CalculatorService(@Value("${api.key}") String apiKey) {
        this.context = new GeoApiContext.Builder()
                .apiKey(apiKey)
                .build();
        this.logger = LoggerFactory.getLogger(this.getClass());
    }
    public List<NeighborhoodModel> getAllNeighborhoods(){
        return repository.findAll();
    }

    @Override
    public List<NeighborhoodModel> bestNeighborhoods(BestNeighborhoodsQueryDTO query) {
        //TODO what if name is null : java.lang.NullPointerException
        TravelMode travelMode = TravelMode.valueOf(query.getTravelMode());
        String[] origin_attractions = query.getOrigins();//row names,origin/attraction names

        for(String s :origin_attractions){
            logger.debug(s);
        }
        List<NeighborhoodModel> neiList = repository.findAll();//=UTILS.dummyNList();
        if(neiList.size()==0){
            logger.error("Empty response from DB!");
            return null;
        }
        logger.debug("get neighborhoods from mongodb repository.findAll():"+neiList.toString());
        String[] destination_neighborhoods = UTILS.getNeiIDs(neiList);// col names,destination/neighborhood names
        int olen = origin_attractions.length;
        if(olen>apiMaxLen){
            logger.error("Too Many Attractions!(>25)");
            return null;
        }
        int dlen = destination_neighborhoods.length;
        CostMatrix cm = new CostMatrix(olen,dlen);
        int dPageSize = apiMaxNum/olen;
        if(dPageSize>apiMaxLen)dPageSize=apiMaxLen;
        int dPageNum = dlen/dPageSize;
        if(dlen%dPageSize!=0)dPageNum+=1;
        DistanceMatrix matrix = null;
        try{
            int startIndex = 0;
            for(int i=0;i<dPageNum;++i){
                String[] partDN = UTILS.sliceStringArray(destination_neighborhoods,startIndex,startIndex+=dPageSize);
                logger.debug("destination num:"+dlen+",origin num:"+olen+",partDN num:"+partDN.length);
                matrix = DistanceMatrixApi.getDistanceMatrix(
                        this.context,
                        origin_attractions,
                        partDN)
                        .mode(travelMode).await();
                //TODO examine matrix, for example invalid attractions
                if(matrix==null){
                    logger.error("Null Distance Matrix Received!");
                    return null;
                }
                cm.fillInDistanceMatrix(matrix);
            }
        }catch(InterruptedException | ApiException | IOException e){
            Thread.currentThread().interrupt();
            logger.error("DistanceMatrixApi Error", e);
        }
        logger.debug("cost matrix result:"+cm.toString());
        double[] neighborhoodCosts = cm.calculateColumeCostByGroup(query.getGroupIds());
        logger.info("all neighborhoods' scores:", Arrays.toString(neighborhoodCosts));
        return UTILS.getTopNeighborhoods(neiList,neighborhoodCosts,query.getTopK());
    }
}
