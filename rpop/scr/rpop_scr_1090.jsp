<%--===============================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : 영업점보고서 - 기간대비 비교
'프로그램 ID  : rpop_scr_1090.jsp
'프로그램 명  : 경쟁영업점별비교 조회
'프로그램개요 : 경쟁영업점별비교 조회
'작   성   자 : 남호준
'작   성   일 : 2006.10.19
====================================================================
'수정자/수정일: 하진영/20110608
'수정사유     : NEXTRO대응
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String topmenu_name  = "영업점보고서";
    String leftmenu_name = "성과집계표"; 
    String htm_title     = "기간대비 비교"; 
   
    String basemonth     = "";
    String jumcode       = "";
    String jumname       = "";    
    
    String actionname    = "";
    String strErrMsg     = "";
    String status        = "0";
    String buttonplay    = "";
    String readonly      = "";
  
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
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_1090.js"></script>
<script language="javascript">

	function mySheet_OnClick(Row,Col,Value){
		
	}
	
	function hiddenGrid_OnSearchEnd(Code, Msg){
	    f=document.frm;
	    len = Msg.length;
	    if (len > 0){
	        if (Msg.substr(0,1) == "B"){
	            ComboValue(f.basemonth);
	            f.basemonth.selectedIndex=0;
	            ComboValue(f.cfbasemonth);
	            f.cfbasemonth.selectedIndex=0;
	            
	            selectjum();
	        }else if (Msg.substr(0,1) == "C"){              
	            if (Msg.substr(1,len) == "6"){      
					f.pgcode.value=hiddenGrid.GetCellValue(1,0);
					f.pgname.value=hiddenGrid.GetCellValue(1,1);
	            }else if (Msg.substr(1,len) == "1"){            	
					f.jumname.value=hiddenGrid.GetCellValue(1,  0);
	                selectjum();
	            }
	        }else{
	            alert(ErrMsg);
	        }
	    }
	
	}
	
	function mySheet_OnSearchEnd(Code, Msg)
	{
		showMsg(Code, Msg);
		showUnitText("원, %, 명, 개");
	}    
	
	function mySheet_OnSelectMenu(sAction){
	 
		doAction(sAction);
	}
	
	function mySheet_OnDownFinish(downloadType, result) {
		if(result) {
			var basemonth=document.frm.basemonth.value;
		    var v_jumcode=document.frm.jumcode.value;
		    var basemonth2=document.frm.cfbasemonth.value;
		    
		    condition="기준년월="+basemonth+";점번호="+v_jumcode+";비교년월="+basemonth2;
		    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"));
		}
	}

</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <tr>
    <th>기준년월</th>
    <td><select name="basemonth" class="select" onchange="allDelDataGrid(mySheet); showUnitText('원, %, 명, 개');"></select></td>
    <th>비교년월</th>
    <td><select name="cfbasemonth" class="select" onchange="allDelDataGrid(mySheet); showUnitText('원, %, 명, 개');"></select></td>
    <td align="right" class="end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');" id="btn_search">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
   	  <span class="btn_Grd" style="cursor:pointer; display:none;" id="print" border="0" onclick="javascript:doPrint();">인쇄</span>
    </td>
  </tr> 
  <tr>
    <th class="nobor">점번호</th> 
    <td class="nobor">
      <input type="text" class="input_l" onchange="selectjumname(); showUnitText('원, %, 명, 개');" name="jumcode" size="6" value="<%=jumcode%>" <%=readonly%> onkeyup="chk_num()">&nbsp;<a href="javascript:popupJumCode()"><img src="/kpi/img/sky/butt_search_s.gif" border="0" align="absmiddle" <%=buttonplay%>></a>&nbsp;<input type="text" class="input_l" readonly name="jumname" size="30" value="<%=jumname%>"> 
    </td>
    <th class="nobor">Peer Group</th>
    <td class="nobor">
      <input type="hidden" name="pgcode" value="">
      <input type="text" class="input_l" readonly name="pgname" size="21" value="">
    </td>             
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
<%if(!basemonth.equals("")){%>
<script>dispalyCloseBtn(); //팝업시 닫기버튼
</script>
<%}%>

<div id="hiddenGridObj"></div>
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
LoadPage();
htm_title = '<%=htm_title%>';
if(!document.frm.jumcode.value==""){
  //selectjum();  
}

//alert("개발중입니다.")
</script>
