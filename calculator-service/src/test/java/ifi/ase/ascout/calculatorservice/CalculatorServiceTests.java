package ifi.ase.ascout.calculatorservice;


import ifi.ase.ascout.calculatorservice.data.dto.AttractionDTO;
import ifi.ase.ascout.calculatorservice.data.dto.BestNeighborhoodsQueryDTO;
import ifi.ase.ascout.calculatorservice.data.model.NeighborhoodModel;
import ifi.ase.ascout.calculatorservice.servise.CalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class CalculatorServiceTests {
    @Autowired
    private CalculatorService service;

    @Test
    public void oneAttractionTest() throws Exception {
        AttractionDTO attraction1 = new AttractionDTO("Brandenburg Gate",1);
        List<AttractionDTO> attractionList = new ArrayList<>();
        attractionList.add(attraction1);
        BestNeighborhoodsQueryDTO q = new BestNeighborhoodsQueryDTO(attractionList,"DRIVING");
        List<NeighborhoodModel> result = service.bestNeighborhoods(q);
        System.out.println(result);
    }
    @Test
    public void validAttractionsTest() throws Exception {
        List<AttractionDTO> attractionList = new ArrayList<>();
        attractionList.add(new AttractionDTO("Brandenburg Gate",1));
        attractionList.add(new AttractionDTO("Berlin Wall",1));
        attractionList.add(new AttractionDTO("Museum Island",1));
        BestNeighborhoodsQueryDTO q = new BestNeighborhoodsQueryDTO(attractionList,"DRIVING");
        List<NeighborhoodModel> result = service.bestNeighborhoods(q);
        for( NeighborhoodModel nm :result){
            System.out.println("|neighborhood:"+nm.getName()+"\t|score:"+nm.getScore()+"|");
        }
    }

}
