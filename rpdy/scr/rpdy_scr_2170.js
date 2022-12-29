var isInitBtnEnable = true;
var isInstBtnEnable = true;
var isMofyBtnEnable = false;
var isDelBrnEnable  = false;
var isExcelBtnEnable= true;
var pgcode;
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

  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));     // 정보출력
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

  // 상위 GRID에 대한 속성정보 설정
  // hiddGridmon에 대한 속성정보 설정
   hiddGridmon.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

   var hgmInfo    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var hgmHeaders = [ { Text:"점번호|점명|", Align:"Center"} ];
   hiddGridmon.InitHeaders(hgmHeaders, hgmInfo);

   var hgmCols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" } ];
    
   hiddGridmon.InitColumns(hgmCols);
   hiddGridmon.SetEditable(0);
   hiddGridmon.SetVisible(0);
  
  doAction("기준일");
  
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
	pgcode  = 0;
    initGrid();  //화면 그리드 초기화

    document.frm.metrogb.disabled = false;

    // 기준일별 조회구분 항목 변경
    if (document.frm.baseday.value >= '20180101') {
        for ( ;document.frm.sergb.options.length>0;) document.frm.sergb.options.remove(0);
    
        var oOption = document.createElement("OPTION");
        oOption.text  = '잔액';
        oOption.value = 1
        document.frm.sergb.options.add(oOption);        
        
        var oOption = document.createElement("OPTION");
        oOption.text  = '반기평잔';
        oOption.value = 3
        document.frm.sergb.options.add(oOption);

        if (document.frm.baseday.value >= '20180601' && document.frm.baseday.value <= '20180630') {
            var oOption = document.createElement("OPTION");
            oOption.text  = '월중평잔';
            oOption.value = 4
            document.frm.sergb.options.add(oOption);        
        }
        
    }

    //allDelDataGrid(mySheet);
	showUnitText("원, %");

    // 최근 기준년월 가져오기
    basemonth=hiddGridmon.GetCellValue(1, 0);
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=7");
    metrogbhiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=49");
}

function selectpgcode()
{
    
    //allDelDataGrid(mySheet);
	showUnitText("원, %");
    //alert(document.frm.pgcode.value);
	pgcode    = document.frm.pgcode.value;
    initGrid();
}

