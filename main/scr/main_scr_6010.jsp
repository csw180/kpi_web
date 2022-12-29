<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 본부입력
'프로그램 ID  : main_scr_6010.jsp
'프로그램 명  : SPC수탁업무수수료 관리
'프로그램개요 : SPC수탁업무수수료 관리
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
    String      htm_title        = "SPC수탁업무수수료 관리"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
    DbResultSet rs              = null;
    DBProcCall     cp           = new DBProcCall();

    int         manager         = 0;   // 사용자 권한 확인

    SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);
    
    // 성과와 전산정보부 권한 수보
    String role[] = account.getRole(); //권한

    for (int i = 0; i < role.length; i++) {
        if (role[i].trim().equals("400") || role[i].trim().equals("450")) {
           manager = 1 ;
           break;
        }
    }

%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/main/scr/main_scr_6010.js"></script>
<script language="javascript">
function mySheet_OnSearchEnd(Code, Msg) {    
    showMsg(Code, Msg);
    
    isEnableSave = true;
    mySheet.CheckAll(1, 0);
}

function hiddenGrid_OnSearchEnd(Code, Msg) {
    len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.basemonth);
            document.frm.basemonth.selectedIndex=0;
            
            doAction('조회');
        }else{
            v_inChk = hiddenGrid.GetCellValue(1, 0);
            button_contril();
            
        	if (v_chk == "1") InputButtControl(1);
        	if (v_chk == "2") InputButtControl(3);
        	if (v_chk == "3") InputButtControl(1);
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
    mySheet.DoSearch("main.scr.main_scr_6011.do?hidden_key=9&basemonth=" + basemonth); 
}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>        
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<tr> 
	    <th>기준년월</td>
	    <td><select name="basemonth" class="select" onchange="javascript:selectcommit(1);" ></select></td>
	    <th >입력상태</td>
	    <td ><input type="text" size="14" readonly name="inchkname"  class="input_c"></td>
	    <td align="right" class="end">
	    	<span class="btn_Grd" border="0" onclick="javascript:doAction('조회');"         style="cursor:pointer">조회</span>
      		<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀올리기');" id="btn_upload" name="btn_upload" style="cursor:pointer">업로드</span>
      		<span class="btn_Grd" border="0" onclick="javascript:doAction('저장');"   id="btn_entry" name="btn_entry"  style="cursor:pointer">등록</span>
      		<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀내려받기');" style="cursor:pointer">엑셀</span>
      		<span class="btn_Grd" border="0" onclick="javascript:selectcommit(2);"    id="btn_list1" name="btn_list1" style="cursor:pointer">확정</span>
      		<span class="btn_Grd" border="0" onclick="javascript:selectcommit(3);" id="btn_list2" name="btn_list2" style="cursor:pointer">확정취소</span>
      		
	   		<!-- <img src="/kpi/img/sky/butt_inquiry.gif" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">
	      	<img src="/kpi/img/sky/butt_upload.jpg"  style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀올리기');" name="btn_upload">
	      	<img src="/kpi/img/sky/butt_entry.gif"   style="cursor:pointer" border="0" onclick="javascript:doAction('저장');"       name="btn_entry">
	      	<img src="/kpi/img/sky/butt_excel.gif"   style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">
	      	<img src="/kpi/img/sky/butt_decision.gif" border="0" onclick="javascript:selectcommit(2);"         name="btn_list1" style="cursor:pointer">
	      	<img src="/kpi/img/sky/butt_decision_cancel.gif" border="0" onclick="javascript:selectcommit(3);"  name="btn_list2" style="cursor:pointer"> -->
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
<div id="hiddenGridObj1"></div>
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
var v_inChk     = 0;              // 확정여부
var v_manager    = <%=manager%>;  // 성과 권한 체크

LoadPage();
//doAction('조회');
selectcommit(1);
htm_title = '<%=htm_title%>';
</script>