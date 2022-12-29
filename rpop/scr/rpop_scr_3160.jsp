<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - 고객실적조회
'프로그램 ID  : rpop_scr_3160.jsp
'프로그램 명  : 신규예수금고객 세부내역
'프로그램개요 : 신규예수금고객 세부내역 조회
'작   성   자 : 양인찬
'작   성   일 : 2020.07.22
====================================================================
'수정자/수정일: 
'수정사유     : 
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="kpi.rpop.util_selectbox"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "영업점 보고서";
    String      leftmenu_name    = "고객실적조회"; 
    String      htm_title        = "신규예수금고객 세부내역"; 
    String      actionname       = "";
    String      strErrMsg        = "";
    String      status           = "0";
    String      allRole          = "0";
    String      readonly         = "readonly";

    String      jumcode          = "";
    String      jumname          = "";

    String      role[] = kpi_rpt_account.getRole(); //권한
    
    SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);
    

    for (int i = 0; i < role.length; i++) {
        if (role[i].trim().equals("450") || role[i].trim().equals("400")) {      
           readonly="";
           allRole="1";
           break;
        } else {
        	 jumcode = account.getBranch_no();
           jumname = account.getBranch_name();        	
        }
    }
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_3160.js"></script>
<script>
	function mySheet_OnClick(Row,Col,Value) {}
	
	function hiddenGrid_OnSearchEnd(Code, Msg) {
	    len = Msg.length
	    if (len > 0) {
	        if (Msg.substr(0,1) == "B") {
	            ComboValue(document.frm.basemonth);
	            document.frm.basemonth.selectedIndex=0;
	            selectmonth();
	        } else if (Msg.substr(0,1) == "C") {
	           if (Msg.substr(1,len) == "1") {
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
	    mySheet.SetSumValue(0,"합 계");
		mySheet.SetCellAlign(mySheet.HeaderRows(),0,"Center");
		//합계행 병합
		mySheet.SetMergeCell (mySheet.HeaderRows(), 0, 1,3);
	    showUnitText("원, Point");
	}
	
	function mySheet_OnSelectMenu(sAction) {
	    doAction(sAction);
	}
	
	function mySheet_OnDownFinish(downloadType, result) 
	{
		if(result) 
		{
			var basemonth   = document.frm.basemonth.value;
		    var v_jumcode   = document.frm.jumcode.value;
		    
		    condition = "기준년월="+basemonth+";점번호="+v_jumcode;           
	        hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9096.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=1"+"&searchCode="+searchCode+"&pg_url="+pg_url));
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
    <th>점번호</th>
    <td>
        <input type="text" class="input_l" onchange="selectjumname()" name="jumcode" size="6" value="<%=jumcode%>" <%=readonly%> onkeyup="chk_num()">
        <input type="text" class="input_l" readonly name="jumname" size="30" value="<%=jumname%>">
    </td>
    <td align="right" class="end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
    </td>
  </tr>
  <tr>
  	<th class="nobor">조회사유코드</th>
    <td class="nobor end" colspan="4">
    	<select name="searchCode" class="select" onchange="allDelDataGrid(mySheet); showUnitText('원, Point');" >
       		<option value='00'>선택</option>
	          <%  util_selectbox us2  =  new  util_selectbox();
	              us2.setData("UP_KPI_C_S_CO고객조회사유코드","","코드","코드명");
	              out.println(us2.getData());
	          %>
    	 </select>
    </td>
  </tr>  
  <tr>
    <td colspan="5" class="topB">
      <marquee scrollamount='3' direction='left' width='450'>본 보고서는 특정고객에 관한 금융정보를 일부 포함하고 있으니, 고객정보 유출에 각별히 유의하시기 바랍니다.</marquee>
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
<!--  <div id="hiddenGridmonObj"></div> -->
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
  isRoleEnable = '<%=allRole%>';
  LoadPage();
  htm_title = '<%=htm_title%>';
<% if (allRole=="1") { %>
      document.frm.searchCode.value = 32;
<% } else { %>
      document.frm.searchCode.value = 15;
<% } %>  
</script>