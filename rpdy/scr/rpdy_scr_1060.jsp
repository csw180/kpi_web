<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 일일성과보고서 - 고객평가
'프로그램 ID  : rpdy_scr_1060.jsp
'프로그램 명  : 디지털판매고객
'프로그램개요 : 디지털판매고객 
'작   성   자 : 유용욱
'작   성   일 : 2020.08.27
====================================================================
'수정자/수정일:
'수정사유     :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "일일성과보고서";
    String      leftmenu_name    = "디지털판매신규고객"; 
    String      htm_title        = "일일 디지털판매신규고객 실적"; 
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
<script language="javascript" src="/kpi/rpdy/scr/rpdy_scr_1060.js"></script>
<Script language="javascript">

function hiddenGrid_OnSearchEnd(Code, Msg){
	showUnitText("건, %");
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
	showUnitText("건, %");
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
	baseday=document.frm.baseday.value;
	// 기준일자 정보
    if(isRoleEnable == '1') {
    	 // 전산정보부 및 성과 담당자
         hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_1060.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=98");
    } else {
         hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_1060.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=99");
    }
}

function mySheet_OnSearchEnd(Code, Msg){
	showUnitText("건, %");
	
	mySheet.SetSumValue(0,"합 계");
	mySheet.SetCellAlign(mySheet.HeaderRows(),0,"Center");
	//합계행 병합
	mySheet.SetMergeCell (mySheet.HeaderRows(), 0, 1,3);

	showMsg(Code, Msg);
	
	if (document.frm.baseday.value >= '20200701') {
    	mySheet.SetCellValue(mySheet.HeaderRows(), 5,(mySheet.GetCellValue(mySheet.HeaderRows(), 3) / mySheet.GetCellValue(mySheet.HeaderRows(), 4) * 100 ).toFixed(1),0);
    }
}    

function mySheet_OnSelectMenu(sAction){
 
	doAction(sAction);
}

function mySheet_OnDownFinish(downloadType, result) {
	if(result) {
	    
	    var baseday     = document.frm.baseday.value;
	    var pgcode      = document.frm.pgcode.value;
	    var metrogb     = document.frm.metrogb.value;
	    
        condition="기준일="+baseday+";PG코드="+pgcode+";광역금융본부="+metrogb;
        
	    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition));
	}
	
}

/* 무한루프 Onsearchend로 변경
function mySheet_OnChangeSum(Row){
    if (document.frm.baseday.value >= '20200701') {
    	mySheet.SetCellValue(Row, 5,mySheet.GetCellValue(Row, 3) / mySheet.GetCellValue(Row, 4) * 100 ,0);
    	    }
}*/
</script> 
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <tr> 
    <th>기준일</th>
    <td>
     <select name="baseday" class="select" onchange="selectmonth()"></select>
    </td>
    <th class="wd10">Peer Group</th>
    <td><select name="pgcode" onchange="allDelDataGrid(mySheet);showUnitText('건, %');">
                                       <option value="0">전체</option>
                                    </select>
    </td>
    <th class="wd10">광역금융본부</th>
    <td>
     <select name="metrogb" onchange="allDelDataGrid(mySheet);showUnitText('건, %');"><option value="0">전체</option></select></td>
    <td class="al_R end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
      <span class="btn_Grd" style="cursor:pointer; display:none;" id="print" border="0" onclick="javascript:doPrint();">인쇄</span> 
    </td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
    <tr>
        <td class="desc2"> ※ 일일성과보고서는 <u>평가 조정사항</u>이 모두 반영되어 있지 않으므로 실제 평가실적과 다를 수 있습니다. </td>
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