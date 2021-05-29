package ifi.ase.ascout.calculatorservice.servise;
import ifi.ase.ascout.calculatorservice.data.dto.BestNeighborhoodsQueryDTO;
import ifi.ase.ascout.calculatorservice.data.model.NeighborhoodModel;

import java.util.List;

/**
 * Interface for CalculatorService
 */
public interface ICalculatorService {
    /**
     * Calculates best neighbourhoods
     * @param query a BestNeighborhoodsQueryDTO object
     * @return a list of NeighborhoodModel
     */
    List<NeighborhoodModel> bestNeighborhoods(BestNeighborhoodsQueryDTO query);
}
