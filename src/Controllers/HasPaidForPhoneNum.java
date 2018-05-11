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
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        try {
            HeaderUtilities.setHttpServletResponseHeader(response);
            JSONObject requestInJson = (JSONObject) request.getAttribute("requestInJson");
            String houseId = requestInJson.get("houseId").toString();
            JSONObject jsonResponse = new JSONObject().put("authenticated", "true");
            IndividualUser loggedInUser = (IndividualUser) request.getAttribute("user");
            if (loggedInUser != null) {
                if (UserDAO.userHasPaidToSeePhoneNumber(loggedInUser.getId(), houseId)) {
                    jsonResponse.put("result", "true");
                } else {
                    jsonResponse.put("result", "false");
                }
                DAOUtils.sendResponse(response, jsonResponse);
            }
        }catch (Exception e){
            DAOUtils.sendResponse(response, new JSONObject().put("serverError", true));
        }
    }
}
