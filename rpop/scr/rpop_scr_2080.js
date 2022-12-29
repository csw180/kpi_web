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
  
  	doAction("기준년월");
  	setGridInit(); // 데이타 그리드 설정
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

function selectmonth(){
    setGridInit();
    allDelDataGrid(mySheet);
    basemonth   = document.frm.basemonth.value;

    // 2015년 구분 조회 조건
    if (basemonth >= '201507') {
        document.frm.pygubun.disabled = false;
    } else {
        document.frm.pygubun.value = 4
        document.frm.pygubun.disabled = true;
    }
}

function selectjumname()
{
//    hiddenGrid  = document.frm.hiddenGrid;
	basemonth   = document.frm.basemonth.value;
    v_jumcode   = document.frm.jumcode.value;

    if(v_jumcode != '') 
		hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=1&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
    else{ 
        document.frm.jumname.value='';
        document.frm.pgcode.value='';
        document.frm.pgname.value='';
}

}

function popupJumCode()
{
    basemonth = document.frm.basemonth.value;
    win_open2("comm.scr.comm_scr_1010.screen?basemonth="+basemonth+"&searchGubun=4", 250, 450);
}

function selectjum()
{
//    hiddenGrid  = document.frm.hiddenGrid;
    basemonth   = document.frm.basemonth.value;
    v_jumcode   = document.frm.jumcode.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=6&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
}

function ComboValue(el)
{
//    hiddenGrid  = document.frm.hiddenGrid;
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
//    hiddenGrid  = document.frm.hiddenGrid;
    for ( ;el.options.length;) el.options.remove(0);
    var oOption=document.createElement("OPTION");
    oOption.text="전체";
    oOption.value="99999";
    el.options.add(oOption);
    for(i=1;i<=hiddenGrid.GetTotalRows();i++){
       	var oOption=document.createElement("OPTION");
		oOption.text=hiddenGrid.GetCellValue(i, 1);
		oOption.value=hiddenGrid.GetCellValue(i, 0);
       el.options.add(oOption);
    }

}
/* Sheet 각종 처리 */
function doAction(sAction)
{
//    mySheet     = document.frm.mySheet;
//    hiddenGrid  = document.frm.hiddenGrid;
    isSelected  = true;
    basemonth   = document.frm.basemonth.value;
    v_jumcode   = document.frm.jumcode.value;
	v_jumname   = document.frm.jumname.value;
    pygubun     = document.frm.pygubun.value;

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
			hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3" );
            break;
        case "조회":             // 조회(상위 GRID)
            if(v_jumcode=="" || v_jumname==""){
                alert("점번호를 입력하지 않았습니다.");
                document.frm.jumcode.focus();
                return;
            }
			mySheet.DoSearch("rpop.scr.rpop_scr_2080.do?hidden_key=9&basemonth=" + basemonth + "&v_jumcode=" + v_jumcode + "&pygubun="+ pygubun);
            mySheet.FitSize(false, false);
            break;
        case "엑셀내려받기":    // 엑셀내려받기
            inqText=new Array();
            inqText[0]=new Array();
            inqText[0][0]="작업기준년월";
            inqText[0][1]=basemonth;
            inqText[1]=new Array();
            inqText[1][0]="점명";
            inqText[1][1]=document.frm.jumname.value;
            // 보안등급세팅
            seqLevel=document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[2]=new Array();
                inqText[2][0]="보안등급";
                inqText[2][1]=document.frm.Security_Level.value;
            }
            rExcVal=doExcel(mySheet, inqText, true); //common.js 활용하여 excel 출력
            // 엑셀다운로드시 로그 저장
            /*if(rExcVal) {
               	condition="기준년월="+basemonth+";점번호="+v_jumcode;
				hiddenGrid.DoSearch("comm.scr.comm_scr_9097.screen?&htm_title=" + htm_title + "&condition=" + condition + "&gubun=2");//gubun1:rpdy(일일성과)2:rpop(영업점성과" );
            }*/
            break;      
    }

}

function call1020(){
	f = document.frm;
  	basemonth = f.basemonth.value;
  	jumcode   = f.jumcode.value;
  	jumname   = f.jumname.value;
  	pgcode    = f.pgcode.value;
  	pgname    = f.pgname.value;
  	url = "kpi.rpop.rpop_1020.screen?basemonth="+basemonth+"&jumcode="+jumcode+"&jumname="+jumname+"&pgcode="+pgcode+"&pgname="+pgname+"&IS_POPUP=Y&SCREEN_URL=kpi.rpop.rpop_1020.screen";
  	win_open2(url,820,580);    
}

