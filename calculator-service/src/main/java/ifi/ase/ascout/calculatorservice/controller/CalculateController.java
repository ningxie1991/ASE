package ifi.ase.ascout.calculatorservice.controller;

import ifi.ase.ascout.calculatorservice.data.dto.AttractionDTO;
import ifi.ase.ascout.calculatorservice.data.dto.BestNeighborhoodsQueryDTO;
import ifi.ase.ascout.calculatorservice.data.model.NeighborhoodModel;
import ifi.ase.ascout.calculatorservice.servise.CalculatorService;
import ifi.ase.ascout.calculatorservice.servise.ICalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/calculate")
public class CalculateController {
    @Autowired
    private ICalculatorService calculatorService;

    @PostMapping(path = "/best_neighborhoods", consumes = "application/json", produces = "application/json")
    public ResponseEntity<List<NeighborhoodModel>> bestNeighborhoods(@RequestBody BestNeighborhoodsQueryDTO query) {//@RequestBody List<String> destinations
       /*
        Users input trip itinerary with the help of google map API.
        The trip itinerary includes a list of locations they want to visit, number of people, means of transportation, date and duration.
        The app suggests neighborhoods based on the distance.
        Args:
            query={destinations:[],routes:[],startDate:,endDate:}
        Return:
            List<NeighborhoodModel>
        */
        List<NeighborhoodModel> nList = calculatorService.bestNeighborhoods(query);
        return ResponseEntity.status(HttpStatus.OK).body(nList);
    }
    @GetMapping("/get_test")
    public ResponseEntity<List<NeighborhoodModel>> getTest() {
        List<AttractionDTO> attractionList = new ArrayList<>();
        attractionList.add(new AttractionDTO("Brandenburg Gate",1));
        attractionList.add(new AttractionDTO("Museum Island",1));
        BestNeighborhoodsQueryDTO q = new BestNeighborhoodsQueryDTO(attractionList,"DRIVING");
        return bestNeighborhoods(q);
    }
}
