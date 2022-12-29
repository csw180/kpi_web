<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 코드관리
'프로그램 ID  : macd_scr_1100.jsp
'프로그램 명  : 통합정보코드관리
'프로그램개요 : 통합정보코드관리
'작   성   자 : 하진영
'작   성   일 : 2011.01.
====================================================================
'수정자/수정일/수정사유: 하진영/20180103/사용여부,코드구분 추가
'수정자/수정일/수정사유 : 하진영/20180502/기타참고사항5,6 추가
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "운영관리";
    String      leftmenu_name    = "코드관리"; 
    String      htm_title        = "통합정보코드관리"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
    int         manager          = 0;   // 사용자 권한 확인

    SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);
    
    // 종수와 전산정보부 권한 수보
    String role[] = account.getRole(); //권한

    for (int i = 0; i < role.length; i++) {
        if (role[i].trim().equals("400") || role[i].trim().equals("450")) {
           manager = 1 ;
           break;
        }
    }
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/macd/scr/macd_scr_1100.js"></script>
<script language="javascript" >

function mySheet_OnClick(Row,Col,Value) {

	if(mySheet.HeaderRows() * 1 >= Row * 1 + 1) return;
	
	f = document.frm;
	f.jekyocode1.value	= mySheet.GetCellValue(Row,  0);
    f.jekyocode2.value	= mySheet.GetCellValue(Row,  1);
    f.etcref1.value     	= mySheet.GetCellValue(Row,  2);
    f.etcref2.value     	= mySheet.GetCellValue(Row,  3);
    f.etcref3.value     	= mySheet.GetCellValue(Row,  4);
    f.etcref4.value     	= mySheet.GetCellValue(Row,  5);
    f.etcref5.value     	= mySheet.GetCellValue(Row,  6);  // 기타참고사항5
    f.etcref6.value     	= mySheet.GetCellValue(Row,  7);  // 기타참고사항6
    f.useYN.value      	= mySheet.GetCellValue(Row,  8);  // 사용여부
	f.codeGubun.value 	= mySheet.GetCellValue(Row,  9);  // 코드구분
}
      
function hiddenGrid_OnSearchEnd(Code, Msg) {
    len = Msg.length
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.basemonth);
            document.frm.basemonth.selectedIndex=0;
            sel_basemonth();
        } else if(Msg.substr(0,1) == "J") {
            ComboValue(document.frm.jekyocode);
            ComboValue1(document.frm.jekyocode1);
        } else {
            v_inChk=hiddenGrid.GetCellValue(1, 0);
            button_contril();
            
        	if (v_chk == "1") InputButtControl(1);
        	if (v_chk == "2") InputButtControl(3);
        	if (v_chk == "3") InputButtControl(1);
        }
    }
	
    if (isModifyed == true) {
	    doAction("조회");     
	
	    // 화면 setting 부분 clear
	    document.frm.jekyocode1.selectedIndex = 0;
	    document.frm.jekyocode2.value         = 0;
	    document.frm.etcref1.value            = 0;
	    document.frm.etcref2.value            = '';
	    document.frm.etcref3.value            = '';
	    document.frm.etcref4.value            = '';
	    document.frm.etcref5.value            = '';
	    document.frm.etcref6.value            = '';
	    document.frm.useYN.value              = 'Y';
	    document.frm.codeGubun.value          = 0;    //  정보코드구분 0-미정의, 1-고객, 2-코드, 3-계좌
	    
	    isModifyed = "";
    }
}

