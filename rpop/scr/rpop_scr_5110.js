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

  	doAction("기준년월");

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
    initGrid();
    setGubun();

    if( basemonth >= '201801') {
        document.frm.sergb.disabled = true;
    } else if ( basemonth >= '201707') {        // 17년 하반기 신규잔액 평가
        document.frm.sergb.disabled = true;
        document.frm.sergb.value = 12;
    } else if( basemonth >= '201701') {  // 17년 상반기 순증잔액 평가
        document.frm.sergb.disabled = true;
        document.frm.sergb.value = 11;
    } else if( basemonth >= '201607') { // 16년 하반기 신규잔액 평가 우선조회
        document.frm.sergb.disabled = true;
        document.frm.sergb.value = 12;
    }

    basemonth   = document.frm.basemonth.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=7&pggubun=3");

}

/*---------------------------------------------------
  조회구분 : 연도별 조회내용이 바뀌어 이곳에서 처리
---------------------------------------------------*/
function setGubun(){

	basemonth   = document.frm.basemonth.value;

  	var sergbArr = new Array();

  	if(basemonth >= '201901'){
    	sergbArr[0] = new Array('11','순증잔액');
    } else if(basemonth >= '201807'){
        sergbArr[0] = new Array('2', '신규잔액');
    } else if(basemonth < '201601'){
	  	sergbArr[0] = new Array('2', '잔액');
	  	sergbArr[1] = new Array('3', '반기평잔');
	  	sergbArr[2] = new Array('4', '분기평잔');
    } else {
  		sergbArr[0] = new Array('11', '순증잔액');
  		sergbArr[1] = new Array('12', '신규잔액');
    }

	setCombo(sergbArr);
}

function setCombo(sergbArr){
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
    sergb       = document.frm.sergb.value;

    switch(sAction)
    {
        case "고정필드설정":
        	mySheet.SetFrozenCol(mySheet.MouseCol());
        	ufSetMergeCell(mySheet, mySheet.HeaderRows(), 0, 1,4);
        	break;
        case "고정필드해제":
        	mySheet.SetFrozenCol(0);
        	ufSetMergeCell(mySheet, mySheet.HeaderRows(), 0, 1,4);
        	break;
        case "기준년월":             // 조회(상위 GRID)
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&stmonth=201807");
            break;
        case "조회":             // 조회(상위 GRID)
            mySheet.DoSearch("rpop.scr.rpop_scr_5110.do?hidden_key=9&basemonth="+basemonth+"&pgcode="+pgcode+"&sergb="+sergb);
            break;
        case "엑셀내려받기":    // 엑셀내려받기
            inqText       = new Array();
            inqText[0]    = new Array();
            inqText[0][0] = "작업기준년월";
            inqText[0][1] = basemonth;
            inqText[1]    = new Array();
            inqText[1][0] = "PG명";
            inqText[1][1] = document.frm.pgcode.options[document.frm.pgcode.selectedIndex].text;
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

    if ( basemonth <= '201312')  setGrid2012();
    else if( basemonth <= '201406')  setGrid2014();
    else if( basemonth <= '201412')  setGrid2014Q3();
    else if( basemonth <= '201506')  setGrid2015();
    else if( basemonth <= '201512')  setGrid2015Q3();
    else if( basemonth <= '201606')  setGrid2016();
    else if( basemonth <= '201612')  setGrid2016Q3();
    else if( basemonth <= '201806')  setGrid2017();
    else if( basemonth <= '201812')  setGrid2018Q3();
    else if( basemonth <= '201906')  setGrid2019H1();
    else if( basemonth <= '201912')  setGrid2019H2();
    else if( basemonth <= '202006')  setGrid2020H1();
    else if( basemonth <= '202012')  setGrid2020H2();
    else if( basemonth <= '202106')  setGrid2021H1();
	else if( basemonth <= '202112')  setGrid2021H2();
    else setGrid2022H1();
}

/*-------------------------------------------*/
/* @기능 : 2022년도 상반기 기준 그리드 set   */
/*-------------------------------------------*/
function setGrid2022H1()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "490px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = "점번호|RM(본부)|RM(본부)|PG명|총금액|총금액(A)\n(월중평잔적용)|"                                                       //6
    	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"          //9
        +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                      //8
        +"누증실적\n(C)=(A+B)|토지분양대출\n차감실적(D)|외화관련여신\n(E)|최종누증실적\n(F)=(C+D+E)|"                            //4
        +"기준실적\n(G)|순증실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)|"                                                        //4
        ;

	var strHeader1 = 
    	"점번호|직원번호|성명|PG명|총금액|총금액(A)\n(월중평잔적용)|"                                                           //6
        +"소계|IB관련실적|고정이하|원리금연체|재수관|단기신규해지|마케팅제외|가중치\n최종 실적*|"                                //8
        +"보증서담보|SH사회적경제|동반성장협약|기술금융|관계형금융|수산해양|금융중개지원|평가제외|기타조정|"                     //8
        +"누증실적\n(C)=(A+B)|토지분양대출\n차감실적(D)|외화관련여신\n(E)|최종누증실적\n(F)=(C+D+E)|"                            //4
        +"기준실적\n(G)|순증실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)|"                                                        //4
        ;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];

    mySheet.InitColumns(cols);

	for(i=14;i<=20;i++) {
    	mySheet.SetColHidden(i, 1);
    }

    for(i=21;i<=27;i++) {
    	mySheet.SetColHidden(i, 0);
    }
 
	mySheet.SetCountPosition(1);
    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetHeaderRowHeight(32);
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %");
}

