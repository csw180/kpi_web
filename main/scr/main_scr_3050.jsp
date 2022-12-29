<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 코드관리
'프로그램 ID  : main_scr_3050.jsp
'프로그램 명  : 목표 등록 이력 조회
'프로그램개요 : 영업점/RM(본부)/RM(영업점) 목표 등록 이력 조회
'작   성   자 : 양인찬
'작   성   일 : 2021.06.01
====================================================================
'수정자/수 정 일 : 수정사유
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "운영관리";
    String      leftmenu_name    = "목표 배점"; 
    String      htm_title        = "목표 등록 이력 조회"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
    String      role_chk         = "";
    
    DbResultSet rs               = null;
    DBProcCall     cp            = new DBProcCall();

    try {
        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);
        
        //IT부서와 전기부를 제외한 경우 보고서 컬럼 확인을 위해
        String role[] = account.getRole();        
        for(int i = 0; i < role.length; i++) {
            if(role[i].trim().equals("400") || role[i].trim().equals("450")){                
                role_chk = "1";
                break;
            }
        }
    }catch(Exception exx)  {
                 
    }
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/main/scr/main_scr_3050.js"></script>

<!-- Grid(mySheet) 각 Event들에 대한 Event Handler 등록 -->
<script language="javascript">

function hiddenGrid_OnSearchEnd(Code, Msg) {
    len = Msg.length;;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.basemonth);
            document.frm.basemonth.selectedIndex=0;
        }else if (Msg.substr(0,1) == "C"){
            document.frm.jumname.value=hiddenGrid.GetCellValue(1,0);
        }else{
            alert(ErrMsg);
        }
    }
    
    initGrid();
}
    
function mySheet_OnSearchEnd(Code, Msg) {    
	showUnitText("원, 명");
	showMsg(Code, Msg);
}

function mySheet_OnSelectMenu(sAction) {    
    doAction(sAction);
}

function mySheet_OnLoadExcel() {
	/*
    var sRow     = mySheet.FindStatusRow("R");
    var rowArray = sRow.split(";");
    for(i=0; i<rowArray.length; i++)
    {
       mySheet.RowDelete(1, false);
    }
    */
}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<input type="hidden" name="role_chk">
  	<tr> 
	    <th class="wd10">기준년월</th>
	    <td><select name="basemonth" class="select"></select></td>
	    <td class="al_R end">
	    	<span class="btn_Grd" border="0" onclick="javascript:doAction('조회');" style="cursor:pointer">조회</span>
	    	<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀내려받기');" style="cursor:pointer">엑셀</span>
	   	</td>
  	</tr>
  	<tr> 
	    <th class="nobor">점번호</th>
	    <td class="nobor end" colspan="2">
	      	<input type="text" class="input_l" onchange="selectjumname()" name="jumcode" size="6" onkeyup="chk_jum()">
	      	<a href="javascript:popupJumCode()"><img src="/kpi/img/sky/butt_search_s.gif" border="0" class="vtm"></a>
	      	<input type="text" class="input_l" readonly name="jumname" size="30">
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
document.frm.role_chk.value  = '<%=role_chk%>';
</script>