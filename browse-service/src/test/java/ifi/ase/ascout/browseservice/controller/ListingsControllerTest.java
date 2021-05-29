package ifi.ase.ascout.browseservice.controller;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

import com.fasterxml.jackson.databind.ObjectMapper;
import ifi.ase.ascout.browseservice.data.model.ListingsModel;
import ifi.ase.ascout.browseservice.data.repository.ListingsRepository;

import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ListingsController.class)
@ExtendWith(SpringExtension.class)
public class ListingsControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ListingsRepository listingsRepository;

    // default page size
    private static int DEFAULT_PAGE_SIZE = 10;
    // requested page size
    private static int REQUESTED_PAGE_SIZE = 25;

    private static Stream<Arguments> paginatedParamsForNeighbhouhood() {
        return Stream.of(
                Arguments.of(Arrays.asList(new ListingsModel[DEFAULT_PAGE_SIZE]), "Brunnenstr. Süd", 0, DEFAULT_PAGE_SIZE, "Brunnenstr. Süd", status().isOk()),
                Arguments.of(Arrays.asList(new ListingsModel[DEFAULT_PAGE_SIZE]), "Brunnenstr. Süd", 0, DEFAULT_PAGE_SIZE, "Brunnenstr. Süd?paging=true", status().isOk()),
                Arguments.of(Arrays.asList(new ListingsModel[REQUESTED_PAGE_SIZE]), "Brunnenstr. Süd", 0, REQUESTED_PAGE_SIZE, "Brunnenstr. Süd?page=0&size=25", status().isOk()),
                Arguments.of(Arrays.asList(new ListingsModel[REQUESTED_PAGE_SIZE]), "Brunnenstr. Süd", 0, REQUESTED_PAGE_SIZE, "Brunnenstr. Süd?paging=true&page=0&size=25", status().isOk()),
                Arguments.of(Collections.emptyList(), "ABC", 0, REQUESTED_PAGE_SIZE, "Brunnenstr. Süd?paging=true&page=0&size=25", status().isBadRequest())
        );

    }

    @ParameterizedTest
    @MethodSource("paginatedParamsForNeighbhouhood")
    public void testGetByNeighbourhoodWithPaging(List<ListingsModel> expectedResult, String neighbourhood, int page, int size, String urlParams, ResultMatcher status) throws Exception {

        when(listingsRepository.findByNeighbourhood(neighbourhood, PageRequest.of(page, size))).thenReturn(expectedResult);
        this.mockMvc.perform(get("/browse/neighbourhood=" + urlParams)).andDo(print()).andExpect(status);
    }

    private static Stream<Arguments> nonPaginatedParamsForNeighbhouhood() {
        return Stream.of(
                Arguments.of(Arrays.asList(new ListingsModel[REQUESTED_PAGE_SIZE]), "Brunnenstr. Süd", "Brunnenstr. Süd?paging=false", status().isOk()),
                Arguments.of(Arrays.asList(new ListingsModel[REQUESTED_PAGE_SIZE]), "Brunnenstr. Süd", "Brunnenstr. Süd?paging=false&page=0&size=10", status().isOk()),
                Arguments.of(Collections.emptyList(), "ABC", "Brunnenstr. Süd?paging=false&page=0&size=10", status().isBadRequest())
        );

    }

    @ParameterizedTest
    @MethodSource("nonPaginatedParamsForNeighbhouhood")
    public void testGetByNeighbourhoodWithoutPaging(List<ListingsModel> expectedResult, String neighbourhood, String urlParams, ResultMatcher status) throws Exception {

        when(listingsRepository.findByNeighbourhood(neighbourhood)).thenReturn(expectedResult);
        this.mockMvc.perform(get("/browse/neighbourhood=" + urlParams)).andDo(print()).andExpect(status);
    }

    private static Stream<Arguments> paginatedParamsForNeighbhouhoods() {
        return Stream.of(
                Arguments.of(Arrays.asList(new ListingsModel[DEFAULT_PAGE_SIZE]), Arrays.asList("Brunnenstr. Süd"), 0, DEFAULT_PAGE_SIZE, status().isOk()),
                Arguments.of(Arrays.asList(new ListingsModel[DEFAULT_PAGE_SIZE]), Arrays.asList("Brunnenstr. Süd"), 0, DEFAULT_PAGE_SIZE, status().isOk()),
                Arguments.of(Collections.emptyList(), Arrays.asList("ABC"), 0, DEFAULT_PAGE_SIZE, status().isBadRequest())
        );

    }

    @ParameterizedTest
    @MethodSource("paginatedParamsForNeighbhouhoods")
    public void testGetByNeighbourhoodsWithPaging(List<ListingsModel> expectedResult, List<String> neighbourhoods, int page, int size, ResultMatcher status) throws Exception {

        when(listingsRepository.findByNeighbourhoodIn(neighbourhoods, PageRequest.of(page, size))).thenReturn(expectedResult);
        this.mockMvc.perform(post("/browse/neighbourhoods")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(neighbourhoods))).andExpect(status);
    }

    private static Stream<Arguments> nonPaginatedParamsForNeighbhouhoods() {
        return Stream.of(
                Arguments.of(Arrays.asList(new ListingsModel[REQUESTED_PAGE_SIZE]), Arrays.asList("Brunnenstr. Süd"), status().isOk()),
                Arguments.of(Arrays.asList(new ListingsModel[REQUESTED_PAGE_SIZE]), Arrays.asList("Brunnenstr. Süd"), status().isOk()),
                Arguments.of(Collections.emptyList(), Arrays.asList("Brunnenstr. Süd"), status().isBadRequest())
        );

    }

    @ParameterizedTest
    @MethodSource("nonPaginatedParamsForNeighbhouhoods")
    public void testGetByNeighbourhoodsWithoutPaging(List<ListingsModel> expectedResult, List<String> neighbourhoods, ResultMatcher status) throws Exception {

        when(listingsRepository.findByNeighbourhoodIn(neighbourhoods)).thenReturn(expectedResult);
        this.mockMvc.perform(post("/browse/neighbourhoods?paging=false")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(neighbourhoods))).andExpect(status);
    }

}
