package ifi.ase.ascout.browseservice.data.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Repository;

@Repository
@Document(collection = "airbnb_listings_detail")
public class ListingsDetailModel {

    private String listing_url;
    private String name;
    private String summary;
    private String space;
    private String description;
    private String neighborhood_overview;
    private String notes;
    private String transit;
    private String access;
    private String interaction;
    private String house_rules;
    private String amenities;
    private String number_of_reviews;
    private String review_scores_rating;
    private String review_scores_accuracy;
    private String review_scores_cleanliness;
    private String review_scores_checkin;
    private String review_scores_communication;
    private String review_scores_location;
    private String review_scores_value;
    private String instant_bookable;
    private String is_business_travel_ready;
    private String cancellation_policy;

    public String getListing_url() {
        return listing_url;
    }

    public void setListing_url(String listing_url) {
        this.listing_url = listing_url;
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

    public String getNeighborhood_overview() {
        return neighborhood_overview;
    }

    public void setNeighborhood_overview(String neighborhood_overview) {
        this.neighborhood_overview = neighborhood_overview;
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

    public String getHouse_rules() {
        return house_rules;
    }

    public void setHouse_rules(String house_rules) {
        this.house_rules = house_rules;
    }

    public String getAmenities() {
        return amenities;
    }

    public void setAmenities(String amenities) {
        this.amenities = amenities;
    }

    public String getNumber_of_reviews() {
        return number_of_reviews;
    }

    public void setNumber_of_reviews(String number_of_reviews) {
        this.number_of_reviews = number_of_reviews;
    }

    public String getReview_scores_rating() {
        return review_scores_rating;
    }

    public void setReview_scores_rating(String review_scores_rating) {
        this.review_scores_rating = review_scores_rating;
    }

    public String getReview_scores_accuracy() {
        return review_scores_accuracy;
    }

    public void setReview_scores_accuracy(String review_scores_accuracy) {
        this.review_scores_accuracy = review_scores_accuracy;
    }

    public String getReview_scores_cleanliness() {
        return review_scores_cleanliness;
    }

    public void setReview_scores_cleanliness(String review_scores_cleanliness) {
        this.review_scores_cleanliness = review_scores_cleanliness;
    }

    public String getReview_scores_checkin() {
        return review_scores_checkin;
    }

    public void setReview_scores_checkin(String review_scores_checkin) {
        this.review_scores_checkin = review_scores_checkin;
    }

    public String getReview_scores_communication() {
        return review_scores_communication;
    }

    public void setReview_scores_communication(String review_scores_communication) {
        this.review_scores_communication = review_scores_communication;
    }

    public String getReview_scores_location() {
        return review_scores_location;
    }

    public void setReview_scores_location(String review_scores_location) {
        this.review_scores_location = review_scores_location;
    }

    public String getReview_scores_value() {
        return review_scores_value;
    }

    public void setReview_scores_value(String review_scores_value) {
        this.review_scores_value = review_scores_value;
    }

    public String getInstant_bookable() {
        return instant_bookable;
    }

    public void setInstant_bookable(String instant_bookable) {
        this.instant_bookable = instant_bookable;
    }

    public String getIs_business_travel_ready() {
        return is_business_travel_ready;
    }

    public void setIs_business_travel_ready(String is_business_travel_ready) {
        this.is_business_travel_ready = is_business_travel_ready;
    }

    public String getCancellation_policy() {
        return cancellation_policy;
    }

    public void setCancellation_policy(String cancellation_policy) {
        this.cancellation_policy = cancellation_policy;
    }
}
