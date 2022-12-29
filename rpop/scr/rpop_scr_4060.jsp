<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - 팀별 총괄실적
'프로그램 ID  : rpop_scr_4060.jsp
'프로그램 명  : 개인금융 KPI
'프로그램개요 : 개인금융 KPI
'작   성   자 : 양인찬
'작   성   일 : 2019.11.07
====================================================================
'수정자/수정일 :
'수정사유      :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "영업점보고서";
    String      leftmenu_name    = "팀별 총괄실적"; 
    String      htm_title        = "개인금융 KPI"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
    
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_4060.js"></script>
<script>

	function mySheet_OnMouseDown(Button, Shift, X, Y) 
	{
		Row=mySheet.MouseRow();
	  	Col=mySheet.MouseCol();
	  	//19년 하반기 기준 배점 숨김설정
	  	if (document.frm.basemonth.value >= '201909') 
	  	{
			if(Row == 1 && mySheet.GetCellValue(1,Col).substring(0,4) == "전략배점") 
			{
	    		if(mySheet.GetColHidden(Col+4)) 
	    		{
	      			// hidden 풀기      
	      			for(i=1; i<=15; i++)
	      			{
	      				mySheet.SetColHidden(Col+i,0);
	      				// header 색상 정의      
	      				mySheet.SetCellBackColor(1,Col+1,"#FFEFBF");
	      			}
	      			
	      			mySheet.SetColHidden(Col+4,1);
	      			mySheet.SetColHidden(Col+5,1);
	      			mySheet.SetColHidden(Col+9,1);
	      			mySheet.SetColHidden(Col+10,1);
	      			mySheet.SetColHidden(Col+14,1);
	      			mySheet.SetColHidden(Col+15,1);
	      			mySheet.SetCellText(1, Col ,"전략배점(☞)");//-¶☞▶
	    		}
	    		else
	    		{
	      			mySheet.SetCellText(1, Col ,"전략배점(☜)");//+☜◀
	      			// hidden 설정
	      			for(i=1; i<=15; i++)
	      			{
	      				mySheet.SetColHidden(Col+i,1);
	      			}
	    		}
	    		mySheet.SetRowHeight(1,22);
	  		}
		}
	}
	
	function mySheet_OnClick(Row,Col,Value) {}
	
	function mySheet_OnDblClick(Row,Value) {
		if(Row < mySheet.HeaderRows()) return;
	  	f = document.frm;
	  	url="kpi.rpop.rpop_1020.screen";  
	  	var basemonth = f.basemonth.value;
	  	var jumcode   = mySheet.GetCellValue(Row, 0);
	  	var jumname   = mySheet.GetCellValue(Row, 1);
	  	url = url + "?basemonth="+basemonth+"&jumcode="+jumcode+"&jumname="+encodeURI(jumname)+"&IS_POPUP=Y&SCREEN_URL=kpi.rpop.rpop_1020.screen";
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
    <th class="wd10">기준년월</th>
    <td>
     <select name="basemonth" class="select" onchange="selectmonth()"></select>
    </td>
    <th class="wd10">Peer Group</th>
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
  <tr style="display:none;"> 	
    <th class="nobor">세부내역</th>
    <td class="nobor end" colspan="7"> <input type="checkbox" name="subChk" checked disabled="true" ><!-- onclick="javascript:selectsubchk();" --> </td>
  </tr>
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