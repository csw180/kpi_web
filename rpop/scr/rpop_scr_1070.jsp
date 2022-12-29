<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - KPI별 명세표
'프로그램 ID  : rpop_scr_1070.jsp
'프로그램 명  : 이익상세명세표
'프로그램개요 : 이익상세명세표
'작   성   자 : 변휘원
'작   성   일 : 2006.04.12
====================================================================
'수정자/수정일 :
'수정사유      :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String topmenu_name  = "영업점보고서";
    String leftmenu_name = "KPI별 명세표"; 
    String htm_title     = "이익상세명세표"; 
    String actionname    = "";
    String strErrMsg     = "";
    String status        = "0";
    String buttonplay    = "";
    String readonly      = "";

    //popup 으로 사용시 받는 Parameter
    String basemonth     = JSPUtil.getParameter(request,"basemonth","");
    String jumcode       = JSPUtil.getParameter(request,"jumcode","");
    String jumname       = JSPUtil.getParameter(request,"jumname","");
    String bgubun        = JSPUtil.getParameter(request,"bgubun","");
    String mgubun        = JSPUtil.getParameter(request,"mgubun","");
    String pygubun       = JSPUtil.getParameter(request,"pygubun","");

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
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_1070.js"></script>
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
            selectmonth();
        }else if (Msg.substr(0,1) == "C"){
            if (Msg.substr(1,len) == "6"){
				document.frm.pgcode.value=hiddenGrid.GetCellValue(1,0);
				document.frm.pgname.value=hiddenGrid.GetCellValue(1,1);
				searchProc();
            }else if (Msg.substr(1,len) == "1"){
				document.frm.jumname.value=hiddenGrid.GetCellValue(1,0);
            }
        }else if(Msg.substr(0,1) == "G"){
            if(Msg.substr(1,len)== "1"){
                ComboValue(document.frm.bgubun);
            }else if(Msg.substr(1,len)== "2"){
                ComboValue(document.frm.mgubun);
            }
        }else{
            alert(ErrMsg);
        }
    }
}

function mySheet_OnSearchEnd(Code, Msg){
	showMsg(Code, Msg);
	showUnitText("원");
}    

function mySheet_OnSelectMenu(sAction){
 
	doAction(sAction);
}

function searchProc()
{
	<%if(!(basemonth.equals("") || basemonth==null)){%>
	   document.frm.basemonth.value="<%=basemonth%>";
	   document.frm.pygubun.value="<%=pygubun%>";   

	   if ("<%=jumcode%>".substr(0,1) == "R") {
	   	  document.frm.pygubun.value='3';
	   }

	   //구분 2013년7월 부터 의미있음
	   if(document.frm.basemonth.value >= "201307"){
	       document.all.td1.style.display="";
	       document.all.td2.style.display="";
	   }else{
	       document.all.td1.style.display="none";
	       document.all.td2.style.display="none";
	   }   
	   
	   //비이자수익에서 요청한 경우 해당 분류로 조회, 성과집계표에서 popup 요청인 경우 default인 전체 전체
	   if('12000' == '<%=bgubun%>'){
	     document.frm.bgubun.value="<%=bgubun%>";
	     document.frm.jumcode.value="<%=jumcode%>";
	     document.frm.jumname.value="<%=jumname%>";
	     document.frm.pygubun.value="<%=pygubun%>";
	     sel_bgubun();
	     if('12000' == '<%=mgubun%>') {
	       document.frm.mgubun.value='0';   
	     }else{
	       document.frm.mgubun.value='<%=mgubun%>';   
	     }
	   }

	   //외환이익요청시
	   if('16000' == '<%=bgubun%>'){
	     document.frm.bgubun.value="<%=bgubun%>";
	     document.frm.jumcode.value="<%=jumcode%>";
	     document.frm.jumname.value="<%=jumname%>";
	     document.frm.pygubun.value="<%=pygubun%>";
	     sel_bgubun();
	   }
	   doAction("조회");
	<%}%>
}

function mySheet_OnDownFinish(downloadType, result) {
	if(result) {
		var basemonth=document.frm.basemonth.value;
	    var v_jumcode=document.frm.jumcode.value;
	    var bgubun=document.frm.bgubun.value;
	    var mgubun=document.frm.mgubun.value;
	    var excsubpdt=document.frm.excsubpdt.checked ? 1:0;
	    var pygubun=document.frm.pygubun.value;
	    
	    condition="기준년월="+basemonth+";점번호="+v_jumcode+";하위상품제외="+excsubpdt+";중분류="+bgubun+";소분류="+mgubun+";구분="+pygubun;
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
    <td><select name="basemonth" class="select" onchange="selectmonth(); showUnitText('원');"></select></td>
    <th>점번호</th>
    <td><input type="text" class="input_l" onchange="selectjumname(); showUnitText('원');" name="jumcode" size="6" value="<%=jumcode%>" <%=readonly%> onkeyup="chk_jum()">&nbsp;<a href="javascript:popupJumCode()"><img src="/kpi/img/sky/butt_search_s.gif" border="0" align="absmiddle" <%=buttonplay%>></a>&nbsp;<input type="text" class="input_l" readonly name="jumname" size="30" value="<%=jumname%>"></td>
    <td align="right" class="end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
   	  <span class="btn_Grd" style="cursor:pointer; display:none;" id="print" border="0" onclick="javascript:doPrint();">인쇄</span>
    </td>
  </tr>
  <tr>
    <th class="nobor">중분류</th>
    <td class="nobor">
    	<select name="bgubun" class="select" onchange="sel_bgubun(); showUnitText('원');">
    		<option value="0">전체</option>
    	</select>
    </td>
    <th class="nobor">소분류</th>
    <td class="nobor">
    	<select name="mgubun" class="select"  onchange="allDelDataGrid(mySheet); showUnitText('원');">
    		<option value="0">전체</option>
    	</select>
    </td>
    <td align="right" class="nobor end">
    <span class="btn_Grd2" style="cursor:pointer" border="0" onclick="javascript:call_main_1060();">기타조정손익</span>
    <%if(basemonth.equals("")){%>
     <span class="btn_Grd2" style="cursor:pointer" border="0" onclick="javascript:call1020();">성과집계표</span>
<%}%>
    </td>
  </tr>
  <tr>
    <th class="nobor">하위상품제외</th>
    <td class="nobor"><input type="checkbox" name="excsubpdt"></td>
    <th class="nobor" id="td1">구분</th>
    <td class="nobor end" colspan="2" id="td2">
    	 <select name="pygubun" class="select"  onchange="allDelDataGrid(mySheet); showUnitText('원');">
    	 	  <option value="4">연간</option>
    	 	  <option value="3">반기</option>
    	 </select>
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
</script>