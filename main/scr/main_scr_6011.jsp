<?xml version="1.0"  ?>
<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 본부입력
'프로그램 ID  : main_scr_6010.jsp
'프로그램 명  : SPC수탁업무수수료 관리
'프로그램개요 : SPC수탁업무수수료 관리
'작   성   자 : 조형석
'작   성   일 : 2008.04.30
====================================================================
'수정자/수정일: 하진영/2011.02.15
'수정사유     : 영업점평가제외여부 100%,90%,미차감으로 분류
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="tpms.common.web.CommonWebKeys"%>
<%@ page import="tpms.framework.component.util.JSPUtil"%>
<%@ page import="tpms.framework.component.signon.SignOnUserAccount"%>
<%@ page import="tpms.framework.component.error.ErrorHandler"%>
<%@ page import="tpms.framework.component.dao.*"%>
<%@ page import="kpi.main.scr.main_scr_EventResponse"%>
<% 
    DbResultSet rs    = null;
    long        rc    = 0;
    Exception   ext   = null;
    Exception piex    = null;
    String strErrMsg  = "";
    
    main_scr_EventResponse eventResponse;
    int manager=0;
    
    String hidden_key = JSPUtil.getParameter(request,"hidden_key"," ");
    String v_inqtype  = JSPUtil.getParameter(request,"v_inqtype"," ");
    String basemonth  = JSPUtil.getParameter(request,"basemonth"," ");
    String strMsg     = "";
    String errMsg     = "";  //사용자 Exception Message
   
    try 
    {
        piex=(Exception)request.getAttribute(CommonWebKeys.EXCEPTION_OBJECT);
        if (piex !=null) 
        {
            strErrMsg =new ErrorHandler(piex).loadPopupMessage();
            out.println(strErrMsg);
        }
        else
        {
            eventResponse=(main_scr_EventResponse)request.getAttribute("main_scr_EventResponse");
            if (eventResponse !=null) 
            {
                rs=eventResponse.getList();                  
                rc=eventResponse.getCnt();
                ext=eventResponse.getExt();
                //사용자 Exception Message 정의 추가부
                errMsg = eventResponse.getMessage();
                if(ext!=null && errMsg!=null && !"".equals(errMsg)) System.out.println(" ::: @@@ err message = "+ errMsg);
            }
        }  
        
        //Error Message 생성
        if(ext != null && (errMsg==null || "".equals(errMsg)))
        {
%>
<SHEET>
<RESULT Code="-1" Message="<%=ext.toString().replaceAll("\"", "`").replaceAll("\n", "<br>")%>"/>
</SHEET>
<%          return;
        }
        //여기부터 사용자 Exception Message 정의 추가부
        else if(ext != null && errMsg!=null && !"".equals(errMsg))
        {
%>
<RESULT>
   <TR-ALL>OK</TR-ALL>
   <MESSAGE><![CDATA[<%=errMsg%>]]></MESSAGE>
</RESULT>
<%          return;
        } 
        //여기까지 사용자 Exception Message 정의 추가부
    }
    catch(Exception exx) 
    {
%>
<SHEET>
<RESULT Code="-1" Message="<%=exx.toString().replaceAll("\"", "`").replaceAll("\n", "<br>")%>"/>
</SHEET>
<%  return;
    }
     try
   {
       if(rs == null ){
           if(hidden_key.equals("1")) strMsg = "등록 완료 되었습니다.";
%>
<RESULT>
   <TR-ALL>OK</TR-ALL>
   <MESSAGE><![CDATA[<%=strMsg%>]]></MESSAGE>
</RESULT>
<%
       }else if(rs != null ){
%>
<SHEET>
  <DATA>
<%
            rs.first();
            while(rs.next())
            {    
%>
     <TR>
      <TD><![CDATA[]]></TD>   
      <TD><![CDATA[<%=rs.getString("작업기준년월").trim()%>]]></TD>   
      <TD><![CDATA[<%=rs.getString("점번호").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("계정과목코드").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("SPC명").trim()%>]]></TD>   
      <TD><![CDATA[<%=rs.getString("고객번호").trim()%>]]></TD>   
      <TD><![CDATA[<%=rs.getString("권유수당").trim()%>]]></TD>   
      <TD><![CDATA[<%=rs.getString("권유자직원번호").trim()%>]]></TD>   
      <TD><![CDATA[<%=rs.getString("금액").trim()%>]]></TD>   
      <TD><![CDATA[<%=rs.getString("영업점평가차감비율").trim()%>]]></TD>   
      <TD><![CDATA[<%=rs.getString("신규일자").trim()%>]]></TD>   
    </TR> 
<%
            } /* end while */
        strMsg = "조회 완료 되었습니다.";
%>             
  </DATA>
  <MESSAGE><![CDATA[<%=strMsg%>]]></MESSAGE>
</SHEET>
<%
       } /* end if rs */
   }catch(Exception e){   
%>
<SHEET>
<RESULT Code="-1" Message="<%=e.toString().replaceAll("\"", "`").replaceAll("\n", "<br>")%>"/>
</SHEET>
<% 
   }
%>