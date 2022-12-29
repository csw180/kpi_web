<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 데이타입력
'프로그램 ID  : main_scr_1160.jsp
'프로그램 명  : 고객관리자코드 검증
'프로그램개요 : RM번호를 현업에서 확인후 관리
'작   성   자 : 조형석
'작   성   일 : 2007.08.27
====================================================================
'수정자/수정일    : 수정사유
'조형석/20090409  : 고객관리자 발령일과 종료일 추가 및 고객관리자 권유 
'                   계좌이나 영업점 성과에 반영하기위한 계좌리스트  입력 추가
'       Procedure : xwp_main_고객관리자조회, xwp_main_고객관리자처리
'                   xwp_main_고객관리자제외계좌조회, xwp_main_고객관리자제외계좌처리
'하진영/20110622  : NEXTRO대응
'하진영/20120214  : RM점번호 추가
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name    = "운영관리";
    String      leftmenu_name   = "데이터입력"; 
    String      htm_title       = "RM(본부) 관리 (고객관리자코드 검증)"; 
    String      actionname      = "";
    String      haengwon_no     = "";
    String      strErrMsg       = "";
    String      status          = "0";
    DbResultSet rs              = null;
    DBProcCall     cp           = new DBProcCall();

    int         manager         = 0;   // 사용자 권한 확인

    SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);
    
    // 종수와 전산정보부 권한 수보
    String role[] = account.getRole(); //권한

    for (int i = 0; i < role.length; i++) {
        if (role[i].trim().equals("400") || role[i].trim().equals("450")) {
           manager = 1 ;
           break;
        }
    }

%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/main/scr/main_scr_1160.js"></script>
<Script language="javascript">

function hiddenGrid_OnSearchEnd(Code, Msg) {
    len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.basemonth);
            document.frm.basemonth.selectedIndex=0;
        }else{
            alert(ErrMsg);
        }
    }
}

function hiddenGrid1_OnSearchEnd(Code, Msg) {
    v_inChk = hiddenGrid1.GetCellValue(1, 0);
    button_contril();
    
	if (v_chk == "1") InputButtControl(1);
	if (v_chk == "2") InputButtControl(3);
	if (v_chk == "3") InputButtControl(1);
}
    
function hiddenGrid2_OnSearchEnd(Code, Msg) {
    len = Msg.length;
    if (len > 0){
        if(Msg.substr(0,1) == "C"){
            document.frm.jumname.value = hiddenGrid2.GetCellValue(1, 0);
            if(document.frm.jumname.value.substr(0,2) == "조회") {
               alert("점번호를 확인하세요");
               document.frm.jumcode.value = "";
               document.frm.jumname.value = "";
            }
        }else{
            if(ErrMsg=="tpms.framework.component.dao.DAOException: 21")
                ErrMsg = "데이터 중복 입니다.확인하세요";
            alert(ErrMsg);
        }
    }
}
</script>

<Script language="javascript">
function mySheet_OnSearchEnd(Code, Msg) {
    if (Msg != "" && isCud == false) showMsg(Code, Msg);
	isCud = false;
	
	isEnableSave = true;
    mySheet.CheckAll(1, 0);
    
    // FindText(Col, SearchText, [StartRow], [FullMatch])
    var fRow = mySheet.FindText("RMCODE",document.frm.rmcode.value, "1", "2" );
    if (fRow > 0 ) mySheet.SelectCell(fRow, "0");
    
    document.frm.rmcode.value  = "";
    document.frm.jumcode.value = "";
    document.frm.jumname.value = "";
    document.frm.stdate.value  = "";
    document.frm.enddate.value = "";
    document.frm.aclist.value  = "";
    document.frm.RMjum.value   = "";

    enableElements();
}

function mySheet_OnSelectMenu(sAction) {
    doAction(sAction);
}

function mySheet_OnSaveEnd(Code, Msg) {
	showMsg(Code, Msg);
	if(Msg!=null) {
		isCud = true;
	}
} 

