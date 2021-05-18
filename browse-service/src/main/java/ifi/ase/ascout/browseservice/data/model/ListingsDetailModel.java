package ifi.ase.ascout.browseservice.data.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Repository;

@Repository
@Document(collection = "airbnb_listings_detail")
public class ListingsDetailModel {

    @Field(name="listing_url")
    private String listingUrl;

    @Field(name="name")
    private String name;

    @Field(name="summary")
    private String summary;

    @Field(name="space")
    private String space;

    @Field(name="description")
    private String description;

    @Field(name="neighborhood_overview")
    private String neighborhoodOverview;

    @Field(name="notes")
    private String notes;

    @Field(name="transit")
    private String transit;

    @Field(name="access")
    private String access;

    @Field(name="interaction")
    private String interaction;

    @Field(name="houseRules")
    private String houseRules;

    @Field(name="amenities")
    private String amenities;

    @Field(name="number_of_reviews")
    private String numberOfReviews;

    @Field(name="review_scores_rating")
    private String reviewScoresRating;

    @Field(name="review_scores_accuracy")
    private String reviewScoresAccuracy;

    @Field(name="review_scores_cleanliness")
    private String reviewScoresCleanliness;

    @Field(name="review_scores_checkin")
    private String reviewScoresCheckin;

    @Field(name="review_scores_communication")
    private String reviewScoresCommunication;

    @Field(name="review_scores_location")
    private String reviewScoresLocation;

    @Field(name="review_scores_value")
    private String reviewScoresValue;

    @Field(name="instant_bookable")
    private String instantBookable;

    @Field(name="is_business_travel_ready")
    private String isBusinessTravelReady;

    @Field(name="cancellation_policy")
    private String cancellationPolicy;

    public String getListingUrl() {
        return listingUrl;
    }

    public void setListingUrl(String listingUrl) {
        this.listingUrl = listingUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getSpace() {
        return space;
    }

    public void setSpace(String space) {
        this.space = space;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNeighborhoodOverview() {
        return neighborhoodOverview;
    }

    public void setNeighborhoodOverview(String neighborhoodOverview) {
        this.neighborhoodOverview = neighborhoodOverview;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getTransit() {
        return transit;
    }

    public void setTransit(String transit) {
        this.transit = transit;
    }

    public String getAccess() {
        return access;
    }

    public void setAccess(String access) {
        this.access = access;
    }

    public String getInteraction() {
        return interaction;
    }

    public void setInteraction(String interaction) {
        this.interaction = interaction;
    }

    public String getHouseRules() {
        return houseRules;
    }

    public void setHouseRules(String houseRules) {
        this.houseRules = houseRules;
    }

    public String getAmenities() {
        return amenities;
    }

    public void setAmenities(String amenities) {
        this.amenities = amenities;
    }

    public String getNumberOfReviews() {
        return numberOfReviews;
    }

    public void setNumberOfReviews(String numberOfReviews) {
        this.numberOfReviews = numberOfReviews;
    }

    public String getReviewScoresRating() {
        return reviewScoresRating;
    }

    public void setReviewScoresRating(String reviewScoresRating) {
        this.reviewScoresRating = reviewScoresRating;
    }

    public String getReviewScoresAccuracy() {
        return reviewScoresAccuracy;
    }

    public void setReviewScoresAccuracy(String reviewScoresAccuracy) {
        this.reviewScoresAccuracy = reviewScoresAccuracy;
    }

    public String getReviewScoresCleanliness() {
        return reviewScoresCleanliness;
    }

    public void setReviewScoresCleanliness(String reviewScoresCleanliness) {
        this.reviewScoresCleanliness = reviewScoresCleanliness;
    }

    public String getReviewScoresCheckin() {
        return reviewScoresCheckin;
    }

    public void setReviewScoresCheckin(String reviewScoresCheckin) {
        this.reviewScoresCheckin = reviewScoresCheckin;
    }

    public String getReviewScoresCommunication() {
        return reviewScoresCommunication;
    }

    public void setReviewScoresCommunication(String reviewScoresCommunication) {
        this.reviewScoresCommunication = reviewScoresCommunication;
    }

    public String getReviewScoresLocation() {
        return reviewScoresLocation;
    }

    public void setReviewScoresLocation(String reviewScoresLocation) {
        this.reviewScoresLocation = reviewScoresLocation;
    }

    public String getReviewScoresValue() {
        return reviewScoresValue;
    }

    public void setReviewScoresValue(String reviewScoresValue) {
        this.reviewScoresValue = reviewScoresValue;
    }

    public String getInstantBookable() {
        return instantBookable;
    }

    public void setInstantBookable(String instantBookable) {
        this.instantBookable = instantBookable;
    }

    public String getIsBusinessTravelReady() {
        return isBusinessTravelReady;
    }

    public void setIsBusinessTravelReady(String isBusinessTravelReady) {
        this.isBusinessTravelReady = isBusinessTravelReady;
    }

    public String getCancellationPolicy() {
        return cancellationPolicy;
    }

    public void setCancellationPolicy(String cancellationPolicy) {
        this.cancellationPolicy = cancellationPolicy;
    }
}
