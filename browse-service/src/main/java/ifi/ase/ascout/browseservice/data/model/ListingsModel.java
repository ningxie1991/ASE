package ifi.ase.ascout.browseservice.data.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Repository;

@Repository
@Document(collection = "airbnb_listings")
public class ListingsModel {

    private String name;
    private String host_id;
    private String host_name;
    private String host_is_superhost;
    private String neighbourhood_group;
    private String neighbourhood;
    private String latitude;
    private String longitude;
    private String property_type;
    private String room_type;
    private String accommodates;
    private String bathrooms;
    private String bedrooms;
    private String bed_type;
    private String beds;
    private String picture_url;
    private String price;
    private String security_deposit;
    private String cleaning_fee;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHost_id() {
        return host_id;
    }

    public void setHost_id(String host_id) {
        this.host_id = host_id;
    }

    public String getHost_name() {
        return host_name;
    }

    public void setHost_name(String host_name) {
        this.host_name = host_name;
    }

    public String getHost_is_superhost() {
        return host_is_superhost;
    }

    public void setHost_is_superhost(String host_is_superhost) {
        this.host_is_superhost = host_is_superhost;
    }

    public String getNeighbourhood_group() {
        return neighbourhood_group;
    }

    public void setNeighbourhood_group(String neighbourhood_group) {
        this.neighbourhood_group = neighbourhood_group;
    }

    public String getNeighbourhood() {
        return neighbourhood;
    }

    public void setNeighbourhood(String neighbourhood) {
        this.neighbourhood = neighbourhood;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getRoom_type() {
        return room_type;
    }

    public void setRoom_type(String room_type) {
        this.room_type = room_type;
    }

    public String getAccommodates() {
        return accommodates;
    }

    public void setAccommodates(String accommodates) {
        this.accommodates = accommodates;
    }

    public String getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(String bathrooms) {
        this.bathrooms = bathrooms;
    }

    public String getBedrooms() {
        return bedrooms;
    }

    public void setBedrooms(String bedrooms) {
        this.bedrooms = bedrooms;
    }

    public String getBed_type() {
        return bed_type;
    }

    public void setBed_type(String bed_type) {
        this.bed_type = bed_type;
    }

    public String getBeds() {
        return beds;
    }

    public void setBeds(String beds) {
        this.beds = beds;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getPicture_url() {
        return picture_url;
    }

    public void setPicture_url(String picture_url) {
        this.picture_url = picture_url;
    }

    public String getProperty_type() {
        return property_type;
    }

    public void setProperty_type(String property_type) {
        this.property_type = property_type;
    }

    public String getSecurity_deposit() {
        return security_deposit;
    }

    public void setSecurity_deposit(String security_deposit) {
        this.security_deposit = security_deposit;
    }

    public String getCleaning_fee() {
        return cleaning_fee;
    }

    public void setCleaning_fee(String cleaning_fee) {
        this.cleaning_fee = cleaning_fee;
    }
}
