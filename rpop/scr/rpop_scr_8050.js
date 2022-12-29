var isInitBtnEnable = true;
var isInstBtnEnable = true;
var isMofyBtnEnable = false;
var isDelBrnEnable  = false;
var isExcelBtnEnable= true;

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
function LoadPage()
{
  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");
    hiddenGrid.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:"HIDDEN", Align:"Center"} ];
    hiddenGrid.InitHeaders(headers, info);

    var cols = [ {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
 		{Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
    hiddenGrid.InitColumns(cols);
	hiddenGrid.SetVisible(0);
    hiddenGrid.SetEditable(0);
    doAction("기준년월");
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

function selectmonth()
{
    initGrid(); // 화면 그리드 초기화  
    allDelDataGrid(mySheet);
}

/*--------------------------------------------*/
/* @기능 : 선택된 기준년월에 따른 그리드 init */
/*--------------------------------------------*/        
function initGrid()
{
    basemonth  = document.frm.basemonth.value;
	
	if (basemonth >= '202201') setGrid2022H1();
    else if (basemonth >= '202107') setGrid2021H2();
    else setGrid2021H1();
}

/* Sheet 각종 처리 */
function doAction(sAction)
{
    isSelected  = true;
    basemonth   = document.frm.basemonth.value;
    
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
        case "기준년월":             // 조회(상위 GRID)
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=7&stmonth=202101"); 
            break;
        case "조회":             // 조회(상위 GRID)
            mySheet.DoSearch("rpop.scr.rpop_scr_8050.do?hidden_key=9&basemonth="+basemonth+"&period="+4); 
            //mySheet.FitSize(false, true);
            break;
        case "엑셀내려받기":    // 엑셀내려받기
            inqText       = new Array();
            inqText[0]    = new Array();
            inqText[0][0] = "작업기준년월";
            inqText[0][1] = basemonth;            
            inqText[1]    = new Array();
            inqText[1][0] = "성과주기";
            inqText[1][1] = "년";
            // 보안등급세팅
            seqLevel = document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[2]    = new Array();
                inqText[2][0] = "보안등급";
                inqText[2][1] = document.frm.Security_Level.value;
            }
            
            rExcVal = doExcel(mySheet, inqText, true); //common.js 활용하여 excel 출력
            // 엑셀다운로드시 로그 저장
            /*if(rExcVal) {
               condition = "기준년월="+basemonth;
               hiddenGrid.DoSearch("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"); // gubun 1:rpdy(일일성과) 2:rpop(영업점성과)
            }*/
            break;      
    }
}

/*---------------------------------------------*/
/* @기능 : 2022년도 상반기 기준 그리드 set     */
/*---------------------------------------------*/        
function setGrid2022H1()
{
	basemonth  = document.frm.basemonth.value;
  
  	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = "소속점번호|소속점명|점번호|" 
		+"RM명|RM명|RM명|PG명|"
   		+"조달구조개선|조달구조개선|조달구조개선|"
   		+"수익증대|수익증대|"
   		;

	var strHeader1 = "소속점번호|소속점명|점번호|"
   		+"직원번호|직급|성명|PG명|"
   		+"핵심예수금|핵심예수금|핵심예수금|"
   		+"종합이익|종합이익|"
   		;

	var strHeader2 = "소속점번호|소속점명|점번호|"
    	+"직원번호|직급|성명|PG명|"
   		+"순위|합산득점률|평균달성률|"
   		+"순위|충당금반영후 초과이익|"
   		;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };

   var headers = [ { Text:strHeader0, Align:"Center"},
                   { Text:strHeader1, Align:"Center"},
			       {Text:strHeader2, Align:"Center"}];

   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:130,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);
   	mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기")
}

/*---------------------------------------------*/
/* @기능 : 2021년도 하반기 기준 그리드 set     */
/*---------------------------------------------*/        
function setGrid2021H2()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	
  	basemonth  = document.frm.basemonth.value;
  
	var strHeader0 = 
	  	"점번호|점명|직원번호|"
	  	+"KPI:공제사업|KPI:공제사업|KPI:공제사업|KPI:공제사업|"
	  	+"KPI:공제사업|KPI:공제사업|KPI:공제사업|"
	  	;
	var strHeader1 =
		"점번호|점명|직원번호|"
	  	+"적립식 공제료|적립식 공제료|적립식 공제료|적립식 공제료|"
	  	+"일시납 공제료|일시납 공제료|일시납 공제료|"
	  	;
	var strHeader2 = 
		"점번호|점명|직원번호|"
	  	+"순위|인정건수|초회공제료|최저기준(5건)|"
	  	+"순위|공제료|최저기준(1억원)|"
	  	;

  	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

  	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
  	var headers = [ { Text:strHeader0, Align:"Center"},
                    { Text:strHeader1, Align:"Center"},
			        {Text:strHeader2, Align:"Center"}];
  	mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	 {Type:"Text",     Hidden:0,  MinWidth:130,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	 {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	 {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"Text",     Hidden:0,  MinWidth:130,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	 {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"Text",     Hidden:0,  MinWidth:130,  Align:"Left",    ColMerge:1,   SaveName:"NONE" } ];
       
  	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

  	mySheet.SetEditable(0);
  	mySheet.SetVisible(1);
  	mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
  	newSetActionMenu(mySheet,"엑셀내려받기")
}

/*---------------------------------------------*/
/* @기능 : 2021년도 상반기 기준 그리드 set     */
/*---------------------------------------------*/        
function setGrid2021H1()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	
  	basemonth  = document.frm.basemonth.value;
  
	var strHeader0 = 
  		"점번호|점명|직원번호|"
  		+"KPI:공제사업|KPI:공제사업|KPI:공제사업|KPI:공제사업|"
      	+"KPI:공제사업|KPI:공제사업|KPI:공제사업|"
      	+"KPI:카드사업|KPI:카드사업|"
      	+"부지점장|부지점장|부지점장|부지점장"
      	;
	var strHeader1 = 
		"점번호|점명|직원번호|"
      	+"적립식 공제료|적립식 공제료|적립식 공제료|적립식 공제료|"
      	+"일시납 공제료|일시납 공제료|일시납 공제료|"
      	+"신규회원 매출액|신규회원 매출액|"
      	+"순위|합산득점률|신규여수신|비이자이익"
      	;
	var strHeader2 = 
		"점번호|점명|직원번호|"
      	+"순위|인정건수|초회공제료|최저기준(5건)|"
      	+"순위|공제료|최저기준(1억원)|"
      	+"순위|실적|"
      	+"순위|합산득점률|득점률|득점률"
      	;

    mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
                    { Text:strHeader1, Align:"Center"},
			        {Text:strHeader2, Align:"Center"}];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
		 {Type:"Text",     Hidden:0,  MinWidth:130,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
		 {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
		 {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"Text",     Hidden:0,  MinWidth:130,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
		 {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"Text",     Hidden:0,  MinWidth:130,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
		 {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
       
	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
    newSetActionMenu(mySheet,"엑셀내려받기");
}