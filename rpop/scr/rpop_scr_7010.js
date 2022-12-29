
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
function LoadPage(){

  //mySheet     = document.frm.mySheet;
  //hiddenGrid  = document.frm.hiddenGrid;
  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");
	
  // Hidden GRID에 대한 속성정보 설정

   	hiddenGrid.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"HIDDEN", Align:"Center"} ];
   	
	hiddenGrid.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
   	hiddenGrid.InitColumns(cols);
	
	hiddenGrid.SetVisible(0);
   	hiddenGrid.SetEditable(0);
  
  	initGrid();
  	doAction("기준년월");
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
    //hiddenGrid=document.frm.hiddenGrid;
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
    initGrid();
    allDelDataGrid(mySheet);
    //hiddenGrid  = document.frm.hiddenGrid;
    basemonth   = document.frm.basemonth.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=7&pggubun=3");  //RM PG조회
}
/* Sheet 각종 처리 */
function doAction(sAction)
{
    //mySheet     = document.frm.mySheet;
    //hiddenGrid  = document.frm.hiddenGrid;
    isSelected  = true;
    basemonth   = document.frm.basemonth.value;
    pgcode      = document.frm.pgcode.value;
    
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
        case "기준년월":             // 조회(상위 GRID)
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&stmonth=201201"); 
            break;
        case "조회":             // 조회(상위 GRID)
            mySheet.DoSearch("rpop.scr.rpop_scr_7010.do?hidden_key=9&basemonth="+basemonth+"&pgcode="+pgcode+"&period="+4); 
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
            inqText[2]    = new Array();
            inqText[2][0] = "PG명";
            inqText[2][1] = document.frm.pgcode.options[document.frm.pgcode.selectedIndex].text;
            // 보안등급세팅
            seqLevel = document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[3]    = new Array();
                inqText[3][0] = "보안등급";
                inqText[3][1] = document.frm.Security_Level.value;
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

/*--------------------------------------------*/
/* @기능 : 선택된 기준년월에 따른 그리드 init */
/*--------------------------------------------*/        
function initGrid()
{
    basemonth   = document.frm.basemonth.value;
    
    if(basemonth >= '201907') setGrid2019H2();
    else if(basemonth >= '201901') setGrid2019H1();
    else setGrid2018Q3();
}

/*-------------------------------------------*/
/* @기능 : 2019년도 하반기 기준 그리드 set   */
/*-------------------------------------------*/
function setGrid2019H2()
{
  //mySheet = document.frm.mySheet;
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  	// 상위 GRID에 대한 속성정보 설정
   	i=0;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"소속점번호|소속점명|점번호|RM(본부)|RM(본부)|RM(본부)|RM(본부)|RM(본부)|PG명|당월누계|당월누계|당월누계|전월누계|전월누계|전월누계", Align:"Center"},
                 { Text:"소속점번호|소속점명|점번호|직원번호|직급|성명|부임일|재직기간|PG명|순위|총평점|총배점|순위|총평점|총배점", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:50,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:50,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:50,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:60,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
    newSetActionMenu(mySheet,"엑셀내려받기");
}

/*-------------------------------------------*/
/* @기능 : 2019년도 상반기 기준 그리드 set   */
/*-------------------------------------------*/
function setGrid2019H1()
{
  //mySheet = document.frm.mySheet;
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
   	i=0;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"소속점번호|소속점명|점번호|RM(센터)|RM(센터)|RM(센터)|RM(센터)|PG명|당월누계|당월누계|당월누계|전월누계|전월누계|전월누계", Align:"Center"},
                 { Text:"소속점번호|소속점명|점번호|직원번호|성명|부임일|재직기간|PG명|순위|총평점|총배점|순위|총평점|총배점", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:50,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:50,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:50,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:60,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
  	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
   	SetActionMenu("엑셀내려받기");
}

/*-------------------------------------------*/
/* @기능 : 2018년도 하반기 기준 그리드 set   */
/*-------------------------------------------*/
function setGrid2018Q3()
{
  //mySheet = document.frm.mySheet;
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
   	i=0;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"소속점번호|RM점번호|RM명|PG명|RM|RM|RM|RM|당월누계|당월누계|당월누계|전월누계|전월누계|전월누계", Align:"Center"},
                 { Text:"소속점번호|RM점번호|RM명|PG명|직급|성명|부임일|재직기간|순위|총평점|총배점|순위|총평점|총배점", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:120,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:40,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:50,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:50,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:50,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:60,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");
}
