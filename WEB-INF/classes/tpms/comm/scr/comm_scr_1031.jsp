<?xml version="1.0"  ?>
<%--===============================================================
'주  시 스 템  : 성과관리시스템
'서브  시스템  : comm
'프로그램 ID   : comm_scr_1031.jsp
'프로그램 명   : 관리회계계정코드,재무회계계정코드
'프로그램개요  : 계정과목코드  리스트 Grid XML
'작   성   자  : 변휘원
'작   성   일  : 2006.07.31
====================================================================
'수정자/수정일 : 변휘원/2006.07.31
'수정사유      : FTP업무에서는 통합계정코드 대신 계정코드를 GRID에
'                출력할수 있도록 변경.
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="tpms.common.web.CommonWebKeys"%>
<%@ page import="tpms.framework.component.util.JSPUtil"%>
<%@ page import="tpms.framework.component.signon.SignOnUserAccount"%>
<%@ page import="tpms.framework.component.error.ErrorHandler"%>
<%@ page import="tpms.framework.component.dao.*"%>
<% 

    String strFrom    = JSPUtil.getParameter(request ,"is_from" ,"Y");
    String basemonth  = JSPUtil.getParameter(request ,"basemonth" ,"0");
    DbResultSet rs    = null;
    DBProcCall cp     = new DBProcCall();
    String space      = "";
    String bold       = "";
    String arg        = "";
    try
    {
        rs = cp.callProc("UP_KPI_C_S_CO관리회계계정코드", basemonth); 
        if(rs != null) {
%>
<SHEET>
  <DATA >
<%       
            rs.first();
            
            while(rs.next())
            {
                if("Y".equals(strFrom))
                {
    %>
        <TR>
          <TD><![CDATA[<%=rs.getString("계정과목코드").trim()%>]]></TD>   
          <TD><![CDATA[<%=rs.getString("계정과목명").trim()%>]]></TD>
        </TR> 
    <%          } else {
    
                  if(rs.getString("레벨구분").trim().equals("2"))  {space = " "; bold = "";}
                  else if(rs.getString("레벨구분").trim().equals("3"))  {space = "  "; bold = "";}
                  else if(rs.getString("레벨구분").trim().equals("4"))  {space = "   "; bold = "";}
                  else if(rs.getString("레벨구분").trim().equals("5"))  {space = "    "; bold = "";}
                  else {space = ""; bold = "BOLD='TRUE'";}    
    %>
        <TR>
          <TD><![CDATA[<%=rs.getString("관리회계계정코드").trim()%>]]></TD>   
          <TD <%=bold%>><![CDATA[<%=space%><%=rs.getString("계정과목명").trim()%>]]></TD>
        </TR> 
    <%    
                }
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