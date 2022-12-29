<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - 성과집계표
'프로그램 ID  : rpop_scr_1050.jsp
'프로그램 명  : 이익추이표
'프로그램개요 : 이익추이표
'작   성   자 : 변휘원
'작   성   일 : 2006.04.12
====================================================================
'수정자/수정일: 하진영/20110602
'수정사유     : NEXTRO대응
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String topmenu_name  = "영업점보고서";
    String leftmenu_name = "성과집계표"; 
    String htm_title     = "이익추이표"; 
    String actionname    = "";
    String jumcode       = "";
    String jumname       = "";
    String strErrMsg     = "";
    String status        = "0";
    String buttonplay    = "";
    String readonly      = "";

    try {
        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);
        jumcode = account.getBranch_no();
        jumname = account.getBranch_name();
    }catch(Exception exx)  {
                 
    }
%>
<%@ include file="/module/htm_header.inc"%>
<!--  <script language="JavaScript" src="AIViewer/AIScript.js"></script> -->
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_1050.js"></script>
<script language="javascript">

	function mySheet_OnClick(Row,Col,Value){
		
	}
	
	function mySheet_OnDblClick(Row,Value){
		
	}
	
	function hiddenGrid_OnSearchEnd(Code, Msg){
		len = Msg.length; 
	    if (len > 0){
	        if (Msg.substr(0,1) == "B"){
	            ComboValue(document.frm.basemonth);
	            document.frm.basemonth.selectedIndex=0;
	            selectjum();
	        }else if (Msg.substr(0,1) == "C"){
	        	if(hiddenGrid.RowCount() > 0) {
		        	if (Msg.substr(1,len) == "6"){
						document.frm.pgcode.value=hiddenGrid.GetCellValue(1,0);
						document.frm.pgname.value=hiddenGrid.GetCellValue(1,1);
		            }else if (Msg.substr(1,len) == "1"){
		            	document.frm.jumname.value=hiddenGrid.GetCellValue(1,0);
		            	selectjum();
		            }
	        	}
	        }else{
	            alert(ErrMsg);
	        }
	    }
	
	}
	
	function mySheet_OnSearchEnd(Code, Msg){
		showMsg(Code, Msg);
		showUnitText("원");
		$("#divUnitText").hide();
		if(mySheet.RowCount()> 0) {
			callgrap();	
		}	
	}    
	
	function mySheet_OnSelectMenu(sAction){
		doAction(sAction);
	}
	
	function mySheet_OnDownFinish(downloadType, result) {
		if(result) {
			var basemonth=document.frm.basemonth.value;
		    var v_jumcode=document.frm.jumcode.value;
		    
		    condition="기준년월="+basemonth+";점번호="+v_jumcode;
		    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"));
		}
	}
	
	function mySheet_OnLoadData(data) {
	    rtnData = data;
	}

</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <tr>
    <th>기준년월</th>
    <td><select name="basemonth" class="select"  onchange="LoadPage();"></select></td>
    <th>점번호</th>
    <td>
    <input type="text" class="input_l" onchange="selectjumname();" name="jumcode" size="6" value="<%=jumcode%>" <%=readonly%> onkeyup="chk_num()">
    <a href="javascript:popupJumCode()"><img src="/kpi/img/sky/butt_search_s.gif" border="0" align="absmiddle" <%=buttonplay%>></a>
    <input type="text" class="input_l" readonly name="jumname" size="25" value="<%=jumname%>"></td>
    <td align="right" class="end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
   	  <span class="btn_Grd" style="cursor:pointer; display:;" id="print" border="0" onclick="javascript:doPrint();">인쇄</span>
    </td>
  </tr>
  <tr>
    <th class="nobor">Peer Group</th>
    <td class="nobor"><input type="hidden" name="pgcode"><input type="text" class="input_l" readonly name="pgname" size="21"></td>
    <th class="nobor">그래프구분</th>
    <td class="nobor end" colspan="2">
    <input checked type="checkbox" onclick="callgrap()" name="grapyn1">이익
    <input checked type="checkbox" onclick="callgrap()" name="grapyn2">순이자수익
    <input type="checkbox" checked onclick="callgrap()" name="grapyn3">비이자수익
    <input type="checkbox" onclick="callgrap()" name="grapyn4">특별수익
    <input type="checkbox" onclick="callgrap()" name="grapyn5">기타수익
    <input type="checkbox" onclick="callgrap()" name="grapyn6">업무원가</td>
  </tr>
</table>
<table height="250" width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
  <tr>
    <td>
    	<div id="chartObj"></div>
       <!-- iframe id="iframe1" frameborder=0 scrolling=no height="100%" width="100%"></iframe -->
    </td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
  <tr>
    <td id="divUnitText" align="right">단위 / 원</td>
  </tr>
  <tr>
    <td>
       <div id="sheetObj"></div>
    </td>
  </tr>
</table>
<div id="hiddenGridObj"></div>
<!-- 보고서 출력 -->
<script>displayAI();</script>
<!-- AIGenerator OCX 포함 시작, 반드시 BODY Tag내부에 기술되어야 함 -->
<!-- <script language="JavaScript">document.write(tagAIGeneratorOcx);</script> -->

<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
LoadPage();
htm_title = '<%=htm_title%>';

if(!document.frm.jumcode.value==""){
  //selectjum();
}
</script>