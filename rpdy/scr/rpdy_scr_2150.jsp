<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - RM 연체율 현황
'프로그램 ID  : rpdy_scr_2150.jsp
'프로그램 명  : RM 연체율 현황
'프로그램개요 : RM 연체율 현황
'작   성   자 : 조형석
'작   성   일 : 2017.03.02
====================================================================
'수정자/수정일:
'수정사유     :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "일일성과보고서";
    String      leftmenu_name    = "RM"; 
    String      htm_title        = "일일 RM연체율 현황"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
    String      allRole          = "0";

    String role[] = kpi_rpt_account.getRole(); //권한

    for (int i = 0; i < role.length; i++) {
        if (role[i].trim().equals("450") || role[i].trim().equals("400")) {
           allRole="1";
           break;
        }
    } 
    
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpdy/scr/rpdy_scr_2150.js"></script>
<script language="javascript">

function mySheet_OnClick(Row,Col,Value){
	
}

function hiddenGrid_OnSearchEnd(Code, Msg){
	showUnitText("원, %");
    len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.baseday);
            document.frm.baseday.selectedIndex=0;
            selectmonth();
        }else{
            //alert(ErrMsg);
        }
    }
}

function hiddGridmon_OnSearchEnd(Code, Msg){
	baseday     = document.frm.baseday.value;
	
	// 기준일자 정보
    if(isRoleEnable == '1') {
     // 전산정보부 및 성과 담당자
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2150.do?hidden_key=9&baseday="+baseday+"&sergb=98");
    } else {
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2150.do?hidden_key=9&baseday="+baseday+"&sergb=99");
    }
}

function mySheet_OnSearchEnd(Code, Msg){
	showUnitText("원, %");
	
	mySheet.SetSumValue(0,"합 계");
	mySheet.SetCellAlign(mySheet.HeaderRows(),0,"Center");
	//합계행 병합
	mySheet.SetMergeCell(mySheet.HeaderRows(), 0, 1,3);

	showMsg(Code, Msg);
	
	mySheet.SetCellValue(mySheet.HeaderRows(),6,(mySheet.GetCellValue(mySheet.HeaderRows(),5) / mySheet.GetCellValue(mySheet.HeaderRows(), 4) * 100).toFixed(2),0);
	mySheet.SetCellValue(mySheet.HeaderRows(),9,(mySheet.GetCellValue(mySheet.HeaderRows(),8) / mySheet.GetCellValue(mySheet.HeaderRows(), 7) * 100).toFixed(2),0);
	mySheet.SetCellValue(mySheet.HeaderRows(),12,(mySheet.GetCellValue(mySheet.HeaderRows(),11) / mySheet.GetCellValue(mySheet.HeaderRows(), 10) * 100).toFixed(2),0);
}    

function mySheet_OnSelectMenu(sAction){
 
	doAction(sAction);
}

function mySheet_OnDownFinish(downloadType, result) {
	if(result) {
	    
	    var baseday     = document.frm.baseday.value;
	    
        condition="기준일="+baseday;
        
	    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition));
	}
	
}

/* 무한루프 Onsearchend로 변경
function mySheet_OnChangeSum(Row){
	
	mySheet.mySheet.GetCellValue(Row,6,mySheet.GetCellValue(Row,5) / mySheet.GetCellValue(Row, 4) * 100 ,0);
	mySheet.mySheet.GetCellValue(Row,9,mySheet.GetCellValue(Row,8) / mySheet.GetCellValue(Row, 7) * 100 ,0);
	mySheet.mySheet.GetCellValue(Row,12,mySheet.GetCellValue(Row,11) / mySheet.GetCellValue(Row, 10) * 100 ,0);

}
*/
</script> 
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<tr> 
    	<th class="wd10">기준일</th>
    	<td>
     		<select name="baseday" class="select" onchange="selectmonth()"></select>
    	</td>
		<td align="right" class="end">
      		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
    	</td>
  	</tr>
</table>
<table border='0' width='100%'>
    <tr>
        <td style="PADDING-TOP:5px; PADDING-LEFT:8px; FONT-SIZE:12px; FONT-WEIGHT:bold; COLOR:#800000;" > ※ 일일성과보고서는 <u>평가 조정사항</u>이 모두 반영되어 있지 않으므로 실제 평가실적과 다를 수 있습니다. </td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
  	<tr>
    	<td>
       		<div id="sheetObj"></div>
    	</td>
  	</tr>
</table>
<table>
  	<tr>
    	<td>
      		※ 신용카드의 경우 타행 CMS 결제시 결제정보가 익영업일에 발생하여 1영업일정도 연체로 분류될 수 있음
    	</td>
  	</tr>
</table>
<div id="hiddenGridObj"></div>
<div id="hiddGridmonObj"></div>
     
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
isRoleEnable = '<%=allRole%>';
LoadPage();
htm_title = '<%=htm_title%>';
</script>