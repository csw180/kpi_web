<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - 일일 그룹내성과집계표
'프로그램 ID  : rpdy_scr_2070.jsp
'프로그램 명  : 일일 그룹내성과집계표
'프로그램개요 : 일일 그룹내성과집계표
'작   성   자 : 조형석
'작   성   일 : 2013.03.26
====================================================================
'수정자/수정일/수정사유: 하진영/2014.03.25: 2014년 성과기준 반영
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "일일성과보고서";
    String      leftmenu_name    = "성과집계표"; 
    String      htm_title        = "일일 영업점 성과집계표 세부내역"; 
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
<script language="javascript" src="/kpi/rpdy/scr/rpdy_scr_2070.js"></script>

<script language="javascript">

function mySheet_OnClick(Row,Col,Value){
	
}

function hiddenGrid_OnSearchEnd(Code, Msg){
	
	//typeTime("전산정보부 및 성과 담당자 끝 - " + Msg);
	
	showUnitText(strUnitText);
    len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.baseday);
            document.frm.baseday.selectedIndex=0;
            //console.log( document.frm.baseday.value);
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

function hiddGridmon_OnSearchEnd(Code, Msg){
	baseday     = document.frm.baseday.value;
	
	//typeTime("기준일 조회 끝");
	//console.log("isRoleEnable : " + isRoleEnable);
	
	// 기준일자 정보
    if(isRoleEnable == '1') {
    	// 전산정보부 및 성과 담당자
        // typeTime("전산정보부 및 성과 담당자 시작");
    	hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2070.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=98");
    } else {
       	hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2070.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=99");
    }
	
}

