package Entities;


public class IndividualUser extends User {
    private String phone, username, password;
    private Float balance;

    public IndividualUser(String name, String phone, Float balance, String username, String password) {
        super(name);
        this.phone = phone;
        this.balance = balance;
        this.username = username;
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public Float getBalance() {
        return balance;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void increaseBalance(Float balance) {
        this.balance += balance;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
