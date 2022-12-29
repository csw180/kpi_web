
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

	createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "750px", "400px");
  
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

  	doAction("기준년월");

  	initGrid(); // 연체율 화면 그리드 초기화
}

/*-------------------------------------------------*/
/* @기능 : 점번호 숫자와 RM번호만 입력가능하도록   */
/*-------------------------------------------------*/
function chk_jum() {
  basemonth   = document.frm.basemonth.value;

  // 2012년부터 RM점번호 생성됨.
  if (basemonth < '201201') chk_num();
  else { var el = window.event.srcElement;
         var vl = el.value;
         var ln = vl.length;

         var chst = vl.charAt(0);

         if (chst =='0' || chst == 'R')  {
            for(var i=1; i < ln; i++) {
                var ch = vl.charAt(i);
                if(ch < "0" || ch > "9") {
                    alert("숫자만 입력가능합니다.");
                    el.value = "";
                    el.focus();
                    return false;
               }
            }
         } else alert("점번호는 0~, R~ 만 가능합니다. 점번호 확인하세요" );
  }
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

function selectjumname()
{
    basemonth=document.frm.basemonth.value;
    v_jumcode=document.frm.jumcode.value;
    if(v_jumcode != '') hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=1&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
    else{ 
			document.frm.jumname.value='';
			document.frm.pgcode.value='';
			document.frm.pgname.value='';
	}

}

function popupJumCode()
{
    basemonth = document.frm.basemonth.value;
    win_open2("comm.scr.comm_scr_1010.screen?basemonth="+basemonth+"&searchGubun=5", 250, 450);
}

function selectjum()
{ 
    basemonth   = document.frm.basemonth.value;
    v_jumcode   = document.frm.jumcode.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=6&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
}

function selectmonth(){
     basemonth    = document.frm.basemonth.value;
    
   if (basemonth >= '201301'){
        document.all.td1.style.display="none";
        document.all.td2.style.display="";
   }
   else {
       document.all.td1.style.display="";
        document.all.td2.style.display="none";
   }

    initGrid();  // 연체율 화면 그리드 초기화
}

function sel_bgubun(){
    basemonth    = document.frm.basemonth.value;
    bgubun       = document.frm.bgubun.value;
    hiddenGrid.DoSearch("kpi.macd.macd_1021.screen?hidden_key=9&v_inqtype=3&basemonth="+basemonth+"&jekyocode=2&productgubun=1"+"&bgubun="+bgubun); 
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
    for ( ;el.options.length;) el.options.remove(0);
    var oOption=document.createElement("OPTION");
    oOption.text="전체";
    oOption.value="99999";
    el.options.add(oOption);
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
    isSelected=true;
    basemonth=document.frm.basemonth.value;
    v_jumcode=document.frm.jumcode.value;
	v_jumname   = document.frm.jumname.value;

  var pdtgubun="";  
  for(i=0;i<document.frm.pdtgubun.length;i++){
       if(document.frm.pdtgubun[i].checked==true){
           pdtgubun=document.frm.pdtgubun[i].value;
           break;
       }
     }
    bgubun='';
    mgubun='';
    if (basemonth >= '201301')  pdtgubun='0'; // 전체 조회
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
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3" );
            break;
        case "조회":             // 조회(상위 GRID)
            if(v_jumcode=="" || v_jumname==""){
                alert("점번호를 입력하지 않았습니다.");
         		document.frm.jumcode.focus();
                return;
            }
     //alert("basemonth="+basemonth+"&v_jumcode="+v_jumcode+"&pdtgubun="+pdtgubun+"&bgubun="+bgubun+"&mgubun="+mgubun); 
            mySheet.DoSearch("rpop.scr.rpop_scr_2030.do?hidden_key=9&basemonth="+basemonth+"&v_jumcode="+v_jumcode+"&pdtgubun="+pdtgubun+"&bgubun="+bgubun+"&mgubun="+mgubun);
            break;
        case "엑셀내려받기":    // 엑셀내려받기
            inqText=new Array();
            inqText[0]=new Array();
            inqText[0][0]="작업기준년월";
            inqText[0][1]=basemonth;
            inqText[1]=new Array();
            inqText[1][0]="점명";
            inqText[1][1]=document.frm.jumname.value;
    		inqText[2]=new Array();
            inqText[2][0]="상품구분";
            inqText[2][1]=getPdtgubun(pdtgubun);
            // 보안등급세팅
            seqLevel=document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[3]=new Array();
                inqText[3][0]="보안등급";
                inqText[3][1]=document.frm.Security_Level.value;
            }
            rExcVal=doExcel(mySheet, inqText, true); //common.js 활용하여 excel 출력
            // 엑셀다운로드시 로그 저장
            /*if(rExcVal) {
               condition="기준년월="+basemonth+";점번호="+v_jumcode+";상품구분="+pdtgubun;
               hiddenGrid.DoSearch("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2");
				//gubun1:rpdy(일일성과)2:rpop(영업점성과)
            }*/
            break;   
    }

}

function getPdtgubun(pdtgubun){
var pdtgubunname = '';
  
	switch(pdtgubun)
	{
	    case "0":
	      	pdtgubunname = '전체';
	      break;
		case '1':
			pdtgubunname = '전체(카드상품제외)';
			break;
		case '2':
			pdtgubunname = '카드상품';
			break;
	}    
	return pdtgubunname;
}

