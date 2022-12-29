<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 코드관리
'프로그램 ID  : macd_scr_1031.jsp
'프로그램 명  : KPI 상품그룹 관리
'프로그램개요 : KPI 상품그룹 관리
'작   성   자 : 조형석
'작   성   일 : 2013.03.20
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
<% 
    
    DbResultSet rs        = null;    
    DBProcCall  cp        = new DBProcCall();
    long rtn              = 0;
    String hidden_key     = JSPUtil.getParameter(request,"hidden_key"," ");
    String strMsg         = "";
    try 
    {
       cp.callProc("UP_KPI_O_S_일일신규상품그룹이행");

       if(hidden_key.equals("2"))       strMsg = "등록 완료 되었습니다.";
       else                             strMsg = "조회 완료 되었습니다.";
%>
<SHEET>
  <DATA>
  </DATA>
  <MESSAGE><![CDATA[<%=strMsg%>]]></MESSAGE>  
</SHEET>
<%
    } catch(Exception e) {
%>    
<SHEET>
<RESULT Code="-1" Message="<%=e.toString().replaceAll("\"", "`").replaceAll("\n", "<br>")%>"/>
</SHEET>
<% 
   }
%>