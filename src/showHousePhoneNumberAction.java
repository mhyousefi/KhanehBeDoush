import Constants.Constants;
import Constants.PersianContent;
import Entities.Database;
import Entities.IndividualUser;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.*;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/showHousePhoneNumberAction")
public class showHousePhoneNumberAction extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        IndividualUser loggedInUser = Database.getUser(Constants.getConstant("USERNAME"));
        String houseId = request.getParameter("houseId");
        String phoneNumber = Database.getSearchedHouse(houseId).getPhone();
        String phoneNumberStatus;
        if (loggedInUser.hasPaidToSeePhoneNumber(houseId))
            phoneNumberStatus = PersianContent.createPhoneNumberMessage(phoneNumber);
        else if (loggedInUser.hasEnoughBalance(Constants.getConstant("PRICE_TO_SEE_PHONE_NUMBER"))) {
            loggedInUser.payToSeePhoneNumber(houseId);
            phoneNumberStatus = PersianContent.createPhoneNumberMessage(phoneNumber);
        } else {
            phoneNumberStatus = PersianContent.getMessage("NOT_ENOUGH_BALANCE_TO_SEE_PHONE_NUMBER");
        }
        moveBack(request, response, houseId, phoneNumberStatus);
    }

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
    }

    private void moveBack (HttpServletRequest request, HttpServletResponse response, String houseId, String phoneNumberStatus)
            throws ServletException, IOException {
        String nextJSP = "/HouseDetail.jsp?houseId=" + houseId;
        request.setAttribute("phoneNumberStatus", phoneNumberStatus);
        RequestDispatcher dispatcher = getServletContext().getRequestDispatcher(nextJSP);
        dispatcher.forward(request, response);
    }
}
