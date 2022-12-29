<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 데이타입력
'프로그램 ID  : main_scr_1280.jsp
'프로그램 명  : 외환전문역마케팅계좌 승인
'프로그램개요 : 외환전문역마케팅계좌 승인
'작   성   자 : 하진영
'작   성   일 : 2010.05.128====================================================================
'수정자/수정일 :
'수정사유      :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "운영관리";
    String      leftmenu_name    = "코드관리"; 
    String      htm_title        = "외환전문역마케팅계좌 승인"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";

    int         manager          = 0;   // 사용자 권한 확인

    // 종수와 전산정보부 권한 수보
    String role[] = kpi_rpt_account.getRole(); //권한

    for (int i = 0; i < role.length; i++) {
        if (role[i].trim().equals("400") || role[i].trim().equals("450")) {
           manager = 1 ;
           break;
        }
    }

%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/main/scr/main_scr_1280.js"></script>

<script language="javascript">
function mySheet_OnClick(Row,Col,Value) {}

function mySheet_OnSearchEnd(Code, Msg) {
    showUnitText("원");
    showMsg(Code, Msg);
}    

function mySheet_OnSelectMenu(sAction) {
    doAction(sAction);
}

function mySheet_OnSaveEnd(Code, Msg) {
	showMsg(Code, Msg);     
}    

function hiddenGrid_OnSearchEnd(Code, Msg) {
    len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            document.frm.basemonth.value = hiddenGrid.GetCellValue(1, 0);      
        }else if (Msg.substr(0,1) == "C"){
            document.frm.jumname.value = hiddenGrid.GetCellValue(1,0);
        }else{
            v_inChk = hiddenGrid.GetCellValue(1, 0);
            button_contril();
            
        	if (v_chk == "1") InputButtControl(1);
        	if (v_chk == "2") InputButtControl(3);
        	if (v_chk == "3") InputButtControl(1);
        }
    } 
}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<tr> 
	    <th class="wd10">입력상태</th>
	    <td><input type="text" size="12" readonly name="inchkname"  class="input_c"></td>
	    <td class="al_R end">
	 		<input type="hidden" name="basemonth">
	 		 <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
		     <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('등록');" id="btn_entry" name="btn_entry">등록</span>
		     <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span> 
		     <span class="btn_Grd" border="0" onclick="javascript:selectcommit(2);" id="btn_list1" name="btn_list1" style="cursor:pointer">확정</span> 
		     <span class="btn_Grd" border="0" onclick="javascript:selectcommit(3);" id="btn_list2" name="btn_list2" style="cursor:pointer">확정취소</span> 
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
var v_manager    = <%=manager%>;  // 성과 권한 체크
var v_inChk     = 0;              // 확정여부
LoadPage();
selectcommit(1);
htm_title = '<%=htm_title%>';
</script>