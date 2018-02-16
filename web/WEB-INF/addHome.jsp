<%--
  Created by IntelliJ IDEA.
  User: hossein
  Date: 2/16/18
  Time: 12:44 PM
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="Entities.House" %>
<%@ page import="Entities.Database" %>


<html>
    <head>
        <title></title>
    </head>
    <body>
        <%
            String area = request.getParameter("area");
            String buildingType = request.getParameter("buildingType");
            String noPicURL = "/Images/no-pic.jpg";
            String dealType = request.getParameter("dealType");
            String price = request.getParameter("price");
            String phoneNumber = request.getParameter("phoneNumber");
            String description = request.getParameter("info");
            String expireTime = "";

            House newHouse = new House(area, buildingType, noPicURL, dealType, price, price, price, phoneNumber, description, expireTime);
            Database.addHouse(newHouse);

            String message = "House with following info was added:";
            message += "id: " + newHouse.getId() + "\n";
            message += "area: " + newHouse.getArea() + "\n";
            message += "building type: " + newHouse.getBuildingType() + "\n";
            message += "deal type: " + newHouse.getDealType() + "\n";
            message += "base price: " + newHouse.getBasePrice() + "\n";
            message += "cell price: " + newHouse.getSellPrice() + "\n";
            message += "rent price: " + newHouse.getRentPrice() + "\n";
            message += "phone number: " + newHouse.getPhone() + "\n";
            message += "description: " + newHouse.getDescription() + "\n";
            message += "expire time: " + newHouse.getExpireTime() + "\n";

            request.setAttribute("msg", message);
        %>
        <jsp:forward page="../index.jsp"/>
    </body>
</html>