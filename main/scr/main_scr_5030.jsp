<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 연구위원 인력관리
'프로그램 ID  : main_scr_5030.jsp
'프로그램 명  : 연구위원 기타수익등록 관리
'프로그램개요 : 연구위원 기타수익등록 관리
'작   성   자 : 조형석
'작   성   일 : 2013.11.18
====================================================================
'수정자/수정일 :
'수정사유      :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "운영관리";
    String      leftmenu_name    = "연구위원 인력관리"; 
    String      htm_title        = "연구위원 기타수익등록 관리"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
    DbResultSet rs               = null;
    DBProcCall     cp            = new DBProcCall();

    try
    {
    } catch(Exception e){
    }
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/main/scr/main_scr_5030.js"></script>
<script language="javascript">
function mySheet_OnSearchEnd(Code, Msg) {    
	isEnableSave = true;
	showUnitText("원");
    showMsg(Code, Msg);
    mySheet.CheckAll(1, 0);
}

function hiddenGrid_OnSearchEnd(Code, Msg) {
    len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
        	
            ComboValue(document.frm.basemonth);
            document.frm.basemonth.selectedIndex=0;
        } else {
            alert(Msg);
        }
    }
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
    mySheet.DoSearch("main.scr.main_scr_5031.do?hidden_key=9&basemonth=" + basemonth);
}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<tr> 
	    <th>기준년월</th>
	    <td><select name="basemonth" class="select"></select></td>
	    <td class="al_R end">
	    	<span class="btn_Grd" border="0" onclick="javascript:doAction('조회');" style="cursor:pointer">조회</span>
       		<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀올리기');"   style="cursor:pointer">업로드</span>
       		<span class="btn_Grd" border="0" onclick="javascript:doAction('저장');"         style="cursor:pointer">등록</span>
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