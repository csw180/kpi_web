<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 기타보고서 - RM저비용성예수금
'프로그램 ID  : rpop_scr_5140.jsp
'프로그램 명  : RM 저비용성예수금
'프로그램개요 : RM 저비용성예수금
'작   성   자 : 하진영
'작   성   일 : 2012.03.19
====================================================================
'수정자/수 정 일/수정사유 
'하진영/20120730/분기평잔 추가.
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "영업점보고서";
    String      leftmenu_name    = "기타"; 
    String      htm_title        = "RM 저비용성예수금 내역"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
    String      allRole          = "0";

    //popup 으로 사용시 받는 Parameter
    String basemonth     = JSPUtil.getParameter(request,"basemonth","");
    String jumcode       = JSPUtil.getParameter(request,"jumcode","");
    String jumname       = JSPUtil.getParameter(request,"jumname","");
    String sergb         = JSPUtil.getParameter(request,"sergb","");
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
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_5140.js"></script>

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
	
	function mySheet_OnSearchEnd(Code, Msg){   
		showMsg(Code, Msg);
		showUnitText("원, %");
		mySheet.SetSumValue(0,"합 계");
		mySheet.SetCellAlign(mySheet.HeaderRows(),0,"Center");
		//합계행 병합
		mySheet.SetMergeCell (mySheet.HeaderRows(), 0, 1,4);
	} 
	
	function mySheet_OnSelectMenu(sAction){
	    doAction(sAction);
	}
	
	function mySheet_OnChangeSum(Row){}
	
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
    <th>기준년월</th>
    <td>
     <select name="basemonth" class="select" onchange="selectmonth()"></select>
    </td>
    <th>조회구분</th>
    <td>
      <select name="sergb" class="select">
      </select>
    </td>
    <th>Peer Group</th>
    <td><select name="pgcode"><option value="0">전체</option></select></td>
    <td align="right" class="end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
   	  <span class="btn_Grd" style="cursor:pointer; display:none;" id="print" border="0" onclick="javascript:doPrint();">인쇄</span>
    </td>
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