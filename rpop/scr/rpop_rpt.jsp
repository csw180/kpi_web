<?xml version="1.0"?>
<%--===============================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : ABC
'프로그램 ID  : rpop_rpt.jsp
'프로그램 명  : 보고서 공통 Grid
'프로그램개요 : 보고서 공통 Grid Data xml
'작   성   자 : 변휘원
'작   성   일 : 2006.06.20
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
<%@ page import="java.util.*"%>
<%@ page import="kpi.rpop.scr.rpop_scr_EventResponse"%>

<% 
    DbResultSet rs    = null;
    Exception ext     = null;
    String hidden_key = JSPUtil.getParameter(request,"hidden_key"," ");
    String strMsg     = "";    
    rpop_scr_EventResponse eventResponse;
    
    Date date = new Date();
    System.out.println("\n::: SCREEN START : " +date.getHours()+":"+date.getMinutes()+":" + date.getSeconds());
    String errMsg     = "";  //사용자 Exception Message

    try 
    {
        eventResponse=(rpop_scr_EventResponse)request.getAttribute("rpop_scr_EventResponse");
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
<%
				if("rpop_scr_1060" == request.getAttribute("control") ) {		
%>    
		<TD><![CDATA[]]></TD>	
<%  
				}
				for(int i=1; i <= rs.getColumnCount(); i++){ %>
      <TD><![CDATA[<%=rs.getString(i)%>]]></TD> 
<%             }%>
    </TR> 
<%          
            }
%>
  </DATA>
<%
        strMsg = "조회 완료 되었습니다. ";
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
