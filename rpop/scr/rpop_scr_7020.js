
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

  //hiddenGrid  = document.frm.hiddenGrid;
	createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");
	
  // Hidden GRID에 대한 속성정보 설정
  //지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);

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

  	initGrid(); // 연체율 화면 그리드 초기화

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
    //hiddenGrid  = document.frm.hiddenGrid;
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
    initGrid();  // 연체율 화면 그리드 초기화

    //hiddenGrid  = document.frm.hiddenGrid;
    basemonth   = document.frm.basemonth.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=7&pggubun=3");
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
        	ufSetMergeCell(mySheet);
        	break;
        case "고정필드해제":
        	mySheet.SetFrozenCol(0);
        	ufSetMergeCell(mySheet);
        	break;
        case "기준년월":             // 조회(상위 GRID)
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&stmonth=201201");
            break;
        case "조회":             // 조회(상위 GRID)
            mySheet.DoSearch("rpop.scr.rpop_scr_7020.do?hidden_key=9&basemonth="+basemonth+"&pgcode="+pgcode+"&period="+4);
            // mySheet.FitSize(false, true);
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
               condition = "기준년월="+basemonth+";PG코드="+pgcode;
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

         if (basemonth <= '201206') setGrid2012();
         else if (basemonth <= '201212') setGrid201207();
         else if (basemonth <= '201312') setGrid2013();
         else if (basemonth <= '201406') setGrid2014();
         else if (basemonth <= '201412') setGrid2014Q3();
         else if (basemonth <= '201502') setGrid2015();
         else if (basemonth <= '201506') setGrid2015Q1();
         else if (basemonth <= '201512') setGrid2015Q3();
         else if (basemonth <= '201606') setGrid2016();
         else if (basemonth <= '201612') setGrid2016Q3();
         else if (basemonth <= '201706') setGrid2017();
         else if (basemonth <= '201712') setGrid2017Q3();
         else if (basemonth <= '201806') setGrid2018();
         else if (basemonth <= '201812') setGrid2018Q3();
         else if (basemonth <= '201906') setGrid2019H1();
         else if (basemonth <= '201912') setGrid2019H2();
         else if (basemonth <= '202006') setGrid2020H1();
         else if (basemonth <= '202012') setGrid2020H2();
         else if (basemonth <= '202106') setGrid2021H1();
         else if (basemonth <= '202109') setGrid2021H2();
         else if (basemonth <= '202112') setGrid2021Q4();
         else setGrid2022H1();
}