/*-------------------------------------------*/
/* @기능 : 2021년도 하반기 기준 그리드 set   */
/*-------------------------------------------*/
function setGrid2021H2()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "490px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
	
  // 상위 GRID에 대한 속성정보 설정
   	var strHeader0 =  
	   	"점번호|RM(본부)|RM(본부)|PG명|총금액|총금액(A)\n(월중평잔적용)|"                                                       //6
		+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                  //7
	    +"누증실적\n(C)=(A+B)|이관실적조정\n(D)|신규중도금실적\n(E)|최종누증실적\n(F)=(C+D+E)|"                                  //4
	    +"기준실적\n(G)|순증실적\n(H)=(F-G)|밴드범위\n(I)|밴드범위이탈금액\n(J)=(H-I)"                                           //4
		;
	
   	var strHeader1 =  
	   	"점번호|직원번호|성명|PG명|총금액|총금액(A)\n(월중평잔적용)|"                                                           //6
		+"소계|IB관련실적|재수관|단기신규해지|마케팅제외|평가제외|기타조정|"                                                     //7
	    +"누증실적\n(C)=(A+B)|이관실적조정\n(D)|신규중도금실적\n(E)|최종누증실적\n(F)=(C+D+E)|"                                  //4
	    +"기준실적\n(G)|순증실적\n(H)=(F-G)|밴드범위\n(I)|밴드범위이탈금액\n(J)=(H-I)"                                           //4
		;
	
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   
   	mySheet.InitHeaders(headers, info);

	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
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
             {Type:"Text",      Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetHeaderRowHeight(32);
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %");
}

/*-------------------------------------------*/
/* @기능 : 2021년도 상반기 기준 그리드 set   */
/*-------------------------------------------*/
function setGrid2021H1()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
  	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "490px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
  
  // 상위 GRID에 대한 속성정보 설정
   	var strHeader0 =  
	   	"점번호|RM(본부)|RM(본부)|PG명|총금액|총금액(A)\n(월중평잔적용)|"                                                       //6
		+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"          //9
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"          //9
	   	+"누증실적\n(C)=(A+B)|토지분양대출\n차감실적\n(D)|외화관련여신\n(E)|연안선박\n신규실적\n(F)|최종누증실적\nG=(C+D+E+F)|"  //5
	   	+"기준실적\n(H)|순증실적\n(I)=(G-H)|목표\n(J)|달성률\n(K)=(I/J)"                                                         //4
		;
	
   	var strHeader1 =  
	   	"점번호|직원번호|성명|PG명|총금액|총금액(A)\n(월중평잔적용)|"                                                           //6
		+"소계|IB관련실적|고정이하|원리금연체|재수관|단기신규해지|마케팅제외|가중치\n최종 실적*|"                                //8
	   	+"보증서담보|SH사회적경제|동반성장협약|기술금융|관계형금융|수산해양|금융중개지원|당행담보연계|평가제외|기타조정|"        //10
	   	+"누증실적\n(C)=(A+B)|토지분양대출\n차감실적\n(D)|외화관련여신\n(E)|연안선박\n신규실적\n(F)|최종누증실적\nG=(C+D+E+F)|"  //5
	   	+"기준실적\n(H)|순증실적\n(I)=(G-H)|목표\n(J)|달성률\n(K)=(I/J)"                                                         //4
		;
	
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
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

	for(i=14;i<=21;i++) {
   		mySheet.SetColHidden(i,1);
   	}

   	for(i=22;i<=29;i++) {
   		mySheet.SetColHidden(i,1);
   	}
 
	mySheet.SetCountPosition(1);
   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetHeaderRowHeight(32);
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %");
}

