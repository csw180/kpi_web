var isInitBtnEnable = true;
var isInstBtnEnable = true;
var isMofyBtnEnable = false;
var isDelBrnEnable  = false;
var isExcelBtnEnable= true;

/*Sheet 기본 설정 */
function LoadPage(){

	createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "750px", "400px");
  
  	// Hidden GRID에 대한 속성정보 설정
   	hiddenGrid.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"HIDDEN", Align:"Center"} ];
   	hiddenGrid.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
   	hiddenGrid.InitColumns(cols);
   	hiddenGrid.SetEditable(0);
	hiddenGrid.SetVisible(0);
  
  	doAction("기준년월");    
}

function ComboValue(el)
{
	for ( ;el.options.length>1;) el.options.remove(1);
    for(i=1;i<=hiddenGrid.GetTotalRows();i++){
        var oOption = document.createElement("OPTION");
        oOption.text = hiddenGrid.GetCellValue(i, 1);
        oOption.value = hiddenGrid.GetCellValue(i, 0);
		el.options.add(oOption);
	}
}

function selectmonth()
{   
  // 기준일 기준으로 대상구분 disabled 처리
    	   
    initGrid(); // 총예수금 화면 그리드 초기화  
 	    
    basemonth   = document.frm.basemonth.value;

    // 대상구분 조회 조건
    if (basemonth >= '202201') {
        document.frm.cifgb.value = 1
        document.frm.cifgb.disabled = true;
    } 
    
    setSergb(); 
}

/*---------------------------------------------------
  조회구분 : 연도별에 따라 조회구분 항목 출력
---------------------------------------------------*/  
function setSergb(){
    basemonth   = document.frm.basemonth.value;

    var sergbArr = new Array();
    if( basemonth >= '202201'){
        sergbArr[0] = new Array('3', '반기평잔');
        sergbArr[1] = new Array('5', '월중평잔');
    } 
    
    setComboFgb(sergbArr);			
}

function setComboFgb(sergbArr){
	el = document.frm.sergb;	
	while(el.options.length > 0){el.options.remove(0);}

  	for(i=0;i<parseInt(sergbArr.length);i++){	   
    	var oOption = document.createElement("OPTION");
	  	oOption.value = sergbArr[i][0];
    	oOption.text  = sergbArr[i][1];       
    	el.options.add(oOption);
  	}
}

/* Sheet 각종 처리 */
function doAction(sAction)
{
    isSelected 	= true;
    basemonth 	= document.frm.basemonth.value;
    sergb       	= document.frm.sergb.value;
    cifgb      	= document.frm.cifgb.value;

    switch(sAction)
    {
		case "고정필드설정":
        	mySheet.SetFrozenCol(mySheet.MouseCol());
        	ufSetMergeCell(mySheet, mySheet.HeaderRows(), 0, 1,4);
        	break;
        case "고정필드해제":
        	mySheet.SetFrozenCol(0);
        	ufSetMergeCell(mySheet, mySheet.HeaderRows(), 0, 1,4);
        	break;		
        case "기준년월":             // 조회(상위 GRID)
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=7&stmonth=202201");         
            break;
        case "조회":             // 조회(상위 GRID)
            mySheet.DoSearch("rpop.scr.rpop_scr_7290.do?hidden_key=9&basemonth="+basemonth+"&cifgb="+cifgb+"&sergb="+sergb); 
            break;
        case "엑셀내려받기":    // 엑셀내려받기
            inqText       = new Array();
            inqText[0]    = new Array();
            inqText[0][0] = "작업기준년월";
            inqText[0][1] = basemonth;            
            inqText[1]    = new Array();
            inqText[1][0] = "대상구분";
            inqText[1][1] = document.frm.cifgb.options[document.frm.cifgb.selectedIndex].text;
            inqText[2]    = new Array();
            inqText[2][0] = "조회구분";
            inqText[2][1] = document.frm.sergb.options[document.frm.sergb.selectedIndex].text;

            // 보안등급세팅
            seqLevel = document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[3]    = new Array();
                inqText[3][0] = "보안등급";
                inqText[3][1] = document.frm.Security_Level.value;
            }

            rExcVal = doExcel(mySheet, inqText, -1); //common.js 활용하여 excel 출력
            
			// 엑셀다운로드시 로그 저장
			/*
            if(rExcVal) {
               condition = "기준년월="+basemonth+";대상구분="+cifgb+";조회구분="+sergb;
               hiddenGrid.DoSearch("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"); // gubun 1:rpdy(일일성과) 2:rpop(영업점성과)
            }
			*/
            break;      
    }
}

/*--------------------------------------------*/
/* @기능 : 선택된 기준년월에 따른 그리드 init */
/*--------------------------------------------*/        
function initGrid()
{
    basemonth  = document.frm.basemonth.value;

	if (basemonth >= '202201') setGrid2022H1();
}

/*------------------------------------------*/
/* @기능 : 2021년도 하반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2022H1()
{
	basemonth  = document.frm.basemonth.value;
  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "750px");
	mySheet.Reset();

	var strHeader0 =
    	"점번호|점명|RM(영업점)|RM(영업점)|PG명|총금액\n(A)|"                                              // 6
      	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                         // 6
      	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                     // 5
      	+"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C-D)|목표\n(F)|달성률\n(G)=(E/F)|"               // 5
      	;

	var strHeader1 = 
    	"점번호|점명|직원번호|성명|PG명|총금액\n(A)|"                                                      // 6
      	+"소계|금융기관성|타지점|본부조달|구속성예금|임직원|"                                               // 6
      	+"단기신규해지|본부마케팅|독도상품실적|평가제외|기타조정|"                                          // 5
      	+"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C-D)|목표\n(F)|달성률\n(G)=(E/F)|"               // 5
      	;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:4 } );

	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
	                 { Text:strHeader1, Align:"Center"} ];
	mySheet.InitHeaders(headers, info);
    
	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },	   //  0 점번호
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },          //  1 점명
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },          //  2 직원번호
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },          //  3 성명
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },          //  4 PG명
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },	//  5 총금액
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },	//  6  소계
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },	//  7 금융기관성
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },  //  8 타지점
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },  //  9 본부조달
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },  // 10 구속성예금
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },  // 11 임직원
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },  // 12 단기신규해지
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },  // 13 본부마케팅
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },  // 14 독도상품실적
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },  // 15 평가제외
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },  // 16 기타조정
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },		// 17 누증실적
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },      // 18 기준실적
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },      // 19 순증실적
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },      // 20 목표
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];   // 21 달성률
   

	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
	mySheet.SetHeaderRowHeight(26);
	showUnitText("원, %");
   	newSetActionMenu(mySheet,"엑셀내려받기");

	sumMerge();
}
