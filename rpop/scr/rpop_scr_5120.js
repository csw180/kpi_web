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
	     
    basemonth   = document.frm.basemonth.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=7&pggubun=3");
    
    setGubun();  
}

function setGubun(){

    basemonth   = document.frm.basemonth.value;
    
    var sergbArr = new Array();

    if( basemonth >= '201807'){
        sergbArr[0] = new Array('3', '반기평잔');
        sergbArr[1] = new Array('2', '잔액');
    } else if( basemonth >= '201207' && basemonth <= '201212' ){
        sergbArr[0] = new Array('3', '반기평잔');
        sergbArr[1] = new Array('4', '분기평잔');  //2012년7월 하반기부터 분기평잔생성
        sergbArr[2] = new Array('2', '잔액');
    } else if( basemonth <= '201412') {
        sergbArr[0] = new Array('2', '잔액');
        sergbArr[1] = new Array('3', '반기평잔');
    } else if( basemonth <= '201512') {
        sergbArr[0] = new Array('3', '반기평잔');
        sergbArr[1] = new Array('2', '잔액');
        sergbArr[2] = new Array('4', '분기평잔');  //2015년 분기평잔생성
    } else if( basemonth == '201706' || basemonth == '201712' ) {
        sergbArr[0] = new Array('3', '반기평잔');
        sergbArr[1] = new Array('2', '잔액');
        sergbArr[2] = new Array('5', '월중평잔');
    } else {
        sergbArr[0] = new Array('3', '반기평잔');
        sergbArr[1] = new Array('2', '잔액');
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
        	ufSetMergeCell(mySheet, mySheet.HeaderRows(), 0, 1,3);
        	break;
        case "고정필드해제":
        	mySheet.SetFrozenCol(0);
        	ufSetMergeCell(mySheet, mySheet.HeaderRows(), 0, 1,3);
        	break;
        case "기준년월":             // 조회(상위 GRID)
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&stmonth=201807");         
            break;
        case "조회":             // 조회(상위 GRID)
            mySheet.DoSearch("rpop.scr.rpop_scr_5120.do?hidden_key=9&basemonth="+basemonth+"&pgcode="+pgcode+"&sergb="+sergb); 
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
    
	if (basemonth >= '202107')  setGrid2022H1();
    else if(basemonth >= '202107') setGrid2021H2();
    else if(basemonth >= '202001') setGrid2020H1();
    else if (basemonth >= '201907')  setGrid2019H2();
    else if (basemonth >= '201901')  setGrid2019H1();
    else if (basemonth >= '201807')  setGrid2018Q3();
    else if (basemonth <= '201406')  setGrid2012();
    else if (basemonth <= '201512')  setGrid2014Q3();
    else if (basemonth <= '201612')  setGrid2016();
    else  setGrid2017();
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
    var strHeader0 = "점번호|RM(본부)|RM(본부)|PG명|총금액|총금액(A)\n(잔액:월평적용)|"                                  //6
    	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                          //6
        +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"              //7
        +"누증실적\n(C)=(A+B)|외화예수금\n순증실적(D)|최종 누증실적\n(E)=(C+D)|"                             //3
        +"조정전\n기준실적(F)|조정후\n기준실적(G)|순증실적\n(H)=(E-G)|목표\n(I)|달성률\n(J)=(H/I)"           //5
        ;

	var strHeader1 = "점번호|직원번호|성명|PG명|총금액|총금액(A)\n(잔액:월평적용)|"                                      //6
    	+"소계|금융기관성|타지점|본부조달|구속성예금|임직원|"                                                //6
        +"단기신규해지|본부마케팅|거액조달처|마케팅제외|독도상품실적|평가제외|기타조정|"                     //7
        +"누증실적\n(C)=(A+B)|외화예수금\n순증실적(D)|최종 누증실적\n(E)=(C+D)|"                             //3
        +"조정전\n기준실적(F)|조정후\n기준실적(G)|순증실적\n(H)=(E-G)|목표\n(I)|달성률\n(J)=(H/I)"           //5
        ;
        
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
                    { Text:strHeader1, Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|+|16|+|17|",Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
	mySheet.SetCountPosition(1);
    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetHeaderRowHeight(26);
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
	    "점번호|RM(본부)|RM(본부)|PG명|총금액|총금액(A)\n(잔액:월평적용)|"                                  //6
	    +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                      //5
	    +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                          //6
	    +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|" //4
	    +"조정전\n기준실적(F)|조정후\n기준실적(G)|순증실적\n(H)=(G-E)|목표\n(I)|달성률\n(J)=(H/I)";

	var strHeader1 =  
	   	"점번호|직원번호|성명|PG명|총금액|총금액(A)\n(잔액:월평적용)|"                                      //6
	    +"소계|금융기관성|본부조달|임직원|단기신규해지|"                                                     //5
	    +"본부마케팅|마케팅제외|독도상품실적|거액조달처|평가제외|기타조정|"                                  //6
	    +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|" //4
	    +"조정전\n기준실적(F)|조정후\n기준실적(G)|순증실적\n(H)=(G-E)|목표\n(I)|달성률\n(J)=(H/I)";

    mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|+|16|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
	    "점번호|RM(본부)|RM(본부)|PG명|총금액|총금액(A)\n(잔액:월평적용)|"                                  //6
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                      //5
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                          //6
	   	+"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|" //4
	   	+"조정전\n기준실적(F)|조정후\n기준실적(G)|순증실적\n(H)=(G-E)|목표\n(I)|달성률\n(J)=(H/I)";
   
	var strHeader1 =  
	  	"점번호|직원번호|성명|PG명|총금액|총금액(A)\n(잔액:월평적용)|"                                      //6
	   	+"소계|금융기관성|본부조달|임직원가족|단기신규해지|"                                                 //5
	   	+"본부마케팅|마케팅제외|독도상품실적|거액조달처|평가제외|기타조정|"                                  //6
	   	+"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|" //4
	   	+"조정전\n기준실적(F)|조정후\n기준실적(G)|순증실적\n(H)=(G-E)|목표\n(I)|달성률\n(J)=(H/I)";
   
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|+|16|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
	    "점번호|RM(본부)|RM(본부)|PG명|총금액|총금액(A)\n(월중평잔적용)|"                               //6
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                  //5
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                  //5
	   	+"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|최종 누증실적\n(E)=(C+D)|"                       //3
	   	+"조정전\n기준실적(F)|조정후\n기준실적(G)|순증실적\n(H)=(G-E)|목표\n(I)|달성률\n(J)=(H/I)"       //5
	   	;

   	var strHeader1 =  
	   	"점번호|직원번호|성명|PG명|총금액|총금액(A)\n(월중평잔적용)|"                                   //6
	   	+"소계|금융기관성|본부조달|임직원가족|단기신규해지|"                                             //5 조정내역(B)
	   	+"본부마케팅|마케팅제외|독도상품실적|평가제외|기타조정|"                                         //5 조정내역(B)
	   	+"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|최종 누증실적\n(E)=(C+D)|"                       //3
	   	+"조정전\n기준실적(F)|조정후\n기준실적(G)|순증실적\n(H)=(G-E)|목표\n(I)|달성률\n(J)=(H/I)"       //5
	   	;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
	    "점번호|RM(센터)|RM(센터)|PG명|총금액|총금액(A)\n(월중평잔적용)|"              //6
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                 //5
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                 //5
	   	+"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|거액예수금\n차감(E)|최종 누증실적\n(F)=(C+D+E)|"  //4
	   	+"기준실적\n(G)|순증실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)"                //4
	   	;

	var strHeader1 =  
	   	"점번호|직원번호|성명|PG명|총금액|총금액(A)\n(월중평잔적용)|"                  //6
	   	+"소계|금융기관성|본부조달|임직원가족|단기신규해지|"                            //5 조정내역(B)
	   	+"본부마케팅|마케팅제외|독도상품실적|평가제외|기타조정|"                        //5 조정내역(B)
	   	+"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|거액예수금\n차감(E)|최종 누증실적\n(F)=(C+D+E)|"  //4
	   	+"기준실적\n(G)|순증실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)"                //4
	   	;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
  
   	var strHeader0 =  
	    "점번호|점명|PG명|총금액|총금액(A)\n(월중평잔적용)|"                           //4
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                 //5
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                             //4
	   	+"누증실적\n(C)=(A+B)|저원가성\n추가인정(D)|거액예수금\n차감(E)|최종 누증실적\n(F)=(C+D+E)|"  //4
	   	+"기준실적\n(G)|순증실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)"                              //4
	   	;

	var strHeader1 =  
	   	"점번호|점명|PG명|총금액|총금액(A)\n(월중평잔적용)|"                           //4
	   	+"소계|금융기관성|본부조달|임직원가족|단기신규해지|"                            //5 조정내역(B)
	   	+"본부마케팅|독도상품실적|평가제외|기타조정|"                                   //4 조정내역(B)
	   	+"누증실적\n(C)=(A+B)|저원가성\n추가인정(D)|거액예수금\n차감(E)|최종 누증실적\n(F)=(C+D+E)|"  //4
	   	+"기준실적\n(G)|순증실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)"                              //4
	   	;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
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
	    "점번호|점명|PG명|총금액\n(A)|"                                                           // 4
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"    // 10
	   	+"누증실적\n(C)=(A+B)|저원가성\n추가인정(D)|최종 누증실적\n (E)=(C+D)|기준실적\n(F)|순증실적\n(G)=(E)-(F)|순증목표\n(H)|달성률\n(I)=(G)/(H)|" //7
	   	;

   	var strHeader1 =  
	   	"점번호|점명|PG명|총금액\n(A)|"                                                                //4
	   	+"소계|금융기관성|거액조달처|본부조달|본부마케팅|임직원가족|단기신규해지|독도지점교차실적|마케팅대상제외|기타조정|체신관서|"    // 10
	   	+"누증실적\n(C)=(A+B)|저원가성\n추가인정(D)|최종 누증실적\n (E)=(C+D)|기준실적\n(F)|순증실적\n(G)=(E)-(F)|순증목표\n(H)|달성률\n(I)=(G)/(H)|" //7
	   	;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
	if (basemonth >= '201707') {
   		cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	} else {
   		cols.push({Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
   	}
   	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
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

  	basemonth   = document.frm.basemonth.value;
  
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 =  
	    "점번호|점명|PG명|총금액\n(A)|"                                                           // 4
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"    // 9
	   	+"누증실적\n(C)=(A+B)|개인예수금\n추가인정(D)|최종 누증실적\n (E)=(C+D)|기준실적\n(F)|순증실적\n(G)=(E)-(F)|순증목표\n(H)|달성률\n(I)=(G)/(H)|" //7
	   	;

   	var strHeader1 =  
	   	"점번호|점명|PG명|총금액\n(A)|"                                                                //4
	   	+"소계|금융기관성|거액조달처|본부조달|본부마케팅|임직원가족|단기신규해지|독도지점교차실적|마케팅대상제외|기타조정|"    // 9
	   	+"누증실적\n(C)=(A+B)|개인예수금\n추가인정(D)|최종 누증실적\n (E)=(C+D)|기준실적\n(F)|순증실적\n(G)=(E)-(F)|순증목표\n(H)|달성률\n(I)=(G)/(H)|" //7
	   	;


	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
	
  	basemonth   = document.frm.basemonth.value;
  
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 =  
	  	"점번호|점명|PG명|총금액\n(A)|"                                                           // 4
	    +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"    // 9
	    +"누증실적\n(C)=(A+B)|개인예수금\n추가인정(D)|최종 누증실적\n (E)=(C+D)|기준실적\n(F)|순증실적\n(G)=(E)-(F)|순증목표\n(H)|달성률\n(I)=(G)/(H)|" //7
	   	;

	var strHeader1 =  
	   	"점번호|점명|PG명|총금액\n(A)|"                                                                //4
	    +"소계|금융기관성|거액조달처|본부조달|본부마케팅|임직원가족|단기신규해지|독도지점교차실적|마케팅대상제외|"    // 9
	    +"누증실적\n(C)=(A+B)|개인예수금\n추가인정(D)|최종 누증실적\n (E)=(C+D)|기준실적\n(F)|순증실적\n(G)=(E)-(F)|순증목표\n(H)|달성률\n(I)=(G)/(H)|" //7
	   	;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|+|12|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
}

/*---------------------------------------*/
/* @기능 : 2012년도  기준 그리드 set     */
/*---------------------------------------*/        
function setGrid2012()
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
	
  	basemonth   = document.frm.basemonth.value;

  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 =  
   	"점번호|점명|PG명|총금액\n(A)|"                                                           // 4
    +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"    // 9
    +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|순증목표\n(F)|달성률\n(G)=(E)/(F)|" //5
   	;

	var strHeader1 =  
   	"점번호|점명|PG명|총금액\n(A)|"                                                                //4
    +"소계|금융기관성|거액조달처|본부조달|본부마케팅|임직원가족|단기신규해지|독도지점교차실적|마케팅대상제외|"    // 조정내역(B) 9
    +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|순증목표\n(F)|달성률\n(G)=(E)/(F)|"
   	;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
	if (basemonth >= '201406'){
    	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|+|12|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    } else if (basemonth >= '201304'){
    	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    } else{
    	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    }

    cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	
	if (basemonth >= '201304'){
    	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    } else {
    	cols.push({Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    }

    if (basemonth >= '201406'){
    	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    } else {
    	cols.push({Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	}
	
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
}