/*-------------------------------------------*/
/* @기능 : 2020년도 하반기 기준 그리드 set   */
/*-------------------------------------------*/
function setGrid2020H2()
{
  //mySheet = document.frm.mySheet;
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
  	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "490px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
  
  // 상위 GRID에 대한 속성정보 설정
   	var strHeader0 =  
	   	"점번호|RM(본부)|RM(본부)|PG명|총금액|총금액(A)\n(월중평잔적용)|"                         //6
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                            //5
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"    //7
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"    //7
	   	+"누증실적\n(C)=(A+B)|토지분양대출\n차감실적\n(D)|외화관련여신\n(E)|연안선박\n신규실적\n(F)|최종누증실적\nG=(C+D+E+F)|"  //5
	   	+"기준실적\n(H)|실적\n(I)=(G-H)|목표\n(J)|달성률\n(K)=(I/J)"                               //4
	   	;

	var strHeader1 =  
	   	"점번호|직원번호|성명|PG명|총금액|총금액(A)\n(월중평잔적용)|"                             //6
	   	+"소계|해양투자금융|고정이하|원리금연체|재수관|"                                           //5
	   	+"단기신규해지|마케팅제외|가중치\n최종 실적*|보증서담보|SH사회적경제|SH영세소상공인|"      //6
	   	+"기술금융|관계형금융|농신보|금융중개지원|당행담보연계|수산해양|평가제외|기타조정|"        //8
	   	+"누증실적\n(C)=(A+B)|토지분양대출\n차감실적\n(D)|외화관련여신\n(E)|연안선박\n신규실적\n(F)|최종누증실적\nG=(C+D+E+F)|"  //5
	   	+"기준실적\n(H)|실적\n(I)=(G-H)|목표\n(J)|달성률\n(K)=(I/J)"                               //4
	   	;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
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
   	mySheet.SetCellBackColor(1,14,"#FFEFBF");
   	mySheet.SetCellBackColor(1,15,"#FFEFBF");
   	mySheet.SetCellBackColor(1,16,"#FFEFBF");
   	mySheet.SetCellBackColor(1,17,"#FFEFBF");
   	mySheet.SetCellBackColor(1,18,"#FFEFBF");
   	mySheet.SetCellBackColor(1,19,"#FFEFBF");
   	mySheet.SetCellBackColor(1,20,"#FFEFBF");
   	mySheet.SetCellBackColor(1,21,"#FFEFBF");
   	mySheet.SetCellBackColor(1,22,"#FFEFBF");
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetColHidden(14,1);
   	mySheet.SetColHidden(15,1);
   	mySheet.SetColHidden(16,1);
   	mySheet.SetColHidden(17,1);
   	mySheet.SetColHidden(18,1);
   	mySheet.SetColHidden(19,1);
   	mySheet.SetColHidden(20,1);
   	mySheet.SetColHidden(21,1);
   	mySheet.SetColHidden(22,1);
   	mySheet.SetHeaderRowHeight(32);
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %");
}

