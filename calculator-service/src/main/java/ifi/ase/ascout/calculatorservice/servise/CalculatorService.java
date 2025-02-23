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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;

/**
 * CalculatorService is the service that provides the algorithm to calculate the best neighbourhoods
 */
@Service
public class CalculatorService implements ICalculatorService{
    // logger
    private final Logger logger;
    // context
    private final GeoApiContext context;
    // repository
    @Autowired
    private NeighborhoodsRepository repository;
    // apiMaxNum
    @Value("${api.max_num}")
    private int apiMaxNum;
    // apiMaxLen
    @Value("${api.max_len}")
    private int apiMaxLen;

    /**
     * Constructor of CalculatorService
     * @param apiKey the api key
     */
    public CalculatorService(@Value("${api.key}") String apiKey) {
        this.context = new GeoApiContext.Builder()
                .apiKey(apiKey)
                .build();
        this.logger = LoggerFactory.getLogger(this.getClass());
    }

    /**
     * Calculates the best neighbourhoods
     * @param query a BestNeighborhoodsQueryDTO object
     * @return a list of NeighborhoodModel
     */
    @Override
    public List<NeighborhoodModel> bestNeighborhoods(BestNeighborhoodsQueryDTO query) {
        //TODO what if name is null : java.lang.NullPointerException
        TravelMode travelMode = TravelMode.valueOf(query.getTravelMode());
        String[] originAttractions = query.getOrigins();//row names,origin/attraction names
        
        List<NeighborhoodModel> neiList = repository.findAll();//=UTILS.dummyNList();
        if(neiList.isEmpty()){
            logger.error("Empty response from DB!");
            return neiList;
        }
        logger.debug("get neighborhoods from mongodb repository.findAll():"+neiList.toString());
        String[] destinationNeighborhoods = UTILS.getNeiIDs(neiList);// col names,destination/neighborhood names
        int olen = originAttractions.length;
        if(olen>apiMaxLen){
            logger.error("Too Many Attractions!(>25)");
            return new ArrayList<>();
        }
        int dlen = destinationNeighborhoods.length;
        CostMatrix cm = new CostMatrix(olen,dlen);
        int dPageSize = apiMaxNum/olen;
        if(dPageSize>apiMaxLen)dPageSize=apiMaxLen;
        int dPageNum = dlen/dPageSize;
        if(dlen%dPageSize!=0)dPageNum+=1;
        DistanceMatrix matrix = null;
        try{
            int startIndex = 0;
            for(int i=0;i<dPageNum;++i){
                String[] partDN = UTILS.sliceStringArray(destinationNeighborhoods,startIndex,startIndex+=dPageSize);
                logger.debug("destination num:"+dlen+",origin num:"+olen+",partDN num:"+partDN.length);
                matrix = DistanceMatrixApi.getDistanceMatrix(
                        this.context,
                        originAttractions,
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
        double[] neighborhoodCosts = cm.calculateColumnCostByGroup(query.getGroupIds());
        logger.info("all neighborhoods' scores:", Arrays.toString(neighborhoodCosts));
        return UTILS.getTopNeighborhoods(neiList,neighborhoodCosts,query.getTopK());
    }
}
