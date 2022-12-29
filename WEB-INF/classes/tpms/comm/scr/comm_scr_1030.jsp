<%--===============================================================
'주  시 스 템  : 성과관리시스템
'서브  시스템  : ABC
'프로그램 ID   : comm_scr_1030.jsp
'프로그램 명   : 관리회계계정 코드(팝업)
'프로그램개요  : 관리회계계정 코드(팝업)
'작   성   자  : 변휘원
'작   성   일  : 2006.07.31
====================================================================
'수정자/수정일 : 변휘원/2006.07.31
'수정사유      : FTP업무에서는 통합계정코드 대신 계정코드를 GRID에
                 출력할수 있도록 변경.
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%//@ page import="tpms.common.web.CommonWebKeys"%>
<%//@ page import="tpms.framework.component.util.JSPUtil"%>
<%//@ page import="tpms.framework.component.signon.SignOnUserAccount"%>
<%//@ page import="tpms.framework.component.error.ErrorHandler"%>
<%//@ page import="tpms.framework.component.dao.*"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "관리회계계정 코드조회";
    String      leftmenu_name    = "코드정의"; 
    String      htm_title        = "관리회계계정 코드조회"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    Exception   piex             = null;
    String      strErrMsg        = "";
    String      status           = "0";
    String      basemonth        = JSPUtil.getParameter(request ,"basemonth" ,"");
    String      strFrom          = JSPUtil.getParameter(request ,"is_from" ,"Y");
%>
<%@ include file="/module/pop_header.inc"%>
<script language="javascript">
    
/* Sheet 각종 처리 */
function doAction()
{
    mySheet.DoSearch("comm.scr.comm_scr_1031.screen?is_from=<%=strFrom%>&basemonth=<%=basemonth%>"); 
    mySheet.FitSize(false, true);
}


/*Sheet 기본 설정 */
function LoadPage(){

	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "280px", "400px");

  	// 상위 GRID에 대한 속성정보 설정
 	//지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	<%  if("Y".equals(strFrom)){%>  
   	var headers = [ { Text:"계정과목코드|계정과목명", Align:"Center"} ];
   	<%  } else {%>
   	var headers = [ { Text:"관리회계\n계정코드|계정과목명", Align:"Center"} ];
   	<%  }%>
   	
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  SaveName:"",               CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    SaveName:"v_accountname",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
   	mySheet.InitColumns(cols);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetDataAutoTrim(0);
   	mySheet.SetHeaderRowHeight(30);
   	mySheet.SetActionMenu("엑셀내려받기");
  
  	doAction();
}

function opener_ins()
{
    if(document.frm.v_accountcode.value==null || document.frm.v_accountcode.value=="")
    {
        alert('해당 관리회계계정 코드를 선택하여주세요.');
        return;
    }
    
    opener.document.frm.accountcode.value = document.frm.v_accountcode.value;
    opener.document.frm.accountname.value = document.frm.v_accountname.value;

    self.close();
}
function enterchk()
{

	if (window.event.keyCode==13) {
           search_name();
           return false;
    }
}
function search_name()
{
    search_cont = document.frm.v_searchcont.value;
    if(document.frm.v_searchcont.value==null || document.frm.v_searchcont.value=="")
    {
        alert("조회하고자하는 컬럼값을 입력하세요.");
        document.frm.v_searchcont.focus();
        return;
    }
                
    startRow=mySheet.GetSelectRow()+ 1;
    if(mySheet.GetSelectRow()==null)
        startRow=1;
    // FindText(Col, SearchText, [StartRow], [FullMatch])
    var fRow=mySheet.FindText("v_accountname", search_cont, startRow, 2 );
    if (fRow*1 > 0 ){
      mySheet.SelectCell(fRow, "v_accountname");
    }else{
      if(mySheet.GetSelectRow()== 1 && fRow < 0 ){
          alert("지정된 값(" + search_cont + ")이 존재하지 않습니다. 확인 후 조회해주세요.");
      }else{
      fRow=mySheet.FindText("v_accountname", search_cont, 1, 2 );
      mySheet.SelectCell(fRow, "v_accountname");
      }
    }
}

function mySheet_OnClick(Row,Col,Value) {
	// 관리회계계정 코드
	document.frm.v_accountcode.value=mySheet.GetCellValue(Row, 0);
	    // 계정과목명
	document.frm.v_accountname.value=mySheet.GetCellValue(Row, 1);
}

function mySheet_OnDblClick(Row,Col) {
	// 관리회계계정 코드
	document.frm.v_accountcode.value=mySheet.GetCellValue(Row, 0);
	    // 계정과목명
	document.frm.v_accountname.value=mySheet.GetCellValue(Row, 1);
	opener_ins();
}

</script>
<%@ include file="/module/pop_title.inc"%>
<table width="95%" border="0" cellspacing="0" cellpadding="0">
  <input type="hidden" name="v_accountcode">    
  <input type="hidden" name="v_accountname">    
  <tr>
    <td class="font_grayb"><p align="right">회계계정명&nbsp;</p></td>
    <td class="blue" align="left">
      <input type="text" class="input_l" name="v_searchcont" onkeydown="enterchk()" size="15">
    </td>
    <td class="blue" align="right">
      <img src="img/sky/butt_inquiry.gif" border="0" onclick="javascript:search_name();">
    </td>
  </tr>
</table>
<table width="95%" border="0" cellspacing="0" cellpadding="0">
  <tr> 
    <td align="center" colspan="3"> 
      <!--------테이블삽입시작-------->
      <div id="sheetObj"></div>
      <!-------테이블삽입끝--------->
    </td>
  </tr>
  <tr>
    <td height="22">&nbsp;</td>
  </tr>  
  <tr>
    <td class="blue" align="center">
      <img src="img/sky/butt_choice.gif" onclick="opener_ins()" border="0" style="cursor:hand">&nbsp;
      <img src="img/sky/butt_close.gif" onclick="self.close()" border="0" style="cursor:hand"></td>
  </tr>
</table>
<%@ include file="/module/pop_footer.inc"%>
<script>LoadPage();</script>    