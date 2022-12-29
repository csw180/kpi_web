<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - 연체율 세부내역
'프로그램 ID  : rpdy_scr_2050.jsp
'프로그램 명  : 연체율 세부내역
'               권한에따라 타점 선택 가능여부 결정
'프로그램개요 : 연체율 세부내역
'작   성   자 : 조형석
'작   성   일 : 2013.03.07
====================================================================
'수정자/수정일: 장보윤/2014.09.23.
'수정사유     : 조회사유코드 추가
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="kpi.rpop.util_selectbox"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String topmenu_name  = "일일성과보고서";
    String leftmenu_name = "연체율";
    String htm_title     = "일일 연체율 세부내역";
    String actionname    = "";
    
    //popup 으로 사용시 받는 Parameter
    String baseday       = JSPUtil.getParameter(request,"baseday","");
    String jumcode       = JSPUtil.getParameter(request,"jumcode","");
    String jumname       = JSPUtil.getParameter(request,"jumname","");
    
    String strErrMsg     = "";
    String status        = "0";
    String buttonplay    = "style='display:none'";
    String readonly      = "readonly";
    String allRole       = "0";

    try {
        //권한에따른 점조회 Button 및 점검색기능 설정
        String role[] = kpi_rpt_account.getRole();        
        for(int i = 0; i < role.length; i++) {
            if(role[i].trim().equals("400") || role[i].trim().equals("450")){                
                buttonplay = "";
                readonly   = "";
                allRole="1";
                break;
            }
            if(role[i].trim().equals("510")){
                buttonplay = "";
                readonly   = "";
                break;
            }
        }

        //popup 으로 사용되지 않은 경우 login 점으로 초기화
        if(baseday==null || baseday.equals("")){
          jumcode = kpi_rpt_account.getBranch_no();
          jumname = kpi_rpt_account.getBranch_name();
        }
        //popup 으로 사용되었으나 타점조회 권한이 없는 경우
        else if(!baseday.equals("") && !readonly.equals("")){
          jumcode = kpi_rpt_account.getBranch_no();
          jumname = kpi_rpt_account.getBranch_name();
        }
    }catch(Exception exx)  {

    }
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpdy/scr/rpdy_scr_2050.js"></script>
<script language="javascript">

function mySheet_OnClick(Row,Col,Value){
	
}

function mySheet_OnDblClick(Row,Value){
	
}

function hiddenGrid_OnSearchEnd(Code, Msg){
	showUnitText("원");
    len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.baseday);
            
            <% if( "".equals(baseday) ) {%>
            document.frm.baseday.selectedIndex=0;
            <%} else {%>
            document.frm.baseday.value="<%=baseday%>";
            doAction("조회");
            <%}%>
        }else if (Msg.substr(0,1) == "C"){
            if (Msg.substr(1,len) == "1"){
				document.frm.jumname.value=hiddenGrid.GetCellValue(1,0);
            }
        }else if (Msg.substr(0,1) == "J"){
            if (Msg.substr(1,len) == "8"){
            }
        }else{
        	showMsg(Code, Msg);
        }
    }
}

function mySheet_OnDownFinish(downloadType, result) {
	if(result) {
	    
	    var baseday     = document.frm.baseday.value;
	    var v_jumcode   = document.frm.jumcode.value;
	    var sergb       = document.frm.sergb.value;
	    var searchCode  = document.frm.searchCode.value;  // 조회사유코드
	    
        condition="기준일="+baseday+";점번호="+v_jumcode+";조회구분="+sergb;
	    
        hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9096.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=1"+"&searchCode="+searchCode+"&pg_url="+pg_url));
	}
}

function hiddGridmon_OnSearchEnd(Code,Msg){
	// 기준일자 정보
    if(isRoleEnable == '1') {
    	 // 전산정보부 및 성과 담당자
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2050.do?hidden_key=9&baseday="+baseday+"&v_jumcode="+v_jumcode+"&sergb=98");
    } else {
       hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2050.do?hidden_key=9&baseday="+baseday+"&v_jumcode="+v_jumcode+"&sergb=99");
    }
}

function mySheet_OnSearchEnd(Code, Msg){
	showUnitText("원");
	
	mySheet.SetSumValue(0,"합 계");
	mySheet.SetCellAlign(mySheet.LastRow(),0,"Center");
	//합계행 병합
	mySheet.SetMergeCell (mySheet.LastRow(), 0, 1,1);

	showMsg(Code, Msg);
}    

function mySheet_OnSelectMenu(sAction){
 
	doAction(sAction);
}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%> 
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <tr>
    <th>기준일</th>
    <td><select name="baseday" class="select" onchange="selectmonth()"></select></td>
    <th>조회구분</th>
    <td>
    	<select name="sergb"   class="select" onchange="allDelDataGrid(mySheet);showUnitText('원');">
          <option value="1">전체</option>
          <option value="2">대출</option>
          <option value="3">카드</option>
        </select>
    </td>
    <th>점번호</th>
    <td>
    	<input type="text" class="input_l" onchange="selectjumname()" name="jumcode" size="5" value="<%=jumcode%>" <%=readonly%> onkeyup="chk_num()">
    	<a href="javascript:popupJumCode()"><img src="/kpi/img/sky/butt_search_s.gif" border="0" align="absmiddle" <%=buttonplay%>></a>
    	<input type="text" class="input_l" readonly name="jumname" size="24" value="<%=jumname%>">
    </td>
    <td align="right" class="end">
      <span class="btn_Grd" border="0" onclick="javascript:doAction('조회');" style="cursor:pointer">조회</span>
        	    <span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀내려받기');" style="cursor:pointer">엑셀</span>
    </td>
  </tr>
  <tr>
  	<th class="nobor">조회사유코드</th>
    <td class="nobor end" colspan="7">
	    <select name="searchCode" class="select" onchange="allDelDataGrid(mySheet);showUnitText('원');" >
	       <option value='00'>선택</option>            
	          <%  util_selectbox us2  =  new  util_selectbox();
	              us2.setData("UP_KPI_C_S_CO고객조회사유코드","","코드","코드명");
	              out.println(us2.getData());
	          %>
	     </select>
  </tr>  
  <tr>
    <td class="nobor topB" colspan="7" style="PADDING-TOP:5px; PADDING-LEFT:8px; FONT-SIZE:12px; FONT-WEIGHT:bold; COLOR:#800000;"> ※ 일일성과보고서는 <u>평가 조정사항</u>이 모두 반영되어 있지 않으므로 실제 평가실적과 다를 수 있습니다. </td>
  </tr>
  <tr>
    <td class="nobor topB" colspan="7">
      <marquee scrollamount='3' direction='left' width='450'>본 보고서는 특정고객에 관한 금융정보를 일부 포함하고 있으니, 고객정보 유출에 각별히 유의하시기 바랍니다.</marquee>
    </td>
  </tr>  
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
  <tr>
    <td >
       <div id="sheetObj"></div>
    </td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
  <tr>
    <td>
      ※ 상품구분상 카드CMS는 결제가 되더라도 1영업일정도 연체로 분류될 수 있음
    </td>
  </tr>
</table>

<%if(!baseday.equals("")){%><script>dispalyCloseBtn();//팝업시 닫기버튼</script><%}%>

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
<%if(!(baseday.equals("") || baseday==null)){%>
   //document.frm.baseday.value="<%=baseday%>";
   //doAction("조회");
<%}else{%>
if(!document.frm.jumcode.value==""){
  //selectjum();
}
<%}%>
</script>