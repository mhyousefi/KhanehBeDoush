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
<%@ page import="Utilities.HouseFactory" %>


<html dir="rtl">
    <head>
        <title></title>
    </head>
    <body>
        <%
            String area = request.getParameter("area");
            String buildingType = request.getParameter("buildingType");
            String noPicURL = "/images/no-pic.jpg";
            String dealType = request.getParameter("dealType");
            String price = request.getParameter("price");
            String phoneNumber = request.getParameter("phoneNumber");
            String description = request.getParameter("description");
            String address = request.getParameter("address");
            String expireTime = "";
            String id = "";

            House newHouse = null;

            try {
                newHouse = HouseFactory.createHouseForUserInput(area, buildingType, noPicURL, dealType, expireTime, price, phoneNumber, description, address, id);
                Database.addHouse(newHouse);
            } catch (IllegalArgumentException e) {
                request.setAttribute("msg", "Deal type is invalid.");
        %>
            <jsp:forward page="index.jsp"/>
        <%
            }

            String message = "House with following info was added:";
            message += " id: " + newHouse.getId() + ",";
            message += " area: " + newHouse.getArea() + ",";
            message += " building type: " + newHouse.getBuildingType() + ",";
            message += " deal type: " + newHouse.getDealType() + ",";
            message += " base price: " + newHouse.getBasePrice() + ",";
            message += " cell price: " + newHouse.getSellingPrice() + ",";
            message += " rent price: " + newHouse.getRentPrice() + ",";
            message += " phone number: " + newHouse.getPhone() + ",";
            message += " description: " + newHouse.getDescription() + ",";
            message += " expire time: " + newHouse.getExpireTime();

            request.setAttribute("msg", message);
        %>
        <jsp:forward page="index.jsp"/>
    </body>
</html>