package Entities;

import java.util.HashMap;

public class Database {
    public static HashMap<String, IndividualUser> users;
    public static HashMap<String, House> houses;

    static {
        users = new HashMap<>();
        houses = new HashMap<>();
        users.put("bHomayoun", new IndividualUser("بهنام همایون", "09121102030", new Float(0), "bHomayoun", "key123"));
    }

    public static HashMap<String, IndividualUser> getAllUsers() {
        return users;
    }

    public static IndividualUser getUser(String username) {
        return users.get(username);
    }

    public static HashMap<String, House> getAllHouses() {
        return houses;
    }

    public static House getHouse (String id) {
        return houses.get(id);
    }

    public static void addUser(IndividualUser user) {
        Database.users.put(user.getUsername(), user);
    }

    public static void addHouse(House house) {
        Database.houses.put(house.getId(), house);
    }
}


