/*Sheet 기본 설정 */
function LoadPage(){

  //mySheet     = document.frm.mySheet;
  //hiddenGrid  = document.frm.hiddenGrid;
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

function sel_WideCode()
{
    //hiddenGrid  = document.frm.hiddenGrid;
    basemonth   = document.frm.basemonth.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=49"); // 광역금융본부명
}

function selectmonth()
{
    initGrid();

    //hiddenGrid  = document.frm.hiddenGrid;
    basemonth   = document.frm.basemonth.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=7&pggubun=1");
}

/* Sheet 각종 처리 */
function doAction(sAction)
{
    //mySheet     = document.frm.mySheet;
    //hiddenGrid  = document.frm.hiddenGrid;
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
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&stmonth=201901");         
            break;
        case "조회":             // 조회(상위 GRID)
            
            mySheet.DoSearch("rpop.scr.rpop_scr_5050.do?hidden_key=9&basemonth="+basemonth+"&pgcode="+pgcode+"&WideCode="+WideCode+"&sergb="+sergb); 
            mySheet.FitSize(false, true);
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

    if(basemonth <= '201906') setGrid2019H1();
    else if(basemonth <= '201912') setGrid2019H2();
    else if(basemonth <= '202106') setGrid2020H1();
    else if(basemonth <= '202112') setGrid2021H2();
	else setGrid2022H1();

}

/*-------------------------------------------*/
/* @기능 : 2022년도 상반기 기준 그리드 set   */
/*-------------------------------------------*/
function setGrid2022H1()
{
  	pgcode  = document.frm.pgcode.value;
 	var strHeader0 = "";
	var strHeader1 = "";
	
  //mySheet = document.frm.mySheet;
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

    if (pgcode == "16")       ////////////////////////////////////////////////////////////////////// RMC 그리드 화면 설정
    {
		strHeader0 = "점번호|점명|PG명|총금액(A)|"                                                                          //4
        	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                 //7
         	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                             //6
         	+"누증실적\n(C)=(A+B)|외화예수금\n순증실적(D)|최종 누증실적\n(E)=(C+D)|"                                //3
         	+"조정전\n기준실적(F)|조정후\n기준실적(G)|순증실적\n(H)=(E-G)|목표\n(I)|달성률\n(J)=(H/I)|"             //5
         	;

		strHeader1 = "점번호|점명|PG명|총금액(A)|"                                                                          //4
        	+"소계|금융기관성|타지점|본부조달|구속성예금|임직원|단기신규해지|"                                      //7 조정내역(B)
         	+"본부마케팅|마케팅제외|거액조달처|독도상품실적|평가제외|기타조정|"                                     //6 조정내역(B)
         	+"누증실적\n(C)=(A+B)|외화예수금\n순증실적(D)|최종 누증실적\n(E)=(C+D)|"                                //3
         	+"조정전\n기준실적(F)|조정후\n기준실적(G)|순증실적\n(H)=(E-G)|목표\n(I)|달성률\n(J)=(H/I)|"             //5
         	;

		i=0;

        mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4, FrozenCol:4 } );

        var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1, Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
        var headers = [ { Text:strHeader0, Align:"Center"},
                        { Text:strHeader1, Align:"Center"} ];
        mySheet.InitHeaders(headers, info);

        var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|+|16|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 }];
          
		mySheet.InitColumns(cols);
		mySheet.SetCountPosition(1);
        mySheet.SetEditable(0);
        mySheet.SetVisible(1);
        mySheet.SetAutoSumPosition(0);
        mySheet.SetVisible(1);
        mySheet.SetAutoSumPosition(0);
        mySheet.SetHeaderRowHeight(26);
        newSetActionMenu(mySheet,"엑셀내려받기");
		showUnitText("원, %");
	}
    else         ////////////////////////////////////////////////////////////////////// 영업점 그리드 화면 설정
    {
    	strHeader0 = "점번호|점명|PG명|총금액(A)|"                                                                             //4
        	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                            //5
         	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                            //5
         	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                                        //4
         	+"누증실적\n(C)=(A+B)|"                                                                                    //1
         	+"조정전\n기준실적(D)|조정후\n기준실적(E)|순증실적\n(F)=(C-E)|목표\n(G)|달성률\n(H)=(F/G)"                 //5
         	;

        strHeader1 = "점번호|점명|PG명|총금액(A)|"                                                                             //4
        	+"소계|금융기관성|RM(본부)\n실적|RM(영업점)\n실적|연구위원|"                                               //5 조정내역(B)
         	+"타지점|본부조달|구속성예금|임직원|단기신규해지|"                                                         //5 조정내역(B)
         	+"본부마케팅|독도상품실적|평가제외|기타조정|"                                                              //4 조정내역(B)
         	+"누증실적\n(C)=(A+B)|"                                                                                    //1
         	+"조정전\n기준실적(D)|조정후\n기준실적(E)|순증실적\n(F)=(C-E)|목표\n(G)|달성률\n(H)=(F/G)"                 //5
         	;
        i=0;
		
		mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4, FrozenCol:4 } );

        var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1, Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
        var headers = [ { Text:strHeader0, Align:"Center"},
                        { Text:strHeader1, Align:"Center"} ];
        mySheet.InitHeaders(headers, info);

        var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             
			 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|+|16|+|17|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             
			 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             
			 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             
		     {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 }];

        mySheet.InitColumns(cols);
		mySheet.SetCountPosition(1);
        mySheet.SetEditable(0);
        mySheet.SetVisible(1);
        mySheet.SetAutoSumPosition(0);
        mySheet.SetVisible(1);
        mySheet.SetAutoSumPosition(0);
        mySheet.SetHeaderRowHeight(26);
        newSetActionMenu(mySheet,"엑셀내려받기");
		showUnitText("원, %");
	}
}

