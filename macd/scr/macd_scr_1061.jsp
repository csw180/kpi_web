<?xml version="1.0"  ?>
<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 코드관리 Grid
'프로그램 ID  : macd_scr_1061.jsp
'프로그램 명  : 영업점peergroup 관리
'프로그램개요 : 영업점peergroup 관리
'작   성   자 : 변휘원
'작   성   일 : 2006.04.12
====================================================================
'수정자/수정일: 하진영/2011.02.10
'수정사유     : 광역금융본부코드,광역금융본부명 추가
===============================================================--%>
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
        if(ext!=null)
        {
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
    if(hidden_key.equals("2")){
        strMsg = "변경 완료 되었습니다.";
%>
<SHEET>
  <MESSAGE><![CDATA[<%=strMsg%>]]></MESSAGE>
</SHEET>
<%  }
     try
   {
       if(rs != null ){
%>
<SHEET>
  <DATA>
<%
            rs.first();
            while(rs.next())
            {    
%>
    <TR>
      <TD><![CDATA[<%=rs.getString("점번호").trim()%>]]></TD>   
      <TD><![CDATA[<%=rs.getString("점명").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("pg코드").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("pg명").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("점수산출여부").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("합산점번호").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("광역금융본부코드").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("광역금융본부명").trim()%>]]></TD>
    </TR> 
<%
            } /* end while */

                 if(hidden_key.equals("1"))         strMsg = "등록 완료 되었습니다.";
                 else if(hidden_key.equals("2"))    strMsg = "변경 완료 되었습니다.";
                 else                               strMsg = "조회 완료 되었습니다.";
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