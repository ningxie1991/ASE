package ifi.ase.ascout.calculatorservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import ifi.ase.ascout.calculatorservice.controller.CalculateController;
import ifi.ase.ascout.calculatorservice.data.dto.AttractionDTO;
import ifi.ase.ascout.calculatorservice.data.dto.BestNeighborhoodsQueryDTO;
import ifi.ase.ascout.calculatorservice.servise.ICalculatorService;
import ifi.ase.ascout.calculatorservice.utils.UTILS;
import org.junit.jupiter.api.BeforeEach;
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
import java.util.Arrays;
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

    // the attraction list
    private List<AttractionDTO> attractionList = new ArrayList<AttractionDTO>();

    @BeforeEach
    void setUp() {
        AttractionDTO a1 = new AttractionDTO();
        a1.setGroupId(1);
        a1.setName("Brandenburg Gate");
        a1.setPlaceId("ChIJiQnyVcZRqEcRY0xnhE77uyY");

        AttractionDTO a2 = new AttractionDTO();
        a2.setGroupId(1);
        a2.setName("Berlin Wall Memorial");
        a2.setPlaceId("ChIJZ0KxF_JRqEcRrLHB-4r-U-o");

        AttractionDTO a3 = new AttractionDTO();
        a3.setGroupId(1);
        a3.setName("Museum Island");
        a3.setPlaceId("ChIJx8qLPN9RqEcRB2gSnmw5bJM");

        attractionList.add(a1);
        attractionList.add(a2);
        attractionList.add(a3);
    }

    @Test
    public void postTest() throws Exception {
        String travelMode = "DRIVING";
        BestNeighborhoodsQueryDTO q = new BestNeighborhoodsQueryDTO(attractionList, travelMode, topK);

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
        String travelMode = "DRIVING";
        BestNeighborhoodsQueryDTO q = new BestNeighborhoodsQueryDTO(attractionList, travelMode, topK);

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
