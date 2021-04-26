package ifi.ase.ascout.calculatorservice.data.dto;

import java.math.BigDecimal;
import javax.persistence.Id;
import java.io.Serializable;


public class AttractionDTO implements Serializable{
    private Long id;
    //google places api https://developers.google.com/maps/documentation/places/web-service/place-id
    private String placeId;
    //example={ "lat": 50.064192, "lng": -130.605469 }
    private BigDecimal lat;
    private BigDecimal lng;
    //
    private int groupId;

    //optional
    private Double weight;
    private String startDateTime;
    private int duration;

    public AttractionDTO(){ }
    public AttractionDTO(String placeId,Double lat,Double lng,int groupId){ }

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    public Long getId() {
        return id;
    }
    public String getPlaceId() {
        return placeId;
    }

    public void setPlaceId(String placeId) {
        this.placeId = placeId;
    }

    public BigDecimal getLat() {
        return lat;
    }

    public void setLat(BigDecimal lat) {
        this.lat = lat;
    }

    public BigDecimal getLng() {
        return lng;
    }

    public void setLng(BigDecimal lng) {
        this.lng = lng;
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


}
