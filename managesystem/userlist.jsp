<?xml version="1.0" ?>
<%--===============================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : 일일운영관리
'프로그램 ID  : DailyReport.jsp
'프로그램 명  : 일일운영결과보고서
'프로그램개요 : 일일운영결과보고서.
'작   성   자 : 변휘원
'작   성   일 : 2006.03.21
====================================================================
'수정자/수정일 :
'수정사유      :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="tpms.common.web.CommonWebKeys"%>
<%@ page import="tpms.framework.component.util.JSPUtil"%>
<%@ page import="tpms.framework.component.signon.SignOnUserAccount"%>
<%@ page import="tpms.framework.component.error.ErrorHandler"%>
<%@ page import="tpms.framework.component.dao.*"%>
<%@ page import="tpms.managesystem.menu.User_EventResponse"%>
<% 

    DbResultSet rs    = null;

    Exception piex    = null;
    String strErrMsg  = "";
	String strMsg     = "";
    String hidden_key = "";
    User_EventResponse eventResponse;
    int manager = 0;

    try {
        piex=(Exception)request.getAttribute(CommonWebKeys.EXCEPTION_OBJECT);
        if (piex !=null) {
            strErrMsg =new ErrorHandler(piex).loadPopupMessage();
        }else{
            eventResponse=(User_EventResponse)request.getAttribute("User_EventResponse");
         
            if (eventResponse !=null) {

              rs=eventResponse.getmenulist();
              hidden_key=eventResponse.getcEvent();
			  System.out.println("#####################" + hidden_key);
            }              
        }                  
    }catch(Exception exx) {
        System.out.println("에러났어여 :"+exx.toString());
    }

	try
	{
		if(rs==null){
			System.out.println("Result set is Null===============" + strMsg);
		}else{
			System.out.println("Result set Not Null===============" + strMsg);
		}
		if(rs==null){
	    	if(hidden_key.equals("2")){
				strMsg = "등록 완료 되었습니다.";
			}else if(hidden_key.equals("3")){
				strMsg = "비밀번호 변경 완료 되었습니다.";
			}else if(hidden_key.equals("4")){
				strMsg = "암호화 완료 되었습니다.";
			}else if(hidden_key.equals("5")){
				strMsg = "접속제한 해제 완료 되었습니다.";
			}
			System.out.println(strMsg);%>
<RESULT>
<TR-ALL>OK</TR-ALL>
	<MESSAGE><![CDATA[<%=strMsg%>]]></MESSAGE>
</RESULT>
<%		}else if(rs != null){%>
<SHEET>
	<DATA >
<%			rs.first();
            while(rs.next()){%>
			<TR>
				<TD>R</TD>   
				<TD></TD>
				<TD><%=rs.getString("직원번호").trim()%></TD>
				<TD><%=rs.getString("성명").trim()%></TD>
				<TD><%=rs.getString("점번호").trim()%></TD>
				<TD><%=rs.getString("점명").trim()%></TD>
				<TD><%=rs.getString("잡레벨코드").trim()%></TD>
				<TD><%=rs.getString("잡레벨명").trim()%></TD>
				<TD><%=rs.getString("주민번호").trim()%></TD>
				<TD><%=rs.getString("비밀번호").trim()%></TD>
				<TD><%=rs.getString("접근제한").trim()%></TD>
			</TR>
<%          }
			strMsg = "조회 완료 되었습니다.";
%>
	</DATA>
	<MESSAGE><![CDATA[<%=strMsg%>]]></MESSAGE>
</SHEET>
<%		}
   }catch(Exception e){
%>
		<SHEET>
		<RESULT Code="-1" Message="<%=e.toString().replaceAll("\"", "`").replaceAll("\n", "<br>")%>"/>
		</SHEET>
<% }%>