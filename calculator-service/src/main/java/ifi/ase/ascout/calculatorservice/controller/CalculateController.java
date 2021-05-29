package ifi.ase.ascout.calculatorservice.controller;

import ifi.ase.ascout.calculatorservice.data.dto.BestNeighborhoodsQueryDTO;
import ifi.ase.ascout.calculatorservice.data.model.NeighborhoodModel;
import ifi.ase.ascout.calculatorservice.servise.ICalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CalculateController provides the API for interacting with the calculator-service
 */
@RestController
//@CrossOrigin(origins = {"${settings.cors_origin_dev}", "${settings.cors_origin_local}"})
//@CrossOrigin(origins = {"${client.url.prod}", "${client.url.dev}", "${client.url.local}"})
@RequestMapping(path = "/calculate")
public class CalculateController {
    @Autowired
    private ICalculatorService service;

    /**
     * Calculates the best neighbourhoods based on a query from the frontend consisting of a list of attractions,
     * travel mode and the number of top neighbourhoods
     * @param query the BestNeighborhoodsQueryDTO query object
     * @return ResponseEntity with a list of NeighborhoodModel
     */
    @PostMapping(path = "/best_neighborhoods", consumes = "application/json", produces = "application/json")
    public ResponseEntity<List<NeighborhoodModel>> bestNeighborhoods(@RequestBody BestNeighborhoodsQueryDTO query) {
        List<NeighborhoodModel> nList = service.bestNeighborhoods(query);
        if(nList.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(nList);
        }
        return ResponseEntity.status(HttpStatus.OK).body(nList);
    }
}
