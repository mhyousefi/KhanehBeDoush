<%--
  Created by IntelliJ IDEA.
  User: hossein
  Date: 2/16/18
  Time: 5:56 PM
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="Entities.Database" %>
<%@ page import="Entities.House" %>
<%@ page import="Entities.IndividualUser" %>
<%@ page import="Constants.Constants" %>
<%@ page import="Constants.PersianContent" %>

<%
    IndividualUser loggedInUser = Database.getUser(Constants.getConstant("USERNAME"));
    String houseID = request.getParameter("houseId");
    House house = Database.getSearchedHouse(houseID);
    if (house == null) {
        request.setAttribute("msg", "Could not find house with id: " + houseID);
%>
    <jsp:forward page="index.jsp"/>
<%
    }
%>

<html dir="rtl">
    <head>
        <title>House Detail</title>
    </head>
    <body>
        <h3><%= loggedInUser.getName() %> &nbsp; <%= loggedInUser.getBalance() %> &nbsp; <br></h3>

        <h5><%=PersianContent.getPhrase("BUILDING_TYPE")%>:&nbsp;<%=house.getBuildingType()%></h5>
        <h5><%=PersianContent.getPhrase("DEAL_TYPE")%>:&nbsp;<%=house.getDealType()%></h5>

        <%
            if (house.isForRent()) {
        %>
                <h5><%=PersianContent.getPhrase("BASE_PRICE")%>:&nbsp;<%=house.getBasePrice()%></h5>
                <h5><%=PersianContent.getPhrase("RENT_PRICE")%>:&nbsp;<%=house.getRentPrice()%></h5>
        <%
            } else {
        %>
                <h5><%=PersianContent.getPhrase("SELLING_PRICE")%>:&nbsp;<%=house.getSellingPrice()%></h5>
        <%
            }
        %>

        <a href="<%=house.getImageURL()%>">&nbsp;<%=PersianContent.getPhrase("IMAGE_LINK")%></a><br>
        <h5><%=PersianContent.getPhrase("AREA")%>:&nbsp;<%=house.getArea()%></h5>
        <h5><%=PersianContent.getPhrase("ADDRESS")%>:&nbsp;<%=house.getAddress()%></h5>
        <h5><%=PersianContent.getPhrase("DESCRIPTION")%>:&nbsp;<%=house.getDescription()%></h5>

        <%
            String buttonTxt = request.getParameter("phoneNumberStatus");
            if (buttonTxt == null) {
                buttonTxt = request.getAttribute("phoneNumberStatus").toString();
            }
        %>
        <form action="showHousePhoneNumberAction" method="post"> <br>
            <input type="hidden" name="houseId" value="<%=house.getId()%>">
            <input type="submit" value="<%=buttonTxt%>"/>
        </form>

        <form action="index.jsp"> <br>
            <input type="submit" value="<%=PersianContent.getPhrase("RETURN_TO_HOME_PAGE_BTN")%>" />
        </form>
    </body>
</html>
