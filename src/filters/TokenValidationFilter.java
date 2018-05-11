package filters;

import DAO.DAOUtils;
import Entities.IndividualUser;
import Utilities.HeaderUtilities;
import Utilities.JSONFunctions;
import org.json.JSONObject;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static Utilities.TokenUtilities.getUserIdIfTokenIsValid;

@WebFilter(filterName = "filters.TokenValidationFilter", urlPatterns = {"/increaseCredit", "/hasPaidForPhoneNum", "/showHousePhoneNumber"})
public class TokenValidationFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws ServletException, IOException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        HeaderUtilities.setHttpServletResponseHeader(response);
        JSONObject requestInJson = JSONFunctions.createJSONObjectFromRequest(request);
        if(!requestInJson.has("token")){
            DAOUtils.sendResponse(response, new JSONObject().put("authenticated", false));
        }else {
            String idOfUser = getUserIdIfTokenIsValid(requestInJson.get("token").toString());
            if(idOfUser.equals("invalidToken")) {
                DAOUtils.sendResponse(response, new JSONObject().put("authenticated", false));
            }else {
                try {
                    IndividualUser user = DAO.UserDAO.getIndividualUserById(idOfUser);
                    servletRequest.setAttribute("user", user);
                    servletRequest.setAttribute("requestInJson", requestInJson);
                    filterChain.doFilter(servletRequest, servletResponse);
                } catch (Exception e) {
                    DAOUtils.sendResponse(response, new JSONObject().put("serverError", true));
                }
            }
        }
    }

    @Override
    public void destroy() {

    }
}
