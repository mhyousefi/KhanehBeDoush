package DAO;

import Constants.PersianContent;
import Entities.House;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;

public class HouseDAO {
    private static String houseTableName = "houses";

    static {
        createHouseTableIFNotExists();
    }

    private static ArrayList<House> convertResultSetToArrayListOfHouse(ResultSet rs) throws SQLException {
        ArrayList<House> results = new ArrayList<>();
        while (rs.next()) {
            House temp = new House();
            temp.setAddress(rs.getString(10));
            temp.setExpireTime(rs.getString(9));
            temp.setArea(rs.getString(2));
            temp.setSellingPrice(rs.getString(8));
            temp.setRentPrice(rs.getString(7));
            temp.setBasePrice(rs.getString(6));
            temp.setDealType(rs.getString(5));
            temp.setImageURL(rs.getString(4));
            temp.setBuildingType(rs.getString(3));
            temp.setId(rs.getString(1));
            temp.setIsFromACMServer(rs.getString(11));
            results.add(temp);
        }
        return results;
    }

    private static String dropHouseTable() {
        String sql = "DROP TABLE houses;";
        return DAOUtils.executeSql(sql);
    }

    private static void createHouseTableIFNotExists() {
        String sql = "CREATE TABLE houses (\n"

                + "id VARCHAR PRIMARY KEY,\n"
                + "area INT,\n"
                + "buildingType VARCHAR, \n"
                + "imageURL VARCHAR, \n"
                + "dealType VARCHAR, \n"

                + "basePrice INT, \n"
                + "rentPrice INT, \n"
                + "sellingPrice INT, \n"
                + "expireTime DOUBLE, \n"

                + "address VARCHAR, \n"
                + "isFromACMServer CHARACTER"
                + ");";
        DAOUtils.executeSql(sql);
    }

    private static boolean searchedIdIsSafe(String id){
        try {
            Integer.parseInt(id);
            return true;
        }catch (Exception e){
            return false;
        }
    }


    private static JSONObject createJsonForHouse(ResultSet resultSet) throws SQLException {
        JSONObject result = new JSONObject();
        JSONObject price = new JSONObject();
        if (resultSet.next()) {
            result.put("id", resultSet.getString(1));
            result.put("area", resultSet.getString(2));
            result.put("buildingType", resultSet.getString(3));
            result.put("address", resultSet.getString(10));
            result.put("dealType", resultSet.getString(5));
            result.put("phone", "");
            result.put("description", "");
            result.put("imageURL", resultSet.getString(4));
            if(result.get("dealType").toString().equals(PersianContent.getPhrase("SALE"))){
                price.put("sellPrice", Integer.parseInt(resultSet.getString(8)));
            }else {
                price.put("rentPrice", Integer.parseInt(resultSet.getString(7)));
                price.put("basePrice", Integer.parseInt(resultSet.getString(6)));
            }
        }
        return result;
    }


    public static JSONObject suchAHouseWasAddedByUserOrNotAndIfExistsGetTheHouse(String id) throws NamingException, SQLException {
        if(!searchedIdIsSafe(id))
            return new JSONObject().put("invalidInput", true).put("serverError", false);
        String query = "SELECT * FROM " + houseTableName + " WHERE id = '" + id + "';";
        Context ctx = new InitialContext();
        DataSource ds = (DataSource) ctx.lookup("java:comp/env/jdbc/sqlite");
        Connection connection = ds.getConnection();
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery(query);
        JSONObject result = createJsonForHouse(resultSet);
        connection.close();
        if(result.keySet().isEmpty())
            result.put("noResult", "");
        return result;
    }

