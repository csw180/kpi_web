<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 데이타입력
'프로그램 ID  : main_scr_1180.jsp
'프로그램 명  : 후선배치직원실적 관리
'프로그램개요 : 후선배치직원실적을 현업에서 확인후 관리
'작   성   자 : 조형석
'작   성   일 : 2008.02.27
====================================================================
'수정자/수정일   : 수정사유
'하진영/20110623 : NEXTRO 대응
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name    = "운영관리";
    String      leftmenu_name   = "데이터입력"; 
    String      htm_title       = "후선배치직원실적 관리"; 
    String      actionname      = "";
    String      haengwon_no     = "";
    String      strErrMsg       = "";
    String      status          = "0";
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
<script language="javascript" src="/kpi/main/scr/main_scr_1180.js"></script>
<Script language="javascript">

function hiddenGrid_OnSearchEnd(Code, Msg) {
    len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.basemonth);
            document.frm.basemonth.selectedIndex=0;
       }else{
            v_inChk = hiddenGrid.GetCellValue(1, 0);
            button_contril();
            
        	if (v_chk == "1") InputButtControl(1);
        	if (v_chk == "2") InputButtControl(3);
        	if (v_chk == "3") InputButtControl(1);
        }            
    }
}

function mySheet_OnSearchEnd(Code, Msg) {
    showMsg(Code, Msg);
	
    isEnableSave = true;
    mySheet.CheckAll(1, 0);
    
 	// FindText(Col, SearchText, [StartRow], [FullMatch])
    var fRow = mySheet.FindText(0, document.frm.accountno.value,0);
    if (fRow > 0 )
	    mySheet.SelectCell(fRow, 0);
	    document.frm.jumcode.value     = "";
	    document.frm.accountno.value   = "";
	    document.frm.accountcode.value = "";
	    document.frm.accountname.value = "";
	    document.frm.gunsabun.value    = "";
	    document.frm.mjumrate.value    = "";
	    enableElements();
}

function mySheet_OnSelectMenu(sAction) {
    doAction(sAction);
}

function mySheet_OnSaveEnd(Code, Msg) {
    showMsg(Code, Msg);
    
    basemonth  = document.frm.basemonth.value;
    mySheet.DoSearch("main.scr.main_scr_1181.do?hidden_key=9&basemonth=" + basemonth); 
} 

