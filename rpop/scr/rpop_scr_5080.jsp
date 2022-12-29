<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 연구위원 - 연구위원 세부실적
'프로그램 ID  : rpop_scr_5080.jsp
'프로그램 명  : 연구위원 세부실적
'프로그램개요 : 연구위원 세부실적
'작   성   자 : 조형석
'작   성   일 : 2013.11.20
====================================================================
'수정자/수정일/수정사유: 하진영/2014.09.05: 조회사유코드 추가
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%@ page import="kpi.rpop.util_selectbox"%>
<%  
    String     topmenu_name  = "연구위원";
    String     leftmenu_name = "연구위원 세부실적"; 
    String     htm_title     = "연구위원 세부실적"; 
    String     actionname    = "";
    String     strErrMsg     = "";
    String     status        = "0";
    String     haengwon_no   = "";
    String     readonly      = "readonly disabled";
    
    boolean    allRole       = false;
    
    try {
        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);
        
        haengwon_no   = account.getHaengwon_no();
        haengwon_no   = "0000000000" + haengwon_no;                                           // 직원번호 10자리 '0' 채움
        haengwon_no   = haengwon_no.substring(haengwon_no.length()-10,haengwon_no.length());  // 직원번호 10자리로 생성
        
        String role[] = account.getRole(); //권한

        for (int i = 0; i < role.length; i++) {
            if (role[i].trim().equals("510") || role[i].trim().equals("450")) {   // 450: 성과담당전산, 510:후선보임인력관리자
               readonly = "";
               allRole  = true;
               break;
            }
        } 
    }catch(Exception exx)  {
                 
    }
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_5080.js"></script>
<script> 
	function mySheet_OnSearchEnd(Code, Msg){    
	    showMsg(Code, Msg);
	    mySheet.SetSumValue(0,"합 계");
		mySheet.SetCellAlign(mySheet.HeaderRows(),0,"Center");
		//합계행 병합
		mySheet.SetMergeCell (mySheet.HeaderRows(), 0, 1,2);
		showUnitText("원");
	}
	
	function mySheet_OnSelectMenu(sAction){
	    doAction(sAction);
	}
	
	function hiddenGrid2_OnSearchEnd(Code, Msg){
	    f = document.frm;
	    len = Msg.length;
	    if (len > 0){
	        if (Msg.substr(0,1) == "B"){
	            ComboValue(f.stmonth);
	            f.stmonth.selectedIndex=0;
	            ComboValue(f.edmonth);
	            f.edmonth.selectedIndex=0;
	            initGrid();            
	        }else{
	            alert(ErrMsg);
	        }
	    }
	}
	
	function mySheet_OnDownFinish(downloadType, result) 
	{
		if(result) 
		{
			var jikwonno     = document.frm.jikwonno.value;
		    var stmonth      = document.frm.stmonth.value;
		    var edmonth      = document.frm.edmonth.value;
		    
		    condition = "직원번호="+jikwonno+";조회구간="+stmonth + "~" + edmonth;
		    hiddenGrid2.GetSaveData(encodeURI("comm.scr.comm_scr_9096.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"
                    +"&cust_no=0"+"&searchCode="+searchCode+"&pg_url="+pg_url));
		}
	}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%> 

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR">
    <tr>
        <td>
           <table width="100%" border="0" cellpadding="0" cellspacing="0" class="tabletype2">
               <tr>
                    <th>직원번호</th>
                    <td><input type="text" name="jikwonno" class="input_l" size="10" value="<%=haengwon_no%>" <%=readonly%> > </td>
                    <th>조회구간</th>
                    <td><select name="stmonth" class="select" onchange="initGrid()"> 
                    	  </select>~<select name="edmonth"  class="select"> </select>
                    </td>
                    <th>조회사유코드</th>
                    <td colspan="3">
                     <select name="searchCode" class="select" onchange="allDelDataGrid(mySheet); showUnitText('원');" >
                      <option value='00'>선택</option>            
                             <%  util_selectbox us2  =  new  util_selectbox();
                                 us2.setData("UP_KPI_C_S_CO고객조회사유코드","","코드","코드명");
                                 out.println(us2.getData());
                             %>
                       </select>
                    </td>
                    <td align="right" class="end">
                         <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
	  					 <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
                    </td>

               </tr>
           </table>		
        </td>
    </tr>
    <tr>
      <td colspan="5" class="pdT5">
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
<div id="hiddenGrid2Obj"></div>
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
<% if(allRole) { %>
      document.frm.searchCode.value = '32'; //[32]성과평가작업 자동set
<% } %>
LoadPage();
htm_title = '<%=htm_title%>';
</script>