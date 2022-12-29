<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 일일성과보고서 - 카드사업
'프로그램 ID  : rpdy_scr_1080.jsp
'프로그램 명  : 카드사업
'프로그램개요 : 카드사업
'작   성   자 : 조형석
'작   성   일 : 2009.07.15
====================================================================
'수정자/수정일/수정사유: 조형석/2011.05.20/Nextro 대응 수정
'수정자/수정일/수정사유: 박아란/2014.03.25/2014년 기준반영
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "일일성과보고서";
    String      leftmenu_name    = "비이자사업"; 
    String      htm_title        = "일일 카드사업실적"; 
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
<script language="javascript" src="/kpi/rpdy/scr/rpdy_scr_1080.js"></script>
<Script language="javascript">

function hiddenGrid_OnSearchEnd(Code, Msg){
	showUnitText(strUnitText);
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
        }else if (Msg.substr(0,1) == "C"){
            ComboValue(document.frm.productcode);
        }else{
        	showMsg(Code, Msg);
        }
    }
}

function mySheet_OnDownFinish(downloadType, result) {
	if(result) {
	    
	    var baseday     = document.frm.baseday.value;
	    var pgcode      = document.frm.pgcode.value;
	    var metrogb     = document.frm.metrogb.value;
	    
	 	// 엑셀다운로드시 로그 저장
        condition="기준일="+baseday+";PG코드="+pgcode+";광역금융본부="+metrogb;
	    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition));
	}
	
}

