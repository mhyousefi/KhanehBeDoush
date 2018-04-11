import Constants.Constants;
import Entities.Database;
import Entities.IndividualUser;
import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/currentCredit")
public class CurrentCredit extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        IndividualUser user = Database.getUser(Constants.getConstant("USERNAME"));
        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("currentCredit", user.getBalance());
        PrintWriter out = response.getWriter();
        out.print(jsonResponse);
        out.flush();
    }
}