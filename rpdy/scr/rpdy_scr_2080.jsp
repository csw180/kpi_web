<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - 권유계좌리스트
'프로그램 ID  : rpdy_scr_2080.jsp
'프로그램 명  : RM권유계좌리스트
'프로그램개요 : RM권유계좌리스트
'작   성   자 : 조형석
'작   성   일 : 2013.03.07
====================================================================
'수정자/수정일 :
'수정사유      :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="kpi.rpop.util_selectbox"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String topmenu_name  = "영업점보고서";
    String leftmenu_name = "RM"; 
    String htm_title     = "권유계좌리스트"; 
    String actionname    = "";
    String strErrMsg     = "";
    String status        = "0";
    String buttonplay    = "";
    String readonly      = "";

    String allRole       = "0";

    String role[] = kpi_rpt_account.getRole(); //권한

    for (int i = 0; i < role.length; i++) {
        if (role[i].trim().equals("450") || role[i].trim().equals("400")) {
           allRole="1";
           break;
        }
   
    } 
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpdy/scr/rpdy_scr_2080.js"></script>
<script language="javascript">

function mySheet_OnClick(Row,Col,Value){
	
}

function hiddenGrid_OnSearchEnd(Code, Msg){
	showUnitText("원");
	len = Msg.length;
	 if (len > 0){
	     if (Msg.substr(0,1) == "B"){
	         ComboValue(document.frm.baseday);
	         document.frm.baseday.selectedIndex=0;
	         selectmonth();
	     }else if (Msg.substr(0,1) == "C"){
	        if (Msg.substr(1,len) == "1"){
				document.frm.jumname.value=hiddenGrid.GetCellValue(1,0);
	         }
	     }else if(Msg.substr(0,1) == "G"){
	     }else{
	         alert(ErrMsg);
	     }
	 }

}

function hiddGridmon_OnSearchEnd(Code, Msg){
	
	baseday=document.frm.baseday.value;
	
	// 기준일자 정보
    if(isRoleEnable == '1') {
    	 // 전산정보부 및 성과 담당자
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2080.do?hidden_key=9&baseday="+baseday+"&v_jumcode="+v_jumcode+"&sergb=98");
    } else {
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2080.do?hidden_key=9&baseday="+baseday+"&v_jumcode="+v_jumcode+"&sergb=99");
    }
}

function mySheet_OnSearchEnd(Code, Msg){
	showUnitText("원");
	
	mySheet.SetSumValue(0,"합 계");
	mySheet.SetCellAlign(mySheet.LastRow(),0,"Center");
	
	showMsg(Code, Msg);
}

function mySheet_OnDownFinish(downloadType, result) {
	if(result) {
	    
	    var baseday     = document.frm.baseday.value;
	    var v_jumcode=document.frm.jumcode.value;	

        condition="기준일="+baseday+";점번호="+v_jumcode;
        
	    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9096.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=1"+"&searchCode="+searchCode+"&pg_url="+pg_url));
	}
	
}

function mySheet_OnSelectMenu(MenuStr, Code) {
	doAction(MenuStr);
}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <tr>
    <th>기준일</th>
    <td><select name="baseday" class="select" onchange="selectmonth()"></select></td>
    <th>RM점번호</th>
    <td><input type="text" class="input_l" onchange="selectjumname()" name="jumcode" size="6" <%=readonly%> onkeyup="chk_RM()">&nbsp;<a href="javascript:popupJumCode()"><img src="/kpi/img/sky/butt_search_s.gif" border="0" align="absmiddle" <%=buttonplay%>></a>&nbsp;<input type="text" class="input_l" readonly name="jumname" size="30" ></td>
    <td align="right" class="end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
   	  <span class="btn_Grd" style="cursor:pointer; display:none;" id="print" border="0" onclick="javascript:doPrint();">인쇄</span>
    </td>
  </tr>
  <tr>
  	<th class="nobor">조회사유코드</th>
    <td class="nobor end" colspan="4"><select name="searchCode" class="select" onchange="allDelDataGrid(mySheet);showUnitText('원');" >
       <option value='00'>선택</option>            
          <%  util_selectbox us2  =  new  util_selectbox();
              us2.setData("UP_KPI_C_S_CO고객조회사유코드","","코드","코드명");
              out.println(us2.getData());
          %>
     </select>
  </tr>  
  <tr>
    <td colspan="5" class="topB">
      <marquee scrollamount='3' direction='left' width='450'>본 보고서는 특정고객에 관한 금융정보를 일부 포함하고 있으니, 고객정보 유출에 각별히 유의하시기 바랍니다.</marquee>
    </td>
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
<div id="hiddGridmonObj"></div>
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
  isRoleEnable = '<%=allRole%>';
  LoadPage();
  htm_title = '<%=htm_title%>';
<% if (allRole=="1") { %>
      document.frm.searchCode.value = 32;    
<% } %>  
</script>