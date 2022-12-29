<?xml version="1.0"  ?>
<%--===============================================================
'주  시 스 템  : 성과관리시스템
'서브  시스템  : 시스템관리
'프로그램 ID   : loglist.jsp
'프로그램 명   : Batch/Web Log 조회
'프로그램개요  : Web에 대한 사용자 로그내용을 조회한다.
'작   성   자  : 변휘원
'작   성   일  : 2006.11.15
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
<%@ page import="tpms.managesystem.menu.Log_EventResponse"%>
<% 
    DbResultSet         rs          = null;
                        
    Exception           ext         = null;
    Exception           piex        = null;
                        
    long                rc          = 0;
    int                 manager     = 0;
                        
    String              strErrMsg   = "";
    String              strMsg      = "";
                        
    String              hidden_key  = JSPUtil.getParameter(request,"hidden_key", "");
    
    Log_EventResponse    eventResponse;
    
    try 
    {
        piex = (Exception)request.getAttribute(CommonWebKeys.EXCEPTION_OBJECT);
        
        if (piex !=null)
        {
            strErrMsg =new ErrorHandler(piex).loadPopupMessage();
            out.println(strErrMsg);
        }
        else
        {
            eventResponse=(Log_EventResponse)request.getAttribute("Log_EventResponse");
         
            if (eventResponse !=null) 
            {
                rs  = eventResponse.getmenulist();
                rc  = eventResponse.getCnt();
                ext = eventResponse.getExt();
            }              
        }  
        
        if(rs==null && rc==0)
        {
%>
<ERROR>
<MESSAGE><![CDATA[<%=ext%>]]></MESSAGE>
</ERROR>>
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
    
    
    try
    {
        if(rs != null) {
%>
<SHEET>
  <DATA >
<%       
            rs.first();
            while(rs.next())
            {    
    %>    
        <TR>
          <TD><![CDATA[<%=rs.getString(1).trim()%>]]></TD>            
          <TD><![CDATA[<%=rs.getString(2).trim()%>]]></TD>
          <TD><![CDATA[<%=rs.getString(3).trim()%>]]></TD>
          <TD><![CDATA[<%=rs.getString(4).trim()%>]]></TD>
          <TD><![CDATA[<%=rs.getString(5).trim()%>]]></TD>
          <TD><![CDATA[<%=rs.getString(6).trim()%>]]></TD>            
          <TD><![CDATA[<%=rs.getString(7).trim()%>]]></TD>
          <TD><![CDATA[<%=rs.getString(8).trim()%>]]></TD>            
          <TD><![CDATA[<%=rs.getString(9).trim()%>]]></TD>          
        </TR> 
    <%          
            }
%>
  </DATA>
<%
            if(hidden_key.equals("1"))           strMsg = "I@저장 완료 되었습니다.";
            else if(hidden_key.equals("2"))      strMsg = "I@저장 완료 되었습니다.";
            else if(hidden_key.equals("3"))      strMsg = "I@삭제 완료 되었습니다.";
            else                                 strMsg = "I@조회 완료 되었습니다.";
%>             
  <MESSAGE><![CDATA[<%=strMsg%>]]></MESSAGE>
</SHEET>  
<%      }
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