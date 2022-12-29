<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 코드관리
'프로그램 ID  : macd_scr_1010.jsp
'프로그램 명  : KPI 코드 관리
'프로그램개요 : KPI코드 등록/수정
'작   성   자 : 하진영
'작   성   일 : 2011.01.
====================================================================
'수정자/수정일/수정사유 : 하진영/20180122/ 상하한점수 음수입력가능하도록 변경
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "운영관리";
    String      leftmenu_name    = "코드관리"; 
    String      htm_title        = "KPI 코드 관리"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript"  src="/kpi/macd/scr/macd_scr_1010.js"></script>
<script language="javascript">
function deleteyn()
{
	if (confirm("정말 삭제 하시겠습니까")) {
		return true;    	  
    } else {
  	  	return false;  
    }
}

function mySheet_OnClick(Row,Col,Value) {
	
	if(mySheet.HeaderRows() * 1 >= Row * 1 + 1) return;
	
    document.frm.basemonth.value      = mySheet.GetCellValue(Row,  0);            // 작업기준년월
    document.frm.kpicode.value        = mySheet.GetCellValue(Row,  1);            // KPI코드
    document.frm.kpiname.value        = mySheet.GetCellValue(Row,  2);            // KPI명
    document.frm.kpicontents.value    = mySheet.GetCellValue(Row,  3);            // KPI정의내용
    document.frm.kpigubun.value       = mySheet.GetCellValue(Row, 20);            // KPI구분코드
    document.frm.resultgubun.value    = mySheet.GetCellValue(Row, 21);            // 성과관리구분코드
    document.frm.outputseq.value      = mySheet.GetCellValue(Row,  6);            // 출력순서
    document.frm.useyn.value          = mySheet.GetCellValue(Row,  7)=="Y"? 1:0;  // 사용여부
    document.frm.ratingperiod.value   = mySheet.GetCellValue(Row, 22);            // 평가주기코드
    document.frm.topposition.value    = mySheet.GetCellValue(Row,  9);            // 상한점수
    document.frm.lowposition.value    = mySheet.GetCellValue(Row, 10);            // 하한점수
    document.frm.stdscore.value       = mySheet.GetCellValue(Row, 11);            // 기준점수
    document.frm.objectyn.value       = mySheet.GetCellValue(Row, 12)=="Y"? 1:0;  // 목표부여여부
    document.frm.objectcourse.value   = mySheet.GetCellValue(Row, 23);            // 목표방향코드
    document.frm.updownyn.value       = mySheet.GetCellValue(Row, 13)=="Y"? 1:0;  // 상하향지표여부
    document.frm.typecode.value       = mySheet.GetCellValue(Row, 24);            // 점수화유형코드
    document.frm.dpoint.value         = mySheet.GetCellValue(Row, 16);            // 소숫점자리수
	
    document.frm.kpicode.disabled    = true;
    document.all.image2.style.cursor = "" ;
    document.all.image3.style.cursor = "pointer" ;
    document.all.image4.style.cursor = "pointer" ;
    isInstBtnEnable = false;
    isMofyBtnEnable = true;
    isDelBrnEnable  = true;
}

function hiddenGrid_OnSearchEnd(Code, Msg) {
    len = Msg.length;
    
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.basemonth);
            document.frm.basemonth.selectedIndex=0;
            sel_basemonth();
        } else if (Msg.substr(0,1) == "J"){
            if(Msg.substr(1,len)== "22"){
                ComboValue(document.frm.resultgubun);
            }else if(Msg.substr(1,len)== "10"){
                ComboValue(document.frm.kpigubun);
            }else if(Msg.substr(1,len)== "23"){
                ComboValue(document.frm.ratingperiod);
            }else if(Msg.substr(1,len)== "24"){
                ComboValue(document.frm.objectcourse);
            }else if(Msg.substr(1,len)== "16"){
                ComboValue(document.frm.typecode);
            }
        }else{
            alert(Msg);
        }
    }
}

