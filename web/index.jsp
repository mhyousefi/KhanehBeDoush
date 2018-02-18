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

<html dir="rtl">
    <head>
        <title>Home Page</title>
    </head>
    <body>
        <h3><%= loggedInUser.getName() %> &nbsp; <%= loggedInUser.getBalance() %> &nbsp; <br></h3>

        <form action="searchResults.jsp">
            <label>
                <input type="text" name="minArea" placeholder=<%=PersianContent.getPhrase("minArea")%>>
            </label><br><br>
            <label>
                <input type="text" name="propertyType" placeholder=<%=PersianContent.getPhrase("propertyType")%>>
            </label><br><br>
            <label>
                <input type="text" name="dealType" placeholder=<%=PersianContent.getPhrase("dealType")%>>
            </label><br><br>
            <label>
                <input type="text" name="maxPrice" placeholder="<%=PersianContent.getPhrase("maxPrice")%>">
            </label><br><br>
            <input type="submit" value=<%=PersianContent.getPhrase("search")%>>
        </form>

        <form action="addHouse.jsp">
            <label>
                <input type="text" name="buildingType" placeholder=<%=PersianContent.getPhrase("buildingType")%>>
            </label><br><br>
            <label>
                <input type="text" name="area" placeholder=<%=PersianContent.getPhrase("area")%>>
            </label><br><br>
            <label>
                <input type="text" name="dealType" placeholder=<%=PersianContent.getPhrase("dealType")%>>
            </label><br><br>
            <label>
                <input type="text" name="price" placeholder=<%=PersianContent.getPhrase("price")%>>
            </label><br><br>
            <label>
                <input type="text" name="address" placeholder=<%=PersianContent.getPhrase("address")%>>
            </label><br><br>
            <label>
                <input type="text" name="phoneNumber" placeholder=<%=PersianContent.getPhrase("phoneNumber")%>>
            </label><br><br>
            <label>
                <input type="text" name="description" placeholder=<%=PersianContent.getPhrase("description")%>>
            </label><br><br>
            <input type="submit" value=<%=PersianContent.getPhrase("addProperty")%>>
        </form>

        <form action="increaseCredit" method="post">
            <label>
                <input type="text" name="credit" placeholder=<%=PersianContent.getPhrase("credit")%>>
            </label><br><br>
            <input type="submit" value=<%=PersianContent.getPhrase("increaseCredit")%>>
        </form>

        <h2><%=request.getAttribute("msg")%></h2>
    </body>
</html>
