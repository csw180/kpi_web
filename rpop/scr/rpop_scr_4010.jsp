<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - 영업점총괄
'프로그램 ID  : rpop_scr_4010.jsp
'프로그램 명  : 영업점 총괄실적
'프로그램개요 : 영업점 총괄실적
'작   성   자 : 변휘원
'작   성   일 : 2006.04.12
====================================================================
'수정자/수정일 :하진영/2011.5.31
'수정사유      :NEXTRO 대응
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "영업점보고서";
    String      leftmenu_name    = "영업점총괄"; 
    String      htm_title        = "영업점 총괄실적"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
    
    /*
    String basemonth = "";
    String pgcode = "";
    
    Cookie[] cookies = request.getCookies();
	if (cookies != null) {
		for (int loop = 0; loop < cookies.length; loop++) {
			if (cookies[loop].getName().equals("basemonth")) {
				basemonth=cookies[loop].getValue();
				cookies[loop].setValue("");
				cookies[loop].setMaxAge(0);
				response.addCookie(cookies[loop]);
				
				System.out.println("*================== cookie basemonth null setting");
				
			} else if(cookies[loop].getName().equals("pgcode")) {
				pgcode = cookies[loop].getValue();
				Cookie del = new Cookie("pgcode", "");
				del.setValue("");
				del.setMaxAge(0);
				response.addCookie(del);
				
				System.out.println("*================== cookie pgcode null setting");
			}
		}
	}
	
	System.out.println("basemonth : " + basemonth);
	System.out.println("pgcode : " + pgcode);
	*/
    
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_4010.js"></script>
<script>
	function mySheet_OnClick(Row,Col,Value) {
	
	}
	
	function mySheet_OnDblClick(Row,Value) {
	  if(Row < 3) return;
	  f = document.frm;
	  url="kpi.rpop.rpop_1020.screen";  
	  var basemonth = f.basemonth.value; 
	  var jumcode   =mySheet.GetCellValue(Row, 0); 
	  var jumname   =mySheet.GetCellValue(Row, 1);
	  url = url + "?basemonth="+basemonth+"&Security=2&jumcode="+jumcode+"&jumname="+encodeURI(jumname)+"&IS_POPUP=Y&SCREEN_URL=kpi.rpop.rpop_1020.screen";
	  win_open2(url,820,580);  
	}
	
	function mySheet_OnMouseMove(Button, Shift, X, Y) {
	  //실명번호 풍선도움말 설정      
	  mySheet.SetToolTipText(mySheet.MouseRow(),mySheet.MouseCol(),displayMessageTooltip("성과집계표"));
	}
	
	function hiddenGrid_OnSearchEnd(Code, Msg) {
	    len = Msg.length
	    if (len > 0){
	        if (Msg.substr(0,1) == "B"){
	            ComboValue(document.frm.basemonth);
	            
	            if(getCookie("basemonth") == "") {
	            	document.frm.basemonth.selectedIndex=0;
	            } else {
	            	document.frm.basemonth.value = getCookie("basemonth");
	            }
	            setCookie("basemonth", "");
	            selectmonth();
	            
	        }else if (Msg.substr(0,1) == "J"){
	            if (Msg.substr(1,len) == "7"){
	                ComboValue(document.frm.pgcode);
	                if(getCookie("pgcode") != "") {
	                	document.frm.pgcode.value = getCookie("pgcode");
	                	setCookie("pgcode", "");
	                }
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
		showUnitText("원,%")
		mySheet.SetSumValue(0,"합 계");
		mySheet.SetCellAlign(mySheet.HeaderRows(),0,"Center");
		//합계행 병합
		mySheet.SetMergeCell (mySheet.HeaderRows(), 0, 1,3);
	}
	
	function mySheet_OnSelectMenu(sAction) {
	    doAction(sAction);
	}
	
	function mySheet_OnDownFinish(downloadType, result) {
		if(result) {
			var basemonth=document.frm.basemonth.value;
		    
		    condition = "기준년월="+basemonth;
		    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"));
		}
	}
	
</script>

<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <tr> 
    <th class="wd10">기준년월</th>
    <td>
     	<select name="basemonth" class="select" onchange="selectmonth()"></select>
    </td>
    <th class="wd10">Peer Group</th>
    <td colspan="3">
    	<select name="pgcode" onchange="allDelDataGrid(mySheet)">
    		<option value="0">전체</option>
    	</select>
    </td>
    <td align="right" class="end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
   	  <span class="btn_Grd" style="cursor:pointer; display:none" id="print" border="0" onclick="javascript:doPrint();">인쇄</span>
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