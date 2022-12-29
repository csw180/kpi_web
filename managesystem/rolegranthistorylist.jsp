<?xml version="1.0" ?>
<%--===============================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : 시스템관리
'프로그램 ID  : rolegranthistorylist.jsp
'프로그램 명  : 권한 부여 이력 관리
'프로그램개요 : 권한 부여 이력 관리
'작   성   자 : 조형석
'작   성   일 : 2014.1.27
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
    String sergb          = JSPUtil.getParameter(request,"sergb"," ");
    String emnm           = JSPUtil.getParameter(request,"emnm"," ");
    String strMsg         = "";

    //조회 시작/종료 시간
    String startTime, endTime;
    SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);

    try 
    {
        //시작시간
        startTime = tpms.framework.component.util.DateTime.getShortTimeString();
        
        if(hidden_key.equals("2")){

           String sStatus[] = JSPUtil.getParameter(request,"sStatus",0);
           String v_s1[]    = JSPUtil.getParameter(request,"v_sv_1",0);         // 서버구분코드
           String v_s2[]    = JSPUtil.getParameter(request,"v_sv_2",0);         // 권한상태코드
           String v_s3[]    = JSPUtil.getParameter(request,"v_sv_3",0);         // 권한사유코드
           String v_s4[]    = JSPUtil.getParameter(request,"v_sv_4",19000101);  // 권한등록일시
           String v_s5[]    = JSPUtil.getParameter(request,"v_sv_5",0);         // 직원번호
           String v_s6[]    = JSPUtil.getParameter(request,"v_sv_7",0);         // role코드
           String v_s7[]    = JSPUtil.getParameter(request,"v_sv_8",0);         // role코드명
           String v_s8[]    = JSPUtil.getParameter(request,"v_sv_9",0);         // 점번호
           String v_s9[]    = JSPUtil.getParameter(request,"v_sv_10",0);        // 문서번호
           String v_s10[]   = JSPUtil.getParameter(request,"v_sv_11",0);        // 적요

           for(int i = 0; i < sStatus.length; i++){
               // 권한이력 삽입인 경우 권한등록일시는 현재시간으로 처리하므로 날자형식으로 처리값 처리
               if(sStatus[i].equals("I")) {v_s4[i] = "19000101";}
               rtn = cp.InputProc("UP_KPI_S_S_CO성과관리권한이력관리",sStatus[i] + "," +
                                                               v_s1[i]    + "," +
                                                               v_s2[i]    + "," +
                                                               v_s3[i]    + "," +
                                                               v_s4[i]    + "," +
                                                               v_s5[i]    + "," +
                                                               v_s6[i]    + "," +
                                                               v_s7[i]    + "," +
                                                               v_s8[i]    + "," +
                                                               v_s9[i]    + "," +
                                                               v_s10[i]   + "," +
                                                               account.getHaengwon_no()
                                  );
               
               //종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();
               
               cp.InputProc("UP_KPI_C_S_WEBLOG"
                              ,"5"                          +","  //2:rpop,1:rpdy,5:운영관리
                              +"권한부여이력관리처리"	      +","  //프로그램ID
                              +startTime                    +","  //시작시간
                              +endTime                      +","  //완료시간
                              +account.getHaengwon_no()     +","  //사용자ID
                              +account.getBranch_no()       +","  //점번호
                              +request.getRemoteAddr()      +","  //사용자IP
                              +"상태="         + sStatus[i] +";"  //조건 ~
                              +"서버구분코드=" + v_s1[i]    +";"
                              +"권한상태코드=" + v_s2[i]    +";"
                              +"권한사유코드=" + v_s3[i]    +";"
                              +"권한등록일시=" + v_s4[i]    +";"
                              +"직원번호="     + v_s5[i]    +";"
                              +"ROLE코드="     + v_s6[i]    +";"
                              +"ROLE코드명="   + v_s7[i]    +";"
                              +"점번호="       + v_s8[i]    +";"
                              +"문서번호="     + v_s9[i]    +";"
                              +"적요="         + v_s10[i]    +";"
                            );
           }                
                            
                            
                            
        } else if(hidden_key.equals("9")) {
               rs = cp.callProc("UP_KPI_S_S_CO성과관리권한이력조회", sergb+","+emnm); // 작업기준일 리스트
                            
               //종료시간   
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();
                            
               cp.InputProc("UP_KPI_C_S_WEBLOG"
                              ,"5"                          +","  //2:rpop,1:rpdy,5:운영관리
                              +"권한부여이력관리조회"	      +","  //프로그램ID
                              +startTime                    +","  //시작시간
                              +endTime                      +","  //완료시간
                              +account.getHaengwon_no()     +","  //사용자ID
                              +account.getBranch_no()       +","  //점번호
                              +request.getRemoteAddr()      +","  //사용자IP
                              +"조회구분=" + sergb +";"  //조건 ~
                              +"직원번호=" + emnm  +";" 
                            );               
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
<%             for(int i=1; i <= rs.getColumnCount(); i++){ %>
      <TD><%=rs.getString(i).trim()%></TD> 
<%             }%>
    </TR> 
<%          
            }
       }  
%>
  </DATA>
<%
       if(hidden_key.equals("2"))       strMsg = "저장 완료 되었습니다.";
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