/*------------------------------------------*/
/* @기능 : 2022년도 상반기 기준 그리드 set   */
/*------------------------------------------*/
function setGrid2022H1()
{
	basemonth   = document.frm.basemonth.value;
	month   = document.frm.basemonth.value.substring(4,6);
	
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	
	var strHeader0 = "소속점번호|소속점명|점번호|RM(본부)|RM(본부)|RM(본부)|PG명|"
      +"반기이익(대손전)|반기이익(대손전)|반기이익(대손전)|반기이익(대손전)|"
      +"반기이익(대손후)|반기이익(대손후)|반기이익(대손후)|반기이익(대손후)|"
      +"신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|"
      +"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"
      +"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"
      +"저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|"
      +"저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|"
      +"핵심예수금(반기평잔)|핵심예수금(반기평잔)|핵심예수금(반기평잔)|핵심예수금(반기평잔)|"
      +"핵심예수금(월중평잔)|핵심예수금(월중평잔)|핵심예수금(월중평잔)|핵심예수금(월중평잔)|"
      +"대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|"
      +"연체관리|연체관리|"
      ;
	var strHeader1 = "소속점번호|소속점명|점번호|직원번호|직급|성명|PG명|"         //점관련                           7
      +"목표|실적|달성률|평점/배점|"                                 //반기이익(대손전)                 4
      +"목표|실적|달성률|평점/배점|"                                 //반기이익(대손후)                 4
      +"목표|실적|신탁사실적|최종실적|달성률|평점/배점|"             //신규 예수금 고객                 6
      +"목표|실적|달성률|평점/배점|"                                 //예수금(반기평잔)                 4
      +"목표|실적|달성률|평점/배점|"                                 //예수금(순증잔액)                 4
      +"목표|실적|달성률|평점/배점|"                                 //저비용성예수금(반기평잔)         4
      +"목표|실적|달성률|평점/배점|"                                 //저비용성예수금(순증잔액)         4
      +"목표|실적|달성률|평점/배점|"                                 //핵심예수금(반기평잔)             4
      +"목표|실적|달성률|평점/배점|"                                 //핵심예수금(순증잔액)             4
      +"목표|실적|달성률|평점/배점|"                                 //대출금(순증잔액)                 4
      +"연체율|평점/배점|"                                           //연체관리                         2
      ;

  // 상위 GRID에 대한 속성정보 설정
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6 } );
	
	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
	          { Text:strHeader1, Align:"Center"} ];
	mySheet.InitHeaders(headers, info);
	
	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	    {Type:"Text",     Hidden:0,  MinWidth:120,  Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	    {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	    {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	    {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	    {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	    {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
	 
	mySheet.InitColumns(cols);
	
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetDataLinkMouse(true);
	mySheet.SetCountPosition(1);
	//지원안함[check again] UnitText="원, %, 점수";
	showUnitText("원, %, 점수");
	newSetActionMenu(mySheet,"엑셀내려받기");
}

/*------------------------------------------*/
/* @기능 : 2021년도 4분기 기준 그리드 set   */
/*------------------------------------------*/
function setGrid2021Q4()
{
  	basemonth   = document.frm.basemonth.value;
  	month   = document.frm.basemonth.value.substring(4,6);

	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = "소속점번호|소속점명|점번호|RM(본부)|RM(본부)|RM(본부)|PG명|"
    	+"반기이익(대손전)|반기이익(대손전)|반기이익(대손전)|반기이익(대손전)|"
      	+"반기이익(대손후)|반기이익(대손후)|반기이익(대손후)|반기이익(대손후)|"
      	+"신규고객이익|신규고객이익|신규고객이익|신규고객이익|"
      	+"종합비이자이익|종합비이자이익|종합비이자이익|종합비이자이익|"
      	+"신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|"
      	+"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"
      	+"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"
      	+"저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|"
      	+"저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|"
      	+"대출금(순증잔액_최종밴드평가)|대출금(순증잔액_최종밴드평가)|대출금(순증잔액_최종밴드평가)|대출금(순증잔액_최종밴드평가)|"
      	+"연체관리|연체관리|"
      	+"주거래기업(펌뱅킹)|주거래기업(펌뱅킹)|주거래기업(펌뱅킹)|주거래기업(펌뱅킹)|"
      	+"경영현안_대출금|경영현안_대출금|경영현안_대출금|경영현안_대출금|"
      	;

	var strHeader1 = "소속점번호|소속점명|점번호|직원번호|직급|성명|PG명|"         //점관련                           7
    	+"목표|실적|달성률|평점/배점|"                                 //반기이익(대손전)                 4
      	+"목표|실적|달성률|평점/배점|"                                 //반기이익(대손후)                 4
      	+"목표|실적|달성률|평점/배점|"                                 //신규고객이익                     4
      	+"목표|실적|달성률|평점/배점|"                                 //종합비이자이익                   4
      	+"목표|원화|외화|신탁|합산|달성률|평점/배점|"                  //신규 예수금 고객                 7
      	+"목표|실적|달성률|평점/배점|"                                 //예수금(반기평잔)                 4
      	+"목표|실적|달성률|평점/배점|"                                 //예수금(순증잔액)                 4
      	+"목표|실적|달성률|평점/배점|"                                 //저비용성예수금(반기평잔)         4
      	+"목표|실적|달성률|평점/배점|"                                 //저비용성예수금(순증잔액)         4
      	+"밴드범위|실적|밴드범위이탈금액|평점/배점|"                   //대출금(순증잔액_최종밴드평가)    4
      	+"연체율|평점/배점|"                                           //연체관리                         2
      	+"목표|실적|달성률|평점/배점|"                                 //주거래기업(펌뱅킹)               4
      	+"목표|실적|달성률|평점/배점|"                                 //경영현안_대출금                  4
        ;


	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6 } );

    var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
                    { Text:strHeader1, Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  Width:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  Width:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  Width:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  Width:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  Width:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  Width:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  Width:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  Width:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  Width:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:undefined,   Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:undefined,     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  Width:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  Width:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  Width:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  Width:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  Width:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
       
    mySheet.InitColumns(cols);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
    newSetActionMenu(mySheet,"엑셀내려받기");

	mySheet.SetCountPosition(1); 
	showUnitText("원, %, 점수");
}

/*------------------------------------------*/
/* @기능 : 2021년도 하반기 기준 그리드 set  */
/*------------------------------------------*/
function setGrid2021H2()
{
  	basemonth   = document.frm.basemonth.value;
  	month   = document.frm.basemonth.value.substring(4,6);
	
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
	   "소속점번호|소속점명|점번호|RM(본부)|RM(본부)|RM(본부)|PG명|"
	   +"반기이익(대손전)|반기이익(대손전)|반기이익(대손전)|반기이익(대손전)|"
	   +"반기이익(대손후)|반기이익(대손후)|반기이익(대손후)|반기이익(대손후)|"
	   +"신규고객이익|신규고객이익|신규고객이익|신규고객이익|"
	   +"종합비이자이익|종합비이자이익|종합비이자이익|종합비이자이익|"
	   +"신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|"
	   +"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"
	   +"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"
	   +"저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|"
	   +"저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|"
	   +"대출금(순증잔액_밴드평가)|대출금(순증잔액_밴드평가)|대출금(순증잔액_밴드평가)|대출금(순증잔액_밴드평가)|"
	   +"연체관리|연체관리|"
	   +"주거래기업(펌뱅킹)|주거래기업(펌뱅킹)|주거래기업(펌뱅킹)|주거래기업(펌뱅킹)|"
	   ;

	var strHeader1 = 
	   "소속점번호|소속점명|점번호|직원번호|직급|성명|PG명|"         //점관련                     7
	   +"목표|실적|달성률|평점/배점|"                                 //반기이익(대손전)           4
	   +"목표|실적|달성률|평점/배점|"                                 //반기이익(대손후)           4
	   +"목표|실적|달성률|평점/배점|"                                 //신규고객이익               4
	   +"목표|실적|달성률|평점/배점|"                                 //종합비이자이익             4
	   +"목표|원화|외화|신탁|합산|달성률|평점/배점|"                  //신규 예수금 고객           7
	   +"목표|실적|달성률|평점/배점|"                                 //예수금(반기평잔)           4
	   +"목표|실적|달성률|평점/배점|"                                 //예수금(순증잔액)           4
	   +"목표|실적|달성률|평점/배점|"                                 //저비용성예수금(반기평잔)   4
	   +"목표|실적|달성률|평점/배점|"                                 //저비용성예수금(순증잔액)   4
	   +"밴드범위|실적|밴드범위이탈금액|평점/배점|"                   //대출금(순증잔액_밴드평가)  4
	   +"연체율|평점/배점|"                                           //연체관리                   2
	   +"목표|실적|달성률|평점/배점|"                                 //주거래기업(펌뱅킹)         4
	   ;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6 } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                    { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:120,  Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");

	mySheet.SetCountPosition(1); 
	showUnitText("원, %, 점수");
}

/*------------------------------------------*/
/* @기능 : 2021년도 상반기 기준 그리드 set  */
/*------------------------------------------*/
function setGrid2021H1()
{
  	basemonth   = document.frm.basemonth.value;
  	month   = document.frm.basemonth.value.substring(4,6);
  //mySheet = document.frm.mySheet;
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
  	var strHeader0 = 
	   "소속점번호|소속점명|점번호|RM(본부)|RM(본부)|RM(본부)|PG명|"
	   +"반기이익(대손전)|반기이익(대손전)|반기이익(대손전)|반기이익(대손전)|"
	   +"반기이익(대손후)|반기이익(대손후)|반기이익(대손후)|반기이익(대손후)|"
	   +"신규고객이익|신규고객이익|신규고객이익|신규고객이익|"
	   +"종합비이자이익|종합비이자이익|종합비이자이익|종합비이자이익|"
	   +"신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|"
	   +"신규 기업대출금 고객|신규 기업대출금 고객|신규 기업대출금 고객|신규 기업대출금 고객|"
	   +"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"
	   +"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"
	   +"저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|"
	   +"저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|"
	   +"대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|"
	   +"연체관리|연체관리|"
	   +"주거래기업(펌뱅킹)|주거래기업(펌뱅킹)|주거래기업(펌뱅킹)|주거래기업(펌뱅킹)|"
	   ;

	var strHeader1 =
	   "소속점번호|소속점명|점번호|직원번호|직급|성명|PG명|"         //점관련                     7
	   +"목표|실적|달성률|평점/배점|"                                 //반기이익(대손전)           4
	   +"목표|실적|달성률|평점/배점|"                                 //반기이익(대손후)           4
	   +"목표|실적|달성률|평점/배점|"                                 //신규고객이익               4
	   +"목표|실적|달성률|평점/배점|"                                 //종합비이자이익             4
	   +"목표|실적|달성률|평점/배점|"                                 //신규 예수금 고객           4
	   +"목표|실적|달성률|평점/배점|"                                 //신규 기업대출금 고객       4
	   +"목표|실적|달성률|평점/배점|"                                 //예수금(반기평잔)           4
	   +"목표|실적|달성률|평점/배점|"                                 //예수금(순증잔액)           4
	   +"목표|실적|달성률|평점/배점|"                                 //저비용성예수금(반기평잔)   4
	   +"목표|실적|달성률|평점/배점|"                                 //저비용성예수금(순증잔액)   4
	   +"목표|실적|달성률|평점/배점|"                                 //대출금(순증잔액)           4
	   +"연체율|평점/배점|"                                           //연체관리                   2
	   +"목표|실적|달성률|평점/배점|"                                 //주거래기업(펌뱅킹)         4
	   ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6 } );

   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:120,  Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %, 점수");
}

/*------------------------------------------*/
/* @기능 : 2020년도 하반기 기준 그리드 set  */
/*------------------------------------------*/
function setGrid2020H2()
{
  	basemonth   = document.frm.basemonth.value;
  	month   = document.frm.basemonth.value.substring(4,6);

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
	  "소속점번호|소속점명|점번호|RM(본부)|RM(본부)|RM(본부)|PG명|"
	   +"반기이익(대손전)|반기이익(대손전)|반기이익(대손전)|반기이익(대손전)|"
	   +"반기이익(대손후)|반기이익(대손후)|반기이익(대손후)|반기이익(대손후)|"
	   +"신규고객이익|신규고객이익|신규고객이익|신규고객이익|"
	   +"종합비이자이익|종합비이자이익|종합비이자이익|종합비이자이익|"
	   +"신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|"
	   +"신규 기업대출금 고객|신규 기업대출금 고객|신규 기업대출금 고객|신규 기업대출금 고객|"
	   +"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"
	   +"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"
	   +"저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|"
	   +"저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|"
	   +"대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|"
	   +"연체관리|연체관리|"
	   +"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"
	   +"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"
	   ;
	
	var strHeader1 =
	   "소속점번호|소속점명|점번호|직원번호|직급|성명|PG명|"         //점관련                   7
	   +"목표|실적|달성률|평점/배점|"                                 //반기이익(대손전)         4
	   +"목표|실적|달성률|평점/배점|"                                 //반기이익(대손후)         4
	   +"목표|실적|달성률|평점/배점|"                                 //신규고객이익             4
	   +"목표|실적|달성률|평점/배점|"                                 //종합비이자이익           4
	   +"목표|실적|달성률|평점/배점|"                                 //신규 예수금 고객         4
	   +"목표|실적|달성률|평점/배점|"                                 //신규 기업대출금 고객     4
	   +"목표|실적|달성률|평점/배점|"                                 //예수금(반기평잔)         4
	   +"목표|실적|달성률|평점/배점|"                                 //예수금(순증잔액)         4
	   +"목표|실적|달성률|평점/배점|"                                 //저비용성예수금(반기평잔) 4
	   +"목표|실적|달성률|평점/배점|"                                 //저비용성예수금(순증잔액) 4
	   +"목표|실적|달성률|평점/배점|"                                 //대출금(순증잔액)         4
	   +"연체율|평점/배점|"                                           //연체관리                 2
	   +"목표|실적|달성률|평점/배점|"                                 //개인예수금(반기평잔)     4
	   +"목표|실적|달성률|평점/배점|"                                 //개인예수금(순증잔액)     4
	   ;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6 } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];

   	mySheet.InitHeaders(headers, info);

	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:120,  Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %, 점수");
}

