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
    
  initGrid();
  
  doAction("기준일");
 
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
    initGrid();

    //allDelDataGrid(mySheet);
	showUnitText("Point, %");
    
    // 최근 기준년월 가져오기
    basemonth=hiddGridmon.GetCellValue(1, 0);
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=7");
    metrogbhiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=49");
}

/* Sheet 각종 처리 */
function doAction(sAction)
{
    isSelected=true;
    baseday=document.frm.baseday.value;
    pgcode=document.frm.pgcode.value;
    metrogb=document.frm.metrogb.value;
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
            // 기준년월 정보 (최근 기준년월)
            hiddGridmon.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&superFlg=Y");
            /*// 기준일자 정보
            if(isRoleEnable == '1') {
            	 // 전산정보부 및 성과 담당자
               hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_1380.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=98");
            } else {
               hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_1380.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=99");
            }*/
            break;
        case "조회":             // 조회(상위 GRID)
            if (pgcode != '16') {
                mySheet.DoSearch("rpdy.scr.rpdy_scr_1380.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=1"+"&metrogb="+metrogb); //xwp_rpdy_N일일고객관계지표프로시져사용(구분코드3" );
                //mySheet.FitSize(false, true);
            } else {
                alert("금융본부는 신규기업예수금고객 실적(금융본부) 에서 확인하시기 바랍니다.");
            }
            break;
        case "엑셀내려받기":    // 엑셀내려받기
            inqText=new Array();
            inqText[0]=new Array();
            inqText[0][0]="기준일";
            inqText[0][1]=baseday;            
            inqText[1]=new Array();
            inqText[1][0]="PG명";
            inqText[1][1]=document.frm.pgcode.options[document.frm.pgcode.selectedIndex].text;
            inqText[2]=new Array();
            inqText[2][0]="광역금융본부";
            inqText[2][1]=document.frm.metrogb.options[document.frm.metrogb.selectedIndex].text;
            // 보안등급세팅
            seqLevel=document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[3]=new Array();
                inqText[3][0]="보안등급";
                inqText[3][1]=document.frm.Security_Level.value;
            }
            rExcVal=doExcel(mySheet, inqText, -1); //common.js 활용하여 excel 출력
            /*// 엑셀다운로드시 로그 저장
            if(rExcVal) {
               condition="기준일="+baseday+";PG코드="+pgcode+";광역금융본부="+metrogb;
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

    /*if (baseday >= '20210701') setGrid2021H2();
    else */
	if (baseday >= '20220101') setGrid2022();
    else if (baseday >= '20210101') setGrid2021H1();
    else if (baseday >= '20190701') setGrid2019H2();

}

/*------------------------------------*/
/* @기능 : 2022년도 상반기 그리드 set */
/*------------------------------------*/        
function setGrid2022()
{
  	mySheet.Reset();
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  // 상위 GRID에 대한 속성정보 설정
    var strHeader0 = "점번호|점명|PG명|개인|개인|개인|기업 및 신탁사|기업 및 신탁사|기업 및 신탁사|기업 및 신탁사|기업 및 신탁사|";
    var strHeader1 = "점번호|점명|PG명|실적\n(A)|목표\n(B)|달성률\n(C)=(A/B)|실적\n(A)|신탁사 실적\n(B)|최종실적\n(C)=(A+B)|목표\n(D)|달성률\n(E)=(C/D)|";

    mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
       
    mySheet.InitColumns(cols);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetHeaderRowHeight(30);
    mySheet.SetCountPosition(1); 
   	showUnitText("Point, %");
	newSetActionMenu(mySheet,"엑셀내려받기");
}

