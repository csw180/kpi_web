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
	createIBSheet2(  document.getElementById("hiddGridmonObj"),"hiddGridmon", "200px", "400px"); 

  // Hidden GRID에 대한 속성정보 설정
	hiddenGrid.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );
	
	var hdnInfo    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
	var hdnHeaders = [ { Text:"HIDDEN", Align:"Center"} ];
	hiddenGrid.InitHeaders(hdnHeaders, hdnInfo);
	
	var hdnCols = [ {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
	                      
   hiddenGrid.InitColumns(hdnCols);
   hiddenGrid.SetVisible(0);
   hiddenGrid.SetEditable(0);

  // 상위 GRID에 대한 속성정보 설정
	hiddGridmon.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );
	
	var hgmInfo    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
	var hgmHeaders = [ { Text:"점번호|점명|", Align:"Center"} ];
	hiddGridmon.InitHeaders(hgmHeaders, hgmInfo);
	
	var cols = [ {Type:"Text",     Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	    {Type:"Text",     Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" } ];
	 
	hiddGridmon.InitColumns(cols);
	hiddGridmon.SetEditable(0);
	hiddGridmon.SetVisible(0);

  doAction("기준년월");

  if(isRoleEnable != '1') {
    doAction("조회");
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

function selectjumname()
{
    allDelDataGrid(mySheet);
    showUnitText("원, %");

    // 최근 기준년월 가져오기
    //basemonth   = hiddGridmon.GetCellValue(1, 0);
	basemonth   = document.frm.basemonth.value;
    v_jumcode   = document.frm.jumcode.value;

    if(v_jumcode != '') hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=1&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
    else{ 
		document.frm.jumname.value = '';
	}
}

function selectmonth()
{
    initGrid();  // 화면 그리드 초기화

	allDelDataGrid(mySheet);
	showUnitText("원, %");
}

/* Sheet 각종 처리 */
function doAction(sAction)
{
    basemonth   = document.frm.basemonth.value;
    jumcode     = document.frm.jumcode.value;
    searchCode  = document.frm.searchCode.value;  // 조회사유코드
        
    switch(sAction)
    {
        case "기준년월":             // 조회(상위 GRID)
            //hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3"); 
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&stmonth=202006" );   
            break;

        case "조회":                 // 조회(상위 GRID)
            if(jumcode == '') {
               alert("점번호를 입력하세요");
               document.frm.jumcode.focus();
               return;
            }

            if(searchCode == '00'){
               alert("조회사유코드는 필수입니다.");
               return;
            }
            
            mySheet.DoSearch("rpop.scr.rpop_scr_3230.do?hidden_key=9&basemonth="+basemonth+"&sergb=1&v_jumcode="+jumcode+"&searchCode="+searchCode+"&pg_url="+pg_url); 
            //mySheet.FitSize(false, true);
            break;
            
        case "엑셀내려받기":    // 엑셀내려받기
            inqText       = new Array();
            inqText[0]    = new Array();
            inqText[0][0] = "기준년월";
            inqText[0][1] = basemonth;
            inqText[1]    = new Array();
            inqText[1][0] = "점명";
            inqText[1][1] = document.frm.jumname.value;
            inqText[2]    = new Array();
            inqText[2][0] = "조회사유코드";
            inqText[2][1] = document.frm.searchCode.options[document.frm.searchCode.selectedIndex].text;
            // 보안등급세팅
            seqLevel = document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[3]    = new Array();
                inqText[3][0] = "보안등급";
                inqText[3][1] = document.frm.Security_Level.value;
            }
            
            rExcVal = doExcelPW(mySheet, inqText, true); //common.js 활용하여 excel 출력

            /*// 엑셀다운로드시 로그 저장
            if(rExcVal) {
               condition = "기준년월="+basemonth+";점번호="+jumcode;
               hiddenGrid.DoSearch("comm.scr.comm_scr_9096.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=1"+"&searchCode="+searchCode+"&pg_url="+pg_url);
            }*/
            break;            

    }
}

/*--------------------------------------------*/
/* @기능 : 선택된 기준월에 따른 그리드 init */
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
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
   	}

	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
		
  // 상위 GRID에 대한 속성정보 설정
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"고객번호|고객명|고객구분|최종실적|", Align:"Center"},
                 { Text:"고객번호|고객명|고객구분|최종실적|", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetHeaderRowHeight(26);
   	mySheet.SetCountPosition(1); 
   	showUnitText("원, %");
   	newSetActionMenu(mySheet,"엑셀내려받기");
}
