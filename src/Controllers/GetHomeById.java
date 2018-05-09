package Controllers;

import DAO.DAOUtils;
import Utilities.HeaderUtilities;
import Utilities.JSONFunctions;
import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebServlet("/getHomeById")
public class GetHomeById extends HttpServlet{
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HeaderUtilities.setHttpServletResponseHeader(response);
        JSONObject requestInJson = JSONFunctions.createJSONObjectFromRequest(request);
        String houseID = requestInJson.get("houseId").toString();
        JSONObject jsonResponse = DAOUtils.queryToAcmServer(houseID);
        if(!jsonResponse.has("data")){
            DAOUtils.sendResponse(response, new JSONObject().put("noResult", ""));
        }else {
            JSONObject data = jsonResponse.getJSONObject("data");
            JSONObject jsonToSend = specifyPriceDetails(data);
            DAOUtils.sendResponse(response, jsonToSend);
        }
    }

    private static JSONObject specifyPriceDetails(JSONObject jsonResponse){
        JSONObject price = jsonResponse.getJSONObject("price");
        if(jsonResponse.getInt("dealType") == 0){
            String sellingPrice = String.valueOf(price.get("sellPrice"));
            jsonResponse.put("sellingPrice", sellingPrice);
        }else {
            String basePrice = String.valueOf(price.get("basePrice")),
                    rentPrice = String.valueOf(price.get("rentPrice"));
            jsonResponse.put("basePrice", basePrice);
            jsonResponse.put("rentPrice", rentPrice);
        }
        jsonResponse.remove("price");
        return jsonResponse;
    }
}
