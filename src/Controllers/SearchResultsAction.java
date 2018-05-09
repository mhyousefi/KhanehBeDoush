package Controllers;

import Constants.PersianContent;
import DAO.DAOUtils;
import DAO.HouseDAO;
import Entities.House;
import Utilities.HeaderUtilities;
import Utilities.JSONFunctions;
import org.json.JSONObject;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;


/*
*
* {
	"minArea" : "",
	"maxPrice" : 100000,
	"dealType" : "sale",
	"propertyType" : ""
}
*
* */

@WebServlet("/searchResults")
public class SearchResultsAction extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        try {
            HeaderUtilities.setHttpServletResponseHeader(response);
            JSONObject requestInJson = JSONFunctions.createJSONObjectFromRequest(request);
            String minArea = requestInJson.get("minArea").toString();
            String maxPrice = requestInJson.get("maxPrice").toString();
            String tempValueForDealType = requestInJson.get("dealType").toString();
            String dealType = tempValueForDealType.equals("sale") ?
                                PersianContent.getPhrase("SALE") : tempValueForDealType.equals("rental") ?
                                PersianContent.getPhrase("RENTAL") : tempValueForDealType;
            String propertyTypeTempValue = requestInJson.get("propertyType").toString();
            String propertyType = propertyTypeTempValue.equals("apartment") ? PersianContent.getPhrase("APARTMENT") :
                                    propertyTypeTempValue.equals("villa")  ? PersianContent.getPhrase("VILLA") : propertyTypeTempValue;
            try {
                ArrayList<House> searchResults;
                searchResults = HouseDAO.searchHouses(minArea, maxPrice, dealType, propertyType);
                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("results", searchResults);
                jsonResponse.put("dealType", dealType);
                response.setContentType("application/json");
                DAOUtils.sendResponse(response, jsonResponse);
            }catch (Exception ignored){

            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
