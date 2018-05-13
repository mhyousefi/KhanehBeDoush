package Controllers;

import DAO.DAOUtils;
import Entities.IndividualUser;
import Utilities.HeaderUtilities;
import Utilities.JSONFunctions;
import org.json.JSONObject;

import javax.naming.NamingException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;

import static DAO.UserDAO.findUser;
import static DAO.UserDAO.getIndividualUserById;
import static Utilities.TokenUtilities.createTokenForUser;

@WebServlet("/login")
public class LogIn extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response){
        try {
            HeaderUtilities.setHttpServletResponseHeader(response);
            JSONObject requestInJson = JSONFunctions.createJSONObjectFromRequest(request);
            String[] generatedResult = generateTokenIfUserNameAndPasswordAreTrue(requestInJson.getString("username"),
                    requestInJson.getString("password"), requestInJson.getString("phoneNumber"));
            if(generatedResult[0].equals("invalidUsernameAndPassword")) {
                JSONObject responseInJson = new JSONObject().put("invalidInput", true);
                responseInJson.put("serverError", false);
                DAOUtils.sendResponse(response, responseInJson);
                return;
            }
            if(!generatedResult[0].equals("error")) {
                DAOUtils.sendResponse(response, createJsonResponse(generatedResult));
            }else {
                JSONObject responseInJson = new JSONObject().put("invalidInput", false);
                responseInJson.put("serverError", true);
                DAOUtils.sendResponse(response, responseInJson);
            }
        }catch (Exception e){
            JSONObject responseInJson = new JSONObject().put("invalidInput", false);
            responseInJson.put("serverError", true);
            DAOUtils.sendResponse(response, responseInJson);
        }
    }

    private static JSONObject createJsonResponse(String[] generatedStringArray) throws SQLException, NamingException {
        IndividualUser loggedInUser = getIndividualUserById(generatedStringArray[1]);
        JSONObject jsonResponse = new JSONObject().put("token", generatedStringArray[0]);
        jsonResponse.put("name", loggedInUser.getName());
        jsonResponse.put("credit", loggedInUser.getBalance());
        return jsonResponse;
    }

    private static String[] generateTokenIfUserNameAndPasswordAreTrue(String username, String password, String phoneNumber) throws InvalidKeyException, NoSuchAlgorithmException, SQLException, NamingException {
        String userId;
        if((userId = findUser(username, password, phoneNumber)).equals("invalidUsernameAndPassword"))
            return new String[]{"invalidUsernameAndPassword", ""};
        if(userId.contains("error"))
            return new String[]{"error", ""};
        return new String[]{createTokenForUser(userId), userId};
    }
}
