<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 코드관리
'프로그램 ID  : macd_scr_1060.jsp
'프로그램 명  : 영업점peergroup
'프로그램개요 : 영업점peergroup
'작   성   자 : 변휘원
'작   성   일 : 2006.04.12
====================================================================
'수정자/수정일: 하진영/2011.02.10
'수정사유     : 광역금융본부코드,광역금융본부명 추가
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "운영관리";
    String      leftmenu_name    = "코드관리"; 
    String      htm_title        = "영업점 PeerGroup 관리"; 
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
<script language="javascript" src="/kpi/macd/scr/macd_scr_1060.js"></script>
<script language="javascript">
function deleteyn() {
	if (confirm("정말 삭제 하시겠읍니까")) {
		return true;
	} else {
		return false;
	}
}

function mySheet_OnClick(Row,Col,Value) {

	if(mySheet.HeaderRows() * 1 >= Row * 1 + 1) return;
	
	f = document.frm;
    f.jumno.value      	= mySheet.GetCellValue(Row,  0);             // 점번호
    f.jumname.value 	= mySheet.GetCellValue(Row,  1);             // 점명
    f.pgcode.value     	= mySheet.GetCellValue(Row,  2);             // Peer Group 코드
    f.jumsu_yn.value   	= mySheet.GetCellValue(Row,  4);             // 점수산출여부
    f.totjum.value     	= mySheet.GetCellValue(Row,  5);             // 합산점
    f.WideCode.value	= mySheet.GetCellValue(Row,  6);             // 광역금융본부코드
    
    if (f.pgcode.value == 16 || f.pgcode.value == 17)
	{
		f.jumsu_yn.disabled   =    true;
    } else {
        f.jumsu_yn.disabled   =    false;
    }
    
    document.all.image3.style.cursor = "pointer" ;
    isMofyBtnEnable = true;
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
                sel_WideCode();
            }else if(Msg.substr(1,len) == "49"){
                ComboValue(document.frm.WideCode);
            }            	
        }else{
            v_inChk=hiddenGrid.GetCellValue(1, 0);
            button_contril();
            
        	if (v_chk == "1") InputButtControl(1);
        	if (v_chk == "2") InputButtControl(3);
        	if (v_chk == "3") InputButtControl(1);
        }
    }
}

function mySheet_OnSearchEnd(Code, Msg) {
    if (Msg != "" && isCud == false) showMsg(Code, Msg);
	isCud = false;
	
    // FindText(Col, SearchText, [StartRow], [FullMatch])
    var fRow = mySheet.FindText("점번호", f.jumno.value, 1, 0 );
    if (fRow > 0 )
    mySheet.SelectCell(fRow, "점번호");
}

function mySheet_OnSelectMenu(sAction) {
    doAction(sAction);
}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<tr> 
	    <th>기준년월</th>
	    <td><select name="basemonth" class="select"></select></td>
	    <th>입력상태</th>
	    <td><input type="text" size="12" readonly name="inchkname"  class="input_c"></td>
	    <td class="al_R end">
	    	<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
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
<div id="setList">
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR mgT5">
  	<tr>
	    <th class="wd10">점번호</th>
	    <td>
	    	<input type="text" name="jumno" readonly class="input_l" size="8">
	    	<input type="text" name="jumname" readonly class="input_l" size="40">
	    </td>
	    <td class="al_R end">
	    	<span class="btn_Grd" id="image3" border="0" onclick="javascript:doAction('변경');">변경</span>
	    </td>
  	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<tr> 
	    <th class="wd10 nobor">Peer Group코드</th>
	    <td class="nobor">
	      	<select name="pgcode">
	        	<option value=''>선택</option>
	      	</select>
	    </td>
	    <th class="nobor">점수산출여부</th>
	    <td class="nobor"><select name="jumsu_yn" class="select">
	                           <option>선택</option>
	                           <option value="Y">Y</option>
	                           <option value="N">N</option></select></td>
	    <th class="nobor">합산점번호</th>
	    <td class="nobor"><input type="text" name="totjum" size="5" class="input_l" maxlength="4"></td>
	    <th class="wd10 nobor">광역금융본부코드</th>
	    <td class="end nobor">
	      	<select name="WideCode">
	        	<option value="0">선택</option>
	      	</select>
	    </td>
	</tr>
</table>
</div>
<div id="hiddenGridObj"></div>
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
var v_manager    = <%=manager%>;  // 성과 권한 체크
var v_inChk     = 0;              // 확정여부
LoadPage();
selectcommit(1);
htm_title = '<%=htm_title%>';
</script>