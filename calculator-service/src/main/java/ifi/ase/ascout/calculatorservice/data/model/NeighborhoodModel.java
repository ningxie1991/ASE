package ifi.ase.ascout.calculatorservice.data.model;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Repository;

import javax.persistence.Entity;

@Repository
public class NeighborhoodModel {
    private String name;
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

    public NeighborhoodModel(String name,String city,Double lat,Double lng){
        this.name = name;
        this.city = city;
        this.lat = lat;
        this.lng = lng;
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
}
