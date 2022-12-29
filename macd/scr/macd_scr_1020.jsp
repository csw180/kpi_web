<%--=====================================================================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 코드관리
'프로그램 ID  : macd_scr_1020.jsp
'프로그램 명  : KPI 상품그룹 조회
'프로그램개요 : KPI 상품그룹 조회
'작   성   자 : 변휘원
'작   성   일 : 2006.04.12
=========================================================================================================
'수정자/수 정 일  /수정사유
'하진영/2011.02.12/기준실적상품분류코드 추가(기준실적 상품분류별 입력)
'하진영/2012.02.06/신규고정이하여신제외여부 항목추가(신규발생고정이하여신대상 상품set항목): 2012년성과기준
'하진영/2012.02.14/순이자대상상품여부 원화/외화로 구분 필요 => 순이자대상상품구분 으로 변경: 2012년성과기준
========================================================================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "운영관리";
    String      leftmenu_name    = "코드관리"; 
    String      htm_title        = "KPI 상품그룹 조회"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/macd/scr/macd_scr_1020.js"></script>
<script language="javascript">
  	function deleteyn() 
  	{
		if (confirm("정말 삭제 하시겠읍니까")) {
			return true;
	  	} else {
		  	return false;
	  	}
  	}

  	function mySheet_OnClick(Row,Col,Value) {
	  
  	}

	function hiddenGrid_OnSearchEnd(Code, Msg) {
	    len = Msg.length
	    if (len > 0){
	        if (Msg.substr(0,1) == "B"){
	            ComboValue(document.frm.basemonth);
	            document.frm.basemonth.selectedIndex=0;
	            sel_basemonth();
	        }else if(Msg.substr(0,1) == "J"){
	            if(Msg.substr(1,len)== "13"){
	                ComboValue(document.frm.productgubun);
	                sel_productgubun();
	            }
	        }else if(Msg.substr(0,1) == "G"){
	            if(Msg.substr(1,len)== "1"){
	                ComboValue(document.frm.bgubun);
	            }else if(Msg.substr(1,len)== "2"){
	                ComboValue(document.frm.mgubun);
	            }
	        }else{
	            alert(ErrMsg);
	        }
	    }
	}

	function mySheet_OnSearchEnd(Code, Msg) {
		showMsg(Code, Msg);
	}    

	function mySheet_OnSelectMenu(sAction) {
    	doAction(sAction);
	}

	function mySheet_OnMouseMove(Button, Shift, X, Y) {
	  	Row = mySheet.MouseRow();
	  	Col = mySheet.MouseCol();
	  	tipText = "";
	
	  	//풍선도움말 만들기
	  	if (Col == 13 && Row > 0) {
	     	pigbn = mySheet.GetCellText(Row,13);
	     	if (pigbn == "Y")         tipText = "PI산출대상";
	     	else if (pigbn == "N")    tipText = "PI산출제외대상";
	     	else if (pigbn == "평잔") tipText = "신규고객기준 평잔에 포함";
	     	else if (pigbn == "이자") tipText = "PI산출대상이나 신규고객기준 평잔에 미포함";
	     	mySheet.SetMouseToolTipText(tipText);
	  	} else mySheet.SetMouseToolTipText("");
		
	}
</script>

<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<tr> 
    	<th>기준년월</th>
    	<td colspan="5"><select name="basemonth" class="select" onchange="sel_basemonth()"></select></td>
    	<td class="al_R end">
    		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
       		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
    	</td>
  	</tr>
  	<tr>
	    <th class="nobor">상품구분</th>
	    <td class="nobor">
	    	<select name="productgubun" class="select" onchange="sel_productgubun()"></select>
	    </td>
	    <th class="nobor">대분류</th>
	    <td class="nobor">
	    	<select name="bgubun" class="select" onchange="sel_bgubun()">
	    		<option value=999>전체</option>
	    	</select>
	    </td>
	    <th class="nobor">중분류</th>
	    <td class="nobor end" colspan="2">
	    	<select name="mgubun" class="select">
	    		<option value=999>전체</option>
	    	</select>
	    </td>
  	<tr>
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