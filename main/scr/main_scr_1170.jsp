<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 데이타입력
'프로그램 ID  : main_scr_1170.jsp
'프로그램 명  : 10대 조달처 등록 및 조회
'프로그램개요 : 10대 조달처 등록 및 조회
'작   성   자 : 이우석
'작   성   일 : 2007.12.27
====================================================================
'수정자/수정일   : 수정사유  
'하진영/20120730 : 유지목표분기평잔추가
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name    = "운영관리";
    String      leftmenu_name   = "데이터입력"; 
    String      htm_title       = "주요예수금조달처 등록"; 
    String      actionname      = "";
    String      haengwon_no     = "";
    String      strErrMsg       = "";
    String      status          = "0";
    DbResultSet rs              = null;
    DBProcCall     cp           = new DBProcCall();

    int         manager         = 0;   // 사용자 권한 확인

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
<script language="javascript" src="/kpi/main/scr/main_scr_1170.js"></script>
<Script language="javascript">

function hiddenGrid_OnSearchEnd(Code, Msg) {
    len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.basemonth);
            document.frm.basemonth.selectedIndex=0;
        }else{
            alert(ErrMsg);
        }
    }
}

function hiddenGrid1_OnSearchEnd(Code, Msg) {
    v_inChk = hiddenGrid1.GetCellValue(1, 0);
    button_contril();
    
	if (v_chk == "1") InputButtControl(1);
	if (v_chk == "2") InputButtControl(3);
	if (v_chk == "3") InputButtControl(1);
}

function hiddenGrid2_OnSearchEnd(Code, Msg) {
    len = Msg.length;
    if (len > 0){
        if(Msg.substr(0,1) == "C"){
            document.frm.jumname.value = hiddenGrid2.GetCellValue(1, 0);
            if(document.frm.jumname.value.substr(0,2) == "조회") {
               alert("점번호를 확인하세요");
               document.frm.jumcode.value = "";
               document.frm.jumname.value = "";
            }
        }else{
            if(ErrMsg=="tpms.framework.component.dao.DAOException: 21")
                ErrMsg = "데이터 중복 입니다.확인하세요";
            alert(ErrMsg);
        }
    }
}

function hiddenGrid3_OnSearchEnd(Code, Msg) {
    len = Msg.length;
    if (len > 0){
        if(Msg.substr(0,1) == "C"){
            document.frm.customername.value = hiddenGrid3.GetCellValue(1, 0);
            if(document.frm.customername.value.substr(0,2) == "조회") {
               alert("고객번호를 확인하세요");
               document.frm.customername.value = "";
               document.frm.customername.value = "";
            }
        }else{
            if(ErrMsg=="tpms.framework.component.dao.DAOException: 21")
                ErrMsg = "데이터 중복 입니다.확인하세요";
            alert(ErrMsg);
        }
    }
	
}

function mySheet_OnSearchEnd(Code, Msg) {
    if (Msg != "" && isCud == false) showMsg(Code, Msg);
    isCud = false;
	
	isEnableSave        = true;
    mySheet.CheckAll(1, 0);

   	var fRow = mySheet.FindText(0, document.frm.customerno.value,0);
	if (fRow > 0 )
        mySheet.SelectCell(fRow, 0);
        document.frm.customerno.value  = "";
        document.frm.customername.value  = "";
        document.frm.jumcode.value = "";
        document.frm.jumname.value = "";
        document.frm.pyungjan.value = "";
        document.frm.pyungjan1.value = "";
        document.frm.pyungjan2.value = "";
        document.frm.pyungjan3.value = "";
        enableElements();
}

function mySheet_OnSelectMenu(sAction) {
    doAction(sAction);
}

function mySheet_OnSaveEnd(Code, Msg) {
	showMsg(Code, Msg);

    if(Msg != null){
		isCud = true;
    }
} 

