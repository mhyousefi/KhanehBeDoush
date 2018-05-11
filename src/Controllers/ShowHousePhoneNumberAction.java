package Controllers;

import Constants.Constants;
import DAO.DAOUtils;
import DAO.UserDAO;
import Entities.IndividualUser;
import Utilities.HeaderUtilities;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/showHousePhoneNumber")
public class ShowHousePhoneNumberAction extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        try {
            HeaderUtilities.setHttpServletResponseHeader(response);
            JSONObject requestInJson = (JSONObject)request.getAttribute("requestInJson");
            String houseId = requestInJson.get("houseId").toString();
            JSONObject resultOfQueryToACMServer = DAOUtils.queryToAcmServer(houseId);
            if(!resultOfQueryToACMServer.has("data")){
                JSONObject responseToClient = new JSONObject().put("authenticated", "true");
                responseToClient.put("exists", false);
                DAOUtils.sendResponse(response, responseToClient);
            }else{
                IndividualUser loggedInUser = (IndividualUser) request.getAttribute("user");
                JSONObject responseToClient = checkUserPermissionToSeeTheDetails(houseId, loggedInUser);
                responseToClient.put("authenticated", "true");
                DAOUtils.sendResponse(response, responseToClient);
            }
        }catch (Exception e){
            DAOUtils.sendResponse(response, new JSONObject().put("serverError", e.getMessage()));
        }
    }

    private static JSONObject paidToSeeAnswer(Float balanceOfUser){
        JSONObject responseToClient = new JSONObject();
        responseToClient.put("exists", true);
        responseToClient.put("status", true);
        responseToClient.put("balance", balanceOfUser);
        return responseToClient;
    }

    private static JSONObject payToSeeAnswer(IndividualUser loggedInUser, String houseId){
        JSONObject responseToClient = new JSONObject();
        UserDAO.payToSeeTheDetailsOfTheHouse(loggedInUser, houseId);
        responseToClient.put("exists", true);
        responseToClient.put("status", true);
        responseToClient.put("balance", loggedInUser.getBalance());
        return responseToClient;
    }

    private static JSONObject noBalanceToSeeAnswer(Float balanceOfUser){
        JSONObject responseToClient = new JSONObject();
        responseToClient.put("exists", true);
        responseToClient.put("status", false);
        responseToClient.put("balance", balanceOfUser);
        return responseToClient;
    }


    private static JSONObject checkUserPermissionToSeeTheDetails(String houseId, IndividualUser loggedInUser) {
        if(loggedInUser != null){
            if (UserDAO.userHasPaidToSeePhoneNumber(loggedInUser.getId(), houseId))
                return paidToSeeAnswer(loggedInUser.getBalance());
            if (loggedInUser.hasEnoughBalance(Constants.getConstant("PRICE_TO_SEE_PHONE_NUMBER")))
                return payToSeeAnswer(loggedInUser, houseId);
            return noBalanceToSeeAnswer(loggedInUser.getBalance());
        }
        return new JSONObject().put("exists", false);
    }


    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
    }

}
