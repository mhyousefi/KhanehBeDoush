import Constants.PersianContent;
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
import java.util.ArrayList;


@WebServlet("/searchResults")
public class SearchResultsAction extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        try {
            response.setCharacterEncoding("UTF-8");
            response.addHeader("Accept-Language", "en-ca,en,fa");
            JSONObject requestInJson = JSONFunctions.createJSONObjectFromRequest(request);
            String minArea = requestInJson.get("minArea").toString();
            String maxPrice = requestInJson.get("maxPrice").toString();
            String tempValueForDealType = requestInJson.get("dealType").toString();
            String dealType = tempValueForDealType.equals("sale") ?
                                PersianContent.getPhrase("SALE") : tempValueForDealType.equals("rental") ?
                                PersianContent.getPhrase("RENTAL") : tempValueForDealType;
            String propertyType = requestInJson.get("propertyType").toString();
            try {
                ArrayList<House> searchResults;
                searchResults = Database.searchHouses(minArea, maxPrice, dealType, propertyType);
                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("results", searchResults);
                response.setContentType("application/json");
                PrintWriter out = response.getWriter();
                out.print(jsonResponse);
                out.flush();
            }catch (Exception ignored){

            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
