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

  //hiddenGrid  = document.frm.hiddenGrid;   // 기본정보
  //hiddGridmon = document.frm.hiddGridmon;  // 정보출력
	createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");
	//createIBSheet2(  document.getElementById("hiddenGridmonObj"),"hiddenGridmon", "200px", "400px");
	
   	hiddenGrid.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:"HIDDEN", Align:"Center"} ];
    hiddenGrid.InitHeaders(headers, info);

    var cols = [ {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
    	{Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
     
    hiddenGrid.InitColumns(cols);
	hiddenGrid.SetVisible(0);
    hiddenGrid.SetEditable(0);
	
	/*
   	hiddenGridmon.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:"점번호|점명|", Align:"Center"} ];
    hiddenGridmon.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
    	{Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" } ];
     
    hiddenGridmon.InitColumns(cols);

    hiddenGridmon.SetEditable(0);
    hiddenGridmon.SetVisible(0);
	*/
	
  	doAction("기준년월");

  	if(isRoleEnable != '1') {
    	doAction("조회");
  	}
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

function selectjumname()
{
    allDelDataGrid(mySheet);
	  showUnitText("원, Point");
    //hiddenGrid  = document.frm.hiddenGrid;
    //hiddGridmon = document.frm.hiddGridmon;
    // 최근 기준년월 가져오기
    //basemonth   = hiddenGridmon.GetCellValue(1, 0);
	  basemonth   = document.frm.basemonth.value;
    v_jumcode   = document.frm.jumcode.value;

    if(v_jumcode != '') hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=1&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
    else{ 
		document.frm.jumname.value = '';
	}
}

function selectsergb()
{   
	  basemonth   = document.frm.basemonth.value;
	  
	  if(basemonth >= '202207')
	  {
    	initGrid();  // 화면 그리드 초기화

	  	allDelDataGrid(mySheet);
	  	showUnitText("원, Point");
	  }
}

function selectmonth()
{
    initGrid();  // 화면 그리드 초기화

	allDelDataGrid(mySheet);
	showUnitText("원, Point");
}



/* Sheet 각종 처리 */
function doAction(sAction)
{
    //mySheet     = document.frm.mySheet;
    //hiddenGrid  = document.frm.hiddenGrid;
    basemonth   = document.frm.basemonth.value;
    jumcode     = document.frm.jumcode.value;
    searchCode  = document.frm.searchCode.value;  // 조회사유코드
    sergb       = document.frm.sergb.value;       // 조회구분코드
        
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
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&stmonth=202006");   
            break;

        case "조회":                 // 조회(상위 GRID)
            if(jumcode == '') {
               alert("점번호를 입력하세요");
               document.frm.jumcode.focus();
               return;
            }
            
            if(searchCode == '00'){
               alert("조회사유코드는 필수입니다.");
               return;
            }
            mySheet.DoSearch("rpop.scr.rpop_scr_3170.do?hidden_key=9&basemonth="+basemonth+"&sergb="+sergb+"&v_jumcode="+jumcode+"&searchCode="+searchCode+"&pg_url="+pg_url); 
            break;
            
        case "엑셀내려받기":    // 엑셀내려받기
            inqText       = new Array();
            inqText[0]    = new Array();
            inqText[0][0] = "기준년월";
            inqText[0][1] = basemonth;
            inqText[1]    = new Array();
            inqText[1][0] = "점명";
            inqText[1][1] = document.frm.jumname.value;
            inqText[2]    = new Array();
            inqText[2][0] = "조회사유코드";
            inqText[2][1] = document.frm.searchCode.options[document.frm.searchCode.selectedIndex].text;
            // 보안등급세팅
            seqLevel = document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[3]    = new Array();
                inqText[3][0] = "보안등급";
                inqText[3][1] = document.frm.Security_Level.value;
            }
            
            rExcVal = doExcelPW(mySheet, inqText, true); //common.js 활용하여 excel 출력

            // 엑셀다운로드시 로그 저장
           /* if(rExcVal) {
               condition = "기준년월="+basemonth+";점번호="+jumcode;
               hiddenGrid.DoSearch("comm.scr.comm_scr_9096.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=1"+"&searchCode="+searchCode+"&pg_url="+pg_url);
            }*/
            break;            

    }
}

/*--------------------------------------------*/
/* @기능 : 선택된 기준월에 따른 그리드 init */
/*--------------------------------------------*/        
function initGrid()
{
    basemonth   = document.frm.basemonth.value;
    sergb   = document.frm.sergb.value;           //조회구분

    if(basemonth >= '202207')
    { 
    	if( sergb == '00' ) setGrid2022H20();       // 전체조회
    	else if( sergb == '01' ) setGrid2022H21();  // 자동이체조회 
    	else if( sergb == '02' ) setGrid2022H22();  // 상품군별 추가 금액
    }
    else if(basemonth >= '202201') setGrid2022H1();     
    else if(basemonth >= '202107') setGrid2021H2();
    else if(basemonth >= '202101') setGrid2021H1();
    else setGrid2020H2();
}


/*-----------------------------------------*/
/* @기능 : 2022년도 하반기 기준 그리드 set */
/*-----------------------------------------*/        
function setGrid2022H20()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  
  // 상위 GRID에 대한 속성정보 설정
    var strHeader0 = "고객번호|고객명|신규고객여부|"
		+"1.여신\n(0.1P/0.2P)\n(A)|2.거치적립식예금\n(0.1P/0.2[)\n(B)|3.저비용성예금\n(0.2P/0.4P)\n(C)|"
    	+"4.외화예금\n(0.1P/0.2P)\n(D)|5.공제\n(0.2P/0.4P)\n(E)|6.공제주력상품\n(0.2P/0.4P)\n(F)|"
        +"7.공제장기상품\n(0.5P/0.5P)\n(G)|"
        +"8.펀드\n(0.2P/0.4P)\n(H)|9.신탁 및 펀드\n(0.2P/0.4P)\n(I)|10.신용카드\n(0.2P/0.4P)\n(0.4P/0.8P)\n(J)|"
        +"11.스마트폰뱅킹\n(0.1P/0.1P)\n(K)|12.펌뱅킹\n(1.0P/1.0P)\n(L)|13.경리나라\n(1.0P/1.0P)\n(M)|"
        +"14.자동이체\n(N)|15.추가판매실적\n(O)|"
        +"최종포인트\n(M)=(A+B+C+D+E+F+G+H+I+J+K+L+M+N+O)|"
        ;
	var strHeader1 = "고객번호|고객명|신규고객여부|"
		+"1.여신\n(0.1P/0.2P)\n(A)|2.거치적립식예금\n(0.1P/0.2[)\n(B)|3.저비용성예금\n(0.2P/0.4P)\n(C)|"
    	+"4.외화예금\n(0.1P/0.2P)\n(D)|5.공제\n(0.2P/0.4P)\n(E)|6.공제주력상품\n(0.2P/0.4P)\n(F)|"
        +"7.공제장기상품\n(0.5P/0.5P)\n(G)|"
        +"8.펀드\n(0.2P/0.4P)\n(H)|9.신탁 및 펀드\n(0.2P/0.4P)\n(I)|10.신용카드\n(0.2P/0.4P)\n(0.4P/0.8P)\n(J)|"
        +"11.스마트폰뱅킹\n(0.1P/0.1P)\n(K)|12.펌뱅킹\n(1.0P/1.0P)\n(L)|13.경리나라\n(1.0P/1.0P)\n(M)|"
        +"14.자동이체\n(N)|15.추가판매실적\n(O)|"
        +"최종포인트\n(M)=(A+B+C+D+E+F+G+H+I+J+K+L+M+N+O)|"
        ;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 }, 
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:200,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 }              
             ];
          
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);
    mySheet.SetEditable(0);
    mySheet.SetDataAutoTrim(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, Point");
}


