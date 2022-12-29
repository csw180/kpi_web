<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 데이터 입력
'프로그램 ID  : main_scr_1360.jsp
'프로그램 명  : 수산해양업종대출관리
'프로그램개요 : 수산해양업종대출관리
'작   성   자 : 하진영
'작   성   일 : 2018.01.29
====================================================================
'수정자/수정일/수정사유
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "운영관리";
    String      leftmenu_name    = "데이터입력"; 
    String      htm_title        = "수산해양업종대출관리"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
    int         manager          = 0;   // 사용자 권한 확인

    // 종수와 전산정보부 권한 수보
    String role[] = kpi_rpt_account.getRole(); //권한

    for (int i = 0; i < role.length; i++) {
        if (role[i].trim().equals("400") || role[i].trim().equals("450")) {
           manager = 1 ;
           break;
        }
    }
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/main/scr/main_scr_1360.js"></script>

<script language="javascript">

function hiddenGrid_OnSearchEnd(Code, Msg) {
    len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.basemonth);
            document.frm.basemonth.selectedIndex=0;
        }else if (Msg.substr(0,1) == "C"){
            ComboValue(document.frm.sjgubun);  
        }else{
             v_inChk=hiddenGrid.GetCellValue(1, 0);
            button_contril();
            
        	if (v_chk == "1") InputButtControl(1);
        	if (v_chk == "2") InputButtControl(3);
        	if (v_chk == "3") InputButtControl(1);
        }
    }
    
    initGrid(); // 화면 초기화
}
	
function mySheet_OnSearchEnd(Code, Msg) {
	showUnitText("원");
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
    sjgubun    = document.frm.sjgubun.value;
    
    mySheet.DoSearch("main.scr.main_scr_1361.do?hidden_key=9&basemonth=" + basemonth + "&sjgubun=" + sjgubun);
}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>        
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<tr> 
	    <th>기준년월</th>
	    <td><select name="basemonth" class="select"></select></td>
	    <th>입력상태</th>
	    <td><input type="text" size="12" readonly name="inchkname"  class="input_c"></td>
	    <td class="al_R end">
	    	<span class="btn_Grd" border="0" onclick="javascript:doAction('조회');" style="cursor:pointer">조회</span>
      		<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀올리기');" style="cursor:pointer" id="btn_upload" name="btn_upload">엑셀</span>
      		<span class="btn_Grd" border="0" onclick="javascript:doAction('저장');" style="cursor:pointer" id="btn_entry" name="btn_entry">저장</span>
      		<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀내려받기');" style="cursor:pointer">엑셀</span>
      		<span class="btn_Grd" border="0" onclick="javascript:selectcommit(2);" id="btn_list1" name="btn_list1" style="cursor:pointer">확정</span>
      		<span class="btn_Grd" border="0" onclick="javascript:selectcommit(3);" id="btn_list2" name="btn_list2" style="cursor:pointer">확정취소</span>
	    </td>
  	</tr>
  	<tr>
	    <th class="nobor">실적구분</th>
		<td class="nobor">
			<select name="sjgubun" class="select" onchange="initGrid()">
	             <option value="99">선택</option>
	             <option value="1">소매대출</option>
	             <option value="2">기업대출</option>
            </select></td>
	     <td colspan="5" class="nobor end"></td>
  	</tr>
</table>
<table width="50%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
  	<tr>
	    <td>
	    	<div id="sheetObj"></div>
	    </td>
  	</tr>
</table>
<div id="hiddenGridObj"></div>
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
var v_manager    = <%=manager%>;  // 성과 권한 체크
var v_inChk     = 0;              // 확정여부
LoadPage();
selectcommit(1);
htm_title = '<%=htm_title%>';
</script>