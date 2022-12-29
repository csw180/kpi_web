<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="tpms.framework.component.util.JSPUtil"%>
<%  
    String Mess=JSPUtil.getParameter(request,"Mess","");
	System.out.println("Mess : " + Mess);
%>
<html>
<head>
<script language=javascript src="comm/news.js"></script>
<script language="javascript">
</script>
<title>성과관리시스템</title>
<link href="css/css.css" rel="stylesheet" type="text/css">
<SCRIPT LANGUAGE="javascript">
    function loginselect(){
        window.open("loginchk.jsp?sian=1",'loginviewer','width=1000,height=700,menubar=0,scrollbars=yes,resizable=1');
    }
</SCRIPT>
</head>
<body background="img/log_bg.gif" leftmargin="0" topmargin="0" marginwidth="0">
<form>
	<table width="505" height="100%" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr> 
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>
    	<table width="505" border="0" align="center" cellpadding="0" cellspacing="0">
        <tr> 
          <td><img src="img/log_ci.gif" width="91" height="28"></td>
        </tr>
        <tr> 
          <td>
            <script>displayImg('1')</script>            
          </td>
        </tr>
        <tr> 
          <td><img src="img/log_img02.gif" width="505" height="119"></td>
        </tr>
        <tr> 
          <td height="94" background="img/log_img03.gif">
          	<table width="505" height="91" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td height="13">&nbsp;</td>
              </tr>
              <tr> 
                <td height="50">
                  <table width="503" border="0" align="center" cellpadding="0" cellspacing="0">
                    <tr> 
                      <td width="92" rowspan="2">&nbsp;</td>
                      <td width="500">                          	        	
                      	<table width="500" border="0" cellspacing="0" cellpadding="0">
                          <tr> <font color="darkblue" size="3"><b>&nbsp; 연결이 종료 되었습니다. </b></font> </tr>
                          <tr> <font color="darkblue" size="3"><b>&nbsp; SSO를 통해서만 접속이 가능합니다. </b></font> </tr>
                        </table>
                     </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr> 
                <td height="32"><div align="center">  </div></td>
              </tr>              
            </table>
          </td>
        </tr>
        <tr> 
          <td><img src="img/log_line.gif" width="505" height="10"></td>
        </tr>
        <tr> 
          <!-- 운영
          <td height="20"> SSO연결 : <a href="http://shsso.suhyup.co.kr:7060//nls3/clientLogin.jsp">http://shsso.suhyup.co.kr:7060/</a></td>
          -->
          <td height="20"> SSO연결 : <a href="http://shssotest.suhyup.co.kr:7060/nls3/clientLogin.jsp">http://sso.suhyup.co.kr:7060/</a></td>
      </table>
    </td>
</table>
<!-- <p class="logtext">&nbsp;</p> -->
</form>
</body>
</html>