function mySheet_OnSearchEnd(Code, Msg){
   showUnitText(strUnitText);

   showMsg(Code, Msg);
   
    
   if (document.frm.baseday.value >= '20160101') {
         // 2016년도 
   } else if (document.frm.baseday.value >= '20150701') {
         // 2015년도 
   		mySheet.SetCellValue(mySheet.HeaderRows(),7,(mySheet.GetCellValue(mySheet.HeaderRows(),6)  / mySheet.GetCellValue(mySheet.HeaderRows(), 5)  * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),12,(mySheet.GetCellValue(mySheet.HeaderRows(),11) / mySheet.GetCellValue(mySheet.HeaderRows(), 10) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),17,(mySheet.GetCellValue(mySheet.HeaderRows(),16) / mySheet.GetCellValue(mySheet.HeaderRows(), 15) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),22,(mySheet.GetCellValue(mySheet.HeaderRows(),21) / mySheet.GetCellValue(mySheet.HeaderRows(), 20) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),27,(mySheet.GetCellValue(mySheet.HeaderRows(),26) / mySheet.GetCellValue(mySheet.HeaderRows(), 25) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),32,(mySheet.GetCellValue(mySheet.HeaderRows(),31) / mySheet.GetCellValue(mySheet.HeaderRows(), 30) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),37,(mySheet.GetCellValue(mySheet.HeaderRows(),36) / mySheet.GetCellValue(mySheet.HeaderRows(), 35) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),42,(mySheet.GetCellValue(mySheet.HeaderRows(),41) / mySheet.GetCellValue(mySheet.HeaderRows(), 40) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),55,(mySheet.GetCellValue(mySheet.HeaderRows(),54) / mySheet.GetCellValue(mySheet.HeaderRows(), 53) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),60,(mySheet.GetCellValue(mySheet.HeaderRows(),59) / mySheet.GetCellValue(mySheet.HeaderRows(), 58) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),65,(mySheet.GetCellValue(mySheet.HeaderRows(),64) / mySheet.GetCellValue(mySheet.HeaderRows(), 63) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),70,(mySheet.GetCellValue(mySheet.HeaderRows(),69) / mySheet.GetCellValue(mySheet.HeaderRows(), 68) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),75,(mySheet.GetCellValue(mySheet.HeaderRows(),74) / mySheet.GetCellValue(mySheet.HeaderRows(), 73) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),80,(mySheet.GetCellValue(mySheet.HeaderRows(),79) / mySheet.GetCellValue(mySheet.HeaderRows(), 78) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),85,(mySheet.GetCellValue(mySheet.HeaderRows(),84) / mySheet.GetCellValue(mySheet.HeaderRows(), 83) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),88,(mySheet.GetCellValue(mySheet.HeaderRows(),87) / mySheet.GetCellValue(mySheet.HeaderRows(), 86) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),93,(mySheet.GetCellValue(mySheet.HeaderRows(),92) / mySheet.GetCellValue(mySheet.HeaderRows(), 91) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),98,(mySheet.GetCellValue(mySheet.HeaderRows(),97) / mySheet.GetCellValue(mySheet.HeaderRows(), 96) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),103,(mySheet.GetCellValue(mySheet.HeaderRows(),102) / mySheet.GetCellValue(mySheet.HeaderRows(), 101) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),108,(mySheet.GetCellValue(mySheet.HeaderRows(),107) / mySheet.GetCellValue(mySheet.HeaderRows(), 106) * 100 ).toFixed(1),0);
   } else if (document.frm.baseday.value >= '20150101') {
         // 2015년도 
   		mySheet.SetCellValue(mySheet.HeaderRows(),7,(mySheet.GetCellValue(mySheet.HeaderRows(),6)  / mySheet.GetCellValue(mySheet.HeaderRows(), 5)  * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),12,(mySheet.GetCellValue(mySheet.HeaderRows(),11) / mySheet.GetCellValue(mySheet.HeaderRows(), 10) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),17,(mySheet.GetCellValue(mySheet.HeaderRows(),16) / mySheet.GetCellValue(mySheet.HeaderRows(), 15) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),22,(mySheet.GetCellValue(mySheet.HeaderRows(),21) / mySheet.GetCellValue(mySheet.HeaderRows(), 20) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),27,(mySheet.GetCellValue(mySheet.HeaderRows(),26) / mySheet.GetCellValue(mySheet.HeaderRows(), 25) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),32,(mySheet.GetCellValue(mySheet.HeaderRows(),31) / mySheet.GetCellValue(mySheet.HeaderRows(), 30) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),37,(mySheet.GetCellValue(mySheet.HeaderRows(),36) / mySheet.GetCellValue(mySheet.HeaderRows(), 35) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),42,(mySheet.GetCellValue(mySheet.HeaderRows(),41) / mySheet.GetCellValue(mySheet.HeaderRows(), 40) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),55,(mySheet.GetCellValue(mySheet.HeaderRows(),54) / mySheet.GetCellValue(mySheet.HeaderRows(), 53) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),60,(mySheet.GetCellValue(mySheet.HeaderRows(),59) / mySheet.GetCellValue(mySheet.HeaderRows(), 58) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),65,(mySheet.GetCellValue(mySheet.HeaderRows(),64) / mySheet.GetCellValue(mySheet.HeaderRows(), 63) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),70,(mySheet.GetCellValue(mySheet.HeaderRows(),69) / mySheet.GetCellValue(mySheet.HeaderRows(), 68) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),75,(mySheet.GetCellValue(mySheet.HeaderRows(),74) / mySheet.GetCellValue(mySheet.HeaderRows(), 73) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),80,(mySheet.GetCellValue(mySheet.HeaderRows(),79) / mySheet.GetCellValue(mySheet.HeaderRows(), 78) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),83,(mySheet.GetCellValue(mySheet.HeaderRows(),82) / mySheet.GetCellValue(mySheet.HeaderRows(), 81) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),88,(mySheet.GetCellValue(mySheet.HeaderRows(),87) / mySheet.GetCellValue(mySheet.HeaderRows(), 86) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),93,(mySheet.GetCellValue(mySheet.HeaderRows(),92) / mySheet.GetCellValue(mySheet.HeaderRows(), 91) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),98,(mySheet.GetCellValue(mySheet.HeaderRows(),97) / mySheet.GetCellValue(mySheet.HeaderRows(), 96) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),103,(mySheet.GetCellValue(mySheet.HeaderRows(),102) / mySheet.GetCellValue(mySheet.HeaderRows(), 101) * 100 ).toFixed(1),0);
   } else if (document.frm.baseday.value >= '20140701') {
         // 2014년도 하반기
   		mySheet.SetCellValue(mySheet.HeaderRows(),7,(mySheet.GetCellValue(mySheet.HeaderRows(),6)  / mySheet.GetCellValue(mySheet.HeaderRows(), 5)  * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),12,(mySheet.GetCellValue(mySheet.HeaderRows(),11) / mySheet.GetCellValue(mySheet.HeaderRows(), 10) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),17,(mySheet.GetCellValue(mySheet.HeaderRows(),16) / mySheet.GetCellValue(mySheet.HeaderRows(), 15) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),22,(mySheet.GetCellValue(mySheet.HeaderRows(),21) / mySheet.GetCellValue(mySheet.HeaderRows(), 20) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),27,(mySheet.GetCellValue(mySheet.HeaderRows(),26) / mySheet.GetCellValue(mySheet.HeaderRows(), 25) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),32,(mySheet.GetCellValue(mySheet.HeaderRows(),31) / mySheet.GetCellValue(mySheet.HeaderRows(), 30) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),37,(mySheet.GetCellValue(mySheet.HeaderRows(),36) / mySheet.GetCellValue(mySheet.HeaderRows(), 35) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),54,(mySheet.GetCellValue(mySheet.HeaderRows(),53) / mySheet.GetCellValue(mySheet.HeaderRows(), 52) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),59,(mySheet.GetCellValue(mySheet.HeaderRows(),58) / mySheet.GetCellValue(mySheet.HeaderRows(), 57) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),64,(mySheet.GetCellValue(mySheet.HeaderRows(),63) / mySheet.GetCellValue(mySheet.HeaderRows(), 62) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),69,(mySheet.GetCellValue(mySheet.HeaderRows(),68) / mySheet.GetCellValue(mySheet.HeaderRows(), 67) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),74,(mySheet.GetCellValue(mySheet.HeaderRows(),73) / mySheet.GetCellValue(mySheet.HeaderRows(), 72) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),79,(mySheet.GetCellValue(mySheet.HeaderRows(),78) / mySheet.GetCellValue(mySheet.HeaderRows(), 77) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),84,(mySheet.GetCellValue(mySheet.HeaderRows(),83) / mySheet.GetCellValue(mySheet.HeaderRows(), 82) * 100 ).toFixed(1),0);
   } else if (document.frm.baseday.value >= '20140101') {
         // 2014년도
   		mySheet.SetCellValue(mySheet.HeaderRows(),7,(mySheet.GetCellValue(mySheet.HeaderRows(),6)  / mySheet.GetCellValue(mySheet.HeaderRows(), 5)  * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),12,(mySheet.GetCellValue(mySheet.HeaderRows(),11) / mySheet.GetCellValue(mySheet.HeaderRows(), 10) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),17,(mySheet.GetCellValue(mySheet.HeaderRows(),16) / mySheet.GetCellValue(mySheet.HeaderRows(), 15) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),22,(mySheet.GetCellValue(mySheet.HeaderRows(),21) / mySheet.GetCellValue(mySheet.HeaderRows(), 20) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),27,(mySheet.GetCellValue(mySheet.HeaderRows(),26) / mySheet.GetCellValue(mySheet.HeaderRows(), 25) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),48,(mySheet.GetCellValue(mySheet.HeaderRows(),47) / mySheet.GetCellValue(mySheet.HeaderRows(), 46) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),53,(mySheet.GetCellValue(mySheet.HeaderRows(),52) / mySheet.GetCellValue(mySheet.HeaderRows(), 51) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),58,(mySheet.GetCellValue(mySheet.HeaderRows(),57) / mySheet.GetCellValue(mySheet.HeaderRows(), 56) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),63,(mySheet.GetCellValue(mySheet.HeaderRows(),62) / mySheet.GetCellValue(mySheet.HeaderRows(), 61) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),68,(mySheet.GetCellValue(mySheet.HeaderRows(),67) / mySheet.GetCellValue(mySheet.HeaderRows(), 66) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),73,(mySheet.GetCellValue(mySheet.HeaderRows(),72) / mySheet.GetCellValue(mySheet.HeaderRows(), 71) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),78,(mySheet.GetCellValue(mySheet.HeaderRows(),77) / mySheet.GetCellValue(mySheet.HeaderRows(), 76) * 100 ).toFixed(1),0);
   } else if (document.frm.baseday.value >= '20130101') {
         // 2013년도
   		mySheet.SetCellValue(mySheet.HeaderRows(),7,(mySheet.GetCellValue(mySheet.HeaderRows(),6)  / mySheet.GetCellValue(mySheet.HeaderRows(), 5)  * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),12,(mySheet.GetCellValue(mySheet.HeaderRows(),11) / mySheet.GetCellValue(mySheet.HeaderRows(), 10) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),17,(mySheet.GetCellValue(mySheet.HeaderRows(),16) / mySheet.GetCellValue(mySheet.HeaderRows(), 15) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),22,(mySheet.GetCellValue(mySheet.HeaderRows(),21) / mySheet.GetCellValue(mySheet.HeaderRows(), 20) * 100 ).toFixed(1),0);
   } else if (document.frm.baseday.value >= '20120701') {
         // 2012년도 하반기
   		mySheet.SetCellValue(mySheet.HeaderRows(),8,(mySheet.GetCellValue(mySheet.HeaderRows(),6)  / mySheet.GetCellValue(mySheet.HeaderRows(), 5)  * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),14,(mySheet.GetCellValue(mySheet.HeaderRows(),12) / mySheet.GetCellValue(mySheet.HeaderRows(), 11) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),20,(mySheet.GetCellValue(mySheet.HeaderRows(),18) / mySheet.GetCellValue(mySheet.HeaderRows(), 17) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),26,(mySheet.GetCellValue(mySheet.HeaderRows(),24) / mySheet.GetCellValue(mySheet.HeaderRows(), 23) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),31,(mySheet.GetCellValue(mySheet.HeaderRows(),30) / mySheet.GetCellValue(mySheet.HeaderRows(), 29) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),36,(mySheet.GetCellValue(mySheet.HeaderRows(),35) / mySheet.GetCellValue(mySheet.HeaderRows(), 34) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),41,(mySheet.GetCellValue(mySheet.HeaderRows(),40) / mySheet.GetCellValue(mySheet.HeaderRows(), 39) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),46,(mySheet.GetCellValue(mySheet.HeaderRows(),45) / mySheet.GetCellValue(mySheet.HeaderRows(), 44) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),51,(mySheet.GetCellValue(mySheet.HeaderRows(),50) / mySheet.GetCellValue(mySheet.HeaderRows(), 49) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),56,(mySheet.GetCellValue(mySheet.HeaderRows(),55) / mySheet.GetCellValue(mySheet.HeaderRows(), 54) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),62,(mySheet.GetCellValue(mySheet.HeaderRows(),60) / mySheet.GetCellValue(mySheet.HeaderRows(), 59) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),63,(mySheet.GetCellValue(mySheet.HeaderRows(),61) / mySheet.GetCellValue(mySheet.HeaderRows(), 59) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),69,(mySheet.GetCellValue(mySheet.HeaderRows(),67) / mySheet.GetCellValue(mySheet.HeaderRows(), 66) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),70,(mySheet.GetCellValue(mySheet.HeaderRows(),68) / mySheet.GetCellValue(mySheet.HeaderRows(), 66) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),76,(mySheet.GetCellValue(mySheet.HeaderRows(),74) / mySheet.GetCellValue(mySheet.HeaderRows(), 73) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),77,(mySheet.GetCellValue(mySheet.HeaderRows(),75) / mySheet.GetCellValue(mySheet.HeaderRows(), 73) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),82,(mySheet.GetCellValue(mySheet.HeaderRows(),81) / mySheet.GetCellValue(mySheet.HeaderRows(), 80) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),87,(mySheet.GetCellValue(mySheet.HeaderRows(),86) / mySheet.GetCellValue(mySheet.HeaderRows(), 85) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),92,(mySheet.GetCellValue(mySheet.HeaderRows(),91) / mySheet.GetCellValue(mySheet.HeaderRows(), 90) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),97,(mySheet.GetCellValue(mySheet.HeaderRows(),96) / mySheet.GetCellValue(mySheet.HeaderRows(), 95) * 100 ).toFixed(1),0);
   } else {
   		mySheet.SetCellValue(mySheet.HeaderRows(),8,(mySheet.GetCellValue(mySheet.HeaderRows(),6)  / mySheet.GetCellValue(mySheet.HeaderRows(), 5)  * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),14,(mySheet.GetCellValue(mySheet.HeaderRows(),12) / mySheet.GetCellValue(mySheet.HeaderRows(), 11) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),20,(mySheet.GetCellValue(mySheet.HeaderRows(),18) / mySheet.GetCellValue(mySheet.HeaderRows(), 17) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),26,(mySheet.GetCellValue(mySheet.HeaderRows(),24) / mySheet.GetCellValue(mySheet.HeaderRows(), 23) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),31,(mySheet.GetCellValue(mySheet.HeaderRows(),30) / mySheet.GetCellValue(mySheet.HeaderRows(), 29) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),36,(mySheet.GetCellValue(mySheet.HeaderRows(),35) / mySheet.GetCellValue(mySheet.HeaderRows(), 34) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),41,(mySheet.GetCellValue(mySheet.HeaderRows(),40) / mySheet.GetCellValue(mySheet.HeaderRows(), 39) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),46,(mySheet.GetCellValue(mySheet.HeaderRows(),45) / mySheet.GetCellValue(mySheet.HeaderRows(), 44) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),51,(mySheet.GetCellValue(mySheet.HeaderRows(),50) / mySheet.GetCellValue(mySheet.HeaderRows(), 49) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),56,(mySheet.GetCellValue(mySheet.HeaderRows(),55) / mySheet.GetCellValue(mySheet.HeaderRows(), 54) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),61,(mySheet.GetCellValue(mySheet.HeaderRows(),60) / mySheet.GetCellValue(mySheet.HeaderRows(), 59) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),66,(mySheet.GetCellValue(mySheet.HeaderRows(),65) / mySheet.GetCellValue(mySheet.HeaderRows(), 64) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),71,(mySheet.GetCellValue(mySheet.HeaderRows(),70) / mySheet.GetCellValue(mySheet.HeaderRows(), 69) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),76,(mySheet.GetCellValue(mySheet.HeaderRows(),75) / mySheet.GetCellValue(mySheet.HeaderRows(), 74) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),81,(mySheet.GetCellValue(mySheet.HeaderRows(),80) / mySheet.GetCellValue(mySheet.HeaderRows(), 79) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),86,(mySheet.GetCellValue(mySheet.HeaderRows(),85) / mySheet.GetCellValue(mySheet.HeaderRows(), 84) * 100 ).toFixed(1),0);
   		mySheet.SetCellValue(mySheet.HeaderRows(),91,(mySheet.GetCellValue(mySheet.HeaderRows(),90) / mySheet.GetCellValue(mySheet.HeaderRows(), 89) * 100 ).toFixed(1),0);
       } 

}    

