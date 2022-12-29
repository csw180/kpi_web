<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - 일일 소매여신운용 실적
'프로그램 ID  : rpdy_scr_1120.jsp
'프로그램 명  : 일일 소매여신운용 실적
'프로그램개요 : 일일 소매여신운용 실적
'작   성   자 : 하진영
'작   성   일 : 2014.03.17
====================================================================
'수정자/수정일/수정사유: 
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "일일성과보고서";
    String      leftmenu_name    = "대출금"; 
    String      htm_title        = "일일 소매대출금 실적"; 
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
<script language="javascript" src="/kpi/rpdy/scr/rpdy_scr_1120.js"></script>

<Script language="javascript">
var num;
function hiddenGrid_OnSearchEnd(Code, Msg){
	showUnitText("원, %");
    len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.baseday);
            document.frm.baseday.selectedIndex=0;
            selectmonth();
        }else if (Msg.substr(0,1) == "J"){
            if (Msg.substr(1,len) == "7"){
                ComboValue(document.frm.pgcode);
            }
        }else if (Msg.substr(0,1) == "C"){
            ComboValue(document.frm.productcode);
        }else{
        	showMsg(Code, Msg);
        }
    }
}

function mySheet_OnDownFinish(downloadType, result) {
	if(result) {
	    
	    var baseday     = document.frm.baseday.value;
	    var pgcode      = document.frm.pgcode.value;
	    var sergb       = document.frm.sergb.value;
	    var metrogb     = document.frm.metrogb.value;
	    var fundgb=document.frm.fundgb.value;
	    
        condition="기준일="+baseday+";PG코드="+pgcode+";광역금융본부="+metrogb+";조회구분="+fundgb;
        
	    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition));
	}
	
}

function metrogbhiddenGrid_OnSearchEnd(Code, Msg){
	showUnitText("원, %");
    len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "J"){
            if (Msg.substr(1,len) == "49"){
                ComboValue1(document.frm.metrogb);
            }
        }else{
        	showMsg(Code, Msg);
        }
    }
}

function hiddGridmon_OnSearchEnd(Code, Msg){
	// 기준일자 정보
    if(isRoleEnable == '1') {
    	 // 전산정보부 및 성과 담당자
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_1120.do?hidden_key=9&baseday="+baseday+"&saupgbn=9&pgcode="+pgcode+"&sergb=98");
    } else {
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_1120.do?hidden_key=9&baseday="+baseday+"&saupgbn=9&pgcode="+pgcode+"&sergb=99");
    }
}

function mySheet_OnSearchEnd(Code, Msg){
	showUnitText("원, %");

	mySheet.SetSumValue(0,"합 계");
	mySheet.SetCellAlign(mySheet.HeaderRows(),0,"Center");
	//합계행 병합
	mySheet.SetMergeCell (mySheet.HeaderRows(), 0, 1,3);
	
	showMsg(Code, Msg);
	
	num = mySheet.GetCellValue(mySheet.HeaderRows(),mySheet.LastCol()-2) / mySheet.GetCellValue(mySheet.HeaderRows(), mySheet.LastCol()-1) * 100
	mySheet.SetCellValue(mySheet.HeaderRows(),mySheet.LastCol(), num.toFixed(1),0); 
	if (!isFinite(num)) mySheet.SetCellValue(mySheet.HeaderRows(),mySheet.LastCol(), 0); //infinity나올 때 0으로 대체
	
	/* if (document.frm.baseday.value >= '20191023'){
		num = mySheet.GetCellValue(mySheet.HeaderRows(),28) / mySheet.GetCellValue(mySheet.HeaderRows(), 29) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),30, num.toFixed(1),0);
	} else if (document.frm.baseday.value >= '20190701') {
		num = mySheet.GetCellValue(mySheet.HeaderRows(),27) / mySheet.GetCellValue(mySheet.HeaderRows(), 28) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),29, num.toFixed(1),0);
	} else if (document.frm.baseday.value >= '20190101') {
		num = mySheet.GetCellValue(mySheet.HeaderRows(),26) / mySheet.GetCellValue(mySheet.HeaderRows(), 27) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),28, num.toFixed(1),0);
	} else if (document.frm.baseday.value >= '20180101') {
		num = mySheet.GetCellValue(mySheet.HeaderRows(),33) / mySheet.GetCellValue(mySheet.HeaderRows(), 34) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),35, num.toFixed(1),0);
	} else if (document.frm.baseday.value >= '20171101') {
		num = mySheet.GetCellValue(mySheet.HeaderRows(),32) / mySheet.GetCellValue(mySheet.HeaderRows(), 33) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),34, num.toFixed(1),0);
	} else if (document.frm.baseday.value >= '20170930') {
		num = mySheet.GetCellValue(mySheet.HeaderRows(),31) / mySheet.GetCellValue(mySheet.HeaderRows(), 32) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),33, num.toFixed(1),0);
	} else if (document.frm.baseday.value >= '20170101') {
		num = mySheet.GetCellValue(mySheet.HeaderRows(),29) / mySheet.GetCellValue(mySheet.HeaderRows(), 30) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),31, num.toFixed(1),0);
	} else if (document.frm.baseday.value >= '20160701') {
		num = mySheet.GetCellValue(mySheet.HeaderRows(),25) / mySheet.GetCellValue(mySheet.HeaderRows(), 26) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),27, num.toFixed(1),0);
	} else if (document.frm.baseday.value >= '20160101') {
		num = mySheet.GetCellValue(mySheet.HeaderRows(),24) / mySheet.GetCellValue(mySheet.HeaderRows(), 25) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),26, num.toFixed(1),0);
	} else if (document.frm.baseday.value >= '20150701') {
		num = mySheet.GetCellValue(mySheet.HeaderRows(),22) / mySheet.GetCellValue(mySheet.HeaderRows(), 23) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),24, num.toFixed(1),0);
	} else if (document.frm.baseday.value >= '20150101') {
		num = mySheet.GetCellValue(mySheet.HeaderRows(),20) / mySheet.GetCellValue(mySheet.HeaderRows(), 21) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),22, num.toFixed(1),0);
	} else if (document.frm.baseday.value >= '20140701') {
		num = mySheet.GetCellValue(mySheet.HeaderRows(),19) / mySheet.GetCellValue(mySheet.HeaderRows(), 20) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),21, num.toFixed(1),0);
	} else {
		num = mySheet.GetCellValue(mySheet.HeaderRows(),18) / mySheet.GetCellValue(mySheet.HeaderRows(), 19) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),20, num.toFixed(1),0);
	} */
	
	
}    

