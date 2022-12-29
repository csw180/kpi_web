<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="module/jsp_header.inc"%>
<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 일일운영관리
'프로그램 ID  : top_menu.jsp
'프로그램 명  : TOP 메뉴
'프로그램개요 : 사용자별 TOP 메뉴를 구성한다.
'작   성   자 : 변휘원
'작   성   일 : 2006.03.21
====================================================================
'수정자/수정일 :
'수정사유      :
===============================================================--%>
<%@ page import="java.text.*"%>
<%@ page import="java.util.*"%>
<%//@ page import="tpms.common.web.CommonWebKeys"%>
<%//@ page import="tpms.framework.component.util.JSPUtil"%>
<%//@ page import="tpms.framework.component.signon.SignOnUserAccount"%>
<%//@ page import="tpms.framework.component.error.ErrorHandler"%>
<%//@ page import="tpms.framework.component.dao.*"%>
<%@ page import="tpms.comm.scr.*"%>
<% 
	String haengwon_no   = "";
   	String haengwon_name = "";
   	String menu_group    = JSPUtil.getParameter(request,"group","");
   	String menu_gubun    = "";
   	String branchName    = "";
   	DbResultSet rs       = null;  
   	DBProcCall  cp       = new DBProcCall();   

   	String defaultTop    = ""; //메뉴관련 default 설정부 
   
   	try
   	{
    	Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (int loop = 0; loop < cookies.length; loop++) {
            	if (cookies[loop].getName().equals("topitem")) {
                    menu_gubun=cookies[loop].getValue();
                }
            }
        }
	} catch(Exception e) {
	}
   
	if(menu_group.equals("999999")) menu_gubun="10000";
  		
	try {
       	SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);
       	haengwon_no   = account.getHaengwon_no();
       	haengwon_name = account.getHaengwon_name();
       	branchName    = account.getBranch_name();
       	//rs            = cp.callProc("wp_co메뉴목록","TOP,00000,"+haengwon_no);
       	rs            = cp.callProc("UP_KPI_S_S_CO메뉴목록","TOP,00000,"+haengwon_no);
       	
       	
       	
	} catch(Exception exx) {
  	}
   
    SimpleDateFormat formatter  = new SimpleDateFormat ("yyyyMMdd");
    String    strCurrDate       = formatter.format(new Date(System.currentTimeMillis()));          
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>성과</title>
<link rel="stylesheet" href="css/css.css" type="text/css">
<style type="text/css">
	.logo {width:190px;text-align:center;font-size:18px;background:#345677;color:#ffffff;font-weight:bold;line-height:35px;display:block;}
	.menu {color:#000000;line-height:35px;font-family:맑은 고딕;font-size:14px;}
	td.on { background:#4e7192; color:#ffffff;font-weight:bold;font-family:맑은 고딕;  }	
	.menu:hover {background:#4e7192 !important;color:#ffffff;font-weight:bold;font-family:맑은 고딕;}
	.menu:after {content:'\';display:block;position:relative;width:1px; height:15px;right:3px;top:15px;}
</style>
</head>
<script language=javascript src="module/common.js"></script>
<script language="javascript" src="/kpi/script/jquery-1.7.2.min.js"></script>
<script language=javascript src="module/top_menu.js"></script>
<BODY BGCOLOR=#FFFFFF LEFTMARGIN=0 TOPMARGIN=0 MARGINWIDTH=0 MARGINHEIGHT=0 onLoad="MM_preloadImages('img/topmenu_01over.gif','img/topmenu_02over.gif','img/topmenu_06over.gif','img/topmenu_03over.gif','img/topmenu_04over.gif','img/topmenu_05over.gif')"  oncontextmenu="return false" onselectstart="return false" ondragstart="return false">
<table width="100%" height="58" border="0" cellpadding="0" cellspacing="0">
  	<tr>
  		<td>
	      	<table width="100%" height="54" border="0" cellpadding="0" cellspacing="0">
	        	<tr> 
	          		<td height="27">
			          	<table width="100%" height="27" border="0" cellpadding="0" cellspacing="0">
			            	<tr> 
				                <td width="190" height="27"><img src="img/top02_ci.gif" width="190" height="27"></td>
				                <td width="200" height="27" colspan="3">&nbsp;</td>
				                <td height="27" colspan="4">
				                  	<table width="100%" border="0" cellspacing="0" cellpadding="0">
					                	<tr> 
					                    	<td>
						                    	<div align="right">
							                   		<table border="0" cellspacing="0" cellpadding="0" align="right">
							                        	<tr> 
							                            	<td width="11"><img src="img/icon_people.gif" class="vtm"></td>
							                              	<td align="right"> 
								                                <!-- 금융기획부 최종식(940106) -->
								                                <font color="#555555">&nbsp;&nbsp;<%=branchName%>&nbsp;</font>
							                              	</td>
							                              	<td align="left"> 
								                                <!-- 금융기획부 최종식(940106) -->
								                                <font color="#555555" class="name"><%=haengwon_name%>(<%=haengwon_no%>)&nbsp;&nbsp;</font>
							                              	</td>
							                              	<td width="223"> 
								                                <div align="right">
								                                	<a href="javascript:call_Home('MainPage.do')">Home</a> | 
								                                  	<a href="javascript:call_News(1)">공지사항</a> | 
								                                  	<a href="javascript:call_News(2)">게시판</a> | 
								                                </div>
							                              	</td>
							                              	<td width="70">
								                              	<div align="right" class="mgT3">
								                              		<a href="javascript:call_Home('0')">
								                              		<span style="background:#0879ba;color:#ffffff;padding:2px 7px;border-radius:3px;">로그아웃</span>
								                              		<!-- <img src="img/util_logout.gif" width="62" height="15" border="0"> --></a>
								                              	</div>
							                              	</td>
							                              	<td width="9"></td>
														</tr>
							                      	</table>
						                     	</div>
					                      	</td>
					                 	</tr>
				                	</table>
				             	</td>
			            	</tr>
			        	</table>
	          		</td>
	        	</tr>
	        	<tr> 
		          	<td height="35" style="background:#e9f2fb;color:#cccccc;">
			          	<table width="99%" height="35" border="0" cellpadding="0" cellspacing="0">
			            	<tr> 
			                	<td width="190" height="35">
			                		<div>
			                			<a href="javascript:call_Home('MainPage.do')"><span class="logo">성과관리시스템</span></a>
			                		</div>
<% 
	int icnt=0;
	int widthlen=0;
	
	try
	{
		if(rs != null)                       
	    {
			int width = 100 / rs.getRowCount();
	    	rs.first();
	        while(rs.next())
	        {
				if(rs.getString("메뉴종류").trim().equals("TOP")){
	            icnt++;
%>               
									<td class="menu" style="width:<%=width%>%;text-align:center; cursor:pointer; " id="0<%=icnt%>" onclick="call_left_menu('<%=rs.getString("프로그램ID").trim()%>', '<%=rs.getString("프로그램URL").trim()%>', '<%=icnt%>', encodeURI('<%=rs.getString("프로그램명").trim()%>'));" >
										<span><%=rs.getString("프로그램명").trim()%></span>
									</td>
<%
				}
			}
		}

	} catch(Exception exx)  {
	}
	%>
	                		<td width="50%" height="27"></td>
	              		</tr>                   
	            	</table>
	          	</td>
	        </tr>
		</table> 
    </td>
  </tr>
  <tr> 
    <td height="5"></td>
  </tr>
</table>
</BODY>
</html>
<script language="JavaScript">
    default_top_menu('<%=defaultTop%>');   //메뉴관련 default 설정부 
<%
    DbResultSet rs1      = null;
    try
    {
        rs1 = cp.callProc("UP_KPI_C_S_CO공지사항", "1,2");
        rs1.first();
        if(rs1.next())
        {
%>    
             if(getCookie("tpms_news_<%=strCurrDate%>") != "done") call_News(3);
<%
        }
    }catch(Exception ex) {
    }
%>
</script>