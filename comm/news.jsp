<%--===============================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : ABC
'프로그램 ID  : news.jsp
'프로그램 명  : 공지 사항
'프로그램개요 : 공지 사항
'작   성   자 : 변휘원
'작   성   일 : 2006.06.14
====================================================================
'수정자/수정일 :
'수정사유      :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.util.Calendar"%>
<%@ page import="java.util.Date"%>
<%//@ page import="tpms.common.web.CommonWebKeys"%>
<%//@ page import="tpms.framework.component.util.JSPUtil"%>
<%//@ page import="tpms.framework.component.signon.SignOnUserAccount"%>
<%//@ page import="tpms.framework.component.error.ErrorHandler"%>
<%//@ page import="tpms.framework.component.dao.*"%>

<%@ include file="/module/jsp_header.inc"%>

<%!
    // 파라미터로 받은 일자를  중심으로 diff 만큼의 전후 일자를 리턴
    // gubun = 1 day, 2 month, 3 year
    public static String getSpcDate(String vDay, int gubun, int diff){
        String date = "";

        String sYear  = vDay.substring(0, 4);
        String sMonth = vDay.substring(4, 6);
        String sDay   = vDay.substring(6, 8);
        Calendar cal  = Calendar.getInstance();

        cal.set( Integer.parseInt(sYear), Integer.parseInt(sMonth) -1 ,Integer.parseInt(sDay)) ;

        if(gubun == 1 )     cal.add(Calendar.DATE, diff);
        else if(gubun == 2) cal.add(Calendar.MONTH, diff);
        else if(gubun == 3) cal.add(Calendar.YEAR, diff);

        int todayMonth = cal.get(Calendar.MONTH) + 1;
        date = "" + cal.get(Calendar.YEAR);

        if (todayMonth < 10) {
            date += "0" + todayMonth;
        } else {
            date += Integer.toString(todayMonth);
        }

        int day = cal.get(Calendar.DAY_OF_MONTH);
        if(day < 10){
            date += "0"+ day;
        }else{
            date += day;
        }
        return date;
    }
%> 

<%  String topmenu_name="시스템관리"; 
    String leftmenu_name="메뉴관리"; 
    String htm_title="비밀번호변경"; 
    String actionname="comm.password.do";
    String haengwon_no = "";