/* Sheet 각종 처리 */
function doAction(sAction)
{
    isSelected  = true;
    baseday     = document.frm.baseday.value;
    pgcode      = document.frm.pgcode.value;
    sergb       = document.frm.sergb.value;
    metrogb     = document.frm.metrogb.value;

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
    	   case "기준일":           // 조회(상위 GRID)
            // 기준년월 정보 (최근 기준년월)
            hiddGridmon.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&superFlg=Y");
            /*// 기준일자 정보
            if(isRoleEnable == '1') {
             // 전산정보부 및 성과 담당자
               hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2170.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=98");
            } else {
               hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2170.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=99");
            }*/
            break;
        case "조회":             // 조회(상위 GRID)
//            if(baseday >= '20190701') {
//              if(isRoleEnable != '1') { 
//                  alert('2019년도 하반기 보고서는 차후 오픈 예정입니다.');
//                  break;
//              }
//            }
            mySheet.DoSearch("rpdy.scr.rpdy_scr_2170.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb="+sergb+"&metrogb="+metrogb);
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
            inqText[2][0]="조회구분";
            inqText[2][1]=document.frm.sergb.options[document.frm.sergb.selectedIndex].text;
            inqText[3]=new Array();
            inqText[3][0]="광역금융본부";
            inqText[3][1]=document.frm.metrogb.options[document.frm.metrogb.selectedIndex].text;
            // 보안등급세팅
            seqLevel=document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[4]=new Array();
                inqText[4][0]="보안등급";
                inqText[4][1]=document.frm.Security_Level.value;
            }
            rExcVal=doExcel(mySheet, inqText, -1); //common.js 활용하여 excel 출력
            /*// 엑셀다운로드시 로그 저장
            if(rExcVal) {
               condition="기준일="+baseday+";PG코드="+pgcode+";조회구분="+sergb+";광역금융본부="+metrogb;
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
    //pgcode    = document.frm.pgcode.value;

		if ( baseday >= '20220701' ) { 
        if (pgcode != '16') setGrid2022H();
        else setGrid2022_RMC();    
    } else if ( baseday >= '20220101' ) { 
        if (pgcode != '16') setGrid2022();
        else setGrid2022_RMC();    
    } else if ( baseday >= '20210701' ) { 
        if (pgcode != '16') setGrid2021H();
        else setGrid2020_RMC();    
    } else if ( baseday >= '20200101' ) { // lhi
        if (pgcode != '16') setGrid2020();
        else setGrid2020_RMC();    
    } else if ( baseday >= '20190101' ) {
        if (pgcode != '16') setGrid2019();
        else setGrid2019_RMC();
    } else if ( baseday >= '20180630' ) {
        if (pgcode != '16') setGrid2018H2();
        else setGrid2018H2_RMC();
    } else if ( baseday >= '20180101' )  setGrid2018H1();
}

/*-----------------------------------------*/
/* @기능 : 2022년도 상반기 기준 그리드 set */
/*         일반영업점                      */ 
/*-----------------------------------------*/
function setGrid2022H() 
{
    mySheet.Reset();
  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  	// 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
  	

    // 하반기
    strHeader0 =  
       "점번호|점명|PG명|총금액|총금액(A)\n(잔액:저비용성월평적용)|"
      +"조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|"  // 조정실적 (15)
      +"누증실적\n(C)=(A+B)|거액조달처\n순증실적(D)|최종 누증실적\n(E)=(C+D)|조정전\n기준실적(F)|조정후\n기준실적(G)|순증실적\n(H)=(E)-(G)|목표\n(I)|달성률\n(J)=(H/I)|";
    
	strHeader1=
       "점번호|점명|PG명|총금액|총금액(A)\n(잔액:저비용성월평적용)|"
      +"소계|금융기관성|기업금융지점장\n실적|RM(영업점)실적|연구위원|타지점|본부조달|구속성예금|임직원|단기신규해지|본부마케팅|독도상품실적|거액조달처|평가제외|기타조정|"                        // 조정내역(B)
      +"누증실적\n(C)=(A+B)|거액조달처\n순증실적(D)|최종 누증실적\n(E)=(C+D)|조정전\n기준실적(F)|조정후\n기준실적(G)|순증실적\n(H)=(E)-(G)|목표\n(I)|달성률\n(J)=(H/I)|";

	mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:5 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);


	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:150,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|+|16|+|17|+|18|+|19|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|25|/|26|*100",Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];


    mySheet.InitColumns(cols);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetCountPosition(1); 
      //지원안함[check again] UnitText="원, %";
	showUnitText("원, %");
    newSetActionMenu(mySheet,"엑셀내려받기");
}

/*-----------------------------------------*/
/* @기능 : 2022년도 상반기 기준 그리드 set */
/*         일반영업점                      */ 
/*-----------------------------------------*/
function setGrid2022() 
{
    mySheet.Reset();
  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  	// 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
  	

    // 하반기
    strHeader0 =  
       "점번호|점명|PG명|총금액|총금액(A)\n(잔액:저비용성월평적용)|"
      +"조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|"  // 조정실적 (15)
      +"누증실적\n(C)=(A+B)|거액조달처\n순증실적(D)|최종 누증실적\n(E)=(C+D)|조정전\n기준실적(F)|조정후\n기준실적(G)|순증실적\n(H)=(E)-(G)|목표\n(I)|달성률\n(J)=(H/I)|";
    
	strHeader1=
       "점번호|점명|PG명|총금액|총금액(A)\n(잔액:저비용성월평적용)|"
      +"소계|금융기관성|RM(본부)실적|RM(영업점)실적|연구위원|타지점|본부조달|구속성예금|임직원|단기신규해지|본부마케팅|독도상품실적|거액조달처|평가제외|기타조정|"                        // 조정내역(B)
      +"누증실적\n(C)=(A+B)|거액조달처\n순증실적(D)|최종 누증실적\n(E)=(C+D)|조정전\n기준실적(F)|조정후\n기준실적(G)|순증실적\n(H)=(E)-(G)|목표\n(I)|달성률\n(J)=(H/I)|";

	mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:5 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);


	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:150,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|+|16|+|17|+|18|+|19|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|25|/|26|*100",Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];


    mySheet.InitColumns(cols);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetCountPosition(1); 
      //지원안함[check again] UnitText="원, %";
	showUnitText("원, %");
    newSetActionMenu(mySheet,"엑셀내려받기");
}

