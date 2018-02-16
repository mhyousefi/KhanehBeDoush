<%--
  Created by IntelliJ IDEA.
  User: hossein
  Date: 2/16/18
  Time: 12:44 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="Entities.House" %>

<%
    House newHouse = new House(
      request.getAttribute("area").toString(),
      request.getAttribute("buildingType").toString(),
      request.getAttribute("")
    );
%>