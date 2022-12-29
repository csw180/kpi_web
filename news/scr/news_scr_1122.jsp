<?xml version="1.0"  ?>
<%--===============================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : NEWS
'프로그램 ID  : news_scr_1122.jsp
'프로그램 명  : 게시판(pop-up)
'프로그램개요 : 게시판(pop-up)
'작   성   자 : 변휘원
'작   성   일 : 2006.9.12
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
<%@ page import="tpms.news.scr.news_scr_1122_EventResponse"%>
<% 

    DbResultSet rs        =   null;
    long        rc        =   0;
    Exception   ext       =   null;

    Exception   piex      =   null;
    String      strErrMsg =   "";
    
    news_scr_1122_EventResponse eventResponse;
    int manager=0;
    
    String hidden_key        =    JSPUtil.getParameter(request,"hidden_key"," ");
    String strMsg            =    "";    

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
            eventResponse=(news_scr_1122_EventResponse)request.getAttribute("news_scr_1122_EventResponse");
         
            if (eventResponse !=null) 
            {

              rs=eventResponse.getList();
              rc=eventResponse.getCnt();
              ext=eventResponse.getExt();
            }              
        }  
        if(rs==null&&rc==0)
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
   try
   {
       if(rs != null)                       
       {
%>
<SHEET>
  <DATA >
<%       
            rs.first();
            while(rs.next())
            {    
%>
    <TR>
      <TD><![CDATA[<%=rs.getString("내용").trim()%>]]></TD>   
    </TR> 
<%          
            }
%>
  </DATA>
<%
       if(hidden_key.equals("1"))       strMsg = "등록 완료 되었습니다.";
       else if(hidden_key.equals("2"))  strMsg = "변경 완료 되었습니다.";
       else if(hidden_key.equals("3"))  strMsg = "삭제 완료 되었습니다.";
       else                             strMsg = "조회 완료 되었습니다.";
%>       
  <MESSAGE><![CDATA[<%=strMsg%>]]></MESSAGE>  
</SHEET>
<% 
       }
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