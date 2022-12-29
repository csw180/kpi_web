<%--===============================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : 시스템관리
'프로그램 ID  : rolegranthistory.jsp
'프로그램 명  : 권한 부여 이력 관리
'프로그램개요 : 권한 부여 이력 관리를 한다.
'작   성   자 : 조형석
'작   성   일 : 2014.1.27
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
<%  String  topmenu_name  ="시스템관리"; 
    String  leftmenu_name ="메뉴관리"; 
    String  htm_title     ="권한부여이력 관리"; 
    String  actionname    ="";
    String  haengwon_no   = "";
	  String  searchType = JSPUtil.getParameter(request,"searchType","1");
    String  jobDate    = JSPUtil.getParameter(request,"jobDate",JSPUtil.getKSTDate());
    Exception piex=null;
    String  strErrMsg="";
    String  status="0";
    boolean deleteRole = false;

    try {
         SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);
         haengwon_no = account.getHaengwon_no();
         String role[] = account.getRole(); //권한

         for (int i = 0; i < role.length; i++) {
             if (role[i].trim().equals("450")) {
                deleteRole=true;
                break;
             }
         }
    }catch(Exception ex) {
        
    }

%>
<%@ include file="/module/htm_header.inc"%>
<!--<script language="javascript" src="sheet/com.js"></script>-->
<script language="javascript">
/*Sheet 기본 설정 */
function LoadPage(){

	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "760px");
	
   	//지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:2 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"상태|삭제|서버구분코드|권한상태코드|권한사유코드|권한등록일시|직원번호|직원명|ROLE코드|ROLE코드명|점번호|문서번호|적요", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Status",    Hidden:0, MinWidth:40,   Align:"Center",  ColMerge:1,   SaveName:"sStatus" },
             {Type:"DelCheck",  Hidden:0, MinWidth:0,    Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Combo",     Hidden:0, MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"v_sv_1",   KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:1 },
             {Type:"Combo",     Hidden:0, MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"v_sv_2",   KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:1,   EditLen:1 },
             {Type:"Combo",     Hidden:0, MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"v_sv_3",   KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:1 },
             {Type:"Text",      Hidden:0,  MinWidth:160,  Align:"Center",  ColMerge:1,   SaveName:"v_sv_4",   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"v_sv_5",   KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:1,   EditLen:10 },
             {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"v_sv_6",   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"v_sv_7",   KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:3 },
             {Type:"Text",      Hidden:0,  MinWidth:100,   Align:"Center",  ColMerge:1,   SaveName:"v_sv_8",   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
             {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"v_sv_9",   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:1,   EditLen:4 },
             {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"v_sv_10",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
             {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"v_sv_11",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:1,   InsertEdit:1,   EditLen:100 } ];
    
   	mySheet.InitColumns(cols);

   	mySheet.SetEditable(1);
   	mySheet.SetColProperty(2, {ComboText:"WEB[1]|DB[2]", ComboCode:"1|2"} );
   	mySheet.SetColProperty(3, {ComboText:"부여[1]|해제[2]|자동부여[3]|자동해제[4]", ComboCode:"1|2|3|4"} );
   	mySheet.SetColProperty(4, {ComboText:"신규[1]|전보[2]|요청[3]|퇴직[9]", ComboCode:"1|2|3|9"} );
   	mySheet.SetVisible(1);
   	mySheet.SetColHidden(1,1);
   	/*
    <% if(deleteRole) { %> 
    mySheet.SetColHidden(1,0);
    <% } else { %> 
    mySheet.SetColHidden(1,1);
    <% } %> 
    */
    
   	newSetActionMenu(mySheet,"저장|삽입|*-|엑셀전환");
    //doAction("조회");
}

/*Sheet 각종 처리*/
function doAction(sAction)
{
    sergb   = document.frm.sergb.value;
    emnm    = document.frm.emnm.value;

    switch(sAction)  {
	    case "고정필드설정":
	    	mySheet.SetFrozenCol(mySheet.MouseCol());
	    	ufSetMergeCell(mySheet);
	    	break;
	    case "고정필드해제":
	    	mySheet.SetFrozenCol(0);
	    	ufSetMergeCell(mySheet);
	    	break;
      case "조회":      //조회
           mySheet.DoSearch("managesystem.rolegranthistorylist.screen?hidden_key=9&sergb="+sergb+"&emnm="+emnm);
           break;                         
      case "저장":      //저장
           var isSuccess = mySheet.DoSave("managesystem.rolegranthistorylist.screen?hidden_key=2");
           
      		if(isSuccess) mySheet.DoSearch("managesystem.rolegranthistorylist.screen?hidden_key=9&sergb=1");
      	
           break;
      case "삽입":      //입력
           var Row = mySheet.DataInsert();
           mySheet.SetCellValue(Row,2,'2',0);// 추가시는 기본이 DB로 설정
           mySheet.SetCellValue(Row,4,'3',0);// 추가시는 기본이 요청 설정
           mySheet.SetCellValue(Row,8,'DB',0);// 추가시는 기본이 DB로 설정
           mySheet.SetCellValue(Row,9,'DB',0);// 추가시는 기본이 DB로 설정
           break;
      case "복사":      //행복사
           mySheet.DataCopy();
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

function sel_sergb()
{
	  allDelDataGrid(mySheet);
	  document.frm.emnm.value = '';
}

function mySheet_OnSelectMenu(MenuStr, Code) {
	switch(MenuStr){
	   
	    case "삭제" :
	    	mySheet.SetRowStatus(mySheet.GetSelectRow(), "D");
	         break;
	   default : 
		   doAction(MenuStr);
	   	   break;
  	}	
}

function mySheet_OnSearchEnd(Code, Msg) {
	showMsg(Code, Msg);
}
</script>


<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" class="tabletype2 pdLR">
  <tr>
    <th>조회구분</th>
    <td>
     <select name="sergb" onchange="sel_sergb()">
           <option value="1">직전2개월</option> 
           <option value="2">직원조회</option> 
           <option value="9">전체조회</option>
     </select>
    </td>
    <th>직원번호</th>
    <td>
        <input type="text" class="input_l" name="emnm" size="10" onkeyup="chk_num()">
    </td>
    <td align="right" class="end">
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