function mySheet_OnClick(Row,Col,Value) {
	if (v_inChk != 1) {
		
		if(mySheet.HeaderRows() * 1 >= Row * 1 + 1) return;
		
	    //고객번호
	    document.frm.customerno.value     = mySheet.GetCellValue(Row, 0);
	    //고객명
	    document.frm.customername.value   = mySheet.GetCellValue(Row, 1);
	    //성과관리점번호
	    document.frm.jumcode.value        = mySheet.GetCellValue(Row, 2);
	    //성과관리점명
	    document.frm.jumname.value        = mySheet.GetCellValue(Row, 3);
	    //유지목표잔액
	    document.frm.pyungjan.value       = mySheet.GetCellValue(Row, 4);
	    //유지목표반기평잔
	    document.frm.pyungjan1.value      = mySheet.GetCellValue(Row, 5);
	    //유지목표기중평잔
	    document.frm.pyungjan2.value      = mySheet.GetCellValue(Row, 6);
	    //유지목표분기평잔
	    document.frm.pyungjan3.value      = mySheet.GetCellValue(Row, 7);
	
	    selectjumname(1);
	}    
	    
	InputButtControl(3);
	v_selrow = Row;
}

</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>        
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<tr> 
	    <th>기준년월</th>
	    <td><select name="basemonth" class="select" onchange="javascript:selectcommit(1);"></select></td>
	    <th>입력상태</th>
	    <td><input type="text" size="14" readonly name="inchkname"  class="input_c"></td>
	    <td align="right" class="end">
	    	<span class="btn_Grd" border="0" onclick="javascript:doAction('조회');"         style="cursor:pointer">조회</span>
      		<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀내려받기');" style="cursor:pointer">엑셀</span>
      		<span class="btn_Grd" border="0" onclick="javascript:selectcommit(2);" id="btn_list1" name="btn_list1" style="cursor:pointer">확정</span>
      		<span class="btn_Grd" border="0" onclick="javascript:selectcommit(3);" id="btn_list2" name="btn_list2" style="cursor:pointer">확정취소</span>
      		
	   		<!-- <img src="/kpi/img/sky/butt_inquiry.gif" border="0" onclick="javascript:doAction('조회');"         style="cursor:pointer">
	      	<img src="/kpi/img/sky/butt_excel.gif"   border="0" onclick="javascript:doAction('엑셀내려받기');" style="cursor:pointer">
	      	<img src="/kpi/img/sky/butt_decision.gif" border="0" onclick="javascript:selectcommit(2);" name="btn_list1" style="cursor:pointer">
	      	<img src="/kpi/img/sky/butt_decision_cancel.gif" border="0" onclick="javascript:selectcommit(3);" name="btn_list2" style="cursor:pointer"> -->
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
<div id="hiddenGridObj1"></div>
<div id="hiddenGridObj2"></div>
<div id="hiddenGridObj3"></div>
<div id="hiddenGridObj4"></div>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabltype2 pdLR mgT5">
  	<tr>
	    <td>
		    <div id="butt1" STYLE="position:relative; display:;">
		      	<table width="100%" border="0" cellspacing="0" cellpadding="0">
			        <tr> 
						<td align="right">
				            <span class="btn_Grd" border="0" onclick="javascript:doAction('초기화');" style="cursor:pointer">초기화</span>
				      		<span class="btn_Grd" border="0" onclick="javascript:doAction('등록');" style="cursor:pointer">등록</span>
				      		<span class="btn_Grd" border="0">변경</span>
				      		<span class="btn_Grd" border="0">삭제</span>
				           
				            <!-- <img src="/kpi/img/sky/butt_reset.gif" border="0" onclick="javascript:doAction('초기화');" style="cursor:pointer">
				            <img src="/kpi/img/sky/butt_entry.gif" border="0" onclick="javascript:doAction('등록');" style="cursor:pointer">
				            <img src="/kpi/img/sky/butt_change.gif" border="0">
				            <img src="/kpi/img/sky/butt_delete.gif" border="0"> -->
			          	</td>
			        </tr>
		      	</table>
			</div>
		    <div id="butt2" STYLE="position:relative; display:none;">
		      	<table width="100%" border="0" cellspacing="0" cellpadding="0">
			        <tr> 
				      	<td align="right">
				        	<span class="btn_Grd" border="0" onclick="javascript:doAction('초기화');" style="cursor:pointer">초기화</span>
				      		<span class="btn_Grd" border="0">등록</span>
				      		<span class="btn_Grd" border="0" onclick="javascript:doAction('변경');" style="cursor:pointer">변경</span>
				      		<span class="btn_Grd" border="0" onclick="javascript:doAction('삭제');" style="cursor:pointer">삭제</span>
				      		
				        	<!-- <img src="/kpi/img/sky/butt_reset.gif" border="0" onclick="javascript:doAction('초기화');" style="cursor:pointer">
				            <img src="/kpi/img/sky/butt_entry.gif" border="0">
				            <img src="/kpi/img/sky/butt_change.gif" border="0" onclick="javascript:doAction('변경');" style="cursor:pointer">
				            <img src="/kpi/img/sky/butt_delete.gif" border="0" onclick="javascript:doAction('삭제');" style="cursor:pointer"> -->
						</td>
			        </tr>
		      	</table>
		    </div>
		    <div id="butt3" STYLE="position:relative; display:none;">
		      	<table width="100%" border="0" cellspacing="0" cellpadding="0">
			        <tr> 
			        	<td align="right">
			        		<span class="btn_Grd" border="0">초기화</span>
			        		<span class="btn_Grd" border="0">등록</span>
			        		<span class="btn_Grd" border="0">변경</span>
			        		<span class="btn_Grd" border="0">삭제</span>
			          	</td>
			     	</tr>
		      	</table>
			</div>
		</td>
  	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR mgT5">
  	<tr>
	    <th>고객번호</td>
	    <td>
	      	<input type="text" class="input_l" onchange="selectCostomerno(0)" name="customerno" size="10" onkeyup="chk_num()">
	      	<a href="javascript:popupCustomerCode(1)"><img src="/kpi/img/sky/butt_search_s.gif" border="0" align="absmiddle"></a>
	      	<input type="text" class="input_l" readonly name="customername" size="20">  
	    <th>성과관리점</th>
	    <td colspan="6" class="end">
			<input type="text" class="input_l" onchange="selectjumname(1)" name="jumcode" size="5" onkeyup="chk_jum()">
	      	<a href="javascript:popupJumCode(0)"><img src="/kpi/img/sky/butt_search_s.gif" border="0" align="absmiddle"></a>
	      	<input type="text" class="input_l" readonly name="jumname" size="20">
	  	</td>
  	</tr>
  	<tr>
	    <th class="nobor">유지목표잔액</th>
	    <td class="nobor"><input type="text" name="pyungjan" class="input_l" onkeyup="chk_num()" size="15"></td>
	    <th class="nobor">유지목표반기평잔</th>
	    <td class="nobor"><input type="text" name="pyungjan1" class="input_l" onkeyup="chk_num()" size="15"></td>
	    <th class="nobor">유지목표기중평잔</th>
	    <td class="nobor"><input type="text" name="pyungjan2" class="input_l" onkeyup="chk_num()" size="15"></td>
	    <th class="nobor">유지목표분기평잔</th>
	    <td class="nobor end"><input type="text" name="pyungjan3" class="input_l" onkeyup="chk_num()" size="15"></td>
  	</tr>
</table>
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
var v_manager    = <%=manager%>;  // 성과 권한 체크
var v_selrow    = -1;             // 선택한 ROW 
var v_inChk     = 0;              // 확정여부

LoadPage();
selectcommit(1);
htm_title = '<%=htm_title%>';
</script>