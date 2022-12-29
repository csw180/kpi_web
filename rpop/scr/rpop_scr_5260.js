/*Sheet 기본 설정 */
function LoadPage()
{
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

function sel_WideCode()
{
    basemonth   = document.frm.basemonth.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=49"); // 광역금융본부명
}

function selectmonth()
{
    initGrid();

    basemonth   = document.frm.basemonth.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=7&pggubun=1"); //PG코드

    setSergb();
}

/*---------------------------------------------------
  조회구분 : 연도별에 따라 조회구분 항목 출력
---------------------------------------------------*/
function setSergb()
{
	basemonth   = document.frm.basemonth.value;
    pgcode      = document.frm.pgcode.value;

    var sergbArr = new Array();
    
    sergbArr[0] = new Array('2', '잔액');
    
    setComboFgb(sergbArr);
}

function setComboFgb(sergbArr){
	el = document.frm.sergb;
	while(el.options.length > 0){el.options.remove(0);}

	for(i=0;i<parseInt(sergbArr.length);i++){
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
    pgcode      = document.frm.pgcode.value;
    WideCode    = document.frm.WideCode.value;
    sergb       = document.frm.sergb.value;

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
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&stmonth=202110");
            break;
        case "조회":             // 조회(상위 GRID)
            mySheet.DoSearch("rpop.scr.rpop_scr_5260.do?hidden_key=9&basemonth="+basemonth+"&pgcode="+pgcode+"&WideCode="+WideCode+"&sergb="+sergb);
            break;
        case "엑셀내려받기":    // 엑셀내려받기
            inqText       = new Array();
            inqText[0]    = new Array();
            inqText[0][0] = "기준년월";
            inqText[0][1] = basemonth;
            inqText[1]    = new Array();
            inqText[1][0] = "PG명";
            inqText[1][1] = document.frm.pgcode.options[document.frm.pgcode.selectedIndex].text;
            inqText[2]    = new Array();
            inqText[2][0] = "광역금융본부";
            inqText[2][1] = document.frm.WideCode.options[document.frm.WideCode.selectedIndex].text;
            inqText[3]    = new Array();
            inqText[3][0] = "조회구분";
            inqText[3][1] = document.frm.sergb.options[document.frm.sergb.selectedIndex].text;
            // 보안등급세팅
            seqLevel = document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[4]    = new Array();
                inqText[4][0] = "보안등급";
                inqText[4][1] = document.frm.Security_Level.value;
            }

            rExcVal = doExcel(mySheet, inqText, -1); //common.js 활용하여 excel 출력
            // 엑셀다운로드시 로그 저장
            /*if(rExcVal) {
               condition = "기준년월="+basemonth+";PG코드="+pgcode+";조회구분="+sergb;
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

    if(basemonth >= '202110') setGrid2021H2();

    setSergb();

    document.frm.sergb.disabled = true;
}

/*-------------------------------------*/
/* @기능 : 2021년도 하반기 그리드 set  */
/*-------------------------------------*/
function setGrid2021H2()
{
  	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	basemonth = document.frm.basemonth.value;
  	pgcode    = document.frm.pgcode.value;

  // 상위 GRID에 대한 속성정보 설정

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   	var strHeader0 =  
    	"점번호|점명|PG명|"                                                                                                  
    	+"대출금\n순증실적\n(A)|경영현안\n순증실적\n(B)|경영현안차감\n순증실적\n(C)=(A-B)|경영현안반영\n밴드범위이탈금액\n(D)=(C-F)|"
   		+"경영현안미반영\n밴드범위이탈금액\n(E)=(A-F)|밴드범위\n(F)|최종밴드범위\n이탈금액\n(G)=MIN(D,E)";
   	var strHeader1 =  
   		"점번호|점명|PG명|"
    	+"대출금\n순증실적\n(A)|경영현안\n순증실적\n(B)|경영현안차감\n순증실적\n(C)=(A-B)|경영현안반영\n밴드범위이탈금액\n(D)=(C-F)|"
  		+"경영현안미반영\n밴드범위이탈금액\n(E)=(A-F)|밴드범위\n(F)|최종밴드범위\n이탈금액\n(G)=MIN(D,E)";

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                    { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %");
}