function metrogbhiddenGrid_OnSearchEnd(Code, Msg){
	showUnitText(strUnitText);
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

function mySheet_OnSearchEnd(Code, Msg){
	showUnitText(strUnitText);
	
	mySheet.SetSumValue(0,"합 계");
	mySheet.SetCellAlign(mySheet.HeaderRows(),0,"Center");
	//합계행 병합
	mySheet.SetMergeCell (mySheet.HeaderRows(), 0, 1,3);
	
	if (document.frm.baseday.value >= '20220701') {
		
		mySheet.SetCellValue(mySheet.HeaderRows(), 11,(mySheet.GetCellValue(mySheet.HeaderRows(), 9)  / mySheet.GetCellValue(mySheet.HeaderRows(), 10)  * 100).toFixed(1),0);  // 전체매출액
		mySheet.SetCellValue(mySheet.HeaderRows(), 19,(mySheet.GetCellValue(mySheet.HeaderRows(), 17) / mySheet.GetCellValue(mySheet.HeaderRows(), 18) * 100).toFixed(1),0);  // 유효회원
        
	} else if (document.frm.baseday.value >= '20220101') {
		
		mySheet.SetCellValue(mySheet.HeaderRows(), 11,(mySheet.GetCellValue(mySheet.HeaderRows(), 9)  / mySheet.GetCellValue(mySheet.HeaderRows(), 10)  * 100).toFixed(1),0);  // 전체매출액
		mySheet.SetCellValue(mySheet.HeaderRows(), 16,(mySheet.GetCellValue(mySheet.HeaderRows(), 14) / mySheet.GetCellValue(mySheet.HeaderRows(), 15) * 100).toFixed(1),0);  // 신규유효회원
        
	} else if (document.frm.baseday.value >= '20210701') {
		
		mySheet.SetCellValue(mySheet.HeaderRows(), 11,(mySheet.GetCellValue(mySheet.HeaderRows(), 9)  / mySheet.GetCellValue(mySheet.HeaderRows(), 10)  * 100).toFixed(1),0);  // 전체매출액
		mySheet.SetCellValue(mySheet.HeaderRows(), 18,(mySheet.GetCellValue(mySheet.HeaderRows(), 16) / mySheet.GetCellValue(mySheet.HeaderRows(), 17) * 100).toFixed(1),0);  // 신규유효회원
        
	} else if (document.frm.baseday.value >= '20210101') {
		
		mySheet.SetCellValue(mySheet.HeaderRows(), 11,(mySheet.GetCellValue(mySheet.HeaderRows(), 9)  / mySheet.GetCellValue(mySheet.HeaderRows(), 10)  * 100).toFixed(1),0);  // 전체매출액
		mySheet.SetCellValue(mySheet.HeaderRows(), 19,(mySheet.GetCellValue(mySheet.HeaderRows(), 17) / mySheet.GetCellValue(mySheet.HeaderRows(), 18) * 100).toFixed(1),0);  // 신규유효회원
        
	} else if (document.frm.baseday.value >= '20200701') {
	
		mySheet.SetCellValue(mySheet.HeaderRows(), 9,(mySheet.GetCellValue(mySheet.HeaderRows(), 7)  / mySheet.GetCellValue(mySheet.HeaderRows(), 8)  * 100).toFixed(1),0);// 매출액_달성률
		mySheet.SetCellValue(mySheet.HeaderRows(), 16,(mySheet.GetCellValue(mySheet.HeaderRows(), 14) / mySheet.GetCellValue(mySheet.HeaderRows(), 15) * 100).toFixed(1),0);// 신규유효회원수_달성률
	    
	} else if (document.frm.baseday.value >= '20200101') {
	
		mySheet.SetCellValue(mySheet.HeaderRows(), 9,(mySheet.GetCellValue(mySheet.HeaderRows(), 7) / mySheet.GetCellValue(mySheet.HeaderRows(), 8) * 100).toFixed(1),0);// 매출액_달성률
		mySheet.SetCellValue(mySheet.HeaderRows(), 15,(mySheet.GetCellValue(mySheet.HeaderRows(), 13) / mySheet.GetCellValue(mySheet.HeaderRows(), 14) * 100).toFixed(1),0);// 신규유효회원수_달성률
	    
	} else if (document.frm.baseday.value >= '20180701') {
		
		if (document.frm.pgcode.value == '16') { // RMC
			mySheet.SetCellValue(mySheet.HeaderRows(), 7,(mySheet.GetCellValue(mySheet.HeaderRows(), 6) / mySheet.GetCellValue(mySheet.HeaderRows(), 3) * 100).toFixed(1),0);
		
		} else {                                 // 영업점		
			mySheet.SetCellValue(mySheet.HeaderRows(), 7,(mySheet.GetCellValue(mySheet.HeaderRows(), 6) / mySheet.GetCellValue(mySheet.HeaderRows(), 3) * 100).toFixed(1),0);
			mySheet.SetCellValue(mySheet.HeaderRows(),10,(mySheet.GetCellValue(mySheet.HeaderRows(), 9) / mySheet.GetCellValue(mySheet.HeaderRows(), 8) * 100).toFixed(1),0);
	         
		}
	} else if (document.frm.baseday.value >= '20170101') {
		mySheet.SetCellValue(mySheet.HeaderRows(), 7,(mySheet.GetCellValue(mySheet.HeaderRows(), 6) / mySheet.GetCellValue(mySheet.HeaderRows(), 3) * 100).toFixed(1),0);
		mySheet.SetCellValue(mySheet.HeaderRows(),10,(mySheet.GetCellValue(mySheet.HeaderRows(), 9) / mySheet.GetCellValue(mySheet.HeaderRows(), 8) * 100).toFixed(1),0);
		mySheet.SetCellValue(mySheet.HeaderRows(),13,(mySheet.GetCellValue(mySheet.HeaderRows(),12) / mySheet.GetCellValue(mySheet.HeaderRows(),11) * 100).toFixed(1),0);
	
	} else if (document.frm.baseday.value >= '20160701') {
		mySheet.SetCellValue(mySheet.HeaderRows(), 5,(mySheet.GetCellValue(mySheet.HeaderRows(), 4) / mySheet.GetCellValue(mySheet.HeaderRows(), 3) * 100).toFixed(1),0);
		mySheet.SetCellValue(mySheet.HeaderRows(), 8,(mySheet.GetCellValue(mySheet.HeaderRows(), 7) / mySheet.GetCellValue(mySheet.HeaderRows(), 6) * 100).toFixed(1),0);
		mySheet.SetCellValue(mySheet.HeaderRows(),11,(mySheet.GetCellValue(mySheet.HeaderRows(),10) / mySheet.GetCellValue(mySheet.HeaderRows(), 9) * 100).toFixed(1),0);
	
	} else if (document.frm.baseday.value >= '20160101') {
		mySheet.SetCellValue(mySheet.HeaderRows(), 5,(mySheet.GetCellValue(mySheet.HeaderRows(), 4) / mySheet.GetCellValue(mySheet.HeaderRows(), 3) * 100).toFixed(1),0);
		mySheet.SetCellValue(mySheet.HeaderRows(), 8,(mySheet.GetCellValue(mySheet.HeaderRows(), 7) / mySheet.GetCellValue(mySheet.HeaderRows(), 6) * 100).toFixed(1),0);
		mySheet.SetCellValue(mySheet.HeaderRows(),11,(mySheet.GetCellValue(mySheet.HeaderRows(),10) / mySheet.GetCellValue(mySheet.HeaderRows(), 9) * 100).toFixed(1),0);
		mySheet.SetCellValue(mySheet.HeaderRows(),14,(mySheet.GetCellValue(mySheet.HeaderRows(),13) / mySheet.GetCellValue(mySheet.HeaderRows(),12) * 100).toFixed(1),0);
	    
	} else if (document.frm.baseday.value >= '20150701') {
		mySheet.SetCellValue(mySheet.HeaderRows(),5,(mySheet.GetCellValue(mySheet.HeaderRows(),4) / mySheet.GetCellValue(mySheet.HeaderRows(), 3) * 100).toFixed(1),0);
		mySheet.SetCellValue(mySheet.HeaderRows(),8,(mySheet.GetCellValue(mySheet.HeaderRows(),7) / mySheet.GetCellValue(mySheet.HeaderRows(), 6) * 100).toFixed(1),0);
	    
	} else {
		mySheet.SetCellValue(mySheet.HeaderRows(),5,(mySheet.GetCellValue(mySheet.HeaderRows(),4) / mySheet.GetCellValue(mySheet.HeaderRows(), 3) * 100).toFixed(1),0);
	}
	
	showMsg(Code, Msg);
}

function hiddGridmon_OnSearchEnd(Code, Msg){
	
	baseday   = document.frm.baseday.value;

	// 기준일자 정보
    if(isRoleEnable == '1') {
     // 전산정보부 및 성과 담당자
     hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_1080.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=98");
    } else {
     hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_1080.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=99");
    }
}

function mySheet_OnSelectMenu(sAction){
 
	doAction(sAction);
}

/* 무한루프 Onsearchend로 변경
 function mySheet_OnChangeSum(Row){
	
	if (document.frm.baseday.value >= '20210701') {
		
		mySheet.SetCellValue(Row, 11,mySheet.GetCellValue(Row, 9)  / mySheet.GetCellValue(Row, 10)  * 100 ,0);// 전체매출액
		mySheet.SetCellValue(Row, 18,mySheet.GetCellValue(Row, 16) / mySheet.GetCellValue(Row, 17) * 100 ,0);// 신규유효회원
		     
		if (document.frm.baseday.value >= '20200701') {
		
			mySheet.SetCellValue(Row, 11,mySheet.GetCellValue(Row, 9)  / mySheet.GetCellValue(Row, 10)  * 100 ,0);// 전체매출액
			mySheet.SetCellValue(Row, 19,mySheet.GetCellValue(Row, 17) / mySheet.GetCellValue(Row, 18) * 100 ,0);// 신규신용매출액
		    
		} else if (document.frm.baseday.value >= '20200701') {
		
			mySheet.SetCellValue(Row, 9,mySheet.GetCellValue(Row, 7)  / mySheet.GetCellValue(Row, 8)  * 100 ,0);// 매출액_달성률
			mySheet.SetCellValue(Row, 16,mySheet.GetCellValue(Row, 14) / mySheet.GetCellValue(Row, 15) * 100 ,0);// 신규유효회원수_달성률
		    
		} else if (document.frm.baseday.value >= '20200101') {
		
			mySheet.SetCellValue(Row, 9,mySheet.GetCellValue(Row, 7) / mySheet.GetCellValue(Row, 8) * 100 ,0);// 매출액_달성률
			mySheet.SetCellValue(Row, 15,mySheet.GetCellValue(Row, 13) / mySheet.GetCellValue(Row, 14) * 100 ,0);// 신규유효회원수_달성률
		    
		} else if (document.frm.baseday.value >= '20180701') {
			
			if (document.frm.pgcode.value == '16') { // RMC
				mySheet.SetCellValue(Row, 7,mySheet.GetCellValue(Row, 6) / mySheet.GetCellValue(Row, 3) * 100 ,0);
			
			} else {                                 // 영업점		
				mySheet.SetCellValue(Row, 7,mySheet.GetCellValue(Row, 6) / mySheet.GetCellValue(Row, 3) * 100 ,0);
				mySheet.SetCellValue(Row,10,mySheet.GetCellValue(Row, 9) / mySheet.GetCellValue(Row, 8) * 100 ,0);
		         
			}
		} else if (document.frm.baseday.value >= '20170101') {
			mySheet.SetCellValue(Row, 7,mySheet.GetCellValue(Row, 6) / mySheet.GetCellValue(Row, 3) * 100 ,0);
			mySheet.SetCellValue(Row,10,mySheet.GetCellValue(Row, 9) / mySheet.GetCellValue(Row, 8) * 100 ,0);
			mySheet.SetCellValue(Row,13,mySheet.GetCellValue(Row,12) / mySheet.GetCellValue(Row,11) * 100 ,0);
		
		} else if (document.frm.baseday.value >= '20160701') {
			mySheet.SetCellValue(Row, 5,mySheet.GetCellValue(Row, 4) / mySheet.GetCellValue(Row, 3) * 100 ,0);
			mySheet.SetCellValue(Row, 8,mySheet.GetCellValue(Row, 7) / mySheet.GetCellValue(Row, 6) * 100 ,0);
			mySheet.SetCellValue(Row,11,mySheet.GetCellValue(Row,10) / mySheet.GetCellValue(Row, 9) * 100 ,0);

		} else if (document.frm.baseday.value >= '20160101') {
			mySheet.SetCellValue(Row, 5,mySheet.GetCellValue(Row, 4) / mySheet.GetCellValue(Row, 3) * 100 ,0);
			mySheet.SetCellValue(Row, 8,mySheet.GetCellValue(Row, 7) / mySheet.GetCellValue(Row, 6) * 100 ,0);
			mySheet.SetCellValue(Row,11,mySheet.GetCellValue(Row,10) / mySheet.GetCellValue(Row, 9) * 100 ,0);
			mySheet.SetCellValue(Row,14,mySheet.GetCellValue(Row,13) / mySheet.GetCellValue(Row,12) * 100 ,0);
		    
		} else if (document.frm.baseday.value >= '20150701') {
			mySheet.SetCellValue(Row,5,mySheet.GetCellValue(Row,4) / mySheet.GetCellValue(Row, 3) * 100 ,0);
			mySheet.SetCellValue(Row,8,mySheet.GetCellValue(Row,7) / mySheet.GetCellValue(Row, 6) * 100 ,0);
		    
		} 
	}else {
			mySheet.SetCellValue(Row,5,mySheet.GetCellValue(Row,4) / mySheet.GetCellValue(Row, 3) * 100);
		}

}  */        

</script> 

<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <tr> 
    <th>기준일</th>
    <td>
     <select name="baseday" id="baseday" class="select" onchange="selectmonth()"></select>
    </td>
    <th>Peer Group</th>
    <td><select name="pgcode" id="pgcode" onchange="selectpgcode()">
        	<option value="0">전체</option>
        </select>
    </td>
    <th>광역금융본부</th>
    <td>
	     <select name="metrogb" onchange="allDelDataGrid(mySheet);showUnitText(strUnitText);">
	     	<option value="0">전체</option>
	     </select>
    </td>
    <td align="right" class="end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
   	  <span class="btn_Grd" style="cursor:pointer; display:none;" id="print" border="0" onclick="javascript:doPrint();">인쇄</span>
    </td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
    <tr>
        <td style="PADDING-TOP:5px; PADDING-LEFT:8px; FONT-SIZE:12px; FONT-WEIGHT:bold; COLOR:#800000;" > ※ 일일성과보고서는 <u>평가 조정사항</u>이 모두 반영되어 있지 않으므로 실제 평가실적과 다를 수 있습니다. </td>        
    </tr>
    <tr>        
        <td style="PADDING-TOP:5px; PADDING-LEFT:8px; FONT-SIZE:12px; FONT-WEIGHT:bold; COLOR:#800000;" > ※ 최종실적은 국세 및 지방세 목표 Cap 적용 실적 </td>
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
LoadPage();
htm_title = '<%=htm_title%>';
</script>