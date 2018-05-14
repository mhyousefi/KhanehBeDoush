package filters;

import DAO.DAOUtils;
import Entities.IndividualUser;
import Utilities.HeaderUtilities;
import Utilities.JSONFunctions;
import org.apache.http.HttpHeaders;
import org.json.JSONObject;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static Utilities.TokenUtilities.getUserIdIfTokenIsValid;

@WebFilter(filterName = "filters.TokenValidationFilter", urlPatterns = {"/increaseCredit", "/hasPaidForPhoneNum",
        "/getHomeById", "/currentCredit", "/houses", "/showHousePhoneNumber", "/addHouse"})
public class TokenValidationFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws ServletException, IOException {
        try {
            HttpServletRequest request = (HttpServletRequest) servletRequest;
            HttpServletResponse response = (HttpServletResponse) servletResponse;
            HeaderUtilities.setHttpServletResponseHeader(response);
            String idOfUser;
            JSONObject requestInJson = JSONFunctions.createJSONObjectFromRequest(request);
            String token = request.getHeader(HttpHeaders.AUTHORIZATION);
            idOfUser = getUserIdIfTokenIsValid(token);
            if (idOfUser.equals("invalidToken")) {
                response.setStatus(403);
                DAOUtils.sendResponse(response, null);
                return;
            }
            IndividualUser user = DAO.UserDAO.getIndividualUserById(idOfUser);
            servletRequest.setAttribute("user", user);
            servletRequest.setAttribute("requestInJson", requestInJson);
            filterChain.doFilter(servletRequest, servletResponse);
        }catch (Exception e){
            DAOUtils.sendResponse((HttpServletResponse) servletResponse, new JSONObject().put("serverError", true));
        }
    }

    @Override
    public void destroy() {

    }
}
