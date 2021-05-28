package ifi.ase.ascout.calculatorservice;


import ifi.ase.ascout.calculatorservice.data.dto.AttractionDTO;
import ifi.ase.ascout.calculatorservice.data.dto.BestNeighborhoodsQueryDTO;
import ifi.ase.ascout.calculatorservice.data.model.NeighborhoodModel;
import ifi.ase.ascout.calculatorservice.data.repository.NeighborhoodsRepository;
import ifi.ase.ascout.calculatorservice.servise.ICalculatorService;
import ifi.ase.ascout.calculatorservice.utils.UTILS;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class CalculatorServiceTests {
    @Autowired
    private ICalculatorService service;
    @MockBean
    private NeighborhoodsRepository repository;

    // size of the list of neighbourhoods returned
    private int topK = UTILS.getTopK();

    // the attraction list 1
    private List<AttractionDTO> attractionList1 = new ArrayList<AttractionDTO>();

    // the attraction list 2
    private List<AttractionDTO> attractionList2 = new ArrayList<AttractionDTO>();

    @BeforeEach
    public void setUp() {
        AttractionDTO a1 = new AttractionDTO();
        a1.setGroupId(1);
        a1.setName("Brandenburg Gate");
        a1.setPlaceId("ChIJiQnyVcZRqEcRY0xnhE77uyY");
        attractionList1.add(a1);

        AttractionDTO a2 = new AttractionDTO();
        a2.setGroupId(1);
        a2.setName("Berlin Wall Memorial");
        a2.setPlaceId("ChIJZ0KxF_JRqEcRrLHB-4r-U-o");

        AttractionDTO a3 = new AttractionDTO();
        a3.setGroupId(1);
        a3.setName("Museum Island");
        a3.setPlaceId("ChIJx8qLPN9RqEcRB2gSnmw5bJM");

        attractionList2.add(a1);
        attractionList2.add(a2);
        attractionList2.add(a3);
    }

    @Test
    public void oneAttractionTest() throws Exception {
        when(repository.findAll()).thenReturn(UTILS.dummyNList());
        String travelMode = "DRIVING";
        BestNeighborhoodsQueryDTO q = new BestNeighborhoodsQueryDTO(attractionList1,travelMode, topK);
        List<NeighborhoodModel> result = service.bestNeighborhoods(q);
        assertEquals(topK, result.size());
    }

    @Test
    public void validAttractionsTest() throws Exception {
        when(repository.findAll()).thenReturn(UTILS.dummyNList());
        String travelMode = "DRIVING";
        BestNeighborhoodsQueryDTO q = new BestNeighborhoodsQueryDTO(attractionList2,travelMode, topK);
        List<NeighborhoodModel> result = service.bestNeighborhoods(q);
        assertEquals(topK, result.size());
        for( NeighborhoodModel nm :result){
            System.out.println("|neighborhood:" + nm.getName() +
                    "\t|score:" + nm.getScore() +
                    "\t|group:" + nm.getGroup() +
                    "\t|placeId:" + nm.getPlaceId() +
                    "\t|coordinates:" + nm.getCoordinates());
        }
    }

    @Test
    public void testDifferentOrder() throws Exception {
        when(repository.findAll()).thenReturn(UTILS.dummyNList());

        AttractionDTO a1 = new AttractionDTO("Potsdamer Platz","ChIJIeqReMlRqEcRquFNJTyYoUw",1);//
        AttractionDTO a2 = new AttractionDTO("Tierpark Berlin","ChIJ3b92pjZJqEcR3P-0LbMptL8",2);//, Am Tierpark
        List<AttractionDTO> aL = new ArrayList<>();
        aL.add(a1);
        aL.add(a2);
        System.out.println("attraction_order:"+aL.toString());
        BestNeighborhoodsQueryDTO q = new BestNeighborhoodsQueryDTO(aL,"DRIVING",5);
        List<NeighborhoodModel> result = service.bestNeighborhoods(q);
        for( NeighborhoodModel nm :result){
            System.out.println("|neighborhood:"+nm.getName()+"\t|score:"+nm.getScore()+"|");
        }

        aL = new ArrayList<>();
        aL.add(a2);
        aL.add(a1);
        System.out.println("attraction_order:"+aL.toString());
        q = new BestNeighborhoodsQueryDTO(aL,"DRIVING",5);
        result = service.bestNeighborhoods(q);
        for( NeighborhoodModel nm :result){
            System.out.println("|neighborhood:"+nm.getName()+"\t|score:"+nm.getScore()+"|");
        }
    }

    @Test
    public void testDifferentAttractionGroupIds(){
        when(repository.findAll()).thenReturn(UTILS.dummyNList());
        AttractionDTO a1 = new AttractionDTO("Potsdamer Platz","ChIJIeqReMlRqEcRquFNJTyYoUw",0);//
        AttractionDTO a2 = new AttractionDTO("Tierpark Berlin","ChIJ3b92pjZJqEcR3P-0LbMptL8",0);//, Am Tierpark
        List<AttractionDTO> aL = new ArrayList<>();
        aL.add(a1);
        aL.add(a2);

        System.out.println("[Testing full 0 groupIds query]");
        for( AttractionDTO a : aL){
            a.setGroupId(0);
        }
        System.out.println("attraction_order:"+aL.toString());
        BestNeighborhoodsQueryDTO q = new BestNeighborhoodsQueryDTO(aL,"DRIVING",5);
        List<NeighborhoodModel> result = service.bestNeighborhoods(q);
        for( NeighborhoodModel nm :result){
            System.out.println("|neighborhood:"+nm.getName()+"\t|score:"+nm.getScore()+"|");
        }

        System.out.println("[Testing unique groupIds query]");
        int i=1;
        for( AttractionDTO a : aL){
            a.setGroupId(i++);
        }
        System.out.println("attraction_order:"+aL.toString());
        q = new BestNeighborhoodsQueryDTO(aL,"DRIVING",5);
        result = service.bestNeighborhoods(q);
        for( NeighborhoodModel nm :result){
            System.out.println("|neighborhood:"+nm.getName()+"\t|score:"+nm.getScore()+"|");
        }

        System.out.println("[Testing full 1 groupIds query]");
        for( AttractionDTO a : aL){
            a.setGroupId(1);
        }
        System.out.println("attraction_order:"+aL.toString());
        q = new BestNeighborhoodsQueryDTO(aL,"DRIVING",5);
        result = service.bestNeighborhoods(q);
        for( NeighborhoodModel nm :result){
            System.out.println("|neighborhood:"+nm.getName()+"\t|score:"+nm.getScore()+"|");
        }

    }
}
