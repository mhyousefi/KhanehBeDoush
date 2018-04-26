import DAO.DAOUtils;
import DAO.UserDAO;
import Entities.IndividualUser;
import org.json.JSONObject;

import javax.naming.NamingException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/currentCredit")
public class CurrentCredit extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.addHeader("Accept-Language", "en-ca,en,fa");
        response.setCharacterEncoding("UTF-8");
        try {
            IndividualUser user = UserDAO.getIndividualUserById("1");
            JSONObject jsonResponse = new JSONObject();
            if (user != null) {
                jsonResponse.put("currentCredit", user.getBalance());
            }
            DAOUtils.sendResponse(response, jsonResponse);
        } catch (NamingException | SQLException e) {
            e.printStackTrace();
        }
    }
}
