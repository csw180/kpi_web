<%--===============================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : 메뉴관리
'프로그램 ID  : menu.jsp
'프로그램 명  : 메뉴 관리
'프로그램개요 : 프로그램 리스트를 만들고 프로그램 권한을 부여한다.
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
    String htm_title     = "메뉴 관리"; 
    String actionname    = "";
    String haengwon_no   = "";
    Exception piex       = null;
    String strErrMsg     = "";
    String status        = "0";

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
	
   	//지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:3 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"상태|삭제|메뉴ID|메뉴종류|프로그램명|프로그램URL|상위메뉴ID|메뉴레벨|메뉴순번|팝업유무|이미지|보안등급|문서담당자", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Status",    Hidden:0, MinWidth:40,   Align:"Center",  ColMerge:1,   SaveName:"sStatus" },
             {Type:"DelCheck",  Hidden:0, MinWidth:0,    Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  SaveName:"sPgrmid" },
             {Type:"Combo",     Hidden:0, MinWidth:100,  Align:"Center",  SaveName:"sMenugubun" },
             {Type:"Text",     Hidden:0,  MinWidth:150,  Align:"Left",    SaveName:"sPgrmname" },
             {Type:"Text",     Hidden:0,  MinWidth:215,  Align:"Left",    SaveName:"sPgrmurl" },
             {Type:"Text",     Hidden:0,  MinWidth:75,   Align:"Left",    SaveName:"supmenuid" },
             {Type:"Text",      Hidden:1, MinWidth:75,   Align:"Left",    SaveName:"smenulevle" },
             {Type:"Text",     Hidden:0,  MinWidth:75,   Align:"Center",  SaveName:"sSeq" },
             {Type:"CheckBox",  Hidden:0, MinWidth:75,   Align:"Left",    SaveName:"sPopyn" },
             {Type:"Text",     Hidden:0,  MinWidth:75,   Align:"Left",    SaveName:"sImage" },
             {Type:"Text",     Hidden:0,  MinWidth:75,   Align:"Left",    SaveName:"sSecurity" },
             {Type:"Text",     Hidden:0,  MinWidth:75,   Align:"Left",    SaveName:"sDocMan" } ];
    
   	mySheet.InitColumns(cols);

   	mySheet.SetCountPosition(1);
   	mySheet.SetEditable(1);
   	mySheet.SetVisible(1);
   	mySheet.SetColProperty(3, {ComboText:"|TOP|TOP하위메뉴|일반메뉴|일반프로그램", ComboCode:"|TOP|TSUB|LEFT|GM|GP"} );
   	newSetActionMenu(mySheet,"저장|삽입|삭제|*-|엑셀전환");
   
   	mySheet.SetDataLinkMouse(true);
	   
  	doAction("조회");
}

