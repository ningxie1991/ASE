package ifi.ase.ascout.browseservice.data.repository;

import ifi.ase.ascout.browseservice.data.model.ListingsDetailModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ListingsDetailRepository extends MongoRepository<ListingsDetailModel, String> {
}
