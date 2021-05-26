package ifi.ase.ascout.browseservice.data.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Repository;

/**
 * ListingsModel is a DTO object for a listing stored in the MongoDB airbnb_listings collection
 */
@Repository
@Document(collection = "airbnb_listings")
public class ListingsModel {

    @Id
    @Field(name="_id")
    private String id;

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

    /**
     * Gets the id
     * @return String
     */
    public String getId() {
        return id;
    }

    /**
     * Sets the id
     * @param id the id of the listing
     */
    public void setId(String id) {
        this.id = id;
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
     * @param name the name of the listing
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets the host id
     * @return String
     */
    public String getHostId() {
        return hostId;
    }

    /**
     * Sets the host id
     * @param hostId the host id of the listing
     */
    public void setHostId(String hostId) {
        this.hostId = hostId;
    }

    /**
     * Gets the host name
     * @return String
     */
    public String getHostName() {
        return hostName;
    }

    /**
     * Sets the host name
     * @param hostName the host name of the listing
     */
    public void setHostName(String hostName) {
        this.hostName = hostName;
    }

    /**
     * Gets whether host is superhost
     * @return String
     */
    public String getHostIsSuperhost() {
        return hostIsSuperhost;
    }

    /**
     * Sets whether host is superhost
     * @param hostIsSuperhost whether host is superhost, value is "t" or "f"
     */
    public void setHostIsSuperhost(String hostIsSuperhost) {
        this.hostIsSuperhost = hostIsSuperhost;
    }

    /**
     * Gets the neighbourhood group
     * @return String
     */
    public String getNeighbourhoodGroup() {
        return neighbourhoodGroup;
    }

    /**
     * Sets the neighbourhood group
     * @param neighbourhoodGroup the neighbourhood group of the listing
     */
    public void setNeighbourhoodGroup(String neighbourhoodGroup) {
        this.neighbourhoodGroup = neighbourhoodGroup;
    }

    /**
     * Gets the neighbourhood
     * @return String
     */
    public String getNeighbourhood() {
        return neighbourhood;
    }

    /**
     * Sets the neighbourhood
     * @param neighbourhood the neighbourhood of the listing
     */
    public void setNeighbourhood(String neighbourhood) {
        this.neighbourhood = neighbourhood;
    }

    /**
     * Gets the latitude
     * @return String
     */
    public String getLatitude() {
        return latitude;
    }

    /**
     * Sets the latitude
     * @param latitude the latitude of the listing, value is float
     */
    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    /**
     * Gets the longitude
     * @return String
     */
    public String getLongitude() {
        return longitude;
    }

    /**
     * Sets the longitude
     * @param longitude the longitude of the listing, value is float
     */
    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    /**
     * Gets the property type
     * @return String
     */
    public String getPropertyType() {
        return propertyType;
    }

    /**
     * Sets the property type
     * @param propertyType the property type of the listing
     */
    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    /**
     * Gets the room type
     * @return String
     */
    public String getRoomType() {
        return roomType;
    }

    /**
     * Sets the room type
     * @param roomType the room type of the listing
     */
    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    /**
     * Gets the number that the listing accommodates
     * @return String
     */
    public String getAccommodates() {
        return accommodates;
    }

    /**
     * Sets the number that the listing accommodates
     * @param accommodates the number that the listing accommodates, value is int
     */
    public void setAccommodates(String accommodates) {
        this.accommodates = accommodates;
    }

    /**
     * Gets the number of bathrooms
     * @return String
     */
    public String getBathrooms() {
        return bathrooms;
    }

    /**
     * Sets the number of bathrooms
     * @param bathrooms the number of bathrooms of the listing, value is int
     */
    public void setBathrooms(String bathrooms) {
        this.bathrooms = bathrooms;
    }

    /**
     * Gets the number of bedrooms
     * @return String
     */
    public String getBedrooms() {
        return bedrooms;
    }

    /**
     * Sets the number of bedrooms
     * @param bedrooms the number of bedrooms of the listing, value is int
     */
    public void setBedrooms(String bedrooms) {
        this.bedrooms = bedrooms;
    }

    /**
     * Gets the bed type
     * @return String
     */
    public String getBedType() {
        return bedType;
    }

    /**
     * Sets the bed type
     * @param bedType the bed type of the listing
     */
    public void setBedType(String bedType) {
        this.bedType = bedType;
    }

    /**
     * Gets the number of beds
     * @return String
     */
    public String getBeds() {
        return beds;
    }

    /**
     * Sets the number of beds
     * @param beds the number of beds of the listing, value is int
     */
    public void setBeds(String beds) {
        this.beds = beds;
    }

    /**
     * Gets the picture url
     * @return String
     */
    public String getPictureUrl() {
        return pictureUrl;
    }

    /**
     * Sets the picture url
     * @param pictureUrl the picture url of the listing
     */
    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    /**
     * Gets the price
     * @return String
     */
    public String getPrice() {
        return price;
    }

    /**
     * Sets the price
     * @param price the price of the listing, value is int
     */
    public void setPrice(String price) {
        this.price = price;
    }

    /**
     * Gets the security deposit
     * @return String
     */
    public String getSecurityDeposit() {
        return securityDeposit;
    }

    /**
     * Sets the security deposit
     * @param securityDeposit the security deposit of the listing, value is int
     */
    public void setSecurityDeposit(String securityDeposit) {
        this.securityDeposit = securityDeposit;
    }

    /**
     * Gets the cleaning fee
     * @return String
     */
    public String getCleaningFee() {
        return cleaningFee;
    }

    /**
     * Sets the cleaning fee
     * @param cleaningFee the cleaning fee of the listing, value is int
     */
    public void setCleaningFee(String cleaningFee) {
        this.cleaningFee = cleaningFee;
    }
}
