<?xml version="1.0"  ?>
<%--===============================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : comm
'프로그램 ID  : comm_scr_9021.jsp
'프로그램 명  : 관리회계통합코드조회
'프로그램개요 : 관리회계통합코드조회 Grid XML
'작   성   자 : 변휘원
'작   성   일 : 2006.07.25
====================================================================
'수정자/수정일/수정사유  :하진영/20170322/IFRS대응 procedure변경
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="tpms.common.web.CommonWebKeys"%>
<%@ page import="tpms.framework.component.util.JSPUtil"%>
<%@ page import="tpms.framework.component.signon.SignOnUserAccount"%>
<%@ page import="tpms.framework.component.error.ErrorHandler"%>
<%@ page import="tpms.framework.component.dao.*"%>
<% 
    String selectcode = JSPUtil.getParameter(request,"selectcode","0");      // 통합코드 구분
    String colsu = JSPUtil.getParameter(request,"colsu","2");                // 통합코드 표현 컬럼수

    DbResultSet rs = null;
    DBProcCall cp  = new DBProcCall();
    
    try
    {
        rs = cp.callProc("UP_TPA_C_S_co관리회계통합코드조회",selectcode); //itpms.iwp_co관리회계통합코드조회 <- 종수 프로시져 사용중
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
<%if (colsu.equals("2")) { %>
          <TD><![CDATA[<%=rs.getString("통합코드").trim()%>]]></TD>   
          <TD><![CDATA[<%=rs.getString("통합코드명").trim()%>]]></TD>

<%} else {%>          
          <TD><![CDATA[<%=rs.getString("통합코드").trim()%>]]></TD>   
          <TD><![CDATA[<%=rs.getString("통합코드c").trim()%>]]></TD>   
          <TD><![CDATA[<%=rs.getString("통합코드명").trim()%>]]></TD>
<%}%>

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