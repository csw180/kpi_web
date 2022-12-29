<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - 성과집계표
'프로그램 ID  : rpop_scr_1020.jsp
'프로그램 명  : 성과집계표 조회
'프로그램개요 : 성과집계표 조회
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
    String leftmenu_name = "성과집계표"; 
    String htm_title     = "성과집계표"; 

    //popup 으로 사용시 받는 Parameter
    String basemonth     = JSPUtil.getParameter(request,"basemonth","");
    String jumcode       = JSPUtil.getParameter(request,"jumcode","");
    String jumname       = JSPUtil.getParameter(request,"jumname","");
    String pgcode        = JSPUtil.getParameter(request,"pgcode","");
    String pgname        = JSPUtil.getParameter(request,"pgname","");
    
    String actionname    = "";
    String strErrMsg     = "";  
    String status        = "0";
    String buttonplay    = "";
    String readonly      = ""; 
    String alleRole      = "0"; 
    
    
        //popup 아닌경우 로그인 정보 set
    if(basemonth==null || basemonth.equals("")){
         jumcode = kpi_rpt_account.getBranch_no();
         jumname = kpi_rpt_account.getBranch_name();
        }   

    String role[] = kpi_rpt_account.getRole(); //권한

    for (int i = 0; i < role.length; i++) {
        if (role[i].trim().equals("450")||role[i].trim().equals("400")) {  // 성과 전산/현업시 KPI코드 확인가능
            alleRole="1";
        } 
    }
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_1020.js"></script>
<script language="javascript" >
function mySheet_OnClick(Row,Col,Value){
	
}

