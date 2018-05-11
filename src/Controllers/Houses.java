package Controllers;

import DAO.DAOUtils;
import Entities.IndividualUser;
import Utilities.HeaderUtilities;
import org.json.JSONObject;

import javax.naming.NamingException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;
import java.util.ArrayList;

import static DAO.UserDAO.getListOfHousesForAdmin;
import static DAO.UserDAO.getListOfHousesForNormalUser;

@WebServlet("/houses")
public class Houses extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response){
        try {
            HeaderUtilities.setHttpServletResponseHeader(response);
            IndividualUser loggedInUser = (IndividualUser) request.getAttribute("user");
            responseForNormalUser(loggedInUser, response);
            JSONObject requestInJson = (JSONObject) request.getAttribute("requestInJson");
            responseForAdmin(loggedInUser, response, new int[]{requestInJson.getInt("lowerRange"), requestInJson.getInt("upperRange")});
        }catch (Exception e){
            DAOUtils.sendResponse(response, new JSONObject().put("serverError", e.getMessage()));
        }
    }

    private static void responseForAdmin(IndividualUser loggedInUser, HttpServletResponse response, int[] ranges) throws SQLException, NamingException {
        if(!loggedInUser.isAdmin())
            return;
        if(!rangesAreValid(ranges)){
            DAOUtils.sendResponse(response, new JSONObject().put("invalidRanges", true));
            return;
        }
        JSONObject responseInJson = new JSONObject().put("results", getListOfHousesForAdmin(ranges));
        responseInJson.put("authenticated", true);
        DAOUtils.sendResponse(response, responseInJson);
    }

    private static boolean rangesAreValid(int[]ranges) {
        return ranges[0] >= 0 && ranges[1] >= 0 && ranges[1] - ranges[0] <= 10;
    }

    private static void responseForNormalUser(IndividualUser loggedInUser, HttpServletResponse response) throws SQLException, NamingException {
        if(loggedInUser.isAdmin())
            return;
        ArrayList<String> results = getListOfHousesForNormalUser(loggedInUser.getId());
        DAOUtils.sendResponse(response, new JSONObject().put("results", results));
    }
}
