<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 기타 - 개인별PI실적
'프로그램 ID  : rpop_scr_5010.jsp
'프로그램 명  : 개인별PI실적
'프로그램개요 : 개인별PI실적
'작   성   자 : 조형석
'작   성   일 : 2008.01.28
====================================================================
'수정자/수정일 :
'수정사유      :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String topmenu_name  = "기타";
    String leftmenu_name = "개인별PI실적"; 
    String htm_title     = "개인별PI실적"; 
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
            if (role[i].trim().equals("500") || role[i].trim().equals("501")) {
               monthRole=true;
               break;
            }
       
        } 
        
    }catch(Exception exx)  {
                 
    }
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_5010.js"></script>
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
}

function mySheet_OnSelectMenu(sAction){
    doAction(sAction);
}

function mySheet_OnDownFinish(downloadType, result) {
	if(result) {
		var basemonth   = document.frm.basemonth.value;
	    
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
    <td><select name="basemonth" class="select"  onchange="selectmonth()"></select></td>
    <td align="right" class="end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
    </td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
    <tr>
        <td>
            <marquee scrollamount='3' direction='left' width='700'> 2012년도부터  개인별 PI 평가기간은 상반기 1. 1 ∼ 6.30일, 하반기 7. 1 ∼ 12.31일 입니다. </marquee>
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
jumcode   = '<%=jumcode%>';
LoadPage();
htm_title = '<%=htm_title%>';
</script>