/*------------------------------------------*/
/* @기능 : 2020년도 상반기 기준 그리드 set  */
/*------------------------------------------*/
function setGrid2020H1()
{
  	basemonth   = document.frm.basemonth.value;
  	month   = document.frm.basemonth.value.substring(4,6);

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
  		"소속점번호|소속점명|점번호|RM(본부)|RM(본부)|RM(본부)|PG명|"
   		+"반기이익(대손전)|반기이익(대손전)|반기이익(대손전)|반기이익(대손전)|"
   		+"반기이익(대손후)|반기이익(대손후)|반기이익(대손후)|반기이익(대손후)|"
   		+"신규고객이익|신규고객이익|신규고객이익|신규고객이익|"
   		+"종합비이자이익|종합비이자이익|종합비이자이익|종합비이자이익|"
   		+"신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|"
   		+"신규 기업대출금 고객|신규 기업대출금 고객|신규 기업대출금 고객|신규 기업대출금 고객|"
   		+"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"
   		+"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"
   		+"저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|"
   		+"저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|"
   		+"대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|"
   		+"연체관리|연체관리|"
   		;

	var strHeader1 = 
   		"소속점번호|소속점명|점번호|직원번호|직급|성명|PG명|"         //점관련                   7
   		+"목표|실적|달성률|평점/배점|"                                 //반기이익(대손전)         4
   		+"목표|실적|달성률|평점/배점|"                                 //반기이익(대손후)         4
   		+"목표|실적|달성률|평점/배점|"                                 //신규고객이익             4
   		+"목표|실적|달성률|평점/배점|"                                 //종합비이자이익           4
   		+"목표|실적|달성률|평점/배점|"                                 //신규 예수금 고객         4
   		+"목표|실적|달성률|평점/배점|"                                 //신규 기업대출금 고객     4
   		+"목표|실적|달성률|평점/배점|"                                 //예수금(반기평잔)         4
   		+"목표|실적|달성률|평점/배점|"                                 //예수금(순증잔액)         4
   		+"목표|실적|달성률|평점/배점|"                                 //저비용성예수금(반기평잔) 4
   		+"목표|실적|달성률|평점/배점|"                                 //저비용성예수금(순증잔액) 4
   		+"목표|실적|달성률|평점/배점|"                                 //대출금(순증잔액)         4
   		+"연체율|평점/배점|"                                           //연체관리                 2
   		;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6 } );

   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:120,  Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %, 점수");
}

/*------------------------------------------*/
/* @기능 : 2019년도 하반기 기준 그리드 set  */
/*------------------------------------------*/
function setGrid2019H2()
{
  	basemonth   = document.frm.basemonth.value;
  	month   = document.frm.basemonth.value.substring(4,6);

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
		"소속점번호|소속점명|점번호|RM(본부)|RM(본부)|RM(본부)|PG명|"
	   	+"종합이익|종합이익|종합이익|종합이익|"
	   	+"신규고객이익|신규고객이익|신규고객이익|신규고객이익|"
	   	+"종합비이자이익|종합비이자이익|종합비이자이익|종합비이자이익|"
	   	+"신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|"
	   	+"신규 기업대출금 고객|신규 기업대출금 고객|신규 기업대출금 고객|신규 기업대출금 고객|"
	   	+"연체관리|연체관리|"
	   	+"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"
	   	+"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"
	   	+"저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|"
	   	+"저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|"
	   	+"대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|"
	   	;
	
	var strHeader1 =
	   "소속점번호|소속점명|점번호|직원번호|직급|성명|PG명|"         //점관련                   7
	   +"목표|실적|달성률|평점/배점|"                                 //종합이익                 4
	   +"목표|실적|달성률|평점/배점|"                                 //신규고객이익             4
	   +"목표|실적|달성률|평점/배점|"                                 //종합비이자이익           4
	   +"목표|실적|달성률|평점/배점|"                                 //신규 기업예수금 고객     4
	   +"목표|실적|달성률|평점/배점|"                                 //신규 기업대출금 고객     4
	   +"연체율|평점/배점|"                                           //연체관리                 2
	   +"목표|실적|달성률|평점/배점|"                                 //예수금(반기평잔)         4
	   +"목표|실적|달성률|평점/배점|"                                 //예수금(순증잔액)         4
	   +"목표|실적|달성률|평점/배점|"                                 //저비용성예수금(반기평잔) 4
	   +"목표|실적|달성률|평점/배점|"                                 //저비용성예수금(순증잔액) 4
	   +"목표|실적|달성률|평점/배점|"                                 //대출금(순증잔액)         4
	   ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:6 } );

   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:120,  Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %, 점수");
}

