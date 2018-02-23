package Constants;

import java.util.HashMap;

public class PersianContent {
    private static HashMap<String, String> phrases;
    private static HashMap<String, String> messages;

    static {
        phrases = new HashMap<String, String>();
        messages = new HashMap<String, String>();

        // search form Persian content
        phrases.put("SEARCH_HOME_TITLE", "جستجو خانه");
        phrases.put("MIN_AREA", "حداقل متراژ");
        phrases.put("PROPERTY_TYPE", "نوع ملک");
        phrases.put("DEAL_TYPE", "نوع قرارداد");
        phrases.put("MAX_PRICE", "حداکثر قیمت");
        phrases.put("SEARCH_BTN", "جستجو");

        // add property form Persian content
        phrases.put("ADD_PROPERTY_TITLE", "اضافه کردن خانه جدید");
        phrases.put("BUILDING_TYPE", "نوع ساختمان");
        phrases.put("AREA", "متراژ");
        phrases.put("PRICE", "قیمت فروش/اجاره");
        phrases.put("ADDRESS", "آدرس");
        phrases.put("PHONE_NUMBER", "شماره تلفن");
        phrases.put("DESCRIPTION", "توضیحات");
        phrases.put("ADD_PROPERTY_BTN", "اضافه کن");

        // increase credit form Persian content
        phrases.put("ADD_CREDIT_TITLE", "افزایش اعتبار");
        phrases.put("CREDIT", "اعتبار");
        phrases.put("INCREASE_CREDIT_BTN", "افزایش");

        phrases.put("RENTAL", "اجاره");
        phrases.put("SALE", "خرید");

        // searchResults page
        phrases.put("SELLING_PRICE", "قیمت فروش");
        phrases.put("BASE_PRICE", "قیمت پایه");
        phrases.put("RENT_PRICE", "مبلغ اجاره");
        phrases.put("IMAGE_LINK", "لینک عکس");
        phrases.put("MORE_INFO", "اطلاعات بیشتر");

        // button texts
        phrases.put("RETURN_TO_HOME_PAGE_BTN", "بازگشت به صفحه اصلی");
        phrases.put("PHONE_NUMBER_BTN_PREFIX", "شماره مالک/مشاور: ");
        phrases.put("PAY_FOR_PHONE_NUMBER_BTN", "دریافت شماره مالک/مشاور");

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
        phoneNumber = phoneNumber.replaceAll("[^0-9]","");
        return (phrases.get("PHONE_NUMBER_BTN_PREFIX") + phoneNumber);
    }
}
