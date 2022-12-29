<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - RM총괄
'프로그램 ID  : rpop_scr_7030.jsp
'프로그램 명  : RM권유계좌확인
'프로그램개요 : RM권유계좌확인
'작   성   자 : 하진영
'작   성   일 : 2012.03.13
====================================================================
'수정자/수정일 :
'수정사유      :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="kpi.rpop.util_selectbox"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String   topmenu_name  = "영업점보고서";
    String   leftmenu_name = "RM총괄"; 
    String   htm_title     = "RM(본부) 권유계좌확인"; 
    String   actionname    = "";
    String   strErrMsg     = "";
    String   status        = "0";
    String   buttonplay    = "";
    String   readonly      = "";
    boolean  allRole       = false;

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

        String role[] = account.getRole(); //권한

        for (int i = 0; i < role.length; i++) {
            if (role[i].trim().equals("400") || role[i].trim().equals("450")) {
                allRole=true;
                break;
            }
        }
    }catch(Exception exx) { }

%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_7030.js"></script>
<script>
	function mySheet_OnClick(Row,Col,Value) {
	}
	
	function hiddenGrid_OnSearchEnd(Code, Msg) {
	    len = Msg.length
	    if (len > 0){
	        if (Msg.substr(0,1) == "B"){
	            ComboValue(document.frm.basemonth);
	            document.frm.basemonth.selectedIndex=0;
	            selectmonth();
	        }else if (Msg.substr(0,1) == "C"){
	           if (Msg.substr(1,len) == "1"){
	                document.frm.jumname.value = hiddenGrid.GetCellValue(1,0); 
	            }
	
	        }else if(Msg.substr(0,1) == "G"){
	            
	        }else{
	            alert(Msg);
	        }
	    }
	}
	
	function mySheet_OnSearchEnd(Code, Msg) {    
		showMsg(Code, Msg);
		showUnitText("원");
		mySheet.SetSumValue(0,"합 계");
		mySheet.SetCellAlign(mySheet.LastRow(),0,"Center");
		mySheet.SetMergeCell (mySheet.LastRow(), 0, 1,5);
	}
	
	function mySheet_OnDownFinish(downloadType, result) 
	{
		if(result) 
		{
			var basemonth   = document.frm.basemonth.value;
		    var v_jumcode   = document.frm.jumcode.value;
		    var pygubun     = document.frm.pygubun.value;
		    
		    condition = "기준년월="+basemonth+";점번호="+v_jumcode+";구분="+pygubun;
	        hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9096.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"+"&searchCode="+searchCode+"&pg_url="+pg_url));
		}
	}
	
	function mySheet_OnSelectMenu(sAction)
	{
		doAction(sAction);
	}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <!-- <tr>
    <td colspan="5"><input type="hidden" name="pgcode"><input type="hidden" name="pgname"></td>
  </tr> -->
  <tr>
    <th>기준년월</th>
    <td>
    	<select name="basemonth" class="select" onchange="selectmonth()"></select>
    </td>
    <th>RM점번호</th>
    <td>
    	<input type="text" class="input_l" onchange="selectjumname()" name="jumcode" size="6" value="<%=jumcode%>" <%=readonly%> onkeyup="chk_RM()">
    	<a href="javascript:popupJumCode()"><img src="/kpi/img/sky/butt_search_s.gif" border="0" align="absmiddle" <%=buttonplay%>></a>
    	<input type="text" class="input_l" readonly name="jumname" size="30" value="<%=jumname%>"></td>
    <td align="right" class="end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
   	  <span class="btn_Grd" style="cursor:pointer; display:none;" id="print" border="0" onclick="javascript:doPrint();">인쇄</span>
    </td>
  </tr>
  <tr>
    <th class="nobor">구분</th>
    <td class="nobor">
    	 <select name="pygubun" class="select"  onchange="initGrid()">
    	 	  <option value="4">연간</option>
    	 	  <option value="3">반기</option>
    	 </select>
    </td>
    <th class="nobor">조회사유코드</th>
    <td class="nobor end" colspan="3">
     <select name="searchCode" class="select" onchange="allDelDataGrid(mySheet)" >
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

<%if(!basemonth.equals("")){%><script>dispalyCloseBtn();//팝업시 닫기버튼</script><%}%>

<div id="hiddenGridObj"></div>
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
LoadPage();
htm_title = '<%=htm_title%>';
<% if (allRole) { %>
      document.frm.searchCode.value = 32;
<% } %>
<%if(!(basemonth==null || basemonth.equals(""))){%>
   document.frm.basemonth.value="<%=basemonth%>";
   document.frm.jumcode.value="<%=jumcode%>";
   document.frm.jumname.value="<%=jumname%>";
   initGrid();   // RM계좌확인초기화
   doAction("조회");
<%} %>
</script>