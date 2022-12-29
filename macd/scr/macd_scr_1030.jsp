<%--===============================================================
'주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 코드관리
'프로그램 ID  : macd_scr_1030.jsp
'프로그램 명  : KPI 상품그룹 관리
'프로그램개요 : KPI 상품그룹 관리
'작   성   자 : 변휘원
'작   성   일 : 2006.04.12
====================================================================
'수정자/수정일   :수정사유      
'하진영/20110211 :기준실적상품분류코드 추가 (기준실적 상품분류별 입력)
'하진영/20110623 :NEXTRO 대응
'하진영/20120214 :순이자대상상품여부 -> 순이자대상상품구분으로 변경,신규고정이하여신대상여부 추가
'조형석/2013.07.24/특정상품분류 추가 : 2013년 하반기 성과기준
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "운영관리";
    String      leftmenu_name    = "코드관리"; 
    String      htm_title        = "KPI 상품그룹 관리"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
    String      newyn            = "N";
    int         manager          = 0;   // 사용자 권한 확인
    DbResultSet rs       = null;
    DBProcCall  cp       = new DBProcCall();

    // 종수와 전산정보부 권한 수보
    String role[] = kpi_rpt_account.getRole(); //권한

    for (int i = 0; i < role.length; i++) {
        if (role[i].trim().equals("400") || role[i].trim().equals("450")) {
           manager = 1 ;
           break;
        }
    }

    try {
        rs  = cp.callProc("UP_KPI_O_S_일일신규상품그룹신규여부");        
    }catch(Exception ex) {}

    try {
        if(rs != null) {
           rs.first();
           while(rs.next()) {       
             newyn = rs.getString("신규여부");
           }
        }
    }catch(Exception e){}    
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="/kpi/macd/scr/macd_scr_1030.js"></script>
<script language="javascript">
  function deleteyn()
  {
	  if (confirm("정말 삭제 하시겠읍니까")) {
		  return true;
	  } else {
		  return false;
	  }
  }

function mySheet_OnClick(Row,Col,Value) {
	
	if(mySheet.HeaderRows() * 1 >= Row * 1 + 1) return;
	
    f = document.frm;
    f.sgubuncode.value      		= mySheet.GetCellValue(Row,  5);           // 세분류코드
    f.sgubunname.value      		= mySheet.GetCellValue(Row,  6);           // 세분류명
    f.interestgb.value      			= mySheet.GetCellValue(Row, 7)=="원화순이자"? 1 : mySheet.GetCellValue(Row, 7)=="외화순이자"? 2: 0; // 순이자수익대상상품구분
    f.delayyn.value         			= mySheet.GetCellValue(Row,  8);           // 연체 대상상품여부
    f.creditdelayyn.value   		= mySheet.GetCellValue(Row,  9);           // 신용카드연체 대상상품여부
    f.lowcostyn.value       			= mySheet.GetCellValue(Row, 10);           // 저원가성 여부
    f.loanyn.value          			= mySheet.GetCellValue(Row, 11)=="Y"? 1 : mySheet.GetCellValue(Row, 11)=="N"? 0: mySheet.GetCellValue(Row, 11)=="부동산PF"? 2 : mySheet.GetCellValue(Row, 11)=="정책자금분류"? 3 : 99; // 총여신구분
    f.piijayn.value         			= mySheet.GetCellValue(Row, 12)=="Y"? 1 : mySheet.GetCellValue(Row, 12)=="N"? 2: mySheet.GetCellValue(Row, 12)=="평잔"? 3 : mySheet.GetCellValue(Row, 12)=="이자"? 4 : 0; // PI이자대상구분
    f.LoanBelowYN.value     		= mySheet.GetCellValue(Row, 14);           // 신규고정이하여신대상여부
    f.ExpAdjYN.value        		= mySheet.GetCellValue(Row, 15);           // 위험조정운용대상여부
    f.spsgcode.value        		= mySheet.GetCellValue(Row, 16);           // 특정상품분류코드
    f.dimagubun.value       		= mySheet.GetCellValue(Row, 17);           // 디마케팅제외구분
    f.retaloangb.value      			= mySheet.GetCellValue(Row, 18);           // 소매여신구분
    f.h_commissiongubun.value	= mySheet.GetCellValue(Row, 19);         // 수수료 구분명
    f.commissiongubun.value   	= mySheet.GetCellValue(Row, 20);         // 수수료 구분코드
    f.BasicProductCode.value  	= mySheet.GetCellValue(Row, 21);         // 기준실적상품분류코드
        
    document.all.image3.style.cursor = "pointer" ;
    isMofyBtnEnable = true;
	
}

