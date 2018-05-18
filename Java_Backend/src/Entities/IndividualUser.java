package Entities;


import java.util.HashMap;

public class IndividualUser extends User {
    private String phone;
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

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
        this.isAdmin = isAdmin;
        housesWithVisiblePhoneNumbers = new HashMap<>();
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

}
