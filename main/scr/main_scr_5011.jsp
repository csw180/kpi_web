<?xml version="1.0"  ?>
<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 연구위원 인력관리
'프로그램 ID  : main_scr_5011.jsp
'프로그램 명  : 연구위원 인력관리
'프로그램개요 : 연구위원 인력 리스트 관리 
'작   성   자 : 조형석
'작   성   일 : 2013.11.18
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
            else if(hidden_key.equals("4"))    strMsg = "업로드 완료 되었습니다.";
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
<%             for(int i=1; i <= rs.getColumnCount(); i++){ %>
      <TD><![CDATA[<%=rs.getString(i)%>]]></TD> 
<%             }%>
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