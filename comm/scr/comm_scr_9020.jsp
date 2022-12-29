<%--===============================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : 공통
'프로그램 ID  : comm_scr_9020.jsp
'프로그램 명  : 통합코드 검색(팝업)
'프로그램개요 : 통합코드(팝업)
'작   성   자 : 변휘원
'작   성   일 : 2006.07.25
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
<%  
    String      topmenu_name     = "통합코드 검색";
    String      leftmenu_name    = ""; 
    String      htm_title        = "통합코드 검색"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    Exception   piex             = null;
    String      strErrMsg        = "";
    String      status           = "0";

    String selectcode = JSPUtil.getParameter(request,"selectcode","0");      // 통합코드 구분
    String colsu = JSPUtil.getParameter(request,"colsu","2");                // 통합코드 표현 컬럼수

%>
<%@ include file="/module/pop_header.inc"%>
<script language="javascript">
    
/* Sheet 각종 처리 */
function doAction()
{
    mySheet.DoSearch("comm.scr.comm_scr_9021.screen?colsu=<%=colsu%>&selectcode=<%=selectcode%>"); 
    mySheet.FitSize(false, false);
}


/*Sheet 기본 설정 */
function LoadPage(){

	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "230px", "350px");
	
	// 상위 GRID에 대한 속성정보 설정
	//지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
	
	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0, FrozenCol:0 } );
	
	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers;
	var cols;
	
	if(<%=colsu%> == "2") {
		headers = [ { Text:"통합코드|통합코드명", Align:"Center"} ];
		cols = [ {Type:"Text",      Hidden:0,  MinWidth:50,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
            	 {Type:"Text",      Hidden:0,  MinWidth:200,  Align:"Left",    SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
	} else {
		headers = [ { Text:"통합코드|통합코드C|통합코드명", Align:"Center"} ];
		cols = [ {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
       	 	     {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
       	 	 	 {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 }];
	}
	
	mySheet.InitHeaders(headers, info);
	mySheet.InitColumns(cols);
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	//newSetActionMenu(mySheet,"엑셀내려받기");
	
  	doAction();

}

function opener_ins()
{
    if(document.frm.v_pgagbn.value==null || document.frm.v_pgagbn.value=="")
    {
        alert('코드를 선택하여주세요.');
        return;
    }
    opener.document.frm.pgagbn.value = document.frm.v_pgagbn.value;
    self.close();
}

function mySheet_OnClick(Row,Col,Value) {
	document.frm.v_pgagbn.value=mySheet.GetCellValue(Row, 0);
}

function mySheet_OnDblClick(Row,Col) {
	document.frm.v_pgagbn.value=mySheet.GetCellValue(Row, 0);
	opener_ins();
}

</script>
<%@ include file="/module/pop_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<input type="hidden" name="v_pgagbn">    
  <tr> 
    <td align="left"> 
      <div id="sheetObj"></div>
    </td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="mgT5">
  <tr>
    <td align="center">
      <span class="btn_Grd" style="cursor:pointer" onclick="opener_ins()" border="0">선택</span>
      <span class="btn_Grd" style="cursor:pointer" onclick="self.close()" border="0">닫기</span>
    </td>
  </tr>
</table>
<%@ include file="/module/pop_footer.inc"%>
<script>
   LoadPage();
</script>