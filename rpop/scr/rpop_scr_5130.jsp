<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 기타보고서 - 소매여신 내역
'프로그램 ID  : rpop_scr_5130.jsp
'프로그램 명  : 소매대출금 내역
'프로그램개요 : 소매대출금 내역
'작   성   자 : 조형석
'작   성   일 : 2014.03.24
====================================================================
'수정자/수 정 일/수정사유 
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "영업점보고서";
    String      leftmenu_name    = "기타"; 
    String      htm_title        = "소매대출금 내역"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
    String      allRole          = "0";

    //popup 으로 사용시 받는 Parameter
    String basemonth     = JSPUtil.getParameter(request,"basemonth","");
    String pgcode        = JSPUtil.getParameter(request,"pgcode","");
    String sergb         = JSPUtil.getParameter(request,"sergb","");
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_5130.js"></script>
<script>
	function hiddenGrid_OnSearchEnd(Code, Msg) {
	    len=Msg.length
	    if (len > 0){
	        if (Msg.substr(0,1) == "B"){
	            ComboValue(document.frm.basemonth);
	            document.frm.basemonth.selectedIndex=0;
	            selectmonth();
	        }else if (Msg.substr(0,1) == "J"){
	            if (Msg.substr(1,len) == "7"){
	                ComboValue(document.frm.pgcode);
	                sel_WideCode();
	            }else if(Msg.substr(1,len) == "49"){
	                ComboValue(document.frm.WideCode);
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
		showUnitText("원, %");
		mySheet.SetSumValue(0,"합 계");
		mySheet.SetCellAlign(mySheet.HeaderRows(),0,"Center");
		//합계행 병합
		mySheet.SetMergeCell (mySheet.HeaderRows(), 0, 1,3);
		rowChangeSum();
	}
	
	function mySheet_OnSelectMenu(sAction) {
	    doAction(sAction);
	}
	
	function rowChangeSum()
	{
		if (document.frm.basemonth.value >= '201910') 
	    	mySheet.SetCellValue(mySheet.HeaderRows(), 30,(mySheet.GetCellValue(mySheet.HeaderRows(),28) / mySheet.GetCellValue(mySheet.HeaderRows(),29) * 100 ).toFixed(1),0);
		else if (document.frm.basemonth.value >= '201907') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 29,(mySheet.GetCellValue(mySheet.HeaderRows(),27) / mySheet.GetCellValue(mySheet.HeaderRows(),28) * 100 ).toFixed(1),0);
		else if (document.frm.basemonth.value >= '201905') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 28,(mySheet.GetCellValue(mySheet.HeaderRows(),26) / mySheet.GetCellValue(mySheet.HeaderRows(),27) * 100 ).toFixed(1),0);
	    else if (document.frm.basemonth.value >= '201901') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 27,(mySheet.GetCellValue(mySheet.HeaderRows(),25) / mySheet.GetCellValue(mySheet.HeaderRows(),26) * 100 ).toFixed(1),0);
	    else if (document.frm.basemonth.value >= '201801') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 35,(mySheet.GetCellValue(mySheet.HeaderRows(),33) / mySheet.GetCellValue(mySheet.HeaderRows(),34) * 100 ).toFixed(1),0);
	    else if (document.frm.basemonth.value >= '201707') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 34,(mySheet.GetCellValue(mySheet.HeaderRows(),32) / mySheet.GetCellValue(mySheet.HeaderRows(),33) * 100 ).toFixed(1),0);
	    else if (document.frm.basemonth.value >= '201701') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 29,(mySheet.GetCellValue(mySheet.HeaderRows(),27) / mySheet.GetCellValue(mySheet.HeaderRows(),28) * 100 ).toFixed(1),0);
	    else if (document.frm.basemonth.value >= '201607') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 27,(mySheet.GetCellValue(mySheet.HeaderRows(),25) / mySheet.GetCellValue(mySheet.HeaderRows(),26) * 100 ).toFixed(1),0);
	    else if (document.frm.basemonth.value >= '201601') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 26,(mySheet.GetCellValue(mySheet.HeaderRows(),24) / mySheet.GetCellValue(mySheet.HeaderRows(),25) * 100 ).toFixed(1),0);
	    else if (document.frm.basemonth.value >= '201507') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 25,(mySheet.GetCellValue(mySheet.HeaderRows(),23) / mySheet.GetCellValue(mySheet.HeaderRows(),24) * 100 ).toFixed(1),0);
	    else if (document.frm.basemonth.value >= '201501') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 23,(mySheet.GetCellValue(mySheet.HeaderRows(),21) / mySheet.GetCellValue(mySheet.HeaderRows(),22) * 100 ).toFixed(1),0);
	    else if (document.frm.basemonth.value >= '201407') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 22,(mySheet.GetCellValue(mySheet.HeaderRows(),20) / mySheet.GetCellValue(mySheet.HeaderRows(),21) * 100 ).toFixed(1),0);
	    else 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 20,(mySheet.GetCellValue(mySheet.HeaderRows(),18) / mySheet.GetCellValue(mySheet.HeaderRows(),19) * 100 ).toFixed(1),0);
	}
	
	/*
	function mySheet_OnChangeSum(Row) {
		alert(mySheet_OnChangeSum)
	     if (document.frm.basemonth.value >= '201910') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 30,(mySheet.GetCellValue(mySheet.HeaderRows(),28) / mySheet.GetCellValue(mySheet.HeaderRows(),29) * 100 ).toFixed(1),0);
		 else if (document.frm.basemonth.value >= '201907') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 29,(mySheet.GetCellValue(mySheet.HeaderRows(),27) / mySheet.GetCellValue(mySheet.HeaderRows(),28) * 100 ).toFixed(1),0);
		 else if (document.frm.basemonth.value >= '201905') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 28,(mySheet.GetCellValue(mySheet.HeaderRows(),26) / mySheet.GetCellValue(mySheet.HeaderRows(),27) * 100 ).toFixed(1),0);
	     else if (document.frm.basemonth.value >= '201901') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 27,(mySheet.GetCellValue(mySheet.HeaderRows(),25) / mySheet.GetCellValue(mySheet.HeaderRows(),26) * 100 ).toFixed(1),0);
	     else if (document.frm.basemonth.value >= '201801') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 35,(mySheet.GetCellValue(mySheet.HeaderRows(),33) / mySheet.GetCellValue(mySheet.HeaderRows(),34) * 100 ).toFixed(1),0);
	     else if (document.frm.basemonth.value >= '201707') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 34,(mySheet.GetCellValue(mySheet.HeaderRows(),32) / mySheet.GetCellValue(mySheet.HeaderRows(),33) * 100 ).toFixed(1),0);
	     else if (document.frm.basemonth.value >= '201701') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 29,(mySheet.GetCellValue(mySheet.HeaderRows(),27) / mySheet.GetCellValue(mySheet.HeaderRows(),28) * 100 ).toFixed(1),0);
	     else if (document.frm.basemonth.value >= '201607') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 27,(mySheet.GetCellValue(mySheet.HeaderRows(),25) / mySheet.GetCellValue(mySheet.HeaderRows(),26) * 100 ).toFixed(1),0);
	     else if (document.frm.basemonth.value >= '201601') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 26,(mySheet.GetCellValue(mySheet.HeaderRows(),24) / mySheet.GetCellValue(mySheet.HeaderRows(),25) * 100 ).toFixed(1),0);
	     else if (document.frm.basemonth.value >= '201507') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 25,(mySheet.GetCellValue(mySheet.HeaderRows(),23) / mySheet.GetCellValue(mySheet.HeaderRows(),24) * 100 ).toFixed(1),0);
	     else if (document.frm.basemonth.value >= '201501') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 23,(mySheet.GetCellValue(mySheet.HeaderRows(),21) / mySheet.GetCellValue(mySheet.HeaderRows(),22) * 100 ).toFixed(1),0);
	     else if (document.frm.basemonth.value >= '201407') 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 22,(mySheet.GetCellValue(mySheet.HeaderRows(),20) / mySheet.GetCellValue(mySheet.HeaderRows(),21) * 100 ).toFixed(1),0);
	     else 
	     	mySheet.SetCellValue(mySheet.HeaderRows(), 20,(mySheet.GetCellValue(mySheet.HeaderRows(),18) / mySheet.GetCellValue(mySheet.HeaderRows(),19) * 100 ).toFixed(1),0);
	} 
	*/
	
	function mySheet_OnDownFinish(downloadType, result) {
		if(result) {
			var basemonth   = document.frm.basemonth.value;
			var pgcode      = document.frm.pgcode.value;
			var sergb       = document.frm.sergb.value;
			
			condition = "기준년월="+basemonth+";PG코드="+pgcode+";조회구분="+sergb;
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
    <td>
    	<select name="pgcode">
    		<option value="0">전체</option>
    	</select>
    </td>
    <td class="al_R end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
  	  <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
   	  <span class="btn_Grd" style="cursor:pointer; display:none;" id="print" border="0" onclick="javascript:doPrint();">인쇄</span>
    </td>
  </tr>
  <tr> 
    <th class="nobor">조회구분</th>
    <td class="nobor">
     <select name="sergb" class="select" onchange="setsergb()">
          <option value="253">순증잔액</option>
          <option value="262">신규잔액</option>
     </select>
    </td>
    <th class="nobor">광역금융본부</th>
    <td colspan="2" class="nobor end">
	     <select name="WideCode" class="select">
	     	<option value="0">전체</option>
	     </select>
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
<%if(!(basemonth==null || basemonth.equals(""))){%>
   document.frm.basemonth.value="<%=basemonth%>";
   document.frm.pgcode.value="<%=pgcode%>";
   document.frm.sergb.value="<%=sergb%>";
   initGrid();

   if(basemonth >= '201407'){
      document.frm.sergb.disabled = false;
   } else {
      document.frm.sergb.disabled = true;
      document.frm.sergb.value = "253";
   }

   doAction("조회");
<%} %>
</script>