<%//if(basemonth.equals("")){%>
function mySheet_OnDblClick(Row,Value){
	  
	if(Row < 2) return;
	
	var basemonth=document.frm.basemonth.value;
	var jumcode=document.frm.jumcode.value;
	var jumname=document.frm.jumname.value;
	var pgcode=document.frm.pgcode.value;
	var pgname=document.frm.pgname.value; 
	
	var url="";  
	var screen_url="";
	
	if(false){      
	  //업무이익상세화면
	  url="kpi.rpop.rpop_1070.screen?basemonth="+basemonth+"&Security=2&jumcode="+jumcode+"&jumname="+encodeURI(jumname)+"&pgcode="+pgcode+"&pgname="+encodeURI(pgname)+"&IS_POPUP=Y&SCREEN_URL="+screen_url;
	  screen_url="kpi.rpop.rpop_1070.screen";
	}
	else
	{
	    //kpi 코드별 화면
	    var kpiname=mySheet.GetCellValue(Row,1);
	    var screenid=mySheet.GetCellValue(Row,16);
	    var kpicode=mySheet.GetCellValue(Row,15);
	    if ((basemonth >= '200901') && (kpicode == '158' || kpicode == '179' || kpicode == '169' || kpicode == '180' || kpicode == '170' || kpicode == '171' || kpicode == '129')) {
	       alert("2009년 1월이후 실적에 대한 상세내역은\n[CRM시스템 >> 고객관리 >> CRM성과관리]\n에서 확인하시기 바랍니다.");
	       return;
	    }
	    if(screenid == ''){
	      displayLinkMessage(kpiname); //common.js 사용
	      return;
	    }
	    else{
	      url="kpi.rpop." + screenid +  ".screen";
	      screen_url="kpi.rpop." + screenid +  ".screen";
	    }
	    if ((basemonth >= '201401') && (kpicode == '253' || kpicode == '262')) {
	          url=url+"?basemonth="+basemonth+"&Security=2&jumcode="+jumcode+"&jumname="+encodeURI(jumname)+"&pgcode="+pgcode+"&pgname="+encodeURI(pgname)+"&sergb="+kpicode+"&IS_POPUP=Y&SCREEN_URL="+screen_url;
	    } else if ((basemonth >= '201507') && (kpicode == '112')) {
	          url=url+"?basemonth="+basemonth+"&Security=2&jumcode="+jumcode+"&jumname="+encodeURI(jumname)+"&pgcode="+pgcode+"&pgname="+encodeURI(pgname)+"&pygubun=4"+"&IS_POPUP=Y&SCREEN_URL="+screen_url;
	    } else if ((basemonth >= '201507') && (kpicode == '199')) {
	          url=url+"?basemonth="+basemonth+"&Security=2&jumcode="+jumcode+"&jumname="+encodeURI(jumname)+"&pgcode="+pgcode+"&pgname="+encodeURI(pgname)+"&pygubun=3"+"&IS_POPUP=Y&SCREEN_URL="+screen_url;
	    } else if ((basemonth >= '201507') && (kpicode == '271')) {
	          url=url+"?basemonth="+basemonth+"&Security=2&jumcode="+jumcode+"&jumname="+encodeURI(jumname)+"&pgcode="+pgcode+"&pgname="+encodeURI(pgname)+"&bgubun=16000"+"&pygubun=3"+"&IS_POPUP=Y&SCREEN_URL="+screen_url;  //외환이익(반기)
	    } else if ((basemonth >= '201401') && (kpicode == '251' || kpicode == '257')) {
	          url=url+"?basemonth="+basemonth+"&Security=2&jumcode="+jumcode+"&jumname="+encodeURI(jumname)+"&pgcode="+pgcode+"&pgname="+encodeURI(pgname)+"&bgubun=16000"+"&pygubun=4"+"&IS_POPUP=Y&SCREEN_URL="+screen_url;  //외환이익(연간)
	    } else if ((basemonth >= '201301') && (kpicode == '245' || kpicode == '200' || kpicode == '248' || kpicode == '183'|| kpicode == '189' || kpicode == '212'|| kpicode == '215' || kpicode == '196'|| kpicode == '220' || kpicode == '227'|| kpicode == '226'|| kpicode == '246'|| kpicode == '261')) {
	 	   if (kpicode == '245' || kpicode == '200' || kpicode == '212' || kpicode == '215'|| kpicode == '227'|| kpicode == '220' || kpicode == '246') { //반기평잔
	         url=url+"?basemonth="+basemonth+"&Security=2&jumcode="+jumcode+"&jumname="+encodeURI(jumname)+"&pgcode="+pgcode+"&pgname="+encodeURI(pgname)+"&sergb=3"+"&IS_POPUP=Y&SCREEN_URL="+screen_url; 
	      } else url=url+"?basemonth="+basemonth+"&Security=2&jumcode="+jumcode+"&jumname="+encodeURI(jumname)+"&pgcode="+pgcode+"&pgname="+encodeURI(pgname)+"&sergb=2"+"&IS_POPUP=Y&SCREEN_URL="+screen_url; 
	    } else {
	      if ((basemonth >= '201307') && (kpicode == '101' || kpicode == '128' || kpicode == '270')) 
	      {
	          if (kpicode == '101') 
	         	 url=url+"?basemonth="+basemonth+"&Security=2&jumcode="+jumcode+"&jumname="+jumname+"&pgcode="+pgcode+"&pgname="+encodeURI(pgname)+"&pygubun=4"+"&IS_POPUP=Y&SCREEN_URL="+screen_url;  //대손전(연간)
	          else 
	         	 url=url+"?basemonth="+basemonth+"&Security=2&jumcode="+jumcode+"&jumname="+encodeURI(jumname)+"&pgcode="+pgcode+"&pgname="+encodeURI(pgname)+"&pygubun=3"+"&IS_POPUP=Y&SCREEN_URL="+screen_url;                  //대손후(반기)
	      } 
	      else
	   	  {
	    	  if (kpicode == '114' || kpicode == '126') 
	    		  url=url+"?basemonth="+basemonth+"&Security=2&jumcode="+jumcode+"&jumname="+encodeURI(jumname)+"&pgcode="+pgcode+"&pgname="+encodeURI(pgname)+"&sergb=3"+"&IS_POPUP=Y&SCREEN_URL="+screen_url;
		      else if(kpicode == '115' || kpicode == '130')
		    	  url=url+"?basemonth="+basemonth+"&Security=2&jumcode="+jumcode+"&jumname="+encodeURI(jumname)+"&pgcode="+pgcode+"&pgname="+encodeURI(pgname)+"&sergb=2"+"&IS_POPUP=Y&SCREEN_URL="+screen_url;
		      else
		    	  url=url+"?basemonth="+basemonth+"&Security=2&jumcode="+jumcode+"&jumname="+encodeURI(jumname)+"&pgcode="+pgcode+"&pgname="+encodeURI(pgname)+"&IS_POPUP=Y&SCREEN_URL="+screen_url;
	   	  }
	     	 
	    }
	}
	win_open2(url,820,580);    
}

