package ifi.ase.ascout.calculatorservice.servise;
import ifi.ase.ascout.calculatorservice.data.dto.BestNeighborhoodsQueryDTO;
import ifi.ase.ascout.calculatorservice.data.model.NeighborhoodModel;

import java.util.List;
public interface ICalculatorService {
    List<NeighborhoodModel> bestNeighborhoods(BestNeighborhoodsQueryDTO query);
    List<NeighborhoodModel> getAllNeighborhoods();
}
