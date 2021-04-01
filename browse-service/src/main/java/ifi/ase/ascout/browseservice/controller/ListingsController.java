package ifi.ase.ascout.browseservice.controller;

import ifi.ase.ascout.browseservice.data.model.ListingsDetailModel;
import ifi.ase.ascout.browseservice.data.model.ListingsModel;
import ifi.ase.ascout.browseservice.data.repository.ListingsDetailRepository;
import ifi.ase.ascout.browseservice.data.repository.ListingsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/browse")
public class ListingsController {

    private static final Logger log = LoggerFactory.getLogger(ListingsController.class);

    @Autowired
    private List<ListingsModel> listings;

    @Autowired
    private List<ListingsDetailModel> listingsDetail;

    @Autowired
    private ListingsRepository listingsRepository;

    @Autowired
    private ListingsDetailRepository listingsDetailRepository;

    @GetMapping("/allListings")
    public ResponseEntity<List<ListingsModel>> getAllListings() {

        listings = listingsRepository.findAll();
        if (listings.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        return ResponseEntity.status(HttpStatus.CREATED).body(listings);
    }

    @GetMapping("/neighbourhood={neighbourhood}")
    public ResponseEntity<List<ListingsModel>> getByNeighbourhood(@PathVariable String neighbourhood) {

        listings = listingsRepository.findByNeighbourhood(neighbourhood);
        if (listings.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        return ResponseEntity.status(HttpStatus.CREATED).body(listings);
    }

    @GetMapping("/allListingsDetail")
    public ResponseEntity<List<ListingsDetailModel>> getAllListingsDetail() {

        listingsDetail = listingsDetailRepository.findAll();
        if (listingsDetail.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        return ResponseEntity.status(HttpStatus.CREATED).body(listingsDetail);
    }
}