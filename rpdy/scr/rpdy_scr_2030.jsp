<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - 일일 기업/수산 대출금 실적
'프로그램 ID  : rpdy_scr_2030.jsp
'프로그램 명  : 일일 대출금 실적
'프로그램개요 : 일일 대출금 실적
'작   성   자 : 이해인
'작   성   일 : 2020.02.19
====================================================================
'수정자 : 수 정 일   : 수정사유 
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "일일성과보고서";
    String      leftmenu_name    = "대출금"; 
    String      htm_title        = "일일 대출금 실적"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
    String      allRole          = "0";
    
    String      pgcode           = JSPUtil.getParameter(request,"pgcode","");

    String role[] = kpi_rpt_account.getRole(); //권한

    for (int i = 0; i < role.length; i++) {
        if (role[i].trim().equals("450") || role[i].trim().equals("400")) {
           allRole="1";
           break;
        }
    } 
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpdy/scr/rpdy_scr_2030.js"></script>

<Script language="javascript">
var count = 0;
var num;

function hiddenGrid_OnSearchEnd(Code, Msg){
	showUnitText("원, %");
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
	    var sergb       = document.frm.sergb.value;
	    var metrogb     = document.frm.metrogb.value;
	    
        condition="기준일="+baseday+";PG코드="+pgcode+";조회구분="+sergb+";광역금융본부="+metrogb;
        
	    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition));
	}
	
}

function metrogbhiddenGrid_OnSearchEnd(Code, Msg){
	showUnitText("원, %");
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
	// 기준일자 정보
    if(isRoleEnable == '1') {
     // 전산정보부 및 성과 담당자
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2030.do?hidden_key=9&baseday="+baseday+"&saupgbn=9&pgcode="+pgcode+"&sergb=98");
    } else {
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2030.do?hidden_key=9&baseday="+baseday+"&saupgbn=9&pgcode="+pgcode+"&sergb=99");
    }
}

function mySheet_OnSearchEnd(Code, Msg){

	showUnitText("원, %");
	showMsg(Code, Msg);
	
	mySheet.SetSumValue(0,"합 계");
	mySheet.SetCellAlign(mySheet.HeaderRows(),0,"Center");
	//합계행 병합
	mySheet.SetMergeCell (mySheet.HeaderRows(), 0, 1,3);
	
	if (document.frm.baseday.value >= '20210701' && document.frm.baseday.value < '20220101' && document.frm.pgcode.value != '16') {
		return;
	} else if (document.frm.baseday.value >= '20200701' && document.frm.baseday.value < '20210101' && document.frm.pgcode.value != '16') {
		num = mySheet.GetCellValue(mySheet.HeaderRows(),33) / mySheet.GetCellValue(mySheet.HeaderRows(), 34) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),35, num.toFixed(1),0);
		if (!isFinite(num)) mySheet.SetCellValue(mySheet.HeaderRows(),35, 0); //infinity나올 때 0으로 대체
	} else {
		num = mySheet.GetCellValue(mySheet.HeaderRows(),mySheet.LastCol()-2) / mySheet.GetCellValue(mySheet.HeaderRows(), mySheet.LastCol()-1) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),mySheet.LastCol(), num.toFixed(1),0); 
		if (!isFinite(num)) mySheet.SetCellValue(mySheet.HeaderRows(),mySheet.LastCol(), 0); //infinity나올 때 0으로 대체
	}
	
	