function GridSizeByIsPopup() {
	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "400px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
}

function setGridInit(){
//    mySheet     = document.frm.mySheet;
    basemonth   = document.frm.basemonth.value;

    mySheet.Reset();
    	
    if (basemonth <= '200812')  setGrid2008();
    else if (basemonth <= '201112') setGrid2009();
    else if (basemonth <= '201212') setGrid2012();
    else if (basemonth <= '201312') setGrid2013();
    else if (basemonth <= '201612') setGrid2014();
    else if (basemonth <= '202106') setGrid2017();
    else if (basemonth <= '202112') setGrid2021H2();
    else setGrid2022H1();

}


function setGrid2022H1()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	alert("※ `22년 상반기의 경우 \n종합비이자 이익 평가가 없습니다. \n기준년월을 확인해주세요.");
} 

function setGrid2021H2()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	GridSizeByIsPopup();
	
        // 상위 GRID에 대한 속성정보 설정
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"구분|당월목표|당월실적|달성률|조정달성률|최종달성률|배점|평점|전월실적|전월대비순증|KPI코드", Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Combo",     Hidden:0,  MinWidth:140,  Align:"Left",    ColMerge:1,   SaveName:"col1" },
             //{Type:"Text",      Hidden:1, MinWidth:10,   Align:"Left",    ColMerge:1,   SaveName:"col2" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:1,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:1,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    //mySheet.InitHeadColumn(0, "  종합비이자이익 평가|    카드관련이익|    신탁관련수익|    공제관련이익|    펀드관련이익|    기타관련이익", daLeft);
    mySheet.SetColProperty(0, {ComboText:"종합비이자이익 평가|    카드관련이익|    신탁관련수익|    공제관련이익|    펀드관련이익|    기타관련이익", ComboCode:"1|2|3|4|6|7", } );
    
	mySheet.SetDataLinkMouse(true);
   //지원안함[check again] UnitText="원";
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원");
} 

function setGrid2017()
{
	//createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "800px", "400px");
        // 상위 GRID에 대한 속성정보 설정
   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:"구분|당월목표|당월실적|달성률|배점|평점|전월실적|전월대비순증|KPI코드", Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Combo",     Hidden:0,  MinWidth:140,  Align:"Left",    ColMerge:1,   SaveName:"col1" },
             //{Type:"Text",      Hidden:1, MinWidth:10,   Align:"Left",    ColMerge:1,   SaveName:"col2" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 }];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
    //mySheet.InitHeadColumn(0, "  종합비이자이익 평가|    외환관련이익|    카드관련이익|    신탁관련수익|    공제관련이익|    펀드관련이익|    기타관련이익", daLeft);
	mySheet.SetColProperty(0, {ComboText:"종합비이자이익 평가|    카드관련이익|    신탁관련수익|    공제관련이익|    펀드관련이익|    기타관련이익", ComboCode:"1|2|3|4|5|6", } );
   	mySheet.SetDataLinkMouse(true);
   	//지원안함[check again] UnitText="원";
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원");
} 

function setGrid2014()
{
	//createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "800px", "400px");
        // 상위 GRID에 대한 속성정보 설정
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

    var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:"구분||당월목표|당월실적|달성률|배점|평점|전월실적|전월대비순증|KPI코드", Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Combo",     Hidden:0,  MinWidth:210,  Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Text",      Hidden:1, MinWidth:10,   Align:"Left",    ColMerge:1,   SaveName:"col2" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
       
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
      //mySheet.InitHeadColumn(0, "평점 적용(Max(A,B))|종합비이자이익 전체합산 평가(A)|비이자이익 부문별 분리실적 평가(B)|"  +
      //"    카드관련이익|    신탁관련수익|    공제관련이익|    펀드관련이익|    기타관련이익", daLeft);
    mySheet.SetColProperty(0, {ComboText:"종합비이자이익 평가|    카드관련이익|    신탁관련수익|    공제관련이익|    펀드관련이익|    기타관련이익", ComboCode:"1|2|3|4|5|6", } );
    mySheet.SetDataLinkMouse(true);
      //지원안함[check again] UnitText="원";
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원");
} 

