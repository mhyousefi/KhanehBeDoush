<%--
  Created by IntelliJ IDEA.
  User: hossein
  Date: 2/14/18
  Time: 7:17 PM
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="main.Entities.Database"%>
<%@ page import="main.Entities.IndividualUser" %>
<%@ page import="main.Utilities.PersianContent" %>

<%
  IndividualUser loggedInUser = Database.getUser("bHomayoun");
%>

<html>
<head>
  <title></title>
</head>
<body>
<h4>
  <%= loggedInUser.getName() %> &nbsp; <%= loggedInUser.getBalance() %> &nbsp; <br>
</h4>
<form action="p1.jsp">
  <input type="text" name="minArea" value=<%=PersianContent.getPhrase("minArea")%>><br><br>
  <input type="text" name="propertyType" value=<%=PersianContent.getPhrase("propertyType")%>><br><br>
  <input type="text" name="dealType" value=<%=PersianContent.getPhrase("dealType")%>><br><br>
  <input type="text" name="maxPrice" value=<%=PersianContent.getPhrase("maxPrice")%>><br><br>
  <input type="submit" value=<%=PersianContent.getPhrase("search")%>>
</form>

<form action="p2.jsp">
  <input type="text" name="buildingType" value=<%=PersianContent.getPhrase("buildingType")%>><br><br>
  <input type="text" name="area" value=<%=PersianContent.getPhrase("area")%>><br><br>
  <input type="text" name="dealType" value=<%=PersianContent.getPhrase("dealType")%>><br><br>
  <input type="text" name="price" value=<%=PersianContent.getPhrase("price")%>><br><br>
  <input type="text" name="address" value=<%=PersianContent.getPhrase("address")%>><br><br>
  <input type="text" name="phoneNumber" value=<%=PersianContent.getPhrase("phoneNumber")%>><br><br>
  <input type="text" name="info" value=<%=PersianContent.getPhrase("info")%>><br><br>
  <input type="submit" value=<%=PersianContent.getPhrase("addProperty")%>>
</form>

<form action="p3.jsp">
  <input type="text" name="credit" value=<%=PersianContent.getPhrase("credit")%>><br><br>
  <input type="submit" value=<%=PersianContent.getPhrase("increaseCredit")%>>
</form>
</body>
</html>
