<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - 영업점총괄
'프로그램 ID  : rpop_scr_4030.jsp
'프로그램 명  : 영업점 총괄세부실적Ⅱ
'프로그램개요 : 영업점 총괄세부실적Ⅱ (성장성,비이자)
'작   성   자 : 변휘원
'작   성   일 : 2006.04.12
====================================================================
'수정자/수정일: 하진영/2011.06.01
'수정사유     : NEXTRO 대응
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "영업점보고서";
    String      leftmenu_name    = "영업점총괄"; 
    String      htm_title        = "영업점 총괄세부실적Ⅱ (성장성,비이자)"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_4030.js"></script>

<script>

	function mySheet_OnMouseDown(Button, Shift, X, Y) {
		  Row=mySheet.MouseRow();
		  Col=mySheet.MouseCol();
		  
		  if(Row == 1 && mySheet.GetCellValue(1,Col).substring(0,2) == "평점"){
		      if(mySheet.GetColHidden(Col-2)){
		        //hidden 풀기
		        mySheet.SetColHidden(Col-2,0);
		        mySheet.SetColHidden(Col-1,0);
		        //header 색상 정의
		        mySheet.SetCellBackColor(1,Col-2,"#FFEFBF");
		        mySheet.SetCellBackColor(1,Col-1,"#FFEFBF");
		        mySheet.SetCellText(1, Col ,'평점(☜)');//-¶☞▶
		      }
		      else{
		        mySheet.SetCellText(1, Col ,'평점☞');//+☜◀
		        mySheet.SetColHidden(Col-2,1);
		        mySheet.SetColHidden(Col-1,1);
		      }
		      mySheet.SetRowHeight(1,22);
		  }
		  
		  //15년기준 공제적용평점 숨김설정
		  if (document.frm.basemonth.value >= '201501'){
			if(Row == 1 && mySheet.GetCellValue(1,Col).substring(0,4) == "적용평점"){
		       if(GetColHidden(Col+4)){
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
		          mySheet.SetCellText(1, Col ,'적용평점(☜)');
		      } else {
		          mySheet.SetCellText(1, Col ,'적용평점☞');
		          mySheet.SetColHidden(Col+4,1);
		          mySheet.SetColHidden(Col+3,1);
		          mySheet.SetColHidden(Col+2,1);
		          mySheet.SetColHidden(Col+1,1);
		      }
		       mySheet.SetRowHeight(1,22);
		    }
		  }
		  
		  //17년 하반기 기준 예대율평점 숨김설정
		  if (document.frm.basemonth.value >= '201707'){
			if(Row == 1 && mySheet.GetCellValue(1,Col).substring(0,4) == "예대평점"){
		         if(mySheet.GetColHidden(Col-1)){
		           //hidden 풀기
		           mySheet.SetColHidden(Col-1,0);
		           //header 색상 정의
		           mySheet.SetCellBackColor(1,Col-1,"#FFEFBF");
		           mySheet.SetCellText(1, Col ,'예대평점(☜)');//-¶☞▶
		         }
		         else{
		           mySheet.SetCellText(1, Col ,'예대평점☞');//+☜◀
		           mySheet.SetColHidden(Col-1,1);
		         }
		         mySheet.SetRowHeight(1,22);
		     }
		  }  
		  //16년 하반기 기준 RORWA평점 숨김설정
		  if (document.frm.basemonth.value >= '201607'){
			if(Row == 1 && mySheet.GetCellValue(1,Col).substring(0,5) == "RWA평점"){
		         if(mySheet.GetColHidden(Col-1)){
		           //hidden 풀기
		           mySheet.SetColHidden(Col-1,0);
		           //header 색상 정의
		           mySheet.SetCellBackColor(1,Col-1,"#FFEFBF");
		           mySheet.SetCellText(1, Col ,'RWA평점(☜)');//-¶☞▶
		         }
		         else{
		           mySheet.SetCellText(1, Col ,'RWA평점☞');//+☜◀
		           mySheet.SetColHidden(Col-1,1);
		         }
		         mySheet.SetRowHeight(1,22);
		     }
		  }
		  //17년 기준 전략평점 숨김설정
		  if (document.frm.basemonth.value >= '201701'){
			if(Row == 1 && mySheet.GetCellValue(1,Col).substring(0,4) == "전략평점"){
		       if(GetColHidden(Col+24)){
		          //hidden 풀기
					mySheet.SetColHidden(Col-1,0);
		          for(i=1;i<=24;i++){
		        	  mySheet.SetColHidden(Col+i,0);
		          }
		          //header 색상 정의
		          mySheet.SetCellBackColor(1,Col-1,"#FFEFBF");
		          for(i=1;i<=24;i++){
		          	mySheet.SetCellBackColor(1,Col+i,"#FFEFBF");
		          }
		          	mySheet.SetCellText(1, Col ,'전략평점(☜)');
		       } 
		       else {
		          	mySheet.SetCellText(1, Col ,'전략평점☞');
		          	mySheet.SetColHidden(Col-1,1);
		          for(i=1;i<=24;i++){
		        	  mySheet.SetColHidden(Col+i,1);
		          }
		      }
		      	mySheet.SetRowHeight(1,22);
		     }
		  }
		  //18년 하반기 기준 평점 숨김설정
		  if (document.frm.basemonth.value >= '201807'){
			if(Row == 1 && mySheet.GetCellValue(1,Col).substring(0,2) == "평점"){
		        if(mySheet.GetColHidden(Col-3)){
		          //hidden 풀기
		          mySheet.SetColHidden(Col-3,0);
		          mySheet.SetColHidden(Col-2,0);
		          mySheet.SetColHidden(Col-1,0);
		          //header 색상 정의
		          mySheet.SetCellBackColor(1,Col-3,"#FFEFBF");
		          mySheet.SetCellBackColor(1,Col-2,"#FFEFBF");
		          mySheet.SetCellBackColor(1,Col-1,"#FFEFBF");
		          mySheet.SetCellText(1, Col ,'평점(☜)');//-¶☞▶
		        }
		        else{
		          mySheet.SetCellText(1, Col ,'평점☞');//+☜◀
		          mySheet.SetColHidden(Col-3,1);
		          mySheet.SetColHidden(Col-2,1);
		          mySheet.SetColHidden(Col-1,1);
		        }
		        mySheet.SetRowHeight(1,22);
		    }
			
			if(Row == 1 && mySheet.GetCellValue(1,Col).substring(0,4) == "전략평점"){
	       		if(mySheet.GetColHidden(Col+27)){
	          //hidden 풀기
					mySheet.SetColHidden(Col-1,0);
	          for(i=1;i<=27;i++){
	        	  mySheet.SetColHidden(Col+i,0);
	          }
	          	//header 색상 정의
	          	mySheet.SetCellBackColor(1,Col-1,"#FFEFBF");
	          for(i=1;i<=27;i++){
	          	mySheet.SetCellBackColor(1,Col+i,"#FFEFBF");
	          }
	          
	          mySheet.SetCellText(1, Col ,'전략평점(☜)');
	       } 
	       else {
	          
	    	  mySheet.SetCellText(1, Col ,'전략평점☞');
	          mySheet.SetColHidden(Col-1,1);
	          
	          for(i=1;i<=27;i++){
	       		mySheet.SetColHidden(Col+i,1);
	          }
	      }
	       		
	      SetRowHeight(1,22);
	     }
		}
	}

	function mySheet_OnDblClick(Row,Value) {
		if(Row < 3) return;
		f = document.frm;
		url="kpi.rpop.rpop_1020.screen";  
		var basemonth = f.basemonth.value;
		var jumcode   = mySheet.GetCellValue(Row, 0);
		var jumname   = mySheet.GetCellValue(Row, 1);
		url = url + "?basemonth="+basemonth+"&Security=2&jumcode="+jumcode+"&jumname="+encodeURI(jumname)+"&IS_POPUP=Y&SCREEN_URL=kpi.rpop.rpop_1020.screen";
		win_open2(url,820,580);
	}
	
	function mySheet_OnMouseMove(Button, Shift, X, Y) {
	  //실명번호 풍선도움말 설정      
	  mySheet.SetToolTipText(mySheet.MouseRow(),mySheet.MouseCol(),displayMessageTooltip("성과집계표"));
	}
	
	function hiddenGrid_OnSearchEnd(Code, Msg) {
		len = Msg.length
		if (len > 0){
		    if (Msg.substr(0,1) == "B"){
		        ComboValue(document.frm.basemonth);
		        document.frm.basemonth.selectedIndex=0;
		        selectmonth();
		    }else if (Msg.substr(0,1) == "J"){
		        if (Msg.substr(1,len) == "7"){
		            ComboValue(document.frm.pgcode);
		        }
		    }else if (ErrMsg.substr(0,1) == "C"){
		        ComboValue(document.frm.productcode);
		    }else{
		        alert(Msg);
		    }
		}
	}
	
	function mySheet_OnSearchEnd(Code, Msg) {    
		showMsg(Code, Msg);
		
		if (document.frm.basemonth.value <= '200812'
			|| document.frm.basemonth.value <= '200912'
			|| document.frm.basemonth.value <= '201012'
			|| document.frm.basemonth.value <= '201112'
			|| document.frm.basemonth.value <= '201212'
			|| document.frm.basemonth.value <= '201312'
			)
		{
			showUnitText("원, 점수, 명");
		}
		else if(document.frm.basemonth.value <= '201406'
				|| document.frm.basemonth.value <= '201412'
				|| document.frm.basemonth.value <= '201506'
				|| document.frm.basemonth.value <= '201512'
				|| document.frm.basemonth.value <= '201606'
				|| document.frm.basemonth.value <= '201612'
				|| document.frm.basemonth.value <= '201706'
				|| document.frm.basemonth.value <= '201712'
				|| document.frm.basemonth.value <= '201806'
				|| document.frm.basemonth.value <= '201812'
				|| document.frm.basemonth.value <= '201906'
			)
		{
			showUnitText("원, 점수, 명, 미불");
		}
		else
		{
			 showUnitText("원, %, 점수");
		}
		
		if(document.frm.basemonth.value <= '201906')
		{
			mySheet.SetSumValue(0,"합 계");
			mySheet.SetCellAlign(mySheet.HeaderRows(),0,"Center");
			//합계행 병합
			mySheet.SetMergeCell (mySheet.HeaderRows(), 0, 1,2);
		}
		
	}
	
	function mySheet_OnSelectMenu(sAction) {
	    doAction(sAction);
	}
	
	function mySheet_OnDownFinish(downloadType, result) {
		if(result) {
			var basemonth   = document.frm.basemonth.value;
		    var pgcode      = document.frm.pgcode.value;
		    
		    condition = "기준년월="+basemonth+";PG코드="+pgcode;
		    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"));
		}
	}
</script>

<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <tr> 
    <th class="wd10">기준년월</th>
    <td>
     <select name="basemonth" class="select" onchange="selectmonth()"></select>     
    </td>
    <th class="wd10">Peer Group</th>
    <td colspan="3">
    	<select name="pgcode" onchange="initGrid();">
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
</script>