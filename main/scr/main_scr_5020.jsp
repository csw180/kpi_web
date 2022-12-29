<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 연구위원 인력관리
'프로그램 ID  : main_scr_5020.jsp
'프로그램 명  : 연구위원 권유계좌관리
'프로그램개요 : 연구위원 권유계좌관리
'작   성   자 : 조형석
'작   성   일 : 2013.11.18
====================================================================
'수정자/수정일 :
'수정사유      :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name    = "운영관리";
    String      leftmenu_name   = "연구위원 인력관리"; 
    String      htm_title       = "연구위원 권유계좌관리"; 
    String      actionname      = "";
    String      haengwon_no     = "";
    String      strErrMsg       = "";
    String      status          = "0";
    DbResultSet rs              = null;
    DBProcCall     cp           = new DBProcCall();

    SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);

%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/main/scr/main_scr_5020.js"></script>
<Script language="javascript">
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

function mySheet_OnSearchEnd(Code, Msg) {
	isEnableSave = true;
    showMsg(Code, Msg);
    
 	// FindText(Col, SearchText, [StartRow], [FullMatch])
    var fRow = mySheet.FindText(1, document.frm.emnm.value,0);
    if (fRow > 0 ) mySheet.SelectCell(fRow, 1);
    document.frm.emnm.value  = "";
    document.frm.jumcode.value = "";
    document.frm.accunt.value = "";
    document.frm.accuntcode.value = "";
    document.frm.acmgb.value = "";
    enableElements();
}

function mySheet_OnSelectMenu(sAction) {
    doAction(sAction);
}

function mySheet_OnSaveEnd(Code, Msg) { 
	showMsg(Code, Msg);
    doAction('조회');
}

function mySheet_OnClick(Row,Col,Value) {
	
	if(mySheet.HeaderRows() * 1 >= Row * 1 + 1) return;
	
    //연구위원 직원번호
    document.frm.emnm.value       = mySheet.GetCellValue(Row, 1);
    //취급점번호
    document.frm.jumcode.value    = mySheet.GetCellValue(Row, 3);
    //계좌번호
    document.frm.accunt.value     = mySheet.GetCellValue(Row, 5);
    //계정과목코드
    document.frm.accuntcode.value = mySheet.GetCellValue(Row, 6);
    //계좌관리구분
    document.frm.acmgb.value      = mySheet.GetCellValue(Row, 7);

    InputButtControl(3);
    v_selrow = Row;
}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>     
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<tr> 
	    <th>기준년월</td>
	    <td><select name="basemonth" class="select" onchange="javascript:InputButtControl(1);"></select></td>
	    <td class="al_R end">
       		<span class="btn_Grd" border="0" onclick="javascript:doAction('조회');" style="cursor:pointer">조회</span>
       		<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀내려받기');" style="cursor:pointer">엑셀</span>
       		<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀올리기');"   style="cursor:pointer">업로드</span>
       		<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀저장');"     style="cursor:pointer">저장</span>
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

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
  	<tr>
    	<td>
		    <div id="butt1" style="position:relative; display:;">
		      	<table width="100%" border="0" cellspacing="0" cellpadding="0">
			        <tr> 
			          	<td class="desc3"> 건별등록시 초기화를 클릭해주세요 </td>
			          	<td class="al_R end">
			          		<span class="btn_Grd" border="0" onclick="javascript:doAction('초기화');" style="cursor:pointer">초기화</span>
			          		<span class="btn_Grd"  border="0" onclick="javascript:doAction('등록');" style="cursor:pointer">등록</span>
			          		<span class="btn_Grd" border="0">변경</span>
			          		<span class="btn_Grd" border="0">삭제</span>
			          	</td>
			    	</tr>
		      	</table>
			</div>
		    <div id="butt2" style="position:relative; display:none;">
		      	<table width="100%" border="0" cellspacing="0" cellpadding="0">
			        <tr> 
			          	<td class="desc3"> 건별등록시 초기화를 클릭해주세요 </td>
			          	<td class="al_R end">
			          		<span class="btn_Grd" border="0" onclick="javascript:doAction('초기화');" style="cursor:pointer">초기화</span>
			          		<span class="btn_Grd"  border="0">등록</span>
			          		<span class="btn_Grd" border="0" onclick="javascript:doAction('변경');" style="cursor:pointer">변경</span>
			          		<span class="btn_Grd" border="0" onclick="javascript:doAction('삭제');" style="cursor:pointer">삭제</span>
			          	</td>
			     	</tr>
		      	</table>
		    </div>
		    <div id="butt3" style="position:relative; display:none;">
		      	<table width="100%" border="0" cellspacing="0" cellpadding="0">
			        <tr> 
			          	<td class="desc3"> 건별등록시 초기화를 클릭해주세요 </td>
			          	<td class="al_R end">
			          		<span class="btn_Grd" border="0">초기화</span>
			          		<span class="btn_Grd"  border="0">등록</span>
			          		<span class="btn_Grd" border="0">변경</span>
			          		<span class="btn_Grd" border="0">삭제</span>
			          	</td>
			     	</tr>
		      	</table>
			</div>
    	</td>
  	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR mgT5">
  	<tr>
	    <th>직원번호</th>
	    <td>
	    	<input type="text" class="input_l" name="emnm" size="10">
	    </td>  
	    <th>취급점번호</th>
	    <td >
	        <input type="text" class="input_l" name="jumcode" size="4" >
	    </td>
	    <th>계좌번호</th>
	    <td class="end">
	        <input type="text" name="accunt" class="input_l" size="20">
	    </td>
  	</tr>
  	<tr>
	    <th class="nobor">계정과목코드</th>
	    <td class="nobor">
	    	<input type="text" name="accuntcode" class="input_l" size="8">
	    </td>  
    	<th class="nobor">계좌관리구분</th>
    	<td class="nobor end" colspan="3">
	        <select name="acmgb" class="select">
	        	<option value="D">제외[D]</option>
	            <option value="I">인정[I]</option>
	        </select>
    	</td>  
  	</tr>
</table>
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
var v_selrow    = -1;             // 선택한 ROW 
var v_inChk     = 0;              // 확정여부
var fchk        = false;          // 엑셀 업로드시 체크 결과
LoadPage();
InputButtControl(1);
htm_title = '<%=htm_title%>';
</script>