import Constants.Constants;
import Constants.PersianContent;
import Entities.Database;
import Entities.IndividualUser;
import Utilities.JSONFunctions;
import org.json.JSONObject;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/showHousePhoneNumber")
public class ShowHousePhoneNumberAction extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        JSONObject requestInJson = JSONFunctions.createJSONObjectFromRequest(request);
        IndividualUser loggedInUser = Database.getUser(Constants.getConstant("USERNAME"));
        String houseId = requestInJson.get("houseId").toString();
        JSONObject jsonResponse = new JSONObject();
        if (loggedInUser.hasPaidToSeePhoneNumber(houseId)) {
            jsonResponse.put("status", true);
            jsonResponse.put("balance", loggedInUser.getBalance());
        }else if (loggedInUser.hasEnoughBalance(Constants.getConstant("PRICE_TO_SEE_PHONE_NUMBER"))) {
            loggedInUser.payToSeePhoneNumber(houseId);
            jsonResponse.put("status", true);
            jsonResponse.put("balance", loggedInUser.getBalance());
        } else {
            jsonResponse.put("status", false);
            jsonResponse.put("balance", loggedInUser.getBalance());
        }
        try{
            PrintWriter out = response.getWriter();
            out.print(jsonResponse);
            out.flush();
        }catch (Exception ignored){}
    }

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
    }
}
