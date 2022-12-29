<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - 총예수금 평가내역
'프로그램 ID  : rpop_scr_5040.jsp
'프로그램 명  : 총예수금 평가내역
'프로그램개요 : 총예수금 평가내역
'작   성   자 : 조형석
'작   성   일 : 2008.04.24
====================================================================
' 수정자/수정일   : 수정사유
' 하진영/20110315 : 2011년 총예수금 평가내역 layout변경
' 하진영/20110609 : NEXTRO 대응
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "영업점보고서";
    String      leftmenu_name    = "기타"; 
    String      htm_title        = "총예수금 내역"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
    String      allRole          = "0";

    //popup 으로 사용시 받는 Parameter
    String basemonth     = JSPUtil.getParameter(request,"basemonth","");
    String jumcode       = JSPUtil.getParameter(request,"jumcode","");
    String jumname       = JSPUtil.getParameter(request,"jumname","");
    String pgcode        = JSPUtil.getParameter(request,"pgcode","");
    String pgname        = JSPUtil.getParameter(request,"pgname","");
    String sergb         = JSPUtil.getParameter(request,"sergb","");

    // 성과자료와 종수자료 차이분 나타내기위함 그리드 설정위한 전산담당자 구분
    SignOnUserAccount   account         = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
    
    String role[] = account.getRole(); //권한

    for (int i = 0; i < role.length; i++) {
        if (role[i].trim().equals("450")) {
           allRole="1";
           break;
        }
   
    } 
    
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_5040.js"></script>

