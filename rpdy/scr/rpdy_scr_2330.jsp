<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 -  RM(본부) 성과집계표 세부내역
'프로그램 ID  : rpdy_scr_2330.jsp
'프로그램 명  :  RM(본부) 성과집계표 세부내역
'프로그램개요 :  RM(본부) 성과집계표 세부내역
'작   성   자 : 이상용
'작   성   일 : 2021.03.09
====================================================================
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "일일성과보고서";
    String      leftmenu_name    = "성과집계표"; 
    String      htm_title        = "기업금융지점장 성과집계표 세부내역"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
    String      allRole          = "0";

    String role[] = kpi_rpt_account.getRole(); //권한

    for (int i = 0; i < role.length; i++) {
        if (role[i].trim().equals("450") || role[i].trim().equals("400")) {
           allRole="1";
           break;
        }
   
    } 
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpdy/scr/rpdy_scr_2330.js"></script>
<script language="javascript">

function mySheet_OnClick(Row,Col,Value){
	
}

function hiddenGrid_OnSearchEnd(Code, Msg){
	showUnitText("백만원,포인트,%");
    len = Msg.length;
    
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.baseday);
            document.frm.baseday.selectedIndex=0;
            selectmonth();
        }else if (Msg.substr(0,1) == "J"){
            if (Msg.substr(1,len) == "7"){
                ComboValue(document.frm.pgcode);
            }
            if (Msg.substr(1,len) == "49"){
                ComboValue(document.frm.metrogb);
            }
        }else{
        	showMsg(Code, Msg);
        }
    }
}

function metrogbhiddenGrid_OnSearchEnd(Code, Msg){
	showUnitText("백만원,포인트,%");
    len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "J"){
            if (Msg.substr(1,len) == "49"){
                ComboValue1(document.frm.metrogb);
            }
        }else{
        	showMsg(Code, Msg);
        }
    }
}

function hiddGridmon_OnSearchEnd(Code, Msg){
	showUnitText("백만원,포인트,%");
	baseday     = document.frm.baseday.value;
	
	// 기준일자 정보
    if(isRoleEnable == '1') {
    	 // 전산정보부 및 성과 담당자
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2330.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=98");
    } else {
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2330.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=99");
    }
}

function mySheet_OnSearchEnd(Code, Msg){
	showUnitText("백만원,포인트,%");
	showMsg(Code, Msg);
}    

function mySheet_OnSelectMenu(sAction){
 
	doAction(sAction);
}

function mySheet_OnDownFinish(downloadType, result) {
	if(result) {
	    
	    var baseday     = document.frm.baseday.value;
	    var pgcode      = document.frm.pgcode.value;
	    var metrogb     = document.frm.metrogb.value;
	    
        condition="기준일="+baseday+";PG코드="+pgcode+";광역금융본부="+metrogb;
        
	    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition));
	}
	
}

function mySheet_OnSearchEnd(Code, Msg){
	showUnitText("백만원,포인트,%");	    
	//if (document.frm.baseday.value >= '20210701') {		    
	//	
	//	// 123145.1 형식으로 넘어온 대출금 RMC 목적금액, 3자리 콤마 숫자로 변경  셋팅	
	//	var newVar;
	//	var spiltStr;
	//	var rtrVal;		
	//			
	//	for(var i=2; i<=3; i++)
	//	{
	//		newVar = mySheet.CellValue(i, 34);
	//		//newVar = "123456789123.9";
  //    spiltStr = newVar.split(".");		
  //    rtrVal = Format_Comma(spiltStr[0])+"."+spiltStr[1];				
  //    
  //    //alert(rtrVal);  
  //    
  //    mySheet.CellValue(i, 34) = rtrVal;          //콤마(,) 데이터 셋팅    
  //    mySheet.CellAlign(i, 34) = daRight;         //정렬 설정
	//	}		 		
	//}    
	
	//금융본부이름 부분 가로 강제 머지
	mySheet.SetMergeCell(2, 1, 1, 6);     //row index, col index, row크기, col크기	   
	mySheet.SetMergeCell(3, 1, 1, 6);     //row index, col index, row크기, col크기	 	

}         
</script> 	

<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <tr> 
    <th>기준일</th>
    <td>
     <select name="baseday" class="select" onchange="selectmonth()"></select>
    </td>
    <th>Peer Group</th>
    <td><select name="pgcode" onchange="selectpgcode()"><option value="0">전체</option></select></td>
    <th>광역금융본부</th>
    <td>
     <select name="metrogb" onchange="allDelDataGrid(mySheet);showUnitText('백만원,포인트,%');"><option value="0">전체</option></select></td>
    <td align="right" class="end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
   	  <span class="btn_Grd" style="cursor:pointer; display:none;" id="print" border="0" onclick="javascript:doPrint();">인쇄</span>
    </td>
  </tr>
  <tr style="display:none;">
    <th class="nobor">세부내역</th>
    <td class="nobor end" colspan="7"> <input type="checkbox" name="subChk" checked disabled="true"><!-- onclick="javascript:selectsubchk();" --> </td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
    <tr>
        <td style="PADDING-TOP:5px; PADDING-LEFT:8px; FONT-SIZE:12px; FONT-WEIGHT:bold; COLOR:#800000;" > ※ 일일성과보고서는 <u>평가 조정사항</u>이 모두 반영되어 있지 않으므로 실제 평가실적과 다를 수 있습니다. </td>
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
<div id="mtrhiddenGridObj"></div>
<div id="hiddGridmonObj"></div>
      
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
  isRoleEnable = '<%=allRole%>';
  //if(isRoleEnable == '1') butt2.style.display = "";
  LoadPage();
  htm_title = '<%=htm_title%>';
</script>
