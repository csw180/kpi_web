<?xml version="1.0"  ?>
<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 공통
'프로그램 ID  : comm_scr_1011.jsp
'프로그램 명  : 동일PG점번호(팝업)
'프로그램개요 : 동일PG점번호(팝업)
'작   성   자 : 남호준            
'작   성   일 : 2006.10.30        
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
    String pgGubun     = JSPUtil.getParameter(request,"pgGubun","");
    
    DbResultSet rs     = null;
    DBProcCall cp      = new DBProcCall();
    
    try
    {
        rs = cp.callProc("UP_KPI_C_S_CO동일PG영업점조회", basemonth+","+searchGubun+","+pgGubun);     
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