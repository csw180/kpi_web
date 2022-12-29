<%--==============================================================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : 일일성과 보고서관리
'프로그램 ID  : dayjobcontrol.jsp
'프로그램 명  : 일일성과 보고서OPEN 설정
'프로그램개요 : 일일성과 보고서 관리
'작   성   자 : 조형석
'작   성   일 : 2013.03.14
==================================================================================================
'수정자/수정일/수정사유:하진영/2014.03.24: 비이자사업조회여부,고객관계조회여부 추가
=================================================================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%//@ page import="tpms.common.web.CommonWebKeys"%>
<%//@ page import="tpms.framework.component.util.JSPUtil"%>
<%//@ page import="tpms.framework.component.signon.SignOnUserAccount"%>
<%//@ page import="tpms.framework.component.error.ErrorHandler"%>
<%//@ page import="tpms.framework.component.dao.*"%>
<%@ include file="/module/jsp_header.inc"%>
<%  String topmenu_name  = "시스템관리"; 
    String leftmenu_name = "일일성과보고서관리"; 
    String htm_title     = "일일성과보고서관리"; 
    String actionname    = "";
    String haengwon_no   = "";
    Exception piex       = null;
    String strErrMsg     = "";
    String status        = "0";
    String monthbase     = "";
    String daybase       = "";
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript">
/*조회조건 에터키 이력시 조회*/
function check_Enter()
{
    alert(event.keyCode);
  if (event.keyCode==13) doAction("Search");
}
function LoadPage(){

	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "770px");
	
   	//지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:3 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"상태|삭제|작업기준일|삭제제외여부|예수금조회여부|대출금조회여부|연체율조회여부|RM권유계좌조회여부|RM예수금조회여부|RM대출금조회여부|신용카드조회여부|성과집계표조회여부|비이자사업조회여부|고객관계조회여부|전략사업조회여부", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Status",    Hidden:0, MinWidth:40,   Align:"Center",  SaveName:"sStatus" },
             {Type:"DelCheck",  Hidden:0, MinWidth:0,    Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  SaveName:"v_s1" },
             {Type:"CheckBox",  Hidden:0, MinWidth:110,  Align:"Center",  SaveName:"v_s2" },
             {Type:"CheckBox",  Hidden:0, MinWidth:110,  Align:"Center",  SaveName:"v_s3" },
             {Type:"CheckBox",  Hidden:0, MinWidth:110,  Align:"Center",  SaveName:"v_s4" },
             {Type:"CheckBox",  Hidden:0, MinWidth:110,  Align:"Center",  SaveName:"v_s5" },
             {Type:"CheckBox",  Hidden:0, MinWidth:110,  Align:"Center",  SaveName:"v_s6" },
             {Type:"CheckBox",  Hidden:0, MinWidth:110,  Align:"Center",  SaveName:"v_s7" },
             {Type:"CheckBox",  Hidden:0, MinWidth:110,  Align:"Center",  SaveName:"v_s8" },
             {Type:"CheckBox",  Hidden:0, MinWidth:110,  Align:"Center",  SaveName:"v_s9" },
             {Type:"CheckBox",  Hidden:0, MinWidth:110,  Align:"Center",  SaveName:"v_s10" },
             {Type:"CheckBox",  Hidden:0, MinWidth:110,  Align:"Center",  SaveName:"v_s11" },
             {Type:"CheckBox",  Hidden:0, MinWidth:110,  Align:"Center",  SaveName:"v_s12" },
             {Type:"CheckBox",  Hidden:0, MinWidth:110,  Align:"Center",  SaveName:"v_s13" } ];
    
   	mySheet.InitColumns(cols);
   	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(1);
   	mySheet.SetVisible(1);
   	newSetActionMenu(mySheet,"저장|삽입|복사|삭제|*-|엑셀전환");

	
	createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "750px", "400px");
	
   	//지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
   	hiddenGrid.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"", Align:"Center"} ];
   	hiddenGrid.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",      Hidden:1, MinWidth:40,   Align:"Center",  SaveName:"sStatus" } ];
    
   	hiddenGrid.InitColumns(cols);

   	hiddenGrid.SetEditable(1);
   	hiddenGrid.SetVisible(0);
   
  	doAction("조회");
}

/*Sheet 각종 처리*/
function doAction(sAction)
{
  switch(sAction)
  {
    case "고정필드설정":
    	mySheet.SetFrozenCol(mySheet.MouseCol());
    	ufSetMergeCell(mySheet);
    	break;
    case "고정필드해제":
    	mySheet.SetFrozenCol(0);
    	ufSetMergeCell(mySheet);
    	break;
    case "조회":      //조회
      mySheet.DoSearch("managesystem.dayjobcontrollist.screen?hidden_key=1"); 
      mySheet.FitSize(false, true);
      break;
    case "저장":        //저장
      mySheet.DoSave("managesystem.dayjobcontrollist.screen?hidden_key=2");
      break;
    case "삽입":      //입력
      var Row = mySheet.DataInsert();
      break;
    case "엑셀전환":  //엑셀내려받기
      inqText       = new Array();   
      // 보안등급세팅
      seqLevel = document.frm.Security_Level.value;  
      if(seqLevel !=null && seqLevel!='') {
          inqText[0]    = new Array();
          inqText[0][0] = "보안등급";
          inqText[0][1] = document.frm.Security_Level.value;
      }
      
      doExcel(mySheet, inqText, true); //common.js 활용하여 excel 출력
      break;
  }
}

function mySheet_OnSearchEnd(Code, Msg){
	showMsg(Code, Msg);
}

function hiddenGrid_OnSearchEnd(Code, Msg){
	showMsg(Code, Msg);
}

function mySheet_OnSelectMenu(MenuStr, Code) {
	doAction(MenuStr);
}

</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" class="tabletype4 pdLR">
  <tr>
    <td align="right">    
      <span class="btn_Grd" style="cursor:pointer" onclick="doAction('조회')">조회</span>
      <span class="btn_Grd" style="cursor:pointer" onclick="doAction('삽입');">추가</span>
   	  <span class="btn_Grd" style="cursor:pointer" onclick="doAction('저장');">저장</span>
   	  <span class="btn_Grd" style="cursor:pointer" onclick="doAction('엑셀전환');">엑셀</span>
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
</script>
