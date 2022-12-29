<%--===============================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : 시스템관리
'프로그램 ID  : role.jsp
'프로그램 명  : 권한 관리
'프로그램개요 : 권한 롤을 선언한다.
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
<%  String topmenu_name  ="시스템관리"; 
    String leftmenu_name ="메뉴관리"; 
    String htm_title     ="권한 관리"; 
    String actionname    ="";
    String haengwon_no   = "";
	  String searchType = JSPUtil.getParameter(request,"searchType","1");
    String jobDate    = JSPUtil.getParameter(request,"jobDate",JSPUtil.getKSTDate());
    Exception piex=null;
    String strErrMsg="";
    String status="0";

    try {
        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);

        haengwon_no = account.getHaengwon_no();
    }catch(Exception ex) {
        
    }

%>
<%@ include file="/module/htm_header.inc"%>
<!--<script language="javascript" src="sheet/com.js"></script>-->
<script language="javascript">
/*Sheet 기본 설정 */
function LoadPage(){

	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "770px");

	//지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:3 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"상태|삭제유무|권한코드|권한명", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Status",    Hidden:0, MinWidth:40,   Align:"Center",  ColMerge:1,   SaveName:"sStatus" },
             {Type:"DelCheck",  Hidden:0, MinWidth:0,    Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Left",    SaveName:"sRolecode" },
             {Type:"Text",     Hidden:0,  MinWidth:200,  Align:"Center",  SaveName:"sRolename" } ];
    
   	mySheet.InitColumns(cols);

   	mySheet.SetCountPosition(1);
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
      mySheet.DoSearch("managesystem.role.do?hidden_key=9&event=" + encodeURI("조회") ); 
      break;
    case "저장":        //저장
    	max=mySheet.LastRow();	//레코드 최대값
  	  	isNull=0;
  	  	for(i=0; i <= max ; i++){
  			if(mySheet.GetCellValue(i, 2) == "" || mySheet.GetCellValue(i, 3) == ""){
  		    	isNull++;
  		 	}
  	  	}
  	  	if(isNull != 0){
  	  		alert("권한코드 또는 권한명을 확인해주세요.")
  			return;
  	  	}

      	aa=mySheet.DoSave("managesystem.role.do?hidden_key=9&event=" + encodeURI("저장") );
     	break;
    case "삽입":      //입력
      var Row = mySheet.DataInsert();
      break;
    case "복사":        //행복사
      mySheet.DataCopy();
      break;
    case "Clear":        //Clear
      mySheet.RemoveAll();
      break;
    case "엑셀전환":  //엑셀내려받기
      inqText       = new Array();     
      // 보안등급세팅
      seqLevel = document.frm.Security_Level.value;  
      if(seqLevel !=null && seqLevel!='') {
          inqText[0]    = new Array();
          inqText[0][0] = "보안등급";
          inqText[0][1] = document.frm.Security_Level.value;
      }
      
      doExcel(mySheet, inqText, true); //common.js 활용하여 excel 출력
      break;
  }
}

function mySheet_OnSelectMenu(MenuStr, Code){
	switch(MenuStr){
	    case "저장" :
	      doAction("저장");                   break;
	    case "삽입" :
	      doAction("삽입");                     break;
	    case "삭제" :
	    	mySheet.SetRowStatus(mySheet.GetSelectRow(), "D");           break;
	    case "복사" :
	      doAction("복사");                     break;
	    case "엑셀전환" :
	      doAction("엑셀전환");                break;
  	}
}

function mySheet_OnSearchEnd(Code, Msg){
	showMsg(Code, Msg);
}

</script>

<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" class="tabletype4 pdLR">
  <tr>  
    <td align="right">
      <span class="btn_Grd" style="cursor:pointer" onclick="doAction('조회')">조회</span>
      <span class="btn_Grd" style="cursor:pointer" onclick="doAction('삽입');">추가</span>
   	  <span class="btn_Grd" style="cursor:pointer" onclick="doAction('저장');">저장</span>
   	  <span class="btn_Grd" style="cursor:pointer" onclick="doAction('엑셀전환');">엑셀</span>
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
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
LoadPage();
htm_title = '<%=htm_title%>';
</script>