function setGrid2013()
{
	//createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "800px", "400px");
        // 상위 GRID에 대한 속성정보 설정
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

    var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:"구분||당월목표|당월실적|달성률|배점|평점|전월실적|전월대비순증|KPI코드", Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Combo",     Hidden:0,  MinWidth:210,  Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Text",      Hidden:1, MinWidth:10,   Align:"Left",    ColMerge:1,   SaveName:"col2" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
       
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
      //       mySheet.InitHeadColumn(0, "평점 적용(Max(A,B))|종합비이자이익 전체합산 평가(A)|비이자이익 부문별 분리실적 평가(B)|"  +
      //"    카드관련이익|    신탁관련수익|    공제관련이익|    외환관련이익|    펀드관련이익|    기타관련이익", daLeft);
    mySheet.SetColProperty(0, {ComboText:"종합비이자이익 평가|    카드관련이익|    신탁관련수익|    공제관련이익|    펀드관련이익|    기타관련이익", ComboCode:"1|2|3|4|5|6", } );
	mySheet.SetDataLinkMouse(true);
      //지원안함[check again] UnitText="원";
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원");
} 

function setGrid2012()
{
	//createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "800px", "400px");
        // 상위 GRID에 대한 속성정보 설정
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

    var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:"구분||당월목표|당월실적|달성률|배점|평점|전월실적|전월대비순증|KPI코드", Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Combo",     Hidden:0,  MinWidth:200,  Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Text",      Hidden:1, MinWidth:10,   Align:"Left",    ColMerge:1,   SaveName:"col2" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
       
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

	mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    //      mySheet.InitHeadColumn(0, "평점 적용(Max(A,C))|종합비이자이익 전체합산(C)=(A+B)|당해연도 종합비이자이익(A)|"  +
   //"    카드관련이익|    신탁관련수익|    공제관련이익|    외환관련이익|    펀드관련이익|전년도 12월 순증종합비이자(B)", daLeft);
    mySheet.SetColProperty(0, {ComboText:"종합비이자이익 평가|    카드관련이익|    신탁관련수익|    공제관련이익|    펀드관련이익|    기타관련이익", ComboCode:"1|2|3|4|5|6", } );
	mySheet.SetDataLinkMouse(true);
   //지원안함[check again] UnitText="원";
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원");
} 

function setGrid2009()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	GridSizeByIsPopup();
        // 상위 GRID에 대한 속성정보 설정
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"구분||당월|전월|증감|PG평균|PG최고", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Combo",     Hidden:0,  MinWidth:130,  Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Text",      Hidden:1, MinWidth:10,   Align:"Left",    ColMerge:1,   SaveName:"col2" },
             {Type:"Int",       Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	//   mySheet.InitHeadColumn(0, "종합비이자이익(수익)|  카드관련이익|  신탁관련수익|  공제관련이익|  외환관련수익|  펀드관련수익", daLeft);
   	mySheet.SetColProperty(0, {ComboText:"종합비이자이익 평가|    카드관련이익|    신탁관련수익|    공제관련이익|    펀드관련이익|    기타관련이익", ComboCode:"1|2|3|4|5|6", } );
	mySheet.SetDataLinkMouse(true);
   	//지원안함[check again] UnitText="원";
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원");
} 
    
function setGrid2008()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	GridSizeByIsPopup();
     // 상위 GRID에 대한 속성정보 설정
    mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

    var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:"구분||당월|전월|증감|PG평균|PG최고", Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Combo",     Hidden:0,  MinWidth:130,  Align:"Left",    ColMerge:1,   SaveName:"col1" },
           {Type:"Text",      Hidden:1, MinWidth:10,   Align:"Left",    ColMerge:1,   SaveName:"col2" },
           {Type:"Int",       Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"Int",       Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"Int",       Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"Int",       Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"Int",       Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
     
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    //      mySheet.InitHeadColumn(0, "비이자이익(수익)|  카드관련이익|  신탁관련수익|  공제관련이익|  외환관련수익|  기타수수료수익", daLeft);
    mySheet.SetColProperty(0, {ComboText:"종합비이자이익 평가|    카드관련이익|    신탁관련수익|    공제관련이익|    펀드관련이익|    기타관련이익", ComboCode:"1|2|3|4|5|6", } );
	mySheet.SetDataLinkMouse(true);
    //지원안함[check again] UnitText="원";
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원");
}