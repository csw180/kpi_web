<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 일일영업점보고서 - 연구위원 권유리스트
'프로그램 ID  : rpdy_scr_2200.jsp
'프로그램 명  : 연구위원 권유리스트
'프로그램개요 : 연구위원 권유리스트
'작   성   자 : 조형석
'작   성   일 : 2013.11.19
====================================================================
'수정자/수정일/수정사유: 하진영/2014.09.05: 조회사유코드 추가
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%@ page import="kpi.rpop.util_selectbox"%>
<%  
    String topmenu_name  = "일일성과보고서";
    String leftmenu_name = "연구위원";
    String htm_title     = "연구위원 권유리스트";
    String actionname    = "";
    String haengwon_no   = "";

    String strErrMsg     = "";
    String status        = "0";
    String readonly      = "readonly disabled";
    String allRole       = "0";
    String isRoleEnable  = "0";

    try {
        haengwon_no   = kpi_rpt_account.getHaengwon_no(); //직원번호
        haengwon_no   = "0000000000" + haengwon_no;                                           // 직원번호 10자리 '0' 채움
        haengwon_no   = haengwon_no.substring(haengwon_no.length()-10,haengwon_no.length());  // 직원번호 10자리로 생성

        //권한에따른 점조회 Button 및 점검색기능 설정
        String role[] = kpi_rpt_account.getRole();        
        for(int i = 0; i < role.length; i++) {
            if(role[i].trim().equals("510") || role[i].trim().equals("450")){  // 450: 성과담당전산, 510:후선보임인력관리자
                readonly = "";
                allRole  = "1";
                break;
            }
        }
    }catch(Exception exx)  {

    }
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpdy/scr/rpdy_scr_2200.js"></script>
<Script language="javascript">

function hiddenGrid_OnSearchEnd(Code, Msg){
	showUnitText("원");
    len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.baseday);
            document.frm.baseday.selectedIndex=0;
            selectmonth();
        }else{
        	showMsg(Code, Msg);
        }
    }
}

function hiddGridmon_OnSearchEnd(Code, Msg){
	var baseday     = document.frm.baseday.value;
	
	// 기준일자 정보
    if(isRoleEnable == '1') {
    	 // 후선보임관리자
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2200.do?hidden_key=9&baseday="+baseday+"&emnm="+emnm+"&sergb=98");
    } else {
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2200.do?hidden_key=9&baseday="+baseday+"&emnm="+emnm+"&sergb=99");
    }
}

function mySheet_OnSearchEnd(Code, Msg){
	
	showUnitText("원");
	
	mySheet.SetSumValue(0,"합 계");
	mySheet.SetCellAlign(mySheet.LastRow(),0,"Center");
	//합계행 병합
	//mySheet.SetMergeCell (mySheet.LastRow(), 0, 1,1);
	
    showMsg(Code, Msg);
}    

function mySheet_OnSelectMenu(sAction){
 
	doAction(sAction);
}

function mySheet_OnDownFinish(downloadType, result) {
    if(result) {
    	
    	var baseday     = document.frm.baseday.value;
	    var emnm        = document.frm.emnm.value;
	    var searchCode  = document.frm.searchCode.value;
	    
        condition="기준일="+baseday+";후선보임직원번호="+emnm+";";
	 	
       	hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9096.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"
                +"&cust_no=0"+"&searchCode="+searchCode+"&pg_url="+pg_url));
    
    }
}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%> 
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <tr>
    <th>기준일</th>
    <td><select name="baseday" class="select" onchange="selectmonth()"></select></td>
    <th>직원번호</th>
    <td><input type="text" class="input_l" name="emnm" size="10" value="<%=haengwon_no%>" <%=readonly%> onkeyup="chk_num()"> </td>
    <th>조회사유코드</th>
    <td colspan="3">
     <select name="searchCode" class="select" onchange="allDelDataGrid(mySheet);showUnitText('원');" >
       <option value='00'>선택</option>            
          <%  util_selectbox us2  =  new  util_selectbox();
              us2.setData("UP_KPI_C_S_CO고객조회사유코드","","코드","코드명");
              out.println(us2.getData());
          %>
     </select>
    </td>
    <td align="right" class="end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
    </td>
  </tr>
  <tr>
    <td colspan="9" class="topB">
      <marquee scrollamount='3' direction='left' width='450'>본 보고서는 특정고객에 관한 금융정보를 일부 포함하고 있으니, 고객정보 유출에 각별히 유의하시기 바랍니다.</marquee>
    </td>
  </tr>  
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
  <tr>
    <td>
       <div id="sheetObj"></div>
    </td>
  </tr>
</table>
<div id="hiddenGridObj"></div>
<div id="hiddGridmonObj"></div>
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
<% if(allRole=="1") { %>
      document.frm.searchCode.value = '32';  // [32]성과평가작업 
<% } %>
isRoleEnable = '<%=allRole%>';
LoadPage();
htm_title = '<%=htm_title%>';
</script>