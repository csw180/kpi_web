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
<%@ page import="tpms.managesystem.menu.RoleConn_EventResponse"%>
<% 

    DbResultSet rs=null;

    Exception piex=null;
    String strErrMsg="";
    String cEvent="";
    RoleConn_EventResponse eventResponse;
    int manager=0;

    try {
        piex=(Exception)request.getAttribute(CommonWebKeys.EXCEPTION_OBJECT);
        if (piex !=null) {
            strErrMsg =new ErrorHandler(piex).loadPopupMessage();
        }else{
            eventResponse=(RoleConn_EventResponse)request.getAttribute("RoleConn_EventResponse");
         
            if (eventResponse !=null) {

              rs=eventResponse.getmenulist();
              cEvent=eventResponse.getcEvent();
            }              
        }                  
    }catch(Exception exx) {
        out.println("에러났어여 :"+exx.toString());
    }

    if(cEvent.equals("저장")){
%>
<!--  comments2  --> 
<RESULT>
   <TR-ALL>OK</TR-ALL>
</RESULT>   
<%}else if(cEvent.equals("조회")){%>
<SHEET>
  <DATA >
<% try
   {
       if(rs != null)                       
       {
            rs.first();
            while(rs.next())
            {    
%>

    <TR> 
      <TD>R</TD>
      <TD><%=rs.getString("권한여부").trim()%></TD>
      <TD><%=rs.getString("Role코드").trim()%></TD>
      <TD><%=rs.getString("Role명").trim()%></TD>
    </TR>
<%          }
       }
   } catch(Exception e){}

%>
  </DATA>
</SHEET>
<%}%>