<script>
	function mySheet_OnClick(Row,Col,Value){}
	
	function mySheet_OnDblClick(Row,Col,Value)
	{
	  /* // 2022-02-21 rpop_6010 화면 사용안함. 주석처리.
	  if (Col == 17 || Col == 18) { 
	      if(Row < 2) return;
	      var basemonth = document.frm.basemonth.value;
	      var pgcode    = document.frm.pgcode.value;
	      var sergb     = document.frm.sergb.value;
	      var WideCode  = document.frm.WideCode.value;
	        
	      if (basemonth >= '201301') {   // 2013년 수시입출식 실적click시만
	          var url = "kpi.rpop.rpop_6010.screen?hidden_key=9&basemonth="+basemonth+"&pgcode="+pgcode+"&sergb="+sergb+"&WideCode="+WideCode+"&IS_POPUP=Y&SCREEN_URL=kpi.rpop.rpop_6010.screen";
	          win_open2(url,820,580);    
	      }
	  } else return;
	  */
	} 	    
	
	function hiddenGrid_OnSearchEnd(Code, Msg){
	    len = Msg.length;
	    if (len > 0){
	        if (Msg.substr(0,1) == "B"){
	            ComboValue(document.frm.basemonth);
	            document.frm.basemonth.selectedIndex=0;
	            selectmonth();
	        }else if (Msg.substr(0,1) == "J"){
	            if (Msg.substr(1,len) == "7"){
	                ComboValue(document.frm.pgcode);
	                sel_WideCode();
	            }else if(Msg.substr(1,len) == "49"){
	                ComboValue(document.frm.WideCode);
	            }      
	        }else if (Msg.substr(0,1) == "C"){
	              ComboValue(document.frm.productcode);
	        }else{
	            alert(ErrMsg);
	        }
	    }
	}
	
	function mySheet_OnSearchEnd(Code, Msg)
	{    
		showMsg(Code, Msg);
		showUnitText("원, %");
		mySheet.SetSumValue(0,"합 계");
		mySheet.SetCellAlign(mySheet.HeaderRows(),0,"Center");
		//합계행 병합
		var basemonth = (document.frm.basemonth.value).substring(0,4);
		
		switch(basemonth)
		{
			case "2017":
			case "2016":
			case "2015":
			case "2014":
			case "2013":
				mySheet.SetMergeCell (mySheet.HeaderRows(), 0, 1,2);
				break;
			case "2012":
			case "2011":	
				mySheet.SetMergeCell (mySheet.HeaderRows(), 0, 1,3);
				break;
			case "2010":
			case "2009":
				mySheet.SetMergeCell (mySheet.HeaderRows(), 0, 1,4);
				break;
		}
		
		rowChangeSum();
	}
	
	function mySheet_OnSelectMenu(sAction)
	{
		doAction(sAction);
		/*
		if(sAction=="엑셀내려받기"){
		    doAction(sAction);
		}else if(sAction=="수시입출식예금조회"){  // 2022-02-21 rpop_6010 화면 사용안함. 
		  var basemonth = document.frm.basemonth.value;
		  var pgcode    = document.frm.pgcode.value;
		  var sergb     = document.frm.sergb.value;
		  var WideCode  = document.frm.WideCode.value;
		
		  var url = "kpi.rpop.rpop_6010.screen?hidden_key=9&basemonth="+basemonth+"&pgcode="+pgcode+"&sergb="+sergb+"&WideCode="+WideCode+"&IS_POPUP=Y&SCREEN_URL=kpi.rpop.rpop_6010.screen";
		  win_open2(url,820,580);    
		}
		*/
	}
	
	function rowChangeSum()
	{
		if (document.frm.basemonth.value >= '201707'){
	        mySheet.SetCellValue(mySheet.HeaderRows(),25,(mySheet.GetCellValue(mySheet.HeaderRows(),23) / mySheet.GetCellValue(mySheet.HeaderRows(), 24) * 100).toFixed(1) ,0); 
	     }else if (document.frm.basemonth.value >= '201701') {
	        mySheet.SetCellValue(mySheet.HeaderRows(),27,(mySheet.GetCellValue(mySheet.HeaderRows(),25) / mySheet.GetCellValue(mySheet.HeaderRows(), 26) * 100).toFixed(1) ,0); 
	     }else if (document.frm.basemonth.value >= '201607') {
	        mySheet.SetCellValue(mySheet.HeaderRows(),26,(mySheet.GetCellValue(mySheet.HeaderRows(),24) / mySheet.GetCellValue(mySheet.HeaderRows(), 25) * 100).toFixed(1) ,0); 
	     }else if (document.frm.basemonth.value >= '201507') {
	        mySheet.SetCellValue(mySheet.HeaderRows(),25,(mySheet.GetCellValue(mySheet.HeaderRows(),23) / mySheet.GetCellValue(mySheet.HeaderRows(), 24) * 100).toFixed(1) ,0); 
	     }else if (document.frm.basemonth.value >= '201407') {
	        mySheet.SetCellValue(mySheet.HeaderRows(),24,(mySheet.GetCellValue(mySheet.HeaderRows(),22) / mySheet.GetCellValue(mySheet.HeaderRows(), 23) * 100).toFixed(1) ,0); 
	     }else if (document.frm.basemonth.value >= '201401') {
	        mySheet.SetCellValue(mySheet.HeaderRows(),23,(mySheet.GetCellValue(mySheet.HeaderRows(),21) / mySheet.GetCellValue(mySheet.HeaderRows(), 22) * 100).toFixed(1) ,0); 
	     }else if (document.frm.basemonth.value >= '201301') {
	        mySheet.SetCellValue(mySheet.HeaderRows(),24,(mySheet.GetCellValue(mySheet.HeaderRows(),22) / mySheet.GetCellValue(mySheet.HeaderRows(), 23) * 100).toFixed(1) ,0); 
	     }else {
	     	if (document.frm.basemonth.value >= '201201')                  
	        	mySheet.SetCellValue(mySheet.HeaderRows(),89,(mySheet.GetCellValue(mySheet.HeaderRows(),83) / mySheet.GetCellValue(mySheet.HeaderRows(), 88) * 100).toFixed(1) ,0); 
	       	else   
	     		mySheet.SetCellValue(mySheet.HeaderRows(),77,(mySheet.GetCellValue(mySheet.HeaderRows(),71) / mySheet.GetCellValue(mySheet.HeaderRows(), 76) * 100).toFixed(1) ,0);
	     }
	}
	
	/*
	function mySheet_OnChangeSum(Row){
		alert(mySheet_OnChangeSum)
	     if (document.frm.basemonth.value >= '201707'){
	        mySheet.SetCellValue(mySheet.HeaderRows(),25,(mySheet.GetCellValue(mySheet.HeaderRows(),23) / mySheet.GetCellValue(mySheet.HeaderRows(), 24) * 100) ,0); //2017년 하반기        
	     }else if (document.frm.basemonth.value >= '201701') {
	        mySheet.SetCellValue(mySheet.HeaderRows(),27,(mySheet.GetCellValue(mySheet.HeaderRows(),25) / mySheet.GetCellValue(mySheet.HeaderRows(), 26) * 100) ,0); //2017년 상반기
	     }else if (document.frm.basemonth.value >= '201607') {
	        mySheet.SetCellValue(mySheet.HeaderRows(),26,(mySheet.GetCellValue(mySheet.HeaderRows(),24) / mySheet.GetCellValue(mySheet.HeaderRows(), 25) * 100) ,0); //2016년 하반기
	     }else if (document.frm.basemonth.value >= '201507') {
	        mySheet.SetCellValue(mySheet.HeaderRows(),25,(mySheet.GetCellValue(mySheet.HeaderRows(),23) / mySheet.GetCellValue(mySheet.HeaderRows(), 24) * 100) ,0); //2015년 하반기
	     }else if (document.frm.basemonth.value >= '201407') {
	        mySheet.SetCellValue(mySheet.HeaderRows(),24,(mySheet.GetCellValue(mySheet.HeaderRows(),22) / mySheet.GetCellValue(mySheet.HeaderRows(), 23) * 100) ,0); //2014년 하반기
	     }else if (document.frm.basemonth.value >= '201401') {
	        mySheet.SetCellValue(mySheet.HeaderRows(),23,(mySheet.GetCellValue(mySheet.HeaderRows(),21) / mySheet.GetCellValue(mySheet.HeaderRows(), 22) * 100) ,0); //2014년 상반기
	     }else if (document.frm.basemonth.value >= '201301') {
	        mySheet.SetCellValue(mySheet.HeaderRows(),24,(mySheet.GetCellValue(mySheet.HeaderRows(),22) / mySheet.GetCellValue(mySheet.HeaderRows(), 23) * 100) ,0); //2013년
	     }else {
	     	if (document.frm.basemonth.value >= '201201')                  
	        	mySheet.SetCellValue(mySheet.HeaderRows(),89,(mySheet.GetCellValue(mySheet.HeaderRows(),83) / mySheet.GetCellValue(mySheet.HeaderRows(), 88) * 100) ,0); //2012년
	       	else   
	     		mySheet.SetCellValue(mySheet.HeaderRows(),77,(mySheet.GetCellValue(mySheet.HeaderRows(),71) / mySheet.GetCellValue(mySheet.HeaderRows(), 76) * 100) ,0); //2011년
	     }
	}
	*/
	
	function mySheet_OnDownFinish(downloadType, result) {
		if(result) {
			var basemonth   = document.frm.basemonth.value;
		    var saupgbn     = document.frm.saupgbn.value;
		    var pgcode      = document.frm.pgcode.value;
		    var sergb       = document.frm.sergb.value;
		    var WideCode    = document.frm.WideCode.value;
		    
			condition = "기준년월="+basemonth+";사업부구분="+saupgbn+";PG코드="+pgcode+";조회구분="+sergb+";광역금융본부="+WideCode;
		    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"));
		}
	}
