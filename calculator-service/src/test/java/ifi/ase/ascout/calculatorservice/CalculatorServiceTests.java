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

}
