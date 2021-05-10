package ifi.ase.ascout.calculatorservice.data.dto;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.List;
import java.math.BigDecimal;

@Entity
public class BestNeighborhoodsQueryDTO implements Serializable {
    private List<AttractionDTO> attractionList;
    private String travelMode;//for DistanceMatrix API
    private int topK;


    public BestNeighborhoodsQueryDTO(){ }
    public BestNeighborhoodsQueryDTO(List<AttractionDTO> attractionList,String trvalMode){
        this.travelMode=trvalMode;
        this.attractionList=attractionList;
        this.topK=5;
    }

    public List<AttractionDTO> getAttractionList() {
        return attractionList;
    }
    public void setAttractionList(List<AttractionDTO> attractionList) {
        this.attractionList = attractionList;
    }
    public String getTravelMode() { return travelMode; }
    public void setTravelMode(String travelMode) { this.travelMode = travelMode; }

    public String[] getOrigins() {
        int len = attractionList.size();
        String[] origins = new String[len];
        for ( int i =0;i<len;++i){
            origins[i]= attractionList.get(i).getPlaceId();
        }
        return origins;
    }

    public int[] getGroupIds() {
        int len = attractionList.size();
        int[] groupIds = new int[len];
        for ( int i =0;i<len;++i){
            groupIds[i]= attractionList.get(i).getGroupId();
        }
        return groupIds;
    }

    public int getTopK() {
        return topK;
    }

    public void setTopK(int topK) {
        this.topK = topK;
    }
}
