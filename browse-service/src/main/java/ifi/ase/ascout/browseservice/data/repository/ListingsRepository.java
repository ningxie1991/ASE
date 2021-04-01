package ifi.ase.ascout.browseservice.data.repository;

import ifi.ase.ascout.browseservice.data.model.ListingsModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ListingsRepository extends MongoRepository<ListingsModel, String> {
    // find the listings by neighbourhood
    List<ListingsModel> findByNeighbourhood(@Param("neighbourhood") String neighbourhood);
}
