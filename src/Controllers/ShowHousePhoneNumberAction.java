package Controllers;

import Constants.Constants;
import DAO.DAOUtils;
import DAO.UserDAO;
import Entities.IndividualUser;
import Utilities.HeaderUtilities;
import Utilities.JSONFunctions;
import org.json.JSONObject;
import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/showHousePhoneNumber")
public class ShowHousePhoneNumberAction extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HeaderUtilities.setHttpServletResponseHeader(response);
        JSONObject requestInJson = JSONFunctions.createJSONObjectFromRequest(request);
        String houseId = requestInJson.get("houseId").toString();
        JSONObject resultOfQueryToACMServer = DAOUtils.queryToAcmServer(houseId);
        if(!resultOfQueryToACMServer.has("data")){
            JSONObject responseToClient = new JSONObject();
            responseToClient.put("exists", false);
            DAOUtils.sendResponse(response, responseToClient);
        }else{
            try {
                IndividualUser loggedInUser = UserDAO.getIndividualUserById("1");
                JSONObject responseToClient = checkUserPermissionToSeeTheDetails(houseId, loggedInUser);
                DAOUtils.sendResponse(response, responseToClient);
            } catch (NamingException | SQLException e) {
                String msg = e.getLocalizedMessage();
                DAOUtils.sendResponse(response, new JSONObject().put("Exception", msg));
                e.printStackTrace();
            }
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
