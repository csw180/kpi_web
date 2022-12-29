<?xml version="1.0"  ?>
<%--=========================================================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : 일일성과 보고서관리
'프로그램 ID  : dayjobcontrollist.jsp
'프로그램 명  : 일일성과 보고서OPEN 설정
'프로그램개요 : 일일성과 보고서 관리
'작   성   자 : 조형석
'작   성   일 : 2013.03.14
=============================================================================================
'수정자/수정일/수정사유:하진영/2014.03.24: 비이자사업조회여부,고객관계조회여부 추가
'                       유용욱/2018.02.20: 전략사업조회여부 추가
==========================================================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="tpms.common.web.CommonWebKeys"%>
<%@ page import="tpms.framework.component.util.JSPUtil"%>
<%@ page import="tpms.framework.component.signon.SignOnUserAccount"%>
<%@ page import="tpms.framework.component.error.ErrorHandler"%>
<%@ page import="tpms.framework.component.dao.*"%>
<% 
    
    DbResultSet rs        = null;    
    DBProcCall  cp        = new DBProcCall();
    long rtn              = 0;
    String hidden_key     = JSPUtil.getParameter(request,"hidden_key"," ");
    String strMsg         = "";
    try 
    {
        if(hidden_key.equals("2")){
          SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);

          String sStatus[] = JSPUtil.getParameter(request,"sStatus",0);   // 상태                
          String v_s1[]    = JSPUtil.getParameter(request,"v_s1",0);     // 작업기준일                        
          String v_s2[]    = JSPUtil.getParameter(request,"v_s2",0);     // 삭제제외여부      
          String v_s3[]    = JSPUtil.getParameter(request,"v_s3",0);     // 예수금조회여부    
          String v_s4[]    = JSPUtil.getParameter(request,"v_s4",0);     // 대출금조회여부    
          String v_s5[]    = JSPUtil.getParameter(request,"v_s5",0);     // 연체율조회여부    
          String v_s6[]    = JSPUtil.getParameter(request,"v_s6",0);     // RM권유계좌조회여부
          String v_s7[]    = JSPUtil.getParameter(request,"v_s7",0);     // RM예수금조회여부  
          String v_s8[]    = JSPUtil.getParameter(request,"v_s8",0);     // RM대출금조회여부  
          String v_s9[]    = JSPUtil.getParameter(request,"v_s9",0);     // 신용카드조회여부  
          String v_s10[]   = JSPUtil.getParameter(request,"v_s10",0);    // 성과집게표조회여부
          String v_s11[]   = JSPUtil.getParameter(request,"v_s11",0);    // 비이자사업조회여부
          String v_s12[]   = JSPUtil.getParameter(request,"v_s12",0);    // 고객관계조회여부
          String v_s13[]   = JSPUtil.getParameter(request,"v_s13",0);    // 전략사업조회여부
                                                                            
          for(int i = 0; i < sStatus.length; i++){
            rtn = cp.InputProc("UP_KPI_S_S_CO일일성과보고서관리",sStatus[i] + "," +
                                                          v_s1[i]    + "," +
                                                          account.getHaengwon_no() + "," +
                                                          v_s2[i]    + "," +
                                                          v_s3[i]    + "," +
                                                          v_s4[i]    + "," +
                                                          v_s5[i]    + "," +
                                                          v_s6[i]    + "," +
                                                          v_s7[i]    + "," +
                                                          v_s8[i]    + "," +
                                                          v_s9[i]    + "," +
                                                          v_s10[i]   + "," +
                                                          v_s11[i]   + "," +
                                                          v_s12[i]   + "," +
                                                          v_s13[i]
                                                  );

          }
        }else if(hidden_key.equals("3")){

        }
        if(!hidden_key.equals("3")){
        rs = cp.callProc("UP_KPI_S_S_CO일일성과보고서관리조회");     // 작업기준일 리스트
        }
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
%>
<SHEET>
  <DATA>
<%  
       if(rs != null)                       
       {
          
            rs.first();
            while(rs.next())
            {  
               
%>
    <TR>
      <TD></TD>
      <TD></TD>
<%//             for(int i=1; i <= rs.getColumnCount(); i++){ %>
      <!-- TD --><%//=rs.getString(i).trim()%><!-- /TD --> 
<%//             }%>

<%
				String tmpValue = "";
				for(int i=1; i <= rs.getColumnCount(); i++) { 
					
					if("Y".equals(rs.getString(i).trim())) 
						tmpValue = "1";
					else if("N".equals(rs.getString(i).trim()))
						tmpValue = "0";
				    else
						tmpValue = rs.getString(i).trim();
%>					
       <TD><%=tmpValue%></TD>
<%
				}
%>


    </TR> 
<%          
            }
       }  
%>
  </DATA>
<%
       if(hidden_key.equals("2"))       strMsg = "등록 완료 되었습니다.";
       else if(hidden_key.equals("3"))  strMsg = "등록 완료 되었습니다.";
       else                             strMsg = "조회 완료 되었습니다.";
%>       
  <MESSAGE><![CDATA[<%=strMsg%>]]></MESSAGE>  
</SHEET>
<% 


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