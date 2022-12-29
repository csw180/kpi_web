/*Sheet 기본 설정 */
function LoadPage(){

  //mySheet     = document.frm.mySheet;
  //hiddenGrid  = document.frm.hiddenGrid;
  createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "750px", "400px");

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

  initGrid(); // 개인별PI실적 화면 그리드 초기화  
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
/* Sheet 각종 처리 */
function doAction(sAction)
{
    //mySheet     = document.frm.mySheet;
    //hiddenGrid  = document.frm.hiddenGrid;
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
            if (monthRole != "true") {
            	 hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=6"); 
            }
            else { 
            	 hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=9"); 
            }
            break;

        case "조회":             // 조회(상위 GRID)
            if (monthRole != "true") {
               if(basemonth >= '201306'){
                  alert("2013년6월 이전만 조회 가능합니다.");
                  document.frm.basemonth.focus();
                   return;
              }     
            }        
            mySheet.DoSearch("rpop.scr.rpop_scr_5010.do?hidden_key=0&v_seqgm=0&basemonth="+basemonth+"&jumcode="+jumcode); 
            mySheet.FitSize(false, false);
            break;
            
        case "엑셀내려받기":    // 엑셀내려받기
            inqText       = new Array();
            inqText[0]    = new Array();
            inqText[0][0] = "작업기준년월";
            inqText[0][1] = basemonth;
            // 보안등급세팅
            seqLevel = document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[1]    = new Array();
                inqText[1][0] = "보안등급";
                inqText[1][1] = document.frm.Security_Level.value;
            }
                
            // doExcel(mySheet, inqText, true); //common.js 활용하여 excel 출력

            rExcVal = doExcel(mySheet, inqText, true); //common.js 활용하여 excel 출력
            // 엑셀다운로드시 로그 저장
            /*if(rExcVal) {
               condition = "기준년월="+basemonth;
               hiddenGrid.DoSearch("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"); // gubun 1:rpdy(일일성과) 2:rpop(영업점성과)
            }*/
            break;      
    }
}

function selectmonth()
{
    initGrid();  // 개인별PI실적 화면 그리드 초기화
}

/*--------------------------------------------*/
/* @기능 : 선택된 기준년월에 따른 그리드 init */
/*--------------------------------------------*/        
function initGrid()
{
    basemonth   = document.frm.basemonth.value;

    if (basemonth >= '200909')  setGrid200909();
    else setGrid200908();

}

/*---------------------------------------*/
/* @기능 : 200908월 이전 기준 그리드 set */
/*---------------------------------------*/        
function setGrid200908()
{
  //mySheet = document.frm.mySheet;
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "780px");
  

  // 상위 GRID에 대한 속성정보 설정
   //GridConfig(mySheet);
   mySheet.SetWaitTimeOut(600);
   i=0;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:"순번|성명|직원번호|소속|직급|기중평잔|종합이익|예수금이익|대출금이익|공제이익|신탁이익|펀드이익|외환이익|카드이익|", Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",      Hidden:0,  MinWidth:40,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:70,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Center",   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:140,  Align:"Left",    SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:50,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:80,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
      //지원안함[check again] UnitText="원";
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원");
}

/*---------------------------------------*/
/* @기능 : 200908월 이전 기준 그리드 set */
/*---------------------------------------*/        
function setGrid200909()
{
  //mySheet = document.frm.mySheet;
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  
	// 상위 GRID에 대한 속성정보 설정
  	//GridConfig(mySheet);
  	mySheet.SetWaitTimeOut(600);
  	i=0;

  	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

  	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
  	var headers = [ { Text:"순번|성명|직원번호|소속|직급|기중평잔|종합이익|예수금이익|대출금이익|공제이익|신탁이익|펀드이익|외환이익|카드이익|", Align:"Center"} ];
  	mySheet.InitHeaders(headers, info);

  	var cols = [ {Type:"Text",      Hidden:0,  MinWidth:40,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
         {Type:"Text",      Hidden:0,  MinWidth:70,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
         {Type:"Text",      Hidden:0,  MinWidth:70,   Align:"Center",   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
         {Type:"Text",      Hidden:0,  MinWidth:140,  Align:"Left",    SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
         {Type:"Text",      Hidden:0,  MinWidth:50,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
         {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
   
  	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

  	mySheet.SetEditable(0);
  	mySheet.SetVisible(1);
  	mySheet.SetAutoSumPosition(0);
        //지원안함[check again] UnitText="원";
  	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원");
}