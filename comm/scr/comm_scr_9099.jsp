<?xml version="1.0"  ?>
<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 공통
'프로그램 ID  : comm_scr_9099.jsp
'프로그램 명  : 
'프로그램개요 :  Grid XML
'작   성   자 : 하진영
'작   성   일 : 2011.01.
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
    String hidden_key = JSPUtil.getParameter(request,"hidden_key","");  
    String v_inqtype  = JSPUtil.getParameter(request,"v_inqtype",""); 
    String basemonth  = JSPUtil.getParameter(request,"basemonth","");
    String jekyocode  = JSPUtil.getParameter(request,"jekyocode","");
    String v_jumcode  = JSPUtil.getParameter(request,"v_jumcode","");
    String customerno = JSPUtil.getParameter(request,"customerno","");
    String stmonth    = JSPUtil.getParameter(request,"stmonth","");
    String msg        = "";
    DbResultSet rs    = null;
    DBProcCall cp     = new DBProcCall();
    String basemonthFlag = "";

    String haengwon_no = "";
    try {
        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);
		    haengwon_no  = account.getHaengwon_no();    
        String role[] = account.getRole();
        
        for(int i = 0; i < role.length; i++) {
            System.out.println("comm_scr_9099 ::: role = [" + i + "] = [" +  role[i] +"]");
            if(role[i].trim().equals("400") || role[i].trim().equals("450")|| role[i].trim().equals("510")){
                //요청 param 에 상관없이 권한을 체크하여 전체 기준년월을 조회
                basemonthFlag = "9";                
                break;
            }
        }

    }catch(Exception exx)  {             
            
    }
    
    try
    {
        if(hidden_key.equals("1")){
            rs = cp.callProc("UP_KPI_C_S_CO점명조회",basemonth+","+v_jumcode);
        }else if(hidden_key.equals("3")){
            String v_kpicode  = JSPUtil.getParameter(request,"v_kpicode",""); 
            rs = cp.callProc("xwp_cokpi코드명조회",basemonth+","+v_kpicode); /* 매핑 대상 없음 */
        }else if(hidden_key.equals("6")){
              rs = cp.callProc("UP_KPI_C_S_CO영업점PG명",basemonth+","+v_jumcode);            
        }else if(hidden_key.equals("11")){
            String bgubun  = JSPUtil.getParameter(request,"bgubun","0");
            rs = cp.callProc("UP_KPI_C_S_CO이익상세코드",jekyocode+","+basemonth+","+bgubun);
        }else if(hidden_key.equals("13")){
            String gubun  = JSPUtil.getParameter(request,"gubun","0");
            rs = cp.callProc("UP_KPI_O_S_통합정보코드조회",basemonth+","+jekyocode+","+gubun);
        }else if(hidden_key.equals("14")){
            rs = cp.callProc("UP_KPI_C_S_CO고객번호조회","0,"+customerno);
        }else if(hidden_key.equals("15")){
            rs = cp.callProc("UP_KPI_C_S_CO재무회계계정코드조회",jekyocode);
        }else if(hidden_key.equals("16")){
            rs = cp.callProc("UP_KPI_O_S_거액조달처확인",basemonth+","+customerno);  
        }else{
            if(v_inqtype.equals("1")){
               if(!stmonth.equals("")){
                  if(!basemonthFlag.equals("")){
                      rs=cp.callProc("UP_KPI_C_S_CO기준년월조건선택",basemonthFlag+","+stmonth);
                  }
                  else{
                      rs=cp.callProc("UP_KPI_C_S_CO기준년월조건선택",jekyocode+","+stmonth);
                  }
               } else { 
                  if(!basemonthFlag.equals("")){
                      rs=cp.callProc("UP_KPI_C_S_CO기준년월",basemonthFlag);
                  }
                  else{
                      rs=cp.callProc("UP_KPI_C_S_CO기준년월",jekyocode);
                  }
               }
            }else if(v_inqtype.equals("2")){
                String gubun  = JSPUtil.getParameter(request,"gubun","0");      
                String pggubun  = JSPUtil.getParameter(request,"pggubun","0");          
                rs=cp.callProc("UP_KPI_C_S_CO정보코드",basemonth+","+jekyocode+","+gubun+","+pggubun);
            }else if(v_inqtype.equals("3")){
               if(!basemonthFlag.equals("")){
                   rs=cp.callProc("UP_KPI_C_S_CO기준년월본부입력",basemonthFlag);
               }
               else{
                   rs=cp.callProc("UP_KPI_C_S_CO기준년월본부입력",jekyocode);
               }
            }
        }
        
        //System.out.println("----------------------------------------------------");
        //System.out.println("rs cnt : " + rs.getMaxRowCount());
        //System.out.println("----------------------------------------------------");
        
        if(rs != null) {
        	
        	
%>
<SHEET>
  <DATA>
<%       
			if(rs.getMaxRowCount() > 0) {
				
            rs.first();
            
            while(rs.next())
            {
              if(hidden_key.equals("1")){ /* 점명 조회 */
%>
        <TR>
          <TD><![CDATA[<%=rs.getString("점명").trim()%>]]></TD>   
        </TR> 
<%     
              }else if(hidden_key.equals("3")){ /* KPI코드명 조회 */
%>
        <TR>
          <TD><![CDATA[<%=rs.getString("kpi코드명").trim()%>]]></TD>   
          <TD><![CDATA[<%=rs.getString("평가주체").trim()%>]]></TD>   
        </TR> 
<%     
              }else if(hidden_key.equals("4")){ /* KPI코드명 조회 */
%>
        <TR>
          <TD><![CDATA[<%=rs.getString("kpi코드").trim()%>]]></TD>   
          <TD><![CDATA[<%=rs.getString("kpi명").trim()%>]]></TD>   
        </TR> 
<%     
              }else if(hidden_key.equals("5")){ /* KPI코드명 조회 */
%>
        <TR>
          <TD><![CDATA[<%=rs.getString("kpi상품그룹코드").trim()%>]]></TD>   
          <TD><![CDATA[<%=rs.getString("kpi상품그룹명").trim()%>]]></TD>   
        </TR> 
<%     
              }else if(hidden_key.equals("6")){ /* 영업점peer group명 */
%>
        <TR>
          <TD><![CDATA[<%=rs.getString("pg코드").trim()%>]]></TD>   
          <TD><![CDATA[<%=rs.getString("pg명").trim()%>]]></TD>   
        </TR> 
<%
              }else if(hidden_key.equals("7")){ /* 영업점peer group명 */
%>
        <TR>
          <TD><![CDATA[<%=rs.getString("고객관리자코드").trim()%>]]></TD>   
          <TD><![CDATA[(<%=rs.getString("고객관리자코드").trim()%>)<%=rs.getString("성명").trim()%>]]></TD>   
        </TR> 
<%     
              }else if(hidden_key.equals("11")){ /* 영업점peer group명 */
%>
        <TR>
          <TD><![CDATA[<%=rs.getString("기타참고사항1").trim()%>]]></TD>   
          <TD><![CDATA[<%=rs.getString("기타참고사항2").trim()%>]]></TD>   
        </TR> 
<%     
              }else if(hidden_key.equals("13")){ /* 통합정보코드조회 */                   
%>
        <TR>
          <TD><![CDATA[<%=rs.getString("적요코드1").trim()%>]]></TD>   
          <TD><![CDATA[<%=rs.getString("기타참고사항2").trim()%>]]></TD>   
        </TR> 
<%     
              }else if(hidden_key.equals("14")){ /* 고객명조회 */                   
%>
        <TR>
          <TD><![CDATA[<%=rs.getString("고객명").trim()%>]]></TD>
        </TR> 
<%     
              }else if(hidden_key.equals("16")){ /* 거액조달처중복확인 */                     
%>
        <TR>
          <TD><![CDATA[<%=rs.getString("중복여부").trim()%>]]></TD>
          <TD><![CDATA[<%=rs.getString("점번호").trim()%>]]></TD>
          <TD><![CDATA[<%=rs.getString("고객번호").trim()%>]]></TD>
        </TR> 
<%
              }else if(hidden_key.equals("15")){ /* 재무회계계정코드 조회 */                   
%>
        <TR>
          <TD><![CDATA[<%=rs.getString("계정과목명").trim()%>]]></TD>
        </TR> 
<%            }
              else
              {

                if(v_inqtype.equals("1")) /* 작업기준년월 조회 */
                { 
%>
        <TR>
          <TD><![CDATA[<%=rs.getString("작업기준년월").trim()%>]]></TD>   
          <TD><![CDATA[<%=rs.getString("기준년월").trim()%>]]></TD>   
        </TR> 
<%
                }
                else if(v_inqtype.equals("2")) /* 정보코드 조회 */
                {
                  if(hidden_key.equals("8"))
                  {  
                     if(!"3".equals(rs.getString("기타참고사항3").trim()))continue;
                  }
                  
                  if(hidden_key.equals("7"))
                  {
%>
        <TR>
          <TD><![CDATA[<%=rs.getString("기타참고사항3").trim()%>]]></TD>   
          <TD><![CDATA[<%=rs.getString("기타참고사항2").trim()%>]]></TD>   
        </TR> 
<%                }

                  if(jekyocode.equals("14"))
                  {                    
%>
        <TR>
          <TD><![CDATA[<%=rs.getString("기타참고사항3").trim()%>]]></TD>   
          <TD><![CDATA[<%=rs.getString("기타참고사항2").trim()%>]]></TD>   
        </TR> 
<%                }

                  else
                  {
                     if(jekyocode.equals("12"))
                     {
                       if(("0".equals(rs.getString("기타참고사항1").substring(2,3)))&& (!"9".equals(rs.getString("기타참고사항1").substring(1,2))))continue;
                     }
%>
        <TR>
          <TD><![CDATA[<%=rs.getString("기타참고사항1").trim()%>]]></TD>   
          <TD><![CDATA[<%=rs.getString("기타참고사항2")%>]]></TD>   
        </TR> 
<%                 }
                }
                else if(v_inqtype.equals("3")) /* 본부 작업기준년월 조회  */
                {
%>
        <TR>
          <TD><![CDATA[<%=rs.getString("작업기준년월").trim()%>]]></TD>   
          <TD><![CDATA[<%=rs.getString("기준년월").trim()%>]]></TD>   
        </TR> 
<%
                }/* end if v_inqtype */
              } /* end if hidden_key */
            
            
            } /* end while */
        
        } else {
%>
		<TR>
          <TD><![CDATA[<%if(hidden_key.equals("1")) {%>조회된 데이터가 없습니다.<%}%>]]></TD>
        </TR>
<%        	
        }


            if(v_inqtype.equals("1"))        msg = "B";
            else if(v_inqtype.equals("2"))   msg = "J"+jekyocode;
            else if(v_inqtype.equals("3") && hidden_key.equals("9"))   msg = "B";
            else if(hidden_key.equals("11")) msg = "G"+jekyocode;
            else                             msg = "C"+hidden_key;
            
            
%>

  </DATA>
  <MESSAGE><![CDATA[<%=msg%>]]></MESSAGE>
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