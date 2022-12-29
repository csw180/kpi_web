<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - 일일 RM대출금 실적
'프로그램 ID  : rpdy_scr_2100.jsp
'프로그램 명  : 일일 RM대출금 실적
'프로그램개요 : 일일 RM대출금 실적
'작   성   자 : 조형석
'작   성   일 : 2013.03.13
====================================================================
'수정자/수정일/수정사유: 하진영/2014.03.24: 2014년 성과기준반영
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "일일성과보고서";
    String      leftmenu_name    = "기업금융지점장"; 
    String      htm_title        = "일일 기업금융지점장 대출금 실적"; 
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
<script language="javascript" src="/kpi/rpdy/scr/rpdy_scr_2100.js"></script>

<Script language="javascript">

function hiddenGrid_OnSearchEnd(Code, Msg){
	showUnitText("원");
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

function hiddGridmon_OnSearchEnd(Code, Msg){
	baseday     = document.frm.baseday.value;
	
	// 기준일자 정보
    if(isRoleEnable == '1') {
     // 전산정보부 및 성과 담당자
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2100.do?hidden_key=9&baseday="+baseday+"&sergb=98");
    } else {
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2100.do?hidden_key=9&baseday="+baseday+"&sergb=99");
    }
}

function mySheet_OnSearchEnd(Code, Msg){
	showUnitText("원");
	
	mySheet.SetSumValue(0,"합 계");
	mySheet.SetCellAlign(mySheet.HeaderRows(),0,"Center");
	//합계행 병합
	mySheet.SetMergeCell(mySheet.HeaderRows(), 0, 1,3);
	
	showMsg(Code, Msg);
	
	if (document.frm.baseday.value >= '20210701' && document.frm.baseday.value <= '20211231') {
		// 2021하반기 달성률 없음
		return;
	} else  { //2021상반기 달성률 추가
		var num = mySheet.GetCellValue(mySheet.HeaderRows(),mySheet.LastCol()-2) / mySheet.GetCellValue(mySheet.HeaderRows(), mySheet.LastCol()-1) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),mySheet.LastCol(), num.toFixed(1),0); 
		if (!isFinite(num)) mySheet.SetCellValue(mySheet.HeaderRows(),mySheet.LastCol(), 0); //infinity나올 때 0으로 대체
    } 

}    

function mySheet_OnSelectMenu(sAction){
 
	doAction(sAction);
}

function mySheet_OnDownFinish(downloadType, result) {
	if(result) {
	    
	    var baseday     = document.frm.baseday.value;
	    var sergb       = document.frm.sergb.value;
	    
        condition="기준일="+baseday+";조회구분="+sergb;
        
	    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition));
	}
	
}

/* 무한루프 Onsearchend로 변경
function mySheet_OnChangeSum(Row){

	if (document.frm.baseday.value >= '20200701') {
		// 2021하반기 달성률 없음
	} else if (document.frm.baseday.value >= '20200701') {
		mySheet.SetCellValue(Row,33,mySheet.GetCellValue(Row,31) / mySheet.GetCellValue(Row, 32) * 100 ,0);
    } else if (document.frm.baseday.value >= '20200101') {
		mySheet.SetCellValue(Row,31,mySheet.GetCellValue(Row,29) / mySheet.GetCellValue(Row, 30) * 100 ,0);
    } else if (document.frm.baseday.value >= '20190701') {
		mySheet.SetCellValue(Row,28,mySheet.GetCellValue(Row,26) / mySheet.GetCellValue(Row, 27) * 100 ,0);
    } else if (document.frm.baseday.value >= '20190101') {
		mySheet.SetCellValue(Row,27,mySheet.GetCellValue(Row,25) / mySheet.GetCellValue(Row, 26) * 100 ,0);
    } else if (document.frm.baseday.value >= '20180701') {
		mySheet.SetCellValue(Row,32,mySheet.GetCellValue(Row,30) / mySheet.GetCellValue(Row, 31) * 100 ,0);
    } else if (document.frm.baseday.value >= '20170701') {
		mySheet.SetCellValue(Row,29,mySheet.GetCellValue(Row,27) / mySheet.GetCellValue(Row, 28) * 100 ,0);
    } else if (document.frm.baseday.value >= '20170101') {
		mySheet.SetCellValue(Row,28,mySheet.GetCellValue(Row,26) / mySheet.GetCellValue(Row, 27) * 100 ,0);
    } else if (document.frm.baseday.value >= '20160101') {
		mySheet.SetCellValue(Row,34,mySheet.GetCellValue(Row,32) / mySheet.GetCellValue(Row, 33) * 100 ,0);
    } else if (document.frm.baseday.value >= '20150930') {
		mySheet.SetCellValue(Row,19,mySheet.GetCellValue(Row,17) / mySheet.GetCellValue(Row, 18) * 100 ,0);
    } else if (document.frm.baseday.value >= '20150914') {
		mySheet.SetCellValue(Row,18,mySheet.GetCellValue(Row,16) / mySheet.GetCellValue(Row, 17) * 100 ,0);
    } else if (document.frm.baseday.value >= '20150701') {
		mySheet.SetCellValue(Row,17,mySheet.GetCellValue(Row,15) / mySheet.GetCellValue(Row, 16) * 100 ,0);
    } else { 
		mySheet.SetCellValue(Row,16,mySheet.GetCellValue(Row,14) / mySheet.GetCellValue(Row, 15) * 100 ,0);
    }

}
*/

