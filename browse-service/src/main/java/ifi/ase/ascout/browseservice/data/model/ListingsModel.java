package ifi.ase.ascout.browseservice.data.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Repository;

@Repository
@Document(collection = "airbnb_listings")
public class ListingsModel {

    @Field(name="name")
    private String name;

    @Field(name="host_id")
    private String hostId;

    @Field(name="host_name")
    private String hostName;

    @Field(name="host_is_superhost")
    private String hostIsSuperhost;

    @Field(name="neighbourhood_group")
    private String neighbourhoodGroup;

    @Field(name="neighbourhood")
    private String neighbourhood;

    @Field(name="latitude")
    private String latitude;

    @Field(name="longitude")
    private String longitude;

    @Field(name="property_type")
    private String propertyType;

    @Field(name="room_type")
    private String roomType;

    @Field(name="accommodates")
    private String accommodates;

    @Field(name="bathrooms")
    private String bathrooms;

    @Field(name="bedrooms")
    private String bedrooms;

    @Field(name="bed_type")
    private String bedType;

    @Field(name="beds")
    private String beds;

    @Field(name="picture_url")
    private String pictureUrl;

    @Field(name="price")
    private String price;

    @Field(name="security_deposit")
    private String securityDeposit;

    @Field(name="cleaning_fee")
    private String cleaningFee;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHostId() {
        return hostId;
    }

    public void setHostId(String hostId) {
        this.hostId = hostId;
    }

    public String getHostName() {
        return hostName;
    }

    public void setHostName(String hostName) {
        this.hostName = hostName;
    }

    public String getHostIsSuperhost() {
        return hostIsSuperhost;
    }

    public void setHostIsSuperhost(String hostIsSuperhost) {
        this.hostIsSuperhost = hostIsSuperhost;
    }

    public String getNeighbourhoodGroup() {
        return neighbourhoodGroup;
    }

    public void setNeighbourhoodGroup(String neighbourhoodGroup) {
        this.neighbourhoodGroup = neighbourhoodGroup;
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

    public String getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
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

    public String getBedType() {
        return bedType;
    }

    public void setBedType(String bedType) {
        this.bedType = bedType;
    }

    public String getBeds() {
        return beds;
    }

    public void setBeds(String beds) {
        this.beds = beds;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getSecurityDeposit() {
        return securityDeposit;
    }

    public void setSecurityDeposit(String securityDeposit) {
        this.securityDeposit = securityDeposit;
    }

    public String getCleaningFee() {
        return cleaningFee;
    }

    public void setCleaningFee(String cleaningFee) {
        this.cleaningFee = cleaningFee;
    }
}
