<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 기타 - 개인종합이익세부내역
'프로그램 ID  : rpop_scr_5030.jsp
'프로그램 명  : 개인종합이익세부내역
'프로그램개요 : 개인종합이익세부내역
'작   성   자 : 하진영
'작   성   일 : 2014.04.10
====================================================================
'수정자/수정일/수정사유: 하진영/2014.10.13: 조회사유코드 추가
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%@ page import="kpi.rpop.util_selectbox"%>
<%  
    String     topmenu_name  = "기타";
    String     leftmenu_name = "개인종합이익세부내역"; 
    String     htm_title     = "개인종합이익세부내역"; 
    String     actionname    = "";
    String     strErrMsg     = "";
    String     status        = "0";
    String     buttonplay    = "";
    String     haengwon_no   = "";
    boolean    allRole       = false;
    boolean    monthRole     = false;  //개인 PI관리자
    

    try {
        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);
        
        haengwon_no   = account.getHaengwon_no();
        String role[] = account.getRole(); //권한
  
        for (int i = 0; i < role.length; i++) {
            if (role[i].trim().equals("450") || role[i].trim().equals("530")) { // (450)전산_성과담당, (530)개인별PI전직원조회가능
               allRole=true;
               break;
            }
        } 

        for (int i = 0; i < role.length; i++) {
            if (role[i].trim().equals("500")) {    //(500)개인별PI관리자
               monthRole=true;
               break;
            }
       
        } 

        
    }catch(Exception exx)  {
                 
    }
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/rpop/scr/rpop_scr_5030.js"></script>
<script>
	function mySheet_OnMouseDown(Button, Shift, X, Y){
		if (document.frm.stmonth.value >= '201301')
		{
	      if(mySheet.MouseRow == 0 && mySheet.MouseCol == 12)
	      {
	        if(mySheet.ColHidden(13))
	        {
	          mySheet.ColHidden(13) = false;
	          mySheet.ColHidden(14) = false;
	          mySheet.CellBackColor(0,13) = mySheet.RgbColor(255,239,191);
	          mySheet.CellBackColor(0,14) = mySheet.RgbColor(255,239,191);
	        }
	        else
	        {
	          mySheet.ColHidden(13) = true;
	          mySheet.ColHidden(14) = true; 
	        }
	      }else  
	         if(mySheet.MouseRow == 0 && mySheet.MouseCol == 15)
	        {
	        if(mySheet.ColHidden(16))
	        {
	          mySheet.ColHidden(16) = false;
	          mySheet.ColHidden(17) = false;
	          mySheet.CellBackColor(0,16) = mySheet.RgbColor(255,239,191);
	          mySheet.CellBackColor(0,17) = mySheet.RgbColor(255,239,191);
	        }
	        else
	        {
	          mySheet.ColHidden(16) = true;
	          mySheet.ColHidden(17) = true; 
	        }
	      }
	  } 
	}
	function mySheet_OnClick(Row,Col,Value){
		
	}
	function mySheet_OnDblClick(Row,Value){
		
	}
	function mySheet_OnSearchEnd(Code, Msg){    
	    showMsg(Code, Msg);
	    mySheet.SetSumValue(0,"합 계");
		mySheet.SetCellAlign(mySheet.LastRow(),0,"Center");
		//합계행 병합
		mySheet.SetMergeCell (mySheet.LastRow(), 0, 1,2);
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
	        hiddenGrid.GetSaveData(encodeURI("comm.scr.comm_scr_9096.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=3"
                    +"&searchCode="+searchCode+"&pg_url="+pg_url));
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
                    <td><input type="text" name="jikwonno" class="input_l" size="10" value="<%=haengwon_no%>"></td>
                    <th>조회구간</th>
                    <td><select name="stmonth" class="select" onchange="initGrid()"> </select>~<select name="edmonth"  class="select"> </select>
                    </td>
                    <td class="end"> <div align="right">
					      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
					      <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
                         </div>
                    </td>

               </tr>
               <tr>
                    <th class="nobor">조회구분</th>
                    <td class="nobor"><select name="segb" >
                    	                    <option value="1">종합이익증대평가</option>
                    	                    <option value="2">우수직원실적평가</option>
                    	                  </select> </td>
                    <th class="nobor">실적구분</th>
                    <td class="nobor end" colspan="2"><select name="pigb" onchange="javascript:onpigb()">
                    	                    <option value="Y">대상실적</option>
                    	                    <option value="N">미대상실적</option>
                    	                  </select> 
                    </td>
               </tr>        
               <tr>
                    <th class="nobor">조회사유코드</th>
                    <td class="nobor end" colspan="4"><select name="searchCode" class="select" onchange="allDelDataGrid(mySheet); showUnitText('원');" >
                      <option value='00'>선택</option>            
                             <%  util_selectbox us2  =  new  util_selectbox();
                                 us2.setData("UP_KPI_C_S_CO고객조회사유코드","","코드","코드명");
                                 out.println(us2.getData());
                             %>
                       </select></td>
               </tr>  
               <tr> 
                 <td colspan="5" class="topB"> 
                   <marquee scrollamount='3' direction='left' width='450'>본 보고서는 특정고객에 관한 금융정보를 일부 포함하고 있으니, 고객정보 유출에 각별히 유의하시기 바랍니다.</marquee>
                 </td> 
               </tr>
           </table>		
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
<div id="hiddenGrid3Obj"></div>
<%@include file="/module/htm_footer.inc"%>

<script language="javascript">
monthRole = '<%=monthRole%>';
<% if (allRole) { %>
      document.frm.searchCode.value = 32; // (450)전산_성과담당, (530)개인별PI전직원조회가능  의 경우  조회사유코드 [32]성과평가작업 자동set
<% } %>
LoadPage();
htm_title = '<%=htm_title%>';
allRole = '<%=allRole%>';
</script>