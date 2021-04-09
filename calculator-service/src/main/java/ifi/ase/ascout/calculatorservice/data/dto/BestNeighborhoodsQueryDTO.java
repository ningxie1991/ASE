package ifi.ase.ascout.calculatorservice.data.dto;
import javax.persistence.Entity;
import java.io.Serializable;

@Entity
public class BestNeighborhoodsQueryDTO implements Serializable {
    private String test;
    public BestNeighborhoodsQueryDTO(){ }
    public BestNeighborhoodsQueryDTO(String test){
        this.test=test;
    }

}
