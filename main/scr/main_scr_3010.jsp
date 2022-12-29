<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 코드관리
'프로그램 ID  : main_scr_3010.jsp
'프로그램 명  : 영업점별 목표 Upload
'프로그램개요 : 영업점별 목표 Upload
'작   성   자 : 변휘원
'작   성   일 : 2006.04.12
====================================================================
'수정자/수정일   : 수정사유 
'하진영/20110630 : NEXTRO대응
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "운영관리";
    String      leftmenu_name    = "코드관리"; 
    String      htm_title        = "영업점별 목표 등록"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/main/scr/main_scr_3010.js"></script>

<!-- Grid(mySheet) 각 Event들에 대한 Event Handler 등록 -->
<script language="javascript">

function hiddenGrid_OnSearchEnd(Code, Msg) {
    len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.basemonth);
            document.frm.basemonth.selectedIndex=0;
        }else{
            alert(Msg);
        }
    }
    
    initGrid(); // 그리드 초기화
}

function mySheet_OnSearchEnd(Code, Msg) {    
	showUnitText("원, 명");
	isEnableSave = true;
	showMsg(Code, Msg);	
}

function mySheet_OnSelectMenu(sAction) {
    doAction(sAction);
}

function mySheet_OnLoadExcel() {
	/*
    var sRow     = mySheet.FindStatusRow("R");
    var rowArray = sRow.split(";");
    for(i=0; i<rowArray.length-1; i++)
    {
       mySheet.RowDelete(1, false);
    }
    */
}

function mySheet_OnSaveEnd(Code, Msg) {    
    showMsg(Code, Msg);     
    doAction("조회");
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