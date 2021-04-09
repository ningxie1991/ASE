package ifi.ase.ascout.calculatorservice.data.model;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Repository;

@Repository
//@Document(collection = "")
public class NeighborhoodModel {
    private String name;
    private String city;
    private String picture_url="test";
    private String decription="test";

    public NeighborhoodModel(){
        this.name="test";
        this.city="test";

    }

}
