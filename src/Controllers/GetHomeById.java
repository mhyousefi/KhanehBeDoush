package Controllers;

import DAO.DAOUtils;
import Utilities.HeaderUtilities;
import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebServlet("/getHomeById")
public class GetHomeById extends HttpServlet{
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            HeaderUtilities.setHttpServletResponseHeader(response);
            JSONObject requestInJson = (JSONObject) request.getAttribute("requestInJson");
            String houseID = requestInJson.get("houseId").toString();
            JSONObject jsonResponse = DAOUtils.queryToAcmServer(houseID);
            if(!jsonResponse.has("data")){
                JSONObject jsonToSend = new JSONObject().put("authenticated", "true");
                jsonToSend.put("noResult", "");
                DAOUtils.sendResponse(response, jsonToSend);
            }else {
                JSONObject data = jsonResponse.getJSONObject("data");
                DAOUtils.sendResponse(response, specifyPriceDetails(data));
            }
        }catch (Exception e){
            DAOUtils.sendResponse(response, new JSONObject().put("serverError", e.getMessage()));
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
        jsonResponse.put("authenticated", "true");
        return jsonResponse;
    }
}