function mySheet_OnClick(Row,Col,Value) {
    if (v_inChk != 1) {
        //점번호
        document.frm.jumcode.value     = mySheet.GetCellValue(Row, 2);
        //계좌번호
        document.frm.accountno.value   = mySheet.GetCellValue(Row, 3);
        //계정과목코드
        document.frm.accountcode.value = mySheet.GetCellValue(Row, 4);
        //권유직원번호
        document.frm.gunsabun.value    = mySheet.GetCellValue(Row, 5);
        //관리점비율
        document.frm.mjumrate.value    = mySheet.GetCellValue(Row, 6);
    }    
    v_selrow = Row;
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
</script>

<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>        
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<tr> 
	    <th>기준년월</th>
	    <td><select name="basemonth" class="select" onchange="javascript:selectcommit(1);">/</select></td>
	    <th>입력상태</th>
	    <td><input type="text" size="14" readonly name="inchkname"  class="input_c"></td>
	    <td align="right" class="end">
	    	<span class="btn_Grd" border="0" onclick="javascript:doAction('조회');"         style="cursor:pointer">조회</span>
      		<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀올리기');" id="btn_upload" name="btn_upload" style="cursor:pointer">업로드</span>
      		<span class="btn_Grd" border="0" onclick="javascript:doAction('저장');"   id="btn_entry" name="btn_entry"  style="cursor:pointer">등록</span>
      		<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀내려받기');" style="cursor:pointer">엑셀</span>
      		<span class="btn_Grd" border="0" onclick="javascript:selectcommit(2);"    id="btn_list1" name="btn_list1" style="cursor:pointer">확정</span>
      		<span class="btn_Grd" border="0" onclick="javascript:selectcommit(3);" id="btn_list2" name="btn_list2" style="cursor:pointer">확정취소</span>
      		
	      	<!-- <img src="/kpi/img/sky/butt_inquiry.gif" border="0" onclick="javascript:doAction('조회');"         style="cursor:pointer">
	      	<img src="/kpi/img/sky/butt_upload.jpg"  border="0" onclick="javascript:doAction('엑셀올리기');"   name="btn_upload" style="cursor:pointer">
	      	차후 개별 입력 방식 추가시에 javascript:doAction('등록'); 전체 삭제 하면됨
	      	<img src="/kpi/img/sky/butt_entry.gif"   border="0" onclick="javascript:doAction('저장');"         name="btn_entry"  style="cursor:pointer">
	      	<img src="/kpi/img/sky/butt_excel.gif"   border="0" onclick="javascript:doAction('엑셀내려받기');" style="cursor:pointer">
	      	<img src="/kpi/img/sky/butt_decision.gif" border="0" onclick="javascript:selectcommit(2);"         name="btn_list1" style="cursor:pointer">
	      	<img src="/kpi/img/sky/butt_decision_cancel.gif" border="0" onclick="javascript:selectcommit(3);"  name="btn_list2" style="cursor:pointer">-->
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
<!-- 차후 개별 입력 방식 추가시에 style="border-collapse:collapse; display:none;" 의 display:none; 삭제 하면됨-->
<table width="794" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse; display:none;">
  	<tr>
    	<td align="center" class="table_l06">
		    <div id="butt1" STYLE="position:relative; display:;">
		      	<table width="100%" border="0" cellspacing="0" cellpadding="0">
			        <tr> 
			          	<td class="blue" width="100%" align="right">
				            <img src="/kpi/img/sky/butt_reset.gif" border="0" onclick="javascript:doAction('초기화');" style="cursor:pointer">
				            <img src="/kpi/img/sky/butt_entry.gif" border="0" onclick="javascript:doAction('등록');" style="cursor:pointer">
				            <img src="/kpi/img/sky/butt_change.gif" border="0">
				            <img src="/kpi/img/sky/butt_delete.gif" border="0">
			          </td>
			     	</tr>
		      	</table>
		    </div>
			<div id="butt2" STYLE="position:relative; display:none;">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
			    	<tr> 
			        	<td class="blue" width="100%" align="right">
				            <img src="/kpi/img/sky/butt_reset.gif" border="0" onclick="javascript:doAction('초기화');" style="cursor:pointer">
				            <img src="/kpi/img/sky/butt_entry.gif" border="0">
				            <img src="/kpi/img/sky/butt_change.gif" border="0" onclick="javascript:doAction('변경');" style="cursor:pointer">
				            <img src="/kpi/img/sky/butt_delete.gif" border="0" onclick="javascript:doAction('삭제');" style="cursor:pointer">
			          	</td>
			    	</tr>
				</table>
			</div>
		    <div id="butt3" STYLE="position:relative; display:none;">
		    	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		        	<tr> 
		          		<td class="blue" width="100%" align="right">
				            <img src="/kpi/img/sky/butt_reset.gif" border="0">
				            <img src="/kpi/img/sky/butt_entry.gif" border="0">
				            <img src="/kpi/img/sky/butt_change.gif" border="0">
				            <img src="/kpi/img/sky/butt_delete.gif" border="0">
		          		</td>
		        	</tr>
		      	</table>
			</div>
    	</td>
  	</tr>
</table>

<!-- 차후 개별 입력 방식 추가시에 style="display:none;" 의 display:none; 삭제 하면됨-->
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="display:none;">
	<tr> 
    	<td colspan="4" class="table07"></td>
  	</tr>
  	<tr> 
	    <td class="table08" width="84">점번호</td>
	    <td class="table09">
	      	<input type="text" class="input_l" onchange="selectjumname(1)" name="jumcode" size="6" onkeyup="chk_num()">
	      	&nbsp;<a href="javascript:popupJumCode(0)"><img src="/kpi/img/sky/butt_search_s.gif" border="0" align="absmiddle"></a>
	      	&nbsp;<input type="text" class="input_l" readonly name="jumname" size="30">
	    </td>
	    <td class="table08" width="84">계좌번호</td>
	    <td class="table09" align="left"><input type="text" name="accountno" class="input_l" size="30" maxlength="50" onkeyup="chk_num()"></td>
  	</tr>
  	<tr><td height="1" colspan="4"></td></tr>
  	<tr>
	    <td class="table08" width="84">계정과목코드</td>
	    <td class="table09">
			<input type="text" class="input_l" name="accountcode" size="8" onkeyup="chk_num()">
	      	&nbsp;<a href="javascript:popupAccountCode()"><img src="/kpi/img/sky/butt_search_s.gif" border="0" align="absmiddle"></a>
	      	&nbsp;<input type="text" class="input_l" readonly name="accountname" size="30"></td>
	    <td class="table08" width="130">권유직원번호</td>
	    <td class="table09" align="left"><input type="text" name="gunsabun" class="input_l" onkeyup="chk_num()" size="10"></td>
  	</tr>
  	<tr><td height="1" colspan="4"></td></tr>
  	<tr>
	    <td class="table08" width="84">관리점비율</td>
	    <td class="table09" align="left" colspan="3"><input type="text" name="mjumrate" class="input_l" size="3" maxlength="3" onkeyup="chk_num()"></td>
  	</tr>
  	<tr> 
    	<td colspan="4" class="table07"></td>
  	</tr>
</table>
	
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
var v_manager    = <%=manager%>;  // 성과 권한 체크
var v_selrow    = -1;             // 선택한 ROW 
var v_inChk     = 0;              // 확정여부

LoadPage();
selectcommit(1);
htm_title = '<%=htm_title%>';
</script>