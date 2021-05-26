package ifi.ase.ascout.calculatorservice.data.dto;

import java.math.BigDecimal;
import javax.persistence.Id;
import java.io.Serializable;


public class AttractionDTO implements Serializable{
    //google places api https://developers.google.com/maps/documentation/places/web-service/place-id
    private String placeId;
    private String name;
    private int groupId;

    //optional
    private Double weight;
    private String startDateTime;
    private int duration;

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

    public String getPlaceId() {
        return placeId;
    }

    public void setPlaceId(String placeId) {
        this.placeId = placeId;
    }

    public int getGroupId() {
        return groupId;
    }

    public void setGroupId(int groupId) {
        this.groupId = groupId;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public String getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(String startDateTime) {
        this.startDateTime = startDateTime;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    @Override
    public String toString() {
        return "AttractionDTO{" +
                "name='" + name  + '\'' +
                ", placeId='" + placeId + '\'' +
                ", groupId=" + groupId +
                '}';
    }
}
