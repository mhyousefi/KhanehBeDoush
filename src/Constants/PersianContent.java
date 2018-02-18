package Constants;

import java.util.HashMap;

public class PersianContent {
    private static HashMap<String, String> phrases;
    private static HashMap<String, String> messages;

    static {
        phrases = new HashMap<String, String>();
        messages = new HashMap<String, String>();

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

        phrases.put("RETURN_TO_HOME_PAGE", "بازگشت به صفحه اصلی");
        phrases.put("PHONE_NUMBER_MESSAGE_PREFIX", "شماره مالک/مشاور: ");
        phrases.put("PAY_FOR_PHONE_NUMBER", "دریافت شماره مالک/مشاور");

        // MESSAGES
        messages.put("NOT_ENOUGH_BALANCE_TO_SEE_PHONE_NUMBER", "اعتبار شما برای دریافت شماره مالک/مشاور کافی نیست!");
        messages.put("NOTHING_FOUND", "هیچ موردی یافت نشد.");
    }

    public static String getPhrase(String key) {
        return phrases.get(key);
    }

    public static String getMessage(String key) {
        return messages.get(key);
    }

    public static String createPhoneNumberMessage(String phoneNumber) {
        return (phrases.get("PHONE_NUMBER_MESSAGE_PREFIX") + phoneNumber);
    }
}
