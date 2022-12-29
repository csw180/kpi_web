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
            obj.options[i].selected=true;
            break;
        }
    }
}

/*Sheet 기본 설정 */
function LoadPage(){

  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "750px", "400px");
  
  // Hidden GRID에 대한 속성정보 설정
	hiddenGrid.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

    var hdnInfo    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var hdnHeaders = [ { Text:"HIDDEN", Align:"Center"} ];
    hiddenGrid.InitHeaders(hdnHeaders, hdnInfo);

    var hdnCols = [ {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
        {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
          
    hiddenGrid.InitColumns(hdnCols);

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

function selectjumname()
{
    //hiddenGrid  = document.frm.hiddenGrid;
    basemonth   = document.frm.basemonth.value;
    v_jumcode   = document.frm.jumcode.value;
    if(v_jumcode != '') hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=1&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
    else{ 
		document.frm.jumname.value = '';
		document.frm.pgcode.value = '';
		document.frm.pgname.value = '';
	}
    initGrid(); // 화면 그리드 초기화
}

function popupJumCode()
{
    basemonth = document.frm.basemonth.value;
    win_open2("comm.scr.comm_scr_1010.screen?basemonth="+basemonth+"&searchGubun=2", 250, 450);
}

function selectjum()
{
    //hiddenGrid  = document.frm.hiddenGrid;
    basemonth   = document.frm.basemonth.value;
    v_jumcode   = document.frm.jumcode.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=6&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
    initGrid(); // 화면 그리드 초기화    
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

function ComboValue1(el)
{
    //hiddenGrid  = document.frm.hiddenGrid;
    for ( ;el.options.length;) el.options.remove(0);
    var oOption = document.createElement("OPTION");
    oOption.text = "전체";
    oOption.value = "99999";
    el.options.add(oOption);
    for(i=1;i<=hiddenGrid.TotalRows;i++){
       var oOption = document.createElement("OPTION");
       oOption.text = hiddenGrid.CellValue(i, 1);
       oOption.value = hiddenGrid.CellValue(i, 0);
       el.options.add(oOption);
    }
}

function selectmonth()
{
    initGrid();  // 화면 그리드 초기화
}

/* Sheet 각종 처리 */
function doAction(sAction)
{
//    mySheet     = document.frm.mySheet;
//    hiddenGrid  = document.frm.hiddenGrid;
    isSelected=true;
    basemonth=document.frm.basemonth.value;
    v_jumcode=document.frm.jumcode.value;
	v_jumname   = document.frm.jumname.value;
    pgcode=document.frm.pgcode.value;
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
        case "기준년월":        // 기준월 조회
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3" );
            break;
        case "조회":            // 조회(상위 GRID)
            setTimeout("javascript:doAction('실조회')", 600);
            break;
        case "실조회":          // 점번호를 이용하여 PG코드를 가져오는데 가져오는 시간까지 조회가 실행되지 않도록 하기 위해 불필요한 작업이 들어감.
            if(v_jumcode=="" || v_jumname==""){
                alert("점번호를 입력하지 않았습니다.");
				document.frm.jumcode.focus();
                return;
            }
            if(basemonth < '201001')
              {
                if (pgcode == '16'){
                     alert("기업금융센터 2010년부터 조회가능합니다.");
			        	document.frm.basemonth.focus();
                return;
              }  
            }        
            mySheet.DoSearch("rpop.scr.rpop_scr_1040.do?hidden_key=9&basemonth="+basemonth+"&v_jumcode="+v_jumcode+"&pgcode="+pgcode);
            mySheet.FitSize(false, false);
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
            inqText[2][0]="PG명";
            inqText[2][1]=document.frm.pgname.value;
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
               condition="기준년월="+basemonth+";점번호="+v_jumcode+";PG코드="+pgcode;
               hiddenGrid.DoSearch("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2");
				//gubun1:rpdy(일일성과)2:rpop(영업점성과" );
            }*/
            break;      
    }

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
    basemonth = document.frm.basemonth.value;
    pgcode    = document.frm.pgcode.value;
    
    if (basemonth <= '200812')setGrid2008();
    else {
    	     if  (pgcode == '16') 
    	    {
     	      if (basemonth <= '200912')  setGridRMC2009();
    	       else if (basemonth <= '201012')  setGridRMC2010();
    	 	           else if (basemonth <= '201112')  setGridRMC2011();
    	 	    	          else if (basemonth <= '201206')  setGridRMC2012();
    	 	    	          	   else if (basemonth <= '201212') setGridRMC201207();
    	 	    	          	   	    else setGridRMC2013();
    	 	  }
    	 	  else 
    	 	  {
     	      if (basemonth <= '200912')  setGrid2009();
    	       else if (basemonth <= '201012')  setGrid2010();
    	 	           else if (basemonth <= '201112')  setGrid2011();
    	 	    	          else if (basemonth <= '201206')  setGrid2012();
    	 	    	          	   else if (basemonth <= '201212') setGrid201207();
    	 	    	          	   	    else setGrid2013();
    	 	  }
         }
}  	   
/*-----------------------------------------------*/
/* @기능 : 2013년도 일반 영업점기준 그리드   set */
/*-----------------------------------------------*/        
function setGrid2013()
{
	month   = document.frm.basemonth.value.substring(4,6);  
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  
  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	
	strHeader0 =  "|구분|수익성|수익성|수익성|수익성|수익성|"                  //종합이익(충당전),(충당후),금융기관성예금,위험조정운용마진율,종합비이자 6
     +"건전성"                                                    //연체관리    1
     +"|고객관계|고객관계|"                                       //개인,기업   2
     +"성장성|성장성|성장성|" ;                                    //예수금(반기평잔),대출금(순증평잔),대출금(순증잔액) 3
		
	strHeader1 = "|구분|"     
     +" \n종\n합\n이\n익\n\n(충당전)|"
     +" \n종\n합\n이\n익\n\n(충당후)|"
     +" \n금\n융\n기\n관\n성\n\예\n수\n금\n이\n익\n|"
     +" \n위\n험\n조\n정\n운\n용\n마\n진\n율\n|"
     +" \n종\n합\n비\n이\n자\n이\n익\n|"     
     +" \n연\n체\n율\n|"
     +" \n개\n인\n유\n효\n고\n객\n수|"  
     +" \n기\n업\n유\n효\n고\n객\n수|"  
     +" \n예\n수\n금\n\n(반기평잔)\n|"
     +" \n대\n출\n금\n\n(순증평잔)\n|"
     +" \n대\n출\n금\n\n(순증잔액)\n|";

    mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

    var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
                   { Text:strHeader1, Align:"Center"}];
    mySheet.InitHeaders(headers, info);

	var cols = [ {Type:"Text",      Hidden:1, MinWidth:50,   Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Text",     Hidden:0,  MinWidth:150,  Align:"Left",    ColMerge:1,   SaveName:"col2" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" } ];
          
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);
   
    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetRowHeight(0,10);
    //지원안함[check again] UnitText="●: 최고 ◐:평균이상 ○:평균미만";
	newSetActionMenu(mySheet,"엑셀내려받기");
	for(col=2; col<10; col++ ){
    	mySheet.SetCellAlign(1,col,"CenterTop");
    }
}    	   

