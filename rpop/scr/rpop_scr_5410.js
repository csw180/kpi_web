/*Sheet 기본 설정 */
function LoadPage(){

  	createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "750px", "400px");
  
  	// Hidden GRID에 대한 속성정보 설정

	//지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
	
	hiddenGrid.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );
	
	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:"HIDDEN", Align:"Center"} ];
	hiddenGrid.InitHeaders(headers, info);
	
	var cols = [ {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
	    
	hiddenGrid.InitColumns(cols);
	
	hiddenGrid.SetEditable(0);
	hiddenGrid.SetVisible(0);
  
  	initGrid();
  	doAction("기준년월");
}

function ComboValue(el)
{
	for ( ;el.options.length>1;) el.options.remove(1);
    for(i=1;i<=hiddenGrid.GetTotalRows();i++){
       	var oOption = document.createElement("OPTION");
       	oOption.text = hiddenGrid.GetCellValue(i, 1);
       	oOption.value = hiddenGrid.GetCellValue(i, 0);
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
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=7&pggubun=1");
}

/* Sheet 각종 처리 */
function doAction(sAction)
{
    isSelected 	= true;
    basemonth 	= document.frm.basemonth.value;
    pgcode    	= document.frm.pgcode.value;
    WideCode   = document.frm.WideCode.value;
    sergb       	= document.frm.sergb.value;

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
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&stmonth=202201");         
            break;
        case "조회":             // 조회(상위 GRID)
            
            mySheet.DoSearch("rpop.scr.rpop_scr_5410.do?hidden_key=9&basemonth="+basemonth+"&pgcode="+pgcode+"&WideCode="+WideCode+"&sergb="+sergb); 
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
			/*
            if(rExcVal) {
               condition = "기준년월="+basemonth+";PG코드="+pgcode+";조회구분="+sergb;
               hiddenGrid.DoSearch("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"); // gubun 1:rpdy(일일성과) 2:rpop(영업점성과)
            }
			*/
            break;      
    }
}
   
/*--------------------------------------------*/
/* @기능 : 선택된 기준년월에 따른 그리드 init */
/*--------------------------------------------*/        
function initGrid()
{
    basemonth   = document.frm.basemonth.value;

    if(basemonth >= '202201') setGrid2022H1();

}

/*-------------------------------------------*/
/* @기능 : 2022년도 상반기 기준 그리드 set   */
/*-------------------------------------------*/
function setGrid2022H1()
{
  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "750px");
	mySheet.Reset();

	var strHeader0 =
       "점번호|점명|PG명|총금액(A)|"                                                                          //4
      +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                         //5
      +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                         //5
      +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"                                                     //4
      +"누증실적\n(C)=(A+B)|"                                                                                 //1
      +"조정전\n기준실적(D)|조정후\n기준실적(E)|순증실적\n(F)=(C-E)|목표\n(G)|달성률\n(H)=(F/G)"              //5
      ;
   
    var strHeader1 =
       "점번호|점명|PG명|총금액(A)|"                                                                          //4
      +"소계|금융기관성|RM(본부)\n실적|RM(영업점)\n실적|연구위원|"                                            //5 조정내역(B)
      +"타지점|본부조달|구속성예금|임직원|단기신규해지|"                                                      //5 조정내역(B)
      +"본부마케팅|독도상품실적|평가제외|기타조정|"                                                           //4 조정내역(B)
      +"누증실적\n(C)=(A+B)|"                                                                                 //1
      +"조정전\n기준실적(D)|조정후\n기준실적(E)|순증실적\n(F)=(C-E)|목표\n(G)|달성률\n(H)=(F/G)"              //5
      ;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
	                 { Text:strHeader1, Align:"Center"} ];
	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },	   //0  점번호
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },       //1  점명
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },       //2  PG명
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },	//3  총금액
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|+|16|+|17|",Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },	//4  소계
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },	 //5  금융기관성
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },    //6  RM(본부)실적
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },    //7  RM(영업점)실적
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },    //8  연구위원
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },    //9  타지점
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },    //10 본부조달
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },    //11 구속성예금
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },    //12 임직원
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },    //13 단기신규해지
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },    //14 본부마케팅
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },    //15 독도상품실적
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },    //16 평가제외
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },    //17 기타조정
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },       //18 누증실적
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },       //19 조정전 기준실적
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },       //20 조정후 기준실적
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },       //21 순증실적
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },		//22 목표
             {Type:"Float",     Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];    //23 달성률	
                                                                                                                                                                                                                
	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
	mySheet.SetHeaderRowHeight(26);
	showUnitText("원, %");
   	newSetActionMenu(mySheet,"엑셀내려받기");

	sumMerge();
}