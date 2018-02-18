package Constants;

import java.util.HashMap;

public class Constants {
    private static HashMap<String, String> constants;

    public static String getConstant(String key) {
        return constants.get(key);
    }

    static {
        constants = new HashMap<String, String>();

        constants.put("apiKey", "c3932910-1011-11e8-87b4-496f79ef1988");
        constants.put("bankPostURL", "http://acm.ut.ac.ir/ieBank/pay");
        constants.put("USERNAME", "bHomayoun");
        constants.put("AcmServerURL", "http://acm.ut.ac.ir/khaneBeDoosh/house");
        constants.put("NO_PIC_URL", "/Images/no-pic.jpg");
        constants.put("ACM_SALE_SYMBOL", "0");
        constants.put("ACM_RENTAL_SYMBOL", "1");
        constants.put("PRICE_TO_SEE_PHONE_NUMBER", "1000");
    }
}
