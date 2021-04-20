package ifi.ase.ascout.calculatorservice.data.model;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Repository;

import javax.persistence.Entity;

@Repository
public class NeighborhoodModel {
    private String name;
    private String city;
    private String picture_url;
    private String description;

    public NeighborhoodModel(){
        this.name = "test";
        this.city = "test";
        this.picture_url = "test";
        this.description = "test";
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

    public String getPicture_url() {
        return picture_url;
    }

    public void setPicture_url(String picture_url) {
        this.picture_url = picture_url;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
