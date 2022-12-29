<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="tpms.common.web.CommonWebKeys"%>
<%@ page import="tpms.framework.component.util.JSPUtil"%>
<%@ page import="tpms.framework.component.signon.SignOnUserAccount"%>
<%@ page import="tpms.framework.component.error.ErrorHandler"%>
<%@ page import="tpms.framework.component.dao.*"%>
<%//@ page import="sso.cipher.*"%>
<%@ include file="/module/jsp_header.inc"%>    
<% 
  	String j_username   = "";
  	String sso_userId   = "";
  	String sso_sync_id = (String)session.getAttribute("SSO_SYNC_ID");

	if(sso_sync_id != null && sso_sync_id.length() > 0){
		// SSO 접속
		j_username= sso_sync_id;
		session.setAttribute("SSO_SYNC_ID", "");
	}else{
		// EKP 접속
		//SSOCipher ssoCipher = new SSOCipher();
		try
		{         
			Cookie[] cookies = request.getCookies();
			if (cookies != null) {
				for (int loop = 0; loop < cookies.length; loop++) {
					if (cookies[loop].getName().equals("sso_userId")) {
						sso_userId=cookies[loop].getValue();
					}
				}
			}
		}catch(Exception e){
		}
	}    

	/*
	String uurl = request.getParameter("UURL");
	
	System.out.println("*================== [login1.jsp]  uurl = "+uurl);

	if(!"".equals(uurl) && uurl != null) {
		session.setAttribute("UURL", uurl);
	} else {
		session.removeAttribute("UURL");
	}
	*/
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
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
<form  name="existingcustomer" action="j_signon_check.do" method="POST">
<input type=hidden name=j_remember_username value="Y">
<input type=hidden name=FORM_ACTION_TYPE value="">
<input type="hidden" name="j_username" value="<%=j_username%>">
<input type="hidden" name="j_password" value="EKPUSER">
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
</form>
</body>
</html>
<script language="javascript">
 document.existingcustomer.submit();
 </script>