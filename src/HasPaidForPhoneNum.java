import DAO.DAOUtils;
import DAO.UserDAO;
import Entities.IndividualUser;
import Utilities.JSONFunctions;
import org.json.JSONObject;

import javax.naming.NamingException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/hasPaidForPhoneNum")
public class HasPaidForPhoneNum extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.addHeader("Accept-Language", "en-ca,en,fa");
        response.setCharacterEncoding("UTF-8");
        JSONObject requestInJson = JSONFunctions.createJSONObjectFromRequest(request);
        String houseId = requestInJson.get("houseId").toString();
        JSONObject jsonResponse = new JSONObject();
        try {
            IndividualUser loggedInUser = UserDAO.getIndividualUserById("1");
            if(loggedInUser != null) {
                if (UserDAO.userHasPaidToSeePhoneNumber(loggedInUser.getId(), houseId)) {
                    jsonResponse.put("result", "true");
                } else {
                    jsonResponse.put("result", "false");
                }
                DAOUtils.sendResponse(response, jsonResponse);
            }
        } catch (NamingException | SQLException e) {
            e.printStackTrace();
        }
    }
}
