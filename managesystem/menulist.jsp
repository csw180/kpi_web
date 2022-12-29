<?xml version="1.0" ?>
<%--===============================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : 시스템관리
'프로그램 ID  : DailyReport.jsp
'프로그램 명  : 메뉴 리스트
'프로그램개요 : Grid에 출력할 메뉴 리스트를 xml로 생성
'작   성   자 : 변휘원
'작   성   일 : 2006.03.21
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
<%@ page import="tpms.managesystem.menu.Menu_EventResponse"%>
<%
    DbResultSet rs        = null;

    Exception   piex      = null;
	Exception   ext   = null;
    String      strErrMsg = "";
    String      cEvent    = "";
    Menu_EventResponse eventResponse;
    int manager=0;

    try {
        piex=(Exception)request.getAttribute(CommonWebKeys.EXCEPTION_OBJECT);
        if (piex !=null) {
            strErrMsg =new ErrorHandler(piex).loadPopupMessage();
			System.out.println("#####################################" + strErrMsg);
        }else{
            eventResponse=(Menu_EventResponse)request.getAttribute("Menu_EventResponse");
			
            if (eventResponse !=null) {
              rs=eventResponse.getmenulist();
              cEvent=eventResponse.getcEvent();
			  ext=eventResponse.getExt();

			  if(cEvent.equals("조회") && ext==null){
				  strErrMsg = "조회 완료 되었습니다.";
			  }else if(cEvent.equals("저장") && ext==null){
			      strErrMsg = "변경 완료 되었습니다.";
			  }else{
			  }
            }
			
        if(ext != null)
        {
			
%>
<RESULT>
   <TR-ALL>OK</TR-ALL>
   <MESSAGE><![CDATA[<%=strErrMsg%>]]></MESSAGE>
</RESULT>
<%       return;
        } 
    }
    }catch(Exception exx) {

    }

    if(cEvent.equals("저장")){
	
%>
<!--  comments2  -->
<RESULT>
   <TR-ALL>OK</TR-ALL>
   <MESSAGE><![CDATA[<%=strErrMsg%>]]></MESSAGE>
</RESULT>
<%}else if(cEvent.equals("조회")){%>
<SHEET>
  <DATA >
<% try
   {
       if(rs != null)
       {
            rs.first();
            while(rs.next())
            {
%>
    <TR>
      <TD>R</TD>
      <TD></TD>
      <TD><%=rs.getString("프로그램ID").trim()%></TD>
      <TD><%=rs.getString("메뉴종류").trim()%></TD>
      <TD><%=rs.getString("프로그램명").trim()%></TD>
      <TD><%=rs.getString("프로그램URL").trim()%></TD>
      <TD><%=rs.getString("상위프로그램ID").trim()%></TD>
      <TD><%=rs.getString("메뉴레벨").trim()%></TD>
      <TD><%=rs.getString("메뉴순서").trim()%></TD>
      <TD><%=rs.getString("팝업유무").trim()%></TD>
      <TD><%=rs.getString("이미지").trim()%></TD>
      <TD><%=rs.getString("보안등급").trim()%></TD>
      <TD><%=rs.getString("문서담당자").trim()%></TD>
      <TD></TD>
    </TR>
<%          }
       }
   } catch(Exception e){
   }

%>
  </DATA>
  <MESSAGE><![CDATA[<%=strErrMsg%>]]></MESSAGE>
</SHEET>
<%} %>
