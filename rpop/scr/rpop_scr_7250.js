var isInitBtnEnable = true;
var isInstBtnEnable = true;
var isMofyBtnEnable = false;
var isDelBrnEnable  = false;
var isExcelBtnEnable= true;

/*Sheet 기본 설정 */
function LoadPage(){

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
  	// 기준일 기준으로 광역금융본부  disabled 처리   
    initGrid(); // 총예수금 화면 그리드 초기화  
 	    
    basemonth   = document.frm.basemonth.value;

    // 2015년 대상구분 조회 조건
    if (basemonth == '201501') 
	{
        document.frm.cifgb.value = 1
        document.frm.cifgb.disabled = true;
    } 
	else if (basemonth <= '201506') 
	{
        document.frm.cifgb.disabled = false;
    } 
	else 
	{
        document.frm.cifgb.value = 1
        document.frm.cifgb.disabled = true;
    }
    
    // 2018년 조회구분 조건
    if (basemonth >= '201801') 
	{
        document.frm.sergb.value = 3         // 평잔
        document.frm.sergb.disabled = true;
    } 
	else 
	{    
        document.frm.sergb.disabled = false;
    }
    
    setSergb(); 
}

/*---------------------------------------------------
  조회구분 : 연도별에 따라 조회구분 항목 출력
---------------------------------------------------*/  
function setSergb()
{
    basemonth   = document.frm.basemonth.value;
    
    var sergbArr = new Array();

    if( basemonth >= '201801')
	{
        sergbArr[0] = new Array('3', '반기평잔');
    } 
	else 
	{
    	sergbArr[0] = new Array('2', '잔액');
        sergbArr[1] = new Array('3', '평잔');
    }
	
    setComboFgb(sergbArr);			  
}

function setComboFgb(sergbArr)
{
	el = document.frm.sergb;	
	while(el.options.length > 0){el.options.remove(0);}

	for(i=0;i<parseInt(sergbArr.length);i++)
	{	   
    	var oOption = document.createElement("OPTION");
	  	oOption.value = sergbArr[i][0];
    	oOption.text  = sergbArr[i][1];       
    	el.options.add(oOption);
  	}
}

