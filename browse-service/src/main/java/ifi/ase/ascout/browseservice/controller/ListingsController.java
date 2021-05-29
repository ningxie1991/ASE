package ifi.ase.ascout.browseservice.controller;

import ifi.ase.ascout.browseservice.data.model.ListingsModel;
import ifi.ase.ascout.browseservice.data.repository.ListingsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ListingsController provides the API for interacting with the browse-service
 */
@RestController
//@CrossOrigin(origins = {"${settings.cors_origin_dev}", "${settings.cors_origin_local}"})
@RequestMapping(path = "/browse")
public class ListingsController {

    // default page number
    private static final String DEFAULT_PAGING = "true";

    // default page number
    private static final String DEFAULT_PAGE_NUMBER = "0";

    // default page size
    private static final String DEFAULT_PAGE_SIZE = "10";

    private List<ListingsModel> listings;

    @Autowired
    private ListingsRepository listingsRepository;

    /**
     * Gets listings by one neighbourhood name
     * @param neighbourhood the name of neighbourhood
     * @param paging whether the request should be paginated or not, i.e "true" (default) or "false"
     * @param page the page number, starting from index 0
     * @param size the number of listings on one page, default is 10
     * @return ResponseEntity with a list of ListingsModel
     */
    @GetMapping("/neighbourhood={neighbourhood}")
    public ResponseEntity<List<ListingsModel>> getByNeighbourhood(@PathVariable String neighbourhood,
                                                                  @RequestParam(defaultValue = DEFAULT_PAGING) String paging,
                                                                  @RequestParam(defaultValue = DEFAULT_PAGE_NUMBER) int page,
                                                                  @RequestParam(defaultValue = DEFAULT_PAGE_SIZE) int size) {

        boolean isPaging = Boolean.parseBoolean(paging);
        if(isPaging) {
            listings = listingsRepository.findByNeighbourhood(neighbourhood, PageRequest.of(page, size));
        }else{
            listings = listingsRepository.findByNeighbourhood(neighbourhood);
        }

        if (listings.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        return ResponseEntity.status(HttpStatus.OK).body(listings);
    }

    /**
     * Gets listings by a list of neighbourhood names
     * @param neighbourhoods the list of neighbourhood names
     * @param paging whether the request should be paginated or not, i.e "true" (default) or "false"
     * @param page the page number, starting from index 0
     * @param size the number of listings on one page, default is 10
     * @return ResponseEntity with a list of ListingsModel
     */
    @PostMapping(path = "/neighbourhoods", consumes = "application/json", produces = "application/json")
    public ResponseEntity<List<ListingsModel>> getByNeighbourhoods(@RequestBody List<String> neighbourhoods,
                                                                   @RequestParam(defaultValue = DEFAULT_PAGING) String paging,
                                                                   @RequestParam(defaultValue = DEFAULT_PAGE_NUMBER) int page,
                                                                   @RequestParam(defaultValue = DEFAULT_PAGE_SIZE) int size) {

        boolean isPaging = Boolean.parseBoolean(paging);
        if(isPaging) {
            listings = listingsRepository.findByNeighbourhoodIn(neighbourhoods, PageRequest.of(page, size));
        }else{
            listings = listingsRepository.findByNeighbourhoodIn(neighbourhoods);
        }

        if (listings.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        return ResponseEntity.status(HttpStatus.OK).body(listings);
    }
}
