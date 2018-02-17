package Entities;

import Constants.Constants;
import Utilities.HouseFactory;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.ServletException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Database {
    public static HashMap<String, IndividualUser> users;
    public static HashMap<String, House> houses;
    public static HashMap<String, House> searchResults;

    static {
        users = new HashMap<String, IndividualUser>();
        houses = new HashMap<String, House>();
        users.put("bHomayoun", new IndividualUser("بهنام همایون", "09121102030", new Float(0), "bHomayoun", "key123"));

        houses.put("0", new House("120", "house", "no_image", "sell", "0", "0", "1000000000",
                "12345", "very good", "many years later...", "here!"));
        houses.put("1", new House("130", "apartment", "no_image", "rent", "100000000", "2000000", "0",
                "151617", "divided against itself...", "next year", "there!"));
        houses.put("2", new House("110", "apartment", "no_image", "sell", "0", "0", "900000000",
                "15938767", "divided against itself...", "next year", "there it is!"));
    }

    public static IndividualUser getUser(String username) {
        return users.get(username);
    }

    public static void addHouse(House house) {
        Database.houses.put(house.getId(), house);
    }

    public static House getHouse(String houseId) {
        return searchResults.get(houseId);
    }

    public static ArrayList<House> searchHouses(String minArea, String maxPrice, String dealType, String propertyType) throws ServletException, IOException {
        ArrayList<House> result = new ArrayList<House>();
        addMatchingHousesFromAcmServer(minArea, maxPrice, dealType, propertyType, result);
        addMatchingLocalHouses(minArea, maxPrice, dealType, propertyType, result);
        return result;
    }

    private static void addMatchingLocalHouses(String minArea, String maxPrice, String dealType, String propertyType, ArrayList<House> result) throws IOException {
        House house;
        for (Map.Entry<String, House> e: houses.entrySet()) {
            house = e.getValue();
            if (house.meetsSearchCriteria(minArea, maxPrice, dealType, propertyType)) {
                result.add(house);
            }
        }
    }

    private static void addMatchingHousesFromAcmServer(String minArea, String maxPrice, String dealType, String propertyType, ArrayList<House> result) throws IOException {
        JSONObject jsonHouseToBeAdded;
        House house;

        JSONObject jsonResponse = queryToAcmServer("");
        if (serverResponseIsValid(jsonResponse)) {
            JSONArray data = jsonResponse.getJSONArray("data");
            for (int i = 0; i < data.length(); i++) {
                house = createHouseObj(data.getJSONObject(i));
                if (house.meetsSearchCriteria(minArea, maxPrice, dealType, propertyType)) {
                    String houseId = data.getJSONObject(i).get("id").toString();
                    jsonHouseToBeAdded = queryToAcmServer(houseId);
                    result.add(createHouseObj(jsonHouseToBeAdded));
                }
            }
        }
    }

    private static House createHouseObj(JSONObject house) {
        String area = house.get("area").toString();
        String buildingType = house.get("buildingType").toString();
        String noPicURL = Constants.getConstant("NO_PIC_URL");
        String price = house.get("price").toString();
        String dealType = house.get("dealType").toString();
        String phoneNumber = house.get("phoneNumber").toString();
        String description = house.get("info").toString();
        String address = house.get("address").toString();
        return HouseFactory.createHouse(area, buildingType, noPicURL, dealType, price, phoneNumber, description, address);
    }

    private static JSONObject queryToAcmServer(String id) throws IOException {
        HttpClient client = HttpClientBuilder.create().build();
        String requestUrl = Constants.getConstant("AcmServerURL");
        if (!id.equals("")) {
            requestUrl += ("/" + id);
        }
        HttpGet get = new HttpGet(requestUrl);
        HttpResponse acmResponse = client.execute(get);
        String stringResponse = EntityUtils.toString(acmResponse.getEntity());
        return new JSONObject(stringResponse);
    }

    private static boolean serverResponseIsValid(JSONObject jsonResponse) {
        if (jsonResponse.has("result")) {
            if (jsonResponse.get("result").toString().equals("OK")) {
                return true;
            }
        }
        return false;
    }

    private void setPriceValues(JSONObject priceInfo, String basePrice, String rentPrice, String sellingPrice) {
        if (priceInfo.has("sellPrice")) {
            sellingPrice = priceInfo.get("sellPrice").toString();
            basePrice = "0";
            rentPrice = "0";
            return;
        }

        sellingPrice = "0";
        basePrice = priceInfo.get("basePrice").toString();
        rentPrice = priceInfo.get("rentPrice").toString();
    }
}
