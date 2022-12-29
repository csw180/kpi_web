<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%//@ page import="tpms.common.web.CommonWebKeys"%>
<%//@ page import="tpms.framework.component.util.JSPUtil"%>
<%//@ page import="tpms.framework.component.signon.SignOnUserAccount"%>
<%//@ page import="tpms.framework.component.error.ErrorHandler"%>
<%//@ page import="tpms.framework.component.dao.*"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String logchk = JSPUtil.getParameter(request,"LOGIN","");
    String pGubun = JSPUtil.getParameter(request,"p_gubun",""); 

    session.setAttribute("p_gubun", pGubun);
    
if(logchk.equals("1")){
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<script language=javascript src="comm/news.js"></script>
<script language="javascript">
/*
function displayImg(){
    document.write("<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0' width='505' height='124'>");
    document.write("  <param name='movie' value='img/log_img01.swf'>");
    document.write("  <param name='quality' value='high'>");
    document.write("  <embed src='img/log_img01.swf' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='505' height='124'></embed>");
    document.write("</object>");
}*/
//-->
</script>
<title>성과관리시스템에 오신것을 환영합니다.</title>
<link href="css/css.css" rel="stylesheet" type="text/css">
<SCRIPT LANGUAGE="javascript" FOR="document" EVENT="onkeyup">
<!--
    /****************************
     enterKey 처리
    *****************************/
    try {
    var srcName=window.event.srcElement.getAttribute("name");
    with(document.existingcustomer)
    {
      switch(srcName)
            {
            case "j_password":
               if (window.event.keyCode==13) {
                  submit();
               }
               break;
            case "j_username":
		if (window.event.keyCode==13) {
		  eval("j_password").focus();
		}
        	break;
            default:
            	break;
            }// end switch
    }// end with
    }catch(e) {
    }
//-->
</SCRIPT>
<SCRIPT LANGUAGE="javascript">
    function loginselect(){
        window.open("loginchk.jsp?sian=1",'loginviewer','width=1000,height=700,menubar=0,scrollbars=yes,resizable=1');
    }
</SCRIPT>
</head>
<body background="img/log_bg.gif" leftmargin="0" topmargin="0" marginwidth="0">
<form  name="existingcustomer" action="j_signon_check.do" method="POST">
<input type="hidden" name="j_remember_username" value="Y">
<input type="hidden" name="FORM_ACTION_TYPE" value="">
<table width="505" height="100%" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr> 
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width="505" border="0" align="center" cellpadding="0" cellspacing="0">
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
          <td height="94" background="img/log_img03.gif"><table width="505" height="91" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td height="13">&nbsp;</td>
              </tr>
              <tr> 
                <td height="50">
                  <table width="503" border="0" align="center" cellpadding="0" cellspacing="0">
                    <tr> 
                      <td width="92" rowspan="2">&nbsp;</td>
                      <td width="88"><img src="img/log_id.gif" width="82" height="22"></td>
                      <td width="133"><input name="j_username" type="text" class="box11" value="" size="20" maxlength="10"></td>
                      <td width="80" rowspan="2"><img src="img/btn_log.gif" width="74" height="49" border="0" onclick="submit();" style="cursor:hand"></td>
                      <td width="110" rowspan="2">&nbsp;</td>
                    </tr>
                    <tr> 
                      <td width="88"><img src="img/log_pass.gif" width="82" height="27"></td>
                      <td width="133"><input name="j_password" type="password" class="box11" value="EKPUSER" size="20" maxlength="10" autocomplete="j_password"></td>
                    </tr>
                 </table></td>
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
          <td height="20">
            <div align="right"><img src="img/log_telimg.gif" width="20" height="10" valign="bottom">(02)2240-2834&nbsp;</div>
          </td>
        </tr>        
      </table>
    </td>
  </tr>  
</table>
<!-- <p class="logtext">&nbsp;</p> -->
</form>
</body>
</html>
<%
  String cookieUserId="";
  String cookieUserName="";
  Cookie[] cookies = request.getCookies();
  if (cookies != null) {
      for (int loop = 0; loop < cookies.length; loop++) {
          if (cookies[loop].getName().equals("bp_signon")) {
               cookieUserId=cookies[loop].getValue();
          }
          if (cookies[loop].getName().equals("bp_signon_user_name")) {
               cookieUserName=cookies[loop].getValue();
          }
      }
  }
%>
<script language="javascript">
<!--
with(document.existingcustomer)
{
	eval("j_username      " ).value="<%= cookieUserId %>";
	if ("<%=cookieUserId%>".length>0) {
		eval("j_password      " ).focus();
	}else{
		eval("j_username      " ).focus();
	}
}
-->
</script>
<%
  String message=null;
  try {
    message=request.getParameter("FORM_MESSAGE");
    if (message !=null && message.length()>2 ) {
%>
<script language="javascript">
<!--
	alert("<%=message %>");
-->
</script>
<%
    }
  }catch(Exception exxx) {}
}%>