/* 	if (document.frm.baseday.value >= '20210701') {
        if (document.frm.pgcode.value == '16') { 
        	num = mySheet.GetCellValue(mySheet.HeaderRows(),19) / mySheet.GetCellValue(mySheet.HeaderRows(), 18) * 100
        	mySheet.SetCellValue(mySheet.HeaderRows(),mySheet.LastCol(), num.toFixed(1),0);
        } else {
           //2021년도 하반기 영업점 달성률 없음, 밴드범위로 계산
        }    	
    } else if (document.frm.baseday.value >= '20210101') {
        if (document.frm.pgcode.value == '16') { 
        	num = mySheet.GetCellValue(mySheet.HeaderRows(),30) / mySheet.GetCellValue(mySheet.HeaderRows(), 31) * 100
			mySheet.SetCellValue(mySheet.HeaderRows(),32, num.toFixed(1),0);
        } else {
        	num = mySheet.GetCellValue(mySheet.HeaderRows(),36) / mySheet.GetCellValue(mySheet.HeaderRows(), 37) * 100
			mySheet.SetCellValue(mySheet.HeaderRows(),38, num.toFixed(1),0);
        }
    } else if (document.frm.baseday.value >= '20200701') {
        if (document.frm.pgcode.value == '16') { 
        	num = mySheet.GetCellValue(mySheet.HeaderRows(),30) / mySheet.GetCellValue(mySheet.HeaderRows(), 31) * 100
			mySheet.SetCellValue(mySheet.HeaderRows(),32, num.toFixed(1),0);
        } else {
        	num = mySheet.GetCellValue(mySheet.HeaderRows(),33) / mySheet.GetCellValue(mySheet.HeaderRows(), 34) * 100
			mySheet.SetCellValue(mySheet.HeaderRows(),35, num.toFixed(1),0);
        }
    } else if (document.frm.baseday.value >= '20200101') {
        if (document.frm.pgcode.value == '16') { 
        	num = mySheet.GetCellValue(mySheet.HeaderRows(),28) / mySheet.GetCellValue(mySheet.HeaderRows(), 29) * 100
			mySheet.SetCellValue(mySheet.HeaderRows(),30, num.toFixed(1),0);
        } else {
        	num = mySheet.GetCellValue(mySheet.HeaderRows(),34) / mySheet.GetCellValue(mySheet.HeaderRows(), 35) * 100
        	mySheet.SetCellValue(mySheet.HeaderRows(),36, num.toFixed(1),0);// lhi
        }
    } else if (document.frm.baseday.value >= '20190701') {
        if (document.frm.pgcode.value == '16') { 
        	num = mySheet.GetCellValue(mySheet.HeaderRows(),25) / mySheet.GetCellValue(mySheet.HeaderRows(), 26) * 100
			mySheet.SetCellValue(mySheet.HeaderRows(),27, num.toFixed(1),0);
        } else {
        	num = mySheet.GetCellValue(mySheet.HeaderRows(),29) / mySheet.GetCellValue(mySheet.HeaderRows(), 30) * 100
			mySheet.SetCellValue(mySheet.HeaderRows(),31, num.toFixed(1),0);
        }
    } else if (document.frm.baseday.value >= '20190101') {
        if (document.frm.pgcode.value == '16') { 
        	num = mySheet.GetCellValue(mySheet.HeaderRows(),24) / mySheet.GetCellValue(mySheet.HeaderRows(), 25) * 100
			mySheet.SetCellValue(mySheet.HeaderRows(),26, num.toFixed(1),0);
        } else {
        	num = mySheet.GetCellValue(mySheet.HeaderRows(),29) / mySheet.GetCellValue(mySheet.HeaderRows(), 30) * 100
			mySheet.SetCellValue(mySheet.HeaderRows(),31, num.toFixed(1),0);
        }
    } else if (document.frm.baseday.value >= '20180701') {
        if (document.frm.pgcode.value == '16') { 
        	num = mySheet.GetCellValue(mySheet.HeaderRows(),30) / mySheet.GetCellValue(mySheet.HeaderRows(), 31) * 100
			mySheet.SetCellValue(mySheet.HeaderRows(),32, num.toFixed(1),0);
        } else {
        	num = mySheet.GetCellValue(mySheet.HeaderRows(),36) / mySheet.GetCellValue(mySheet.HeaderRows(), 37) * 100
			mySheet.SetCellValue(mySheet.HeaderRows(),38, num.toFixed(1),0);
        }
	} else if (document.frm.baseday.value >= '20180101'){
		num = mySheet.GetCellValue(mySheet.HeaderRows(),31) / mySheet.GetCellValue(mySheet.HeaderRows(), 32) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),33, num.toFixed(1),0);
	} else if (document.frm.baseday.value >= '20170701'){
		num = mySheet.GetCellValue(mySheet.HeaderRows(),32) / mySheet.GetCellValue(mySheet.HeaderRows(), 33) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),34, num.toFixed(1),0);
	} else if (document.frm.baseday.value >= '20170101'){
		num = mySheet.GetCellValue(mySheet.HeaderRows(),30) / mySheet.GetCellValue(mySheet.HeaderRows(), 31) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),32, num.toFixed(1),0);
	} else if (document.frm.baseday.value >= '20160101'){
		num = mySheet.GetCellValue(mySheet.HeaderRows(),37) / mySheet.GetCellValue(mySheet.HeaderRows(), 38) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),39, num.toFixed(1),0);
	} else if (document.frm.baseday.value >= '20150930'){
		num = mySheet.GetCellValue(mySheet.HeaderRows(),30) / mySheet.GetCellValue(mySheet.HeaderRows(), 31) * 100 
		mySheet.SetCellValue(mySheet.HeaderRows(),32,num.toFixed(1),0);
	} else if (document.frm.baseday.value >= '20150701'){
		num = mySheet.GetCellValue(mySheet.HeaderRows(),29) / mySheet.GetCellValue(mySheet.HeaderRows(), 30) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),31, num.toFixed(1),0);
	} else if (document.frm.baseday.value >= '20150101'){
		num = mySheet.GetCellValue(mySheet.HeaderRows(),28) / mySheet.GetCellValue(mySheet.HeaderRows(), 29) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),30, num.toFixed(1),0);
	} else if (document.frm.baseday.value >= '20140701'){
		num = mySheet.GetCellValue(mySheet.HeaderRows(),24) / mySheet.GetCellValue(mySheet.HeaderRows(), 25) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),26, num.toFixed(1),0);
	} else if (document.frm.baseday.value >= '20140101'){
		num = mySheet.GetCellValue(mySheet.HeaderRows(),22) / mySheet.GetCellValue(mySheet.HeaderRows(), 23) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),24, num.toFixed(1),0);
	} else if (document.frm.baseday.value >= '20130101'){
		num = mySheet.GetCellValue(mySheet.HeaderRows(),24) / mySheet.GetCellValue(mySheet.HeaderRows(), 25) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),26, num.toFixed(1),0);
	} else if (document.frm.baseday.value >= '20120101'){
		num = mySheet.GetCellValue(mySheet.HeaderRows(),23) / mySheet.GetCellValue(mySheet.HeaderRows(), 24) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),25, num.toFixed(1),0);
	} else if (document.frm.baseday.value > '20110101'){
		num = mySheet.GetCellValue(mySheet.HeaderRows(),20) / mySheet.GetCellValue(mySheet.HeaderRows(), 21) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),22, num.toFixed(1),0);
	} else {
		num = mySheet.GetCellValue(mySheet.HeaderRows(),19) / mySheet.GetCellValue(mySheet.HeaderRows(), 20) * 100
		mySheet.SetCellValue(mySheet.HeaderRows(),21, num.toFixed(1),0);
	} */
	

}    

function mySheet_OnSelectMenu(sAction){
 
	doAction(sAction);
}

