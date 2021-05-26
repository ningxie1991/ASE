package ifi.ase.ascout.calculatorservice.utils;

import ifi.ase.ascout.calculatorservice.data.model.NeighborhoodModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.IntStream;

/**
 * Utilities class
 */
public class UTILS {
    private static final Logger logger= LoggerFactory.getLogger(UTILS.class);
    private static final int TOP_K = 3;

    /**
     * Gets the TOP_k
     * @return the top k number
     */
    public static int getTopK(){
        return TOP_K;
    }

    /**
     * Add rows
     * @param r1 the row 1
     * @param r2 the row 2
     * @return a double array consisting row 1 and row 2
     */
    public static double[] add_rows(double[] r1,double[] r2){
        int len = r1.length;
        for (int i = 0; i < len; i++) {
            r1[i] += r2[i];
        }
        return r1;
    }

    /**
     * Gets the minimum rows
     * @param r1 the row 1
     * @param r2 the row 2
     * @return a double array
     */
    public static double[] min_rows(double[] r1,double[] r2){
        int len = r1.length;
        IntStream.range(0, len).filter(i -> r1[i] > r2[i]).forEach(i -> r1[i] = r2[i]);
        return r1;
    }

    /**
     * Fill in scores
     * @param nList the neighbourhood list
     * @param scores the scores to fill in
     */
    public static void fillInScores(List<NeighborhoodModel> nList,double[] scores){
        int len = nList.size();
        IntStream.range(0, len).forEach(i -> nList.get(i).setScore(scores[i]));
    }

    /**
     * Get neighbourhood ids
     * @param nList the neighbourhood list
     * @return a String array
     */
    public static String[] getNeiIDs(List<NeighborhoodModel> nList){
        int len = nList.size();
        String[] ids= new String[len];
        for (int i = 0; i < len; i++) {
            String name = nList.get(i).getName();
            String placeId = nList.get(i).getPlaceId();
            if(placeId!=null){
                ids[i] = placeId;
            }else{
                ids[i] = name;
            }
        }
        return ids;
    }

    /**
     * Gets the top neighbourhoods
     * @param nList the neighbourhood list
     * @param neighborhoodCosts the neighbourhood costs
     * @param topk the top k number
     * @return a list of NeighborhoodModel
     */
    public static List<NeighborhoodModel> getTopNeighborhoods(List<NeighborhoodModel> nList,double[] neighborhoodCosts,int topk){
        UTILS.fillInScores(nList,neighborhoodCosts);
        Collections.sort(nList);
        try{
            return nList.subList(0,topk);
        }catch (Exception e){
            return nList;
        }
    }

    /**
     * Returns a dummy neighbourhood list for testing
     * @return a list of NeighborhoodModel
     */
    public static List<NeighborhoodModel> dummyNList() {
        NeighborhoodModel n1 = new NeighborhoodModel();
        n1.setName("Halensee");
        n1.setGroup("Charlottenburg-Wilm.");
        n1.setPlaceId("place_id:ChIJFShAgshQqEcRDrn0lWepaKA");
        n1.setCoordinates("[[[[12.33,13.55]]]]");

        NeighborhoodModel n2 = new NeighborhoodModel();
        n2.setName("Alexanderplatz");
        n2.setGroup("Mitte");
        n2.setPlaceId("place_id:ChIJbygR2x5OqEcRbhbkZsMB_DA");
        n2.setCoordinates("[[[[13.44,5.55]]]]");

        NeighborhoodModel n3 = new NeighborhoodModel();
        n3.setName("Kantstraße");
        n3.setGroup("Charlottenburg-Wilm.");
        n3.setPlaceId("place_id:ChIJFY-53-NQqEcRyLXE7MeZD24");
        n3.setCoordinates("[[[[11.33,3.55]]]]");

        // the size of the list must be the same as TOP_K
        List<NeighborhoodModel> dnList = Arrays.asList(n1, n2, n3);
        return dnList;
    }

    /**
     * Slice string array
     * @param array the String array
     * @param startIndex the start index
     * @param endIndex the end index
     * @return a String array
     */
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
