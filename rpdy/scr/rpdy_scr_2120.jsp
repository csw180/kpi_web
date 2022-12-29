<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - 일일 RM저비용성예금 실적
'프로그램 ID  : rpdy_scr_2120.jsp
'프로그램 명  : 일일 RM저비용성예금 실적
'프로그램개요 : 일일 RM저비용성예금 실적
'작   성   자 : 조형석
'작   성   일 : 2014.08.22
====================================================================
'수정자/수정일: 유용욱/2019.03.20
'수정사유     : 중저원가 -> 저비용
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "일일성과보고서";
    String      leftmenu_name    = "RM"; 
    String      htm_title        = "일일 RM저비용성예수금 실적"; 
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
<script language="javascript" src="/kpi/rpdy/scr/rpdy_scr_2120.js"></script>
<script language="javascript">

function mySheet_OnClick(Row,Col,Value){
	
}

function hiddenGrid_OnSearchEnd(Code, Msg){
	showUnitText("원");
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
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2120.do?hidden_key=9&baseday="+baseday+"&sergb=98");
    } else {
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2120.do?hidden_key=9&baseday="+baseday+"&sergb=99");
    }
}

function mySheet_OnSearchEnd(Code, Msg){
	showUnitText("원");
	
	mySheet.SetSumValue(0,"합 계");
	mySheet.SetCellAlign(mySheet.HeaderRows(),0,"Center");
	//합계행 병합
	mySheet.SetMergeCell(mySheet.HeaderRows(), 0, 1,3);

	showMsg(Code, Msg);
	
	/*if (document.frm.baseday.value >= '20200101') {
		mySheet.SetCellValue(mySheet.HeaderRows(),23,(mySheet.GetCellValue(mySheet.HeaderRows(),21) / mySheet.GetCellValue(mySheet.HeaderRows(), 22) * 100 ).toFixed(1),0);
	} else if (document.frm.baseday.value >= '20190101') {
		mySheet.SetCellValue(mySheet.HeaderRows(),24,(mySheet.GetCellValue(mySheet.HeaderRows(),22) / mySheet.GetCellValue(mySheet.HeaderRows(), 23) * 100 ).toFixed(1),0);
	} else if (document.frm.baseday.value >= '20170701') {
		mySheet.SetCellValue(mySheet.HeaderRows(),20,(mySheet.GetCellValue(mySheet.HeaderRows(),18) / mySheet.GetCellValue(mySheet.HeaderRows(), 19) * 100 ).toFixed(1),0);
	} else if (document.frm.baseday.value >= '20160101') {
		mySheet.SetCellValue(mySheet.HeaderRows(),19,(mySheet.GetCellValue(mySheet.HeaderRows(),17) / mySheet.GetCellValue(mySheet.HeaderRows(), 18) * 100 ).toFixed(1),0);
	} else {
		mySheet.SetCellValue(mySheet.HeaderRows(),18,(mySheet.GetCellValue(mySheet.HeaderRows(),16) / mySheet.GetCellValue(mySheet.HeaderRows(), 17) * 100 ).toFixed(1),0);
	}*/
	var num = mySheet.GetCellValue(mySheet.HeaderRows(),mySheet.LastCol()-2) / mySheet.GetCellValue(mySheet.HeaderRows(), mySheet.LastCol()-1) * 100
	mySheet.SetCellValue(mySheet.HeaderRows(),mySheet.LastCol(), num.toFixed(1),0); 
	if (!isFinite(num)) mySheet.SetCellValue(mySheet.HeaderRows(),mySheet.LastCol(), 0); //infinity나올 때 0으로 대체

}    

function mySheet_OnSelectMenu(sAction){
 
	doAction(sAction);
}

function mySheet_OnDownFinish(downloadType, result) {
	if(result) {
	    
	    var baseday     = document.frm.baseday.value;
	    var sergb       = document.frm.sergb.value;
	    var fundgb      = document.frm.fundgb.value;
	    
        condition="기준일="+baseday+";조회구분="+sergb+";예금구분="+fundgb;
        
	    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition));
	}
	
}

/* 무한루프 Onsearchend로 변경
function mySheet_OnChangeSum(Row){
	if (document.frm.baseday.value >= '20200101') {
		mySheet.SetCellValue(Row,23,mySheet.GetCellValue(Row,21) / mySheet.GetCellValue(Row, 22) * 100 ,0);
	} else if (document.frm.baseday.value >= '20190101') {
		mySheet.SetCellValue(Row,24,mySheet.GetCellValue(Row,22) / mySheet.GetCellValue(Row, 23) * 100 ,0);
	} else if (document.frm.baseday.value >= '20170701') {
		mySheet.SetCellValue(Row,20,mySheet.GetCellValue(Row,18) / mySheet.GetCellValue(Row, 19) * 100 ,0);
	} else if (document.frm.baseday.value >= '20160101') {
		mySheet.SetCellValue(Row,19,mySheet.GetCellValue(Row,17) / mySheet.GetCellValue(Row, 18) * 100 ,0);
	} else {
		mySheet.SetCellValue(Row,18,mySheet.GetCellValue(Row,16) / mySheet.GetCellValue(Row, 17) * 100 ,0);
	}

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
    	<th class="wd10">조회구분</th>
    	<td>
     		<select name="sergb" onchange="allDelDataGrid(mySheet);showUnitText('원');">
             	<option value="3">반기평잔</option>
                <option value="4">월중평잔</option> 
     		</select>
    	</td>
    	<td align="right" class="end">
      		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
   	  		<span class="btn_Grd" style="cursor:pointer; display:none;" id="print" border="0" onclick="javascript:doPrint();">인쇄</span>
    	</td>
  	</tr>
  	<tr> 
    	<th class="nobor">예금분류</th>
    	<td class="nobor end" colspan="4">
     		<select name="fundgb" class="select" onchange="setFundgb();showUnitText('원');">
          		<option value="00">전체</option>
          		<!-- <option value="12">순수저원가성</option> -->
          		<!-- <option value="11">기업MMDA</option>     -->
     		</select>
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
<div id="hiddGridmonObj"></div>     
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
  isRoleEnable = '<%=allRole%>';
  //if(isRoleEnable == '1') butt2.style.display = "";
  LoadPage();
  htm_title = '<%=htm_title%>';
</script>
