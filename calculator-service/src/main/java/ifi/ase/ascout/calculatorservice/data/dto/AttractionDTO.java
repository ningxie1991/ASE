package ifi.ase.ascout.calculatorservice.data.dto;

import java.io.Serializable;

/**
 * AttractionDTO is a data object representing an attraction
 */
public class AttractionDTO implements Serializable{

    /**
     * The place id of the attraction
     */
    private String placeId;

    /**
     * The name of the attraction
     */
    private String name;
  
    /**
     * The group id of the attraction
     */
    private int groupId;

    public AttractionDTO(){ }
    public AttractionDTO(String placeId,int groupId){
        this.placeId=placeId;
        this.groupId=groupId;
    }
    public AttractionDTO(String name,String placeId,int groupId){
        this.name=name;
        this.placeId=placeId;
        this.groupId=groupId;
    }

    /**
     * Gets the place id
     * @return String
     */
    public String getPlaceId() {
        return placeId;
    }

    /**
     * Sets the place id
     * @param placeId the place id of the attraction
     */
    public void setPlaceId(String placeId) {
        this.placeId = placeId;
    }

    /**
     * Gets the group id
     * @return int
     */
    public int getGroupId() {
        return groupId;
    }

    /**
     * Sets the group id
     * @param groupId the group id of the attraction
     */
    public void setGroupId(int groupId) {
        this.groupId = groupId;
    }

    /**
     * Gets the name
     * @return String
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name
     * @param name the name of the attraction
     */
    public void setName(String name) {
        this.name = name;
    }
        

    @Override
    public String toString() {
        return "AttractionDTO{" +
                "name='" + name  + '\'' +
                ", placeId='" + placeId + '\'' +
                ", groupId=" + groupId +
                '}';
    }

}
