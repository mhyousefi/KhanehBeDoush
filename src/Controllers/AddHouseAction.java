package Controllers;

import DAO.DAOUtils;
import Entities.House;
import Utilities.HeaderUtilities;
import org.json.JSONObject;

import javax.naming.NamingException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import static DAO.HouseDAO.insertNewHouse;
import static Utilities.HouseFactory.createHouseForUserInput;


/*
*
*
* {
	"area" : "100",
	"buildingType" : "apartment",
	"dealType" : "sale",
	"sellingPrice" : "100000000",
	"phoneNumber" : "09102242927",
	"address" : "somewhere in tehran"
}
*
* */

@WebServlet("/addHouse")
public class AddHouseAction extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            HeaderUtilities.setHttpServletResponseHeader(response);
            JSONObject requestInJson = (JSONObject) request.getAttribute("requestInJson");
            ArrayList<String> values = validateAndAddValues(requestInJson);
            if(values != null) {
                insertNewHouse(values);
                DAOUtils.sendResponse(response, new JSONObject().put("status", true));
            } else {
                JSONObject responseInJson = new JSONObject().put("invalidInput", true);
                responseInJson.put("serverError", false);
                DAOUtils.sendResponse(response, responseInJson);
            }
        }catch (Exception e){
            JSONObject responseInJson = new JSONObject().put("invalidInput", false);
            responseInJson.put("serverError", true);
            responseInJson.put("msg", e.getLocalizedMessage());
            DAOUtils.sendResponse(response, responseInJson);
        }
    }

    private static boolean hasAllValues(JSONObject requestInJson){
        if(!requestInJson.has("area"))
            return false;
        if (!requestInJson.has("buildingType"))
            return false;
        if (!requestInJson.has("dealType"))
            return false;
        return requestInJson.has("address");
    }

    private static boolean valuesAreValid(JSONObject requestInJson){
        if(!hasAllValues(requestInJson))
            return false;
        if(!(requestInJson.get("dealType").toString().equals("sale") || requestInJson.get("dealType").toString().equals("rental")))
            return false;
        if(requestInJson.get("dealType").toString().equals("sale") && !requestInJson.has("sellingPrice"))
            return false;
        if(requestInJson.get("dealType").toString().equals("rental") && (!requestInJson.has("rentPrice") || !requestInJson.has("basePrice")))
            return false;
        return requestInJson.get("buildingType").toString().equals("apartment") || requestInJson.get("buildingType").toString().equals("villa");
    }

    private static ArrayList<String> addValues(House house){
        ArrayList<String> values = new ArrayList<>();
        values.add(house.getId());
        values.add(house.getArea());
        values.add(house.getBuildingType());
        values.add(house.getImageURL());
        values.add(house.getDealType());
        values.add(house.getBasePrice());
        values.add(house.getRentPrice());
        values.add(house.getSellingPrice());
        values.add("999999999");
        values.add(house.getAddress());
        values.add(house.getIsFromACMServer());
        return values;
    }

    private static ArrayList<String> validateAndAddValues(JSONObject requestInJson) throws SQLException, NamingException {
        if(!valuesAreValid(requestInJson))
            return null;
        String noPicURL = "/images/no-pic.jpg";
        String area = requestInJson.get("area").toString();
        String buildingType = requestInJson.get("buildingType").toString();
        String dealType = requestInJson.get("dealType").toString();
        String rentPrice = dealType.equals("rental") ? requestInJson.getString("rentPrice") : "0";
        String basePrice = dealType.equals("rental") ? requestInJson.getString("basePrice") : "0";
        String sellingPrice = dealType.equals("sale") ? requestInJson.getString("sellingPrice") : "0";
        String address = requestInJson.get("address").toString();
        House house = createHouseForUserInput(area, buildingType, noPicURL, dealType,
                sellingPrice, rentPrice, basePrice, address);
        return addValues(house);
    }
}
