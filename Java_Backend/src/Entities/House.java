package Entities;

import Constants.PersianContent;

public class House {
    private String id;
    private String area;
    private String buildingType;
    private String imageURL;
    private String dealType;
    private String basePrice;
    private String rentPrice;
    private String sellingPrice;
    private String expireTime;
    private String isFromACMServer;
    private String isForSale;

    public String getIsForSale() {
        return isForSale;
    }

    public void setIsForSale(String isForSale) {
        this.isForSale = isForSale;
    }

    public String getIsFromACMServer() {
        return isFromACMServer;
    }

    public void setIsFromACMServer(String isFromACMServer) {
        this.isFromACMServer = isFromACMServer;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public void setBuildingType(String buildingType) {
        this.buildingType = buildingType;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public void setDealType(String dealType) {
        this.dealType = dealType;
    }

    public void setBasePrice(String basePrice) {
        this.basePrice = basePrice;
    }

    public void setRentPrice(String rentPrice) {
        this.rentPrice = rentPrice;
    }

    public void setSellingPrice(String sellingPrice) {
        this.sellingPrice = sellingPrice;
    }


    public void setExpireTime(String expireTime) {
        this.expireTime = expireTime;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public static void setHouseCount(Integer houseCount) {
        House.houseCount = houseCount;
    }

    private String address;

    private static Integer houseCount;

    static {
        houseCount = 0;
    }




    public House(){
        this.area = "";
        this.buildingType = "";
        this.imageURL = "";
        this.dealType = "";
        this.basePrice = "";
        this.rentPrice = "";
        this.sellingPrice = "";
        this.expireTime = "";
        this.address = "";
        this.id = "";
        this.isFromACMServer = "0";
    }

    /*id, area, buildingType, imageURL, dealType, basePrice, " +
                "rentPrice, sellingPrice, expireTime, address, isFromACMServer*/

    public House(String area, String buildingType, String imageURL, String dealType, String basePrice, String rentPrice,
                 String sellingPrice, String address, String _id) {
        this.area = area;
        this.buildingType = buildingType;
        this.imageURL = imageURL;
        this.dealType = dealType;
        this.basePrice = basePrice;
        this.rentPrice = rentPrice;
        this.sellingPrice = sellingPrice;
        this.address = address;
        this.id = _id;
        this.isFromACMServer = "0";
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

    public String getExpireTime() {
        return expireTime;
    }

    public String getAddress() {
        return address;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isForRent() {
        return dealType.equals(PersianContent.getPhrase("RENTAL"));
    }

    private boolean isForSale() {
        return dealType.equals(PersianContent.getPhrase("SALE"));
    }

    boolean meetsSearchCriteria(String searchedMinArea, String searchedMaxPrice, String searchedDealType, String searchedPropertyType) {
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
