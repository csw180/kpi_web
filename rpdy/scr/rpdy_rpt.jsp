<?xml version="1.0"  ?>
<%--===============================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : 일일보고서
'프로그램 ID  : rpdy_rpt.jsp
'프로그램 명  : 보고서 공통 Grid
'프로그램개요 : 보고서 공통 Grid Data xml
'작   성   자 : 조형석
'작   성   일 : 2009.06.22
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
<%@ page import="kpi.rpdy.scr.rpdy_scr_EventResponse"%>
<%@ page import="java.util.*"%>
<% 
    DbResultSet rs    = null;
    Exception ext     = null;
    String hidden_key = JSPUtil.getParameter(request,"hidden_key"," ");
    String sergb      = JSPUtil.getParameter(request,"sergb","");
    String strMsg     = "";    
    rpdy_scr_EventResponse eventResponse;

    Date date = new Date(); 
    System.out.println("\n::: SCREEN START : " +date.getHours()+":"+date.getMinutes()+":" + date.getSeconds());
    
    String errMsg     = "";  //사용자 Exception Message
    
    try 
    {
        eventResponse=(rpdy_scr_EventResponse)request.getAttribute("rpdy_scr_EventResponse");
        if (eventResponse !=null){
            rs=eventResponse.getList();
            ext=eventResponse.getExt();
            //사용자 Exception Message 정의 추가부
            errMsg = eventResponse.getMessage();
            if(errMsg!=null && !"".equals(errMsg)) System.out.println(" ::: @@@ err message = "+ errMsg);
        }              
        if(rs==null && (errMsg==null || errMsg.equals(""))){
%>
<SHEET>
<RESULT Code="-1" Message="<%=ext.toString().replaceAll("\"", "`").replaceAll("\n", "<br>")%>"/>
</SHEET>
<%
        }else if(rs==null && !(errMsg==null || errMsg.equals(""))){
%>
<RESULT>
   <TR-ALL>OK</TR-ALL>
   <MESSAGE><![CDATA[<%=errMsg%>]]></MESSAGE>
</RESULT>
<%      }
    }
    catch(Exception exx) 
    {
%>
<SHEET>
<RESULT Code="-1" Message="<%=exx.toString().replaceAll("\"", "`").replaceAll("\n", "<br>")%>"/>
</SHEET>
<% 
    }
   try{
       if(rs != null){
%>
<SHEET>
  <DATA>
<%
            rs.first();
            while(rs.next())
            {  
               
%>
    <TR>
<%             for(int i=1; i <= rs.getColumnCount(); i++){ %>
      <TD><![CDATA[<%=rs.getString(i)%>]]></TD> 
<%             }%>
    </TR> 
<%          
            }
%>
  </DATA>
<%
        if (sergb.equals("99")||sergb.equals("98")) { strMsg = "B"; }
        else { strMsg = "조회 완료 되었습니다."; }
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