/*-------------------------------------------*/
/* @기능 : 2021년도 하반기 기준 그리드 set   */
/*-------------------------------------------*/
function setGrid2021H2()
{
	var strHeader0 = "";
	var strHeader1 = "";
	
  //mySheet = document.frm.mySheet;
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	pgcode  = document.frm.pgcode.value;
  
	
  	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4, FrozenCol:4 } );


  	// 상위 GRID에 대한 속성정보 설정
  	if (pgcode == "16")       ////////////////////////////////////////////////////////////////////// RMC 그리드 화면 설정
  	{
   		strHeader0 =  
	        "점번호|점명|PG명|총금액(A)|"                                                                          //4
	   		+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                             //6
	   		+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                             //6
	   		+"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|"    //4
	   		+"조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)"              //5
	      	;    
   		strHeader1 =  
	        "점번호|점명|PG명|총금액(A)|"                                                                          //4
		   	+"소계|금융기관성|본부조달|구속성예금|임직원|단기신규해지|"                                             //6 조정내역(B)
		   	+"본부마케팅|마케팅제외|독도상품실적|거액조달처|평가제외|기타조정|"                                     //6 조정내역(B)
		   	+"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|"    //4
		   	+"조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)"              //5
	      	;    


   		var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   		var headers = [ { Text:strHeader0, Align:"Center"},
                        { Text:strHeader1, Align:"Center"} ];
   		mySheet.InitHeaders(headers, info);

   		var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 }
             ];
    
		mySheet.InitColumns(cols);
		mySheet.SetCountPosition(1);
	
	   	mySheet.SetEditable(0);
	   	mySheet.SetVisible(1);
	   	mySheet.SetAutoSumPosition(0);
	   	mySheet.SetVisible(1);
	   	mySheet.SetAutoSumPosition(0);
	   	mySheet.SetHeaderRowHeight(26);
	   	newSetActionMenu(mySheet,"엑셀내려받기");
		showUnitText("원, %");
	}
   	else         ////////////////////////////////////////////////////////////////////// 영업점 그리드 화면 설정
   	{
   		strHeader0 =  
	        "점번호|점명|PG명|총금액(A)|"                                                                             //4
		   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                            //5
		   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                            //5
		   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                            //5
		   	+"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|최종 누증실적\n(E)=(C+D)|"                                 //3
		   	+"조정전\n기준실적(F)|조정후\n기준실적(G)|순증실적\n(H)=(E-G)|목표\n(I)|달성률\n(J)=(H/I)"                 //5
	      	;    
		strHeader1 =  
	       	"점번호|점명|PG명|총금액(A)|"                                                                             //4
		   	+"소계|금융기관성|RM(본부)\n실적|RM(영업점)\n실적|연구위원|"                                               //5 조정내역(B)
		   	+"타지점|본부조달|구속성예금|임직원가족|단기신규해지|"                                                     //5 조정내역(B)
		   	+"본부마케팅|독도상품실적|거액조달처|평가제외|기타조정|"                                                   //5 조정내역(B)
		   	+"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|최종 누증실적\n(E)=(C+D)|"                                 //3
		   	+"조정전\n기준실적(F)|조정후\n기준실적(G)|순증실적\n(H)=(E-G)|목표\n(I)|달성률\n(J)=(H/I)"                 //5
	       	;  

       	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   		mySheet.InitHeaders(headers, info);

       	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             
			 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		     {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             
			 {Type:"Float",     Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 }
             ];
    
		mySheet.InitColumns(cols);
		mySheet.SetCountPosition(1);
	
	   	mySheet.SetEditable(0);
	   	mySheet.SetVisible(1);
	   	mySheet.SetAutoSumPosition(0);
	   	mySheet.SetVisible(1);
	   	mySheet.SetAutoSumPosition(0);
	   	mySheet.SetHeaderRowHeight(26);
	   	newSetActionMenu(mySheet,"엑셀내려받기");
		showUnitText("원, %");
   }
}