/*------------------------------------------*/
/* @기능 : 2019년도 상반기 기준 그리드 set  */
/*------------------------------------------*/
function setGrid2019H1()
{
  	basemonth   = document.frm.basemonth.value;
  	month   = document.frm.basemonth.value.substring(4,6);

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
	  "소속점번호|소속점명|점번호|RM(센터)|RM(센터)|PG명|"
	   +"종합이익|종합이익|종합이익|종합이익|"
	   +"신규고객이익|신규고객이익|신규고객이익|신규고객이익|"
	   +"종합비이자이익|종합비이자이익|종합비이자이익|종합비이자이익|"
	   +"신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|"
	   +"신규 기업대출금 고객|신규 기업대출금 고객|신규 기업대출금 고객|신규 기업대출금 고객|"
	   +"연체관리|연체관리|"
	   +"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"
	   +"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"
	   +"저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|"
	   +"저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|"
	   +"대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|"
	   ;

	var strHeader1 = 
	   "소속점번호|소속점명|점번호|직원번호|성명|PG명|"              //점관련                   6
	   +"목표|실적|달성률|평점/배점|"                                 //종합이익                 4
	   +"목표|실적|달성률|평점/배점|"                                 //신규고객이익             4
	   +"목표|실적|달성률|평점/배점|"                                 //종합비이자이익           4
	   +"목표|실적|달성률|평점/배점|"                                 //신규 기업예수금 고객     4
	   +"목표|실적|달성률|평점/배점|"                                 //신규 기업대출금 고객     4
	   +"연체율|평점/배점|"                                           //연체관리                 2
	   +"목표|실적|달성률|평점/배점|"                                 //예수금(반기평잔)         4
	   +"목표|실적|달성률|평점/배점|"                                 //예수금(순증잔액)         4
	   +"목표|실적|달성률|평점/배점|"                                 //저비용성예수금(반기평잔) 4
	   +"목표|실적|달성률|평점/배점|"                                 //저비용성예수금(순증잔액) 4
	   +"목표|실적|달성률|평점/배점|"                                 //대출금(순증잔액)         4
	   ;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:120,  Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %, 점수");
}

/*------------------------------------------*/
/* @기능 : 2018년도 하반기 기준 그리드 set  */
/*------------------------------------------*/
function setGrid2018Q3()
{
  	basemonth   = document.frm.basemonth.value;
  	month   = document.frm.basemonth.value.substring(4,6);

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
	
	var strHeader0 = "";
	var strHeader1 = "";
	
  // 상위 GRID에 대한 속성정보 설정
  	if(basemonth>='201807' && basemonth<='201808')    // 신탁사업(재산신탁) hidden 처리
   	{
   		strHeader0 = 
		   "소속점번호|점번호|점명|PG명|"
		   +"종합이익|종합이익|종합이익|종합이익|"
		   +"종합비이자이익|종합비이자이익|종합비이자이익|종합비이자이익|"
		   +"신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|"
		   +"연체관리|연체관리|"
		   +"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"
		   +"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"
		   +"대출금(신규잔액)|대출금(신규잔액)|대출금(신규잔액)|대출금(신규잔액)|"
		   +"외환사업|외환사업|외환사업|외환사업|"
		   +"카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|"
		   +"신탁사업|신탁사업|신탁사업|신탁사업|"
		   +"신탁사업(재산신탁)|신탁사업(재산신탁)|신탁사업(재산신탁)|신탁사업(재산신탁)|"
		   ;
		strHeader1 = 
		   "소속점번호|점번호|점명|PG명|"                                //점관련                   4
		   +"목표|실적|달성률|평점/배점|"                                 //종합이익                 4
		   +"목표|실적|달성률|평점/배점|"                                 //종합비이자이익           4
		   +"목표|실적|달성률|평점/배점|"                                 //신규 기업예수금 고객     4
		   +"연체율|평점/배점|"                                           //연체관리                 2
		   +"목표|실적|달성률|평점/배점|"                                 //예수금(반기평잔)         4
		   +"목표|실적|달성률|평점/배점|"                                 //예수금(순증잔액)         4
		   +"목표|실적|달성률|평점/배점|"                                 //대출금(신규잔액)         4
		   +"목표|실적|달성률|평점/배점|"                                 //외환사업                 4
		   +"목표|실적|달성률|평점/배점|"                                 //카드사업(매출액)         4
		   +"목표|실적|달성률|평점/배점|"                                 //신탁사업                 4
		   +"목표|실적|달성률|평점/배점|"                                 //신탁사업(재산신탁)       4
		   ;
   	}
   	else
   	{
		strHeader0 = 
		   "소속점번호|점번호|점명|PG명|"
		   +"종합이익|종합이익|종합이익|종합이익|"
		   +"종합비이자이익|종합비이자이익|종합비이자이익|종합비이자이익|"
		   +"신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|신규 기업예수금 고객|"
		   +"연체관리|연체관리|"
		   +"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"
		   +"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"
		   +"대출금(신규잔액)|대출금(신규잔액)|대출금(신규잔액)|대출금(신규잔액)|"
		   +"외환사업|외환사업|외환사업|외환사업|"
		   +"카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|"
		   +"신탁사업(특정금전)|신탁사업(특정금전)|신탁사업(특정금전)|신탁사업(특정금전)|"
		   +"신탁사업(재산신탁)|신탁사업(재산신탁)|신탁사업(재산신탁)|신탁사업(재산신탁)|"
		   ;
		strHeader1 = 
		   "소속점번호|점번호|점명|PG명|"                                //점관련                   4
		   +"목표|실적|달성률|평점/배점|"                                 //종합이익                 4
		   +"목표|실적|달성률|평점/배점|"                                 //종합비이자이익           4
		   +"목표|실적|달성률|평점/배점|"                                 //신규 기업예수금 고객     4
		   +"연체율|평점/배점|"                                           //연체관리                 2
		   +"목표|실적|달성률|평점/배점|"                                 //예수금(반기평잔)         4
		   +"목표|실적|달성률|평점/배점|"                                 //예수금(순증잔액)         4
		   +"목표|실적|달성률|평점/배점|"                                 //대출금(신규잔액)         4
		   +"목표|실적|달성률|평점/배점|"                                 //외환사업                 4
		   +"목표|실적|달성률|평점/배점|"                                 //카드사업(매출액)         4
		   +"목표|실적|달성률|평점/배점|"                                 //신탁사업(특정금전)       4
		   +"목표|실적|달성률|평점/배점|"                                 //신탁사업(재산신탁)       4
		   ;
   	}

   	i=0;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];

   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:140,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
	
	if(basemonth>='201807'&&basemonth<='201808')    // 신탁사업(재산신탁) hidden 처리
   	{
   		mySheet.SetColHidden(42,1);
   		mySheet.SetColHidden(43,1);
   		mySheet.SetColHidden(44,1);
   		mySheet.SetColHidden(45,1);
   	}
 
	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %, 점수");
}

