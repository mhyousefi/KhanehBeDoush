package Utilities;

import Constants.Constants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Date;


public class TokenUtilities {
    public static String createTokenForUser(String userId) throws NoSuchAlgorithmException, InvalidKeyException {
        try {
            JwtBuilder jwtBuilder = Jwts.builder().claim("id", userId);
            jwtBuilder.claim("iss", "IE_Server");
            Long time = new Date().getTime() + Long.parseLong(Constants.getConstant("SESSION_DURATION")); //TODO: what exactly is iat????
            jwtBuilder.claim("iat", time);
            return jwtBuilder.signWith(SignatureAlgorithm.HS256, HeaderUtilities.getJWTKey()).compact();
        } catch (Exception e){
            return "";
        }
    }

    public static String getUserIdIfTokenIsValid(String claimByUser){
        try {
            Claims claims = Jwts.parser().setSigningKey(HeaderUtilities.getJWTKey()).parseClaimsJws(claimByUser).getBody();
            try {
                assert claims.containsKey("id") && claims.containsKey("iss") && claims.containsKey("iat");
            } catch (Exception e){
                return "invalidToken";
            }
            try {
                assert claims.get("iss").toString().equals("IE_Server") && (double) claims.get("iat") > new Date().getTime();
            } catch (Exception e){
                return "invalidToken";
            }
            return claims.get("id").toString();
        } catch (Exception e){
            return "invalidToken";
        }
    }
}
