package ifi.ase.ascout.calculatorservice.data.dto;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
public class BestNeighborhoodsQueryDTO implements Serializable {
    private String test;
    private Long id;
    private String name;
    private BigDecimal latitude;
    private BigDecimal longitude;

    public BestNeighborhoodsQueryDTO(){ }
    public BestNeighborhoodsQueryDTO(String test){
        this.test=test;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }
}