/* Sheet 각종 처리 */
function doAction(sAction)
{
    isSelected  = true;
    basemonth   = document.frm.basemonth.value;
    sergb       = document.frm.sergb.value;
    cifgb       = document.frm.cifgb.value;
	
    switch(sAction)
    {
        case "고정필드설정":
        	mySheet.SetFrozenCol(mySheet.MouseCol());
			if(basemonth <= "201512")
        		ufSetMergeCell(mySheet, mySheet.HeaderRows(), 0, 1,3);
			else
				ufSetMergeCell(mySheet, mySheet.HeaderRows(), 0, 1,4);
        	break;
        case "고정필드해제":
        	mySheet.SetFrozenCol(0);
			if(basemonth <= "201512")
        		ufSetMergeCell(mySheet, mySheet.HeaderRows(), 0, 1,3);
			else
				ufSetMergeCell(mySheet, mySheet.HeaderRows(), 0, 1,4);
        	break;
        case "기준년월":             // 조회(상위 GRID)
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=7&stmonth=201501");         
            break;
        case "조회":             // 조회(상위 GRID)
            mySheet.DoSearch("rpop.scr.rpop_scr_7250.do?hidden_key=9&basemonth="+basemonth+"&cifgb="+cifgb+"&sergb="+sergb); 
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
            /*if(rExcVal) {
               condition = "기준년월="+basemonth+";대상구분="+cifgb+";조회구분="+sergb;
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
    basemonth  = document.frm.basemonth.value;

    if (basemonth >= '202107') setGrid2021H2();
    else if (basemonth >= '202001') setGrid2020H1();
    else if (basemonth >= '201907') setGrid2019H2();
    else if (basemonth >= '201901') setGrid2019H1();
    else if (basemonth >= '201807') setGrid2018Q3();
    else if (basemonth >= '201801') setGrid2018();
    else if (basemonth >= '201701') setGrid2017();
    else if (basemonth >= '201601') setGrid2016();
    else if (basemonth >= '201507') setGrid2015Q3();
    else setGrid2015();
}

/*------------------------------------------*/
/* @기능 : 2021년도 하반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2021H2()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	
  	basemonth  = document.frm.basemonth.value;
  
	var strHeader0 = 
    	"점번호|점명|RM(영업점)|RM(영업점)|PG명|총금액\n(A)|"                                              // 6
        +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                         // 6
        +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                     // 5
        +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|최종 누증실적\n(E)=(C+D)|"                          // 3
        +"기준실적\n(F)|순증실적\n(G)=(E-F)|목표\n(H)|달성률\n(I)=(G/H)|"                                   // 4
        ;
	
	var strHeader1 = 
    	"점번호|점명|직원번호|성명|PG명|총금액\n(A)|"                                                      // 6
        +"소계|금융기관성|타지점|본부조달|구속성예금|임직원|"                                               // 6
        +"단기신규해지|본부마케팅|독도상품실적|평가제외|기타조정|"                                          // 5
        +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|최종 누증실적\n(E)=(C+D)|"                          // 3
        +"기준실적\n(F)|순증실적\n(G)=(E-F)|목표\n(H)|달성률\n(I)=(G/H)|"                                   // 4
        ;

     mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:4 } );

     var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
     var headers = [ { Text:strHeader0, Align:"Center"},
       				 { Text:strHeader1, Align:"Center"} ];
     mySheet.InitHeaders(headers, info);

     var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
                
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %");
}

/*------------------------------------------*/
/* @기능 : 2020년도 상반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2020H1()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	basemonth  = document.frm.basemonth.value;
  
	var strHeader0 = 
  		"점번호|점명|RM(영업점)|RM(영업점)|PG명|총금액\n(A)|"                                              // 6
        +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                         // 6
        +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                     // 5
        +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|최종 누증실적\n(E)=(C+D)|"                          // 3
        +"기준실적\n(F)|순증실적\n(G)=(E-F)|목표\n(H)|달성률\n(I)=(G/H)|"                                   // 4
        ;

	var strHeader1 = 
    	"점번호|점명|직원번호|성명|PG명|총금액\n(A)|"                                                      // 6
        +"소계|금융기관성|타지점|본부조달|구속성예금|임직원가족|"                                           // 6
        +"단기신규해지|본부마케팅|독도상품실적|평가제외|기타조정|"                                          // 5
        +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|최종 누증실적\n(E)=(C+D)|"                          // 3
        +"기준실적\n(F)|순증실적\n(G)=(E-F)|목표\n(H)|달성률\n(I)=(G/H)|"                                   // 4
        ;

     mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:4 } );

     var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
     var headers = [ { Text:strHeader0, Align:"Center"},
     	             { Text:strHeader1, Align:"Center"} ];
     mySheet.InitHeaders(headers, info);

     var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
                   
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %");
}

/*------------------------------------------*/
/* @기능 : 2019년도 하반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2019H2()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	basemonth  = document.frm.basemonth.value;
  
	var strHeader0 = 
  		"점번호|점명|RM(영업점)|RM(영업점)|PG명|총금액\n(A)|"                                              // 6
        +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                         // 6
        +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                     // 5
        +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|최종 누증실적\n(E)=(C+D)|"                          // 3
        +"기준실적\n(F)|순증실적\n(G)=(E-F)|목표\n(H)|달성률\n(I)=(G/H)|"                                   // 4
        ;

	var strHeader1 = 
    	"점번호|점명|직원번호|성명|PG명|총금액\n(A)|"                                                      // 6
        +"소계|금융기관성|타지점|본부조달|구속성예금|임직원가족|"                                           // 6
        +"단기신규해지|본부마케팅|독도상품실적|평가제외|기타조정|"                                          // 5
        +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|최종 누증실적\n(E)=(C+D)|"                          // 3
        +"기준실적\n(F)|순증실적\n(G)=(E-F)|목표\n(H)|달성률\n(I)=(G/H)|"                                   // 4
        ;

    mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:4 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
      { Text:strHeader1, Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
                
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %");
}

/*------------------------------------------*/
/* @기능 : 2019년도 상반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2019H1()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	basemonth  = document.frm.basemonth.value;
  
	var strHeader0 = 
  		"점번호|점명|RM(영업점)|RM(영업점)|PG명|총금액\n(A)|"                                              // 6
        +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                         // 6
        +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                     // 5
        +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|거액예수금\n 차감(E)|최종 누증실적\n(F)=(C+D+E)|"   // 4
        +"기준실적\n(G)|순증실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)|"                                   // 4
        ;

	var strHeader1 = 
    	"점번호|점명|직원번호|성명|PG명|총금액\n(A)|"                                                      // 6
        +"소계|금융기관성|타지점|본부조달|구속성예금|임직원가족|"                                           // 6
        +"단기신규해지|본부마케팅|독도상품실적|평가제외|기타조정|"                                          // 5
        +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|거액예수금\n 차감(E)|최종 누증실적\n(F)=(C+D+E)|"   // 4
        +"기준실적\n(G)|순증실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)|"                                   // 4
        ;

    mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:4 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
                    { Text:strHeader1, Align:"Center"} ];

    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
                
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %");
}

/*------------------------------------------*/
/* @기능 : 2018년도 하반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2018Q3()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	
  	basemonth  = document.frm.basemonth.value;
  
	var strHeader0 = 
  		"직원번호|성명|점번호|점명|부지점장\nPG명|총금액\n(A)|"                                        // 6
        +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                     // 6
        +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                 // 5
        +"누증실적\n(C)=(A+B)|저원가성\n추가인정(D)|거액예수금\n 차감(E)|최종 누증실적\n(F)=(C+D+E)|"   // 4
        +"기준실적\n(G)|순증실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)|";               // 4

	var strHeader1 = 
    	"직원번호|성명|점번호|점명|부지점장\nPG명|총금액\n(A)|"                                        // 6
        +"소계|금융기관성|타지점|본부조달|구속성예금|임직원가족|"                                       // 6
        +"단기신규해지|본부마케팅|독도상품실적|평가제외|기타조정|"                                      // 5
        +"누증실적\n(C)=(A+B)|저원가성\n추가인정(D)|거액예수금\n 차감(E)|최종 누증실적\n(F)=(C+D+E)|"   // 4
        +"기준실적\n(G)|순증실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)|";               // 4

     mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:4 } );

     var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
     var headers = [ { Text:strHeader0, Align:"Center"},
                     { Text:strHeader1, Align:"Center"} ];

     mySheet.InitHeaders(headers, info);

     var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
     
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %");
}

/*--------------------------------------*/
/* @기능 : 2018년도 기준 그리드 set     */
/*--------------------------------------*/        
function setGrid2018()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	
  	basemonth  = document.frm.basemonth.value;
  
	var strHeader0 =
    	"직원번호|성명|점번호|점명|부지점장\nPG명|총금액|"                    //6
        +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"  // 조정내역13
        +"누증실적\n(C)=(A+B)|저원가성\n추가인정(D)|거액예수금\n 차감(E)|최종 누증실적\n (F)=(C+D+E)|"  //4
        +"기준실적\n(G)|순증실적\n(H)=(F-G)|순증목표\n(I)|달성률\n(J)=(H/I)|";           //4

	var strHeader1 =
    	"직원번호|성명|점번호|점명|부지점장\nPG명|총금액|"                    //6
        +"소계|금융기관성|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|신상품 가중치|신규실적 가중치|평가제외|기타조정|"   // 조정내역 13
        +"누증실적\n(C)=(A+B)|저원가성\n추가인정(D)|거액예수금\n 차감(E)|최종 누증실적\n (F)=(C+D+E)|"  //4
        +"기준실적\n(G)|순증실적\n(H)=(F-G)|순증목표\n(I)|달성률\n(J)=(H/I)|";           //4

     mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:4 } );

     var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
     var headers = [ { Text:strHeader0, Align:"Center"},
                     { Text:strHeader1, Align:"Center"} ];

     mySheet.InitHeaders(headers, info);

     var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
                
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %");
}