function hiddenGrid_OnSearchEnd(Code, Msg) {
    len = Msg.length

    if (len > 0){
        if (Msg.substr(0,1) == "B"){
            ComboValue(document.frm.basemonth);
            document.frm.basemonth.selectedIndex=0;
            sel_basemonth();
        }else if(Msg.substr(0,1) == "J"){
            if(Msg.substr(1,len)== "13"){
                ComboValue1(document.frm.productgubun);
                sel_productgubun();
            }else if(Msg.substr(1,len)== "14"){
                ComboValue(document.frm.crossingyn);
            }else if(Msg.substr(1,len)== "12"){
                ComboValue(document.frm.commissiongubun);
            }else if(Msg.substr(1,len)== "50"){
                ComboValue(document.frm.BasicProductCode);
            }    
        }else if(Msg.substr(0,1) == "G"){
            if(Msg.substr(1,len)== "1"){
                ComboValue(document.frm.bgubun);
            }else if(Msg.substr(1,len)== "2"){
                ComboValue(document.frm.mgubun);
            }
        }else{
            v_inChk=hiddenGrid.GetCellValue(1, 0);
            button_contril();
            
        	if (v_chk == "1") InputButtControl(1);
        	if (v_chk == "2") InputButtControl(3);
        	if (v_chk == "3") InputButtControl(1);
        }
    }
    
    /*
    initGrid(); // 연체율 화면 그리드 초기화
    isCud = true;
	doAction("조회");
	*/
	
	if(isCud) doAction("조회");
	
}

function mySheet_OnSearchEnd(Code, Msg) {
    if (Msg != "" && isCud == false) showMsg(Code, Msg);
    
 	// FindText(Col, SearchText, [StartRow], [FullMatch])
    
 	if(tmp_sgubuncode != "") { 	
	    var fRow = mySheet.FindText("세분류코드", tmp_sgubuncode, "1", "2" );
	    if (fRow > 0 )
	    	mySheet.SelectCell(fRow, "0");
	    mySheet_OnClick(fRow, 0, "");
	    tmp_sgubuncode = "";
 	}
	isCud = false;
}    

function mySheet_OnSelectMenu(sAction) {
    doAction(sAction);
}
</script>
<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  	<tr> 
	    <th>기준년월</th>
	    <td><select name="basemonth" class="select" onchange="sel_basemonth()"></select></td>
	    <th>입력상태</th>
	    <td><input type="text" size="12" readonly name="inchkname"  class="input_c"></td>
	    <td class="end al_R" colspan="2">
	    	<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('조회');">조회</span>
       		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('엑셀내려받기');">엑셀</span>
       		<span class="btn_Grd" border="0" onclick="javascript:selectcommit(2);" id="btn_list1" name="btn_list1" style="cursor:pointer">확정</span>
       		<span class="btn_Grd" border="0" onclick="javascript:selectcommit(3);" id="btn_list2" name="btn_list2" style="cursor:pointer">확정취소</span>
       		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:newcode_insert();" id="btn_newcode" name="btn_newcode">기준일 자료생성</span>
	    </td>
  	</tr>
  	<tr>
	    <th class="nobor">상품구분</th>
	    <td class="nobor"><select name="productgubun" class="select" onchange="sel_productgubun()"></select></td>
	    <th class="nobor">대분류</th>
	    <td class="nobor">
	    	<select name="bgubun" class="select" onchange="sel_bgubun()">
	    		<option value=999>전체</option>
	    	</select>
	    </td>
	    <th class="nobor wd10">중분류</th>
	    <td class="nobor end">
	    	<select name="mgubun" class="select">
	    		<option value=999>전체</option>
	    	</select>
	    </td>
  	<tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
  	<tr>
    	<td>
       		<div id="sheetObj"></div>
    	</td>
  	</tr>
</table>
<div id="setList">
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR mgT5">
  	<tr> 
	    <th class="wd10">세분류 코드</th>
	    <td><input type="text" name="sgubuncode" readonly class="input_l" size="8">
	    	<input type="text" name="sgubunname" readonly class="input_l" size="50">
	    </td>
	    <td class="al_R end">
	    	<span class="btn_Grd" id="image3" border="0" style="cursor:pointer" onclick="javascript:doAction('변경');">변경</span>
	    </td>
  	</tr>