/*-----------------------------------------*/
/* @기능 : 2022년도 하반기 기준 그리드 set */
/*-----------------------------------------*/        
function setGrid2022H21()   // 자동이체조회 
{
		if(typeof(mySheet) !== "undefined") {
			mySheet.Reset();
		}
	
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  
  	// 상위 GRID에 대한 속성정보 설정
		var strHeader0 = "고객번호|고객명|신규고객여부|"
			+"적금 자동이체|적금 자동이체|적금 자동이체|적금 자동이체|적금 자동이체|적금 자동이체|적금실적(A)|"
			+"펀드 자동이체|펀드 자동이체|펀드 자동이체|펀드 자동이체|펀드 자동이체|펀드 자동이체|펀드실적(B)|"
			+"공제 자동이체|공제 자동이체|공제 자동이체|공제 자동이체|공제 자동이체|공제 자동이체|공제실적(C)|"
    	+"최종실적/n(D)=(A+B+C)|";
		var strHeader1 = "고객번호|고객명|신규고객여부|"
			+"7월|8월|9월|10월|11월|12월|적금실적(A)|"
			+"7월|8월|9월|10월|11월|12월|펀드실적(B)|"
			+"7월|8월|9월|10월|11월|12월|공제실적(C)|"
	    +"최종실적\n(D)=(A+B+C)|";
    
    
		mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
             //적금실적
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             //펀드실적
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 }, 
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             //공제실적
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 }, 
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },             
             //최종실적
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 }
             ];
          
    mySheet.InitColumns(cols);
		mySheet.SetCountPosition(1);
    mySheet.SetEditable(0);
    mySheet.SetDataAutoTrim(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
		newSetActionMenu(mySheet,"엑셀내려받기");
		showUnitText("원, Point");
}

