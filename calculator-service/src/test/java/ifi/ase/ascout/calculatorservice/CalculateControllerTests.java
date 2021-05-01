package ifi.ase.ascout.calculatorservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import ifi.ase.ascout.calculatorservice.controller.CalculateController;
import ifi.ase.ascout.calculatorservice.data.dto.AttractionDTO;
import ifi.ase.ascout.calculatorservice.data.dto.BestNeighborhoodsQueryDTO;
import ifi.ase.ascout.calculatorservice.servise.CalculatorService;
import ifi.ase.ascout.calculatorservice.utils.UTILS;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.Mockito.when;


@WebMvcTest(controllers = CalculateController.class)
@ExtendWith(SpringExtension.class)
class CalculateControllerTests {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @MockBean
    private CalculatorService service;

    @Test
    public void postTest() throws Exception {
        //example={ "lat": 50.064192, "lng": -130.605469 }
        AttractionDTO attraction1 = new AttractionDTO("Brandenburg Gate",1);
        AttractionDTO attraction2 = new AttractionDTO("Museum Island",1);
        List<AttractionDTO> attractionList = new ArrayList<>();
        attractionList.add(attraction1);
        BestNeighborhoodsQueryDTO q = new BestNeighborhoodsQueryDTO(attractionList,"DRIVING");
        when(service.bestNeighborhoods(q)).thenReturn(UTILS.dummyNList());

        System.out.println(objectMapper.writeValueAsString(q));

        mockMvc.perform(post("/calculate/best_neighborhoods")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(q)))
                .andExpect(status().isOk());
    }

}