/*-----------------------------------------*/
/* @기능 : 2021년도 하반기 기준 그리드 set */
/*         일반영업점                      */ 
/*-----------------------------------------*/
function setGrid2021H() 
{
  baseday  = document.frm.baseday.value;
   
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

	strHeader0 =  
       "점번호|점명|PG명|총금액|총금액(A)\n(잔액:월평적용)|"
      +"조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|"  // 조정실적 (15)
      +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|개인예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F)-(H)|목표\n(J)|달성률\n(K)=(I/J)|";    
		
	strHeader1 = 
       "점번호|점명|PG명|총금액|총금액(A)\n(잔액:월평적용)|"
      +"소계|금융기관성|RM(본부)실적|RM(영업점)실적|연구위원|타지점|본부조달|구속성예금|임직원|단기신규해지|본부마케팅|독도상품실적|거액조달처|평가제외|기타조정|"                        // 조정내역(B)
      +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|개인예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F)-(H)|목표\n(J)|달성률\n(K)=(I/J)|";

   mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|+|16|+|17|+|18|+|19|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|26|/|27|*100",Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
    mySheet.InitColumns(cols);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
	mySheet.SetCountPosition(1); 
      //지원안함[check again] UnitText="원, %";
	showUnitText("원, %");
    newSetActionMenu(mySheet,"엑셀내려받기");
}


