package ifi.ase.ascout.calculatorservice.data.model;

import com.google.maps.model.DistanceMatrix;
import ifi.ase.ascout.calculatorservice.utils.UTILS;

import java.util.Arrays;
import java.util.stream.IntStream;

/**
 * CostMatrix
 */
public class CostMatrix {
    private final double[][] costMatrix;
    private final int rowNum;//number of neiborhoods/destinations
    private final int colNum;//number of attractions/origins
    private int colItr;

    /**
     * Constructor of CostMatrix
     * @param rnum the row number
     * @param cnum the column number
     */
    public CostMatrix(int rnum, int cnum){
        this.costMatrix = new double[rnum][cnum];
        this.colItr = 0;
        this.rowNum = rnum;
        this.colNum = cnum;
    }

    /**
     * Fill in the matrix
     * @param fillInMatrix the matrix to fill in
     */
    public void fillIn(double[][] fillInMatrix){
        int rnum = fillInMatrix.length;
        if(rnum < 0 || rnum != this.rowNum) return;
        int cnum = fillInMatrix[0].length;
        for(int c = 0; c < cnum && colItr < this.colNum; ++colItr, ++c){
            for(int r = 0; r < this.rowNum; ++r){
                this.costMatrix[r][colItr]=fillInMatrix[r][c];
            }
        }
    }

    /**
     * Fill in the distance matrix
     * @param dMatrix the distance matrix to fill in
     */
    public void fillInDistanceMatrix(DistanceMatrix dMatrix){
        // TODO regulation and balance
        int rlen = dMatrix.rows.length;//TODO NullPointerException: null
        int clen = dMatrix.rows[0].elements.length;
        double[][] cMatrix = new double[rlen][clen];
        //findout max distance and duration
        long maxDis=0;
        long maxDur=0;
        for(int i=0;i<rlen;++i){
            for(int j=0;j<clen;++j){
                long distance = dMatrix.rows[i].elements[j].distance.inMeters;
                long duration = dMatrix.rows[i].elements[j].duration.inSeconds;
                if(distance>maxDis)maxDis=distance;
                if(duration>maxDur)maxDur=duration;
            }
        }
        for(int i=0;i<rlen;++i){
            for(int j=0;j<clen;++j){
                double distance = dMatrix.rows[i].elements[j].distance.inMeters;
                double duration = dMatrix.rows[i].elements[j].duration.inSeconds;
                if(maxDis > 0 && maxDur > 0){
                    cMatrix[i][j] = (distance / maxDis + duration / maxDur) * 0.5;
                }else{
                    System.err.println(
                       "cm["+i+"]["+j+"]="+cMatrix[i][j]+"\n"+
                       "(distance:"+distance+
                       ",duration:"+duration+
                       ",maxDis:"+maxDis+
                       ",maxDur:"+maxDur+")");
                }
            }
        }
        this.fillIn(cMatrix);
    }

    /**
     * Gets the cost matrix
     * @return a 2D array of double
     */
    public double[][] getCostMatrix() {
        return this.costMatrix;
    }

    /**
     * Calculates the column cost by group
     * @param groupIds the group ids
     * @return an array of double
     */
    public double[] calculateColumnCostByGroup(int[] groupIds ){
        //rlen=cnum = number of neighborhoods, as destinations;
        int rlen = this.costMatrix.length;
        //clen=rnum = number of attractions, as origins;
        int clen = this.costMatrix[0].length;
        double[] neiToAllCosts = new double[clen];
        IntStream.range(0, clen).forEach(i -> neiToAllCosts[i] = 0);
        double[] neiToGroupCost = this.costMatrix[0];
        for(int i = 1; i < rlen; ++i){
            if(groupIds[i]==groupIds[i-1]){//Same group, take minimum
                //neiToGroupCost = min{costMatrix[i],neiToGroupCost}
                for(int j=0;j<clen;++j){
                    UTILS.min_rows(neiToGroupCost,this.costMatrix[i]);
                }
            }else{//Change group, adds to neiToAllCosts, optionally with weight
                //neiToAllCosts += neiToGroupCost
                UTILS.add_rows(neiToAllCosts,neiToGroupCost);
                neiToGroupCost = this.costMatrix[i];
            }
        }
        UTILS.add_rows(neiToAllCosts,neiToGroupCost);
        return neiToAllCosts;
    }

    /**
     * Converts to string
     * @return String
     */
    @Override
    public String toString() {
        return "CostMatrix{" +
                "costMatrix=" + Arrays.deepToString(costMatrix) +
                '}';
    }
}