/*-----------------------------------------------*/
/* @기능 : 2013년도 RMC 기준 그리드          set */
/*-----------------------------------------------*/        
function setGridRMC2013()
{
	month   = document.frm.basemonth.value.substring(4,6);  
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	
	strHeader0 =  "|구분|"                                                   //1                            
     +"수익성|수익성|수익성|"                                    //종합이익(충당전),(충당후),위험조정운용마진율 3
     +"건전성"                                                  //연체관리    1
     +"|성장성|성장성|성장성" ;                                   //예수금(반기평잔),대출금(순증평잔),대출금(순증잔액) 3
		
	strHeader1 = "|구분|"     
     +" \n종\n합\n이\n익\n\n(충당전)|"
     +" \n종\n합\n이\n익\n\n(충당후)|"
     +" \n위\n험\n조\n정\n운\n용\n마\n진\n율\n|"
     +" \n연\n체\n율\n|"
     +" \n예\n수\n금\n(반기평잔)|"
     +" \n대\n출\n금\n\n(순증평잔)|"
     +" \n대\n출\n금\n\n(순증잔액)|";

   i=0;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"}];

   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",      Hidden:1, MinWidth:50,   Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Text",     Hidden:0,  MinWidth:150,  Align:"Left",    ColMerge:1,   SaveName:"col2" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" } ];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetRowHeight(0,6);
   //지원안함[check again] UnitText="●: 최고 ◐:평균이상 ○:평균미만";
   	newSetActionMenu(mySheet,"엑셀내려받기");
	for(col=2; col<6; col++ ) {
		mySheet.SetCellAlign(1,col,"CenterTop");
	}
}    	   