/*-----------------------------------------*/
/* @기능 : 2020년도 상반기 기준 그리드 set */
/*         일반영업점                      */ 
/*         하반기는 일부 항목명만 변경     */ 
/*-----------------------------------------*/
function setGrid2020() // lhi
{
  baseday  = document.frm.baseday.value;
   
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

	if (baseday < '20200701') {
        // 상반기
        strHeader0 =  
           "점번호|점명|PG명|총금액|총금액(A)\n(잔액:월평적용)|"
          +"조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|"  // 조정실적 (15)
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|개인예수금\n순증실적(F)|최종 누증실적\n(G)=(C+D+E+F)|조정전\n기준실적(H)|조정후\n기준실적(I)|순증실적\n(J)=(G)-(I)|목표\n(K)|달성률\n(L)=(J/K)|";
        strHeader1 = 
           "점번호|점명|PG명|총금액|총금액(A)\n(잔액:월평적용)|"
          +"소계|금융기관성|RM(본부)실적|RM(영업점)실적|연구위원|타지점|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도상품실적|거액조달처|평가제외|기타조정|"                        // 조정내역(B)
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|개인예수금\n순증실적(F)|최종 누증실적\n(G)=(C+D+E+F)|조정전\n기준실적(H)|조정후\n기준실적(I)|순증실적\n(J)=(G)-(I)|목표\n(K)|달성률\n(L)=(J/K)|";
    } else {
        // 하반기
        strHeader0 =  
           "점번호|점명|PG명|총금액|총금액(A)\n(잔액:월평적용)|"
          +"조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|"  // 조정실적 (15)
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|개인예수금\n순증실적(F)|최종 누증실적\n(G)=(C+D+E+F)|조정전\n기준실적(H)|조정후\n기준실적(I)|순증실적\n(J)=(G)-(I)|목표\n(K)|달성률\n(L)=(J/K)|";
        strHeader1 = 
           "점번호|점명|PG명|총금액|총금액(A)\n(잔액:월평적용)|"
          +"소계|금융기관성|RM(본부)실적|RM(영업점)실적|연구위원|타지점|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도상품실적|거액조달처|평가제외|기타조정|"                        // 조정내역(B)
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|개인예수금\n순증실적(F)|최종 누증실적\n(G)=(C+D+E+F)|조정전\n기준실적(H)|조정후\n기준실적(I)|순증실적\n(J)=(G)-(I)|목표\n(K)|달성률\n(L)=(J/K)|";
    }

    mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:5 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
              { Text:strHeader1, Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
        {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|+|16|+|17|+|18|+|19|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
        {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|27|/|28|*100",Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
     
    mySheet.InitColumns(cols);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetCountPosition(1); 
      //지원안함[check again] UnitText="원, %";
	showUnitText("원, %");
    newSetActionMenu(mySheet,"엑셀내려받기");
}


/*-----------------------------------------*/
/* @기능 : 2022년도 상반기 기준 그리드 set */
/*         RMC                             */ 
/*-----------------------------------------*/
function setGrid2022_RMC()
{
  	baseday  = document.frm.baseday.value;

	mySheet.Reset();
  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  
    let strHeader0 = "";
	let strHeader1 = "";
	
    strHeader0 = 
       "점번호|점명|PG명|총금액|총금액(A)\n(잔액:저비용성\n월평적용)|" // 5
      +"조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|"  // 11
      +"누증실적\n(C)=(A+B)|외화예수금\n순증실적(D)|최종 누증실적\n(E)=(C+D)|조정전기준실적\n(F)|조정후기준실적\n(G)|순증실적\n(H)=(E-G)|목표\n(I)|달성률\n(J)=(H/I)";

	strHeader1 = 
       "점번호|점명|PG명|총금액|총금액(A)\n(잔액:저비용성\n월평적용)|" // 5
      +"소계|금융기관성|본부조달|임직원|단기신규해지|본부마케팅|마케팅제외|독도상품실적|거액조달처|평가제외|기타조정|"                    // 11
      +"누증실적\n(C)=(A+B)|외화예수금\n순증실적(D)|최종 누증실적\n(E)=(C+D)|조정전기준실적\n(F)|조정후기준실적\n(G)|순증실적\n(H)=(E-G)|목표\n(I)|달성률\n(J)=(H/I)";
    
	mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:5 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
              { Text:strHeader1, Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
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
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
                                                                                     
	mySheet.InitColumns(cols);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetCountPosition(1); 

	showUnitText("원, %");
    newSetActionMenu(mySheet,"엑셀내려받기");
}


/*-----------------------------------------*/
/* @기능 : 2020년도 상반기 기준 그리드 set */
/*         RMC                             */ 
/*-----------------------------------------*/
function setGrid2020_RMC()
{
  baseday  = document.frm.baseday.value;
   
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

	if( baseday < '20200701') {
        //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
        strHeader0 =  
           "점번호|점명|PG명|총금액|총금액(A)\n(잔액:월평적용)|" // 5
          +"조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|"  // 11
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|조정전기준실적\n(G)|조정후기준실적\n(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)|" // 9
          ;
        strHeader1 = 
           "점번호|점명|PG명|총금액|총금액(A)\n(잔액:월평적용)|" // 5
          +"소계|금융기관성|본부조달|임직원가족|단기신규해지|본부마케팅|마케팅제외|독도상품실적|거액조달처|평가제외|기타조정|"                    // 11
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|조정전기준실적\n(G)|조정후기준실적\n(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)|" // 9
          ;
    }else if( baseday < '20210701') {
        //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
        strHeader0 =  
           "점번호|점명|PG명|총금액|총금액(A)\n(잔액:월평적용)|" // 5
          +"조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|"  // 11
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|조정전기준실적\n(G)|조정후기준실적\n(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)|" // 9
          ;
        strHeader1 = 
           "점번호|점명|PG명|총금액|총금액(A)\n(잔액:월평적용)|" // 5
          +"소계|금융기관성|본부조달|임직원가족|단기신규해지|본부마케팅|마케팅제외|독도상품실적|거액조달처|평가제외|기타조정|"                    // 11
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|조정전기준실적\n(G)|조정후기준실적\n(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)|" // 9
          ;        
    } else {
        //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
        strHeader0 =  
           "점번호|점명|PG명|총금액|총금액(A)\n(잔액:월평적용)|" // 5
          +"조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|"  // 11
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|조정전기준실적\n(G)|조정후기준실적\n(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)|" // 9
          ;
        strHeader1 = 
           "점번호|점명|PG명|총금액|총금액(A)\n(잔액:월평적용)|" // 5
          +"소계|금융기관성|본부조달|임직원|단기신규해지|본부마케팅|마케팅제외|독도상품실적|거액조달처|평가제외|기타조정|"                    // 11
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|조정전기준실적\n(G)|조정후기준실적\n(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)|" // 9
          ;
    }

   mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
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
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
    mySheet.InitColumns(cols);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetCountPosition(1); 
      //지원안함[check again] UnitText="원, %";
	showUnitText("원, %");
    newSetActionMenu(mySheet,"엑셀내려받기");
}

/*-----------------------------------------*/
/* @기능 : 2019년도 상반기 기준 그리드 set */
/*         일반영업점                      */ 
/*         하반기는 일부 항목명만 변경     */ 
/*-----------------------------------------*/
function setGrid2019()
{
  baseday  = document.frm.baseday.value;
   
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

	if (baseday < '20190701') {
        // 상반기
        strHeader0 =  
           "점번호|점명|PG명|총금액|총금액(A)\n(월중평잔적용)|"
          +"조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|"  // 조정실적 (14)
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|거액예수금\n차감(E)|최종 누증실적\n(F)=(C+D+E)|기준실적\n(G)|순증실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)|";
        strHeader1 = 
           "점번호|점명|PG명|총금액|총금액(A)\n(월중평잔적용)|"
          +"소계|금융기관성|RM(센터)실적|RM(영업점)실적|연구위원|타지점|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도상품실적|평가제외|기타조정|"                    // 조정내역(B)
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|거액예수금\n차감(E)|최종 누증실적\n(F)=(C+D+E)|기준실적\n(G)|순증실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)|";
    } else {
        // 하반기
        strHeader0 = 
           "점번호|점명|PG명|총금액|총금액(A)\n(월중평잔적용)|"
          +"조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|"  // 조정실적 (14)
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|최종 누증실적\n(E)=(C+D)|조정전\n기준실적(F)|조정후\n기준실적(G)|순증실적\n(H)=(E)-(G)|목표\n(I)|달성률\n(J)=(H/I)|";
        strHeader1 = 
           "점번호|점명|PG명|총금액|총금액(A)\n(월중평잔적용)|"
          +"소계|금융기관성|RM(본부)실적|RM(영업점)실적|연구위원|타지점|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도상품실적|평가제외|기타조정|"                        // 조정내역(B)
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|최종 누증실적\n(E)=(C+D)|조정전\n기준실적(F)|조정후\n기준실적(G)|순증실적\n(H)=(E)-(G)|목표\n(I)|달성률\n(J)=(H/I)|";
    }

   mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
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
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|24|/|25|*100",Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
    mySheet.InitColumns(cols);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
	mySheet.SetCountPosition(1); 
      //지원안함[check again] UnitText="원, %";
	showUnitText("원, %");
    newSetActionMenu(mySheet,"엑셀내려받기");
}

/*-----------------------------------------*/
/* @기능 : 2019년도 상반기 기준 그리드 set */
/*         RMC                             */ 
/*-----------------------------------------*/
function setGrid2019_RMC()
{
  baseday  = document.frm.baseday.value;
   
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	
	if( baseday >= '20190701') {
        //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
        strHeader0 = 
           "점번호|점명|PG명|총금액(A)|총금액(A)\n(월중평잔적용)|"
          +"조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|"  // 10
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|최종 누증실적\n(E)=(C)+(D)|조정전기준실적\n(F)|조정후기준실적\n(G)|순증실적\n(H)=(E-G)|목표\n(I)|달성률\n(J)=(H/I)|";
        strHeader1 = 
           "점번호|점명|PG명|총금액(A)|총금액(A)\n(월중평잔적용)|"
          +"소계|금융기관성|본부조달|임직원가족|단기신규해지|본부마케팅|마케팅제외|독도상품실적|평가제외|기타조정|"                    // 10
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|최종 누증실적\n(E)=(C)+(D)|조정전기준실적\n(F)|조정후기준실적\n(G)|순증실적\n(H)=(E-G)|목표\n(I)|달성률\n(J)=(H/I)|";
    } else {
        //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
        strHeader0 = 
           "점번호|점명|PG명|총금액(A)|총금액(A)\n(월중평잔적용)|"
          +"조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|"  // 10
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|거액예수금\n차감(E)|최종 누증실적\n(F)=(C+D+E)|기준실적\n(G)|순증실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)|";
        strHeader1 = 
           "점번호|점명|PG명|총금액(A)|총금액(A)\n(월중평잔적용)|"
          +"소계|금융기관성|본부조달|임직원가족|단기신규해지|본부마케팅|마케팅제외|독도상품실적|평가제외|기타조정|"                    // 10
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|거액예수금\n차감(E)|최종 누증실적\n(F)=(C+D+E)|기준실적\n(G)|순증실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)|";
    }

   mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
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
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
    mySheet.InitColumns(cols);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
	mySheet.SetCountPosition(1); 
      //지원안함[check again] UnitText="원, %";
	showUnitText("원, %");
    newSetActionMenu(mySheet,"엑셀내려받기");
}

