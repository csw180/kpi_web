<%--===============================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : 일일운영관리
'프로그램 ID  : DailyReport.jsp
'프로그램 명  : 권한관리
'프로그램개요 : 권한관리에서 팝업.
'작   성   자 : 변휘원
'작   성   일 : 2006.03.21
====================================================================
'수정자/수정일 :
'수정사유      :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%//@ page import="tpms.common.web.CommonWebKeys"%>
<%//@ page import="tpms.framework.component.util.JSPUtil"%>
<%//@ page import="tpms.framework.component.signon.SignOnUserAccount"%>
<%//@ page import="tpms.framework.component.error.ErrorHandler"%>
<%//@ page import="tpms.framework.component.dao.*"%>
<%@ include file="/module/jsp_header.inc"%>
<%  String topmenu_name  = "시스템관리"; 
    String leftmenu_name = "메뉴관리"; 
    String htm_title     = "권한관리"; 
    String actionname    = "";
    String haengwon_no   = "";
	  String gubun        = JSPUtil.getParameter(request,"gubun","");
  	String svalue        = JSPUtil.getParameter(request,"svalue","");
    Exception piex=null;
    String strErrMsg="";
    String status="0";

    try {
        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);

        haengwon_no = account.getHaengwon_no();
    }catch(Exception ex) {
        
    }

%>
<%@ include file="/module/pop_header.inc"%>
<script language="javascript">


/*Sheet 기본 설정 */
function LoadPage(){

	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "400px", "320px");

   	//지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"상태|권한부여|권한코드|권한명", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Status",    Hidden:0, MinWidth:0,    Align:"Center",  ColMerge:1,   SaveName:"Status" },
             {Type:"CheckBox",  Hidden:0, MinWidth:0,    Align:"Center",  ColMerge:1,   SaveName:"sStatus" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Left",    SaveName:"sRolecode" },
             {Type:"Text",     Hidden:0,  MinWidth:200,  Align:"Center",  SaveName:"sRolename" } ];
    
   	mySheet.InitColumns(cols);

   	mySheet.SetEditable(1);
   	mySheet.SetVisible(1);
   	newSetActionMenu(mySheet,"저장|삽입|복사|삭제|*-|엑셀전환");
	    		  
  	doAction("조회");
}

/*조회조건 에터키 이력시 조회*/
function check_Enter()
{
  if (event.keyCode==13) doAction("Search");
}

/*Sheet 각종 처리*/
function doAction(sAction)
{
  switch(sAction)
  {
    case "고정필드설정":
    	mySheet.SetFrozenCol(mySheet.MouseCol());
    	ufSetMergeCell(mySheet);
    	break;
    case "고정필드해제":
    	mySheet.SetFrozenCol(0);
    	ufSetMergeCell(mySheet);
    	break;
    case "조회":      //조회
      mySheet.DoSearch("managesystem.role_conn.do?hidden_key=9&event=" + encodeURI("조회") + "&gubun=<%=gubun%>&svalue=<%=svalue%>"); 
      break;
    case "저장":        //저장
    /*  if(mySheet.CellValue(i,2) == "" || mySheet.CellValue(i,3) == ""){
	      alert("추가할 항목이 없습니다.")
	  }*/
      aa=mySheet.DoSave("managesystem.role_conn.do?hidden_key=9&event=" + encodeURI("저장") + "&gubun=<%=gubun%>&svalue=<%=svalue%>");
      break;
  }
}
function mySheet_OnSearchEnd(Code, Msg) {
	showMsg(Code, Msg);	
}

function mySheet_OnSelectMenu(MenuStr, Code) {
	doAction(MenuStr);
}
</script>
<%@include file="/module/pop_title.inc"%>
<table width="400" border="0" cellspacing="0" cellpadding="0" align="center">
  <tr>
    <td >
      <div id="sheetObj"></div>
    </td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" class="mgT5">
  <tr>
    <!-- <td align="center"> -->
    <td align='center' valign='bottom'>
    	<span class="btn_Grd" onclick="doAction('저장')" style="cursor:pointer">등록</span>
    	<span class="btn_Grd" onclick="window.close()" style="cursor:pointer">닫기</span>
    </td>
  </tr>
</table>
<%@include file="/module/pop_footer.inc"%>
<script language="javascript">
LoadPage();
</script>
