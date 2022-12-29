<?xml version="1.0"  ?>
<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : comm
'프로그램 ID  : comm_scr_9098.jsp
'프로그램 명  : 확정해제 관리
'프로그램개요 : 확정버튼 설정/해제
'작   성   자 : 하진영
'작   성   일 : 2011.01.
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
    DbResultSet rs    = null;

    DBProcCall  cp    = new DBProcCall();
    long        rc    = 0;
    Exception   ext   = null;
    Exception piex    = null;
    String strErrMsg  = "";
    
    String hidden_key = JSPUtil.getParameter(request,"hidden_key"," ");
    String v_commit   = JSPUtil.getParameter(request,"v_commit"," ");
    String basemonth  = JSPUtil.getParameter(request,"basemonth"," ");
    String scrName    = JSPUtil.getParameter(request,"scrName"," ");

    String strMsg     = "";
    String errMsg     = "";  //사용자 Exception Message

    SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);
    String haengwon_no   = account.getHaengwon_no();
    String branch_no     = account.getBranch_no();

    try
    {
       if(hidden_key.equals("2")) {
         //rc = cp.InputProc("UP_KPI_O_S_확정해제관리","2,"+basemonth+","+branch_no+","+scrName+","+v_commit+","+haengwon_no);
    	 cp.InputProc("UP_KPI_O_S_확정해제관리","2,"+basemonth+","+branch_no+","+scrName+","+v_commit+","+haengwon_no);
       } 
       rs = cp.callProc("UP_KPI_O_S_확정해제관리","4,"+basemonth+","+branch_no+","+scrName+","+v_commit+","+haengwon_no);
       if(rs != null)                       
       {
%>
<SHEET>
  <DATA>
<%  
            rs.first();
            while(rs.next())
            {  
%>
    <TR>
      <TD><![CDATA[<%=rs.getString("확정구분").trim()%>]]></TD>
    </TR> 
<%          
            }
%>
  </DATA>
<%
       if(hidden_key.equals("1"))       strMsg = "조회 완료 되었습니다.";
       else if(hidden_key.equals("2"))  strMsg = "입력 완료 되었습니다.";
       else                             strMsg = "삭제 완료 되었습니다.";
%>       
  <MESSAGE><![CDATA[<%=strMsg%>]]></MESSAGE>  
</SHEET>
<% 
       }
   } 
   catch(Exception e)
   {   
%>
<SHEET>
<RESULT Code="-1" Message="<%=e.toString().replaceAll("\"", "`").replaceAll("\n", "<br>")%>"/>
</SHEET>
<% 
   }
%>