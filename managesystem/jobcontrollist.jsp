<?xml version="1.0"  ?>
<%--===============================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : ABC
'프로그램 ID  : jobcontrollist.jsp
'프로그램 명  : 작업 기준 일자
'프로그램개요 : 작업 기준 일자 관리
'작   성   자 : 변휘원
'작   성   일 : 2006.06.20
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

          String sStatus[] = JSPUtil.getParameter(request,"sStatus",0);
          String v_s1[]    = JSPUtil.getParameter(request,"v_s1",0);
          String v_s2[]    = JSPUtil.getParameter(request,"v_s2",0);
          String v_s3[]    = JSPUtil.getParameter(request,"v_s3",0);
          String v_s4[]    = JSPUtil.getParameter(request,"v_s4",0);
          String v_s5[]    = JSPUtil.getParameter(request,"v_s5",0);
          for(int i = 0; i < sStatus.length; i++){
            rtn = cp.InputProc("UP_KPI_S_S_CO마감관리처리",sStatus[i] + "," +
                                                   v_s1[i]    + "," +
                                                   v_s2[i]    + "," +
                                                   v_s3[i]    + "," +
                                                   v_s4[i]    + "," +
                                                   v_s5[i]    + "," +
                                                   account.getHaengwon_no()  + " "
                                                  );

          }
        }else if(hidden_key.equals("3")){

        }
        if(!hidden_key.equals("3")){
        rs = cp.callProc("UP_KPI_S_S_CO마감관리");     // 작업기준월 리스트
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