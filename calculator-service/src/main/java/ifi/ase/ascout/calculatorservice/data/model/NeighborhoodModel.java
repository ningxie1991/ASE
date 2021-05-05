package ifi.ase.ascout.calculatorservice.data.model;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Repository;

@Repository
@Document(collection = "airbnb_neighborhoods")
public class NeighborhoodModel implements Comparable<NeighborhoodModel>{
    private String name;
    private String placeId;
    private long score;

    private String city;
    private String group;
    private Double lat;
    private Double lng;
    private String picture_url;
    private String description;

    public NeighborhoodModel(){
        this.name = "test";
        this.city = "test";
        this.picture_url = "optional";
        this.description = "optional";
    }

    public NeighborhoodModel(String name){
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }
    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public String getPicture_url() {
        return picture_url;
    }

    public void setPicture_url(String picture_url) {
        this.picture_url = picture_url;
    }


    public String getDecription() {
        return description;
    }

    public void setDecription(String decription) {
        this.description = decription;
    }
    public Long getScore() { return score; }
    public void setScore(long score) { this.score = score; }
    public String getPlaceId() { return placeId; }
    public void setPlaceId(String placeId) { this.placeId = placeId; }

    @Override
    public int compareTo(NeighborhoodModel o) {
        return this.getScore().compareTo(o.getScore());
    }
}
