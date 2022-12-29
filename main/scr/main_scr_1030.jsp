<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 코드관리
'프로그램 ID  : main_scr_1030.jsp
'프로그램 명  : 타지점실적계좌 등록
'프로그램개요 : 타지점실적계좌 등록
'작   성   자 : 변휘원
'작   성   일 : 2006.04.12
====================================================================
'수정자/수정일     : 수정사유      :
'하진영/2010.06.18 : 타지점예금 외 타지점대출 계좌발생하여
'                    tb_mcdm타지점예금계좌 -> tb_mpmm타지점실적계좌 변경
'하진영/20110623   : NEXTRO 대응
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "운영관리";
    String      leftmenu_name    = "코드관리"; 
    String      htm_title        = "타지점실적계좌 등록"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
    boolean     alleRole         = false;  //성과전산
    boolean     allbRole         = false;  //성과현업
    boolean     porRole          = false;  //개인고객부
    boolean     reRole           = false;  //기업고객부
    String      lastRole         = "0";    //최종권한 확인용

    String role[] = kpi_rpt_account.getRole(); //권한

    for (int i = 0; i < role.length; i++) {
        if (role[i].trim().equals("450")) {          // 성과전산 전부 등록/변경/삭제 가능
            alleRole=true;
        } else if (role[i].trim().equals("400")) {   // 성과현업 전부 등록/변경/삭제 가능
            allbRole=true;
        } else if (role[i].trim().equals("222")) {   // 기업고객부 기업고객만 등록/변경/삭제 가능
            reRole=true;
        } else if (role[i].trim().equals("221")) {   // 개인고객부 개인고객만 등록/변경/삭제 가능
            porRole=true;
        }
    }

    // 접속한 사용자의 권한이 어떤권한 인지 체크 (전산부서 는 모든권한을 가질수 있고 개인/기업을 전부다 입력할 경우 따로 입력하는 것과 구별하기 위함)
    if (alleRole) {lastRole = "4";}                // 전산부서
    else if (allbRole) {lastRole = "3";}           // 성과현업부서
    else if (reRole && porRole) lastRole = "5";    // 개인/기업고객 권한 획득시
    else if (reRole) {lastRole = "2";}             // 기업고객부서
    else if (porRole) {lastRole = "1";}            // 개인고객부서
    
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/main/scr/main_scr_1030.js"></script>
<script language="javascript">

function mySheet_OnClick(Row,Col,Value) {
	
	if(mySheet.HeaderRows() * 1 >= Row * 1 + 1) return;
	
    document.frm.jumcode.value     	= mySheet.GetCellValue(Row,  0);        // 계좌관리점
    document.frm.jumname.value    	= mySheet.GetCellValue(Row,  1);        // 계좌관리점명
    document.frm.accountcode.value	= mySheet.GetCellValue(Row,  2);        // 계정과목코드
    document.frm.accountname.value	= mySheet.GetCellValue(Row,  3);        // 계정과목코드명
    document.frm.accountno.value    	= mySheet.GetCellValue(Row,  4);        // 계좌번호
    document.frm.manjumcode.value 	= mySheet.GetCellValue(Row,  7);        // 성과관리점
    document.frm.manjumname.value	= mySheet.GetCellValue(Row,  8);        // 성과관리점명
    document.frm.period.value       	= mySheet.GetCellValue(Row,  9);        // 성과관리점인정비율
    document.frm.regPost.value      	= mySheet.GetCellValue(Row, 10);        // 등록부서구분
    document.frm.jumcode.disabled   	= true;
    document.frm.accountcode.disabled	= true;
    document.frm.accountno.disabled    	= true;

    document.all.image2.style.cursor = "" ;
    document.all.image3.style.cursor = "pointer" ;
    document.all.image4.style.cursor = "pointer" ;
    isInstBtnEnable = false;
    isMofyBtnEnable = true;
    isDelBrnEnable  = true;
}
    
function mySheet_OnSearchEnd(Code, Msg) {
	if (Msg != "" && isCud == false) showMsg(Code, Msg);
	isCud = false;
	
    if (isMode == "C") {
        mySheet.SelectCell(1, "계좌관리점");
	} else if (isMode == "U") {
        var fRow = mySheet.FindText("계좌번호", document.frm.accountno.value, 1, 0 );
        if (fRow > 0 ) mySheet.SelectCell(fRow, "계좌번호");	
    } else if (isMode == "D") {
        document.frm.reset();	
    }
}    