function mySheet_OnClick(Row,Col,Value) {
    if (v_inChk != 1) {
    	
    	if(mySheet.HeaderRows() * 1 >= Row * 1 + 1) return;
    	
        //고객관리자코드
        document.frm.rmcode.value     = mySheet.GetCellValue(Row, 1);
        //점번호
        document.frm.jumcode.value    = mySheet.GetCellValue(Row, 2);
        //발령일
        document.frm.stdate.value     = mySheet.GetCellValue(Row, 4);
        //종료일
        document.frm.enddate.value    = mySheet.GetCellValue(Row, 5);
        //RM점번호
        document.frm.RMjum.value      = mySheet.GetCellValue(Row, 6);
        document.frm.RMjum.disabled   = true;
        selectjumname(1);
        //제외계좌번호 클리어
        document.frm.aclist.value  = "";
    }
    
    InputButtControl(3);
	v_selrow = Row;
}

function mySheet_OnDblClick(Row,Col) {
    aclSheet.DoSearch("main.scr.main_scr_1161.do?hidden_key=9"
                                                +"&basemonth=" + document.frm.basemonth.value
                                                +"&rmcode=" + mySheet.GetCellValue(Row, 1)
                                                +"&RMjum= " + mySheet.GetCellValue(Row, 6)
                                                +"&aclist=99999999999999999999" // 이렇게 하는이유는 Class에서 프로지셔 호출시 비교하기 위함
                                                ); 
    //aclSheet.FitSize(false, true);
}

function aclSheet_OnSearchEnd(Code, Msg) {
    if (Msg != "" && isCud == false) showMsg(Code, Msg);
	isCud = false;
	
	// FindText(Col, SearchText, [StartRow], [FullMatch])
    var fRow = aclSheet.FindText("계좌번호",document.frm.aclist.value, "1", "2" );
    if (fRow > 0 ) aclSheet.SelectCell(fRow, "0");
}

function aclSheet_OnSaveEnd(Code, Msg) {
	showMsg(Code, Msg);
	if(Msg!=null) {
		isCud = true;
	}	
} 

function aclSheet_OnClick(Row,Col,Value) {
    if (v_inChk != 1) {
    	
    	if(aclSheet.HeaderRows() * 1 >= Row * 1 + 1) return;
    	
        //고객관리자코드
        document.frm.rmcode.value     = aclSheet.GetCellValue(Row, 0);
        //점번호
        document.frm.jumcode.value    = aclSheet.GetCellValue(Row, 1);
        //제외계좌번호
        document.frm.aclist.value     = aclSheet.GetCellValue(Row, 2);
        //발령일 클리어
        document.frm.stdate.value     = aclSheet.GetCellValue(Row, 3);
        //종료일 클리어
        document.frm.enddate.value    = aclSheet.GetCellValue(Row, 4);
        //RM점번호
        document.frm.RMjum.value      = aclSheet.GetCellValue(Row, 5);
        document.frm.RMjum.disabled   = true;
        selectjumname(1);
    }    
    
    InputButtControl(3);
    v_selrow = Row;
}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>        
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<tr> 
	    <th>기준년월</td>
	    <td><select name="basemonth" class="select" onchange="javascript:selectcommit(1);"></select></td>
	    <th >입력상태</td>
	    <td ><input type="text" size="14" readonly name="inchkname"  class="input_c"></td>
	    <td class="al_R end">
	    	<span class="btn_Grd" border="0" onclick="javascript:doAction('조회');" style="cursor:pointer">조회</span>
       		<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀내려받기');" style="cursor:pointer">엑셀</span>
       		<span class="btn_Grd" border="0" onclick="javascript:selectcommit(2);" id="btn_list1" name="btn_list1" style="cursor:pointer">확정</span>
       		<span class="btn_Grd" border="0" onclick="javascript:selectcommit(3);" id="btn_list2" name="btn_list2" style="cursor:pointer">확정취소</span>
	    </td>
  	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
  	<tr>
    	<td width="60%">
      		<div id="sheetObj"></div>
    	</td>
    	<td width="40%" class="pdL10">
      		<div id="aclSheetObj"></div>
    	</td>
  	</tr>
