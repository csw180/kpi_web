<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.text.*"%>
<%@ page import="java.util.*"%>
<%//@ page import="tpms.common.web.CommonWebKeys"%>
<%//@ page import="tpms.framework.component.util.JSPUtil"%>
<%//@ page import="tpms.framework.component.signon.SignOnUserAccount"%>
<%//@ page import="tpms.framework.component.error.ErrorHandler"%>
<%//@ page import="tpms.framework.component.dao.*"%>
<%//@ page import="tpms.framework.security.SecurityUtils"%>
<%@ include file="/module/jsp_header.inc"%>
<%
    DBProcCall cp = new DBProcCall();
    
    String Haengwon_no  = "";
    String jumin_no     = "";
    
    String dbencpasswd  = "";
    String ssencpasswd  = "";
    
    String UURL = "";
    session.setAttribute("LOGIN_CNT", 0);
    
    Cookie[] cookies = request.getCookies();
	if (cookies != null) {
		for (int loop = 0; loop < cookies.length; loop++) {
			if (cookies[loop].getName().equals("tmpUurl")) {
				UURL=cookies[loop].getValue();
				cookies[loop].setValue("");
				System.out.println("*================== [template.jsp] cookie uurl null setting");
				cookies[loop].setMaxAge(0);
				
				response.addCookie(cookies[loop]);
			}
		}
	}
	
	//System.out.println("*================== [template.jsp] cookie uurl = "+UURL);
    
    
    if("".equals(UURL) || UURL == null) {
    	UURL = "comm.news.screen"; //kpi.rpop.rpop_4010.screen
    }
    
    int date_chk = -1;
    int pswd_chk = -1;
    
    try {
        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);        
        Haengwon_no = account.getHaengwon_no();
        
        date_chk    = Integer.parseInt(account.get_passwdupdateday());
        pswd_chk    = Integer.parseInt(account.get_passwdpasschk());
        
        //DbResultSet rs   = null; 
        //rs = cp.callProc("wp_co로그인", Haengwon_no);
        //
        //if (rs!=null) {
        //    rs.first();
        //    if(rs.next()) 
        //        jumin_no = rs.getString("주민번호");
        //}
        //
        //if(jumin_no!=null)
        //    dbencpasswd = SecurityUtils.encrypt(jumin_no.trim().substring(6));
        //ssencpasswd = account.getPswd_no();
        
        //초기화비밀번호 체크 못하도록 변경[SSO 연동으로 불필요]
        dbencpasswd = "Y";
        ssencpasswd = "N";
    } catch(Exception ex) {}
%>
<%    
	if(pswd_chk >= 3){ %>
<script>
    var width_v  = 400;
    var height_v = 350;
	var top_x    = (window.screen.width - width_v)/2;
	var top_y    = (window.screen.height - height_v)/2;
	open("comm.password.screen?gubun=2&msg=비밀번호 3회 오류 입니다.<br>주민번호 확인후 신규 비밀번호를 등록 하세요 ","비밀번호변경","top="+top_y+",left="+top_x+",width="+width_v+",height="+height_v+",scrollbars=no,status=no,toolbar=no,menubar=no,location=no,directories=no,resizable=no");
</script>
<%  //} else if(ssencpasswd.equals(dbencpasswd)) {
    %>
<script>
	/*
    var width_v  = 400;
    var height_v = 350;
	var top_x    = (window.screen.width - width_v)/2;
	var top_y    = (window.screen.height - height_v)/2;
	open("comm.password.screen?gubun=1&msg=초기화된 비밀번호를 변경하세요&msg1=(주민번호 뒷자리입력)","비밀번호변경","top="+top_y+",left="+top_x+",width="+width_v+",height="+height_v+",scrollbars=no,status=no,toolbar=no,menubar=no,location=no,directories=no,resizable=no");
	*/
</script>
<%    
    } else if(date_chk < 90 && pswd_chk < 3) {
    
    	/*
    	try {
            cp.InputProc("wp_co비밀번호오류체크","0,"+Haengwon_no);
        }catch(Exception ex) {

        }
    	*/
%>
<!DOCTYPE html>
<html>
<head>
<title>성과관리시스템</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1">
<script language="javascript">
	document.cookie = "tmpUurl" + "=" + escape("") + "; path=/";
</script>
</head>
<frameset rows="63,*" frameborder="NO" border="0" framespacing="0">
  <frame src="top_menu.jsp?group=999999" name="topFrame" scrolling="NO" noresize>  
  <frameset cols="190,15,*" id="frame_body" name="frame_body" frameborder="NO" border="0" framespacing="0">
    <frame src="left_menu.jsp?group=999999" name="leftFrame" scrolling="YES" noresize>
    <frame src="bar_left.html" name="frame_bar_left" frameborder="no" scrolling="no" noresize marginwidth="0" marginheight="0">
    <!--  frame src="comm.news.screen" name="mainFrame"-->
    <frame src="<%=UURL %>" name="mainFrame">
  </frameset>
</frameset>
<noframes><body>
</body></noframes>
</html>
<%  } else {%>
<script>
    var width_v  = 400;
    var height_v = 350;
	var top_x    = (window.screen.width - width_v)/2;
	var top_y    = (window.screen.height - height_v)/2;
	open("comm.password.screen?gubun=1&msg=비밀번호변경 90일이 지났습니다.  비밀번호를 변경 하세요","비밀번호변경","top="+top_y+",left="+top_x+",width="+width_v+",height="+height_v+",scrollbars=no,status=no,toolbar=no,menubar=no,location=no,directories=no,resizable=no");
</script>

<%  }%>