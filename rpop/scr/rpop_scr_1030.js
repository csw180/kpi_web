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

  createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");
  
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
	
    initGrid();  // 화면 그리드 초기화	
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
    initGrid();  // 화면 그리드 초기화	
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

function selectmonth()
{
    initGrid();  // 화면 그리드 초기화
}

/* Sheet 각종 처리 */
function doAction(sAction)
{
    /*mySheet     = document.frm.mySheet;
    hiddenGrid  = document.frm.hiddenGrid;*/
    isSelected=true;
    basemonth=document.frm.basemonth.value;
    v_jumcode=document.frm.jumcode.value;
	v_jumname   = document.frm.jumname.value;
    pgname=document.frm.pgname.value;
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
        case "기준년월":         // 조회(상위 GRID)
//파라미터 변경[check again]             hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3" );
            break;
        case "조회":            // 조회(상위 GRID)
            setTimeout("javascript:doAction('실조회')", 600);
            break;
        case "실조회":          // 점번호를 이용하여 PG코드를 가져오는데 가져오는 시간까지 조회가 실행되지 않도록 하기 위해 불필요한 작업이 들어감.
            pgcode=document.frm.pgcode.value;
            if(v_jumcode=="" || v_jumname==""){
                alert("점번호를 입력하지 않았습니다.");
                document.frm.jumcode.focus();
                return;
            } else if(pgname==""){
                alert("PG그룹이 없습니다.");
                document.frm.pgname.focus();
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
//파라미터 변경[check again]             mySheet.DoSearch("rpop.scr.rpop_scr_1030.do?hidden_key=9&basemonth=basemonth&pgcode=pgcode" );
            mySheet.FitSize(false, true);
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
               condition="기준년월="+basemonth+";점번호="+v_jumcode+";PG코드="+document.frm.pgcode.value;
               hiddenGrid.DoSearch("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2");
				//gubun1:rpdy(일일성과)2:rpop(영업점성과" )
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
    
    if (basemonth <= '200812') setGrid2008();
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

/*----------------------------------------------------*/
/* @기능 : 2013년도 일반영업점 기준 그리드 set        */
/*----------------------------------------------------*/        
function setGrid2013()
{
	month   = document.frm.basemonth.value.substring(4,6);
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  
  

  // 상위 GRID에 대한 속성정보 설정
  i=0;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:"점번호|점명|<종합평점>|<종합순위>|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|건전성|건전성|고객관계|고객관계|고객관계|고객관계|성장성|성장성|성장성|성장성|성장성|성장성", Align:"Center"},
                 { Text:"점번호|점명|<종합평점>|<종합순위>|종합이익|종합이익|종합이익|종합이익|금융기관성|금융기관성|위험조정운용마진율|위험조정운용마진율|종합비이자이익|종합비이자이익|연체율|연체율|개인유효고객|개인유효고객|기업유효고객|기업유효고객|예수금(반기평잔)|예수금(반기평잔)|대출금|대출금|대출금|대출금|", Align:"Center"},
                 { Text:"점번호|점명|<종합평점>|<종합순위>|(충당금반영전)|(충당금반영전)|(충당금반영후)|(충당금반영후)|||||||||||||||(순증평잔)|(순증평잔)|(순증잔액)|(순증잔액)", Align:"Center"},
                 { Text:"점번호|점명|<종합평점>|<종합순위>|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위", Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
      //지원안함[check again] UnitText="원, %, 개";
   newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %, 개");
}


/*----------------------------------------------------*/
/* @기능 : 2013년도 RMC 기준 그리드 set               */
/*----------------------------------------------------*/        
function setGridRMC2013()
{
	month   = document.frm.basemonth.value.substring(4,6);  
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  
  

  // 상위 GRID에 대한 속성정보 설정
  i=0;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:"점번호|점명|<종합평점>|<종합순위>|수익성|수익성|수익성|수익성|수익성|수익성|건전성|건전성|성장성|성장성|성장성|성장성|성장성|성장성", Align:"Center"},
                 { Text:"점번호|점명|<종합평점>|<종합순위>|종합이익|종합이익|종합이익|종합이익|위험조정운용마진율|위험조정운용마진율|연체율|연체율|예수금(반기평잔)|예수금(반기평잔)|대출금|대출금|대출금|대출금|", Align:"Center"},
                 { Text:"점번호|점명|<종합평점>|<종합순위>|(충당금반영전)|(충당금반영전)|(충당금반영후)|(충당금반영후)|||||||(순증평잔)|(순증평잔)|(순증잔액)|(순증잔액)", Align:"Center"},
                 { Text:"점번호|점명|<종합평점>|<종합순위>|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위", Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
      //지원안함[check again] UnitText="원, %, 개";
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*----------------------------------------------------*/
/* @기능 : 2012년도 하반기 일반영업점 기준 그리드 set */
/*----------------------------------------------------*/        
function setGrid201207()
{
	month   = document.frm.basemonth.value.substring(4,6);  
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  
  

  // 상위 GRID에 대한 속성정보 설정

	i=0;

    mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );

	let strHeader0 = "";  
	let strHeader1 = "";
	let strHeader2 = "";
	let strHeader3 = "";

    //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]

    if (month >= '09')  {// 2012.09이후 보고서 
		  
		  var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };

          strHeader0 = "점번호|점명|"                                               //점번호점명 2 
           +"<종합평점>|<종합순위>|"                                     //종합평점 
           +"수익성|수익성|수익성|수익성|수익성|수익성|"                 //종합이익(충당금반영전),(충당금반영후),종합이익개선도 6
           +"수익성|수익성|수익성|수익성|"                               //금융기관성예수금,NIM                 4
           +"수익성|수익성|수익성|수익성|"                               //종합비이자, 종합비이자 개선도        4
           +"건전성|건전성|건전성|건전성|"                               //대출금연체관리,신규발생고정이하비율  4
           +"건전성|건전성|건전성|건전성|"                               //신용카드 연체관리 현상,개선도        4
           +"건전성|건전성|건전성|건전성|"                               //여신포트폴리오 현상,개선도           4
           +"고객관계|고객관계|고객관계|고객관계|고객관계|고객관계|"     //개인,기업유효고객,신규고객수         6
           +"기반확대|기반확대|기반확대|기반확대|"                       //개인예수금 4
           +"기반확대|기반확대|기반확대|기반확대|"                       //기업예수금 4
           +"기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|"     //대출금     6 : 순증평잔,순증잔액,분기잔액
           +"기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|"     //개인대출금 6 : 순증평잔,순증잔액,분기잔액
           +"기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|"     //기업대출금 6 : 순증평잔,순증잔액,분기잔액        
           +"기반확대|기반확대|기반확대|기반확대|"                       //외환취급고,퇴직연금 4
           +"기반확대|기반확대|기반확대|기반확대";               // 신용카드매출액,구매카드(평잔) 4

		   strHeader1 = "점번호|점명|"                                                                                     //점번호점명 2 
           +"<종합평점>|<종합순위>|"                                                                           //종합평점   2
           +"종합이익 |종합이익 |종합이익|종합이익| 종합이익 | 종합이익 |"                                     // 6
           +"금융기관성\n예수금이익|금융기관성\n예수금이익|NIM|NIM|"                                           // 4
           +"종합비이자이익|종합비이자이익|종합비이자이익 |종합비이자이익 |"                                   // 4
           +"대출금 연체관리|대출금 연체관리|신규발생\n고정이하여신비율|신규발생\n고정이하여신비율|"           // 4
           +"신용카드 연체관리|신용카드 연체관리|신용카드 연체관리|신용카드 연체관리|"                         // 4
           +"여신포트폴리오|여신포트폴리오|여신포트폴리오|여신포트폴리오|"                                     // 4
           +"개인유효고객|개인유효고객|기업유효고객|기업유효고객|신규고객수|신규고객수|"                       // 6
           +"개인 예수금|개인 예수금|개인 예수금|개인 예수금|"                                                 // 4
           +"기업 예수금|기업 예수금|기업 예수금|기업 예수금|"                                                 // 4  
           +"대출금|대출금|대출금|대출금|대출금|대출금|"                                                       // 6
           +"개인 대출금(G2,특성화)|개인 대출금(G2,특성화)|개인 대출금(G2,특성화)|개인 대출금(G2,특성화)|개인 대출금(G2,특성화)|개인 대출금(G2,특성화)|"     // 6
           +"기업 대출금(G2,특성화)|기업 대출금(G2,특성화)|기업 대출금(G2,특성화)|기업 대출금(G2,특성화)|기업 대출금(G2,특성화)|기업 대출금(G2,특성화)|"     // 6
           +"외환취급액|외환취급액|퇴직연금|퇴직연금|신용카드매출액|신용카드매출액|구매카드(평잔)|구매카드(평잔)";  // 8

		   strHeader2 = "점번호|점명|"
           +"<종합평점>|<종합순위>|"                                                          //종합평점   2
           +"(충당금반영전)|(충당금반영전)|(충당금반영후)|(충당금반영후)|(개선도)|(개선도)|"  //종합이익 충당금반영전,반영후,개선도
           +" | |  |  |   |   |(개선도)|(개선도)|"                                            //,금융기관성예수금이익,NIM,종합비이자,종합비이자개선도     
           +" | |   |   |"                                                  //대출금 연체관리 ,신규발생고정이하여신비율
           +"(현상)|(현상)|(개선도)|(개선도)|"                              //신용카드 연체관리
           +"(현상)|(현상)|(개선도)|(개선도)|"                              // 여신포트폴리오 실적
           +" | |  |  |   |   |"                                            // 개인,기업유효고객,신규고객수
           +"(반기평잔)|(반기평잔)|(분기평잔)|(분기평잔)|"                  // 개인예수금 
           +"(반기평잔)|(반기평잔)|(분기평잔)|(분기평잔)|"                  // 기업예수금
           +"(순증평잔)|(순증평잔)|(순증잔액)|(순증잔액)|(분기잔액)|(분기잔액)|"                  // 대출금
           +"(순증평잔)|(순증평잔)|(순증잔액)|(순증잔액)|(분기잔액)|(분기잔액)|"                  // 개인 대출금(G2,특성화)
           +"(순증평잔)|(순증평잔)|(순증잔액)|(순증잔액)|(분기잔액)|(분기잔액)|"                  // 기업 대출금(G2,특성화)
           +" | |  |  |    |    |   |   ";                                     // 외환취급액, 퇴직연금, 신용카드매출액,구매카드(평잔)
		   
		   strHeader3 = "점번호|점명|"
           +"<종합평점>|<종합순위>|"                                                                      // 종합평점
           +"평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|"                      // 종합이익 충당금반영전, 충당금반영후,종합이익개선도, 금융기관성예수금이익,NIM,종합비이자,종합비이자개선도
           +"평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|"                                // 대출금연체관리,신규발생고정이하,신용카드연체관리,여신포트폴리오
           +"평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|"                                // 개인,기업유효고객,신규고객수
           +"평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|"            // 개인예수금,기업예수금
           +"평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|"                                                    // 대출금
           +"평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|"            // 개인대출금,기업대출금
           +"평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|";    // 외환취급액, 퇴직연금, 신용카드매출액, 구매카드(평잔)

	 } else {
		
		   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };

          strHeader0 = "점번호|점명|"                                               //점번호점명 2 
           +"<종합평점>|<종합순위>|"                                      //종합평점 
           +"수익성|수익성|수익성|수익성|"                               //종합이익(충당금반영전)(충당금반영후) 4
           +"수익성|수익성|수익성|수익성|수익성|수익성|"                 //금융기관성예수금,NIM ,종합비이자     6
           +"건전성|건전성|건전성|건전성|"                               //대출금연체관리,신규발생고정이하비율  4
           +"건전성|건전성|건전성|건전성|"                               //신용카드 연체관리 현상,개선도        4
           +"건전성|건전성|건전성|건전성|"                               //여신포트폴리오 현상,개선도           4
           +"고객관계|고객관계|고객관계|고객관계|고객관계|고객관계|"     //개인,기업유효고객,신규고객수         6
           +"기반확대|기반확대|기반확대|기반확대|"                       //개인예수금 4
           +"기반확대|기반확대|기반확대|기반확대|"                       //기업예수금 4
           +"기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|"     //대출금     6 : 순증평잔,순증잔액,분기잔액
           +"기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|"     //개인대출금 6 : 순증평잔,순증잔액,분기잔액
           +"기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|"     //기업대출금 6 : 순증평잔,순증잔액,분기잔액        
           +"기반확대|기반확대|기반확대|기반확대|"                       //외환취급고,퇴직연금 4
           +"기반확대|기반확대|기반확대|기반확대";               // 신용카드매출액,구매카드(평잔) 4

		   strHeader1 = "점번호|점명|"                                                                                     //점번호점명 2 
           +"<종합평점>|<종합순위>|"                                                                           //종합평점   2
           +"종합이익 |종합이익 |종합이익|종합이익|"                                                           // 4
           +"금융기관성\n예수금이익|금융기관성\n예수금이익|NIM|NIM|종합비이자이익|종합비이자이익|"             // 6
           +"대출금 연체관리|대출금 연체관리|신규발생\n고정이하여신비율|신규발생\n고정이하여신비율|"           // 4
           +"신용카드 연체관리|신용카드 연체관리|신용카드 연체관리|신용카드 연체관리|"                         // 4
           +"여신포트폴리오|여신포트폴리오|여신포트폴리오|여신포트폴리오|"                                     // 4
           +"개인유효고객|개인유효고객|기업유효고객|기업유효고객|신규고객수|신규고객수|"                       // 6
           +"개인 예수금|개인 예수금|개인 예수금|개인 예수금|"                                                 // 4
           +"기업 예수금|기업 예수금|기업 예수금|기업 예수금|"                                                 // 4  
           +"대출금|대출금|대출금|대출금|대출금|대출금|"                                                       // 6
           +"개인 대출금(G2,특성화)|개인 대출금(G2,특성화)|개인 대출금(G2,특성화)|개인 대출금(G2,특성화)|개인 대출금(G2,특성화)|개인 대출금(G2,특성화)|"     // 6
           +"기업 대출금(G2,특성화)|기업 대출금(G2,특성화)|기업 대출금(G2,특성화)|기업 대출금(G2,특성화)|기업 대출금(G2,특성화)|기업 대출금(G2,특성화)|"     // 6
           +"외환취급액|외환취급액|퇴직연금|퇴직연금|신용카드매출액|신용카드매출액|구매카드(평잔)|구매카드(평잔)";  // 8

		   strHeader2 = "점번호|점명|"
           +"<종합평점>|<종합순위>|"                                        //종합평점   2
           +"(충당금반영전)|(충당금반영전)|(충당금반영후)|(충당금반영후)|"  //종합이익 충당금반영전,반영후
           +" | |  |  |   |   |"                                            //,금융기관성예수금이익,NIM,종합비이자     
           +" | |   |   |"                                                  //대출금 연체관리 ,신규발생고정이하여신비율
           +"(현상)|(현상)|(개선도)|(개선도)|"                              //신용카드 연체관리
           +"(현상)|(현상)|(개선도)|(개선도)|"                              // 여신포트폴리오 실적
           +" | |  |  |   |   |"                                            // 개인,기업유효고객,신규고객수
           +"(반기평잔)|(반기평잔)|(분기평잔)|(분기평잔)|"                  // 개인예수금 
           +"(반기평잔)|(반기평잔)|(분기평잔)|(분기평잔)|"                  // 기업예수금
           +"(순증평잔)|(순증평잔)|(순증잔액)|(순증잔액)|(분기잔액)|(분기잔액)|"                  // 대출금
           +"(순증평잔)|(순증평잔)|(순증잔액)|(순증잔액)|(분기잔액)|(분기잔액)|"                  // 개인 대출금(G2,특성화)
           +"(순증평잔)|(순증평잔)|(순증잔액)|(순증잔액)|(분기잔액)|(분기잔액)|"                  // 기업 대출금(G2,특성화)
           +" | |  |  |    |    |   |   ";                                     // 외환취급액, 퇴직연금, 신용카드매출액,구매카드(평잔)

		   strHeader3 = "점번호|점명|"
           +"<종합평점>|<종합순위>|"                                                                     // 종합평점
           +"평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|"                                          // 종합이익 충당금반영전, 충당금반영후, 금융기관성예수금이익,NIM,종합비이자
           +"평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|"                                // 대출금연체관리,신규발생고정이하,신용카드연체관리,여신포트폴리오
           +"평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|"                                // 개인,기업유효고객,신규고객수
           +"평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|"            // 개인예수금,기업예수금
           +"평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|"                                                    // 대출금
           +"평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|"            // 개인대출금,기업대출금
           +"평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|";   // 외환취급액, 퇴직연금, 신용카드매출액, 구매카드(평잔)

 }
	var headers = [ { Text:strHeader0, Align:"Center"},
                   { Text:strHeader0, Align:"Center"},
                   { Text:strHeader1, Align:"Center"},
                   { Text:strHeader2, Align:"Center"},
                   { Text:strHeader3, Align:"Center"} ];

   InitHeaders(headers, info);
         

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
       {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
       {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
             
if (month >= '09'){
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    }
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    
if (month >= '09'){
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    }
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
    cols.push({Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
 
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
             //지원안함[check again] UnitText="원, %, 개";
    newSetActionMenu(mySheet,"엑셀내려받기");

}


/*---------------------------------------------*/
/* @기능 : 2012년도 일반영업점 기준 그리드 set */
/*---------------------------------------------*/        
function setGrid2012()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";  
	let strHeader1 = "";
	let strHeader2 = "";
	let strHeader3 = "";
	
	strHeader0 = "점번호|점명|"                                               //점번호점명 2 
     +"<종합평점>|<종합순위>|"                                      //종합평점 
     +"수익성|수익성|수익성|수익성|"                               //종합이익(충당금반영전)(충당금반영후) 4
     +"수익성|수익성|수익성|수익성|수익성|수익성|"                 //금융기관성예수금,NIM ,종합비이자     6
     +"건전성|건전성|건전성|건전성|"                               //대출금연체관리,신규발생고정이하비율  4
     +"건전성|건전성|건전성|건전성|"                               //신용카드 연체관리 현상,개선도        4
     +"건전성|건전성|건전성|건전성|"                               //여신포트폴리오 현상,개선도           4
     +"고객관계|고객관계|고객관계|고객관계|고객관계|고객관계|"     //개인,기업유효고객,신규고객수         6
     +"기반확대|기반확대|기반확대|기반확대|"                       //개인예수금 4
     +"기반확대|기반확대|기반확대|기반확대|"                       //기업예수금 4
     +"기반확대|기반확대|기반확대|기반확대|"                       //대출금     4
     +"기반확대|기반확대|기반확대|기반확대|"                       //개인대출금 4
     +"기반확대|기반확대|기반확대|기반확대|"                       //기업대출금 4         
     +"기반확대|기반확대|기반확대|기반확대|"                       //외환취급고,퇴직연금 4
     +"기반확대|기반확대|기반확대|기반확대" 						// 신용카드매출액,구매카드(평잔) 4
	
	strHeader1 = "점번호|점명|"                                                                                     //점번호점명 2 
     +"<종합평점>|<종합순위>|"                                                                           //종합평점   2
     +"종합이익 |종합이익 |종합이익|종합이익|"                                                           // 4
     +"금융기관성\n예수금이익|금융기관성\n예수금이익|NIM|NIM|종합비이자이익|종합비이자이익|"                 // 6
     +"대출금 연체관리|대출금 연체관리|신규발생\n고정이하여신비율|신규발생\n고정이하여신비율|"             // 4
     +"신용카드 연체관리|신용카드 연체관리|신용카드 연체관리|신용카드 연체관리|"                         // 4
     +"여신포트폴리오|여신포트폴리오|여신포트폴리오|여신포트폴리오|"                                     // 4
     +"개인유효고객|개인유효고객|기업유효고객|기업유효고객|신규고객수|신규고객수|"                       // 6
     +"개인 예수금|개인 예수금|개인 예수금|개인 예수금|"                                                 // 4
     +"기업 예수금|기업 예수금|기업 예수금|기업 예수금|"                                                 // 4  
     +"대출금|대출금|대출금|대출금|"                                                                     // 4
     +"개인 대출금(G2,특성화)|개인 대출금(G2,특성화)|개인 대출금(G2,특성화)|개인 대출금(G2,특성화)|"     // 4
     +"기업 대출금(G2,특성화)|기업 대출금(G2,특성화)|기업 대출금(G2,특성화)|기업 대출금(G2,특성화)|"     // 4
     +"외환취급액|외환취급액|퇴직연금|퇴직연금|신용카드매출액|신용카드매출액|구매카드(평잔)|구매카드(평잔)" //8
	
	strHeader2 =  "점번호|점명|"
     +"<종합평점>|<종합순위>|"                                        //종합평점   2
     +"(충당금반영전)|(충당금반영전)|(충당금반영후)|(충당금반영후)|"  //종합이익 충당금반영전,반영후
     +" | |  |  |   |   |"                                          //,금융기관성예수금이익,NIM,종합비이자     
     +" | |   |   |"                                                //대출금 연체관리 ,신규발생고정이하여신비율
     +"(현상)|(현상)|(개선도)|(개선도)|"                            //신용카드 연체관리
     +"(현상)|(현상)|(개선도)|(개선도)|"                            // 여신포트폴리오 실적
     +" | |  |  |   |   |"                                          // 개인,기업유효고객,신규고객수
     +"(순증평잔)|(순증평잔)|(순증잔액)|(순증잔액)|"                // 개인예수금 
     +"(순증평잔)|(순증평잔)|(순증잔액)|(순증잔액)|"                // 기업예수금
     +"(순증평잔)|(순증평잔)|(순증잔액)|(순증잔액)|"                // 대출금
     +"(순증평잔)|(순증평잔)|(순증잔액)|(순증잔액)|"                // 개인 대출금(G2,특성화)
     +"(순증평잔)|(순증평잔)|(순증잔액)|(순증잔액)|"                // 기업 대출금(G2,특성화)
     +" | |  |  |    |    |   |   "                      // 외환취급액, 퇴직연금, 신용카드매출액,구매카드(평잔)

	strHeader3 =   "점번호|점명|"
     +"<종합평점>|<종합순위>|"                                                                     // 종합평점
     +"평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|"                                          // 종합이익 충당금반영전, 충당금반영후, 금융기관성예수금이익,NIM,종합비이자
     +"평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|"                                // 대출금연체관리,신규발생고정이하,신용카드연체관리,여신포트폴리오
     +"평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|"                                // 개인,기업유효고객,신규고객수
     +"평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|"            // 개인예수금,기업예수금
     +"평점|순위|평점|순위|평점|순위|평점|순위|"                                                    // 대출금
     +"평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|"            // 개인대출금,기업대출금
     +"평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위|평점|순위"				// 외환취급액, 퇴직연금, 신용카드매출액, 구매카드(평잔)
	
     i=0;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"},
                 { Text:strHeader3, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
      //지원안함[check again] UnitText="원, %, 개";
   newSetActionMenu(mySheet,"엑셀내려받기");

}

/*--------------------------------------------*/
/* @기능 : 2012년도 하반기RMC 기준 그리드 set */
/*--------------------------------------------*/        
function setGridRMC201207()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  
  
  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";  
	let strHeader1 = "";
	let strHeader2 = "";
	let strHeader3 = "";
	
	strHeader0 =  "점번호|점명|"
     +"<종합평점>|<종합순위>|"                                                            //종합평점 
     +"수익성|수익성|수익성|수익성|수익성|수익성|"                                    //종합이익(충당금반영전),(충당금반영후),NIM
     +"건전성|건전성|건전성|건전성|"                                                  //대출금연체관리,신규고정이하
     +"건전성|건전성|건전성|건전성|"                                                  //신용카드연체관리
     +"건전성|건전성|건전성|건전성|"                                                  //여신포트폴리오연체관리
     +"기반확대|기반확대|기반확대|기반확대|"                                          //예수금
     +"기반확대|기반확대|기반확대|기반확대"                           				   // 대출금
	
	strHeader1 = "점번호|점명"
     +"|<종합평점>|<종합순위>|"                                                            //종합평점 
     +" 종합이익| 종합이익|종합이익|종합이익|"
     +"NIM|NIM|"     
     +"대출금 연체관리|대출금 연체관리|"
     +"신규발생\n고정이하여신비율|신규발생\n고정이하여신비율|"
     +"신용카드 연체관리|신용카드 연체관리|신용카드 연체관리|신용카드 연체관리|"
     +"여신포트폴리오|여신포트폴리오|여신포트폴리오|여신포트폴리오|"
     +"예수금|예수금|예수금|예수금|"
     +"대출금|대출금|대출금|대출금"
	
	strHeader2 = "점번호|점명|"
     +"<종합평점>|<종합순위>|"                                                            //종합평점 
     +"(충당금반영전)|(충당금반영전)|(충당금반영후)|(충당금반영후)|   |   |"       // 종합이익 충당금반영전,반영후,NIM
     +" | |  |  |"                                                  // 대출금 연체관리 ,신규발생고정이하
     +"(현상)|(현상)|(개선도)|(개선도)|"                            // 신용카드 연체관리
     +"(현상)|(현상)|(개선도)|(개선도)|"                            // 여신포트폴리오 
     +"(반기평잔)|(반기평잔)|(분기평잔)|(분기평잔)|"                // 기업예수금
     +"(순증평잔)|(순증평잔)|(순증잔액)|(순증잔액)"                 // 대출금 
	
	strHeader3 = "점번호|점명|"
     +"<종합평점>|<종합순위>|"                                      // 종합평점 
     +"평점|순위|평점|순위|평점|순위|"                              // 종합이익 충당금반영전, 충당금반영후,NIM
     +"평점|순위|평점|순위|평점|순위|평점|순위|"                    // 대출금 연체관리,신규발생고정이하여시
     +"평점|순위|평점|순위|평점|순위|평점|순위|"                    // 신용카드연체관리,여신포트폴리오
     +"평점|순위|평점|순위|평점|순위|평점|순위|"                    // 예수금
     +"평점|순위|평점|순위|평점|순위|평점|순위"                     // 대출금

	i=0;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"},
                 { Text:strHeader3, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
      //지원안함[check again] UnitText="원, %, 개";
   newSetActionMenu(mySheet,"엑셀내려받기");

}


/*--------------------------------------*/
/* @기능 : 2012년도 RMC 기준 그리드 set */
/*--------------------------------------*/        
function setGridRMC2012()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  
  
  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";  
	let strHeader1 = "";
	let strHeader2 = "";
	let strHeader3 = "";
	
	strHeader0 =  "점번호|점명|"
     +"<종합평점>|<종합순위>|"                                                            //종합평점 
     +"수익성|수익성|수익성|수익성|수익성|수익성|"                                    //종합이익(충당금반영전),(충당금반영후),NIM
     +"건전성|건전성|건전성|건전성|"                                                  //대출금연체관리,신규고정이하
     +"건전성|건전성|건전성|건전성|"                                                  //신용카드연체관리
     +"건전성|건전성|건전성|건전성|"                                                  //여신포트폴리오연체관리
     +"기반확대|기반확대|기반확대|기반확대|"                                          //예수금
     +"기반확대|기반확대|기반확대|기반확대"                                           // 대출금
	
	strHeader1 = "점번호|점명"
     +"|<종합평점>|<종합순위>|"                                                            //종합평점 
     +" 종합이익| 종합이익|종합이익|종합이익|"
     +"NIM|NIM|"     
     +"대출금 연체관리|대출금 연체관리|"
     +"신규발생\n고정이하여신비율|신규발생\n고정이하여신비율|"
     +"신용카드 연체관리|신용카드 연체관리|신용카드 연체관리|신용카드 연체관리|"
     +"여신포트폴리오|여신포트폴리오|여신포트폴리오|여신포트폴리오|"
     +"예수금|예수금|예수금|예수금|"
     +"대출금|대출금|대출금|대출금"
	
	strHeader2 = "점번호|점명|"
     +"<종합평점>|<종합순위>|"                                                            //종합평점 
     +"(충당금반영전)|(충당금반영전)|(충당금반영후)|(충당금반영후)|   |   |"       // 종합이익 충당금반영전,반영후,NIM
     +" | |  |  |"                                                  // 대출금 연체관리 ,신규발생고정이하
     +"(현상)|(현상)|(개선도)|(개선도)|"                            // 신용카드 연체관리
     +"(현상)|(현상)|(개선도)|(개선도)|"                            // 여신포트폴리오 
     +"(순증평잔)|(순증평잔)|(순증잔액)|(순증잔액)|"                // 기업예수금
     +"(순증평잔)|(순증평잔)|(순증잔액)|(순증잔액)"                              // 대출금 
	
	strHeader3 = "점번호|점명|"
     +"<종합평점>|<종합순위>|"                                      // 종합평점 
     +"평점|순위|평점|순위|평점|순위|"                              // 종합이익 충당금반영전, 충당금반영후,NIM
     +"평점|순위|평점|순위|평점|순위|평점|순위|"                    // 대출금 연체관리,신규발생고정이하여시
     +"평점|순위|평점|순위|평점|순위|평점|순위|"                    // 신용카드연체관리,여신포트폴리오
     +"평점|순위|평점|순위|평점|순위|평점|순위|"                    // 예수금
     +"평점|순위|평점|순위|평점|순위|평점|순위"                     // 대출금

	i=0;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"},
                 { Text:strHeader3, Align:"Center"} ];
   
	mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
	   mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);
	
	   mySheet.SetEditable(0);
	   mySheet.SetVisible(1);
	   mySheet.SetAutoSumPosition(0);
	      //지원안함[check again] UnitText="원, %, 개";
	   newSetActionMenu(mySheet,"엑셀내려받기");

}
      

/*---------------------------------------------*/
/* @기능 : 2011년도 일반영업점 기준 그리드 set */
/*---------------------------------------------*/        
function setGrid2011()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  

  // 상위 GRID에 대한 속성정보 설정

		let strHeader0 = "";  
		let strHeader1 = "";
		let strHeader2 = "";
		let strHeader3 = "";
		
		strHeader0 =  "점번호|점명|"
	     +"수익성|수익성|수익성|수익성|"                                                  //종합이익(충당금반영전)
	     +"수익성|수익성|수익성|수익성|"                                                  //종합이익(충당금반영후)
	     +"수익성|수익성|수익성|수익성|"                                                  //금융기관성예금이익
	     +"수익성|수익성|수익성|수익성|"                                                  //종합비이자이익
	     +"고객기반|고객기반|"                                                            //개인유효고객 
	     +"고객기반|고객기반|고객기반|고객기반|"                                          //기업유효고객 
	     +"고객기반|고객기반|"                                                            //신규고객수
	     +"건전성|건전성|건전성|"                                                         //대출금연체관리
	     +"건전성|건전성|건전성|"                                                         //신용카드연체관리
	     +"건전성|건전성|건전성|"                                                         //여신포트폴리오연체관리
	     +"기반확대|기반확대|기반확대|기반확대|"                                          //개인예수금 
	     +"기반확대|기반확대|기반확대|기반확대|"                                          //기업예수금
	     +"기반확대|기반확대|"                                                            //저원가성예수금
	     +"기반확대|기반확대|기반확대|기반확대|"                                          //대출금
	     +"기반확대|기반확대|기반확대|기반확대|"                                          //개인대출금
	     +"기반확대|기반확대|기반확대|기반확대|"                                          //기업대출금          
	     +"기반확대|기반확대|기반확대|기반확대|"                                          // 외환취급고,퇴직연금
	     +"기반확대|기반확대|기반확대|기반확대"		                                  // 신용카드매출액,구매카드(평잔)
		
		strHeader1 = "점번호|점명|"
	     +"종합이익 (충당금반영전)|종합이익 (충당금반영전)|종합이익 (충당금반영전)|종합이익 (충당금반영전)|"
	     +"종합이익 (충당금반영후)|종합이익 (충당금반영후)|종합이익 (충당금반영후)|종합이익 (충당금반영후)|"     
	     +"금융기관성예수금이익|금융기관성예수금이익|금융기관성예수금이익|금융기관성예수금이익|"
	     +"종합비이자이익|종합비이자이익|종합비이자이익|종합비이자이익|"
	     +"개인유효고객|개인유효고객|"
	     +"기업유효고객|기업유효고객|기업유효고객|기업유효고객|"
	     +"신규고객수|신규고객수|"
	     +"대출금 연체관리|대출금 연체관리|대출금 연체관리|"
	     +"신용카드 연체관리|신용카드 연체관리|신용카드 연체관리|"
	     +"여신포트폴리오 실적|여신포트폴리오 실적|여신포트폴리오 실적|"
	     +"개인 예수금|개인 예수금|개인 예수금|개인 예수금|"
	     +"기업 예수금|기업 예수금|기업 예수금|기업 예수금|"
	     +"저원가성 예수금|저원가성 예수금|"
	     +"대출금|대출금|대출금|대출금|"
	     +"개인 대출금|개인 대출금|개인 대출금|개인 대출금|"
	     +"기업 대출금|기업 대출금|기업 대출금|기업 대출금|"
	     +"외환취급액|외환취급액|퇴직연금|퇴직연금|신용카드매출액|신용카드매출액|구매카드(평잔)|구매카드(평잔)"
		
		strHeader2 = "점번호|점명|"
	     +"  |  |  |  | | | | |   |   |   |   |"                        // 종합이익 충당금반영전,반영후,금융기관성예수금이익
	     +" | | | |"                                                    // 종합비이자이익            
	     +"절대평가|절대평가|"                                          // 개인유효고객
	     +"(절대평가)|(절대평가)|상대평가|상대평가|"                        // 기업유효고객
	     +" | |"                                                        // 신규고객수
	     +"(현상)|(현상)|(개선도)|"                                     // 대출금 연체관리 
	     +"(현상)|(현상)|(개선도)|"                                     // 신용카드 연체관리
	     +"(현상)|(현상)|(개선도)|"                                     // 여신포트폴리오 실적
	     +"(순증평잔)|(순증평잔)|(순증잔액)|(순증잔액)|"                // 개인예수금 
	     +"(순증평잔)|(순증평잔)|(순증잔액)|(순증잔액)|"                // 기업예수금
	     +"(순증평잔)|(순증평잔)|"                                      // 저원가성 예수금
	     +"(순증잔액)|(순증잔액)|(분기잔액)|(분기잔액)|"                // 대출금 
	     +"(순증잔액)|(순증잔액)|(분기잔액)|(분기잔액)|"                // 개인 대출금
	     +"(순증잔액)|(순증잔액)|(분기잔액)|(분기잔액)|"                // 기업 대출금
	     +" | |  |  |    |    |   |   "                        // 외환취급액, 퇴직연금, 신용카드매출액,구매카드(평잔)
		
		strHeader3 = "점번호|점명|"
	     +"목표|실적|달성도|순위|목표|실적|달성도|순위|목표|실적|달성률|순위|"     // 종합이익 충당금반영전, 충당금반영후, 금융기관성예수금이익
	     +"목표|실적|달성도|순위|"                                                 // 종합비이자이익     
	     +"달성도|순위|달성도|순위|달성도|순위|"                                   // 개인,기업 유효고객
	     +"실적|순위|"                                                             // 신규고객수
	     +"실적|순위|순위|실적|순위|순위|실적|순위|순위|"                          // 대출금 연체관리, 신용카드 연체관리, 여신포트폴리오 실적
	     +"달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|"           // 개인예수금, 기업예수금, 저원가성 예수금
	     +"달성도|순위|달성도|순위|"                                               //  대출금
	     +"달성도|순위|달성도|순위|달성도|순위|달성도|순위|"                       // 개인대출금, 기업대출금
	     +"달성도|순위|달성도|순위|달성도|순위|달성도|순위"                      // 외환취급액, 퇴직연금, 신용카드매출액, 구매카드(평잔)

		 i=0;

         mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

         var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
         var headers = [ { Text:strHeader0, Align:"Center"},
                   { Text:strHeader1, Align:"Center"},
                   { Text:strHeader2, Align:"Center"},
                   { Text:strHeader3, Align:"Center"} ];
         mySheet.InitHeaders(headers, info);

         var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
          
         mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

         mySheet.SetEditable(0);
         mySheet.SetVisible(1);
         mySheet.SetAutoSumPosition(0);
                  //지원안함[check again] UnitText="원, %, 개";
         newSetActionMenu(mySheet,"엑셀내려받기");

}

