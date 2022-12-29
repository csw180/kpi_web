var isInitBtnEnable = true;
var isInstBtnEnable = true;
var isMofyBtnEnable = false;
var isDelBrnEnable  = false;
var isExcelBtnEnable= true;
var UnitText;
/*---------------------------------------------------
  @기능 : 지정된 ComboBox에 해당 값을 선택시킨다.
 ---------------------------------------------------*/
function selectedBox(obj, value)
{
    var i=0;
    for(i=0; i<obj.options.length; i++)
    {
        if(obj.options[i].value==value)
        {
            obj.options[i].selected = true;
            break;
        }
    }
}

/*Sheet 기본 설정 */
function LoadPage(){

  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%",  getDefaultHeight($("#sheetObj")));      // 정보출력
  createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");   // 기본정보 (기준일, 명칭등)
  createIBSheet2(  document.getElementById("mtrhiddenGridObj"),"metrogbhiddenGrid", "200px", "400px");  // 광역금융본부 콤보박스정보
  createIBSheet2(  document.getElementById("hiddGridmonObj"),"hiddGridmon", "200px", "400px");  // 정보출력
  
  // Hidden GRID에 대한 속성정보 설정
   hiddenGrid.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   var hdnInfo    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var hdnHeaders = [ { Text:"HIDDEN", Align:"Center"} ];
   hiddenGrid.InitHeaders(hdnHeaders, hdnInfo);

   var hdnCols = [ {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
   hiddenGrid.InitColumns(hdnCols);
   hiddenGrid.SetVisible(0);
   hiddenGrid.SetEditable(0);

//metrogbhiddenGrid에 대한 속성정보 설정
   metrogbhiddenGrid.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   var mtrhdnInfo    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var mtrhdnHeaders = [ { Text:"HIDDEN", Align:"Center"} ];
   metrogbhiddenGrid.InitHeaders(mtrhdnHeaders, mtrhdnInfo);

   var mtrhdnCols = [ {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
   metrogbhiddenGrid.InitColumns(mtrhdnCols);
   metrogbhiddenGrid.SetVisible(0);
   metrogbhiddenGrid.SetEditable(0);

  // 상위 GRID에 대한 속성정보 설정
  // hiddGridmon에 대한 속성정보 설정
   hiddGridmon.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

   var hgmInfo    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var hgmHeaders = [ { Text:"점번호|점명|", Align:"Center"} ];
   hiddGridmon.InitHeaders(hgmHeaders, hgmInfo);

   var hgmCols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" } ];
    
   hiddGridmon.InitColumns(hgmCols);
   hiddGridmon.SetEditable(0);
   hiddGridmon.SetVisible(0);
    
  doAction("기준일");
  
  initGrid(); // 연체율 화면 그리드 초기화  
    
}

/*-----------------------------------------*/
/* @기능 : 해당 InputBox ReadOnly로 처리   */
/*-----------------------------------------*/
function toReadOnly(obj)
{
    obj.disabled = true;
    obj.style.background = "f8f8f8";       
    obj.value    = ""; 
}

/*-----------------------------------------*/
/* @기능 : 해당 InputBox ReadOnly 해제     */
/*-----------------------------------------*/        
function toReleaseReadOnly(obj)
{
    obj.disabled = false;
    obj.style.background = "ffffff";        
}

function changedColumnName()
{
    mySheet.SelectCell("1", "0");
}

function ComboValue(el)
{
    for ( ;el.options.length>1;) el.options.remove(1);
    for(i=1;i<=hiddenGrid.GetTotalRows();i++){
       var oOption=document.createElement("OPTION");
	   oOption.text=hiddenGrid.GetCellValue(i, 1);
	   oOption.value=hiddenGrid.GetCellValue(i, 0);
       el.options.add(oOption);
    }

}

function ComboValue1(el)
{
    for ( ;el.options.length>1;) el.options.remove(1);
    for(i=1;i<=metrogbhiddenGrid.GetTotalRows();i++){
       var oOption=document.createElement("OPTION");
	   oOption.text=metrogbhiddenGrid.GetCellValue(i, 1);
	   oOption.value=metrogbhiddenGrid.GetCellValue(i, 0);
       el.options.add(oOption);
    }

}

function selectmonth()
{    
	initGrid();  // 연체율 화면 그리드 초기화

    // 기준일 기준으로 광역금융본부 disabled 처리
    if (document.frm.baseday.value <= '20101231') {
        document.frm.metrogb.disabled = true;
    	document.frm.metrogb.value = 0;  // 전체로 기본 설정
    }
    else document.frm.metrogb.disabled = false;

	//allDelDataGrid(mySheet);
	
    // 최근 기준년월 가져오기
    basemonth=hiddGridmon.GetCellValue(1, 0);
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=7");
    metrogbhiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=49");
}

function selectpgcode()
{
    //allDelDataGrid(mySheet);
	showUnitText(UnitText);
	pgcode  = document.frm.pgcode.value;
    initGrid();
}

function selectsubchk()
{
    subChk      = document.frm.subChk.checked;
    baseday     = document.frm.baseday.value;
    pgcode      = document.frm.pgcode.value;

	if (subChk){
		mySheet.SetSumValue(0,"합 계");
   		mySheet.SetCellAlign(mySheet.HeaderRows(),0,"Center");
   		//합계행 병합
   		mySheet.SetMergeCell(mySheet.HeaderRows(), 0, 1,3);
	} else {
		mySheet.SetCellValue(mySheet.HeaderRows(),0,"")
		mySheet.SetSplitMergeCell(mySheet.HeaderRows(), 0, 1,3);
	}
    
    if (baseday >= '20220101') {    	   
	    if (subChk) { 									// 세부내역 체크 전         
			// 세부내역 체크 전
	    	// 상품판매
	    	mySheet.SetColHidden(9,0);
	    	mySheet.SetColHidden(10,0);
	    	mySheet.SetColHidden(11,0);
	    	//신규예금고객
	    	mySheet.SetColHidden(13,0);
	    	mySheet.SetColHidden(14,0);
	    	mySheet.SetColHidden(15,0);
	    	// 개인예수금(개인)
	    	mySheet.SetColHidden(18,0);
	    	mySheet.SetColHidden(19,0);
	    	mySheet.SetColHidden(20,0);
	    	mySheet.SetColHidden(21,0);
	    	mySheet.SetColHidden(22,0);
	    	mySheet.SetColHidden(23,0);
	    	mySheet.SetColHidden(24,0);
	    	mySheet.SetColHidden(25,0);
	    	// 개인저비용성예수금
	    	mySheet.SetColHidden(27,0);
	    	mySheet.SetColHidden(28,0);
	    	mySheet.SetColHidden(29,0);
	    	mySheet.SetColHidden(30,0);
	    	mySheet.SetColHidden(31,0);
	    	mySheet.SetColHidden(32,0);
	    	mySheet.SetColHidden(33,0);
	    	mySheet.SetColHidden(34,0);
	    	// 핵심예수금
	    	mySheet.SetColHidden(36,0);
	    	mySheet.SetColHidden(37,0);
	    	mySheet.SetColHidden(38,0);
	    	mySheet.SetColHidden(39,0);
	    	mySheet.SetColHidden(40,0);
	    	mySheet.SetColHidden(41,0);
	    	mySheet.SetColHidden(42,0);
	    	mySheet.SetColHidden(43,0);
	    	// 신규고객 여수신
	    	mySheet.SetColHidden(44,0);
	    	mySheet.SetColHidden(45,0);
	    	mySheet.SetColHidden(46,0);    		    		    		  
	     
	     } else {										
	     	// 세부내역 체크 후          	
	    	// 상품판매
	    	mySheet.SetColHidden(9,1);
	    	mySheet.SetColHidden(10,1);
	    	mySheet.SetColHidden(11,1);
	    	//신규예금고객
	    	mySheet.SetColHidden(13,1);
	    	mySheet.SetColHidden(14,1);
	    	mySheet.SetColHidden(15,1);
	    	// 개인예수금
	    	mySheet.SetColHidden(18,1);
	    	mySheet.SetColHidden(19,1);
	    	mySheet.SetColHidden(20,1);
	    	mySheet.SetColHidden(21,1);
	    	mySheet.SetColHidden(22,1);
	    	mySheet.SetColHidden(23,1);
	    	mySheet.SetColHidden(24,1);
	    	mySheet.SetColHidden(25,1);
	    	// 개인저비용성예수금
	    	mySheet.SetColHidden(27,1);
	    	mySheet.SetColHidden(28,1);
	    	mySheet.SetColHidden(29,1);
	    	mySheet.SetColHidden(30,1);
	    	mySheet.SetColHidden(31,1);
	    	mySheet.SetColHidden(32,1);
	    	mySheet.SetColHidden(33,1);
	    	mySheet.SetColHidden(34,1);
	    	// 핵심예수금
	    	mySheet.SetColHidden(36,1);
	    	mySheet.SetColHidden(37,1);
	    	mySheet.SetColHidden(38,1);
	    	mySheet.SetColHidden(39,1);
	    	mySheet.SetColHidden(40,1);
	    	mySheet.SetColHidden(41,1);
	    	mySheet.SetColHidden(42,1);
	    	mySheet.SetColHidden(43,1);
	    	// 신규고객 여수신
	    	mySheet.SetColHidden(44,1);
	    	mySheet.SetColHidden(45,1);
	    	mySheet.SetColHidden(46,1);	     		    		    		  
	            
		}   	
	}else if (baseday >= '20210701') {    	   
	    if (subChk) { 									// 세부내역 체크 전         
			// 세부내역 체크 전
	    	// 상품판매
	    	mySheet.SetColHidden(9,0);
	    	mySheet.SetColHidden(10,0);
	    	mySheet.SetColHidden(11,0);
	    	//신규예금고객
	    	mySheet.SetColHidden(13,0);
	    	mySheet.SetColHidden(14,0);
	    	mySheet.SetColHidden(15,0);
	    	// 개인예수금
	    	mySheet.SetColHidden(18,0);
	    	mySheet.SetColHidden(19,0);
	    	mySheet.SetColHidden(20,0);
	    	mySheet.SetColHidden(21,0);
	    	mySheet.SetColHidden(22,0);
	    	mySheet.SetColHidden(23,0);
	    	mySheet.SetColHidden(24,0);
	    	mySheet.SetColHidden(25,0);
	    	// 개인저비용성예수금
	    	mySheet.SetColHidden(27,0);
	    	mySheet.SetColHidden(28,0);
	    	mySheet.SetColHidden(29,0);
	    	mySheet.SetColHidden(30,0);
	    	mySheet.SetColHidden(31,0);
	    	mySheet.SetColHidden(32,0);
	    	mySheet.SetColHidden(33,0);
	    	mySheet.SetColHidden(34,0);
	    	// 신규고객 여수신
	    	mySheet.SetColHidden(35,0);
	    	mySheet.SetColHidden(36,0);
	    	mySheet.SetColHidden(37,0);
	     } else {										
	     	// 세부내역 체크 후          	
	    	// 상품판매
	    	mySheet.SetColHidden(9,1);
	    	mySheet.SetColHidden(10,1);
	    	mySheet.SetColHidden(11,1);
	    	//신규예금고객
	    	mySheet.SetColHidden(13,1);
	    	mySheet.SetColHidden(14,1);
	    	mySheet.SetColHidden(15,1);
	    	// 개인예수금
	    	mySheet.SetColHidden(18,1);
	    	mySheet.SetColHidden(19,1);
	    	mySheet.SetColHidden(20,1);
	    	mySheet.SetColHidden(21,1);
	    	mySheet.SetColHidden(22,1);
	    	mySheet.SetColHidden(23,1);
	    	mySheet.SetColHidden(24,1);
	    	mySheet.SetColHidden(25,1);
	    	// 개인저비용성예수금
	    	mySheet.SetColHidden(27,1);
	    	mySheet.SetColHidden(28,1);
	    	mySheet.SetColHidden(29,1);
	    	mySheet.SetColHidden(30,1);
	    	mySheet.SetColHidden(31,1);
	    	mySheet.SetColHidden(32,1);
	    	mySheet.SetColHidden(33,1);
	    	mySheet.SetColHidden(34,1);
	    	// 신규고객 여수신
	    	mySheet.SetColHidden(35,1);
	    	mySheet.SetColHidden(36,1);
	    	mySheet.SetColHidden(37,1);
		}   	
	}else if (baseday >= '20210101') {    	   
	    if (subChk) { 									// 세부내역 체크 전         
			// 세부내역 체크 전
	    	// 신규예금고객
	    	mySheet.SetColHidden(9,0);
	    	mySheet.SetColHidden(10,0);
	    	mySheet.SetColHidden(11,0);
	    	// 디지털고객
	    	mySheet.SetColHidden(14,0);
	    	mySheet.SetColHidden(15,0);
	    	mySheet.SetColHidden(16,0);
	    	mySheet.SetColHidden(17,0);
	    	mySheet.SetColHidden(18,0);
	    	mySheet.SetColHidden(19,0);
	    	mySheet.SetColHidden(20,0);
	    	mySheet.SetColHidden(21,0);
	    	//신규예금고객
	    	mySheet.SetColHidden(22,0);
	    	mySheet.SetColHidden(23,0);
	    	mySheet.SetColHidden(24,0);
	    	// 개인예수금
	    	mySheet.SetColHidden(27,0);
	    	mySheet.SetColHidden(28,0);
	    	mySheet.SetColHidden(29,0);
	    	mySheet.SetColHidden(30,0);
	    	mySheet.SetColHidden(31,0);
	    	mySheet.SetColHidden(32,0);
	    	mySheet.SetColHidden(33,0);
	    	mySheet.SetColHidden(34,0);
	    	// 개인저비용성예수금
	    	mySheet.SetColHidden(36,0);
	    	mySheet.SetColHidden(37,0);
	    	mySheet.SetColHidden(38,0);
	    	mySheet.SetColHidden(39,0);
	    	mySheet.SetColHidden(40,0);
	    	mySheet.SetColHidden(41,0);
	    	mySheet.SetColHidden(42,0);
	    	mySheet.SetColHidden(43,0);
	    	// 신규고객 여수신
	    	mySheet.SetColHidden(44,0);
	    	mySheet.SetColHidden(45,0);
	    	mySheet.SetColHidden(46,0);
	     } else {										
	     	// 세부내역 체크 후          	
	    	// 신규예금고객
	    	mySheet.SetColHidden(9,1);
	    	mySheet.SetColHidden(10,1);
	    	mySheet.SetColHidden(11,1);
	    	// 디지털고객
	    	mySheet.SetColHidden(14,1);
	    	mySheet.SetColHidden(15,1);
	    	mySheet.SetColHidden(16,1);
	    	mySheet.SetColHidden(17,1);
	    	mySheet.SetColHidden(18,1);
	    	mySheet.SetColHidden(19,1);
	    	mySheet.SetColHidden(20,1);
	    	mySheet.SetColHidden(21,1);
	    	//신규예금고객
	    	mySheet.SetColHidden(22,1);
	    	mySheet.SetColHidden(23,1);
	    	mySheet.SetColHidden(24,1);
	    	// 개인예수금
	    	mySheet.SetColHidden(27,1);
	    	mySheet.SetColHidden(28,1);
	    	mySheet.SetColHidden(29,1);
	    	mySheet.SetColHidden(30,1);
	    	mySheet.SetColHidden(31,1);
	    	mySheet.SetColHidden(32,1);
	    	mySheet.SetColHidden(33,1);
	    	mySheet.SetColHidden(34,1);
	    	// 개인저비용성예수금
	    	mySheet.SetColHidden(36,1);
	    	mySheet.SetColHidden(37,1);
	    	mySheet.SetColHidden(38,1);
	    	mySheet.SetColHidden(39,1);
	    	mySheet.SetColHidden(40,1);
	    	mySheet.SetColHidden(41,1);
	    	mySheet.SetColHidden(42,1);
	    	mySheet.SetColHidden(43,1);
	    	// 신규고객 여수신
	    	mySheet.SetColHidden(44,1);
	    	mySheet.SetColHidden(45,1);
	    	mySheet.SetColHidden(46,1);
		}   	
	}else if (baseday >= '20200701') {
	    if (subChk) { 								// 세부내역 체크 전          	
			/* -------- 영업점 기준 -------- */			// 세부내역 체크 전_영업점 (개인부지점장) 3367 (1)
	    	// 상품판매
	    	mySheet.SetColHidden(6,0);
	    	mySheet.SetColHidden(7,0);
	    	mySheet.SetColHidden(8,0);
	    	// 개인신규예수금고객
	    	mySheet.SetColHidden(11,0);
	    	mySheet.SetColHidden(12,0);
	    	mySheet.SetColHidden(13,0);
	    	// 개인예수금(반기평잔)
	    	mySheet.SetColHidden(18,0);
	    	mySheet.SetColHidden(19,0);
	    	mySheet.SetColHidden(20,0);
	    	mySheet.SetColHidden(21,0);
	    	// 개인예수금(순증잔액)
	    	mySheet.SetColHidden(22,0);
	    	mySheet.SetColHidden(23,0);
	    	mySheet.SetColHidden(24,0);
	    	mySheet.SetColHidden(25,0);
	    	// 기업예수금(반기평잔)
	    	mySheet.SetColHidden(28,0);
	    	mySheet.SetColHidden(29,0);
	    	mySheet.SetColHidden(30,0);
	    	mySheet.SetColHidden(31,0);
	    	// 기업예수금(순증잔액)
	    	mySheet.SetColHidden(32,0);
	    	mySheet.SetColHidden(33,0);
	    	mySheet.SetColHidden(34,0);
	    	mySheet.SetColHidden(35,0);
	    	// 개인저비용성예수금(반기평잔)
	    	mySheet.SetColHidden(38,0);
	    	mySheet.SetColHidden(39,0);
	    	mySheet.SetColHidden(40,0);
	    	mySheet.SetColHidden(41,0);
	    	// 개인저비용성예수금(월중평잔)
	    	mySheet.SetColHidden(42,0);
	    	mySheet.SetColHidden(43,0);
	    	mySheet.SetColHidden(44,0);
	    	mySheet.SetColHidden(45,0);
	    	// 개인대출금
	    	mySheet.SetColHidden(46,0);
	    	mySheet.SetColHidden(47,0);
	    	mySheet.SetColHidden(48,0);
	    	// 공제사업(신계약적립_누증)
	    	mySheet.SetColHidden(53,0);
	    	mySheet.SetColHidden(54,0);
	    	mySheet.SetColHidden(55,0);
	    	mySheet.SetColHidden(56,0);
	    	// 공제사업(신계약적립_조회)
	    	//mySheet.ColHidden(57)  = false;
	    	//mySheet.ColHidden(58)  = false;
	    	//mySheet.ColHidden(59)  = false;
	    	//mySheet.ColHidden(60)  = false;
	    	// 공제사업(신계약일시납)
	    	mySheet.SetColHidden(57,0);
	    	mySheet.SetColHidden(58,0);
	    	mySheet.SetColHidden(59,0);
	    	mySheet.SetColHidden(60,0);
	    	// 펀드사업(수탁고)
	    	mySheet.SetColHidden(61,0);
	    	mySheet.SetColHidden(62,0);
	    	mySheet.SetColHidden(63,0);
	    	mySheet.SetColHidden(64,0);
	    	// 펀드사업(적립식펀드)
	    	mySheet.SetColHidden(65,0);
	    	mySheet.SetColHidden(66,0);
	    	mySheet.SetColHidden(67,0);
	    	mySheet.SetColHidden(68,0);
	    	// 카드사업(신규유효회원)
	    	mySheet.SetColHidden(69,0);
	    	mySheet.SetColHidden(70,0);
	    	mySheet.SetColHidden(71,0);
	    	mySheet.SetColHidden(72,0);
	    	//카드사업(매출액)
	    	mySheet.SetColHidden(73,0);
	    	mySheet.SetColHidden(74,0);
	    	mySheet.SetColHidden(75,0);
	    	mySheet.SetColHidden(76,0);
	    	//신탁사업
	    	mySheet.SetColHidden(77,0);
	    	mySheet.SetColHidden(78,0);
	    	mySheet.SetColHidden(79,0);
	    	//가계여신신규금액
	    	mySheet.SetColHidden(82,0);
	    	mySheet.SetColHidden(83,0);
	    	mySheet.SetColHidden(84,0);
	    } else {									// 세부내역 체크 후
			/* -------- 영업점 기준 -------- */			// 세부내역 체크 후_영업점 (개인부지점장) 3367 (2)
	    	// 상품판매
	    	mySheet.SetColHidden(6,1);
	    	mySheet.SetColHidden(7,1);
	    	mySheet.SetColHidden(8,1);
	    	// 개인신규예수금고객
	    	mySheet.SetColHidden(11,1);
	    	mySheet.SetColHidden(12,1);
	    	mySheet.SetColHidden(13,1);
	    	// 개인예수금(반기평잔)
	    	mySheet.SetColHidden(18,1);
	    	mySheet.SetColHidden(19,1);
	    	mySheet.SetColHidden(20,1);
	    	mySheet.SetColHidden(21,1);
	    	// 개인예수금(순증잔액)
	    	mySheet.SetColHidden(22,1);
	    	mySheet.SetColHidden(23,1);
	    	mySheet.SetColHidden(24,1);
	    	mySheet.SetColHidden(25,1);
	    	// 기업예수금(반기평잔)
	    	mySheet.SetColHidden(28,1);
	    	mySheet.SetColHidden(29,1);
	    	mySheet.SetColHidden(30,1);
	    	mySheet.SetColHidden(31,1);
	    	// 기업예수금(순증잔액)
	    	mySheet.SetColHidden(32,1);
	    	mySheet.SetColHidden(33,1);
	    	mySheet.SetColHidden(34,1);
	    	mySheet.SetColHidden(35,1);
	    	// 개인저비용성예수금(반기평잔)
	    	mySheet.SetColHidden(38,1);
	    	mySheet.SetColHidden(39,1);
	    	mySheet.SetColHidden(40,1);
	    	mySheet.SetColHidden(41,1);
	    	// 개인저비용성예수금(월중평잔)
	    	mySheet.SetColHidden(42,1);
	    	mySheet.SetColHidden(43,1);
	    	mySheet.SetColHidden(44,1);
	    	mySheet.SetColHidden(45,1);
	    	// 개인대출금
	    	mySheet.SetColHidden(46,1);
	    	mySheet.SetColHidden(47,1);
	    	mySheet.SetColHidden(48,1);
	    	// 공제사업(신계약적립_누증)
	    	mySheet.SetColHidden(53,1);
	    	mySheet.SetColHidden(54,1);
	    	mySheet.SetColHidden(55,1);
	    	mySheet.SetColHidden(56,1);
	    	// 공제사업(신계약적립_조회)
	    	//mySheet.ColHidden(57)  = true;
	    	//mySheet.ColHidden(58)  = true;
	    	//mySheet.ColHidden(59)  = true;
	    	//mySheet.ColHidden(60)  = true;
	    	// 공제사업(신계약일시납)
	    	mySheet.SetColHidden(57,1);
	    	mySheet.SetColHidden(58,1);
	    	mySheet.SetColHidden(59,1);
	    	mySheet.SetColHidden(60,1);
	    	// 펀드사업(수탁고)
	    	mySheet.SetColHidden(61,1);
	    	mySheet.SetColHidden(62,1);
	    	mySheet.SetColHidden(63,1);
	    	mySheet.SetColHidden(64,1);
	    	// 펀드사업(적립식펀드)
	    	mySheet.SetColHidden(65,1);
	    	mySheet.SetColHidden(66,1);
	    	mySheet.SetColHidden(67,1);
	    	mySheet.SetColHidden(68,1);
	    	// 카드사업(신규유효회원)
	    	mySheet.SetColHidden(69,1);
	    	mySheet.SetColHidden(70,1);
	    	mySheet.SetColHidden(71,1);
	    	mySheet.SetColHidden(72,1);
	    	//카드사업(매출액)
	    	mySheet.SetColHidden(73,1);
	    	mySheet.SetColHidden(74,1);
	    	mySheet.SetColHidden(75,1);
	    	mySheet.SetColHidden(76,1);
	    	//신탁사업
	    	mySheet.SetColHidden(77,1);
	    	mySheet.SetColHidden(78,1);
	    	mySheet.SetColHidden(79,1);
	    	//가계여신신규금액
	    	mySheet.SetColHidden(82,1);
	    	mySheet.SetColHidden(83,1);
	    	mySheet.SetColHidden(84,1);
	 		}     	    
    } else {
	    if (subChk) { 								// 세부내역 체크 전          	
			/* -------- 영업점 기준 -------- */			// 세부내역 체크 전_영업점 (개인부지점장) 3367 (1)
	    	// 상품판매
	    	mySheet.SetColHidden(6,0);
	    	mySheet.SetColHidden(7,0);
	    	mySheet.SetColHidden(8,0);
	    	// 신규예수금고객
	    	mySheet.SetColHidden(11,0);
	    	mySheet.SetColHidden(12,0);
	    	mySheet.SetColHidden(13,0);
	    	// 개인예수금(반기평잔)
	    	mySheet.SetColHidden(18,0);
	    	mySheet.SetColHidden(19,0);
	    	mySheet.SetColHidden(20,0);
	    	mySheet.SetColHidden(21,0);
	    	// 개인예수금(순증잔액)
	    	mySheet.SetColHidden(22,0);
	    	mySheet.SetColHidden(23,0);
	    	mySheet.SetColHidden(24,0);
	    	mySheet.SetColHidden(25,0);
	    	// 기업예수금(반기평잔)
	    	mySheet.SetColHidden(28,0);
	    	mySheet.SetColHidden(29,0);
	    	mySheet.SetColHidden(30,0);
	    	mySheet.SetColHidden(31,0);
	    	// 기업예수금(순증잔액)
	    	mySheet.SetColHidden(32,0);
	    	mySheet.SetColHidden(33,0);
	    	mySheet.SetColHidden(34,0);
	    	mySheet.SetColHidden(35,0);
	    	// 개인저비용성예수금(반기평잔)
	    	mySheet.SetColHidden(38,0);
	    	mySheet.SetColHidden(39,0);
	    	mySheet.SetColHidden(40,0);
	    	mySheet.SetColHidden(41,0);
	    	// 개인저비용성예수금(월중평잔)
	    	mySheet.SetColHidden(42,0);
	    	mySheet.SetColHidden(43,0);
	    	mySheet.SetColHidden(44,0);
	    	mySheet.SetColHidden(45,0);
	    	// 개인대출금
	    	mySheet.SetColHidden(46,0);
	    	mySheet.SetColHidden(47,0);
	    	mySheet.SetColHidden(48,0);
	    	// 공제사업(신계약적립_누증)
	    	mySheet.SetColHidden(53,0);
	    	mySheet.SetColHidden(54,0);
	    	mySheet.SetColHidden(55,0);
	    	mySheet.SetColHidden(56,0);
	    	// 공제사업(신계약적립_조회)
	    	mySheet.SetColHidden(57,0);
	    	mySheet.SetColHidden(58,0);
	    	mySheet.SetColHidden(59,0);
	    	mySheet.SetColHidden(60,0);
	    	// 공제사업(신계약일시납)
	    	mySheet.SetColHidden(61,0);
	    	mySheet.SetColHidden(62,0);
	    	mySheet.SetColHidden(63,0);
	    	mySheet.SetColHidden(64,0);
	    	// 펀드사업(수탁고)
	    	mySheet.SetColHidden(65,0);
	    	mySheet.SetColHidden(66,0);
	    	mySheet.SetColHidden(67,0);
	    	mySheet.SetColHidden(68,0);
	    	// 펀드사업(적립식펀드)
	    	mySheet.SetColHidden(69,0);
	    	mySheet.SetColHidden(70,0);
	    	mySheet.SetColHidden(71,0);
	    	mySheet.SetColHidden(72,0);
	    	// 카드사업(신규유효회원)
	    	mySheet.SetColHidden(73,0);
	    	mySheet.SetColHidden(74,0);
	    	mySheet.SetColHidden(75,0);
	    	mySheet.SetColHidden(76,0);
	    	//카드사업(매출액)
	    	mySheet.SetColHidden(77,0);
	    	mySheet.SetColHidden(78,0);
	    	mySheet.SetColHidden(79,0);
	    	mySheet.SetColHidden(80,0);
	    	//가계여신신규금액
	    	mySheet.SetColHidden(81,0);
	    	mySheet.SetColHidden(82,0);
	    	mySheet.SetColHidden(83,0);
	    } else {									// 세부내역 체크 후
			/* -------- 영업점 기준 -------- */			// 세부내역 체크 후_영업점 (개인부지점장) 3367 (2)
	    	// 상품판매
	    	mySheet.SetColHidden(6,1);
	    	mySheet.SetColHidden(7,1);
	    	mySheet.SetColHidden(8,1);
	    	// 신규예수금고객
	    	mySheet.SetColHidden(11,1);
	    	mySheet.SetColHidden(12,1);
	    	mySheet.SetColHidden(13,1);
	    	// 개인예수금(반기평잔)
	    	mySheet.SetColHidden(18,1);
	    	mySheet.SetColHidden(19,1);
	    	mySheet.SetColHidden(20,1);
	    	mySheet.SetColHidden(21,1);
	    	// 개인예수금(순증잔액)
	    	mySheet.SetColHidden(22,1);
	    	mySheet.SetColHidden(23,1);
	    	mySheet.SetColHidden(24,1);
	    	mySheet.SetColHidden(25,1);
	    	// 기업예수금(반기평잔)
	    	mySheet.SetColHidden(28,1);
	    	mySheet.SetColHidden(29,1);
	    	mySheet.SetColHidden(30,1);
	    	mySheet.SetColHidden(31,1);
	    	// 기업예수금(순증잔액)
	    	mySheet.SetColHidden(32,1);
	    	mySheet.SetColHidden(33,1);
	    	mySheet.SetColHidden(34,1);
	    	mySheet.SetColHidden(35,1);
	    	// 개인저비용성예수금(반기평잔)
	    	mySheet.SetColHidden(38,1);
	    	mySheet.SetColHidden(39,1);
	    	mySheet.SetColHidden(40,1);
	    	mySheet.SetColHidden(41,1);
	    	// 개인저비용성예수금(월중평잔)
	    	mySheet.SetColHidden(42,1);
	    	mySheet.SetColHidden(43,1);
	    	mySheet.SetColHidden(44,1);
	    	mySheet.SetColHidden(45,1);
	    	// 개인대출금
	    	mySheet.SetColHidden(46,1);
	    	mySheet.SetColHidden(47,1);
	    	mySheet.SetColHidden(48,1);
	    	// 공제사업(신계약적립_누증)
	    	mySheet.SetColHidden(53,1);
	    	mySheet.SetColHidden(54,1);
	    	mySheet.SetColHidden(55,1);
	    	mySheet.SetColHidden(56,1);
	    	// 공제사업(신계약적립_조회)
	    	mySheet.SetColHidden(57,1);
	    	mySheet.SetColHidden(58,1);
	    	mySheet.SetColHidden(59,1);
	    	mySheet.SetColHidden(60,1);
	    	// 공제사업(신계약일시납)
	    	mySheet.SetColHidden(61,1);
	    	mySheet.SetColHidden(62,1);
	    	mySheet.SetColHidden(63,1);
	    	mySheet.SetColHidden(64,1);
	    	// 펀드사업(수탁고)
	    	mySheet.SetColHidden(65,1);
	    	mySheet.SetColHidden(66,1);
	    	mySheet.SetColHidden(67,1);
	    	mySheet.SetColHidden(68,1);
	    	// 펀드사업(적립식펀드)
	    	mySheet.SetColHidden(69,1);
	    	mySheet.SetColHidden(70,1);
	    	mySheet.SetColHidden(71,1);
	    	mySheet.SetColHidden(72,1);
	    	// 카드사업(신규유효회원)
	    	mySheet.SetColHidden(73,1);
	    	mySheet.SetColHidden(74,1);
	    	mySheet.SetColHidden(75,1);
	    	mySheet.SetColHidden(76,1);
	    	//카드사업(매출액)
	    	mySheet.SetColHidden(77,1);
	    	mySheet.SetColHidden(78,1);
	    	mySheet.SetColHidden(79,1);
	    	mySheet.SetColHidden(80,1);
	    	//가계여신신규금액
	    	mySheet.SetColHidden(81,1);
	    	mySheet.SetColHidden(82,1);
	    	mySheet.SetColHidden(83,1);
	 	} 
	}   

}

/* Sheet 각종 처리 */
function doAction(sAction)
{
    isSelected  = true;
    baseday     = document.frm.baseday.value;
    pgcode      = document.frm.pgcode.value;
    metrogb     = document.frm.metrogb.value;

    switch(sAction)
    {
        case "고정필드설정":
        	mySheet.SetFrozenCol(mySheet.MouseCol());
        	ufSetMergeCell(mySheet, mySheet.HeaderRows(), 0, 1,3);
        	break;
        case "고정필드해제":
        	mySheet.SetFrozenCol(0);
        	ufSetMergeCell(mySheet, mySheet.HeaderRows(), 0, 1,3);
        	break;
        case "기준일":           // 조회(상위 GRID)
            // 기준년월 정보 (최근 기준년월), superFlg는 성과담당자 권한을 갖는다 고로 가장 최근일자임.
            hiddGridmon.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&superFlg=Y"); 
            /*// 기준일자 정보
            if(isRoleEnable == '1') {
            	 // 전산정보부 및 성과 담당자
               hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2290.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=98");
            } else {
               hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2290.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=99");
            }*/
            break;
        case "조회":             // 조회(상위 GRID)
           //if(baseday >= '20210701' && baseday <= '20210914' ) {
           //   if(isRoleEnable != '1') { 
           //   	alert('화면 open전 일자입니다. 2021.09.15일 이후부터 조회해주세요.');
           //   	break;
           //   }	
           // } 
        
            mySheet.DoSearch("rpdy.scr.rpdy_scr_2290.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&metrogb="+metrogb); 
            //mySheet.FitSize(false, true);
            break;
        case "엑셀내려받기":    // 엑셀내려받기
            inqText       = new Array();
            inqText[0]    = new Array();
            inqText[0][0] = "기준일";
            inqText[0][1] = baseday;            
            inqText[1]    = new Array();
            inqText[1][0] = "PG명";
            inqText[1][1] = document.frm.pgcode.options[document.frm.pgcode.selectedIndex].text;
            inqText[2]    = new Array();
            inqText[2][0] = "광역금융본부";
            inqText[2][1] = document.frm.metrogb.options[document.frm.metrogb.selectedIndex].text;
            // 보안등급세팅
            seqLevel = document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[3]    = new Array();
                inqText[3][0] = "보안등급";
                inqText[3][1] = document.frm.Security_Level.value;
            }

            rExcVal = doExcel(mySheet, inqText, -1); //common.js 활용하여 excel 출력
            /*// 엑셀다운로드시 로그 저장
            if(rExcVal) {
               condition = "기준일="+baseday+";PG코드="+pgcode+";광역금융본부="+metrogb;
               hiddenGrid.DoSearch("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition);
            }*/
            break;      
    }
}

/*--------------------------------------------*/
/* @기능 : 선택된 기준년월에 따른 그리드 init */
/*--------------------------------------------*/        
function initGrid()
{
    baseday   = document.frm.baseday.value;    

/*
		if (baseday <= '20200630') setGrid2020();
    else setGrid2020H2(); */
	
	if      (baseday >= '20220101') setGrid2022();
	else if (baseday >= '20210701') setGrid2021H();
 	else if (baseday >= '20210101') setGrid2021();
	else if (baseday >= '20200701') setGrid2020H2();
    else setGrid2020();	
	

    //세부내역 체크에 따른 그리드 설정
    //selectsubchk(); 	
}


/*------------------------------------------*/
/* @기능 : 2022년도 상반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2022()
{
    pgcode  = document.frm.pgcode.value;
    baseday = document.frm.baseday.value;
    //mySheet.RemoveAll();
    mySheet.Reset();
  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%",  getDefaultHeight($("#sheetObj")));

    // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";

	strHeader0 = 
		//9
		 "점번호|점명|부지점장|PG명|팀구분\n(개인/기업A/기업B)|순위|소계|소관업무 합산|업무형 부지점장\n개인실적 합산|"
		//고객관계 8
		+"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
		+"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
		//성장성 27
		+"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|" 
		+"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|" 
		+"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|" 
		//개인실적 4
		+"부지점장 개인실적|부지점장 개인실적|부지점장 개인실적|부지점장 개인실적|"
		;    
		
	strHeader1 = 
        //9
		"점번호|점명|부지점장|PG명|팀구분\n(개인/기업A/기업B)|순위|소계|소관업무 합산|업무형 부지점장\n개인실적 합산|"
		//고객관계 8
		+"상품판매|상품판매|상품판매|상품판매|"
		+"신규예금고객(개인)|신규예금고객(개인)|신규예금고객(개인)|신규예금고객(개인)|"		    	       
		//성장성 28
		+"개인예수금(합산)|"   
		+"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"
		+"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"	
		+"개인저비용성예수금(합산)|"   
		+"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"
		+"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"	   	  	  
		+"핵심예수금(합산)|"   
		+"핵심예수금(반기평잔)|핵심예수금(반기평잔)|핵심예수금(반기평잔)|핵심예수금(반기평잔)|"
		+"핵심예수금(월중평잔)|핵심예수금(월중평잔)|핵심예수금(월중평잔)|핵심예수금(월중평잔)|"	  	  	  
		//개인실적 4						
		+"신규고객 여수신(개인)|신규고객 여수신(개인)|신규고객 여수신(개인)|신규고객 여수신(개인)|" 
		;
	
	strHeader2 = 
		//9
		"점번호|점명|부지점장|PG명|팀구분\n(개인/기업A/기업B)|순위|평점/배점| 평점/배점|평점/배점|"
		//고객관계 8
		+"목표|실적|달성률|평점/배점|"                // 4 상품판매
		+"목표|실적|달성률|평점/배점|"                // 4 신규예금고객
		//성장성 18
		+" 평점/배점|"					      	              // 1 개인예수금(합산)
		+"목표|실적|달성률|평점/배점|"			          // 4 개인예수금(반기평잔)
		+"목표|실적|달성률|평점/배점 |" 			        // 4 개인예수금(순증잔액)
		+" 평점/배점|"					      	              // 1 개인저비용성예수금(합산)
		+"목표|실적|달성률|평점/배점|"			          // 4 개인저비용성예수금(반기평잔)
		+"목표|실적|달성률|평점/배점 |" 			        // 4 개인저비용성예수금(순증잔액)	  	  
		+" 평점/배점|"					      	              // 1 핵심예수금(합산)
		+"목표|실적|달성률|평점/배점|"			          // 4 핵심예수금(반기평잔)
		+"목표|실적|달성률|평점/배점 |" 			        // 4 핵심예수금(순증잔액)	  	  	  
		//개인실적 4
		+"목표|실적|달성률|평점/배점|"                 // 4 신규고객 여수신	      
		;
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:9 } );
	
	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
	      { Text:strHeader1, Align:"Center"},
	      { Text:strHeader2, Align:"Center"} ];
	mySheet.InitHeaders(headers, info);
	
	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:120,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:90,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:110,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" } ];
                
	mySheet.InitColumns(cols);

	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetCountPosition(1); 
	//지원안함[check again] UnitText="백만원,건,%";
	UnitText = "백만원,건,%";
	showUnitText(UnitText);
	newSetActionMenu(mySheet,"엑셀내려받기");
}


/*------------------------------------------*/
/* @기능 : 2021년도 하반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2021H()
{
  //pgcode  = document.frm.pgcode.value;
  baseday = document.frm.baseday.value;
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%",  getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";

	strHeader0 =  
	  //9
	   "점번호|점명|부지점장|PG명|팀구분\n(개인/기업A/기업B)|순위|소계|소관업무 합산|업무형 부지점장\n개인실적 합산|"
	  //고객관계 8
	  +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
	  +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
	  //성장성 18
	  +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|" 
	  +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|" 
	  //개인실적 4
	  +"부지점장 개인실적|부지점장 개인실적|부지점장 개인실적|부지점장 개인실적|"
	  ;    
		
	strHeader1 =  
	  //9
	   "점번호|점명|부지점장|PG명|팀구분\n(개인/기업A/기업B)|순위|소계|소관업무 합산|업무형 부지점장\n개인실적 합산|"
	  //고객관계 8
	  +"상품판매|상품판매|상품판매|상품판매|"
	  +"신규예금고객|신규예금고객|신규예금고객|신규예금고객|"		    	       
	  //성장성 18
	  +"개인예수금(합산)|"   
	  +"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"
	  +"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"	
	  +"개인저비용성예수금(합산)|"   
	  +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"
	  +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"	   	  
	  //개인실적 4						
	  +"신규고객 여수신|신규고객 여수신|신규고객 여수신|신규고객 여수신|" 
	  ;
	
	strHeader2 =  
	  //9
	   "점번호|점명|부지점장|PG명|팀구분\n(개인/기업A/기업B)|순위|평점/배점| 평점/배점|평점/배점|"
	  //고객관계 8
		+"목표|실적|달성률|평점/배점|"                // 4 상품판매
	  +"목표|실적|달성률| 평점/배점|"                // 4 신규예금고객
	  //성장성 18
	  +"평점/배점|"					      	              // 1 개인예수금(합산)
	  +"목표|실적|달성률| 평점/배점|"			          // 4 개인예수금(반기평잔)
	  +"목표|실적|달성률|평점/배점 |" 			        // 4 개인예수금(순증잔액)
	  +" 평점/배점|"					      	              // 1 개인저비용성예수금(합산)
	  +"목표|실적|달성률|평점/배점|"			          // 4 개인저비용성예수금(반기평잔)
	  +"목표|실적|달성률|평점/배점 |" 			        // 4 개인저비용성예수금(순증잔액)	  
	  //개인실적 4
	  +"목표|실적|달성률|평점/배점|"                 // 4 신규고객 여수신	      
	  ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:9 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:120,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:110,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:120,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetSplitMergeCell(2,12);
   mySheet.SetSplitMergeCell(2,17);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,건,%";
   UnitText = "백만원,건,%";
   showUnitText(UnitText);
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*------------------------------------------*/
/* @기능 : 2021년도 상반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2021()
{
  //pgcode  = document.frm.pgcode.value;
  baseday = document.frm.baseday.value;
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%",  getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";

	strHeader0 =  
	  //9
	   "점번호|점명|부지점장|PG명|팀구분\n(개인/기업A/기업B)|순위|소계|소관업무 합산|업무형 부지점장\n개인실적 합산|"
	  //고객관계 17
	  +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
	  +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
	  +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
	  +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
	  +"고 객 관 계|"
	  //성장성 18
	  +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|" 
	  +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|" 
	  //개인실적 4
	  +"부지점장 개인실적|부지점장 개인실적|부지점장 개인실적|부지점장 개인실적|"
	  ;    
		
	strHeader1 =  
	  //9
	   "점번호|점명|부지점장|PG명|팀구분\n(개인/기업A/기업B)|순위|소계|소관업무 합산|업무형 부지점장\n개인실적 합산|"
	  //고객관계 17
	  +"상품판매|상품판매|상품판매|상품판매|"
	  +"디지털고객(합산)|"
	  +"디지털고객(신규고객수)|디지털고객(신규고객수)|디지털고객(신규고객수)|디지털고객(신규고객수)|"
	  +"디지털고객(신규비이자고객수)|디지털고객(신규비이자고객수)|디지털고객(신규비이자고객수)|디지털고객(신규비이자고객수)|"
	  +"신규예금고객|신규예금고객|신규예금고객|신규예금고객|"		    	       
	  //성장성 18
	  +"개인예수금(합산)|"   
	  +"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"
	  +"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"	
	  +"개인저비용성예수금(합산)|"   
	  +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"
	  +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"	   	  
	  //개인실적 4						
	  +"신규고객 여수신|신규고객 여수신|신규고객 여수신|신규고객 여수신|" 
	  ;
	
	strHeader2 =  
	  //9
	   "점번호|점명|부지점장|PG명|팀구분\n(개인/기업A/기업B)|순위|평점/배점| 평점/배점|평점/배점|"
	  //고객관계 17
		+"목표|실적|달성률|평점/배점|"               // 4 상품판매
	  +" 평점/배점|"                          // 1 디지털고객(합산)
	  +"목표|실적|달성률|평점/배점|"               // 4 디지털고객(신규고객수)
	  +"목표|실적|달성률|평점/배점|"               // 4 디지털고객(신규비이자고객수)
	  +"목표|실적|달성률|평점/배점|"               // 4 신규예금고객
	  //성장성 18
	  +" 평점/배점|"					      	        // 1 개인예수금(합산)
	  +"목표|실적|달성률|평점/배점|"			          // 4 개인예수금(반기평잔)
	  +"목표|실적|달성률|평점/배점 |" 			        // 4 개인예수금(순증잔액)
	  +"평점/배점 |"					      	        // 1 개인저비용성예수금(합산)
	  +"목표|실적|달성률|평점/배점|"			          // 4 개인저비용성예수금(반기평잔)
	  +"목표|실적|달성률|평점/배점 |" 			        // 4 개인저비용성예수금(순증잔액)	  
	  //개인실적 4
	  +"목표|실적|달성률|평점/배점|"               // 4 신규고객 여수신	      
	  ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:9 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:120,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:110,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetSplitMergeCell(2,26);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,건,%";
   UnitText = "백만원,건,%";
   showUnitText(UnitText);
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*------------------------------------------*/
/* @기능 : 2020년도 하반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2020H2()
{
  //pgcode  = document.frm.pgcode.value;
  baseday = document.frm.baseday.value;
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";

	strHeader0 = 
	  //6
	   "점번호|점명|부지점장|PG명|합산실적|그룹내\n순위|"
	  //고객관계 10
	  +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
	  //성장성 35
	  +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|" 
	  +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
	  +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
	  +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
	  //비이자 30
	  +"비이자|비이자|비이자|비이자|비이자|비이자|비이자|비이자|비이자|비이자|"            
	  +"비이자|비이자|비이자|비이자|비이자|비이자|비이자|비이자|비이자|비이자|"
	  +"비이자|비이자|비이자|비이자|비이자|비이자|비이자|비이자|비이자|비이자|비이자|"
	  //개인실적 5
	  +"개인실적|개인실적|개인실적|개인실적|개인실적|"            
	  ;    
		
	strHeader1 =  
	  //6
	   "점번호|점명|부지점장|PG명|합산실적|그룹내\n순위|"
	  //고객관계 10
	  +"상품판매|상품판매|상품판매|상품판매|상품판매|개인 신규예수금 고객|개인 신규예수금 고객|개인 신규예수금 고객|개인 신규예수금 고객|개인 신규예수금 고객|"          
	  //성장성 35
	  +"개인예수금(합산)|개인예수금(합산)|" 
	  +"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"                               
	  +"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"  
	  +"기업예수금(합산)|기업예수금(합산)|"                                     
	  +"기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|"                                 
	  +"기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|"	
	  +"개인저비용성예수금(합산)|개인저비용성예수금(합산)|"                                             
	  +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"  
	  +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"
	  +"개인 대출금|개인 대출금|개인 대출금|개인 대출금|개인 대출금|"	
	  //비이자 31 														 
	  +"공제/펀드/카드|공제/펀드/카드|" 
	  +"공제사업(신계약적립_누증)|공제사업(신계약적립_누증)|공제사업(신계약적립_누증)|공제사업(신계약적립_누증)|" 
	  //+"공제사업(신계약적립_초회)|공제사업(신계약적립_초회)|공제사업(신계약적립_초회)|공제사업(신계약적립_초회)|" 
	  +"공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|" 
	  +"펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|" 
	  +"펀드사업(적립식펀드)|펀드사업(적립식펀드)|펀드사업(적립식펀드)|펀드사업(적립식펀드)|" 
	  +"카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|" 
	  +"카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|"     
	  +"신탁사업|신탁사업|신탁사업|신탁사업|신탁사업|"
	  //개인실적 5
	  +"가계여신신규금액|가계여신신규금액|가계여신신규금액|가계여신신규금액|가계여신신규금액|"                                     
	  ;
	
	strHeader2 =  
	  //6
	   "점번호|점명|부지점장|PG명|합산실적|그룹내\n순위|"
	  //고객관계 10
	  +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 상품판매
	  +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인신규예수금고객
	  //성장성 35
	  +"평점/배점|그룹내순위|"					      	      // 2 개인예수금(합산)
	  +"목표|실적|달성률|평점/배점|"			              // 4 개인예수금(반기평잔)
	  +"목표|실적|달성률|평점/배점 |" 			              // 4 개인예수금(순증잔액)
	  +"평점/배점|그룹내순위|"					      	      // 2 기업예수금(합산)
	  +"목표|실적|달성률|평점/배점|" 			              // 4 기업예수금(반기평잔)
	  +"목표|실적|달성률|평점/배점 |"            			  // 4 기업예수금(순증잔액)
	  +"평점/배점|그룹내순위|"					      	      // 2 개인저비용성예수금
	  +"목표|실적|달성률|평점/배점|"		            	  // 4 개인저비용성예수금(반기평잔)
	  +"목표|실적|달성률|평점/배점|"        			      // 4 개인저비용성예수금(월중평잔)
	  +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인대출금	      
	  //비이자 30
	  +"평점/배점|그룹내순위|"					      	      // 2 공제펀드카드
	  +"목표|실적|달성률|평점/배점|"			              // 4 공제사업(신계약적립_누증)
	  //+"목표|실적|달성률|평점/배점|" 			              // 4 공제사업(신계약적립_초회)
	  +"목표|실적|달성률|평점/배점|"			              // 4 공제사업(신계약일시납)
	  +"목표|실적|달성률|평점/배점|" 			              // 4 펀드사업(수탁고)
	  +"목표|실적|달성률|평점/배점|"			              // 4 펀드사업(적립식펀드)
	  +"목표|실적|달성률|평점/배점|" 			              // 4 카드사업(신규유표회원)
	  +"목표|실적|달성률|평점/배점|"			              // 4 카드사업(매출액)
	  +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신탁사업	      
	  //개인실적 5
	  +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 가계여신신규금액	      
	  ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,천미불,건,%";
   UnitText = "백만원,천미불,건,%";
   showUnitText(UnitText);
   newSetActionMenu(mySheet,"엑셀내려받기");
}


/*------------------------------------------*/
/* @기능 : 2020년도 상반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2020()
{
  //pgcode  = document.frm.pgcode.value;
  baseday = document.frm.baseday.value;
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";

	strHeader0 =  
	  //6
	   "점번호|점명|부지점장|PG명|합산실적|그룹내\n순위|"
	  //고객관계 10
	  +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
	  //성장성 35
	  +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|" 
	  +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
	  +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
	  +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
	  //비이자 30
	  +"비이자|비이자|비이자|비이자|비이자|비이자|비이자|비이자|비이자|비이자|"            
	  +"비이자|비이자|비이자|비이자|비이자|비이자|비이자|비이자|비이자|비이자|"
	  +"비이자|비이자|비이자|비이자|비이자|비이자|비이자|비이자|비이자|비이자|"
	  //개인실적 5
	  +"개인실적|개인실적|개인실적|개인실적|개인실적|"            
	  ;    
		
	strHeader1 =  
	  //6
	   "점번호|점명|부지점장|PG명|합산실적|그룹내\n순위|"
	  //고객관계 10
	  +"상품판매|상품판매|상품판매|상품판매|상품판매|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|"          
	  //성장성 35
	  +"개인예수금(합산)|개인예수금(합산)|" 
	  +"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"                               
	  +"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"  
	  +"기업예수금(합산)|기업예수금(합산)|"                                     
	  +"기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|"                                 
	  +"기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|"	
	  +"개인저비용성예수금(합산)|개인저비용성예수금(합산)|"                                             
	  +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"  
	  +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"
	  +"개인 대출금|개인 대출금|개인 대출금|개인 대출금|개인 대출금|"	
	  //비이자 30 														 
	  +"공제/펀드/카드|공제/펀드/카드|" 
	  +"공제사업(신계약적립_누증)|공제사업(신계약적립_누증)|공제사업(신계약적립_누증)|공제사업(신계약적립_누증)|" 
	  +"공제사업(신계약적립_초회)|공제사업(신계약적립_초회)|공제사업(신계약적립_초회)|공제사업(신계약적립_초회)|" 
	  +"공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|" 
	  +"펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|" 
	  +"펀드사업(적립식펀드)|펀드사업(적립식펀드)|펀드사업(적립식펀드)|펀드사업(적립식펀드)|" 
	  +"카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|" 
	  +"카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|"     
	  //개인실적 5
	  +"가계여신신규금액|가계여신신규금액|가계여신신규금액|가계여신신규금액|가계여신신규금액|"                                     
	  ;
	
	strHeader2 =  
	  //6
	   "점번호|점명|부지점장|PG명|합산실적|그룹내\n순위|"
	  //고객관계 10
	  +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 상품판매
	  +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신규예수금고객
	  //성장성 35
	  +"평점/배점|그룹내순위|"					      	      // 2 개인예수금(합산)
	  +"목표|실적|달성률|평점/배점|"			              // 4 개인예수금(반기평잔)
	  +"목표|실적|달성률|평점/배점 |" 			              // 4 개인예수금(순증잔액)
	  +"평점/배점|그룹내순위|"					      	      // 2 기업예수금(합산)
	  +"목표|실적|달성률|평점/배점|" 			              // 4 기업예수금(반기평잔)
	  +"목표|실적|달성률|평점/배점 |"            			  // 4 기업예수금(순증잔액)
	  +"평점/배점|그룹내순위|"					      	      // 2 개인저비용성예수금
	  +"목표|실적|달성률|평점/배점|"		            	  // 4 개인저비용성예수금(반기평잔)
	  +"목표|실적|달성률|평점/배점|"        			      // 4 개인저비용성예수금(월중평잔)
	  +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인대출금	      
	  //비이자 30
	  +"평점/배점|그룹내순위|"					      	      // 2 공제펀드카드
	  +"목표|실적|달성률|평점/배점|"			              // 4 공제사업(신계약적립_누증)
	  +"목표|실적|달성률|평점/배점|" 			              // 4 공제사업(신계약적립_초회)
	  +"목표|실적|달성률|평점/배점|"			              // 4 공제사업(신계약일시납)
	  +"목표|실적|달성률|평점/배점|" 			              // 4 펀드사업(수탁고)
	  +"목표|실적|달성률|평점/배점|"			              // 4 펀드사업(적립식펀드)
	  +"목표|실적|달성률|평점/배점|" 			              // 4 카드사업(신규유표회원)
	  +"목표|실적|달성률|평점/배점|"			              // 4 카드사업(매출액)
	  //개인실적 5
	  +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 가계여신신규금액	      
	  ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,천미불,건,%";
   UnitText = "백만원,천미불,건,%";
   showUnitText(UnitText);
   newSetActionMenu(mySheet,"엑셀내려받기");
}


