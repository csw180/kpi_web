<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - 부지점장예수금실적
'프로그램 ID  : rpop_scr_7250.jsp
'프로그램 명  : 부지점장예수금실적
'프로그램개요 : 부지점장예수금실적
'작   성   자 : 조형석
'작   성   일 : 2015.03.25
====================================================================
' 수정자/수정일   : 수정사유
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "영업점보고서";
    String      leftmenu_name    = "RM(영업점) 총괄"; 
    String      htm_title        = "RM(영업점) 예수금실적"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
    String      allRole          = "0";

    // 성과자료와 종수자료 차이분 나타내기위함 그리드 설정위한 전산담당자 구분
    SignOnUserAccount   account         = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
    
    String role[] = account.getRole(); //권한

    for (int i = 0; i < role.length; i++) {
        if (role[i].trim().equals("450")) {
           allRole="1";
           break;
        }
   
    } 
    
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_7250.js"></script>
<script>
	function hiddenGrid_OnSearchEnd(Code, Msg) {
	    len = Msg.length
	    if (len > 0){
	        if (Msg.substr(0,1) == "B"){
	            ComboValue(document.frm.basemonth);
	            document.frm.basemonth.selectedIndex=0;
	            selectmonth();
	        }else{
	            alert(Msg);
	        }
	    }
	}
	
	function mySheet_OnSearchEnd(Code, Msg) 
	{
		showMsg(Code, Msg);
		showUnitText("원, %");
		mySheet.SetSumValue(0,"합 계");
		
		var basemonth   = document.frm.basemonth.value;
		
		if(basemonth <= "201512")
		{
			mySheet.SetCellAlign(mySheet.LastRow(),0,"Center");
			mySheet.SetMergeCell (mySheet.HeaderRows(), 0, 1,3);
		}
		else
		{
			mySheet.SetCellAlign(mySheet.LastRow(),0,"Center");
			mySheet.SetMergeCell (mySheet.HeaderRows(), 0, 1,4);
		}
	}
	
	function mySheet_OnChangeSum(Row) {
		
	}
	
	function mySheet_OnDownFinish(downloadType, result) {
		if(result) {
			var basemonth   = document.frm.basemonth.value;
		    var cifgb       = document.frm.cifgb.value;
		    var sergb       = document.frm.sergb.value;
			
			condition = "기준년월="+basemonth+";대상구분="+cifgb+";조회구분="+sergb;
		    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"));
		}
	}
	
	function mySheet_OnSelectMenu(sAction)
	{
		doAction(sAction);
	}
	
</script> 

<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <tr> 
    <th>기준년월</th>
    <td colspan="2">
     <select name="basemonth" class="select" onchange="selectmonth()"></select>
    </td>
    <td align="right" class="end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
    </td>
  </tr>
  <tr> 
    <th class="nobor">대상구분</th>
    <td class="nobor">
     <select name="cifgb">
     		<option value="1">신규고객</option>
            <option value="2">지정관리고객</option>
     </select>
    </td>
    <th class="nobor">조회구분</th>
    <td class="nobor end">
    	<select name="sergb"></select>
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
isRoleEnable = '<%=allRole%>';
LoadPage();
htm_title = '<%=htm_title%>';
</script>