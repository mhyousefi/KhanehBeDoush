package Utilities;

import javax.servlet.http.HttpServletResponse;

public class HeaderUtilities {
    public static void setHttpServletResponseHeader(HttpServletResponse httpServletResponse){
        httpServletResponse.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        httpServletResponse.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        httpServletResponse.setHeader("Access-Control-Allow-Headers", "Content-Type");
        httpServletResponse.addHeader("Accept-Language", "en-ca,en,fa");
    }

    static String getJWTKey(){
        return "mozi-amoo";
    }
}
