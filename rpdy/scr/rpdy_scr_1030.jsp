<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 일일성과보고서 - 전자금융
'프로그램 ID  : rpdy_scr_1030.jsp
'프로그램 명  : 전자금융
'프로그램개요 : 전자금융
'작   성   자 : 조형석
'작   성   일 : 2009.07.02
====================================================================
'수정자/수정일/수정사유: 조형석/2011.05.20/Nextro 대응 수정
'수정자/수정일/수정사유: 박아란/2014.03.25/2014년 기준반영
'수정자/수정일/수정사유: 유용욱/2018.03.06/2018년 기준반영
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "일일성과보고서";
    String      leftmenu_name    = "기타"; 
    String      htm_title        = "일일 스마트금융실적"; 
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
<script language="javascript" src="/kpi/rpdy/scr/rpdy_scr_1030.js"></script>
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
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_1030.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=98");
    } else {
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_1030.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=99");
    }
}

function mySheet_OnSearchEnd(Code, Msg){
	showUnitText("건, %");
	
	if  (document.frm.baseday.value >= '20180101') {
        // 2018년에는 계산하는것이 필요없음
    } else if  (document.frm.baseday.value >= '20160101') {
    	mySheet.SetCellValue(mySheet.HeaderRows(),5,(mySheet.GetCellValue(mySheet.HeaderRows(),4) / mySheet.GetCellValue(mySheet.HeaderRows(), 3) * 100).toFixed(1),0);
    	mySheet.SetCellValue(mySheet.HeaderRows(),8,(mySheet.GetCellValue(mySheet.HeaderRows(),7) / mySheet.GetCellValue(mySheet.HeaderRows(), 6) * 100).toFixed(1),0);
    	mySheet.SetCellValue(mySheet.HeaderRows(),11,(mySheet.GetCellValue(mySheet.HeaderRows(),10) / mySheet.GetCellValue(mySheet.HeaderRows(), 9) * 100).toFixed(1),0);
    } else if  (document.frm.baseday.value >= '20150101') {
    	mySheet.SetCellValue(mySheet.HeaderRows(),5,(mySheet.GetCellValue(mySheet.HeaderRows(),4) / mySheet.GetCellValue(mySheet.HeaderRows(), 3) * 100).toFixed(1),0);
    	mySheet.SetCellValue(mySheet.HeaderRows(),8,(mySheet.GetCellValue(mySheet.HeaderRows(),7) / mySheet.GetCellValue(mySheet.HeaderRows(), 6) * 100).toFixed(1),0);
	} else mySheet.SetCellValue(mySheet.HeaderRows(),5,(mySheet.GetCellValue(mySheet.HeaderRows(),4) / mySheet.GetCellValue(mySheet.HeaderRows(), 3) * 100).toFixed(1),0);

	showMsg(Code, Msg);
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

function mySheet_OnSelectMenu(sAction){
 
	doAction(sAction);
}

/* 무한루프 Onsearchend로 변경
function mySheet_OnChangeSum(Row){
    
	if  (document.frm.baseday.value >= '20180101') {
        // 2018년에는 계산하는것이 필요없음
    } else if  (document.frm.baseday.value >= '20160101') {
    	mySheet.SetCellValue(Row,5,mySheet.GetCellValue(Row,4) / mySheet.GetCellValue(Row, 3) * 100,0);
    	mySheet.SetCellValue(Row,8,mySheet.GetCellValue(Row,7) / mySheet.GetCellValue(Row, 6) * 100,0);
    	mySheet.SetCellValue(Row,11,mySheet.GetCellValue(Row,10) / mySheet.GetCellValue(Row, 9) * 100,0);
    } else if  (document.frm.baseday.value >= '20150101') {
    	mySheet.SetCellValue(Row,5,mySheet.GetCellValue(Row,4) / mySheet.GetCellValue(Row, 3) * 100,0);
    	mySheet.SetCellValue(Row,8,mySheet.GetCellValue(Row,7) / mySheet.GetCellValue(Row, 6) * 100,0);
	} else mySheet.SetCellValue(Row,5,mySheet.GetCellValue(Row,4) / mySheet.GetCellValue(Row, 3) * 100,0);

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
    <td>
    	<select name="pgcode" onchange="allDelDataGrid(mySheet);showUnitText('건, %');">
           <option value="0">전체</option>
        </select>
    </td>
    <th class="wd10">광역금융본부</th>
    <td>
	     <select name="metrogb" onchange="allDelDataGrid(mySheet);showUnitText('건, %');">
	     	<option value="0">전체</option>
	     </select>
    </td>
    <td class="al_R end">
      <span class="btn_Grd" border="0" onclick="javascript:doAction('조회');" style="cursor:pointer">조회</span>
	  <span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀내려받기');" style="cursor:pointer">엑셀</span>
	  <span class="btn_Grd" style="cursor:pointer;display:none;" id="print" border="0" onclick="javascript:doPrint();">인쇄</span>
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