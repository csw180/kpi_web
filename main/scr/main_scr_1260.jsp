<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 데이터 입력
'프로그램 ID  : main_scr_1260.jsp
'프로그램 명  : 점별연체금액조정 Upload
'프로그램개요 : 점별연체금액조정 Upload
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
    String      leftmenu_name    = "데이터입력"; 
    String      htm_title        = "점별연체금액조정"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";

    int         manager          = 0;   // 사용자 권한 확인

    SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);
    
    // 종수와 전산정보부 권한 수보
    String role[] = account.getRole(); //권한

    for (int i = 0; i < role.length; i++) {
        if (role[i].trim().equals("400") || role[i].trim().equals("450")) {
           manager = 1 ;
           break;
        }
    }
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/main/scr/main_scr_1260.js"></script>

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
            
        	if (v_chk == "1") InputButtControl(1);
        	if (v_chk == "2") InputButtControl(3);
        	if (v_chk == "3") InputButtControl(1);
        }
    }
}
	
function mySheet_OnSearchEnd(Code, Msg) {
    showUnitText("원");
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
    mySheet.DoSearch("main.scr.main_scr_1261.do?hidden_key=9&basemonth=" + basemonth);
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
	    <td align="right" class="end">
	    	<span class="btn_Grd" border="0" onclick="javascript:doAction('조회');"         style="cursor:pointer">조회</span>
      		<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀올리기');"   style="cursor:pointer" id="btn_upload" name="btn_upload">업로드</span>
      		<span class="btn_Grd" border="0" onclick="javascript:doAction('저장');"         style="cursor:pointer" id="btn_entry" name="btn_entry">등록</span>
      		<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀내려받기');" style="cursor:pointer">엑셀</span>
      		<span class="btn_Grd" border="0" onclick="javascript:selectcommit(2);" id="btn_list1" name="btn_list1" style="cursor:pointer">확정</span>
      		<span class="btn_Grd" border="0" onclick="javascript:selectcommit(3);" id="btn_list2" name="btn_list2" style="cursor:pointer">확정취소</span>
      		<!-- 
	    	<img src="/kpi/img/sky/butt_inquiry.gif" border="0" onclick="javascript:doAction('조회');"         style="cursor:pointer">
	      	<img src="/kpi/img/sky/butt_upload.jpg"  border="0" onclick="javascript:doAction('엑셀올리기');"   style="cursor:pointer" name="btn_upload">
	      	<img src="/kpi/img/sky/butt_entry.gif"   border="0" onclick="javascript:doAction('저장');"         style="cursor:pointer" name="btn_entry">
	      	<img src="/kpi/img/sky/butt_excel.gif"   border="0" onclick="javascript:doAction('엑셀내려받기');" style="cursor:pointer">
	      	<img src="/kpi/img/sky/butt_decision.gif"        border="0" onclick="javascript:selectcommit(2);" name="btn_list1" style="cursor:pointer">
	      	<img src="/kpi/img/sky/butt_decision_cancel.gif" border="0" onclick="javascript:selectcommit(3);" name="btn_list2" style="cursor:pointer"> -->
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
var v_manager    = <%=manager%>;  // 성과 권한 체크
var v_inChk     = 0;              // 확정여부
LoadPage(); 
selectcommit(1);
htm_title = '<%=htm_title%>';
</script>