    public static void insertNewHouse(ArrayList<String> values) throws SQLException {
        String sql = "REPLACE INTO houses(id, area, buildingType, imageURL, dealType, basePrice, " +
                "rentPrice, sellingPrice, expireTime, address, isFromACMServer) VALUES(";
        values.set(9, "/*" + values.get(9) + "*/");
        Connection conn = DAOUtils.connect();
        sql += "'" + values.get(0) + "', ";
        sql += values.get(1) + ", ";
        sql += "'" + values.get(2) + "', ";
        sql += "'" + values.get(3) + "', ";
        sql += "'" + values.get(4) + "', ";
        sql += values.get(5) + ", ";
        sql += values.get(6) + ", ";
        sql += values.get(7) + ", ";
        sql += values.get(8) + ", ";
        sql += "'" + values.get(9) + "', ";
        sql += "'" + values.get(10) + "'); ";
        PreparedStatement preparedStatement = conn.prepareStatement(sql);
        preparedStatement.executeUpdate();
    }

    public static int numOfHousesInTable() throws NamingException, SQLException {
        String query = "SELECT count(*) FROM " + houseTableName + ";";
        Context ctx = new InitialContext();
        DataSource ds = (DataSource) ctx.lookup("java:comp/env/jdbc/sqlite");
        Connection connection = ds.getConnection();
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery(query);
        int result = resultSet.getInt(1);
        connection.close();
        return result;
    }

    private static String addANDtoQuery(int initialLengthOfQuery, int sqlLength){
        if(sqlLength == initialLengthOfQuery){
            return " ";
        }else {
            return " AND ";
        }
    }

    private static String addPropertyTypeCondition(String propertyType, int initialLengthOfQuery, int sqlLength){
        if(!propertyType.equals("")){
            String toBeAdded = "buildingType = '" + propertyType + "'";
            return addANDtoQuery(initialLengthOfQuery, sqlLength) + toBeAdded;
        }
        return "";
    }

    private static String addDealTypeAndMaxPriceCondition(String dealType, String maxPrice, int initialLengthOfQuery, int sqlLength){
        if(dealType.equals(PersianContent.getPhrase("RENTAL"))){
            return rentalCondition(dealType, maxPrice, initialLengthOfQuery, sqlLength);
        }else if(dealType.equals(PersianContent.getPhrase("SALE"))){
            return sellingCondition(dealType, maxPrice, initialLengthOfQuery, sqlLength);
        }else {
            String toBeAdded = justMaxPriceCondition(maxPrice, initialLengthOfQuery, sqlLength);
            if (toBeAdded != null) return toBeAdded;
            return "";
        }
    }

    private static String justMaxPriceCondition(String maxPrice, int initialLengthOfQuery, int sqlLength) {
        String toBeAdded;
        if(!maxPrice.equals("")){
            toBeAdded = "((dealType = '" + PersianContent.getPhrase("SALE") + "' AND sellingPrice <= " + maxPrice +
                    ") OR (dealType = '" + PersianContent.getPhrase("RENTAL") + "' AND rentPrice <= " + maxPrice +
                    "))";
            toBeAdded = addANDtoQuery(initialLengthOfQuery, sqlLength) + toBeAdded;
            return toBeAdded;
        }
        return null;
    }

    private static String sellingCondition(String dealType, String maxPrice, int initialLengthOfQuery, int sqlLength) {
        String toBeAdded;
        toBeAdded = "dealType = '" + dealType + "'";
        if(!maxPrice.equals("")){
            toBeAdded = toBeAdded + " AND " + "sellingPrice <= " + maxPrice;
        }
        toBeAdded = addANDtoQuery(initialLengthOfQuery, sqlLength) + toBeAdded;
        return toBeAdded;
    }

    private static String rentalCondition(String dealType, String maxPrice, int initialLengthOfQuery, int sqlLength) {
        String toBeAdded;
        toBeAdded = "dealType = '" + dealType + "'";
        if(!maxPrice.equals("")){
            toBeAdded = toBeAdded + " AND " + "rentPrice <= " + maxPrice;
        }
        return addANDtoQuery(initialLengthOfQuery, sqlLength) + toBeAdded;
    }

    private static String createQueryForSearchHouses(String minArea, String maxPrice, String dealType, String propertyType){
        String sql = "SELECT * FROM " + houseTableName + " WHERE";
        int initialLengthOfQuery = sql.length();
        if(!minArea.equals("")){
            sql = sql + " area >= " + minArea;
        }
        sql = sql + addPropertyTypeCondition(propertyType, initialLengthOfQuery, sql.length());
        sql = sql + addDealTypeAndMaxPriceCondition(dealType, maxPrice, initialLengthOfQuery, sql.length());
        if(sql.length() == initialLengthOfQuery){
            sql = "SELECT * FROM " + houseTableName;
        }
        sql = sql + ";";
        return sql;
    }

