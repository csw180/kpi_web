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

function selectmonth()
{
    initGrid(); // 화면 그리드 초기화
    setGubun();
    
	// 기준일 기준으로 조회구분 disabled 처리
	document.frm.sergb.disabled = true;
    document.frm.sergb.value = 1;  // 잔액 기본 설정

    //allDelDataGrid(mySheet);

    // 최근 기준년월 가져오기
    //basemonth = hiddGridmon.CellValue(1, 0);
    //hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=7");

}

function setGubun(){

   baseday   = document.frm.baseday.value;
     
   var sergbArr = new Array();
   
   sergbArr[0] = new Array('1', '잔액');
   
   setCombo(sergbArr);
}

function setCombo(sergbArr){
   el = document.frm.sergb;
   while(el.options.length > 0){el.options.remove(0);}
   
   for(i=0;i<parseInt(sergbArr.length);i++){   
     var oOption = document.createElement("OPTION");
     oOption.value = sergbArr[i][0];
     oOption.text  = sergbArr[i][1];       
     el.options.add(oOption);
   }
}

/* Sheet 각종 처리 */
function doAction(sAction)
{
    isSelected  = true;
    baseday     = document.frm.baseday.value;
    sergb       = document.frm.sergb.value;

    // 내용상 사업부소속코드는 제거했으나 JAVA에서는 입력받음 차후 사업부별 평가시 JAVA는 수정할 필요 없음

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
               hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2400.do?hidden_key=9&baseday="+baseday+"&sergb=98");
            } else {
               hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2400.do?hidden_key=9&baseday="+baseday+"&sergb=99");
            }*/
            break;
        case "조회":             // 조회(상위 GRID)
            // if(baseday >= '20160101' && sergb == 12) {
            //   if(isRoleEnable != '1') {
            //   alert(' 신규잔액 평가는 개발중으로 \n 빠른시간내에 오픈할 예정이니 \n 잠시만 기다려주세요.');
            //   break;
            //   }
            // } 
            mySheet.DoSearch("rpdy.scr.rpdy_scr_2400.do?hidden_key=9&baseday="+baseday+"&sergb=2");
            //mySheet.FitSize(false, true);
            break;
        case "엑셀내려받기":    // 엑셀내려받기
            inqText=new Array();
            inqText[0]=new Array();
            inqText[0][0]="기준일";
            inqText[0][1]=baseday;            
            inqText[1]=new Array();
            inqText[1][0]="조회구분";
            inqText[1][1]=document.frm.sergb.options[document.frm.sergb.selectedIndex].text;
            // 보안등급세팅
            seqLevel=document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[2]=new Array();
                inqText[2][0]="보안등급";
                inqText[2][1]=document.frm.Security_Level.value;
            }
            rExcVal=doExcel(mySheet, inqText, -1); //common.js 활용하여 excel 출력
            /*// 엑셀다운로드시 로그 저장
            if(rExcVal) {
               condition="기준일="+baseday+";조회구분="+sergb;
               hiddenGrid.DoSearch("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition);
            }*/
            break;      
    }

}

/*---------------------*/
/* @기능 : 그리드 init */
/*---------------------*/        
function initGrid()
{
    baseday = document.frm.baseday.value;

    if      (baseday >= '20211007') setGrid2021H();
}


/*------------------------------------*/
/* @기능 : 21년 하반기기준 그리드 set */
/*------------------------------------*/
function setGrid2021H()
{
  baseday = document.frm.baseday.value;

  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

	strHeader0 =  
       "점번호|RM(본부)|RM(본부)|PG명|" // 4   
      +"대출금\n순증실적\n(A)|경영현안\n순증실적\n(B)|경영현안차감\n순증실적\n(C)=(A-B)|"   //3
      +"경영현안반영\n밴드범위이탈금액\n(D)=(C-F)|경영현안미반영\n밴드범위이탈금액\n(E)=(A-F)|밴드범위\n(F)|최종밴드범위\n이탈금액\n(G)=MIN(D,E)" //4
      ;    
		
	strHeader1 =  
       "점번호|직원번호|성명|PG명|"     // 4    
      +"대출금\n순증실적\n(A)|경영현안\n순증실적\n(B)|경영현안차감\n순증실적\n(C)=(A-B)|"   //3
      +"경영현안반영\n밴드범위이탈금액\n(D)=(C-F)|경영현안미반영\n밴드범위이탈금액\n(E)=(A-F)|밴드범위\n(F)|최종밴드범위\n이탈금액\n(G)=MIN(D,E)" //4
      ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="원";  
   showUnitText("원");
      
   newSetActionMenu(mySheet,"엑셀내려받기");
}