function mySheet_OnSearchEnd(Code, Msg) {
	showUnitText("점수, 자릿수");
	
    if (Msg != "" && isCud == false) showMsg(Code, Msg);
    
 	// FindText(Col, SearchText, [StartRow], [FullMatch])
    var fRow = mySheet.FindText("KPI코드", document.frm.kpicode.value, 1, 0 );
    if (fRow > 0 )
    mySheet.SelectCell(fRow, "KPI코드");
    
	isCud = false;
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
	    <th>컬럼명</th>
	    <td>
	     	<select name="v_columnname" onchange="javascript:changedColumnName();" class="select">
	        	<option value="TOT">전체</option>
	            <option value="KPI코드">KPI코드</option>
	            <option value="KPI명">KPI명</option>
			</select>
	       	<input type="text" name="v_searchcont" size="15" readOnly class="input_l">
		</td>
	    <td class="al_R end">
	    	<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
	    	<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
	      	<%--<img src="/kpi/img/sky/butt_upload.jpg"  border="0" onclick="javascript:doAction('엑셀올리기');"   style="cursor:pointer" name="btn_upload">--%>
	      	
	      	<%--<img src="/kpi/img/sky/butt_save.gif"   border="0" style="cursor:pointer" onclick="javascript:doAction('저장');">--%>
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
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
  	<tr> 
	    <td class="al_R end">
	    	<span class="btn_Grd"  id="image1" style="cursor:pointer" border="0" onclick="javascript:doAction('초기화');">초기화</span>
       		<span class="btn_Grd" id="image2" style="cursor:pointer" border="0" onclick="javascript:doAction('등록');">등록</span>
       		<span class="btn_Grd" id="image3" style="cursor:pointer" border="0" onclick="javascript:doAction('변경');">변경</span>
       		<span class="btn_Grd" id="image4" style="cursor:pointer" border="0" onclick="javascript:doAction('삭제');">삭제</span>
	    </td>
  	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR mgT5">

    <tr>
      	<th>성과관리구분</th>
      	<td><select name="resultgubun" class="select">
      			<option>선택</option>
      		</select>
      	</td>
      	<th>KPI구분</th>
      	<td class="end">
      		<select name="kpigubun" class="select">
      			<option>선택</option>
      		</select>
      	</td>
    </tr>
    <tr>
      	<th class="nobor">KPI코드</th>
      	<td class="nobor"><input type="text" name="kpicode" class="input_l" size="10" maxlength="5" onkeyup="chk_num()"></td>
      	<th class="nobor">KPI명</th>
      	<td class="nobor end"><input type="text" name="kpiname" class="input_l" size="30" maxlength="50"></td>
    </tr>
    <tr>
      	<th class="nobor">KPI정의내용</th>
      	<td class="nobor end" colspan="3"><input type="text" name="kpicontents" class="input_l" size="80" maxlength="100"></td>
    </tr>
    <tr>
      	<th class="nobor">출력순서</th>
      	<td class="nobor"><input type="text" name="outputseq" class="input_l" size="30" maxlength="50" onkeyup="chk_num()"></td>
      	<th class="nobor">평가주기</th>
      	<td class="nobor end">
      		<select name="ratingperiod" class="select">
      			<option>선택</option>
      		</select>
      	</td>
    </tr>
    <tr>
      	<th class="nobor">상한점수</th>
      	<td class="nobor"><input type="text" name="topposition" class="input_l" size="20" maxlength="5" onkeyup="chk_numF()"></td>
      	<th class="nobor">하한점수</th>
      	<td class="nobor end"><input type="text" name="lowposition" class="input_l" size="20" maxlength="5" onkeyup="chk_numF()"></td>
    </tr>
    <tr>
      	<th class="nobor">목표부여여부</th>
      	<td class="nobor">
      		<select name="objectyn" class="select">
      			<option>선택</option>
      			<option value="1">Y</option>
      			<option value="0">N</option>
      		</select>
      	</td>
      	<th class="nobor">목표방향</th>
      	<td class="nobor end">
      		<select name="objectcourse" class="select">
      			<option>선택</option>
      		</select>
      	</td>
    </tr>
    <tr>
      	<th class="nobor">상하향지표여부</th>
      	<td class="nobor">
      		<select name="updownyn" class="select">
      			<option>선택</option>
      			<option value="1">Y</option>
      			<option value="0">N</option>
      		</select>
      	</td>
      	<th class="nobor">점수화유형코드</th>
      	<td class="nobor end">
      		<select name="typecode" class="select">
      			<option>선택</option>
      		</select>
      	</td>
    </tr>
    <tr>
      	<th class="nobor">기준점수</th>
      	<td class="nobor"><input type="text" name="stdscore" class="input_l" size="20" maxlength="5" onkeyup="chk_num()"></td>
      	<th class="nobor">소숫점자리수</th>
      	<td class="nobor end"><input type="text" name="dpoint" class="input_l" size="1" maxlength="1" onkeyup="chk_num()"></td>
    </tr>
    <tr>
      	<th class="nobor">사용여부</th>
      	<td class="nobor end" colspan="3">
      		<select name="useyn" class="select">
      			<option>선택</option>
      			<option value="1">Y</option>
      			<option value="0">N</option>
      		</select>
      	</td>
    </tr>
</table>
<div id="hiddenGridObj"></div>
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
LoadPage();
htm_title = '<%=htm_title%>';

$(document).ready(function() {
	document.frm.kpicode.disabled    = true;
	document.all.image2.style.cursor = "" ;
	document.all.image3.style.cursor = "pointer" ;
	document.all.image4.style.cursor = "pointer" ;
	isInstBtnEnable = false;
	isMofyBtnEnable = true;
	isDelBrnEnable  = true;	
});
</script>
