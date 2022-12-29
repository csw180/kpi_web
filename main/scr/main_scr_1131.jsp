<?xml version="1.0"  ?>
<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 코드관리 Grid
'프로그램 ID  : main_scr_1051.jsp
'프로그램 명  : 기준실적 승인
'프로그램개요 : 기준실적 승인
'작   성   자 : 변휘원
'작   성   일 : 2006.04.12
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
    String errMsg     = "";  //사용자 Exception Message

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
                //사용자 Exception Message 정의 추가부
                errMsg = eventResponse.getMessage();
                if(ext!=null && !"".equals(errMsg)) System.out.println(" ::: @@@ err message = "+ errMsg);
            }
        }  
        //Error Message 생성
        if(ext != null && "".equals(errMsg))
        {
%>
<SHEET>
<RESULT Code="-1" Message="<%=ext.toString().replaceAll("\"", "`").replaceAll("\n", "<br>")%>"/>
</SHEET>
<%          return;
        } 
        //여기부터 사용자 Exception Message 정의 추가부
        else if(ext != null && !"".equals(errMsg))
        {
%>
<RESULT>
   <TR-ALL>OK</TR-ALL>
   <MESSAGE><![CDATA[<%=errMsg%>]]></MESSAGE>
</RESULT>
<%          return;
        } 
        //여기까지 사용자 Exception Message 정의 추가부
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
      <TD><![CDATA[]]></TD>
      <TD><![CDATA[<%=rs.getString("작업기준년월").trim()%>]]></TD>   
      <TD><![CDATA[<%=rs.getString("점번호").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("kpi코드").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("사업부소속코드").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("기준실적상품분류코드").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("기준실적").trim()%>]]></TD>      
      <TD><![CDATA[<%=rs.getString("반기1st월기준실적").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("반기2nd월기준실적").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("반기3rd월기준실적").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("반기4th월기준실적").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("반기5th월기준실적").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("반기6th월기준실적").trim()%>]]></TD>
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