    private static boolean checkIfHousesAreNotExpired() throws SQLException, NamingException {
        String query = "SELECT count(*) FROM " + houseTableName + " WHERE isFromACMServer = '1' AND expireTime > strftime('%s','now');";
        Context ctx = new InitialContext();
        DataSource ds = (DataSource) ctx.lookup("java:comp/env/jdbc/sqlite");
        Connection connection = ds.getConnection();
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery(query);
        if(resultSet.getInt(1) > 0){
            connection.close();
            return true;
        }
        connection.close();
        return false;
    }

    private static ArrayList<House> searchDataBaseForHouses(String minArea, String maxPrice, String dealType, String propertyType) throws SQLException, NamingException {
        String query = createQueryForSearchHouses(minArea, maxPrice, dealType, propertyType);
        Context ctx = new InitialContext();
        DataSource ds = (DataSource) ctx.lookup("java:comp/env/jdbc/sqlite");
        Connection connection = ds.getConnection();
        Statement statement = connection.createStatement();
        ResultSet resultSet = statement.executeQuery(query);
        ArrayList<House> results = convertResultSetToArrayListOfHouse(resultSet);
        connection.close();
        return results;
    }

    private static void updateDataBase() throws IOException, SQLException {
        JSONObject jsonResponse = DAOUtils.queryToAcmServer("");
        String expireTime = jsonResponse.get("expireTime").toString(), sql = "REPLACE INTO houses(id, area, buildingType, imageURL, " +
                "dealType, basePrice, rentPrice, sellingPrice, expireTime, address, isFromACMServer) VALUES ";
        JSONArray dataInJson = jsonResponse.getJSONArray("data");
        House house;
        for(int i = 0; i < dataInJson.length(); i++){
            house = DAOUtils.createHouseObj(dataInJson.getJSONObject(i));
            if(house != null){
                sql = sql + "('" + house.getId() + "', " + house.getArea() + ", '" + house.getBuildingType() + "', '" + house.getImageURL() + "', '" +
                        house.getDealType() + "', '" + house.getBasePrice() + "', '" + house.getRentPrice() + "', '" + house.getSellingPrice() + "', " +
                        expireTime + ", '" + house.getAddress() + "', '1'),\n";
            }
        }
        String finalSql = sql.substring(0, sql.length() - 2) + ";";
        DAOUtils.executeSql(finalSql);
    }

    private static boolean searchParametersAreValidAndSafe(String minArea, String maxPrice, String dealType, String propertyType){
        if(!minArea.equals(""))
            if(!validateNumber(minArea))
                return false;
        if(!maxPrice.equals(""))
            if(!validateNumber(maxPrice))
                return false;
        if(!dealType.equals(""))
            if(!(dealType.equals(PersianContent.getPhrase("RENTAL")) || dealType.equals(PersianContent.getPhrase("SALE"))))
                return false;
        if(!propertyType.equals(""))
            if(!(propertyType.equals(PersianContent.getPhrase("APARTMENT")) || propertyType.equals(PersianContent.getPhrase("VILLA"))))
                return false;
        return true;
    }

    private static boolean validateNumber(String toValidate){
        try {
            Float.parseFloat(toValidate);
            return true;
        }catch (NumberFormatException nfe){
            return false;
        }
    }

    public static ArrayList<House> searchHouses(String minArea, String maxPrice, String dealType, String propertyType){
        try {
            if(!checkIfHousesAreNotExpired()){
                updateDataBase();
            }
            if(searchParametersAreValidAndSafe(minArea, maxPrice, dealType, propertyType))
                return searchDataBaseForHouses(minArea, maxPrice, dealType, propertyType);
            return null;
        } catch (SQLException | IOException | NamingException e) {
            return null;
        }
    }
}
