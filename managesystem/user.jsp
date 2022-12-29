<%--===============================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : 시스템관리
'프로그램 ID  : user.jsp
'프로그램 명  : 사용자 관리
'프로그램개요 : 사용자 관리.
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
<%  String topmenu_name="시스템관리"; 
    String leftmenu_name="메뉴관리"; 
    String htm_title="사용자 관리"; 
    String actionname="";
    String haengwon_no = "";
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
<script language="javascript">


/*Sheet 기본 설정 */
function LoadPage(){

	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "760px");

	mySheet.FitSize(false, true);

	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:3 } );

	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:"상태|삭제유무|USERID|성명|근무점|근무점명|잡레벨코드|잡레벨|주민번호|비밀번호|접근제한", Align:"Center"} ];
	mySheet.InitHeaders(headers, info);

	var cols = [ {Type:"Status",    Hidden:0, MinWidth:40,   Align:"Center",  ColMerge:1,   SaveName:"sStatus" },
	             {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Left",    SaveName:"sUserid" },
	             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"sUsername" },
	             {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"Center",  SaveName:"sJumno" },
	             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"sJumname" },
	             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"sJoblablecode" },
	             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"sJoblablename" },
	             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"sJuminno" },
	             {Type:"Text",      Hidden:1, MinWidth:50,   Align:"Center",  SaveName:"sPassword" },
	             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  SaveName:"sUserClose" } ];
	    
	mySheet.InitColumns(cols);

	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	//newSetActionMenu(mySheet,"저장|삽입|복사|삭제|*-|엑셀전환");
	newSetActionMenu(mySheet,"엑셀전환");
	mySheet.SetDataLinkMouse(true);

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
  column_name = document.frm.v_columnname.options[document.frm.v_columnname.selectedIndex].value;
  search_cont = document.frm.v_searchcont.value;
  
  switch(sAction) {
		  case "고정필드설정":
		  	mySheet.SetFrozenCol(mySheet.MouseCol());
		  	ufSetMergeCell(mySheet);
		  	break;
		  case "고정필드해제":
		  	mySheet.SetFrozenCol(0);
		  	ufSetMergeCell(mySheet);
		  	break;
    	case "조회":      //조회
            if(document.frm.v_columnname.selectedIndex>0) {
                if(document.frm.v_searchcont.value==null || document.frm.v_searchcont.value=="") {
                    alert("조회하고자하는 컬럼값을 입력하세요.");
                    document.frm.v_searchcont.focus();
                    return;
                }
                
                startRow=mySheet.GetSelectRow()+ 1;
                
                if(mySheet.GetSelectRow()==null)
                    startRow=1;

                // FindText(Col, SearchText, [StartRow], [FullMatch])
                var fRow=mySheet.FindText(column_name, search_cont, startRow, 2 );
                
                if (fRow*1 > 0 ) {
                  	mySheet.SelectCell(fRow, column_name);
                } else {
                  	if(mySheet.GetSelectRow()== 1 && fRow < 0 ) {
                      	alert("지정된 값(" + search_cont + ")이 존재하지 않습니다. 확인 후 조회해주세요.");
                  	} else {
                  		fRow=mySheet.FindText(column_name, search_cont, 1, 2 );
                  		mySheet.SelectCell(fRow, column_name);
                  	}
                }
            } else if(document.frm.v_columnname.selectedIndex==0) {          
            	mySheet.DoSearch("managesystem.user.do?hidden_key=9&event=" + encodeURI("조회")  );
				mySheet.FitSize(true, false);

            }

      		break;
   	 	case "저장":        //저장
	   	 	aa=mySheet.DoSave("managesystem.user.do?hidden_key=2&event=" + encodeURI("저장"));
      		break;
    	case "삽입":      //입력
    		var Row=mySheet.DataInsert();
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
    	case "PWD초기화":  //비밀번호 암호화
    		if(confirm("비밀번호를 암호화 하시겠습니까?")){
    			mySheet.SetCellValue(1, 1,"U");
    			var isSuccess=mySheet.DoSave("managesystem.user.do?hidden_key=4", "", "", false);
    			if(!isSuccess) return;
    		}else{
    			return;
    		}
    		break;

  	}
}

