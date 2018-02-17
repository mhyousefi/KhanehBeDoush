package Utilities;

import Entities.House;

public class HouseFactory {
    public static House createHouse(String area, String buildingType, String pictureURL, String dealType, String price,
                                    String phoneNumber, String description, String address) throws IllegalArgumentException{
        String rentPrice = "0";
        String expireTime = "";
        String sellingPrice, basePrice;

        if (dealType.contains(PersianContent.getPhrase("rental"))) {
            dealType = PersianContent.getPhrase("rental");
            basePrice = price;
            sellingPrice = "0";
        }
        else if (dealType.contains(PersianContent.getPhrase("buying"))){
            dealType = PersianContent.getPhrase("buying");
            sellingPrice = price;
            basePrice = "0";
        }
        else {
            throw new IllegalArgumentException();
        }
        return new House(area, buildingType, pictureURL, dealType, basePrice, rentPrice, sellingPrice, phoneNumber,
                description, expireTime, address);
    }
}
