<%--===============================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : ABC
'프로그램 ID  : comm_scr_9010.jsp
'프로그램 명  : 고객번호 검색(팝업)
'프로그램개요 : 고객번호 검색(팝업)
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
    String      topmenu_name     = "고객번호 검색";
    String      leftmenu_name    = ""; 
    String      htm_title        = "고객번호 검색"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    Exception   piex             = null;
    String      strErrMsg        = "";
    String      status           = "0";
%>
<%@ include file="/module/pop_header.inc"%>
<script language="javascript">

/* Sheet 각종 처리 */
function doAction()
{
    searchcode  = document.frm.searchcode.value;

    if(searchcode.length < 5){ alert("고객번호 확인하세요!"); return;}
    if(!check_validation(document.frm.searchcode))  return;
    
    mySheet.DoSearch("comm.scr.comm_scr_9011.screen?searchgubun=0&searchcode="+searchcode); 
    mySheet.FitSize(false, false);
}


/*Sheet 기본 설정 */
function LoadPage(){

	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "280px");

  	// 상위 GRID에 대한 속성정보 설정
  	//지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"고객번호|고객명", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
    	         {Type:"Text",      Hidden:0,  MinWidth:150,  Align:"Left",    SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
   	mySheet.InitColumns(cols);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	//newSetActionMenu(mySheet,"엑셀내려받기");

}



function opener_ins()
{
    if(document.frm.v_customerno.value==null || document.frm.v_customerno.value=="")
    {
        alert('해당 고객번호를 선택하여주세요.');
        return;
    }
    
   
    opener.document.frm.customerno.value = document.frm.v_customerno.value;
    opener.document.frm.customername.value = document.frm.v_customername.value;

    self.close();
}


function enterchk()
{

	if (window.event.keyCode==13) {
           doAction();
           return false;
    }
}


function check_validation(obj)
{
    var str    = obj.value;
    var result = true;
    
    for (i=0;i<str.length;i++) {
        ch = str.charAt(i); //ISO-Latin-1 문자셋으로 변경
        
        if(!check_korean(ch) && !check_number(ch) && !check_english(ch))
        {
            result = false;
        }
    }
    
    if(!result)
    {
        alert('고객명은 특수문자를 허용하지 않습니다. 확인 후 조회하시기 바랍니다.');
        return false;
    }

    return  true;
}
    

function check_number(str)
{
    result = (/[^0-9]/).test(str);
    
    return !result;
}


function check_english(str)
{
    result = (/[^a-zA-Z]/).test(str);
    
    return !result;
}

        
function check_korean(str)
{
    var i;
    var ch;

    for (i=0;i<str.length;i++) {
        ch = escape(str.charAt(i)); //ISO-Latin-1 문자셋으로 변경
        
        if (strCharByte(ch) != 2)
        {
            return false;
        }
    }
    
    return true;
}


function strCharByte(chStr)
{
    if (chStr.substring(0, 2) == '%u')
    {
        if (chStr.substring(2,4) == '00')
            return 1;
        else                                            // 한글
            return 2; 
    }
    else if (chStr.substring(0,1) == '%')
    {
        if (parseInt(chStr.substring(1,3), 16) > 127)   // 한글
            return 2; 
        else
            return 1;
    }
    else
    {
        return 1;
    }
}

function mySheet_OnClick(Row,Col,Value) {
	// 고객번호
	document.frm.v_customerno.value=mySheet.GetCellValue(Row, 0);
	// 고객명
	document.frm.v_customername.value=mySheet.GetCellValue(Row, 1);
}

function mySheet_OnDblClick(Row,Col) {
	// 고객번호
	document.frm.v_customerno.value=mySheet.GetCellValue(Row, 0);
	// 고객명
	document.frm.v_customername.value=mySheet.GetCellValue(Row, 1);	 
	opener_ins();
}

</script>

<%@ include file="/module/pop_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR">

<input type="hidden" name="v_customerno">    
<input type="hidden" name="v_customername">  
  <tr> 
    <td>
      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2">
        <tr> 
          <th>고객번호</th>
          <td class="end">
             <input type="text" class="input_l" style="ime-mode:active" name="searchcode" onkeydown="enterchk()" size="20">
          </td>
        </tr>
      </table>
    </td>
  </tr>  
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
          <td align="end">
          	<span class="btn_Grd" style="cursor:pointer" onclick="javascript:doAction();" border="0">조회</span>
          </td>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
  <tr> 
    <td> 
      <!--------테이블삽입시작-------->
      <div id="sheetObj"></div>
      <!-------테이블삽입끝--------->
    </td>
  </tr>
  <tr>
    <td align="center" class="pdT5">
      <span class="btn_Grd" style="cursor:pointer" onclick="opener_ins()" border="0">선택</span>
      <span class="btn_Grd" style="cursor:pointer" onclick="self.close()" border="0">닫기</span>
  </tr>
</table>
<%@ include file="/module/pop_footer.inc"%>
<script>LoadPage();</script>    