/*-------------------------------------------*/
/* @기능 : 2020년도 상반기 기준 그리드 set   */
/*-------------------------------------------*/
function setGrid2020H1()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
  	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "490px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
  
  // 상위 GRID에 대한 속성정보 설정
   	var strHeader0 =  
	   	"점번호|RM(본부)|RM(본부)|PG명|총금액|총금액(A)\n(월중평잔적용)|"                         //6
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                            //5
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                //6
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                //6
	   	+"누증실적\n(C)=(A+B)|토지분양대출\n차감실적\n(D)|외화관련여신\n(E)|연안선박\n신규실적\n(F)|최종누증실적\nG=(C+D+E+F)|"  //5
	   	+"기준실적\n(H)|실적\n(I)=(G-H)|목표\n(J)|달성률\n(K)=(I/J)"                               //4
	   	;

   	var strHeader1 =  
	   	"점번호|직원번호|성명|PG명|총금액|총금액(A)\n(월중평잔적용)|"                             //6
	   	+"소계|해양투자금융|고정이하|원리금연체|재수관|"                                           //5
	   	+"단기신규해지|마케팅제외|가중치\n최종 실적*|보증서담보|금융중개|수산해양일반|"            //6
	   	+"기술금융|관계형금융|농신보|당행담보연계|평가제외|기타조정|"                              //6
	   	+"누증실적\n(C)=(A+B)|토지분양대출\n차감실적\n(D)|외화관련여신\n(E)|연안선박\n신규실적\n(F)|최종누증실적\nG=(C+D+E+F)|"  //5
	   	+"기준실적\n(H)|실적\n(I)=(G-H)|목표\n(J)|달성률\n(K)=(I/J)"                               //4
	   	;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
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
   	mySheet.SetCellBackColor(1,14,"#FFEFBF");
   	mySheet.SetCellBackColor(1,15,"#FFEFBF");
   	mySheet.SetCellBackColor(1,16,"#FFEFBF");
   	mySheet.SetCellBackColor(1,17,"#FFEFBF");
   	mySheet.SetCellBackColor(1,18,"#FFEFBF");
   	mySheet.SetCellBackColor(1,19,"#FFEFBF");
   	mySheet.SetCellBackColor(1,20,"#FFEFBF");
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetColHidden(14,1);
   	mySheet.SetColHidden(15,1);
   	mySheet.SetColHidden(16,1);
   	mySheet.SetColHidden(17,1);
   	mySheet.SetColHidden(18,1);
   	mySheet.SetColHidden(19,1);
   	mySheet.SetColHidden(20,1);
   	mySheet.SetHeaderRowHeight(32);
   	newSetActionMenu(mySheet,"엑셀내려받기");
   	showUnitText("원, %");
}

/*-------------------------------------------*/
/* @기능 : 2019년도 하반기 기준 그리드 set   */
/*-------------------------------------------*/
function setGrid2019H2()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
  	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "490px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
  
  // 상위 GRID에 대한 속성정보 설정
   var strHeader0 =  
	   "점번호|RM(본부)|RM(본부)|PG명|총금액|총금액(A)\n(월중평잔적용)|"                         //6
	   +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                            //5
	   +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                            //5
	   +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                            //5
	   +"누증실적\n(C)=(A+B)|토지분양대출\n차감실적\n(D)|외화관련여신\n(E)|최종누증실적\nF=(C+D+E)|"  //4
	   +"기준실적\n(G)|실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)"                               //4
	   ;

   var strHeader1 =  
	   "점번호|직원번호|성명|PG명|총금액|총금액(A)\n(월중평잔적용)|"                             //6
	   +"소계|해양투자금융|고정이하|원리금연체|단기신규해지|"                                     //5 조정내역(B)
	   +"마케팅제외|재수관|주택금융공사\n양도금액|가중치\n최종 실적*|보증서담보|"                 //5 조정내역(B)
	   +"기술금융|수산해양일반|금융중개지원|평가제외|기타조정|"                                   //5 조정내역(B)
	   +"누증실적\n(C)=(A+B)|토지분양대출\n차감실적\n(D)|외화관련여신\n(E)|최종누증실적\nF=(C+D+E)|"  //4
	   +"기준실적\n(G)|실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)"                               //4
	   ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
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
   	mySheet.SetColHidden(15,1);
   	mySheet.SetColHidden(16,1);
   	mySheet.SetColHidden(17,1);
   	mySheet.SetColHidden(18,1);
   	mySheet.SetHeaderRowHeight(32);
   	newSetActionMenu(mySheet,"엑셀내려받기");
   	showUnitText("원, %");
}

