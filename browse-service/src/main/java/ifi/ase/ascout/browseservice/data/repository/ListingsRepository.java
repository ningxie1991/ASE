package ifi.ase.ascout.browseservice.data.repository;

import ifi.ase.ascout.browseservice.data.model.ListingsModel;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * ListingsRepository is the MongoDB repository for the airbnb_listings collection
 */
public interface ListingsRepository extends MongoRepository<ListingsModel, String> {

    /**
     * Finds the listings by neighbourhood with paging
     * @param neighbourhood the name of neighbourhood
     * @param pageable the Pageable object (refer to ListingsController)
     * @return list of ListingsModel
     */
    List<ListingsModel> findByNeighbourhood(@Param("neighbourhood") String neighbourhood, Pageable pageable);

    /**
     * Finds the listings by neighbourhood without paging
     * @param neighbourhood the name of neighbourhood
     * @return list of ListingsModel
     */
    List<ListingsModel> findByNeighbourhood(@Param("neighbourhood") String neighbourhood);

    /**
     * Finds the listings by a list of neighbourhoods with paging
     * @param neighbourhoods the list of neighbourhood names
     * @param pageable the Pageable object (refer to ListingsController)
     * @return list of ListingsModel
     */
    List<ListingsModel> findByNeighbourhoodIn(List<String> neighbourhoods, Pageable pageable);

    /**
     * Finds the listings by a list of neighbourhoods without paging
     * @param neighbourhoods the list of neighbourhood names
     * @return list of ListingsModel
     */
    List<ListingsModel> findByNeighbourhoodIn(List<String> neighbourhoods);
}

