<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 일일성과보고서 - 신규 기업예수금 고객
'프로그램 ID  : rpdy_scr_2240.jsp
'프로그램 명  : 신규 기업예수금 고객
'프로그램개요 : 신규 기업예수금 고객
'작   성   자 : 양인찬
'작   성   일 : 2018.09.10
====================================================================
'수정자/수정일:
'수정사유     :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "일일성과보고서";
    String      leftmenu_name    = "RM(센터)"; 
    String      htm_title        = "신규 예수금 고객"; 
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
<script language="javascript" src="/kpi/rpdy/scr/rpdy_scr_2240.js"></script>

<Script language="javascript">

function hiddenGrid_OnSearchEnd(Code, Msg){
	showUnitText("Point, %");
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

function metrogbhiddenGrid_OnSearchEnd(Code, Msg){
	showUnitText("Point, %");
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
	var baseday     = document.frm.baseday.value;
	
	 // 기준일자 정보
    if(isRoleEnable == '1') {
    // 전산정보부 및 성과 담당자
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2240.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=98");
    } else {
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2240.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=99");
    }
}

function mySheet_OnSearchEnd(Code, Msg){
	showUnitText("Point, %");

	mySheet.SetSumValue(0,"합 계");
	mySheet.SetCellAlign(mySheet.HeaderRows(),0,"Center");
	//합계행 병합
	mySheet.SetMergeCell(mySheet.HeaderRows(), 0, 1,3);
	
	showMsg(Code, Msg);
	
	if (document.frm.baseday.value >= '20190701' && document.frm.baseday.value <= '20201231'){
		var num = mySheet.GetCellValue(mySheet.HeaderRows(),mySheet.LastCol()-2) / mySheet.GetCellValue(mySheet.HeaderRows(), mySheet.LastCol()-1) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),mySheet.LastCol(), num.toFixed(1),0);
		if (!isFinite(num)) mySheet.SetCellValue(mySheet.HeaderRows(),mySheet.LastCol(), 0);
	} else if (document.frm.baseday.value >= '20180701' && document.frm.baseday.value <= '20191231') {
		var num = mySheet.GetCellValue(mySheet.HeaderRows(),mySheet.LastCol()-1) / mySheet.GetCellValue(mySheet.HeaderRows(), mySheet.LastCol()-2) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),mySheet.LastCol(), num.toFixed(1),0);
		if (!isFinite(num)) mySheet.SetCellValue(mySheet.HeaderRows(),mySheet.LastCol(), 0);
	} 
	

}    

function mySheet_OnSelectMenu(sAction){
 
	doAction(sAction);
}


/* 무한루프 Onsearchend로 변경
function mySheet_OnChangeSum(Row){
	if (document.frm.baseday.value >= '20200701') {
		mySheet.SetCellValue(Row, 8,mySheet.GetCellValue(Row, 6) / mySheet.GetCellValue(Row, 7) * 100 ,0);
	} else if (document.frm.baseday.value >= '20190701') {
		mySheet.SetCellValue(Row, 6,mySheet.GetCellValue(Row, 4) / mySheet.GetCellValue(Row, 5) * 100 ,0);
	} else if (document.frm.baseday.value >= '20190101') {
		mySheet.SetCellValue(Row, 6,mySheet.GetCellValue(Row, 5) / mySheet.GetCellValue(Row, 4) * 100 ,0);
	} else if (document.frm.baseday.value >= '20180701') {
		mySheet.SetCellValue(Row, 5,mySheet.GetCellValue(Row, 3) / mySheet.GetCellValue(Row, 4) * 100 ,0);
	}

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
    	<th class="wd10">Peer Group</th>
    	<td colspan="3">
    		<select name="pgcode" onchange="allDelDataGrid(mySheet);showUnitText('Point, %');">
            	<option value="0">전체</option>
			</select>
    	</td>
    	<th class="wd10">광역금융본부</th>
    	<td>
     		<select name="metrogb" onchange="allDelDataGrid(mySheet);showUnitText('Point, %');"><option value="0">전체</option></select>
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

<div id="hiddenGridObj"></div>
<div id="mtrhiddenGridObj"></div>
<div id="hiddGridmonObj"></div>
     
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
isRoleEnable = '<%=allRole%>';
LoadPage();
htm_title = '<%=htm_title%>';
</script>