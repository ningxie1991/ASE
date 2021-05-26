package ifi.ase.ascout.calculatorservice;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.*;
import com.google.maps.DistanceMatrixApi;


import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Scanner;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import java.io.*;
@SpringBootTest
public class GoogleMapAPITests {

    public final GeoApiContext context;
    private final String getDistanceMatrixWithBasicStringParams;

    private static String retrieveBody(String filename) {
        InputStream input = GoogleMapAPITests.class.getResourceAsStream(filename);
        try (Scanner s = new java.util.Scanner(input, StandardCharsets.UTF_8.name())) {
            s.useDelimiter("\\A");
            String body = s.next();
            if (body == null || body.length() == 0) {
                throw new IllegalArgumentException(
                        "filename '" + filename + "' resulted in null or empty body");
            }
            return body;
        }
    }

    public GoogleMapAPITests(@Value("${api.key}") String apiKey) {
        this.context = new GeoApiContext.Builder()
                .apiKey(apiKey)
                .build();
        getDistanceMatrixWithBasicStringParams =
                retrieveBody("GetDistanceMatrixWithBasicStringParams.json");
    }

    @BeforeAll
    public static void init()throws Exception{
    }

    @Test
    public void testGeocoding() throws Exception {
        GeocodingResult[] results =  GeocodingApi.geocode(context,
                "1600 Amphitheatre Parkway Mountain View, CA 94043").await();
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        System.out.println(gson.toJson(results[0].addressComponents));
    }

    @Test
    public void testLatLngOriginDestinations() throws InterruptedException, ApiException, IOException {
        String[] origins =
                new String[] {
                        "Perth, Australia", "Sydney, Australia", "Melbourne, Australia",
                        "Adelaide, Australia", "Brisbane, Australia", "Darwin, Australia",
                        "Hobart, Australia", "Canberra, Australia"
                };
        String[] destinations =
                new String[] {
                        "Uluru, Australia",
                        "Kakadu, Australia",
                        "Blue Mountains, Australia",
                        "Bungle Bungles, Australia",
                        "The Pinnacles, Australia"
                };
        TravelMode mode = TravelMode.valueOf("DRIVING");
        System.err.println(mode.toString());

        DistanceMatrix matrix =
                DistanceMatrixApi.getDistanceMatrix(context, origins, destinations).mode(mode).await();

        System.err.println(matrix.toString());

        assertNotNull(matrix.toString());
        assertNotNull(Arrays.toString(matrix.rows));
        assertEquals(8, matrix.rows.length);
        assertEquals(5, matrix.rows[0].elements.length);
        assertEquals(DistanceMatrixElementStatus.OK, matrix.rows[0].elements[0].status);

        System.err.println("matrix.rows[0]: from origins[0]=\"Perth, Australia\" to 5 different destinations");
        System.err.println(matrix.rows[0].toString());
        System.err.println("matrix.rows[0].elements[0]: from origins[0] to destinations[0]: \"Perth, Australia\"→\"Uluru, Australia\"");
        System.err.println(matrix.rows[0].elements[0].toString());

        assertEquals("Perth WA, Australia", matrix.originAddresses[0]);
        assertEquals("Sydney NSW, Australia", matrix.originAddresses[1]);
        assertEquals("Uluru, Petermann NT 0872, Australia", matrix.destinationAddresses[0]);
//        assertEquals("Kakadu NT 0822, Australia", matrix.destinationAddresses[1]);
    }

    @Test
    public void fillPlaceIDCSV(){

        String pathToCsv = "Z:\\2021-3\\ASE\\neighbourhoods.csv";
        String pathToNewCsv = "neighbourhoods.csv";
        BufferedReader csvReader;
        FileWriter csvWriter;
        Writer fstream = null;
        BufferedWriter out = null;
        try {
            csvReader = new BufferedReader(new InputStreamReader(new FileInputStream(
                    pathToCsv), "UTF8"));
            fstream = new OutputStreamWriter(
                    new FileOutputStream(pathToNewCsv), StandardCharsets.UTF_8);

            String row;
            //first row
            row = csvReader.readLine();
            fstream.append(row+",place_id\n");
            while ((row = csvReader.readLine()) != null) {
                String address = row;
                GeocodingResult[] results =  GeocodingApi.geocode(context,
                        address).await();
                Gson gson = new GsonBuilder().setPrettyPrinting().create();
                String place_id = "place_id:"+results[0].placeId;
                fstream.append(row+","+place_id+"\n");
            }
            csvReader.close();
        } catch (IOException | ApiException | InterruptedException e) {
            e.printStackTrace();
        }


    }

    @Test
    public void randomTest(){
        double d1 = (double)5/3;double d2 = (double)(5/3);double d3 = 5/(double)3;
        System.out.println(d2+","+d3);
    }

}
