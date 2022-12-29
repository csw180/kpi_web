var isInitBtnEnable = true;
var isInstBtnEnable = true;
var isMofyBtnEnable = false;
var isDelBrnEnable  = false;
var isExcelBtnEnable= true;

//typeTime("js load start");

function typeTime(i) {
	var d = new Date();
	console.log(i + " : " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds())
}

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
	
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));      // 정보출력
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
  

  //initGrid(); // 연체율 화면 그리드 초기화  
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
	//allDelDataGrid(mySheet);
	
	pgcode=0;
	//document.frm.subChk.value = false;
    initGrid();  // 연체율 화면 그리드 초기화

    // 기준일 기준으로 광역금융본부 disabled 처리
    if (document.frm.baseday.value <= '20101231') {
        document.frm.metrogb.disabled = true;
    	document.frm.metrogb.value = 0;  // 전체로 기본 설정
    }
    else document.frm.metrogb.disabled = false;

	

    // 최근 기준년월 가져오기
    basemonth=hiddGridmon.GetCellValue(1, 0);
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=7");
    metrogbhiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=49");
	
}

function selectpgcode()
{
    //allDelDataGrid(mySheet);
	pgcode    = document.frm.pgcode.value;
    initGrid();
}

function selectsubchk()
{
    subChk      = document.frm.subChk.checked;
    baseday     = document.frm.baseday.value;
    pgcode      = document.frm.pgcode.value;


/*
	if (subChk){
		mySheet.SetSumValue(0,"합 계");
   		mySheet.SetCellAlign(mySheet.HeaderRows(),0,"Center");
   		//합계행 병합
   		mySheet.SetMergeCell(mySheet.HeaderRows(), 0, 1,3);
	} else {
		mySheet.SetCellValue(mySheet.HeaderRows(),0,"")
		mySheet.SetSplitMergeCell(mySheet.HeaderRows(), 0, 1,3);
	}
	*/
	
	//typeTime("selectsubchk start11");
	//console.log("subChk : " + subChk);

		if (baseday >= '20220101') {
			//typeTime("selectsubchk start22");
			if (subChk) { 		    
				 /* -------- 영업점 기준 -------- */			// 세부내역 체크 전_영업점
				 // 상품판매
				 mySheet.SetColHidden(5,0);
				 mySheet.SetColHidden(6,0);
				 mySheet.SetColHidden(7,0);
				 // 개인신규예수금고객
				 mySheet.SetColHidden(10,0);
				 mySheet.SetColHidden(11,0);
				 mySheet.SetColHidden(12,0);
				 // 기업신규예수금고객
				 mySheet.SetColHidden(15,0);
				 mySheet.SetColHidden(16,0);
				 mySheet.SetColHidden(17,0);
				 // 개인예수금(반기평잔)
				 mySheet.SetColHidden(20,0);
				 mySheet.SetColHidden(21,0);
				 mySheet.SetColHidden(22,0);
				 // 개인예수금(순증잔액)
				 mySheet.SetColHidden(25,0);
				 mySheet.SetColHidden(26,0);
				 mySheet.SetColHidden(27,0);
				 // 기업예수금(반기평잔)
				 mySheet.SetColHidden(30,0);
				 mySheet.SetColHidden(31,0);
				 mySheet.SetColHidden(32,0);
				 // 기업예수금(순증잔액)
				 mySheet.SetColHidden(35,0);
				 mySheet.SetColHidden(36,0);
				 mySheet.SetColHidden(37,0);
				 // 개인저비용성예수금(반기평잔)
				 mySheet.SetColHidden(40,0);
				 mySheet.SetColHidden(41,0);
				 mySheet.SetColHidden(42,0);
				 // 개인저비용성예수금(월중평잔)
				 mySheet.SetColHidden(45,0);
				 mySheet.SetColHidden(46,0);
				 mySheet.SetColHidden(47,0);
				 // 기업저비용성예수금(반기평잔)
				 mySheet.SetColHidden(50,0);
				 mySheet.SetColHidden(51,0);
				 mySheet.SetColHidden(52,0);
				 // 기업저비용성예수금(월중평잔)
				 mySheet.SetColHidden(55,0);
				 mySheet.SetColHidden(56,0);
				 mySheet.SetColHidden(57,0);
				 // 핵심예수금(반기평잔)
				 mySheet.SetColHidden(60,0);
				 mySheet.SetColHidden(61,0);
				 mySheet.SetColHidden(62,0);
				 // 핵심예수금(월중평잔)
				 mySheet.SetColHidden(65,0);
				 mySheet.SetColHidden(66,0);
				 mySheet.SetColHidden(67,0);
				 // 대출금(순증잔액)
				 mySheet.SetColHidden(70,0);
				 mySheet.SetColHidden(71,0);
				 mySheet.SetColHidden(72,0);
				 // 카드사업(전체매출액)
				 mySheet.SetColHidden(75,0);
				 mySheet.SetColHidden(76,0);
				 mySheet.SetColHidden(77,0);
				 // 카드사업(유효회원)
				 mySheet.SetColHidden(80,0);
				 mySheet.SetColHidden(81,0);
				 mySheet.SetColHidden(82,0);
				 //  신탁사업(특정금전보수)
				 mySheet.SetColHidden(85,0);
				 mySheet.SetColHidden(86,0);
				 mySheet.SetColHidden(87,0);
				 // 신탁사업(부동산보수)
				 mySheet.SetColHidden(90,0);
				 mySheet.SetColHidden(91,0);
				 mySheet.SetColHidden(92,0);
				 // 공제사업(환산공제료)
				 mySheet.SetColHidden(95,0);
				 mySheet.SetColHidden(96,0);
				 mySheet.SetColHidden(97,0);
				 // 펀드사업(이익)
				 mySheet.SetColHidden(100,0);
				 mySheet.SetColHidden(101,0);
				 mySheet.SetColHidden(102,0);
				 // 펀드사업(잔고원금)
				 mySheet.SetColHidden(105,0);
				 mySheet.SetColHidden(106,0);
				 mySheet.SetColHidden(107,0);
				 // 펀드사업(고객수)
				 mySheet.SetColHidden(110,0);
				 mySheet.SetColHidden(111,0);
				 mySheet.SetColHidden(112,0);
				 // 연체율
				 mySheet.SetColHidden(115,0);
				 mySheet.SetColHidden(116,0);
				 mySheet.SetColHidden(117,0);
				 // 개인고객수증대
				 mySheet.SetColHidden(120,0);
				 mySheet.SetColHidden(121,0);
				 mySheet.SetColHidden(122,0);
				 // 기업고객수증대
				 mySheet.SetColHidden(125,0);
				 mySheet.SetColHidden(126,0);
				 mySheet.SetColHidden(127,0); 						 		 		 		 
  			} else {
				 /* -------- 영업점 기준 -------- */		// 세부내역 체크 후_영업점
				//typeTime("selectsubchk start3311");
				 // 상품판매
				 mySheet.SetColHidden(5,1);
				 mySheet.SetColHidden(6,1);
				 mySheet.SetColHidden(7,1);
				 // 개인신규예수금고객
				 mySheet.SetColHidden(10,1);
				 mySheet.SetColHidden(11,1);
				 mySheet.SetColHidden(12,1);
				 // 기업신규예수금고객
				 mySheet.SetColHidden(15,1);
				 mySheet.SetColHidden(16,1);
				 mySheet.SetColHidden(17,1);
				 // 개인예수금(반기평잔)
				 mySheet.SetColHidden(20,1);
				 mySheet.SetColHidden(21,1);
				 mySheet.SetColHidden(22,1);
				 // 개인예수금(순증잔액)
				 mySheet.SetColHidden(25,1);
				 mySheet.SetColHidden(26,1);
				 mySheet.SetColHidden(27,1);
				 // 기업예수금(반기평잔)
				 mySheet.SetColHidden(30,1);
				 mySheet.SetColHidden(31,1);
				 mySheet.SetColHidden(32,1);
				 // 기업예수금(순증잔액)
				 mySheet.SetColHidden(35,1);
				 mySheet.SetColHidden(36,1);
				 mySheet.SetColHidden(37,1);
				 // 개인저비용성예수금(반기평잔)
				 mySheet.SetColHidden(40,1);
				 mySheet.SetColHidden(41,1);
				 mySheet.SetColHidden(42,1);
				//typeTime("selectsubchk start3322");
				 // 개인저비용성예수금(월중평잔)
				 mySheet.SetColHidden(45,1);
				 mySheet.SetColHidden(46,1);
				 mySheet.SetColHidden(47,1);
				 // 기업저비용성예수금(반기평잔)
				 mySheet.SetColHidden(50,1);
				 mySheet.SetColHidden(51,1);
				 mySheet.SetColHidden(52,1);
				 // 기업저비용성예수금(월중평잔)
				 mySheet.SetColHidden(55,1);
				 mySheet.SetColHidden(56,1);
				 mySheet.SetColHidden(57,1);
				 // 핵심예수금(반기평잔)
				 mySheet.SetColHidden(60,1);
				 mySheet.SetColHidden(61,1);
				 mySheet.SetColHidden(62,1);
				 // 핵심예수금(월중평잔)
				 mySheet.SetColHidden(65,1);
				 mySheet.SetColHidden(66,1);
				 mySheet.SetColHidden(67,1);
				 // 대출금(순증잔액)
				 mySheet.SetColHidden(70,1);
				 mySheet.SetColHidden(71,1);
				 mySheet.SetColHidden(72,1);
				 // 카드사업(전체매출액)
				 mySheet.SetColHidden(75,1);
				 mySheet.SetColHidden(76,1);
				 mySheet.SetColHidden(77,1);
				 // 카드사업(유효회원)
				 mySheet.SetColHidden(80,1);
				 mySheet.SetColHidden(81,1);
				 mySheet.SetColHidden(82,1);
				 //  신탁사업(특정금전보수)
				 mySheet.SetColHidden(85,1);
				 mySheet.SetColHidden(86,1);
				 mySheet.SetColHidden(87,1);
				 // 신탁사업(부동산보수)
				 mySheet.SetColHidden(90,1);
				 mySheet.SetColHidden(91,1);
				 mySheet.SetColHidden(92,1);
				 //typeTime("selectsubchk start3333");
				 // 공제사업(환산공제료)
				 mySheet.SetColHidden(95,1);
				 mySheet.SetColHidden(96,1);
				 mySheet.SetColHidden(97,1);
				 // 펀드사업(이익)
				 mySheet.SetColHidden(100,1);
				 mySheet.SetColHidden(101,1);
				 mySheet.SetColHidden(102,1);
				 // 펀드사업(잔고원금)
				 mySheet.SetColHidden(105,1);
				 mySheet.SetColHidden(106,1);
				 mySheet.SetColHidden(107,1);
				 // 펀드사업(고객수)
				 mySheet.SetColHidden(110,1);
				 mySheet.SetColHidden(111,1);
				 mySheet.SetColHidden(112,1);
				 // 연체율
				 mySheet.SetColHidden(115,1);
				 mySheet.SetColHidden(116,1);
				 mySheet.SetColHidden(117,1);
				 // 개인고객수증대
				 mySheet.SetColHidden(120,1);
				 mySheet.SetColHidden(121,1);
				 mySheet.SetColHidden(122,1);
				 //typeTime("selectsubchk start3344");
				 // 기업고객수증대
				 mySheet.SetColHidden(125,1);
				 mySheet.SetColHidden(126,1);
				 mySheet.SetColHidden(127,1);						  	          	       	
  		 	}  
			//typeTime("selectsubchk start33");  
    
		}else if (baseday >= '20211001') {
			if (subChk) { 		    
				 /* -------- 영업점 기준 -------- */			// 세부내역 체크 전_영업점
				 // 상품판매
				 mySheet.SetColHidden(5,0);
				 mySheet.SetColHidden(6,0);
				 mySheet.SetColHidden(7,0);

				 // 디지털 신규비이자고객
				 mySheet.SetColHidden(10,0);
				 mySheet.SetColHidden(11,0);
				 mySheet.SetColHidden(12,0);

				 // 신규 예수금고객
				 mySheet.SetColHidden(15,0);
				 mySheet.SetColHidden(16,0);
				 mySheet.SetColHidden(17,0);

				 // 신규 우량고객
				 mySheet.SetColHidden(20,0);
				 mySheet.SetColHidden(21,0);
				 mySheet.SetColHidden(22,0);

				 // 개인예수금(반기평잔)
				 mySheet.SetColHidden(25,0);
				 mySheet.SetColHidden(26,0);
				 mySheet.SetColHidden(27,0);

				 // 개인예수금(순증잔액)
				 mySheet.SetColHidden(30,0);
				 mySheet.SetColHidden(31,0);
				 mySheet.SetColHidden(32,0);

				 // 기업예수금(반기평잔)
				 mySheet.SetColHidden(35,0);
				 mySheet.SetColHidden(36,0);
				 mySheet.SetColHidden(37,0);

				 // 기업예수금(순증잔액)
				 mySheet.SetColHidden(40,0);
				 mySheet.SetColHidden(41,0);
				 mySheet.SetColHidden(42,0);

				 // 개인저비용성예수금(반기평잔)
				 mySheet.SetColHidden(45,0);
				 mySheet.SetColHidden(46,0);
				 mySheet.SetColHidden(47,0);

				 // 개인저비용성예수금(월중평잔)
				 mySheet.SetColHidden(50,0);
				 mySheet.SetColHidden(51,0);
				 mySheet.SetColHidden(52,0);
            
				 // 기업저비용성예수금(반기평잔)
				 mySheet.SetColHidden(55,0);
				 mySheet.SetColHidden(56,0);
				 mySheet.SetColHidden(57,0);

				 // 기업저비용성예수금(월중평잔)
				 mySheet.SetColHidden(60,0);
				 mySheet.SetColHidden(61,0);
				 mySheet.SetColHidden(62,0);

				 // 대출금(순증잔액)
				 mySheet.SetColHidden(65,0);
				 mySheet.SetColHidden(66,0);
				 mySheet.SetColHidden(67,0);

				 // 신규대출금
				 mySheet.SetColHidden(70,0);
				 mySheet.SetColHidden(71,0);
				 mySheet.SetColHidden(72,0);

				 // 카드사업(전체매출액)
				 mySheet.SetColHidden(75,0);
				 mySheet.SetColHidden(76,0);
				 mySheet.SetColHidden(77,0);

				 // 카드사업(신규유효회원)
				 mySheet.SetColHidden(80,0);
				 mySheet.SetColHidden(81,0);
				 mySheet.SetColHidden(82,0);

				 //  신탁사업(보수)
				 mySheet.SetColHidden(85,0);
				 mySheet.SetColHidden(86,0);
				 mySheet.SetColHidden(87,0);

				 // 공제사업(신계약적립식)
				 mySheet.SetColHidden(90,0);
				 mySheet.SetColHidden(91,0);
				 mySheet.SetColHidden(92,0);

				 // 공제사업(신계약일시납)
				 mySheet.SetColHidden(95,0);
				 mySheet.SetColHidden(96,0);
				 mySheet.SetColHidden(97,0);

				 // 공제사업(신계약보장성)
				 mySheet.SetColHidden(100,0);
				 mySheet.SetColHidden(101,0);
				 mySheet.SetColHidden(102,0);

				 // 펀드사업(이익)
				 mySheet.SetColHidden(105,0);
				 mySheet.SetColHidden(106,0);
				 mySheet.SetColHidden(107,0);
              
				 // 펀드사업(법인신규)
				 mySheet.SetColHidden(110,0);
				 mySheet.SetColHidden(111,0);
				 mySheet.SetColHidden(112,0);
   		
				 // 연체율
				 mySheet.SetColHidden(115,0);
				 mySheet.SetColHidden(116,0);
				 mySheet.SetColHidden(117,0);
   		
				 // 경영현안_가점
				 mySheet.SetColHidden(120,0);
				 mySheet.SetColHidden(121,0);
				 mySheet.SetColHidden(122,0);
 				 		 		 
  			} else {
				 /* -------- 영업점 기준 -------- */		// 세부내역 체크 후_영업점
				 // 상품판매
				 mySheet.SetColHidden(5,1);
				 mySheet.SetColHidden(6,1);
				 mySheet.SetColHidden(7,1);

				 // 디지털 신규비이자고객
				 mySheet.SetColHidden(10,1);
				 mySheet.SetColHidden(11,1);
				 mySheet.SetColHidden(12,1);

				 // 신규 예수금고객
				 mySheet.SetColHidden(15,1);
				 mySheet.SetColHidden(16,1);
				 mySheet.SetColHidden(17,1);

				 // 신규 우량고객
				 mySheet.SetColHidden(20,1);
				 mySheet.SetColHidden(21,1);
				 mySheet.SetColHidden(22,1);

				 // 개인예수금(반기평잔)
				 mySheet.SetColHidden(25,1);
				 mySheet.SetColHidden(26,1);
				 mySheet.SetColHidden(27,1);

				 // 개인예수금(순증잔액)
				 mySheet.SetColHidden(30,1);
				 mySheet.SetColHidden(31,1);
				 mySheet.SetColHidden(32,1);

				 // 기업예수금(반기평잔)
				 mySheet.SetColHidden(35,1);
				 mySheet.SetColHidden(36,1);
				 mySheet.SetColHidden(37,1);

				 // 기업예수금(순증잔액)
				 mySheet.SetColHidden(40,1);
				 mySheet.SetColHidden(41,1);
				 mySheet.SetColHidden(42,1);

				 // 개인저비용성예수금(반기평잔)
				 mySheet.SetColHidden(45,1);
				 mySheet.SetColHidden(46,1);
				 mySheet.SetColHidden(47,1);

				 // 개인저비용성예수금(월중평잔)
				 mySheet.SetColHidden(50,1);
				 mySheet.SetColHidden(51,1);
				 mySheet.SetColHidden(52,1);
              
				 // 기업저비용성예수금(반기평잔)
				 mySheet.SetColHidden(55,1);
				 mySheet.SetColHidden(56,1);
				 mySheet.SetColHidden(57,1);

				 // 기업저비용성예수금(월중평잔)
				 mySheet.SetColHidden(60,1);
				 mySheet.SetColHidden(61,1);
				 mySheet.SetColHidden(62,1);

				 // 대출금(순증잔액)
				 mySheet.SetColHidden(65,1);
				 mySheet.SetColHidden(66,1);
				 mySheet.SetColHidden(67,1);

				 // 신규대출금
				 mySheet.SetColHidden(70,1);
				 mySheet.SetColHidden(71,1);
				 mySheet.SetColHidden(72,1);

				 // 카드사업(전체매출액)
				 mySheet.SetColHidden(75,1);
				 mySheet.SetColHidden(76,1);
				 mySheet.SetColHidden(77,1);

				 // 카드사업(신규유효회원)
				 mySheet.SetColHidden(80,1);
				 mySheet.SetColHidden(81,1);
				 mySheet.SetColHidden(82,1);

				 //  신탁사업(보수)
				 mySheet.SetColHidden(85,1);
				 mySheet.SetColHidden(86,1);
				 mySheet.SetColHidden(87,1);

				 // 공제사업(신계약적립식)
				 mySheet.SetColHidden(90,1);
				 mySheet.SetColHidden(91,1);
				 mySheet.SetColHidden(92,1);

				 // 공제사업(신계약일시납)
				 mySheet.SetColHidden(95,1);
				 mySheet.SetColHidden(96,1);
				 mySheet.SetColHidden(97,1);

				 // 공제사업(신계약보장성)
				 mySheet.SetColHidden(100,1);
				 mySheet.SetColHidden(101,1);
				 mySheet.SetColHidden(102,1);

				 // 펀드사업(이익)
				 mySheet.SetColHidden(105,1);
				 mySheet.SetColHidden(106,1);
				 mySheet.SetColHidden(107,1);
              
				 // 펀드사업(법인신규)
				 mySheet.SetColHidden(110,1);
				 mySheet.SetColHidden(111,1);
				 mySheet.SetColHidden(112,1);
   		
				 // 연체율
				 mySheet.SetColHidden(115,1);
				 mySheet.SetColHidden(116,1);
				 mySheet.SetColHidden(117,1);
  
				 // 경영현안_가점
				 mySheet.SetColHidden(120,1);
				 mySheet.SetColHidden(121,1);
				 mySheet.SetColHidden(122,1);
 					  	          	       	
  		 }
  		   				
    }else if (baseday >= '20210701') {    
			if (subChk) { 		    
				 /* -------- 영업점 기준 -------- */			// 세부내역 체크 전_영업점
				 // 상품판매
				 mySheet.SetColHidden(5,0);
				 mySheet.SetColHidden(6,0);
				 mySheet.SetColHidden(7,0);

				 // 디지털 신규비이자고객
				 mySheet.SetColHidden(10,0);
				 mySheet.SetColHidden(11,0);
				 mySheet.SetColHidden(12,0);

				 // 신규 예수금고객
				 mySheet.SetColHidden(15,0);
				 mySheet.SetColHidden(16,0);
				 mySheet.SetColHidden(17,0);

				 // 신규 우량고객
				 mySheet.SetColHidden(20,0);
				 mySheet.SetColHidden(21,0);
				 mySheet.SetColHidden(22,0);

				 // 개인예수금(반기평잔)
				 mySheet.SetColHidden(25,0);
				 mySheet.SetColHidden(26,0);
				 mySheet.SetColHidden(27,0);

				 // 개인예수금(순증잔액)
				 mySheet.SetColHidden(30,0);
				 mySheet.SetColHidden(31,0);
				 mySheet.SetColHidden(32,0);

				 // 기업예수금(반기평잔)
				 mySheet.SetColHidden(35,0);
				 mySheet.SetColHidden(36,0);
				 mySheet.SetColHidden(37,0);

				 // 기업예수금(순증잔액)
				 mySheet.SetColHidden(40,0);
				 mySheet.SetColHidden(41,0);
				 mySheet.SetColHidden(42,0);

				 // 개인저비용성예수금(반기평잔)
				 mySheet.SetColHidden(45,0);
				 mySheet.SetColHidden(46,0);
				 mySheet.SetColHidden(47,0);

				 // 개인저비용성예수금(월중평잔)
				 mySheet.SetColHidden(50,0);
				 mySheet.SetColHidden(51,0);
				 mySheet.SetColHidden(52,0);
              
				 // 기업저비용성예수금(반기평잔)
				 mySheet.SetColHidden(55,0);
				 mySheet.SetColHidden(56,0);
				 mySheet.SetColHidden(57,0);

				 // 기업저비용성예수금(월중평잔)
				 mySheet.SetColHidden(60,0);
				 mySheet.SetColHidden(61,0);
				 mySheet.SetColHidden(62,0);

				 // 대출금(순증잔액)
				 mySheet.SetColHidden(65,0);
				 mySheet.SetColHidden(66,0);
				 mySheet.SetColHidden(67,0);

				 // 신규대출금
				 mySheet.SetColHidden(70,0);
				 mySheet.SetColHidden(71,0);
				 mySheet.SetColHidden(72,0);

				 // 카드사업(전체매출액)
				 mySheet.SetColHidden(75,0);
				 mySheet.SetColHidden(76,0);
				 mySheet.SetColHidden(77,0);

				 // 카드사업(신규유효회원)
				 mySheet.SetColHidden(80,0);
				 mySheet.SetColHidden(81,0);
				 mySheet.SetColHidden(82,0);

				 //  신탁사업(보수)
				 mySheet.SetColHidden(85,0);
				 mySheet.SetColHidden(86,0);
				 mySheet.SetColHidden(87,0);

				 // 공제사업(신계약적립식)
				 mySheet.SetColHidden(90,0);
				 mySheet.SetColHidden(91,0);
				 mySheet.SetColHidden(92,0);

				 // 공제사업(신계약일시납)
				 mySheet.SetColHidden(95,0);
				 mySheet.SetColHidden(96,0);
				 mySheet.SetColHidden(97,0);

				 // 공제사업(신계약보장성)
				 mySheet.SetColHidden(100,0);
				 mySheet.SetColHidden(101,0);
				 mySheet.SetColHidden(102,0);

				 // 펀드사업(이익)
				 mySheet.SetColHidden(105,0);
				 mySheet.SetColHidden(106,0);
				 mySheet.SetColHidden(107,0);
             
				 // 펀드사업(법인신규)
				 mySheet.SetColHidden(110,0);
				 mySheet.SetColHidden(111,0);
				 mySheet.SetColHidden(112,0);
   		
				 // 연체율
				 mySheet.SetColHidden(115,0);
				 mySheet.SetColHidden(116,0);
				 mySheet.SetColHidden(117,0);
   					 		 		 
  			}
  			else
       {
				 /* -------- 영업점 기준 -------- */		// 세부내역 체크 후_영업점
				 // 상품판매
				 mySheet.SetColHidden(5,1);
				 mySheet.SetColHidden(6,1);
				 mySheet.SetColHidden(7,1);

				 // 디지털 신규비이자고객
				 mySheet.SetColHidden(10,1);
				 mySheet.SetColHidden(11,1);
				 mySheet.SetColHidden(12,1);

				 // 신규 예수금고객
				 mySheet.SetColHidden(15,1);
				 mySheet.SetColHidden(16,1);
				 mySheet.SetColHidden(17,1);
			
				 // 신규 우량고객
				 mySheet.SetColHidden(20,1);
				 mySheet.SetColHidden(21,1);
				 mySheet.SetColHidden(22,1);

				 // 개인예수금(반기평잔)
				 mySheet.SetColHidden(25,1);
				 mySheet.SetColHidden(26,1);
				 mySheet.SetColHidden(27,1);

				 // 개인예수금(순증잔액)
				 mySheet.SetColHidden(30,1);
				 mySheet.SetColHidden(31,1);
				 mySheet.SetColHidden(32,1);

				 // 기업예수금(반기평잔)
				 mySheet.SetColHidden(35,1);
				 mySheet.SetColHidden(36,1);
				 mySheet.SetColHidden(37,1);

				 // 기업예수금(순증잔액)
				 mySheet.SetColHidden(40,1);
				 mySheet.SetColHidden(41,1);
				 mySheet.SetColHidden(42,1);

				 // 개인저비용성예수금(반기평잔)
				 mySheet.SetColHidden(45,1);
				 mySheet.SetColHidden(46,1);
				 mySheet.SetColHidden(47,1);
			
				 // 개인저비용성예수금(월중평잔)
				 mySheet.SetColHidden(50,1);
				 mySheet.SetColHidden(51,1);
				 mySheet.SetColHidden(52,1);
              
				 // 기업저비용성예수금(반기평잔)
				 mySheet.SetColHidden(55,1);
				 mySheet.SetColHidden(56,1);
				 mySheet.SetColHidden(57,1);

				 // 기업저비용성예수금(월중평잔)
				 mySheet.SetColHidden(60,1);
				 mySheet.SetColHidden(61,1);
				 mySheet.SetColHidden(62,1);

				 // 대출금(순증잔액)
				 mySheet.SetColHidden(65,1);
				 mySheet.SetColHidden(66,1);
				 mySheet.SetColHidden(67,1);

				 // 신규대출금
				 mySheet.SetColHidden(70,1);
				 mySheet.SetColHidden(71,1);
				 mySheet.SetColHidden(72,1);

				 // 카드사업(전체매출액)
				 mySheet.SetColHidden(75,1);
				 mySheet.SetColHidden(76,1);
				 mySheet.SetColHidden(77,1);

				 // 카드사업(신규유효회원)
				 mySheet.SetColHidden(80,1);
				 mySheet.SetColHidden(81,1);
				 mySheet.SetColHidden(82,1);

				 //  신탁사업(보수)
				 mySheet.SetColHidden(85,1);
				 mySheet.SetColHidden(86,1);
				 mySheet.SetColHidden(87,1);

				 // 공제사업(신계약적립식)
				 mySheet.SetColHidden(90,1);
				 mySheet.SetColHidden(91,1);
				 mySheet.SetColHidden(92,1);

				 // 공제사업(신계약일시납)
				 mySheet.SetColHidden(95,1);
				 mySheet.SetColHidden(96,1);
				 mySheet.SetColHidden(97,1);

				 // 공제사업(신계약보장성)
				 mySheet.SetColHidden(100,1);
				 mySheet.SetColHidden(101,1);
				 mySheet.SetColHidden(102,1);

				 // 펀드사업(이익)
				 mySheet.SetColHidden(105,1);
				 mySheet.SetColHidden(106,1);
				 mySheet.SetColHidden(107,1);
              
				 // 펀드사업(법인신규)
				 mySheet.SetColHidden(110,1);
				 mySheet.SetColHidden(111,1);
				 mySheet.SetColHidden(112,1);
   		
				 // 연체율
				 mySheet.SetColHidden(115,1);
				 mySheet.SetColHidden(116,1);
				 mySheet.SetColHidden(117,1);
  					  	          	       	
  		 }
  				
    }else if (baseday >= '20210101') {
        if (subChk) { 								// 세부내역 체크 전
          if (pgcode == '16') {						// 세부내역 체크 전_금융본부
          /* -------- RMC 기준 -------- */            
              // 신규예수금고객
              mySheet.SetColHidden(5,0);
              mySheet.SetColHidden(6,0);
              mySheet.SetColHidden(7,0);

              // 신규기업대출금고객
              mySheet.SetColHidden(10,0);
              mySheet.SetColHidden(11,0);
              mySheet.SetColHidden(12,0);

              // 예수금(반기평잔)
              mySheet.SetColHidden(15,0);
              mySheet.SetColHidden(16,0);
              mySheet.SetColHidden(17,0);

              // 예수금(순증잔액)
              mySheet.SetColHidden(20,0);
              mySheet.SetColHidden(21,0);
              mySheet.SetColHidden(22,0);

              // 저비용성예수금(반기평잔)        
              mySheet.SetColHidden(25,0);
              mySheet.SetColHidden(26,0);
              mySheet.SetColHidden(27,0);

              // 저비용성예수금(월중평잔)  
              mySheet.SetColHidden(30,0);
              mySheet.SetColHidden(31,0);
              mySheet.SetColHidden(32,0);

              // 대출금(순증잔액)
              mySheet.SetColHidden(35,0);
              mySheet.SetColHidden(36,0);
              mySheet.SetColHidden(37,0);

              // 연체율
              mySheet.SetColHidden(40,0);
              mySheet.SetColHidden(41,0);
              mySheet.SetColHidden(42,0);
              
          } else {
          /* -------- 영업점 기준 -------- */			// 세부내역 체크 전_영업점
              // 상품판매
              mySheet.SetColHidden(5,0);
              mySheet.SetColHidden(6,0);
              mySheet.SetColHidden(7,0);

              // 디지털 신규고객
              mySheet.SetColHidden(10,0);
              mySheet.SetColHidden(11,0);
              mySheet.SetColHidden(12,0);

              // 디지털 신규비이자고객
              mySheet.SetColHidden(15,0);
              mySheet.SetColHidden(16,0);
              mySheet.SetColHidden(17,0);

              // 신규 예수금고객
              mySheet.SetColHidden(20,0);
              mySheet.SetColHidden(21,0);
              mySheet.SetColHidden(22,0);

              // 신규대출금고객
              mySheet.SetColHidden(25,0);
              mySheet.SetColHidden(26,0);
              mySheet.SetColHidden(27,0);

              // 개인예수금(반기평잔)
              mySheet.SetColHidden(30,0);
              mySheet.SetColHidden(31,0);
              mySheet.SetColHidden(32,0);

              // 기업예수금(순증잔액)
              mySheet.SetColHidden(35,0);
              mySheet.SetColHidden(36,0);
              mySheet.SetColHidden(37,0);

              // 기업예수금(반기평잔)
              mySheet.SetColHidden(40,0);
              mySheet.SetColHidden(41,0);
              mySheet.SetColHidden(42,0);

              // 기업예수금(순증잔액)
              mySheet.SetColHidden(45,0);
              mySheet.SetColHidden(46,0);
              mySheet.SetColHidden(47,0);

              // 개인저비용성예수금(반기평잔)
              mySheet.SetColHidden(50,0);
              mySheet.SetColHidden(51,0);
              mySheet.SetColHidden(52,0);
              
              // 개인저비용성예수금(월중평잔)
              mySheet.SetColHidden(55,0);
              mySheet.SetColHidden(56,0);
              mySheet.SetColHidden(57,0);

              // 기업저비용성예수금(반기평잔)
              mySheet.SetColHidden(60,0);
              mySheet.SetColHidden(61,0);
              mySheet.SetColHidden(62,0);

              // 기업저비용성예수금(월중평잔)
              mySheet.SetColHidden(65,0);
              mySheet.SetColHidden(66,0);
              mySheet.SetColHidden(67,0);

              // 대출금(순증잔액)
              mySheet.SetColHidden(70,0);
              mySheet.SetColHidden(71,0);
              mySheet.SetColHidden(72,0);

              // 카드사업(전체매출액)
              mySheet.SetColHidden(75,0);
              mySheet.SetColHidden(76,0);
              mySheet.SetColHidden(77,0);

              // 카드사업(신규신용매출액)
              mySheet.SetColHidden(80,0);
              mySheet.SetColHidden(81,0);
              mySheet.SetColHidden(82,0);

              // 신탁사업(보수)
              mySheet.SetColHidden(85,0);
              mySheet.SetColHidden(86,0);
              mySheet.SetColHidden(87,0);

              // 공제사업(신계약적립식)
              mySheet.SetColHidden(90,0);
              mySheet.SetColHidden(91,0);
              mySheet.SetColHidden(92,0);

			        // 공제사업(신계약일시납)
              mySheet.SetColHidden(95,0);
              mySheet.SetColHidden(96,0);
              mySheet.SetColHidden(97,0);

              // 펀드사업(펀드이익)
              mySheet.SetColHidden(100,0);
              mySheet.SetColHidden(101,0);
              mySheet.SetColHidden(102,0);

							// 연체율
              mySheet.SetColHidden(105,0);
              mySheet.SetColHidden(106,0);
              mySheet.SetColHidden(107,0);
          
          }
        } else {									// 세부내역 체크 후
          if (pgcode == '16') {
          /* -------- RMC 기준 -------- */          // 세부내역 체크 후_금융본부
              // 신규예수금고객
              mySheet.SetColHidden(5,1);
              mySheet.SetColHidden(6,1);
              mySheet.SetColHidden(7,1);

              // 신규기업대출금고객
              mySheet.SetColHidden(10,1);
              mySheet.SetColHidden(11,1);
              mySheet.SetColHidden(12,1);

              // 예수금(반기평잔)
              mySheet.SetColHidden(15,1);
              mySheet.SetColHidden(16,1);
              mySheet.SetColHidden(17,1);

              // 예수금(순증잔액)
              mySheet.SetColHidden(20,1);
              mySheet.SetColHidden(21,1);
              mySheet.SetColHidden(22,1);

              // 저비용성예수금(월중평잔)
              mySheet.SetColHidden(25,1);
              mySheet.SetColHidden(26,1);
              mySheet.SetColHidden(27,1);

              // 저비용성예수금(월중평잔)
              mySheet.SetColHidden(30,1);
              mySheet.SetColHidden(31,1);
              mySheet.SetColHidden(32,1);

              // 대출금(순증잔액)
              mySheet.SetColHidden(35,1);
              mySheet.SetColHidden(36,1);
              mySheet.SetColHidden(37,1);

              // 연체율
              mySheet.SetColHidden(40,1);
              mySheet.SetColHidden(41,1);
              mySheet.SetColHidden(42,1);
              
          } else {
          /* -------- 영업점 기준 -------- */		// 세부내역 체크 후_영업점
              // 상품판매
              mySheet.SetColHidden(5,1);
              mySheet.SetColHidden(6,1);
              mySheet.SetColHidden(7,1);

              // 디지털 신규고객
              mySheet.SetColHidden(10,1);
              mySheet.SetColHidden(11,1);
              mySheet.SetColHidden(12,1);

              // 디지털 신규비이자고객
              mySheet.SetColHidden(15,1);
              mySheet.SetColHidden(16,1);
              mySheet.SetColHidden(17,1);

              // 신규 예수금고객
              mySheet.SetColHidden(20,1);
              mySheet.SetColHidden(21,1);
              mySheet.SetColHidden(22,1);

              // 신규대출금고객
              mySheet.SetColHidden(25,1);
              mySheet.SetColHidden(26,1);
              mySheet.SetColHidden(27,1);

              // 개인예수금(반기평잔)
              mySheet.SetColHidden(30,1);
              mySheet.SetColHidden(31,1);
              mySheet.SetColHidden(32,1);

              // 기업예수금(순증잔액)
              mySheet.SetColHidden(35,1);
              mySheet.SetColHidden(36,1);
              mySheet.SetColHidden(37,1);

              // 기업예수금(반기평잔)
              mySheet.SetColHidden(40,1);
              mySheet.SetColHidden(41,1);
              mySheet.SetColHidden(42,1);

              // 기업예수금(순증잔액)
              mySheet.SetColHidden(45,1);
              mySheet.SetColHidden(46,1);
              mySheet.SetColHidden(47,1);

              // 개인저비용성예수금(반기평잔)
              mySheet.SetColHidden(50,1);
              mySheet.SetColHidden(51,1);
              mySheet.SetColHidden(52,1);
              
              // 개인저비용성예수금(월중평잔)
              mySheet.SetColHidden(55,1);
              mySheet.SetColHidden(56,1);
              mySheet.SetColHidden(57,1);

              // 기업저비용성예수금(반기평잔)
              mySheet.SetColHidden(60,1);
              mySheet.SetColHidden(61,1);
              mySheet.SetColHidden(62,1);

              // 기업저비용성예수금(월중평잔)
              mySheet.SetColHidden(65,1);
              mySheet.SetColHidden(66,1);
              mySheet.SetColHidden(67,1);

              // 대출금(순증잔액)
              mySheet.SetColHidden(70,1);
              mySheet.SetColHidden(71,1);
              mySheet.SetColHidden(72,1);

              // 카드사업(전체매출액)
              mySheet.SetColHidden(75,1);
              mySheet.SetColHidden(76,1);
              mySheet.SetColHidden(77,1);

              // 카드사업(신규신용매출액)
              mySheet.SetColHidden(80,1);
              mySheet.SetColHidden(81,1);
              mySheet.SetColHidden(82,1);

              // 신탁사업(보수)
              mySheet.SetColHidden(85,1);
              mySheet.SetColHidden(86,1);
              mySheet.SetColHidden(87,1);

              // 공제사업(신계약적립식)
              mySheet.SetColHidden(90,1);
              mySheet.SetColHidden(91,1);
              mySheet.SetColHidden(92,1);

			        // 공제사업(신계약일시납)
              mySheet.SetColHidden(95,1);
              mySheet.SetColHidden(96,1);
              mySheet.SetColHidden(97,1);

              // 펀드사업(펀드이익)
              mySheet.SetColHidden(100,1);
              mySheet.SetColHidden(101,1);
              mySheet.SetColHidden(102,1);

							// 연체율
              mySheet.SetColHidden(105,1);
              mySheet.SetColHidden(106,1);
              mySheet.SetColHidden(107,1);
          
          }
        }
    } else if(baseday >= '20200701') {    
        if (subChk) { 								// 세부내역 체크 전
          if (pgcode == '16') {						// 세부내역 체크 전_금융본부
          /* -------- RMC 기준 -------- */            
              // 신규예수금고객
              mySheet.SetColHidden(5,0);
              mySheet.SetColHidden(6,0);
              mySheet.SetColHidden(7,0);

              // 신규기업대출금고객
              mySheet.SetColHidden(10,0);
              mySheet.SetColHidden(11,0);
              mySheet.SetColHidden(12,0);
              // 예수금(반기평잔)
              mySheet.SetColHidden(15,0);
              mySheet.SetColHidden(16,0);
              mySheet.SetColHidden(17,0);
              // 예수금(순증잔액)
              mySheet.SetColHidden(20,0);
              mySheet.SetColHidden(21,0);
              mySheet.SetColHidden(22,0);
              // 저비용성예수금(반기평잔)        
              mySheet.SetColHidden(25,0);
              mySheet.SetColHidden(26,0);
              mySheet.SetColHidden(27,0);
              // 저비용성예수금(월중평잔)  
              mySheet.SetColHidden(30,0);
              mySheet.SetColHidden(31,0);
              mySheet.SetColHidden(32,0);
              // 대출금(순증잔액)
              mySheet.SetColHidden(35,0);
              mySheet.SetColHidden(36,0);
              mySheet.SetColHidden(37,0);
              // 연체율
              mySheet.SetColHidden(40,0);
              mySheet.SetColHidden(41,0);
              mySheet.SetColHidden(42,0);
             
          } else {
          /* -------- 영업점 기준 -------- */			// 세부내역 체크 전_영업점
              // 상품판매
              mySheet.SetColHidden(5,0);
              mySheet.SetColHidden(6,0);
              mySheet.SetColHidden(7,0);
              // 디지털고객
              mySheet.SetColHidden(10,0);
              mySheet.SetColHidden(11,0);
              mySheet.SetColHidden(12,0);
              // 신규예수금고객
              mySheet.SetColHidden(15,0);
              mySheet.SetColHidden(16,0);
              mySheet.SetColHidden(17,0);
              // 개인예수금(반기평잔)
              mySheet.SetColHidden(20,0);
              mySheet.SetColHidden(21,0);
              mySheet.SetColHidden(22,0);
              // 개인예수금(순증잔액)
              mySheet.SetColHidden(25,0);
              mySheet.SetColHidden(26,0);
              mySheet.SetColHidden(27,0);
              // 기업예수금(반기평잔)
              mySheet.SetColHidden(30,0);
              mySheet.SetColHidden(31,0);
              mySheet.SetColHidden(32,0);
              // 기업예수금(순증잔액)
              mySheet.SetColHidden(35,0);
              mySheet.SetColHidden(36,0);
              mySheet.SetColHidden(37,0);
              // 개인저비용성예수금(반기평잔)
              mySheet.SetColHidden(40,0);
              mySheet.SetColHidden(41,0);
              mySheet.SetColHidden(42,0);
              // 기업저비용성예수금(월중평잔)
              mySheet.SetColHidden(45,0);
              mySheet.SetColHidden(46,0);
              mySheet.SetColHidden(47,0);
              // 기업저비용성예수금(반기평잔)
              mySheet.SetColHidden(50,0);
              mySheet.SetColHidden(51,0);
              mySheet.SetColHidden(52,0);
              // 기업저비용성예수금(월중평잔)
              mySheet.SetColHidden(55,0);
              mySheet.SetColHidden(56,0);
              mySheet.SetColHidden(57,0);
              // 카드사업(순증잔액)
              mySheet.SetColHidden(60,0);
              mySheet.SetColHidden(61,0);
              mySheet.SetColHidden(62,0);
              // 카드사업(매출액)
              mySheet.SetColHidden(65,0);
              mySheet.SetColHidden(66,0);
              mySheet.SetColHidden(67,0);
              // 카드사업(신규유효회원)
              mySheet.SetColHidden(70,0);
              mySheet.SetColHidden(71,0);
              mySheet.SetColHidden(72,0);
              // 신탁사업(보수)
              mySheet.SetColHidden(75,0);
              mySheet.SetColHidden(76,0);
              mySheet.SetColHidden(77,0);
              // 공제사업(신계약적립_누증)
              mySheet.SetColHidden(80,0);
              mySheet.SetColHidden(81,0);
              mySheet.SetColHidden(82,0);
              // 공제사업(신계약적립_초회)
              mySheet.SetColHidden(85,0);
              mySheet.SetColHidden(86,0);
              mySheet.SetColHidden(87,0);
              // 펀드사업(신계약일시납)
              mySheet.SetColHidden(90,0);
              mySheet.SetColHidden(91,0);
              mySheet.SetColHidden(92,0);
			        // 펀드사업(수탁고)
              mySheet.SetColHidden(95,0);
              mySheet.SetColHidden(96,0);
              mySheet.SetColHidden(97,0);
              // 펀드사업(적립식건수)
              mySheet.SetColHidden(100,0);
              mySheet.SetColHidden(101,0);
              mySheet.SetColHidden(102,0);
							// 연체율
              mySheet.SetColHidden(105,0);
              mySheet.SetColHidden(106,0);
              mySheet.SetColHidden(107,0);

          }
        } else {									// 세부내역 체크 후
          if (pgcode == '16') {
          /* -------- RMC 기준 -------- */          // 세부내역 체크 후_금융본부
              // 신규예수금고객
              mySheet.SetColHidden(5,1);
              mySheet.SetColHidden(6,1);
              mySheet.SetColHidden(7,1);
              // 신규기업대출금고객
              mySheet.SetColHidden(10,1);
              mySheet.SetColHidden(11,1);
              mySheet.SetColHidden(12,1);
              // 예수금(반기평잔)
              mySheet.SetColHidden(15,1);
              mySheet.SetColHidden(16,1);
              mySheet.SetColHidden(17,1);
              // 예수금(순증잔액)
              mySheet.SetColHidden(20,1);
              mySheet.SetColHidden(21,1);
              mySheet.SetColHidden(22,1);
              // 저비용성예수금(월중평잔)
              mySheet.SetColHidden(25,1);
              mySheet.SetColHidden(26,1);
              mySheet.SetColHidden(27,1);
              // 저비용성예수금(월중평잔)
              mySheet.SetColHidden(30,1);
              mySheet.SetColHidden(31,1);
              mySheet.SetColHidden(32,1);
              // 대출금(순증잔액)
              mySheet.SetColHidden(35,1);
              mySheet.SetColHidden(36,1);
              mySheet.SetColHidden(37,1);
              // 연체율
              mySheet.SetColHidden(40,1);
              mySheet.SetColHidden(41,1);
              mySheet.SetColHidden(42,1);
              
          } else {
          /* -------- 영업점 기준 -------- */		// 세부내역 체크 후_영업점
              // 상품판매
              mySheet.SetColHidden(5,1);
              mySheet.SetColHidden(6,1);
              mySheet.SetColHidden(7,1);
              // 디지털고객
              mySheet.SetColHidden(10,1);
              mySheet.SetColHidden(11,1);
              mySheet.SetColHidden(12,1);
              // 신규예수금고객
              mySheet.SetColHidden(15,1);
              mySheet.SetColHidden(16,1);
              mySheet.SetColHidden(17,1);
              // 개인예수금(반기평잔)
              mySheet.SetColHidden(20,1);
              mySheet.SetColHidden(21,1);
              mySheet.SetColHidden(22,1);
              // 기업예수금(순증잔액)
              mySheet.SetColHidden(25,1);
              mySheet.SetColHidden(26,1);
              mySheet.SetColHidden(27,1);
              // 기업예수금(반기평잔)
              mySheet.SetColHidden(30,1);
              mySheet.SetColHidden(31,1);
              mySheet.SetColHidden(32,1);
              // 기업예수금(순증잔액)
              mySheet.SetColHidden(35,1);
              mySheet.SetColHidden(36,1);
              mySheet.SetColHidden(37,1);
              // 개인저비용성예수금(반기평잔)
              mySheet.SetColHidden(40,1);
              mySheet.SetColHidden(41,1);
              mySheet.SetColHidden(42,1);
              // 기업저비용성예수금(월중평잔)
              mySheet.SetColHidden(45,1);
              mySheet.SetColHidden(46,1);
              mySheet.SetColHidden(47,1);
              // 기업저비용성예수금(반기평잔)
              mySheet.SetColHidden(50,1);
              mySheet.SetColHidden(51,1);
              mySheet.SetColHidden(52,1);
              // 기업저비용성예수금(월중평잔)
              mySheet.SetColHidden(55,1);
              mySheet.SetColHidden(56,1);
              mySheet.SetColHidden(57,1);
              // 카드사업(순증잔액)
              mySheet.SetColHidden(60,1);
              mySheet.SetColHidden(61,1);
              mySheet.SetColHidden(62,1);
              // 카드사업(매출액)
              mySheet.SetColHidden(65,1);
              mySheet.SetColHidden(66,1);
              mySheet.SetColHidden(67,1);
              // 카드사업(신규유효회원)
              mySheet.SetColHidden(70,1);
              mySheet.SetColHidden(71,1);
              mySheet.SetColHidden(72,1);
              // 신탁사업(보수)
              mySheet.SetColHidden(75,1);
              mySheet.SetColHidden(76,1);
              mySheet.SetColHidden(77,1);
              // 공제사업(신계약적립_누증)
              mySheet.SetColHidden(80,1);
              mySheet.SetColHidden(81,1);
              mySheet.SetColHidden(82,1);
              // 공제사업(신계약적립_초회)
              mySheet.SetColHidden(85,1);
              mySheet.SetColHidden(86,1);
              mySheet.SetColHidden(87,1);
              // 펀드사업(신계약일시납)
              mySheet.SetColHidden(90,1);
              mySheet.SetColHidden(91,1);
              mySheet.SetColHidden(92,1);
			        // 펀드사업(수탁고)
              mySheet.SetColHidden(95,1);
              mySheet.SetColHidden(96,1);
              mySheet.SetColHidden(97,1);
              // 펀드사업(적립식건수)
              mySheet.SetColHidden(100,1);
              mySheet.SetColHidden(101,1);
              mySheet.SetColHidden(102,1);
							// 연체율
              mySheet.SetColHidden(105,1);
              mySheet.SetColHidden(106,1);
              mySheet.SetColHidden(107,1);

          }
        }
    } else if(baseday >= '20200101') {
        if (subChk) { 								// 세부내역 체크 전
          if (pgcode == '16') {						// 세부내역 체크 전_금융본부
          /* -------- RMC 기준 -------- */            
              // 신규예수금고객
              mySheet.SetColHidden(5,0);
              mySheet.SetColHidden(6,0);
              mySheet.SetColHidden(7,0);
              // 예수금(반기평잔)
              mySheet.SetColHidden(10,0);
              mySheet.SetColHidden(11,0);
              mySheet.SetColHidden(12,0);
              // 예수금(순증잔액)
              mySheet.SetColHidden(15,0);
              mySheet.SetColHidden(16,0);
              mySheet.SetColHidden(17,0);
              // 저비용성예수금(반기평잔)
              mySheet.SetColHidden(20,0);
              mySheet.SetColHidden(21,0);
              mySheet.SetColHidden(22,0);
              // 저비용성예수금(월중평잔)          
              mySheet.SetColHidden(25,0);
              mySheet.SetColHidden(26,0);
              mySheet.SetColHidden(27,0);
              // 대출금(순증잔액)
              mySheet.SetColHidden(30,0);
              mySheet.SetColHidden(31,0);
              mySheet.SetColHidden(32,0);
              // 연체율
              mySheet.SetColHidden(35,0);
              mySheet.SetColHidden(36,0);
              mySheet.SetColHidden(37,0);

          } else {
          /* -------- 영업점 기준 -------- */			// 세부내역 체크 전_영업점
              // 상품판매
              mySheet.SetColHidden(5,0);
              mySheet.SetColHidden(6,0);
              mySheet.SetColHidden(7,0);
              // 신규예수금고객
              mySheet.SetColHidden(10,0);
              mySheet.SetColHidden(11,0);
              mySheet.SetColHidden(12,0);
              // 개인예수금(반기평잔)
              mySheet.SetColHidden(15,0);
              mySheet.SetColHidden(16,0);
              mySheet.SetColHidden(17,0);
              // 개인예수금(순증잔액)
              mySheet.SetColHidden(20,0);
              mySheet.SetColHidden(21,0);
              mySheet.SetColHidden(22,0);
              // 기업예수금(반기평잔)
              mySheet.SetColHidden(25,0);
              mySheet.SetColHidden(26,0);
              mySheet.SetColHidden(27,0);
              // 기업예수금(순증잔액)
              mySheet.SetColHidden(30,0);
              mySheet.SetColHidden(31,0);
              mySheet.SetColHidden(32,0);
              // 개인저비용성예수금(반기평잔)
              mySheet.SetColHidden(35,0);
              mySheet.SetColHidden(36,0);
              mySheet.SetColHidden(37,0);
              // 개인저비용성예수금(월중평잔)
              mySheet.SetColHidden(40,0);
              mySheet.SetColHidden(41,0);
              mySheet.SetColHidden(42,0);
              // 기업저비용성예수금(반기평잔)
              mySheet.SetColHidden(45,0);
              mySheet.SetColHidden(46,0);
              mySheet.SetColHidden(47,0);
              // 기업저비용성예수금(월중평잔)
              mySheet.SetColHidden(50,0);
              mySheet.SetColHidden(51,0);
              mySheet.SetColHidden(52,0);
              // 대출금(순증잔액)
              mySheet.SetColHidden(55,0);
              mySheet.SetColHidden(56,0);
              mySheet.SetColHidden(57,0);
              // 카드사업(매출액)
              mySheet.SetColHidden(60,0);
              mySheet.SetColHidden(61,0);
              mySheet.SetColHidden(62,0);
              // 카드사업(신규유효회원)
              mySheet.SetColHidden(65,0);
              mySheet.SetColHidden(66,0);
              mySheet.SetColHidden(67,0);
              // 신탁사업(보수)
              mySheet.SetColHidden(70,0);
              mySheet.SetColHidden(71,0);
              mySheet.SetColHidden(72,0);
              // 공제사업(신계약적립_누증)
              mySheet.SetColHidden(75,0);
              mySheet.SetColHidden(76,0);
              mySheet.SetColHidden(77,0);
              // 공제사업(신계약적립_초회)
              mySheet.SetColHidden(80,0);
              mySheet.SetColHidden(81,0);
              mySheet.SetColHidden(82,0);
              // 공제사업(신계약일시납)
              mySheet.SetColHidden(85,0);
              mySheet.SetColHidden(86,0);
              mySheet.SetColHidden(87,0);
              // 펀드사업(수탁고)
              mySheet.SetColHidden(90,0);
              mySheet.SetColHidden(91,0);
              mySheet.SetColHidden(92,0);
			  // 펀드사업(적립식건수)
              mySheet.SetColHidden(95,0);
              mySheet.SetColHidden(96,0);
              mySheet.SetColHidden(97,0);
              // 연체율
              mySheet.SetColHidden(100,0);
              mySheet.SetColHidden(101,0);
              mySheet.SetColHidden(102,0);

          }
        } else {									// 세부내역 체크 후
          if (pgcode == '16') {
          /* -------- RMC 기준 -------- */          // 세부내역 체크 후_금융본부
              // 신규예수금고객
              mySheet.SetColHidden(5,1);
              mySheet.SetColHidden(6,1);
              mySheet.SetColHidden(7,1);
              // 예수금(반기평잔)
              mySheet.SetColHidden(10,1);
              mySheet.SetColHidden(11,1);
              mySheet.SetColHidden(12,1);
              // 예수금(순증잔액)
              mySheet.SetColHidden(15,1);
              mySheet.SetColHidden(16,1);
              mySheet.SetColHidden(17,1);
              // 저비용성예수금(반기평잔)
              mySheet.SetColHidden(20,1);
              mySheet.SetColHidden(21,1);
              mySheet.SetColHidden(22,1);
              // 저비용성예수금(월중평잔)
              mySheet.SetColHidden(25,1);
              mySheet.SetColHidden(26,1);
              mySheet.SetColHidden(27,1);
              // 대출금(순증잔액)
              mySheet.SetColHidden(30,1);
              mySheet.SetColHidden(31,1);
              mySheet.SetColHidden(32,1);
              // 연체율
              mySheet.SetColHidden(35,1);
              mySheet.SetColHidden(36,1);
              mySheet.SetColHidden(37,1);

          } else {
          /* -------- 영업점 기준 -------- */		// 세부내역 체크 후_영업점
              // 상품판매
              mySheet.SetColHidden(5,1);
              mySheet.SetColHidden(6,1);
              mySheet.SetColHidden(7,1);
              // 신규예수금고객
              mySheet.SetColHidden(10,1);
              mySheet.SetColHidden(11,1);
              mySheet.SetColHidden(12,1);
              // 개인예수금(반기평잔)
              mySheet.SetColHidden(15,1);
              mySheet.SetColHidden(16,1);
              mySheet.SetColHidden(17,1);
              // 개인예수금(순증잔액)
              mySheet.SetColHidden(20,1);
              mySheet.SetColHidden(21,1);
              mySheet.SetColHidden(22,1);
              // 기업예수금(반기평잔)
              mySheet.SetColHidden(25,1);
              mySheet.SetColHidden(26,1);
              mySheet.SetColHidden(27,1);
              // 기업예수금(순증잔액)
              mySheet.SetColHidden(30,1);
              mySheet.SetColHidden(31,1);
              mySheet.SetColHidden(32,1);
              // 개인저비용성예수금(반기평잔)
              mySheet.SetColHidden(35,1);
              mySheet.SetColHidden(36,1);
              mySheet.SetColHidden(37,1);
              // 개인저비용성예수금(월중평잔)
              mySheet.SetColHidden(40,1);
              mySheet.SetColHidden(41,1);
              mySheet.SetColHidden(42,1);
              // 기업저비용성예수금(반기평잔)
              mySheet.SetColHidden(45,1);
              mySheet.SetColHidden(46,1);
              mySheet.SetColHidden(47,1);
              // 기업저비용성예수금(월중평잔)
              mySheet.SetColHidden(50,1);
              mySheet.SetColHidden(51,1);
              mySheet.SetColHidden(52,1);
              // 대출금(순증잔액)
              mySheet.SetColHidden(55,1);
              mySheet.SetColHidden(56,1);
              mySheet.SetColHidden(57,1);
              // 카드사업(매출액)
              mySheet.SetColHidden(60,1);
              mySheet.SetColHidden(61,1);
              mySheet.SetColHidden(62,1);
              // 카드사업(신규유효회원)
              mySheet.SetColHidden(65,1);
              mySheet.SetColHidden(66,1);
              mySheet.SetColHidden(67,1);
              // 신탁사업(보수)
              mySheet.SetColHidden(70,1);
              mySheet.SetColHidden(71,1);
              mySheet.SetColHidden(72,1);
              // 공제사업(신계약적립_누증)
              mySheet.SetColHidden(75,1);
              mySheet.SetColHidden(76,1);
              mySheet.SetColHidden(77,1);
              // 공제사업(신계약적립_초회)
              mySheet.SetColHidden(80,1);
              mySheet.SetColHidden(81,1);
              mySheet.SetColHidden(82,1);
              // 공제사업(신계약일시납)
              mySheet.SetColHidden(85,1);
              mySheet.SetColHidden(86,1);
              mySheet.SetColHidden(87,1);
              // 펀드사업(수탁고)
              mySheet.SetColHidden(90,1);
              mySheet.SetColHidden(91,1);
              mySheet.SetColHidden(92,1);
			  // 펀드사업(적립식건수)
              mySheet.SetColHidden(95,1);
              mySheet.SetColHidden(96,1);
              mySheet.SetColHidden(97,1);
              // 연체율
              mySheet.SetColHidden(100,1);
              mySheet.SetColHidden(101,1);
              mySheet.SetColHidden(102,1);

          }
        }
    } else if(baseday >= '20190701') {
        if (subChk) {
          if (pgcode == '16') {
          /* -------- RMC 기준 -------- */            
              // 연체율
              mySheet.SetColHidden(5,0);
              mySheet.SetColHidden(6,0);
              mySheet.SetColHidden(7,0);
              // 신규 기업예수금 고객
              mySheet.SetColHidden(10,0);
              mySheet.SetColHidden(11,0);
              mySheet.SetColHidden(12,0);
              // 신규 기업대출금 고객
              mySheet.SetColHidden(15,0);
              mySheet.SetColHidden(16,0);
              mySheet.SetColHidden(17,0);
              // 예수금 반기평잔
              mySheet.SetColHidden(20,0);
              mySheet.SetColHidden(21,0);
              mySheet.SetColHidden(22,0);
              // 예수금 순증잔액
              mySheet.SetColHidden(25,0);
              mySheet.SetColHidden(26,0);
              mySheet.SetColHidden(27,0);
              // 저비용성예수금 반기평잔
              mySheet.SetColHidden(30,0);
              mySheet.SetColHidden(31,0);
              mySheet.SetColHidden(32,0);
              // 저비용성예수금 월중평잔
              mySheet.SetColHidden(35,0);
              mySheet.SetColHidden(36,0);
              mySheet.SetColHidden(37,0);
              // 대출금
              mySheet.SetColHidden(40,0);
              mySheet.SetColHidden(41,0);
              mySheet.SetColHidden(42,0);

          } else {
          /* -------- 영업점 기준 -------- */
              // 건전성
              mySheet.SetColHidden(5,0);
              mySheet.SetColHidden(6,0);
              mySheet.SetColHidden(7,0);
              // 신규고객
              mySheet.SetColHidden(10,0);
              mySheet.SetColHidden(11,0);
              mySheet.SetColHidden(12,0);
              // 기존고객
              mySheet.SetColHidden(15,0);
              mySheet.SetColHidden(16,0);
              mySheet.SetColHidden(17,0);
              // 전략사업
              mySheet.SetColHidden(20,0);
              // 개인예수금(반기평잔)
              mySheet.SetColHidden(23,0);
              mySheet.SetColHidden(24,0);
              mySheet.SetColHidden(25,0);
              // 개인예수금(순증잔액)
              mySheet.SetColHidden(28,0);
              mySheet.SetColHidden(29,0);
              mySheet.SetColHidden(30,0);
              // 기업예수금(반기평잔)
              mySheet.SetColHidden(33,0);
              mySheet.SetColHidden(34,0);
              mySheet.SetColHidden(35,0);
              // 기업예수금(순증잔액)
              mySheet.SetColHidden(38,0);
              mySheet.SetColHidden(39,0);
              mySheet.SetColHidden(40,0);
              // 신규예수금고객
              mySheet.SetColHidden(43,0);
              mySheet.SetColHidden(44,0);
              mySheet.SetColHidden(45,0);
              // 개인저비용성예수금(반기평잔)
              mySheet.SetColHidden(48,0);
              mySheet.SetColHidden(49,0);
              mySheet.SetColHidden(50,0);
              // 개인저비용성예수금(월중평잔)
              mySheet.SetColHidden(53,0);
              mySheet.SetColHidden(54,0);
              mySheet.SetColHidden(55,0);
              // 기업저비용성예수금(반기평잔)
              mySheet.SetColHidden(58,0);
              mySheet.SetColHidden(59,0);
              mySheet.SetColHidden(60,0);
              // 기업저비용성예수금(월중평잔)
              mySheet.SetColHidden(63,0);
              mySheet.SetColHidden(64,0);
              mySheet.SetColHidden(65,0);
              // 소매대출금(순증잔액)
              mySheet.SetColHidden(68,0);
              mySheet.SetColHidden(69,0);
              mySheet.SetColHidden(70,0);
              // 기업대출금(순증잔액)
              mySheet.SetColHidden(73,0);
              mySheet.SetColHidden(74,0);
              mySheet.SetColHidden(75,0);
              // 카드사업(매출액)
              mySheet.SetColHidden(78,0);
              mySheet.SetColHidden(79,0);
              mySheet.SetColHidden(77,0);
              // 카드사업(순증유효회원)
              mySheet.SetColHidden(83,0);
              mySheet.SetColHidden(84,0);
              mySheet.SetColHidden(85,0);
              // 신탁사업(금전신탁)
              mySheet.SetColHidden(88,0);
              mySheet.SetColHidden(89,0);
              mySheet.SetColHidden(90,0);
              // 신탁사업(부동산신탁)
              mySheet.SetColHidden(93,0);
              mySheet.SetColHidden(94,0);
              mySheet.SetColHidden(95,0);
              // 공제사업(신계약 생명공제료)
              mySheet.SetColHidden(98,0);
              mySheet.SetColHidden(99,0);
              mySheet.SetColHidden(100,0);
              // 공제사업(신계약 손해공제료)
              mySheet.SetColHidden(103,0);
              mySheet.SetColHidden(104,0);
              mySheet.SetColHidden(105,0);
              // 펀드사업(수탁고)
              mySheet.SetColHidden(108,0);
              mySheet.SetColHidden(109,0);
              mySheet.SetColHidden(110,0);
              // 연계증권
              mySheet.SetColHidden(113,0);
              mySheet.SetColHidden(114,0);
              mySheet.SetColHidden(115,0);

          }
        } else {
          if (pgcode == '16') {
          /* -------- RMC 기준 -------- */            
              // 연체율
              mySheet.SetColHidden(5,1);
              mySheet.SetColHidden(6,1);
              mySheet.SetColHidden(7,1);
              // 신규 기업예수금 고객
              mySheet.SetColHidden(10,1);
              mySheet.SetColHidden(11,1);
              mySheet.SetColHidden(12,1);
              // 신규 기업대출금 고객
              mySheet.SetColHidden(15,1);
              mySheet.SetColHidden(16,1);
              mySheet.SetColHidden(17,1);
              // 예수금 반기평잔
              mySheet.SetColHidden(20,1);
              mySheet.SetColHidden(21,1);
              mySheet.SetColHidden(22,1);
              // 예수금 순증잔액
              mySheet.SetColHidden(25,1);
              mySheet.SetColHidden(26,1);
              mySheet.SetColHidden(27,1);
              // 저비용성예수금 반기평잔
              mySheet.SetColHidden(30,1);
              mySheet.SetColHidden(31,1);
              mySheet.SetColHidden(32,1);
              // 저비용성예수금 월중평잔
              mySheet.SetColHidden(35,1);
              mySheet.SetColHidden(36,1);
              mySheet.SetColHidden(37,1);
              // 대출금
              mySheet.SetColHidden(40,1);
              mySheet.SetColHidden(41,1);
              mySheet.SetColHidden(42,1);

          } else {
          /* -------- 영업점 기준 -------- */
              // 건전성
              mySheet.SetColHidden(5,1);
              mySheet.SetColHidden(6,1);
              mySheet.SetColHidden(7,1);
              // 신규고객
              mySheet.SetColHidden(10,1);
              mySheet.SetColHidden(11,1);
              mySheet.SetColHidden(12,1);
              // 기존고객
              mySheet.SetColHidden(15,1);
              mySheet.SetColHidden(16,1);
              mySheet.SetColHidden(17,1);
              // 전략사업
              mySheet.SetColHidden(20,1);
              // 개인예수금(반기평잔)
              mySheet.SetColHidden(23,1);
              mySheet.SetColHidden(24,1);
              mySheet.SetColHidden(25,1);
              // 개인예수금(순증잔액)
              mySheet.SetColHidden(28,1);
              mySheet.SetColHidden(29,1);
              mySheet.SetColHidden(30,1);
              // 기업예수금(반기평잔)
              mySheet.SetColHidden(33,1);
              mySheet.SetColHidden(34,1);
              mySheet.SetColHidden(35,1);
              // 기업예수금(순증잔액)
              mySheet.SetColHidden(38,1);
              mySheet.SetColHidden(39,1);
              mySheet.SetColHidden(40,1);
              // 신규예수금고객
              mySheet.SetColHidden(43,1);
              mySheet.SetColHidden(44,1);
              mySheet.SetColHidden(45,1);
              // 개인저비용성예수금(반기평잔)
              mySheet.SetColHidden(48,1);
              mySheet.SetColHidden(49,1);
              mySheet.SetColHidden(50,1);
              // 개인저비용성예수금(월중평잔)
              mySheet.SetColHidden(53,1);
              mySheet.SetColHidden(54,1);
              mySheet.SetColHidden(55,1);
              // 기업저비용성예수금(반기평잔)
              mySheet.SetColHidden(58,1);
              mySheet.SetColHidden(59,1);
              mySheet.SetColHidden(60,1);
              // 기업저비용성예수금(월중평잔)
              mySheet.SetColHidden(63,1);
              mySheet.SetColHidden(64,1);
              mySheet.SetColHidden(65,1);
              // 소매대출금(순증잔액)
              mySheet.SetColHidden(68,1);
              mySheet.SetColHidden(69,1);
              mySheet.SetColHidden(70,1);
              // 기업대출금(순증잔액)
              mySheet.SetColHidden(73,1);
              mySheet.SetColHidden(74,1);
              mySheet.SetColHidden(75,1);
              // 카드사업(매출액)
              mySheet.SetColHidden(78,1);
              mySheet.SetColHidden(79,1);
              mySheet.SetColHidden(77,1);
              // 카드사업(순증유효회원)
              mySheet.SetColHidden(83,1);
              mySheet.SetColHidden(84,1);
              mySheet.SetColHidden(85,1);
              // 신탁사업(금전신탁)
              mySheet.SetColHidden(88,1);
              mySheet.SetColHidden(89,1);
              mySheet.SetColHidden(90,1);
              // 신탁사업(부동산신탁)
              mySheet.SetColHidden(93,1);
              mySheet.SetColHidden(94,1);
              mySheet.SetColHidden(95,1);
              // 공제사업(신계약 생명공제료)
              mySheet.SetColHidden(98,1);
              mySheet.SetColHidden(99,1);
              mySheet.SetColHidden(100,1);
              // 공제사업(신계약 손해공제료)
              mySheet.SetColHidden(103,1);
              mySheet.SetColHidden(104,1);
              mySheet.SetColHidden(105,1);
              // 펀드사업(수탁고)
              mySheet.SetColHidden(108,1);
              mySheet.SetColHidden(109,1);
              mySheet.SetColHidden(110,1);
              // 연계증권
              mySheet.SetColHidden(113,1);
              mySheet.SetColHidden(114,1);
              mySheet.SetColHidden(115,1);

          }
        }
    } else if(baseday >= '20190101') {
        if (subChk) {
          if (pgcode == '16') {
          /* -------- RMC 기준 -------- */            
              // 예수금 반기평잔
              mySheet.SetColHidden(5,0);
              mySheet.SetColHidden(6,0);
              mySheet.SetColHidden(7,0);
              // 예수금 순증잔액
              mySheet.SetColHidden(10,0);
              mySheet.SetColHidden(11,0);
              mySheet.SetColHidden(12,0);
              // 신규 기업예수금 고객 
              mySheet.SetColHidden(15,0);
              mySheet.SetColHidden(16,0);
              mySheet.SetColHidden(17,0);
              // 저비용성예수금 반기평잔
              mySheet.SetColHidden(20,0);
              mySheet.SetColHidden(21,0);
              mySheet.SetColHidden(22,0);
              // 저비용성예수금 월중평잔
              mySheet.SetColHidden(25,0);
              mySheet.SetColHidden(26,0);
              mySheet.SetColHidden(27,0);
              // 대출금
              mySheet.SetColHidden(30,0);
              mySheet.SetColHidden(31,0);
              mySheet.SetColHidden(32,0);
              // 신규 기업예수금 고객 
              mySheet.SetColHidden(35,0);
              mySheet.SetColHidden(36,0);
              mySheet.SetColHidden(37,0);
              // 연체율
              mySheet.SetColHidden(40,0);
              mySheet.SetColHidden(41,0);
              mySheet.SetColHidden(42,0);

          } else {
          /* -------- 영업점 기준 -------- */
              // 신규고객
              mySheet.SetColHidden(5,0);
              mySheet.SetColHidden(6,0);
              mySheet.SetColHidden(7,0);
              // 기존고객
              mySheet.SetColHidden(10,0);
              mySheet.SetColHidden(11,0);
              mySheet.SetColHidden(12,0);
              // 전략사업
              mySheet.SetColHidden(15,0);
              // 개인예수금(반기평잔)
              mySheet.SetColHidden(18,0);
              mySheet.SetColHidden(19,0);
              mySheet.SetColHidden(20,0);
              // 개인예수금(순증잔액)
              mySheet.SetColHidden(23,0);
              mySheet.SetColHidden(24,0);
              mySheet.SetColHidden(25,0);
              // 기업예수금(반기평잔)
              mySheet.SetColHidden(28,0);
              mySheet.SetColHidden(29,0);
              mySheet.SetColHidden(30,0);
              // 기업예수금(순증잔액)
              mySheet.SetColHidden(33,0);
              mySheet.SetColHidden(34,0);
              mySheet.SetColHidden(35,0);
              // 신규기업예수금고객
              mySheet.SetColHidden(38,0);
              mySheet.SetColHidden(39,0);
              mySheet.SetColHidden(40,0);
              // 저비용성예수금(반기평잔)
              mySheet.SetColHidden(43,0);
              mySheet.SetColHidden(44,0);
              mySheet.SetColHidden(45,0);
              // 저비용성예수금(월중평잔)
              mySheet.SetColHidden(48,0);
              mySheet.SetColHidden(49,0);
              mySheet.SetColHidden(50,0);
              // 기업대출금(순증잔액)
              mySheet.SetColHidden(53,0);
              mySheet.SetColHidden(54,0);
              mySheet.SetColHidden(55,0);
              // 수산해양대출금(순증잔액)
              mySheet.SetColHidden(58,0);
              mySheet.SetColHidden(59,0);
              mySheet.SetColHidden(60,0);
              // 소매대출금(순증잔액)
              mySheet.SetColHidden(63,0);
              mySheet.SetColHidden(64,0);
              mySheet.SetColHidden(65,0);
              // 카드사업(매출액)
              mySheet.SetColHidden(68,0);
              mySheet.SetColHidden(69,0);
              mySheet.SetColHidden(70,0);
              // 카드사업(순증유효회원)
              mySheet.SetColHidden(73,0);
              mySheet.SetColHidden(74,0);
              mySheet.SetColHidden(75,0);
              // 신탁사업(금전신탁)
              mySheet.SetColHidden(78,0);
              mySheet.SetColHidden(79,0);
              mySheet.SetColHidden(80,0);
              // 신탁사업(부동산신탁)
              mySheet.SetColHidden(83,0);
              mySheet.SetColHidden(84,0);
              mySheet.SetColHidden(85,0);
              // 공제사업(신계약 생명공제료)
              mySheet.SetColHidden(88,0);
              mySheet.SetColHidden(89,0);
              mySheet.SetColHidden(90,0);
              // 공제사업(신계약 손해공제료)
              mySheet.SetColHidden(93,0);
              mySheet.SetColHidden(94,0);
              mySheet.SetColHidden(95,0);
              // 펀드사업(수탁고)
              mySheet.SetColHidden(98,0);
              mySheet.SetColHidden(99,0);
              mySheet.SetColHidden(100,0);
              // 연계증권
              mySheet.SetColHidden(103,0);
              mySheet.SetColHidden(104,0);
              mySheet.SetColHidden(105,0);
              // 연체율
              mySheet.SetColHidden(108,0);
              mySheet.SetColHidden(109,0);
              mySheet.SetColHidden(110,0);

          }
        } else {
          if (pgcode == '16') {
              /* -------- RMC 기준 -------- */
              // 예수금 반기평잔
              mySheet.SetColHidden(5,1);
              mySheet.SetColHidden(6,1);
              mySheet.SetColHidden(7,1);
              // 예수금 순증잔액
              mySheet.SetColHidden(10,1);
              mySheet.SetColHidden(11,1);
              mySheet.SetColHidden(12,1);
              // 신규 기업예수금 고객
              mySheet.SetColHidden(15,1);
              mySheet.SetColHidden(16,1);
              mySheet.SetColHidden(17,1);
              // 저비용성예수금 반기평잔
              mySheet.SetColHidden(20,1);
              mySheet.SetColHidden(21,1);
              mySheet.SetColHidden(22,1);
              // 저비용성예수금 월중평잔
              mySheet.SetColHidden(25,1);
              mySheet.SetColHidden(26,1);
              mySheet.SetColHidden(27,1);
              // 대출금
              mySheet.SetColHidden(30,1);
              mySheet.SetColHidden(31,1);
              mySheet.SetColHidden(32,1);
              // 신규 기업예수금 고객
              mySheet.SetColHidden(35,1);
              mySheet.SetColHidden(36,1);
              mySheet.SetColHidden(37,1);
              // 연체율
              mySheet.SetColHidden(40,1);
              mySheet.SetColHidden(41,1);
              mySheet.SetColHidden(42,1);
          
          } else {
              /* -------- 영업점 기준 -------- */
              // 신규고객
              mySheet.SetColHidden(5,1);
              mySheet.SetColHidden(6,1);
              mySheet.SetColHidden(7,1);
              // 기존고객
              mySheet.SetColHidden(10,1);
              mySheet.SetColHidden(11,1);
              mySheet.SetColHidden(12,1);
              // 전략사업
              mySheet.SetColHidden(15,1);
              // 개인예수금(반기평잔)
              mySheet.SetColHidden(18,1);
              mySheet.SetColHidden(19,1);
              mySheet.SetColHidden(20,1);
              // 개인예수금(순증잔액)
              mySheet.SetColHidden(23,1);
              mySheet.SetColHidden(24,1);
              mySheet.SetColHidden(25,1);
              // 기업예수금(반기평잔)
              mySheet.SetColHidden(28,1);
              mySheet.SetColHidden(29,1);
              mySheet.SetColHidden(30,1);
              // 기업예수금(순증잔액)           
              mySheet.SetColHidden(33,1);
              mySheet.SetColHidden(34,1);
              mySheet.SetColHidden(35,1);
              // 신규기업예수금고객
              mySheet.SetColHidden(38,1);
              mySheet.SetColHidden(39,1);
              mySheet.SetColHidden(40,1);
              // 저비용성예수금(반기평잔)
              mySheet.SetColHidden(43,1);
              mySheet.SetColHidden(44,1);
              mySheet.SetColHidden(45,1);
              // 저비용성예수금(월중평잔)
              mySheet.SetColHidden(48,1);
              mySheet.SetColHidden(49,1);
              mySheet.SetColHidden(50,1);
              // 기업대출금(순증잔액)
              mySheet.SetColHidden(53,1);
              mySheet.SetColHidden(54,1);
              mySheet.SetColHidden(55,1);
              // 수산해양대출금(순증잔액)
              mySheet.SetColHidden(58,1);
              mySheet.SetColHidden(59,1);
              mySheet.SetColHidden(60,1);
              // 소매대출금(순증잔액)
              mySheet.SetColHidden(63,1);
              mySheet.SetColHidden(64,1);
              mySheet.SetColHidden(65,1);
              // 카드사업(매출액)
              mySheet.SetColHidden(68,1);
              mySheet.SetColHidden(69,1);
              mySheet.SetColHidden(70,1);
              // 카드사업(순증유효회원)
              mySheet.SetColHidden(73,1);
              mySheet.SetColHidden(74,1);
              mySheet.SetColHidden(75,1);
              // 신탁사업(금전신탁)
              mySheet.SetColHidden(78,1);
              mySheet.SetColHidden(79,1);
              mySheet.SetColHidden(80,1);
              // 신탁사업(부동산신탁)
              mySheet.SetColHidden(83,1);
              mySheet.SetColHidden(84,1);
              mySheet.SetColHidden(85,1);
              // 공제사업(신계약 생명공제료)
              mySheet.SetColHidden(88,1);
              mySheet.SetColHidden(89,1);
              mySheet.SetColHidden(90,1);
              // 공제사업(신계약 손해공제료)
              mySheet.SetColHidden(93,1);
              mySheet.SetColHidden(94,1);
              mySheet.SetColHidden(95,1);
              // 펀드사업(수탁고)
              mySheet.SetColHidden(98,1);
              mySheet.SetColHidden(99,1);
              mySheet.SetColHidden(100,1);
              // 연계증권
              mySheet.SetColHidden(103,1);
              mySheet.SetColHidden(104,1);
              mySheet.SetColHidden(105,1);
              // 연체율
              mySheet.SetColHidden(108,1);
              mySheet.SetColHidden(109,1);
              mySheet.SetColHidden(110,1);

          }
        }
    } else if(baseday >= '20180701') {
    	  // 2018년도 하반기
        if (subChk) {
          /* -------- RMC 기준 -------- */
          if (pgcode == '16') {
            if (baseday >= '20181011') {
              // 신규 기업예수금 고객
              // 신탁사업을 특정금전과 재산신탁으로 분리
              mySheet.SetColHidden(5,0);
              mySheet.SetColHidden(6,0);
              mySheet.SetColHidden(7,0);
              // 예수금 반기평잔
              mySheet.SetColHidden(10,0);
              mySheet.SetColHidden(11,0);
              mySheet.SetColHidden(12,0);
              // 예수금 순증잔액
              mySheet.SetColHidden(15,0);
              mySheet.SetColHidden(16,0);
              mySheet.SetColHidden(17,0);
              // 대출금
              mySheet.SetColHidden(20,0);
              mySheet.SetColHidden(21,0);
              mySheet.SetColHidden(22,0);
              // 외환사업
              mySheet.SetColHidden(25,0);
              mySheet.SetColHidden(26,0);
              mySheet.SetColHidden(27,0);
              // 카드사업(매출액)
              mySheet.SetColHidden(30,0);
              mySheet.SetColHidden(31,0);
              mySheet.SetColHidden(32,0);
              // 신탁사업(특정금전)
              mySheet.SetColHidden(35,0);
              mySheet.SetColHidden(36,0);
              mySheet.SetColHidden(37,0);
              // 신탁사업(재산신탁)
              mySheet.SetColHidden(40,0);
              mySheet.SetColHidden(41,0);
              mySheet.SetColHidden(42,0);
              // 연체율
              mySheet.SetColHidden(45,0);
              mySheet.SetColHidden(46,0);
              mySheet.SetColHidden(47,0);
              
            } else {
              // 신규 기업예수금 고객
              mySheet.SetColHidden(5,0);
              mySheet.SetColHidden(6,0);
              mySheet.SetColHidden(7,0);
              // 예수금 반기평잔
              mySheet.SetColHidden(10,0);
              mySheet.SetColHidden(11,0);
              mySheet.SetColHidden(12,0);
              // 예수금 순증잔액
              mySheet.SetColHidden(15,0);
              mySheet.SetColHidden(16,0);
              mySheet.SetColHidden(17,0);
              // 대출금
              mySheet.SetColHidden(20,0);
              mySheet.SetColHidden(21,0);
              mySheet.SetColHidden(22,0);
              // 외환사업
              mySheet.SetColHidden(25,0);
              mySheet.SetColHidden(26,0);
              mySheet.SetColHidden(27,0);
              // 카드사업(매출액)
              mySheet.SetColHidden(30,0);
              mySheet.SetColHidden(31,0);
              mySheet.SetColHidden(32,0);
              // 신탁사업
              mySheet.SetColHidden(35,0);
              mySheet.SetColHidden(36,0);
              mySheet.SetColHidden(37,0);
              // 연체율
              mySheet.SetColHidden(40,0);
              mySheet.SetColHidden(41,0);
              mySheet.SetColHidden(42,0);

            }
          }
          /* -------- 영업점 기준 -------- */
          else {
            // 신규고객
            mySheet.SetColHidden(5,0);
            mySheet.SetColHidden(6,0);
            mySheet.SetColHidden(7,0);
            // 기존고객
            mySheet.SetColHidden(10,0);
            mySheet.SetColHidden(11,0);
            mySheet.SetColHidden(12,0);
            // 신규 기업예수금 고객
            mySheet.SetColHidden(15,0);
            mySheet.SetColHidden(16,0);
            mySheet.SetColHidden(17,0);
            // 전략사업
            mySheet.SetColHidden(24,0);
            // 개인예수금(반기평잔)
            mySheet.SetColHidden(27,0);
            mySheet.SetColHidden(28,0);
            mySheet.SetColHidden(29,0);
            // 개인예수금(순증잔액)
            mySheet.SetColHidden(32,0);
            mySheet.SetColHidden(33,0);
            mySheet.SetColHidden(34,0);
            // 개인적립식예수금(신규잔액)
            mySheet.SetColHidden(37,0);
            mySheet.SetColHidden(38,0);
            mySheet.SetColHidden(39,0);
            // 소매대출금(순증잔액)
            mySheet.SetColHidden(42,0);
            mySheet.SetColHidden(43,0);
            mySheet.SetColHidden(44,0);
            // 기업예수금(반기평잔)
            mySheet.SetColHidden(47,0);
            mySheet.SetColHidden(48,0);
            mySheet.SetColHidden(49,0);
            // 기업예수금(순증잔액)
            mySheet.SetColHidden(52,0);
            mySheet.SetColHidden(53,0);
            mySheet.SetColHidden(54,0);
            // 기업대출금(순증잔액)
            mySheet.SetColHidden(57,0);
            mySheet.SetColHidden(58,0);
            mySheet.SetColHidden(59,0);
            // 수산해양대출금(순증잔액)
            mySheet.SetColHidden(62,0);
            mySheet.SetColHidden(63,0);
            mySheet.SetColHidden(64,0);
            // 외환사업
            mySheet.SetColHidden(67,0);
            mySheet.SetColHidden(68,0);
            mySheet.SetColHidden(69,0);
            // 카드사업(매출액)
            mySheet.SetColHidden(72,0);
            mySheet.SetColHidden(73,0);
            mySheet.SetColHidden(74,0);
            // 카드사업(순증유효회원)
            mySheet.SetColHidden(77,0);
            mySheet.SetColHidden(78,0);
            mySheet.SetColHidden(79,0);
            // 신탁사업(금전신탁)
            mySheet.SetColHidden(82,0);
            mySheet.SetColHidden(83,0);
            mySheet.SetColHidden(84,0);
            // 신탁사업(부동산신탁)
            mySheet.SetColHidden(87,0);
            mySheet.SetColHidden(88,0);
            mySheet.SetColHidden(89,0);
            // 공제사업(신계약 생명공제료)
            mySheet.SetColHidden(92,0);
            mySheet.SetColHidden(93,0);
            mySheet.SetColHidden(94,0);
            // 공제사업(신계약 손해공제료)
            mySheet.SetColHidden(97,0);
            mySheet.SetColHidden(98,0);
            mySheet.SetColHidden(99,0);
            // 펀드사업(수탁고)
            mySheet.SetColHidden(102,0);
            mySheet.SetColHidden(103,0);
            mySheet.SetColHidden(104,0);

          }
        } 
        else {
          /* -------- RMC 기준 -------- */
          if (pgcode == '16') {
            if (baseday >= '20181011') {
              // 신탁사업을 특정금전과 재산신탁으로 분리
              // 신규 기업예수금 고객
              mySheet.SetColHidden(5,1);
              mySheet.SetColHidden(6,1);
              mySheet.SetColHidden(7,1);
              // 예수금 반기평잔
              mySheet.SetColHidden(10,1);
              mySheet.SetColHidden(11,1);
              mySheet.SetColHidden(12,1);
              // 예수금 순증잔액            
              mySheet.SetColHidden(15,1);
              mySheet.SetColHidden(16,1);
              mySheet.SetColHidden(17,1);
              // 대출금
              mySheet.SetColHidden(20,1);
              mySheet.SetColHidden(21,1);
              mySheet.SetColHidden(22,1);
              // 외환사업
              mySheet.SetColHidden(25,1);
              mySheet.SetColHidden(26,1);
              mySheet.SetColHidden(27,1);
              // 카드사업(매출액)
              mySheet.SetColHidden(30,1);
              mySheet.SetColHidden(31,1);
              mySheet.SetColHidden(32,1);
              // 신탁사업(특정금전)
              mySheet.SetColHidden(35,1);
              mySheet.SetColHidden(36,1);
              mySheet.SetColHidden(37,1);
              // 신탁사업(재산신탁)
              mySheet.SetColHidden(40,1);
              mySheet.SetColHidden(41,1);
              mySheet.SetColHidden(42,1);
              // 연체율
              mySheet.SetColHidden(45,1);
              mySheet.SetColHidden(46,1);
              mySheet.SetColHidden(47,1);
             
            } else {
              // 신규 기업예수금 고객
              mySheet.SetColHidden(5,1);
              mySheet.SetColHidden(6,1);
              mySheet.SetColHidden(7,1);
              // 예수금 반기평잔
              mySheet.SetColHidden(10,1);
              mySheet.SetColHidden(11,1);
              mySheet.SetColHidden(12,1);
              // 예수금 순증잔액            
              mySheet.SetColHidden(15,1);
              mySheet.SetColHidden(16,1);
              mySheet.SetColHidden(17,1);
              // 대출금
              mySheet.SetColHidden(20,1);
              mySheet.SetColHidden(21,1);
              mySheet.SetColHidden(22,1);
              // 외환사업
              mySheet.SetColHidden(25,1);
              mySheet.SetColHidden(26,1);
              mySheet.SetColHidden(27,1);
              // 카드사업(매출액)
              mySheet.SetColHidden(30,1);
              mySheet.SetColHidden(31,1);
              mySheet.SetColHidden(32,1);
              // 신탁사업
              mySheet.SetColHidden(35,1);
              mySheet.SetColHidden(36,1);
              mySheet.SetColHidden(37,1);
              // 연체율
              mySheet.SetColHidden(40,1);
              mySheet.SetColHidden(41,1);
              mySheet.SetColHidden(42,1);

            }
          }
          /* -------- 영업점 기준 -------- */
          else {
            // 신규고객
            mySheet.SetColHidden(5,1);
            mySheet.SetColHidden(6,1);
            mySheet.SetColHidden(7,1);
            // 기존고객
            mySheet.SetColHidden(10,1);
            mySheet.SetColHidden(11,1);
            mySheet.SetColHidden(12,1);
            // 신규 기업예수금 고객
            mySheet.SetColHidden(15,1);
            mySheet.SetColHidden(16,1);
            mySheet.SetColHidden(17,1);
            // 전략사업
            mySheet.SetColHidden(24,1);
            // 개인예수금(반기평잔)
            mySheet.SetColHidden(27,1);
            mySheet.SetColHidden(28,1);
            mySheet.SetColHidden(29,1);
            // 개인예수금(순증잔액)
            mySheet.SetColHidden(32,1);
            mySheet.SetColHidden(33,1);
            mySheet.SetColHidden(34,1);
            // 개인적립식예수금(신규잔액)
            mySheet.SetColHidden(37,1);
            mySheet.SetColHidden(38,1);
            mySheet.SetColHidden(39,1);
            // 소매대출금(순증잔액)
            mySheet.SetColHidden(42,1);
            mySheet.SetColHidden(43,1);
            mySheet.SetColHidden(44,1);
            // 기업예수금(반기평잔)
            mySheet.SetColHidden(47,1);
            mySheet.SetColHidden(48,1);
            mySheet.SetColHidden(49,1);
            // 기업예수금(순증잔액)
            mySheet.SetColHidden(52,1);
            mySheet.SetColHidden(53,1);
            mySheet.SetColHidden(54,1);
            // 기업대출금(순증잔액)
            mySheet.SetColHidden(57,1);
            mySheet.SetColHidden(58,1);
            mySheet.SetColHidden(59,1);
            // 수산해양대출금(순증잔액)
            mySheet.SetColHidden(62,1);
            mySheet.SetColHidden(63,1);
            mySheet.SetColHidden(64,1);
            // 외환사업
            mySheet.SetColHidden(67,1);
            mySheet.SetColHidden(68,1);
            mySheet.SetColHidden(69,1);
            // 카드사업(매출액)
            mySheet.SetColHidden(72,1);
            mySheet.SetColHidden(73,1);
            mySheet.SetColHidden(74,1);
            // 카드사업(순증유효회원)
            mySheet.SetColHidden(77,1);
            mySheet.SetColHidden(78,1);
            mySheet.SetColHidden(79,1);
            // 신탁사업(금전신탁)
            mySheet.SetColHidden(82,1);
            mySheet.SetColHidden(83,1);
            mySheet.SetColHidden(84,1);
            // 신탁사업(부동산신탁)
            mySheet.SetColHidden(87,1);
            mySheet.SetColHidden(88,1);
            mySheet.SetColHidden(89,1);
            // 공제사업(신계약 생명공제료)
            mySheet.SetColHidden(92,1);
            mySheet.SetColHidden(93,1);
            mySheet.SetColHidden(94,1);
            // 공제사업(신계약 손해공제료)
            mySheet.SetColHidden(97,1);
            mySheet.SetColHidden(98,1);
            mySheet.SetColHidden(99,1);
            // 펀드사업(수탁고)
            mySheet.SetColHidden(102,1);
            mySheet.SetColHidden(103,1);
            mySheet.SetColHidden(104,1);

          }
        }
    } else if(baseday >= '20180101') {
    	  // 2018년도 
        if (subChk) {
            mySheet.SetColHidden(5,0);// 전략사업

            mySheet.SetColHidden(8,0);// 외환사업
            mySheet.SetColHidden(9,0);
            mySheet.SetColHidden(10,0);

            mySheet.SetColHidden(13,0);// 카드사업_매출액
            mySheet.SetColHidden(14,0);
            mySheet.SetColHidden(15,0);

            mySheet.SetColHidden(18,0);// 카드사업_누증유효회원
            mySheet.SetColHidden(19,0);
            mySheet.SetColHidden(20,0);

            // Peer Group RMC인 경우 처리
            if (pgcode == '16'){
            mySheet.SetColHidden(23,1);// 신탁사업_금전신탁
            mySheet.SetColHidden(24,1);
            mySheet.SetColHidden(25,1);

            mySheet.SetColHidden(28,1);// 신탁사업_부동산신탁
            mySheet.SetColHidden(29,1);
            mySheet.SetColHidden(30,1);

            mySheet.SetColHidden(33,0);// 신탁사업
            mySheet.SetColHidden(34,0);
            mySheet.SetColHidden(35,0);

            }
            else {
            mySheet.SetColHidden(23,0);// 신탁사업_금전신탁
            mySheet.SetColHidden(24,0);
            mySheet.SetColHidden(25,0);

            mySheet.SetColHidden(28,0);// 신탁사업_부동산신탁
            mySheet.SetColHidden(29,0);
            mySheet.SetColHidden(30,0);

            mySheet.SetColHidden(33,1);// 신탁사업
            mySheet.SetColHidden(34,1);
            mySheet.SetColHidden(35,1);

            }
            mySheet.SetColHidden(38,0);// 공제사업_총납입공제료
            mySheet.SetColHidden(39,0);
            mySheet.SetColHidden(40,0);

            mySheet.SetColHidden(43,0);// 공제사업_신규저축성공제료
            mySheet.SetColHidden(44,0);
            mySheet.SetColHidden(45,0);

            mySheet.SetColHidden(48,0);// 공제사업_신규보장성공제료
            mySheet.SetColHidden(49,0);
            mySheet.SetColHidden(50,0);

            mySheet.SetColHidden(53,0);// 펀드사업_전략상품수탁고
            mySheet.SetColHidden(54,0);
            mySheet.SetColHidden(55,0);

            mySheet.SetColHidden(58,0);// 소매예수금_반기평잔
            mySheet.SetColHidden(59,0);
            mySheet.SetColHidden(60,0);
            mySheet.SetColHidden(63,0);// 소매예수금_순증잔액
            mySheet.SetColHidden(64,0);
            mySheet.SetColHidden(65,0);

            mySheet.SetColHidden(68,0);// 적립식예수금_신규잔액
            mySheet.SetColHidden(69,0);
            mySheet.SetColHidden(70,0);

            mySheet.SetColHidden(73,0);// 기업예수금_반기평잔
            mySheet.SetColHidden(74,0);
            mySheet.SetColHidden(75,0);

            mySheet.SetColHidden(78,0);// 기업예수금_월중평잔
            mySheet.SetColHidden(79,0);
            mySheet.SetColHidden(80,0);

            mySheet.SetColHidden(83,0);// 소매대출금_순증잔액
            mySheet.SetColHidden(84,0);
            mySheet.SetColHidden(85,0);

            mySheet.SetColHidden(88,0);// 기업대출금_순증잔액
            mySheet.SetColHidden(89,0);
            mySheet.SetColHidden(90,0);

            mySheet.SetColHidden(93,0);// 수산해양대출금_순증잔액
            mySheet.SetColHidden(94,0);
            mySheet.SetColHidden(95,0);

            mySheet.SetColHidden(98,0);// 연체율
            mySheet.SetColHidden(99,0);
            mySheet.SetColHidden(100,0);

        } else {
        	
            mySheet.SetColHidden(5,1);// 전략사업

            mySheet.SetColHidden(8,1);// 외환사업
            mySheet.SetColHidden(9,1);
            mySheet.SetColHidden(10,1);

            mySheet.SetColHidden(13,1);// 카드사업_매출액
            mySheet.SetColHidden(14,1);
            mySheet.SetColHidden(15,1);

            mySheet.SetColHidden(18,1);// 카드사업_누증유효회원
            mySheet.SetColHidden(19,1);
            mySheet.SetColHidden(20,1);

            mySheet.SetColHidden(23,1);// 신탁사업_금전신탁
            mySheet.SetColHidden(24,1);
            mySheet.SetColHidden(25,1);

            mySheet.SetColHidden(28,1);// 신탁사업_부동산신탁
            mySheet.SetColHidden(29,1);
            mySheet.SetColHidden(30,1);

            mySheet.SetColHidden(33,1);// 신탁사업
            mySheet.SetColHidden(34,1);
            mySheet.SetColHidden(35,1);

            mySheet.SetColHidden(38,1);// 공제사업_총납입공제료
            mySheet.SetColHidden(39,1);
            mySheet.SetColHidden(40,1);

            mySheet.SetColHidden(43,1);// 공제사업_신규저축성공제료
            mySheet.SetColHidden(44,1);
            mySheet.SetColHidden(45,1);

            mySheet.SetColHidden(48,1);// 공제사업_신규보장성공제료
            mySheet.SetColHidden(49,1);
            mySheet.SetColHidden(50,1);

            mySheet.SetColHidden(53,1);// 펀드사업_전략상품수탁고
            mySheet.SetColHidden(54,1);
            mySheet.SetColHidden(55,1);

            mySheet.SetColHidden(58,1);// 소매예수금_반기평잔
            mySheet.SetColHidden(59,1);
            mySheet.SetColHidden(60,1);

            mySheet.SetColHidden(63,1);// 소매예수금_순증잔액
            mySheet.SetColHidden(64,1);
            mySheet.SetColHidden(65,1);

            mySheet.SetColHidden(68,1);// 적립식예수금_신규잔액
            mySheet.SetColHidden(69,1);
            mySheet.SetColHidden(70,1);

            mySheet.SetColHidden(73,1);// 기업예수금_반기평잔
            mySheet.SetColHidden(74,1);
            mySheet.SetColHidden(75,1);

            mySheet.SetColHidden(78,1);// 기업예수금_월중평잔
            mySheet.SetColHidden(79,1);
            mySheet.SetColHidden(80,1);

            mySheet.SetColHidden(83,1);// 소매대출금_순증잔액
            mySheet.SetColHidden(84,1);
            mySheet.SetColHidden(85,1);

            mySheet.SetColHidden(88,1);// 기업대출금_순증잔액
            mySheet.SetColHidden(89,1);
            mySheet.SetColHidden(90,1);

            mySheet.SetColHidden(93,1);// 수산해양대출금_순증잔액
            mySheet.SetColHidden(94,1);
            mySheet.SetColHidden(95,1);

            mySheet.SetColHidden(98,1);// 연체율
            mySheet.SetColHidden(99,1);
            mySheet.SetColHidden(100,1);

        }
    } else if(baseday >= '20170701') {
    	  // 2017년도 하반기
        if (subChk) {
            mySheet.SetColHidden(5,0);// 전략사업

            mySheet.SetColHidden(8,0);// 외환사업
            mySheet.SetColHidden(9,0);
            mySheet.SetColHidden(10,0);

            mySheet.SetColHidden(13,0);// 카드사업_카드매출액
            mySheet.SetColHidden(14,0);
            mySheet.SetColHidden(15,0);

            mySheet.SetColHidden(18,0);// 카드사업_순증유효회원
            mySheet.SetColHidden(19,0);
            mySheet.SetColHidden(20,0);

            mySheet.SetColHidden(23,0);// 신탁사업_금전신탁
            mySheet.SetColHidden(24,0);
            mySheet.SetColHidden(25,0);

            mySheet.SetColHidden(28,0);// 신탁사업_부동산신탁
            mySheet.SetColHidden(29,0);
            mySheet.SetColHidden(30,0);

            mySheet.SetColHidden(33,0);// 공제사업_총납입공제
            mySheet.SetColHidden(34,0);
            mySheet.SetColHidden(35,0);

            mySheet.SetColHidden(38,0);// 공제사업_신규보장성
            mySheet.SetColHidden(39,0);
            mySheet.SetColHidden(40,0);

            mySheet.SetColHidden(41,0);// 공제사업_적립식공제료
            mySheet.SetColHidden(42,0);
            mySheet.SetColHidden(43,0);

            mySheet.SetColHidden(46,0);// 펀드사업_전략상품수탁고
            mySheet.SetColHidden(47,0);
            mySheet.SetColHidden(48,0);

            mySheet.SetColHidden(51,0);// 예수금_총예수금_잔액
            mySheet.SetColHidden(52,0);
            mySheet.SetColHidden(53,0);

            mySheet.SetColHidden(56,0);// 예수금_총예수금_반평
            mySheet.SetColHidden(57,0);
            mySheet.SetColHidden(58,0);

            // 2017.06.20 : 6월 및 12월에만 월중평잔 보여주도록함 (6월은 19일자 부터)
            if( (baseday >= '20170619' && baseday <= '20170630') ||
                (baseday >= '20171201' && baseday <= '20171231')  )
            {
                mySheet.SetColHidden(61,0);// 예수금_총예수금_월평
                mySheet.SetColHidden(62,0);
                mySheet.SetColHidden(63,0);

            }

            mySheet.SetColHidden(66,0);// 예수금_개인예수금_반평
            mySheet.SetColHidden(67,0);
            mySheet.SetColHidden(68,0);

            mySheet.SetColHidden(71,0);// 예수금_개인예수금_잔액
            mySheet.SetColHidden(72,0);
            mySheet.SetColHidden(73,0);

            mySheet.SetColHidden(76,0);// 예수금_적립식_잔액
            mySheet.SetColHidden(77,0);
            mySheet.SetColHidden(78,0);

            mySheet.SetColHidden(81,0);// 예수금_중저원가성_반평
            mySheet.SetColHidden(82,0);
            mySheet.SetColHidden(83,0);

            mySheet.SetColHidden(86,0);// 대출금_일반여신
            mySheet.SetColHidden(87,0);
            mySheet.SetColHidden(88,0);

            mySheet.SetColHidden(91,0);// 대출금_수산해양
            mySheet.SetColHidden(92,0);
            mySheet.SetColHidden(93,0);

            mySheet.SetColHidden(96,0);// 소매여신_신규잔액
            mySheet.SetColHidden(97,0);
            mySheet.SetColHidden(98,0);

            mySheet.SetColHidden(101,0);// 예대율
            mySheet.SetColHidden(102,0);
            mySheet.SetColHidden(103,0);

            mySheet.SetColHidden(106,0);// 연체율
            mySheet.SetColHidden(107,0);
            mySheet.SetColHidden(108,0);

        } else {
            mySheet.SetColHidden(5,1);// 전략사업

            mySheet.SetColHidden(8,1);// 외환사업
            mySheet.SetColHidden(9,1);
            mySheet.SetColHidden(10,1);

            mySheet.SetColHidden(13,1);// 카드사업_카드매출액
            mySheet.SetColHidden(14,1);
            mySheet.SetColHidden(15,1);

            mySheet.SetColHidden(18,1);// 카드사업_순증유효회원
            mySheet.SetColHidden(19,1);
            mySheet.SetColHidden(20,1);

            mySheet.SetColHidden(23,1);// 신탁사업_금전신탁
            mySheet.SetColHidden(24,1);
            mySheet.SetColHidden(25,1);

            mySheet.SetColHidden(28,1);// 신탁사업_부동산신탁
            mySheet.SetColHidden(29,1);
            mySheet.SetColHidden(30,1);

            mySheet.SetColHidden(33,1);// 공제사업_총납입공제
            mySheet.SetColHidden(34,1);
            mySheet.SetColHidden(35,1);

            mySheet.SetColHidden(38,1);// 공제사업_신규보장성
            mySheet.SetColHidden(39,1);
            mySheet.SetColHidden(40,1);

            mySheet.SetColHidden(41,1);// 공제사업_적립식공제료
            mySheet.SetColHidden(42,1);
            mySheet.SetColHidden(43,1);

            mySheet.SetColHidden(46,1);// 펀드사업_전략상품수탁고
            mySheet.SetColHidden(47,1);
            mySheet.SetColHidden(48,1);

            mySheet.SetColHidden(51,1);// 예수금_총예수금_잔액
            mySheet.SetColHidden(52,1);
            mySheet.SetColHidden(53,1);

            mySheet.SetColHidden(56,1);// 예수금_총예수금_반평
            mySheet.SetColHidden(57,1);
            mySheet.SetColHidden(58,1);


            // 2017.06.20 : 6월 및 12월에만 월중평잔 보여주도록함 (6월은 19일자 부터)
            if( (baseday >= '20170619' && baseday <= '20170630') ||
                (baseday >= '20171201' && baseday <= '20171231')  )
            {
                mySheet.SetColHidden(61,1);// 예수금_총예수금_월평
                mySheet.SetColHidden(62,1);
                mySheet.SetColHidden(63,1);

            }

            mySheet.SetColHidden(66,1);// 예수금_개인예수금_반평
            mySheet.SetColHidden(67,1);
            mySheet.SetColHidden(68,1);

            mySheet.SetColHidden(71,1);// 예수금_개인예수금_잔액
            mySheet.SetColHidden(72,1);
            mySheet.SetColHidden(73,1);

            mySheet.SetColHidden(76,1);// 예수금_적립식_잔액
            mySheet.SetColHidden(77,1);
            mySheet.SetColHidden(78,1);

            mySheet.SetColHidden(81,1);// 예수금_중저원가성_반평
            mySheet.SetColHidden(82,1);
            mySheet.SetColHidden(83,1);

            mySheet.SetColHidden(86,1);// 대출금_일반여신
            mySheet.SetColHidden(87,1);
            mySheet.SetColHidden(88,1);

            mySheet.SetColHidden(91,1);// 대출금_수산해양
            mySheet.SetColHidden(92,1);
            mySheet.SetColHidden(93,1);

            mySheet.SetColHidden(96,1);// 소매여신_신규잔액
            mySheet.SetColHidden(97,1);
            mySheet.SetColHidden(98,1);

            mySheet.SetColHidden(101,1);// 예대율
            mySheet.SetColHidden(102,1);
            mySheet.SetColHidden(103,1);

            mySheet.SetColHidden(106,1);// 연체율
            mySheet.SetColHidden(107,1);
            mySheet.SetColHidden(108,1);

        }
    } else if(baseday >= '20170101') {
    	  // 2017년도 상반기
        if (subChk) {
            mySheet.SetColHidden(5,0);// 전략사업

            mySheet.SetColHidden(8,0);// 외환사업
            mySheet.SetColHidden(9,0);
            mySheet.SetColHidden(10,0);

            mySheet.SetColHidden(13,0);// 카드사업_카드매출액
            mySheet.SetColHidden(14,0);
            mySheet.SetColHidden(15,0);

            mySheet.SetColHidden(18,0);// 카드사업_순증유효회원
            mySheet.SetColHidden(19,0);
            mySheet.SetColHidden(20,0);

            mySheet.SetColHidden(23,0);// 신탁사업_특정금전신탁
            mySheet.SetColHidden(24,0);
            mySheet.SetColHidden(25,0);

            mySheet.SetColHidden(28,0);// 신탁사업_부동산신탁
            mySheet.SetColHidden(29,0);
            mySheet.SetColHidden(30,0);

            mySheet.SetColHidden(33,0);// 공제사업_총납입공제
            mySheet.SetColHidden(34,0);
            mySheet.SetColHidden(35,0);

            mySheet.SetColHidden(38,0);// 공제사업_신규보장성
            mySheet.SetColHidden(39,0);
            mySheet.SetColHidden(40,0);

            mySheet.SetColHidden(41,0);// 공제사업_적립식공제료
            mySheet.SetColHidden(42,0);
            mySheet.SetColHidden(43,0);

            mySheet.SetColHidden(46,0);// 펀드사업_전략상품수탁고
            mySheet.SetColHidden(47,0);
            mySheet.SetColHidden(48,0);

            mySheet.SetColHidden(51,0);// 예수금_총예수금_잔액
            mySheet.SetColHidden(52,0);
            mySheet.SetColHidden(53,0);

            mySheet.SetColHidden(56,0);// 예수금_총예수금_반평
            mySheet.SetColHidden(57,0);
            mySheet.SetColHidden(58,0);


            // 2017.06.20 : 6월 및 12월에만 월중평잔 보여주도록함 (6월은 19일자 부터)
            if( (baseday >= '20170619' && baseday <= '20170630') ||
                (baseday >= '20171201' && baseday <= '20171231')  )
            {
                mySheet.SetColHidden(61,0);// 예수금_총예수금_월평
                mySheet.SetColHidden(62,0);
                mySheet.SetColHidden(63,0);

            }

            mySheet.SetColHidden(66,0);// 예수금_적립식_잔액
            mySheet.SetColHidden(67,0);
            mySheet.SetColHidden(68,0);

            mySheet.SetColHidden(71,0);// 예수금_중저원가성_반평
            mySheet.SetColHidden(72,0);
            mySheet.SetColHidden(73,0);

            mySheet.SetColHidden(76,0);// 대출금_일반여신
            mySheet.SetColHidden(77,0);
            mySheet.SetColHidden(78,0);

            mySheet.SetColHidden(81,0);// 대출금_수산해양
            mySheet.SetColHidden(82,0);
            mySheet.SetColHidden(83,0);

            mySheet.SetColHidden(86,0);// 소매여신_신규잔액
            mySheet.SetColHidden(87,0);
            mySheet.SetColHidden(88,0);

            mySheet.SetColHidden(91,0);// 예대율
            mySheet.SetColHidden(92,0);
            mySheet.SetColHidden(93,0);

            mySheet.SetColHidden(96,0);// 연체율
            mySheet.SetColHidden(97,0);
            mySheet.SetColHidden(98,0);

        } else {
            mySheet.SetColHidden(5,1);// 전략사업

            mySheet.SetColHidden(8,1);// 외환사업
            mySheet.SetColHidden(9,1);
            mySheet.SetColHidden(10,1);

            mySheet.SetColHidden(13,1);// 카드사업_카드매출액
            mySheet.SetColHidden(14,1);
            mySheet.SetColHidden(15,1);

            mySheet.SetColHidden(18,1);// 카드사업_순증유효회원
            mySheet.SetColHidden(19,1);
            mySheet.SetColHidden(20,1);

            mySheet.SetColHidden(23,1);// 신탁사업_특정금전신탁
            mySheet.SetColHidden(24,1);
            mySheet.SetColHidden(25,1);

            mySheet.SetColHidden(28,1);// 신탁사업_부동산신탁
            mySheet.SetColHidden(29,1);
            mySheet.SetColHidden(30,1);

            mySheet.SetColHidden(33,1);// 공제사업_총납입공제
            mySheet.SetColHidden(34,1);
            mySheet.SetColHidden(35,1);

            mySheet.SetColHidden(38,1);// 공제사업_신규보장성
            mySheet.SetColHidden(39,1);
            mySheet.SetColHidden(40,1);

            mySheet.SetColHidden(41,1);// 공제사업_적립식공제료
            mySheet.SetColHidden(42,1);
            mySheet.SetColHidden(43,1);

            mySheet.SetColHidden(46,1);// 펀드사업_전략상품수탁고
            mySheet.SetColHidden(47,1);
            mySheet.SetColHidden(48,1);

            mySheet.SetColHidden(51,1);// 예수금_총예수금_잔액
            mySheet.SetColHidden(52,1);
            mySheet.SetColHidden(53,1);

            mySheet.SetColHidden(56,1);// 예수금_총예수금_반평
            mySheet.SetColHidden(57,1);
            mySheet.SetColHidden(58,1);


            // 2017.06.20 : 6월 및 12월에만 월중평잔 보여주도록함 (6월은 19일자 부터)
            if( (baseday >= '20170619' && baseday <= '20170630') ||
                (baseday >= '20171201' && baseday <= '20171231')  )
            {
                mySheet.SetColHidden(61,1);// 예수금_총예수금_월평
                mySheet.SetColHidden(62,1);
                mySheet.SetColHidden(63,1);

            }
  
            mySheet.SetColHidden(66,1);// 예수금_적립식_잔액
            mySheet.SetColHidden(67,1);
            mySheet.SetColHidden(68,1);

            mySheet.SetColHidden(71,1);// 예수금_중저원가성_반평
            mySheet.SetColHidden(72,1);
            mySheet.SetColHidden(73,1);

            mySheet.SetColHidden(76,1);// 대출금_일반여신
            mySheet.SetColHidden(77,1);
            mySheet.SetColHidden(78,1);

            mySheet.SetColHidden(81,1);// 대출금_수산해양
            mySheet.SetColHidden(82,1);
            mySheet.SetColHidden(83,1);

            mySheet.SetColHidden(86,1);// 소매여신_신규잔액
            mySheet.SetColHidden(87,1);
            mySheet.SetColHidden(88,1);

            mySheet.SetColHidden(91,1);// 예대율
            mySheet.SetColHidden(92,1);
            mySheet.SetColHidden(93,1);

            mySheet.SetColHidden(96,1);// 연체율
            mySheet.SetColHidden(97,1);
            mySheet.SetColHidden(98,1);

        }
    } else if(baseday >= '20160701') {
    	  // 2016년도 하반기
        if (subChk) {
            mySheet.SetColHidden(5,0);// 예수금_순수개인_잔액
            mySheet.SetColHidden(6,0);
            mySheet.SetColHidden(7,0);

            mySheet.SetColHidden(10,0);// 예수금_순수개인_반평
            mySheet.SetColHidden(11,0);
            mySheet.SetColHidden(12,0);

            mySheet.SetColHidden(15,0);// 예수금_거치적립식_잔액
            mySheet.SetColHidden(16,0);
            mySheet.SetColHidden(17,0);

            mySheet.SetColHidden(20,0);// 예수금_거치적립식_반평
            mySheet.SetColHidden(21,0);
            mySheet.SetColHidden(22,0);

            mySheet.SetColHidden(25,0);// 예수금_중저원가성_반평
            mySheet.SetColHidden(26,0);
            mySheet.SetColHidden(27,0);

            mySheet.SetColHidden(30,0);// 대출금_신규잔액
            mySheet.SetColHidden(31,0);
            mySheet.SetColHidden(32,0);

            mySheet.SetColHidden(35,0);// 소매여신_신규잔액
            mySheet.SetColHidden(36,0);
            mySheet.SetColHidden(37,0);

            mySheet.SetColHidden(40,0);// 연체율
            mySheet.SetColHidden(41,0);
            mySheet.SetColHidden(42,0);

            mySheet.SetColHidden(51,0);// 외환사업
            mySheet.SetColHidden(52,0);
            mySheet.SetColHidden(53,0);

            mySheet.SetColHidden(56,0);// 카드사업_신용카드매출액
            mySheet.SetColHidden(57,0);
            mySheet.SetColHidden(58,0);

            mySheet.SetColHidden(61,0);// 카드사업_체크카드매출액
            mySheet.SetColHidden(62,0);
            mySheet.SetColHidden(63,0);

            mySheet.SetColHidden(66,0);// 카드사업_법인카드매출액
            mySheet.SetColHidden(67,0);
            mySheet.SetColHidden(68,0);

            mySheet.SetColHidden(71,0);// 카드사업_순증유효회원

            mySheet.SetColHidden(74,0);// 카드사업_신규유효회원

            mySheet.SetColHidden(77,0);// 신탁사업_특정금전신탁
            mySheet.SetColHidden(78,0);
            mySheet.SetColHidden(79,0);

            mySheet.SetColHidden(82,0);// 신탁사업_부동산신탁
            mySheet.SetColHidden(83,0);
            mySheet.SetColHidden(84,0);

            mySheet.SetColHidden(87,0);// 공제사업_총납입공제
            mySheet.SetColHidden(88,0);
            mySheet.SetColHidden(89,0);

            mySheet.SetColHidden(92,0);// 공제사업_신규보장성
            mySheet.SetColHidden(93,0);
            mySheet.SetColHidden(94,0);

            mySheet.SetColHidden(95,0);// 공제사업_적립식공제료
            mySheet.SetColHidden(96,0);
            mySheet.SetColHidden(97,0);

            mySheet.SetColHidden(100,0);// 펀드사업_전략상품수탁고
            mySheet.SetColHidden(101,0);
            mySheet.SetColHidden(102,0);

            mySheet.SetColHidden(105,0);// 펀드사업_장기고객수
            mySheet.SetColHidden(106,0);
            mySheet.SetColHidden(107,0);

            mySheet.SetColHidden(110,0);// 스마트금융_인터넷뱅킹
            mySheet.SetColHidden(111,0);
            mySheet.SetColHidden(112,0);

            mySheet.SetColHidden(115,0);// 스마트금융_스마트폰뱅킹
            mySheet.SetColHidden(116,0);
            mySheet.SetColHidden(117,0);

            mySheet.SetColHidden(120,0);// 스마트금융_PUSH서비스
            mySheet.SetColHidden(121,0);
            mySheet.SetColHidden(122,0);

            
        } else {        	
            mySheet.SetColHidden(5,1);// 예수금_순수개인_잔액
            mySheet.SetColHidden(6,1);
            mySheet.SetColHidden(7,1);

            mySheet.SetColHidden(10,1);// 예수금_순수개인_반평
            mySheet.SetColHidden(11,1);
            mySheet.SetColHidden(12,1);

            mySheet.SetColHidden(15,1);// 예수금_거치적립식_잔액
            mySheet.SetColHidden(16,1);
            mySheet.SetColHidden(17,1);

            mySheet.SetColHidden(20,1);// 예수금_거치적립식_반평
            mySheet.SetColHidden(21,1);
            mySheet.SetColHidden(22,1);

            mySheet.SetColHidden(25,1);// 예수금_중저원가성_반평
            mySheet.SetColHidden(26,1);
            mySheet.SetColHidden(27,1);

            mySheet.SetColHidden(30,1);// 대출금_신규잔액
            mySheet.SetColHidden(31,1);
            mySheet.SetColHidden(32,1);

            mySheet.SetColHidden(35,1);// 소매여신_신규잔액
            mySheet.SetColHidden(36,1);
            mySheet.SetColHidden(37,1);

            mySheet.SetColHidden(40,1);// 연체율
            mySheet.SetColHidden(41,1);
            mySheet.SetColHidden(42,1);

            mySheet.SetColHidden(51,1);// 외환사업
            mySheet.SetColHidden(52,1);
            mySheet.SetColHidden(53,1);

            mySheet.SetColHidden(56,1);// 카드사업_신용카드매출액
            mySheet.SetColHidden(57,1);
            mySheet.SetColHidden(58,1);

            mySheet.SetColHidden(61,1);// 카드사업_체크카드매출액
            mySheet.SetColHidden(62,1);
            mySheet.SetColHidden(63,1);

            mySheet.SetColHidden(66,1);// 카드사업_법인카드매출액
            mySheet.SetColHidden(67,1);
            mySheet.SetColHidden(68,1);
            mySheet.SetColHidden(71,1);// 카드사업_순증유효회원

            mySheet.SetColHidden(74,1);// 카드사업_신규유효회원

            mySheet.SetColHidden(77,1);// 신탁사업_특정금전신탁
            mySheet.SetColHidden(78,1);
            mySheet.SetColHidden(79,1);

            mySheet.SetColHidden(82,1);// 신탁사업_부동산신탁
            mySheet.SetColHidden(83,1);
            mySheet.SetColHidden(84,1);

            mySheet.SetColHidden(87,1);// 공제사업_총납입공제
            mySheet.SetColHidden(88,1);
            mySheet.SetColHidden(89,1);

            mySheet.SetColHidden(92,1);// 공제사업_신규보장성
            mySheet.SetColHidden(93,1);
            mySheet.SetColHidden(94,1);

            mySheet.SetColHidden(95,1);// 공제사업_적립식공제료
            mySheet.SetColHidden(96,1);
            mySheet.SetColHidden(97,1);

            mySheet.SetColHidden(100,1);// 펀드사업_전략상품수탁고
            mySheet.SetColHidden(101,1);
            mySheet.SetColHidden(102,1);

            mySheet.SetColHidden(105,1);// 펀드사업_장기고객수
            mySheet.SetColHidden(106,1);
            mySheet.SetColHidden(107,1);

            mySheet.SetColHidden(110,1);// 스마트금융_인터넷뱅킹
            mySheet.SetColHidden(111,1);
            mySheet.SetColHidden(112,1);

            mySheet.SetColHidden(115,1);// 스마트금융_스마트폰뱅킹
            mySheet.SetColHidden(116,1);
            mySheet.SetColHidden(117,1);

            mySheet.SetColHidden(120,1);// 스마트금융_PUSH서비스
            mySheet.SetColHidden(121,1);
            mySheet.SetColHidden(122,1);

        }
    } else if(baseday >= '20160101') {
    	  // 2016년도 
        if (subChk) {
            mySheet.SetColHidden(5,0);// 예수금_순수개인_잔액
            mySheet.SetColHidden(6,0);
            mySheet.SetColHidden(7,0);

            mySheet.SetColHidden(10,0);// 예수금_순수개인_반평
            mySheet.SetColHidden(11,0);
            mySheet.SetColHidden(12,0);

            mySheet.SetColHidden(15,0);// 예수금_거치적립식_잔액
            mySheet.SetColHidden(16,0);
            mySheet.SetColHidden(17,0);

            mySheet.SetColHidden(20,0);// 예수금_거치적립식_반평
            mySheet.SetColHidden(21,0);
            mySheet.SetColHidden(22,0);

            mySheet.SetColHidden(25,0);// 예수금_중저원가성_반평
            mySheet.SetColHidden(26,0);
            mySheet.SetColHidden(27,0);

            mySheet.SetColHidden(30,0);// 대출금_순증잔액
            mySheet.SetColHidden(31,0);
            mySheet.SetColHidden(32,0);

            mySheet.SetColHidden(35,0);// 대출금_신규잔액
            mySheet.SetColHidden(36,0);
            mySheet.SetColHidden(37,0);

            mySheet.SetColHidden(40,0);// 소매여신_순증잔액
            mySheet.SetColHidden(41,0);
            mySheet.SetColHidden(42,0);

            mySheet.SetColHidden(45,0);// 소매여신_신규잔액
            mySheet.SetColHidden(46,0);
            mySheet.SetColHidden(47,0);

            mySheet.SetColHidden(50,0);// 연체율
            mySheet.SetColHidden(51,0);
            mySheet.SetColHidden(52,0);

            mySheet.SetColHidden(61,0);// 외환사업
            mySheet.SetColHidden(62,0);
            mySheet.SetColHidden(63,0);

            mySheet.SetColHidden(66,0);// 카드사업_신용카드매출액
            mySheet.SetColHidden(67,0);
            mySheet.SetColHidden(68,0);

            mySheet.SetColHidden(71,0);// 카드사업_체크카드매출액
            mySheet.SetColHidden(72,0);
            mySheet.SetColHidden(73,0);

            mySheet.SetColHidden(76,0);// 카드사업_순증유효회원
            mySheet.SetColHidden(79,0);// 카드사업_신규유효회원

            mySheet.SetColHidden(82,0);// 신탁사업_특정금전신탁
            mySheet.SetColHidden(83,0);
            mySheet.SetColHidden(84,0);

            mySheet.SetColHidden(87,0);// 신탁사업_부동산신탁
            mySheet.SetColHidden(88,0);
            mySheet.SetColHidden(89,0);

            mySheet.SetColHidden(92,0);// 공제사업_총납입공제
            mySheet.SetColHidden(93,0);
            mySheet.SetColHidden(94,0);

            mySheet.SetColHidden(97,0);// 공제사업_신규보장성
            mySheet.SetColHidden(98,0);
            mySheet.SetColHidden(99,0);

            mySheet.SetColHidden(100,0);// 공제사업_적립식공제료
            mySheet.SetColHidden(101,0);
            mySheet.SetColHidden(102,0);

            mySheet.SetColHidden(105,0);// 펀드사업_전략상품수탁고
            mySheet.SetColHidden(106,0);
            mySheet.SetColHidden(107,0);

            mySheet.SetColHidden(110,0);// 펀드사업_장기고객수
            mySheet.SetColHidden(111,0);
            mySheet.SetColHidden(112,0);

            mySheet.SetColHidden(115,0);// 스마트금융_인터넷뱅킹
            mySheet.SetColHidden(116,0);
            mySheet.SetColHidden(117,0);

            mySheet.SetColHidden(120,0);// 스마트금융_스마트폰뱅킹
            mySheet.SetColHidden(121,0);
            mySheet.SetColHidden(122,0);

            mySheet.SetColHidden(125,0);// 스마트금융_PUSH서비스
            mySheet.SetColHidden(126,0);
            mySheet.SetColHidden(127,0);

            
        } else {        	
            mySheet.SetColHidden(5,1);// 예수금_순수개인_잔액
            mySheet.SetColHidden(6,1);
            mySheet.SetColHidden(7,1);

            mySheet.SetColHidden(10,1);// 예수금_순수개인_반평
            mySheet.SetColHidden(11,1);
            mySheet.SetColHidden(12,1);

            mySheet.SetColHidden(15,1);// 예수금_거치적립식_잔액
            mySheet.SetColHidden(16,1);
            mySheet.SetColHidden(17,1);

            mySheet.SetColHidden(20,1);// 예수금_거치적립식_반평
            mySheet.SetColHidden(21,1);
            mySheet.SetColHidden(22,1);

            mySheet.SetColHidden(25,1);// 예수금_중저원가성_반평
            mySheet.SetColHidden(26,1);
            mySheet.SetColHidden(27,1);

            mySheet.SetColHidden(30,1);// 대출금_순증잔액
            mySheet.SetColHidden(31,1);
            mySheet.SetColHidden(32,1);

            mySheet.SetColHidden(35,1);// 대출금_신규잔액
            mySheet.SetColHidden(36,1);
            mySheet.SetColHidden(37,1);

            mySheet.SetColHidden(40,1);// 소매여신_순증잔액
            mySheet.SetColHidden(41,1);
            mySheet.SetColHidden(42,1);

            mySheet.SetColHidden(45,1);// 소매여신_신규잔액
            mySheet.SetColHidden(46,1);
            mySheet.SetColHidden(47,1);

            mySheet.SetColHidden(50,1);// 연체율
            mySheet.SetColHidden(51,1);
            mySheet.SetColHidden(52,1);

            mySheet.SetColHidden(61,1);// 외환사업
            mySheet.SetColHidden(62,1);
            mySheet.SetColHidden(63,1);

            mySheet.SetColHidden(66,1);// 카드사업_신용카드매출액
            mySheet.SetColHidden(67,1);
            mySheet.SetColHidden(68,1);

            mySheet.SetColHidden(71,1);// 카드사업_체크카드매출액
            mySheet.SetColHidden(72,1);
            mySheet.SetColHidden(73,1);

            mySheet.SetColHidden(76,1);// 카드사업_순증유효회원
            mySheet.SetColHidden(79,1);// 카드사업_신규유효회원

            mySheet.SetColHidden(82,1);// 신탁사업_특정금전신탁
            mySheet.SetColHidden(83,1);
            mySheet.SetColHidden(84,1);

            mySheet.SetColHidden(87,1);// 신탁사업_부동산신탁
            mySheet.SetColHidden(88,1);
            mySheet.SetColHidden(89,1);

            mySheet.SetColHidden(92,1);// 공제사업_총납입공제
            mySheet.SetColHidden(93,1);
            mySheet.SetColHidden(94,1);

            mySheet.SetColHidden(97,1);// 공제사업_신규보장성
            mySheet.SetColHidden(98,1);
            mySheet.SetColHidden(99,1);

            mySheet.SetColHidden(100,1);// 공제사업_적립식공제료
            mySheet.SetColHidden(101,1);
            mySheet.SetColHidden(102,1);

            mySheet.SetColHidden(105,1);// 펀드사업_전략상품수탁고
            mySheet.SetColHidden(106,1);
            mySheet.SetColHidden(107,1);

            mySheet.SetColHidden(110,1);// 펀드사업_장기고객수
            mySheet.SetColHidden(111,1);
            mySheet.SetColHidden(112,1);

            mySheet.SetColHidden(115,1);// 스마트금융_인터넷뱅킹
            mySheet.SetColHidden(116,1);
            mySheet.SetColHidden(117,1);

            mySheet.SetColHidden(120,1);// 스마트금융_스마트폰뱅킹
            mySheet.SetColHidden(121,1);
            mySheet.SetColHidden(122,1);

            mySheet.SetColHidden(125,1);// 스마트금융_PUSH서비스
            mySheet.SetColHidden(126,1);
            mySheet.SetColHidden(127,1);


        }
    } else if(baseday >= '20150701') {
    	  // 2015년도 하반기 이후
        if (subChk) {
            mySheet.SetColHidden(5,0);
            mySheet.SetColHidden(6,0);
            mySheet.SetColHidden(7,0);

            mySheet.SetColHidden(10,0);
            mySheet.SetColHidden(11,0);
            mySheet.SetColHidden(12,0);

            mySheet.SetColHidden(15,0);
            mySheet.SetColHidden(16,0);
            mySheet.SetColHidden(17,0);

            mySheet.SetColHidden(20,0);
            mySheet.SetColHidden(21,0);
            mySheet.SetColHidden(22,0);

            mySheet.SetColHidden(25,0);
            mySheet.SetColHidden(26,0);
            mySheet.SetColHidden(27,0);

            mySheet.SetColHidden(30,0);
            mySheet.SetColHidden(31,0);
            mySheet.SetColHidden(32,0);

            mySheet.SetColHidden(35,0);
            mySheet.SetColHidden(36,0);
            mySheet.SetColHidden(37,0);

            mySheet.SetColHidden(40,0);
            mySheet.SetColHidden(41,0);
            mySheet.SetColHidden(42,0);

            mySheet.SetColHidden(53,0);
            mySheet.SetColHidden(54,0);
            mySheet.SetColHidden(55,0);

            mySheet.SetColHidden(58,0);
            mySheet.SetColHidden(59,0);
            mySheet.SetColHidden(60,0);

            mySheet.SetColHidden(63,0);
            mySheet.SetColHidden(64,0);
            mySheet.SetColHidden(65,0);

            mySheet.SetColHidden(68,0);
            mySheet.SetColHidden(69,0);
            mySheet.SetColHidden(70,0);

            mySheet.SetColHidden(73,0);
            mySheet.SetColHidden(74,0);
            mySheet.SetColHidden(75,0);

            mySheet.SetColHidden(78,0);
            mySheet.SetColHidden(79,0);
            mySheet.SetColHidden(80,0);

            mySheet.SetColHidden(83,0);
            mySheet.SetColHidden(84,0);
            mySheet.SetColHidden(85,0);

            mySheet.SetColHidden(86,0);
            mySheet.SetColHidden(87,0);
            mySheet.SetColHidden(88,0);

            mySheet.SetColHidden(91,0);
            mySheet.SetColHidden(92,0);
            mySheet.SetColHidden(93,0);

            mySheet.SetColHidden(96,0);
            mySheet.SetColHidden(97,0);
            mySheet.SetColHidden(98,0);

            mySheet.SetColHidden(101,0);
            mySheet.SetColHidden(102,0);
            mySheet.SetColHidden(103,0);

            mySheet.SetColHidden(106,0);
            mySheet.SetColHidden(107,0);
            mySheet.SetColHidden(108,0);

        } else {        	
            mySheet.SetColHidden(5,1);
            mySheet.SetColHidden(6,1);
            mySheet.SetColHidden(7,1);

            mySheet.SetColHidden(10,1);
            mySheet.SetColHidden(11,1);
            mySheet.SetColHidden(12,1);

            mySheet.SetColHidden(15,1);
            mySheet.SetColHidden(16,1);
            mySheet.SetColHidden(17,1);

            mySheet.SetColHidden(20,1);
            mySheet.SetColHidden(21,1);
            mySheet.SetColHidden(22,1);

            mySheet.SetColHidden(25,1);
            mySheet.SetColHidden(26,1);
            mySheet.SetColHidden(27,1);

            mySheet.SetColHidden(30,1);
            mySheet.SetColHidden(31,1);
            mySheet.SetColHidden(32,1);

            mySheet.SetColHidden(35,1);
            mySheet.SetColHidden(36,1);
            mySheet.SetColHidden(37,1);

            mySheet.SetColHidden(40,1);
            mySheet.SetColHidden(41,1);
            mySheet.SetColHidden(42,1);

            mySheet.SetColHidden(53,1);
            mySheet.SetColHidden(54,1);
            mySheet.SetColHidden(55,1);

            mySheet.SetColHidden(58,1);
            mySheet.SetColHidden(59,1);
            mySheet.SetColHidden(60,1);

            mySheet.SetColHidden(63,1);
            mySheet.SetColHidden(64,1);
            mySheet.SetColHidden(65,1);

            mySheet.SetColHidden(68,1);
            mySheet.SetColHidden(69,1);
            mySheet.SetColHidden(70,1);

            mySheet.SetColHidden(73,1);
            mySheet.SetColHidden(74,1);
            mySheet.SetColHidden(75,1);

            mySheet.SetColHidden(78,1);
            mySheet.SetColHidden(79,1);
            mySheet.SetColHidden(80,1);

            mySheet.SetColHidden(83,1);
            mySheet.SetColHidden(84,1);
            mySheet.SetColHidden(85,1);

            mySheet.SetColHidden(86,1);
            mySheet.SetColHidden(87,1);
            mySheet.SetColHidden(88,1);

            mySheet.SetColHidden(91,1);
            mySheet.SetColHidden(92,1);
            mySheet.SetColHidden(93,1);

            mySheet.SetColHidden(96,1);
            mySheet.SetColHidden(97,1);
            mySheet.SetColHidden(98,1);

            mySheet.SetColHidden(101,1);
            mySheet.SetColHidden(102,1);
            mySheet.SetColHidden(103,1);

            mySheet.SetColHidden(106,1);
            mySheet.SetColHidden(107,1);
            mySheet.SetColHidden(108,1);

        }
    } else if(baseday >= '20150101') {
    	  // 2015년도 이후
        if (subChk) {
            mySheet.SetColHidden(5,0);
            mySheet.SetColHidden(6,0);
            mySheet.SetColHidden(7,0);

            mySheet.SetColHidden(10,0);
            mySheet.SetColHidden(11,0);
            mySheet.SetColHidden(12,0);

            mySheet.SetColHidden(15,0);
            mySheet.SetColHidden(16,0);
            mySheet.SetColHidden(17,0);

            mySheet.SetColHidden(20,0);
            mySheet.SetColHidden(21,0);
            mySheet.SetColHidden(22,0);

            mySheet.SetColHidden(25,0);
            mySheet.SetColHidden(26,0);
            mySheet.SetColHidden(27,0);

            mySheet.SetColHidden(30,0);
            mySheet.SetColHidden(31,0);
            mySheet.SetColHidden(32,0);

            mySheet.SetColHidden(35,0);
            mySheet.SetColHidden(36,0);
            mySheet.SetColHidden(37,0);

            mySheet.SetColHidden(40,0);
            mySheet.SetColHidden(41,0);
            mySheet.SetColHidden(42,0);

            mySheet.SetColHidden(53,0);
            mySheet.SetColHidden(54,0);
            mySheet.SetColHidden(55,0);

            mySheet.SetColHidden(58,0);
            mySheet.SetColHidden(59,0);
            mySheet.SetColHidden(60,0);

            mySheet.SetColHidden(63,0);
            mySheet.SetColHidden(64,0);
            mySheet.SetColHidden(65,0);

            mySheet.SetColHidden(68,0);
            mySheet.SetColHidden(69,0);
            mySheet.SetColHidden(70,0);

            mySheet.SetColHidden(73,0);
            mySheet.SetColHidden(74,0);
            mySheet.SetColHidden(75,0);

            mySheet.SetColHidden(78,0);
            mySheet.SetColHidden(79,0);
            mySheet.SetColHidden(80,0);

            mySheet.SetColHidden(81,0);
            mySheet.SetColHidden(82,0);
            mySheet.SetColHidden(83,0);

            mySheet.SetColHidden(86,0);
            mySheet.SetColHidden(87,0);
            mySheet.SetColHidden(88,0);

            mySheet.SetColHidden(91,0);
            mySheet.SetColHidden(92,0);
            mySheet.SetColHidden(93,0);

            mySheet.SetColHidden(96,0);
            mySheet.SetColHidden(97,0);
            mySheet.SetColHidden(98,0);

            mySheet.SetColHidden(101,0);
            mySheet.SetColHidden(102,0);
            mySheet.SetColHidden(103,0);

        } else {        	
            mySheet.SetColHidden(5,1);
            mySheet.SetColHidden(6,1);
            mySheet.SetColHidden(7,1);

            mySheet.SetColHidden(10,1);
            mySheet.SetColHidden(11,1);
            mySheet.SetColHidden(12,1);

            mySheet.SetColHidden(15,1);
            mySheet.SetColHidden(16,1);
            mySheet.SetColHidden(17,1);

            mySheet.SetColHidden(20,1);
            mySheet.SetColHidden(21,1);
            mySheet.SetColHidden(22,1);

            mySheet.SetColHidden(25,1);
            mySheet.SetColHidden(26,1);
            mySheet.SetColHidden(27,1);

            mySheet.SetColHidden(30,1);
            mySheet.SetColHidden(31,1);
            mySheet.SetColHidden(32,1);

            mySheet.SetColHidden(35,1);
            mySheet.SetColHidden(36,1);
            mySheet.SetColHidden(37,1);

            mySheet.SetColHidden(40,1);
            mySheet.SetColHidden(41,1);
            mySheet.SetColHidden(42,1);

            mySheet.SetColHidden(53,1);
            mySheet.SetColHidden(54,1);
            mySheet.SetColHidden(55,1);

            mySheet.SetColHidden(58,1);
            mySheet.SetColHidden(59,1);
            mySheet.SetColHidden(60,1);

            mySheet.SetColHidden(63,1);
            mySheet.SetColHidden(64,1);
            mySheet.SetColHidden(65,1);

            mySheet.SetColHidden(68,1);
            mySheet.SetColHidden(69,1);
            mySheet.SetColHidden(70,1);

            mySheet.SetColHidden(73,1);
            mySheet.SetColHidden(74,1);
            mySheet.SetColHidden(75,1);

            mySheet.SetColHidden(78,1);
            mySheet.SetColHidden(79,1);
            mySheet.SetColHidden(80,1);

            mySheet.SetColHidden(81,1);
            mySheet.SetColHidden(82,1);
            mySheet.SetColHidden(83,1);

            mySheet.SetColHidden(86,1);
            mySheet.SetColHidden(87,1);
            mySheet.SetColHidden(88,1);

            mySheet.SetColHidden(91,1);
            mySheet.SetColHidden(92,1);
            mySheet.SetColHidden(93,1);

            mySheet.SetColHidden(96,1);
            mySheet.SetColHidden(97,1);
            mySheet.SetColHidden(98,1);

            mySheet.SetColHidden(101,1);
            mySheet.SetColHidden(102,1);
            mySheet.SetColHidden(103,1);

        }
    } else if(baseday >= '20140701') {
    	  // 2014년도 하반기 이후
        if (subChk) {
            mySheet.SetColHidden(5,0);
            mySheet.SetColHidden(6,0);
            mySheet.SetColHidden(7,0);

            mySheet.SetColHidden(10,0);
            mySheet.SetColHidden(11,0);
            mySheet.SetColHidden(12,0);

            mySheet.SetColHidden(15,0);
            mySheet.SetColHidden(16,0);
            mySheet.SetColHidden(17,0);

            mySheet.SetColHidden(20,0);
            mySheet.SetColHidden(21,0);
            mySheet.SetColHidden(22,0);

            mySheet.SetColHidden(25,0);
            mySheet.SetColHidden(26,0);
            mySheet.SetColHidden(27,0);

            mySheet.SetColHidden(30,0);
            mySheet.SetColHidden(31,0);
            mySheet.SetColHidden(32,0);

            mySheet.SetColHidden(35,0);
            mySheet.SetColHidden(36,0);
            mySheet.SetColHidden(37,0);

            mySheet.SetColHidden(52,0);
            mySheet.SetColHidden(53,0);
            mySheet.SetColHidden(54,0);

            mySheet.SetColHidden(57,0);
            mySheet.SetColHidden(58,0);
            mySheet.SetColHidden(59,0);

            mySheet.SetColHidden(62,0);
            mySheet.SetColHidden(63,0);
            mySheet.SetColHidden(64,0);

            mySheet.SetColHidden(67,0);
            mySheet.SetColHidden(68,0);
            mySheet.SetColHidden(69,0);

            mySheet.SetColHidden(72,0);
            mySheet.SetColHidden(73,0);
            mySheet.SetColHidden(74,0);

            mySheet.SetColHidden(77,0);
            mySheet.SetColHidden(78,0);
            mySheet.SetColHidden(79,0);

            mySheet.SetColHidden(82,0);
            mySheet.SetColHidden(83,0);
            mySheet.SetColHidden(84,0);

        } else {        	
            mySheet.SetColHidden(5,1);
            mySheet.SetColHidden(6,1);
            mySheet.SetColHidden(7,1);

            mySheet.SetColHidden(10,1);
            mySheet.SetColHidden(11,1);
            mySheet.SetColHidden(12,1);

            mySheet.SetColHidden(15,1);
            mySheet.SetColHidden(16,1);
            mySheet.SetColHidden(17,1);

            mySheet.SetColHidden(20,1);
            mySheet.SetColHidden(21,1);
            mySheet.SetColHidden(22,1);

            mySheet.SetColHidden(25,1);
            mySheet.SetColHidden(26,1);
            mySheet.SetColHidden(27,1);

            mySheet.SetColHidden(30,1);
            mySheet.SetColHidden(31,1);
            mySheet.SetColHidden(32,1);

            mySheet.SetColHidden(35,1);
            mySheet.SetColHidden(36,1);
            mySheet.SetColHidden(37,1);

            mySheet.SetColHidden(52,1);
            mySheet.SetColHidden(53,1);
            mySheet.SetColHidden(54,1);

            mySheet.SetColHidden(57,1);
            mySheet.SetColHidden(58,1);
            mySheet.SetColHidden(59,1);

            mySheet.SetColHidden(62,1);
            mySheet.SetColHidden(63,1);
            mySheet.SetColHidden(64,1);

            mySheet.SetColHidden(67,1);
            mySheet.SetColHidden(68,1);
            mySheet.SetColHidden(69,1);

            mySheet.SetColHidden(72,1);
            mySheet.SetColHidden(73,1);
            mySheet.SetColHidden(74,1);

            mySheet.SetColHidden(77,1);
            mySheet.SetColHidden(78,1);
            mySheet.SetColHidden(79,1);

            mySheet.SetColHidden(82,1);
            mySheet.SetColHidden(83,1);
            mySheet.SetColHidden(84,1);
		}

    } else if(baseday >= '20140101') {
    	  // 2014년도 이후
        if (subChk) {
            mySheet.SetColHidden(5,0);
            mySheet.SetColHidden(6,0);
            mySheet.SetColHidden(7,0);

            mySheet.SetColHidden(10,0);
            mySheet.SetColHidden(11,0);
            mySheet.SetColHidden(12,0);

            mySheet.SetColHidden(15,0);
            mySheet.SetColHidden(16,0);
            mySheet.SetColHidden(17,0);

            mySheet.SetColHidden(20,0);
            mySheet.SetColHidden(21,0);
            mySheet.SetColHidden(22,0);

            mySheet.SetColHidden(25,0);
            mySheet.SetColHidden(26,0);
            mySheet.SetColHidden(27,0);

            mySheet.SetColHidden(30,0);
            mySheet.SetColHidden(31,0);

            mySheet.SetColHidden(34,0);
            mySheet.SetColHidden(35,0);

            mySheet.SetColHidden(38,0);
            mySheet.SetColHidden(39,0);

            mySheet.SetColHidden(42,0);
            mySheet.SetColHidden(43,0);

            mySheet.SetColHidden(46,0);
            mySheet.SetColHidden(47,0);
            mySheet.SetColHidden(48,0);

            mySheet.SetColHidden(51,0);
            mySheet.SetColHidden(52,0);
            mySheet.SetColHidden(53,0);

            mySheet.SetColHidden(56,0);
            mySheet.SetColHidden(57,0);
            mySheet.SetColHidden(58,0);

            mySheet.SetColHidden(61,0);
            mySheet.SetColHidden(62,0);
            mySheet.SetColHidden(63,0);

            mySheet.SetColHidden(66,0);
            mySheet.SetColHidden(67,0);
            mySheet.SetColHidden(68,0);

            mySheet.SetColHidden(71,0);
            mySheet.SetColHidden(72,0);
            mySheet.SetColHidden(73,0);

            mySheet.SetColHidden(76,0);
            mySheet.SetColHidden(77,0);
            mySheet.SetColHidden(78,0);

            
        } else {        	
            mySheet.SetColHidden(5,1);
            mySheet.SetColHidden(6,1);
            mySheet.SetColHidden(7,1);
            mySheet.SetColHidden(10,1);
            mySheet.SetColHidden(11,1);
            mySheet.SetColHidden(12,1);
            mySheet.SetColHidden(15,1);
            mySheet.SetColHidden(16,1);
            mySheet.SetColHidden(17,1);
            mySheet.SetColHidden(20,1);
            mySheet.SetColHidden(21,1);
            mySheet.SetColHidden(22,1);
            mySheet.SetColHidden(25,1);
            mySheet.SetColHidden(26,1);
            mySheet.SetColHidden(27,1);
            mySheet.SetColHidden(30,1);
            mySheet.SetColHidden(31,1);
            mySheet.SetColHidden(34,1);
            mySheet.SetColHidden(35,1);
            mySheet.SetColHidden(38,1);
            mySheet.SetColHidden(39,1);
            mySheet.SetColHidden(42,1);
            mySheet.SetColHidden(43,1);
            mySheet.SetColHidden(46,1);
            mySheet.SetColHidden(47,1);
            mySheet.SetColHidden(48,1);
            mySheet.SetColHidden(51,1);
            mySheet.SetColHidden(52,1);
            mySheet.SetColHidden(53,1);
            mySheet.SetColHidden(56,1);
            mySheet.SetColHidden(57,1);
            mySheet.SetColHidden(58,1);
            mySheet.SetColHidden(61,1);
            mySheet.SetColHidden(62,1);
            mySheet.SetColHidden(63,1);
            mySheet.SetColHidden(66,1);
            mySheet.SetColHidden(67,1);
            mySheet.SetColHidden(68,1);
            mySheet.SetColHidden(71,1);
            mySheet.SetColHidden(72,1);
            mySheet.SetColHidden(73,1);
            mySheet.SetColHidden(76,1);
            mySheet.SetColHidden(77,1);
            mySheet.SetColHidden(78,1);

        }
    } else if(baseday >= '20130101') {
    	  // 2013년도 이후
        if (subChk) {
            mySheet.SetColHidden(5,0);
            mySheet.SetColHidden(6,0);
            mySheet.SetColHidden(7,0);
            mySheet.SetColHidden(10,0);
            mySheet.SetColHidden(11,0);
            mySheet.SetColHidden(12,0);
            mySheet.SetColHidden(15,0);
            mySheet.SetColHidden(16,0);
            mySheet.SetColHidden(17,0);
            mySheet.SetColHidden(20,0);
            mySheet.SetColHidden(21,0);
            mySheet.SetColHidden(22,0);

        } else {
            mySheet.SetColHidden(5,1);
            mySheet.SetColHidden(6,1);
            mySheet.SetColHidden(7,1);
            mySheet.SetColHidden(10,1);
            mySheet.SetColHidden(11,1);
            mySheet.SetColHidden(12,1);
            mySheet.SetColHidden(15,1);
            mySheet.SetColHidden(16,1);
            mySheet.SetColHidden(17,1);
            mySheet.SetColHidden(20,1);
            mySheet.SetColHidden(21,1);
            mySheet.SetColHidden(22,1);

        }
    } else if(baseday >= '20120701') {
    	  // 2012년도 하반기 이후
        if (subChk) {
            mySheet.SetColHidden(5,0);
            mySheet.SetColHidden(6,0);
            mySheet.SetColHidden(7,0);
            mySheet.SetColHidden(8,0);
            mySheet.SetColHidden(11,0);
            mySheet.SetColHidden(12,0);
            mySheet.SetColHidden(13,0);
            mySheet.SetColHidden(14,0);
            mySheet.SetColHidden(17,0);
            mySheet.SetColHidden(18,0);
            mySheet.SetColHidden(19,0);
            mySheet.SetColHidden(20,0);
            mySheet.SetColHidden(23,0);
            mySheet.SetColHidden(24,0);
            mySheet.SetColHidden(25,0);
            mySheet.SetColHidden(26,0);
            mySheet.SetColHidden(29,0);
            mySheet.SetColHidden(30,0);
            mySheet.SetColHidden(31,0);
            mySheet.SetColHidden(34,0);
            mySheet.SetColHidden(35,0);
            mySheet.SetColHidden(36,0);
            mySheet.SetColHidden(39,0);
            mySheet.SetColHidden(40,0);
            mySheet.SetColHidden(41,0);
            mySheet.SetColHidden(44,0);
            mySheet.SetColHidden(45,0);
            mySheet.SetColHidden(46,0);
            mySheet.SetColHidden(49,0);
            mySheet.SetColHidden(50,0);
            mySheet.SetColHidden(51,0);
            mySheet.SetColHidden(54,0);
            mySheet.SetColHidden(55,0);
            mySheet.SetColHidden(56,0);
            mySheet.SetColHidden(59,0);
            mySheet.SetColHidden(60,0);
            mySheet.SetColHidden(61,0);
            mySheet.SetColHidden(62,0);
            mySheet.SetColHidden(63,0);
            mySheet.SetColHidden(66,0);
            mySheet.SetColHidden(67,0);
            mySheet.SetColHidden(68,0);
            mySheet.SetColHidden(69,0);
            mySheet.SetColHidden(70,0);
            mySheet.SetColHidden(73,0);
            mySheet.SetColHidden(74,0);
            mySheet.SetColHidden(75,0);
            mySheet.SetColHidden(76,0);
            mySheet.SetColHidden(77,0);
            mySheet.SetColHidden(80,0);
            mySheet.SetColHidden(81,0);
            mySheet.SetColHidden(82,0);
            mySheet.SetColHidden(85,0);
            mySheet.SetColHidden(86,0);
            mySheet.SetColHidden(87,0);
            mySheet.SetColHidden(90,0);
            mySheet.SetColHidden(91,0);
            mySheet.SetColHidden(92,0);
            mySheet.SetColHidden(95,0);
            mySheet.SetColHidden(96,0);
            mySheet.SetColHidden(97,0);

        } else {
            mySheet.SetColHidden(5,1);
            mySheet.SetColHidden(6,1);
            mySheet.SetColHidden(7,1);
            mySheet.SetColHidden(8,1);
            mySheet.SetColHidden(11,1);
            mySheet.SetColHidden(12,1);
            mySheet.SetColHidden(13,1);
            mySheet.SetColHidden(14,1);
            mySheet.SetColHidden(17,1);
            mySheet.SetColHidden(18,1);
            mySheet.SetColHidden(19,1);
            mySheet.SetColHidden(20,1);
            mySheet.SetColHidden(23,1);
            mySheet.SetColHidden(24,1);
            mySheet.SetColHidden(25,1);
            mySheet.SetColHidden(26,1);
            mySheet.SetColHidden(29,1);
            mySheet.SetColHidden(30,1);
            mySheet.SetColHidden(31,1);
            mySheet.SetColHidden(34,1);
            mySheet.SetColHidden(35,1);
            mySheet.SetColHidden(36,1);
            mySheet.SetColHidden(39,1);
            mySheet.SetColHidden(40,1);
            mySheet.SetColHidden(41,1);
            mySheet.SetColHidden(44,1);
            mySheet.SetColHidden(45,1);
            mySheet.SetColHidden(46,1);
            mySheet.SetColHidden(49,1);
            mySheet.SetColHidden(50,1);
            mySheet.SetColHidden(51,1);
            mySheet.SetColHidden(54,1);
            mySheet.SetColHidden(55,1);
            mySheet.SetColHidden(56,1);
            mySheet.SetColHidden(59,1);
            mySheet.SetColHidden(60,1);
            mySheet.SetColHidden(61,1);
            mySheet.SetColHidden(62,1);
            mySheet.SetColHidden(63,1);
            mySheet.SetColHidden(66,1);
            mySheet.SetColHidden(67,1);
            mySheet.SetColHidden(68,1);
            mySheet.SetColHidden(69,1);
            mySheet.SetColHidden(70,1);
            mySheet.SetColHidden(73,1);
            mySheet.SetColHidden(74,1);
            mySheet.SetColHidden(75,1);
            mySheet.SetColHidden(76,1);
            mySheet.SetColHidden(77,1);
            mySheet.SetColHidden(80,1);
            mySheet.SetColHidden(81,1);
            mySheet.SetColHidden(82,1);
            mySheet.SetColHidden(85,1);
            mySheet.SetColHidden(86,1);
            mySheet.SetColHidden(87,1);
            mySheet.SetColHidden(90,1);
            mySheet.SetColHidden(91,1);
            mySheet.SetColHidden(92,1);
            mySheet.SetColHidden(95,1);
            mySheet.SetColHidden(96,1);
            mySheet.SetColHidden(97,1);

        }
    } else {
    	  // 2012년도 상반기 이전
        if (subChk) {
            mySheet.SetColHidden(5,0);
            mySheet.SetColHidden(6,0);
            mySheet.SetColHidden(7,0);
            mySheet.SetColHidden(8,0);
            mySheet.SetColHidden(11,0);
            mySheet.SetColHidden(12,0);
            mySheet.SetColHidden(13,0);
            mySheet.SetColHidden(14,0);
            mySheet.SetColHidden(17,0);
            mySheet.SetColHidden(18,0);
            mySheet.SetColHidden(19,0);
            mySheet.SetColHidden(20,0);
            mySheet.SetColHidden(23,0);
            mySheet.SetColHidden(24,0);
            mySheet.SetColHidden(25,0);
            mySheet.SetColHidden(26,0);
            mySheet.SetColHidden(29,0);
            mySheet.SetColHidden(30,0);
            mySheet.SetColHidden(31,0);
            mySheet.SetColHidden(34,0);
            mySheet.SetColHidden(35,0);
            mySheet.SetColHidden(36,0);
            mySheet.SetColHidden(39,0);
            mySheet.SetColHidden(40,0);
            mySheet.SetColHidden(41,0);
            mySheet.SetColHidden(44,0);
            mySheet.SetColHidden(45,0);
            mySheet.SetColHidden(46,0);
            mySheet.SetColHidden(49,0);
            mySheet.SetColHidden(50,0);
            mySheet.SetColHidden(51,0);
            mySheet.SetColHidden(54,0);
            mySheet.SetColHidden(55,0);
            mySheet.SetColHidden(56,0);
            mySheet.SetColHidden(59,0);
            mySheet.SetColHidden(60,0);
            mySheet.SetColHidden(61,0);
            mySheet.SetColHidden(64,0);
            mySheet.SetColHidden(65,0);
            mySheet.SetColHidden(66,0);
            mySheet.SetColHidden(69,0);
            mySheet.SetColHidden(70,0);
            mySheet.SetColHidden(71,0);
            mySheet.SetColHidden(74,0);
            mySheet.SetColHidden(75,0);
            mySheet.SetColHidden(76,0);
            mySheet.SetColHidden(79,0);
            mySheet.SetColHidden(80,0);
            mySheet.SetColHidden(81,0);
            mySheet.SetColHidden(84,0);
            mySheet.SetColHidden(85,0);
            mySheet.SetColHidden(86,0);
            mySheet.SetColHidden(89,0);
            mySheet.SetColHidden(90,0);
            mySheet.SetColHidden(91,0);

        } else {
            mySheet.SetColHidden(5,1);
            mySheet.SetColHidden(6,1);
            mySheet.SetColHidden(7,1);
            mySheet.SetColHidden(8,1);
            mySheet.SetColHidden(11,1);
            mySheet.SetColHidden(12,1);
            mySheet.SetColHidden(13,1);
            mySheet.SetColHidden(14,1);
            mySheet.SetColHidden(17,1);
            mySheet.SetColHidden(18,1);
            mySheet.SetColHidden(19,1);
            mySheet.SetColHidden(20,1);
            mySheet.SetColHidden(23,1);
            mySheet.SetColHidden(24,1);
            mySheet.SetColHidden(25,1);
            mySheet.SetColHidden(26,1);
            mySheet.SetColHidden(29,1);
            mySheet.SetColHidden(30,1);
            mySheet.SetColHidden(31,1);
            mySheet.SetColHidden(34,1);
            mySheet.SetColHidden(35,1);
            mySheet.SetColHidden(36,1);
            mySheet.SetColHidden(39,1);
            mySheet.SetColHidden(40,1);
            mySheet.SetColHidden(41,1);
            mySheet.SetColHidden(44,1);
            mySheet.SetColHidden(45,1);
            mySheet.SetColHidden(46,1);
            mySheet.SetColHidden(49,1);
            mySheet.SetColHidden(50,1);
            mySheet.SetColHidden(51,1);
            mySheet.SetColHidden(54,1);
            mySheet.SetColHidden(55,1);
            mySheet.SetColHidden(56,1);
            mySheet.SetColHidden(59,1);
            mySheet.SetColHidden(60,1);
            mySheet.SetColHidden(61,1);
            mySheet.SetColHidden(64,1);
            mySheet.SetColHidden(65,1);
            mySheet.SetColHidden(66,1);
            mySheet.SetColHidden(69,1);
            mySheet.SetColHidden(70,1);
            mySheet.SetColHidden(71,1);
            mySheet.SetColHidden(74,1);
            mySheet.SetColHidden(75,1);
            mySheet.SetColHidden(76,1);
            mySheet.SetColHidden(79,1);
            mySheet.SetColHidden(80,1);
            mySheet.SetColHidden(81,1);
            mySheet.SetColHidden(84,1);
            mySheet.SetColHidden(85,1);
            mySheet.SetColHidden(86,1);
            mySheet.SetColHidden(89,1);
            mySheet.SetColHidden(90,1);
            mySheet.SetColHidden(91,1);

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

			//typeTime("기준일 조회시작")

            hiddGridmon.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&superFlg=Y"); 
            /*// 기준일자 정보
            if(isRoleEnable == '1') {
            	 // 전산정보부 및 성과 담당자
               hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2070.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=98");
            } else {
               hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2070.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=99");
            }*/
            break;
        case "조회":             // 조회(상위 GRID)
           // if(baseday >= '20120701') {
           //   if(isRoleEnable != '1') { 
           //   	alert('2012년도 하반기 일일성과 자료는 차후 오픈 예정입니다.');
           //   	break;
           //   }	
           // }

    
	    	if (baseday >= '20210101') 
	    	{
				if (pgcode == '16') {	  
					         
					alert('RM(금융본부) 성과집계표는 금융본부(RM) 성과집계표 세부내역 화면에서 확인하세요');
					return;
				}
			}
            
            mySheet.DoSearch("rpdy.scr.rpdy_scr_2070.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&metrogb="+metrogb); 
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
	//typeTime("initGrid start");
	
    baseday   = document.frm.baseday.value;
	
	//console.log("baseday : " + baseday);
	
	if(baseday == "") return;
    
    if (baseday <= '20120630') setGrid2012Q2();
    else if (baseday <= '20121231') setGrid2012Q4()
    else if (baseday <= '20131231') setGrid2013();
    else if (baseday <= '20140630') setGrid2014();
    else if (baseday <= '20141231') setGrid2014Q3();
    else if (baseday <= '20150630') setGrid2015();
    else if (baseday <= '20151231') setGrid2015Q3();	
    else if (baseday <= '20160630') setGrid2016();
    else if (baseday <= '20161231') setGrid2016Q3();
    else if (baseday <= '20170630') setGrid2017();
    else if (baseday <= '20171231') setGrid2017Q3();
    else if (baseday <= '20180630') setGrid2018();
    else if (baseday <= '20181231') setGrid2018H2();
    else if (baseday <= '20190630') setGrid2019();
    else if (baseday <= '20191231') setGrid2019H2();
    else if (baseday <= '20200630') setGrid2020();
	  else if (baseday <= '20201231') setGrid2020H2();
	  else if (baseday <= '20210630') setGrid2021();
    else if (baseday <= '20210930') setGrid2021H();
    else if (baseday <= '20211231') setGrid2021H2();
    else if (baseday <= '20220630') setGrid2022H();
    else setGrid2022H2();
    	

						
	//typeTime("initGrid end");
    

	//typeTime("selectsubchk start");
	//세부내역 체크에 따른 그리드 설정
    //selectsubchk();
	//typeTime("selectsubchk end"); 	
}

/*------------------------------------------*/
/* @기능 : 2022년도 하반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2022H2()
{
	//typeTime("setGrid2022H start")
	
    //pgcode  = document.frm.pgcode.value;
    baseday = document.frm.baseday.value;
	
  	mySheet.Reset();

  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  	// 상위 GRID에 대한 속성정보 설정
	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";
	
	strHeader0 =//5
		       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         
		      //고객관계 15
		      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
		      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
		      //성장성 55
		      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|" 
		      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
		      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
		      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
		      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
		      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
		      //비이자사업 40
		      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"                  
		      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
		      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
		      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
		      //감점 5
		      +"감점|감점|감점|감점|감점|" 
		      //가점 20                                                    
		      +"가점|가점|가점|가점|가점|"                                                                                 
		      +"가점|가점|가점|가점|가점|" 
		      +"가점|가점|가점|가점|가점|"                                                                                 
		      +"가점|가점|가점|가점|가점|" 
		      ;
	                                                                                
      strHeader1 = //5
		       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"    
		      //고객관계 15
		      +"상품판매|상품판매|상품판매|상품판매|상품판매|"      
		      +"개인신규예수금고객|개인신규예수금고객|개인신규예수금고객|개인신규예수금고객|개인신규예수금고객|"      
		      +"기업신규예수금고객|기업신규예수금고객|기업신규예수금고객|기업신규예수금고객|기업신규예수금고객|"      
		      //성장성 55
		      +"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"                                    
		      +"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"                                     
		      +"기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|"                                     
		      +"기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|"	                                             
		      +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"  
		      +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"
		      +"기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|"   
		      +"기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|" 
		      +"핵심예수금(반기평잔)|핵심예수금(반기평잔)|핵심예수금(반기평잔)|핵심예수금(반기평잔)|핵심예수금(반기평잔)|"	
		      +"핵심예수금(월중평잔)|핵심예수금(월중평잔)|핵심예수금(월중평잔)|핵심예수금(월중평잔)|핵심예수금(월중평잔)|"	
		      +"대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|"	      
		      //비이자사업 40 														 
		      +"카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|"                                                         
		      +"카드사업(유효회원)|카드사업(유효회원)|카드사업(유효회원)|카드사업(유효회원)|카드사업(유효회원)|"                          
		      +"신탁사업(특정금전보수)|신탁사업(특정금전보수)|신탁사업(특정금전보수)|신탁사업(특정금전보수)|신탁사업(특정금전보수)|"                                              					  
		      +"신탁사업(부동산보수)|신탁사업(부동산보수)|신탁사업(부동산보수)|신탁사업(부동산보수)|신탁사업(부동산보수)|"        
		      +"공제사업(환산공제료)|공제사업(환산공제료)|공제사업(환산공제료)|공제사업(환산공제료)|공제사업(환산공제료)|"         
		      +"공제사업(일시납공제료)|공제사업(일시납공제료)|공제사업(일시납공제료)|공제사업(일시납공제료)|공제사업(일시납공제료)|"                          
		      +"펀드사업(물량)|펀드사업(물량)|펀드사업(물량)|펀드사업(물량)|펀드사업(물량)|"                                    
		      +"펀드사업(고객수)|펀드사업(고객수)|펀드사업(고객수)|펀드사업(고객수)|펀드사업(고객수)|"                                    
		      //감점 5                                                    
		      +"연체율|연체율|연체율|연체율|연체율|"       
		      //가점 20                                                    
		      +"개인고객수증대|개인고객수증대|개인고객수증대|개인고객수증대|개인고객수증대|"                                                
		      +"기업고객수증대|기업고객수증대|기업고객수증대|기업고객수증대|기업고객수증대|"
		      +"개인저비용성증대|개인저비용성증대|개인저비용성증대|개인저비용성증대|개인저비용성증대|"
		      +"기업저비용성증대|기업저비용성증대|기업저비용성증대|기업저비용성증대|기업저비용성증대|" 
		      ;  
	
	strHeader2 = //5
		       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"    // 5
		      //고객관계 15
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 상품판매
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인신규예수금고객
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업신규예수금고객
		      //성장성 55
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인예수금(반기평잔)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인예수금(순증잔액)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업예수금(반기평잔)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업예수금(순증잔액)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인저비용성예수금(반기평잔)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인저비용성예수금(월중평잔)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업저비용성예수금(반기평잔)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업저비용성예수금(월중평잔)      
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 핵심예수금(반기평잔)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 핵심예수금(월중평잔)      
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 대출금(순증잔액)      
		      //비이자사업 40
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 카드사업(전체매출액)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 카드사업(유효회원)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신탁사업(특정금전보수)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신탁사업(부동산보수)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 공제사업(환산공제료)      
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 펀드사업(이익)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 펀드사업(잔고원금)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 펀드사업(고객수)
		      //감점 5  
		      +"총여신|연체액|연체율 |평점/배점|그룹내순위|"          // 5 연체율
		      //가점 20 
		      +"목표|실적|달성률 |평점/배점|그룹내순위|"          // 5 개인고객수증대
		      +"목표|실적|달성률 |평점/배점|그룹내순위|"          // 5 기업고객수증대
		      +"목표|실적|달성률 |평점/배점|그룹내순위|"          // 5 개인저비용성증대
		      +"목표|실적|달성률 |평점/배점|그룹내순위|"          // 5 기엄저비용성증대
          ;                                     
      
	
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );
	//typeTime("setGrid2022H start1")
	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
	          { Text:strHeader1, Align:"Center"},
	          { Text:strHeader2, Align:"Center"} ];
	mySheet.InitHeaders(headers, info);
	//typeTime("setGrid2022H start2")
	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" }, // 점번호
		{Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" }, // 점명
		{Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" }, // PG명
		{Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 }, // 일일성과_평점합계
		{Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 }, // 그룹내순위
		// 고객관계 - 상품판매
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 고객관계 - 개인신규예수금고객
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 고객관계 - 기업신규예수금고객
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 성장성 - 개인예수금(반기평잔)
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 성장성 - 개인예수금(순증잔액)
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 성장성 - 기업예수금(반기평잔)
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 성장성 - 기업예수금(순증잔액)
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 성장성 - 개인저비용성예수금(반기평잔)
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 성장성 - 개인저비용성예수금(월중평잔)
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 성장성 - 기업저비용성예수금(반기평잔)
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 성장성 - 기업저비용성예수금(월중평잔)
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 성장성 - 핵심예수금(반기평잔)
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 성장성 - 핵심예수금(월중평잔)
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 성장성 - 대출금(순증잔액)
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 비이자사업 - 카드사업(매출액)
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 비이자사업 - 카드사업(유효회원)
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 비이자사업 - 신탁사업(특정금전보수)
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 비이자사업 - 신탁사업(부동산보수)
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 비이자사업 - 공제사업(환산공제료)
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 비이자사업 - 공제사업(일사납공제료)
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 비이자사업 - 펀드사업(물량)
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 비이자사업 - 펀드사업(고객수)
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 감점 - 연체율
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 가점 - 개인고객수증대
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 가점 - 기업고객수증대
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 가점 - 개인저비용성증대
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		// 가점 - 기업저비용성증대
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
          
	mySheet.InitColumns(cols);
	//typeTime("setGrid2022H start3")
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	//typeTime("setGrid2022H start4")
	mySheet.SetAutoSumPosition(0);
	//typeTime("setGrid2022H start5")
	mySheet.SetCountPosition(1); 
    //지원안함[check again] UnitText="백만원,포인트,%";
    var strUnitText="백만원,포인트,%";
    showUnitText(strUnitText);
    newSetActionMenu(mySheet,"엑셀내려받기");

    //연체율 헤더 부분 강제 머지, 일부점에서 오류 발생해 주석 처리
	//mySheet.SetMergeCell(0, 115, 2, 5);    //row index, col index, row크기, col크기
	
	//typeTime("setGrid2022H end")	
}


/*------------------------------------------*/
/* @기능 : 2022년도 상반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2022H()
{
	//typeTime("setGrid2022H start")
	
    //pgcode  = document.frm.pgcode.value;
    baseday = document.frm.baseday.value;
	
  	mySheet.Reset();

  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  	// 상위 GRID에 대한 속성정보 설정
	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";
	
	strHeader0 =//5
		       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         
		      //고객관계 15
		      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
		      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
		      //성장성 55
		      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|" 
		      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
		      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
		      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
		      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
		      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
		      //비이자사업 40
		      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"                  
		      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
		      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
		      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
		      //감점 5
		      +"감점|감점|감점|감점|감점|" 
		      //가점 10                                                    
		      +"가점|가점|가점|가점|가점|"                                                                                 
		      +"가점|가점|가점|가점|가점|" ;
	                                                                                
      strHeader1 = //5
		       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"    
		      //고객관계 15
		      +"상품판매|상품판매|상품판매|상품판매|상품판매|"      
		      +"개인신규예수금고객|개인신규예수금고객|개인신규예수금고객|개인신규예수금고객|개인신규예수금고객|"      
		      +"기업신규예수금고객|기업신규예수금고객|기업신규예수금고객|기업신규예수금고객|기업신규예수금고객|"      
		      //성장성 55
		      +"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"                                    
		      +"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"                                     
		      +"기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|"                                     
		      +"기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|"	                                             
		      +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"  
		      +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"
		      +"기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|"   
		      +"기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|" 
		      +"핵심예수금(반기평잔)|핵심예수금(반기평잔)|핵심예수금(반기평잔)|핵심예수금(반기평잔)|핵심예수금(반기평잔)|"	
		      +"핵심예수금(월중평잔)|핵심예수금(월중평잔)|핵심예수금(월중평잔)|핵심예수금(월중평잔)|핵심예수금(월중평잔)|"	
		      +"대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|"	      
		      //비이자사업 40 														 
		      +"카드사업(전체매출액)|카드사업(전체매출액)|카드사업(전체매출액)|카드사업(전체매출액)|카드사업(전체매출액)|"                                                         
		      +"카드사업(유효회원)|카드사업(유효회원)|카드사업(유효회원)|카드사업(유효회원)|카드사업(유효회원)|"                          
		      +"신탁사업(특정금전보수)|신탁사업(특정금전보수)|신탁사업(특정금전보수)|신탁사업(특정금전보수)|신탁사업(특정금전보수)|"                                              					  
		      +"신탁사업(부동산보수)|신탁사업(부동산보수)|신탁사업(부동산보수)|신탁사업(부동산보수)|신탁사업(부동산보수)|"        
		      +"공제사업(환산공제료)|공제사업(환산공제료)|공제사업(환산공제료)|공제사업(환산공제료)|공제사업(환산공제료)|"                             
		      +"펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|"                                    
		      +"펀드사업(잔고원금)|펀드사업(잔고원금)|펀드사업(잔고원금)|펀드사업(잔고원금)|펀드사업(잔고원금)|"                                    
		      +"펀드사업(고객수)|펀드사업(고객수)|펀드사업(고객수)|펀드사업(고객수)|펀드사업(고객수)|"                                    
		      //감점 5                                                    
		      +"연체율|연체율|연체율|연체율|연체율|"       
		      //가점 10                                                    
		      +"개인고객수증대|개인고객수증대|개인고객수증대|개인고객수증대|개인고객수증대|"                                                
		      +"기업고객수증대|기업고객수증대|기업고객수증대|기업고객수증대|기업고객수증대|" ;  
	
	strHeader2 = //5
		       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"    // 5
		      //고객관계 15
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 상품판매
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인신규예수금고객
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업신규예수금고객
		      //성장성 55
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인예수금(반기평잔)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인예수금(순증잔액)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업예수금(반기평잔)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업예수금(순증잔액)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인저비용성예수금(반기평잔)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인저비용성예수금(월중평잔)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업저비용성예수금(반기평잔)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업저비용성예수금(월중평잔)      
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 핵심예수금(반기평잔)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 핵심예수금(월중평잔)      
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 대출금(순증잔액)      
		      //비이자사업 40
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 카드사업(전체매출액)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 카드사업(유효회원)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신탁사업(특정금전보수)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신탁사업(부동산보수)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 공제사업(환산공제료)      
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 펀드사업(이익)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 펀드사업(잔고원금)
		      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 펀드사업(고객수)
		      //감점 5  
		      +"총여신|연체액|연체율 |평점/배점|그룹내순위|"          // 5 연체율
		      //가점 5  
		      +"목표|실적|달성률 |평점/배점|그룹내순위|"          // 5 개인고객수증대
		      +"목표|실적|달성률 |평점/배점|그룹내순위|"          // 5 기업고객수증대
              ;                                     
      
	
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );
	//typeTime("setGrid2022H start1")
	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
	          { Text:strHeader1, Align:"Center"},
	          { Text:strHeader2, Align:"Center"} ];
	mySheet.InitHeaders(headers, info);
	//typeTime("setGrid2022H start2")
	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
		{Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
		{Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
          
	mySheet.InitColumns(cols);
	//typeTime("setGrid2022H start3")
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	//typeTime("setGrid2022H start4")
	mySheet.SetAutoSumPosition(0);
	//typeTime("setGrid2022H start5")
	mySheet.SetCountPosition(1); 
    //지원안함[check again] UnitText="백만원,포인트,%";
    var strUnitText="백만원,포인트,%";
    showUnitText(strUnitText);
    newSetActionMenu(mySheet,"엑셀내려받기");

    //연체율 헤더 부분 강제 머지, 일부점에서 오류 발생해 주석 처리
	//mySheet.SetMergeCell(0, 115, 2, 5);    //row index, col index, row크기, col크기
	
	//typeTime("setGrid2022H end")	
}


/*------------------------------------------*/
/* @기능 : 2021년도 하반기 기준 그리드 set  */
/*         2021년도 10월기준 반영           */
/*------------------------------------------*/        
function setGrid2021H2()
{
  ///pgcode  = document.frm.pgcode.value;
  baseday = document.frm.baseday.value;
  
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";

	strHeader0 =  
      //5
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         
      //고객관계 20
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
      //성장성 50
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|" 
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      //비이자사업 40
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"                  
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
      //연체율 5
      +"연체율|연체율|연체율|연체율|연체율|" 
      //경영현안_가점 5                                                    
      +"경영현안_가점|경영현안_가점|경영현안_가점|경영현안_가점|경영현안_가점|"                                                                                 
      ;    
		
	strHeader1 =  
      //5
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"    
      //고객관계 20
      +"상품판매|상품판매|상품판매|상품판매|상품판매|"
      +"디지털 신규비이자고객|디지털 신규비이자고객|디지털 신규비이자고객|디지털 신규비이자고객|디지털 신규비이자고객|"
      +"신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|"      
      +"신규 우량 고객|신규 우량 고객|신규 우량 고객|신규 우량 고객|신규 우량 고객|"      
      //성장성 50
      +"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"                                    
      +"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"                                     
      +"기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|"                                     
      +"기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|"	                                             
      +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"  
      +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"
      +"기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|"   
      +"기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|" 
      +"대출금(순증잔액_최종밴드평가)|대출금(순증잔액_최종밴드평가)|대출금(순증잔액_최종밴드평가)|대출금(순증잔액_최종밴드평가)|대출금(순증잔액_최종밴드평가)|"	
      +"신규대출금|신규대출금|신규대출금|신규대출금|신규대출금|"	
      //비이자사업 40 														 
      +"카드사업(전체매출액)|카드사업(전체매출액)|카드사업(전체매출액)|카드사업(전체매출액)|카드사업(전체매출액)|"                                                         
      +"카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|"                          
      +"신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|"                                              					  
      +"공제사업(신계약적립식)|공제사업(신계약적립식)|공제사업(신계약적립식)|공제사업(신계약적립식)|공제사업(신계약적립식)|"                 
      +"공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|"                                    
      +"공제사업(신계약보장성)|공제사업(신계약보장성)|공제사업(신계약보장성)|공제사업(신계약보장성)|공제사업(신계약보장성)|"
      +"펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|"                                    
      +"펀드사업(법인신규)|펀드사업(법인신규)|펀드사업(법인신규)|펀드사업(법인신규)|펀드사업(법인신규)|"                                    
      //연체율 5                                                    
      +"연체율|연체율|연체율|연체율|연체율|"       
      //경영현안_가점 5                                                    
      +"경영현안_가점|경영현안_가점|경영현안_가점|경영현안_가점|경영현안_가점|"                                                
      ;
	 
 	 strHeader2 =  
      //5
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"    // 5
      //고객관계 20
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 상품판매
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 디지털 신규비이자고객
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신규 예수금 고객
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신규 우량 고객
      //성장성 50
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인예수금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업예수금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인저비용성예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인저비용성예수금(월중평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업저비용성예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업저비용성예수금(월중평잔)
      +"밴드범위|실적|최종밴드범위이탈금액|평점/배점|그룹내순위|" // 5 대출금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신규대출금
      //비이자사업 40
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 카드사업(전체매출액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 카드사업(신규유효회원)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신탁사업(보수)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 공제사업(신계약적립식)      
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 공제사업(신계약일시납)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 공제사업(신계약보장성)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 펀드사업(이익)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 펀드사업(법인신규)
      //연체율 5  
      +"총여신|연체액|연체율 |평점/배점|그룹내순위|"          // 5 연체율
      //경영현안_가점 5  
      +"목표|실적|달성률 |평점/배점|그룹내순위|"          // 5 경영현안_가점
      

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:90,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,포인트,%";
   var strUnitText="백만원,포인트,%";
   showUnitText(strUnitText);
   newSetActionMenu(mySheet,"엑셀내려받기");

   //연체율 헤더 부분 강제 머지, 일부점에서 오류 발생해 주석 처리
	  //mySheet.SetMergeCell(0, 115, 2, 5);    //row index, col index, row크기, col크기

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
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";

	strHeader0 =  
      //5
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         
      //고객관계 20
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
      //성장성 50
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|" 
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      //비이자사업 40
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"                  
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
      //연체율 5
      +"연체율|연체율|연체율|연체율|연체율|" 
     ;    
		
	strHeader1 = 
      //5
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"    
      //고객관계 20
      +"상품판매|상품판매|상품판매|상품판매|상품판매|"
      +"디지털 신규비이자고객|디지털 신규비이자고객|디지털 신규비이자고객|디지털 신규비이자고객|디지털 신규비이자고객|"
      +"신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|"      
      +"신규 우량 고객|신규 우량 고객|신규 우량 고객|신규 우량 고객|신규 우량 고객|"      
      //성장성 50
      +"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"                                    
      +"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"                                     
      +"기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|"                                     
      +"기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|"	                                             
      +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"  
      +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"
      +"기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|"   
      +"기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|" 
      +"대출금(순증잔액_밴드평가)|대출금(순증잔액_밴드평가)|대출금(순증잔액_밴드평가)|대출금(순증잔액_밴드평가)|대출금(순증잔액_밴드평가)|"	
      +"신규대출금|신규대출금|신규대출금|신규대출금|신규대출금|"	
      //비이자사업 40 														 
      +"카드사업(전체매출액)|카드사업(전체매출액)|카드사업(전체매출액)|카드사업(전체매출액)|카드사업(전체매출액)|"                                                         
      +"카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|"                          
      +"신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|"                                              					  
      +"공제사업(신계약적립식)|공제사업(신계약적립식)|공제사업(신계약적립식)|공제사업(신계약적립식)|공제사업(신계약적립식)|"                 
      +"공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|"                                    
      +"공제사업(신계약보장성)|공제사업(신계약보장성)|공제사업(신계약보장성)|공제사업(신계약보장성)|공제사업(신계약보장성)|"
      +"펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|"                                    
      +"펀드사업(법인신규)|펀드사업(법인신규)|펀드사업(법인신규)|펀드사업(법인신규)|펀드사업(법인신규)|"                                    
      //연체율 5                                                    
      +"연체율|연체율|연체율|연체율|연체율|"       
      ;
	
	strHeader2 =  
      //5
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"    // 5
      //고객관계 20
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 상품판매
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 디지털 신규비이자고객
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신규 예수금 고객
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신규 우량 고객
      //성장성 50
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인예수금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업예수금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인저비용성예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인저비용성예수금(월중평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업저비용성예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업저비용성예수금(월중평잔)
      +"밴드범위|실적|밴드범위이탈금액|평점/배점|그룹내순위|" // 5 대출금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신규대출금
      //비이자사업 40
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 카드사업(전체매출액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 카드사업(신규유효회원)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신탁사업(보수)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 공제사업(신계약적립식)      
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 공제사업(신계약일시납)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 공제사업(신계약보장성)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 펀드사업(이익)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 펀드사업(법인신규)
      //연체율 5  
      +"총여신|연체액|연체율 |평점/배점|그룹내순위|"          // 5 연체율
      ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );
   
   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
               { Text:strHeader1, Align:"Center"},
               { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);
   
   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
          {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
          {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:90,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);
   
   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,포인트,%";
   var strUnitText="백만원,포인트,%";
   showUnitText(strUnitText);
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
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";

	if (pgcode == '16') {

		strHeader0 = "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         		// 5
	          +"신규예수금고객|신규예수금고객|신규예수금고객|신규예수금고객|신규예수금고객|"                                               		// 5
	          +"신규기업대출금고객|신규기업대출금고객|신규기업대출금고객|신규기업대출금고객|신규기업대출금고객|"              
	          +"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"                                     		// 5
	          +"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"                                     		// 5
	          +"저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|"  // 5
	          +"저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|"  // 5          
	          +"대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|"  										// 5
			  +"연체율|연체율|연체율|연체율|연체율|"                                                											// 5
	          ;    
			
		strHeader1 = "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         // 5
	          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 신규예수금고객
	          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 신규기업대출금고객
	          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 예수금(반기평잔)
	          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 예수금(순증잔액)
	          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 저비용성예수금(반기평잔)
	          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 저비용성예수금(월중평잔)          
	          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 대출금(순증잔액)
	          +"총여신|연체액|연체율 |평점/배점|그룹내순위|"                                                                               // 5 연체율
	          ;
	
 /* ----------- RMC 기준 그리드 화면 설정 ----------- */
     mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

     var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
     var headers = [ { Text:strHeader0, Align:"Center"},
               { Text:strHeader1, Align:"Center"} ];
     mySheet.InitHeaders(headers, info);

     var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
         {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
         {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
         {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
         {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
         {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:90,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
         {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
         {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
         {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
         {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
         {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
         {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
      
     mySheet.InitColumns(cols);
	} 
    
    /* ----------- 영업점 기준 그리드 화면 설정 ----------- */
    else {
	
		strHeader0 =  
	      //5
	       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         
	      //고객관계 25
	      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
	      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
	      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
	      //성장성 45
	      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|" 
	      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
	      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
	      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
	      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
	      //비이자사업 30
	      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"                  
	      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
	      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
	      //연체율 5
	      +"연체율|연체율|연체율|연체율|연체율|"                                                                         
	      ;    
			
		strHeader1 =  
	      //5
	       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"    
	      //고객관계 25
	      +"상품판매|상품판매|상품판매|상품판매|상품판매|"
	      +"디지털 신규고객|디지털 신규고객|디지털 신규고객|디지털 신규고객|디지털 신규고객|"
	      +"디지털 신규비이자고객|디지털 신규비이자고객|디지털 신규비이자고객|디지털 신규비이자고객|디지털 신규비이자고객|"
	      +"신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|"
	      +"신규 대출금 고객|신규 대출금 고객|신규 대출금 고객|신규 대출금 고객|신규 대출금 고객|"
	      //성장성 45
	      +"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"                                    
	      +"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"                                     
	      +"기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|"                                     
	      +"기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|"	                                             
	      +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"  
	      +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"
	      +"기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|"   
	      +"기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|" 
	      +"대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|"	
	      //비이자사업 30 														 
	      +"카드사업(전체매출액)|카드사업(전체매출액)|카드사업(전체매출액)|카드사업(전체매출액)|카드사업(전체매출액)|"                                                         
	      +"카드사업(신규신용매출액)|카드사업(신규신용매출액)|카드사업(신규신용매출액)|카드사업(신규신용매출액)|카드사업(신규신용매출액)|"                          
	      +"신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|"                                              					  
	      +"공제사업(신계약적립식)|공제사업(신계약적립식)|공제사업(신계약적립식)|공제사업(신계약적립식)|공제사업(신계약적립식)|"                 
	      +"공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|"                                    
	      +"펀드사업(펀드이익)|펀드사업(펀드이익)|펀드사업(펀드이익)|펀드사업(펀드이익)|펀드사업(펀드이익)|"                                    
	      //연체율 5                                                    
	      +"연체율|연체율|연체율|연체율|연체율|"                                              
	      ;
	
		strHeader2 =  
	      //5
	       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"    // 5
	      //고객관계 25
	      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 상품판매
	      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 디지털 신규고객
	      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 디지털 신규비이자고객
	      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신규 예수금 고객
	      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신규 대출금 고객
	      //성장성 45
	      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인예수금(반기평잔)
	      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인예수금(순증잔액)
	      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업예수금(반기평잔)
	      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업예수금(순증잔액)
	      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인저비용성예수금(반기평잔)
	      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인저비용성예수금(월중평잔)
	      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업저비용성예수금(반기평잔)
	      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업저비용성예수금(월중평잔)
	      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 대출금(순증잔액)
	      //비이자사업 30
	      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 카드사업(전체매출액)
	      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 카드사업(신규신용매출액)
	      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신탁사업(보수)
	      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 공제사업(신계약적립식)      
	      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 공제사업(신계약일시납)
	      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 펀드사업(펀드이익)
	      //연체율 5  
	      +"총여신|연체액|연체율 |평점/배점|그룹내순위|"          // 5 연체율
	      ;
	
    mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
              { Text:strHeader1, Align:"Center"},
              { Text:strHeader2, Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
        {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
     
    mySheet.InitColumns(cols);
    }

    mySheet.SetEditable(0);
	mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetCountPosition(1); 
    //지원안함[check again] UnitText="백만원,포인트,%";
    var strUnitText="백만원,포인트,%";
    showUnitText(strUnitText);
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

	/* ----------- RMC 기준 그리드 화면 설정 ----------- */
	if (pgcode == '16') {

	strHeader0 =  
           "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         		// 5
          +"신규예수금고객|신규예수금고객|신규예수금고객|신규예수금고객|신규예수금고객|"                                               		// 5
          +"신규기업대출금고객|신규기업대출금고객|신규기업대출금고객|신규기업대출금고객|신규기업대출금고객|"              
          +"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"                                     		// 5
          +"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"                                     		// 5
          +"저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|"  // 5
          +"저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|"  // 5          
          +"대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|"  										// 5
		  +"연체율|연체율|연체율|연체율|연체율|"                                                											// 5
          ;    
		
	strHeader1 =  
           "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         // 5
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 신규예수금고객
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 신규기업대출금고객
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 예수금(반기평잔)
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 예수금(순증잔액)
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 저비용성예수금(반기평잔)
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 저비용성예수금(월중평잔)          
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 대출금(순증잔액)
          +"총여신|연체액|연체율 |평점/배점|그룹내순위|"                                                                               // 5 연체율
         ;

         mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

         var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
         var headers = [ { Text:strHeader0, Align:"Center"},
                   { Text:strHeader1, Align:"Center"} ];
         mySheet.InitHeaders(headers, info);

         var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
          
         mySheet.InitColumns(cols);

         mySheet.SetEditable(0);

}
	
	    /* ----------- 영업점 기준 그리드 화면 설정 ----------- */
    else {

	strHeader0 =  
      //5
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         
      //고객관계 15
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
      //성장성 45
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|" 
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      //비이자사업 40
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"                  
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업"
      ;    
		
	strHeader1 =  
      //5
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"    
      //고객관계 15
      +"상품판매|상품판매|상품판매|상품판매|상품판매|디지털고객|디지털고객|디지털고객|디지털고객|디지털고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|"          
      //성장성 45
      +"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"                                    
      +"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"                                     
      +"기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|"                                     
      +"기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|"	                                             
      +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"  
      +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"
      +"기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|"   
      +"기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|" 
      +"대출금(신규잔액)|대출금(신규잔액)|대출금(신규잔액)|대출금(신규잔액)|대출금(신규잔액)|"	
      //비이자사업 40 														 
      +"카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|"                                                         
      +"카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|"                          
      +"신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|"                                              					  
      +"공제사업(신계약적립_누증)|공제사업(신계약적립_누증)|공제사업(신계약적립_누증)|공제사업(신계약적립_누증)|공제사업(신계약적립_누증)|"                 
      +"공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|"                                    
      +"펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|"                                                        
      +"펀드사업(적립식 건수)|펀드사업(적립식 건수)|펀드사업(적립식 건수)|펀드사업(적립식 건수)|펀드사업(적립식 건수)|"                                                        
      +"연체율|연체율|연체율|연체율|연체율|"                                              
      ;
	
	strHeader2 =  
      //5
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"    // 5
      //고객관계 15
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 상품판매
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 디지털고객
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신규예수금고객
      //성장성 45
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인예수금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업예수금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인저비용성예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인저비용성예수금(월중평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업저비용성예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업저비용성예수금(월중평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 대출금(순증잔액)
      //비이자사업 40
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 카드사업(매출액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 카드사업(신규유효회원)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신탁사업(보수)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 공제사업(신계약적립_누증)      
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 공제사업(신계약일시납)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 펀드사업(수탁고)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 펀드사업(적립식 건수)      
      +"총여신|연체액|연체율 |평점/배점|그룹내순위|"               // 5 연체율
      ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   }

   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,천미불,건,%";
   var strUnitText="백만원,천미불,건,%";
   showUnitText(strUnitText);
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

/* ----------- RMC 기준 그리드 화면 설정 ----------- */
    if (pgcode == '16') {

	strHeader0 =  
           "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         		// 5
          +"신규예수금고객|신규예수금고객|신규예수금고객|신규예수금고객|신규예수금고객|"                                               		// 5
         
          +"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"                                     		// 5
          +"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"                                     		// 5
          +"저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|"  // 5
          +"저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|"  // 5          
          +"대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|"  										// 5
		  +"연체율|연체율|연체율|연체율|연체율|"                                                											// 5
          ;    
		
	strHeader1 =  
           "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         // 5
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 신규예수금고객
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 예수금(반기평잔)
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 예수금(순증잔액)
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 저비용성예수금(반기평잔)
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 저비용성예수금(월중평잔)          
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 대출금(순증잔액)
          +"총여신|연체액|연체율 |평점/배점|그룹내순위|"                                                                               // 5 연체율
          ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
}   
    
    /* ----------- 영업점 기준 그리드 화면 설정 ----------- */
    else {
	
	strHeader0 =  
      //5
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         
      //고객관계 10
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"
      //성장성 45
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|" 
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      //비이자사업 45
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"            
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
      ;    
		
	strHeader1 =  
      //5
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"    
      //고객관계 10
      +"상품판매|상품판매|상품판매|상품판매|상품판매|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|"          
      //성장성 45
      +"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"                                    
      +"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"                                     
      +"기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|"                                     
      +"기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|"	                                             
      +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"  
      +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"
      +"기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|"   
      +"기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|" 
      +"대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|"	
      //비이자사업 45 														 
      +"카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|"                                                         
      +"카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|"                          
      +"신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|"                                              					  
      +"공제사업(신계약적립_누증)|공제사업(신계약적립_누증)|공제사업(신계약적립_누증)|공제사업(신계약적립_누증)|공제사업(신계약적립_누증)|"           
      +"공제사업(신계약적립_초회)|공제사업(신계약적립_초회)|공제사업(신계약적립_초회)|공제사업(신계약적립_초회)|공제사업(신계약적립_초회)|"                                  
      +"공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|"                                    
      +"펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|"                                                        
      +"펀드사업(적립식 건수)|펀드사업(적립식 건수)|펀드사업(적립식 건수)|펀드사업(적립식 건수)|펀드사업(적립식 건수)|"                                                        
      +"연체율|연체율|연체율|연체율|연체율|"                                              
      ;
	
	strHeader2 = 
      //5
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"    // 5
      //고객관계 10
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 상품판매
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신규예수금고객
      //성장성 45
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인예수금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업예수금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인저비용성예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인저비용성예수금(월중평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업저비용성예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업저비용성예수금(월중평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 대출금(순증잔액)
      //비이자사업 45
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 카드사업(매출액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 카드사업(신규유효회원)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신탁사업(보수)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 공제사업(신계약적립_누증)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 공제사업(신계약적립_초회)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 공제사업(신계약일시납)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 펀드사업(수탁고)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 펀드사업(적립식 건수)      
      +"총여신|연체액|연체율 |평점/배점|그룹내순위|"               // 5 연체율
      ;
	
   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
      }

   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,천미불,건,%";
   var strUnitText="백만원,천미불,건,%";
   showUnitText(strUnitText);
   newSetActionMenu(mySheet,"엑셀내려받기");
  
}



/*------------------------------------------*/
/* @기능 : 2019년도 하반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2019H2()
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

/* ----------- RMC 기준 그리드 화면 설정 ----------- */
	if (pgcode == '16') {

		strHeader0 =  
           "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         // 5
          +"연 체 율|연 체 율|연 체 율|연 체 율|연 체 율|"                                                                             // 5
          +"신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|"                 // 5
          +"신규 기업대출금 고객|신규 기업대출금 고객|신규 기업대출금 고객|신규 기업대출금 고객|신규 기업대출금 고객|"                 // 5
          +"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"                                     // 5
          +"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"                                     // 5
          +"저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|"  // 5
          +"저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|"  // 5          
          +"대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|"                                     // 5
          ;    
		
		strHeader1 =  
           "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         // 5
          +"총여신|연체액| 연체율 |평점/배점|그룹내순위|"                                                                              // 5 연체율
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 신규 기업예수금 고객
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 대출금(순증잔액)
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 예수금(반기평잔)
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 예수금(순증잔액)
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 저비용성예수금(반기평잔)
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 저비용성예수금(월중평잔)          
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 신규 기업대출금 고객
          ;
	
   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
      }  
    
    /* ----------- 영업점 기준 그리드 화면 설정 ----------- */
    else {
	
	strHeader0 =  
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         // 5
      +"건  전  성|건  전  성|건  전  성|건  전  성|건  전  성|"                                                                   // 5
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"  // 13
      +"고 객 관 계|고 객 관 계|고 객 관 계|"              
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"            // 55
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"            // 40
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
      ;    
		
	strHeader1 =  
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                                            // 5 
      +"총여신|연체액|연체율|평점/배점|그룹내순위|"                                                                                                   // 5 건전성
      +"신규고객|신규고객|신규고객|신규고객|신규고객|기존고객|기존고객|기존고객|기존고객|기존고객|"                                                   // 5 고객관계
      +"전략사업|전략사업|전략사업|"                                                                                                                  // 3 
      +"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"                                    // 5 성장성
      +"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"                                    // 5
      +"기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|"                                    // 5
      +"기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|"                                    // 5
      +"신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|"                                                        // 5
      +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"  // 5
      +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"  // 5      
      +"기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|"  // 5      
      +"기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|"  // 5
      +"소매대출금(순증잔액)|소매대출금(순증잔액)|소매대출금(순증잔액)|소매대출금(순증잔액)|소매대출금(순증잔액)|"                                    // 5
      +"기업/수산대출금(순증잔액)|기업/수산대출금(순증잔액)|기업/수산대출금(순증잔액)|기업/수산대출금(순증잔액)|기업/수산대출금(순증잔액)|"           // 5      
      +"카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|"                                                        // 5 비이자사업      
      +"카드사업(순증유효회원)|카드사업(순증유효회원)|카드사업(순증유효회원)|카드사업(순증유효회원)|카드사업(순증유효회원)|"                          // 5
      +"신탁사업(금전신탁)|신탁사업(금전신탁)|신탁사업(금전신탁)|신탁사업(금전신탁)|신탁사업(금전신탁)|"                                              // 5
      +"신탁사업(부동산신탁)|신탁사업(부동산신탁)|신탁사업(부동산신탁)|신탁사업(부동산신탁)|신탁사업(부동산신탁)|"                                    // 5
      +"공제사업(신계약적립)|공제사업(신계약적립)|공제사업(신계약적립)|공제사업(신계약적립)|공제사업(신계약적립)|"                                    // 5
      +"공제사업(신계약일시)|공제사업(신계약일시)|공제사업(신계약일시)|공제사업(신계약일시)|공제사업(신계약일시)|"                                    // 5
      +"펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|"                                                        // 5
      +"연계증권(ELF, ELT)|연계증권(ELF, ELT)|연계증권(ELF, ELT)|연계증권(ELF, ELT)|연계증권(ELF, ELT)|"                                              // 5
      ;

	strHeader2 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"    // 5
      +"총여신|연체액|연체율|평점/배점|그룹내순위|"           // 5 연체율
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신규고객
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기존고객
      +"실적|평점/배점|그룹내순위|"                           // 3 전략사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인예수금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업예수금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신규예수금고객
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인저비용성예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인저비용성예수금(월중평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업저비용성예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업저비용성예수금(월중평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 소매대출금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업/수산대출금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 카드사업(매출액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 카드사업(순증유효회원)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신탁사업(금전신탁)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신탁사업(부동산신탁)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 공제사업(신계약적립)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 공제사업(신계약일시)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 펀드사업(수탁고)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 연계증권(ELF, ELT)
      ;
	
   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
    }

   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,천미불,건,%";
   var strUnitText="백만원,천미불,건,%";
   showUnitText(strUnitText);
   newSetActionMenu(mySheet,"엑셀내려받기");
 
}

/*------------------------------------------*/
/* @기능 : 2019년도 상반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2019()
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

/* ----------- RMC 기준 그리드 화면 설정 ----------- */
    if (pgcode == '16') {
    
		strHeader0 =  
           "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         // 5
          +"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"                                     // 5
          +"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"                                     // 5
          +"신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|"                 // 5
          +"저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|"  // 5
          +"저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|"  // 5          
          +"대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|"                                     // 5
          +"신규 기업대출금 고객|신규 기업대출금 고객|신규 기업대출금 고객|신규 기업대출금 고객|신규 기업대출금 고객|"                 // 5
          +"연 체 율|연 체 율|연 체 율|연 체 율|연 체 율|"                                                                             // 5
          ;    
		
		strHeader1 =  
           "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         // 5
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 예수금(반기평잔)
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 예수금(순증잔액)
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 신규 기업예수금 고객
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 저비용성예수금(반기평잔)
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 저비용성예수금(월중평잔)          
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 대출금(순증잔액)
          +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 신규 기업대출금 고객
          +"총여신|연체액| 연체율 |평점/배점|그룹내순위|"                                                                              // 5 연체율
          ;
	
   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
             { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
       {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
       {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
       {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
       {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
       {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
       {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
       {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
       {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
       {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
       {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
       {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   }   
    
    /* ----------- 영업점 기준 그리드 화면 설정 ----------- */
    else {
	
	strHeader0 =  
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         // 5
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"  // 13
      +"고 객 관 계|고 객 관 계|고 객 관 계|"              
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"            // 50
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"            // 40
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
      +"건  전  성|건  전  성|건  전  성|건  전  성|건  전  성|"                                                                   // 5
      ;    
		
	strHeader1 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                                            // 5 
      +"신규고객|신규고객|신규고객|신규고객|신규고객|"                                                                                                // 5 고객관계
      +"기존고객|기존고객|기존고객|기존고객|기존고객|"                                                                                                // 5 
      +"전략사업|전략사업|전략사업|"                                                                                                                  // 3 
      +"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"                                    // 5 성장성
      +"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"                                    // 5
      +"기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|"                                    // 5
      +"기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|"                                    // 5
      +"신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|"                                    // 5
      +"저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|"                // 5
      +"저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|"                // 5
      +"기업대출금(순증잔액)|기업대출금(순증잔액)|기업대출금(순증잔액)|기업대출금(순증잔액)|기업대출금(순증잔액)|"                                    // 5
      +"수산해양대출금(순증잔액)|수산해양대출금(순증잔액)|수산해양대출금(순증잔액)|수산해양대출금(순증잔액)|수산해양대출금(순증잔액)|"                // 5
      +"소매대출금(순증잔액)|소매대출금(순증잔액)|소매대출금(순증잔액)|소매대출금(순증잔액)|소매대출금(순증잔액)|"                                    // 5
      +"카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|"                                                        // 5 비이자사업
      +"카드사업(순증유효회원)|카드사업(순증유효회원)|카드사업(순증유효회원)|카드사업(순증유효회원)|카드사업(순증유효회원)|"                          // 5
      +"신탁사업(금전신탁)|신탁사업(금전신탁)|신탁사업(금전신탁)|신탁사업(금전신탁)|신탁사업(금전신탁)|"                                              // 5
      +"신탁사업(부동산신탁)|신탁사업(부동산신탁)|신탁사업(부동산신탁)|신탁사업(부동산신탁)|신탁사업(부동산신탁)|"                                    // 5
      +"공제사업(신계약적립)|공제사업(신계약적립)|공제사업(신계약적립)|공제사업(신계약적립)|공제사업(신계약적립)|"                                    // 5
      +"공제사업(신계약일시)|공제사업(신계약일시)|공제사업(신계약일시)|공제사업(신계약일시)|공제사업(신계약일시)|"                                    // 5
      +"펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|"                                                        // 5
      +"연계증권(ELF, ELT)|연계증권(ELF, ELT)|연계증권(ELF, ELT)|연계증권(ELF, ELT)|연계증권(ELF, ELT)|"                                              // 5
      +"총여신|연체액|연체율|평점/배점|그룹내순위|"                                                                                                   // 5 건전성
      ;
	
	strHeader2 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"    // 5
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신규고객
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기존고객
      +"실적|평점/배점|그룹내순위|"                           // 3 전략사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인예수금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업예수금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신규기업예수금고객
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 저비용성예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 저비용성예수금(월중평잔)      
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업대출금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 수산해양대출금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 소매대출금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 카드사업(매출액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 카드사업(순증유효회원)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신탁사업(금전신탁)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신탁사업(부동산신탁)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 공제사업(신계약적립)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 공제사업(신계약일시)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 펀드사업(수탁고)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 연계증권(ELF, ELT)
      +"총여신|연체액|연체율|평점/배점|그룹내순위|"           // 5 연체율
      ;    
		
		mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

         var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
         var headers = [ { Text:strHeader0, Align:"Center"},
                   { Text:strHeader1, Align:"Center"},
                   { Text:strHeader2, Align:"Center"} ];
         mySheet.InitHeaders(headers, info);

         var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
          
         mySheet.InitColumns(cols);

         mySheet.SetEditable(0);
		}

   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,천미불,건,%";
   var strUnitText="백만원,천미불,건,%";
   showUnitText(strUnitText);
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*------------------------------------------*/
/* @기능 : 2018년도 하반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2018H2()
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
	
	
	/* ----------- RMC 기준 그리드 화면 설정 ----------- */
    if (pgcode == '16') {
        if (baseday >= '20181011') {
        // RMC 신탁사업을 특정금전신탁과 재산신탁으로 분리

		strHeader0 =  
               "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         // 5
              +"신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|"                 // 5
              +"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"                                     // 5
              +"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"                                     // 5
              +"대 출 금|대 출 금|대 출 금|대 출 금|대 출 금|"                                                                             // 5
              +"외 환 사 업|외 환 사 업|외 환 사 업|외 환 사 업|외 환 사 업|"                                                              // 5
              +"카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|"                                     // 5
              +"신탁사업(특정금전)|신탁사업(특정금전)|신탁사업(특정금전)|신탁사업(특정금전)|신탁사업(특정금전)|"                           // 5
              +"신탁사업(재산신탁)|신탁사업(재산신탁)|신탁사업(재산신탁)|신탁사업(재산신탁)|신탁사업(재산신탁)|"                           // 5              
              +"연 체 율|연 체 율|연 체 율|연 체 율|연 체 율|"                                                                             // 5
              ;    
			
		strHeader1 = 
               "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         // 5
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 신규 기업예수금 고객
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 예수금(반기평잔)
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 예수금(순증잔액)
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 대출금
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 외환사업
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 카드사업(매출액)
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 신탁사업(특정금전)
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 신탁사업(재산신탁)              
              +"총여신|연체액| 연체율 |평점/배점|그룹내순위|"                                                                              // 5 연체율
              ;
		
		strHeader2 = 
               "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         // 5
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 신규 기업예수금 고객
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 예수금(반기평잔)
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 예수금(순증잔액)
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 대출금
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 외환사업
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 카드사업(매출액)
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 신탁사업(특정금전)
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 신탁사업(재산신탁)
              +"총여신|연체액| 연체율 |평점/배점|그룹내순위|"                                                                              // 5 연체율
              ;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
	} else {
		
		strHeader0 =  
               "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         // 5
              +"신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|"                 // 5
              +"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"                                     // 5
              +"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"                                     // 5
              +"대 출 금|대 출 금|대 출 금|대 출 금|대 출 금|"                                                                             // 5
              +"외 환 사 업|외 환 사 업|외 환 사 업|외 환 사 업|외 환 사 업|"                                                              // 5
              +"카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|"                                     // 5
              +"신 탁 사 업|신 탁 사 업|신 탁 사 업|신 탁 사 업|신 탁 사 업|"                                                              // 5
              +"연 체 율|연 체 율|연 체 율|연 체 율|연 체 율|"                                                                             // 5
              ;    
		
		strHeader1 =  
               "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         // 5
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 신규 기업예수금 고객
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 예수금(반기평잔)
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 예수금(순증잔액)
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 대출금
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 외환사업
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 카드사업(매출액)
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 신탁사업
              +"총여신|연체액| 연체율 |평점/배점|그룹내순위|"                                                                              // 5 연체율
              ;
		
		strHeader2 =  
               "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         // 5
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 신규 기업예수금 고객
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 예수금(반기평잔)
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 예수금(순증잔액)
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 대출금
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 외환사업
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 카드사업(매출액)
              +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                    // 5 신탁사업
              +"총여신|연체액| 연체율 |평점/배점|그룹내순위|"                                                                              // 5 연체율
              ;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
		}  
	}/* ----------- 영업점 기준 그리드 화면 설정 ----------- */
    else {
	
		strHeader0 =  
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                         // 5
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"  // 19
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"              
      +"리  테  일|리  테  일|리  테  일|리  테  일|리  테  일|리  테  일|리  테  일|리  테  일|리  테  일|리  테  일|"            // 23
      +"리  테  일|리  테  일|리  테  일|리  테  일|리  테  일|리  테  일|리  테  일|리  테  일|리  테  일|리  테  일|"
      +"리  테  일|리  테  일|리  테  일|"
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"            // 20
      +"성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|성  장  성|"
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"            // 40
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
      +"비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|비이자사업|"
      +"건  전  성|건  전  성|건  전  성|건  전  성|건  전  성|"                                                                   // 5
      ;    
		
		strHeader1 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                                            // 5 
      +"신규고객|신규고객|신규고객|신규고객|신규고객|"                                                                                                // 5 고객관계
      +"기존고객|기존고객|기존고객|기존고객|기존고객|"                                                                                                // 5 
      +"신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|"                                    // 5
      +"스마트금융(스마트폰뱅킹)|스마트금융(스마트폰뱅킹)|스마트금융(SH딩동)|스마트금융(SH딩동)|"                                                     // 4 
      +"전략사업|전략사업|전략사업|"                                                                                                                  // 3 리테일
      +"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"                                    // 5
      +"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"                                    // 5
      +"개인적립식예수금(신규잔액)|개인적립식예수금(신규잔액)|개인적립식예수금(신규잔액)|개인적립식예수금(신규잔액)|개인적립식예수금(신규잔액)|"      // 5
      +"소매대출금(순증잔액)|소매대출금(순증잔액)|소매대출금(순증잔액)|소매대출금(순증잔액)|소매대출금(순증잔액)|"                                    // 5
      +"기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|"                                    // 5 성장성
      +"기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|"                                    // 5
      +"기업대출금(순증잔액)|기업대출금(순증잔액)|기업대출금(순증잔액)|기업대출금(순증잔액)|기업대출금(순증잔액)|"                                    // 5
      +"수산해양대출금(순증잔액)|수산해양대출금(순증잔액)|수산해양대출금(순증잔액)|수산해양대출금(순증잔액)|수산해양대출금(순증잔액)|"                // 5
      +"외환사업|외환사업|외환사업|외환사업|외환사업|"                                                                                                // 5 비이자사업
      +"카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|"                                                        // 5
      +"카드사업(순증유효회원)|카드사업(순증유효회원)|카드사업(순증유효회원)|카드사업(순증유효회원)|카드사업(순증유효회원)|"                          // 5
      +"신탁사업(금전신탁)|신탁사업(금전신탁)|신탁사업(금전신탁)|신탁사업(금전신탁)|신탁사업(금전신탁)|"                                              // 5
      +"신탁사업(부동산신탁)|신탁사업(부동산신탁)|신탁사업(부동산신탁)|신탁사업(부동산신탁)|신탁사업(부동산신탁)|"                                    // 5
      +"공제사업(신계약 생명공제료)|공제사업(신계약 생명공제료)|공제사업(신계약 생명공제료)|공제사업(신계약 생명공제료)|공제사업(신계약 생명공제료)|" // 5
      +"공제사업(신계약 손해공제료)|공제사업(신계약 손해공제료)|공제사업(신계약 손해공제료)|공제사업(신계약 손해공제료)|공제사업(신계약 손해공제료)|" // 5 
      +"펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|"                                                        // 5
      +"총여신|연체액|연체율|평점/배점|그룹내순위|"                                                                                                   // 5 건전성
      ;

	strHeader2 =  
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"    // 5
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신규고객
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기존고객
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신규기업예수금고객
      +"평점/배점|그룹내순위|평점/배점|그룹내순위|"           // 4 스마트금융(스마트폰뱅킹, SH딩동)
      +"실적|평점/배점|그룹내순위|"                           // 3 전략사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인예수금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 개인적립식예수금(신규잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 소매대출금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업예수금(반기평잔)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업예수금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 기업대출금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 수산해양대출금(순증잔액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 외환사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 카드사업(매출액)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 카드사업(누증유효회원)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신탁사업(금전신탁)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 신탁사업(부동산신탁)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 공제사업(신계약 생명공제료)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 공제사업(신계약 손해공제료)
      +"목표|실적|달성률|평점/배점|그룹내순위|"               // 5 펀드사업(수탁고)
      +"총여신|연체액|연체율|평점/배점|그룹내순위|"           // 5 연체율
      ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
  
}
  
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,천미불,건,%";
   var strUnitText="백만원,천미불,건,%";
   showUnitText(strUnitText);
   newSetActionMenu(mySheet,"엑셀내려받기");

}

/*------------------------------------------*/
/* @기능 : 2018년도 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2018()
{
  //pgcode  = document.frm.pgcode.value;
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";

	strHeader0 =  
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                              //                             5
      +"전략사업|전략사업|전략사업|"                                                                    //전략사업                     3
      +"비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|"                    //외환사업                     5
      +"비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|"                    //카드사업(매출액)             5
      +"비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|"                    //카드사업(누증유효회원)       5
      +"비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|"                    //신탁사업(금전신탁)           5
      +"비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|"                    //신탁사업(부동산신탁)         5
      +"비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|"                    //신탁사업                     5
      +"비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|"                    //공제사업(총납입공제료)       5
      +"비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|"                    //공제사업(신규저축성공제료)   5
      +"비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|"                    //공제사업(신규보장성공제료)   5
      +"비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|비 이 자 사 업|"                    //펀드사업(전략상품수탁고)     5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"                              //소매예수금(반기평잔)         5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"                              //소매예수금(순증잔액)         5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"                              //적립식예수금(신규잔액)       5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"                              //기업예수금(반기평잔)         5      
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"                              //기업예수금(월중평잔)         5      
      +"대   출   금|대   출   금|대   출   금|대   출   금|대   출   금|"                              //소매대출금(순증잔액)         5
      +"대   출   금|대   출   금|대   출   금|대   출   금|대   출   금|"                              //기업대출금(순증잔액)         5
      +"대   출   금|대   출   금|대   출   금|대   출   금|대   출   금|"                              //수산해양대출금(순증잔액)     5
      +"연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|"                                        //연체율                       5
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계"                       //활동고객/핵심고객/스마트금융 8
      ;    
		
	strHeader1 =  
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                                                                                                   //                             5
      +"실적|평점/배점|그룹내순위|"                                                                                                                          //전략사업                     3
      +"외환사업|외환사업|외환사업|외환사업|외환사업|"                                                                                                       //외환사업                     5
      +"카드사업\n(매출액)|카드사업\n(매출액)|카드사업\n(매출액)|카드사업\n(매출액)|카드사업\n(매출액)|"                                                     //카드사업(매출액)             5
      +"카드사업\n(누증유효회원)|카드사업\n(누증유효회원)|카드사업\n(누증유효회원)|카드사업\n(누증유효회원)|카드사업\n(누증유효회원)|"                       //카드사업(누증유효회원)       5
      +"신탁사업\n(금전신탁)|신탁사업\n(금전신탁)|신탁사업\n(금전신탁)|신탁사업\n(금전신탁)|신탁사업\n(금전신탁)|"                                           //신탁사업(금전신탁)           5
      +"신탁사업\n(부동산신탁)|신탁사업\n(부동산신탁)|신탁사업\n(부동산신탁)|신탁사업\n(부동산신탁)|신탁사업\n(부동산신탁)|"                                 //신탁사업(부동산신탁)         5
      +"신탁사업|신탁사업|신탁사업|신탁사업|신탁사업|"                                                                                                       //신탁사업                     5
      +"공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|"                       //공제사업(총납입공제료)       5
      +"공제사업\n(신규저축성공제료)|공제사업\n(신규저축성공제료)|공제사업\n(신규저축성공제료)|공제사업\n(신규저축성공제료)|공제사업\n(신규저축성공제료)|"   //공제사업(신규저축성공제료)   5
      +"공제사업\n(신규보장성공제료)|공제사업\n(신규보장성공제료)|공제사업\n(신규보장성공제료)|공제사업\n(신규보장성공제료)|공제사업\n(신규보장성공제료)|"   //공제사업(신규보장성공제료)   5
      +"펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|"        //펀드사업(전략상품수탁고)     5
      +"소매예수금(반기평잔)|소매예수금(반기평잔)|소매예수금(반기평잔)|소매예수금(반기평잔)|소매예수금(반기평잔)|"                                           //소매예수금(반기평잔)         5
      +"소매예수금(순증잔액)|소매예수금(순증잔액)|소매예수금(순증잔액)|소매예수금(순증잔액)|소매예수금(순증잔액)|"                                           //소매예수금(순증잔액)         5
      +"적립식예수금(신규잔액)|적립식예수금(신규잔액)|적립식예수금(신규잔액)|적립식예수금(신규잔액)|적립식예수금(신규잔액)|"                                 //적립식예수금(신규잔액)       5
      +"기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|"                                           //기업예수금(반기평잔)         5      
      +"기업예수금(월중평잔)|기업예수금(월중평잔)|기업예수금(월중평잔)|기업예수금(월중평잔)|기업예수금(월중평잔)|"                                           //기업예수금(월중평잔)         5      
      +"소매대출금(순증잔액)|소매대출금(순증잔액)|소매대출금(순증잔액)|소매대출금(순증잔액)|소매대출금(순증잔액)|"                                           //소매대출금(순증잔액)         5
      +"기업대출금(순증잔액)|기업대출금(순증잔액)|기업대출금(순증잔액)|기업대출금(순증잔액)|기업대출금(순증잔액)|"                                           //기업대출금(순증잔액)         5
      +"수산해양대출금(순증잔액)|수산해양대출금(순증잔액)|수산해양대출금(순증잔액)|수산해양대출금(순증잔액)|수산해양대출금(순증잔액)|"                       //수산해양대출금(순증잔액)     5
      +"총여신|연체액|연체율|평점/배점|그룹내순위|"                                                                                                          //연체율                       5
      +"활동고객|활동고객|핵심고객|핵심고객|스마트금융(스마트폰뱅킹)|스마트금융(스마트폰뱅킹)|스마트금융(SH딩동)|스마트금융(SH딩동)|"                        //활동고객/핵심고객/스마트금융 8
      ;
	
	strHeader2 =  
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                  //                             5
      +"실적|평점/배점|그룹내순위|"                                         //전략사업                     3
      +"목표|실적|달성률|평점/배점|그룹내순위|"                             //외환사업                     5
      +"목표|실적|달성률|평점/배점|그룹내순위|"                             //카드사업(매출액)             5
      +"목표|실적|달성률|평점/배점|그룹내순위|"                             //카드사업(누증유효회원)       5
      +"목표|실적|달성률|평점/배점|그룹내순위|"                             //신탁사업(금전신탁)           5
      +"목표|실적|달성률|평점/배점|그룹내순위|"                             //신탁사업(부동산신탁)         5
      +"목표|실적|달성률|평점/배점|그룹내순위|"                             //신탁사업                     5
      +"목표|실적|달성률|평점/배점|그룹내순위|"                             //공제사업(총납입공제료)       5
      +"목표|실적|달성률|평점/배점|그룹내순위|"                             //공제사업(신규저축성공제료)   5
      +"목표|실적|달성률|평점/배점|그룹내순위|"                             //공제사업(신규보장성공제료)   5
      +"목표|실적|달성률|평점/배점|그룹내순위|"                             //펀드사업(전략상품수탁고)     5
      +"목표|실적|달성률|평점/배점|그룹내순위|"                             //소매예수금(반기평잔)         5
      +"목표|실적|달성률|평점/배점|그룹내순위|"                             //소매예수금(순증잔액)         5
      +"목표|실적|달성률|평점/배점|그룹내순위|"                             //적립식예수금(신규잔액)       5
      +"목표|실적|달성률|평점/배점|그룹내순위|"                             //기업예수금(반기평잔)         5      
      +"목표|실적|달성률|평점/배점|그룹내순위|"                             //기업예수금(월중평잔)         5      
      +"목표|실적|달성률|평점/배점|그룹내순위|"                             //소매대출금(순증잔액)         5
      +"목표|실적|달성률|평점/배점|그룹내순위|"                             //기업대출금(순증잔액)         5
      +"목표|실적|달성률|평점/배점|그룹내순위|"                             //수산해양대출금(순증잔액)     5
      +"총여신|연체액|연체율|평점/배점|그룹내순위|"                         //연체율                       5
      +"평점/배점|그룹내순위|평점/배점|그룹내순위|평점/배점|그룹내순위|평점/배점|그룹내순위|"    //활동고객/핵심고객/스마트금융 8
      ;

    mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
     
	if(pgcode == '16'){                // Peer Group RMC인 경우 신탁사업 그리드 변경
      // 신탁사업_금전신탁
      mySheet.SetColHidden(23,1);
      mySheet.SetColHidden(24,1);
      mySheet.SetColHidden(25,1);
      mySheet.SetColHidden(26,1);
      mySheet.SetColHidden(27,1);
      // 신탁사업_부동산신탁
      mySheet.SetColHidden(28,1);
      mySheet.SetColHidden(29,1);
      mySheet.SetColHidden(30,1);
      mySheet.SetColHidden(31,1);
      mySheet.SetColHidden(32,1);
      // 신탁사업
      mySheet.SetColHidden(33,0);
      mySheet.SetColHidden(34,0);
      mySheet.SetColHidden(35,0);
      mySheet.SetColHidden(36,0);
      mySheet.SetColHidden(37,0);
    } else {
      // 신탁사업_금전신탁
      mySheet.SetColHidden(23,0);
      mySheet.SetColHidden(24,0);
      mySheet.SetColHidden(25,0);
      mySheet.SetColHidden(26,0);
      mySheet.SetColHidden(27,0);
      // 신탁사업_부동산신탁
      mySheet.SetColHidden(28,0);
      mySheet.SetColHidden(29,0);
      mySheet.SetColHidden(30,0);
      mySheet.SetColHidden(31,0);
      mySheet.SetColHidden(32,0);
      // 신탁사업
      mySheet.SetColHidden(33,1);
      mySheet.SetColHidden(34,1);
      mySheet.SetColHidden(35,1);
      mySheet.SetColHidden(36,1);
      mySheet.SetColHidden(37,1);
    }

 
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,천미불,건,%";
   var strUnitText="백만원,천미불,건,%";
   showUnitText(strUnitText);
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*------------------------------------------*/
/* @기능 : 2017년도 하반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2017Q3()
{
  //mySheet.RemoveAll();
  baseday=document.frm.baseday.value;
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";

	strHeader0 =  
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                    //       5
      +"전략사업|전략사업|전략사업|"                                          //전략사업                3
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"   //외환사업                 5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"   //카드사업_매출액  5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"   //카드사업_순증유효회원    5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"   //신탁사업(금전신탁)       5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"   //신탁사업(부동산신탁)     5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"   //공제사업_총납입공제료    5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //공제사업_신규보장성/적립식공제료6
      +"비 이 자 물 량|비 이 자 물 량|"                                                //공제사업(적용평점)       2
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"   //펀드사업_전략상품수탁고  5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 총예수금(잔액)       5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 총예수금(평잔)       5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 총예수금(월평잔)     5      
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 개인예수금(평잔)     5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 개인예수금(잔액)     5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 적립식예금(잔액)     5            
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 중저원가성예금(평잔) 5            
      +"일 반 여 신|일 반 여 신|일 반 여 신|일 반 여 신|일 반 여 신|"         //일반여신_신규잔액       5
      +"수 산 해 양 여 신|수 산 해 양 여 신|수 산 해 양 여 신|수 산 해 양 여 신|수 산 해 양 여 신|"    //수산해양여신_순증잔액   5
      +"소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|"         //소매여신_신규잔액       5
      +"예  대  율|예  대  율|예  대  율|예  대  율|예  대  율|"              //예대율                  5
      +"연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|"              //연체율                  5
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"      //개인핵심/기업핵심/복수거래고객 6
      ;    
		
	strHeader1 =  
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                    
      +"실적|평점/배점|그룹내순위|"                                                  //비이자물량_전략사업
      +"외환사업|외환사업|외환사업|외환사업|외환사업|"                                                    //비이자물량_외환사업
      +"카드사업\n(매출액)|카드사업\n(매출액)|카드사업\n(매출액)|카드사업\n(매출액)|카드사업\n(매출액)|"   //비이자물량_카드사업_매출액
      +"카드사업\n(순증 유효회원)|카드사업\n(순증 유효회원)|카드사업\n(순증 유효회원)|카드사업\n(순증 유효회원)|카드사업\n(순증 유효회원)|"             //비이자물량_카드사업_순증유효회원
      +"신탁사업\n(금전신탁)|신탁사업\n(금전신탁)|신탁사업\n(금전신탁)|신탁사업\n(금전신탁)|신탁사업\n(금전신탁)|"                                      //비이자물량_신탁사업(금전신탁)
      +"신탁사업\n(부동산신탁)|신탁사업\n(부동산신탁)|신탁사업\n(부동산신탁)|신탁사업\n(부동산신탁)|신탁사업\n(부동산신탁)|"                            //비이자물량_신탁사업(부동산신탁)
      +"공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|"                  //비이자물량_공제사업(총납입공제료)
      +"공제사업\n(신규보장성)|공제사업\n(신규보장성)|공제사업\n(신규보장성)|공제사업\n(적립식공제료)|공제사업\n(적립식공제료)|공제사업\n(적립식공제료)|"   //비이자물량_공제사업(신규보장/적립식공제료)
      +"공제사업\n(적용평점)|공제사업\n(적용평점)|"                                                                                                     //비이자물량_공제사업
      +"펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|"   //비이자물량_펀드사업(전략상품 수탁고)
      +"총예수금(순증잔액)|총예수금(순증잔액)|총예수금(순증잔액)|총예수금(순증잔액)|총예수금(순증잔액)|"  //예수금_총예수금(순증잔액)
      +"총예수금(반기평잔)|총예수금(반기평잔)|총예수금(반기평잔)|총예수금(반기평잔)|총예수금(반기평잔)|"  //예수금_총예수금(반기평잔)
      +"총예수금(월중평잔)|총예수금(월중평잔)|총예수금(월중평잔)|총예수금(월중평잔)|총예수금(월중평잔)|"  //예수금_총예수금(월평잔)
      +"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"  //예수금_개인예수금(반기평잔)
      +"개인예수금(잔액)|개인예수금(잔액)|개인예수금(잔액)|개인예수금(잔액)|개인예수금(잔액)|"                      //예수금_개인예수금(잔액)
      +"적립식예수금(잔액)|적립식예수금(잔액)|적립식예수금(잔액)|적립식예수금(잔액)|적립식예수금(잔액)|"  //예수금_적립식예수금(잔액)
      +"중저원가성예금(평잔)|중저원가성예금(평잔)|중저원가성예금(평잔)|중저원가성예금(평잔)|중저원가성예금(평잔)|"   //예수금_중저원가성(평잔)
      +"신규잔액평가|신규잔액평가|신규잔액평가|신규잔액평가|신규잔액평가|"                                //일반여신_신규잔액평가
      +" 순증잔액평가| 순증잔액평가| 순증잔액평가| 순증잔액평가| 순증잔액평가|"                           //수산해양여신_순증잔액평가
      +"신규잔액평가|신규잔액평가|신규잔액평가|신규잔액평가|신규잔액평가|"                                //소매여신_신규잔액평가
      +"총예수금|총여신|예대율|평점/배점|그룹내순위|"        //예대율
      +"총여신|연체액|연체율|평점/배점|그룹내순위|"          //연체율
      +"개인 핵심고객|개인 핵심고객|기업 핵심고객|기업 핵심고객|복수거래 고객수|복수거래 고객수|"         //고객관계_개인/기업/복수거래 고객
      ;
	
	strHeader2 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"
      +"실적|평점/배점|그룹내순위|"                          //전략사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"              //비이자물량_외환사업
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"      //비이자물량_카드사업_카드매출액
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"      //비이자물량_카드사업_순증유효회원
      +"목표|실적|달성률|평점/배점|그룹내순위|"              //비이자물량_신탁사업(금전신탁)
      +"목표|실적|달성률|평점/배점|그룹내순위|"              //비이자물량_신탁사업(부동산신탁)
      +"목표|실적|달성률|평점/배점|그룹내순위|"              //비이자물량_공제사업(총납입공제료)
      +"목표|실적|달성률|목표|실적|달성률|평점/배점|그룹내순위|"  //비이자물량_공제사업(신규보장성_적립식공제료_적용평점)
      +"목표|실적|달성률|평점/배점|그룹내순위|"              //비이자물량_펀드사업(전략상품 수탁고)
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"      //예수금_총예수금(순증잔액)
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"      //예수금_총예수금(반기평잔)
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"      //예수금_총예수금(월중평잔)
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"      //예수금_개인예수금(반기평잔)
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"      //예수금_개인예수금(잔액)
      +"신규목표|신규실적|달성률|평점/배점|그룹내순위|"      //예수금_적립식예금(잔액)
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"      //예수금_중저원가성예금(평잔)
      +"신규목표|신규실적|달성률|평점/배점|그룹내순위|"      //일반여신_신규잔액평가
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"      //해양수산여신_순증잔액평가
      +"신규목표|신규실적|달성률|평점/배점|그룹내순위|"      //소매여신_신규잔액평가
      +"총예수금|총여신|예대율|평점/배점|그룹내순위|"        //예대율
      +"총여신|연체액|연체율|평점/배점|그룹내순위|"          //연체율
      +"평점/배점|그룹내순위|평점/배점|그룹내순위|평점/배점|그룹내순위|"   //고객관계 개인/기업/복수거래
      ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
         
    // 총예수금(순증잔액) 평점/순위 없음
    mySheet.SetColHidden(54,1);
    mySheet.SetColHidden(55,1);
    // 총예수금(월중평잔) 하반기 필요함 상반기 숨김 -> 6월 및 12월 필요함
    // 2017.06.20 : 6월 및 12월에만 보여주기 (6월은 19일자 부터)
    if( (baseday >= '20170619' && baseday <= '20170630') ||
        (baseday >= '20171201' && baseday <= '20171231')  )
    {
        mySheet.SetColHidden(61,0);
        mySheet.SetColHidden(62,0);
        mySheet.SetColHidden(63,0);
        mySheet.SetColHidden(64,0);
        mySheet.SetColHidden(65,0);
    } else {
        mySheet.SetColHidden(61,1);
        mySheet.SetColHidden(62,1);
        mySheet.SetColHidden(63,1);
        mySheet.SetColHidden(64,1);
        mySheet.SetColHidden(65,1);
    }
 
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,천미불,건,%";
   var strUnitText="백만원,천미불,건,%";
   showUnitText(strUnitText);
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*-----------------------------------*/
/* @기능 : 2017년도 상반기 기준 그리드 set  */
/*-----------------------------------*/        
function setGrid2017()
{
  //mySheet.RemoveAll();
  baseday=document.frm.baseday.value;
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";

	strHeader0 =  
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                    //       5
      +"전략사업|전략사업|전략사업|"                                          //전략사업                3
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"   //외환사업                 5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"   //카드사업_매출액  5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"   //카드사업_순증유효회원    5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"   //신탁사업(특정금전신탁)   5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"   //신탁사업(부동산신탁)     5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"   //공제사업_총납입공제료    5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //공제사업_신규보장성/적립식공제료6
      +"비 이 자 물 량|비 이 자 물 량|"                                                //공제사업(적용평점)       2
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"   //펀드사업_전략상품수탁고  5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 총예수금(잔액)       5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 총예수금(평잔)       5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 총예수금(월평잔)     5      
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 적립식예금(잔액)     5            
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 중저원가성예금(평잔) 5            
      +"일 반 여 신|일 반 여 신|일 반 여 신|일 반 여 신|일 반 여 신|"         //일반여신_순증잔액       5
      +"수 산 해 양 여 신|수 산 해 양 여 신|수 산 해 양 여 신|수 산 해 양 여 신|수 산 해 양 여 신|"    //수산해양여신_순증잔액   5
      +"소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|"         //소매여신_신규잔액       5
      +"예  대  율|예  대  율|예  대  율|예  대  율|예  대  율|"              //예대율                  5
      +"연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|"              //연체율                  5
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"      //개인핵심/기업핵심/복수거래고객 6
      ;    
		
	strHeader1 =  
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                    
      +"실적|평점/배점|그룹내순위|"                                                  //비이자물량_전략사업
      +"외환사업|외환사업|외환사업|외환사업|외환사업|"                                                    //비이자물량_외환사업
      +"카드사업\n(매출액)|카드사업\n(매출액)|카드사업\n(매출액)|카드사업\n(매출액)|카드사업\n(매출액)|"   //비이자물량_카드사업_매출액
      +"카드사업\n(순증 유효회원)|카드사업\n(순증 유효회원)|카드사업\n(순증 유효회원)|카드사업\n(순증 유효회원)|카드사업\n(순증 유효회원)|"             //비이자물량_카드사업_순증유효회원
      +"신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|"                  //비이자물량_신탁사업(특정금전신탁)
      +"신탁사업\n(부동산신탁)|신탁사업\n(부동산신탁)|신탁사업\n(부동산신탁)|신탁사업\n(부동산신탁)|신탁사업\n(부동산신탁)|"                            //비이자물량_신탁사업(부동산신탁)
      +"공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|"                  //비이자물량_공제사업(총납입공제료)
      +"공제사업\n(신규보장성)|공제사업\n(신규보장성)|공제사업\n(신규보장성)|공제사업\n(적립식공제료)|공제사업\n(적립식공제료)|공제사업\n(적립식공제료)|"   //비이자물량_공제사업(신규보장/적립식공제료)
      +"공제사업\n(적용평점)|공제사업\n(적용평점)|"                                                                                                     //비이자물량_공제사업
      +"펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|"   //비이자물량_펀드사업(전략상품 수탁고)
      +"총예수금(순증잔액)|총예수금(순증잔액)|총예수금(순증잔액)|총예수금(순증잔액)|총예수금(순증잔액)|"  //예수금_총예수금(순증잔액)
      +"총예수금(반기평잔)|총예수금(반기평잔)|총예수금(반기평잔)|총예수금(반기평잔)|총예수금(반기평잔)|"  //예수금_총예수금(반기평잔)
      +"총예수금(월중평잔)|총예수금(월중평잔)|총예수금(월중평잔)|총예수금(월중평잔)|총예수금(월중평잔)|"  //예수금_총예수금(월평잔)
      +"적립식예수금(잔액)|적립식예수금(잔액)|적립식예수금(잔액)|적립식예수금(잔액)|적립식예수금(잔액)|"  //예수금_적립식예수금(잔액)
      +"중저원가성예금(평잔)|중저원가성예금(평잔)|중저원가성예금(평잔)|중저원가성예금(평잔)|중저원가성예금(평잔)|"   //예수금_중저원가성(평잔)
      +"순증잔액평가|순증잔액평가|순증잔액평가|순증잔액평가|순증잔액평가|"                                //일반여신_순증잔액평가
      +" 순증잔액평가| 순증잔액평가| 순증잔액평가| 순증잔액평가| 순증잔액평가|"                           //수산해양여신_순증잔액평가
      +"신규잔액평가|신규잔액평가|신규잔액평가|신규잔액평가|신규잔액평가|"                                //소매여신_신규잔액평가
      +"총예수금|총여신|예대율|평점/배점|그룹내순위|"        //예대율
      +"총여신|연체액|연체율|평점/배점|그룹내순위|"          //연체율
      +"개인 핵심고객|개인 핵심고객|기업 핵심고객|기업 핵심고객|복수거래 고객수|복수거래 고객수|"         //고객관계_개인/기업/복수거래 고객
      ;
	
	strHeader2 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"
      +"실적|평점/배점|그룹내순위|"                          //전략사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"              //비이자물량_외환사업
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"      //비이자물량_카드사업_카드매출액
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"      //비이자물량_카드사업_순증유효회원
      +"목표|실적|달성률|평점/배점|그룹내순위|"              //비이자물량_신탁사업(특정금전신탁)
      +"목표|실적|달성률|평점/배점|그룹내순위|"              //비이자물량_신탁사업(부동산신탁)
      +"목표|실적|달성률|평점/배점|그룹내순위|"              //비이자물량_공제사업(총납입공제료)
      +"목표|실적|달성률|목표|실적|달성률|평점/배점|그룹내순위|"  //비이자물량_공제사업(신규보장성_적립식공제료_적용평점)
      +"목표|실적|달성률|평점/배점|그룹내순위|"              //비이자물량_펀드사업(전략상품 수탁고)
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"      //예수금_총예수금(순증잔액)
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"      //예수금_총예수금(반기평잔)
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"      //예수금_총예수금(월중평잔)
      +"신규목표|신규실적|달성률|평점/배점|그룹내순위|"      //예수금_적립식예금(잔액)
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"      //예수금_중저원가성예금(평잔)
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"      //일반여신_순증잔액평가
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"      //해양수산여신_순증잔액평가
      +"신규목표|신규실적|달성률|평점/배점|그룹내순위|"      //소매여신_신규잔액평가
      +"총예수금|총여신|예대율|평점/배점|그룹내순위|"        //예대율
      +"총여신|연체액|연체율|평점/배점|그룹내순위|"          //연체율
      +"평점/배점|그룹내순위|평점/배점|그룹내순위|평점/배점|그룹내순위|"   //고객관계 개인/기업/복수거래
      ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
          
	// 총예수금(순증잔액) 평점/순위 없음
    mySheet.SetColHidden(54,1);
    mySheet.SetColHidden(55,1);
    // 총예수금(월중평잔) 하반기 필요함 상반기 숨김 -> 6월 및 12월 필요함
    // 2017.06.20 : 6월 및 12월에만 보여주기 (6월은 19일자 부터)
    if( (baseday >= '20170619' && baseday <= '20170630') ||
        (baseday >= '20171201' && baseday <= '20171231')  )
    {
        mySheet.SetColHidden(61,0);
        mySheet.SetColHidden(62,0);
        mySheet.SetColHidden(63,0);
        mySheet.SetColHidden(64,0);
        mySheet.SetColHidden(65,0);
    } else {
        mySheet.SetColHidden(61,1);
        mySheet.SetColHidden(62,1);
        mySheet.SetColHidden(63,1);
        mySheet.SetColHidden(64,1);
        mySheet.SetColHidden(65,1);
    }

   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,천미불,건,%";
   var strUnitText="백만원,천미불,건,%";
   showUnitText(strUnitText);
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*------------------------------------------*/
/* @기능 : 2016년도 하반기 기준 그리드 set  */
/*------------------------------------------*/
function setGrid2016Q3()
{
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";

	strHeader0 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                    //       5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 순수개인예금(잔액)   5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 순수개인예금(평잔)   5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 거치적립식예금(잔액) 5      
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 거치적립식예금(평잔) 5            
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 중저원가성예금(평잔) 5            
      +"대   출   금|대   출   금|대   출   금|대   출   금|대   출   금|"    //대출금_신규잔액   5
      +"소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|"         //소매여신_신규잔액 5
      +"연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|"              //연체율 5
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"        //개인핵심/기업핵심/복수거래고객 6
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //외환사업5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //카드사업_신용카드매출액5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //카드사업_체크카드매출액5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //카드사업_법인카드매출액5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                                   //카드사업_순증유효회원  3
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                                   //카드사업_신규유효회원  3      
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //신탁사업(특정금전신탁) 5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //신탁사업(부동산신탁)   5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //공제사업_총납입공제료  5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //공제사업_신규보장성/적립식공제료6
      +"비 이 자 물 량|비 이 자 물 량|"                                                  //공제사업(적용평점)2
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //펀드사업_전략상품수탁고5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //펀드사업_장기고객수5
      +"스마트금융|스마트금융|스마트금융|스마트금융|스마트금융|"                         //스마트금융 인터넷뱅킹  5
      +"스마트금융|스마트금융|스마트금융|스마트금융|스마트금융|"                         //스마트금융 스마트폰뱅킹5      
      +"스마트금융|스마트금융|스마트금융|스마트금융|스마트금융"                          //스마트금융 PUSH서비스  5      
      ;    
		
	strHeader1 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                    
      +"순수개인예금(잔액)|순수개인예금(잔액)|순수개인예금(잔액)|순수개인예금(잔액)|순수개인예금(잔액)|"                  //예수금_순수개인(잔액)
      +"순수개인예금(평잔)|순수개인예금(평잔)|순수개인예금(평잔)|순수개인예금(평잔)|순수개인예금(평잔)|"                  //예수금_순수개인(평잔)
      +"거치/적립식예금(잔액)|거치/적립식예금(잔액)|거치/적립식예금(잔액)|거치/적립식예금(잔액)|거치/적립식예금(잔액)|"   //예수금_거치적립식(잔액)
      +"거치/적립식예금(평잔)|거치/적립식예금(평잔)|거치/적립식예금(평잔)|거치/적립식예금(평잔)|거치/적립식예금(평잔)|"   //예수금_거치적립식(평잔)      
      +"중저원가성예금(평잔)|중저원가성예금(평잔)|중저원가성예금(평잔)|중저원가성예금(평잔)|중저원가성예금(평잔)|"        //예수금_중저원가성(평잔)
      +"신규잔액평가|신규잔액평가|신규잔액평가|신규잔액평가|신규잔액평가|"                                                //대출금_신규잔액평가      
      +"신규잔액평가 |신규잔액평가 |신규잔액평가 |신규잔액평가 |신규잔액평가 |"                                                //소매여신_신규잔액평가      
      +"총연체율|총연체율|총연체율|총연체율|총연체율|"                                                                    //연체율
      +"개인 핵심고객|개인 핵심고객|기업 핵심고객|기업 핵심고객|복수거래 고객수|복수거래 고객수|"                         //고객관계_개인/기업/복수거래 고객
      +"외환사업|외환사업|외환사업|외환사업|외환사업|"                                                   //비이자물량_외환사업        
      +"카드사업\n(신용카드 매출액)|카드사업\n(신용카드 매출액)|카드사업\n(신용카드 매출액)|카드사업\n(신용카드 매출액)|카드사업\n(신용카드 매출액)|"        //비이자물량_카드사업_신용카드매출액
      +"카드사업\n(체크카드 매출액)|카드사업\n(체크카드 매출액)|카드사업\n(체크카드 매출액)|카드사업\n(체크카드 매출액)|카드사업\n(체크카드 매출액)|"        //비이자물량_카드사업_체크카드매출액
      +"카드사업\n(법인카드 매출액)|카드사업\n(법인카드 매출액)|카드사업\n(법인카드 매출액)|카드사업\n(법인카드 매출액)|카드사업\n(법인카드 매출액)|"        //비이자물량_카드사업_법인카드매출액
      +"카드사업\n(순증 유효회원)|카드사업\n(순증 유효회원)|카드사업\n(순증 유효회원)|"                  //비이자물량_카드사업_순증유효회원
      +"카드사업\n(신규 유효회원)|카드사업\n(신규 유효회원)|카드사업\n(신규 유효회원)|"                  //비이자물량_카드사업_신규유효회원      
      +"신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|"  //비이자물량_신탁사업(특정금전신탁)
      +"신탁사업\n(부동산신탁)|신탁사업\n(부동산신탁)|신탁사업\n(부동산신탁)|신탁사업\n(부동산신탁)|신탁사업\n(부동산신탁)|"            //비이자물량_신탁사업(퇴직연금신탁)
      +"공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|"                      //비이자물량_공제사업(총납입공제료)
      +"공제사업\n(신규보장성)|공제사업\n(신규보장성)|공제사업\n(신규보장성)|공제사업\n(적립식공제료)|공제사업\n(적립식공제료)|공제사업\n(적립식공제료)|"   //비이자물량_공제사업(신규보장/적립식공제료)
      +"공제사업\n(적용평점)|공제사업\n(적용평점)|"                                                                                                         //비이자물량_공제사업
      +"펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|"       //비이자물량_펀드사업(전략상품 수탁고)
      +"펀드사업\n(장기고객수)|펀드사업\n(장기고객수)|펀드사업\n(장기고객수)|펀드사업\n(장기고객수)|펀드사업\n(장기고객수)|"                                //비이자물량_펀드사업(장기고객수
      +"인터넷뱅킹|인터넷뱅킹|인터넷뱅킹|인터넷뱅킹|인터넷뱅킹|"                  //스마트금융_인터넷뱅킹
      +"스마트폰뱅킹|스마트폰뱅킹|스마트폰뱅킹|스마트폰뱅킹|스마트폰뱅킹|"        //스마트금융_스마트폰뱅킹
      +"PUSH 서비스|PUSH 서비스|PUSH 서비스|PUSH 서비스|PUSH 서비스"             //스마트금융_PUSH서비스
      ;
	
	strHeader2 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //예수금_순수개인예금(잔액)       
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //예수금_순수개인예금(평잔)
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //예수금_거치적립식예금(잔액)
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //예수금_거치적립식예금(평잔)      
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //예수금_중저원가성예금(평잔)      
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //대출금_신규잔액평가
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //소매여신_신규잔액평가
      +"총여신|연체액|연체율|평점/배점|그룹내순위|"                    //연체율
      +"평점/배점|그룹내순위|평점/배점|그룹내순위|평점/배점|그룹내순위|"        //고객관계 개인/기업/복수거래
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_외환사업
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //비이자물량_카드사업_신용카드매출액
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //비이자물량_카드사업_체크카드매출액
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //비이자물량_카드사업_법인카드매출액
      +"달성률|평점/배점|그룹내순위|달성률|평점/배점|그룹내순위|"      //비이자물량_카드_순증유효회원_신규유효회원
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_신탁사업(특정금전신탁)
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_신탁사업(부동산신탁)
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_공제사업(총납입공제료)
      +"목표|실적|달성률|목표|실적|달성률|평점/배점|그룹내순위|"       //비이자물량_공제사업(신규보장성_적립식공제료_적용평점)
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_펀드사업(전략상품 수탁고)
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_펀드사업(장기고객수)
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //스마트금융_인터넷뱅킹
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //스마트금융_스마트폰뱅킹
      +"목표|실적|달성률|평점/배점|그룹내순위"                         //스마트금융_PUSH서비스
      ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,천미불,건,%";
   var strUnitText="백만원,천미불,건,%";
   showUnitText(strUnitText);
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*------------------------------------------*/
/* @기능 : 2012년도 상반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2012Q2()
{
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";

	strHeader0 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"
      +"개인고객 예수금|개인고객 예수금|개인고객 예수금|개인고객 예수금|개인고객 예수금|개인고객 예수금|개인고객 예수금|개인고객 예수금|개인고객 예수금|개인고객 예수금|개인고객 예수금|개인고객 예수금|"
      +"기업고객 예수금|기업고객 예수금|기업고객 예수금|기업고객 예수금|기업고객 예수금|기업고객 예수금|기업고객 예수금|기업고객 예수금|기업고객 예수금|기업고객 예수금|기업고객 예수금|기업고객 예수금|"
      +"대출금(통합)|대출금(통합)|대출금(통합)|대출금(통합)|대출금(통합)|대출금(통합)|대출금(통합)|대출금(통합)|대출금(통합)|대출금(통합)|"
      +"개인고객 대출금(G2, 특성화)|개인고객 대출금(G2, 특성화)|개인고객 대출금(G2, 특성화)|개인고객 대출금(G2, 특성화)|개인고객 대출금(G2, 특성화)|개인고객 대출금(G2, 특성화)|개인고객 대출금(G2, 특성화)|개인고객 대출금(G2, 특성화)|개인고객 대출금(G2, 특성화)|개인고객 대출금(G2, 특성화)|"
      +"기업고객 대출금(G2, 특성화)|기업고객 대출금(G2, 특성화)|기업고객 대출금(G2, 특성화)|기업고객 대출금(G2, 특성화)|기업고객 대출금(G2, 특성화)|기업고객 대출금(G2, 특성화)|기업고객 대출금(G2, 특성화)|기업고객 대출금(G2, 특성화)|기업고객 대출금(G2, 특성화)|기업고객 대출금(G2, 특성화)|"
      +"연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|"
      +"신규발생고정이하비율|신규발생고정이하비율|신규발생고정이하비율|신규발생고정이하비율|신규발생고정이하비율|외환취급액|외환취급액|외환취급액|외환취급액|외환취급액|"
      +"카 드 매 출 액|카 드 매 출 액|카 드 매 출 액|카 드 매 출 액|카 드 매 출 액|카 드 매 출 액|카 드 매 출 액|카 드 매 출 액|카 드 매 출 액|카 드 매 출 액|"
      +"퇴 직 연 금|퇴 직 연 금|퇴 직 연 금|퇴 직 연 금|퇴 직 연 금|"
      ;    
		
	strHeader1 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"
      +"잔    액|잔    액|잔    액|잔    액|잔    액|잔    액|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|"
      +"잔    액|잔    액|잔    액|잔    액|잔    액|잔    액|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|"
      +"잔    액|잔    액|잔    액|잔    액|잔    액|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|"
      +"잔    액|잔    액|잔    액|잔    액|잔    액|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|"
      +"잔    액|잔    액|잔    액|잔    액|잔    액|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|"
      +"대출연체율|대출연체율|대출연체율|대출연체율|대출연체율|카드연체율|카드연체율|카드연체율|카드연체율|카드연체율|"
      +"대출금액|신규고정이하금액|신규고정이하비율|평점/배점|그룹내순위|목표|실적|달성률|평점/배점|그룹내순위|"
      +"신용카드|신용카드|신용카드|신용카드|신용카드|구매카드|구매카드|구매카드|구매카드|구매카드|"
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"
      ;
	
	strHeader2 =  
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"
      +"순증목표|(교차인정미적용실적)|순증실적|달성률|평점/배점|그룹내순위|순증목표|(교차인정미적용실적)|순증실적|달성률|평점/배점|그룹내순위|"
      +"순증목표|(교차인정미적용실적)|순증실적|달성률|평점/배점|그룹내순위|순증목표|(교차인정미적용실적)|순증실적|달성률|평점/배점|그룹내순위|"
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|순증목표|순증실적|달성률|평점/배점|그룹내순위|"
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|순증목표|순증실적|달성률|평점/배점|그룹내순위|"
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|순증목표|순증실적|달성률|평점/배점|그룹내순위|"
      +"대출금액|연체액|연체율|평점/배점|그룹내순위|카드금액|연체액|연체율|평점/배점|그룹내순위|"
      +"대출금액|신규고정이하금액|신규고정이하비율|평점/배점|그룹내순위|목표|실적|달성률|평점/배점|그룹내순위|"
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|순증목표|순증실적|달성률|평점/배점|그룹내순위|"
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"
      ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:130,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:130,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:130,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:130,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,천미불,건,%";
   var strUnitText="백만원,천미불,건,%";
   showUnitText(strUnitText);
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*------------------------------------------*/
/* @기능 : 2012년도 하반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2012Q4()
{
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";

	strHeader0 =  
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"
      +"개인고객 예수금|개인고객 예수금|개인고객 예수금|개인고객 예수금|개인고객 예수금|개인고객 예수금|개인고객 예수금|개인고객 예수금|개인고객 예수금|개인고객 예수금|개인고객 예수금|개인고객 예수금|"
      +"기업고객 예수금|기업고객 예수금|기업고객 예수금|기업고객 예수금|기업고객 예수금|기업고객 예수금|기업고객 예수금|기업고객 예수금|기업고객 예수금|기업고객 예수금|기업고객 예수금|기업고객 예수금|"
      +"대출금(통합)|대출금(통합)|대출금(통합)|대출금(통합)|대출금(통합)|대출금(통합)|대출금(통합)|대출금(통합)|대출금(통합)|대출금(통합)|"
      +"개인고객 대출금(G2, 특성화)|개인고객 대출금(G2, 특성화)|개인고객 대출금(G2, 특성화)|개인고객 대출금(G2, 특성화)|개인고객 대출금(G2, 특성화)|개인고객 대출금(G2, 특성화)|개인고객 대출금(G2, 특성화)|개인고객 대출금(G2, 특성화)|개인고객 대출금(G2, 특성화)|개인고객 대출금(G2, 특성화)|"
      +"기업고객 대출금(G2, 특성화)|기업고객 대출금(G2, 특성화)|기업고객 대출금(G2, 특성화)|기업고객 대출금(G2, 특성화)|기업고객 대출금(G2, 특성화)|기업고객 대출금(G2, 특성화)|기업고객 대출금(G2, 특성화)|기업고객 대출금(G2, 특성화)|기업고객 대출금(G2, 특성화)|기업고객 대출금(G2, 특성화)|"
      +"연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|"
      +"신규발생고정이하비율|신규발생고정이하비율|신규발생고정이하비율|신규발생고정이하비율|신규발생고정이하비율|신규발생고정이하비율|신규발생고정이하비율|외환취급액|외환취급액|외환취급액|외환취급액|외환취급액|"
      +"카 드 매 출 액|카 드 매 출 액|카 드 매 출 액|카 드 매 출 액|카 드 매 출 액|카 드 매 출 액|카 드 매 출 액|카 드 매 출 액|카 드 매 출 액|카 드 매 출 액|"
      +"퇴 직 연 금|퇴 직 연 금|퇴 직 연 금|퇴 직 연 금|퇴 직 연 금|"
      ;    
		
	strHeader1 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"
      +"분 기 평 잔|분 기 평 잔|분 기 평 잔|분 기 평 잔|분 기 평 잔|분 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|"
      +"분 기 평 잔|분 기 평 잔|분 기 평 잔|분 기 평 잔|분 기 평 잔|분 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|"
      +"잔    액|잔    액|잔    액|잔    액|잔    액|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|"
      +"잔    액|잔    액|잔    액|잔    액|잔    액|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|"
      +"잔    액|잔    액|잔    액|잔    액|잔    액|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|반 기 평 잔|"
      +"대출연체율|대출연체율|대출연체율|대출연체율|대출연체율|대출연체율|대출연체율|카드연체율|카드연체율|카드연체율|카드연체율|카드연체율|카드연체율|카드연체율|"
      +"대출금액|하반기신규고정이하금액|상반기신규고정이하금액|하반기신규고정이하비율|상반기신규고정이하비율|평점/배점|그룹내순위|목표|실적|달성률|평점/배점|그룹내순위|"
      +"신용카드|신용카드|신용카드|신용카드|신용카드|구매카드|구매카드|구매카드|구매카드|구매카드|"
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"
      ;
	
	strHeader2 =  
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"
      +"순증목표|(교차인정미적용실적)|순증실적|달성률|평점/배점|그룹내순위|순증목표|(교차인정미적용실적)|순증실적|달성률|평점/배점|그룹내순위|"
      +"순증목표|(교차인정미적용실적)|순증실적|달성률|평점/배점|그룹내순위|순증목표|(교차인정미적용실적)|순증실적|달성률|평점/배점|그룹내순위|"
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|순증목표|순증실적|달성률|평점/배점|그룹내순위|"
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|순증목표|순증실적|달성률|평점/배점|그룹내순위|"
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|순증목표|순증실적|달성률|평점/배점|그룹내순위|"
      +"대출금액|하반기연체액|상반기연체액|하반기연체율|상반기연체율|평점/배점|그룹내순위|카드금액|하반기연체액|상반기연체액|하반기연체율|상반기연체율|평점/배점|그룹내순위|"
      +"대출금액|하반기신규고정이하금액|상반기신규고정이하금액|하반기신규고정이하비율|상반기신규고정이하비율|평점/배점|그룹내순위|목표|실적|달성률|평점/배점|그룹내순위|"
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|순증목표|순증실적|달성률|평점/배점|그룹내순위|"
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"
      ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:130,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:130,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:130,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:130,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:150,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:150,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:150,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:150,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,천미불,건,%";
   var strUnitText="백만원,천미불,건,%";
   showUnitText(strUnitText);
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*------------------------------------------*/
/* @기능 : 2013년도 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2013()
{
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";

	strHeader0 =  
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"
      +"대   출   금|대   출   금|대   출   금|대   출   금|대   출   금|대   출   금|대   출   금|대   출   금|대   출   금|대   출   금|"
      +"연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|"
      ;    
		
	strHeader1 =  
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"
      +"순 증 평 잔|순 증 평 잔|순 증 평 잔|평점/배점|그룹내순위|"
      +"잔    액|잔    액|잔    액|잔    액|잔    액|순 증 평 잔|순 증 평 잔|순 증 평 잔|순 증 평 잔|순 증 평 잔|"
      +"총연체율|총연체율|총연체율|평점/배점|그룹내순위|"
      ;
	
	strHeader2 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|순증목표|순증실적|달성률|평점/배점|그룹내순위|"
      +"총여신|연체액|연체율|평점/배점|그룹내순위|"
      ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,천미불,건,%";
   var strUnitText="백만원,천미불,건,%";
   showUnitText(strUnitText);
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*------------------------------------------*/
/* @기능 : 2014년도 기준 그리드 set         */
/*------------------------------------------*/        
function setGrid2014()
{
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";

	strHeader0 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                    //  5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 5
      +"대   출   금|대   출   금|대   출   금|대   출   금|대   출   금|"    //대출금_잔액 5
      +"대   출   금|대   출   금|대   출   금|대   출   금|대   출   금|"    //대출금_순증평잔 5
      +"소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|"         //소매여신5
      +"연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|"              //연체율 5
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"      //개인유효고객4
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"      //기업유효고객4
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"      //신규고객4
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"      //복수거래상품수4
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //외환사업5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //카드사업5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //신탁사업(특정금전신탁)5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //신탁사업(퇴직연금신탁)5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //공제사업5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //펀드사업5
      +"전자금융|전자금융|전자금융|전자금융|전자금융|"    //전자금융 5
      ;    
		
	strHeader1 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                    
      +"순 증 평 잔|순 증 평 잔|순 증 평 잔|평점/배점|그룹내순위|"                        //예수금
      +"잔    액|잔    액|잔    액|잔    액|잔    액|"                                    //대출금_잔액 
      +"순 증 평 잔|순 증 평 잔|순 증 평 잔|순 증 평 잔|순 증 평 잔|"                     //대출금_순증평잔
      +"잔    액|잔    액|잔    액|잔    액|잔    액|"                                    //소매여신
      +"총연체율|총연체율|총연체율|총연체율|총연체율|"                                 //연체율
      +"개인유효고객|개인유효고객|개인유효고객|개인유효고객|"                //고객관계_개인유효고객
      +"기업유효고객|기업유효고객|기업유효고객|기업유효고객|"                //고객관계_기업유효고객
      +"신 규 고 객|신 규 고 객|신 규 고 객|신 규 고 객|"                    //고객관계_신규고객
      +"복수거래상품수|복수거래상품수|복수거래상품수|복수거래상품수|"      //고객관계_복수거래상품수
      +"외환사업|외환사업|외환사업|외환사업|외환사업|"                            //비이자물량_외환사업        
      +"카드사업|카드사업|카드사업|카드사업|카드사업|"                            //비이자물량_카드사업
      +"신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|"  //비이자물량_신탁사업(특정금전신탁)
      +"신탁사업\n(퇴직연금신탁)|신탁사업\n(퇴직연금신탁)|신탁사업\n(퇴직연금신탁)|신탁사업\n(퇴직연금신탁)|신탁사업\n(퇴직연금신탁)|"  //비이자물량_신탁사업(퇴직연금신탁)
      +"공제사업|공제사업|공제사업|공제사업|공제사업|"                            //비이자물량_공제사업
      +"펀드사업|펀드사업|펀드사업|펀드사업|펀드사업|"                            //비이자물량_펀드사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"              //전자금융
      ;
	
	strHeader2 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //예수금
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //대출금_잔액
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //대출금_순증평잔
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //소매여신
      +"총여신|연체액|연체율|평점/배점|그룹내순위|"                    //연체율
      +"목표|실적|평점/배점|그룹내순위|"                        //고객관계_개인유효고객
      +"목표|실적|평점/배점|그룹내순위|"                        //고객관계_기업유효고객
      +"목표|실적|평점/배점|그룹내순위|"                        //고객관계_신규고객
      +"목표|실적|평점/배점|그룹내순위|"                        //고객관계_복수거래상품수
      +"목표|실적|달성률|평점/배점|그룹내순위|"             //비이자물량_외환사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"             //비이자물량_카드사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"             //비이자물량_신탁사업(특정금전신탁)
      +"목표|실적|달성률|평점/배점|그룹내순위|"             //비이자물량_신탁사업(퇴직연금신탁)
      +"목표|실적|달성률|평점/배점|그룹내순위|"             //비이자물량_공제사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"             //비이자물량_펀드사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"              //전자금융
      ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,천미불,건,%";
   var strUnitText="백만원,천미불,건,%";
   showUnitText(strUnitText);
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*------------------------------------------*/
/* @기능 : 2014년도 하반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2014Q3()
{
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";

	strHeader0 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                    //  5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 5
      +"대   출   금|대   출   금|대   출   금|대   출   금|대   출   금|"    //대출금_잔액 5
      +"대   출   금|대   출   금|대   출   금|대   출   금|대   출   금|"    //대출금_순증평잔 5
      +"소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|"         //소매여신5
      +"소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|"         //소매여신5
      +"연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|"              //연체율 5
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"      //개인/기업유효고객 4
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"      //신규고객,개인핵심고객 4
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"      //기업핵심고객, CRM활동 4
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //외환사업5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //카드사업5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //신탁사업(특정금전신탁)5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //신탁사업(퇴직연금신탁)5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //공제사업5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //펀드사업5
      +"전자금융|전자금융|전자금융|전자금융|전자금융|"    //전자금융 5
      ;    
		
	strHeader1 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                    
      +"거치/적립식예금(평잔)|거치/적립식예금(평잔)|거치/적립식예금(평잔)|거치/적립식예금(평잔)|거치/적립식예금(평잔)|" //예수금
      +"중저원가성예금(평잔)|중저원가성예금(평잔)|중저원가성예금(평잔)|중저원가성예금(평잔)|중저원가성예금(평잔)|" //예수금
      +"잔    액|잔    액|잔    액|잔    액|잔    액|"                                    //대출금_잔액 
      +"순 증 평 잔|순 증 평 잔|순 증 평 잔|순 증 평 잔|순 증 평 잔|"                     //대출금_순증평잔
      +"순 증 잔 액|순 증 잔 액|순 증 잔 액|순 증 잔 액|순 증 잔 액|"                     //소매여신
      +"신 규 잔 액|신 규 잔 액|신 규 잔 액|신 규 잔 액|신 규 잔 액|"                     //소매여신
      +"총연체율|총연체율|총연체율|평점/배점|그룹내순위|"                                 //연체율
      +"개인유효고객|개인유효고객|기업유효고객|기업유효고객|"                             //고객관계_개인/기업유효고객
      +"신 규 고 객|신 규 고 객|개인핵심고객|개인핵심고객|"                               //고객관계_신규고객, 개인핵심
      +"기업핵심고객|기업핵심고객|CRM 활동|CRM 활동|"                                     //고객관계_기업핵심, CRM활동
      +"외환사업|외환사업|외환사업|외환사업|외환사업|"                            //비이자물량_외환사업        
      +"카드사업|카드사업|카드사업|카드사업|카드사업|"                            //비이자물량_카드사업
      +"신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|"  //비이자물량_신탁사업(특정금전신탁)
      +"신탁사업\n(퇴직연금신탁)|신탁사업\n(퇴직연금신탁)|신탁사업\n(퇴직연금신탁)|신탁사업\n(퇴직연금신탁)|신탁사업\n(퇴직연금신탁)|"  //비이자물량_신탁사업(퇴직연금신탁)
      +"공제사업|공제사업|공제사업|공제사업|공제사업|"                            //비이자물량_공제사업
      +"펀드사업|펀드사업|펀드사업|펀드사업|펀드사업|"                            //비이자물량_펀드사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"              //전자금융
      ;
	
	strHeader2 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //예수금
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //예수금
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //대출금_잔액
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //대출금_순증평잔
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //소매여신
      +"신규목표|신규실적|달성률|평점/배점|그룹내순위|"                //소매여신
      +"총여신|연체액|연체율|평점/배점|그룹내순위|"                    //연체율
      +"평점/배점|그룹내순위|평점/배점|그룹내순위|"                    //고객관계_개인/기업유효고객
      +"평점/배점|그룹내순위|평점/배점|그룹내순위|"                    //고객관계_신규고객, 개인핵심
      +"평점/배점|그룹내순위|평점/배점|그룹내순위|"                    //고객관계_기업핵심, CRM활동
      +"목표|실적|달성률|평점/배점|그룹내순위|"             //비이자물량_외환사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"             //비이자물량_카드사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"             //비이자물량_신탁사업(특정금전신탁)
      +"목표|실적|달성률|평점/배점|그룹내순위|"             //비이자물량_신탁사업(퇴직연금신탁)
      +"목표|실적|달성률|평점/배점|그룹내순위|"             //비이자물량_공제사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"             //비이자물량_펀드사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"              //전자금융
      ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,천미불,건,%";
   var strUnitText="백만원,천미불,건,%";
   showUnitText(strUnitText);
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*-----------------------------------*/
/* @기능 : 2015년도 기준 그리드 set  */
/*-----------------------------------*/        
function setGrid2015()
{
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";

	strHeader0 =  
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                    //  5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 5      
      +"대   출   금|대   출   금|대   출   금|대   출   금|대   출   금|"    //대출금_잔액 5
      +"대   출   금|대   출   금|대   출   금|대   출   금|대   출   금|"    //대출금_순증평잔 5
      +"소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|"         //소매여신5
      +"소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|"         //소매여신5
      +"연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|"              //연체율 5
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"      //개인/기업유효고객 4
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"      //신규고객,개인핵심고객 4
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //외환사업5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //카드사업5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //신탁사업(특정금전신탁)5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //신탁사업(퇴직연금신탁)5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //공제사업5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //공제사업6
      +"비 이 자 물 량|비 이 자 물 량|"                                                                 //공제사업(적용평점)2
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //펀드사업5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //펀드사업5
      +"전자금융|전자금융|전자금융|전자금융|전자금융|"    //전자금융 5
      +"전자금융|전자금융|전자금융|전자금융|전자금융|"    //전자금융 5      
      ;    
		
	strHeader1 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                    
      +"개인 거치/적립식예금(평잔)|개인 거치/적립식예금(평잔)|개인 거치/적립식예금(평잔)|개인 거치/적립식예금(평잔)|개인 거치/적립식예금(평잔)|" //예수금
      +"기업 거치/적립식예금(평잔)|기업 거치/적립식예금(평잔)|기업 거치/적립식예금(평잔)|기업 거치/적립식예금(평잔)|기업 거치/적립식예금(평잔)|" //예수금      
      +"중저원가성예금(평잔)|중저원가성예금(평잔)|중저원가성예금(평잔)|중저원가성예금(평잔)|중저원가성예금(평잔)|" //예수금
      +"잔    액|잔    액|잔    액|잔    액|잔    액|"                                    //대출금_잔액 
      +"순 증 평 잔|순 증 평 잔|순 증 평 잔|순 증 평 잔|순 증 평 잔|"                     //대출금_순증평잔
      +"순 증 잔 액|순 증 잔 액|순 증 잔 액|순 증 잔 액|순 증 잔 액|"                     //소매여신
      +"신 규 잔 액|신 규 잔 액|신 규 잔 액|신 규 잔 액|신 규 잔 액|"                     //소매여신
      +"총연체율|총연체율|총연체율|평점/배점|그룹내순위|"                                 //연체율
      +"개인 핵심고객|개인 핵심고객|기업 핵심고객|기업 핵심고객|"                         //고객관계_개인/기업핵심고객
      +"신 규 고 객|신 규 고 객|고객가치증대|고객가치증대|"                               //고객관계_신규고객, 고객가치증대
      +"외환사업|외환사업|외환사업|외환사업|외환사업|"                            //비이자물량_외환사업        
      +"카드사업|카드사업|카드사업|카드사업|카드사업|"                            //비이자물량_카드사업
      +"신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|"  //비이자물량_신탁사업(특정금전신탁)
      +"신탁사업\n(퇴직연금신탁)|신탁사업\n(퇴직연금신탁)|신탁사업\n(퇴직연금신탁)|신탁사업\n(퇴직연금신탁)|신탁사업\n(퇴직연금신탁)|"  //비이자물량_신탁사업(퇴직연금신탁)
      +"공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|"                      //비이자물량_공제사업
      +"공제사업\n(신규보장성)|공제사업\n(신규보장성)|공제사업\n(신규보장성)|공제사업\n(적립식공제료)|공제사업\n(적립식공제료)|공제사업\n(적립식공제료)|"   //비이자물량_공제사업
      +"공제사업\n(적용평점)|공제사업\n(적용평점)|"                                                                                                         //비이자물량_공제사업
      +"펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|"       //비이자물량_펀드사업
      +"펀드사업\n(장기고객수)|펀드사업\n(장기고객수)|펀드사업\n(장기고객수)|펀드사업\n(장기고객수)|펀드사업\n(장기고객수)|"                                //비이자물량_펀드사업
      +"인터넷뱅킹|인터넷뱅킹|인터넷뱅킹|인터넷뱅킹|인터넷뱅킹|"                  //전자금융
      +"스마트폰뱅킹|스마트폰뱅킹|스마트폰뱅킹|스마트폰뱅킹|스마트폰뱅킹|"        //전자금융      
      ;
	
	strHeader2 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //예수금       
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //예수금
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //예수금
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //대출금_잔액
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //대출금_순증평잔
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //소매여신
      +"신규목표|신규실적|달성률|평점/배점|그룹내순위|"                //소매여신
      +"총여신|연체액|연체율|평점/배점|그룹내순위|"                    //연체율
      +"평점/배점|그룹내순위|평점/배점|그룹내순위|"                    //고객관계_개인/기업핵심고객
      +"평점/배점|그룹내순위|평점/배점|그룹내순위|"                    //고객관계_신규고객, 고객가치증대
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_외환사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_카드사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_신탁사업(특정금전신탁)
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_신탁사업(퇴직연금신탁)
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_공제사업
      +"목표|실적|달성률|목표|실적|달성률|평점/배점|그룹내순위|"       //비이자물량_공제사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_펀드사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_펀드사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //전자금융
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //전자금융
      ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,천미불,건,%";
   var strUnitText="백만원,천미불,건,%";
   showUnitText(strUnitText);
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*------------------------------------------*/
/* @기능 : 2015년도 하반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2015Q3()
{
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";

	strHeader0 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                    //  5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 5      
      +"대   출   금|대   출   금|대   출   금|대   출   금|대   출   금|"    //대출금_잔액 5
      +"대   출   금|대   출   금|대   출   금|대   출   금|대   출   금|"    //대출금_순증평잔 5
      +"소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|"         //소매여신5
      +"소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|"         //소매여신5
      +"연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|"              //연체율 5
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"      //개인/기업유효고객 4
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"      //신규고객,개인핵심고객 4
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //외환사업5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //카드사업5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //카드사업5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //신탁사업(특정금전신탁)5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //신탁사업(퇴직연금신탁)5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //공제사업5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //공제사업6
      +"비 이 자 물 량|비 이 자 물 량|"                                                                 //공제사업(적용평점)2
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //펀드사업5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //펀드사업5
      +"전자금융|전자금융|전자금융|전자금융|전자금융|"    //전자금융 5
      +"전자금융|전자금융|전자금융|전자금융|전자금융|"    //전자금융 5      
      ;    
		
	strHeader1 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                    
      +"개인 거치/적립식예금(평잔)|개인 거치/적립식예금(평잔)|개인 거치/적립식예금(평잔)|개인 거치/적립식예금(평잔)|개인 거치/적립식예금(평잔)|" //예수금
      +"기업 거치/적립식예금(평잔)|기업 거치/적립식예금(평잔)|기업 거치/적립식예금(평잔)|기업 거치/적립식예금(평잔)|기업 거치/적립식예금(평잔)|" //예수금      
      +"중저원가성예금(평잔)|중저원가성예금(평잔)|중저원가성예금(평잔)|중저원가성예금(평잔)|중저원가성예금(평잔)|" //예수금
      +"잔    액|잔    액|잔    액|잔    액|잔    액|"                                    //대출금_잔액 
      +"순 증 평 잔|순 증 평 잔|순 증 평 잔|순 증 평 잔|순 증 평 잔|"                     //대출금_순증평잔
      +"순 증 잔 액|순 증 잔 액|순 증 잔 액|순 증 잔 액|순 증 잔 액|"                     //소매여신
      +"신 규 잔 액|신 규 잔 액|신 규 잔 액|신 규 잔 액|신 규 잔 액|"                     //소매여신
      +"총연체율|총연체율|총연체율|평점/배점|그룹내순위|"                                 //연체율
      +"개인 핵심고객|개인 핵심고객|기업 핵심고객|기업 핵심고객|"                         //고객관계_개인/기업핵심고객
      +"신 규 고 객|신 규 고 객|고객가치증대|고객가치증대|"                               //고객관계_신규고객, 고객가치증대
      +"외환사업|외환사업|외환사업|외환사업|외환사업|"                            //비이자물량_외환사업        
      +"카드사업(유효회원수)|카드사업(유효회원수)|카드사업(유효회원수)|카드사업(유효회원수)|카드사업(유효회원수)|"        //비이자물량_카드사업
      +"카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|"                            //비이자물량_카드사업
      +"신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|"  //비이자물량_신탁사업(특정금전신탁)
      +"신탁사업\n(퇴직연금신탁)|신탁사업\n(퇴직연금신탁)|신탁사업\n(퇴직연금신탁)|신탁사업\n(퇴직연금신탁)|신탁사업\n(퇴직연금신탁)|"  //비이자물량_신탁사업(퇴직연금신탁)
      +"공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|"                      //비이자물량_공제사업
      +"공제사업\n(신규보장성)|공제사업\n(신규보장성)|공제사업\n(신규보장성)|공제사업\n(적립식공제료)|공제사업\n(적립식공제료)|공제사업\n(적립식공제료)|"   //비이자물량_공제사업
      +"공제사업\n(적용평점)|공제사업\n(적용평점)|"                                                                                                         //비이자물량_공제사업
      +"펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|"       //비이자물량_펀드사업
      +"펀드사업\n(장기고객수)|펀드사업\n(장기고객수)|펀드사업\n(장기고객수)|펀드사업\n(장기고객수)|펀드사업\n(장기고객수)|"                                //비이자물량_펀드사업
      +"ShCashPlus|ShCashPlus|ShCashPlus|ShCashPlus|ShCashPlus|"                  //전자금융
      +"스마트폰뱅킹|스마트폰뱅킹|스마트폰뱅킹|스마트폰뱅킹|스마트폰뱅킹|"        //전자금융      
      ;
	
	strHeader2 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //예수금       
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //예수금
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //예수금
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //대출금_잔액
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //대출금_순증평잔
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //소매여신
      +"신규목표|신규실적|달성률|평점/배점|그룹내순위|"                //소매여신
      +"총여신|연체액|연체율|평점/배점|그룹내순위|"                    //연체율
      +"평점/배점|그룹내순위|평점/배점|그룹내순위|"                    //고객관계_개인/기업핵심고객
      +"평점/배점|그룹내순위|평점/배점|그룹내순위|"                    //고객관계_신규고객, 고객가치증대
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_외환사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_카드사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_카드사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_신탁사업(특정금전신탁)
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_신탁사업(퇴직연금신탁)
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_공제사업
      +"목표|실적|달성률|목표|실적|달성률|평점/배점|그룹내순위|"       //비이자물량_공제사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_펀드사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_펀드사업
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //전자금융
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //전자금융
      ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,천미불,건,%";
   var strUnitText="백만원,천미불,건,%";
   showUnitText(strUnitText);
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*------------------------------------------*/
/* @기능 : 2016년도        기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2016()
{
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";

	strHeader0 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                    //       5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 순수개인예금(잔액)   5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 순수개인예금(평잔)   5
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 거치적립식예금(잔액) 5      
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 거치적립식예금(평잔) 5            
      +"예   수   금|예   수   금|예   수   금|예   수   금|예   수   금|"    //예수금 중저원가성예금(평잔) 5            
      +"대   출   금|대   출   금|대   출   금|대   출   금|대   출   금|"    //대출금_순증잔액   5
      +"대   출   금|대   출   금|대   출   금|대   출   금|대   출   금|"    //대출금_신규잔액   5
      +"소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|"         //소매여신_순증잔액 5
      +"소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|소 매 여 신|"         //소매여신_신규잔액 5
      +"연  체  율|연  체  율|연  체  율|연  체  율|연  체  율|"              //연체율 5
      +"고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|고 객 관 계|"      //개인핵심/기업핵심/복수거래고객 6
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //외환사업5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //카드사업_신용카드매출액5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //카드사업_체크카드매출액5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                                   //카드사업_순증유효회원  3
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                                   //카드사업_신규유효회원  3      
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //신탁사업(특정금전신탁) 5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //신탁사업(부동산신탁)   5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //공제사업_총납입공제료  5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"     //공제사업_신규보장성/적립식공제료6
      +"비 이 자 물 량|비 이 자 물 량|"                                                                 //공제사업(적용평점)2
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //펀드사업_전략상품수탁고5
      +"비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|비 이 자 물 량|"                    //펀드사업_장기고객수5
      +"스마트금융|스마트금융|스마트금융|스마트금융|스마트금융|"                             //스마트금융 인터넷뱅킹  5
      +"스마트금융|스마트금융|스마트금융|스마트금융|스마트금융|"                             //스마트금융 스마트폰뱅킹5      
      +"스마트금융|스마트금융|스마트금융|스마트금융|스마트금융"                             //스마트금융 PUSH서비스  5      
      ;    
		
	strHeader1 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"                    
      +"순수개인예금(잔액)|순수개인예금(잔액)|순수개인예금(잔액)|순수개인예금(잔액)|순수개인예금(잔액)|"                  //예수금_순수개인(잔액)
      +"순수개인예금(평잔)|순수개인예금(평잔)|순수개인예금(평잔)|순수개인예금(평잔)|순수개인예금(평잔)|"                  //예수금_순수개인(평잔)
      +"거치/적립식예금(잔액)|거치/적립식예금(잔액)|거치/적립식예금(잔액)|거치/적립식예금(잔액)|거치/적립식예금(잔액)|"   //예수금_거치적립식(잔액)
      +"거치/적립식예금(평잔)|거치/적립식예금(평잔)|거치/적립식예금(평잔)|거치/적립식예금(평잔)|거치/적립식예금(평잔)|"   //예수금_거치적립식(평잔)      
      +"중저원가성예금(평잔)|중저원가성예금(평잔)|중저원가성예금(평잔)|중저원가성예금(평잔)|중저원가성예금(평잔)|"        //예수금_중저원가성(평잔)
      +"순증잔액평가|순증잔액평가|순증잔액평가|순증잔액평가|순증잔액평가|"                                                //대출금_순증잔액평가
      +"신규잔액평가|신규잔액평가|신규잔액평가|신규잔액평가|신규잔액평가|"                                                //대출금_신규잔액평가      
      +"순증잔액평가|순증잔액평가|순증잔액평가|순증잔액평가|순증잔액평가|"                                                //소매여신_순증잔액평가
      +"신규잔액평가|신규잔액평가|신규잔액평가|신규잔액평가|신규잔액평가|"                                                //소매여신_신규잔액평가      
      +"총연체율|총연체율|총연체율|총연체율|총연체율|"                                                                    //연체율
      +"개인 핵심고객|개인 핵심고객|기업 핵심고객|기업 핵심고객|복수거래 고객수|복수거래 고객수|"                         //고객관계_개인/기업/복수거래 고객
      +"외환사업|외환사업|외환사업|외환사업|외환사업|"                                                         //비이자물량_외환사업        
      +"카드사업\n(신용카드 매출액)|카드사업\n(신용카드 매출액)|카드사업\n(신용카드 매출액)|카드사업\n(신용카드 매출액)|카드사업\n(신용카드 매출액)|"        //비이자물량_카드사업_신용카드매출액
      +"카드사업\n(체크카드 매출액)|카드사업\n(체크카드 매출액)|카드사업\n(체크카드 매출액)|카드사업\n(체크카드 매출액)|카드사업\n(체크카드 매출액)|"        //비이자물량_카드사업_체크카드매출액
      +"카드사업\n(순증 유효회원)|카드사업\n(순증 유효회원)|카드사업\n(순증 유효회원)|"                  //비이자물량_카드사업_순증유효회원
      +"카드사업\n(신규 유효회원)|카드사업\n(신규 유효회원)|카드사업\n(신규 유효회원)|"                  //비이자물량_카드사업_신규유효회원      
      +"신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|신탁사업\n(특정금전신탁)|"  //비이자물량_신탁사업(특정금전신탁)
      +"신탁사업\n(부동산신탁)|신탁사업\n(부동산신탁)|신탁사업\n(부동산신탁)|신탁사업\n(부동산신탁)|신탁사업\n(부동산신탁)|"            //비이자물량_신탁사업(퇴직연금신탁)
      +"공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|공제사업\n(총납입공제료)|"                      //비이자물량_공제사업(총납입공제료)
      +"공제사업\n(신규보장성)|공제사업\n(신규보장성)|공제사업\n(신규보장성)|공제사업\n(적립식공제료)|공제사업\n(적립식공제료)|공제사업\n(적립식공제료)|"   //비이자물량_공제사업(신규보장/적립식공제료)
      +"공제사업\n(적용평점)|공제사업\n(적용평점)|"                                                                                                         //비이자물량_공제사업
      +"펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|펀드사업\n(전략상품 수탁고)|"       //비이자물량_펀드사업(전략상품 수탁고)
      +"펀드사업\n(장기고객수)|펀드사업\n(장기고객수)|펀드사업\n(장기고객수)|펀드사업\n(장기고객수)|펀드사업\n(장기고객수)|"                                //비이자물량_펀드사업(장기고객수
      +"인터넷뱅킹|인터넷뱅킹|인터넷뱅킹|인터넷뱅킹|인터넷뱅킹|"                  //스마트금융_인터넷뱅킹
      +"스마트폰뱅킹|스마트폰뱅킹|스마트폰뱅킹|스마트폰뱅킹|스마트폰뱅킹|"        //스마트금융_스마트폰뱅킹
      +"PUSH 서비스|PUSH 서비스|PUSH 서비스|PUSH 서비스|PUSH 서비스"             //스마트금융_PUSH서비스
      ;
	
	strHeader2 = 
       "점번호|점명|PG명|일일성과\n평점합계|그룹내\n순위|"
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //예수금_순수개인예금(잔액)       
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //예수금_순수개인예금(평잔)
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //예수금_거치적립식예금(잔액)
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //예수금_거치적립식예금(평잔)      
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //예수금_중저원가성예금(평잔)      
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //대출금_순증잔액평가
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //대출금_신규잔액평가
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //소매여신_순증잔액평가
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                //소매여신_신규잔액평가
      +"총여신|연체액|연체율|평점/배점|그룹내순위|"                    //연체율
      +"평점/배점|그룹내순위|평점/배점|그룹내순위|평점/배점|그룹내순위|"        //고객관계 개인/기업/복수거래
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_외환사업
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_카드사업_신용카드매출액
      +"순증목표|순증실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_카드사업_체크카드매출액
      +"달성률|평점/배점|그룹내순위|달성률|평점/배점|그룹내순위|"      //비이자물량_카드_순증유효회원_신규유효회원
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_신탁사업(특정금전신탁)
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_신탁사업(부동산신탁)
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_공제사업(총납입공제료)
      +"목표|실적|달성률|목표|실적|달성률|평점/배점|그룹내순위|"       //비이자물량_공제사업(신규보장성_적립식공제료_적용평점)
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_펀드사업(전략상품 수탁고)
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //비이자물량_펀드사업(장기고객수)
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //스마트금융_인터넷뱅킹
      +"목표|실적|달성률|평점/배점|그룹내순위|"                        //스마트금융_스마트폰뱅킹
      +"목표|실적|달성률|평점/배점|그룹내순위"                        //스마트금융_PUSH서비스
      ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:85,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:75,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,천미불,건,%";
   var strUnitText="백만원,천미불,건,%";
   showUnitText(strUnitText);
   newSetActionMenu(mySheet,"엑셀내려받기");
}