/* 무한루프 Onsearchend로 변경
function mySheet_OnChangeSum(Row){
    
	if (document.frm.baseday.value >= '20210701') {
        if (document.frm.pgcode.value == '16') { 

        	mySheet.SetCellValue(Row,20,mySheet.GetCellValue(Row,19) / mySheet.GetCellValue(Row, 18) * 100 ,0);
        } else {
           //2021년도 하반기 영업점 달성률 없음, 밴드범위로 계산
        }    	
    } else if (document.frm.baseday.value >= '20210101') {
        if (document.frm.pgcode.value == '16') { 
			mySheet.SetCellValue(Row,32,mySheet.GetCellValue(Row,30) / mySheet.GetCellValue(Row, 31) * 100 ,0);
        } else {
			mySheet.SetCellValue(Row,38,mySheet.GetCellValue(Row,36) / mySheet.GetCellValue(Row, 37) * 100 ,0);
        }
    } else if (document.frm.baseday.value >= '20200701') {
        if (document.frm.pgcode.value == '16') { 
			mySheet.SetCellValue(Row,32,mySheet.GetCellValue(Row,30) / mySheet.GetCellValue(Row, 31) * 100 ,0);
        } else {
			mySheet.SetCellValue(Row,35,mySheet.GetCellValue(Row,33) / mySheet.GetCellValue(Row, 34) * 100 ,0);
        }
    } else if (document.frm.baseday.value >= '20200101') {
        if (document.frm.pgcode.value == '16') { 
			mySheet.SetCellValue(Row,30,mySheet.GetCellValue(Row,28) / mySheet.GetCellValue(Row, 29) * 100 ,0);
        } else {
        	mySheet.SetCellValue(Row,36,mySheet.GetCellValue(Row,34) / mySheet.GetCellValue(Row, 35) * 100 ,0);// lhi
        }
    } else if (document.frm.baseday.value >= '20190701') {
        if (document.frm.pgcode.value == '16') { 
			mySheet.SetCellValue(Row,27,mySheet.GetCellValue(Row,25) / mySheet.GetCellValue(Row, 26) * 100 ,0);
        } else {
			mySheet.SetCellValue(Row,31,mySheet.GetCellValue(Row,29) / mySheet.GetCellValue(Row, 30) * 100 ,0);
        }
    } else if (document.frm.baseday.value >= '20190101') {
        if (document.frm.pgcode.value == '16') { 
			mySheet.SetCellValue(Row,26,mySheet.GetCellValue(Row,24) / mySheet.GetCellValue(Row, 25) * 100 ,0);
        } else {
			mySheet.SetCellValue(Row,31,mySheet.GetCellValue(Row,29) / mySheet.GetCellValue(Row, 30) * 100 ,0);
        }
    } else if (document.frm.baseday.value >= '20180701') {
        if (document.frm.pgcode.value == '16') { 
			mySheet.SetCellValue(Row,32,mySheet.GetCellValue(Row,30) / mySheet.GetCellValue(Row, 31) * 100 ,0);
        } else {
			mySheet.SetCellValue(Row,38,mySheet.GetCellValue(Row,36) / mySheet.GetCellValue(Row, 37) * 100 ,0);
        }
	} else if (document.frm.baseday.value >= '20180101')  mySheet.SetCellValue(Row,33,mySheet.GetCellValue(Row,31) / mySheet.GetCellValue(Row, 32) * 100 ,0);
	else if (document.frm.baseday.value >= '20170701')  mySheet.SetCellValue(Row,34,mySheet.GetCellValue(Row,32) / mySheet.GetCellValue(Row, 33) * 100 ,0);
	else if (document.frm.baseday.value >= '20170101')  mySheet.SetCellValue(Row,32,mySheet.GetCellValue(Row,30) / mySheet.GetCellValue(Row, 31) * 100 ,0);
	else if (document.frm.baseday.value >= '20160101')  mySheet.SetCellValue(Row,39,mySheet.GetCellValue(Row,37) / mySheet.GetCellValue(Row, 38) * 100 ,0);
	else if (document.frm.baseday.value >= '20150930')  mySheet.SetCellValue(Row,32,mySheet.GetCellValue(Row,30) / mySheet.GetCellValue(Row, 31) * 100 ,0);
	else if (document.frm.baseday.value >= '20150701')  mySheet.SetCellValue(Row,31,mySheet.GetCellValue(Row,29) / mySheet.GetCellValue(Row, 30) * 100 ,0);
	else if (document.frm.baseday.value >= '20150101')  mySheet.SetCellValue(Row,30,mySheet.GetCellValue(Row,28) / mySheet.GetCellValue(Row, 29) * 100 ,0);
	else if (document.frm.baseday.value >= '20140701')  mySheet.SetCellValue(Row,26,mySheet.GetCellValue(Row,24) / mySheet.GetCellValue(Row, 25) * 100 ,0);
	else if (document.frm.baseday.value >= '20140101')  mySheet.SetCellValue(Row,24,mySheet.GetCellValue(Row,22) / mySheet.GetCellValue(Row, 23) * 100 ,0);
	else if (document.frm.baseday.value >= '20130101')  mySheet.SetCellValue(Row,26,mySheet.GetCellValue(Row,24) / mySheet.GetCellValue(Row, 25) * 100 ,0);
	else if (document.frm.baseday.value >= '20120101')  mySheet.SetCellValue(Row,25,mySheet.GetCellValue(Row,23) / mySheet.GetCellValue(Row, 24) * 100 ,0);
	else if (document.frm.baseday.value > '20110101')   mySheet.SetCellValue(Row,22,mySheet.GetCellValue(Row,20) / mySheet.GetCellValue(Row, 21) * 100 ,0);
	else mySheet.SetCellValue(Row,21,mySheet.GetCellValue(Row,19) / mySheet.GetCellValue(Row, 20) * 100 ,0);

}
*/

