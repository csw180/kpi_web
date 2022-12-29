<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 기타보고서 - 기업대출금 내역
'프로그램 ID  : rpop_scr_5240.jsp
'프로그램 명  : 신규대출금 내역
'프로그램개요 : 신규대출금 내역
'작   성   자 : 양인찬
'작   성   일 : 2021.08.19
====================================================================
'수정자/수 정 일/수정사유
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%
    String      topmenu_name     = "영업점보고서";
    String      leftmenu_name    = "기타";
    String      htm_title        = "신규대출금";
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
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_5240.js"></script>
<script>
	function hiddenGrid_OnSearchEnd(Code, Msg){
	    len = Msg.length;
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
	            alert(ErrMsg);
	        }
	    }
	}
	
	function mySheet_OnMouseDown(Button, Shift, X, Y){
	
	  Row = mySheet.MouseRow;
	  Col = mySheet.MouseCol;
	
	  //21년 상반기 기준 숨김설정
	  //if (document.frm.basemonth.value >= '202107'){
	  //if(Row == 1 && CellValue(1,Col).substring(0,3) == "가중치"){
	  //  if(ColHidden(Col+8)){
	  //    //hidden 풀기
	  //
	  //    for(i=8;i>=1;i--){
	  //    ColHidden(Col+i) = false;
	  //    //header 색상 정의
	  //    mySheet.CellBackColor(0,Col+i)  = mySheet.RgbColor(255,239,191);
	  //    mySheet.CellBackColor(1,Col+i)  = mySheet.RgbColor(255,239,191);
	  //    }
	  //
	  //    mySheet.CellText(1, Col) = "가중치\n최종 실적*"; //-¶☞▶
	  //  }
	  //  else{
	  //
	  //    for(i=8;i>=1;i--){
	  //    ColHidden(Col+i) = true;
	  //    //header 색상 정의
	  //    mySheet.CellBackColor(1,Col+i)  = mySheet.RgbColor(1,1,1);
	  //    }
	  //
	  //    mySheet.CellText(1, Col) = "가중치\n최종 실적*"; //+☜◀
	  //  }
	  //  RowHeight(1) = 32;
	  //}
	  //}
	}
	
	function mySheet_OnSearchEnd(Code, Msg){
		showMsg(Code, Msg);
		showUnitText("원, %");
		mySheet.SetSumValue(0,"합 계");
		mySheet.SetCellAlign(mySheet.HeaderRows(),0,"Center");
		//합계행 병합
		mySheet.SetMergeCell (mySheet.HeaderRows(), 0, 1,3);
	}
	
	function mySheet_OnSelectMenu(sAction){
	    doAction(sAction);
	}
	function mySheet_OnChangeSum(Row){}
	
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
    <td><select name="pgcode" onchange="initGrid()"><option value="0">전체</option></select></td>
    <td width="140" align="right" class="end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
   	  <span class="btn_Grd" style="cursor:pointer; display:none;" id="print" border="0" onclick="javascript:doPrint();">인쇄</span>
    </td>
  </tr>
  <tr>
    <th class="nobor">조회구분</th>
    <td class="nobor">
     <select name="sergb" class="select">
     </select>
    </td>
    <th class="nobor">광역금융본부</th>
    <td colspan="2" class="nobor end">
     <select name="WideCode" class="select"><option value="0">전체</option></select>
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

   doAction("조회");

<%} %>
</script>