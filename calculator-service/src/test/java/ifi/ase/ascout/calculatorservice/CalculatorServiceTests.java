package ifi.ase.ascout.calculatorservice;


import ifi.ase.ascout.calculatorservice.data.dto.AttractionDTO;
import ifi.ase.ascout.calculatorservice.data.dto.BestNeighborhoodsQueryDTO;
import ifi.ase.ascout.calculatorservice.data.model.NeighborhoodModel;
import ifi.ase.ascout.calculatorservice.data.repository.NeighborhoodsRepository;
import ifi.ase.ascout.calculatorservice.servise.ICalculatorService;
import ifi.ase.ascout.calculatorservice.utils.UTILS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import java.util.ArrayList;
import java.util.List;
import static org.mockito.Mockito.when;

@SpringBootTest
public class CalculatorServiceTests {
    @Autowired
    private ICalculatorService service;
    @MockBean
    private NeighborhoodsRepository repository;

    @Test
    public void oneAttractionTest() throws Exception {
        when(repository.findAll()).thenReturn(UTILS.dummyNList());
        AttractionDTO attraction1 = new AttractionDTO("ChIJiQnyVcZRqEcRY0xnhE77uyY",1);
        List<AttractionDTO> attractionList = new ArrayList<>();
        attractionList.add(attraction1);
        BestNeighborhoodsQueryDTO q = new BestNeighborhoodsQueryDTO(attractionList,"DRIVING");
        List<NeighborhoodModel> result = service.bestNeighborhoods(q);
        System.out.println(result);
    }
    @Test
    public void validAttractionsTest() throws Exception {
        when(repository.findAll()).thenReturn(UTILS.dummyNList());
        List<AttractionDTO> attractionList = new ArrayList<>();
        attractionList.add(new AttractionDTO("ChIJiQnyVcZRqEcRY0xnhE77uyY",1));
        attractionList.add(new AttractionDTO("ChIJZ0KxF_JRqEcRrLHB-4r-U-o",1));
        attractionList.add(new AttractionDTO("ChIJx8qLPN9RqEcRB2gSnmw5bJM",1));
        BestNeighborhoodsQueryDTO q = new BestNeighborhoodsQueryDTO(attractionList,"DRIVING");
        List<NeighborhoodModel> result = service.bestNeighborhoods(q);
        for( NeighborhoodModel nm :result){
            System.out.println("|neighborhood:"+nm.getName()+"\t|score:"+nm.getScore()+"|");
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
        BestNeighborhoodsQueryDTO q = new BestNeighborhoodsQueryDTO(aL,"DRIVING");
        List<NeighborhoodModel> result = service.bestNeighborhoods(q);
        for( NeighborhoodModel nm :result){
            System.out.println("|neighborhood:"+nm.getName()+"\t|score:"+nm.getScore()+"|");
        }

        aL = new ArrayList<>();
        aL.add(a2);
        aL.add(a1);
        q = new BestNeighborhoodsQueryDTO(aL,"DRIVING");
        result = service.bestNeighborhoods(q);
        for( NeighborhoodModel nm :result){
            System.out.println("|neighborhood:"+nm.getName()+"\t|score:"+nm.getScore()+"|");
        }
    }

}
