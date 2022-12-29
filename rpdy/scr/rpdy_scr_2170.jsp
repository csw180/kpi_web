<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - 일일 기업예수금 실적
'프로그램 ID  : rpdy_scr_2170.jsp
'프로그램 명  : 일일 기업예수금 실적
'프로그램개요 : 일일 기업예수금 실적
'작   성   자 : 유용욱
'작   성   일 : 2018.01.29
====================================================================
'수정자/수정일: 이해인 / 2020.02.11
'수정사유     : 2020년도 상반기 성과 개발
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "일일성과보고서";
    String      leftmenu_name    = "예수금"; 
    String      htm_title        = "일일 기업예수금 실적"; 
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
<script language="javascript" src="/kpi/rpdy/scr/rpdy_scr_2170.js"></script>

<script language="javascript">
var num;

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
        }else if (Msg.substr(0,1) == "J"){
            if (Msg.substr(1,len) == "7"){
                ComboValue(document.frm.pgcode);
            }
            if (Msg.substr(1,len) == "49"){
                ComboValue(document.frm.metrogb);
            }
        }else if (Msg.substr(0,1) == "C"){
            ComboValue(document.frm.productcode);
        }else{
        	showMsg(Code,Msg);
        }
    }
}

function mySheet_OnDownFinish(downloadType, result) {
	if(result) {
	    
	    var baseday     = document.frm.baseday.value;
	    var pgcode      = document.frm.pgcode.value;
	    var sergb       = document.frm.sergb.value;
	    var metrogb     = document.frm.metrogb.value;
	    
        condition="기준일="+baseday+";PG코드="+pgcode+";조회구분="+sergb+";광역금융본부="+metrogb;
        
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
        	showMsg(Code,Msg);
        }
    }
}

function hiddGridmon_OnSearchEnd(Code, Msg){
	var baseday     = document.frm.baseday.value;
	
	// 기준일자 정보
    if(isRoleEnable == '1') {
     // 전산정보부 및 성과 담당자
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2170.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=98");
    } else {
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2170.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=99");
    }
}

function mySheet_OnSearchEnd(Code, Msg){
	showUnitText("원, %");
	
	mySheet.SetSumValue(0,"합 계");
	mySheet.SetCellAlign(mySheet.HeaderRows(),0,"Center");
	//합계행 병합
	mySheet.SetMergeCell(mySheet.HeaderRows(), 0, 1,3);
	
	var num = mySheet.GetCellValue(mySheet.HeaderRows(),mySheet.LastCol()-2) / mySheet.GetCellValue(mySheet.HeaderRows(), mySheet.LastCol()-1) * 100
	mySheet.SetCellValue(mySheet.HeaderRows(),mySheet.LastCol(), num.toFixed(1),0); 
	
	if (!isFinite(mySheet.GetCellValue(mySheet.HeaderRows(), mySheet.LastCol()))) mySheet.SetCellValue(mySheet.HeaderRows(),mySheet.LastCol(), 0); //infinity나올 때 0으로 대체
	
	showMsg(Code, Msg);
}    

function mySheet_OnSelectMenu(sAction){

	doAction(sAction);
}

/* 무한루프 Onsearchend로 변경
function mySheet_OnChangeSum(Row){
    
	if (document.frm.baseday.value >= '20210701') { 
        if (document.frm.pgcode.value == '16') { 										// 금융본부
			mySheet.SetCellValue(Row,24,mySheet.GetCellValue(Row,22) / mySheet.GetCellValue(Row, 23) * 100 ,0);
		} else {																		// 일반영업점
			mySheet.SetCellValue(Row,28,mySheet.GetCellValue(Row,26) / mySheet.GetCellValue(Row, 27) * 100 ,0);
		}      
	} else if (document.frm.baseday.value >= '20200101') { //lhi
		 if (document.frm.pgcode.value == '16') { 										// 금융본부
			mySheet.SetCellValue(Row,24,mySheet.GetCellValue(Row,22) / mySheet.GetCellValue(Row, 23) * 100 ,0);
		} else {																		// 일반영업점
			mySheet.SetCellValue(Row,29,mySheet.GetCellValue(Row,27) / mySheet.GetCellValue(Row, 28) * 100 ,0);
		}
	} else if (document.frm.baseday.value >= '20190101') {
		if (document.frm.pgcode.value == '16') {
			mySheet.SetCellValue(Row,22,mySheet.GetCellValue(Row,20) / mySheet.GetCellValue(Row, 21) * 100 ,0);
		} else {
			mySheet.SetCellValue(Row,26,mySheet.GetCellValue(Row,24) / mySheet.GetCellValue(Row, 25) * 100 ,0);
		}
	} else if (document.frm.baseday.value >= '20180701') {
		if (document.frm.pgcode.value == '16') {
			mySheet.SetCellValue(Row,21,mySheet.GetCellValue(Row,19) / mySheet.GetCellValue(Row, 20) * 100 ,0);
		} else {
			mySheet.SetCellValue(Row,26,mySheet.GetCellValue(Row,24) / mySheet.GetCellValue(Row, 25) * 100 ,0);
		}
	} else {
			mySheet.SetCellValue(Row,21,mySheet.GetCellValue(Row,19) / mySheet.GetCellValue(Row, 20) * 100 ,0);
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
     		<select name="baseday" class="select" onchange="selectmonth();"></select>
    	</td>
    	<th class="wd10">Peer Group</th>
    	<td colspan="3">
    		<select name="pgcode" id="pgcode" onchange="selectpgcode();">
    			<option value="0">전체</option>
    		</select>
    	</td>
    	<td align="right" class="end">
      		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
    	</td>
  	</tr>
  	<tr> 
    	<th class="nobor">조회구분</th>
    	<td class="nobor">
     		<select name="sergb" onchange="allDelDataGrid(mySheet);showUnitText('원, %');">
                          <option value="1">잔액</option>
                          <!-- <option value="2">기중평잔</option>  -->
                          <option value="3">반기평잔</option> 
                          <!-- <option value="4">월중평잔</option>  -->
     		</select>
    	</td>
    	<th class="nobor">광역금융본부</th>
    	<td colspan="4" class="nobor end">
	    	<select name="metrogb" onchange="allDelDataGrid(mySheet);showUnitText('원, %');">
	     		<option value="0">전체</option>
	     	</select>
     	</td>
    	<!-- <td width="90"  class="table12">세부내역조회</td>
    	<td colspan="4"> <input type="checkbox" name="subChk" onclick="javascript:selectsubchk();"> </td> -->
  	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
    <tr>
        <td style="PADDING-TOP:5px; PADDING-LEFT:8px; FONT-SIZE:12px; FONT-WEIGHT:bold; COLOR:#800000;" > ※ 일일성과보고서는 <u>평가 조정사항</u>이 모두 반영되어 있지 않으므로 실제 평가실적과 다를 수 있습니다. </td>
    </tr>
<!--    <tr>
        <td>
            <marquee scrollamount='3' direction='left' width='700'> 월중평잔은 반기마지막 달에 조회 가능합니다. </marquee>
        </td>
    </tr> -->
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