</script> 

<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <tr> 
    <th>기준년월</th>
    <td>
     <select name="basemonth" class="select" onchange="selectmonth()"></select>
    </td>
    <th>사업부구분</th>
    <td>
    	<select name="saupgbn"></select>
    </td>
    <th>Peer Group</th>
    <td>
    	<select name="pgcode" onchange="selectpgcode()">
    		<option value="0">전체</option>
    	</select>
    </td>
    <td class="end" align="right" >
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
      <span class="btn_Grd" style="cursor:pointer; display:none;" id="print" border="0" onclick="javascript:doPrint();">인쇄</span>
    </td>
  </tr>
  <tr> 
    <th class="nobor">조회구분</th>
    <td class="nobor">
     <select name="sergb"></select>
    </td>
    <th class="nobor">광역금융본부</th>
    <td class="nobor">
     <select name="WideCode" class="select"><option value="0">전체</option></select>
    </td>
    <th class="nobor">세부내역조회</th>
    <td colspan="2" class="nobor end"> <input type="checkbox" name="subChk" onclick="javascript:selectsubchk();"> </td>					        
  </tr>  
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
    <tr>
        <td>
            <marquee scrollamount='3' direction='left' width='700'> 2014년 6월 이전:중저원가성 포함 / 2014년 7월 ~ 2016년 12월:중저원가성 미포함 / 2017년 1월 이후:중저원가성 포함 </marquee>
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
isRoleEnable = '<%=allRole%>';
LoadPage();
htm_title = '<%=htm_title%>';
<%if(!(basemonth==null || basemonth.equals(""))){%>
   document.frm.basemonth.value="<%=basemonth%>";
   document.frm.pgcode.value="<%=pgcode%>";
   document.frm.sergb.value="<%=sergb%>";
   document.frm.WideCode.value="0";     
   initGrid();
   doAction("조회");
<%} %>
</script>