</table>
<div id="hiddenGridObj"></div>
<div id="hiddenGridObj1"></div>
<div id="hiddenGridObj2"></div>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
  	<tr>
	    <td>
		    <div id="butt1" style="position:relative; display:;">
		      	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		        	<tr> 
		          		<td class="desc4">※ RM점번호 와 고객관리자코드는 1:1로 입력 하십시요 . </td>
		        	</tr>
		        	<tr> 
			          	<td class="desc4">※ 제외계좌번호를 입력하면 고객관리자제외 계좌번호 부분을 조회/등록/변경/삭제 합니다. </td>
			          	<td class="al_R">
			          		<span class="btn_Grd" border="0" onclick="javascript:doAction('초기화');" style="cursor:pointer">초기화</span>
				       		<span class="btn_Grd" border="0" onclick="javascript:doAction('등록');" style="cursor:pointer">등록</span>
				       		<span class="btn_Grd" border="0">변경</span>
				       		<span class="btn_Grd" border="0">삭제</span>
			          	</td>
		        	</tr>
		      	</table>
		    </div>
		    <div id="butt2" STYLE="position:relative; display:none;">
		      	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		        	<tr> 
		          		<td class="desc4">※ RM점번호 와 고객관리자코드는 1:1로 입력 하십시요 . </td>
		        	</tr>
		        	<tr> 
		          		<td class="desc4">※ 제외계좌번호를 입력하면 고객관리자제외 계좌번호 부분을 조회/등록/변경/삭제 합니다. </td>
		          		<td class="blue" width="36%" align="right">
			          		<span class="btn_Grd" border="0" onclick="javascript:doAction('초기화');" style="cursor:pointer">초기화</span>
				       		<span class="btn_Grd" border="0">등록</span>
				       		<span class="btn_Grd" border="0" onclick="javascript:doAction('변경');" style="cursor:pointer">변경</span>
				       		<span class="btn_Grd" border="0" onclick="javascript:doAction('삭제');" style="cursor:pointer">삭제</span>
		          		</td>
		        	</tr>
		      	</table>
		    </div>
		    <div id="butt3" STYLE="position:relative; display:none;">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
			    	<tr> 
			        	<td class="desc4">※ RM점번호 와 고객관리자코드는 1:1로 입력 하십시요 . </td>
			        </tr>
			        <tr> 
			          	<td class="desc4">※ 제외계좌번호를 입력하면 고객관리자제외 계좌번호 부분을 조회/등록/변경/삭제 합니다. </td>
			          	<td class="al_R">
			          		<span class="btn_Grd" border="0">초기화</span>
				       		<span class="btn_Grd" border="0">등록</span>
				       		<span class="btn_Grd" border="0">변경</span>
				       		<span class="btn_Grd" border="0">삭제</span>
			          	</td>
			        </tr>
				</table>
		    </div>
	    </td>
  	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR mgT5">
  	<tr>
	    <th>고객관리자코드</td>
	    <td>
	      	<input type="text" class="input_l" name="rmcode" size="10" onkeyup="chk_num()">
	    <th>소속점번호</th>
	    <td colspan="8" class="end">
	      	<input type="text" class="input_l" onchange="selectjumname(1)" name="jumcode" size="5" onkeyup="chk_num()">
	      	<a href="javascript:popupJumCode(0)"><img src="/kpi/img/sky/butt_search_s.gif" border="0" align="absmiddle"></a>
	      	<input type="text" class="input_l" readonly name="jumname" size="20">
	  	</td>
  	</tr>
  	<tr>
	    <th class="nobor">RM점번호</th>
	    <td class="nobor">
	     	<input type="text" class="input_l" name="RMjum" size="10" onkeyup="chk_num()">
	    <th class="nobor">발령일</th>
	    <td class="nobor">
	      	<input type="text" class="input_l" name="stdate" size="8" onkeyup="chk_num()">
	    <th class="nobor">종료일</th>
	    <td  colspan="3" class="nobor">
	      	<input type="text" class="input_l" name="enddate" size="8" onkeyup="chk_num()">
	    <th class="nobor">제외계좌번호</th>
	    <td class="nobor end">
	      	<input type="text" class="input_l" name="aclist" size="20" onkeyup="chk_num()">
		</td>
  	</tr>
</table>
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
var v_manager    = <%=manager%>;  // 성과 권한 체크
var v_selrow    = -1;             // 선택한 ROW 
var v_inChk     = 0;              // 확정여부

LoadPage();
selectcommit(1);
htm_title = '<%=htm_title%>';
</script>