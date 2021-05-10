package ifi.ase.ascout.calculatorservice.utils;

import ifi.ase.ascout.calculatorservice.data.model.NeighborhoodModel;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.IntStream;

public class UTILS {
    public static long[] add_rows(long[] r1,long[] r2){
        int len = r1.length;
        for (int i = 0; i < len; i++) {
            r1[i] += r2[i];
        }
        return r1;
    }

    public static long[] min_rows(long[] r1,long[] r2){
        int len = r1.length;
        IntStream.range(0, len).filter(i -> r1[i] > r2[i]).forEach(i -> r1[i] = r2[i]);
        return r1;
    }

    public static void fillInScores(List<NeighborhoodModel> nList,long[] scores){
        int len = nList.size();
        IntStream.range(0, len).forEach(i -> nList.get(i).setScore(scores[i]));
    }

    public static String[] getNeiIDs(List<NeighborhoodModel> nList){
        int len = nList.size();
        String[] ids= new String[len];
        IntStream.range(0, len).forEach(i -> ids[i] = nList.get(i).getName());
        return ids;
    }

    public static List<NeighborhoodModel> getTopNeighborhoods(List<NeighborhoodModel> nList,int topk){
        Collections.sort(nList);
        return nList.subList(0,topk);
    }

    public static List<NeighborhoodModel> dummyNList() {
        List<NeighborhoodModel> dnList = new ArrayList<>();
        dnList.add(new NeighborhoodModel("Halensee"));
        dnList.add(new NeighborhoodModel("Fennpfuhl"));
        dnList.add(new NeighborhoodModel("Biesdorf"));
        dnList.add(new NeighborhoodModel("Alexanderplatz"));
        return dnList;
    }
}
