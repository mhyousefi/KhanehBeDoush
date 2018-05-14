package Controllers;

import Constants.Constants;
import DAO.DAOUtils;
import DAO.UserDAO;
import Entities.IndividualUser;
import Utilities.HeaderUtilities;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;

/*
*
* {
	"credit" : 2000
}
* */

@WebServlet("/increaseCredit")
public class IncreaseCreditFormAction extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response){
        try {
            HeaderUtilities.setHttpServletResponseHeader(response);
            HttpClient client = HttpClientBuilder.create().build();
            HttpPost post = createHttpPost();
            JSONObject jsonResponse = new JSONObject().put("authenticated", "true");
            IndividualUser loggedInUser = (IndividualUser) request.getAttribute("user");
            String creditIncrementValue = ((JSONObject) request.getAttribute("requestInJson")).get("credit").toString();
            JSONObject requestParams = createRequestParams(loggedInUser.getPhone(), creditIncrementValue);
            post.setEntity(new StringEntity(requestParams.toString(), "UTF-8"));
            HttpResponse bankResponse = client.execute(post);
            String responseTxt = EntityUtils.toString(bankResponse.getEntity());
            if (DAOUtils.responseIsSuccessful(responseTxt)) {
                UserDAO.increaseCreditOfUser(loggedInUser, Float.parseFloat(creditIncrementValue));
                jsonResponse.put("response", "true");
            } else {
                jsonResponse.put("response", "false");
            }
            DAOUtils.sendResponse(response, jsonResponse);
        }catch (Exception e){
            JSONObject responseInJson = new JSONObject().put("invalidInput", false);
            responseInJson.put("serverError", true);
            DAOUtils.sendResponse(response, responseInJson);
        }
    }

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
    }

    private  JSONObject createRequestParams (String userId, String creditIncrementValue) {
        HashMap<String, String> jsonValues = new HashMap<>();
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
