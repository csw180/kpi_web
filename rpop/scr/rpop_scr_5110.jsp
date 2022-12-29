<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 기타보고서 - RM대출금내역
'프로그램 ID  : rpop_scr_5110.jsp
'프로그램 명  : RM 대출금
'프로그램개요 : RM 대출금
'작   성   자 : 하진영
'작   성   일 : 2012.03.19
====================================================================
'수정자/수 정 일/수정사유
'
===============================================================--%>
<%@ include file="/module/jsp_header.inc"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    String      topmenu_name     = "영업점보고서";
    String      leftmenu_name    = "기타";
    String      htm_title        = "RM 대출금 내역";
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
    String      allRole          = "0";

    //popup 으로 사용시 받는 Parameter
    String basemonth     = JSPUtil.getParameter(request,"basemonth","");
    String jumcode       = JSPUtil.getParameter(request,"jumcode","");
    String jumname       = JSPUtil.getParameter(request,"jumname","");
    String sergb         = JSPUtil.getParameter(request,"sergb","2");
    String pgcode        = JSPUtil.getParameter(request,"pgcode","");
    String pgname        = JSPUtil.getParameter(request,"pgname","");

   try {
        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);

        //popup 아닌경우 로그인 정보 set
        if(basemonth==null || basemonth.equals("")){
            jumcode = account.getBranch_no();
            jumname = account.getBranch_name();
        }
    }catch(Exception exx)  {

    }

%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_5110.js"></script>

