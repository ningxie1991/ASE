package ifi.ase.ascout.calculatorservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import ifi.ase.ascout.calculatorservice.controller.CalculateController;
import ifi.ase.ascout.calculatorservice.data.dto.AttractionDTO;
import ifi.ase.ascout.calculatorservice.data.dto.BestNeighborhoodsQueryDTO;
import ifi.ase.ascout.calculatorservice.servise.ICalculatorService;
import ifi.ase.ascout.calculatorservice.utils.UTILS;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.any;

@WebMvcTest(controllers = CalculateController.class)
@ExtendWith(SpringExtension.class)
class CalculatorControllerTests {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @MockBean
    private ICalculatorService service;

    // size of the list of neighbourhoods returned
    private int topK = UTILS.getTopK();

    @Test
    public void postTest() throws Exception {
        //example={ "lat": 50.064192, "lng": -130.605469 }
        List<AttractionDTO> attractionList = new ArrayList<>();
        attractionList.add(new AttractionDTO("ChIJiQnyVcZRqEcRY0xnhE77uyY",1));
        attractionList.add(new AttractionDTO("ChIJZ0KxF_JRqEcRrLHB-4r-U-o",1));
        attractionList.add(new AttractionDTO("ChIJx8qLPN9RqEcRB2gSnmw5bJM",1));
        String travelMode = "DRIVING";
        BestNeighborhoodsQueryDTO q = new BestNeighborhoodsQueryDTO(attractionList,travelMode, topK);

        when(service.bestNeighborhoods(any(BestNeighborhoodsQueryDTO.class))).thenAnswer(new Answer() {
            public Object answer(InvocationOnMock invocation) {
                return UTILS.dummyNList();
            }
        });

        mockMvc.perform(post("/calculate/best_neighborhoods")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(q)))
                .andExpect(status().isOk());
    }

    @Test
    public void postTestNoContent() throws Exception {
        //example={ "lat": 50.064192, "lng": -130.605469 }
        List<AttractionDTO> attractionList = new ArrayList<>();
        attractionList.add(new AttractionDTO("ChIJiQnyVcZRqEcRY0xnhE77uyY",1));
        attractionList.add(new AttractionDTO("ChIJZ0KxF_JRqEcRrLHB-4r-U-o",1));
        attractionList.add(new AttractionDTO("ChIJx8qLPN9RqEcRB2gSnmw5bJM",1));
        String travelMode = "DRIVING";
        BestNeighborhoodsQueryDTO q = new BestNeighborhoodsQueryDTO(attractionList,travelMode, topK);

        when(service.bestNeighborhoods(any(BestNeighborhoodsQueryDTO.class))).thenAnswer(new Answer() {
            public Object answer(InvocationOnMock invocation) {
                return Collections.emptyList();
            }
        });

        mockMvc.perform(post("/calculate/best_neighborhoods")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(q)))
               .andExpect(status().isNoContent());
    }
}
