package ifi.ase.ascout.calculatorservice.data.dto;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.List;

@Entity
public class BestNeighborhoodsQueryDTO implements Serializable {
    private String test;
    private List<AttractionDTO> attractionList;

    public BestNeighborhoodsQueryDTO(){ }
    public BestNeighborhoodsQueryDTO(String test,List<AttractionDTO> attractionList){
        this.test=test;
        this.attractionList=attractionList;
    }

    public String getTest() {
        return test;
    }
    public void setTest(String test) {
        this.test = test;
    }
    public List<AttractionDTO> getAttractionList() {
        return attractionList;
    }

    public void setAttractionList(List<AttractionDTO> attractionList) {
        this.attractionList = attractionList;
    }
}
