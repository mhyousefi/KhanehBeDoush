package Entities;


import Constants.Constants;
import Constants.PersianContent;

import java.util.HashMap;

public class IndividualUser extends User {
    private String phone;
    private String username;
    private String password;
    private boolean isAdmin;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    private String id;
    private Float balance;
    private HashMap<String, Boolean> housesWithVisiblePhoneNumbers;

    public IndividualUser(String id, String name, String phone, Float balance, String username, String password, boolean isAdmin) {
        super(name);
        this.id = id;
        this.phone = phone;
        this.balance = balance;
        this.username = username;
        this.password = password;

        housesWithVisiblePhoneNumbers = new HashMap<String, Boolean>();
    }

    public void setBalance(Float balance){ this.balance = balance; }

    public String getPhone() {
        return phone;
    }

    public Float getBalance() {
        return balance;
    }

    public void increaseBalance(Float balance) {
        this.balance += balance;
    }

    public boolean hasEnoughBalance (String value) {
        return balance >= Float.parseFloat(value);
    }

    public void payToSeePhoneNumber (String houseId) {
        balance -= Float.parseFloat(Constants.getConstant("PRICE_TO_SEE_PHONE_NUMBER"));
        housesWithVisiblePhoneNumbers.put(houseId, true);
    }

    public boolean hasPaidToSeePhoneNumber (String houseId) {
        // TODO: dataBase things
        return false;
    }

}
