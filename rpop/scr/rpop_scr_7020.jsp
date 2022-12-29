<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - RM총괄
'프로그램 ID  : rpop_scr_7020.jsp
'프로그램 명  : RM총괄세부실적
'프로그램개요 : RM총괄세부실적
'작   성   자 : 하진영
'작   성   일 : 2012.03.10
====================================================================
'수정자/수정일 :수정사유
'              :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "영업점보고서";
    String      leftmenu_name    = "영업점총괄"; 
    String      htm_title        = "RM(본부) 총괄세부실적"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
    
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_7020.js"></script>

<script>
	function mySheet_OnClick(Row,Col,Value) {
		
	}
	
	function mySheet_OnDblClick(Row,Value) {
	  if(Row < 2) return;
	  f = document.frm;
	  url="kpi.rpop.rpop_1020.screen";  
	  var basemonth = f.basemonth.value;
	  var jumcode   = mySheet.GetCellValue(Row, 2);
	  var jumname   = mySheet.GetCellValue(Row, 5);
	  url = url + "?basemonth="+basemonth+"&Security=2&jumcode="+jumcode+"&jumname="+encodeURI(jumname)+"&IS_POPUP=Y&SCREEN_URL=kpi.rpop.rpop_1020.screen";
	  win_open2(url,820,580);
	}
	
	function hiddenGrid_OnSearchEnd(Code, Msg) {
	    len = Msg.length
	    if (len > 0){
	        if (Msg.substr(0,1) == "B"){
	            ComboValue(document.frm.basemonth);
	            document.frm.basemonth.selectedIndex=0;
	            selectmonth();
	        }else if (Msg.substr(0,1) == "J"){
	            if (Msg.substr(1,len) == "7"){
	                ComboValue(document.frm.pgcode);
	            }
	        }else if (Msg.substr(0,1) == "C"){
	            ComboValue(document.frm.productcode);
	        }else{
	            alert(Msg);
	        }
	    }
	}
	
	function mySheet_OnSearchEnd(Code, Msg) {    
		showMsg(Code, Msg);
		showUnitText("원, %, 점수");
	}
	
	function mySheet_OnSelectMenu(sAction) {
	    doAction(sAction);
	}
	
	function mySheet_OnDownFinish(downloadType, result) {
		if(result) {
			var basemonth   = document.frm.basemonth.value;
			var pgcode      = document.frm.pgcode.value;
			
			condition = "기준년월="+basemonth+";PG코드="+pgcode;
		    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"));
		}
	}
	
</script>

<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <tr> 
    <th>기준년월</th>
    <td>
     <select name="basemonth" class="select" onchange="selectmonth()"></select>
    </td>
    <th>Peer Group</th>
    <td colspan="3">
    	<select name="pgcode" onchange="initGrid();">
    		<option value="0">전체</option>
    	</select>
    </td>
    <td align="right" class="end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
   	  <span class="btn_Grd" style="cursor:pointer; display:none;" id="print" border="0" onclick="javascript:doPrint();">인쇄</span>
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