<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 기타보고서 - 기업대출금 내역
'프로그램 ID  : rpop_scr_5210.jsp
'프로그램 명  : 기업대출금 내역
'프로그램개요 : 기업대출금 내역
'작   성   자 : 하진영
'작   성   일 : 2018.03.01
====================================================================
'수정자/수 정 일/수정사유 
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "영업점보고서";
    String      leftmenu_name    = "기타"; 
    String      htm_title        = "기업/수산대출금 내역"; 
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
<script language="javascript" src="rpop/scr/rpop_scr_5210.js"></script>
<script>
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
	
	function mySheet_OnMouseDown(Button, Shift, X, Y) {
		  Row=mySheet.MouseRow();
		  Col=mySheet.MouseCol();
		  //19년 상반기 기준 숨김설정
		  if (document.frm.basemonth.value >= '201901'){
			if(Row == 1 && mySheet.GetCellValue(1,Col).substring(0,3) == "가중치"){
			    if(mySheet.GetColHidden(Col+4)){
			      //hidden 풀기
			      mySheet.SetColHidden(Col+4,0);
			      mySheet.SetColHidden(Col+3,0);
			      mySheet.SetColHidden(Col+2,0);
			      mySheet.SetColHidden(Col+1,0);
			      //header 색상 정의
			      mySheet.SetCellBackColor(1,Col+4,"#FFEFBF");
			      mySheet.SetCellBackColor(1,Col+3,"#FFEFBF");
			      mySheet.SetCellBackColor(1,Col+2,"#FFEFBF");
			      mySheet.SetCellBackColor(1,Col+1,"#FFEFBF");
			      mySheet.SetCellText(1, Col ,"가중치\n최종 실적*");//-¶☞▶
			    }
			    else{
			      mySheet.SetCellText(1, Col ,"가중치\n최종 실적*");//+☜◀
			      mySheet.SetColHidden(Col+4,1);
			      mySheet.SetColHidden(Col+3,1);
			      mySheet.SetColHidden(Col+2,1);
			      mySheet.SetColHidden(Col+1,1);
			    }
			    mySheet.SetRowHeight(1,32);
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
		if (basemonth <= '201806') 
			mySheet.SetCellValue(mySheet.HeaderRows(),34,(mySheet.GetCellValue(mySheet.HeaderRows(),32) / mySheet.GetCellValue(mySheet.HeaderRows(), 33) * 100).toFixed(1) ,0);
		else if (basemonth <= '2018012')
		{
			if (pgcode == '16') 
				mySheet.SetCellValue(mySheet.HeaderRows(),32,(mySheet.GetCellValue(mySheet.HeaderRows(),30) / mySheet.GetCellValue(mySheet.HeaderRows(), 31) * 100).toFixed(1) ,0);
			else 
				mySheet.SetCellValue(mySheet.HeaderRows(),38,(mySheet.GetCellValue(mySheet.HeaderRows(),36) / mySheet.GetCellValue(mySheet.HeaderRows(), 37) * 100).toFixed(1) ,0);
		}
		else            
		{ 
			if (pgcode == '16') 
				mySheet.SetCellValue(mySheet.HeaderRows(),26,(mySheet.GetCellValue(mySheet.HeaderRows(),24) / mySheet.GetCellValue(mySheet.HeaderRows(), 25) * 100).toFixed(1) ,0);
			else 
				mySheet.SetCellValue(mySheet.HeaderRows(),31,(mySheet.GetCellValue(mySheet.HeaderRows(),29) / mySheet.GetCellValue(mySheet.HeaderRows(), 30) * 100).toFixed(1) ,0);
		}
	}
	
	/*
	function mySheet_OnChangeSum(Row) {
		if (basemonth <= '201806') 
			mySheet.SetCellValue(Row,34,mySheet.GetCellValue(Row,32) / mySheet.GetCellValue(Row, 33) * 100 ,0);
		else if (basemonth <= '2018012')
		{
			        	   
			if (pgcode == '16') 
				mySheet.SetCellValue(Row,32,mySheet.GetCellValue(Row,30) / mySheet.GetCellValue(Row, 31) * 100 ,0);
			else 
				mySheet.SetCellValue(Row,38,mySheet.GetCellValue(Row,36) / mySheet.GetCellValue(Row, 37) * 100 ,0);
		}
		else            
		{ 
			if (pgcode == '16') 
				mySheet.SetCellValue(Row,26,mySheet.GetCellValue(Row,24) / mySheet.GetCellValue(Row, 25) * 100 ,0);
			else 
				mySheet.SetCellValue(Row,31,mySheet.GetCellValue(Row,29) / mySheet.GetCellValue(Row, 30) * 100 ,0);
		}
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
    	<select name="pgcode" onchange="initGrid()">
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