%>
<%@ include file="/module/htm_header.inc"%>
<link rel="stylesheet" href="css/css.css" type="text/css">
<script language=javascript src="comm/news.js"></script>
<%@include file="/module/htm_title.inc"%>
<body>
<body  leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<div align="left">
  <table width="100%" height="507" border="0" cellpadding="0" cellspacing="0">
    <tr> 
      <td height="18" colspan="5"><img src="img/bullet_back.gif" width="1" height="18"></td>
    </tr>
    <tr> 
      <td width="15"><img src="img/bullet_back.gif" width="15" height="1"></td>
      <td style="vertical-align:top;width:800px !important;">
      	<img src="img/img_mainVisual.png">
      </td>
      <td class="vtm" style="text-align:left;display:flex;flex-direction:column;align-items:flex-start;padding:0 10px;">
      <table border="0" cellspacing="0" cellpadding="0" width="100%" class="pdLR">
         
          <tr> 
            <td class="bg_notice">
	            <div class="vtm" style="width:100%;position:relative;right:0px;">
	           		<span class="main_boardTitle">공지사항</span>
	         		<span style="text-align:right;width:430px;font-family:맑은고딕;position:absolute;right:0px;"><a href="javascript:call_News(1)" class="more">더보기+</a></span>
	          	</div>
          	</td>
          </tr>
         
          <tr>
            <td height="10">
        	  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mgT5">
	        <%  
			   DbResultSet rs1      = null;
			   DBProcCall  cp       = new DBProcCall();
			   int cnt              = 0;
			   
			   //현재일자
			   SimpleDateFormat formatter  = new SimpleDateFormat ("yyyyMMdd");
			   String strCurrDate = formatter.format(new Date(System.currentTimeMillis()));
			 
			   try
			   {
			       rs1 = cp.callProc("UP_KPI_C_S_CO공지사항", "1,3");
			       if(rs1 != null)                       
			       {
			            rs1.first();
			            while(rs1.next()){
			                cnt++;
			                if(cnt > 7 ) break;
	              
			%>
                <tr> 
                  <td width="5" class="pdT6"><img src="img/ico_bdot.png" class="vtm mgL10"></td>
                  <td width="514" class="pdT6">
                  	<a href="javascript:call_Newsarg(1,'key=<%=rs1.getString("작성일자")%><%=rs1.getString("작성시간")%>')">
                  	<%=(rs1.getString("제목").length() <= 24) ? rs1.getString("제목") : rs1.getString("제목").substring(0, 24) + "..."%>
					<%
	                  // 현재일자와 공지완료일을 비교하여 'new.gif' display
	                  int iNotEndDt = new Integer(rs1.getString("공지완료")).intValue();
	                  int iCurrDt   = new Integer(strCurrDate).intValue();
	                  if(iNotEndDt >= iCurrDt)
	                  {
	                    out.println("<img src='img/new.gif'>");
	                  }
					%>               
                  </a></td>
                  <td width="66" class="pdT6"><%=JSPUtil.FormatDate(rs1.getString("작성일자"))%></td>
                </tr>
                <tr> 
                  <td height="1" colspan="3"><img src="img/line_01.gif" width="100%" height="1"></td>
                </tr>

			        <%              
			            }
			       }
			    }catch(Exception ex) {
			    }
			%>
			        <% for(;cnt < 7;cnt++){ %>
                <tr> 
                  <td width="5"><img src="img/ico_bdot.png" class="vtm mgL10"></td>
                  <td width="514"></td>
                  <td width="66"></td>
                </tr>
                
       			 <% }%>
              </table></td>
          </tr>
          <tr> 
            <td height="15"></td>
          </tr>
        </table>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR">
          <tr> 
            <td class="bg_notice">
	            <div class="vtm" style="width:100%;position:relative;right:0px;">
	           		<span style="text-align:left;font-weight:bold;font-family:맑은고딕;width:430px;padding-left:10px;">게시판</span>
	         		<span style="text-align:right;width:430px;font-family:맑은고딕;position:absolute;right:0px;"><a href="javascript:call_News(2)" class="more">더보기+</a></span>
	          	</div>
          	</td>
          </tr>
          
          <tr> 
            <td height="10">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mgT5">
			<% try
			   {   cnt = 0;
			       rs1 = cp.callProc("UP_KPI_C_S_CO공지사항", "2,2");
			       if(rs1 != null)                       
			       {
			            rs1.first();
			            while(rs1.next()){
			                cnt++;
			                if(cnt > 7 ) break;
			%>
                <tr> 
                  <td width="5" class="pdT8"><img src="img/ico_bdot.png" class="vtm mgL10"></td>
                  <td width="514" class="pdT8">
                  <a href="javascript:call_Newsarg(2,'key=<%=rs1.getString("작성일자")%><%=rs1.getString("작성시간")%>')">
                  <%=(rs1.getString("제목").length() <= 24) ? rs1.getString("제목") : rs1.getString("제목").substring(0, 24) + "..."%>
                  
<%                // 작성일자 이후 7일까지 new.gif Display.. 
                  int iNewBtnDispDt     = new Integer(getSpcDate(rs1.getString("작성일자"), 1, 7)).intValue();
                  int iNewBtnCurrDt     = new Integer(strCurrDate).intValue();
                  if(iNewBtnDispDt >= iNewBtnCurrDt)
                  {
                    out.println("<img src='img/new.gif'>");
                  }
%>
                  </a></td>
                  <td width="66" class="pdT8"><%=JSPUtil.FormatDate(rs1.getString("작성일자"))%></td>
                </tr>
                <tr> 
                  <td height="1" colspan="3"><img src="img/line_01.gif" width="100%" height="1"></td>
                </tr>
        <%              
            }
       }
    }catch(Exception ex) {
    }
%>
        <% for(;cnt < 7;cnt++){ %>
                <tr> 
                  <td width="5"><img src="img/ico_bdot.png" class="vtm mgL10"></td>
                  <td width="514"></td>
                  <td width="66"></td>
                </tr>
                <tr> 
                  <td height="1" colspan="3"><img src="img/line_01.gif" width="100%" height="1"></td>
                </tr>
        <% }%>
              </table></td>
          </tr>
        </table>
        <map name="MapMap">
          <area shape="rect" coords="353,6,389,19" href="javascript:call_News(2)">
        </map>
        <br>             
        <table width="98%" border="0" cellspacing="0" cellpadding="0" align="center" class="pdLR box_tel" style="border-radius:5px;">
          <tr> 
            <td>
          		<table width="401" border="0" cellspacing="0" cellpadding="0" class="pdTB">
                <tr> 
                  <td width="68" height="23" align="center"><img src="img/boby_bullet01.gif" width="43" height="16"></td>
                  <td width="333" height="23">[현업] 전략기획부 송수영 <font color="F6771A">(☎ 
                    2240-2892)</font></td>
                </tr>
                <tr> 
                  <td height="23" align="center"><img src="img/boby_bullet01.gif" width="43" height="16"></td>
                  <td height="23">[전산] IT개발부 이상용 <font color="F6771A">(☎ 2240-2749)</font></td>
                </tr>
                <tr> 
                  <td height="23" align="center"><img src="img/boby_bullet01.gif" width="43" height="16"></td>
                  <td height="23">[전산] 일일성과 IT개발부 이우석 <font color="F6771A">(☎ 2240-3006)</font></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>           
        <table width="401" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>
              <table width="401" border="0" cellspacing="0" cellpadding="0">
                <tr> 
                  <td height="20" colspan="3">
                </tr>
              </table>
            </td>
          </tr>
        </table> 
      </td>
      <!-- <td width="15"><img src="img/bullet_back.gif" width="15" height="1"></td> -->
    </tr>
  </table>  
</div>
<map name="Map">
  <area shape="rect" coords="353,6,389,19" href="javascript:call_News(1)">
</map>
<%@include file="/module/htm_footer.inc"%>
