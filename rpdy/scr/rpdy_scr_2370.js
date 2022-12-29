var isInitBtnEnable = true;
var isInstBtnEnable = true;
var isMofyBtnEnable = false;
var isDelBrnEnable  = false;
var isExcelBtnEnable= true;

/*Sheet 기본 설정 */
function LoadPage(){

	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));     // 정보출력
	createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");   // 기본정보 (기준일, 명칭등)
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
	
	initGrid();  
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

function selectmonth()
{
    initGrid();

    //allDelDataGrid(document.frm.mySheet);
    
    // 최근 기준년월 가져오기
    basemonth = hiddGridmon.GetCellValue(1, 0);
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=7");
}

/* Sheet 각종 처리 */
function doAction(sAction)
{
    isSelected  = true;
    baseday     = document.frm.baseday.value;

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
        case "기준일":           // 조회(상위 GRID)
            // 기준년월 정보 (최근 기준년월)
            hiddGridmon.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&superFlg=Y"); 
            /*// 기준일자 정보
            if(isRoleEnable == '1') {
             // 전산정보부 및 성과 담당자
               hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2370.do?hidden_key=9&baseday="+baseday+"&sergb=98");
            } else {
               hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2370.do?hidden_key=9&baseday="+baseday+"&sergb=99");
            }*/
            break;
        case "조회":             // 조회(상위 GRID)
            if (baseday <= '20210318' )
            {
              if(isRoleEnable != '1') { 
                alert("2021년도 상반기 보고서 오픈전 일자입니다. 2021년 3월 19일 부터 조회하세요.");
                return;
              }
            }                  
            
            // 조회구분-3 RM
            mySheet.DoSearch("rpdy.scr.rpdy_scr_2370.do?hidden_key=9&baseday="+baseday+"&sergb=3"); 
            //mySheet.FitSize(false, true);
            break;
        case "엑셀내려받기":    // 엑셀내려받기
            inqText       = new Array();
            inqText[0]    = new Array();
            inqText[0][0] = "기준일";
            inqText[0][1] = baseday;            

            // 보안등급세팅
            seqLevel = document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[1]    = new Array();
                inqText[1][0] = "보안등급";
                inqText[1][1] = document.frm.Security_Level.value;
            }

            rExcVal = doExcel(mySheet, inqText, -1); //common.js 활용하여 excel 출력
            /*// 엑셀다운로드시 로그 저장
            if(rExcVal) {
               condition = "기준일="+baseday;
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

    if (baseday >= '20220101') setGrid2022();
}


/*-----------------------------------------*/
/* @기능 : 2022년도 상반기 기준 그리드 set */
/*-----------------------------------------*/        
function setGrid2022()
{
	baseday = document.frm.baseday.value;
	//mySheet.RemoveAll();
	mySheet.Reset();
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	let strHeader2 = "";

	strHeader0 = "소속점번호|소속점명|점번호|RM명|RM명|RM명|PG명|조달구조개선|조달구조개선|조달구조개선|"      //10      
      ;    
		
	strHeader1 = "소속점번호|소속점명|점번호|직원번호|직급|성명|PG명|핵심예수금|핵심예수금|핵심예수금|"      //10      
      ;
	
	strHeader2 = "소속점번호|소속점명|점번호|직원번호|직급|성명|PG명|순위|합산득점률|평균달성률|"      //10      
      ;
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );
	
	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
	          { Text:strHeader1, Align:"Center"},
	          { Text:strHeader2, Align:"Center"} ];
	mySheet.InitHeaders(headers, info);
	
	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	    {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	    {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	    {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	    {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	    {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	    {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	    {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
	 
	mySheet.InitColumns(cols);
	
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);//합계행상단:false,하단:true
	mySheet.SetHeaderRowHeight(30);
	mySheet.SetCountPosition(1);
	//UnitText= "백만원,포인트,%";
	showUnitText("백만원,포인트,%");
	newSetActionMenu(mySheet,"엑셀내려받기");
}