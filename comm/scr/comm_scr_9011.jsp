<?xml version="1.0"  ?>
<%--===============================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : comm
'프로그램 ID  : comm_scr_9011.jsp
'프로그램 명  : 고객 번호 조회
'프로그램개요 : 고객 번호 조회 Grid XML
'작   성   자 : 변휘원
'작   성   일 : 2006.07.25
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
    String searchGubun = JSPUtil.getParameter(request,"searchgubun","0");      // 조회구분
    String searchCode  = JSPUtil.getParameter(request,"searchcode","1");       // 조회내용

    DbResultSet rs        = null;
    DBProcCall cp      = new DBProcCall();
    
    try
    {
        rs = cp.callProc("UP_KPI_C_S_CO고객번호조회",searchGubun+","+searchCode);     
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
          <TD><![CDATA[<%=rs.getString("고객번호").trim()%>]]></TD>   
          <TD><![CDATA[<%=rs.getString("고객명").trim()%>]]></TD>
        </TR> 
    <%          
            }
%>
  </DATA>
  <MESSAGE><![CDATA[]]></MESSAGE>
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