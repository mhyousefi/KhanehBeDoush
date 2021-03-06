package Utilities;

import Constants.Constants;
import Constants.PersianContent;
import Entities.House;
import org.json.JSONObject;

import javax.naming.NamingException;
import java.sql.SQLException;
import java.util.Random;

import static DAO.HouseDAO.numOfHousesInTable;

public class HouseFactory {
    public static House createHouseForAcmInput(String area, String buildingType, String pictureURL, String dealType,
                                               JSONObject priceInfo, String address, String id) throws IllegalArgumentException {
        String basePrice, rentPrice, sellingPrice;
        completePriceInfoObj(priceInfo);
        sellingPrice = priceInfo.get("sellPrice").toString();
        basePrice = priceInfo.get("basePrice").toString();
        rentPrice = priceInfo.get("rentPrice").toString();

        if (!dealTypeIsValid(dealType) || !pricesAreValid(basePrice, rentPrice, sellingPrice))
            throw new IllegalArgumentException();

        if (houseIsForRent(dealType))
            dealType = PersianContent.getPhrase("RENTAL");

        else
            dealType = PersianContent.getPhrase("SALE");

        return new House(area, buildingType, pictureURL, dealType, basePrice, rentPrice, sellingPrice,
                address, id);
    }

    public static House createHouseForUserInput(String area, String buildingType, String pictureURL, String dealType,
                                               String sellingPrice, String rentPrice, String basePrice, String address)
            throws IllegalArgumentException, SQLException, NamingException {

        return new House(area, buildingType, pictureURL, dealType, basePrice, rentPrice, sellingPrice,
                address, String.valueOf(numOfHousesInTable() + 1 + new Random(712546342).nextInt()));
    }

    private static boolean pricesAreValid (String basePrice, String rentPrice, String sellingPrice) {
        return !(basePrice.equals("") && rentPrice.equals("") && basePrice.equals("") && sellingPrice.equals(""));
    }

    private static boolean dealTypeIsValid (String dealType) {
        return (houseIsForRent(dealType) || houseIsForSale(dealType));
    }

    private static boolean houseIsForRent(String dealType) {
        return dealType.contains(PersianContent.getPhrase("RENTAL")) || dealType.equals(Constants.getConstant("ACM_RENTAL_SYMBOL"));
    }

    private static boolean houseIsForSale(String dealType) {
        return dealType.contains(PersianContent.getPhrase("SALE")) || dealType.equals(Constants.getConstant("ACM_SALE_SYMBOL"));
    }

    private static void completePriceInfoObj(JSONObject priceInfo) {
        if (priceInfo.has("sellPrice")) {
            priceInfo.put("rentPrice", "0");
            priceInfo.put("basePrice", "0");
        } else if (!priceInfo.has("sellPrice") && priceInfo.has("rentPrice") && priceInfo.has("basePrice")) {
            priceInfo.put("sellPrice", "0");
        }
    }
}
