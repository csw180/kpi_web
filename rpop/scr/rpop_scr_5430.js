/*Sheet 기본 설정 */
function LoadPage(){

  	createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "750px", "400px");
  
  	// Hidden GRID에 대한 속성정보 설정
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
    isSelected  	= true;
    basemonth 	= document.frm.basemonth.value;
    pgcode     	= document.frm.pgcode.value;
    WideCode  	= document.frm.WideCode.value;
    sergb      	= document.frm.sergb.value;

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
            
            mySheet.DoSearch("rpop.scr.rpop_scr_5430.do?hidden_key=9&basemonth="+basemonth+"&pgcode="+pgcode+"&WideCode="+WideCode+"&sergb="+sergb); 
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
    	"점번호|점명|PG명|"                                                                                    //3
      	+"개인핵심\n순증실적\n3배\n(A)|기업핵심\n순증실적\n(B)|"                                                //2
      	+"펌뱅킹\n월중평잔 실적\n(C)|펌뱅킹\n기준실적\n(D)|펌뱅킹\n순증실적\n(E)=(C-D)|"                        //3
      	+"경리나라\n월중평잔 실적\n(F)|경리나라\n기준실적\n(G)|경리나라\n순증실적\n(H)=(F-G)|"                  //3
      	+"CMS\n월중평잔 실적\n(I)|CMS\n기준실적\n(J)|CMS\n순증실적\n(K)=(I-J)|"                                 //3
      	+"최종실적\n(L)=(A+B+E+H+K)|최종목표\n(M)|달성률\n(N)=(L/M)|"                                           //3
      	;   
    
	var strHeader1 =
    	"점번호|점명|PG명|"                                                                                    //3
      	+"개인핵심\n순증실적\n3배\n(A)|기업핵심\n순증실적\n(B)|"                                                //2
      	+"펌뱅킹\n월중평잔 실적\n(C)|펌뱅킹\n기준실적\n(D)|펌뱅킹\n순증실적\n(E)=(C-D)|"                        //3
      	+"경리나라\n월중평잔 실적\n(F)|경리나라\n기준실적\n(G)|경리나라\n순증실적\n(H)=(F-G)|"                  //3
      	+"CMS\n월중평잔 실적\n(I)|CMS\n기준실적\n(J)|CMS\n순증실적\n(K)=(I-J)|"                                 //3
      	+"최종실적\n(L)=(A+B+E+H+K)|최종목표\n(M)|달성률\n(N)=(L/M)|"                                           //3
      	;   

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
	                 { Text:strHeader1, Align:"Center"} ];
	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" }, //0  점번호
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },//1  점명
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" }, //2  PG명
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },// 개인핵심
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },// 기업핵심
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },// 펌뱅킹
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },// 펌뱅킹
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },// 펌뱅킹
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },// 경리나라
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },// 경리나라
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },// 경리나라
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },// CMS
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },// CMS
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },// CMS
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },// 최종실적
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },// 최종목표		
             {Type:"Float",     Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];		// 달성률
  
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
