<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 영업점팀장관리화면
'프로그램 ID  : main_scr_5510.jsp
'프로그램 명  : 영업점 팀장 관리
'프로그램개요 : 영업점 팀장 관리
'작   성   자 : 양인찬
'작   성   일 : 2020.02.19
====================================================================
'수정자/수정일 :
'수정사유      :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%
    String      topmenu_name    = "운영관리";
    String      leftmenu_name   = "영업점 팀장 관리";
    String      htm_title       = "영업점 팀장 관리";
    String      actionname      = "";
    String      haengwon_no     = "";
    String      strErrMsg       = "";
    String      status          = "0";
    DbResultSet rs              = null;
    DBProcCall     cp           = new DBProcCall();

    SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/main/scr/main_scr_5510.js"></script>
<!-- Grid(mySheet) 각 Event들에 대한 Event Handler 등록 -->
<Script language="javascript">

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
}

function mySheet_OnSearchEnd(Code, Msg) {
	isEnableSave = true;
    showMsg(Code, Msg);
    
 	// FindText(Col, SearchText, [StartRow], [FullMatch])
    var fRow = mySheet.FindText(1, document.frm.emnm.value,0);
    if (fRow > 0 ) mySheet.SelectCell(fRow, 1);
    document.frm.jumcode.value       = "";
    document.frm.emnm.value          = "";
    document.frm.stdate.value        = "";
    document.frm.enddate.value       = "";
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
	
    //점번호
    document.frm.jumcode.value    = mySheet.GetCellValue(Row, 1);
    
    //직위구분
    //document.frm.posi_gubun.value = mySheet.GetCellValue(Row, 6);
    $("#posi_gubun option:contains('"+ mySheet.GetCellValue(Row, 6)  +"')").attr("selected", "selected");
    
    //팀구분
    document.frm.team_gubun.value = mySheet.GetCellValue(Row, 7);
    //직원번호
    document.frm.emnm.value       = mySheet.GetCellValue(Row, 8);
    //발령일
    document.frm.stdate.value     = mySheet.GetCellValue(Row, 10);
    //종료일
    document.frm.enddate.value    = mySheet.GetCellValue(Row, 11);
    //비고
    document.frm.v_note.value     = mySheet.GetCellValue(Row, 12);

    InputButtControl(3);
    v_selrow = Row;
}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<tr>
	    <th>기준년월</th>
	    <td><select name="basemonth" class="select" onchange="javascript:InputButtControl(1);;"></select></td>
	    <th>직위구분</th>
	    <td>
	    	<select id="posi_gubun" name="posi_gubun" class="select">
                 <option value="1" selected >영업점 팀장</option>
                 <option value="2">업무형 부지점장</option>
            </select>
	    </td>
	    <td class="al_R end">
	    	<span class="btn_Grd" border="0" onclick="javascript:doAction('조회');"  style="cursor:pointer">조회</span>
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
    	<td class="desc3">※ 직위구분 <1:영업점팀장, 2:업무형부지점장> / 팀구분 <1:개인,2:기업(A),3:기업(B)> </td>
  	</tr>
  	<tr>
    	<td class="desc2">※ 업로드 시, 영업점 팀장 및 업무형 부지점장 일괄 업로드 필요 </td>
  	</tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR mgT5">
  
  	<tr>
    	<th>점번호</th>
    	<td>
        	<input type="text" name="jumcode" class="input_l"  size="4" readonly="readonly">
    	</td>
	    <th>직원번호</th>
	    <td>
	        <input type="text" name="emnm" class="input_l"  size="10" readonly="readonly">
	    </td>
	    <th>발령일</th>
	    <td>
			<input type="text" name="stdate" class="input_l" onkeyup="chk_num()" size="8" readonly="readonly">
	    </td>
	    <th>종료일</th>
	    <td class="end">
	        <input type="text" name="enddate" class="input_l" onkeyup="chk_num()" size="8" readonly="readonly">
	    </td>
  	</tr>
  	<tr>
	    <th class="nobor">팀구분</th>
	    <td class="nobor">
	 		<input type="text" name="team_gubun" class="input_l"  size="10" readonly="readonly">
	    </td>
	    <th class="nobor">비고</th>
	    <td class="nobor end" colspan="7">
	        <input type="text" name="v_note" class="input_l"  size="50" readonly="readonly">
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