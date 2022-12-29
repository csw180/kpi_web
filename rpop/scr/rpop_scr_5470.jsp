<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 기타보고서 - 고객수익률 실적
'프로그램 ID  : rpop_scr_5470.jsp
'프로그램 명  : 고객수익률 실적
'프로그램개요 : 고객수익률 실적
'작   성   자 : 양인찬
'작   성   일 : 2022.03.16
====================================================================
'수정자/수정일 :수정사유'
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "영업점보고서";
    String      leftmenu_name    = "기타 보고서"; 
    String      htm_title        = "고객수익률 실적";
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_5470.js"></script>

<script language="javascript">
function mySheet_OnClick(Row,Col,Value) {
}

function mySheet_OnDblClick(Row,Value) {
  	if(Row < 3) return;
  	f = document.frm;
  	url="kpi.rpop.rpop_1020.screen";  
  	var basemonth	= f.basemonth.value; 
  	var jumcode   	= mySheet.GetCellValue(Row, 2);
  	var jumname  	= mySheet.GetCellValue(Row, 4);
  	url = url + "?basemonth="+basemonth+"&Security=2&jumcode="+jumcode+"&jumname="+jumname+"&IS_POPUP=Y&SCREEN_URL=kpi.rpop.rpop_1020.screen";
  	win_open2(encodeURI(url),820,580);    
}

function mySheet_OnMouseMove(Button, Shift, X, Y) {
  	//실명번호 풍선도움말 설정      
  	mySheet.SetToolTipText(mySheet.MouseRow(),mySheet.MouseCol(),displayMessageTooltip("성과집계표"));
}

function hiddenGrid_OnSearchEnd(Code, Msg) {
    len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.basemonth);
            document.frm.basemonth.selectedIndex=0;
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

function mySheet_OnSearchEnd(Code, Msg) {
	if (Msg != "") showMsg(Code, Msg);
	showUnitText("원, %");
}

function mySheet_OnSelectMenu(sAction) {
    doAction(sAction);
}

function mySheet_OnDownFinish(downloadType, result) {
	if(result) {
		var basemonth = document.frm.basemonth.value;
	    
		condition = "기준년월="+basemonth;
        hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2")); // gubun 1:rpdy(일일성과) 2:rpop(영업점성과)
	}
}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <tr> 
    <th class="wd10">기준년월</th>
    <td>
     <select name="basemonth" class="select" onchange="selectmonth()"></select>
    </td>
    <th class="wd10">Peer Group</th>
    <td colspan="3"><select name="pgcode" onchange="allDelDataGrid(document.frm.mySheet)"><option value="0">전체</option></select></td>
    <td class="al_R end">
	    <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
	   	<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
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

<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
LoadPage();
htm_title = '<%=htm_title%>';
</script>