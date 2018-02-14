package Utilities;

import java.util.HashMap;

public class PersianContent {
    public static HashMap<String, String> phrases;

    static {
        // search form Persian content
        phrases.put("minArea", "حداقل متراژ");
        phrases.put("propertyType", "نوع ملک");
        phrases.put("dealType", "نوع قرارداد (خرید/اجاره)");
        phrases.put("maxPrice", "حداکثر قیمت");
        phrases.put("search", "جستجو");

        // add property form Persian content
        phrases.put("buildingType", "نوع ساختمان (ویلایی/آپارتمان)");
        phrases.put("area", "متراژ");
        phrases.put("price", "قیمت فروش/اجاره");
        phrases.put("address", "آدرس");
        phrases.put("phoneNumber", "شماره تلفن");
        phrases.put("info", "توضیحات");
        phrases.put("addProperty", "اضافه کردن خانه جدید");

        // increase credit form Persian content
        phrases.put("credit", "اعتبار");
        phrases.put("increaseCredit", "افزایش اعتبار");
    }

    public static String getPhrase(String key) {
        return phrases.get(key);
    }
}
