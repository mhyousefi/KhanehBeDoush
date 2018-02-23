<%--
  Created by IntelliJ IDEA.
  User: hossein
  Date: 2/14/18
  Time: 7:17 PM
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="Entities.Database" %>
<%@ page import="Entities.IndividualUser" %>
<%@ page import="Constants.PersianContent" %>
<%@ page import="Constants.Constants" %>


<%
    IndividualUser loggedInUser = Database.getUser(Constants.getConstant("USERNAME"));
%>

<html>
    <head>
        <title>Home Page</title>
    </head>
    <body>
        <h4 dir="rtl"><%= loggedInUser.getName() %> &nbsp; <%= loggedInUser.getBalance() %> &nbsp; <br></h4>

        <h3 dir="rtl"><%=PersianContent.getPhrase("SEARCH_HOME_TITLE")%></h3>
        <form action="searchResults.jsp" dir="rtl">
            <input name="minArea" placeholder="<%=PersianContent.getPhrase("MIN_AREA")%>">
            <input name="propertyType" placeholder="<%=PersianContent.getPhrase("PROPERTY_TYPE")%>">
            <input name="dealType" placeholder="<%=PersianContent.getPhrase("DEAL_TYPE")%>">
            <input name="maxPrice" placeholder="<%=PersianContent.getPhrase("MAX_PRICE")%>">
            <input type="submit" value="<%=PersianContent.getPhrase("SEARCH_BTN")%>"><br><br>
        </form>

        <h3 dir="rtl"><%=PersianContent.getPhrase("ADD_PROPERTY_TITLE")%></h3>
        <form action="addHouse.jsp" dir="rtl">
            <input name="buildingType" placeholder="<%=PersianContent.getPhrase("BUILDING_TYPE")%>">
            <input name="area" placeholder="<%=PersianContent.getPhrase("AREA")%>">
            <input name="dealType" placeholder="<%=PersianContent.getPhrase("DEAL_TYPE")%>">
            <input name="price" placeholder="<%=PersianContent.getPhrase("PRICE")%>"><br><br>
            <input name="address" placeholder="<%=PersianContent.getPhrase("ADDRESS")%>">
            <input name="phoneNumber" placeholder="<%=PersianContent.getPhrase("PHONE_NUMBER")%>">
            <input name="description" placeholder="<%=PersianContent.getPhrase("DESCRIPTION")%>">
            <input type="submit" value="<%=PersianContent.getPhrase("ADD_PROPERTY_BTN")%>"><br><br>
        </form>

        <h3 dir="rtl"><%=PersianContent.getPhrase("ADD_CREDIT_TITLE")%></h3>
        <form action="increaseCredit" method="post" dir="rtl">
            <input name="credit" placeholder="<%=PersianContent.getPhrase("CREDIT")%>">
            <input type="submit" value="<%=PersianContent.getPhrase("INCREASE_CREDIT_BTN")%>"><br><br>
        </form>

        <h3>"Message:"</h3>
        <p><%=request.getAttribute("msg")%></p>
    </body>
</html>
