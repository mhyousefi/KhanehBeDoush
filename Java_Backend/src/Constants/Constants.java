package Constants;

import java.util.HashMap;

public class Constants {
    private static HashMap<String, String> constants;

    public static String getConstant(String key) {
        return constants.get(key);
    }

    static {
        constants = new HashMap<>();

        constants.put("API_KEY", "c3932910-1011-11e8-87b4-496f79ef1988");
        constants.put("BANK_POST_URL", "http://139.59.151.5:6664/bank/pay");
        constants.put("USERNAME", "bHomayoun");
        constants.put("ACM_SERVER_URL", "http://139.59.151.5:6664/khaneBeDoosh/v2/house");
        constants.put("NO_PIC_URL", "/Images/no-pic.jpg");
        constants.put("ACM_SALE_SYMBOL", "0");
        constants.put("ACM_RENTAL_SYMBOL", "1");
        constants.put("PRICE_TO_SEE_PHONE_NUMBER", "1000");
        constants.put("SESSION_DURATION", "3600000");
    }
}