/*-------------------------------------------*/
/* @기능 : 2019년도 상반기 기준 그리드 set   */
/*-------------------------------------------*/
function setGrid2019H1()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
  	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "490px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
  
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 =  
	   "점번호|직원번호|성명|PG명|총금액|총금액(A)\n(월중평잔적용)|"                             //6
	   +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                            //5
	   +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                            //5
	   +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                        //4
	   +"누증실적\n(C)=(A+B)|무역금융 실적\n(D)|토지분양대출\n실적 (E)|최종누증실적\nF=(C+D+E)|"  //4
	   +"기준실적\n(G)|실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)"                               //4
	   ;

   	var strHeader1 =  
	   "점번호|직원번호|성명|PG명|총금액|총금액(A)\n(월중평잔적용)|"                             //6
	   +"소계|고정이하|원리금연체|단기신규해지|마케팅제외|"                                       //5 조정내역(B)
	   +"재수관|주택금융공사\n양도금액|가중치\n최종 실적*|보증서담보|기술금융|"                   //5 조정내역(B)
	   +"관계형금융|금융중개지원|평가제외|기타조정|"                                              //4 조정내역(B)
	   +"누증실적\n(C)=(A+B)|무역금융 실적\n(D)|토지분양대출\n실적 (E)|최종누증실적\nF=(C+D+E)|"  //4
	   +"기준실적\n(G)|실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)"                               //4
	   ;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
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
   	mySheet.SetColHidden(14,1);
   	mySheet.SetColHidden(15,1);
   	mySheet.SetColHidden(16,1);
   	mySheet.SetColHidden(17,1);
   	mySheet.SetHeaderRowHeight(32);
   	newSetActionMenu(mySheet,"엑셀내려받기");
   	showUnitText("원, %");
}

