<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 코드관리 Grid
'프로그램 ID  : main_scr_1271.jsp
'프로그램 명  : 기타실적조정계좌 등록 
'프로그램개요 : 기타실적조정계좌 등록 
'작   성   자 : 하진영
'작   성   일 : 2010.05.17
====================================================================
'수정자/수정일: 조형석/20140327 
'수정사유     : 화면 재사용 기타실적조정계좌 등록 
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "운영관리";
    String      leftmenu_name    = "계좌관리"; 
    String      htm_title        = "기타실적조정계좌 등록 "; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/main/scr/main_scr_1270.js"></script>

<script language="javascript">

function hiddenGrid_OnSearchEnd(Code, Msg) {
    len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.basemonth);
            document.frm.basemonth.selectedIndex=0;
        } else {
        	v_inChk = hiddenGrid.GetCellValue(1, 0);
            button_contril();
        }
    }
}
	
function mySheet_OnSearchEnd(Code, Msg) {
    showMsg(Code, Msg);
	
    isEnableSave        = true;
    mySheet.CheckAll(1, 0);
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
    mySheet.DoSearch("main.scr.main_scr_1271.do?hidden_key=9&basemonth=" + basemonth);
} 
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>        
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  	<tr> 
    	<td colspan="5" class="table07"></td>
  	</tr>
  	<tr> 
	    <td width="84" class="table08">기준년월</td>
	    <td class="table09"><select name="basemonth" class="select"></select></td>
	    <td class="table09" align="right" >
	    	<img src="/kpi/img/sky/butt_inquiry.gif" border="0" onclick="javascript:doAction('조회');"         style="cursor:pointer">
	      	<img src="/kpi/img/sky/butt_upload.jpg"  border="0" onclick="javascript:doAction('엑셀올리기');"   style="cursor:pointer" name="btn_upload">
	      	<img src="/kpi/img/sky/butt_entry.gif"   border="0" onclick="javascript:doAction('저장');"         style="cursor:pointer" name="btn_entry">
	      	<img src="/kpi/img/sky/butt_excel.gif"   border="0" onclick="javascript:doAction('엑셀내려받기');" style="cursor:pointer">
	    </td>
  	</tr>
  	<tr> 
    	<td colspan="5" class="table10"></td>
  	</tr>
</table>
<table>
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
doAction('조회');
htm_title = '<%=htm_title%>';
</script>