/*-----------------------------------------*/
/* @기능 : 2018년도 하반기 기준 그리드 set */
/*         일반영업점                      */ 
/*-----------------------------------------*/
function setGrid2018H2()
{
  baseday  = document.frm.baseday.value;
   
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

	strHeader0 = 
       "점번호|점명|PG명|총금액(A)|총금액(A)\n(월중평잔적용)|"
      +"조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|"  // 조정실적 (14)
      +"누증실적\n(C)=(A+B)|저원가성\n추가인정(D)|거액예수금\n차감(E)|최종 누증실적\n(F)=(C+D+E)|기준실적\n(G)|순증실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)|";    
		
	strHeader1 = 
       "점번호|점명|PG명|총금액(A)|총금액(A)\n(월중평잔적용)|"
      +"소계|금융기관성|RM(센터)실적|RM(영업점)실적|연구위원|타지점|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도상품실적|평가제외|기타조정|"                    // 조정내역(B)
      +"누증실적\n(C)=(A+B)|저원가성\n추가인정(D)|거액예수금\n차감(E)|최종 누증실적\n(F)=(C+D+E)|기준실적\n(G)|순증실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)|";

   mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
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
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|24|/|25|*100",Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
    mySheet.InitColumns(cols);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetCountPosition(1); 
      //지원안함[check again] UnitText="원, %";
	showUnitText("원, %");
    newSetActionMenu(mySheet,"엑셀내려받기");
}