function mySheet_OnMouseDown(Button, Shift, X, Y){
	/*가중치 최종실적*/


    if (document.frm.baseday.value >= '20220701') {
       if (mySheet.MouseRow() == 1 && mySheet.MouseCol() == 13) {
           if(mySheet.GetColHidden(14)) {
        	   mySheet.SetCellText(1,13, mySheet.GetCellText(1,13).replace(/\+/g, "-"));
               mySheet.SetColHidden(14, 0);
               mySheet.SetColHidden(15, 0);
               mySheet.SetColHidden(16, 0);
               mySheet.SetColHidden(17, 0);   
               mySheet.SetColHidden(18, 0);
               mySheet.SetColHidden(19, 0);
               mySheet.SetColHidden(20, 0);
               mySheet.SetColHidden(21, 0);
               //mySheet.ColHidden(21) = false;
               //mySheet.ColHidden(22) = false;
			   mySheet.SetCellBackColor(1,14,"#FFEFBF");                            
               mySheet.SetCellBackColor(1,15,"#FFEFBF");
               mySheet.SetCellBackColor(1,16,"#FFEFBF");
               mySheet.SetCellBackColor(1,17,"#FFEFBF");
               mySheet.SetCellBackColor(1,18,"#FFEFBF");               
               mySheet.SetCellBackColor(1,19,"#FFEFBF");
               mySheet.SetCellBackColor(1,20,"#FFEFBF");
               mySheet.SetCellBackColor(1,21,"#FFEFBF");
               //mySheet.CellBackColor(1,21)  = mySheet.RgbColor(255,239,191);
               //mySheet.CellBackColor(1,22)  = mySheet.RgbColor(255,239,191);               
           } else {
               mySheet.SetCellText(1,13, mySheet.GetCellText(1,13).replace(/\-/g, "+"));
               mySheet.SetColHidden(14, 1);
               mySheet.SetColHidden(15, 1);
               mySheet.SetColHidden(16, 1);
               mySheet.SetColHidden(17, 1);
               mySheet.SetColHidden(18, 1);
               mySheet.SetColHidden(19, 1);
               mySheet.SetColHidden(20, 1);
               mySheet.SetColHidden(21, 1);
               //mySheet.ColHidden(21) = true;
               //mySheet.ColHidden(22) = true;
           }
        }    	
		} else if (document.frm.baseday.value >= '20220101') {
       if (mySheet.MouseRow() == 1 && mySheet.MouseCol() == 13) {
           if(mySheet.GetColHidden(14)) {
        	   mySheet.SetCellText(1,13, mySheet.GetCellText(1,13).replace(/\+/g, "-"));
               mySheet.SetColHidden(14, 0);
               mySheet.SetColHidden(15, 0);
               mySheet.SetColHidden(16, 0);
               mySheet.SetColHidden(17, 0);   
               mySheet.SetColHidden(18, 0);
               mySheet.SetColHidden(19, 0);
               mySheet.SetColHidden(20, 0);
               //mySheet.ColHidden(21) = false;
               //mySheet.ColHidden(22) = false;
			   mySheet.SetCellBackColor(1,14,"#FFEFBF");                            
               mySheet.SetCellBackColor(1,15,"#FFEFBF");
               mySheet.SetCellBackColor(1,16,"#FFEFBF");
               mySheet.SetCellBackColor(1,17,"#FFEFBF");
               mySheet.SetCellBackColor(1,18,"#FFEFBF");               
               mySheet.SetCellBackColor(1,19,"#FFEFBF");
               mySheet.SetCellBackColor(1,20,"#FFEFBF");
               //mySheet.CellBackColor(1,21)  = mySheet.RgbColor(255,239,191);
               //mySheet.CellBackColor(1,22)  = mySheet.RgbColor(255,239,191);               
           } else {
               mySheet.SetCellText(1,13, mySheet.GetCellText(1,13).replace(/\-/g, "+"));
               mySheet.SetColHidden(14, 1);
               mySheet.SetColHidden(15, 1);
               mySheet.SetColHidden(16, 1);
               mySheet.SetColHidden(17, 1);
               mySheet.SetColHidden(18, 1);
               mySheet.SetColHidden(19, 1);
               mySheet.SetColHidden(20, 1);
               //mySheet.ColHidden(21) = true;
               //mySheet.ColHidden(22) = true;
           }
        }    	
		} else if (document.frm.baseday.value >= '20210701') {
			//2021하반기 가중치 없음
	} else if (document.frm.baseday.value >= '20200701') {
	   if (mySheet.MouseRow()== 1 && mySheet.MouseCol()== 13) {
	       if(mySheet.GetColHidden(14)) {
	           mySheet.SetCellText(1,13 ,mySheet.GetCellText(1,13).replace(/\+/g, "-"));
	           mySheet.SetColHidden(14,0);
	           mySheet.SetColHidden(15,0);
	           mySheet.SetColHidden(16,0);
	           mySheet.SetColHidden(17,0);
	           mySheet.SetColHidden(18,0);
	           mySheet.SetColHidden(19,0);
	           mySheet.SetColHidden(20,0);
	           mySheet.SetColHidden(21,0);
	           mySheet.SetColHidden(22,0);
			   mySheet.SetCellBackColor(1,14,"#FFEFBF");
	           mySheet.SetCellBackColor(1,15,"#FFEFBF");
	           mySheet.SetCellBackColor(1,16,"#FFEFBF");
	           mySheet.SetCellBackColor(1,17,"#FFEFBF");
	           mySheet.SetCellBackColor(1,18,"#FFEFBF");
	           mySheet.SetCellBackColor(1,19,"#FFEFBF");
	           mySheet.SetCellBackColor(1,20,"#FFEFBF");
	           mySheet.SetCellBackColor(1,21,"#FFEFBF");
	           if (document.frm.baseday.value >= '20210101') return;
	           mySheet.SetCellBackColor(1,22,"#FFEFBF");
	       } else {
	           mySheet.SetCellText(1,13 ,mySheet.GetCellText(1,13).replace(/\-/g, "+"));
	           mySheet.SetColHidden(14,1);
	           mySheet.SetColHidden(15,1);
	           mySheet.SetColHidden(16,1);
	           mySheet.SetColHidden(17,1);
	           mySheet.SetColHidden(18,1);
	           mySheet.SetColHidden(19,1);
	           mySheet.SetColHidden(20,1);
	           mySheet.SetColHidden(21,1);
	           if (document.frm.baseday.value >= '20210101') return;
	           mySheet.SetColHidden(22,1);
	       }
	    }
	} else if (document.frm.baseday.value >= '20200101') {
	   if (mySheet.MouseRow()== 1 && mySheet.MouseCol()== 13) {
	       if(mySheet.GetColHidden(14)) {
	           mySheet.SetCellText(1,13 ,mySheet.GetCellText(1,13).replace(/\+/g, "-"));
	           mySheet.SetColHidden(14,0);
	           mySheet.SetColHidden(15,0);
	           mySheet.SetColHidden(16,0);
	           mySheet.SetColHidden(17,0);
	           mySheet.SetColHidden(18,0);
	           mySheet.SetColHidden(19,0);
	           mySheet.SetColHidden(20,0);
			   mySheet.SetCellBackColor(1,14,"#FFEFBF");
	           mySheet.SetCellBackColor(1,15,"#FFEFBF");
	           mySheet.SetCellBackColor(1,16,"#FFEFBF");
	           mySheet.SetCellBackColor(1,17,"#FFEFBF");
	           mySheet.SetCellBackColor(1,18,"#FFEFBF");
	           mySheet.SetCellBackColor(1,19,"#FFEFBF");
	           mySheet.SetCellBackColor(1,20,"#FFEFBF");
	       } else {
	           mySheet.SetCellText(1,13 ,mySheet.GetCellText(1,13).replace(/\-/g, "+"));
	           mySheet.SetColHidden(14,1);
	           mySheet.SetColHidden(15,1);
	           mySheet.SetColHidden(16,1);
	           mySheet.SetColHidden(17,1);
	           mySheet.SetColHidden(18,1);
	           mySheet.SetColHidden(19,1);
	           mySheet.SetColHidden(20,1);
	       }
	    }
	} else if (document.frm.baseday.value >= '20190701') {
	   if (mySheet.MouseRow()== 1 && mySheet.MouseCol()== 14) {
	       if(mySheet.GetColHidden(15)) {
	           mySheet.SetCellText(1,14 ,mySheet.GetCellText(1,14).replace(/\+/g, "-"));
	           mySheet.SetColHidden(15,0);
	           mySheet.SetColHidden(16,0);
	           mySheet.SetColHidden(17,0);
	           mySheet.SetColHidden(18,0);
	           mySheet.SetCellBackColor(1,15,"#FFEFBF");
	           mySheet.SetCellBackColor(1,16,"#FFEFBF");
	           mySheet.SetCellBackColor(1,17,"#FFEFBF");
	           mySheet.SetCellBackColor(1,18,"#FFEFBF");
	       } else {
	           mySheet.SetCellText(1,14 ,mySheet.GetCellText(1,14).replace(/\-/g, "+"));
	           mySheet.SetColHidden(15,1);
	           mySheet.SetColHidden(16,1);
	           mySheet.SetColHidden(17,1);
	           mySheet.SetColHidden(18,1);
	       }
	    }
	} else if (document.frm.baseday.value >= '20190101') {
	   if (mySheet.MouseRow()== 1 && mySheet.MouseCol()== 13) {
	       if(mySheet.GetColHidden(14)) {
	           mySheet.SetCellText(1,13 ,mySheet.GetCellText(1,13).replace(/\+/g, "-"));
	           mySheet.SetColHidden(14,0);
	           mySheet.SetColHidden(15,0);
	           mySheet.SetColHidden(16,0);
	           mySheet.SetColHidden(17,0);
	           mySheet.SetCellBackColor(1,14,"#FFEFBF");
	           mySheet.SetCellBackColor(1,15,"#FFEFBF");
	           mySheet.SetCellBackColor(1,16,"#FFEFBF");
	           mySheet.SetCellBackColor(1,17,"#FFEFBF");
	       } else {
	           mySheet.SetCellText(1,13 ,mySheet.GetCellText(1,13).replace(/\-/g, "+"));
	           mySheet.SetColHidden(14,1);
	           mySheet.SetColHidden(15,1);
	           mySheet.SetColHidden(16,1);
	           mySheet.SetColHidden(17,1);
	       }
	    }
	}

}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<tr> 
    	<th class="wd10">기준일</th>
    	<td>
     		<select name="baseday" class="select" onchange="selectmonth()"></select>
    	</td>
    	<th class="wd10">조회구분</th>
    	<td>
     		<select name="sergb" onchange="allDelDataGrid(mySheet);showUnitText('원');">
            	<option value="1">잔액</option>
                <!-- <option value="3">반기평잔</option> -->
     		</select>
    	</td>
    	<td align="right" class="end">
      		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
   	  		<span class="btn_Grd" style="cursor:pointer; display:none;" id="print" border="0" onclick="javascript:doPrint();">인쇄</span>
    	</td>
  	</tr>
</table>
<table border='0' width='100%'>
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
<div id="hiddGridmonObj"></div>
      
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
isRoleEnable = '<%=allRole%>';

LoadPage();
htm_title = '<%=htm_title%>';
</script>