function mySheet_OnSelectMenu(sAction){
 
	doAction(sAction);
}

/* 무한루프 Onsearchend로 변경
 function mySheet_OnChangeSum(Row){
	
	if (document.frm.baseday.value >= '20191023') mySheet.SetCellValue(Row,30,mySheet.GetCellValue(Row,28) / mySheet.GetCellValue(Row, 29) * 100 ,0);
	else if (document.frm.baseday.value >= '20190701') mySheet.SetCellValue(Row,29,mySheet.GetCellValue(Row,27) / mySheet.GetCellValue(Row, 28) * 100 ,0);
	else if (document.frm.baseday.value >= '20190101') mySheet.SetCellValue(Row,28,mySheet.GetCellValue(Row,26) / mySheet.GetCellValue(Row, 27) * 100 ,0);
	else if (document.frm.baseday.value >= '20180101') mySheet.SetCellValue(Row,35,mySheet.GetCellValue(Row,33) / mySheet.GetCellValue(Row, 34) * 100 ,0);
	else if (document.frm.baseday.value >= '20171101') mySheet.SetCellValue(Row,34,mySheet.GetCellValue(Row,32) / mySheet.GetCellValue(Row, 33) * 100 ,0);
	else if (document.frm.baseday.value >= '20170930') mySheet.SetCellValue(Row,33,mySheet.GetCellValue(Row,31) / mySheet.GetCellValue(Row, 32) * 100 ,0);
	else if (document.frm.baseday.value >= '20170101') mySheet.SetCellValue(Row,31,mySheet.GetCellValue(Row,29) / mySheet.GetCellValue(Row, 30) * 100 ,0);
	else if (document.frm.baseday.value >= '20160701') mySheet.SetCellValue(Row,27,mySheet.GetCellValue(Row,25) / mySheet.GetCellValue(Row, 26) * 100 ,0);
	else if (document.frm.baseday.value >= '20160101') mySheet.SetCellValue(Row,26,mySheet.GetCellValue(Row,24) / mySheet.GetCellValue(Row, 25) * 100 ,0);
	else if (document.frm.baseday.value >= '20150701') mySheet.SetCellValue(Row,24,mySheet.GetCellValue(Row,22) / mySheet.GetCellValue(Row, 23) * 100 ,0);
	else if (document.frm.baseday.value >= '20150101') mySheet.SetCellValue(Row,22,mySheet.GetCellValue(Row,20) / mySheet.GetCellValue(Row, 21) * 100 ,0);
	else if (document.frm.baseday.value >= '20140701') mySheet.SetCellValue(Row,21,mySheet.GetCellValue(Row,19) / mySheet.GetCellValue(Row, 20) * 100 ,0);
	else mySheet.SetCellValue(Row,20,mySheet.GetCellValue(Row,18) / mySheet.GetCellValue(Row, 19) * 100 ,0);

} */
</script> 
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <tr> 
    <th class="wd10">기준일</th>
    <td>
     <select name="baseday" class="select" onchange="selectmonth()"></select>
    </td>
    <th class="wd10">Peer Group</th>
    <td colspan="2"><select name="pgcode" onchange="allDelDataGrid(mySheet);showUnitText('원, %');"><option value="0">전체</option></select></td>
    <td class="al_R end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
      <span class="btn_Grd" style="cursor:pointer; display:none;" id="print" border="0" onclick="javascript:doPrint();">인쇄</span>
    </td>
  </tr>
  <tr> 
    <th class="nobor">조회구분</th>
    <td class="nobor">
     <select name="fundgb" class="select" onchange="setfundgb();showUnitText('원, %');">
          <option value="253">순증잔액</option>
          <option value="262">신규잔액</option>
     </select>
    </td>
    <th class="nobor">광역금융본부</th>
    <td class="nobor end" colspan="3">
     <select name="metrogb" onchange="allDelDataGrid(mySheet);showUnitText('원, %');"><option value="0">전체</option></select>
    </td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
    <tr>
        <td class="desc2" > ※ 일일성과보고서는 <u>평가 조정사항</u>이 모두 반영되어 있지 않으므로 실제 평가실적과 다를 수 있습니다. </td>
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
<div id="mtrhiddenGridObj"></div>
<div id="hiddGridmonObj"></div>
    
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
isRoleEnable = '<%=allRole%>';
LoadPage();
htm_title = '<%=htm_title%>';
</script>
