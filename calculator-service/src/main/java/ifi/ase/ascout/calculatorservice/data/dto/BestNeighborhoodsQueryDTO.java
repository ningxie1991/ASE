package ifi.ase.ascout.calculatorservice.data.dto;
import java.io.Serializable;
import java.util.List;

/**
 * BestNeighborhoodsQueryDTO is the data object representing a query from the client
 */
public class BestNeighborhoodsQueryDTO implements Serializable {
    /**
     * The attraction list
     */
    private List<AttractionDTO> attractionList;

    /**
     * The travel mode
     */
    private String travelMode;

    /**
     * The top K number of neighbourhoods
     */
    private int topK;

    /**
     * Constructor of BestNeighborhoodsQueryDTO
     * @param attractionList the attraction list
     * @param travelMode the travel mode, i.e. "DRIVING", "WALKING", "TRANSIT"
     * @param topK the top k number of neighbourhoods
     */
    public BestNeighborhoodsQueryDTO(List<AttractionDTO> attractionList,
                                     String travelMode,
                                     int topK){
        this.travelMode = travelMode;
        this.attractionList = attractionList;
        this.topK = topK;
    }

    /**
     * Gets the attraction list
     * @return a list of AttractionDTO
     */
    public List<AttractionDTO> getAttractionList() {
        return attractionList;
    }

    /**
     * Sets the attraction list
     * @param attractionList the attraction list
     */
    public void setAttractionList(List<AttractionDTO> attractionList) {
        this.attractionList = attractionList;
    }

    /**
     * Gets the travel mode
     * @return String
     */
    public String getTravelMode() {
        return travelMode;
    }

    /**
     * Sets the travel mode
     * @param travelMode the travel mode, i.e. "DRIVING", "WALKING", "TRANSIT"
     */
    public void setTravelMode(String travelMode) {
        this.travelMode = travelMode;
    }

    /**
     * Gets the origins
     * @return a String array
     */
    public String[] getOrigins() {
        int len = attractionList.size();
        String[] origins = new String[len];
        for ( int i =0;i<len;++i){
            origins[i]= "place_id:" + attractionList.get(i).getPlaceId();
        }
        return origins;
    }

    /**
     * Gets the group ids
     * @return an int array
     */
    public int[] getGroupIds() {
        int len = attractionList.size();
        int[] groupIds = new int[len];
        if(attractionList.get(0).getGroupId()==0){
            for ( int i =0;i<len;++i){
                groupIds[i]= i;
            }
        }else{
            for ( int i =0;i<len;++i){
                groupIds[i]= attractionList.get(i).getGroupId();
            }
        }
        return groupIds;
    }

    /**
     * Gets the topK
     * @return int
     */
    public int getTopK() {
        return topK;
    }

    /**
     * Sets the topK
     * @param topK the top K number of neighbourhoods
     */
    public void setTopK(int topK) {
        this.topK = topK;
    }
}