/*-----------------------------------------------*/
/* @기능 : 2012년도 하반기 영업점기준 그리드 set */
/*-----------------------------------------------*/        
function setGrid201207()
{
  	month   = document.frm.basemonth.value.substring(4,6);  
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	if (month >= '09'){
	
	strHeader0 =  "|구분|수익성|수익성|수익성|수익성|수익성|수익성|수익성|"   //8
           +"건전성|건전성|건전성|건전성|건전성|건전성|"               //6
           +"고객관계|고객관계|고객관계|"                              //3
           +"기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|"           //10
           +"기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대";     //7
		
	strHeader1 = "|구분|"     
           +" \n종\n합\n이\n익\n\n(충당전)|"
           +" \n종\n합\n이\n익\n\n(충당후)|"
           +" \n종\n합\n이\n익\n\n(개선도)|"
           +" \n금\n융\n기\n관\n성\n\예\n수\n금\n이\n익\n|"
           +" \nN\nI\nM\n|"
           +" \n종\n합\n비\n이\n자\n이\n익\n|"
           +" \n종\n합\n비\n이\n자\n이\n익\n\n(개선도)|"
           +" \n대\n출\n금\n연\n체\n관\n리\n|"
           +" \n신\n규\n고\n정\n이\n하\n여\n신\n비\n율|"
           +" \n신\n용\n카\n드\n연\n체\n비\n율\n(현상)|"     
           +" \n신\n용\n카\n드\n연\n체\n비\n율\n(개선도)|"
           +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(현상)\n|"
           +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(개선도)\n|"
           +" \n개\n인\n유\n효\n고\n객\n수|"  
           +" \n기\n업\n유\n효\n고\n객\n수|"
           +" \n신\n규\n고\n객\n수|"
           +" \n개\n인\n고\n객\n\n예\n수\n금\n(반기평잔)|"
           +" \n개\n인\n고\n객\n\n예\n수\n금\n(분기평잔)|"
           +" \n기\n업\n고\n객\n\n예\n수\n금\n(반기평잔)|"
           +" \n기\n업\n고\n객\n\n예\n수\n금\n(분기평잔)|"
           +" \n대\n출\n금\n\n(순증평잔)|"
           +" \n대\n출\n금\n\n(순증잔액)|"
           +" \n대\n출\n금\n\n(분기잔액)|"
           +" \n개\n인\n고\n객\n\n대\n출\n금\n(순증평잔)\n<G2,특성화>|"
           +" \n개\n인\n고\n객\n\n대\n출\n금\n(순증잔액)\n<G2,특성화>|"
           +" \n개\n인\n고\n객\n\n대\n출\n금\n(분기잔액)\n<G2,특성화>|"
           +" \n기\n업\n고\n객\n\n대\n출\n금\n(순증평잔)\n<G2,특성화>|"
           +" \n기\n업\n고\n객\n\n대\n출\n금\n(순증잔액)\n<G2,특성화>|"
           +" \n기\n업\n고\n객\n\n대\n출\n금\n(분기잔액)\n<G2,특성화>|"
           +" \n외\n환\n취\n금\n액|"
           +" \n퇴\n직\n연\n금|"
           +" \n신\n용\n카\n드\n\n매\n출\n액|"
           +" \n구\n매\n카\n드";

	} else {
	
	strHeader0 = "|구분|수익성|수익성|수익성|수익성|수익성|"        //6 
           +"건전성|건전성|건전성|건전성|건전성|건전성|"      //6
           +"고객관계|고객관계|고객관계|"                     //3
           +"기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|"           //10
           +"기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대";     //7
	
	strHeader1 = "|구분|"     
           +" \n종\n합\n이\n익\n\n(충당전)|"
           +" \n종\n합\n이\n익\n\n(충당후)|"
           +" \n금\n융\n기\n관\n성\n\예\n수\n금\n이\n익\n|"
           +" \nN\nI\nM\n|"
           +" \n종\n합\n비\n이\n자\n이\n익\n|"
           +" \n대\n출\n금\n연\n체\n관\n리\n|"
           +" \n신\n규\n고\n정\n이\n하\n여\n신\n비\n율|"
           +" \n신\n용\n카\n드\n연\n체\n비\n율\n(현상)|"     
           +" \n신\n용\n카\n드\n연\n체\n비\n율\n(개선도)|"
           +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(현상)\n|"
           +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(개선도)\n|"
           +" \n개\n인\n유\n효\n고\n객\n수|"  
           +" \n기\n업\n유\n효\n고\n객\n수|"
           +" \n신\n규\n고\n객\n수|"
           +" \n개\n인\n고\n객\n\n예\n수\n금\n(반기평잔)|"
           +" \n개\n인\n고\n객\n\n예\n수\n금\n(분기평잔)|"
           +" \n기\n업\n고\n객\n\n예\n수\n금\n(반기평잔)|"
           +" \n기\n업\n고\n객\n\n예\n수\n금\n(분기평잔)|"
           +" \n대\n출\n금\n\n(순증평잔)|"
           +" \n대\n출\n금\n\n(순증잔액)|"
           +" \n대\n출\n금\n\n(분기잔액)|"
           +" \n개\n인\n고\n객\n\n대\n출\n금\n(순증평잔)\n<G2,특성화>|"
           +" \n개\n인\n고\n객\n\n대\n출\n금\n(순증잔액)\n<G2,특성화>|"
           +" \n개\n인\n고\n객\n\n대\n출\n금\n(분기잔액)\n<G2,특성화>|"
           +" \n기\n업\n고\n객\n\n대\n출\n금\n(순증평잔)\n<G2,특성화>|"
           +" \n기\n업\n고\n객\n\n대\n출\n금\n(순증잔액)\n<G2,특성화>|"
           +" \n기\n업\n고\n객\n\n대\n출\n금\n(분기잔액)\n<G2,특성화>|"
           +" \n외\n환\n취\n금\n액|"
           +" \n퇴\n직\n연\n금|"
           +" \n신\n용\n카\n드\n\n매\n출\n액|"
           +" \n구\n매\n카\n드";
	}

		 i=0;

         mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

		 var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
         var headers = [ { Text:strHeader0, Align:"Center"},
                   		 { Text:strHeader1, Align:"Center"}];
         mySheet.InitHeaders(headers, info);

         var cols = [ {Type:"Text",      Hidden:1, MinWidth:50,   Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Text",     Hidden:0,  MinWidth:150,  Align:"Left",    ColMerge:1,   SaveName:"col2" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" } ];
             
		 //종합이익개선도 2012.09이후 보고서         
		 if (month >= '09'){
         cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         }
         cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
		 //종합비이자이익개선도 2012.09이후 보고서
         if (month >= '09'){
         cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         }
         cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
         cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
 
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetRowHeight(0,32);
         //지원안함[check again] UnitText="●: 최고 ◐:평균이상 ○:평균미만";
         newSetActionMenu(mySheet,"엑셀내려받기");
	if (month >= '09') {
		for(col=2; col<32; col++ ) {      
	    	mySheet.SetCellAlign(1,col,"CenterTop");
	    }
	} else {
		for(col=2; col<30; col++ ) {      
	    	mySheet.SetCellAlign(1,col,"CenterTop");
	    }
	}
}    	   

