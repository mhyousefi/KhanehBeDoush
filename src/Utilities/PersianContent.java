package Utilities;

import java.util.HashMap;

public class PersianContent {
    public static HashMap<String, String> phrases;

    static {
        phrases = new HashMap<String, String>();

        // search form Persian content
        phrases.put("minArea", "حداقل متراژ");
        phrases.put("propertyType", "نوع ملک");
        phrases.put("dealType", "نوع قرارداد");
        phrases.put("maxPrice", "حداکثر قیمت");
        phrases.put("search", "جستجو");

        // add property form Persian content
        phrases.put("buildingType", "نوع ساختمان");
        phrases.put("area", "متراژ");
        phrases.put("price", "قیمت فروش/اجاره");
        phrases.put("address", "آدرس");
        phrases.put("phoneNumber", "شماره تلفن");
        phrases.put("description", "توضیحات");
        phrases.put("addProperty", "اضافه کردن خانه جدید");

        phrases.put("RENTAL", "اجاره");
        phrases.put("SALE", "خرید");

        // increase credit form Persian content
        phrases.put("credit", "اعتبار");
        phrases.put("increaseCredit", "افزایش اعتبار");

        // searchResults page
        phrases.put("basePrice", "قیمت پایه");
        phrases.put("rentPrice", "مبلغ اجاره");
        phrases.put("type", "نوع");
        phrases.put("imageLink", "لینک عکس");
        phrases.put("sellingPrice", "قیمت فروش");
        phrases.put("moreInfo", "اطلاعات بیشتر");
    }

    public static String getPhrase(String key) {
        return phrases.get(key);
    }
}
