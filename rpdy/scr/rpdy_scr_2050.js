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

function GridSizeByIsPopup() {
	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "350px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
}

/*Sheet 기본 설정 */
function LoadPage(){
	
  GridSizeByIsPopup();      
  createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");   
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

  // 상위 GRID에 대한 속성정보 설정
   hiddGridmon.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

   var hgmInfo    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var hgmHeaders = [ { Text:"점번호|점명|", Align:"Center"} ];
   hiddGridmon.InitHeaders(hgmHeaders, hgmInfo);

   var hgmCols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" } ];
    
   hiddGridmon.InitColumns(hgmCols);
   hiddGridmon.SetEditable(0);
   hiddGridmon.SetVisible(0);

   initGrid();

   doAction("기준일");

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
	allDelDataGrid(mySheet);
	showUnitText("원");

    // 최근 기준년월 가져오기
    basemonth=hiddGridmon.GetCellValue(1, 0);
    v_jumcode   = document.frm.jumcode.value;

    if(v_jumcode != '') hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=1&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
    else{ 
		document.frm.jumname.value = '';
	}
}
function popupJumCode()
{
	allDelDataGrid(mySheet);
	showUnitText("원");

    // 최근 기준년월 가져오기
    basemonth=hiddGridmon.GetCellValue(1, 0);
    win_open2("comm.scr.comm_scr_1010.screen?basemonth="+basemonth+"&searchGubun=2", 250, 450);
}
function selectjum()
{
    // 최근 기준년월 가져오기
    basemonth=hiddGridmon.GetCellValue(1, 0);

    v_jumcode   = document.frm.jumcode.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=6&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
}
function selectmonth(){
    initGrid();

	//allDelDataGrid(mySheet);
	showUnitText("원");
	
    // 최근 기준년월 가져오기
    basemonth=hiddGridmon.GetCellValue(1, 0);

	//자동 trim - off
    hiddenGrid.DataAutoTrim = false; 
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&basemonth="+basemonth+"&v_inqtype=2&jekyocode=8");
	//자동 trim - on
    hiddenGrid.DataAutoTrim = true; 
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
    isSelected  = true;
    baseday     = document.frm.baseday.value;
    v_jumcode   = document.frm.jumcode.value;
    sergb       = document.frm.sergb.value;
    searchCode  = document.frm.searchCode.value;  // 조회사유코드
    
    switch(sAction)
    {
        case "고정필드설정":
        	mySheet.SetFrozenCol(mySheet.MouseCol());
        	ufSetMergeCell(mySheet, mySheet.LastRow(), 0, 1,1);
        	break;
        case "고정필드해제":
        	mySheet.SetFrozenCol(0);
        	ufSetMergeCell(mySheet, mySheet.LastRow(), 0, 1,1);
        	break;
        case "기준일":           // 조회(상위 GRID)
            // 기준년월 정보 (최근 기준년월)
            hiddGridmon.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&superFlg=Y");
//            // 기준일자 정보
//            if(isRoleEnable == '1') {
//            	 // 전산정보부 및 성과 담당자
//               hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2050.do?hidden_key=9&baseday="+baseday+"&v_jumcode="+v_jumcode+"&sergb=98");
//            } else {
//               hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2050.do?hidden_key=9&baseday="+baseday+"&v_jumcode="+v_jumcode+"&sergb=99");
//            }
            break;
        case "조회":             // 조회(상위 GRID)
            if(baseday >= '20130101') {
              if(isRoleEnable != '1') { 
              	//alert('2013년도 상반기 일일성과 자료는 차후 오픈 예정입니다.');
              	//break;
              }	
            } 
            if(v_jumcode==""){
                alert("점번호를 입력하지 않았습니다.");
                document.frm.jumcode.focus();
                return;
            }
            if(searchCode == '00'){
              alert("조회사유코드는 필수입니다.");
              return;
            }           
            mySheet.DoSearch("rpdy.scr.rpdy_scr_2050.do?hidden_key=9&baseday="+baseday+"&v_jumcode="+v_jumcode+"&sergb="+sergb+"&searchCode="+searchCode+"&pg_url="+pg_url);
            //mySheet.FitSize(false, true);
            break;
        case "엑셀내려받기":    // 엑셀내려받기
            inqText=new Array();
            inqText[0]=new Array();
            inqText[0][0]="기준일";
            inqText[0][1]=baseday;
            inqText[1]=new Array();
            inqText[1][0]="점명";
            inqText[1][1]=document.frm.jumname.value;
            inqText[2]=new Array();
            inqText[2][0]="조회구분";
            inqText[2][1]=document.frm.sergb.options[document.frm.sergb.selectedIndex].text;
            inqText[3]=new Array();
            inqText[3][0]="조회사유코드";
            inqText[3][1]=document.frm.searchCode.options[document.frm.searchCode.selectedIndex].text;            
            // 보안등급세팅
            seqLevel=document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[4]=new Array();
                inqText[4][0]="보안등급";
                inqText[4][1]=document.frm.Security_Level.value;
            }
            //doExcelPW(mySheet, inqText, true); //common.js 활용하여 excel 출력
            rExcVal=doExcelPW(mySheet, inqText, true); //common.js 활용하여 excel 출력
            /*// 엑셀다운로드시 로그 저장
            if(rExcVal) {
               condition="기준일="+baseday+";점번호="+v_jumcode+";조회구분="+sergb;
               hiddenGrid.DoSearch("comm.scr.comm_scr_9096.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=1"+"&searchCode="+searchCode+"&pg_url="+pg_url);
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

    if (baseday <= '20120630') setGrid2012Q2();
    else if (baseday <= '20121231') setGrid2012Q4();
    else setGrid2012Q2();

}

/*---------------------------------------*/
/* @기능 : 2012년도 상반기 이전 기준 그리드 set */
/*---------------------------------------*/        
function setGrid2012Q2()
{
  //mySheet.RemoveAll();
  mySheet.Reset();
  GridSizeByIsPopup();

  // 상위 GRID에 대한 속성정보 설정
   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:"계좌번호|계정과목코드|계정명|고객명|고객번호|고객구분|대출잔액|연체금액|연체구분|상품구분|연체시작일", Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:120,  Align:"Left",   ColMerge:1,   SaveName:"col1" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Left",   ColMerge:1,   SaveName:"col2" },
             {Type:"Text",     Hidden:0,  MinWidth:150,  Align:"Left",    ColMerge:1,   SaveName:"col3" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",    ColMerge:1,   SaveName:"col4" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"col5" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"col8" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",       CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",       CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"col9" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"col10" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"col11" } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(1);
   mySheet.SetHeaderRowHeight(35);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="원";
   showUnitText("원");
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*-----------------------------------------*/
/* @기능 : 2012년도 하반기 기준 그리드 set */
/*-----------------------------------------*/        
function setGrid2012Q4()
{
  //mySheet.RemoveAll();
  mySheet.Reset();
  GridSizeByIsPopup();

  // 상위 GRID에 대한 속성정보 설정
   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:"계좌번호|계정과목코드|계정명|고객명|고객번호|고객구분|대출잔액|연체금액|연체구분|상품구분|연체시작일|기간구분", Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:120,  Align:"Left",   ColMerge:1,   SaveName:"col1" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Left",   ColMerge:1,   SaveName:"col2" },
             {Type:"Text",     Hidden:0,  MinWidth:150,  Align:"Left",    ColMerge:1,   SaveName:"col3" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",    ColMerge:1,   SaveName:"col4" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"col5" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"col8" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",       CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",       CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"col9" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"col10" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"col11" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"col12" } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(1);
   mySheet.SetHeaderRowHeight(35);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="원";
   showUnitText("원");
   newSetActionMenu(mySheet,"엑셀내려받기");
}