function mySheet_OnSelectMenu(sAction){
 
	doAction(sAction);
}

function mySheet_OnDownFinish(downloadType, result) {
	if(result) {
	    
	    var baseday     = document.frm.baseday.value;
	    var pgcode      = document.frm.pgcode.value;
	    var metrogb     = document.frm.metrogb.value;
	    
	    condition = "기준일="+baseday+";PG코드="+pgcode+";광역금융본부="+metrogb;
        
	    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition));
	}
	
}
/* 무한루프 Onsearchend로 변경
function mySheet_OnChangeSum(Row){
	if (document.frm.baseday.value >= '20160101') {
	      // 2016년도 
	} else if (document.frm.baseday.value >= '20150701') {
	      // 2015년도 
			mySheet.SetCellValue(Row,7,mySheet.GetCellValue(Row,6)  / mySheet.GetCellValue(Row, 5)  * 100 ,0);
			mySheet.SetCellValue(Row,12,mySheet.GetCellValue(Row,11) / mySheet.GetCellValue(Row, 10) * 100 ,0);
			mySheet.SetCellValue(Row,17,mySheet.GetCellValue(Row,16) / mySheet.GetCellValue(Row, 15) * 100 ,0);
			mySheet.SetCellValue(Row,22,mySheet.GetCellValue(Row,21) / mySheet.GetCellValue(Row, 20) * 100 ,0);
			mySheet.SetCellValue(Row,27,mySheet.GetCellValue(Row,26) / mySheet.GetCellValue(Row, 25) * 100 ,0);
			mySheet.SetCellValue(Row,32,mySheet.GetCellValue(Row,31) / mySheet.GetCellValue(Row, 30) * 100 ,0);
			mySheet.SetCellValue(Row,37,mySheet.GetCellValue(Row,36) / mySheet.GetCellValue(Row, 35) * 100 ,0);
			mySheet.SetCellValue(Row,42,mySheet.GetCellValue(Row,41) / mySheet.GetCellValue(Row, 40) * 100 ,0);
			mySheet.SetCellValue(Row,55,mySheet.GetCellValue(Row,54) / mySheet.GetCellValue(Row, 53) * 100 ,0);
			mySheet.SetCellValue(Row,60,mySheet.GetCellValue(Row,59) / mySheet.GetCellValue(Row, 58) * 100 ,0);
			mySheet.SetCellValue(Row,65,mySheet.GetCellValue(Row,64) / mySheet.GetCellValue(Row, 63) * 100 ,0);
			mySheet.SetCellValue(Row,70,mySheet.GetCellValue(Row,69) / mySheet.GetCellValue(Row, 68) * 100 ,0);
			mySheet.SetCellValue(Row,75,mySheet.GetCellValue(Row,74) / mySheet.GetCellValue(Row, 73) * 100 ,0);
			mySheet.SetCellValue(Row,80,mySheet.GetCellValue(Row,79) / mySheet.GetCellValue(Row, 78) * 100 ,0);
			mySheet.SetCellValue(Row,85,mySheet.GetCellValue(Row,84) / mySheet.GetCellValue(Row, 83) * 100 ,0);
			mySheet.SetCellValue(Row,88,mySheet.GetCellValue(Row,87) / mySheet.GetCellValue(Row, 86) * 100 ,0);
			mySheet.SetCellValue(Row,93,mySheet.GetCellValue(Row,92) / mySheet.GetCellValue(Row, 91) * 100 ,0);
			mySheet.SetCellValue(Row,98,mySheet.GetCellValue(Row,97) / mySheet.GetCellValue(Row, 96) * 100 ,0);
			mySheet.SetCellValue(Row,103,mySheet.GetCellValue(Row,102) / mySheet.GetCellValue(Row, 101) * 100 ,0);
			mySheet.SetCellValue(Row,108,mySheet.GetCellValue(Row,107) / mySheet.GetCellValue(Row, 106) * 100 ,0);
	} else if (document.frm.baseday.value >= '20150101') {
	      // 2015년도 
			mySheet.SetCellValue(Row,7,mySheet.GetCellValue(Row,6)  / mySheet.GetCellValue(Row, 5)  * 100 ,0);
			mySheet.SetCellValue(Row,12,mySheet.GetCellValue(Row,11) / mySheet.GetCellValue(Row, 10) * 100 ,0);
			mySheet.SetCellValue(Row,17,mySheet.GetCellValue(Row,16) / mySheet.GetCellValue(Row, 15) * 100 ,0);
			mySheet.SetCellValue(Row,22,mySheet.GetCellValue(Row,21) / mySheet.GetCellValue(Row, 20) * 100 ,0);
			mySheet.SetCellValue(Row,27,mySheet.GetCellValue(Row,26) / mySheet.GetCellValue(Row, 25) * 100 ,0);
			mySheet.SetCellValue(Row,32,mySheet.GetCellValue(Row,31) / mySheet.GetCellValue(Row, 30) * 100 ,0);
			mySheet.SetCellValue(Row,37,mySheet.GetCellValue(Row,36) / mySheet.GetCellValue(Row, 35) * 100 ,0);
			mySheet.SetCellValue(Row,42,mySheet.GetCellValue(Row,41) / mySheet.GetCellValue(Row, 40) * 100 ,0);
			mySheet.SetCellValue(Row,55,mySheet.GetCellValue(Row,54) / mySheet.GetCellValue(Row, 53) * 100 ,0);
			mySheet.SetCellValue(Row,60,mySheet.GetCellValue(Row,59) / mySheet.GetCellValue(Row, 58) * 100 ,0);
			mySheet.SetCellValue(Row,65,mySheet.GetCellValue(Row,64) / mySheet.GetCellValue(Row, 63) * 100 ,0);
			mySheet.SetCellValue(Row,70,mySheet.GetCellValue(Row,69) / mySheet.GetCellValue(Row, 68) * 100 ,0);
			mySheet.SetCellValue(Row,75,mySheet.GetCellValue(Row,74) / mySheet.GetCellValue(Row, 73) * 100 ,0);
			mySheet.SetCellValue(Row,80,mySheet.GetCellValue(Row,79) / mySheet.GetCellValue(Row, 78) * 100 ,0);
			mySheet.SetCellValue(Row,83,mySheet.GetCellValue(Row,82) / mySheet.GetCellValue(Row, 81) * 100 ,0);
			mySheet.SetCellValue(Row,88,mySheet.GetCellValue(Row,87) / mySheet.GetCellValue(Row, 86) * 100 ,0);
			mySheet.SetCellValue(Row,93,mySheet.GetCellValue(Row,92) / mySheet.GetCellValue(Row, 91) * 100 ,0);
			mySheet.SetCellValue(Row,98,mySheet.GetCellValue(Row,97) / mySheet.GetCellValue(Row, 96) * 100 ,0);
			mySheet.SetCellValue(Row,103,mySheet.GetCellValue(Row,102) / mySheet.GetCellValue(Row, 101) * 100 ,0);
	} else if (document.frm.baseday.value >= '20140701') {
	      // 2014년도 하반기
			mySheet.SetCellValue(Row,7,mySheet.GetCellValue(Row,6)  / mySheet.GetCellValue(Row, 5)  * 100 ,0);
			mySheet.SetCellValue(Row,12,mySheet.GetCellValue(Row,11) / mySheet.GetCellValue(Row, 10) * 100 ,0);
			mySheet.SetCellValue(Row,17,mySheet.GetCellValue(Row,16) / mySheet.GetCellValue(Row, 15) * 100 ,0);
			mySheet.SetCellValue(Row,22,mySheet.GetCellValue(Row,21) / mySheet.GetCellValue(Row, 20) * 100 ,0);
			mySheet.SetCellValue(Row,27,mySheet.GetCellValue(Row,26) / mySheet.GetCellValue(Row, 25) * 100 ,0);
			mySheet.SetCellValue(Row,32,mySheet.GetCellValue(Row,31) / mySheet.GetCellValue(Row, 30) * 100 ,0);
			mySheet.SetCellValue(Row,37,mySheet.GetCellValue(Row,36) / mySheet.GetCellValue(Row, 35) * 100 ,0);
			mySheet.SetCellValue(Row,54,mySheet.GetCellValue(Row,53) / mySheet.GetCellValue(Row, 52) * 100 ,0);
			mySheet.SetCellValue(Row,59,mySheet.GetCellValue(Row,58) / mySheet.GetCellValue(Row, 57) * 100 ,0);
			mySheet.SetCellValue(Row,64,mySheet.GetCellValue(Row,63) / mySheet.GetCellValue(Row, 62) * 100 ,0);
			mySheet.SetCellValue(Row,69,mySheet.GetCellValue(Row,68) / mySheet.GetCellValue(Row, 67) * 100 ,0);
			mySheet.SetCellValue(Row,74,mySheet.GetCellValue(Row,73) / mySheet.GetCellValue(Row, 72) * 100 ,0);
			mySheet.SetCellValue(Row,79,mySheet.GetCellValue(Row,78) / mySheet.GetCellValue(Row, 77) * 100 ,0);
			mySheet.SetCellValue(Row,84,mySheet.GetCellValue(Row,83) / mySheet.GetCellValue(Row, 82) * 100 ,0);
	} else if (document.frm.baseday.value >= '20140101') {
	      // 2014년도
			mySheet.SetCellValue(Row,7,mySheet.GetCellValue(Row,6)  / mySheet.GetCellValue(Row, 5)  * 100 ,0);
			mySheet.SetCellValue(Row,12,mySheet.GetCellValue(Row,11) / mySheet.GetCellValue(Row, 10) * 100 ,0);
			mySheet.SetCellValue(Row,17,mySheet.GetCellValue(Row,16) / mySheet.GetCellValue(Row, 15) * 100 ,0);
			mySheet.SetCellValue(Row,22,mySheet.GetCellValue(Row,21) / mySheet.GetCellValue(Row, 20) * 100 ,0);
			mySheet.SetCellValue(Row,27,mySheet.GetCellValue(Row,26) / mySheet.GetCellValue(Row, 25) * 100 ,0);
			mySheet.SetCellValue(Row,48,mySheet.GetCellValue(Row,47) / mySheet.GetCellValue(Row, 46) * 100 ,0);
			mySheet.SetCellValue(Row,53,mySheet.GetCellValue(Row,52) / mySheet.GetCellValue(Row, 51) * 100 ,0);
			mySheet.SetCellValue(Row,58,mySheet.GetCellValue(Row,57) / mySheet.GetCellValue(Row, 56) * 100 ,0);
			mySheet.SetCellValue(Row,63,mySheet.GetCellValue(Row,62) / mySheet.GetCellValue(Row, 61) * 100 ,0);
			mySheet.SetCellValue(Row,68,mySheet.GetCellValue(Row,67) / mySheet.GetCellValue(Row, 66) * 100 ,0);
			mySheet.SetCellValue(Row,73,mySheet.GetCellValue(Row,72) / mySheet.GetCellValue(Row, 71) * 100 ,0);
			mySheet.SetCellValue(Row,78,mySheet.GetCellValue(Row,77) / mySheet.GetCellValue(Row, 76) * 100 ,0);
	} else if (document.frm.baseday.value >= '20130101') {
	      // 2013년도
			mySheet.SetCellValue(Row,7,mySheet.GetCellValue(Row,6)  / mySheet.GetCellValue(Row, 5)  * 100 ,0);
			mySheet.SetCellValue(Row,12,mySheet.GetCellValue(Row,11) / mySheet.GetCellValue(Row, 10) * 100 ,0);
			mySheet.SetCellValue(Row,17,mySheet.GetCellValue(Row,16) / mySheet.GetCellValue(Row, 15) * 100 ,0);
			mySheet.SetCellValue(Row,22,mySheet.GetCellValue(Row,21) / mySheet.GetCellValue(Row, 20) * 100 ,0);
	} else if (document.frm.baseday.value >= '20120701') {
	      // 2012년도 하반기
			mySheet.SetCellValue(Row,8,mySheet.GetCellValue(Row,6)  / mySheet.GetCellValue(Row, 5)  * 100 ,0);
			mySheet.SetCellValue(Row,14,mySheet.GetCellValue(Row,12) / mySheet.GetCellValue(Row, 11) * 100 ,0);
			mySheet.SetCellValue(Row,20,mySheet.GetCellValue(Row,18) / mySheet.GetCellValue(Row, 17) * 100 ,0);
			mySheet.SetCellValue(Row,26,mySheet.GetCellValue(Row,24) / mySheet.GetCellValue(Row, 23) * 100 ,0);
			mySheet.SetCellValue(Row,31,mySheet.GetCellValue(Row,30) / mySheet.GetCellValue(Row, 29) * 100 ,0);
			mySheet.SetCellValue(Row,36,mySheet.GetCellValue(Row,35) / mySheet.GetCellValue(Row, 34) * 100 ,0);
			mySheet.SetCellValue(Row,41,mySheet.GetCellValue(Row,40) / mySheet.GetCellValue(Row, 39) * 100 ,0);
			mySheet.SetCellValue(Row,46,mySheet.GetCellValue(Row,45) / mySheet.GetCellValue(Row, 44) * 100 ,0);
			mySheet.SetCellValue(Row,51,mySheet.GetCellValue(Row,50) / mySheet.GetCellValue(Row, 49) * 100 ,0);
			mySheet.SetCellValue(Row,56,mySheet.GetCellValue(Row,55) / mySheet.GetCellValue(Row, 54) * 100 ,0);
			mySheet.SetCellValue(Row,62,mySheet.GetCellValue(Row,60) / mySheet.GetCellValue(Row, 59) * 100 ,0);
			mySheet.SetCellValue(Row,63,mySheet.GetCellValue(Row,61) / mySheet.GetCellValue(Row, 59) * 100 ,0);
			mySheet.SetCellValue(Row,69,mySheet.GetCellValue(Row,67) / mySheet.GetCellValue(Row, 66) * 100 ,0);
			mySheet.SetCellValue(Row,70,mySheet.GetCellValue(Row,68) / mySheet.GetCellValue(Row, 66) * 100 ,0);
			mySheet.SetCellValue(Row,76,mySheet.GetCellValue(Row,74) / mySheet.GetCellValue(Row, 73) * 100 ,0);
			mySheet.SetCellValue(Row,77,mySheet.GetCellValue(Row,75) / mySheet.GetCellValue(Row, 73) * 100 ,0);
			mySheet.SetCellValue(Row,82,mySheet.GetCellValue(Row,81) / mySheet.GetCellValue(Row, 80) * 100 ,0);
			mySheet.SetCellValue(Row,87,mySheet.GetCellValue(Row,86) / mySheet.GetCellValue(Row, 85) * 100 ,0);
			mySheet.SetCellValue(Row,92,mySheet.GetCellValue(Row,91) / mySheet.GetCellValue(Row, 90) * 100 ,0);
			mySheet.SetCellValue(Row,97,mySheet.GetCellValue(Row,96) / mySheet.GetCellValue(Row, 95) * 100 ,0);
	} else {
			mySheet.SetCellValue(Row,8,mySheet.GetCellValue(Row,6)  / mySheet.GetCellValue(Row, 5)  * 100 ,0);
			mySheet.SetCellValue(Row,14,mySheet.GetCellValue(Row,12) / mySheet.GetCellValue(Row, 11) * 100 ,0);
			mySheet.SetCellValue(Row,20,mySheet.GetCellValue(Row,18) / mySheet.GetCellValue(Row, 17) * 100 ,0);
			mySheet.SetCellValue(Row,26,mySheet.GetCellValue(Row,24) / mySheet.GetCellValue(Row, 23) * 100 ,0);
			mySheet.SetCellValue(Row,31,mySheet.GetCellValue(Row,30) / mySheet.GetCellValue(Row, 29) * 100 ,0);
			mySheet.SetCellValue(Row,36,mySheet.GetCellValue(Row,35) / mySheet.GetCellValue(Row, 34) * 100 ,0);
			mySheet.SetCellValue(Row,41,mySheet.GetCellValue(Row,40) / mySheet.GetCellValue(Row, 39) * 100 ,0);
			mySheet.SetCellValue(Row,46,mySheet.GetCellValue(Row,45) / mySheet.GetCellValue(Row, 44) * 100 ,0);
			mySheet.SetCellValue(Row,51,mySheet.GetCellValue(Row,50) / mySheet.GetCellValue(Row, 49) * 100 ,0);
			mySheet.SetCellValue(Row,56,mySheet.GetCellValue(Row,55) / mySheet.GetCellValue(Row, 54) * 100 ,0);
			mySheet.SetCellValue(Row,61,mySheet.GetCellValue(Row,60) / mySheet.GetCellValue(Row, 59) * 100 ,0);
			mySheet.SetCellValue(Row,66,mySheet.GetCellValue(Row,65) / mySheet.GetCellValue(Row, 64) * 100 ,0);
			mySheet.SetCellValue(Row,71,mySheet.GetCellValue(Row,70) / mySheet.GetCellValue(Row, 69) * 100 ,0);
			mySheet.SetCellValue(Row,76,mySheet.GetCellValue(Row,75) / mySheet.GetCellValue(Row, 74) * 100 ,0);
			mySheet.SetCellValue(Row,81,mySheet.GetCellValue(Row,80) / mySheet.GetCellValue(Row, 79) * 100 ,0);
			mySheet.SetCellValue(Row,86,mySheet.GetCellValue(Row,85) / mySheet.GetCellValue(Row, 84) * 100 ,0);
			mySheet.SetCellValue(Row,91,mySheet.GetCellValue(Row,90) / mySheet.GetCellValue(Row, 89) * 100 ,0);
	    } 

}
*/
</script> 
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <tr> 
    <th>기준일</th>
    <td>
     <select name="baseday" class="select" onchange="selectmonth();"></select>
    </td>
    <th>Peer Group</th>
    <td><select name="pgcode" onchange="selectpgcode()"><option value="0">전체</option></select></td>
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

  <tr style="display:none;"> <!-- 세부내역 체크박스 살리면 조회 속도 저하돼서, 세부내역 빼기로 송수영 대리님과 협의 (2022.09.01)-->
    <th class="nobor">세부내역</th>
    <td class="nobor end" colspan="7"> <input type="checkbox" name="subChk" onclick="javascript:selectsubchk();"> </td>
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
