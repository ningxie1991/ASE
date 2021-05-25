package ifi.ase.ascout.browseservice;

import java.util.List;

import ifi.ase.ascout.browseservice.data.model.ListingsModel;
import ifi.ase.ascout.browseservice.data.repository.ListingsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@TestPropertySource(locations="classpath:application-test.properties")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class DatabaseConnectionTest {

    @Autowired
    private ListingsRepository listingsRepository;

    private ListingsModel newListing;

    @BeforeEach
    public void setUp() {
        newListing = new ListingsModel();
        newListing.setId("1000");
        newListing.setName("Nice Apartment Near City Center");
        newListing.setHostId("123");
        newListing.setHostName("Ning");
        newListing.setHostIsSuperhost("t");
        newListing.setNeighbourhoodGroup("Test Neighbourhood Group");
        newListing.setNeighbourhood("Test Neighbourhood");
        newListing.setLatitude("52.49885493");
        newListing.setLongitude("13.34906453");
        newListing.setPropertyType("Apartment");
        newListing.setRoomType("Private room");
        newListing.setAccommodates("2");
        newListing.setBathrooms("1");
        newListing.setBedrooms("1");
        newListing.setBedType("Pull-out Sofa");
        newListing.setBeds("1");
        newListing.setPictureUrl("https://a0.muscache.com/im/pictures/29054294/b1fad3a2_original.jpg?aki_policy=large");
        newListing.setPrice("26");
        newListing.setSecurityDeposit("250");
        newListing.setCleaningFee("30");

        listingsRepository.insert(newListing);
    }

    @Test
    public void testDBConnection() {
        try {
            List<ListingsModel> listings = listingsRepository.findByNeighbourhood("Test Neighbourhood");
            assertEquals(1, listings.size());
            assertEquals("1000", listings.get(0).getId());
        } catch (Exception e) {
            // fail the test
            assertTrue(false);
        } finally {
           listingsRepository.deleteById("1000");
        }
    }

}
