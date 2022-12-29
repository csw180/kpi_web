<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 공통
'프로그램 ID  : comm_scr_1010.jsp
'프로그램 명  : 동일PG점번호(팝업)
'프로그램개요 : 동일PG점번호(팝업)
'작   성   자 : 남호준
'작   성   일 : 2006.10.30
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
    String      topmenu_name     = "점번호 조회";
    String      leftmenu_name    = "코드정의"; 
    String      htm_title        = "점번호 조회"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    Exception   piex             = null;
    String      strErrMsg        = "";
    String      status           = "0";
    String      basemonth        = JSPUtil.getParameter(request,"basemonth","");
    String      searchGubun      = JSPUtil.getParameter(request,"searchGubun","");
    String      pgGubun          = JSPUtil.getParameter(request,"pgGubun","");
    
    int         opennamechk      = 0;
    if(searchGubun.equals("2")){
        searchGubun="2";
    }else if(searchGubun.equals("3")){
        opennamechk=3;     
        searchGubun="3";               //비교점 - 영업점 점조회 사용     
    }


%>
<%@ include file="/module/pop_header.inc"%>
<script language="javascript">
    
/* Sheet 각종 처리 */
function doAction()
{
    mySheet.DoSearch("comm.scr.comm_scr_1171.screen?basemonth=<%=basemonth%>&searchGubun=<%=searchGubun%>&pgGubun=<%=pgGubun%>"); 
    mySheet.FitSize(false, false);
}

/*Sheet 기본 설정 */
function LoadPage(){

	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "230px", "400px");

  	// 상위 GRID에 대한 속성정보 설정
	//지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"점번호|점명", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",      Hidden:0,  MinWidth:50,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:150,  Align:"Left",    SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
   	mySheet.InitColumns(cols);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	//newSetActionMenu(mySheet,"엑셀내려받기");
  
  	doAction();
}

function opener_ins()
{
    if(document.frm.v_jumcode.value==null || document.frm.v_jumcode.value=="")
    {
        alert('점번호를 선택하여주세요.');
        return;
    }
<% if(opennamechk==0){%>    
    opener.document.frm.jumcode.value = document.frm.v_jumcode.value;
    opener.document.frm.jumname.value = document.frm.v_jumname.value;

    v_jumcode  = opener.document.frm.jumcode;
    
    if(v_jumcode!=null && (opener.document.frm.teamcode!=null || opener.document.frm.pgname!=null))
    {
        opener.selectjum();
    }        
<% }else if(opennamechk==3){%> 
    opener.document.frm.cfjumcode.value = document.frm.v_jumcode.value;
    opener.document.frm.cfjumname.value = document.frm.v_jumname.value;

    v_jumcode  = opener.document.frm.cfjumcode;
    
    if(v_jumcode!=null && (opener.document.frm.teamcode!=null || opener.document.frm.pgname!=null))
    {
        opener.selectjum();
    }    
<% }%>
    self.close();
}

function mySheet_OnClick(Row,Col,Value) {
	// 점코드
	document.frm.v_jumcode.value=mySheet.GetCellValue(Row, 0);
	// 점명
	document.frm.v_jumname.value=mySheet.GetCellValue(Row, 1);
}

function mySheet_OnDblClick(Row,Col) {
	// 점코드
	document.frm.v_jumcode.value=mySheet.GetCellValue(Row, 0);
	// 점명
	document.frm.v_jumname.value=mySheet.GetCellValue(Row, 1);
	opener_ins();
}
</script>
<%@ include file="/module/pop_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<input type="hidden" name="v_jumcode">    
<input type="hidden" name="v_jumname">    
  <tr> 
    <td align="center" colspan="3"> 
      <!--------테이블삽입시작-------->      
      <div id="sheetObj"></div>
      <!-------테이블삽입끝--------->
    </td>
  </tr>
  <!-- <tr>
    <td valign="bottom" align="center">
      <img src="/kpi/img/sky/butt_choice.gif" onclick="opener_ins()" border="0" style="cursor:hand">&nbsp;
      <img src="/kpi/img/sky/butt_close.gif"  onclick="self.close()" border="0" style="cursor:hand"></td>
  </tr> -->
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
  <tr>
    <td height="30" align="center" valign="bottom"><!--  background="/kpi/img/pop_cbg.gif"  -->
      <span class="btn_Grd" style="cursor:pointer" onclick="opener_ins()" border="0">선택</span>
      <span class="btn_Grd" style="cursor:pointer" onclick="self.close()" border="0">닫기</span>
    </td>
  </tr>
</table>
<%@ include file="/module/pop_footer.inc"%>
<script>LoadPage();</script>    