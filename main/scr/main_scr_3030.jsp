<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 코드관리
'프로그램 ID  : main_scr_3030.jsp
'프로그램 명  : 영업점별 배점 Upload
'프로그램개요 : 영업점별 배점 Upload
'작   성   자 : 하진영
'작   성   일 : 2011.01.
====================================================================
'수정자/수정일 :
'수정사유      :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "운영관리";
    String      leftmenu_name    = "코드관리"; 
    String      htm_title        = "영업점별 배점 등록"; 
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
<script language="javascript" src="/kpi/main/scr/main_scr_3030.js"></script>
<script language="javascript">

function hiddenGrid_OnSearchEnd(Code, Msg) {
    len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.basemonth);
            document.frm.basemonth.selectedIndex=0;
        }else{
            alert(ErrMsg);
        }
    }
}

function mySheet_OnSearchEnd(Code, Msg) {    
	showUnitText("점수");
    showMsg(Code, Msg);
    isEnableSave = true;
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
	mySheet.DoSearch("main.scr.main_scr_3031.do?hidden_key=9&basemonth=" + basemonth);
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
	    	<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀올리기');" style="cursor:pointer">업로드</span>
	    	<span class="btn_Grd" border="0" onclick="javascript:doAction('저장');" style="cursor:pointer">저장</span>
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