/*Sheet 각종 처리*/
function doAction(sAction)
{
  column_name = document.frm.v_columnname.options[document.frm.v_columnname.selectedIndex].value;
  search_cont = document.frm.v_searchcont.value;
  
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
        if(document.frm.v_columnname.selectedIndex>0)
        {
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
            var fRow=mySheet.FindText(column_name, search_cont, startRow, 2 );
            if (fRow*1 > 0 ){
              mySheet.SelectCell(fRow, column_name);
            }else{
              if(mySheet.GetSelectRow()== 1 && fRow < 0 ){
                  alert("지정된 값(" + search_cont + ")이 존재하지 않습니다. 확인 후 조회해주세요.");
              }else{
              fRow=mySheet.FindText(column_name, search_cont, 1, 2 );
              mySheet.SelectCell(fRow, column_name);
              }
            }

            break;                
        }
        else if(document.frm.v_columnname.selectedIndex==0)
        {          
          mySheet.DoSearch("managesystem.menu.do?hidden_key=9&event=" + encodeURI("조회") );
          
        }
      break;
    case "저장":        //저장
    	max=mySheet.LastRow();	//레코드 최대값
        isNull=0;
        for(i=0; i <= max ; i++){
			if(mySheet.GetCellValue(i, 2)  == "" &&
				mySheet.GetCellValue(i, 3)  == "" &&
				mySheet.GetCellValue(i, 4)  == "" &&
				mySheet.GetCellValue(i, 5)  == "" &&
				mySheet.GetCellValue(i, 6)  == "" &&
				mySheet.GetCellValue(i, 7)  == "" &&
				mySheet.GetCellValue(i, 10) == "" &&
				mySheet.GetCellValue(i, 11)){
			            isNull++;
			}
        }
        
        if(isNull != 0){
          alert("필수항목을 확인해주세요.")
        return;
        }
        aa=mySheet.DoSave("managesystem.menu.do?hidden_key=9&event=" + encodeURI("저장"));
        break;
    case "삽입":      //입력
        var Row = mySheet.DataInsert();
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


function mySheet_OnSelectMenu(MenuStr, Code) {
	switch(MenuStr) {
	    case "저장" :
	      doAction("저장");                   break;
	    case "삽입" :
	      doAction("삽입");                     break;
	    case "삭제" :
	    	mySheet.SetRowStatus(mySheet.GetSelectRow(), "D");           break;
	//    case "복사" :
	//      doAction("복사");                     break;
	    case "엑셀전환" :
	      doAction("엑셀전환");                break;
  }
}

function mySheet_OnDblClick(Row,Col) {
	if(Col==0) {
	     var PrgmID = mySheet.GetCellValue(Row, 2);
	     var url    = "managesystem.role_conn.screen?gubun=2&svalue="+PrgmID+"&IS_POPUP=Y&SCREEN_URL=managesystem.role_conn.screen";
	     win1=win_open2(url,420,420);
	}	 
}

function mySheet_OnChange(Row,Col,Value) {
	if(Col==2) {
	    for(i=1;i<mySheet.LastRow();i++) {
	        if(i==Row) continue;
			
	        if(mySheet.GetCellValue(Row, 2)==mySheet.GetCellValue(i, 2)) {
	            alert("존재하는 프로그램ID 입니다.");
	            mySheet.SetCellValue(Row, 2,"");
	        }
	    }
	}
	
	if(Col==3) {
		if (mySheet.GetCellValue(Row, 3)=='TOP') {
			mySheet.SetCellValue(Row, 6,'00000');
	    }
		if (mySheet.GetCellValue(Row, 3)=='LEFT') {
			mySheet.SetCellValue(Row, 7,mySheet.GetCellValue(Row, 2));
			mySheet.SetCellValue(Row, 8,0);
	    }
		if (mySheet.GetCellValue(Row, 3)=='GM') {
			mySheet.SetCellValue(Row, 6,mySheet.GetCellValue(Row-1, 6));
			mySheet.SetCellValue(Row, 7,mySheet.GetCellValue(Row-1, 7));
			mySheet.SetCellValue(Row, 8,mySheet.GetCellValue(Row-1, 8)*1 + 1);
	    }
	}
	
	if(Col==6) {
		if (mySheet.GetCellValue(Row, 3)=='LEFT') {
			mySheet.SetCellValue(Row, 7,mySheet.GetCellValue(Row, 2));
		} else if(mySheet.GetCellValue(Row, 3)=='TOP') {
			mySheet.SetCellValue(Row, 7,0);
	    } else {
	    	mySheet.SetCellValue(Row, 7,mySheet.GetCellValue(Row, 6));
	    }
	}
}

function mySheet_OnSearchEnd(Code, Msg){
	showMsg(Code, Msg);
}

</script>

<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" class="tabletype2 pdLR">
  <tr>
    <th>컬럼명</th>
    <td>
      <select name="v_columnname" class="select">
        <option value="전체">선택
        <option value="sPgrmname">프로그램명
        <option value="sPgrmurl">프로그램URL
      </select>
      <input type="text" class="input_l" name="v_searchcont" size="15" value="">
    </td>    
    <td align="right" class="end">
      <span class="btn_Grd" onclick="doAction('조회')" style="cursor:pointer">조회</span>
      <span class="btn_Grd" onclick="doAction('삽입');" style="cursor:pointer">추가</span>
   	  <span class="btn_Grd" onclick="doAction('저장');" style="cursor:pointer">저장</span>
   	  <span class="btn_Grd" onclick="doAction('엑셀전환');" style="cursor:pointer">삭제</span>
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
<br>
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
LoadPage();
htm_title = '<%=htm_title%>';
</script>
