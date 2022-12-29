<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - 성과집계표
'프로그램 ID  : rpdy_scr_2060.jsp
'프로그램 명  : 일일성과집계표
'프로그램개요 : 일일성과집계표
'작   성   자 : 조형석
'작   성   일 : 2012.03.05
====================================================================
'수정자/수정일: 
'수정사유     : 
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "일일성과보고서";
    String      leftmenu_name    = "성과집계표"; 
    String      htm_title        = "일일 성과집계표"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
    String      allRole          = "0";
    String      otbrRole         = "0";
    String      readonly         = "readonly";
    String      disabled         = "disabled";

    String      buttonplay       = "style='display:none'";

    String      jumcode          = "";
    String      jumname          = "";



    String      role[] = kpi_rpt_account.getRole(); //권한

    for (int i = 0; i < role.length; i++) {
        if (role[i].trim().equals("450") || role[i].trim().equals("400")) {
           buttonplay = "";
           readonly   = "";
           disabled   = "";
           allRole="1";
           break;
        }
    }

    for (int i = 0; i < role.length; i++) {
        if (role[i].trim().equals("600")) {
           readonly   = "";
           disabled   = "";
           otbrRole   = "1";
           break;
        }
    }

    //popup 으로 사용되지 않은 경우 login 점으로 초기화
    if(!readonly.equals("") || otbrRole.equals("1")){
      jumcode = kpi_rpt_account.getBranch_no();
      jumname = kpi_rpt_account.getBranch_name();
    }
    
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpdy/scr/rpdy_scr_2060.js"></script>
<!-- <script language="JavaScript" src="AIViewer/AIScript.js"></script> -->

<Script language="javascript">



function hiddenGrid_OnSearchEnd(Code, Msg){
    len = Msg.length;
    
    //showMsg(Code,Msg);
    
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.baseday);
            document.frm.baseday.selectedIndex=0;
            //selectmonth();
            
            //2022.05.17 : 기준일 조회 뒤 레포트 조회
            if(isRoleEnable != '1') {
              doAction("조회");
            }
            
        }else if (Msg.substr(0,1) == "C"){
            if (Msg.substr(1,len) == "1"){
				document.frm.jumname.value=hiddenGrid.GetCellValue(1,0);
            }
        }else if (Msg.substr(0,1) == "J"){
            if (Msg.substr(1,len) == "8"){
            }
        }else{
        	showMsg(Code,Msg);
        }
    }
}

function hiddGridmon_OnSearchEnd(Code, Msg){
	
	baseday     = document.frm.baseday.value;
	
	// 기준일자 정보
    if(isRoleEnable == '1') {
    	 // 전산정보부 및 성과 담당자
        hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2060.do?hidden_key=9&baseday="+baseday+"&sergb=98");
    } else {
        hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2060.do?hidden_key=9&baseday="+baseday+"&sergb=99");
    }
}

function mySheet_OnLoadData(data){
	rtnData=data;
}
</script>

<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <tr> 
    <th>기준일</th>
    <td>
     <select name="baseday" class="select" onchange="selectmonth()"></select>      
    </td>
    <th>점번호</th>
    <td>	    
	    <input type="text" class="input_l" onchange="selectjumname()" name="jumcode" size="5" value="<%=jumcode%>" onkeyup="chk_num()">
	    <a href="javascript:popupJumCode()"><img src="/kpi/img/sky/butt_search_s.gif" border="0" align="absmiddle" ></a>
	    <input type="text" class="input_l" readonly disabled name="jumname" size="24" value="<%=jumname%>">
    </td>
    <td class="al_R end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
    </td>
  </tr>
</table>
<table border='0' width='100%'>
    <tr>
        <td style="PADDING-TOP:5px; PADDING-LEFT:8px; FONT-SIZE:12px; FONT-WEIGHT:bold; COLOR:#800000;" > ※ 일일성과보고서는 <u>평가 조정사항</u>이 모두 반영되어 있지 않으므로 실제 평가실적과 다를 수 있습니다. </td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
  <tr>
    <td>
      <iframe name="ifprint" id="ifprint" style="width:100%;height:700px" frameborder=0 > 
      </iframe>
    </td>
  </tr> 
</table>
<div id="hiddenGridObj"></div>
<div id="hiddGridmonObj"></div>
<!-- AIGenerator OCX 포함 시작, 반드시 BODY Tag내부에 기술되어야 함 -->
<!-- <script language="JavaScript">document.write(tagAIGeneratorOcx);</script> -->
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
isRoleEnable = '<%=allRole%>';
LoadPage();
htm_title = '<%=htm_title%>';
</script>
