<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 영업점보고서 - 고객실적조회
'프로그램 ID  : rpop_scr_3010.jsp
'프로그램 명  : 고객별 실적보고서
                권한에따라 타점 선택 가능여부 결정
'프로그램개요 : 고객별 실적보고서
'작   성   자 : 변휘원
'작   성   일 : 2006.04.12 
====================================================================
'수정자/수정일   : 수정사유
'하진영/20110901 : NEXTRO 대응
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="kpi.rpop.util_selectbox"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String   topmenu_name  = "영업점보고서";
    String   leftmenu_name = "고객실적조회"; 
    String   htm_title     = "고객별 실적보고서"; 
    String   actionname    = "";
 
    //popup 으로 사용시 받는 Parameter
    String   basemonth     = JSPUtil.getParameter(request,"basemonth","");
    String   jumcode       = JSPUtil.getParameter(request,"jumcode","");
    String   jumname       = JSPUtil.getParameter(request,"jumname","");
    String   custgubun     = JSPUtil.getParameter(request,"custgubun","100"); //전체
    String   custstat      = JSPUtil.getParameter(request,"custstat","0");    //전체
             
    String   strErrMsg     = "";
    String   status        = "0";
    String   buttonplay    = "style='display:none'";
    String   readonly      = "readonly";
    boolean  allRole       = false;

    try {
        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);
        
        //권한에따른 점조회 Button 및 점검색기능 설정
        String role[] = account.getRole();        
        for(int i = 0; i < role.length; i++) {
            if(role[i].trim().equals("400") || role[i].trim().equals("450")){                
                buttonplay = "";
                readonly   = "";
                allRole    = true;
                break;
            }
        }

        //popup 으로 사용되지 않은 경우 login 점으로 초기화
        if(basemonth==null || basemonth.equals("")){
          jumcode = account.getBranch_no();
          jumname = account.getBranch_name();
          
        //출장소로 조회시 합산점으로 처리하여 보여주도록 
         if (jumcode.trim().equals("0643")){
             jumcode = "0026";
             jumname = "영업부";
          }
         else if (jumcode.trim().equals("0653")){
             jumcode = "0705";
             jumname = "부경대지점";
          }           
        } 
        //popup 으로 사용되었으나 타점조회 권한이 없는 경우
        else if(!basemonth.equals("") && !readonly.equals("")){
          jumcode = account.getBranch_no();
          jumname = account.getBranch_name();

        //출장소로 조회시 합산점으로 처리하여 보여주도록 
         if (jumcode.trim().equals("0643")){
             jumcode = "0026";
             jumname = "영업부";
          }
         else if (jumcode.trim().equals("0653")){
             jumcode = "0705";
             jumname = "부경대지점";
          }           
        }
    }catch(Exception exx)  {             
            
    }     
   
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_3010.js"></script>
<script> 
	function mySheet_OnMouseMove(Button, Shift, X, Y){
		//실명번호 풍선도움말 설정        
		if(mySheet.MouseCol()< 2 && mySheet.MouseRow()> 1){
			mySheet.SetToolTipText(mySheet.MouseRow(), mySheet.MouseCol(), mySheet.GetCellText(mySheet.MouseRow(),2));//"실명번호는 " + GetCellText(MouseRow(),MouseCol()+1) + " 입니다.";
		}
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
	                document.frm.pgcode.value = hiddenGrid.GetCellValue(1,0); 
	                document.frm.pgname.value = hiddenGrid.GetCellValue(1,1);
	            }else if (Msg.substr(1,len) == "1"){
	                document.frm.jumname.value = hiddenGrid.GetCellValue(1,0);
	            }
	        }else if (Msg.substr(0,1) == "J"){
	            if (Msg.substr(1,len) == "8"){
	                ComboValue(document.frm.custgubun);
	            }else if (Msg.substr(1,len) == "11"){
	                ComboValue(document.frm.custstat);   
	                searchProc(); 
	            }
	        }else if(Msg.substr(0,1) == "G"){
	        	alert("6");
	        }else{
	            alert(ErrMsg);
	        }
	    }
	}
	
	function hiddenGrid_OnLoadData(data) {
		//console.log(data);
	}
	
	function mySheet_OnSearchEnd(Code, Msg){
	    getTimeStamp("2");
	    showMsg(Code, Msg);
	    mySheet.SetSumValue(0,"합 계");
		mySheet.SetCellAlign(mySheet.LastRow(),0,"Center");
		//합계행 병합
		mySheet.SetMergeCell (mySheet.LastRow(), 0, 1,3);
		showUnitText("원");
	}
	function mySheet_OnSelectMenu(sAction){
		 doAction(sAction);
	}
	
	function searchProc()
	{
		<% if (allRole) { %>
		    document.frm.searchCode.value = 32;
		<% } %>
		<%if(!(basemonth.equals("") || basemonth==null)){%>
		 document.frm.basemonth.value="<%=basemonth%>";
		 document.frm.custgubun.value="<%=custgubun%>";
		 selectCustgubun();
		 if('<%=custstat%>' != '0'){
		   document.frm.custstat.value="<%=custstat%>";
		 }
		 setPuyngzan();
		 initGrid(); // 화면 그리드 초기화
		 doAction("조회");
		<%}else{%>
		if(!document.frm.jumcode.value==""){
		selectjum();
		}
		<%}%>
	}
	
	function mySheet_OnDownFinish(downloadType, result) 
	{
		if(result) 
		{
			var basemonth   = document.frm.basemonth.value;
			var v_jumcode   = document.frm.jumcode.value;
			var custgubun   = document.frm.custgubun.value;
			var custstat    = document.frm.custstat.value;
			var baseamt     = document.frm.baseamt.value;
		    
		    condition = "기준년월="+basemonth+";점번호="+v_jumcode+";고객구분="+custgubun+";고객상태="+custstat+";평잔기준금액="+baseamt ;            
	        hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9096.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"+"&searchCode="+searchCode+"&pg_url="+pg_url));
		}
	}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <input type="hidden" name="pgcode"><input type="hidden" name="pgname">
  <tr>
    <th>기준년월</th>
    <td><select name="basemonth" class="select" onchange="selectmonth()"></select></td>
    <th>점번호</th>
    <td colspan="2">
      <input type="text" class="input_l" onchange="selectjumname()" name="jumcode" size="6" value="<%=jumcode%>" <%=readonly%> onkeyup="chk_num()">&nbsp;<a href="javascript:popupJumCode()"><img src="img/sky/butt_search_s.gif" border="0" align="absmiddle" <%=buttonplay%>></a>&nbsp;<input type="text" class="input_l" readonly name="jumname" size="30" value="<%=jumname%>">
    </td>
    <td align="right" class="end">
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
    </td>
  </tr>
  <tr>
    <th class="nobor">고객구분</th>
    <td class="nobor"><select name="custgubun" class="select" onchange="selectCustgubun()"></select></td> 
    <th class="nobor">고객상태</th>
    <td class="nobor"><select name="custstat" class="select" onchange="selectCustStat()"><option value=0>전체</option></select></td>
    <th class="wd10 nobor">평잔기준금액</th>
    <td class="nobor end">
      <select name="baseamt" class="select">
        <option value=''>선택</option>
      </select>
    </td>
  </tr>
  <tr>
    <th class="nobor">조회사유코드</th>
    <td class="nobor end" colspan="5">
     <select name="searchCode" class="select" onchange="allDelDataGrid(mySheet); showUnitText('원');" >
       <option value='00'>선택</option>            
          <%  util_selectbox us2  =  new  util_selectbox();
          	  us2.setData("UP_KPI_C_S_CO고객조회사유코드","","코드","코드명");
              out.println(us2.getData());
          %>
     </select>
    </td>
  </tr>
  <tr>
    <td colspan="6" class="topB">
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

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
  <tr>
    <td>
      <input type="hidden" class="input_l" name="start" size="50">
      <input type="hidden" class="input_l" name="end" size="50">
    </td>
  </tr>
</table>
  <tr>
    <td>
       <div id="hiddenGridObj"></div>
    </td>
  </tr>
</table>

<table>
  <tr>
    <td>
      <input type="hidden" class="input_l" name="start" size="50">
      <input type="hidden" class="input_l" name="end" size="50">
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