/*--------------------------------------*/
/* @기능 : 2017년도 기준 그리드 set     */
/*--------------------------------------*/        
function setGrid2017()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	
  	basemonth  = document.frm.basemonth.value;
  
	var strHeader0 = "";
	var strHeader1 = "";
	
  	if (basemonth >= '201707') 
	{
		strHeader0 = 
        	"직원번호|성명|점번호|점명|부지점장\nPG명|총금액\n(A)|" //5
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"  // 조정내역9
            +"누증실적\n(C)=(A+B)|개인예수금\n추가인정(삭제)|저원가성\n추가인정(D)|개인저원가성\n추가인정(삭제)|거액예수금\n 차감(E)|최종 누증실적\n (F)=(C+D+E)|"  //6
            +"기준실적\n(G)|순증실적\n(H)=(F-G)|순증목표\n(I)|달성률\n(J)=(H/I)|";//4

		strHeader1 =
            "직원번호|성명|점번호|점명|부지점장\nPG명|총금액\n(A)|" //5
            +"소계|금융기관성|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|"  // 조정내역 9
            +"누증실적\n(C)=(A+B)|개인예수금\n추가인정(삭제)|저원가성\n추가인정(D)|개인저원가성\n추가인정(삭제)|거액예수금\n 차감(E)|최종 누증실적\n (F)=(C+D+E)|"  //6
            +"기준실적\n(G)|순증실적\n(H)=(F-G)|순증목표\n(I)|달성률\n(J)=(H/I)|";//4
    }
    else 
	{
		strHeader0 = 
        	"직원번호|성명|점번호|점명|부지점장\nPG명|총금액\n(A)|" //5
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"  // 조정내역9
            +"누증실적\n(C)=(A+B)|개인예수금\n추가인정(D)|저원가성\n추가인정(E)|개인저원가성\n추가인정(F)|거액예수금\n 차감(G)|최종 누증실적\n (H)=(C+D+E+F+G)|"  //6
            +"기준실적\n(I)|순증실적\n(J)=(H-I)|순증목표\n(K)|달성률\n(L)=(J/K)|";//4

		strHeader1 = 
        	"직원번호|성명|점번호|점명|부지점장\nPG명|총금액\n(A)|" //5
            +"소계|금융기관성|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|"  // 조정내역 9
            +"누증실적\n(C)=(A+B)|개인예수금\n추가인정(D)|저원가성\n추가인정(E)|개인저원가성\n추가인정(F)|거액예수금\n 차감(G)|최종 누증실적\n (H)=(C+D+E+F+G)|"  //6
            +"기준실적\n(I)|순증실적\n(J)=(H-I)|순증목표\n(K)|달성률\n(L)=(J/K)|";//4
     }

     mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:4 } );

     var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
     var headers = [ { Text:strHeader0, Align:"Center"},
                     { Text:strHeader1, Align:"Center"} ];

     mySheet.InitHeaders(headers, info);

     var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
	
	if (basemonth >= '201707') 
	{
    	cols.push({Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
        cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
        cols.push({Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    }
    else { //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------'17년상반기
    	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
        cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
        cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	}
	
    cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
 
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %");
}

/*--------------------------------------*/
/* @기능 : 2016년도 기준 그리드 set     */
/*--------------------------------------*/        
function setGrid2016()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	
  	basemonth  = document.frm.basemonth.value;
  
	var strHeader0 = 
		"직원번호|성명|점번호|점명|부지점장\nPG명|총금액\n(A)|" //5
        +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"  // 조정내역10
        +"누증실적\n(C)=(A+B)|개인예수금\n추가인정(D)|중저원가성\n추가인정(E)|거액예수금\n 차감(F)|최종 누증실적\n (G)=(C+D+E+F)|"  //5
        +"기준실적\n(H)|순증실적\n(I)=(G-H)|순증목표\n(J)|달성률\n(K)=(I/J)|";//4

	var strHeader1 = 
    	"직원번호|성명|점번호|점명|부지점장\nPG명|총금액\n(A)|" //5
        +"소계|금융기관성|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|100억초과 조달처|"  // 조정내역 10
        +"누증실적\n(C)=(A+B)|개인예수금\n추가인정(D)|중저원가성\n추가인정(E)|거액예수금\n 차감(F)|최종 누증실적\n (G)=(C+D+E+F)|"  //5
        +"기준실적\n(H)|순증실적\n(I)=(G-H)|순증목표\n(J)|달성률\n(K)=(I/J)|";//4

    mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:4 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
    	            { Text:strHeader1, Align:"Center"} ];

    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
                   
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %");
}

/*---------------------------------------------*/
/* @기능 : 2015년도 하반기 기준 그리드 set     */
/*---------------------------------------------*/        
function setGrid2015Q3()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	
  	basemonth  = document.frm.basemonth.value;

	var strHeader0 = 
   		"직원번호|성명|점번호|점명|총금액\n(A)|" //5
        +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"  // 조정내역11
        +"누증실적\n(C)=(A+B)|개인예수금\n추가인정(D)|중저원가성\n추가인정(E)|거액예수금\n 차감(F)|최종 누증실적\n (G)=(C+D+E+F)|"  //5
        +"기준실적\n(H)|순증실적\n(I)=(G-H)|순증목표\n(J)|달성률\n(K)=(I/J)|";//4

	var strHeader1 =
    	"직원번호|성명|점번호|점명|총금액\n(A)|" //5
        +"소계|금융기관성|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|100억초과 조달처|CIF신규기업고객|"  // 조정내역 11
        +"누증실적\n(C)=(A+B)|개인예수금\n추가인정(D)|중저원가성\n추가인정(E)|거액예수금\n 차감(F)|최종 누증실적\n (G)=(C+D+E+F)|"  //5
        +"기준실적\n(H)|순증실적\n(I)=(G-H)|순증목표\n(J)|달성률\n(K)=(I/J)|";//4

    mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:3 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
                    { Text:strHeader1, Align:"Center"} ];

    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
                
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %");
}

