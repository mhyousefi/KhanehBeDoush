package Controllers;

import Constants.PersianContent;
import Entities.House;
import Utilities.HeaderUtilities;
import Utilities.HouseFactory;
import Utilities.JSONFunctions;
import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;


/*
*
*
* {
	"area" : "100",
	"buildingType" : "آپارتمان",
	"dealType" : "sale",
	"price" : "100000000",
	"phoneNumber" : "09102242927",
	"description" : "a classical house",
	"address" : "somewhere in tehran"
}
*
* */

@WebServlet("/addHouse")
public class AddHouseAction extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HeaderUtilities.setHttpServletResponseHeader(response);
        PrintWriter out = response.getWriter();
        JSONObject requestInJson = JSONFunctions.createJSONObjectFromRequest(request);
        String area = requestInJson.get("area").toString();
        String buildingType = requestInJson.get("buildingType").toString();
        String noPicURL = "/images/no-pic.jpg";
        String dealType = requestInJson.get("dealType").toString();
        if(dealType.equals("sale")){
            dealType = PersianContent.getPhrase("SALE");
        }else if(dealType.equals("rental")){
            dealType = PersianContent.getPhrase("RENTAL");
        }
        String price = requestInJson.get("price").toString();
        String address = requestInJson.get("address").toString();
        String id = "";
        JSONObject jsonResponse = new JSONObject();
        House newHouse = HouseFactory.createHouseForUserInput(area, buildingType, noPicURL, dealType,
                price, address, id);
        //Database.addHouse(newHouse);
        jsonResponse.put("response", "true");
        out.print(jsonResponse);
        out.flush();
    }
}