function mySheet_OnMouseMove(Button, Shift, X, Y){
  
	//실명번호 풍선도움말 설정      
	mySheet.SetToolTipText(mySheet.MouseRow(),mySheet.MouseCol(),displayMessageTooltip("KPI코드별 연결"));

}
<%//}%>
function hiddenGrid_OnSearchEnd(Code, Msg){
	len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.basemonth);
            document.frm.basemonth.selectedIndex=0;
            changeUnitText();
            searchProc();
        }else if (Msg.substr(0,1) == "C"){
        	if(hiddenGrid.RowCount() > 0) {
        		if(hiddenGrid.RowCount() > 0) {
            		if (Msg.substr(1,len) == "6"){
        				document.frm.pgcode.value=hiddenGrid.GetCellValue(1,0);
        				document.frm.pgname.value=hiddenGrid.GetCellValue(1,1);
                    }else if (Msg.substr(1,len) == "1"){
        				document.frm.jumname.value=hiddenGrid.GetCellValue(1,0);
                        selectjum();
                    }	
            	}	
        	}
        }else{
            alert(ErrMsg);
        }
    }

}

function mySheet_OnSearchEnd(Code, Msg){
	showMsg(Code, Msg);
    
	if(basemonth >= '201401') {
    	showUnitText("원, 점수, %, 명, 개, 미불");
    } else { 
    	showUnitText("원, 점수, %, 명, 개");
    }  
}    

function mySheet_OnSelectMenu(sAction){
 
	doAction(sAction);
}

function searchProc()
{
	<%if(!(basemonth==null || basemonth.equals(""))){%>
	   document.frm.basemonth.value="<%=basemonth%>";
	   changeUnitText(); //단위출력
	   selectjum(); //pg코드조회
	   doAction("조회");
	<%}else{%>
	if(!document.frm.jumcode.value==""){
	  selectjum();
	}
	<%}%>
}

function mySheet_OnDownFinish(downloadType, result) {
	if(result) {
		var basemonth=document.frm.basemonth.value;
	    var v_jumcode=document.frm.jumcode.value;
	    var pgcode=document.frm.pgcode.value;
	    
	    condition="기준년월="+basemonth+";점번호="+v_jumcode+";PG코드="+pgcode;
	    hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"));
	}
}

function mySheet_OnLoadData(data) {
    rtnData = data;
}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <tr>
    <th>기준년월</th>
    <td><select name="basemonth" class="select" onchange="changeUnitText()"></select></td>          
    <td align="right" colspan="2" class="end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
   	  <span class="btn_Grd" style="cursor:pointer; display:;" id="print" border="0" onclick="javascript:doPrint();">인쇄</span>
    </td>
  </tr>
  <tr>
    <th class="nobor">점번호</th>
    <td class="nobor"><input type="text" class="input_l" onchange="selectjumname()" name="jumcode" size="6" value="<%=jumcode%>" onkeyup="chk_jum()">
        <a href="javascript:popupJumCode()"><img src="/kpi/img/sky/butt_search_s.gif" border="0" align="absmiddle" <%=buttonplay%>></a>
        <input type="text" class="input_l" readonly name="jumname" size="30" value="<%=jumname%>">
    </td>
    <th class="nobor">Peer Group</th>
    <td class="nobor end" colspan="2">
	    <input type="hidden" name="pgcode" value="<%=pgcode%>">
	    <input type="text" class="input_l" readonly name="pgname" size="21" value="<%=pgname%>">
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
<!-- 보고서 출력 -->
<!-- <script>displayAI();</script> -->

<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
alleRole  = '<%=alleRole%>';
LoadPage();
htm_title = '<%=htm_title%>';
</script>