/*-----------------------------------------*/
/* @기능 : 2018년도 하반기 기준 그리드 set */
/*         RMC                             */ 
/*-----------------------------------------*/
function setGrid2018H2_RMC()
{
  baseday  = document.frm.baseday.value;
   
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

	strHeader0 = 
       "점번호|점명|PG명|총금액(A)|총금액(A)\n(월중평잔적용)|"
      +"조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|"  // 조정실적 (9)
      +"누증실적\n(C)=(A+B)|저원가성\n추가인정(D)|거액예수금\n차감(E)|최종 누증실적\n(F)=(C+D+E)|기준실적\n(G)|순증실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)|";    
		
	strHeader1 = 
       "점번호|점명|PG명|총금액(A)|총금액(A)\n(월중평잔적용)|"
      +"소계|금융기관성|본부조달|임직원가족|단기신규해지|본부마케팅|독도상품실적|평가제외|기타조정|"                   // 조정내역 (9)
      +"누증실적\n(C)=(A+B)|저원가성\n추가인정(D)|거액예수금\n차감(E)|최종 누증실적\n(F)=(C+D+E)|기준실적\n(G)|순증실적\n(H)=(F-G)|목표\n(I)|달성률\n(J)=(H/I)|";

   mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
             { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
       {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
       {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
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
       {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
    mySheet.InitColumns(cols);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetCountPosition(1); 
      //지원안함[check again] UnitText="원, %";
	showUnitText("원, %");
    newSetActionMenu(mySheet,"엑셀내려받기");
}

/*-----------------------------------*/
/* @기능 : 2018년도 기준  그리드 set */
/*-----------------------------------*/
function setGrid2018H1()
{
  baseday  = document.frm.baseday.value;
   
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

	strHeader0 = 
       "점번호|점명|PG명|총금액(A)|"
      +"조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|"  // 조정실적
      +"누증실적\n(C)=(A+B)|저원가성\n추가인정(D)|거액예수금\n차감(E)|최종 누증실적\n(F)=(C+D+E)|기준실적\n(G)|순증실적\n(H)=(F-G)|순증목표\n(I)|달성률\n(J)=(H/I)|";    
		
	strHeader1 = 
       "점번호|점명|PG명|총금액(A)|"
      +"소계|금융기관성|RM(센터)실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|RM(영업점)실적|평가제외|기타조정|체신관서|"                    // 조정내역(B)
      +"누증실적\n(C)=(A+B)|저원가성\n추가인정(D)|거액예수금\n차감(E)|최종 누증실적\n(F)=(C+D+E)|기준실적\n(G)|순증실적\n(H)=(F-G)|순증목표\n(I)|달성률\n(J)=(H/I)|";

   mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:4 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|24|/|25|*100",Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
    mySheet.InitColumns(cols);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetColHidden(18,1);// 2018.01.30 체신관서 쓴다고 했다가 안씀. 화면에서만 안보여주는걸로...
    mySheet.SetCountPosition(1); 
      //지원안함[check again] UnitText="원, %";
	showUnitText("원, %");
	newSetActionMenu(mySheet,"엑셀내려받기");
}
