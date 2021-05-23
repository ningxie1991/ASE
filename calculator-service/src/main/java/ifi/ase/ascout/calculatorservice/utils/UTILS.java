package ifi.ase.ascout.calculatorservice.utils;

import ifi.ase.ascout.calculatorservice.data.model.NeighborhoodModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.IntStream;

public class UTILS {
    private static final Logger logger= LoggerFactory.getLogger(UTILS.class);
    public static double[] add_rows(double[] r1,double[] r2){
        int len = r1.length;
        for (int i = 0; i < len; i++) {
            r1[i] += r2[i];
        }
        return r1;
    }

    public static double[] min_rows(double[] r1,double[] r2){
        int len = r1.length;
        IntStream.range(0, len).filter(i -> r1[i] > r2[i]).forEach(i -> r1[i] = r2[i]);
        return r1;
    }

    public static void fillInScores(List<NeighborhoodModel> nList,double[] scores){
        int len = nList.size();
        IntStream.range(0, len).forEach(i -> nList.get(i).setScore(scores[i]));
    }

    public static String[] getNeiIDs(List<NeighborhoodModel> nList){
        int len = nList.size();
        String[] ids= new String[len];
        for (int i = 0; i < len; i++) {
            String name = nList.get(i).getName();
            String placeId = nList.get(i).getPlace_id();
            if(placeId!=null){
                ids[i] = placeId;
            }else{
                ids[i] = name;
            }
        }
        return ids; 
    }

    public static List<NeighborhoodModel> getTopNeighborhoods(List<NeighborhoodModel> nList,double[] neighborhoodCosts,int topk){
        UTILS.fillInScores(nList,neighborhoodCosts);
        Collections.sort(nList);
        return nList.subList(0,topk);
    }

    public static List<NeighborhoodModel> dummyNList() {
        List<NeighborhoodModel> dnList = new ArrayList<>();
        dnList.add(new NeighborhoodModel("Halensee"));
        dnList.add(new NeighborhoodModel("Fennpfuhl"));
        dnList.add(new NeighborhoodModel("Biesdorf"));
        dnList.add(new NeighborhoodModel("Alexanderplatz"));
        dnList.add(new NeighborhoodModel("Kantstraße"));
        return dnList;
    }

    public static String[] sliceStringArray(String array[], int startIndex, int endIndex ){
        int limit = array.length;
        if(limit<endIndex)endIndex=limit;
        int sliceSize = endIndex-startIndex;
        logger.info("array size:"+array.length+",slice size:"+sliceSize+",startIndex:"+startIndex+",endIndex:"+endIndex);
        String[] part = new String[sliceSize];
        //Copying the contents of the array
        for(int i=0; i<sliceSize; i++){
            part[i] = array[startIndex+i];
        }
        return part;
    }
}
