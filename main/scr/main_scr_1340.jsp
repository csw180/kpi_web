<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 데이터 입력
'프로그램 ID  : main_scr_1340.jsp
'프로그램 명  : 본부등록 실적 관리(SH자금관리)
'프로그램개요 : 본부등록 실적 관리(SH자금관리)
'작   성   자 : 조형석
'작   성   일 : 2015.07.28
====================================================================
'수정자/수정일 :
'수정사유      :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "운영관리";
    String      leftmenu_name    = "데이터입력"; 
    String      htm_title        = "카드유효회원실적 등록 "; 
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
<script language="javascript" src="/kpi/main/scr/main_scr_1340.js"></script>

<!-- Grid(mySheet) 각 Event들에 대한 Event Handler 등록 -->
<script language="javascript">

function mySheet_OnSearchEnd(Code, Msg) {
    showMsg(Code, Msg);
    
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
	
	baseday    = document.frm.baseday.value;
    kpicode    = document.frm.kpicode.value;
    
    mySheet.DoSearch("main.scr.main_scr_1341.do?hidden_key=9&baseday=" + baseday + "&kpicode=" + kpicode);
}
</script>

<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>        
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<tr> 
	    <th>기준일</th>
	    <td><input type="text" size="8" name="baseday"  class="input_c"  onKeyUp="onlyNumberKeyUp(this)"></td>
	    <th>실적선택</th>
	    <td><select name="kpicode" class="select">
	                          <option value="152">신규유효회원</option>
	                          <option value="151">순증유효회원</option>
	                        </select>
	    </td>
	    <td class="al_R end">
	    	<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
     	 	<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀올리기');" id="btn_upload" name="btn_upload">업로드</span>
      		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('저장');" id="btn_entry" name="btn_entry">등록</span> 
      		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
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
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
var v_manager    = <%=manager%>;  // 성과 권한 체크
LoadPage();
htm_title = '<%=htm_title%>';
</script>