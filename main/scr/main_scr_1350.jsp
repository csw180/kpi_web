<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 데이터입력
'프로그램 ID  : main_scr_1350.jsp
'프로그램 명  : 여수신지표 기타조정금액 등록
'프로그램개요 : 여수신지표 기타조정금액 등록
'작   성   자 : 조형석
'작   성   일 : 2016.03.
====================================================================
'수정자/수정일 :
'수정사유      :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "운영관리";
    String      leftmenu_name    = "계좌관리"; 
    String      htm_title        = "여수신지표 기타조정액 등록"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/main/scr/main_scr_1350.js"></script>

<!-- Grid(mySheet) 각 Event들에 대한 Event Handler 등록 -->
<script language="javascript">

function hiddenGrid_OnSearchEnd(Code, Msg) {
    len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.basemonth);
            document.frm.basemonth.selectedIndex=0;
        }else{
            v_inChk=hiddenGrid.GetCellValue(1, 0);
            button_contril();
        }
    }
}
	
function mySheet_OnSearchEnd(Code, Msg) {
	showUnitText("원");
	showMsg(Code, Msg);
	isEnableSave = true;
}

function mySheet_OnSelectMenu(sAction) {
    doAction(sAction);
}

function mySheet_OnLoadExcel() {
	/*
    var sRow     = mySheet.FindStatusRow("R");
    var rowArray = sRow.split(";");
    for(i=0; i<rowArray.length; i++)
    {
       	mySheet.RowDelete(1, false);
    }
    */
}

function mySheet_OnSaveEnd(Code, Msg) { 
	showMsg(Code, Msg);
	
	basemonth  = document.frm.basemonth.value;
	
	mySheet.DoSearch("main.scr.main_scr_1351.do?hidden_key=9&basemonth=" + basemonth);
}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>        
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<tr> 
	    <th class="wd10">기준년월</th>
	    <td><select name="basemonth" class="select"></select></td>
	    <td class="al_R end">
	    	<span class="btn_Grd" border="0" onclick="javascript:doAction('조회');" style="cursor:pointer">조회</span>
	    	<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀올리기');" style="cursor:pointer" name="btn_upload">업로드</span>
	    	<span class="btn_Grd" border="0" onclick="javascript:doAction('저장');" style="cursor:pointer" name="btn_entry">저장</span>
	    	<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀내려받기');" style="cursor:pointer">엑셀</span>
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