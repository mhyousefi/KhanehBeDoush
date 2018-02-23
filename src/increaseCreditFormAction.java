package Servlets;

import Entities.IndividualUser;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

import java.io.*;
import java.util.HashMap;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import Constants.Constants;
import Entities.Database;
import org.json.JSONObject;

@WebServlet("/increaseCredit")
public class increaseCreditFormAction extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpClient client = HttpClientBuilder.create().build();
        HttpPost post = createHttpPost();

        IndividualUser user = Database.getUser(Constants.getConstant("USERNAME"));
        String creditIncrementValue = request.getParameter("credit");

        JSONObject requestParams = createRequestParams(user.getPhone(), creditIncrementValue);

        try {
            post.setEntity(new StringEntity(requestParams.toString(), "UTF8"));
            HttpResponse bankResponse = client.execute(post);
            String responseTxt = EntityUtils.toString(bankResponse.getEntity());

            if (responseIsSuccessful(responseTxt)) {
                user.increaseBalance(Float.parseFloat(creditIncrementValue));
                request.setAttribute("msg", "User credit successfully increased by " + creditIncrementValue + " Toumans");
            }
            else {
                request.setAttribute("msg", "A problem occurred while contacting the bank server: " + responseTxt);
            }

        } catch (IOException e) {
            request.setAttribute("msg", "Exception caught: " + e.getMessage());
        }

        moveToPreviousPage(request, response);
    }

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
    }

    private HttpPost createHttpPost () {
        HttpPost post = new HttpPost(Constants.getConstant("BANK_POST_URL"));
        post.setHeader("Content-Type", "application/json");
        post.setHeader("apiKey", Constants.getConstant("API_KEY"));
        return post;
    }

    private JSONObject createRequestParams (String userId, String creditIncrementValue) {
        HashMap <String, String> jsonValues = new HashMap<String, String>();
        jsonValues.put("userId", userId);
        jsonValues.put("value", creditIncrementValue);
        return new JSONObject(jsonValues);
    }

    private boolean responseIsSuccessful(String bankResponse) throws IOException {
        JSONObject jsonResponse = new JSONObject(bankResponse);
        return jsonResponse.has("success") && jsonResponse.get("success").toString().equals("true");
    }

    private void moveToPreviousPage (HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String nextJSP = "/index.jsp";
        RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(nextJSP);
        dispatcher.forward(request, response);
    }
}
