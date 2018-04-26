import DAO.DAOUtils;
import DAO.UserDAO;
import Entities.IndividualUser;

import Utilities.JSONFunctions;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

import java.io.*;
import java.sql.SQLException;
import java.util.HashMap;
import javax.naming.NamingException;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import Constants.Constants;
import org.json.JSONObject;

/*
*
* {
	"credit" : 2000
}
* */

@WebServlet("/increaseCredit")
public class IncreaseCreditFormAction extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.addHeader("Accept-Language", "en-ca,en,fa");
        response.setCharacterEncoding("UTF-8");
        JSONObject requestInJson = JSONFunctions.createJSONObjectFromRequest(request);
        HttpClient client = HttpClientBuilder.create().build();
        HttpPost post = createHttpPost();
        JSONObject jsonResponse = new JSONObject();
        try {
            IndividualUser loggedInUser = UserDAO.getIndividualUserById("1");
            String creditIncrementValue = requestInJson.get("credit").toString();
            JSONObject requestParams = createRequestParams(loggedInUser.getPhone(), creditIncrementValue);
            post.setEntity(new StringEntity(requestParams.toString(), "UTF8"));
            HttpResponse bankResponse = client.execute(post);
            String responseTxt = EntityUtils.toString(bankResponse.getEntity());
            if (DAOUtils.responseIsSuccessful(responseTxt)) {
                UserDAO.increaseCreditOfUser(loggedInUser, Float.parseFloat(creditIncrementValue));
                jsonResponse.put("response", "true");
            }
            else {
                jsonResponse.put("response", "false");
            }

        } catch (NamingException | SQLException e) {
            jsonResponse.put("Exception", e.getMessage());
            e.printStackTrace();
        }
        DAOUtils.sendResponse(response, jsonResponse);

    }

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
    }

    private  JSONObject createRequestParams (String userId, String creditIncrementValue) {
        HashMap<String, String> jsonValues = new HashMap<String, String>();
        jsonValues.put("userId", userId);
        jsonValues.put("value", creditIncrementValue);
        return new JSONObject(jsonValues);
    }

    private static HttpPost createHttpPost () {
        HttpPost post = new HttpPost(Constants.getConstant("BANK_POST_URL"));
        post.setHeader("Content-Type", "application/json");
        post.setHeader("apiKey", Constants.getConstant("API_KEY"));
        return post;
    }
}
