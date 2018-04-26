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
    private static HashMap<String, IndividualUser> users;
    private static HashMap<String, House> houses;
    private static HashMap<String, House> lastSearchResults;

    static {
        users = new HashMap<String, IndividualUser>();
        houses = new HashMap<String, House>();
        lastSearchResults = new HashMap<String, House>();

        users.put("bHomayoun", new IndividualUser("1 ","بهنام همایون", "09121102030", 0f, "bHomayoun", "key123"));
    }

    public static IndividualUser getUser(String username) {
        return users.get(username);
    }

    public static void addHouse(House house) {
        Database.houses.put(house.getId(), house);
    }

    public static House getHouseById(String id){ return Database.houses.get(id); }

    public static House getSearchedHouse(String houseId) {
        return lastSearchResults.get(houseId);
    }

    public static ArrayList<House> searchHouses(String minArea, String maxPrice, String dealType, String propertyType) throws ServletException, IOException {
        lastSearchResults.clear();
        ArrayList<House> result = new ArrayList<House>();
//        addMatchingHousesFromAcmServer(minArea, maxPrice, dealType, propertyType, result);
        addMatchingLocalHouses(minArea, maxPrice, dealType, propertyType, result);
        return result;
    }

    private static void addMatchingLocalHouses(String minArea, String maxPrice, String dealType, String propertyType, ArrayList<House> result) throws IOException {
        House house;
        for (Map.Entry<String, House> e: houses.entrySet()) {
            house = e.getValue();
            if (house.meetsSearchCriteria(minArea, maxPrice, dealType, propertyType)) {
                lastSearchResults.put(house.getId(), house);
                result.add(house);
            }
        }
    }

//    private static void addMatchingHousesFromAcmServer(String minArea, String maxPrice, String dealType, String propertyType, ArrayList<House> result) throws IOException {
//        House house, houseToBeAdded = null;
//        JSONObject temp;
//
//        JSONObject jsonResponse = queryToAcmServer("");
//        if (serverResponseIsValid(jsonResponse)) {
//            JSONArray data = jsonResponse.getJSONArray("data");
//            for (int i = 0; i < data.length(); i++) {
//                house = createHouseObj(data.getJSONObject(i));
//                if (house != null) {
//                    if (house.meetsSearchCriteria(minArea, maxPrice, dealType, propertyType)) {
//                        String houseId = data.getJSONObject(i).get("id").toString();
//                        temp = queryToAcmServer(houseId);
//
//                        if (serverResponseIsValid(temp))
//                            houseToBeAdded = createHouseObj(temp.getJSONObject("data"));
//                        if (!serverResponseIsValid(temp) || houseToBeAdded == null)
//                            continue;
//
//                        houseToBeAdded.setId(houseId);
//                        lastSearchResults.put(houseToBeAdded.getId(), houseToBeAdded);
//                        result.add(houseToBeAdded);
//                    }
//                }
//            }
//        }
//    }



//    private static JSONObject queryToAcmServer(String id) throws IOException {
//        HttpClient client = HttpClientBuilder.create().build();
//        String requestUrl = Constants.getConstant("ACM_SERVER_URL");
//        if (!id.equals("")) {
//            requestUrl += ("/" + id);
//        }
//        HttpGet get = new HttpGet(requestUrl);
//        get.addHeader("Accept-Language", "en-ca,en,fa");
//        HttpResponse acmResponse = client.execute(get);
//        String stringResponse = EntityUtils.toString(acmResponse.getEntity());
//        return new JSONObject(stringResponse);
//    }

    private static boolean serverResponseIsValid(JSONObject jsonResponse) {
        if (jsonResponse.has("result") && jsonResponse.has("data")) {
            if (jsonResponse.get("result").toString().equals("OK")) {
                return true;
            }
        }
        return false;
    }
}