/*-------------------------------------------*/
/* @기능 : 2018년도 하반기 기준 그리드 set   */
/*-------------------------------------------*/
function setGrid2018Q3()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
  	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "490px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
  

  // 상위 GRID에 대한 속성정보 설정
   var strHeader0 =  
	   "점번호|점명|PG명|총금액|총금액(A)\n(월중평잔적용)|"                                  //5
	   +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                        //5
	   +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                        //5
	   +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                        //5
	   +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                        //5
	   +"누증실적\n(C)=(A+B)|외화대출 실적\n(D)|무역금융 실적\n(E)|최종누증실적\nF=(C+D+E)|"  //4
	   +"기준실적\n(G)|실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)"                           //4
	   ;

   var strHeader1 =  
	   "점번호|점명|PG명|총금액|총금액(A)\n(월중평잔적용)|"                                  //5
	   +"소계|고정이하|원리금연체|단기신규해지|마케팅제외|"                                   //5 조정내역(B)
	   +"재수관|주택금융공사\n양도금액|비대면실적|보증서담보|법인여신|"                       //5 조정내역(B)
	   +"행복실버|신바람|MY편의점|NEW\n땡큐사장님|SH안전협약|"                                //5 조정내역(B)
	   +"기술금융|관계형금융|금융중개지원|평가제외|기타조정|"                                 //5 조정내역(B)
	   +"누증실적\n(C)=(A+B)|외화대출 실적\n(D)|무역금융 실적\n(E)|최종누증실적\nF=(C+D+E)|"  //4
	   +"기준실적\n(G)|실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)"                           //4
	   ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|+|16|+|17|+|18|+|19|+|20|+|21|+|22|+|23|+|24|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
   	mySheet.SetHeaderRowHeight(26);
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
	
  	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "490px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
	
  	basemonth   = document.frm.basemonth.value;

  // 상위 GRID에 대한 속성정보 설정
   	var strHeader0 =  
	   "점번호|점명|PG명|총금액|총금액\n(월중평잔적용)\n(A)|"
	   +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	   +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	   +"누증실적\n(C)=(A+B)|기준실적\n(D)|실적\n(E)=(C-D)|목표\n(F)|달성률\n(G)=(E/F)"
	   ;
   	var strHeader1 =  
	   "점번호|점명|PG명|총금액|총금액\n(월중평잔적용)\n(A)|"
	   +"소계|해양투자금융|고정이하|원리금연체|구조조정여신|단기신규해지|마케팅제외|기술금융|관계형금융|금융중개\n지원대출|"
	   +"연안선박자금|토지분양대출|중도금|보증서\n담보|재수관대출|무역금융|주택금융공사\n양도금액|신규여신|수산해양여신|기타실적차감|"
	   +"누증실적\n(C)=(A+B)|기준실적\n(D)|실적\n(E)=(C-D)|목표\n(F)|달성률\n(G)=(E/F)"
	   ;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|+|16|+|17|+|18|+|19|+|20|+|21|+|22|+|23|+|24|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
	if  (basemonth >= '201707') {
   		cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	} else {
   		cols.push({Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	}
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	cols.push({Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|27|/|28|*100",Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
 
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	newSetActionMenu(mySheet,"엑셀내려받기");
}

/*---------------------------------------------*/
/* @기능 : 2016년도 하반기 기준 그리드 set     */
/*---------------------------------------------*/
function setGrid2016Q3()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
  	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "490px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
  
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 =  
	   	"점번호|점명|PG명|총금액|총금액\n(월중평잔적용)\n(A)|"
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	   	+"누증실적\n(C)=(A+B)|기준실적\n(D)|실적\n(E)=(C-D)|목표\n(F)|달성률\n(G)=(E/F)"
	   	;

   	var strHeader1 =  
	   	"점번호|점명|PG명|총금액|총금액\n(월중평잔적용)\n(A)|"
	   	+"소계|해양투자금융|고정이하|원리금연체|구조조정여신|단기신규해지|마케팅제외|부동산업,비호텔업|(특별)관리업종|제조업종\n(온랜딩 포함)|신용위험부담부\n온랜딩대출|"
	   	+"수산해양일반\n자금대출|기술금융|관계형금융|핀테크업종|금융중개\n지원대출|연안선박자금|토지분양대출|중도금|보증서\n담보|재수관대출|"
	   	+"무역금융|주택금융공사\n양도금액|전략여신제외|기타조정|"
	   	+"누증실적\n(C)=(A+B)|기준실적\n(D)|실적\n(E)=(C-D)|목표\n(F)|달성률\n(G)=(E/F)"
	   	;

  	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

  	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
  	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
  	mySheet.InitHeaders(headers, info);

  	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
         {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
         {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
         {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|+|16|+|17|+|18|+|19|+|20|+|21|+|22|+|23|+|24|+|25|+|26|+|27|+|28|+|29|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
         {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|32|/|33|*100",Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
   
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
	
  	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "490px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
  
  // 상위 GRID에 대한 속성정보 설정
   	var strHeader0 =  
	   "점번호|점명|PG명|총금액|총금액\n(월중평잔적용)\n(A)|"
	   +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	   +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	   +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	   +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C-D)|순증목표\n(F)|달성률\n(G)=(E/F)"
	   ;

	var strHeader1 =  
	   "점번호|점명|PG명|총금액|총금액\n(월중평잔적용)\n(A)|"
	   +"소계|해양투자금융|고정이하|원리금연체|구조조정여신|단기신규해지|마케팅제외|부동산업,비호텔업|(특별)관리업종|제조업종\n(온랜딩 포함)|신용위험부담부\n온랜딩대출|"
	   +"수산해양일반\n자금대출|기술금융|관계형금융|핀테크업종|금융중개\n지원대출|연안선박자금|토지분양대출|중도금|보증서\n담보|재수관대출|"
	   +"무역금융|주택금융공사\n양도금액|신규외화대출|기타조정|"
	   +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C-D)|순증목표\n(F)|달성률\n(G)=(E/F)"
	   ;

  	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5 } );

  	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
  	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
  	mySheet.InitHeaders(headers, info);

  	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
         {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
         {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
         {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|+|16|+|17|+|18|+|19|+|20|+|21|+|22|+|23|+|24|+|25|+|26|+|27|+|28|+|29|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
         {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|32|/|33|*100",Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
   
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
	
  	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "490px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
  
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 =
	   	"점번호|점명|PG명|총금액|총금액\n(월중평잔적용)\n(A)|"  
	    +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	   	+"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C-D)|순증목표\n(F)|달성률\n(G)=(E/F)|"
	   	;

	var strHeader1 =  
	   	"점번호|점명|PG명|총금액|총금액\n(월중평잔적용)\n(A)|"
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	   	+"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C-D)|순증목표\n(F)|달성률\n(G)=(E/F)|"
	   	;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
	if ( basemonth <= '201508') {
   		mySheet.SetColHidden(12,1);
   		mySheet.SetColHidden(13,1);
   	}
 
	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	newSetActionMenu(mySheet,"엑셀내려받기");
   	showUnitText("원, %");
}

/*---------------------------------------------*/
/* @기능 : 2015년도 기준 그리드 set            */
/*---------------------------------------------*/
function setGrid2015()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
  	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "490px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
  
  // 상위 GRID에 대한 속성정보 설정
   	var strHeader0 =  
   	"점번호|점명|PG명|총금액|총금액\n(월중평잔적용)\n(A)|"
   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
   	+"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C-D)|순증목표\n(F)|달성률\n(G)=(E/F)|"
   	;

   	var strHeader1 =  
   	"점번호|점명|PG명|총금액|총금액\n(월중평잔적용)\n(A)|"
   	+"소계|해양투자금융|고정이하|원리금연체|임직원가족|단기신규해지|마케팅대상제외|구매/판매카드\n인정|신규외화대출|"
   	+"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C-D)|순증목표\n(F)|달성률\n(G)=(E/F)|"
   	;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
/* @기능 : 2014년도 하반기 기준 그리드 set     */
/*---------------------------------------------*/
function setGrid2014Q3()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
  	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "490px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
  
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 =  
	   	"점번호|점명|PG명|총금액|총금액\n(월중평잔적용)\n(A)|"
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	   	+"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C-D)|순증목표\n(F)|달성률\n(G)=(E/F)|"
	   	;

   	var strHeader1 =  
	   	"점번호|점명|PG명|총금액|총금액\n(월중평잔적용)\n(A)|"
	   	+"소계|해양투자금융|고정이하|원리금연체|임직원가족|단기신규해지|마케팅대상제외|구매/판매카드\n인정|"
	   	+"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C-D)|순증목표\n(F)|달성률\n(G)=(E/F)|"
	   	;

    mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|6|+|7|+|8|+|9|+|10|+|11|+|12|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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

/*---------------------------------------*/
/* @기능 : 2014년도  기준 그리드 set     */
/*---------------------------------------*/
function setGrid2014()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
  	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "490px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
  
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 =  
	    "점번호|점명|PG명|총금액|총금액\n(월중평잔적용)\n(A)|"
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	   	+"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C-D)|순증목표\n(F)|달성률\n(G)=(E/F)|"
	   	;

	var strHeader1 =  
	   	"점번호|점명|PG명|총금액|총금액\n(월중평잔적용)\n(A)|"
	   	+"소계|해양투자금융|고정이하|원리금연체|임직원가족|단기신규해지|마케팅대상제외|"
	   	+"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C-D)|순증목표\n(F)|달성률\n(G)=(E/F)|"
	   	;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|6|+|7|+|8|+|9|+|10|+|11|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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

/*---------------------------------------*/
/* @기능 : 2012년도  기준 그리드 set     */
/*---------------------------------------*/
function setGrid2012()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
  	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "490px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
  
  // 상위 GRID에 대한 속성정보 설정
   var strHeader0 =  
	   "점번호|점명|PG명|총금액\n(A)|"                                                                       // 4
	   +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"    // 8
	   +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|순증목표\n(F)|달성률\n(G)=(E)/(F)|"          //5
	   ;

   var strHeader1 =  
	   "점번호|점명|PG명|총금액\n(A)|"                                                              //4
	   +"소계|해양투자금융|고정이하|원리금연체|가계대출|임직원가족|단기신규해지|마케팅대상제외|"     // 조정내역(B) 8
	   +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|순증목표\n(F)|달성률\n(G)=(E)/(F)|"
	   ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
