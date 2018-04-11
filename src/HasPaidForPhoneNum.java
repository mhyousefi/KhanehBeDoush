import Constants.Constants;
import Entities.Database;
import Entities.IndividualUser;
import Utilities.JSONFunctions;
import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/hasPaidForPhoneNum")
public class HasPaidForPhoneNum extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        JSONObject requestInJson = JSONFunctions.createJSONObjectFromRequest(request);
        String houseId = requestInJson.get("houseId").toString();
        JSONObject jsonResponse = new JSONObject();
        IndividualUser loggedInUser = Database.getUser(Constants.getConstant("USERNAME"));
        if(loggedInUser.hasPaidToSeePhoneNumber(houseId)){
            jsonResponse.put("result", "true");
        }else {
            jsonResponse.put("result", "false");
        }
        PrintWriter out = response.getWriter();
        out.print(jsonResponse);
        out.flush();
    }
}