/*-------------------------------------------*/
/* @기능 : 2020년도 상반기 기준 그리드 set   */
/*-------------------------------------------*/
function setGrid2020H1()
{
	var strHeader0 = "";
	var strHeader1 = "";
	
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	pgcode  = document.frm.pgcode.value;
  
  
  	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4, FrozenCol:4 } );

  // 상위 GRID에 대한 속성정보 설정
  	if (pgcode == "16")       ////////////////////////////////////////////////////////////////////// RMC 그리드 화면 설정
  	{
		strHeader0 =  
		   	"점번호|점명|PG명|총금액(A)|"                                                                          //4
		   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                             //6
		   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                             //6
		   	+"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|"    //4
		   	+"조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)"              //5
		   	;

		strHeader1 =  
		    "점번호|점명|PG명|총금액(A)|"                                                                          //4
		   	+"소계|금융기관성|본부조달|구속성예금|임직원가족|단기신규해지|"                                         //6 조정내역(B)
		   	+"본부마케팅|마케팅제외|독도상품실적|거액조달처|평가제외|기타조정|"                                     //6 조정내역(B)
		   	+"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|"    //4
		   	+"조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)"              //5
		   	;
    	
	   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	   	var headers = [ { Text:strHeader0, Align:"Center"},
	                 { Text:strHeader1, Align:"Center"} ];
	   	mySheet.InitHeaders(headers, info);
	
	   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"Float",     Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 }
	             ];
	    
		mySheet.InitColumns(cols);
		mySheet.SetCountPosition(1);
	
	   	mySheet.SetEditable(0);
	   	mySheet.SetVisible(1);
	   	mySheet.SetAutoSumPosition(0);
	   	mySheet.SetVisible(1);
	   	mySheet.SetAutoSumPosition(0);
	   	mySheet.SetHeaderRowHeight(26);
	   	newSetActionMenu(mySheet,"엑셀내려받기");
		showUnitText("원, %");
	}
   	else         ////////////////////////////////////////////////////////////////////// 영업점 그리드 화면 설정
   	{
    	strHeader0 =  
		   	"점번호|점명|PG명|총금액(A)|"                                                                             //4
		   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                            //5
		   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                            //5
		   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                            //5
		   	+"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|"       //4
		   	+"조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)"                 //5
		   	;    
	   	strHeader1 =  
		   	"점번호|점명|PG명|총금액(A)|"                                                                             //4
		   	+"소계|금융기관성|RM(본부)\n실적|RM(영업점)\n실적|연구위원|"                                               //5 조정내역(B)
		   	+"타지점|본부조달|구속성예금|임직원가족|단기신규해지|"                                                     //5 조정내역(B)
		   	+"본부마케팅|독도상품실적|거액조달처|평가제외|기타조정|"                                                   //5 조정내역(B)
		   	+"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|"       //4
		   	+"조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)"                 //5
		   	; 
   
       	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	   	var headers = [ { Text:strHeader0, Align:"Center"},
	                 { Text:strHeader1, Align:"Center"} ];
	   	mySheet.InitHeaders(headers, info);
	
	   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             //조정내역
				 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|+|16|+|17|+|18|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             
				 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
				 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             
				 //실적
				 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
				 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             //목표   
			     {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"Float",     Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 }
	            ];
	    
		mySheet.InitColumns(cols);
		mySheet.SetCountPosition(1);
	
	   	mySheet.SetEditable(0);
	   	mySheet.SetVisible(1);
	   	mySheet.SetAutoSumPosition(0);
	   	mySheet.SetVisible(1);
	   	mySheet.SetAutoSumPosition(0);
	   	mySheet.SetHeaderRowHeight(26);
	   	newSetActionMenu(mySheet,"엑셀내려받기");
		showUnitText("원, %");
   }
}

