<%--===============================================================
'주  시 스 템  : 성과관리시스템
'서브  시스템  : 시스템관리
'프로그램 ID   : log.jsp
'프로그램 명   : Web Log 조회
'프로그램개요  : Web에 대한 사용자 로그내용을 조회한다.
'작   성   자  : 변휘원 
'작   성   일  : 2006.11.15
====================================================================
'수정자/수정일 : 
'수정사유      : 
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ page import="java.text.*"%>
<%@ page import="java.util.*"%>
<%@ page import="javax.servlet.http.HttpServletRequest"%>
<%@ page import="tpms.framework.component.util.JSPUtil"%>
<%@ page import="tpms.framework.component.dao.*"%>
<%@ page import="tpms.framework.component.signon.SignOnUserAccount"%>
<%@ page import="tpms.framework.core.controller.Event"%>
<%@ page import="tpms.framework.core.controller.EventResponse"%>
<%@ page import="tpms.framework.core.controller.web.html.HTMLActionException"%>
<%@ page import="tpms.framework.core.controller.web.html.HTMLActionSupport"%>
<%@ page import="javax.servlet.ServletContext"%>
<%@ page import="javax.servlet.http.HttpServletRequest"%>
<%@ page import="javax.servlet.http.HttpSession"%>

<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "시스템관리";
    String      leftmenu_name    = "시스템관리"; 
    String      htm_title        = "Log 조회"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    Exception   piex             = null;
    String      strErrMsg        = "";
    String      status           = "0";

    // 현재일자에서 1개월전의 일자를 가져온다.
    SimpleDateFormat sf          = new SimpleDateFormat("yyyy-MM-dd");
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(new Date(System.currentTimeMillis()));
    calendar.add(2, -1);
    
    String      stDate           = sf.format(calendar.getTime());
    String      edDate           = sf.format(new Date(System.currentTimeMillis()));    
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript">
var isEnableSave        = false;    // 저장여부 boolean값.
                                    // (초기 화면시 "조회" 버튼을 클릭하지 않고, 바로 Row Insert하는 기능을 막기 위함)
var underbarKeysValue   = "";       // Grid상에서 status가 Insert(I), Update(U)된 최종 '_' 구분로 조합된 Key값
         