</table>
</div>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
	<tr id="tr1"> 
      	<th class="nobor wd10">순이자수익상품구분</th>
      	<td class="nobor">
      		<select name="interestgb" class="select">
      			<option value="0">선택</option>
      			<option value="1">원화순이자</option>
      			<option value="2">외화순이자</option>
      		</select>
      	</td>
      	<th class="nobor wd10">연체대상상품여부</th>
      	<td class="nobor">
      		<select name="delayyn" class="select">
      			<option value="">선택</option>
      			<option value="Y">YES</option>
      			<option value="N">NO</option>
      		</select>
      	</td>
      	<th class="nobor wd10">신용카드연체대상상품여부</th>
      	<td class="nobor">
      		<select name="creditdelayyn" class="select">
      			<option value="">선택</option>
      			<option value="Y">YES</option>
      			<option value="N">NO</option>
      		</select>
      	</td>
      	<th class="nobor wd10">저원가성상품여부</th>
      	<td class="nobor">
      		<select name="lowcostyn" class="select">
      			<option value="">선택</option>
      			<option value="Y">YES</option>
      			<option value="N">NO</option>
      		</select>
      	</td>
      	<th class="nobor wd10">총여신대상구분</th>
      	<td class="nobor end">
      		<select name="loanyn" class="select">
              <option value="99">선택</option>
              <option value="0">NO</option>                                       
              <option value="1">YES</option>
              <option value="2">부동산PF</option>
              <option value="3">정책자금분류</option>
             </select>
		</td>
    </tr>      
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
    <tr id="tr2">
      	<th class="nobor wd10">PI이자대상구분</th>
      	<td class="nobor">
   		  <select name="piijayn" class="select">
             <option value="0">선택</option>
             <option value="1">YES</option>
             <option value="2">NO</option>
             <option value="3">평잔</option>
             <option value="4">이자</option>
           </select>
        </td>
      	<th class="nobor wd10">기준실적상품분류</th>                                      
      	<td class="nobor">
      		<select name="BasicProductCode" class="select">
      			<option value="">선택</option>
      		</select> 
      	</td>
      	<th class="nobor wd10">신규고정이하여신대상여부</th>
      	<td class="nobor">
      		<select name="LoanBelowYN" class="select">
      			<option value="">선택</option>
      			<option value="Y">YES</option>
      			<option value="N">NO</option>
      		</select>
      	</td>
      	<th class="nobor wd10">위험조정운용대상여부</th>
      	<td class="nobor">
      		<select name="ExpAdjYN" class="select">
      			<option value="">선택</option>
      			<option value="Y">YES</option>
      			<option value="N">NO</option>
      		</select>
      	</td>
      	<th class="nobor wd10">특정상품분류</th>
      	<td class="nobor end">
      		<select name="spsgcode" class="select">
      			<option value="">선택</option>
      			<option value="01">한도대출</option>
      		</select>
      	</td>
    </tr>  
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
    <tr id="tr4">
      	<th class="nobor wd10">디마케팅제외구분</th>
      	<td class="nobor">
      		<select name="dimagubun" class="select">
              <option value="">선택</option>
              <option value="0">미분류</option>
              <option value="1">서민금융</option>
              <option value="2">가계종통</option>
              <option value="3">신용카드</option>
              <option value="4">예금담보대출</option>
              <option value="5">기타</option>
            </select>
      	</td>
      	<th class="nobor wd10">소매여신구분</th>
      	<td class="nobor">
      		<select name="retaloangb" class="select">
              <option value="">선택</option>
              <option value="1">YES</option>
              <option value="0">NO</option>
            </select>
      	</td>
      	<td colspan="4"  class="nobor end"></td>
    </tr>  
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
    <tr id="tr3" style="display:none">
      	<th class="nobor wd10">수수료구분</th>
      	<td class="nobor end" colspan="4">
      		<select name="commissiongubun" class="select">
      			<option value=0>선택</option>
      		</select>
             <input type='hidden' name='h_commissiongubun'>
      	</td>
    </tr>
</table>
<div id="hiddenGridObj"></div>
      
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
var v_manager    = <%=manager%>;  // 성과 권한 체크
var v_inChk     = 0;              // 확정여부
var v_newyn     = '<%=newyn%>';   // 신규상품그룹여부
LoadPage();
selectcommit(1);
htm_title = '<%=htm_title%>';
// 신규상품코드등록을 위한 기준일자료생성 버튼 활성화
if(v_newyn == 'Y') {
	document.all.btn_newcode.style.display="";
	alert("신규 관리회계상품코드가 등록되었습니다.\n\n기준일 자료생성 이행후 KPI상품그룹코드를 등록해주세요");
} else document.all.btn_newcode.style.display="none";
   
</script>