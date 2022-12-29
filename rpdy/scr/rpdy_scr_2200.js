var isInitBtnEnable = true;
var isInstBtnEnable = true;
var isMofyBtnEnable = false;
var isDelBrnEnable  = false;
var isExcelBtnEnable= true;

/*Sheet 기본 설정 */
function LoadPage(){

  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));      // 정보출력
  createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");   // 기본정보 (기준일, 명칭등)
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

  doAction("기준일");

  initGrid();
}

function selectmonth(){
    
	initGrid();

	//allDelDataGrid(mySheet);
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

/* Sheet 각종 처리 */
function doAction(sAction)
{
    isSelected  = true;
    baseday     = document.frm.baseday.value;
    emnm        = document.frm.emnm.value;
    searchCode  = document.frm.searchCode.value;        // 조회사유코드

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
        case "기준일":           // 조회(상위 GRID)
            // 기준년월 정보 (최근 기준년월)
            hiddGridmon.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&superFlg=Y");
            /*// 기준일자 정보
            if(isRoleEnable == '1') {
            	 // 후선보임관리자
               hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2200.do?hidden_key=9&baseday="+baseday+"&emnm="+emnm+"&sergb=98");
            } else {
               hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2200.do?hidden_key=9&baseday="+baseday+"&emnm="+emnm+"&sergb=99");
            }*/
            break;
        case "조회":             // 조회(상위 GRID)
            if(emnm==""){
                alert("직원번호를 입력하지 않았습니다.");
                document.frm.emnm.focus();
                return;
            }
            if(searchCode == '00')
            {
              alert("조회사유코드는 필수입니다.");
              return;
            }
            mySheet.DoSearch("rpdy.scr.rpdy_scr_2200.do?hidden_key=9&baseday="+baseday+"&emnm="+emnm+"&searchCode="+searchCode+"&pg_url="+pg_url);
            //mySheet.FitSize(false, true);
            break;
        case "엑셀내려받기":    // 엑셀내려받기
            inqText=new Array();
            inqText[0]=new Array();
            inqText[0][0]="기준일";
            inqText[0][1]=baseday;
            inqText[1]=new Array();
            inqText[1][0]="직원번호";
            inqText[1][1]=document.frm.emnm.value;
            inqText[2]=new Array();
            inqText[2][0]="조회사유코드";
            inqText[2][1]=document.frm.searchCode.options[document.frm.searchCode.selectedIndex].text;            
            // 보안등급세팅
            seqLevel=document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[3]=new Array();
                inqText[3][0]="보안등급";
                inqText[3][1]=document.frm.Security_Level.value;
            }
            //doExcelPW(mySheet, inqText, true); //common.js 활용하여 excel 출력
            rExcVal=doExcelPW(mySheet, inqText, true); //common.js 활용하여 excel 출력
            /*// 엑셀다운로드시 로그 저장
            if(rExcVal) {
               condition="기준일="+baseday+";후선보임직원번호="+emnm+";";
               hiddenGrid.DoSearch("comm.scr.comm_scr_9096.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"
                                   +"&cust_no=0"+"&searchCode="+searchCode+"&pg_url="+pg_url);
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

    setGrid2013();
}

/*----------------------------------*/
/* @기능 : 2013년도 기준 그리드 set */
/*----------------------------------*/        
function setGrid2013()
{
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정
   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:"직급|성명|취급점번호|취급점명|신규일|계좌번호|계정과목코드|계정과목명|고객번호|고객명|잔액", Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:120,  Align:"Center",  ColMerge:1,   SaveName:"col1" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"col2" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"col3" },
             {Type:"Text",     Hidden:0,  MinWidth:120,  Align:"Center",  ColMerge:1,   SaveName:"col4" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"col5" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Left",    ColMerge:1,   SaveName:"col6" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"col7" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Left",    ColMerge:1,   SaveName:"col8" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"col9" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Left",    ColMerge:1,   SaveName:"col10" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"col11",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(1);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText= "원";  
   showUnitText("원");
   newSetActionMenu(mySheet,"엑셀내려받기");
}
