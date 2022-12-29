<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - 성과집계표
'프로그램 ID  : rpop_scr_1060.jsp
'프로그램 명  : 마진율추이표
'프로그램개요 : 마진율추이표
'작   성   자 : 변휘원
'작   성   일 : 2006.04.12
====================================================================
'수정자/수정일: 하진영/20110602
'수정사유     : NEXTRO대응
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%   
    String topmenu_name  = "영업점보고서";
    String leftmenu_name = "성과집계표"; 
    String htm_title     = "마진율추이표"; 
    String actionname    = "";
    String jumcode       = "";
    String jumname       = "";
    String strErrMsg     = "";
    String status        = "0";
    String buttonplay    = "";
    String readonly      = "";

    try {
        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);
        jumcode = account.getBranch_no();
        jumname = account.getBranch_name();
    }catch(Exception exx)  {
                 
    }
%>
<%@ include file="/module/htm_header.inc"%>
<!-- <script language="JavaScript" src="AIViewer/AIScript.js"></script> -->
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_1060.js"></script>
<script language="javascript">

function mySheet_OnClick(Row,Col,Value){
	
}

function mySheet_OnDblClick(Row,Value){
	
}

function hiddenGrid_OnSearchEnd(Code, Msg){
    
	len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.basemonth);
            document.frm.basemonth.selectedIndex=0;
            selectjum();
        }else if (Msg.substr(0,1) == "C"){
       		if (Msg.substr(1,len) == "6"){
				document.frm.pgcode.value=hiddenGrid.GetCellValue(1,0);
				document.frm.pgname.value=hiddenGrid.GetCellValue(1,1);
            }else if (Msg.substr(1,len) == "1"){
            	document.frm.jumname.value=hiddenGrid.GetCellValue(1,0);
            	selectjum();
            }
        }else{
            alert(ErrMsg);
        }
    }
}

function mySheet_OnSearchEnd(Code, Msg){
    
	showUnitText("원, %");
	showMsg(Code, Msg);
	
	mySheet.SetCellText(0,0,"구분");
	mySheet.SetCellText(1,0,"합계");
	mySheet.SetCellText(2,0,"합계");
	mySheet.SetCellText(3,0,"합계");
	mySheet.SetCellText(4,0,"수신");
	mySheet.SetCellText(5,0,"수신");
	mySheet.SetCellText(6,0,"수신");
	mySheet.SetCellText(7,0,"여신");
	mySheet.SetCellText(8,0,"여신");
	mySheet.SetCellText(9,0,"여신");
	
	mySheet.SetMergeCell(0,0,1,2);
	mySheet.SetMergeCell(1,0,3,1);
	mySheet.SetMergeCell(4,0,3,1);
	mySheet.SetMergeCell(7,0,3,1);
	
	mySheet.SetColBackColor(0, "#C9E1F5");
	
	mySheet.SetCellText(1,1,"마진율");
	mySheet.SetCellText(2,1,"순이자수익");
	mySheet.SetCellText(3,1,"평잔");
	mySheet.SetCellText(4,1,"마진율");
	mySheet.SetCellText(5,1,"순이자수익");
	mySheet.SetCellText(6,1,"평잔");
	mySheet.SetCellText(7,1,"마진율");
	mySheet.SetCellText(8,1,"순이자수익");
	mySheet.SetCellText(9,1,"평잔");
	
	mySheet.SetCellAlign(1,1,"Center")
	mySheet.SetCellAlign(2,1,"Center")
	mySheet.SetCellAlign(3,1,"Center")
	mySheet.SetCellAlign(4,1,"Center")
	mySheet.SetCellAlign(5,1,"Center")
	mySheet.SetCellAlign(6,1,"Center")
	mySheet.SetCellAlign(7,1,"Center")
	mySheet.SetCellAlign(8,1,"Center")
	mySheet.SetCellAlign(9,1,"Center")
	
	mySheet.SelectCell(1, 0);  
	mySheet.SetColBackColor(1, "#C9E1F5");
	
	if(mySheet.RowCount() > 0) {
		var info = {Type:"Float", Align:"Right", PointCount:0};
		for(var i=mySheet.HeaderRows(); i <= mySheet.RowCount(); i++) {
			if(i % 3 == 2 || i % 3 == 0) {
				for(var j = 2; j <= 13; j++) {
					mySheet.InitCellProperty(i, j, info);
				}
			}
		}
		
		callgrap();
	}
}    

function mySheet_OnSelectMenu(sAction){
 
	doAction(sAction);
}

function mySheet_OnDownFinish(downloadType, result) {
	if(result) {
		var basemonth=document.frm.basemonth.value;
	    var v_jumcode=document.frm.jumcode.value;
	    
	    condition="기준년월="+basemonth+";점번호="+v_jumcode;
	    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"));
	}
}
</script>

<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <tr>
    <th>기준년월</th>
    <td><select name="basemonth" class="select" onchange="LoadPage();"></select></td>
    <th>점번호</th>
    <td><input type="text" class="input_l" onchange="selectjumname();" name="jumcode" size="6" value="<%=jumcode%>" <%=readonly%> onkeyup="chk_num()">&nbsp;<a href="javascript:popupJumCode()"><img src="/kpi/img/sky/butt_search_s.gif" border="0" align="absmiddle" <%=buttonplay%>></a>&nbsp;<input type="text" class="input_l" readonly name="jumname" size="30" value="<%=jumname%>"></td>
    <td align="right" class="end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
   	  <span class="btn_Grd" style="cursor:pointer; display:none;" id="print" border="0" onclick="javascript:doPrint();">인쇄</span>
    </td>
  </tr>
  <tr>
    <th class="nobor">Peer Group</th>
    <td class="nobor"><input type="hidden" name="pgcode"><input type="text" class="input_l" readonly name="pgname" size="21"></td>
    <th class="nobor">그래프구분</th>
    <td class="nobor end" colspan="2"><input checked type="checkbox" onclick="callgrap()" name="grapyn1">합계<input checked type="checkbox" onclick="callgrap()" name="grapyn2">수신<input type="checkbox" checked onclick="callgrap()" name="grapyn3">여신</td>
  </tr>
</table>
<table height="250" width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
  <tr>
    <td>
    	<div id="chartObj"></div>
       <!--iframe id="iframe1" frameborder=0 scrolling=no height="100%" width="100%"></iframe-->
    </td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
  <tr>
    <td align="right" class="pdB3">단위 / 원, %</td>
  </tr>
  <tr>
    <td>
       <div id="sheetObj"></div>
    </td>
  </tr>
</table>
<div id="hiddenGridObj"></div>
<!-- AIGenerator OCX 포함 시작, 반드시 BODY Tag내부에 기술되어야 함 -->
<!-- <script language="JavaScript">document.write(tagAIGeneratorOcx);</script> -->
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
LoadPage();
htm_title = '<%=htm_title%>';
if(!document.frm.jumcode.value==""){
  //selectjum();
}
</script>