/*---------------------------------------------*/
/* @기능 : 2015년도 기준 그리드 set     */
/*---------------------------------------------*/        
function setGrid2015()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	
  	basemonth  = document.frm.basemonth.value;
  
	var strHeader0 = 
   		"직원번호|성명|점번호|점명|총금액\n(A)|" //5
        +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"  // 조정내역10
        +"누증실적\n(C)=(A+B)|개인예수금\n추가인정(D)|중저원가성\n추가인정(E)|거액예수금\n 차감(F)|최종 누증실적\n (G)=(C+D+E+F)|"  //5
        +"기준실적\n(H)|순증실적\n(I)=(G-H)|순증목표\n(J)|달성률\n(K)=(I/J)|";//4

	var strHeader1 = 
    	"직원번호|성명|점번호|점명|총금액\n(A)|" //5
        +"소계|금융기관성|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|100억초과 조달처|"  // 조정내역 10
        +"누증실적\n(C)=(A+B)|개인예수금\n추가인정(D)|중저원가성\n추가인정(E)|거액예수금\n 차감(F)|최종 누증실적\n (G)=(C+D+E+F)|"  //5
        +"기준실적\n(H)|순증실적\n(I)=(G-H)|순증목표\n(J)|달성률\n(K)=(I/J)|";//4

     mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:3 } );

     var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
     var headers = [ { Text:strHeader0, Align:"Center"},
                     { Text:strHeader1, Align:"Center"} ];

     mySheet.InitHeaders(headers, info);

     var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
                
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %");
}
