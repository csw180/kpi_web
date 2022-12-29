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
function LoadPage()
{

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
   	initGrid(); // 화면 그리드 초기화
  
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
	//hiddenGrid=document.frm.hiddenGrid;
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
    initGrid();  // 화면 그리드 초기화

    //hiddenGrid  = document.frm.hiddenGrid;
    basemonth   = document.frm.basemonth.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=7");
}

/* Sheet 각종 처리 */
function doAction(sAction)
{
    //mySheet     = document.frm.mySheet;
    //hiddenGrid  = document.frm.hiddenGrid;
    isSelected  = true;
    basemonth   = document.frm.basemonth.value;

    switch(sAction)
    {
        case "고정필드설정":
        	mySheet.SetFrozenCol(mySheet.MouseCol());
        	ufSetMergeCell(mySheet, mySheet.HeaderRows(), 0, 1,2);
        	break;
        case "고정필드해제":
        	mySheet.SetFrozenCol(0);
        	ufSetMergeCell(mySheet, mySheet.HeaderRows(), 0, 1,2);
        	break;
        case "기준년월":             // 조회(상위 GRID)
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&stmonth=201001"); 
            break;
        case "조회":             // 조회(상위 GRID)
            if (basemonth < '201001') {
               alert("2010년도 이후 부터 조회가능 합니다.");
               return;
            }

            mySheet.DoSearch("rpop.scr.rpop_scr_4050.do?hidden_key=9&basemonth="+basemonth+"&pgcode="+0+"&period="+4); 
            //mySheet.FitSize(false, true);
            break;
        case "엑셀내려받기":    // 엑셀내려받기
            inqText       = new Array();
            inqText[0]    = new Array();
            inqText[0][0] = "작업기준년월";
            inqText[0][1] = basemonth;
            inqText[1]    = new Array();
            inqText[1][0] = "성과주기";
            inqText[1][1] = "년";
            // 보안등급세팅
            seqLevel = document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[2]    = new Array();
                inqText[2][0] = "보안등급";
                inqText[2][1] = document.frm.Security_Level.value;
            }

            rExcVal = doExcel(mySheet, inqText, false); //common.js 활용하여 excel 출력
            // 엑셀다운로드시 로그 저장
            /*if(rExcVal) {
               condition = "기준년월="+basemonth;
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

    if (basemonth <= '201012')  setGrid2010();
    else if (basemonth <= '201112') setGrid2011();
    else if (basemonth <= '201206') setGrid2012(); 
    else if (basemonth <= '201212') setGrid201207();
    else if (basemonth <= '201312') setGrid2013();
    else if (basemonth <= '201406') setGrid2014();
    else if (basemonth <= '201412') setGrid2014Q3();
    else if (basemonth <= '201506') setGrid2015();
    else if (basemonth <= '201512') setGrid2015Q3();
    else if (basemonth <= '201606') setGrid2016();
    else if (basemonth <= '201612') setGrid2016Q3();
    else if (basemonth <= '201706') setGrid2017(); 
    else if (basemonth <= '201712') setGrid2017Q3();	
    else if (basemonth <= '201806') setGrid2018();	
    else if (basemonth <= '201812') setGrid2018Q3();	
    else if (basemonth <= '202006') setGrid2019();
    else if (basemonth <= '202106') setGrid2020H2();
    else if (basemonth <= '202112') setGrid2021H2();
    else setGrid2022H1();	
}

/*-----------------------------------------*/
/* @기능 : 2022년도 상반기 기준 그리드 set */
/*-----------------------------------------*/        
function setGrid2022H1()
{
  	basemonth   = document.frm.basemonth.value;

  	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

	let strHeader0 =  "점번호|점명|PG명|"                   
                  +"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"
                  +"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"
                  +"저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|"
                  +"저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|"
                  +"핵심예수금(반기평잔)|핵심예수금(반기평잔)|핵심예수금(반기평잔)|핵심예수금(반기평잔)|"
                  +"핵심예수금(월중평잔)|핵심예수금(월중평잔)|핵심예수금(월중평잔)|핵심예수금(월중평잔)|"
                  +"대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|"
                 ;
	let strHeader1 =  "점번호|점명|PG명|"                                    //3 
                  + "목표|실적|평균득점률|평점(☞) |"                     //4 예수금(반기평잔)
                  + "목표|실적|평균득점률|평점(☞) |"                     //4 예수금(순증잔액)
                  + "목표|실적|평균득점률|평점(☞) |"                     //4 저비용성예수금(반기평잔)
                  + "목표|실적|평균득점률|평점(☞) |"                     //4 저비용성예수금(월중평잔)
                  + "목표|실적|평균득점률|평점(☞) |"                     //4 핵싱몌수금(반기평잔)
                  + "목표|실적|평균득점률|평점(☞) |"                     //4 핵싱몌수금(월중평잔)
                  + "목표|실적|평균득점률|평점(☞) |"                     //4 대출금(순증잔액)
                  ;

    // 상위 GRID에 대한 속성정보 설정
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2, AutoFitColWidth:"colhidden" } );
	
	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
	          { Text:strHeader1, Align:"Center"} ];
	mySheet.InitHeaders(headers, info);
	
	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	    {Type:"Text",     Hidden:0,  MinWidth:180,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	    {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	    {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
	 
	mySheet.InitColumns(cols);
	
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(5,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(8,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(11,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(17,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(20,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(23,1);
	mySheet.SetColHidden(24,1);
	mySheet.SetColHidden(25,1);
	mySheet.SetColHidden(27,1);
	mySheet.SetColHidden(28,1);
	mySheet.SetColHidden(29,1);
	
	mySheet.SetDataLinkMouse(true);
	mySheet.SetCountPosition(1);
	//지원안함[check again] UnitText="원, 점수, 명, 미불";
	showUnitText("원, 점수, 명, 미불")
	newSetActionMenu(mySheet,"엑셀내려받기");
	
	mySheet.SetRowHeight(1,22);
	mySheet.SetSplitMergeCell(1,6);
	
	//정렬변경
	for(col=3; col<23; col++){
	  mySheet.SetCellAlign(0,col,"CenterTop");
	}
}

/*-----------------------------------------*/
/* @기능 : 2021년도 하반기 기준 그리드 set */
/*-----------------------------------------*/        
function setGrid2021H2()
{
	basemonth   = document.frm.basemonth.value;

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
	var strHeader0 =
		"점번호|점명|PG명|" 
	  + " \n예\n수\n금\n\n(반기평잔)\n| \n예\n수\n금\n\n(반기평잔)\n| \n예\n수\n금\n\n(반기평잔)\n| \n예\n수\n금\n\n(반기평잔)\n|"           // 4
	  + " \n예\n수\n금\n\n(순증잔액)\n| \n예\n수\n금\n\n(순증잔액)\n| \n예\n수\n금\n\n(순증잔액)\n| \n예\n수\n금\n\n(순증잔액)\n|"           // 4
	  + " \n저\n비\n용\n성\n예\n금\n\n(반기평잔)\n| \n저\n비\n용\n성\n예\n금\n\n(반기평잔)\n|"                                               // 2
	  + " \n저\n비\n용\n성\n예\n금\n\n(반기평잔)\n| \n저\n비\n용\n성\n예\n금\n\n(반기평잔)\n|"                                               // 2
	  + " \n저\n비\n용\n성\n예\n금\n\n(월중평잔)\n| \n저\n비\n용\n성\n예\n금\n\n(월중평잔)\n|"                                               // 2
	  + " \n저\n비\n용\n성\n예\n금\n\n(월중평잔)\n| \n저\n비\n용\n성\n예\n금\n\n(월중평잔)\n|"                                               // 2
	  + " \n대\n출\n금\n\n(순증잔액_밴드평가)\n| \n대\n출\n금\n\n(순증잔액_밴드평가)\n|"                                                    // 2
	  + " \n대\n출\n금\n\n(순증잔액_밴드평가)\n| \n대\n출\n금\n\n(순증잔액_밴드평가)\n"                                                    // 2
	  ;

	var strHeader1 =
		"점번호|점명|PG명|" 
	  + "목표|실적|평균득점률|평점(☞) |"                     //4 예수금(반기평잔)
	  + "목표|실적|평균득점률|평점(☞) |"                     //4 예수금(순증잔액)
	  + "목표|실적|평균득점률|평점(☞) |"                     //4 저비용성예수금(반기평잔)
	  + "목표|실적|평균득점률|평점(☞) |"                     //4 저비용성예수금(월중평잔)
	  + "실적|밴드범위이탈금액|평균득점률|평점(☞) "          //4 대출금(순증잔액_밴드평가)
	  ;

  	i=0;
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2, AutoFitColWidth:"colhidden" } );

  	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
  	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
  	mySheet.InitHeaders(headers, info);

 	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	 {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	 {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
                   
	mySheet.InitColumns(cols);
	
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(5,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(8,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(11,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(17,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(20,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
	mySheet.SetSplitMergeCell(1,6);
	for(col=3; col<23; col++ ) {
  		mySheet.SetCellAlign(0,col,"CenterTop");
  	}
}

/*-----------------------------------------*/
/* @기능 : 2020년도 하반기 기준 그리드 set */
/*-----------------------------------------*/        
function setGrid2020H2()
{
  	basemonth   = document.frm.basemonth.value;
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  
  	

  // 상위 GRID에 대한 속성정보 설정
   //지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
	var strHeader0 = 
		"점번호|점명|PG명|" 
	   	+ " \n예\n수\n금\n\n(반기평잔)\n| \n예\n수\n금\n\n(반기평잔)\n| \n예\n수\n금\n\n(반기평잔)\n| \n예\n수\n금\n\n(반기평잔)\n|"           // 4
	   	+ " \n예\n수\n금\n\n(순증잔액)\n| \n예\n수\n금\n\n(순증잔액)\n| \n예\n수\n금\n\n(순증잔액)\n| \n예\n수\n금\n\n(순증잔액)\n|"           // 4
	   	+ " \n저\n비\n용\n성\n예\n금\n\n(반기평잔)\n| \n저\n비\n용\n성\n예\n금\n\n(반기평잔)\n|"                                               // 2
	   	+ " \n저\n비\n용\n성\n예\n금\n\n(반기평잔)\n| \n저\n비\n용\n성\n예\n금\n\n(반기평잔)\n|"                                               // 2
	   	+ " \n저\n비\n용\n성\n예\n금\n\n(월중평잔)\n| \n저\n비\n용\n성\n예\n금\n\n(월중평잔)\n|"                                               // 2
	   	+ " \n저\n비\n용\n성\n예\n금\n\n(월중평잔)\n| \n저\n비\n용\n성\n예\n금\n\n(월중평잔)\n|"                                               // 2
	   	+ " \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n|"           // 4
	   	;

	var strHeader1 = 
		"점번호|점명|PG명|" 
	   	+ "목표|실적|평균득점률|평점(☞) |"         //4 예수금(반기평잔)
	   	+ "목표|실적|평균득점률|평점(☞) |"         //4 예수금(순증잔액)
	   	+ "목표|실적|평균득점률|평점(☞) |"         //4 저비용성예수금(반기평잔)
	   	+ "목표|실적|평균득점률|평점(☞) |"         //4 저비용성예수금(월중평잔)
	   	+ "목표|실적|평균득점률|평점(☞) "          //4 대출금(순증잔액)
	   	;

   i=0;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2, AutoFitColWidth:"colhidden" } );

   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
	mySheet.InitColumns(cols);
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(5,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(8,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(11,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(17,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(20,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
	mySheet.SetSplitMergeCell(1,6);
	
	for(col=3; col<23; col++ ) {
   		mySheet.SetCellAlign(0,col,"CenterTop");
   	}

}

/*-----------------------------------------*/
/* @기능 : 2019년도 상반기 기준 그리드 set */
/*-----------------------------------------*/        
function setGrid2019()
{
	basemonth   = document.frm.basemonth.value;

  	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
	var strHeader0 = 
					"점번호|점명|PG명|" 
                  + " \n예\n수\n금\n\n(반기평잔)\n| \n예\n수\n금\n\n(반기평잔)\n| \n예\n수\n금\n\n(반기평잔)\n| \n예\n수\n금\n\n(반기평잔)\n|"           // 4
                  + " \n예\n수\n금\n\n(순증잔액)\n| \n예\n수\n금\n\n(순증잔액)\n| \n예\n수\n금\n\n(순증잔액)\n| \n예\n수\n금\n\n(순증잔액)\n|"           // 4
                  + " \n저\n비\n용\n성\n예\n금\n\n(반기평잔)\n| \n저\n비\n용\n성\n예\n금\n\n(반기평잔)\n|"                                               // 2
                  + " \n저\n비\n용\n성\n예\n금\n\n(반기평잔)\n| \n저\n비\n용\n성\n예\n금\n\n(반기평잔)\n|"                                               // 2
                  + " \n저\n비\n용\n성\n예\n금\n\n(월중평잔)\n| \n저\n비\n용\n성\n예\n금\n\n(월중평잔)\n|"                                               // 2
                  + " \n저\n비\n용\n성\n예\n금\n\n(월중평잔)\n| \n저\n비\n용\n성\n예\n금\n\n(월중평잔)\n|"                                               // 2
                  + " \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n|"           // 4
                  ;

	var strHeader1 = 
					"점번호|점명|PG명|" 
                  + "목표|실적|달성률|평점(☞) |"         //4 예수금(반기평잔)
                  + "목표|실적|달성률|평점(☞) |"         //4 예수금(순증잔액)
                  + "목표|실적|달성률|평점(☞) |"         //4 저비용성예수금(반기평잔)
                  + "목표|실적|달성률|평점(☞) |"         //4 저비용성예수금(월중평잔)
                  + "목표|실적|달성률|평점(☞) "          //4 대출금(순증잔액)
                  ;

	  i=0;
	
	  mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2, AutoFitColWidth:"colhidden" } );
	
	  var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	  var headers = [ { Text:strHeader0, Align:"Center"},
	 	{ Text:strHeader1, Align:"Center"} ];
	
	  mySheet.InitHeaders(headers, info);

      var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		 {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
		 {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
		 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		 {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
       
    mySheet.InitColumns(cols);

	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(5,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(8,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(11,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(17,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(20,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
	mySheet.SetSplitMergeCell(1,6);
	
	for(col=3; col<23; col++ ) {
		mySheet.SetCellAlign(0,col,"CenterTop");
	}
}

/*-----------------------------------------*/
/* @기능 : 2018년도 하반기 기준 그리드 set */
/*-----------------------------------------*/        
function setGrid2018Q3()
{
  	basemonth   = document.frm.basemonth.value;

  	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
	var strHeader0 = "";
	var strHeader1 = "";
	
  // 상위 GRID에 대한 속성정보 설정
      if(basemonth>='201807'&&basemonth<='201808')    // 신탁사업(재산신탁) hidden 처리
      {
		strHeader0 = 
			"점번호|점명|PG명|" 
	      + " \n예\n수\n금\n\n(반기평잔)\n| \n예\n수\n금\n\n(반기평잔)\n| \n예\n수\n금\n\n(반기평잔)\n| \n예\n수\n금\n\n(반기평잔)\n|"           // 4
	      + " \n예\n수\n금\n\n(순증잔액)\n| \n예\n수\n금\n\n(순증잔액)\n| \n예\n수\n금\n\n(순증잔액)\n| \n예\n수\n금\n\n(순증잔액)\n|"           // 4
	      + " \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n|"           // 4
	      + " \n외\n환\n사\n업| \n외\n환\n사\n업| \n외\n환\n사\n업| \n외\n환\n사\n업|"                                                           // 4
	      + " \n신\n탁\n사\n업\n\n| \n신\n탁\n사\n업\n\n| \n신\n탁\n사\n업\n\n| \n신\n탁\n사\n업\n\n|"                                           // 4
	      + " \n신\n탁\n사\n업\n\n(재산신탁)| \n신\n탁\n사\n업\n\n(재산신탁)| \n신\n탁\n사\n업\n\n(재산신탁)| \n신\n탁\n사\n업\n\n(재산신탁)|"   // 4
	      + " \n카\n드\n사\n업\n\n(매출액)| \n카\n드\n사\n업\n\n(매출액)| \n카\n드\n사\n업\n\n(매출액)| \n카\n드\n사\n업\n\n(매출액)|"   // 4
	      ;
		strHeader1 = 
			"점번호|점명|PG명|" 
	      + "목표|실적|달성률|평점(☞) |"         //4 예수금(반기평잔)
	      + "목표|실적|달성률|평점(☞) |"         //4 예수금(순증잔액)
	      + "목표|실적|달성률|평점(☞) |"         //4 대출금(순증잔액)
	      + "목표|실적|달성률|평점(☞) |"         //4 외환사업
	      + "목표|실적|달성률|평점(☞) |"         //4 신탁사업
	      + "목표|실적|달성률|평점(☞) |"         //4 신탁사업(재산신탁)
	      + "목표|실적|달성률|평점(☞) ";  //4 카드사업(매출액)
      }
      else
      {
		strHeader0 = 
			"점번호|점명|PG명|" 
	      + " \n예\n수\n금\n\n(반기평잔)\n| \n예\n수\n금\n\n(반기평잔)\n| \n예\n수\n금\n\n(반기평잔)\n| \n예\n수\n금\n\n(반기평잔)\n|"           // 4
	      + " \n예\n수\n금\n\n(순증잔액)\n| \n예\n수\n금\n\n(순증잔액)\n| \n예\n수\n금\n\n(순증잔액)\n| \n예\n수\n금\n\n(순증잔액)\n|"           // 4
	      + " \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n|"           // 4
	      + " \n외\n환\n사\n업| \n외\n환\n사\n업| \n외\n환\n사\n업| \n외\n환\n사\n업|"                                                           // 4
	      + " \n신\n탁\n사\n업\n\n(특정금전)| \n신\n탁\n사\n업\n\n(특정금전)| \n신\n탁\n사\n업\n\n(특정금전)| \n신\n탁\n사\n업\n\n(특정금전)|"   // 4
	      + " \n신\n탁\n사\n업\n\n(재산신탁)| \n신\n탁\n사\n업\n\n(재산신탁)| \n신\n탁\n사\n업\n\n(재산신탁)| \n신\n탁\n사\n업\n\n(재산신탁)|"   // 4
	      + " \n카\n드\n사\n업\n\n(매출액)| \n카\n드\n사\n업\n\n(매출액)| \n카\n드\n사\n업\n\n(매출액)| \n카\n드\n사\n업\n\n(매출액)|"   // 4
	      ;
		strHeader1 = 
			"점번호|점명|PG명|" 
	      + "목표|실적|달성률|평점(☞) |"         //4 예수금(반기평잔)
	      + "목표|실적|달성률|평점(☞) |"         //4 예수금(순증잔액)
	      + "목표|실적|달성률|평점(☞) |"         //4 대출금(순증잔액)
	      + "목표|실적|달성률|평점(☞) |"         //4 외환사업
	      + "목표|실적|달성률|평점(☞) |"         //4 신탁사업(특정금전)
	      + "목표|실적|달성률|평점(☞) |"         //4 신탁사업(재산신탁)
	      + "목표|실적|달성률|평점(☞) ";  //4 카드사업(매출액)
      }

      i=0;

      mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2, AutoFitColWidth:"colhidden" } );

      var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
      var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];

      mySheet.InitHeaders(headers, info);

      var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
	if(basemonth>='201807'&&basemonth<='201808')    // 신탁사업(재산신탁) hidden 처리
  	{
      mySheet.SetColHidden(23, 1);
      mySheet.SetColHidden(24, 1);
      mySheet.SetColHidden(25, 1);
      mySheet.SetColHidden(26, 1);
  	}
 
	mySheet.InitColumns(cols);
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(5,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(8,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(11,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(17,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(20,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(23,1);
	mySheet.SetColHidden(24,1);
	mySheet.SetColHidden(25,1);
	mySheet.SetColHidden(27,1);
	mySheet.SetColHidden(28,1);
	mySheet.SetColHidden(29,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
	mySheet.SetSplitMergeCell(1,6);
	
	for(col=3; col<21; col++ ) {
      	mySheet.SetCellAlign(0,col,"CenterTop");
    }

}

/*-----------------------------------------*/
/* @기능 : 2018년도  기준 그리드       set */
/*-----------------------------------------*/        
function setGrid2018()
{
	basemonth   = document.frm.basemonth.value;

  	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
		"점번호|점명|PG명|" 
	   + " \n소\n매\n예\n수\n금\n\n(반기평잔)\n| \n소\n매\n예\n수\n금\n\n(반기평잔)\n| \n소\n매\n예\n수\n금\n\n(반기평잔)\n|"
	   + " \n소\n매\n예\n수\n금\n\n(순증잔액)\n| \n소\n매\n예\n수\n금\n\n(순증잔액)\n| \n소\n매\n예\n수\n금\n\n(순증잔액)\n|"
	   + " \n기\n업\n예\n수\n금\n\n(반기평잔)\n| \n기\n업\n예\n수\n금\n\n(반기평잔)\n| \n기\n업\n예\n수\n금\n\n(반기평잔)\n|"
	   + " \n기\n업\n예\n수\n금\n\n(월중평잔)\n| \n기\n업\n예\n수\n금\n\n(월중평잔)\n| \n기\n업\n예\n수\n금\n\n(월중평잔)\n|"
	   + " \n소\n매\n대\n출\n금\n\n(순증잔액)\n| \n소\n매\n대\n출\n금\n\n(순증잔액)\n| \n소\n매\n대\n출\n금\n\n(순증잔액)\n|"
	   + " \n기\n업\n대\n출\n금\n\n(순증잔액)\n| \n기\n업\n대\n출\n금\n\n(순증잔액)\n| \n기\n업\n대\n출\n금\n\n(순증잔액)\n|"
	   + " \n외\n환\n사\n업| \n외\n환\n사\n업| \n외\n환\n사\n업|"
	   + " \n신\n탁\n사\n업| \n신\n탁\n사\n업| \n신\n탁\n사\n업|"
	   + " \n카\n드\n사\n업\n\n\n(매출액)| \n카\n드\n사\n업\n\n\n(매출액)| \n카\n드\n사\n업\n\n\n(매출액)|"
	   ;

	var strHeader1 = 
		"점번호|점명|PG명|" 
	   + "목표|실적|평점(☞)|"         //3 소매예수금(반기평잔)
	   + "목표|실적|평점(☞)|"         //3 소매예수금(순증잔액)
	   + "목표|실적|평점(☞)|"         //3 기업예수금(반기평잔)
	   + "목표|실적|평점(☞)|"         //3 기업예수금(월중평잔)
	   + "목표|실적|평점(☞)|"         //3 소매대출금(순증잔액)
	   + "목표|실적|평점(☞)|"         //3 기업업대출금(순증잔액)
	   + "목표|실적|평점(☞)|"         //3 외환사업
	   + "목표|실적|평점(☞)|"         //3 신탁사업
	   + "목표|실적|평점(☞)";  //3 카드사업(매출액)

   	i=0;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2, AutoFitColWidth:"colhidden" } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);

	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(18,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(22,1);
	mySheet.SetColHidden(24,1);
	mySheet.SetColHidden(25,1);
	mySheet.SetColHidden(27,1);
	mySheet.SetColHidden(28,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
	mySheet.SetSplitMergeCell(1,5);
	
	for(col=3; col<30; col++ ) {
   		mySheet.SetCellAlign(0,col,"CenterTop");
   	}

}

/*-----------------------------------------*/
/* @기능 : 2017년도 하반기 기준 그리드 set */
/*-----------------------------------------*/        
function setGrid2017Q3()
{
	basemonth   = document.frm.basemonth.value;

  	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
		"점번호|점명|PG명" 
	   + "| \n총\n예\n수\n금\n\n(반기평잔)\n| \n총\n예\n수\n금\n\n(반기평잔)\n| \n총\n예\n수\n금\n\n(반기평잔)\n"
	   + "| \n총\n예\n수\n금\n\n(월중평잔)\n| \n총\n예\n수\n금\n\n(월중평잔)\n| \n총\n예\n수\n금\n\n(월중평잔)\n"
	   + "| \n중\n저원가성\n예금\n\n(반기평잔)\n| \n중\n저원가성\n예금\n\n(반기평잔)\n| \n중\n저원가성\n예금\n\n(반기평잔)\n"
	   + "| \n예\n대\n율\n| \n예\n대\n율\n"
	   + "| \n일\n반\n여\n신\n\n(신규잔액)\n| \n일\n반\n여\n신\n\n(신규잔액)\n| \n일\n반\n여\n신\n\n(신규잔액)\n"
	   + "| \n외\n환\n사\n업\n| \n외\n환\n사\n업\n| \n외\n환\n사\n업\n"
	   + "| \n카\n드\n사\n업\n\n(매출액)\n| \n카\n드\n사\n업\n\n(매출액)\n| \n카\n드\n사\n업\n\n(매출액)\n"
	   ;

	var strHeader1 = 
		"점번호|점명|PG명" 
	   + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
	   + "|예대율|예대평점(☞)"
	   + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)";

   	i=0;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2, AutoFitColWidth:"colhidden" } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
   	if( basemonth == '201706' || basemonth == '201712' ) {
	   cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	   //mySheet.GetColHidden(6,1);
	   cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	   //mySheet.GetColHidden(7,1);
	   cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	} else {
	   cols.push({Type:"Text",      Hidden:1, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	   //mySheet.GetColHidden(6, 1);
	   cols.push({Type:"Text",      Hidden:1, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	   //mySheet.GetColHidden(7, 1);
	   cols.push({Type:"Text",      Hidden:1, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	}
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
 
   	mySheet.InitColumns(cols);

	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	//mySheet.SetColHidden(11,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(14,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(18-1,1);
	mySheet.SetColHidden(19-1,1);
	mySheet.SetColHidden(21-1,1);
	mySheet.SetColHidden(22-1,1);
	mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");
   	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
	mySheet.SetSplitMergeCell(1,5);
	mySheet.SetSplitMergeCell(1,16);
	
	for(col=3; col<23; col++ ) {
   		mySheet.SetCellAlign(0,col,"CenterTop");
   	}
}

/*----------------------------------*/
/* @기능 : 2017년도 기준 그리드 set */
/*----------------------------------*/        
function setGrid2017()
{
  	basemonth   = document.frm.basemonth.value;

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	

  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
		"점번호|점명|PG명" 
	   + "| \n총\n예\n수\n금\n\n(반기평잔)\n| \n총\n예\n수\n금\n\n(반기평잔)\n| \n총\n예\n수\n금\n\n(반기평잔)\n"
	   + "| \n총\n예\n수\n금\n\n(월중평잔)\n| \n총\n예\n수\n금\n\n(월중평잔)\n| \n총\n예\n수\n금\n\n(월중평잔)\n"
	   + "| \n중\n저원가성\n예금\n\n(반기평잔)\n| \n중\n저원가성\n예금\n\n(반기평잔)\n| \n중\n저원가성\n예금\n\n(반기평잔)\n"
	   + "| \n예\n대\n율\n| \n예\n대\n율\n| \n예\n대\n율\n"
	   + "| \nR\nO\nR\nW\nA\n| \nR\nO\nR\nW\nA\n"
	   + "| \n일\n반\n여\n신\n\n(순증잔액)\n| \n일\n반\n여\n신\n\n(순증잔액)\n| \n일\n반\n여\n신\n\n(순증잔액)\n"
	   + "| \n외\n환\n사\n업\n| \n외\n환\n사\n업\n| \n외\n환\n사\n업\n"
	   + "| \n카\n드\n사\n업\n\n(매출액)\n| \n카\n드\n사\n업\n\n(매출액)\n| \n카\n드\n사\n업\n\n(매출액)\n"
	   ;

	var strHeader1 = 
		"점번호|점명|PG명|" 
	   + "목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|"
	   + "예대율|총예수금달성률|평점(☞)|실적|RWA평점(☞)|"
	   + "목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)";

   	i=0;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2, AutoFitColWidth:"colhidden" } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    if( basemonth == '201706' || basemonth == '201712' ) {
	   cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	   //mySheet.SetColHidden(6, 1);
	   cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	   //mySheet.SetColHidden(7, 1);
	   cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	} else {
	   cols.push({Type:"Text",      Hidden:1, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	   //mySheet.SetColHidden(6, 1);
	   cols.push({Type:"Text",      Hidden:1, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	   //mySheet.SetColHidden(7, 1);
	   cols.push({Type:"Text",      Hidden:1, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	}

   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
 
   	mySheet.InitColumns(cols);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetColHidden(3,1);
   	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
   	mySheet.SetColHidden(9,1);
   	mySheet.SetColHidden(10,1);
   	mySheet.SetColHidden(12,1);
   	mySheet.SetColHidden(13,1);
   	mySheet.SetColHidden(15,1);
   	mySheet.SetColHidden(17,1);
   	mySheet.SetColHidden(18,1);
   	mySheet.SetColHidden(20,1);
   	mySheet.SetColHidden(21,1);
   	mySheet.SetColHidden(23,1);
   	mySheet.SetColHidden(24,1);
   	mySheet.SetDataLinkMouse(true);
   	mySheet.SetActionMenu("엑셀내려받기");
   	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
	mySheet.SetSplitMergeCell(1,5);
	mySheet.SetSplitMergeCell(1,19);
	
	for(col=3; col<26; col++ ) {
   		mySheet.SetCellAlign(0,col,"CenterTop");
   	}
}

/*-----------------------------------------*/
/* @기능 : 2016년도 하반기 기준 그리드 set */
/*-----------------------------------------*/        
function setGrid2016Q3()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	

  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
		"점번호|점명|PG명" 
	   + "| \n거치식\n적립식\n예금\n\n(잔액)\n| \n거치식\n적립식\n예금\n\n(잔액)\n| \n거치식\n적립식\n예금\n\n(잔액)\n"
	   + "| \n거치식\n적립식\n예금\n\n(평잔)\n| \n거치식\n적립식\n예금\n\n(평잔)\n| \n거치식\n적립식\n예금\n\n(평잔)\n"
	   + "| \n중\n저원가성\n예금\n\n(평잔)\n| \n중\n저원가성\n예금\n\n(평잔)\n| \n중\n저원가성\n예금\n\n(평잔)\n"
	   + "| \nR\nO\nR\nW\nA| \nR\nO\nR\nW\nA"
	   + "| \n대\n출\n금\n\n(신규잔액)\n| \n대\n출\n금\n\n(신규잔액)\n| \n대\n출\n금\n\n(신규잔액)\n"
	   + "| \n외\n환\n사\n업\n| \n외\n환\n사\n업\n| \n외\n환\n사\n업\n"
	   + "| \n카\n드\n사\n업\n\n(신용카드매출액)\n| \n카\n드\n사\n업\n\n(신용카드매출액)\n| \n카\n드\n사\n업\n\n(신용카드매출액)\n"
	   + "| \n카\n드\n사\n업\n\n(법인카드매출액)\n| \n카\n드\n사\n업\n\n(법인카드매출액)\n| \n카\n드\n사\n업\n\n(법인카드매출액)\n"
	   ;

	var strHeader1 = 
		"점번호|점명|PG명|" 
   		+ "목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|"
   		+ "실적|RWA평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|"
   		+ "목표|실적|평점(☞)|목표|실적|평점(☞)";

   	i=0;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2, AutoFitColWidth:"colhidden" } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);

	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(14,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(17,1);
	mySheet.SetColHidden(18,1);
	mySheet.SetColHidden(20,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(23,1);
	mySheet.SetColHidden(24,1);
	mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");
   	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
	mySheet.SetSplitMergeCell(1,5);
	mySheet.SetSplitMergeCell(1,16);
	
	for(col=3; col<26; col++ ) {
   		mySheet.SetCellAlign(0,col,"CenterTop");
   	}
}

/*----------------------------------*/
/* @기능 : 2016년도 기준 그리드 set */
/*----------------------------------*/        
function setGrid2016()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	

  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
		"점번호|점명|PG명" 
      + "| \n거치식\n적립식\n예금\n\n(잔액)\n| \n거치식\n적립식\n예금\n\n(잔액)\n| \n거치식\n적립식\n예금\n\n(잔액)\n"
      + "| \n거치식\n적립식\n예금\n\n(평잔)\n| \n거치식\n적립식\n예금\n\n(평잔)\n| \n거치식\n적립식\n예금\n\n(평잔)\n"
      + "| \n중\n저원가성\n예금\n\n(평잔)\n| \n중\n저원가성\n예금\n\n(평잔)\n| \n중\n저원가성\n예금\n\n(평잔)\n"
      + "| \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n"
      + "| \n대\n출\n금\n\n(신규잔액)\n| \n대\n출\n금\n\n(신규잔액)\n| \n대\n출\n금\n\n(신규잔액)\n"
      + "| \n외\n환\n사\n업\n| \n외\n환\n사\n업\n| \n외\n환\n사\n업\n"
      + "| \n카\n드\n사\n업\n\n(신용카드매출액)\n| \n카\n드\n사\n업\n\n(신용카드매출액)\n| \n카\n드\n사\n업\n\n(신용카드매출액)\n"
      ;

	var strHeader1 = 
		"점번호|점명|PG명|" 
      + "목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|"
      + "목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|"
      + "목표|실적|평점(☞)";

      i=0;

      mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2, AutoFitColWidth:"colhidden" } );

      var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
      var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
      mySheet.InitHeaders(headers, info);

      var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
       
    mySheet.InitColumns(cols);

	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(18,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(22,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
	mySheet.SetSplitMergeCell(1,5);
	
	for(col=3; col<27; col++ ){
      	mySheet.SetCellAlign(0,col,"CenterTop");
    }

}

/*-----------------------------------------*/
/* @기능 : 2015년도 하반기 기준 그리드 set */
/*-----------------------------------------*/
function setGrid2015Q3()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
		"점번호|점명|PG명" 
	   + "| \n거치식\n적립식\n예금\n\n(평잔)\n| \n거치식\n적립식\n예금\n\n(평잔)\n| \n거치식\n적립식\n예금\n\n(평잔)\n"
	   + "| \n중\n저원가성\n예금\n\n(평잔)\n| \n중\n저원가성\n예금\n\n(평잔)\n| \n중\n저원가성\n예금\n\n(평잔)\n"
	   + "| \n대\n출\n금\n\n(잔액)\n| \n대\n출\n금\n\n(잔액)\n| \n대\n출\n금\n\n(잔액)\n"
	   + "| \n대\n출\n금\n\n(평잔)\n| \n대\n출\n금\n\n(평잔)\n| \n대\n출\n금\n\n(평잔)\n"
	   + "| \n외\n환\n사\n업\n| \n외\n환\n사\n업\n| \n외\n환\n사\n업\n"
	   + "| \n카\n드\n사\n업\n\n(유효회원)\n| \n카\n드\n사\n업\n\n(유효회원)\n| \n카\n드\n사\n업\n\n(유효회원)\n"
	   + "| \n카\n드\n사\n업\n\n(매출액)\n| \n카\n드\n사\n업\n\n(매출액)\n| \n카\n드\n사\n업\n\n(매출액)\n"
	   ;

	var strHeader1 = 
		"점번호|점명|PG명" 
   		+ "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)";

   	i=0;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2, AutoFitColWidth:"colhidden" } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };

   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);

	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(18,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(22,1);
	mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");
   	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
	mySheet.SetSplitMergeCell(1,5);
	
	for(col=3; col<24; col++ ) {
   		mySheet.SetCellAlign(0,col,"CenterTop");
   	}
}

/*-------------------------------------*/
/* @기능 : 2015년도 기준 그리드 set    */
/*-------------------------------------*/        
function setGrid2015()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	

  // 상위 GRID에 대한 속성정보 설정
  //지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
	var strHeader0 = 
		"점번호|점명|PG명" 
	   + "| \n거치식\n적립식\n예금\n\n(평잔)\n| \n거치식\n적립식\n예금\n\n(평잔)\n| \n거치식\n적립식\n예금\n\n(평잔)\n"
	   + "| \n중\n저원가성\n예금\n\n(평잔)\n| \n중\n저원가성\n예금\n\n(평잔)\n| \n중\n저원가성\n예금\n\n(평잔)\n"
	   + "| \n대\n출\n금\n\n(잔액)\n| \n대\n출\n금\n\n(잔액)\n| \n대\n출\n금\n\n(잔액)\n"
	   + "| \n대\n출\n금\n\n(평잔)\n| \n대\n출\n금\n\n(평잔)\n| \n대\n출\n금\n\n(평잔)\n"
	   + "| \n외\n환\n사\n업\n| \n외\n환\n사\n업\n| \n외\n환\n사\n업\n"
	   + "| \n카\n드\n사\n업\n| \n카\n드\n사\n업\n| \n카\n드\n사\n업\n"
	   ;

	var strHeader1 =
		"점번호|점명|PG명" 
   		+ "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)";

   	i=0;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2, AutoFitColWidth:"colhidden" } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);

	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(18,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");
   	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
	mySheet.SetSplitMergeCell(1,5);
	
	for(col=3; col<21; col++ ) {
   		mySheet.SetCellAlign(0,col,"CenterTop");
   	}
}

/*--------------------------------------------*/
/* @기능 : 2014년도 하반기 기준 그리드 set    */
/*--------------------------------------------*/
function setGrid2014Q3()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	

  //지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
	var strHeader0 = 
				"점번호|점명|PG명" 
               + "| \n거치식\n적립식\n예금\n\n(평잔)\n| \n거치식\n적립식\n예금\n\n(평잔)\n| \n거치식\n적립식\n예금\n\n(평잔)\n"
               + "| \n중\n저원가성\n예금\n\n(평잔)\n| \n중\n저원가성\n예금\n\n(평잔)\n| \n중\n저원가성\n예금\n\n(평잔)\n"
               + "| \n대\n출\n금\n\n(잔액)\n| \n대\n출\n금\n\n(잔액)\n| \n대\n출\n금\n\n(잔액)\n"
               + "| \n대\n출\n금\n\n(평잔)\n| \n대\n출\n금\n\n(평잔)\n| \n대\n출\n금\n\n(평잔)\n"
               + "| \n외\n환\n사\n업\n| \n외\n환\n사\n업\n| \n외\n환\n사\n업\n"
               ;

	var strHeader1 = 
				"점번호|점명|PG명" 
               + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)";

   	i=0;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2, AutoFitColWidth:"colhidden" } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];

   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	 {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	 {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
	mySheet.InitColumns(cols);

	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");
   	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
	mySheet.SetSplitMergeCell(1,5);
	
	for(col=3; col<18; col++ ) {
   		mySheet.SetCellAlign(0,col,"CenterTop");
   	}
}

/*--------------------------------------------*/
/* @기능 : 2014년도       기준 그리드 set     */
/*--------------------------------------------*/        
function setGrid2014()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	

  // 상위 GRID에 대한 속성정보 설정
   //지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
	var strHeader0 = 
		"점번호|점명|PG명" 
	   + "| \n예\n수\n금\n\n(평잔)\n| \n예\n수\n금\n\n(평잔)\n| \n예\n수\n금\n\n(평잔)\n"
	   + "| \n대\n출\n금\n\n(잔액)\n| \n대\n출\n금\n\n(잔액)\n| \n대\n출\n금\n\n(잔액)\n"
	   + "| \n대\n출\n금\n\n(평잔)\n| \n대\n출\n금\n\n(평잔)\n| \n대\n출\n금\n\n(평잔)\n"
	   + "| \n외\n환\n사\n업\n| \n외\n환\n사\n업\n| \n외\n환\n사\n업\n"
	   ;

	var strHeader1 = 
		"점번호|점명|PG명" 
   		+ "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)";

   	i=0;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2, AutoFitColWidth:"colhidden" } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);

	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
	mySheet.SetSplitMergeCell(1,5);
	
	for(col=3; col<16; col++ ) {
   		mySheet.SetCellAlign(0,col,"CenterTop");
   	}
}

/*--------------------------------------------*/
/* @기능 : 2013년도       기준 그리드 set     */
/*--------------------------------------------*/        
function setGrid2013()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
		"점번호|점명|PG명" 
	   + "| \n예\n수\n금\n\n(평잔)\n| \n예\n수\n금\n\n(평잔)\n| \n예\n수\n금\n\n(평잔)\n"
	   + "| \n대\n출\n금\n\n(잔액)\n| \n대\n출\n금\n\n(잔액)\n| \n대\n출\n금\n\n(잔액)\n"
	   + "| \n대\n출\n금\n\n(평잔)\n| \n대\n출\n금\n\n(평잔)\n| \n대\n출\n금\n\n(평잔)\n";

	var strHeader1 = 
		"점번호|점명|PG명" 
   		+ "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)";

   	i=0;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2, AutoFitColWidth:"colhidden" } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);

	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명");
	mySheet.SetSplitMergeCell(1,5);
	
	for(col=3; col<13; col++ ) {
   		mySheet.SetCellAlign(0,col,"CenterTop");
   	}
}

/*----------------------------------------*/
/* @기능 : 2012년도 하반기기준 그리드 set */
/*  분기평잔 추가                         */
/*----------------------------------------*/        
function setGrid201207()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
		"점번호|점명|PG명"
	   + "| \n총\n예\n수\n금\n\n(반기평잔)\n| \n총\n예\n수\n금\n\n(반기평잔)\n| \n총\n예\n수\n금\n\n(반기평잔)\n"
	   + "| \n총\n예\n수\n금\n\n(분기평잔)\n| \n총\n예\n수\n금\n\n(분기평잔)\n| \n총\n예\n수\n금\n\n(분기평잔)\n"
	   + "| \n대\n출\n금\n\n(순증평잔)\n| \n대\n출\n금\n\n(순증평잔)\n| \n대\n출\n금\n\n(순증평잔)\n"
	   + "| \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n";
	var strHeader1 =
		"점번호|점명|PG명" 
   		+"|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)";

   	i=0;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2, AutoFitColWidth:"colhidden" } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);

	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetDataLinkMouse(true);
    newSetActionMenu(mySheet,"엑셀내려받기");
   	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명");
	mySheet.SetSplitMergeCell(1,5);
	
	for(col=3; col<16; col++ ) {
   		mySheet.SetCellAlign(0,col,"CenterTop");
   	}
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
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
		"점번호|점명|PG명"
	   + "| \n총\n예\n수\n금\n\n(순증평잔)\n| \n총\n예\n수\n금\n\n(순증평잔)\n| \n총\n예\n수\n금\n\n(순증평잔)\n"
	   + "| \n총\n예\n수\n금\n\n(순증잔액)\n| \n총\n예\n수\n금\n\n(순증잔액)\n| \n총\n예\n수\n금\n\n(순증잔액)\n"
	   + "| \n대\n출\n금\n\n(순증평잔)\n| \n대\n출\n금\n\n(순증평잔)\n| \n대\n출\n금\n\n(순증평잔)\n"
	   + "| \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n";

	var strHeader1 = 
		"점번호|점명|PG명"
   		+"|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)";

   	i=0;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 , AutoFitColWidth:"colhidden"} );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);

	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");
   	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명");
	mySheet.SetSplitMergeCell(1,5);
	
	for(col=3; col<16; col++ ) {
   		mySheet.SetCellAlign(0,col,"CenterTop");
   	}
}

/*----------------------------------*/
/* @기능 : 2010년도 기준 그리드 set */
/*----------------------------------*/        
function setGrid2010()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
		"점번호|점명|PG명"  
	   + "| \n총\n예\n수\n금\n달\n성\n률\n\n(순증평잔)\n| \n총\n예\n수\n금\n달\n성\n률\n\n(순증평잔)\n| \n총\n예\n수\n금\n달\n성\n률\n\n(순증평잔)\n"
	   + "| \n총\n예\n수\n금\n달\n성\n률\n\n(순증잔액)| \n총\n예\n수\n금\n달\n성\n률\n\n(순증잔액)| \n총\n예\n수\n금\n달\n성\n률\n\n(순증잔액)"
	   + "| \n총\n예\n수\n금\n달\n성\n률\n\n(반기평잔)| \n총\n예\n수\n금\n달\n성\n률\n\n(반기평잔)| \n총\n예\n수\n금\n달\n성\n률\n\n(반기평잔)"
	   + "| \n중\n소\n기\n업\n등\n여\n신\n운\n용\n\n(순증평잔)\n| \n중\n소\n기\n업\n등\n여\n신\n운\n용\n\n(순증평잔)\n| \n중\n소\n기\n업\n등\n여\n신\n운\n용\n\n(순증평잔)\n"
	   + "| \n중\n소\n기\n업\n등\n여\n신\n운\n용\n\n(순증잔액)| \n중\n소\n기\n업\n등\n여\n신\n운\n용\n\n(순증잔액)| \n중\n소\n기\n업\n등\n여\n신\n운\n용\n\n(순증잔액)"
	   + "| \n중\n소\n기\n업\n등\n여\n신\n운\n용\n\n(반기평잔)| \n중\n소\n기\n업\n등\n여\n신\n운\n용\n\n(반기평잔)| \n중\n소\n기\n업\n등\n여\n신\n운\n용\n\n(반기평잔)"
	   + "| \n외\n환\n취\n급\n고| \n외\n환\n취\n급\n고| \n외\n환\n취\n급\n고"
	   + "| \n퇴\n직\n연\n금| \n퇴\n직\n연\n금| \n퇴\n직\n연\n금";
	
	var strHeader1 = 
		"점번호|점명|PG명"  
   		+"|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)";

   	i=0;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2, AutoFitColWidth:"colhidden" } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);

	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(18,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(22,1);
	mySheet.SetColHidden(24,1);
	mySheet.SetColHidden(25,1);
	mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");
   	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명");
	mySheet.SetSplitMergeCell(1,5);
	
	for(col=3; col<27; col++ ) {
   		mySheet.SetCellAlign(0,col,"CenterTop");
   	}

}

/*----------------------------------*/
/* @기능 : 2011년도 기준 그리드 set */
/*----------------------------------*/        
function setGrid2011()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 =
		"점번호|점명|PG명"   
      + "| \n총\n예\n수\n금\n\n(순증평잔)\n| \n총\n예\n수\n금\n\n(순증평잔)\n| \n총\n예\n수\n금\n\n(순증평잔)\n"
      + "| \n총\n예\n수\n금\n\n(순증잔액)\n| \n총\n예\n수\n금\n\n(순증잔액)\n| \n총\n예\n수\n금\n\n(순증잔액)\n"
      + "| \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n";
	var strHeader1 = 
		"점번호|점명|PG명"  
      +"|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)";

    i=0;

    mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2, AutoFitColWidth:"colhidden" } );

    var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
       
	mySheet.InitColumns(cols);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetColHidden(3,1);
    mySheet.SetColHidden(4,1);
    mySheet.SetColHidden(6,1);
    mySheet.SetColHidden(7,1);
    mySheet.SetColHidden(9,1);
    mySheet.SetColHidden(10,1);
    mySheet.SetDataLinkMouse(true);
    newSetActionMenu(mySheet,"엑셀내려받기");
    mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명");
	mySheet.SetSplitMergeCell(1,5);
	
	for(col=3; col<12; col++ ) {
      	mySheet.SetCellAlign(0,col,"CenterTop");
	}
}
