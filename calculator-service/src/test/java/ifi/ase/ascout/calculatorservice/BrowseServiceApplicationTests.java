package ifi.ase.ascout.calculatorservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import ifi.ase.ascout.calculatorservice.controller.CalculateController;
import ifi.ase.ascout.calculatorservice.data.dto.BestNeighborhoodsQueryDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(controllers = CalculateController.class)
class BrowseServiceApplicationTests {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void postTest() throws Exception {
        BestNeighborhoodsQueryDTO q = new BestNeighborhoodsQueryDTO("test");
        mockMvc.perform(post("/calculate/best_neighborhoods")
                .contentType("application/json")
//                .param()
                .content(objectMapper.writeValueAsString(q)))
                .andExpect(status().isOk());
    }

}