function call1020(){
  f = document.frm;
  basemonth = f.basemonth.value;
  jumcode   = f.jumcode.value;
  jumname   = f.jumname.value;
  pgcode    = f.pgcode.value;
  pgname    = f.pgname.value;
  url = "kpi.rpop.rpop_1020.screen?basemonth="+basemonth+"&jumcode="+jumcode+"&jumname="+jumname+"&pgcode="+pgcode+"&pgname="+pgname+"&IS_POPUP=Y&SCREEN_URL=kpi.rpop.rpop_1020.screen";
  win_open2(url,820,580);    
}

/*--------------------------------------------*/
/* @기능 : 선택된 기준년월에 따른 그리드 init */
/*--------------------------------------------*/        
function initGrid()
{
    basemonth   = document.frm.basemonth.value;
    
    if (basemonth >= '201301')  setGrid2013();
    else if (basemonth >= '201207')  setGrid201207();
         else if (basemonth >= '201201')  setGrid2012();
            else if (basemonth >= '200901')  setGrid2009();
                   else setGrid2008();
               

}

/*----------------------------------*/
/* @기능 : 2013년도 기준 그리드 set */
/*----------------------------------*/        
function setGrid2013()
{
	if(typeof(mySheet) !== "undefined")
	{
		
  		mySheet.Reset();
	}
	
	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "420px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
  	
  	// 상위 GRID에 대한 속성정보 설정
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:1 } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"구분|당월실적|당월실적|당월실적|고객구분", Align:"Center"},
                 { Text:"구분|총여신|연체액|연체율|고객구분", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:130,  Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:60,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:10,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetDataAutoTrim(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기|고객별실적조회");//rp_op_3030 연체고객별보고서 조건
	showUnitText("%, 원");
}


/*-----------------------------------------*/
/* @기능 : 2012년도 하반기 기준 그리드 set */
/*-----------------------------------------*/        
function setGrid201207()
{
	if(typeof(mySheet) !== "undefined")
	{
		
  		mySheet.Reset();
	}
	
	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "420px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
  	
  // 상위 GRID에 대한 속성정보 설정
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:1 } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"구분|합계|합계|합계|당반기|당반기|당반기|전반기|전반기|전반기|고객구분", Align:"Center"},
                 { Text:"구분|대출잔액|연체잔액|연체율|대출잔액|연체잔액|연체율|대출잔액|연체잔액|연체율|고객구분", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:130,  Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:60,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:60,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:60,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:10,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetDataAutoTrim(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기|고객별실적조회");//rp_op_3030 연체고객별보고서 조건
	showUnitText("%, 원");
}


/*-----------------------------------------*/
/* @기능 : 2012년도 상반기 기준 그리드 set */
/*-----------------------------------------*/        
function setGrid2012()
{
	if(typeof(mySheet) !== "undefined")
	{
		
  		mySheet.Reset();
	}
	
	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "420px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
  
// 상위 GRID에 대한 속성정보 설정
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:1 } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"구분|당월|당월|당월|고객구분", Align:"Center"},
                 { Text:"구분|대출잔액|연체잔액|연체율|고객구분", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:130,  Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:60,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:10,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetDataAutoTrim(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기|고객별실적조회");//rp_op_3030 연체고객별보고서 조건
	showUnitText("%, 원");
}


/*---------------------------------------*/
/* @기능 : 2008년도 이전 기준 그리드 set */
/*---------------------------------------*/        
function setGrid2008()
{
	if(typeof(mySheet) !== "undefined")
	{
		
  		mySheet.Reset();
	}
	
	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "420px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
  
// 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

	strHeader0 = "구분|당월성과|당월성과|당월성과|당월성과|당월성과|당월성과|"
	+"전기성과|전기성과|전기성과|전기성과|전기성과|전기성과|"
	+"증감|증감|증감|증감|증감|증감|증감|증감|";    
		
	strHeader1 = "구분|"
    +"연체비율|대출잔액|연체잔액|연체비율(평잔)|대출평잔|연체평잔(월)|"
    +"연체비율|대출잔액|연체잔액|연체비율(평잔)|대출평잔|연체평잔(월)|"
    +"연체비율|증가율|대출잔액|연체잔액|연체비율(평잔)|증가율|대출평잔|연체평잔(월)|";

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:1 } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:130,  Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Float",     Hidden:0,  MinWidth:60,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:60,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:60,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:60,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:10,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetDataAutoTrim(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기|고객별실적조회");//rp_op_3030 연체고객별보고서 조건
	showUnitText("%, 원");
}

/*----------------------------------*/
/* @기능 : 2009년도 기준 그리드 set */
/*----------------------------------*/        
function setGrid2009()
{
	if(typeof(mySheet) !== "undefined")
	{
		
  		mySheet.Reset();
	}
	
	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "420px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}

  // 상위 GRID에 대한 속성정보 설정
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:1 } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"구분|당월|당월|당월|전년말|전년말|전년말|증감|증감|증감|증감|고객구분", Align:"Center"},
                 { Text:"구분|대출잔액|연체잔액|연체율|대출잔액|연체잔액|연체율|대출잔액|연체잔액|연체율|증가율|고객구분", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:130,  Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:60,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:60,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:60,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:60,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:10,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);
   	mySheet.SetEditable(0);
   	mySheet.SetDataAutoTrim(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기|고객별실적조회");//rp_op_3030 연체고객별보고서 조건
	showUnitText("%, 원");
}
