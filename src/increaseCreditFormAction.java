import Entities.IndividualUser;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicHeader;
import org.apache.http.protocol.HTTP;
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
        HttpPost post = new HttpPost(Constants.getConstant("bankPostURL"));
        post.setHeader("Accept", "application/json");
        post.setHeader("apiKey", Constants.getConstant("apiKey"));

        IndividualUser user = Database.getUser(Constants.getConstant("USERNAME"));
        String creditIncrementValue = request.getParameter("credit");

        HashMap <String, String> jsonValues = new HashMap<String, String>();
        jsonValues.put("userId", user.getPhone());
        jsonValues.put("value", request.getParameter("credit"));
        JSONObject json = new JSONObject(jsonValues);
        System.out.println(json.toString());
        try {
            StringEntity entity = new StringEntity(json.toString(), "UTF8");
//            entity.setContentType(new BasicHeader(HTTP.CONTENT_TYPE, "application/json"));
            post.setEntity(entity);
            HttpResponse bankResponse = client.execute(post);

            user.increaseBalance(Float.parseFloat(creditIncrementValue));
            String responseTxt = EntityUtils.toString(bankResponse.getEntity());
            request.setAttribute("msg", "Server said: " + responseTxt);

        } catch (IOException e) {
            request.setAttribute("msg", "Exception caught: " + e.getMessage());
        }

        String nextJSP = "/index.jsp";
        RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(nextJSP);
        dispatcher.forward(request,response);
    }

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
    }


}
