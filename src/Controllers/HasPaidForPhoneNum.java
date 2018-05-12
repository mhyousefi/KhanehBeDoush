package Controllers;

import DAO.DAOUtils;
import DAO.UserDAO;
import Entities.IndividualUser;
import Utilities.HeaderUtilities;
import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
            response.setStatus(500);
            DAOUtils.sendResponse(response, null);
        }
    }
}
