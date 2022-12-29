<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 본부데이터 입력
'프로그램 ID  : main_scr_4040.jsp
'프로그램 명  : 특수계좌 이익관리 Upload
'프로그램개요 : 특수계좌 이익관리 Upload
'작   성   자 : 장보윤
'작   성   일 : 2012.06.
====================================================================
'수정자/수정일 :
'수정사유      :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "운영관리";
    String      leftmenu_name    = "본부데이터 입력"; 
    String      htm_title        = "특수계좌 이익관리"; 
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
<script language="javascript" src="/kpi/main/scr/main_scr_4040.js"></script>
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
    mySheet.DoSearch("main.scr.main_scr_4041.do?hidden_key=9&basemonth=" + basemonth);
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
       		<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀올리기');">업로드</span>
       		<span class="btn_Grd" border="0" onclick="javascript:doAction('저장');">저장</span>
       		<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
	    </td>
  	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<tr> 
    	<td class="desc4 nobor">▨▨▨▨▨▨▨ 참고 (여신관련기타수수료등 기간안분처리시) ▨▨▨▨▨▨▨</td>
  	</tr>
  	<tr> 
    	<td class="nobor">1.처리시작년월, 처리종료년월 입력 (* 미입력시 평가반영월로 자동update) </td>
   	</tr>
  	<tr> 
    	<td class="nobor">2.수정전이익: 총이익금액 입력 (일시수납금액 입력) </td>
  	</tr>
  	<tr> 
    	<td class="nobor">3.수정후이익: 수정전이익/(처리시작년월 ~ 처리종료년월) 기간계산하여 등록시 자동 update. 단, 수정후이익 금액이 excel업로드시 입력되면 해당금액사용 </td>
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