/*--------------------------------------*/
/* @기능 : 2011년도 RMC 기준 그리드 set */
/*--------------------------------------*/        
function setGridRMC2011()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  
  
  // 상위 GRID에 대한 속성정보 설정

		let strHeader0 = "";  
		let strHeader1 = "";
		let strHeader2 = "";
		let strHeader3 = "";
		
		strHeader0 =    "점번호|점명|"
	     +"수익성|수익성|수익성|수익성|"                                                  //종합이익(충당금반영전)
	     +"수익성|수익성|수익성|수익성|"                                                  //종합이익(충당금반영후)
	     +"건전성|건전성|건전성|"                                                         //대출금연체관리
	     +"건전성|건전성|건전성|"                                                         //신용카드연체관리
	     +"건전성|건전성|건전성|"                                                         //여신포트폴리오연체관리
	     +"기반확대|기반확대|기반확대|기반확대|"                                          //기업예수금
	     +"기반확대|기반확대"                                                     // 대출금(순증잔액)
		
		strHeader1 = "점번호|점명|"
	     +"종합이익 (충당금반영전)|종합이익 (충당금반영전)|종합이익 (충당금반영전)|종합이익 (충당금반영전)|"
	     +"종합이익 (충당금반영후)|종합이익 (충당금반영후)|종합이익 (충당금반영후)|종합이익 (충당금반영후)|"     
	     +"대출금 연체관리|대출금 연체관리|대출금 연체관리|"
	     +"신용카드 연체관리|신용카드 연체관리|신용카드 연체관리|"
	     +"여신포트폴리오 실적|여신포트폴리오 실적|여신포트폴리오 실적|"
	     +"예수금|예수금|예수금|예수금|"
	     +"대출금|대출금";
		
		strHeader2 =  "점번호|점명|"
	     +" | | | |  |  |  |  |"                                       // 종합이익 충당금반영전,반영후
	     +"(현상)|(현상)|(개선도)|"                                     // 대출금 연체관리 
	     +"(현상)|(현상)|(개선도)|"                                     // 신용카드 연체관리
	     +"(현상)|(현상)|(개선도)|"                                     // 여신포트폴리오 실적
	     +"(순증평잔)|(순증평잔)|(순증잔액)|(순증잔액)|"                // 기업예수금
	     +"(순증잔액)|(순증잔액)"                                 // 대출금 
		
		strHeader3 =  "점번호|점명|"
	     +"목표|실적|달성도|순위|목표|실적|달성도|순위|"                           // 종합이익 충당금반영전, 충당금반영후
	     +"실적|순위|실적|순위|실적|순위|순위|실적|순위|순위|"                     // 대출금 연체관리, 신용카드 연체관리, 여신포트폴리오 실적
	     +"달성도|순위|달성도|순위|"                                               // 예수금
	     +"달성도|순위" ; 					                       // 대출금

		 i=0;

         mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

         var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
         var headers = [ { Text:strHeader0, Align:"Center"},
                   { Text:strHeader1, Align:"Center"},
                   { Text:strHeader2, Align:"Center"},
                   { Text:strHeader3, Align:"Center"} ];
         
		 mySheet.InitHeaders(headers, info);

         var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
          
         mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

         mySheet.SetEditable(0);
         mySheet.SetVisible(1);
         mySheet.SetAutoSumPosition(0);
                  //지원안함[check again] UnitText="원, %, 개";
         newSetActionMenu(mySheet,"엑셀내려받기");
}

    
/*---------------------------------------------*/
/* @기능 : 2010년도 일반영업점 기준 그리드 set */
/*---------------------------------------------*/        
function setGrid2010()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  

  // 상위 GRID에 대한 속성정보 설정

		let strHeader0 = "";  
		let strHeader1 = "";
		let strHeader2 = "";
		let strHeader3 = "";
		
		strHeader0 =    "점번호|점명|"
	     +"수익성|수익성|수익성|수익성|"                                                  //종합이익(충당금반영전)
	     +"수익성|수익성|수익성|수익성|"                                                  //종합이익(충당금반영후)
	     +"수익성|수익성|수익성|"                                                         //종합이익달성률 개선도
	     +"수익성|수익성|수익성|"                                                         //NIM_B
	     +"수익성|수익성|수익성|수익성|"                                                  //종합비이자이익(연간)
	     +"수익성|수익성|수익성|수익성|"                                                  //종합비이자이익(반기)
	     +"고객기반|고객기반|고객기반|고객기반|"                                          //개인유효고객 
	     +"고객기반|고객기반|고객기반|고객기반|"                                          //기업유효고객 
	     +"고객기반|고객기반|고객기반|고객기반|고객기반|고객기반|고객기반|고객기반|"      //개인핵심고객수,기업핵심고객수,교차판매지수,캠페인HIT율
	     +"건전성|건전성|건전성|건전성|건전성|건전성|건전성|"                             //대출금,신용카드 연체관리, 여신포트폴리오
	     +"기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|"                        //개인총예수금 
	     +"기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|"                        //기업총예수금
	     +"기반확대|기반확대|기반확대|기반확대|"                                          //저원가성예수금
	     +"기반확대|기반확대|기반확대|기반확대|"                                          //적립식예수금,소액대출금
	     +"기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|"                        //총여신운용
	     +"기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대";    // 외환취급고,퇴직연금, 카드매출액
		
		strHeader1 =  "점번호|점명|"
	     +"충당금적립전|충당금적립전|충당금적립전|충당금적립전|"
	     +"충당금적립후|충당금적립후|충당금적립후|충당금적립후|"
	     +"종합이익달성률개선도|종합이익달성률개선도|종합이익달성률개선도|"
	     +"NIM_B|NIM_B|NIM_B|"
	     +"종합비이자이익(연간실적)|종합비이자이익(연간실적)|종합비이자이익(연간실적)|종합비이자이익(연간실적)|"
	     +"종합비이자이익(반기실적)|종합비이자이익(반기실적)|종합비이자이익(반기실적)|종합비이자이익(반기실적)|"
	     +"개인유효고객|개인유효고객|개인유효고객|개인유효고객|"
	     +"기업유효고객|기업유효고객|기업유효고객|기업유효고객|"
	     +"개인핵심고객수|개인핵심고객수|기업핵심고객수|기업핵심고객수|교차판매지수|교차판매지수|"
	     +"캠페인HIT율|캠페인HIT율|"
	     +"대출금 연체관리|대출금 연체관리|신용카드 연체관리|신용카드 연체관리|여신포트폴리오 실적|여신포트폴리오 실적|여신포트폴리오 실적|"
	     +"개인 총예수금|개인 총예수금|개인 총예수금|개인 총예수금|개인 총예수금|개인 총예수금|"
	     +"기업 총예수금|기업 총예수금|기업 총예수금|기업 총예수금|기업 총예수금|기업 총예수금|"
	     +"저원가성예수금|저원가성예수금|저원가성예수금|저원가성예수금|적립식예수금|적립식예수금|"
	     +"총여신운용|총여신운용|총여신운용|총여신운용|총여신운용|총여신운용|"
	     +"소액대출금|소액대출금|외환취급고|외환취급고|퇴직연금|퇴직연금|카드매출액|카드매출액|카드매출액|카드매출액";
		
		strHeader2 =   "점번호|점명|"
	     +" | | | |  |  |  |  |   |   |   |"                                                             // 종합이익 충당금적립전, 적립후, 종합이익달성률개선도
	     +"(현상)|(현상)|(개선도)| | | | |  |  |  |  |"                                            // NIM_B, 종합비이자(연간), 반기
	     +"절대평가|절대평가|상대평가|상대평가|절대평가|절대평가|상대평가|상대평가|"           
	     +" | | | | | | | |"
	     +"  |  |  |  |(현상)|(현상)|(개선도)|"
	     +"(연간 순증평잔)|(연간 순증평잔)|(반기 순증평잔)|(반기 순증평잔)|(순증잔액)|(순증잔액)|"
	     +"(연간 순증평잔)|(연간 순증평잔)|(반기 순증평잔)|(반기 순증평잔)|(순증잔액)|(순증잔액)|"
	     +"(누증평잔)|(누증평잔)|(순증평잔)|(순증평잔)| | |"
	     +"(연간 순증평잔)|(연간 순증평잔)|(반기 순증평잔)|(반기 순증평잔)|(순증잔액)|(순증잔액)|"
	     +" | | | | | |신용카드|신용카드|구매카드|구매카드|"
			
		strHeader3 =  "점번호|점명|"
	     +"목표|실적|달성도|순위|목표|실적|달성도|순위|달성률|개선도|순위|"
	     +"실적|순위|순위|목표|실적|달성도|순위|목표|실적|달성도|순위|"
	     +"달성도|순위|달성도|순위|달성도|순위|달성도|순위|개선도|순위|달성도|순위|개선도|순위|HIT율|순위|"
	     +"실적|순위|실적|순위|실적|순위|순위|"
	     +"달성도|순위|달성도|순위|달성도|순위|"
	     +"달성도|순위|달성도|순위|달성도|순위|"
	     +"달성도|순위|달성도|순위|달성도|순위|달성도|순위|"
	     +"달성도|순위|달성도|순위|달성도|순위|"
	     +"달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위";   					                       // 대출금

  	i=0;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"},
                 { Text:strHeader3, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
      //지원안함[check again] UnitText="원, %, 개";
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*--------------------------------------*/
/* @기능 : 2010년도 RMC 기준 그리드 set */
/*--------------------------------------*/        
function setGridRMC2010()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  
  
  // 상위 GRID에 대한 속성정보 설정

		let strHeader0 = "";  
		let strHeader1 = "";
		let strHeader2 = "";
		let strHeader3 = "";
		
		strHeader0 = "점번호|점명|"
	     +"수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|"
	     +"건전성|건전성|건전성|건전성|건전성|"
	     +"기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|"
	     +"기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|"
	     +"기반확대|기반확대|기반확대|기반확대" ;
		
		strHeader1 = "점번호|점명|"
	     +"충당금적립전|충당금적립전|충당금적립전|충당금적립전|"
	     +"충당금적립후|충당금적립후|충당금적립후|충당금적립후|NIM_B|NIM_B|NIM_B|"
	     +"대출금 연체관리|대출금 연체관리|여신포트폴리오 실적|여신포트폴리오 실적|여신포트폴리오 실적|"
	     +"총예수금|총예수금|총예수금|총예수금|총예수금|총예수금|"
	     +"총여신운용|총여신운용|총여신운용|총여신운용|총여신운용|총여신운용|"
	     +"외환취급고|외환취급고|퇴직연금|퇴직연금";
		
		strHeader2 =   "점번호|점명|"
	     +" | | | | | | | |(현상)|(현상)|(개선도)|"
	     +" | |(현상)|(현상)|(개선도)|"
	     +"(연간 순증평잔)|(연간 순증평잔)|(반기 순증평잔)|(반기 순증평잔)|(순증잔액)|(순증잔액)|"
	     +"(연간 순증평잔)|(연간 순증평잔)|(반기 순증평잔)|(반기 순증평잔)|(순증잔액)|(순증잔액)|"
	     +" | | | ";
			
		strHeader3 =  "점번호|점명|"
	     +"목표|실적|달성도|순위|목표|실적|달성도|순위|실적|순위|순위|"
	     +"실적|순위|실적|순위|순위|"
	     +"달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위";   					                 

   i=0;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"},
                 { Text:strHeader3, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
      //지원안함[check again] UnitText="원, %, 개";
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
		let strHeader2 = "";
		let strHeader3 = "";
		
		strHeader0 = "구분|점명|"
     +"수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|"
     +"고객기반|고객기반|고객기반|고객기반|고객기반|고객기반|"
     +"건전성|건전성|건전성|건전성|건전성|건전성|건전성|건전성|건전성|건전성|건전성|건전성|건전성|건전성|건전성|"
     +"기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|"
     +"개인|개인|개인|개인|개인|개인|개인";
		
		strHeader1 = "구분|점명|"
     +"충당금적립전|충당금적립전|충당금적립전|충당금적립전|충당금적립후|충당금적립후|충당금적립후|충당금적립후|개인가중평균마진|개인가중평균마진|개인가중평균마진|기업가중평균마진율|기업가중평균마진율|기업가중평균마진율|비이자수익|비이자수익|비이자수익|비이자수익|"
     +"유효고객|유효고객|유효고객|교차판매지수|교차판매지수|교차판매지수|"
     +"연체비율(카드)|연체비율(카드)|연체비율(카드)|연체비율(잔액)|연체비율(잔액)|연체비율(잔액)|연체비율(월평잔)|연체비율(월평잔)|연체비율(월평잔)|여신포트폴리오 실적|여신포트폴리오 실적|여신포트폴리오 실적|위험가중자산 위험률|위험가중자산 위험률|위험가중자산 위험률|"
     +"총예수금(개인)|총예수금(개인)|총예수금(기업)|총예수금(기업)|저원가성(개인)|저원가성(개인)|저원가성(기업)|저원가성(기업)|여신잔액(개인)|여신잔액(개인)|여신잔액(기업)|여신잔액(기업)|여신평잔(개인)|여신평잔(개인)|여신평잔(기업)|여신평잔(기업)|신규여신(개인)|신규여신(개인)|신규여신(기업)|신규여신(기업)|보장성 공제료|보장성 공제료|저축성 공제료|저축성 공제료|외환취급고|외환취급고|도매형수탁고|도매형수탁고|소매형수탁고|소매형수탁고|카드유효회원수|카드유효회원수|카드매출액|카드매출액| "
     +"고객유지율|고객유지율|거래심화율|거래심화율|거래심화율|신규고객수|신규고객수";
		
		strHeader2 =   "구분|점명|"
     +" | | | |  |  |  |  |(현상)|(현상)|(개선도)|(현상)|(현상)|(개선도)| | | | |"
     +" 누중실적|누중실적|(개선도)|(현상)|(현상)|(개선도)|"
     +"(현상)|(현상)|(개선도)|(현상)|(현상)|(개선도)|(현상)|(현상)|(개선도)|(현상)|(현상)|(개선도)|(현상)|(현상)|(개선도)|"
     +" | | |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |" 
     +" | |(현상)|(현상)|(개선도)| | ";

	/*
     "구분|점명|"
     +"충당금적립전|충당금적립전|충당금적립전|충당금적립전|충당금적립후|충당금적립후|충당금적립후|충당금적립후|"
     
     +"순이자수익|순이자수익|고객유지율|고객유지율|(현상)|(현상)|(개선도)|(현상)|(현상)|(개선도)|"
     +"(현상)|(현상)|(개선도)|신규고객수|신규고객수|(현상)|(현상)|(개선도)|"
     
     +"순이자수익|순이자수익|(현상)|(현상)|(개선도)|(현상)|(현상)|(개선도)|"
     +"비이자수익|비이자수익|(현상)|(현상)|(개선도)|(현상)|(현상)|(개선도)"
    */
			
		strHeader3 = "구분|점명|"
     +"목표|실적|달성도|순위|목표|실적|달성도|순위|실적|순위|순위|실적|순위|순위|목표|실적|달성도|순위|"
     +"달성도|순위|순위|실적|순위|순위|실적|순위|순위|실적|순위|순위|실적|순위|순위|실적|순위|순위|실적|순위|순위|"
     +"달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|"
     +"실적|순위|실적|순위|순위|실적|순위";  

        i=0;

         mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

         var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
         var headers = [ { Text:strHeader0, Align:"Center"},
                   { Text:strHeader1, Align:"Center"},
                   { Text:strHeader2, Align:"Center"},
                   { Text:strHeader3, Align:"Center"} ];
         mySheet.InitHeaders(headers, info);

         var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
          
         mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

         mySheet.SetEditable(0);
         mySheet.SetVisible(1);
         mySheet.SetAutoSumPosition(0);
                  //지원안함[check again] UnitText="원, %, 개";
         newSetActionMenu(mySheet,"엑셀내려받기");
}

/*---------------------------------------------*/
/* @기능 : 2009년도 일반영업점 기준 그리드 set */
/*---------------------------------------------*/        
function setGrid2009()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  

  // 상위 GRID에 대한 속성정보 설정

		let strHeader0 = "";  
		let strHeader1 = "";
		let strHeader2 = "";
		let strHeader3 = "";
		
		strHeader0 = "점번호|점명|"
	     +"수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|"
	     +"고객기반|고객기반|고객기반|고객기반|고객기반|고객기반|고객기반|고객기반|고객기반|고객기반|고객기반|고객기반|고객기반|고객기반|"
	     +"건전성|건전성|건전성|건전성|건전성|건전성|건전성|"
	     +"기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대";
		
		strHeader1 = "점번호|점명|"
	     +"충당금적립전|충당금적립전|충당금적립전|충당금적립전|충당금적립후|충당금적립후|충당금적립후|충당금적립후|NIM_B|NIM_B|NIM_B|종합비이자이익|종합비이자이익|종합비이자이익|종합비이자이익|"
	     +"개인유효고객|개인유효고객|개인유효고객|개인유효고객|기업유효고객|기업유효고객|기업유효고객|기업유효고객|개인핵심고객수|개인핵심고객수|기업핵심고객수|기업핵심고객수|교차판매지수|교차판매지수|"
	     +"대출금 연체관리|대출금 연체관리|신용카드 연체관리|신용카드 연체관리|여신포트폴리오 실적|여신포트폴리오 실적|여신포트폴리오 실적|"
	     +"개인 총예수금|개인 총예수금|개인 총예수금|개인 총예수금|개인 총예수금|개인 총예수금|기업 총예수금|기업 총예수금|기업 총예수금|기업 총예수금|기업 총예수금|기업 총예수금|개인 저원가성|개인 저원가성|기업 저원가성|기업 저원가성|소액대출금|소액대출금|외환취급고|외환취급고|퇴직연금|퇴직연금|특정금전신탁|특정금전신탁|카드매출액|카드매출액";
		
		strHeader2 =  "점번호|점명|"
	     +" | | | | | | | |(현상)|(현상)|(개선도)| | | | |"
	     +"절대평가|절대평가|상대평가|상대평가|절대평가|절대평가|상대평가|상대평가| | | | | | |"
	     +" | | | |(현상)|(현상)|(개선도)|"
	     +"(연간 순증평잔)|(연간 순증평잔)|(반기 순증평잔)|(반기 순증평잔)|(순증잔액)|(순증잔액)|(연간 순증평잔)|(연간 순증평잔)|(반기 순증평잔)|(반기 순증평잔)|(순증잔액)|(순증잔액)| | | | | | | | | | | | | | ";

			
		strHeader3 = "점번호|점명|"
	     +"목표|실적|달성도|순위|목표|실적|달성도|순위|실적|순위|순위|목표|실적|달성도|순위|"
	     +"달성도|순위|달성도|순위|달성도|순위|달성도|순위|개선도|순위|달성도|순위|개선도|순위|"
	     +"실적|순위|실적|순위|실적|순위|순위|"
	     +"달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위";

    i=0;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"},
                 { Text:strHeader3, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
      //지원안함[check again] UnitText="원, %, 개";
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*--------------------------------------*/
/* @기능 : 2009년도 RMC 기준 그리드 set */
/*--------------------------------------*/        
function setGridRMC2009()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  

  // 상위 GRID에 대한 속성정보 설정

		let strHeader0 = "";  
		let strHeader1 = "";
		let strHeader2 = "";
		let strHeader3 = "";
		
		strHeader0 =  "구분|점명|"
	     +"수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|수익성|"
	     +"건전성|건전성|건전성|건전성|건전성|건전성|건전성|건전성|"
     	+"기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대|기반확대";
		
		strHeader1 = "구분|점명|"
	     +"충당금적립전|충당금적립전|충당금적립전|충당금적립전|충당금적립후|충당금적립후|충당금적립후|충당금적립후|NIM_B|NIM_B|NIM_B|"
	     +"대출금 연체관리|대출금 연체관리|여신포트폴리오 실적|여신포트폴리오 실적|여신포트폴리오 실적|위험가중자산 위험률|위험가중자산 위험률|위험가중자산 위험률|"
	     +"총예수금|총예수금|총예수금|총예수금|저원가성|저원가성|중소기업 신규대출|중소기업 신규대출|외환취급고|외환취급고|기업체유치|기업체유치|퇴직연금|퇴직연금";
		
		strHeader2 =  "구분|점명|"
	     +" | | | | | | | |(현상)|(현상)|(개선도)|"
	     +" | |(현상)|(현상)|(개선도)|(현상)|(현상)|(개선도)|"
	     +"(순증평잔)|(순증평잔)|(순증잔액)|(순증잔액)| | | | | | | | | | ";

			
		strHeader3 = "구분|점명|"
	     +"목표|실적|달성도|순위|목표|실적|달성도|순위|실적|순위|순위|"
	     +"실적|순위|실적|순위|순위|실적|순위|순위|"
	     +"달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위|달성도|순위";

   i=0;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

   var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"},
                 { Text:strHeader2, Align:"Center"},
                 { Text:strHeader3, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
      //지원안함[check again] UnitText="원, %, 개";
   newSetActionMenu(mySheet,"엑셀내려받기");
}
