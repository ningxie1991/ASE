package ifi.ase.ascout.calculatorservice.data.repository;
import ifi.ase.ascout.calculatorservice.data.model.NeighborhoodModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface NeighborhoodsRepository extends MongoRepository<NeighborhoodModel, String> {
}
