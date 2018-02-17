package Entities;

import Constants.Constants;
import Utilities.PersianContent;

public class House {
    private String id, area, buildingType, imageURL, dealType, basePrice,
            rentPrice, sellingPrice, phone, description, expireTime, address;

    private static Integer houseCount;

    static {
        houseCount = 0;
    }

    public House(String area, String buildingType, String imageURL, String dealType, String basePrice, String rentPrice,
                 String sellingPrice, String phone, String description, String expireTime, String address) {
        this.area = area;
        this.buildingType = buildingType;
        this.imageURL = imageURL;
        this.dealType = dealType;
        this.basePrice = basePrice;
        this.rentPrice = rentPrice;
        this.sellingPrice = sellingPrice;
        this.phone = phone;
        this.description = description;
        this.expireTime = expireTime;
        this.address = address;

        this.id = this.houseCount.toString();
        this.houseCount += 1;
    }

    public String getId() {
        return id;
    }

    public String getArea() {
        return area;
    }

    public String getBuildingType() {
        return buildingType;
    }

    public String getImageURL() {
        return imageURL;
    }

    public String getDealType() {
        return dealType;
    }

    public String getBasePrice() {
        return basePrice;
    }

    public String getRentPrice() {
        return rentPrice;
    }

    public String getSellingPrice() {
        return sellingPrice;
    }

    public String getPhone() {
        return phone;
    }

    public String getDescription() {
        return description;
    }

    public String getExpireTime() {
        return expireTime;
    }

    public String getAddress() {
        return address;
    }

    public boolean isForRent() {
        return dealType.equals(PersianContent.getPhrase("RENTAL"));
    }

    public boolean isForSale() {
        return dealType.equals(PersianContent.getPhrase("SALE"));
    }

    public boolean meetsSearchCriteria(String searchedMinArea, String searchedMaxPrice, String searchedDealType, String searchedPropertyType) {
        if (!searchedDealType.equals("")) { // deal type was specified
            if (!dealType.equals(searchedDealType))
                return false;
        }

        if (!searchedPropertyType.equals("")) { // property type was specified
            if (!buildingType.equals(searchedPropertyType))
                return false;
        }

        if (!searchedMinArea.equals("")) { // min area was specified
            if (Float.parseFloat(area) < Float.parseFloat(searchedMinArea))
                return false;
        }

        // deal type violation is already checked at this point
        if (!searchedMaxPrice.equals("")) { // max price was specified
            if (this.isForSale()) {
                if (Float.parseFloat(sellingPrice) > Float.parseFloat(searchedMaxPrice))
                    return false;
            } else if (this.isForRent()) {
                if (Float.parseFloat(rentPrice) > Float.parseFloat(searchedMaxPrice))
                    return false;
            }
        }

        return true;
    }
}
