package Controllers;

import DAO.DAOUtils;
import DAO.UserDAO;
import Entities.IndividualUser;
import Utilities.HeaderUtilities;
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
        HeaderUtilities.setHttpServletResponseHeader(response);
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