/*------------------------------------*/
/* @기능 : 2021년도 하반기 그리드 set */
/*------------------------------------*/        
/*function setGrid2021H2()
{
  mySheet = document.frm.mySheet;
  //mySheet.RemoveAll();
  mySheet.Reset();

  // 상위 GRID에 대한 속성정보 설정
  with (mySheet)
  {
    //전체 너비 설정
    SheetWidth = 900;
  
    //Host정보 설정[필수][HostIp, Port, PagePath]
    if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
  
    //전체Merge 종류 [선택, Default msNone]
    MergeSheet = msHeaderOnly;
  
    //전체Edit 허용 여부 [선택, Default false]
    Editable = false;
  
    //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
    InitRowInfo(1 , 1, 22);
    
    //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
    InitColumnInfo( 9, 3, 0, true); 

    //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
    InitHeadRow(0, 
        "점번호|점명|PG명|개인실적\n(A)|기업실적\n(B)|신탁사실적\n(C)|합산실적\n(D)=(A+B+C)|목표\n(E)|달성률\n(F)=(D/E)|", true); 

       
    //데이터속성[ROW,COL,       DATATYPE,    WIDTH,  DATAALIGN,  COLMERGE,    SAVENAME,              KEYFIELD,      CALCULOGIC,     DATAFORMAT,POINTCOUNT,UPDATEEDIT,INSERTEDIT,EDITLEN,FULLINPUT,SORTENABLE,TOOLTIP,ALLCHECK, SAVESTATUS, FORMATFIX]    
    i = 0;
    InitDataProperty(0,i++,        dtData,       50,   daCenter,      true); // 0 점번호
    InitDataProperty(0,i++,        dtData,       80,   daCenter,      true); // 1 점명
    InitDataProperty(0,i++,        dtData,       70,   daCenter,      true); // 2 PG명

    InitDataProperty(0,i++,        dtAutoSum,   100,    daRight,      true  , "",         false,              "",    dfNullFloat,         1,     false,     false,     18); // 3  개인실적 
    InitDataProperty(0,i++,        dtAutoSum,   100,    daRight,      true  , "",         false,              "",    dfNullFloat,         1,     false,     false,     18); // 4  기업실적
    InitDataProperty(0,i++,        dtAutoSum,   100,    daRight,      true  , "",         false,              "",    dfNullFloat,         1,     false,     false,     18); // 5  신탁사실적 
    InitDataProperty(0,i++,        dtAutoSum,   100,    daRight,      true  , "",         false,              "",    dfNullFloat,         1,     false,     false,     18); // 6  합산실적
    InitDataProperty(0,i++,        dtAutoSum,   100,    daRight,      true  , "",         false,              "",    dfNullFloat,         1,     false,     false,     18); // 7  목표
    InitDataProperty(0,i++,        dtData,       80,    daRight,      true  , "",         false,              "",    dfNullFloat,         1,     false,     false,     18); // 8  달성률
    
    InitHeadMode(true);
    HeadRowHeight = 30;
    //DataLinkMouse = true;
    Visible = true;
    UnitText= "Point, %";                    
    ActionMenu = "엑셀내려받기"
    AutoSumBottom = false;
  }
}*/

/*------------------------------------*/
/* @기능 : 2021년도 상반기 그리드 set */
/*------------------------------------*/        
function setGrid2021H1()
{
   
  mySheet.Reset();

  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정
   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:"점번호|점명|PG명|개인실적\n(A)|기업실적\n(B)|신탁사실적\n(C)|외화예수금실적\n(D)|합산실적\n(E)=(A+B+C+D)|목표\n(F)|달성률\n(G)=(E/F)|", Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetHeaderRowHeight(30);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="Point, %";
   showUnitText("Point, %");
   newSetActionMenu(mySheet,"엑셀내려받기");
}


/*------------------------------------*/
/* @기능 : 2019년도 하반기 그리드 set */
/*------------------------------------*/        
function setGrid2019H2()
{
   
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정
   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:"점번호|점명|PG명|개인실적\n(A)|기업실적\n(B)|합산실적\n(C)=(A)+(B)|목표\n(D)|달성률\n(E)=(C/D)|", Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetHeaderRowHeight(30);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="Point, %";
   showUnitText("Point, %");
   newSetActionMenu(mySheet,"엑셀내려받기");
}

