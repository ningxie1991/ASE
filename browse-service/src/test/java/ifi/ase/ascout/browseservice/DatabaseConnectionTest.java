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
            assertEquals("Nice Apartment Near City Center", listings.get(0).getName());
            assertEquals("123", listings.get(0).getHostId());
            assertEquals("Ning", listings.get(0).getHostName());
            assertEquals("t", listings.get(0).getHostIsSuperhost());
            assertEquals("Test Neighbourhood Group", listings.get(0).getNeighbourhoodGroup());
            assertEquals("Test Neighbourhood", listings.get(0).getNeighbourhood());
            assertEquals("52.49885493", listings.get(0).getLatitude());
            assertEquals("13.34906453", listings.get(0).getLongitude());
            assertEquals("Apartment", listings.get(0).getPropertyType());
            assertEquals("Private room", listings.get(0).getRoomType());
            assertEquals("2", listings.get(0).getAccommodates());
            assertEquals("1", listings.get(0).getBathrooms());
            assertEquals("1", listings.get(0).getBedrooms());
            assertEquals("Pull-out Sofa", listings.get(0).getBedType());
            assertEquals("1", listings.get(0).getBeds());
            assertEquals("https://a0.muscache.com/im/pictures/29054294/b1fad3a2_original.jpg?aki_policy=large", listings.get(0).getPictureUrl());
            assertEquals("26", listings.get(0).getPrice());
            assertEquals("250", listings.get(0).getSecurityDeposit());
            assertEquals("30", listings.get(0).getCleaningFee());
        } catch (Exception e) {
            // fail the test
            assertTrue(false);
        } finally {
           listingsRepository.deleteById("1000");
        }
    }

}
