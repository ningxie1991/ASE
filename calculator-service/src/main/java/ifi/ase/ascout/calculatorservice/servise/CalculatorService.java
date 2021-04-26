package ifi.ase.ascout.calculatorservice.servise;

import ifi.ase.ascout.calculatorservice.data.dto.AttractionDTO;
import ifi.ase.ascout.calculatorservice.data.dto.BestNeighborhoodsQueryDTO;
import ifi.ase.ascout.calculatorservice.data.model.NeighborhoodModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

@Service
public class CalculatorService implements ICalculatorService{

    private List<NeighborhoodModel> algorithm(List<NeighborhoodModel> nList, List<AttractionDTO> aList){
        return nList;
    }

    @Override
    public List<NeighborhoodModel> bestNeighborhoods(BestNeighborhoodsQueryDTO query) {
        //Get Neighborhoods Info List from browse service
        List<NeighborhoodModel> nList = new ArrayList<>();
        nList.add(new NeighborhoodModel("neighborhood0","city0",10.0,10.0));
        nList.add(new NeighborhoodModel("neighborhood1","city0",10.1,10.1));

        //calculate best neighborhoods
        return algorithm(nList,query.getAttractionList());
    }
}
