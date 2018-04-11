import Entities.Database;
import Entities.House;
import Utilities.JSONFunctions;
import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;


@WebServlet("/getHomeById")
public class GetHomeById extends HttpServlet{
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setCharacterEncoding("UTF-8");
        response.addHeader("Accept-Language", "en-ca,en,fa");
        JSONObject requestInJson = JSONFunctions.createJSONObjectFromRequest(request);
        JSONObject jsonResponse = new JSONObject();
        String houseID = requestInJson.get("houseId").toString();
        House house = Database.getSearchedHouse(houseID);
        try {
            PrintWriter out = response.getWriter();
            if (house == null) {
                jsonResponse.put("noResult", "");
            }else{
                if (house.isForRent()) {
                    jsonResponse.put("basePrice", house.getBasePrice());
                    jsonResponse.put("rentPrice", house.getRentPrice());

                }else{
                    jsonResponse.put("sellingPrice", house.getSellingPrice());
                }
                jsonResponse.put("imageUrl", house.getImageURL());
                jsonResponse.put("area", house.getArea());
                jsonResponse.put("address", house.getAddress());
                jsonResponse.put("description", house.getDescription());
                jsonResponse.put("phoneNumber", house.getPhone());
                jsonResponse.put("dealType", house.getDealType());
                jsonResponse.put("propertyType", house.getBuildingType());
            }
            out.print(jsonResponse);
            out.flush();
        }catch (Exception e){
            e.getMessage();
        }
    }
}
