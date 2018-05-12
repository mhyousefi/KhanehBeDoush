package Controllers;

import DAO.DAOUtils;
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
import static Utilities.TokenUtilities.createTokenForUser;

@WebServlet("/login")
public class LogIn extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response){
        try {
            HeaderUtilities.setHttpServletResponseHeader(response);
            JSONObject requestInJson = JSONFunctions.createJSONObjectFromRequest(request);
            String generatedToken = generateTokenIfUserNameAndPasswordAreTrue(requestInJson.getString("username"),
                    requestInJson.getString("password"), requestInJson.getString("phoneNumber"));
            if(generatedToken.equals("invalidUsernameAndPassword")) {
                DAOUtils.sendResponse(response, new JSONObject().put("invalidUsernameAndPassword", true));
                return;
            }
            if(generatedToken.equals("error")) {
                DAOUtils.sendResponse(response, new JSONObject().put("severError", true));
                return;
            }
            DAOUtils.sendResponse(response, new JSONObject().put("token", generatedToken));
        }catch (Exception e){
            DAOUtils.sendResponse(response, new JSONObject().put("severError", e.getMessage()));
        }
    }

    private static String generateTokenIfUserNameAndPasswordAreTrue(String username, String password, String phoneNumber) throws InvalidKeyException, NoSuchAlgorithmException, SQLException, NamingException {
        String userId;
        if((userId = findUser(username, password, phoneNumber)).equals("invalidUsernameAndPassword"))
            return "invalidUsernameAndPassword";
        if(userId.contains("error"))
            return userId;
        return createTokenForUser(userId);
    }
}