/*-------------------------------------------*/
/* @기능 : 2019년도 하반기 기준 그리드 set   */
/*-------------------------------------------*/
function setGrid2019H2()
{
	var strHeader0 = "";
	var strHeader1 = "";
  //mySheet = document.frm.mySheet;
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	pgcode  = document.frm.pgcode.value;
  
  	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4, FrozenCol:4 } );
  // 상위 GRID에 대한 속성정보 설정
  	if (pgcode == "16")       ////////////////////////////////////////////////////////////////////// RMC 그리드 화면 설정
  	{
		strHeader0 =  
		   	"점번호|점명|PG명|총금액|총금액(A)\n(월중평잔적용)|"                                            //5
		   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                  //5
		   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                  //5
		   	+"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|MMDA\n실적인정(E)|최종 누증실적\n(F)=(C+D+E)|"   //4
		   	+"조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)"       //5
		   	;    

	   	strHeader1 =  
		   	"점번호|점명|PG명|총금액|총금액(A)\n(월중평잔적용)|"                                            //5
		   	+"소계|금융기관성|본부조달|임직원가족|단기신규해지|"                                             //5 조정내역(B)
		   	+"본부마케팅|마케팅제외|독도상품실적|평가제외|기타조정|"                                         //5 조정내역(B)
		   	+"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|MMDA\n실적인정(E)|최종 누증실적\n(F)=(C+D+E)|"   //4
		   	+"조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)"       //5
		   	;
    
	   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	   	var headers = [ { Text:strHeader0, Align:"Center"},
		                 { Text:strHeader1, Align:"Center"} ];
	   	mySheet.InitHeaders(headers, info);
	
	   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|+|16|+|17|+|18|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"Float",     Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 }
	             ];
	    
		mySheet.InitColumns(cols);
		mySheet.SetCountPosition(1);
	
	   	mySheet.SetEditable(0);
	   	mySheet.SetVisible(1);
	   	mySheet.SetAutoSumPosition(0);
	   	mySheet.SetVisible(1);
	   	mySheet.SetAutoSumPosition(0);
	   	mySheet.SetHeaderRowHeight(26);
	   	newSetActionMenu(mySheet,"엑셀내려받기");
		showUnitText("원, %");
	}
   	else         ////////////////////////////////////////////////////////////////////// 영업점 그리드 화면 설정
   	{
    	strHeader0 =  
		   	"점번호|점명|PG명|총금액|총금액(A)\n(월중평잔적용)|"                                            //5
		   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                  //5
		   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                  //5
		   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                              //4
		   	+"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|MMDA\n실적인정(E)|최종 누증실적\n(F)=(C+D+E)|"   //4
		   	+"조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)"       //5
		   	;
    
	   	strHeader1 =  
		   	"점번호|점명|PG명|총금액|총금액(A)\n(월중평잔적용)|"                                            //5
		   	+"소계|금융기관성|RM(본부)\n실적|RM(영업점)\n실적|연구위원|"                                     //5 조정내역(B)
		   	+"타지점|본부조달|구속성예금|임직원가족|단기신규해지|"                                           //5 조정내역(B)
		   	+"본부마케팅|독도상품실적|평가제외|기타조정|"                                                     //4 조정내역(B)
		   	+"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|MMDA\n실적인정(E)|최종 누증실적\n(F)=(C+D+E)|"   //4
		   	+"조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)"       //5
		   	;
	   	i=0;
       
       	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	   	var headers = [ { Text:strHeader0, Align:"Center"},
		                 { Text:strHeader1, Align:"Center"} ];
	   	mySheet.InitHeaders(headers, info);
	   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|+|16|+|17|+|18|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
				 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	             {Type:"Float",     Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 }
	             ];
	    
		mySheet.InitColumns(cols);
		mySheet.SetCountPosition(1);
	
	   	mySheet.SetEditable(0);
	   	mySheet.SetVisible(1);
	   	mySheet.SetAutoSumPosition(0);
	   	mySheet.SetVisible(1);
	   	mySheet.SetAutoSumPosition(0);
	   	mySheet.SetHeaderRowHeight(26);
	   	newSetActionMenu(mySheet,"엑셀내려받기");
		showUnitText("원, %");
   }
}

/*-------------------------------------------*/
/* @기능 : 2019년도 상반기 기준 그리드 set   */
/*-------------------------------------------*/
function setGrid2019H1()
{
  //mySheet = document.frm.mySheet;
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  
  // 상위 GRID에 대한 속성정보 설정
   	var strHeader0 =  
	   	"점번호|점명|PG명|총금액|총금액(A)\n(월중평잔적용)|"                                            //5
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                  //5
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                  //5
	   	+"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                              //4
	   	+"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|MMDA\n실적인정(E)|최종 누증실적\n(F)=(C+D+E)|"   //4
	   	+"조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)"       //5
	   	;  
  
   	var strHeader1 =  
	   	"점번호|점명|PG명|총금액|총금액(A)\n(월중평잔적용)|"                                            //5
	   	+"소계|금융기관성|RM(센터)\n실적|RM(영업점)\n실적|연구위원|"                                     //5 조정내역(B)
	   	+"타지점|본부조달|구속성예금|임직원가족|단기신규해지|"                                           //5 조정내역(B)
	   	+"본부마케팅|독도상품실적|평가제외|기타조정|"                                                     //4 조정내역(B)
	   	+"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|MMDA\n실적인정(E)|최종 누증실적\n(F)=(C+D+E)|"   //4
	   	+"조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)"       //5
	   	;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
		                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|+|16|+|17|+|18|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetHeaderRowHeight(26);
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %");
}