<?xml version="1.0"  ?>
<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 코드관리 Grid
'프로그램 ID  : macd_scr_1011.jsp
'프로그램 명  : KPI 코드
'프로그램개요 : KPI 코드 정의
'작   성   자 : 변휘원
'작   성   일 : 2006.04.12
====================================================================
'수정자/수정일  : 수정사유 
'이우석/20081029: 저원가성 여부 추가
'하진영/2010.03 : 총여신여부 추가
'하진영/20110212: 기준실적상품분류코드 추가
'하진영/20120214: 신규고정이하여신제외여부,순이자대상상품구분 추가
'조형석/2013.07.24/특정상품분류 추가 : 2013년 하반기 성과기준
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
    String jekyocode  = JSPUtil.getParameter(request,"jekyocode"," ");
    String bgubun     = JSPUtil.getParameter(request,"bgubun","999");
    String strMsg     = "";
    String level      = "";

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
            if(v_inqtype.equals("3")){
                String productgubun = JSPUtil.getParameter(request,"productgubun"," ");
                DBProcCall jado    = new DBProcCall();
                if(jekyocode.equals("1")) level="1";
                else  level="2";
                rs=jado.callProc("UP_KPI_O_S_CO상품그룹분류",basemonth+","+level+","+productgubun+","+bgubun);
            }else{
                eventResponse=(macd_scr_EventResponse)request.getAttribute("macd_scr_EventResponse");
                if (eventResponse !=null) 
                {

                  rs=eventResponse.getList();
                  rc=eventResponse.getCnt();
                  ext=eventResponse.getExt();
                }
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
   if(ext==null){
     try{
%>
<SHEET>
  <DATA>
<%
       if(rs != null ){
            rs.first();
            while(rs.next())
            {    
              if(v_inqtype.equals("3")){ /* 그룹 분류 조회 */
%>
    <TR>
      <TD><![CDATA[<%=rs.getString("kpi상품그룹코드").trim()%>]]></TD>   
      <TD><![CDATA[<%=rs.getString("kpi상품그룹명").trim()%>]]></TD>   
    </TR> 
<%
              }else if(hidden_key.equals("9")){
%>
    <TR>
      <TD><![CDATA[<%=rs.getString("상태").trim()%>]]></TD>   
      <TD><![CDATA[<%=rs.getString("대분류코드").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("대분류명").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("중분류코드").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("중분류명").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("세분류코드").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("세분류명").trim()%>]]></TD>
      <TD><![CDATA[<%="1".equals(rs.getString("순이자수익대상상품구분").trim()) ? "원화순이자": "2".equals(rs.getString("순이자수익대상상품구분").trim()) ? "외화순이자": "미입력"%>]]></TD>      
      <TD><![CDATA[<%=rs.getString("연체대상여부").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("신용카드연체대상여부").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("저원가성여부").trim()%>]]></TD>
      <TD><![CDATA[<%="1".equals(rs.getString("총여신구분").trim()) ? "Y": "0".equals(rs.getString("총여신구분").trim()) ? "N": "2".equals(rs.getString("총여신구분").trim()) ? "부동산PF": "3".equals(rs.getString("총여신여부").trim()) ? "정책자금분류": "미입력"%>]]></TD>      
      <TD><![CDATA[<%="1".equals(rs.getString("PI이자대상여부").trim()) ? "Y": "2".equals(rs.getString("PI이자대상여부").trim()) ? "N": "3".equals(rs.getString("PI이자대상여부").trim()) ? "평잔": "4".equals(rs.getString("PI이자대상여부").trim()) ? "이자": "미입력"%>]]></TD>
      <TD><![CDATA[<%=rs.getString("기준실적상품분류명").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("신규고정이하여신대상여부").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("위험조정운용대상여부").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("특정상품분류코드").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("디마케팅제외구분").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("소매여신구분").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("수수료구분").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("수수료구분값").trim()%>]]></TD>
      <TD><![CDATA[<%=rs.getString("기준실적상품분류코드").trim()%>]]></TD>
    </TR> 
<%            } /* end if v_inqtype*/
            } /* end while */
       } /* end if rs */
%>
  </DATA>
<%
            if(v_inqtype.equals("3")){
                strMsg = "G"+jekyocode;
            }else{
                 if(hidden_key.equals("1"))         strMsg = "등록 완료 되었습니다.";
                 else if(hidden_key.equals("2") || hidden_key.equals("3"))    strMsg = "변경 완료 되었습니다.";
                 else                               strMsg = "조회 완료 되었습니다.";
            } /* end if v_inqtype */
%>             
  <MESSAGE><![CDATA[<%=strMsg%>]]></MESSAGE>
</SHEET>
<%
   }catch(Exception e){   
%>
<SHEET>
<RESULT Code="-1" Message="<%=e.toString().replaceAll("\"", "`").replaceAll("\n", "<br>")%>"/>
</SHEET>
<% 
   }
   }
%>