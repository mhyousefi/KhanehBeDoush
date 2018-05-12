package Controllers;

import DAO.DAOUtils;
import Entities.IndividualUser;
import Utilities.HeaderUtilities;
import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/currentCredit")
public class CurrentCredit extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            HeaderUtilities.setHttpServletResponseHeader(response);
            IndividualUser user = (IndividualUser) request.getAttribute("user");
            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("currentCredit", user.getBalance());
            DAOUtils.sendResponse(response, jsonResponse);
        }catch (Exception e){
            response.setStatus(500);
            DAOUtils.sendResponse(response, null);
        }
    }
}
