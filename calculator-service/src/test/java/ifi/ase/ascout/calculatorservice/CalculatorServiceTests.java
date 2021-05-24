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

}