/*------------------------------------------*/
/* @기능 : 2018년도 기준 그리드 set         */
/*------------------------------------------*/
function setGrid2018()
{
  	basemonth   = document.frm.basemonth.value;
  	month   = document.frm.basemonth.value.substring(4,6);

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
	   "소속점번호|점번호|점명|PG명|"
	   +"종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|"
	   +"외환이익|외환이익|외환이익|외환이익|"
	   +"신규핵심고객|신규핵심고객|신규핵심고객|신규핵심고객|"
	   +" 연체율 | 연체율 |"
	   +"소매예수금(반기평잔)|소매예수금(반기평잔)|소매예수금(반기평잔)|소매예수금(반기평잔)|"
	   +"소매예수금(순증잔액)|소매예수금(순증잔액)|소매예수금(순증잔액)|소매예수금(순증잔액)|"
	   +"기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|"
	   +"기업예수금(월중평잔)|기업예수금(월중평잔)|기업예수금(월중평잔)|기업예수금(월중평잔)|"
	   +"소매대출금(순증잔액)|소매대출금(순증잔액)|소매대출금(순증잔액)|소매대출금(순증잔액)|"
	   +"기업대출금(순증잔액)|기업대출금(순증잔액)|기업대출금(순증잔액)|기업대출금(순증잔액)|"
	   +"외환사업|외환사업|외환사업|외환사업|"
	   +"카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|"
	   +"신탁사업|신탁사업|신탁사업|신탁사업|"
	   ;

	var strHeader1
	   "소속점번호|점번호|점명|PG명|"                                //점관련                       4
	   +"목표|실적|달성도|평점/배점|"                                 //영업점총이익(충당금반영후)   4
	   +"목표|실적|달성도|평점/배점|"                                 //외환이익                     4
	   +"목표|실적|달성도|평점/배점|"                                 //신규핵심고객                 4
	   +"연체율|평점/배점|"                                           //연체율                       2
	   +"목표|실적|달성도|평점/배점|"                                 //소매예수금(반기평잔)         4
	   +"목표|실적|달성도|평점/배점|"                                 //소매예수금(순증잔액)         4
	   +"목표|실적|달성도|평점/배점|"                                 //기업예수금(반기평잔)         4
	   +"목표|실적|달성도|평점/배점|"                                 //기업예수금(월중평잔)         4
	   +"목표|실적|달성도|평점/배점|"                                 //소매대출금(순증잔액)         4
	   +"목표|실적|달성도|평점/배점|"                                 //기업대출금(순증잔액)         4
	   +"목표|실적|달성도|평점/배점|"                                 //외환사업                     4
	   +"목표|실적|달성도|평점/배점|"                                 //카드사업(매출액)             4
	   +"목표|실적|달성도|평점/배점|"                                 //신탁사업                     4
	   ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:140,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %, 점수");
}

