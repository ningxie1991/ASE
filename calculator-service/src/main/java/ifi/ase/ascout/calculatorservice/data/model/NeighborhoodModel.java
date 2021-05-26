package ifi.ase.ascout.calculatorservice.data.model;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Repository;

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

    public String getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(String coordinates) {
        this.coordinates = coordinates;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPlaceId() {
        return placeId;
    }

    public void setPlaceId(String placeId) {
        this.placeId = placeId;
    }


    public Double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    @Override
    public int compareTo(NeighborhoodModel o) {
        return this.getScore().compareTo(o.getScore());
    }
}
