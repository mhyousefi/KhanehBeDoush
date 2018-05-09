import Entities.IndividualUser;

import Utilities.JSONFunctions;
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
public class IncreaseCreditFormAction extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        JSONObject requestInJson = JSONFunctions.createJSONObjectFromRequest(request);
        HttpClient client = HttpClientBuilder.create().build();
        HttpPost post = createHttpPost();

        IndividualUser user = Database.getUser(Constants.getConstant("USERNAME"));
        String creditIncrementValue = requestInJson.get("credit").toString();
        JSONObject requestParams = createRequestParams(user.getPhone(), creditIncrementValue);
        PrintWriter out = response.getWriter();

        try {
            post.setEntity(new StringEntity(requestParams.toString(), "UTF8"));
            HttpResponse bankResponse = client.execute(post);
            String responseTxt = EntityUtils.toString(bankResponse.getEntity());
            JSONObject jsonResponse = new JSONObject();

            if (responseIsSuccessful(responseTxt)) {
                user.increaseBalance(Float.parseFloat(creditIncrementValue));
                jsonResponse.put("response", "true");
                out.print(jsonResponse);
                out.flush();
            }
            else {
                jsonResponse.put("response", "false");
                out.print(jsonResponse);
                out.flush();
            }

        } catch (IOException ignored) {}
    }

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        return;
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
}
