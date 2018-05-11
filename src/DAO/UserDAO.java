package DAO;

import Entities.IndividualUser;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;

public class UserDAO {

    static {
        createUserTableIFNotExists();
        createPaidToSeeTableIfNotExists();
        addUser("1","بهنام همایون", "09121102030", 1000f, "bHomayoun", "key123", "individual", false);
        addUser("2", "admin", "09102242927", 10000000000f, "adminOfKHServer", "Smhksfk1375", "individual", true);
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

    private static void addUser(String id, String name, String phone, Float balance, String username, String password, String userType, boolean isAdmin){
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

    private static String createQueryForPaidToSeeTable(HashMap<String, String> resultSet) throws SQLException {
        String query = "SELECT * FROM paidToSee GROUP By userId WHERE ";
        Set<String> ids = resultSet.keySet();
        for(String s : ids){
            query += "userId = " + s + " OR ";
        }
        query = query.substring(0, query.length() - 4);
        query += ";";
        return query;
    }

    private static String createQueryForUsersIds(int[] ranges){
        String query = "SELECT id FROM myUsers WHERE ";
        for(int i = ranges[0]; i <= ranges[1]; i++){
            query += "id = '" + String.valueOf(i) + "' OR ";
        }
        query = query.substring(0, query.length() - 4);
        query += ";";
        return query;
    }

    private static HashMap<String, String> addHouseIdsToResult(ResultSet resultSet) throws SQLException {
        HashMap<String, String> results = new HashMap<>();
        while (resultSet.next()){
            results.put(resultSet.getString(1), "");
        }
        return results;
    }

    private static HashMap<String, String> addIdsToResults(ResultSet resultSet, HashMap<String, String> hashMap) throws SQLException {
        HashMap<String, String> results = new HashMap<>();
        results.putAll(hashMap);
        String temp;
        while (resultSet.next()){
            if(results.containsKey(resultSet.getString(1))){
                temp = results.get(resultSet.getString(1));
                results.remove(resultSet.getString(1));
                results.put(resultSet.getString(1), temp + ", " + resultSet.getString(2));
            }
        }
        return results;
    }

    public static HashMap<String, String> getListOfHousesForAdmin(int[]ranges) throws NamingException, SQLException {
        String query = createQueryForUsersIds(ranges);
        Context ctx = new InitialContext();
        DataSource ds = (DataSource) ctx.lookup("java:comp/env/jdbc/sqlite");
        Connection connection = ds.getConnection();
        Statement statement = connection.createStatement();
        try {
            ResultSet resultSet = statement.executeQuery(query);
            HashMap<String, String> results = addHouseIdsToResult(resultSet);
            query = createQueryForPaidToSeeTable(results);
            ResultSet paidHouses = statement.executeQuery(query);
            results = addIdsToResults(paidHouses, results);
            results.put("query", query);
            connection.close();
            return results;
        } catch (Exception e) {
            HashMap<String, String> hashMap = new HashMap<>();
            hashMap.put(e.getMessage(), null);
            return hashMap;
        }
    }

    public static ArrayList<String> getListOfHousesForNormalUser(String userId) throws NamingException, SQLException {
        String query = "SELECT houseId FROM paidToSee WHERE userId = '" + userId + "';";
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
            results.add(e.getMessage());
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
        //id VARCHAR PRIMARY KEY,\n"
        return new IndividualUser(
                resultSet.getString(1),
                resultSet.getString(2),
                resultSet.getString(3),
                Float.parseFloat(resultSet.getString(4)),
                resultSet.getString(5),
                resultSet.getString(6),
                resultSet.getString(8).equals("true")
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
