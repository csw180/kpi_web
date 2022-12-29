<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - RM(영업점) 총괄
'프로그램 ID  : rpop_scr_7260.jsp
'프로그램 명  : RM(영업점) 연체율
'프로그램개요 : RM(영업점) 연체율
'작   성   자 : 양인찬
'작   성   일 : 2021.08.17
====================================================================
'수정자/수정일   :수정사유
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String topmenu_name  = "영업점보고서";
    String leftmenu_name = "RM(영업점) 총괄"; 
    String htm_title     = "RM(영업점) 연체율"; 
    String actionname    = "";
    String strErrMsg     = "";
    String status        = "0";
    String buttonplay    = "";
    String readonly      = "";

    //popup 으로 사용시 받는 Parameter
    String basemonth     = JSPUtil.getParameter(request,"basemonth","");
    String jumcode       = JSPUtil.getParameter(request,"jumcode","");
    String jumname       = JSPUtil.getParameter(request,"jumname","");

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
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_7260.js"></script>
<script>
	function mySheet_OnClick(Row,Col,Value) {}
	
	function mySheet_OnDblClick(Row,Value) {
		if(Row < 2) return;
	  	var basemonth = document.frm.basemonth.value;
	  	var jumcode   = document.frm.jumcode.value;
	  	var jumname   = document.frm.jumname.value;	
	  	var custgubun 
	
	  	// 기준년월별로 그리드 컬럼이 변경되므로 해당월 그리드중 고객구분을 가져옴
	  	if (basemonth >= '202107')  
	  		custgubun = mySheet.GetCellValue(Row,4);  
	   
	  	var url = "kpi.rpop.rpop_7270.screen?basemonth="+basemonth+"&Security=2&jumcode="+jumcode+"&jumname="+encodeURI(jumname)+"&custgubun=100"+"&IS_POPUP=Y&SCREEN_URL=kpi.rpop.rpop_7270.screen";
	  	win_open2(url,820,580);    
	}
	
	function mySheet_OnMouseMove(Button, Shift, X, Y) {
	  	//실명번호 풍선도움말 설정      
		mySheet.SetToolTipText(mySheet.MouseRow(),mySheet.MouseCol(),displayMessageTooltip("연체고객별보고서"));
	}
	
	function hiddenGrid_OnSearchEnd(Code, Msg) {
	    len = Msg.length
	    if (len > 0)
	    {
	        if (Msg.substr(0,1) == "B") {
	            ComboValue(document.frm.basemonth);
	            document.frm.basemonth.selectedIndex=0;
	            selectmonth();
	        } else if (Msg.substr(0,1) == "C") {
	            if (Msg.substr(1,len) == "6") {
	                document.frm.pgcode.value = hiddenGrid.GetCellValue(1,0); 
	                document.frm.pgname.value = hiddenGrid.GetCellValue(1,1); 
	            }else if (Msg.substr(1,len) == "1"){
	                document.frm.jumname.value = hiddenGrid.GetCellValue(1,0); 
	            }
	
	        } else if(Msg.substr(0,1) == "G") {
	            
	        } else {
	            alert(Msg);
	        }
	    }
	}
	
	function mySheet_OnSearchEnd(Code, Msg) {    
	    showMsg(Code, Msg);
	    showUnitText("%, 원");
	}
	
	function mySheet_OnSelectMenu(sAction) {
		doAction(sAction);
		/*
		if(sAction=="엑셀내려받기"){
		    doAction(sAction);
		}else if(sAction=="고객별실적조회"){   
		  var basemonth = document.frm.basemonth.value;
		  var jumcode   = document.frm.jumcode.value;
		  var jumname   = document.frm.jumname.value;			  
		  var url = "kpi.rpop.rpop_7270.screen?basemonth="+basemonth+"&jumcode="+jumcode+"&jumname="+jumname+"&IS_POPUP=Y&SCREEN_URL=kpi.rpop.rpop_7270.screen";
		  win_open2(url,820,580);    
		}
		*/
	}
	
	function mySheet_OnDownFinish(downloadType, result) {
		if(result) {
			var basemonth   = document.frm.basemonth.value;
			var v_jumcode   = document.frm.jumcode.value;
			var pdtgubun = "";  
			  
		  	for(i=0;i<document.frm.pdtgubun.length;i++){
		       if(document.frm.pdtgubun[i].checked==true){
		           pdtgubun = document.frm.pdtgubun[i].value;
		           break;
		       }
		    }
			
		  	condition = "기준년월="+basemonth+";점번호="+v_jumcode+";상품구분="+pdtgubun;
		    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"));
		}
	}
	
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <input type="hidden" name="pgcode"><input type="hidden" name="pgname">
  <tr>
    <th>기준년월</th>
    <td>
    	<select name="basemonth" class="select" onchange="selectmonth()"></select>
    </td>
    <th>점번호</th>
    <td>
	    <input type="text" class="input_l" onchange="selectjumname()" name="jumcode" size="6" value="<%=jumcode%>" <%=readonly%> onkeyup="chk_jum()">
	    <a href="javascript:popupJumCode()"><img src="/kpi/img/sky/butt_search_s.gif" class="pdB3" border="0" align="absmiddle" <%=buttonplay%>></a>
	    <input type="text" class="input_l" readonly name="jumname" size="30" value="<%=jumname%>">
	</td>
    <td align="right" class="end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
   	  <span class="btn_Grd" style="cursor:pointer; display:none;" id="print" border="0" onclick="javascript:doPrint();">인쇄</span>
    </td>
  </tr>
  <tr>
    <td class="nobor" colspan=3 id="td1"> 
      <input type="radio" name="pdtgubun" value="0">전체
      <input type="radio" name="pdtgubun" checked value="1">전체(카드상품 제외) 
      <input type="radio" name="pdtgubun" value="2">카드상품
    </td>
    <td class="nobor first" colspan=3 id="td2"> 
    </td>
    <td class="nobor"></td>
    <td class="nobor end" align="right">
      <span class="btn_Grd2" style="cursor:pointer" border="0" onclick="javascript:call1020();">성과집계표</span>
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

<%if(!basemonth.equals("")){%><script>dispalyCloseBtn();//팝업시 닫기버튼</script><%}%>

<div id="hiddenGridObj"></div>
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
LoadPage();
htm_title = '<%=htm_title%>';
<%if(!(basemonth==null || basemonth.equals(""))){%>
   document.frm.basemonth.value="<%=basemonth%>";
   document.frm.jumcode.value="<%=jumcode%>";
   document.frm.jumname.value="<%=jumname%>";
   initGrid();   // 연체율 화면 그리드 초기화
   doAction("조회");
<%} %>
</script>