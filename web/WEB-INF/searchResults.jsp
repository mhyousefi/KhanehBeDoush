<%@ page import="java.util.ArrayList" %>
<%@ page import="Entities.House" %>
<%@ page import="Entities.Database" %><%--
  Created by IntelliJ IDEA.
  User: hossein
  Date: 2/16/18
  Time: 3:25 PM
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
    <head>
        <title>Title</title>
    </head>
    <body>
        <%ArrayList<House> houses = Database.searchResult;%>
    </body>
</html>
