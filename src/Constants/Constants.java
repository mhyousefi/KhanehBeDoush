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
    }
}
