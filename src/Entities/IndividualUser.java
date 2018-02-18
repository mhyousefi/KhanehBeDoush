package Entities;


import Constants.Constants;
import Constants.PersianContent;

import java.util.ArrayList;
import java.util.HashMap;

public class IndividualUser extends User {
    private String phone, username, password;
    private Float balance;
    private HashMap<String, Boolean> housesWithVisiblePhoneNumbers;

    public IndividualUser(String name, String phone, Float balance, String username, String password) {
        super(name);
        this.phone = phone;
        this.balance = balance;
        this.username = username;
        this.password = password;

        housesWithVisiblePhoneNumbers = new HashMap<String, Boolean>();
    }

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
        return housesWithVisiblePhoneNumbers.containsKey(houseId);
    }

    public String getPhoneNumberStatus (String houseId) {
        String phoneNumber = "";
        if (hasPaidToSeePhoneNumber(houseId)) {
            phoneNumber = Database.getSearchedHouse(houseId).getPhone();
            return PersianContent.createPhoneNumberMessage(phoneNumber);
        }
        return PersianContent.getPhrase("PAY_FOR_PHONE_NUMBER");
    }
}
