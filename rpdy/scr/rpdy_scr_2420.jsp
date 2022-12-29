<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - 일일 기업핵심예수금 실적
'프로그램 ID  : rpdy_scr_2420.jsp
'프로그램 명  : 일일 기업핵심예수금 실적
'프로그램개요 : 일일 기업핵심예수금 실적
'작   성   자 : 이상용
'작   성   일 : 2022.02.11
====================================================================
'수정자/수정일:
'수정사유     :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "일일성과보고서";
    String      leftmenu_name    = "RM"; 
    String      htm_title        = "일일 RM기업핵심예수금 실적"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
    String      allRole          = "0";

    String role[] = kpi_rpt_account.getRole(); //권한

    for (int i = 0; i < role.length; i++) {
        if (role[i].trim().equals("450") || role[i].trim().equals("400")) {
           allRole="1";
           break;
        }
   
    } 
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpdy/scr/rpdy_scr_2420.js"></script>

<script language="javascript">

	function hiddenGrid_OnSearchEnd(Code, Msg) {
		showUnitText("원");
	    len = Msg.length;
	    if (len > 0){
	        if (Msg.substr(0,1) == "B"){
	            ComboValue(document.frm.baseday);
	            document.frm.baseday.selectedIndex=0;
	            selectmonth();
	        }else if (Msg.substr(0,1) == "J"){
	            if (Msg.substr(1,len) == "7"){
	                ComboValue(document.frm.pgcode);
	            }
	            if (Msg.substr(1,len) == "49"){
	                ComboValue(document.frm.metrogb);
	            }
	        }else if (Msg.substr(0,1) == "C"){
	            ComboValue(document.frm.productcode);
	        }else{
	        	showMsg(Code, Msg);
	        }
	    }
	}

	function metrogbhiddenGrid_OnSearchEnd(Code, Msg) {
	    len = Msg.length;
	    if (len > 0){
	        if (Msg.substr(0,1) == "J"){
	            if (Msg.substr(1,len) == "49"){
	                ComboValue1(document.frm.metrogb);
	            }
	        }else{
	        	showMsg(Code, Msg);
	        }
	    }
	}
	
	function mySheet_OnDownFinish(downloadType, result) {
    	if(result) {
    	    
    	    var baseday = document.frm.baseday.value;
    	    var sergb    = document.frm.sergb.value;
    	    var pgcode	= document.frm.pgcode.value;
    	    var metrogb = document.frm.metrogb.value;
    	    
    	    condition = "기준일="+baseday+";PG코드="+pgcode+";조회구분="+sergb+";광역금융본부="+metrogb;
            
    	    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition));
    	}
    }
	
	function hiddGridmon_OnSearchEnd(Code, Msg){
    	baseday     = document.frm.baseday.value;
    	pgcode      = document.frm.pgcode.value;
    	
    	// 기준일자 정보
        if(isRoleEnable == '1') {
			// 전산정보부 및 성과 담당자
            hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2420.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=98");               
		} else {
        	hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2420.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=99");
		}
    }

	function mySheet_OnSearchEnd(Code, Msg) {
		showUnitText("원");
		
		mySheet.SetSumValue(0,"합 계");
		mySheet.SetCellAlign(mySheet.HeaderRows(),0,"Center");
		//합계행 병합
		mySheet.SetMergeCell(mySheet.HeaderRows(), 0, 1,3);
		
		var num = mySheet.GetCellValue(mySheet.HeaderRows(),mySheet.LastCol()-2) / mySheet.GetCellValue(mySheet.HeaderRows(), mySheet.LastCol()-1) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),mySheet.LastCol(), num.toFixed(1),0); 
		if (!isFinite(num)) mySheet.SetCellValue(mySheet.HeaderRows(),mySheet.LastCol(), 0); //infinity나올 때 0으로 대체

		showMsg(Code, Msg);
	}    

	function mySheet_OnSelectMenu(sAction) {
		doAction(sAction);
	}
 </script>
 
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<tr> 
    	<th class="wd10">기준일</th>
    	<td>
     		<select name="baseday" class="select" onchange="selectmonth()"></select>
    	</td>
	    <th class="wd10">Peer Group</th>
	    <td colspan="3">
	    	<select name="pgcode" onchange="selectpgcode()"><option value="0">전체</option></select>
	    </td>
	    <td width="140" align="right" class="end">
		    <span class="btn_Grd" border="0" onclick="javascript:doAction('조회');"        style="cursor:pointer">조회</span>
	      	<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀내려받기');"         style="cursor:pointer">엑셀</span>
	    </td>
  	</tr>
  	<tr> 
    	<th class="nobor">조회구분</th>
    	<td class="nobor">
     		<select name="sergb" onchange="allDelDataGrid(mySheet);showUnitText('원');">
                          <!-- <option value="1">잔액</option>      -->
                          <!-- <option value="2">기중평잔</option>  -->
                          <option value="3">반기평잔</option> 
                          <option value="4">월중평잔</option>
     		</select>
    	</td>
		<th class="nobor">광역금융본부</th>
    	<td class="nobor end" colspan="4">
     		<select name="metrogb" onchange="allDelDataGrid(mySheet)"><option value="0">전체</option></select>
     	</td>
	</tr>
</table>
<table border='0' width='100%'>
    <tr>
        <td style="PADDING-TOP:5px; PADDING-LEFT:8px; FONT-SIZE:12px; FONT-WEIGHT:bold; COLOR:#800000;" > ※ 일일성과보고서는 <u>평가 조정사항</u>이 모두 반영되어 있지 않으므로 실제 평가실적과 다를 수 있습니다. </td>
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
<div id="metrogbhiddenGridObj"></div>
<div id="hiddGridmonObj"></div>
      
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
  isRoleEnable = '<%=allRole%>';
  LoadPage();
  htm_title = '<%=htm_title%>';
  
</script>
