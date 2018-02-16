package Entities;

public class House {
    private String id , area , buildingType , imageURL , dealType , basePrice,
            rentPrice, sellPrice, phone, description, expireTime;
    private static Integer houseCount;

    static {
        houseCount = 0;
    }

    public House(String area, String buildingType, String imageURL, String dealType, String basePrice, String rentPrice, String sellPrice, String phone, String description, String expireTime) {
        this.area = area;
        this.buildingType = buildingType;
        this.imageURL = imageURL;
        this.dealType = dealType;
        this.basePrice = basePrice;
        this.rentPrice = rentPrice;
        this.sellPrice = sellPrice;
        this.phone = phone;
        this.description = description;
        this.expireTime = expireTime;

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

    public String getSellPrice() {
        return sellPrice;
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

    public void setId(String id) {
        this.id = id;
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

    public void setSellPrice(String sellPrice) {
        this.sellPrice = sellPrice;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setExpireTime(String expireTime) {
        this.expireTime = expireTime;
    }

}
