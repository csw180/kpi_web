<?xml version="1.0"  ?>
<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 코드관리 Grid
'프로그램 ID  : macd_scr_1011.jsp
'프로그램 명  : KPI 코드
'프로그램개요 : KPI 코드 정의
'작   성   자 : 하진영
'작   성   일 : 2011.01.
====================================================================
'수정자/수정일 :
'수정사유      :
===============================================================--%>
<
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="tpms.common.web.CommonWebKeys"%>
<%@ page import="tpms.framework.component.util.JSPUtil"%>
<%@ page import="tpms.framework.component.signon.SignOnUserAccount"%>
<%@ page import="tpms.framework.component.error.ErrorHandler"%>
<%@ page import="tpms.framework.component.dao.*"%>
<%@ page import="kpi.macd.scr.macd_scr_EventResponse"%>
<% 
    DbResultSet rs    = null;
    long        rc    = 0;
    Exception   ext   = null;
    Exception piex    = null;
    String strErrMsg  = "";
    
    macd_scr_EventResponse eventResponse;
    int manager=0;
    
    String hidden_key = JSPUtil.getParameter(request,"hidden_key"," ");
    String v_inqtype  = JSPUtil.getParameter(request,"v_inqtype"," ");
    String basemonth  = JSPUtil.getParameter(request,"basemonth"," ");
    String jekyocode  = JSPUtil.getParameter(request,"jekyocode"," ");
    String strMsg     = "";

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
			eventResponse=(macd_scr_EventResponse)request.getAttribute("macd_scr_EventResponse");
            if (eventResponse !=null) 
            {
             	rs=eventResponse.getList();
                rc=eventResponse.getCnt();
                ext=eventResponse.getExt();
			}
        }  
        if(ext!=null){
%>
<SHEET>
<RESULT Code="-1" Message="<%=ext.toString().replaceAll("\"", "`").replaceAll("\n", "<br>")%>"/>
</SHEET>
<%              
        }                        
    }
    catch(Exception exx) 
    {
%>
<SHEET>
<RESULT Code="-1" Message="<%=exx.toString().replaceAll("\"", "`").replaceAll("\n", "<br>")%>"/>
</SHEET>
<% 
    }
   if(ext==null){
     try{
%>
<SHEET>
  <DATA>
<%
       if(rs != null ){
            rs.first();
            while(rs.next())
            {    
%>
    <TR>
      <TD><![CDATA[<%=rs.getString("작업기준년월").trim()%>]]></TD>   
      <TD><![CDATA[<%=rs.getString("KPI코드").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("KPI명").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("KPI정의내용").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("KPI구분").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("성과관리구분").trim()%>]]></TD>   
      <TD><![CDATA[<%=rs.getString("출력순서").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("사용여부").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("평가주기").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("상한점수").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("하한점수").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("기준점수").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("목표부여여부").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("목표방향").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("상하향지표여부").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("점수화유형").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("소숫점자리수").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("화면ID").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("등록직원번호").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("등록").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("KPI구분코드").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("성과관리구분코드").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("평가주기코드").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("목표방향코드").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("점수화유형코드").trim()%>]]></TD>
    </TR> 
<%            
            } /* end while */
       } /* end if rs */
%>
  </DATA>
<%
            if(hidden_key.equals("1"))         strMsg = "등록 완료 되었습니다.";
            else if(hidden_key.equals("2"))    strMsg = "변경 완료 되었습니다.";
            else if(hidden_key.equals("3"))    strMsg = "삭제 완료 되었습니다.";
            else                               strMsg = "조회 완료 되었습니다.";
%>             
  <MESSAGE><![CDATA[<%=strMsg%>]]></MESSAGE>
</SHEET>
<%
   }catch(Exception e){   
%>
<SHEET>
<RESULT Code="-1" Message="<%=e.toString().replaceAll("\"", "`").replaceAll("\n", "<br>")%>"/>
</SHEET>
<% 
   }
   }
%>