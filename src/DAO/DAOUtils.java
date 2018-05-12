package DAO;

import Constants.Constants;
import Entities.House;
import Utilities.HouseFactory;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

public class DAOUtils {
    private static String urlOfDataBase = "jdbc:sqlite:khanehBeDooshDb.db";

    static {
        createNewDatabase();
    }

    public static boolean responseIsSuccessful(String bankResponse) throws IOException {
        JSONObject jsonResponse = new JSONObject(bankResponse);
        return jsonResponse.has("result") && jsonResponse.get("result").toString().equals("OK");
    }

    public static void sendResponse(HttpServletResponse response, JSONObject responseToClient){
        try{
            PrintWriter out = response.getWriter();
            out.print(responseToClient);
            out.flush();
        }catch (Exception ignored){}
    }

    static String executeSql(String sql){
        try{
            Context ctx = new InitialContext();
            DataSource ds = (DataSource) ctx.lookup("java:comp/env/jdbc/sqlite");
            Connection connection = ds.getConnection();
            Statement statement = connection.createStatement();
            statement.execute(sql);
            connection.close();
            return "no Exception";
        } catch (SQLException e) {
            return e.getMessage() + "\n" + e.getLocalizedMessage();
        } catch (NamingException e) {
            e.printStackTrace();
            return e.getMessage() + "\n" + e.getLocalizedMessage();
        }
    }

    static Connection connect() {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection(urlOfDataBase);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return conn;
    }

    private static void createNewDatabase() {
        try (Connection conn = connect()) {
            if (conn != null) {
                DatabaseMetaData meta = conn.getMetaData();
                System.out.println("The driver name is " + meta.getDriverName());
                System.out.println("A new database has been created.");
                conn.close();
            }

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    public static House createHouseObj(JSONObject house) {
        String area="", buildingType="", imageUrl="", dealType="", address="", id="";
        if (house.has("area")) area = house.get("area").toString();
        if (house.has("buildingType")) buildingType = house.get("buildingType").toString();
        if (house.has("imageURL")) imageUrl = house.get("imageURL").toString();
        if (house.has("dealType")) dealType = house.get("dealType").toString();
        if (house.has("address")) address = house.get("address").toString();
        if (house.has("id")) id = house.get("id").toString();

        JSONObject priceInfo = (house.has("price")) ? (JSONObject) house.get("price") : null;
        if (priceInfo == null)
            return null;

        try {
            return HouseFactory.createHouseForAcmInput(area, buildingType, imageUrl, dealType, priceInfo, address, id);
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

    public static JSONObject queryToAcmServer(String id) throws IOException {
        HttpClient client = HttpClientBuilder.create().build();
        String requestUrl = Constants.getConstant("ACM_SERVER_URL");
        if (!id.equals("")) {
            requestUrl += ("/" + id);
        }
        HttpGet get = new HttpGet(requestUrl);
        get.addHeader("Accept-Language", "en-ca,en,fa");
        HttpResponse acmResponse = client.execute(get);
        String stringResponse = EntityUtils.toString(acmResponse.getEntity());
        return new JSONObject(stringResponse);
    }
}