function mySheet_OnSearchEnd(Code, Msg) {
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
	    <th>기준년월</th>
	    <td><select name="basemonth" class="select" onchange="sel_basemonth()"></select></td> 
	    <th>입력상태</th>
	    <td><input type="text" size="12" readonly name="inchkname"  class="input_c"></td>
	    <td class="al_R end">
	    	<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
       		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
       		<span class="btn_Grd" border="0" onclick="javascript:selectcommit(2);" id="btn_list1" name="btn_list1" style="cursor:pointer">확정</span>
       		<span class="btn_Grd" border="0" onclick="javascript:selectcommit(3);" id="btn_list2" name="btn_list2" style="cursor:pointer">확정취소</span>
	    </td>
	</tr>
  	<tr> 
	    <th class="nobor">통합정보코드</th>
	    <td class="nobor end" colspan="6"><select name="jekyocode" class="select" style="width:300"></select></td>
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
	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
	  	<tr> 
		    <td class="al_R">
		    	<span class="btn_Grd" id="image3" border="0" style="cursor:pointer" onclick="javascript:doAction('신규');">추가</span>
       			<span class="btn_Grd" id="image3" border="0" style="cursor:pointer" onclick="javascript:doAction('변경');">저장</span>
       			<span class="btn_Grd" id="image3" border="0" style="cursor:pointer" onclick="javascript:doAction('삭제');">삭제</span>
		    </td>
	  	</tr>
	</table>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR mgT5">
	    <tr> 
	      	<th>적요코드1</th>
	      	<td class="end">
	        	<select name="jekyocode1" class="select" onChange="onChangeJekyo()">
	        		<option>선택</option>
	        	</select>
	      	</td>
	    </tr>
	    <tr>      
	      	<th class="nobor">적요코드2</th>
	      	<td class="nobor end"><input type="jekyocode2" name="jekyocode2" class="input_l" size="7" maxlength="5" style='ime-mode:disabled' onKeyUp="onlyNumberKeyPressForJekyo()">
	      		&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ☞ 적용코드2[0]은 적요코드1에 대한 설명 (*적용코드2[0]삭제시 해당 적요코드1 정보 모두 삭제처리)
	      	</td>
	    </tr>
	    <tr> 
	    	<th class="nobor">기타참고사항1</th>
	      	<td class="nobor end"><input type="etcref1" name="etcref1" class="input_l" size="10" maxlength="10" style='ime-mode:disabled' onKeyPress="return onlyNumberKeyPress()">
	      		&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ☞ 실제 사용 코드값</td>
	    </tr>
	    <tr> 
	      	<th class="nobor">기타참고사항2</th>
	      	<td class="nobor end"><input type="etcref2" name="etcref2" class="input_l" size="50" maxlength="50"></td>
	    </tr>
	    <tr>  
	      	<th class="nobor">기타참고사항3</th>
	      	<td class="nobor end"><input type="etcref3" name="etcref3" class="input_l" size="50" maxlength="50"></td>
	    </tr>
	    <tr>  
	      	<th class="nobor">기타참고사항4</th>
	      	<td class="nobor end"><input type="etcref4" name="etcref4" class="input_l" size="50" maxlength="50"></td>
	    </tr>
	    <tr>  
	      	<th class="nobor">기타참고사항5</th>
	      	<td class="nobor end"><input type="etcref5" name="etcref5" class="input_l" size="50" maxlength="50"></td>
	    </tr>
	    <tr>  
	      	<th class="nobor">기타참고사항6</th>
	      	<td class="nobor end"><input type="etcref6" name="etcref6" class="input_l" size="50" maxlength="50"></td>
	    </tr>
	    <tr>
	      	<th class="nobor">사용여부</th>
	      	<td class="nobor end"><select name="useYN" class="select"><option>선택</option><option value="Y">Y</option><option value="N">N</option></select>
	      		&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ☞ 적용코드2[0]의 사용/미사용 정보(그외 미사용 정보는 삭제처리 바람)
	      	</td>
	    </tr>    
	    <tr>
	      	<th class="nobor">코드구분</th>
	      	<td class="nobor end">
	      		<select name="codeGubun" class="select">
	      			<option value="0">미정의  </option>
	      	        <option value="1">고객관련</option>
	      	        <option value="2">코드관련</option>
	      	        <option value="3">계좌관련</option>
	      		 </select>
	      		&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ☞ 적용코드2[0]의 코드구분내용 (화면: 통합정보코드 리스트에서사용)
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