/*------------------------------------------*/
/* @기능 : 2017년도 하반기 기준 그리드 set  */
/*------------------------------------------*/
function setGrid2017Q3()
{
  	basemonth   = document.frm.basemonth.value;
  	month   = document.frm.basemonth.value.substring(4,6);

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
	   "소속점번호|점번호|점명|PG명|"
	   +"종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|"
	   +"외환이익|외환이익|외환이익|외환이익| 연체율 | 연체율 |"
	   +"총예수금(순증잔액)|총예수금(순증잔액)|총예수금(순증잔액)|총예수금(순증잔액)|"
	   +"총예수금(반기평잔)|총예수금(반기평잔)|총예수금(반기평잔)|총예수금(반기평잔)|"
	   +"총예수금(월중평잔)|총예수금(월중평잔)|총예수금(월중평잔)|총예수금(월중평잔)|"
	   +"중저원가성예금(반기평잔)|중저원가성예금(반기평잔)|중저원가성예금(반기평잔)|중저원가성예금(반기평잔)|"
	   +"예 대 율|예 대 율|예 대 율|"
	   +"일반여신(신규잔액)|일반여신(신규잔액)|일반여신(신규잔액)|일반여신(신규잔액)|"
	   +"외환사업|외환사업|외환사업|외환사업|"
	   +"카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)"
	   ;
	var strHeader1 = 
	   "소속점번호|점번호|점명|PG명|"                                //점관련                       4
	   +"목표|실적|달성도|평점/배점|"                                 //영업점총이익(충당금반영후)   4
	   +"목표|실적|달성도|평점/배점|"                                 //외환이익                     4
	   +"연체율|평점/배점|"                                           //연체율                       2
	   +"목표|실적|달성도|평점/배점|"                                 //총예수금 잔액                4
	   +"목표|실적|달성도|평점/배점|"                                 //총예수금 반기평잔            4
	   +"목표|실적|달성도|평점/배점|"                                 //총예수금 월중평잔            4
	   +"목표|실적|달성도|평점/배점|"                                 //중저원가성예금평잔           4
	   +"예대율|총예수금달성율|평점/배점|"                            //예대율                       3
	   +"목표|실적|달성도|평점/배점|"                                 //대출금 신규잔액              4
	   +"목표|실적|달성도|평점/배점|"                                 //외환사업                     4
	   +"목표|실적|달성도|평점/배점|"                                 //카드사업(매출액)             4
	   ;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:140,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
	if( basemonth == '201706' || basemonth == '201712' ) {
   		cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   		cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   		cols.push({Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   		cols.push({Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	} else {
   		cols.push({Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   		cols.push({Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   		cols.push({Type:"Text",      Hidden:1, MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   		cols.push({Type:"Text",      Hidden:1, MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	}

   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
 
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %, 점수");
}

/*-----------------------------------*/
/* @기능 : 2017년도 기준 그리드 set  */
/*-----------------------------------*/
function setGrid2017()
{
  	basemonth   = document.frm.basemonth.value;
  	month   = document.frm.basemonth.value.substring(4,6);

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
	  "소속점번호|점번호|점명|PG명|"
	   +"종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|"
	   +"외환이익|외환이익|외환이익|외환이익| 연체율 | 연체율 |"
	   +"총예수금(순증잔액)|총예수금(순증잔액)|총예수금(순증잔액)|총예수금(순증잔액)|"
	   +"총예수금(반기평잔)|총예수금(반기평잔)|총예수금(반기평잔)|총예수금(반기평잔)|"
	   +"총예수금(월중평잔)|총예수금(월중평잔)|총예수금(월중평잔)|총예수금(월중평잔)|"
	   +"중저원가성예금(반기평잔)|중저원가성예금(반기평잔)|중저원가성예금(반기평잔)|중저원가성예금(반기평잔)|"
	   +"예 대 율|예 대 율|예 대 율|RORWA|RORWA|"
	   +"일반여신(순증잔액)|일반여신(순증잔액)|일반여신(순증잔액)|일반여신(순증잔액)|"
	   +"외환사업|외환사업|외환사업|외환사업|"
	   +"카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)"
	   ;

	var strHeader1 = 
	   "소속점번호|점번호|점명|PG명|"                                //점관련                       4
	   +"목표|실적|달성도|평점/배점|"                                 //영업점총이익(충당금반영후)   4
	   +"목표|실적|달성도|평점/배점|"                                 //외환이익                     4
	   +"연체율|평점/배점|"                                           //연체율                       2
	   +"목표|실적|달성도|평점/배점|"                                 //총예수금 잔액                4
	   +"목표|실적|달성도|평점/배점|"                                 //총예수금 반기평잔            4
	   +"목표|실적|달성도|평점/배점|"                                 //총예수금 월중평잔            4
	   +"목표|실적|달성도|평점/배점|"                                 //중저원가성예금평잔           4
	   +"예대율|총예수금달성율|평점/배점|"                            //예대율                       3
	   +"실적|평점/배점|"                                             //RORWA                        2
	   +"목표|실적|달성도|평점/배점|"                                 //대출금 신규잔액              4
	   +"목표|실적|달성도|평점/배점|"                                 //외환사업                     4
	   +"목표|실적|달성도|평점/배점|"                                 //카드사업(매출액)             4
	   ;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:140,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
	if( basemonth == '201706' || basemonth == '201712' ) {
	   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	   	cols.push({Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	   	cols.push({Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    } else {
   		cols.push({Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    	cols.push({Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    	cols.push({Type:"Text",      Hidden:1, MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    	cols.push({Type:"Text",      Hidden:1, MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    }

    cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
 
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %, 점수");
}

/*------------------------------------------*/
/* @기능 : 2016년도 하반기 기준 그리드 set  */
/*------------------------------------------*/
function setGrid2016Q3()
{
  	month   = document.frm.basemonth.value.substring(4,6);

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
  		"소속점번호|점번호|점명|PG명|"
   		+"종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|"
   		+"외환이익|외환이익|외환이익|외환이익|"
   		+"거치/적립식예금 (평잔)|거치/적립식예금 (평잔)|거치/적립식예금 (평잔)|거치/적립식예금 (평잔)|"
   		+"중저원가성예금 (평잔)|중저원가성예금 (평잔)|중저원가성예금 (평잔)|중저원가성예금 (평잔)|"
   		+"RORWA|RORWA|"
   		+"대출금 (신규잔액)|대출금 (신규잔액)|대출금 (신규잔액)|대출금 (신규잔액)|"
   		+"외환사업|외환사업|외환사업|외환사업|"
   		+"카드사업(신용카드매출액)|카드사업(신용카드매출액)|카드사업(신용카드매출액)|카드사업(신용카드매출액)|"
   		+"카드사업(법인카드매출액)|카드사업(법인카드매출액)|카드사업(법인카드매출액)|카드사업(법인카드매출액)|"
   		;

	var strHeader1 = 
   		"소속점번호|점번호|점명|PG명|"                                //점관련                       4
   		+"목표|실적|달성도|평점/배점|"                                 //영업점총이익(충당금반영후)   4
   		+"목표|실적|달성도|평점/배점|"                                 //외환이익                     4
   		+"목표|실적|달성도|평점/배점|"                                 //거치/적립식예금평잔          4
   		+"목표|실적|달성도|평점/배점|"                                 //중저원가성예금평잔           4
   		+"실적|평점/배점|"                                             //RORWA              2
   		+"목표|실적|달성도|평점/배점|"                                 //대출금평잔         4
   		+"목표|실적|달성도|평점/배점|"                                 //외환사업           4
   		+"목표|실적|달성도|평점/배점|"                                 //카드사업(신용카드매출액) 4
   		+"목표|실적|달성도|평점/배점|"                                 //카드사업(법인카드매출액) 4
   		;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:140,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %, 점수");
}

/*----------------------------------------*/
/* @기능 : 2016년도 기준 그리드 set       */
/*----------------------------------------*/
function setGrid2016()
{
  	month   = document.frm.basemonth.value.substring(4,6);

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
		"소속점번호|점번호|점명|PG명|"
	   	+"종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|"
	   	+"외환이익|외환이익|외환이익|외환이익|"
	   	+"거치/적립식예금 (평잔)|거치/적립식예금 (평잔)|거치/적립식예금 (평잔)|거치/적립식예금 (평잔)|"
	   	+"중저원가성예금 (평잔)|중저원가성예금 (평잔)|중저원가성예금 (평잔)|중저원가성예금 (평잔)|"
	   	+"대출금 (순증잔액)|대출금 (순증잔액)|대출금 (순증잔액)|대출금 (순증잔액)|"
	   	+"대출금 (신규잔액)|대출금 (신규잔액)|대출금 (신규잔액)|대출금 (신규잔액)|"
	   	+"외환사업|외환사업|외환사업|외환사업|"
	   	+"카드사업(신용카드매출액)|카드사업(신용카드매출액)|카드사업(신용카드매출액)|카드사업(신용카드매출액)|"
	   	;

	var strHeader1 =
		"소속점번호|점번호|점명|PG명|"                                //점관련                       4
	   	+"목표|실적|달성도|평점/배점|"                                 //영업점총이익(충당금반영후)   4
	   	+"목표|실적|달성도|평점/배점|"                                 //외환이익                     4
	   	+"목표|실적|달성도|평점/배점|"                                 //거치/적립식예금평잔          4
	   	+"목표|실적|달성도|평점/배점|"                                 //중저원가성예금평잔           4
	   	+"목표|실적|달성도|평점/배점|"                                 //대출금잔액         4
	   	+"목표|실적|달성도|평점/배점|"                                 //대출금평잔         4
	   	+"목표|실적|달성도|평점/배점|"                                 //외환사업           4
	   	+"목표|실적|달성도|평점/배점|"                                 //카드사업(신용카드매출액) 4
	   	;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:140,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %, 점수");
}

/*-----------------------------------------------*/
/* @기능 : 2015년도 하반기 기준 그리드 set       */
/*-----------------------------------------------*/
function setGrid2015Q3()
{
  	month   = document.frm.basemonth.value.substring(4,6);

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
		"소속점번호|점번호|점명|PG명|"
	   	+"종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|"
	   	+"외환이익|외환이익|외환이익|외환이익|"
	   	+"거치/적립식예금 (평잔)|거치/적립식예금 (평잔)|거치/적립식예금 (평잔)|거치/적립식예금 (평잔)|"
	   	+"중저원가성예금 (평잔)|중저원가성예금 (평잔)|중저원가성예금 (평잔)|중저원가성예금 (평잔)|"
	   	+"대출금 (잔액)|대출금 (잔액)|대출금 (잔액)|대출금 (잔액)|"
	   	+"대출금 (평잔)|대출금 (평잔)|대출금 (평잔)|대출금 (평잔)|"
	   	+"외환사업|외환사업|외환사업|외환사업|"
	   	+"카드사업(유효회원)|카드사업(유효회원)|카드사업(유효회원)|카드사업(유효회원)|"
	   	+"카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|"
	   	+"기업핵심고객수"
	   	;

	var strHeader1 = 
		"소속점번호|점번호|점명|PG명|"                                //점관련                       4
	   	+"목표|실적|달성도|평점/배점|"                                 //영업점총이익(충당금반영후)   4
	   	+"목표|실적|달성도|평점/배점|"                                 //외환이익                     4
	   	+"목표|실적|달성도|평점/배점|"                                 //거치/적립식예금평잔          4
	   	+"목표|실적|달성도|평점/배점|"                                 //중저원가성예금평잔           4
	   	+"목표|실적|달성도|평점/배점|"                                 //대출금잔액         4
	   	+"목표|실적|달성도|평점/배점|"                                 //대출금평잔         4
	   	+"목표|실적|달성도|평점/배점|"                                 //외환사업           4
	   	+"목표|실적|달성도|평점/배점|"                                 //카드사업(유효회원) 4
	   	+"목표|실적|달성도|평점/배점|"                                 //카드사업(매출액)   4
	   	+"평점/배점"                                                   //기업핵심고객수     1
	   	;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:140,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %, 점수");
}

/*------------------------------------------------*/
/* @기능 : 2015년도 3월이후 기준 그리드 set       */
/*------------------------------------------------*/
function setGrid2015Q1()
{
  	month   = document.frm.basemonth.value.substring(4,6);

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
 	

  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
  		"소속점번호|점번호|점명|PG명|"
   		+"종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|"
   		+"외환이익|외환이익|외환이익|외환이익|"
   		+"거치/적립식예금 (평잔)|거치/적립식예금 (평잔)|거치/적립식예금 (평잔)|거치/적립식예금 (평잔)|"
   		+"중저원가성예금 (평잔)|중저원가성예금 (평잔)|중저원가성예금 (평잔)|중저원가성예금 (평잔)|"
   		+"대출금 (잔액)|대출금 (잔액)|대출금 (잔액)|대출금 (잔액)|"
   		+"대출금 (평잔)|대출금 (평잔)|대출금 (평잔)|대출금 (평잔)|"
   		+"외환사업|외환사업|외환사업|외환사업|"
   		+"카드사업|카드사업|카드사업|카드사업|"
   		+"기업핵심고객수"
   		;

	var strHeader1 = 
    	"소속점번호|점번호|점명|PG명|"                                //점관련                       4
   		+"목표|실적|달성도|평점/배점|"                                 //영업점총이익(충당금반영후)   4
   		+"목표|실적|달성도|평점/배점|"                                 //외환이익                     4
   		+"목표|실적|달성도|평점/배점|"                                 //거치/적립식예금평잔          4
   		+"목표|실적|달성도|평점/배점|"                                 //중저원가성예금평잔           4
   		+"목표|실적|달성도|평점/배점|"                                 //대출금잔액         4
   		+"목표|실적|달성도|평점/배점|"                                 //대출금평잔         4
   		+"목표|실적|달성도|평점/배점|"                                 //외환사업           4
   		+"목표|실적|달성도|평점/배점|"                                 //카드사업           4
   		+"평점/배점"                                                   //기업핵심고객수     1
   		;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:140,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %, 점수");
}

/*------------------------------------------------*/
/* @기능 : 2015년도 기준 그리드 set        */
/*------------------------------------------------*/
function setGrid2015()
{
  	month   = document.frm.basemonth.value.substring(4,6);

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
		"소속점번호|점번호|점명|PG명|"
	   	+"종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|"
	   	+"외환이익|외환이익|외환이익|외환이익|"
	   	+"거치/적립식예금 (평잔)|거치/적립식예금 (평잔)|거치/적립식예금 (평잔)|거치/적립식예금 (평잔)|"
	   	+"중저원가성예금 (평잔)|중저원가성예금 (평잔)|중저원가성예금 (평잔)|중저원가성예금 (평잔)|"
	   	+"대출금 (잔액)|대출금 (잔액)|대출금 (잔액)|대출금 (잔액)|"
	   	+"대출금 (평잔)|대출금 (평잔)|대출금 (평잔)|대출금 (평잔)|"
	   	+"외환사업|외환사업|외환사업|외환사업|"
	   	+"카드사업|카드사업|카드사업|카드사업"
	   	;
	
	var strHeader1 =
		"소속점번호|점번호|점명|PG명|"                                //점관련                       4
	   	+"목표|실적|달성도|평점/배점|"                                 //영업점총이익(충당금반영후)   4
	   	+"목표|실적|달성도|평점/배점|"                                 //외환이익                     4
	   	+"목표|실적|달성도|평점/배점|"                                 //거치/적립식예금평잔          4
	   	+"목표|실적|달성도|평점/배점|"                                 //중저원가성예금평잔           4
	   	+"목표|실적|달성도|평점/배점|"                                 //대출금잔액         4
	   	+"목표|실적|달성도|평점/배점|"                                 //대출금평잔         4
	   	+"목표|실적|달성도|평점/배점|"                                 //외환사업           4
	   	+"목표|실적|달성도|평점/배점|"                                 //카드사업           4
	   	;		

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:140,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %, 점수");
}

/*------------------------------------------------*/
/* @기능 : 2014년도 하반기 기준 그리드 set        */
/*------------------------------------------------*/
function setGrid2014Q3()
{
  	month   = document.frm.basemonth.value.substring(4,6);

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	

  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
		"소속점번호|점번호|점명|PG명|"
	   	+"종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|"
	   	+"외환이익|외환이익|외환이익|외환이익|"
	   	+"거치/적립식예금 (평잔)|거치/적립식예금 (평잔)|거치/적립식예금 (평잔)|거치/적립식예금 (평잔)|"
	   	+"중저원가성예금 (평잔)|중저원가성예금 (평잔)|중저원가성예금 (평잔)|중저원가성예금 (평잔)|"
	   	+"대출금 (잔액)|대출금 (잔액)|대출금 (잔액)|대출금 (잔액)|"
	   	+"대출금 (평잔)|대출금 (평잔)|대출금 (평잔)|대출금 (평잔)|"
	   	+"외환사업|외환사업|외환사업|외환사업"
	   	;

	var strHeader1 = 
		"소속점번호|점번호|점명|PG명|"                                //점관련                       4
	   	+"목표|실적|달성도|평점/배점|"                                 //영업점총이익(충당금반영후)   4
	   	+"목표|실적|달성도|평점/배점|"                                 //외환이익                     4
	   	+"목표|실적|달성도|평점/배점|"                                 //거치/적립식예금평잔          4
	   	+"목표|실적|달성도|평점/배점|"                                 //중저원가성예금평잔           4
	   	+"목표|실적|달성도|평점/배점|"                                 //대출금잔액         4
	   	+"목표|실적|달성도|평점/배점|"                                 //대출금평잔         4
	   	+"목표|실적|달성도|평점/배점|"                                 //외환사업           4
	   	;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:140,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %, 점수");
}

/*-----------------------------------------*/
/* @기능 : 2014년도 기준 그리드 set        */
/*-----------------------------------------*/
function setGrid2014()
{
  	month   = document.frm.basemonth.value.substring(4,6);

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	

  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
		"소속점번호|점번호|점명|PG명|"
	   	+"종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|"
	   	+"외환이익|외환이익|외환이익|외환이익|"
	   	+"예수금 (평잔)|예수금 (평잔)|예수금 (평잔)|예수금 (평잔)|"
	   	+"대출금 (잔액)|대출금 (잔액)|대출금 (잔액)|대출금 (잔액)|"
	   	+"대출금 (평잔)|대출금 (평잔)|대출금 (평잔)|대출금 (평잔)|"
	   	+"외환사업|외환사업|외환사업|외환사업"
	   	;
	
	var strHeader1 = 
		"소속점번호|점번호|점명|PG명|"                                //점관련                       4
	   	+"목표|실적|달성도|평점/배점|"                                 //영업점총이익(충당금반영후)   4
	   	+"목표|실적|달성도|평점/배점|"                                 //외환이익           4
	   	+"목표|실적|달성도|평점/배점|"                                 //예수금평잔         4
	   	+"목표|실적|달성도|평점/배점|"                                 //대출금잔액         4
	   	+"목표|실적|달성도|평점/배점|"                                 //대출금평잔         4
	   	+"목표|실적|달성도|평점/배점|"                                 //외환사업           4
	   	;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:140,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %, 점수");
}

/*-----------------------------------------*/
/* @기능 : 2013년도 기준 그리드 set        */
/*-----------------------------------------*/
function setGrid2013()
{
  	month   = document.frm.basemonth.value.substring(4,6);

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
		"점번호|점명|PG명|"
	   	+"종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|"
	   	+"예수금 (평잔)|예수금 (평잔)|예수금 (평잔)|예수금 (평잔)|"
	   	+"대출금 (잔액)|대출금 (잔액)|대출금 (잔액)|대출금 (잔액)|"
	   	+"대출금 (평잔)|대출금 (평잔)|대출금 (평잔)|대출금 (평잔)"
	   	;

	var strHeader1 = 
		"점번호|점명|PG명|"                                           //점관련                       3
	   	+"목표|실적|달성도|평점/배점|"                                 //영업점총이익(충당금반영후)   4
	   	+"목표|실적|달성도|평점/배점|"                                 //예수금평잔         4
	   	+"목표|실적|달성도|평점/배점|"                                 //대출금잔액         4
	   	+"목표|실적|달성도|평점/배점|"                                 //대출금평잔         4
	   	;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:140,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %, 점수");
}

/*-----------------------------------------*/
/* @기능 : 2012년도 하반기 기준 그리드 set */
/*  분기평잔 추가                          */
/*-----------------------------------------*/
function setGrid201207()
{
  	month   = document.frm.basemonth.value.substring(4,6);

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
	var strHeader0 = "";
	var strHeader1 = "";
	
  // 상위 GRID에 대한 속성정보 설정
  if (month >= '09')          // 2012.09이후 보고서
  {
		strHeader0 = 
		   "점번호|점명|PG명|"
		   +"종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|"
		   +"종합이익 개선도|종합이익 개선도|종합이익 개선도|종합이익 개선도|"
		   +"예수금 반기평잔|예수금 반기평잔|예수금 반기평잔|예수금 반기평잔|"
		   +"예수금 분기평잔|예수금 분기평잔|예수금 분기평잔|예수금 분기평잔|"
		   +"대출금 잔액|대출금 잔액|대출금 잔액|대출금 잔액|"
		   +"대출금 평잔|대출금 평잔|대출금 평잔|대출금 평잔"
		   ;
	}
   	else
	{
		strHeader1 = 
		   "점번호|점명|PG명|"
		   +"종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|"
		   +"예수금 반기평잔|예수금 반기평잔|예수금 반기평잔|예수금 반기평잔|"
		   +"예수금 분기평잔|예수금 분기평잔|예수금 분기평잔|예수금 분기평잔|"
		   +"대출금 잔액|대출금 잔액|대출금 잔액|대출금 잔액|"
		   +"대출금 평잔|대출금 평잔|대출금 평잔|대출금 평잔"
		   ;
	}
	
    if (month >= '09')          // 2012.09이후 보고서
	{
		strHeader0 = 
		   "점번호|점명|PG명|"                                           // 점관련                     3
		   +"목표|실적|달성도|평점/배점|"                                 //영업점총이익(충당금반영후)   4
		   +"7~8월\n평균 이익| 월 \n평균 이익|달성도|평점/배점|"          //종합이익개선도               4
		   +"목표|실적|달성도|평점/배점|"                                 //예수금잔액         4
		   +"목표|실적|달성도|평점/배점|"                                 //예수금평잔         4
		   +"목표|실적|달성도|평점/배점|"                                 //대출금잔액         4
		   +"목표|실적|달성도|평점/배점|"                                 //대출금평잔         4
		   ;
	}
    else
	{
		strHeader1 = 
		   "점번호|점명|PG명|"                                           // 점관련                     3
		   +"목표|실적|달성도|평점/배점|"                                 //영업점총이익(충당금반영후)   4
		   +"목표|실적|달성도|평점/배점|"                                 //예수금잔액         4
		   +"목표|실적|달성도|평점/배점|"                                 //예수금평잔         4
		   +"목표|실적|달성도|평점/배점|"                                 //대출금잔액         4
		   +"목표|실적|달성도|평점/배점|"                                 //대출금평잔         4
		   ;
	}
	
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3, FrozenCol:3 } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];

   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:140,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
	if (month >= '09'){
		   cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
		   cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
		   cols.push({Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
		   cols.push({Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	}
   	
	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
 
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %, 점수");
}


/*----------------------------------*/
/* @기능 : 2012년도 기준 그리드 set */
/*----------------------------------*/
function setGrid2012()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	

  // 상위 GRID에 대한 속성정보 설정]
	var strHeader0 = 
	"점번호|점명|PG명|"
      +"종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|종합이익(충당금반영후)|"
      +"예수금 잔액|예수금 잔액|예수금 잔액|예수금 잔액|"
      +"예수금 평잔|예수금 평잔|예수금 평잔|예수금 평잔|"
      +"대출금 잔액|대출금 잔액|대출금 잔액|대출금 잔액|"
      +"대출금 평잔|대출금 평잔|대출금 평잔|대출금 평잔"
      ;

	var strHeader1 =
      "점번호|점명|PG명|"                                            // 점관련                     3
      +"목표|실적|달성도|평점/배점|"                                 //영업점총이익(충당금반영후)   4
      +"목표|실적|달성도|평점/배점|"                                 //예수금잔액         4
      +"목표|실적|달성도|평점/배점|"                                 //예수금평잔         4
      +"목표|실적|달성도|평점/배점|"                                 //대출금잔액         4
      +"목표|실적|달성도|평점/배점|"                                 //대출금평잔         4
      ;

      mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

      var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
      var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
      mySheet.InitHeaders(headers, info);

      var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:140,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
       
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %, 점수");
}
