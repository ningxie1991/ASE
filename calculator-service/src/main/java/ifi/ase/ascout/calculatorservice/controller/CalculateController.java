package ifi.ase.ascout.calculatorservice.controller;

import ifi.ase.ascout.calculatorservice.data.dto.BestNeighborhoodsQueryDTO;
import ifi.ase.ascout.calculatorservice.data.model.NeighborhoodModel;
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

    @PostMapping(path = "/best_neighborhoods", consumes = "application/json", produces = "application/json")
    public ResponseEntity<List<NeighborhoodModel>> bestNeighborhoods(@RequestBody List<BestNeighborhoodsQueryDTO> query) {//@RequestBody List<String> destinations
       /*
        Users input trip itinerary with the help of google map API.
        The trip itinerary includes a list of locations they want to visit, number of people, means of transportation, date and duration.
        The app suggests neighborhoods based on the distance.
        Args:
            query={destinations:[],routes:[],startDate:,endDate:}
        Return:
            List<NeighborhoodModel>
        */
        System.out.println(query);
        NeighborhoodModel n = new NeighborhoodModel();
        List<NeighborhoodModel> l = List.of(n);

        ResponseEntity<List<NeighborhoodModel>> response = ResponseEntity.ok().body(l);
        System.out.println(response.getBody());

        return response;
    }
}
