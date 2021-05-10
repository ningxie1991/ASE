package ifi.ase.ascout.calculatorservice.data.model;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Repository;

@Repository
@Document(collection = "neighbourhoods")
public class NeighborhoodModel implements Comparable<NeighborhoodModel>{
    private String name;
    private String place_id;
    private double score;

    private String city;
    private String group;
    private Double lat;
    private Double lng;
    private String picture_url;
    private String description;

    public NeighborhoodModel(){
        this.name = "test";
        this.place_id = null;
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
    public Double getScore() { return score; }
    public void setScore(double score) { this.score = score; }
    public String getPlace_id() {
        return place_id;
    }
    public void setPlace_id(String place_id) {
        this.place_id = place_id;
    }

    @Override
    public int compareTo(NeighborhoodModel o) {
        return this.getScore().compareTo(o.getScore());
    }
}
