<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - 성과집계표
'프로그램 ID  : rpop_scr_1010.jsp
'프로그램 명  : 종합점수표 조회
'프로그램개요 : 종합점수표 조회
'작   성   자 : 변휘원
'작   성   일 : 2006.04.12
====================================================================
'수정자/수정일: 하진영/2011.06.02
'수정사유     : nextro 대응
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String topmenu_name  = "영업점보고서";
    String leftmenu_name = "성과집계표"; 
    String htm_title     = "종합점수표"; 
    String actionname    = "";
    String jumcode       = "";
    String jumname       = "";
    String strErrMsg     = "";
    String status        = "0";
    //String buttonplay    = "style='display:none'";
    //String readonly      = "readonly";
    String buttonplay    = "";
    String readonly      = "";

    try {
        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);
        jumcode = account.getBranch_no();
        jumname = account.getBranch_name();
        
        /*
        String role[] = account.getRole();
        for(int i = 0; i < role.length; i++) {
            System.out.println("[" + role[i] + "]");
            //if( role[i].equals("60000") || role[i].equals("70000") || role[i].equals("99999")){
            if( role[i].equals("100  ") || role[i].equals("400  ") || role[i].equals("450  ")){
                buttonplay = "";
                readonly   = "";
                break;
            }
        }
        */
    }catch(Exception exx)  {
                 
    }
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_1010.js"></script>
<script language="vbscript">
  function deleteyn()
      deleteyn=MsgBox("정말 삭제 하시겠읍니까",4,"삭제")
  end function
</script>

<script language="javascript">

	function mySheet_OnClick(Row,Col,Value){
	
	}
	
	function mySheet_OnDblClick(Row,Value){
	  
		if(Row < 3) return;
		
		var kpicode=mySheet.GetCellValue(Row,0);
		var screenid=mySheet.GetCellValue(Row,11);
		  
		var url="";
		var screen_url="";
		if(screenid == ''){
		  displayLinkMessage(kpicode); //common.js 사용
		  return;
		}
		else{
		  url="kpi.rpop." + screenid +  ".screen";
		  screen_url=url;
		}
		
		var basemonth=document.frm.basemonth.value;
		var jumcode=document.frm.jumcode.value;
		var jumname=document.frm.jumname.value;
		var pgcode=document.frm.pgcode.value;
		var pgname=document.frm.pgname.value;
		url += "?basemonth="+basemonth+"&Security=2&jumcode="+jumcode+"&jumname="+encodeURI(jumname)+"&pgcode="+pgcode+"&pgname="+encodeURI(pgname)+"&IS_POPUP=Y&SCREEN_URL="+screen_url;
		win_open2(url,820,580);   
	
	
	}
	
	function mySheet_OnMouseMove(Button, Shift, X, Y){
	  
		//실명번호 풍선도움말 설정      
		mySheet.SetToolTipText(mySheet.MouseRow(),mySheet.MouseCol(),displayMessageTooltip("KPI코드별 연결"));
	
	}
	
	function hiddenGrid_OnSearchEnd(Code, Msg){
	    len = Msg.length;
	    if (len > 0){
	    	if (Msg.substr(0,1) == "B"){
	            ComboValue(document.frm.basemonth);
	            document.frm.basemonth.selectedIndex=0;
	            
	            if(!document.frm.jumcode.value==""){
	            	selectjum();
	            }
	            
	        }else if (Msg.substr(0,1) == "C"){
	        	if(hiddenGrid.RowCount() > 0) {
	        		if (Msg.substr(1,len) == "6"){
	                    document.frm.pgcode.value = hiddenGrid.GetCellValue(1,0); 
	                    document.frm.pgname.value = hiddenGrid.GetCellValue(1,1); 
	                }else if (Msg.substr(1,len) == "1"){
	                    document.frm.jumname.value = hiddenGrid.GetCellValue(1,0); 
	                    selectjum();
	                }	
	        	}
	        }else{
	            alert(ErrMsg);
	        }
	    }
	}
	
	function mySheet_OnSearchEnd(Code, Msg){
		showMsg(Code, Msg);
		mySheet.SetSumValue(0,"합 계");
		mySheet.SetCellAlign(mySheet.HeaderRows(),0,"Center");
		//합계행 병합
		mySheet.SetMergeCell (mySheet.HeaderRows(), 0, 1,2);
		showUnitText("원, %, 개");
	}    
	
	function mySheet_OnSelectMenu(sAction){
	 
		doAction(sAction);
	}
	
	function mySheet_OnDownFinish(downloadType, result) {
		if(result) {
			var basemonth   = document.frm.basemonth.value;
		    var v_jumcode   = document.frm.jumcode.value;
		    
		    condition="기준년월="+basemonth+";점번호="+v_jumcode+";PG코드="+document.frm.pgcode.value;
		    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"));
		}
	}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" class="tabletype2 pdLR">
  <tr>
    <th>기준년월</th>
    <td><select name="basemonth" class="select"></select></td>
    <th>점번호</th>
    <td>
      <input type="text" class="input_l" onchange="selectjumname()" name="jumcode" size="6" value="<%=jumcode%>" <%=readonly%> onkeyup="chk_jum()">
      <a href="javascript:popupJumCode()"><img src="/kpi/img/sky/butt_search_s.gif" border="0" align="absmiddle" <%=buttonplay%>></a>
      <input type="text" class="input_l" readonly name="jumname" size="30" value="<%=jumname%>">
    </td>
    <td align="right" class="end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
   	  <span class="btn_Grd" style="cursor:pointer; display:none;" id="print" border="0" onclick="javascript:doPrint();">인쇄</span>  
    </td>
  </tr>
  <tr>
    <th class="nobor">Peer Group</th>
    <td class="nobor" colspan="3"><input type="hidden" name="pgcode"><input type="text" class="input_l" readonly name="pgname" size="20"></td>
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
<div id="hiddenGridObj"></div>
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
LoadPage();
htm_title = '<%=htm_title%>';
</script>