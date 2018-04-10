package Utilities;

import org.json.JSONObject;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;

public class JSONFunctions {
    public static JSONObject createJSONObjectFromRequest(HttpServletRequest request) throws IOException {
        int i;
        BufferedReader bufferedReader = request.getReader();
        StringBuilder s = new StringBuilder();
        while((i = bufferedReader.read()) != -1) {
            s.append((char) i);
        }
        String ss = s.toString();
        return new JSONObject(ss);
    }
}
