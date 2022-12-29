<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 코드관리
'프로그램 ID  : macd_scr_1040.jsp
'프로그램 명  : KPI 상품레벨 관리
'프로그램개요 : KPI 상품레벨 관리
'작   성   자 : 하진영
'작   성   일 : 2011.01.
====================================================================
'수정자/수정일 :
'수정사유      :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "운영관리";
    String      leftmenu_name    = "코드관리"; 
    String      htm_title        = "KPI 상품레벨 관리"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
    DbResultSet rs               = null;
    DBProcCall     cp            = new DBProcCall();

    try
    {
    } catch(Exception e){
    }
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/macd/scr/macd_scr_1040.js"></script>
<script language="javascript">
  function deleteyn()
  {
	  if (confirm("정말 삭제 하시겠읍니까" )) {
		  return true;
	  } else {
		  return false;
	  }
  }

function mySheet_OnClick(Row,Col,Value) {
	
	if(mySheet.HeaderRows() * 1 >= Row * 1 + 1) return;
	
	f=document.frm;
	f.sgubuncode.value=mySheet.GetCellValue(Row,  5);           // 세분류코드
	f.sgubunname.value=mySheet.GetCellValue(Row,  6);           // 세분류명

	f.sbgubun.value=mySheet.GetCellValue(Row,  1); // 유효고객 대상상품여부
	sel_sbgubun();
	
	//f.smgubun.value = mySheet.GetCellValue(Row,  3);  // 신용카드 유효고객 대상상품여부
	document.all.image3.style.cursor="pointer" ;
	isMofyBtnEnable=true;
}

function hiddenGrid_OnSearchEnd(Code, Msg) {
    len = Msg.length

    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.basemonth);
            document.frm.basemonth.selectedIndex=0;
            sel_basemonth();
        }else if(Msg.substr(0,1) == "J"){
            if(Msg.substr(1,len)== "13"){
                ComboValue(document.frm.productgubun);
                sel_productgubun();
            }
        }else if(Msg.substr(0,1) == "G"){
            if(Msg.substr(1,len)== "1"){
                ComboValue(document.frm.bgubun);
                ComboValue(document.frm.sbgubun);
            }else if(Msg.substr(1,len)== "2"){
                ComboValue(document.frm.mgubun);
            }else if(Msg.substr(1,len)== "3"){
                ComboValue(document.frm.smgubun);
            }
        }else{
            alert(Msg);
        }
    }

    var sRow = mySheet.GetSelectRow();  
	f.smgubun.value = mySheet.GetCellValue(sRow,  3);  // 신용카드 유효고객 대상상품여부
}

function mySheet_OnSearchEnd(Code, Msg) {
    if (Msg != "" && isCud == false) showMsg(Code, Msg);
	isCud = false;
	
	// FindText(Col, SearchText, [StartRow], [FullMatch])
    var fRow = mySheet.FindText("세분류코드", f.sgubunname.value, "1", "2" );
    if (fRow > 0 )
    mySheet.SelectCell(fRow,0);
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
	    <td colspan="5"><select name="basemonth" class="select" onchange="sel_basemonth()"></select></td>
	    <td class="al_R end">
	    	<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
       		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
	    </td>
  	</tr>
  	<tr>
	    <th class="nobor">상품구분</th>
	    <td class="nobor"><select name="productgubun" class="select" onchange="sel_productgubun()"></select></td>
	    <th class="nobor">대분류</th>
	    <td class="nobor">
	    	<select name="bgubun" class="select" onchange="sel_bgubun()">
	    		<option value=999>전체</option>
	    	</select>
	    </td>
	    <th class="nobor">중분류</th>
	    <td class="nobor end" colspan="2">
	    	<select name="mgubun" class="select">
	    		<option value=999>전체</option>
	    	</select>
	    </td>
  	<tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
  	<tr>
	    <td>
	    	<div id="sheetObj"></div>
	    </td>
  	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR mgT5">
  	<tr>
	    <th class="wd10">세분류 코드</th>
	    <td>
	    	<input type="text" name="sgubuncode" readonly class="input_l" size="8">
	    	<input type="text" name="sgubunname" readonly class="input_l" size="40">
	    </td>
	    <td class="al_R end">
	    	<span class="btn_Grd" id="image3" border="0" onclick="javascript:doAction('변경');">변경</span>
	    </td>
  	</tr>
</table>
<table width="100%" border="0" cellspacing="0" class="tabletype2 pdLR">
  	<tr> 
	    <th class="wd10 nobor">대분류</th>
	    <td class="nobor">
	    	<select name="sbgubun" class="select" onchange="sel_sbgubun()">
	    		<option value=0>선택</option>
	    	</select>
	    </td>
	    <th class="wd10 nobor">중분류</th>
	    <td class="end nobor">
	    	<select name="smgubun" class="select">
	    		<option value=0>선택</option>
	    	</select>
	    </td>
  	</tr>
</table>
<div id="hiddenGridObj"></div>
      
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
LoadPage();
htm_title = '<%=htm_title%>';
</script>