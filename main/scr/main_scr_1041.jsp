<?xml version="1.0"  ?>
<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 코드관리 Grid
'프로그램 ID  : main_scr_1041.jsp
'프로그램 명  : 타지점실적계좌 승인
'프로그램개요 : 타지점실적계좌 승인
'작   성   자 : 변휘원
'작   성   일 : 2006.04.12
====================================================================
'수정자/수정일: 2010.06.18
'수정사유     : 타지점예금 외 타지점대출 계좌발생하여
                tb_mcdm타지점예금계좌 -> tb_mpmm타지점실적계좌 변경
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="tpms.common.web.CommonWebKeys"%>
<%@ page import="tpms.framework.component.util.JSPUtil"%>
<%@ page import="tpms.framework.component.signon.SignOnUserAccount"%>
<%@ page import="tpms.framework.component.error.ErrorHandler"%>
<%@ page import="tpms.framework.component.dao.*"%>
<%@ page import="kpi.main.scr.main_scr_EventResponse"%>
<% 
    DbResultSet rs    = null;
    long        rc    = 0;
    Exception   ext   = null;
    Exception piex    = null;
    String strErrMsg  = "";
    
    main_scr_EventResponse eventResponse;
    int manager=0;
    
    String hidden_key = JSPUtil.getParameter(request,"hidden_key"," ");
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
                eventResponse=(main_scr_EventResponse)request.getAttribute("main_scr_EventResponse");
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
<%     return;
        }                        
    }
    catch(Exception exx) 
    {
%>
<SHEET>
<RESULT Code="-1" Message="<%=exx.toString().replaceAll("\"", "`").replaceAll("\n", "<br>")%>"/>
</SHEET>
<% return;
    }
    try
    {
        if(rs==null){
            if(hidden_key.equals("1"))         strMsg = "등록 완료 되었습니다.";
            else if(hidden_key.equals("2"))    strMsg = "변경 완료 되었습니다.";
            else if(hidden_key.equals("3"))    strMsg = "삭제 완료 되었습니다.";
%>
<RESULT>
   <TR-ALL>OK</TR-ALL>
   <MESSAGE><![CDATA[<%=strMsg%>]]></MESSAGE>
</RESULT>
<%
        }else if(rs != null ){
%>
<SHEET>
  <DATA>
<%
            rs.first();
            while(rs.next())
            {    
%>
    <TR>
      <TD><![CDATA[<%=rs.getString("계좌관리점번호").trim()%>]]></TD>   
      <TD><![CDATA[<%=rs.getString("계좌관리점명").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("계정과목코드").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("계정과목명").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("계좌번호").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("고객명").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("신규일자").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("성과관리점번호").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("성과관리점명").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("성과관리점인정비율").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("등록부서구분").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("등록일자").trim()%>]]></TD>
      <TD><![CDATA[<%="Y".equals(rs.getString("승인여부").trim()) ? "1" : "0"%>]]></TD>
      <TD><![CDATA[]]></TD>
    </TR> 
<%
            } /* end while */
            strMsg = "조회 완료 되었습니다.";
%>
  </DATA>
  <MESSAGE><![CDATA[<%=strMsg%>]]></MESSAGE>
</SHEET>
<%       } /* end if rs */

   }catch(Exception e){   
%>
<SHEET>
<RESULT Code="-1" Message="<%=e.toString().replaceAll("\"", "`").replaceAll("\n", "<br>")%>"/>
</SHEET>
<% 
   }
%>