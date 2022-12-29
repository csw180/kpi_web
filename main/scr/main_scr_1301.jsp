<?xml version="1.0"  ?>
<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 데이터관리
'프로그램 ID  : main_scr_1301.jsp
'프로그램 명  : NIM관련데이터조정 내역 등록
'프로그램개요 : NIM실적조정,XTB_MPMT전반기NIM조정 동시 처리함.
'작   성   자 : 하진영
'작   성   일 : 2012.08.03
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
    String Gubun      = JSPUtil.getParameter(request,"Gubun"," ");
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
                if(ext!=null && errMsg!=null && !"".equals(errMsg)) System.out.println(" ::: @@@ err message = "+ errMsg);
            }
        }  
        
        //Error Message 생성
        if(ext != null && (errMsg==null || "".equals(errMsg)))
        {
%>
<SHEET>
<RESULT Code="-1" Message="<%=ext.toString().replaceAll("\"", "`").replaceAll("\n", "<br>")%>"/>
</SHEET>
<%          return;
        }
        //여기부터 사용자 Exception Message 정의 추가부
        else if(ext != null && errMsg!=null && !"".equals(errMsg))
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
<%  return;
    }
     try
   {
       if(rs == null ){
           if(hidden_key.equals("2")) strMsg = "등록 완료 되었습니다.";
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
               if (Gubun.equals("1")) {
%>
                   <TR>
                     <TD><![CDATA[]]></TD>   
                     <TD><![CDATA[<%=rs.getString("작업기준년월").trim()%>]]></TD>               
                     <TD><![CDATA[<%=rs.getString("점번호").trim()%>]]></TD>               
                     <TD><![CDATA[<%=rs.getString("직전반기NIM").trim()%>]]></TD>         
                   </TR> 

<%
              } else {
%>             
                   <TR>
                     <TD><![CDATA[]]></TD>   
                     <TD><![CDATA[<%=rs.getString("작업기준년월").trim()%>]]></TD>               
                     <TD><![CDATA[<%=rs.getString("점번호").trim()%>]]></TD>               
                     <TD><![CDATA[<%=rs.getString("이익대분류코드").trim()%>]]></TD>         
                     <TD><![CDATA[<%=rs.getString("이익중분류코드").trim()%>]]></TD>         
                     <TD><![CDATA[<%=rs.getString("이익소분류코드").trim()%>]]></TD>         
                     <TD><![CDATA[<%=rs.getString("이익세분류코드").trim()%>]]></TD>         
                     <TD><![CDATA[<%=rs.getString("이익세분류명").trim()%>]]></TD>         
                     <TD><![CDATA[<%=rs.getString("당기조정평잔").trim()%>]]></TD>         
                     <TD><![CDATA[<%=rs.getString("당기조정이익").trim()%>]]></TD>         
                     <TD><![CDATA[<%=rs.getString("전기조정평잔").trim()%>]]></TD>         
                     <TD><![CDATA[<%=rs.getString("전기조정이익").trim()%>]]></TD>         
                   </TR> 
<%
             }
 } /* end while */
        strMsg = "조회 완료 되었습니다.";
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