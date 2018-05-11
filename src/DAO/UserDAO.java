package DAO;

import Entities.IndividualUser;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;

public class UserDAO {

    static {
        createUserTableIFNotExists();
        createPaidToSeeTableIfNotExists();
        addUser("1","بهنام همایون", "09121102030", 1000f, "bHomayoun", "key123", false);
        addUser("2", "admin", "09102242927", 10000000000f, "adminOfKHServer", "Smhksfk1375", true);
    }

    private static void dropUserTable(){
        String sql = "DROP TABLE myUsers";
        DAOUtils.executeSql(sql);
    }

    private static void createUserTableIFNotExists() {
        String sql = "CREATE TABLE IF NOT EXISTS myUsers (\n"
                + "id VARCHAR PRIMARY KEY,\n"
                + "nameOfUser VARCHAR,\n"
                + "phone VARCHAR, \n"
                + "balance FLOAT, \n"
                + "userName VARCHAR, \n"
                + "password VARCHAR, \n"
                + "userType VARCHAR, \n"
                + "isAdmin VARCHAR);";
        DAOUtils.executeSql(sql);
    }

    private static void addUser(String id, String name, String phone, Float balance, String username, String password, boolean isAdmin){
        String isAdminChar = isAdmin ? "true" : "false";
        String sql = "REPLACE INTO myUsers(id, nameOfUser, phone, balance, userName, password, userType, isAdmin) VALUES('" + id + "', " +
                "'" + name + "', '" + phone + "', '" + balance + "', '" + username + "', '" + password + "', 'individual', '" + isAdminChar + "');";
        DAOUtils.executeSql(sql);
    }

    private static void createPaidToSeeTableIfNotExists(){
        String sql = "CREATE TABLE IF NOT EXISTS paidToSee (\n"
                + "userId VARCHAR,\n"
                + "houseId VARCHAR \n"
                + ");";
        DAOUtils.executeSql(sql);
    }


    public static HashMap<String, Array> getListOfHousesForAdmin(int[]ranges) throws NamingException, SQLException {
        String query = "SELECT x.id, y.houseId FROM myUsers, paidToSee LIMIT 10 WHERE (x.id = y.userId OR x.id NOT IN(SELECT userId FROM paidToSee)) AND x.id < " + ranges[1] + " AND x.id > " +  ranges[0] + ";";
        Context ctx = new InitialContext();
        DataSource ds = (DataSource) ctx.lookup("java:comp/env/jdbc/sqlite");
        Connection connection = ds.getConnection();
        Statement statement = connection.createStatement();
        try {
            ResultSet resultSet = statement.executeQuery(query);
            HashMap<String, Array> hashMap = new HashMap<>();
            while (resultSet.next()){
                hashMap.put(resultSet.getString(1), resultSet.getArray(2));
            }
            connection.close();
            return hashMap;
        } catch (Exception e) {
            HashMap<String, Array> hashMap = new HashMap<>();
            hashMap.put(e.getMessage(), null);
            return hashMap;
        }
    }

    public static ArrayList<String> getListOfHousesForNormalUser(String userId) throws NamingException, SQLException {
        String query = "SELECT houseId FROM paidToSee WHERE id = '" + userId + "';";
        Context ctx = new InitialContext();
        DataSource ds = (DataSource) ctx.lookup("java:comp/env/jdbc/sqlite");
        Connection connection = ds.getConnection();
        Statement statement = connection.createStatement();
        ArrayList<String> results = new ArrayList<>();
        try {
            ResultSet resultSet = statement.executeQuery(query);
            while (resultSet.next()){
                results.add(resultSet.getString("houseId"));
            }
            connection.close();
            return results;
        } catch (Exception e) {
            results.add("serverError");
            return results;
        }
    }

    public static boolean userHasPaidToSeePhoneNumber(String userId, String houseId){
        String query = "SELECT * FROM paidToSee WHERE userId = '" + userId + "' AND houseId = '" + houseId + "';";
        try {
            Connection connection = DAOUtils.connect();
            Statement stmt = connection.createStatement();
            ResultSet resultSet = stmt.executeQuery(query);
            boolean resultFound = resultSet.next();
            connection.close();
            return resultFound;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    private static IndividualUser extractIndividualUserDataFromResultSet(ResultSet resultSet) throws SQLException {
        // id, name, phone, balance, username, password
        return new IndividualUser(
                resultSet.getString(1),
                resultSet.getString(2),
                resultSet.getString(3),
                Float.parseFloat(resultSet.getString(4)),
                resultSet.getString(5),
                resultSet.getString(6),
                resultSet.getString(7).equals("true")
        );
    }

    public static void increaseCreditOfUser(IndividualUser loggedInUser, Float addedCredit){
        String setBalanceSql = "UPDATE myUsers SET balance = " + String.valueOf(loggedInUser.getBalance() + addedCredit)
                + " WHERE id = '" + loggedInUser.getId() + "';";
        DAOUtils.executeSql(setBalanceSql);
        loggedInUser.setBalance(loggedInUser.getBalance() + addedCredit);
    }

    public static void payToSeeTheDetailsOfTheHouse(IndividualUser loggedInUser, String houseId){
        String paidToSeeSql = "REPLACE INTO paidToSee(userId, houseId) VALUES('" + loggedInUser.getId() + "', '" + houseId + "');";
        String setBalanceSql = "UPDATE myUsers SET balance = " + String.valueOf(loggedInUser.getBalance() - 1000)
                + " WHERE id = '" + loggedInUser.getId() + "';";
        DAOUtils.executeSql(paidToSeeSql);
        DAOUtils.executeSql(setBalanceSql);
        loggedInUser.setBalance(loggedInUser.getBalance() - 1000);
    }

    public static IndividualUser getIndividualUserById(String id) throws NamingException, SQLException {
        String query = "SELECT * FROM myUsers WHERE id = '" + id + "';";
        Context ctx = new InitialContext();
        DataSource ds = (DataSource) ctx.lookup("java:comp/env/jdbc/sqlite");
        Connection connection = ds.getConnection();
        Statement statement = connection.createStatement();
        try {
            ResultSet resultSet = statement.executeQuery(query);
            IndividualUser individualUser = extractIndividualUserDataFromResultSet(resultSet);
            connection.close();
            return individualUser;
        } catch (Exception e) {
            return null;
        }
    }
}
