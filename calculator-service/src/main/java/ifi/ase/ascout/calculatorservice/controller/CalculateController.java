package ifi.ase.ascout.calculatorservice.controller;

import ifi.ase.ascout.calculatorservice.data.dto.AttractionDTO;
import ifi.ase.ascout.calculatorservice.data.dto.BestNeighborhoodsQueryDTO;
import ifi.ase.ascout.calculatorservice.data.model.NeighborhoodModel;
import ifi.ase.ascout.calculatorservice.servise.ICalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "${settings.cors_origin}")
@RequestMapping(path = "/calculate")
public class CalculateController {
    @Autowired
    private ICalculatorService service;

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
        List<NeighborhoodModel> nList = service.bestNeighborhoods(query);
        if(nList==null){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(nList);
        }
        return ResponseEntity.status(HttpStatus.OK).body(nList);
    }
    @GetMapping("/get_test")
    public ResponseEntity<List<NeighborhoodModel>> getTest() {
        List<AttractionDTO> attractionList = new ArrayList<>();
        attractionList.add(new AttractionDTO("ChIJiQnyVcZRqEcRY0xnhE77uyY",1));
        attractionList.add(new AttractionDTO("ChIJZ0KxF_JRqEcRrLHB-4r-U-o",1));
        attractionList.add(new AttractionDTO("ChIJx8qLPN9RqEcRB2gSnmw5bJM",1));
        BestNeighborhoodsQueryDTO q = new BestNeighborhoodsQueryDTO(attractionList,"DRIVING");
        return bestNeighborhoods(q);
    }
    @GetMapping("/get_test2")
    public ResponseEntity<List<NeighborhoodModel>> getTest2() {
        List<NeighborhoodModel> nl = service.getAllNeighborhoods();
        if (nl.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(nl);
    }

}