/*-------------------------------------------------------*/ 
/* @기  능 : Grid들의 default attributes을 정의하는 함수 */
/*           (Page Loading시 호출됨)                     */
/* @리턴값 : 없음                                        */
/*-------------------------------------------------------*/
function LoadPage()
{
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "730px");
	
    // 상위 GRID에 대한 속성정보 설정
    //지원안함[implemented common] MessageText("MessageShowLevel")="UEX";
   	//지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"작업일자|업무구분|프로그램ID|점명|직원명|조회조건|시작시간|완료시간|ip", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Date",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"Ymd",         PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"Hms",         PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"Hms",         PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
   	mySheet.InitColumns(cols);
   	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(1);
   	mySheet.SetVisible(1);
   	newSetActionMenu(mySheet,"엑셀내려받기")
   	//mySheet.FitSize(false, true);
   	
   	
   	createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "100%", "800px");
    
    // Hidden GRID에 대한 속성정보 설정
    //지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
    hiddenGrid.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:"HIDDEN", Align:"Center"} ];
    hiddenGrid.InitHeaders(headers, info);

    var cols = [ {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
              {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
     
    hiddenGrid.InitColumns(cols);
    
    hiddenGrid.SetVisible(0);
    hiddenGrid.SetEditable(0);
}


/*---------------------------------------------
@기능 : 해당 항목의 '-'값을 삭제하는 함수
----------------------------------------------*/            
function removeHyphen(obj)
{           
    obj.value = obj.value.replace(/-/g, "");
    obj.select();
} 


/*---------------------------------------------
@기능 : 숫자만 입력가능 함수
----------------------------------------------*/            
function onlyNumberKeyUp(obj)
{   
    val = obj.value; 
    new_val = ''; 
    for(i=0;i<val.length;i++) { 
        char = val.substring(i,i+1); 
        if(char<'0' || char>'9') { 
            obj.value = new_val; 
            return; 
        } else { 
            new_val = new_val + char; 
        } 
    } 
} 


/*----------------------------------------------------*/
/* @기  능 : 날짜변환(YYYYMMDD -> YYYY-MM-DD)         */
/* @리턴값 : 없음                                     */
/*----------------------------------------------------*/
function convDate(obj)
{
    obj.value = obj.value.replace(/-/g, "");

    if(obj.value!="" && obj.value.length==8)
    {    
        var yy    = obj.value.substr(0,4); // 년
    	var mm    = obj.value.substr(4,2); // 월
    	var dd    = obj.value.substr(6,2); // 일
    	
    	obj.value = yy + "-" + mm + "-" + dd;
	}
}


/*----------------------------------------------------*/
/* @기  능 : 날짜 체크함수                            */
/* @리턴값 : 없음                                     */
/*----------------------------------------------------*/
function checkDate(obj) 
{
	var ln    = obj.value.length;	
  isValid   = true;
  
	if(ln>0 && ln!=10)
	    isValid = false;
	    
	if (ln==10) {
		var yy      = obj.value.substr(0,4); // 년	
		var mm      = obj.value.substr(5,2); // 월
		var dd      = obj.value.substr(8,2); // 일
		var numdays = dayInmonth((mm-1), yy);	
		
		if ((yy<1000)||(dd < 1)||(mm < 1)||(dd > numdays)||(mm > 12)||(isNaN(yy))||(isNaN(mm))||(isNaN(dd))) {
		    isValid = false;
		}
		
		obj.value = yy + "-" + mm + "-" + dd;
	}
	
  if(!isValid)
  {
      alert("[" + obj.title + "]란이 날짜형식에 맞지않습니다.");
  removeHyphen(obj);
  
  return false;
  }	
    
  return true;
}


/*----------------------------------------------------*/
/* @기  능 : 각 Button action별 처리하는 함수         */
/* @리턴값 : 없음                                     */
/*----------------------------------------------------*/
function doAction(sAction)
{
    isSelected    = true;

    upmuGubun   = document.frm.upmuGubun.value;
    programId   = document.frm.programId.value;
    jobDateFrom = document.frm.jobDateFrom.value.replace(/-/g, "");
    jobDateTo   = document.frm.jobDateTo.value.replace(/-/g, "");
    jumcode     = document.frm.jumcode.value;
    userid      = document.frm.userid.value;
    
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
        case "조회":                      
             /*
             if(programId==null || programId.length==0)
             {
                alert('프로그램ID가 입력되지 않았습니다. 확인 후 조회바랍니다.');
                document.frm.programId.focus();
                break;
             } */            
             if(jobDateFrom==null || jobDateFrom.length==0)
             {
                alert('작업일자가 입력되지 않았습니다. 확인 후 조회바랍니다.');
                document.frm.jobDateFrom.focus();
                break;
             }             
             if(jobDateTo==null || jobDateTo.length==0)
             {
                alert('작업일자가 입력되지 않았습니다. 확인 후 조회바랍니다.');
                document.frm.jobDateTo.focus();
                break;
             }         
             if(!checkDate(document.frm.jobDateFrom)) return;
             if(!checkDate(document.frm.jobDateTo)) return;             
             if(parseInt(jobDateFrom) > parseInt(jobDateTo))
             {
                alert('작업기준일자 검색 시작일자가 종료일자보다 이후 일자입니다. 확인 후 조회바랍니다.');
                break;
             }
             
             mySheet.DoSearch("managesystem.log.do?hidden_key=9&upmuGubun="  + upmuGubun  +
                                                 "&programId="   + programId  +
                                                 "&jobDateFrom=" + jobDateFrom +
                                                 "&jobDateTo="   + jobDateTo +
                                                 "&jumcode="     + jumcode +
                                                 "&userid="      + userid);
             //mySheet.FitSize(false, true);
             break;
            
        case "엑셀내려받기":                // 엑셀내려받기
             inqText       = new Array();
             inqText[0]    = new Array();
             inqText[0][0] = "업무구분";
             inqText[0][1] = document.frm.upmuGubun.options[document.frm.upmuGubun.selectedIndex].text 
             inqText[1]    = new Array();
             inqText[1][0] = "프로그램ID";
             inqText[1][1] = programId
             inqText[2]    = new Array();
             inqText[2][0] = "작업일자";
             inqText[2][1] = document.frm.jobDateFrom.value + " ~ " + document.frm.jobDateTo.value;             
             inqText[3]    = new Array();
             inqText[3][0] = "점번호";
             inqText[3][1] = jumcode;             
             inqText[4]    = new Array();
             inqText[4][0] = "사용자ID";
             inqText[4][1] = userid;
             // 보안등급세팅
             seqLevel = document.frm.Security_Level.value;  
             if(seqLevel !=null && seqLevel!='') {
                  inqText[5]    = new Array();
                  inqText[5][0] = "보안등급";
                  inqText[5][1] = document.frm.Security_Level.value;
             }
             
             doExcel(mySheet, inqText, true); //common.js 활용하여 excel 출력
             break;      
            
        case "초기화":                      // 초기화
             break;   
    }
}


/*---------------------------------------------
@기능 : 해당 항목의 '-'값을 삭제하는 함수
----------------------------------------------*/            
function removeHyphen(obj)
{           
    obj.value = obj.value.replace(/-/g, "");
    obj.select();
} 


/*---------------------------------------------
@기능 : 숫자만 입력가능 함수
----------------------------------------------*/            
function onlyNumberKeyUp(obj)
{   
    val = obj.value; 
    new_val = ''; 
    for(i=0;i<val.length;i++) { 
        char = val.substring(i,i+1); 
        if(char<'0' || char>'9') { 
            obj.value = new_val; 
            return; 
        } else { 
            new_val = new_val + char; 
        } 
    } 
} 


/*----------------------------------------------------*/
/* @기  능 : 날짜변환(YYYYMMDD -> YYYY-MM-DD)         */
/* @리턴값 : 없음                                     */
/*----------------------------------------------------*/
function convDate(obj)
{
    obj.value = obj.value.replace(/-/g, "");

    if(obj.value!="" && obj.value.length==8)
    {    
        var yy    = obj.value.substr(0,4); // 년
    	var mm    = obj.value.substr(4,2); // 월
    	var dd    = obj.value.substr(6,2); // 일
    	
    	obj.value = yy + "-" + mm + "-" + dd;
	}
}


/*----------------------------------------------------*/
/* @기  능 : 날짜 체크함수                            */
/* @리턴값 : 없음                                     */
/*----------------------------------------------------*/
function checkDate(obj) 
{
	var ln    = obj.value.length;
	
    isValid   = true;
    
	if(ln>0 && ln!=10)
	    isValid = false;
	    
	if (ln==10) {
		var yy      = obj.value.substr(0,4); // 년	
		var mm      = obj.value.substr(5,2); // 월
		var dd      = obj.value.substr(8,2); // 일
		var numdays = dayInmonth((mm-1), yy);	
		
		if ((yy<1000)||(dd < 1)||(mm < 1)||(dd > numdays)||(mm > 12)||(isNaN(yy))||(isNaN(mm))||(isNaN(dd))) {
		    isValid = false;
		}
		
		obj.value = yy + "-" + mm + "-" + dd;
	}
	
    if(!isValid)
    {
        alert("[" + obj.title + "]란이 날짜형식에 맞지않습니다.");
		removeHyphen(obj);
		
		return false;
    }	
    
    return true;

}

/*----------------------------------------------------*/
/* @기  능 : Calendar 팝업 함수                       */
/* @리턴값 : 없음                                     */
/*----------------------------------------------------*/
function Calendar(){
    var srcName=window.event.srcElement.getAttribute("name");
	with(document.frm)
    {
        switch(srcName)
        {
        case "Calendar1" :
            cal2.Select(document.frm.v_as_of_date,'v_as_of_date','yyyy-MM-dd');
			return false;
			break;
		default:
		    break;
		} // end switch
	} // end with
}

var cal2 = new CalendarPopup();
cal2.ShowYearNavigation();



/*---------------------------------------------
@기능 : 문자열에 숫자가 아닌 다른 문자가 있는지
        체크하는 함수
----------------------------------------------*/            
function isNumbers(obj)
{   
    var val     = obj; 
    var new_val = ''; 
    
    for(i=0; i<val.length; i++) { 
        
        char = val.substring(i,i+1); 
        
        if(char<'0' || char>'9') { 
            return false;
        } 
    }
    
    return true;
} 

/*---------------------------------------------
@기능 : 점정보 조회        
----------------------------------------------*/      
function selectjumname()
{
    basemonth   = document.frm.jobDateFrom.value.replace(/-/g, "");
    basemonth = basemonth.substring(0,6); //년월로 변경
    v_jumcode   = document.frm.jumcode.value;
    if(v_jumcode != ''){
      //hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=2&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
      hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=1&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
    }
    else{ 
      document.frm.jumname.value = '';
    }
}
function popupJumCode()
{
    basemonth = document.frm.jobDateFrom.value.replace(/-/g, "");
    if(basemonth != "") {
    	basemonth = basemonth.substring(0,6); //년월로 변경
    	win_open2("comm.scr.comm_scr_1010.screen?basemonth="+basemonth+"&searchGubun=2", 250, 450);
    } else {
    	 alert("작업기준일자를 입력해주세요.");
    	 document.frm.jobDateFrom.focus();
    	 
    }
}

function mySheet_OnSearchEnd(Code, Msg){
	/*
	if(Msg!=null)
    {
        if(Msg.indexOf("@")>=0)
        { 
            window.status = Msg.substring(Msg.indexOf("@")+1, Msg.length);
        }  
        else
            alert(Msg);
    } 
	*/
	
	showMsg(Code, Msg);
}

function hiddenGrid_OnSearchEnd(Code, Msg){
	len = Msg.length
    if (len > 0) {
    	if (Msg.substr(0,1) == "C") {
    		if (Msg.substr(1,len) == "2") {
    			document.frm.jumname.value = hiddenGrid.GetCellValue(1,0);   
    		}
    	} else {
    		showMsg(Code, Msg);
    	}
    }
}

function mySheet_OnSelectMenu(MenuStr, Code){
	doAction(MenuStr);
}

</script>

<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR">
  <tr> 
    <td>
      <table width="100%" border="0" cellspacing="0" cellpadding="0" border="0" class="tabletype2">
        <tr>
          <th>업무구분</th>
          <td>
            <select name="upmuGubun" class="select" onChange="">
                <option value="0">전체(운영관리제외)
                <option value="1">일일성과보고서
                <option value="2">영업점보고서
                <option value="3">개인PI
                <option value="5">운영관리
                <option value="9">전체
            </select> 
          </td> 
          <th>프로그램ID</th>
          <td><input type=text name='programId' class="input_l" style="ime-mode:active" size='10' alt="LIKE 검색"></td>           
          <td align="right" colspan="2" class="end">
		   	 <span class="btn_Grd" border="0" style="cursor:pointer" onclick="javascript:doAction('조회');">조회</span>
		   	 <span class="btn_Grd" border="0" style="cursor:pointer" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
          </td>  
        </tr>
        <tr>
          <th class="nobor">작업일자</th>
          <td class="nobor">
            <input type=text name='jobDateFrom' class="input_l" title="작업일자" size='10' maxlength='8' onFocus="removeHyphen(this)" onBlur="convDate(this)" onKeyUp="onlyNumberKeyUp(this)" style="ime-mode:disabled" value="<%=edDate%>">
            ~ <input type=text name='jobDateTo' class="input_l" title="작업일자" size='10' maxlength='8' onFocus="removeHyphen(this)" onBlur="convDate(this)" onKeyUp="onlyNumberKeyUp(this)" style="ime-mode:disabled" value="<%=edDate%>">
          </td> 
          <th class="nobor">점번호</th>
          <td class="nobor">
            <input type="text" class="input_l" onchange="selectjumname()" name="jumcode" size="6" value="" onkeyup="chk_num()">
             <a href="javascript:popupJumCode()"><img src="img/sky/butt_search_s.gif" border="0" class="vtm"></a>
             <input type="text" class="input_l" readonly name="jumname" size="15" value=""></td> 
          <th class="nobor">사용자ID</th>
          <td class="nobor end"><input type='text' name='userid'  class="input_l" style="ime-mode:active" size='10' maxlength='10'></td>   
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

<div id="hiddenGridObj"></div>

<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
LoadPage();
htm_title = '<%=htm_title%>';
</script>