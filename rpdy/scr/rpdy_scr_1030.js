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

  //hiddGridmon에 대한 속성정보 설정
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
               hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_1030.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=98");
            } else {
               hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_1030.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=99");
            }*/
            break;
        case "조회":             // 조회(상위 GRID)
            mySheet.DoSearch("rpdy.scr.rpdy_scr_1030.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=0"+"&metrogb="+metrogb);
            //mySheet.FitSize(false, true);
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
    
    if (baseday >= '20180101')  setGrid2018();
    else if (baseday >= '20160101')  setGrid2016();
    else if (baseday >= '20150701')  setGrid2015Q3();
    else if (baseday >= '20150101')  setGrid2015();
    else setGrid2014();

}

/*------------------------------*/
/* @기능 : 2018년도 그리드 set  */
/*------------------------------*/        
function setGrid2018()
{
   //mySheet.RemoveAll();
   mySheet.Reset();

   createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

   // 상위 GRID에 대한 속성정보 설정

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );
   
   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:"점번호|점명|PG명|스마트폰뱅킹가입고객|스마트폰뱅킹가입고객|스마트폰뱅킹가입고객|SH딩동가입고객|SH딩동가입고객|SH딩동가입고객|", Align:"Center"},
               { Text:"점번호|점명|PG명|목표|실적|평점/배점|목표|실적|평점/배점|", Align:"Center"} ];
   mySheet.InitHeaders(headers, info);
   
   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"AutoSum",   Hidden:0, MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
          {Type:"AutoSum",   Hidden:0, MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
          {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"AutoSum",   Hidden:0, MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
          {Type:"AutoSum",   Hidden:0, MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
          {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" } ];
    
   mySheet.InitColumns(cols);
   
   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="건, %";
   showUnitText("건, %");
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*------------------------------*/
/* @기능 : 2016년도 그리드 set  */
/*------------------------------*/        
function setGrid2016()
{
   //mySheet.RemoveAll();
   mySheet.Reset();
   createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );
   
   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:"점번호|점명|PG명|인터넷뱅킹|인터넷뱅킹|인터넷뱅킹|스마트폰뱅킹|스마트폰뱅킹|스마트폰뱅킹|PUSH서비스|PUSH서비스|PUSH서비스", Align:"Center"},
               { Text:"점번호|점명|PG명|목표\n(A)|실적\n(B)|달성률\n(C)=(B/A)|목표\n(A)|실적\n(B)|달성률\n(C)=(B/A)|목표\n(A)|실적\n(B)|달성률\n(C)=(B/A)", Align:"Center"} ];
   mySheet.InitHeaders(headers, info);
   
   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"AutoSum",   Hidden:0, MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:60,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:60,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:60,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);
   
   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="건, %";
   showUnitText("건, %");
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*-------------------------------------*/
/* @기능 : 2015년도 하반기 그리드 set  */
/*-------------------------------------*/        
function setGrid2015Q3()
{
   //mySheet.RemoveAll();
   mySheet.Reset();
   createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정
   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );
   
   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:"점번호|점명|PG명|ShCashPlus|ShCashPlus|ShCashPlus|스마트폰뱅킹|스마트폰뱅킹|스마트폰뱅킹|", Align:"Center"},
               { Text:"점번호|점명|PG명|목표\n(A)|실적\n(B)|달성률\n(C)=(B/A)|목표\n(A)|실적\n(B)|달성률\n(C)=(B/A)|", Align:"Center"} ];
   mySheet.InitHeaders(headers, info);
   
   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);
   //HeadRowHeight = 35;
   //DataLinkMouse = true;
   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="건, %";
   showUnitText("건, %");
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*-------------------------------*/
/* @기능 : 2015년도 그리드 set   */
/*-------------------------------*/        
function setGrid2015()
{
   //mySheet.RemoveAll();
   mySheet.Reset();
   createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정
   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );
  	
   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:"점번호|점명|PG명|인터넷뱅킹|인터넷뱅킹|인터넷뱅킹|스마트폰뱅킹|스마트폰뱅킹|스마트폰뱅킹|", Align:"Center"},
                 { Text:"점번호|점명|PG명|목표\n(A)|실적\n(B)|달성률\n(C)=(B/A)|목표\n(A)|실적\n(B)|달성률\n(C)=(B/A)|", Align:"Center"} ];
   mySheet.InitHeaders(headers, info);
  	
   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);
    //HeadRowHeight = 35;
    //DataLinkMouse = true;
   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="건, %";
   showUnitText("건, %");
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*------------------------------*/
/* @기능 : 2014년도 그리드 set  */
/*------------------------------*/        
function setGrid2014()
{
   //mySheet.RemoveAll();
   mySheet.Reset();
   createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

   // 상위 GRID에 대한 속성정보 설정
   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );
  
   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:"점번호|점명|PG명|목표\n(A)|실적\n(B)|달성률\n(C)=(B/A)|", Align:"Center"} ];
   mySheet.InitHeaders(headers, info);
  
   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);
  
   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetHeaderRowHeight(35);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="건, %";
   showUnitText("건, %");
   newSetActionMenu(mySheet,"엑셀내려받기");
}