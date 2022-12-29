<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 본부데이타입력
'프로그램 ID  : main_scr_4020.jsp
'프로그램 명  : 본부주관마케팅실적 관리
'프로그램개요 : 개인별PI 본부주관마케팅실적 관리
'작   성   자 : 조형석
'작   성   일 : 2009.06.08
====================================================================
'수정자/수정일/수정사유: 하진영/20170322/계정과목명 display 개선
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name    = "운영관리";
    String      leftmenu_name   = "본부데이터입력"; 
    String      htm_title       = "본부주관마케팅실적 관리"; 
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
<script language="javascript" src="/kpi/main/scr/main_scr_4020.js"></script>
<Script language="javascript"> 

function hiddenGrid_OnSearchEnd(Code, Msg) {
    len = Msg.length;
    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.basemonth);
            document.frm.basemonth.selectedIndex=0;
        }else{
            alert(Msg);
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
            document.frm.accuntname.value = hiddenGrid2.GetCellValue(1, 0);
            
            if(document.frm.accuntname.value.substr(0,2) == "조회") {
               alert("계정과목코드를 확인하세요");
               document.frm.accuntcode.value = "";
               document.frm.accuntname.value = "";
            }
        }else{
            if(Msg=="tpms.framework.component.dao.DAOException: 21")
                Msg = "데이터 중복 입니다.확인하세요";
            alert(Msg);
        }
    }
}

function mySheet_OnLoadExcel() {
/*
      for(i=1; i<=RowCount("I"); i++) {
          v_ijagbn = mySheet.GetCellValue(i, 6);
          v_pygbn  = mySheet.GetCellValue(i, 5);
          v_refno = mySheet.GetCellValue(i, 2);
          mySheet.SetCellValue(i, 6, v_ijagbn.toUpperCase());
          mySheet.SetCellValue(i, 5, v_pygbn.toUpperCase());
          mySheet.SetCellValue(i, 2, v_refno.toUpperCase());
         
          if(mySheet.GetCellValue(i, 6) == "Y") {
             if(mySheet.GetCellValue(i, 3) == "0" || mySheet.GetCellValue(i, 3)== "") {
            	 mySheet.SetCellValue(i, 8, mySheet.GetCellValue(i, 8) +" 계정과목코드 미입력" );
                fchk = true;
             }   
          } else if(mySheet.GetCellValue(i, 6) == "N") { 
             if(mySheet.GetCellValue(i, 7) == "0" || mySheet.GetCellValue(i, 7)== "") {
            	 mySheet.SetCellValue(i, 8, mySheet.GetCellValue(i, 8) +" 평가대상구분 미입력");
                fchk = true;
             }
          }      
      }   
      if(fchk) alert("오류검증을 확인해 주세요");
*/
}

function mySheet_OnSearchEnd(Code, Msg) {    
	showMsg(Code, Msg);
	
	// FindText(Col, SearchText, [StartRow], [FullMatch])
    var fRow = mySheet.FindText(3, document.frm.accunt.value,0);
    if (fRow > 0 ) mySheet.SelectCell(fRow, 1);

    document.frm.costomerno.value  = "";
    document.frm.accunt.value  = "";
    document.frm.accuntcode.value = "";
    document.frm.accuntname.value = "";
    document.frm.accdate.value = "";
    document.frm.maketjum.value = "";
    enableElements();
}

function mySheet_OnSelectMenu(sAction) {
    doAction(sAction);
}

function mySheet_OnSaveEnd(Code, Msg) { 
    showMsg(Code, Msg);
    if (Msg == "") 	{
    	doAction('조회');
    }
}

function mySheet_OnClick(Row,Col,Value) {
	
	if (v_inChk != 1) {
		
		if(mySheet.HeaderRows() * 1 >= Row * 1 + 1) return;
		
	    //고객번호
	    document.frm.costomerno.value = mySheet.GetCellValue(Row, 2);
	    //계좌번호
	    document.frm.accunt.value     = mySheet.GetCellValue(Row, 3);
	    //계정과목코드
	    document.frm.accuntname.value = mySheet.GetCellValue(Row, 5);
	    //계정과목명
	    document.frm.accuntcode.value = mySheet.GetCellValue(Row, 4);
	    //계좌신규일
	    document.frm.accdate.value    = mySheet.GetCellValue(Row, 6);
	    //마케팅주관부서
	    document.frm.maketjum.value   = mySheet.GetCellValue(Row, 7);
	}    
	    
	InputButtControl(3);
	v_selrow = Row;
}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>     
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<tr> 
	    <th>기준년월</th>
	    <td><select name="basemonth" class="select" onchange="javascript:selectcommit(1);"></select></td>
	    <th>입력상태</th>
	    <td><input type="text" size="12" readonly name="inchkname"  class="input_c"></td>
	    <td class="al_R end">
	    	<span class="btn_Grd" border="0" onclick="javascript:doAction('조회');"         style="cursor:pointer">조회</span>
      		<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀내려받기');" style="cursor:pointer">엑셀</span>
      		<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀올리기');"   style="cursor:pointer">업로드</span>
      		<span class="btn_Grd" border="0" onclick="javascript:doAction('엑셀저장');"     style="cursor:pointer">저장</span>
      		<span class="btn_Grd" border="0" onclick="javascript:selectcommit(2);" id="btn_list1" name="btn_list1" style="cursor:pointer">확정</span>
      		<span class="btn_Grd" border="0" onclick="javascript:selectcommit(3);" id="btn_list2" name="btn_list2" style="cursor:pointer">확정취소</span>
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
<div id="hiddenGridObj1"></div>
<div id="hiddenGridObj2"></div>

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
  	<tr>
    	<td align="center" class="table_l06">
		    <div id="butt1" STYLE="position:relative; display:;">
		      	<table width="100%" border="0" cellspacing="0" cellpadding="0">
			        <tr> 
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
			          	<td class="al_R">
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
	    <th>고객번호</th>
	    <td>
	    	<input type="text" name="costomerno" class="input_l" onkeyup="chk_num()" size="9">
	    </td>
	    <th>계좌번호</th>
	    <td>
	        <input type="text" class="input_l" name="accunt" size="20">
	    </td>  
	    <th>계정과목코드</th>
	    <td colspan="3" class="end">
	    	<input type="text" class="input_l" onchange="selectaccuntname()" name="accuntcode" size="8" onkeyup="chk_num()">
	        <input type="text" class="input_l" readonly name="accuntname" size="18">  
	    </td>
  	</tr>
  	<tr>
	    <th class="nobor">계좌신규일</th>
	    <td class="nobor">
	        <input type="text" class="input_l" name="accdate"  onkeyup="chk_num()" size="8">
	    </td>
	    <th class="nobor">마케팅주관부서</th>
	    <td colspan="5" class="nobor end">
	        <input type="text" class="input_l" name="maketjum"  onkeyup="chk_num()" size="3">
	    </td>
  	</tr>
</table>
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
var v_manager    = <%=manager%>;  // 성과 권한 체크
var v_selrow    = -1;             // 선택한 ROW 
var v_inChk     = 0;              // 확정여부
var fchk        = false;          // 엑셀 업로드시 체크 결과

LoadPage();
selectcommit(1);
htm_title = '<%=htm_title%>';
</script>