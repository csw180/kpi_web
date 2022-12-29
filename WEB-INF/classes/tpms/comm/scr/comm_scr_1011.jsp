<?xml version="1.0"  ?>
<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 공통
'프로그램 ID  : comm_scr_1011.jsp
'프로그램 명  : 점번호(팝업)
'프로그램개요 : 점번호(팝업)
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

    String basemonth   = JSPUtil.getParameter(request,"basemonth","");
    String searchGubun = JSPUtil.getParameter(request,"searchGubun","");
    DbResultSet rs     = null;
    DBProcCall cp      = new DBProcCall();
    
    try
    {
        rs = cp.callProc("UP_KPI_C_S_CO영업점조회", basemonth+","+searchGubun);     
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
          <TD><![CDATA[<%=rs.getString("점번호").trim()%>]]></TD>   
          <TD><![CDATA[<%=rs.getString("점명").trim()%>]]></TD>
                <%
                if(searchGubun.equals("3")){
                %>
          <TD><![CDATA[<%=rs.getString("PG코드").trim()%>]]></TD> 
                <%          
                }
                %>
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
<ERROR>
<MESSAGE><![CDATA[<%=e%>]]></MESSAGE>
</ERROR>
<% 
    }
%>