/*-----------------------------------------*/
/* @기능 : 2022년도 하반기 기준 그리드 set */
/*-----------------------------------------*/        
function setGrid2022H22()   // 상품군별 추가 금액 
{
		if(typeof(mySheet) !== "undefined") {
			mySheet.Reset();
		}
	
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  
  	// 상위 GRID에 대한 속성정보 설정
		var strHeader0 = "고객번호|고객명|신규고객여부|구분|6월|7월|8월|9월|10월|11월|12월|실적|";		
    
    
		mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },    //고객번호
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",   ColMerge:1,   SaveName:"NONE" },       //고객명
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",   ColMerge:1,   SaveName:"NONE" },       //신규고객여부
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",   ColMerge:1,   SaveName:"NONE" },       //구분
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",   ColMerge:1,   SaveName:"NONE" },       //6월
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",   ColMerge:1,   SaveName:"NONE" },       //7월
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",   ColMerge:1,   SaveName:"NONE" },       //8월
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",   ColMerge:1,   SaveName:"NONE" },       //9월
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",   ColMerge:1,   SaveName:"NONE" },       //10월
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",   ColMerge:1,   SaveName:"NONE" },       //11월
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",   ColMerge:1,   SaveName:"NONE" },       //12월
             {Type:"AutoSum",  Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 }   //실적
             ];
          
    mySheet.InitColumns(cols);
		mySheet.SetCountPosition(1);
    mySheet.SetEditable(0);
    mySheet.SetDataAutoTrim(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
		newSetActionMenu(mySheet,"엑셀내려받기");
		showUnitText("원, Point");
}