function mySheet_OnMouseDown(Button, Shift, X, Y){
    /*가중치 최종실적*/
    if (document.frm.baseday.value >= '20220701') { 
        if (document.frm.pgcode.value == '16') {                       // 금융본부
           if (mySheet.MouseRow() == 1 && mySheet.MouseCol() == 12) {
               if(mySheet.GetColHidden(13)) {
                   mySheet.SetCellText(1,12, mySheet.GetCellText(1,12).replace(/\+/g, "-"));
                   mySheet.SetColHidden(13, 0);
                   mySheet.SetColHidden(14, 0);
                   mySheet.SetColHidden(15, 0);
                   mySheet.SetColHidden(16, 0);
                   mySheet.SetColHidden(17, 0);
                   mySheet.SetColHidden(18, 0);
                   mySheet.SetColHidden(19, 0);
                   mySheet.SetCellBackColor(1,13, "#FFEFBF");
                   mySheet.SetCellBackColor(1,14, "#FFEFBF");
                   mySheet.SetCellBackColor(1,15, "#FFEFBF");
                   mySheet.SetCellBackColor(1,16, "#FFEFBF");
                   mySheet.SetCellBackColor(1,17, "#FFEFBF");
                   mySheet.SetCellBackColor(1,18, "#FFEFBF");
                   mySheet.SetCellBackColor(1,19, "#FFEFBF");                   
               } else {
                   mySheet.SetCellText(1,12, mySheet.GetCellText(1,12).replace(/\-/g, "+"));
                   mySheet.SetColHidden(13, 1);
                   mySheet.SetColHidden(14, 1);
                   mySheet.SetColHidden(15, 1);
                   mySheet.SetColHidden(16, 1);
                   mySheet.SetColHidden(17, 1);
                   mySheet.SetColHidden(18, 1);
                   mySheet.SetColHidden(19, 1);                   
               }
            }
        } else {                                                       // 일반영업점
			if ((mySheet.MouseRow() == 0 || mySheet.MouseRow() == 1 ) && mySheet.MouseCol() == 15) {
            	if(mySheet.GetColHidden(16)) {
                   	mySheet.SetCellText(0,15, mySheet.GetCellText(0,15).replace(/\+/g, "-"));
                  	mySheet.SetCellText(1,15, mySheet.GetCellText(1,15).replace(/\+/g, "-"));
                   	mySheet.SetColHidden(16, 0);
                   	mySheet.SetColHidden(17, 0);
                   	mySheet.SetColHidden(18, 0);
                   	mySheet.SetColHidden(19, 0);
                   	mySheet.SetColHidden(20, 0);
                   	mySheet.SetColHidden(21, 0);
                   	mySheet.SetColHidden(22, 0);
                   	mySheet.SetColHidden(23, 0);
                                                         
					mySheet.SetCellBackColor(0,16, "#FFEFBF");
					mySheet.SetCellBackColor(0,17, "#FFEFBF");
                   	mySheet.SetCellBackColor(0,18, "#FFEFBF");
                  	mySheet.SetCellBackColor(0,19, "#FFEFBF");
                   	mySheet.SetCellBackColor(0,20, "#FFEFBF");
                   	mySheet.SetCellBackColor(0,21, "#FFEFBF");
                   	mySheet.SetCellBackColor(0,22, "#FFEFBF");
                   	mySheet.SetCellBackColor(0,23, "#FFEFBF");
                   
                   	mySheet.SetCellBackColor(1,16, "#FFEFBF");                   
					mySheet.SetCellBackColor(1,17, "#FFEFBF");
                   	mySheet.SetCellBackColor(1,18, "#FFEFBF");
                   	mySheet.SetCellBackColor(1,19, "#FFEFBF");
                   	mySheet.SetCellBackColor(1,20, "#FFEFBF");
                   	mySheet.SetCellBackColor(1,21, "#FFEFBF");
                   	mySheet.SetCellBackColor(1,22, "#FFEFBF");  
                   	mySheet.SetCellBackColor(1,23, "#FFEFBF");                                    
				} else {
               		mySheet.SetCellText(0,15, mySheet.GetCellText(0,15).replace(/\-/g, "+"));
                  	mySheet.SetCellText(1,15, mySheet.GetCellText(1,15).replace(/\-/g, "+"));
                   	mySheet.SetColHidden(16, 1);
	               	mySheet.SetColHidden(17, 1);
                   	mySheet.SetColHidden(18, 1);
                   	mySheet.SetColHidden(19, 1);
                   	mySheet.SetColHidden(20, 1);
                   	mySheet.SetColHidden(21, 1);
                   	mySheet.SetColHidden(22, 1);       
                   	mySheet.SetColHidden(23, 1);                                                   
				}
            }
        }    
    } else if (document.frm.baseday.value >= '20220101') { 
        if (document.frm.pgcode.value == '16') {                       // 금융본부
           if (mySheet.MouseRow() == 1 && mySheet.MouseCol() == 12) {
               if(mySheet.GetColHidden(13)) {
                   mySheet.SetCellText(1,12, mySheet.GetCellText(1,12).replace(/\+/g, "-"));
                   mySheet.SetColHidden(13, 0);
                   mySheet.SetColHidden(14, 0);
                   mySheet.SetColHidden(15, 0);
                   mySheet.SetColHidden(16, 0);
                   mySheet.SetColHidden(17, 0);
                   mySheet.SetColHidden(18, 0);
                   mySheet.SetColHidden(19, 0);
                   mySheet.SetCellBackColor(1,13, "#FFEFBF");
                   mySheet.SetCellBackColor(1,14, "#FFEFBF");
                   mySheet.SetCellBackColor(1,15, "#FFEFBF");
                   mySheet.SetCellBackColor(1,16, "#FFEFBF");
                   mySheet.SetCellBackColor(1,17, "#FFEFBF");
                   mySheet.SetCellBackColor(1,18, "#FFEFBF");
                   mySheet.SetCellBackColor(1,19, "#FFEFBF");                   
               } else {
                   mySheet.SetCellText(1,12, mySheet.GetCellText(1,12).replace(/\-/g, "+"));
                   mySheet.SetColHidden(13, 1);
                   mySheet.SetColHidden(14, 1);
                   mySheet.SetColHidden(15, 1);
                   mySheet.SetColHidden(16, 1);
                   mySheet.SetColHidden(17, 1);
                   mySheet.SetColHidden(18, 1);
                   mySheet.SetColHidden(19, 1);                   
               }
            }
        } else {                                                       // 일반영업점
			if ((mySheet.MouseRow() == 0 || mySheet.MouseRow() == 1 ) && mySheet.MouseCol() == 15) {
            	if(mySheet.GetColHidden(16)) {
                   	mySheet.SetCellText(0,15, mySheet.GetCellText(0,15).replace(/\+/g, "-"));
                  	mySheet.SetCellText(1,15, mySheet.GetCellText(1,15).replace(/\+/g, "-"));
                   	mySheet.SetColHidden(16, 0);
                   	mySheet.SetColHidden(17, 0);
                   	mySheet.SetColHidden(18, 0);
                   	mySheet.SetColHidden(19, 0);
                   	mySheet.SetColHidden(20, 0);
                   	mySheet.SetColHidden(21, 0);
                   	mySheet.SetColHidden(22, 0);
                                                         
					mySheet.SetCellBackColor(0,16, "#FFEFBF");
					mySheet.SetCellBackColor(0,17, "#FFEFBF");
                   	mySheet.SetCellBackColor(0,18, "#FFEFBF");
                  	mySheet.SetCellBackColor(0,19, "#FFEFBF");
                   	mySheet.SetCellBackColor(0,20, "#FFEFBF");
                   	mySheet.SetCellBackColor(0,21, "#FFEFBF");
                   	mySheet.SetCellBackColor(0,22, "#FFEFBF");
                   
                   	mySheet.SetCellBackColor(1,16, "#FFEFBF");                   
					mySheet.SetCellBackColor(1,17, "#FFEFBF");
                   	mySheet.SetCellBackColor(1,18, "#FFEFBF");
                   	mySheet.SetCellBackColor(1,19, "#FFEFBF");
                   	mySheet.SetCellBackColor(1,20, "#FFEFBF");
                   	mySheet.SetCellBackColor(1,21, "#FFEFBF");
                   	mySheet.SetCellBackColor(1,22, "#FFEFBF");                                      
				} else {
               		mySheet.SetCellText(0,15, mySheet.GetCellText(0,15).replace(/\-/g, "+"));
                  	mySheet.SetCellText(1,15, mySheet.GetCellText(1,15).replace(/\-/g, "+"));
                   	mySheet.SetColHidden(16, 1);
	               	mySheet.SetColHidden(17, 1);
                   	mySheet.SetColHidden(18, 1);
                   	mySheet.SetColHidden(19, 1);
                   	mySheet.SetColHidden(20, 1);
                   	mySheet.SetColHidden(21, 1);
                   	mySheet.SetColHidden(22, 1);                                                         
				}
            }
        }    
    } else if (document.frm.baseday.value >= '20210701') {
		    // 2021년도 하반기 가중치 없음
	} else if (document.frm.baseday.value >= '20210101') {
	    if (document.frm.pgcode.value == '16') {                       // 금융본부
	       if (mySheet.MouseRow()== 1 && mySheet.MouseCol()== 12) {
	           if(mySheet.GetColHidden(13)) {
	               mySheet.SetCellText(1,12 ,mySheet.GetCellText(1,12).toString().replace(/\+/g, "-"));
	               mySheet.SetColHidden(13,0);
	               mySheet.SetColHidden(14,0);
	               mySheet.SetColHidden(15,0);
	               mySheet.SetColHidden(16,0);
	               mySheet.SetColHidden(17,0);
	               mySheet.SetColHidden(18,0);
	               mySheet.SetColHidden(19,0);
	               mySheet.SetColHidden(20,0);
	               mySheet.SetCellBackColor(1,13,"#FFEFBF");
	               mySheet.SetCellBackColor(1,14,"#FFEFBF");
	               mySheet.SetCellBackColor(1,15,"#FFEFBF");
	               mySheet.SetCellBackColor(1,16,"#FFEFBF");
	               mySheet.SetCellBackColor(1,17,"#FFEFBF");
	               mySheet.SetCellBackColor(1,18,"#FFEFBF");
	               mySheet.SetCellBackColor(1,19,"#FFEFBF");
	               mySheet.SetCellBackColor(1,20,"#FFEFBF");
	           } else {
	               mySheet.SetCellText(1,12 ,mySheet.GetCellText(1,12).toString().replace(/\-/g, "+"));
	               mySheet.SetColHidden(13,1);
	               //mySheet.SetColHidden(14,1);
	               mySheet.SetColHidden(14,1);
	               mySheet.SetColHidden(15,1);
	               mySheet.SetColHidden(16,1);
	               mySheet.SetColHidden(17,1);
	               mySheet.SetColHidden(18,1);
	               mySheet.SetColHidden(19,1);
	               mySheet.SetColHidden(20,1);
	           }
	        }
	    } else {                                                       // 일반영업점
	       if ((mySheet.MouseRow()== 0 || mySheet.MouseRow()== 1 ) && mySheet.MouseCol()== 16) {
	           if(mySheet.GetColHidden(17)) {
	               mySheet.SetCellText(0,16 ,mySheet.GetCellText(0,16).toString().replace(/\+/g, "-"));
	               mySheet.SetCellText(1,16 ,mySheet.GetCellText(1,16).toString().replace(/\+/g, "-"));
	               mySheet.SetColHidden(17,0);
	               mySheet.SetColHidden(18,0);
	               mySheet.SetColHidden(19,0);
	               mySheet.SetColHidden(20,0);
	               mySheet.SetColHidden(21,0);
	               mySheet.SetColHidden(22,0);
	               mySheet.SetColHidden(23,0);
	               mySheet.SetColHidden(24,0);
	               
				   mySheet.SetCellBackColor(0,17,"#FFEFBF");
	               mySheet.SetCellBackColor(0,18,"#FFEFBF");
	               mySheet.SetCellBackColor(0,19,"#FFEFBF");
	               mySheet.SetCellBackColor(0,20,"#FFEFBF");
	               mySheet.SetCellBackColor(0,21,"#FFEFBF");
	               mySheet.SetCellBackColor(0,22,"#FFEFBF");
	               mySheet.SetCellBackColor(0,23,"#FFEFBF");
	               mySheet.SetCellBackColor(0,24,"#FFEFBF");
	               
				   mySheet.SetCellBackColor(1,17,"#FFEFBF");
	               mySheet.SetCellBackColor(1,18,"#FFEFBF");
	               mySheet.SetCellBackColor(1,19,"#FFEFBF");
	               mySheet.SetCellBackColor(1,20,"#FFEFBF");
	               mySheet.SetCellBackColor(1,21,"#FFEFBF");
	               mySheet.SetCellBackColor(1,22,"#FFEFBF");
	               mySheet.SetCellBackColor(1,23,"#FFEFBF");
	               mySheet.SetCellBackColor(1,24,"#FFEFBF");
	           } else {
	               mySheet.SetCellText(0,16 ,mySheet.GetCellText(0,16).toString().replace(/\-/g, "+"));
	               mySheet.SetCellText(1,16 ,mySheet.GetCellText(1,16).toString().replace(/\-/g, "+"));
	               mySheet.SetColHidden(17,1);
	               mySheet.SetColHidden(18,1);
	               mySheet.SetColHidden(19,1);
	               mySheet.SetColHidden(20,1);
	               mySheet.SetColHidden(21,1);
	               mySheet.SetColHidden(22,1);
	               mySheet.SetColHidden(23,1);
	               mySheet.SetColHidden(24,1);
	               mySheet.SetColHidden(29,1);
	           }
	        }
	    }
	} else if (document.frm.baseday.value >= '20200701') {
	    if (document.frm.pgcode.value == '16') {                       // 금융본부
	       if (mySheet.MouseRow()== 1 && mySheet.MouseCol()== 12) {
	           if(mySheet.GetColHidden(13)) {
	        	   if (count==0){
		               mySheet.SetCellText(1,12 ,mySheet.GetCellText(1,12).toString().replace(/\+/g, "-"));
		               mySheet.SetColHidden(14,0);
		               mySheet.SetColHidden(15,0);
		               mySheet.SetColHidden(16,0);
		               mySheet.SetColHidden(17,0);
		               mySheet.SetColHidden(18,0);
		               mySheet.SetColHidden(19,0);
		               mySheet.SetColHidden(20,0);
		               mySheet.SetColHidden(21,0);
		               mySheet.SetCellBackColor(1,13,"#FFEFBF");
		               mySheet.SetCellBackColor(1,14,"#FFEFBF");
		               mySheet.SetCellBackColor(1,15,"#FFEFBF");
		               mySheet.SetCellBackColor(1,16,"#FFEFBF");
		               mySheet.SetCellBackColor(1,17,"#FFEFBF");
		               mySheet.SetCellBackColor(1,18,"#FFEFBF");
		               mySheet.SetCellBackColor(1,19,"#FFEFBF");
		               mySheet.SetCellBackColor(1,20,"#FFEFBF");
		               mySheet.SetCellBackColor(1,21,"#FFEFBF");
		               count++;
	        	   }else {
		               mySheet.SetCellText(1,12 ,mySheet.GetCellText(1,12).toString().replace(/\-/g, "+"));
		               mySheet.SetColHidden(14,1);
		               mySheet.SetColHidden(15,1);
		               mySheet.SetColHidden(16,1);
		               mySheet.SetColHidden(17,1);
		               mySheet.SetColHidden(18,1);
		               mySheet.SetColHidden(19,1);
		               mySheet.SetColHidden(20,1);
		               mySheet.SetColHidden(21,1);
		               count=0;
		           }
	           } else{
	        	   
	           }
	        }
	    } else {                                                       // 일반영업점
	       if ((mySheet.MouseRow()== 0 || mySheet.MouseRow()== 1 ) && mySheet.MouseCol()== 20) {
	           if(mySheet.GetColHidden(21)) {
	               mySheet.SetCellText(0,20 ,mySheet.GetCellText(0,20).toString().replace(/\+/g, "-"));
	               mySheet.SetCellText(1,20 ,mySheet.GetCellText(1,20).toString().replace(/\+/g, "-"));
	               mySheet.SetColHidden(21,0);
	               mySheet.SetColHidden(22,0);
	               mySheet.SetColHidden(23,0);
	               mySheet.SetColHidden(24,0);
	               mySheet.SetColHidden(25,0);
	               mySheet.SetColHidden(26,0);
	               mySheet.SetColHidden(27,0);
	               mySheet.SetColHidden(28,0);
	               mySheet.SetColHidden(29,0);
	               
	               mySheet.SetCellBackColor(0,21,"#FFEFBF");
	               mySheet.SetCellBackColor(0,22,"#FFEFBF");
	               mySheet.SetCellBackColor(0,23,"#FFEFBF");
	               mySheet.SetCellBackColor(0,24,"#FFEFBF");
	               mySheet.SetCellBackColor(0,25,"#FFEFBF");
	               mySheet.SetCellBackColor(0,26,"#FFEFBF");
	               mySheet.SetCellBackColor(0,27,"#FFEFBF");
	               mySheet.SetCellBackColor(0,28,"#FFEFBF");
	               mySheet.SetCellBackColor(0,29,"#FFEFBF");
	               
	               mySheet.SetCellBackColor(1,21,"#FFEFBF");
	               mySheet.SetCellBackColor(1,22,"#FFEFBF");
	               mySheet.SetCellBackColor(1,23,"#FFEFBF");
	               mySheet.SetCellBackColor(1,24,"#FFEFBF");
	               mySheet.SetCellBackColor(1,25,"#FFEFBF");
	               mySheet.SetCellBackColor(1,26,"#FFEFBF");
	               mySheet.SetCellBackColor(1,27,"#FFEFBF");
	               mySheet.SetCellBackColor(1,28,"#FFEFBF");
	               mySheet.SetCellBackColor(1,29,"#FFEFBF");
	           } else {
	               mySheet.SetCellText(0,20 ,mySheet.GetCellText(0,20).toString().replace(/\-/g, "+"));
	               mySheet.SetCellText(1,20 ,mySheet.GetCellText(1,20).toString().replace(/\-/g, "+"));
	               mySheet.SetColHidden(21,1);
	               mySheet.SetColHidden(22,1);
	               mySheet.SetColHidden(23,1);
	               mySheet.SetColHidden(24,1);
	               mySheet.SetColHidden(25,1);
	               mySheet.SetColHidden(26,1);
	               mySheet.SetColHidden(27,1);
	               mySheet.SetColHidden(28,1);
	               mySheet.SetColHidden(29,1);
	           }
	        }
	    }
	} else if (document.frm.baseday.value >= '20200101') {
		
	    if (document.frm.pgcode.value == '16') {                       // 금융본부
	       if (mySheet.MouseRow()== 1 && mySheet.MouseCol()== 12) {
	    	   //count++;
	           if(mySheet.GetColHidden(13)) {
	        	   if (count==0){
		               mySheet.SetCellText(1,12 ,mySheet.GetCellText(1,12).toString().replace(/\+/g, "-"));
		               mySheet.SetColHidden(14,0);
		               mySheet.SetColHidden(15,0);
		               mySheet.SetColHidden(16,0);
		               mySheet.SetColHidden(17,0);
		               mySheet.SetColHidden(18,0);
		               mySheet.SetColHidden(19,0);
		               mySheet.SetCellBackColor(1,14,"#FFEFBF");
		               mySheet.SetCellBackColor(1,15,"#FFEFBF");
		               mySheet.SetCellBackColor(1,16,"#FFEFBF");
		               mySheet.SetCellBackColor(1,17,"#FFEFBF");
		               mySheet.SetCellBackColor(1,18,"#FFEFBF");
		               mySheet.SetCellBackColor(1,19,"#FFEFBF");
		               count++;
	               } else {
	            	   mySheet.SetCellText(1,12 ,mySheet.GetCellText(1,12).toString().replace(/\-/g, "+"));
		               mySheet.SetColHidden(14,1);
		               mySheet.SetColHidden(15,1);
		               mySheet.SetColHidden(16,1);
		               mySheet.SetColHidden(17,1);
		               mySheet.SetColHidden(18,1);
		               mySheet.SetColHidden(19,1);
		               count=0;
	               }
	           } else {
	               
	           }
	        }
	    } else {                                                       // 일반영업점
	       if (mySheet.MouseRow()== 1 && mySheet.MouseCol()== 16) {
	           if(mySheet.GetColHidden(17)) {
	               mySheet.SetCellText(1,16 ,mySheet.GetCellText(1,16).toString().replace(/\+/g, "-"));
	               mySheet.SetColHidden(17,0);
	               mySheet.SetColHidden(18,0);
	               mySheet.SetColHidden(19,0);
	               mySheet.SetColHidden(20,0);
	               mySheet.SetColHidden(21,0);
	               mySheet.SetColHidden(22,0);
	               mySheet.SetColHidden(23,0);
	               
	               mySheet.SetCellBackColor(1,17,"#FFEFBF");
	               mySheet.SetCellBackColor(1,18,"#FFEFBF");
	               mySheet.SetCellBackColor(1,19,"#FFEFBF");
	               mySheet.SetCellBackColor(1,20,"#FFEFBF");
	               mySheet.SetCellBackColor(1,21,"#FFEFBF");
	               mySheet.SetCellBackColor(1,22,"#FFEFBF");
	               mySheet.SetCellBackColor(1,23,"#FFEFBF");
	           } else {
	               mySheet.SetCellText(1,16 ,mySheet.GetCellText(1,16).toString().replace(/\-/g, "+"));
	               mySheet.SetColHidden(17,1);
	               mySheet.SetColHidden(18,1);
	               mySheet.SetColHidden(19,1);
	               mySheet.SetColHidden(20,1);
	               mySheet.SetColHidden(21,1);
	               mySheet.SetColHidden(22,1);
	               mySheet.SetColHidden(23,1);
	           }
	        }
	    }
	} else if (document.frm.baseday.value >= '20190701') {
	    if (document.frm.pgcode.value == '16') {                       // 금융본부
	       if (mySheet.MouseRow()== 1 && mySheet.MouseCol()== 13) {
	           if(mySheet.GetColHidden(14)) {
	               mySheet.SetCellText(1,13 ,mySheet.GetCellText(1,13).toString().replace(/\+/g, "-"));
	               mySheet.SetColHidden(14,0);
	               mySheet.SetColHidden(15,0);
	               mySheet.SetColHidden(16,0);
	               mySheet.SetColHidden(17,0);
	               mySheet.SetCellBackColor(1,14,"#FFEFBF");
	               mySheet.SetCellBackColor(1,15,"#FFEFBF");
	               mySheet.SetCellBackColor(1,16,"#FFEFBF");
	               mySheet.SetCellBackColor(1,17,"#FFEFBF");
	           } else {
	               mySheet.SetCellText(1,13 ,mySheet.GetCellText(1,13).toString().replace(/\-/g, "+"));
	               mySheet.SetColHidden(14,1);
	               mySheet.SetColHidden(15,1);
	               mySheet.SetColHidden(16,1);
	               mySheet.SetColHidden(17,1);
	           }
	        }
	    } else {                                                       // 일반영업점
	       if (mySheet.MouseRow()== 1 && mySheet.MouseCol()== 16) {
	           if(mySheet.GetColHidden(17)) {
	               mySheet.SetCellText(1,16 ,mySheet.GetCellText(1,16).toString().replace(/\+/g, "-"));
	               mySheet.SetColHidden(17,0);
	               mySheet.SetColHidden(18,0);
	               mySheet.SetColHidden(19,0);
	               mySheet.SetColHidden(20,0);
	               mySheet.SetColHidden(21,0);
	               mySheet.SetColHidden(22,0);
	               mySheet.SetColHidden(23,0);
	               mySheet.SetCellBackColor(1,17,"#FFEFBF");
	               mySheet.SetCellBackColor(1,18,"#FFEFBF");
	               mySheet.SetCellBackColor(1,19,"#FFEFBF");
	               mySheet.SetCellBackColor(1,20,"#FFEFBF");
	               mySheet.SetCellBackColor(1,21,"#FFEFBF");
	               mySheet.SetCellBackColor(1,22,"#FFEFBF");
	               mySheet.SetCellBackColor(1,23,"#FFEFBF");
	           } else {
	               mySheet.SetCellText(1,16 ,mySheet.GetCellText(1,16).toString().replace(/\-/g, "+"));
	               mySheet.SetColHidden(17,1);
	               mySheet.SetColHidden(18,1);
	               mySheet.SetColHidden(19,1);
	               mySheet.SetColHidden(20,1);
	               mySheet.SetColHidden(21,1);
	               mySheet.SetColHidden(22,1);
	               mySheet.SetColHidden(23,1);
	           }
	        }
	    }
	} else if (document.frm.baseday.value >= '20190101') {
	    if (document.frm.pgcode.value == '16') {                       //RMC
	       if (mySheet.MouseRow()== 1 && mySheet.MouseCol()== 12) {
	           if(mySheet.GetColHidden(13)) {
	               mySheet.SetCellText(1,12 ,mySheet.GetCellText(1,12).toString().replace(/\+/g, "-"));
	               mySheet.SetColHidden(13,0);
	               mySheet.SetColHidden(14,0);
	               mySheet.SetColHidden(15,0);
	               mySheet.SetColHidden(16,0);
	               mySheet.SetCellBackColor(1,13,"#FFEFBF");
	               mySheet.SetCellBackColor(1,14,"#FFEFBF");
	               mySheet.SetCellBackColor(1,15,"#FFEFBF");
	               mySheet.SetCellBackColor(1,16,"#FFEFBF");
	           } else {
	               mySheet.SetCellText(1,13 ,mySheet.GetCellText(1,13).toString().replace(/\-/g, "+"));
	               mySheet.SetColHidden(13,1);
	               mySheet.SetColHidden(14,1);
	               mySheet.SetColHidden(15,1);
	               mySheet.SetColHidden(16,1);
	           }
	        }
	    } else {                                                       // 일반영업점
	       if (mySheet.MouseRow()== 1 && mySheet.MouseCol()== 16) {
	           if(mySheet.GetColHidden(17)) {
	               mySheet.SetCellText(1,16 ,mySheet.GetCellText(1,16).toString().replace(/\+/g, "-"));
	               mySheet.SetColHidden(17,0);
	               mySheet.SetColHidden(18,0);
	               mySheet.SetColHidden(19,0);
	               mySheet.SetColHidden(20,0);
	               mySheet.SetCellBackColor(1,17,"#FFEFBF");
	               mySheet.SetCellBackColor(1,18,"#FFEFBF");
	               mySheet.SetCellBackColor(1,19,"#FFEFBF");
	               mySheet.SetCellBackColor(1,20,"#FFEFBF");
	           } else {
	               mySheet.SetCellText(1,16 ,mySheet.GetCellText(1,16).toString().replace(/\-/g, "+"));
	               mySheet.SetColHidden(17,1);
	               mySheet.SetColHidden(18,1);
	               mySheet.SetColHidden(19,1);
	               mySheet.SetColHidden(20,1);
	           }
	        }
	    }
	}
	mySheet.SetHeaderRowHeight(32);

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
    <th class="wd10">Peer Group</th>
    <td colspan="2">
    	<select name="pgcode" id="pgcode" onchange="selectpgcode();">
    		<option value="0">전체</option>
    	</select>
    </td>
    <td align="right" class="end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
   	  <span class="btn_Grd" style="cursor:pointer; display:none;" id="print" border="0" onclick="javascript:doPrint();">인쇄</span>
    </td>
  </tr>
  <tr> 
    <th class="nobor">조회구분</th>
    <td class="nobor">
     <select name="sergb" onchange="allDelDataGrid(mySheet);showUnitText('원, %');">
                          <!--<option value="1">잔액</option>     -->
                          <!--<option value="3">반기평잔</option> -->
                          <option value="11">순증잔액</option>
     </select>
    </td>
    <th class="nobor">광역금융본부</th>
    <td class="nobor end" colspan="3">
     <select name="metrogb" onchange="allDelDataGrid(mySheet);showUnitText('원, %');">
    	 <option value="0">전체</option>
     </select>
    </td>
<!--    <th>자금구분</td>
    <td colspan="2">
    	<select name="fundgb" onchange="setFundgb()" disabled >
    		                    <option value="0">전체</option>
    		                    <option value="1">개인</option>
    		                    <option value="2">기업</option>
    		                    <option value="3">수산금융</option>
    	</select>
    </td>
-->
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
LoadPage();
htm_title = '<%=htm_title%>';
</script>
