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

public class UserDAO {

    static {
        createUserTableIFNotExists();
        createPaidToSeeTableIfNotExists();
        addUser("1","بهنام همایون", "09121102030", 1000f, "bHomayoun", "key123");
    }

    private static void createUserTableIFNotExists() {
        String sql = "CREATE TABLE IF NOT EXISTS users (\n"
                + "id VARCHAR PRIMARY KEY,\n"
                + "nameOfUser VARCHAR,\n"
                + "phone VARCHAR, \n"
                + "balance FLOAT, \n"
                + "userName VARCHAR, \n"
                + "password VARCHAR, \n"
                + "userType VARCHAR \n"
                + ");";
        DAOUtils.executeSql(sql);
    }

    private static void addUser(String id, String name, String phone, Float balance, String username, String password){
        String sql = "REPLACE INTO users(id, nameOfUser, phone, balance, userName, password, userType) VALUES('" + id + "', " +
                "'" + name + "', '" + phone + "', '" + balance + "', '" + username + "', '" + password + "', 'individual');";
        DAOUtils.executeSql(sql);
    }

    private static void createPaidToSeeTableIfNotExists(){
        String sql = "CREATE TABLE IF NOT EXISTS paidToSee (\n"
                + "userId VARCHAR,\n"
                + "houseId VARCHAR \n"
                + ");";
        DAOUtils.executeSql(sql);
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
                resultSet.getString(6)
        );
    }

    public static void increaseCreditOfUser(IndividualUser loggedInUser, Float addedCredit){
        String setBalanceSql = "UPDATE users SET balance = " + String.valueOf(loggedInUser.getBalance() + addedCredit)
                + " WHERE id = '" + loggedInUser.getId() + "';";
        DAOUtils.executeSql(setBalanceSql);
        loggedInUser.setBalance(loggedInUser.getBalance() + addedCredit);
    }

    public static void payToSeeTheDetailsOfTheHouse(IndividualUser loggedInUser, String houseId){
        String paidToSeeSql = "REPLACE INTO paidToSee(userId, houseId) VALUES('" + loggedInUser.getId() + "', '" + houseId + "');";
        String setBalanceSql = "UPDATE users SET balance = " + String.valueOf(loggedInUser.getBalance() - 1000)
                + " WHERE id = '" + loggedInUser.getId() + "';";
        DAOUtils.executeSql(paidToSeeSql);
        DAOUtils.executeSql(setBalanceSql);
        loggedInUser.setBalance(loggedInUser.getBalance() - 1000);
    }

    public static IndividualUser getIndividualUserById(String id) throws NamingException, SQLException {
        String query = "SELECT * FROM users WHERE id = '" + id + "';";
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