/*-----------------------------------------*/
/* @기능 : 2022년도 상반기 기준 그리드 set */
/*-----------------------------------------*/        
function setGrid2022H1()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  
  // 상위 GRID에 대한 속성정보 설정
    var strHeader0 = "고객번호|고객명|신규고객여부|"
		+"1.여신\n(0.1P/0.2P)\n(A)|2.거치적립식예금\n(0.1P/0.2[)\n(B)|3.저비용성예금\n(0.2P/0.4P)\n(C)|"
    	+"4.외화예금\n(0.1P/0.2P)\n(D)|5.공제\n(0.2P/0.4P)\n(E)|6.공제주력상품\n(0.2P/0.4P)\n(F)|"
        +"7.펀드\n(0.2P/0.4P)\n(G)|8.신탁 및 펀드\n(0.2P/0.4P)\n(H)|9.신용카드\n(0.2P/0.4P)\n(0.4P/0.8P)\n(I)|"
        +"10.스마트폰뱅킹\n(0.1P/0.1P)\n(J)|11.펌뱅킹\n(1.0P/1.0P)\n(K)|12.경리나라\n(1.0P/1.0P)\n(L)|"
        +"최종포인트\n(M)=(A+B+C+D+E+F+G+H+I+J+K+L)|"
        ;
	var strHeader1 = "고객번호|고객명|신규고객여부|"
		+ "1.여신\n(0.1P/0.2P)\n(A)|2.거치적립식예금\n(0.1P/0.2[)\n(B)|3.저비용성예금\n(0.2P/0.4P)\n(C)|"
        +"4.외화예금\n(0.1P/0.2P)\n(D)|5.공제\n(0.2P/0.4P)\n(E)|6.공제주력상품\n(0.2P/0.4P)\n(F)|"
        +"7.펀드\n(0.2P/0.4P)\n(G)|8.신탁 및 펀드\n(0.2P/0.4P)\n(H)|9.신용카드\n(0.2P/0.4P)\n(0.4P/0.8P)\n(I)|"
        +"10.스마트폰뱅킹\n(0.1P/0.1P)\n(J)|11.펌뱅킹\n(1.0P/1.0P)\n(K)|12.경리나라\n(1.0P/1.0P)\n(L)|"
        +"최종포인트\n(M)=(A+B+C+D+E+F+G+H+I+J+K+L)|"
        ;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:200,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
          
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);
    mySheet.SetEditable(0);
    mySheet.SetDataAutoTrim(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, Point");
}

/*-----------------------------------------*/
/* @기능 : 2021년도 하반기 기준 그리드 set */
/*-----------------------------------------*/        
function setGrid2021H2()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
    mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:"고객번호|고객명|신규고객여부|여수신|저비용성|외화예금|신탁|카드|공제|펀드|실적건수|실적점수|원화여신점수", Align:"Center"},
          			{ Text:"고객번호|고객명|신규고객여부|여수신|저비용성|외화예금|신탁|카드|공제|펀드|실적건수|실적점수|원화여신점수", Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
    	{Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
    	{Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
    	{Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
    	{Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
    	{Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
    	{Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
    	{Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
    	{Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
    	{Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
    	{Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    	{Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
    	{Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
     
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetDataAutoTrim(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, Point");
}

/*-----------------------------------------*/
/* @기능 : 2021년도 상반기 기준 그리드 set */
/*-----------------------------------------*/        
function setGrid2021H1()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
    mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:"고객번호|신규고객여부|여수신|저비용성|외화예금|신탁|카드|공제|펀드|실적건수|실적점수|원화여신점수", Align:"Center"},
          			{ Text:"고객번호|신규고객여부|여수신|저비용성|외화예금|신탁|카드|공제|펀드|실적건수|실적점수|원화여신점수", Align:"Center"} ];

    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	  {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
	  {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
	  {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
	  {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
	  {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
	  {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
	  {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
	  {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
	  {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	  {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	  {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
     
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetDataAutoTrim(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, Point");
}

/*-----------------------------------------*/
/* @기능 : 2020년도 하반기 기준 그리드 set */
/*-----------------------------------------*/        
function setGrid2020H2()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
    mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:"고객번호|신규고객여부|거치적립식|평가여신|외화예금|신탁|카드|공제|펀드|실적건수|실적점수|원화여신점수", Align:"Center"},
          			{ Text:"고객번호|신규고객여부|거치적립식|평가여신|외화예금|신탁|카드|공제|펀드|실적건수|실적점수|원화여신점수", Align:"Center"} ];

    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	  {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
	  {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
	  {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
	  {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
	  {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
	  {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
	  {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
	  {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"NONE" },
	  {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	  {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	  {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
     
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetDataAutoTrim(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
                   
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, Point");
}
