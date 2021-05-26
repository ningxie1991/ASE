package ifi.ase.ascout.calculatorservice.data.model;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Repository;

/**
 * NeighborhoodModel is the data model for a neighbourhood in the "neighborhoods_with_coords" collection stored in MongoDB
 */
@Repository
@Document(collection = "neighborhoods_with_coords")
public class NeighborhoodModel implements Comparable<NeighborhoodModel>{

    // attributes from the DB
    @Field(name="coordinates")
    private String coordinates;
    @Field(name="group")
    private String group;
    @Field(name="name")
    private String name;
    @Field(name="place_id")
    private String placeId;

    // generated attribute
    private double score;

    /**
     * Gets the coordinates of neighbourhood boundaries
     * @return String
     */
    public String getCoordinates() {
        return coordinates;
    }

    /**
     * Sets the coordinates of neighbourhood boundaries
     * @param coordinates the coordinates of neighbourhood boundaries
     */
    public void setCoordinates(String coordinates) {
        this.coordinates = coordinates;
    }

    /**
     * Gets the group of the neighbourhood
     * @return String
     */
    public String getGroup() {
        return group;
    }

    /**
     * Sets the group of the neighbourhood
     * @param group the group of the neighbourhood
     */
    public void setGroup(String group) {
        this.group = group;
    }

    /**
     * Gets the name of the neighbourhood
     * @return String
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name of the neighbourhood
     * @param name the name of neighbourhood
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets the place id of the neighbourhood
     * @return String
     */
    public String getPlaceId() {
        return placeId;
    }

    /**
     * Sets the place id of the neighbourhood
     * @param placeId the place id of the neighbourhood
     */
    public void setPlaceId(String placeId) {
        this.placeId = placeId;
    }

    /**
     * Gets the score of of the neighbourhood
     * @return Double
     */
    public Double getScore() {
        return score;
    }

    /**
     * Sets the score of of the neighbourhood
     * @param score the score of of the neighbourhood
     */
    public void setScore(double score) {
        this.score = score;
    }

    /**
     * Compares neighbourhoods
     * @param o neighbourhood model to compare to
     * @return int
     */
    @Override
    public int compareTo(NeighborhoodModel o) {
        return this.getScore().compareTo(o.getScore());
    }
}
