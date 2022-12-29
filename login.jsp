<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="tpms.framework.component.signon.dao.*"%>
<%@ page import="tpms.framework.component.util.JSPUtil"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Untitled Document</title>
<style type="text/css">
<!--
body {
	margin-top: 15%;
}
div.block {
	border-left-width:1px;
	border-right-width:1px;
	border-right-style: solid;
	border-left-style: solid;
	border-right-color: DCDCDC;
	border-left-color: DCDCDC;
}
-->
</style></head>

<body>
<table width="565" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td colspan="2"><img src="img/module_top.gif" width="270" height="26"></td>
  </tr>
  <tr>
    <td height="10" colspan="2" background="img/module_table_01.gif"></td>
  </tr>
  <tr>
    <td width="270" height="230" background="img/module_img.jpg">&nbsp;</td>
    <td valign="bottom" background="img/module_right_bg.gif" >
      <table width="295" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td height="31" valign="bottom">
            <div align="center"><img src="img/module_txt1.gif" width="240" height="18"></div>
          </td>
        </tr>
        <tr>
          <td height="4">
          </td>
        </tr>
        <tr>
          <td height="40" valign="top">
            <div align="center"><img src="img/module_bar.gif" width="270" height="22"></div>
          </td>
        </tr>
        <tr>
          <td height="155" background="img/module_txt.gif">&nbsp;</td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td height="10" colspan="2" background="img/module_table_02.gif"></td>
  </tr>
</table>
</body>
</html>
<%
/*
    String pLogout =JSPUtil.getParameter(request,"logout",""); 
    if("YES".equals(pLogout)) {
        UserDAO userDAO = new UserDAO();
        userDAO.insertLog((String)request.getSession().getAttribute("j_signon_username"), "02", request.getRemoteAddr());
    }
*/    
%>
<script language="javascript">
<!--   
	self.location="mainlogin.jsp?LOGIN=1";
-->
</script>
