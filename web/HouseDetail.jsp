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

        <h5><%=PersianContent.getPhrase("buildingType")%>:&nbsp;<%=house.getBuildingType()%></h5>
        <h5><%=PersianContent.getPhrase("dealType")%>:&nbsp;<%=house.getDealType()%></h5>

        <%
            if (house.isForRent()) {
        %>
                <h5><%=PersianContent.getPhrase("basePrice")%>:&nbsp;<%=house.getBasePrice()%></h5>
                <h5><%=PersianContent.getPhrase("rentPrice")%>:&nbsp;<%=house.getRentPrice()%></h5>
        <%
            } else {
        %>
                <h5><%=PersianContent.getPhrase("sellingPrice")%>:&nbsp;<%=house.getSellingPrice()%></h5>
        <%
            }
        %>

        <h5><%=PersianContent.getPhrase("imageLink")%>:&nbsp;<%=house.getImageURL()%></h5>
        <h5><%=PersianContent.getPhrase("area")%>:&nbsp;<%=house.getArea()%></h5>
        <h5><%=PersianContent.getPhrase("address")%>:&nbsp;<%=house.getAddress()%></h5>
        <h5><%=PersianContent.getPhrase("description")%>:&nbsp;<%=house.getDescription()%></h5>

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
            <input type="submit" value="<%=PersianContent.getPhrase("RETURN_TO_HOME_PAGE")%>" />
        </form>
    </body>
</html>
