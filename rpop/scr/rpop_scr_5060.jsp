<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 개인PI - 종합이익증대평가
'프로그램 ID  : rpop_scr_5060.jsp
'프로그램 명  : 종합이익증대평가
'프로그램개요 : 종합이익증대평가
'작   성   자 : 조형석
'작   성   일 : 2011.06.02
====================================================================
'수정자/수정일/수정사유: 하진영/20170324/2017년1월~ 예수금이익 개인 & 기타로 분리
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String topmenu_name  = "개인PI";
    String leftmenu_name = "종합이익증대평가"; 
    String htm_title     = "종합이익증대평가"; 
    String actionname    = "";
    String jumcode       = "";
    String jumname       = "";
    String strErrMsg     = "";
    String status        = "0";
    String buttonplay    = "";
    String readonly      = "";
    boolean monthRole = false;  //개인 PI관리자
    
    try {
        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);
        jumcode = account.getBranch_no();
        jumname = account.getBranch_name();

        String role[] = account.getRole(); //권한
  
        for (int i = 0; i < role.length; i++) {
            if (role[i].trim().equals("500")) {
               monthRole=true;
               break;
            }
        } 
    }catch(Exception exx)  {

    }
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_5060.js"></script>
<script> 
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
	            initGrid()
	        }else if (Msg.substr(0,1) == "C"){
	
	        }else if (Msg.substr(0,1) == "J"){
	            if (Msg.substr(1,len) == "8"){
	                ComboValue(document.frm.custgubun);               
	            }
	        }else{
	            alert(ErrMsg);
	        }
	    }
	}
	function mySheet_OnSearchEnd(Code, Msg){    
	    showMsg(Code, Msg);
	    showUnitText("원");
	}
	function mySheet_OnSelectMenu(sAction){
	    doAction(sAction);
	}
	
	function mySheet_OnDownFinish(downloadType, result) {
		if(result) {
			var basemonth   = document.frm.basemonth.value;
		    
		    condition = "기준년월="+basemonth;
		    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=3"));
		}
	}
	
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%> 
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <tr>
    <th class="wd10">기준년월</th>
    <td><select name="basemonth" class="select" onchange="initGrid()"></select></td>
    <td align="right" class="end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
	  <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
    </td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
    <tr>
        <td>
            <marquee scrollamount='3' direction='left' width='700'> 종합이익 증대평가는 당해년도 이익만 해당합니다.</marquee>
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
monthRole = '<%=monthRole%>';
LoadPage();
htm_title = '<%=htm_title%>';
</script>