function mySheet_OnSelectMenu(MenuStr, Code) {
	/*
	switch(MenuStr){
	    case "저장" :
	         doAction("저장");
	         break;
	    case "삽입" :
	         doAction("삽입");
	         break;
	    case "삭제" :
	    	mySheet.SetRowStatus(mySheet.GetSelectRow(), "D");
	         break;
	    case "복사" :
	         doAction("복사");
	         break;
	         
	    case "엑셀전환" :
	         doAction(MenuStr);
	         break;
  	}	
	*/
	doAction(MenuStr);
}

function mySheet_OnDblClick(Row,Col) {
	 
	if(Col==0) {
		var UserID=mySheet.GetCellValue(Row, 2);
		var url="managesystem.role_conn.screen?gubun=1&svalue="+UserID+"&IS_POPUP=Y&SCREEN_URL=managesystem.role_conn.screen";
		var period="";
		
		for(i=0;i<document.frm.period.length;i++){
			if(document.frm.period[i].checked==true){
		    	period=document.frm.period[i].value;
		     	break;
		     }
		}
		
		if(period == '0') {					    //권한관리
			win1=win_open2(url,420,420);	
		}
		/*
		else if(period == '3') { 			//비밀번호 초기화
			if(confirm("비밀번호를 초기화 하시겠습니까?")) {
				mySheet.SetCellValue(Row, 1,"U"
		        var isSuccess=mySheet.DoSave("managesystem.user.do?hidden_key=3&period=" + period + "&UserID=" + UserID, "", "", false);
		        if(!isSuccess) return;
		     } else {
					 return;
		     }
		} else if(period == '5') { 			//접속제한 해제
			if(confirm("접속제한을 해제 하시겠습니까?")) {
				mySheet.SetCellValue(Row, 1,"U"
		        var isSuccess=mySheet.DoSave("managesystem.user.do?hidden_key=5&period=" + period + "&UserID=" + UserID, "", "", false);
		        if(!isSuccess) return;
		     } else {
					 return;
		     }
		}
		*/
	}

}

function mySheet_OnSearchEnd(Code, Msg) {
	showMsg(Code, Msg);
}

function mySheet_OnSaveEnd(Code, ErrMsg, StCode, StMsg) {	 
	if (ErrMsg == "") 	{
		alert("저장 성공하였습니다.");
	} else alert(" [저장 실패] " + ErrMsg);
}

function mySheet_OnMouseMove(Button, Shift, X, Y) {
	//풍선도움말 설정
	mySheet.SetToolTipText(mySheet.MouseRow(), mySheet.MouseCol(),"▶ 라디오버튼 선택에 따라 '상태' 더블클릭 시 권한관리화면 이동. 비밀번호 초기화(주민번호) 수행");
}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" class="tabletype2 pdLR">
  <tr>
    <th>컬럼명</th>
    <td>
      <select name="v_columnname" class="select">
        <option value="전체">선택</option>
        <option value="sUserid">직원번호</option>
        <option value="sUsername">성명</option>
        <option value="sJumno">점번호</option>
        <option value="sJumname">점명</option>
      </select>
      <input type="text" class="input_l" name="v_searchcont" size="15" value="">
      <input type="radio" name="period" value="0" checked>권한관리
      <input type="radio" name="period" value="3">비밀번호 초기화
      <input type="radio" name="period" value="5">접속제한해제
    </td>
    <td align="right" class="end">
      <span class="btn_Grd" onclick="doAction('조회')" style="cursor:pointer">조회</span>
      <span class="btn_Grd" style="cursor:pointer" onclick="doAction('엑셀전환');">엑셀</span>
      <!-- 
	    <img src="img/sky/butt_encrypt.gif"    style="cursor:hand" onclick="doAction('PWD초기화');" style="display:none">
      <img src="img/sky/butt_save.gif"       style="cursor:hand" onclick="doAction('저장');" style="display:none">
       -->
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