/*--------------------------------------------*/
/* @기능 : 2012년도 하반기 RMC기준 그리드 set */
/*--------------------------------------------*/        
function setGridRMC201207()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	month   = document.frm.basemonth.value.substring(4,6);  
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	if (month >= '09'){
	
	strHeader0 =  "|구분|수익성|수익성|수익성|수익성|"               //5
           +"건전성|건전성|건전성|건전성|건전성|건전성|"      //6
           +"고객관계|고객관계|고객관계|"                     //3
           +"기반확대|기반확대|기반확대|기반확대";    //4
		
	strHeader1 = "|구분|"     
           +" \n종\n합\n이\n익\n\n(충당전)|"
           +" \n종\n합\n이\n익\n\n(충당후)|"
           +" \n종\n합\n이\n익\n\n(개선도)|"
           +" \nN\nI\nM\n|"    
           +" \n대\n출\n금\n연\n체\n관\n리\n|"
           +" \n신\n규\n고\n정\n이\n하\n여\n신\n비\n율|"
           +" \n신\n용\n카\n드\n연\n체\n비\n율\n(현상)|"     
           +" \n신\n용\n카\n드\n연\n체\n비\n율\n(개선도)|"
           +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(현상)\n|"
           +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(개선도)\n|"
           +" \n개\n인\n유\n효\n고\n객\n수|"  
           +" \n기\n업\n유\n효\n고\n객\n수|"
           +" \n신\n규\n고\n객\n수|"
           +" \n예\n수\n금\n(반기평잔)|"
           +" \n예\n수\n금\n(분기평잔)|"
           +" \n대\n출\n금\n\n(순증평잔)|"
           +" \n대\n출\n금\n\n(순증잔액)";

	} else {
	
	strHeader0 = "|구분|수익성|수익성|수익성|"                      //4
           +"건전성|건전성|건전성|건전성|건전성|건전성|"      //6
           +"고객관계|고객관계|고객관계|"                     //3
           +"기반확대|기반확대|기반확대|기반확대";     //4
	
	strHeader1 = "|구분|"     
           +" \n종\n합\n이\n익\n\n(충당전)|"
           +" \n종\n합\n이\n익\n\n(충당후)|"
           +" \nN\nI\nM\n|"    
           +" \n대\n출\n금\n연\n체\n관\n리\n|"
           +" \n신\n규\n고\n정\n이\n하\n여\n신\n비\n율|"
           +" \n신\n용\n카\n드\n연\n체\n비\n율\n(현상)|"     
           +" \n신\n용\n카\n드\n연\n체\n비\n율\n(개선도)|"
           +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(현상)\n|"
           +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(개선도)\n|"
           +" \n개\n인\n유\n효\n고\n객\n수|"  
           +" \n기\n업\n유\n효\n고\n객\n수|"
           +" \n신\n규\n고\n객\n수|"
           +" \n예\n수\n금\n(반기평잔)|"
           +" \n예\n수\n금\n(분기평잔)|"
           +" \n대\n출\n금\n\n(순증평잔)|"
           +" \n대\n출\n금\n\n(순증잔액)";
	}

	i=0;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"}];
   
	mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",      Hidden:1, MinWidth:50,   Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Text",     Hidden:0,  MinWidth:150,  Align:"Left",    ColMerge:1,   SaveName:"col2" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" } ];
      if (month >= '09'){
	   cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
	  }
	   cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
	   cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
	   cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
	   cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
	   cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
	   cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
	   cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
	   cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
	   cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
	   cols.push({Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
	   cols.push({Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
	   cols.push({Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
	   cols.push({Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
	   cols.push({Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" });
 
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetRowHeight(0,30);
   //지원안함[check again] UnitText="●: 최고 ◐:평균이상 ○:평균미만";
   	newSetActionMenu(mySheet,"엑셀내려받기");

	if (month >= '09') {
		for(col=2; col<32; col++ ) {      
	    	mySheet.SetCellAlign(1,col,"CenterTop");
	    }
	} else {
		for(col=2; col<30; col++ ) {      
	    	mySheet.SetCellAlign(1,col,"CenterTop");
	    }
	}
}    	   

/*---------------------------------------*/
/* @기능 : 2012년도영업점기준 그리드 set */
/*---------------------------------------*/        
function setGrid2012()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

	strHeader0 =  "|구분|수익성|수익성|수익성|수익성|수익성|"        //6 
     +"건전성|건전성|건전성|건전성|건전성|건전성|"      //6
     +"고객관계|고객관계|고객관계|"                     //3
     +"기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|"           //7
     +"기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대";    //4
		
	strHeader1 = "|구분|"     
     +" \n종\n합\n이\n익\n\n(충당전)|"
     +" \n종\n합\n이\n익\n\n(충당후)|"
     +" \n금\n융\n기\n관\n성\n\예\n수\n금\n이\n익\n|"
     +" \nN\nI\nM\n|"
     +" \n종\n합\n비\n이\n자\n이\n익\n|"
     +" \n대\n출\n금\n연\n체\n관\n리\n|"
     +" \n신\n규\n고\n정\n이\n하\n여\n신\n비\n율|"
     +" \n신\n용\n카\n드\n연\n체\n비\n율\n(현상)|"     
     +" \n신\n용\n카\n드\n연\n체\n비\n율\n(개선도)|"
     +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(현상)\n|"
     +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(개선도)\n|"
     +" \n개\n인\n유\n효\n고\n객\n수|"  
     +" \n기\n업\n유\n효\n고\n객\n수|"
     +" \n신\n규\n고\n객\n수|"
     +" \n개\n인\n고\n객\n\n예\n수\n금\n(순증평잔)|"
     +" \n개\n인\n고\n객\n\n예\n수\n금\n(순증잔액)|"
     +" \n기\n업\n고\n객\n\n예\n수\n금\n(순증평잔)|"
     +" \n기\n업\n고\n객\n\n예\n수\n금\n(순증잔액)|"
     +" \n대\n출\n금\n\n(순증평잔)|"
     +" \n대\n출\n금\n\n(순증잔액)|"
     +" \n개\n인\n고\n객\n\n대\n출\n금\n(순증평잔)\n<G2,특성화>|"
     +" \n개\n인\n고\n객\n\n대\n출\n금\n(순증잔액)\n<G2,특성화>|"
     +" \n기\n업\n고\n객\n\n대\n출\n금\n(순증평잔)\n<G2,특성화>|"
     +" \n기\n업\n고\n객\n\n대\n출\n금\n(순증잔액)\n<G2,특성화>|"
     +" \n외\n환\n취\n금\n액|"
     +" \n퇴\n직\n연\n금|"
     +" \n신\n용\n카\n드\n\n매\n출\n액|"
     +" \n구\n매\n카\n드";

   i=0;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"}];
   mySheet.InitHeaders(headers, info);
  
   var cols = [ {Type:"Text",      Hidden:1, MinWidth:50,   Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Text",     Hidden:0,  MinWidth:150,  Align:"Left",    ColMerge:1,   SaveName:"col2" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" } ];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetRowHeight(0,30);
   //지원안함[check again] UnitText="●: 최고 ◐:평균이상 ○:평균미만";
   	newSetActionMenu(mySheet,"엑셀내려받기");
	for(col=2; col<30; col++ ){
   		mySheet.SetCellAlign(1,col,"CenterTop");
   	}
}    	   



/*---------------------------------------*/
/* @기능 : 2012년도 RMC기준 그리드 set */
/*---------------------------------------*/        
function setGridRMC2012()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

	strHeader0 = "|구분|수익성|수익성|수익성|"                      //4
     +"건전성|건전성|건전성|건전성|건전성|건전성|"      //6
     +"고객관계|고객관계|고객관계|"                     //3
     +"기반확대|기반확대|기반확대|기반확대";       //4
		
	strHeader1 = "|구분|"     
     +" \n종\n합\n이\n익\n\n(충당전)|"
     +" \n종\n합\n이\n익\n\n(충당후)|"
     +" \nN\nI\nM\n|"    
     +" \n대\n출\n금\n연\n체\n관\n리\n|"
     +" \n신\n규\n고\n정\n이\n하\n여\n신\n비\n율|"
     +" \n신\n용\n카\n드\n연\n체\n비\n율\n(현상)|"     
     +" \n신\n용\n카\n드\n연\n체\n비\n율\n(개선도)|"
     +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(현상)\n|"
     +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(개선도)\n|"
     +" \n개\n인\n유\n효\n고\n객\n수|"  
     +" \n기\n업\n유\n효\n고\n객\n수|"
     +" \n신\n규\n고\n객\n수|"
     +" \n예\n수\n금\n(순증평잔)|"
     +" \n예\n수\n금\n(순증잔액)|"
     +" \n대\n출\n금\n\n(순증평잔)|"
     +" \n대\n출\n금\n\n(순증잔액)";

		i=0;

         mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

         var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
         var headers = [ { Text:strHeader0, Align:"Center"},
                   		 { Text:strHeader1, Align:"Center"}];
         mySheet.InitHeaders(headers, info);

         var cols = [ {Type:"Text",      Hidden:1, MinWidth:50,   Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Text",     Hidden:0,  MinWidth:150,  Align:"Left",    ColMerge:1,   SaveName:"col2" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Center",  ColMerge:1,   SaveName:"NONE" } ];
          
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
    mySheet.SetRowHeight(0,30);
         //지원안함[check again] UnitText="●: 최고 ◐:평균이상 ○:평균미만";
    newSetActionMenu(mySheet,"엑셀내려받기");
	for(col=2; col<18; col++ ){
    	mySheet.SetCellAlign(1,col,"CenterTop");
    }
}    	   

/*---------------------------------------*/
/* @기능 : 2011년도영업점기준 그리드 set */
/*---------------------------------------*/        
function setGrid2011()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  

  // 상위 GRID에 대한 속성정보 설정

		let strHeader0 = "";
		let strHeader1 = "";

		strHeader0 = "|구분|수익성|수익성|수익성|수익성|"
	     +"고객관계부문|고객관계부문|"
	     +"건전성|건전성|건전성|건전성|건전성|건전성";    
			
		strHeader1 = "|구분|"     
	     +" \n종\n합\n이\n\익\n\n(충당전)|"
	     +" \n종\n합\n이\n익\n\n(충당후)|"
	     +" \n금\n융\n기\n관\n성\n\예\n수\n금\n이\n익\n|"
	     +" \n종\n합\n비\n이\n자\n이\n익\|"
	     +" \n개\n인\n유\n효\n고\n객\n수|"  
	     +" \n기\n업\n유\n효\n고\n객\n수|"
	     +" \n대\n출\n금\n연\n체\n비\n율\n(현상)|"
	     +" \n대\n출\n금\n연\n체\n비\n율\n(개선도)|"
	     +" \n신\n용\n카\n드\n연\n체\n비\n율\n(현상)|"     
	     +" \n신\n용\n카\n드\n연\n체\n비\n율\n(개선도)|"
	     +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(현상)\n|"
	     +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(개선도)\n";

	     i=0;

         mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

         var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
         var headers = [ { Text:strHeader0, Align:"Center"},
                   { Text:strHeader1, Align:"Center"}];
         mySheet.InitHeaders(headers, info);

		 for(col=2; col<15; col++ ){
         	mySheet.SetCellAlign(1,col,"CenterTop");
         }

         var cols = [ {Type:"Text",      Hidden:1, MinWidth:50,   Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Text",     Hidden:0,  MinWidth:150,  Align:"Left",    ColMerge:1,   SaveName:"col2" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" } ];
          
         mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

         mySheet.SetEditable(0);
         mySheet.SetVisible(1);
         mySheet.SetAutoSumPosition(0);
         mySheet.SetRowHeight(0,22);
         //지원안함[check again] UnitText="●: 최고 ◐:평균이상 ○:평균미만";
         newSetActionMenu(mySheet,"엑셀내려받기");

}

/*---------------------------------------*/
/* @기능 : 2011년도 RMC기준 그리드 set */
/*---------------------------------------*/        
function setGridRMC2011()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  

  // 상위 GRID에 대한 속성정보 설정

		let strHeader0 = "";
		let strHeader1 = "";
	
		strHeader0 =  "|구분|수익성|수익성|"
     +"건전성|건전성|건전성|건전성|건전성|건전성";    
			
		strHeader1 = "|구분|"     
     +" \n종\n합\n이\n\익\n\n(충당전)|"
     +" \n종\n합\n이\n익\n\n(충당후)|"
     +" \n대\n출\n금\n연\n체\n비\n율\n(현상)|"
     +" \n대\n출\n금\n연\n체\n비\n율\n(개선도)|"
     +" \n신\n용\n카\n드\n연\n체\n비\n율\n(현상)|"     
     +" \n신\n용\n카\n드\n연\n체\n비\n율\n(개선도)|"
     +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(현상)|"
     +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(개선도)";

	   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );
	
	   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	   var headers = [ { Text:strHeader0, Align:"Center"},
	                 { Text:strHeader1, Align:"Center"}];
	   mySheet.InitHeaders(headers, info);
	
	   var cols = [ {Type:"Text",      Hidden:1, MinWidth:50,   Align:"Left",    ColMerge:1,   SaveName:"col1" },
	             {Type:"Text",     Hidden:0,  MinWidth:150,  Align:"Left",    ColMerge:1,   SaveName:"col2" },
	             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" } ];
	    
	   mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);
	
	   mySheet.SetEditable(0);
	   mySheet.SetVisible(1);
	   mySheet.SetAutoSumPosition(0);
	   mySheet.SetRowHeight(0,22);
	   //지원안함[check again] UnitText="●: 최고 ◐:평균이상 ○:평균미만";
	   newSetActionMenu(mySheet,"엑셀내려받기");
}
    	   
/*---------------------------------------*/
/* @기능 : 2010년도영업점기준 그리드 set */
/*---------------------------------------*/        
function setGrid2010()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

	strHeader0 = "|구분|수익성|수익성|수익성|수익성|수익성|수익성|수익성|"
     +"고객관계부문|고객관계부문|고객관계부문|고객관계부문|고객관계부문|"
     +"건전성|건전성|건전성|건전성";    
		
	strHeader1 = "|구분|"     
     +" \n이\n\n익\n\n(충당전)|"
     +" \n이\n\n익\n\n(충당후)|"
     +" \n이\n\n익\n\n(달성률\n 개선도)|"
     +" \nNIM_B\n\n(현상)|"
     +" \nNIM_B\n\n(개선도)|"
     +" \n종\n합\n비\n이\n자\n이\n익\n(연간)|"
     +" \n종\n합\n비\n이\n자\n이\n익\n(반기)|"
     +" \n개\n인\n유\n효\n고\n객\n수|"  
     +" \n기\n업\n유\n효\n고\n객\n수|"
     +" \n개\n인\n핵\n심\n고\n객\n수|"
     +" \n기\n업\n핵\n심\n고\n객\n수|"
     +" \n교\n차\n판\n매\n지\n수|"
     +" \n대\n출\n금\n연\n체\n비\n율|"
     +" \n신\n용\n카\n드\n연\n체\n비\n율|"
     +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(현상)|"
     +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(개선도)";
	
	     i=0;

         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

         var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
         var headers = [ { Text:strHeader0, Align:"Center"},
                   { Text:strHeader1, Align:"Center"}];
         mySheet.InitHeaders(headers, info);

         var cols = [ {Type:"Text",      Hidden:1, MinWidth:50,   Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Text",     Hidden:0,  MinWidth:150,  Align:"Left",    ColMerge:1,   SaveName:"col2" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" } ];
          
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetRowHeight(0,22);
         //지원안함[check again] UnitText="●: 최고 ◐:평균이상 ○:평균미만";
    newSetActionMenu(mySheet,"엑셀내려받기");
	for(col=2; col<19; col++ ){
    	mySheet.SetCellAlign(1,col,"CenterTop");
    }
}

/*---------------------------------------*/
/* @기능 : 2010년도  RMC 기준 그리드 set */
/*---------------------------------------*/        
function setGridRMC2010()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  

  // 상위 GRID에 대한 속성정보 설정

		let strHeader0 = "";
		let strHeader1 = "";
	
		strHeader0 = "|구분|수익성|수익성|수익성|수익성|"
	     +"건전성|건전성|건전성";    
			
		strHeader1 = "|구분|"     
	     +" \n이\n\n익\n\n(충당전)|"
	     +" \n이\n\n익\n\n(충당후)|"
	     +" \nNIM_B\n\n(현상)|"
	     +" \nNIM_B\n\n(개선도)|"
	     +" \n대\n출\n금\n연\n체\n비\n율|"
	     +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(현상)|"
	     +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(개선도)|";

		i=0;

         mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

         var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
         var headers = [ { Text:strHeader0, Align:"Center"},
                   		{ Text:strHeader1, Align:"Center"}];
         mySheet.InitHeaders(headers, info);

         var cols = [ {Type:"Text",      Hidden:1, MinWidth:50,   Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Text",     Hidden:0,  MinWidth:150,  Align:"Left",    ColMerge:1,   SaveName:"col2" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" } ];
          
         mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

         mySheet.SetEditable(0);
         mySheet.SetVisible(1);
         mySheet.SetAutoSumPosition(0);
         mySheet.SetRowHeight(0,22);
         //지원안함[check again] UnitText="●: 최고 ◐:평균이상 ○:평균미만";
         newSetActionMenu(mySheet,"엑셀내려받기");
}
  
/*---------------------------------------*/
/* @기능 : 2008년도 이전 기준 그리드 set */
/*---------------------------------------*/        
function setGrid2008()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  

  // 상위 GRID에 대한 속성정보 설정

		let strHeader0 = "";
		let strHeader1 = "";
	
		strHeader0 = "|구분|"
	     +"개인|"
	     +"개인|"
	     +"개인|"
	     +"개인|"
	     +"개인|"
	     +"개인|"
	     +"기업|"
	     +"기업|"
	     +"공통|"
	     +"공통|"
	     +"공통|"
	     +"공통|"
	     +"공통|"
	     +"공통|"
	     +"공통|"
	     +"공통|"
	     +"공통|"
	     +"공통|"
	     +"공통|"
	     +"공통|"
	     +"공통|"
	     +"개인|"
	     +"개인|"
	     +"개인|"
	     +"개인|";    
			
		strHeader1 = "|구분|"     
	     +" \n유\n효\n고\n객\n수\n(누증)|"
	     +" \n유\n효\n고\n객\n수\n(개선도)|"
	     +" \n교\n차\n판\n매\n지\n수\n(현상)|"
	     +" \n교\n차\n판\n매\n지\n수\n(개선도)|"
	     +" \n가\n중\n평\n균\n마\n진\n율\n(현상)|"
	     +" \n가\n중\n평\n균\n마\n진\n율\n(개선도)|"  
	     +" \n가\n중\n평\n균\n마\n진\n율\n(현상)|"
	     +" \n가\n중\n평\n균\n마\n진\n율\n(개선도)\n |"
	     +" \n이\n익\n(충당전)|"
	     +" \n이\n익\n(충당후)|"
	     +" \n비\n이\n자\n수\n익|"
	     +" \n연\n체\n비\n율\n카\n드\n(현상)|"
	     +" \n연\n체\n비\n율\n카\n드\n(개선도)|"
	     +" \n대\n출\n연\n체\n비\n율\n잔\n액\n(현상)|"
	     +" \n대\n출\n연\n체\n비\n율\n잔\n액\n(개선도)|"
	     +" \n대\n출\n연\n체\n비\n율\n월\n평\n잔\n(현상)|"
	     +" \n대\n출\n연\n체\n비\n율\n월\n평\n잔\n(개선도)|"
	     +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(현상)|"
	     +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(개선도)|"
	     +" \n위\n험\n가\n중\n자\n산\n위\n험\n률\n(현상)|"
	     +" \n위\n험\n가\n중\n자\n산\n위\n험\n률\n(개선도)|"
	     +" \n고\n객\n유\n지\n율|"
	     +" \n거\n래\n심\n화\n율\n(현상)|"
	     +" \n거\n래\n심\n화\n율\n(개선도)|"
	     +" \n신\n규\n고\n객\n수|";

         i=0;

         mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

         var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
         var headers = [ { Text:strHeader0, Align:"Center"},
                   { Text:strHeader1, Align:"Center"}];
         mySheet.InitHeaders(headers, info);

         var cols = [ {Type:"Text",      Hidden:1, MinWidth:50,   Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Text",     Hidden:0,  MinWidth:150,  Align:"Left",    ColMerge:1,   SaveName:"col2" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" } ];
          
         mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

         mySheet.SetEditable(0);
         mySheet.SetVisible(1);
         mySheet.SetAutoSumPosition(0);
         mySheet.SetRowHeight(0,22);
         //지원안함[check again] UnitText="●: 최고 ◐:평균이상 ○:평균미만";
         newSetActionMenu(mySheet,"엑셀내려받기");
}

/*---------------------------------------*/
/* @기능 : 2009년도 기준 그리드 set */
/*---------------------------------------*/        
function setGrid2009()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

	strHeader0 = "|구분|수익성|수익성|수익성|수익성|수익성|"
     +"고객관계부문|고객관계부문|고객관계부문|고객관계부문|고객관계부문|"
     +"건전성|건전성|건전성|건전성";    
		
	strHeader1 = "|구분|"     
     +" \n이\n\n익\n\n(충당전)|"
     +" \n이\n\n익\n\n(충당후)|"
     +" \nNIM_B\n\n(현상)|"
     +" \nNIM_B\n\n(개선도)|"
     +" \n종\n합\n비\n이\n자\n이\n익|"
     +" \n개\n인\n유\n효\n고\n객\n수|"  
     +" \n기\n업\n유\n효\n고\n객\n수|"
     +" \n개\n인\n핵\n심\n고\n객\n수|"
     +" \n기\n업\n핵\n심\n고\n객\n수|"
     +" \n교\n차\n판\n매\n지\n수|"
     +" \n대\n출\n금\n연\n체\n비\n율|"
     +" \n신\n용\n카\n드\n연\n체\n비\n율|"
     +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(현상)|"
     +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(개선도)";

         i=0;

         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

         var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
         var headers = [ { Text:strHeader0, Align:"Center"},
                   		{ Text:strHeader1, Align:"Center"}];
         mySheet.InitHeaders(headers, info);

         var cols = [ {Type:"Text",      Hidden:1, MinWidth:50,   Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Text",     Hidden:0,  MinWidth:150,  Align:"Left",    ColMerge:1,   SaveName:"col2" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" } ];
          
         mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

         mySheet.SetEditable(0);
         mySheet.SetVisible(1);
         mySheet.SetAutoSumPosition(0);
         mySheet.SetRowHeight(0,22);
         //지원안함[check again] UnitText="●: 최고 ◐:평균이상 ○:평균미만";
         newSetActionMenu(mySheet,"엑셀내려받기");
}

