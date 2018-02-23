<%--
  Created by IntelliJ IDEA.
  User: hossein
  Date: 2/16/18
  Time: 3:25 PM
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="Entities.House" %>
<%@ page import="Entities.Database" %>
<%@ page import="Entities.IndividualUser" %>
<%@ page import="Constants.Constants" %>
<%@ page import="Constants.PersianContent" %>

<%
    String minArea = request.getParameter("minArea");
    String maxPrice = request.getParameter("maxPrice");
    String dealType = request.getParameter("dealType");
    String propertyType = request.getParameter("propertyType");
    ArrayList<House> searchResults = Database.searchHouses(minArea, maxPrice, dealType, propertyType);
    Boolean noResultsFound = searchResults.size() == 0;
    IndividualUser loggedInUser = Database.getUser(Constants.getConstant("USERNAME"));
%>

<html dir="rtl">
    <head>
        <title>Search Results</title>
    </head>
    <body>
        <h3><%= loggedInUser.getName() %> &nbsp; <%= loggedInUser.getBalance() %> &nbsp; </h3><br>
        <%
            if (noResultsFound) {
        %>

        <h4><%=PersianContent.getMessage("NOTHING_FOUND")%></h4>

        <%
            } else{
                for (House house : searchResults) {
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
                    <h5><%=PersianContent.getPhrase("AREA")%>:&nbsp;<%=house.getArea()%></h5>
                    <h5><%=PersianContent.getPhrase("DEAL_TYPE")%>:&nbsp;<%=house.getDealType()%></h5>
                    <a href="<%=house.getImageURL()%>">&nbsp;<%=PersianContent.getPhrase("IMAGE_LINK")%></a><br><br>
                    <form action="homeDetail.jsp">
                        <input type="hidden" name="phoneNumberStatus" value="<%=loggedInUser.getPhoneNumberStatus(house.getId())%>">
                        <input type="hidden" name="houseId" value="<%=house.getId()%>"/>
                        <input type="submit" value="<%=PersianContent.getPhrase("MORE_INFO")%>" />
                    </form><br>
        <%
                }
            }
        %>

        <form action="index.jsp"> <br>
            <input type="submit" value="<%=PersianContent.getPhrase("RETURN_TO_HOME_PAGE_BTN")%>" />
        </form>
    </body>
</html>
