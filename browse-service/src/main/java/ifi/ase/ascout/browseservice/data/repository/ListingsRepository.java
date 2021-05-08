package ifi.ase.ascout.browseservice.data.repository;

import ifi.ase.ascout.browseservice.data.model.ListingsModel;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ListingsRepository extends MongoRepository<ListingsModel, String> {

    // find the listings by neighbourhood with paging
    List<ListingsModel> findByNeighbourhood(@Param("neighbourhood") String neighbourhood, Pageable pageable);

    // find the listings by neighbourhood without paging
    List<ListingsModel> findByNeighbourhood(@Param("neighbourhood") String neighbourhood);

    // find the listings by a list of neighbourhoods with paging
    List<ListingsModel> findByNeighbourhoodIn(List<String> neighbourhoods, Pageable pageable);

    // find the listings by a list of neighbourhoods without paging
    List<ListingsModel> findByNeighbourhoodIn(List<String> neighbourhoods);
}