function hiddenGrid_OnSearchEnd(Code, Msg) {
    len = Msg.length;;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            document.frm.basemonth.value=hiddenGrid.GetCellValue(1,0);
        }else if(Msg.substr(0,1) == "C"){
            if(Msg.substr(1,len)== "1"){
                if(jumgubun==1) document.frm.jumname.value = hiddenGrid.GetCellValue(1,  0);        // 계좌점명
                else            document.frm.manjumname.value = hiddenGrid.GetCellValue(1,  0);        // 관리점명
            }
        }else{
            if(ErrMsg=="tpms.framework.component.dao.DAOException: 21")
                ErrMsg = "데이터 중복 입니다.확인하세요";
            alert(ErrMsg);
        }
    }

    if (isMode == "C" || isMode == "U" || isMode == "D") {
	    mySheet.DoSearch("main.scr.main_scr_1031.do?hidden_key=9");
    }
}

function mySheet_OnSelectMenu(sAction) {
    doAction(sAction);
}

function mySheet_OnSaveEnd(Code, Msg) {
    showMsg(Code, Msg);
}    

</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<tr> 
	    <td align="right" class="topB">
	    	<input type="hidden" name="basemonth" />
	        <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
	        <span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
	    </td>
  	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" cells class="pdLR">
  	<tr>
    	<td>
       		<div id="sheetObj"></div>
    	</td>
  	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR">
  	<tr>
	    <td align="right" class="pdT5 pdB3">
	        <span class="btn_Grd" style="cursor:pointer" border="0" id="image1" onclick="javascript:doAction('초기화');">초기화</span>
      		<span class="btn_Grd" style="cursor:pointer" border="0" id="image2" onclick="javascript:doAction('등록');">등록</span>
      		<span class="btn_Grd" style="cursor:pointer" border="0" id="image3" onclick="javascript:doAction('변경');">변경</span>
      		<span class="btn_Grd" style="cursor:pointer" border="0" id="image4" onclick="javascript:doAction('삭제');">삭제</span>
	    </td>
  	</tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<tr> 
	    <th>계좌관리점</th>
	    <td colspan="3" class="end">
	      	<input type="text" class="input_l" onchange="selectjumname(1)" name="jumcode" size="6" onkeyup="chk_num()">
	        <a href="javascript:popupJumCode(0)"><img src="/kpi/img/sky/butt_search_s.gif" border="0" align="absmiddle"></a>
	      	<input type="text" class="input_l" readonly name="jumname" size="30">
	    </td>
  	</tr>
  	<tr>
	    <th class="nobor">계정과목코드</th>
	    <td class="nobor">
	 		<input type="text" class="input_l" name="accountcode" size="6" onkeyup="chk_num()" onchange="chk_manPeriod()">
	      	<a href="javascript:popupAccountCode()"><img src="/kpi/img/sky/butt_search_s.gif" border="0" align="absmiddle" ></a>
	      	<input type="text" class="input_l" readonly name="accountname" size="30"></td>
	    <th class="nobor">계좌번호</th>
	    <td class="nobor end" align="left"><input type="text" name="accountno" class="input_l" size="30" maxlength="50" ></td>
  	</tr>
  	<tr>
	    <th class="nobor">성과관리점</th>
	    <td class="nobor">
	    	<input type="text" class="input_l" onchange="selectjumname(2)" name="manjumcode" size="6" onkeyup="chk_num()">
	      	<a href="javascript:popupJumCode(999)"><img src="/kpi/img/sky/butt_search_s.gif" border="0" align="absmiddle"></a>
	      	<input type="text" class="input_l" readonly name="manjumname" size="30"></td>
	    <th class="nobor" width="84">성과관리점<br>인정비율(%)</th>
	    <td align="left" class="nobor end"><input type="text" name="period" size="5" maxlength="5" class="input_l" onBlur="javascript:dotchk();" onKeyUp="javascript:percOnly(this,document.frm,true);">&nbsp;&nbsp;&nbsp;ex)123.12</td>
	    <input type="hidden" name="regPost">
  	</tr>
</table>
<div id="hiddenGridObj"></div>
      
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
LoadPage()
htm_title = '<%=htm_title%>';
lastRole = '<%=lastRole%>';
</script>