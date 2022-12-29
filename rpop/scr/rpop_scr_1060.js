var isInitBtnEnable = true;
var isInstBtnEnable = true;
var isMofyBtnEnable = false;
var isDelBrnEnable  = false;
var isExcelBtnEnable= true;

let strMsHeaders = "";

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
	var srchFlag = true;
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
		srchFlag = false;
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
		createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");
		
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
	}
   	
  
  	// 상위 GRID에 대한 속성정보 설정
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );	//, NoFocusMode:1

   	var msInfo    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	//var msHeaders = [ { Text:"구분|구분|순번|" + makeHeader(""), Align:"Center"} ];
	var msHeaders = [ { Text:"|구분|" + makeHeader(""), Align:"Center"} ];
   	mySheet.InitHeaders(msHeaders, msInfo);

   	var msCols = [ {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Center",  ColMerge:1,   SaveName:"col1" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"col2" },
             //{Type:"Text",      Hidden:1, MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"col3" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(msCols);
	mySheet.SetColProperty(0, 0, {Focus:0});
	mySheet.SetColProperty(0, 1, {Focus:0});
   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	//mySheet.InitHeadColumn(0, "합\n계|합\n계|합\n계|수\n신|수\n신|수\n신|여\n신|여\n신|여\n신", daCenter); // daCenter ??
   	//mySheet.InitHeadColumn("col2", "마진율|순이자수익|평잔|마진율|순이자수익|평잔|마진율|순이자수익|평잔");
   //지원안함[check again] UnitText="원, %";
	newSetActionMenu(mySheet,"엑셀내려받기");
	
	showUnitText("원, %");
	initLeftColumn();
	
	if(typeof(myChart) === "undefined") {
		createIBChart(document.getElementById("chartObj"), "myChart", {Width: "100%",height: "300px"});
	}
	initChart();
	
	if(srchFlag)
  		doAction("기준년월");
}

function initLeftColumn()
{
	mySheet.DataInsert(0);
	mySheet.DataInsert(1);
	mySheet.DataInsert(2);
	mySheet.DataInsert(3);
	mySheet.DataInsert(4);
	mySheet.DataInsert(5);
	mySheet.DataInsert(6);
	mySheet.DataInsert(7);
	mySheet.DataInsert(8);
	
	mySheet.SetCellText(0,0,"구분");
	mySheet.SetCellText(1,0,"합계");
	mySheet.SetCellText(2,0,"합계");
	mySheet.SetCellText(3,0,"합계");
	mySheet.SetCellText(4,0,"수신");
	mySheet.SetCellText(5,0,"수신");
	mySheet.SetCellText(6,0,"수신");
	mySheet.SetCellText(7,0,"여신");
	mySheet.SetCellText(8,0,"여신");
	mySheet.SetCellText(9,0,"여신");
	
	mySheet.SetMergeCell(0,0,1,2);
	mySheet.SetMergeCell(1,0,3,1);
	mySheet.SetMergeCell(4,0,3,1);
	mySheet.SetMergeCell(7,0,3,1);
	
	mySheet.SetColBackColor(0, "#C9E1F5");
	
	mySheet.SetCellText(1,1,"마진율");
	mySheet.SetCellText(2,1,"순이자수익");
	mySheet.SetCellText(3,1,"평잔");
	mySheet.SetCellText(4,1,"마진율");
	mySheet.SetCellText(5,1,"순이자수익");
	mySheet.SetCellText(6,1,"평잔");
	mySheet.SetCellText(7,1,"마진율");
	mySheet.SetCellText(8,1,"순이자수익");
	mySheet.SetCellText(9,1,"평잔");
	
	mySheet.SetCellAlign(1,1,"Center")
	mySheet.SetCellAlign(2,1,"Center")
	mySheet.SetCellAlign(3,1,"Center")
	mySheet.SetCellAlign(4,1,"Center")
	mySheet.SetCellAlign(5,1,"Center")
	mySheet.SetCellAlign(6,1,"Center")
	mySheet.SetCellAlign(7,1,"Center")
	mySheet.SetCellAlign(8,1,"Center")
	mySheet.SetCellAlign(9,1,"Center")
	
	mySheet.SelectCell(1, 0);  
	mySheet.SetColBackColor(1, "#C9E1F5");
}

function initChart() {
	myChart.removeAll();
	
	myChart.setOptions({
		subtitle:{
					text:"[단위 / %]",
					align:"right",
					style:{
						color:"#15498B",
						fontFamily:"Dotum"
					}
		} 
	},{
	  		append: true,
			redraw: true
	});
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
function selectjumname()
{
	//allDelDataGrid(mySheet);
	LoadPage()
	
    //hiddenGrid  = document.frm.hiddenGrid;
    basemonth   = document.frm.basemonth.value;
    v_jumcode   = document.frm.jumcode.value;
    if(v_jumcode != '') hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=1&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
    else{ 
		document.frm.jumname.value = '';
		document.frm.pgcode.value = '';
		document.frm.pgname.value = '';
	}
}
function popupJumCode()
{
	allDelDataGrid(mySheet);
    basemonth = document.frm.basemonth.value;
    win_open2("comm.scr.comm_scr_1010.screen?basemonth="+basemonth+"&searchGubun=2", 250, 450);
}
function selectjum()
{
    //hiddenGrid  = document.frm.hiddenGrid;
    basemonth   = document.frm.basemonth.value;
    v_jumcode   = document.frm.jumcode.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=6&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
}

function ComboValue(el)
{
    //hiddenGrid  = document.frm.hiddenGrid;
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
    //hiddenGrid  = document.frm.hiddenGrid;
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
	v_jumname=document.frm.jumname.value;
    pgcode      = document.frm.pgcode.value;
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
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3"); 
            break;
        case "조회":             // 조회(상위 GRID)
            if (v_jumcode=="" || v_jumcode==null || v_jumname=="" || v_jumname==null){
                if(v_jumcode == "" || v_jumcode==null)
					alert("점번호를 입력하지 않았습니다.");
				else 
					alert("올바르지 않은 점번호를 입력하였습니다.");
				
				document.frm.jumcode.focus();
                return;
            }
            if(basemonth < '201001')
              {
                if (pgcode == '16'){
                     alert("기업금융센터 2010년부터 조회가능합니다.");
			        	document.frm.basemonth.focus();
                return;
              }  
            }        
            
            //Header 정보를 생성
            //지원안함[implemented common] mySheet.InitHeadRow(0, "구분|구분|순번|" + makeHeader(basemonth), true);
			
			if(typeof(mySheet) !== "undefined") {
				
				mySheet.Reset();
			}
			
			mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:0 } );	//, NoFocusMode:1
			
			var msInfo    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
			
			strMsHeaders = "구분|구분|" + makeHeader(basemonth);//순번|
			
			var msHeaders = [ { Text:strMsHeaders, Align:"Center"} ];
			mySheet.InitHeaders(msHeaders, msInfo);
			
			var msCols = [ 
					{Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Center",  ColMerge:1,   SaveName:"col1" },
					{Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Center",  ColMerge:1,   SaveName:"col2" },
			        //  {Type:"Text",     Hidden:1,  MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"col2" },
			          //{Type:"Text",      Hidden:1, MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"col3" },
			          {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			          {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			          {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			          {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			          {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			          {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			          {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			          {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			          {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			          {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			          {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			          {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
			 
			mySheet.InitColumns(msCols);
			mySheet.SetColProperty(0, 0, {Focus:0});
			mySheet.SetColProperty(0, 1, {Focus:0});
            mySheet.DoSearch("rpop.scr.rpop_scr_1060.do?hidden_key=9&basemonth="+basemonth+"&v_jumcode="+v_jumcode); 
			
            //mySheet.FitSize(false, true);
            callgrap();
            break;
        case "엑셀내려받기":    // 엑셀내려받기
            
            inqText       = new Array();
            inqText[0]    = new Array();
            inqText[0][0] = "작업기준년월";
            inqText[0][1] = basemonth;
            inqText[1]    = new Array();
            inqText[1][0] = "점명";
            inqText[1][1] = document.frm.jumname.value;
            inqText[2]    = new Array();
            inqText[2][0] = "PG명";
            inqText[2][1] = document.frm.pgname.value;
            // 보안등급세팅
            seqLevel = document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[3]    = new Array();
                inqText[3][0] = "보안등급";
                inqText[3][1] = document.frm.Security_Level.value;
            }

            //mySheet.InitDataProperty(0, 3,        dtData,       80,    daRight,       true  , "",         false,              "",         dfNone,        -1,     false,     false,     18);
            //mySheet.InitDataProperty(0, 4,        dtData,       80,    daRight,       true  , "",         false,              "",         dfNone,        -1,     false,     false,     18);
            //mySheet.InitDataProperty(0, 5,        dtData,       80,    daRight,       true  , "",         false,              "",         dfNone,        -1,     false,     false,     18);
            //mySheet.InitDataProperty(0, 6,        dtData,       80,    daRight,       true  , "",         false,              "",         dfNone,        -1,     false,     false,     18);
            //mySheet.InitDataProperty(0, 7,        dtData,       80,    daRight,       true  , "",         false,              "",         dfNone,        -1,     false,     false,     18);
            //mySheet.InitDataProperty(0, 8,        dtData,       80,    daRight,       true  , "",         false,              "",         dfNone,        -1,     false,     false,     18);
            //mySheet.InitDataProperty(0, 9,        dtData,       80,    daRight,       true  , "",         false,              "",         dfNone,        -1,     false,     false,     18);
            //mySheet.InitDataProperty(0,10,        dtData,       80,    daRight,       true  , "",         false,              "",         dfNone,        -1,     false,     false,     18);
            //mySheet.InitDataProperty(0,11,        dtData,       80,    daRight,       true  , "",         false,              "",         dfNone,        -1,     false,     false,     18);
            //mySheet.InitDataProperty(0,12,        dtData,       80,    daRight,       true  , "",         false,              "",         dfNone,        -1,     false,     false,     18);
            //mySheet.InitDataProperty(0,13,        dtData,       80,    daRight,       true  , "",         false,              "",         dfNone,        -1,     false,     false,     18);
            //mySheet.InitDataProperty(0,14,        dtData,       80,    daRight,       true  , "",         false,              "",         dfNone,        -1,     false,     false,     18);

            rExcVal = doExcel(mySheet, inqText, true); //common.js 활용하여 excel 출력

            // 엑셀다운로드시 로그 저장
            /*if(rExcVal) {
               condition = "기준년월="+basemonth+";점번호="+v_jumcode;
               hiddenGrid.DoSearch("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"); // gubun 1:rpdy(일일성과) 2:rpop(영업점성과)
            }*/

            //mySheet.InitDataProperty(0, 3,        dtData,       80,    daRight,       true  , "",         false,              "",        dfFloat,         2,     false,     false,     18);
            //mySheet.InitDataProperty(0, 4,        dtData,       80,    daRight,       true  , "",         false,              "",        dfFloat,         2,     false,     false,     18);
            //mySheet.InitDataProperty(0, 5,        dtData,       80,    daRight,       true  , "",         false,              "",        dfFloat,         2,     false,     false,     18);
            //mySheet.InitDataProperty(0, 6,        dtData,       80,    daRight,       true  , "",         false,              "",        dfFloat,         2,     false,     false,     18);
            //mySheet.InitDataProperty(0, 7,        dtData,       80,    daRight,       true  , "",         false,              "",        dfFloat,         2,     false,     false,     18);
            //mySheet.InitDataProperty(0, 8,        dtData,       80,    daRight,       true  , "",         false,              "",        dfFloat,         2,     false,     false,     18);
            //mySheet.InitDataProperty(0, 9,        dtData,       80,    daRight,       true  , "",         false,              "",        dfFloat,         2,     false,     false,     18);
            //mySheet.InitDataProperty(0,10,        dtData,       80,    daRight,       true  , "",         false,              "",        dfFloat,         2,     false,     false,     18);
            //mySheet.InitDataProperty(0,11,        dtData,       80,    daRight,       true  , "",         false,              "",        dfFloat,         2,     false,     false,     18);
            //mySheet.InitDataProperty(0,12,        dtData,       80,    daRight,       true  , "",         false,              "",        dfFloat,         2,     false,     false,     18);
            //mySheet.InitDataProperty(0,13,        dtData,       80,    daRight,       true  , "",         false,              "",        dfFloat,         2,     false,     false,     18);
            //mySheet.InitDataProperty(0,14,        dtData,       80,    daRight,       true  , "",         false,              "",        dfFloat,         2,     false,     false,     18);

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

function callgrap()
{
	initChart();
	if(mySheet.RowCount()<= 0) return;
	
	var title1="합계";
	var title2="수신";
	var title3="여신";
	
	var title1Flag = document.frm.grapyn1.checked;
	var title2Flag = document.frm.grapyn2.checked;
	var title3Flag = document.frm.grapyn3.checked;
	
	var categories = new Array();
	var categorie = strMsHeaders.split("|");
	
	for(var i=2; i<categorie.length; i++) {
		categories.push(categorie[i]);
	}
	
	var seriesArr = new Array();
	var series1 = new Array();
	var series2 = new Array();
	var series3 = new Array();
	
	
	for(var i=2; i<categorie.length; i++) {
		if(title1Flag) {
			series1.push(mySheet.GetCellValue(1, i));
		}
		if(title2Flag) {
			series2.push(mySheet.GetCellValue(4, i));
		}
		if(title3Flag) {
			series3.push(mySheet.GetCellValue(7, i));
		}
	}
	
	if(title1Flag) {
		seriesArr.push({
			type: "line",
		    zIndex: 1,  // z-layer index
		    name : title1,
		    data : series1
		});
	}
	
	if(title2Flag) {
		seriesArr.push({
			type: "line",
		    zIndex: 2,  // z-layer index
		    name : title2,
		    data : series2
		});
	}
	
	if(title3Flag) {
		seriesArr.push({
			type: "line",
		    zIndex: 3,  // z-layer index
		    name : title3,
		    data : series3
		});
	}
	
	
	myChart.setOptions({	
		series: seriesArr,
  		yAxis:[{
  			title:{
				style:{
					fontFamily:"Dotum",
					color:"#15498B"
				},
				text:""
			},
			gridLineColor:"#333333",
			tickColor:"#333333",
			//tickInterval:10.2,
			labels:{
				formatter:function(){
					return this.value;
				},
				style:{
					fontFamily:"Dotum"
				}
			}
			
		}],
		xAxis: [
			{
				categories:categories
  			}
		]
	},{
  		append: true,
		redraw: true
	});	
  /*	
  var basemonth = document.frm.basemonth.value;
  var jumcode = document.frm.jumcode.value;
  var grapyn1 = document.frm.grapyn1.checked ? 1:0;
  var grapyn2 = document.frm.grapyn2.checked ? 1:0;
  var grapyn3 = document.frm.grapyn3.checked ? 1:0;
  var grapyn4 = 0;  // 2013년1월 외환
  var grapyn5 = 0;  // 2013년1월 신용카드 web화면 막음.

  var prt_url = "http://"+location.hostname+":"+location.port +"/kpi/rpop/prt";
  prt_url = prt_url + "/rpop_prt_1060_chart.jsp?basemonth="+basemonth+"&jumcode="+jumcode+"&grapyn1="+grapyn1+"&grapyn2="+grapyn2+"&grapyn3="+grapyn3+"&grapyn4="+grapyn4+"&grapyn5="+grapyn5;
  
  params = "menubar=false&zoom_rate=95&ard_save=false&excel_convert=false&pdf_convert=false&hwp_convert=false&mail_trans=false";
  //embedAI(iframe1, prt_url);
  */
}
