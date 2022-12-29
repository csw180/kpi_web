<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 테이터입력
'프로그램 ID  : main_scr_1330.jsp
'프로그램 명  : 타지점실적고객 등록
'프로그램개요 : 타지점실적고객 등록
'작   성   자 : 하진영
'작   성   일 : 2013.05.29
====================================================================
'수정자/수정일     : 수정사유      :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "운영관리";
    String      leftmenu_name    = "코드관리"; 
    String      htm_title        = "타지점실적고객 등록"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/main/scr/main_scr_1330.js"></script>

<script language="javascript">

function mySheet_OnClick(Row,Col,Value) {
	
	if(mySheet.HeaderRows() * 1 >= Row * 1 + 1) return;
	
    document.frm.customerno.value      = mySheet.GetCellValue(Row,  0);        // 고객번호
    document.frm.customername.value    = mySheet.GetCellValue(Row,  1);        // 고객명
    document.frm.jumcode.value         = mySheet.GetCellValue(Row,  2);        // 계좌관리점
    document.frm.jumname.value         = mySheet.GetCellValue(Row,  3);        // 계좌관리점명
    document.frm.manjumcode.value      = mySheet.GetCellValue(Row,  4);        // 성과관리점
    document.frm.manjumname.value      = mySheet.GetCellValue(Row,  5);        // 성과관리점명
    document.frm.period.value          = mySheet.GetCellValue(Row,  6);        // 성과관리점인정비율
    document.frm.adjgubuncode.value    = mySheet.GetCellValue(Row,  7);        // 타지점대상구분코드

    document.all.image2.style.cursor = "" ;
    document.all.image3.style.cursor = "pointer" ;
    document.all.image4.style.cursor = "pointer" ;
    isInstBtnEnable = false;
    isMofyBtnEnable = true;
    isDelBrnEnable  = true;
}
    
function mySheet_OnSearchEnd(Code, Msg) {
    if (Msg != "" && isCud == false) showMsg(Code, Msg);
	isCud = false;
	
	if (isMode == "C") {
        mySheet.SelectCell(1, "계좌관리점");
	} else if (isMode == "U") {
		var fRow = mySheet.FindText("고객번호", document.frm.customerno.value, 1, 0 );
        if (fRow > 0 ) mySheet.SelectCell(fRow, "고객번호");
    } else if (isMode == "D") {
        document.frm.reset();
    }
}    

function hiddenGrid_OnSearchEnd(Code, Msg) {
    len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            document.frm.basemonth.value=hiddenGrid.GetCellValue(1,0);
            selectAdjgubun();
        }else if(Msg.substr(0,1) == "C"){
            if(Msg.substr(1,len)== "1"){
                if(jumgubun==1) document.frm.jumname.value = hiddenGrid.GetCellValue(1,  0);        // 계좌점명
                else            document.frm.manjumname.value = hiddenGrid.GetCellValue(1,  0);        // 관리점명
            }
        }else if(Msg.substr(0,1) == "J"){
                if(Msg.substr(1,len)== "55"){
                ComboValue(document.frm.adjgubuncode);  //대상구분
            }
        }else{
            if(ErrMsg=="tpms.framework.component.dao.DAOException: 21")
                ErrMsg = "데이터 중복 입니다.확인하세요";
            alert(ErrMsg);
        }
    }
    
    if (isMode == "C" || isMode == "U" || isMode == "D") {
	    mySheet.DoSearch("main.scr.main_scr_1331.do?hidden_key=9");
    }
}

function hiddenGrid1_OnSearchEnd(Code, Msg) {
    len = Msg.length;
    if (len > 0){
        if(Msg.substr(0,1) == "C"){
            document.frm.customername.value = hiddenGrid1.GetCellValue(1, 0);            
            if(document.frm.customername.value.substr(0,2) == "조회") {
             	alert("고객번호를 확인하세요");
               	document.frm.customerno.value = "";
               	document.frm.customername.value = "";
            }
        }else{
            if(ErrMsg=="tpms.framework.component.dao.DAOException: 21")
                ErrMsg = "데이터 중복 입니다.확인하세요";
            alert(ErrMsg);
        }
    }
}

function mySheet_OnSelectMenu(sAction) {
    doAction(sAction);
}

function mySheet_OnSaveEnd(Code, Msg) {
	showMsg(Code, Msg);     
}    
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgB5">
  	<input type="hidden" name="basemonth">
  	<tr> 
    	<td width="100%" class="al_R topB">
    		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
    	</td>
  	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR">
  	<tr>
    	<td>
       		<div id="sheetObj"></div>
    	</td>
  	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
  	<tr>
    	<td width="100%" class="al_R">
    		<span class="btn_Grd" id="image1" style="cursor:pointer" border="0" onclick="javascript:doAction('초기화');">초기화</span>
      		<span class="btn_Grd" id="image2" style="cursor:pointer" border="0" onclick="javascript:doAction('등록');">등록</span>
      		<span class="btn_Grd" id="image3" style="cursor:pointer" border="0" onclick="javascript:doAction('변경');">변경</span>
      		<span class="btn_Grd" id="image4" style="cursor:pointer" border="0" onclick="javascript:doAction('삭제');">삭제</span>
      		
    	</td>
  	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR mgT5">
	
  	<tr> 
	    <th>고객번호</th>
	    <td colspan="3" class="end">
	    	<input type="text" class="input_l" onchange="selectCostomerno()" name="customerno" size="10" onkeyup="chk_num()">
	      	<a href="javascript:popupCustomerCode(0)"><img src="/kpi/img/sky/butt_search_s.gif" border="0" align="absmiddle"></a>
	      	<input type="text" class="input_l" readonly name="customername" size="20">
		</td>	      	
  	</tr>
	<tr>
	    <th class="nobor">계좌관리점</th>
	    <td class="nobor">
	    	<input type="text" class="input_l" onchange="selectjumname(1)" name="jumcode" size="10"  maxlength="4" onkeyup="chk_num()">
	      	<a href="javascript:popupJumCode(0)"><img src="/kpi/img/sky/butt_search_s.gif" border="0" align="absmiddle"></a>
	      	<input type="text" class="input_l" readonly name="jumname" size="30">
	  	</td>
	    <th class="nobor wd10">타지점 대상구분</th>
	    <td class="nobor end">
	    	<select name="adjgubuncode" class="select">
	    		<option>선택</option>
	    	</select>
	    </td>  
	</tr>
	<tr>
	    <th class="nobor">성과관리점</th>
	    <td class="nobor">
	    	<input type="text" class="input_l" onchange="selectjumname(2)" name="manjumcode" size="10" maxlength="4" onkeyup="chk_num()">
	      	<a href="javascript:popupJumCode(999)"><img src="/kpi/img/sky/butt_search_s.gif" border="0" align="absmiddle"></a>
	      	<input type="text" class="input_l" readonly name="manjumname" size="30"></td>
	    <th class="nobor">성과관리점 인정비율(%)</th>
	    <td align="left" class="nobor end"><input type="text" name="period" size="5" maxlength="5" class="input_l" onBlur="javascript:dotchk();" onKeyUp="javascript:percOnly(this,document.frm,true);">&nbsp;&nbsp;&nbsp;ex)123.12</td>
	</tr>
</table>

<div id="hiddenGridObj"></div>      
<div id="hiddenGridObj1"></div>      
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
LoadPage()
htm_title = '<%=htm_title%>';
</script>