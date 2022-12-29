<?xml version="1.0"  ?>
<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : comm
'프로그램 ID  : comm_scr_9097.jsp
'프로그램 명  : 엑셀다운로드 로그 관리
'프로그램개요 : 엑셀다운로드시 로그 저장
'작   성   자 : 조형석
'작   성   일 : 2009.06.18
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
    
    String htm_title  = JSPUtil.getParameter(request,"htm_title"," ");
    String condition  = JSPUtil.getParameter(request,"condition"," ");
    String gubun  = JSPUtil.getParameter(request,"gubun","1");

    String strMsg     = "";
    String errMsg     = "";  //사용자 Exception Message

    SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);
    String haengwon_no   = account.getHaengwon_no();
    String branch_no     = account.getBranch_no();

    String startTime = tpms.framework.component.util.DateTime.getShortTimeString();
    
    try {
        cp.InputProc("UP_KPI_C_S_WEBLOG"
                      ,gubun                     +","  //1:rpdy, 2:rpop
                      +htm_title+" 엑셀저장"     +","  //프로그램ID
                      +startTime                 +","  //시작시간
                      +startTime                 +","  //완료시간
                      +account.getHaengwon_no()  +","  //사용자ID
                      +account.getBranch_no()    +","  //점번호
                      +request.getRemoteAddr()   +","  //사용자IP
                      +condition                 +";"  //조회조건 ~
                      );
%>
<SHEET>
  <DATA>
  </DATA>
</SHEET>
<% 
   } catch(Exception e)
   {   
%>
<SHEET>
<RESULT Code="-1" Message="<%=e.toString().replaceAll("\"", "`").replaceAll("\n", "<br>")%>"/>
</SHEET>
<% 
    }
%>