<script>
	function mySheet_OnClick(Row,Col,Value){}
	
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
	            }
	        }else if (Msg.substr(0,1) == "C"){
	            ComboValue(document.frm.productcode);
	        }else{
	            alert(ErrMsg);
	        }
	    }
	}
	
	function mySheet_OnMouseDown(Button, Shift, X, Y) {
		Row=mySheet.MouseRow();
		Col=mySheet.MouseCol();
		//22년 상반기 기준 숨김설정
		if (document.frm.basemonth.value >= '202201'){
		  if(Row == 1 && mySheet.GetCellValue(1,Col).substring(0,3) == "가중치"){
		    if(mySheet.GetColHidden(Col+7)){
		      //hidden 풀기
		      for(i=7;i>=1;i--){
		   	  	mySheet.SetColHidden(Col+i,0);
			    //header 색상 정의
			    mySheet.SetCellBackColor(0,Col+i,"#FFEFBF");
			    mySheet.SetCellBackColor(1,Col+i,"#FFEFBF");
		      }
		      mySheet.CellText(1, Col) = "가중치\n최종 실적*"; //-¶☞▶
		    }
		    else{
		      for(i=7;i>=1;i--){
		   	  	mySheet.SetColHidden(Col+i,1);
			    //header 색상 정의
			    mySheet.SetCellBackColor(1,Col+i,"#010101");
		      }
		      mySheet.SetCellText(1, Col ,"가중치\n최종 실적*"); //+☜◀
		    }
		    mySheet.SetRowHeight(1,32);
		  }
		}
		  //21년 상반기 기준 숨김설정
		if (document.frm.basemonth.value >= '202101') {
			if(Row == 1 && mySheet.GetCellValue(1,Col).substring(0,3) == "가중치"){
			    if(mySheet.GetColHidden(Col+8)){
			      //hidden 풀기
			      for(i=8;i>=1;i--){
			    	mySheet.SetColHidden(Col+i,0);
			      	//header 색상 정의
			      	mySheet.SetCellBackColor(0,Col+i,"#FFEFBF");
			      	mySheet.SetCellBackColor(1,Col+i,"#FFEFBF");
			      }
			      mySheet.SetCellText(1, Col ,"가중치\n최종 실적*");//-¶☞▶
			    }
			    else{
			      for(i=8;i>=1;i--){
			    	mySheet.SetColHidden(Col+i,1);
			      //header 색상 정의
			      	mySheet.SetCellBackColor(1,Col+i,"#010101");
			      }
			      mySheet.SetCellText(1, Col ,"가중치\n최종 실적*");//+☜◀
			    }
			    
			    mySheet.SetRowHeight(1,32);
			  }
		}
		//20년 하반기 기준 숨김설정
		else if (document.frm.basemonth.value >= '202007'){
			if(Row == 1 && mySheet.GetCellValue(1,Col).substring(0,3) == "가중치"){
			    if(mySheet.GetColHidden(Col+9)){
			      //hidden 풀기
			      for(i=9;i>=1;i--){
			    	mySheet.SetColHidden(Col+i,0);
			      	//header 색상 정의
			      	mySheet.SetCellBackColor(0,Col+i,"#FFEFBF");
			      	mySheet.SetCellBackColor(1,Col+i,"#FFEFBF");
			      }
			      
			      mySheet.SetCellText(1, Col ,"가중치\n최종 실적*");//-¶☞▶
			    }
			    else{
			      for(i=9;i>=1;i--){
			    	mySheet.SetColHidden(Col+i,1);
			      	//header 색상 정의
			      	mySheet.SetCellBackColor(1,Col+i,"#010101");
			      }
			      mySheet.SetCellText(1, Col ,"가중치\n최종 실적*");//+☜◀
			    }
			    
			    mySheet.SetRowHeight(1,32);
			}
		}
		  //20년 상반기 기준 숨김설정
		else if (document.frm.basemonth.value >= '202001'){
		if(Row == 1 && mySheet.GetCellValue(1,Col).substring(0,3) == "가중치"){
		    if(mySheet.GetColHidden(Col+7)){
		      //hidden 풀기
		      mySheet.SetColHidden(Col+7,0);
		      mySheet.SetColHidden(Col+6,0);
		      mySheet.SetColHidden(Col+5,0);
		      mySheet.SetColHidden(Col+4,0);
		      mySheet.SetColHidden(Col+3,0);
		      mySheet.SetColHidden(Col+2,0);
		      mySheet.SetColHidden(Col+1,0);
		      //header 색상 정의
		      mySheet.SetCellBackColor(1,Col+7,"#FFEFBF");
		      mySheet.SetCellBackColor(1,Col+6,"#FFEFBF");
		      mySheet.SetCellBackColor(1,Col+5,"#FFEFBF");
		      mySheet.SetCellBackColor(1,Col+4,"#FFEFBF");
		      mySheet.SetCellBackColor(1,Col+3,"#FFEFBF");
		      mySheet.SetCellBackColor(1,Col+2,"#FFEFBF");
		      mySheet.SetCellBackColor(1,Col+1,"#FFEFBF");
		      mySheet.SetCellText(1, Col ,"가중치\n최종 실적*");//-¶☞▶
		    }
		    else{
		      mySheet.SetCellText(1, Col ,"가중치\n최종 실적*");//+☜◀
		      mySheet.SetColHidden(Col+7,1);
		      mySheet.SetColHidden(Col+6,1);
		      mySheet.SetColHidden(Col+5,1);
		      mySheet.SetColHidden(Col+4,1);
		      mySheet.SetColHidden(Col+3,1);
		      mySheet.SetColHidden(Col+2,1);
		      mySheet.SetColHidden(Col+1,1);
		    }
		    mySheet.SetRowHeight(1,32);
		  }
		}
		else if (document.frm.basemonth.value >= '201901'){
		if(Row == 1 && mySheet.GetCellValue(1,Col).substring(0,3) == "가중치"){
		    if(mySheet.GetColHidden(Col+4)){
		      //hidden 풀기
		      mySheet.SetColHidden(Col+4,0);
		      mySheet.SetColHidden(Col+3,0);
		      mySheet.SetColHidden(Col+2,0);
		      mySheet.SetColHidden(Col+1,0);
		      //header 색상 정의
		      mySheet.SetCellBackColor(1,Col+4,"#FFEFBF");
		      mySheet.SetCellBackColor(1,Col+3,"#FFEFBF");
		      mySheet.SetCellBackColor(1,Col+2,"#FFEFBF");
		      mySheet.SetCellBackColor(1,Col+1,"#FFEFBF");
		      mySheet.SetCellText(1, Col ,"가중치\n최종 실적*");//-¶☞▶
		    }
		    else{
		      mySheet.SetCellText(1, Col ,"가중치\n최종 실적*");//+☜◀
		      mySheet.SetColHidden(Col+4,1);
		      mySheet.SetColHidden(Col+3,1);
		      mySheet.SetColHidden(Col+2,1);
		      mySheet.SetColHidden(Col+1,1);
		    }
		    mySheet.SetRowHeight(1,32);
		  }
		}
	}
	
	function mySheet_OnSearchEnd(Code, Msg){
		showMsg(Code, Msg);
		showUnitText("원, %");
		mySheet.SetSumValue(0,"합 계");
		mySheet.SetCellAlign(mySheet.HeaderRows(),0,"Center");
		//합계행 병합
		mySheet.SetMergeCell (mySheet.HeaderRows(), 0, 1,4);
		rowChangeSum();
	}
	
	function mySheet_OnSelectMenu(sAction){
	    doAction(sAction);
	}
	
	/*
	function mySheet_OnChangeSum(Row, Col){
	
	    if (document.frm.basemonth.value >= '201901') {
	        CellValue2(Row,27) = CellValue(Row,25) / CellValue(Row, 26) * 100 ;
	    } else if (document.frm.basemonth.value >= '201807') {
	        CellValue2(Row,32) = CellValue(Row,30) / CellValue(Row, 31) * 100 ;
	    } else if (document.frm.basemonth.value >= '201801') {
	        CellValue2(Row,31) = CellValue(Row,29) / CellValue(Row, 30) * 100 ;
	    } else if (document.frm.basemonth.value >= '201701') {
	        CellValue2(Row,29) = CellValue(Row,27) / CellValue(Row, 26) * 100 ;
	    } else if (document.frm.basemonth.value >= '201601') {
	        CellValue2(Row,34) = CellValue(Row,32) / CellValue(Row, 33) * 100 ;
	    } else if (document.frm.basemonth.value >= '201507') {
	        CellValue2(Row,21) = CellValue(Row,19) / CellValue(Row, 20) * 100 ;
	    } else if (document.frm.basemonth.value >= '201501') {
	        CellValue2(Row,18) = CellValue(Row,16) / CellValue(Row, 17) * 100 ;
	    } else if (document.frm.basemonth.value >= '201407') {
	        CellValue2(Row,17) = CellValue(Row,15) / CellValue(Row, 16) * 100 ;
	    } else  {
	        CellValue2(Row,16) = CellValue(Row,14) / CellValue(Row, 15) * 100 ;
	    }
	}
	*/
	
	function mySheet_OnDownFinish(downloadType, result) {
		if(result) {
			var basemonth   = document.frm.basemonth.value;
			var pgcode      = document.frm.pgcode.value;
			
			condition = "기준년월="+basemonth+";PG코드="+pgcode;
		    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"));
		}
	}
	
	function rowChangeSum()
	{
		if (document.frm.basemonth.value >= '201901') {
			if(mySheet.GetCellValue(mySheet.HeaderRows(),26) > 0) { 
	        	mySheet.SetCellValue(mySheet.HeaderRows(), 27,(mySheet.GetCellValue(mySheet.HeaderRows(),25) / mySheet.GetCellValue(mySheet.HeaderRows(),26) * 100 ).toFixed(1),0);
			} else {
				mySheet.SetCellValue(mySheet.HeaderRows(), 27, 0);
			}
	    } else if (document.frm.basemonth.value >= '201807') {
	        mySheet.SetCellValue(mySheet.HeaderRows(), 32,(mySheet.GetCellValue(mySheet.HeaderRows(),30) / mySheet.GetCellValue(mySheet.HeaderRows(),31) * 100 ).toFixed(1),0);
	    } else if (document.frm.basemonth.value >= '201801') {
	        mySheet.SetCellValue(mySheet.HeaderRows(), 31,(mySheet.GetCellValue(mySheet.HeaderRows(),29) / mySheet.GetCellValue(mySheet.HeaderRows(),30) * 100 ).toFixed(1),0);
	    } else if (document.frm.basemonth.value >= '201701') {
	        mySheet.SetCellValue(mySheet.HeaderRows(), 29,(mySheet.GetCellValue(mySheet.HeaderRows(),27) / mySheet.GetCellValue(mySheet.HeaderRows(),26) * 100 ).toFixed(1),0);
	    } else if (document.frm.basemonth.value >= '201601') {
	        mySheet.SetCellValue(mySheet.HeaderRows(), 34,(mySheet.GetCellValue(mySheet.HeaderRows(),32) / mySheet.GetCellValue(mySheet.HeaderRows(),33) * 100 ).toFixed(1),0);
	    } else if (document.frm.basemonth.value >= '201507') {
	        mySheet.SetCellValue(mySheet.HeaderRows(), 21,(mySheet.GetCellValue(mySheet.HeaderRows(),19) / mySheet.GetCellValue(mySheet.HeaderRows(),20) * 100 ).toFixed(1),0);
	    } else if (document.frm.basemonth.value >= '201501') {
	        mySheet.SetCellValue(mySheet.HeaderRows(), 18,(mySheet.GetCellValue(mySheet.HeaderRows(),16) / mySheet.GetCellValue(mySheet.HeaderRows(),17) * 100 ).toFixed(1),0);
	    } else if (document.frm.basemonth.value >= '201407') {
	        mySheet.SetCellValue(mySheet.HeaderRows(), 17,(mySheet.GetCellValue(mySheet.HeaderRows(),15) / mySheet.GetCellValue(mySheet.HeaderRows(),16) * 100 ).toFixed(1),0);
	    } else  {
	        mySheet.SetCellValue(mySheet.HeaderRows(), 16,(mySheet.GetCellValue(mySheet.HeaderRows(),14) / mySheet.GetCellValue(mySheet.HeaderRows(),15) * 100 ).toFixed(1),0);
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
    <th>조회구분</th>
    <td>
     <select name="sergb"><option value="2">잔액</option>
                          <option value="3">반기평잔</option>
                          <option value="4">분기평잔</option>
    </td>
    <th>Peer Group</th>
    <td>
    	<select name="pgcode">
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
<%if(!(basemonth==null || basemonth.equals(""))){%>
   document.frm.basemonth.value="<%=basemonth%>";
   document.frm.sergb.value="<%=sergb%>";
   document.frm.pgcode.value="<%=pgcode%>";
   initGrid();
   doAction("조회");
<%} %>
</script>