/*---------------------------------------*/
/* @기능 : 2009년도 기준 그리드 set */
/*---------------------------------------*/        
function setGridRMC2009()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

	strHeader0 = "|구분|수익성|수익성|수익성|수익성|수익성|"
     +"건전성|건전성|건전성|건전성|건전성|건전성";    
		
	strHeader1 = "|구분|"     
     +" \n이\n\n익\n\n(충당전)|"
     +" \n이\n\n익\n\n(충당후)|"
     +" \nNIM_B\n\n(현상)|"
     +" \nNIM_B\n\n(개선도)|"
     +" \n종\n합\n비\n이\n자\n이\n익|"
     +" \n대\n출\n금\n연\n체\n비\n율|"
     +" \n신\n용\n카\n드\n연\n체\n비\n율|"
     +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(현상)|"
     +" \n여\n신\n포\n트\n폴\n리\n오\n비\n율\n(개선도)|"
     +" \n위\n험\n가\n중\n자\n산\n위\n험\n률\n(현상)|"
     +" \n위\n험\n가\n중\n자\n산\n위\n험\n률\n(개선도)";

	   i=0;
	
	   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );
	
	   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	   var headers = [ { Text:strHeader0, Align:"Center"},
	                 { Text:strHeader1, Align:"Center"}];
	   mySheet.InitHeaders(headers, info);
	
		
	
	   var cols = [ {Type:"Text",      Hidden:1, MinWidth:50,   Align:"Left",    ColMerge:1,   SaveName:"col1" },
	             {Type:"Text",     Hidden:0,  MinWidth:150,  Align:"Left",    ColMerge:1,   SaveName:"col2" },
	             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	             {Type:"Text",     Hidden:0,  MinWidth:55,   Align:"Center",  ColMerge:1,   SaveName:"NONE" } ];
	    
	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);
	
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetRowHeight(0,22);
	   //지원안함[check again] UnitText="●: 최고 ◐:평균이상 ○:평균미만";
	newSetActionMenu(mySheet,"엑셀내려받기");
	for(col=2; col<14; col++ ){
		mySheet.SetCellAlign(1,col,"CenterTop");
	}
}
  