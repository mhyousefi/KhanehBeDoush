<%--
  Created by IntelliJ IDEA.
  User: hossein
  Date: 2/14/18
  Time: 7:17 PM
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" %>


<html>
    <head>
        <title>Home Page</title>
    </head>
    <body>



///////////////////
    <servlet>
        <servlet-name>HasPaidForPhoneNum</servlet-name>
        <jsp-file>index.jsp</jsp-file>
    </servlet>

    <servlet-mapping>
        <servlet-name>HasPaidForPhoneNum</servlet-name>
        <url-pattern>/hasPaidForPhoneNum</url-pattern>
    </servlet-mapping>


////////////////////
    <servlet>
        <servlet-name>GetHomeById</servlet-name>
        <jsp-file>index.jsp</jsp-file>
    </servlet>

    <servlet-mapping>
        <servlet-name>GetHomeById</servlet-name>
        <url-pattern>/getHomeById</url-pattern>
    </servlet-mapping>

////////////////////
    <servlet>
        <servlet-name>ShowHousePhoneNumberAction</servlet-name>
        <jsp-file>index.jsp</jsp-file>
    </servlet>

    <servlet-mapping>
        <servlet-name>ShowHousePhoneNumberAction</servlet-name>
        <url-pattern>/showHousePhoneNumber</url-pattern>
    </servlet-mapping>

////////////////////
    <servlet>
        <servlet-name>searchResults</servlet-name>
        <jsp-file>index.jsp</jsp-file>
    </servlet>

    <servlet-mapping>
        <servlet-name>searchResults</servlet-name>
        <url-pattern>/searchResults</url-pattern>
    </servlet-mapping>

/////////////////////
    <servlet>
        <servlet-name>AddHouseAction</servlet-name>
        <jsp-file>index.jsp</jsp-file>
    </servlet>

    <servlet-mapping>
        <servlet-name>AddHouseAction</servlet-name>
        <url-pattern>/addHouse</url-pattern>
    </servlet-mapping>

////////////////////
    <servlet>
        <servlet-name>IncreaseCreditFormAction</servlet-name>
        <jsp-file>index.jsp</jsp-file>
    </servlet>

    <servlet-mapping>
        <servlet-name>IncreaseCreditFormAction</servlet-name>
        <url-pattern>/increaseCredit</url-pattern>
    </servlet-mapping>

    </body>
</html>
