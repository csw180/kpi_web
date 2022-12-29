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
  initGrid();

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

function selectmonth()
{
    initGrid();  // 연체율 화면 그리드 초기화

    //allDelDataGrid(mySheet);

    // 최근 기준년월 가져오기
    basemonth=hiddGridmon.GetCellValue(1, 0);
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=7");

    setFundgb();
}

/*---------------------------------------------*/
/* @기능 : 상품분류선택시 그리드 화면 컨드롤   */
/*---------------------------------------------*/        
function setFundgb()
{
    baseday = document.frm.baseday.value;
    fundgb  = document.frm.fundgb.value;

    mySheet.RemoveAll();

	let strHeader0 = "";
	let strHeader1 = "";
    
    if(baseday >= '20190101') {				// 사용 안함
        
    } else if(baseday >= '20170701') {
       if(fundgb == '12') {
          //순수 저원가성
          mySheet.SetColHidden(18,0);
          mySheet.SetColHidden(19,1);
          mySheet.SetColHidden(20,1);

          strHeader0 =
             "점번호|점명|PG명|총금액\n(A)|"                                                                    // 4 
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|" // 10
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 2.0|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          strHeader1 =
             "점번호|점명|PG명|총금액\n(A)|"                                                                   //4
            +"소계|금융기관성|거액조달처|본부조달|본부마케팅|임직원가족|단기신규해지|독도교차인정금액|마케팅제외|기타조정|체신관서|" // 10
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 2.0|순증목표\n(G)|달성률\n(H)=(F)/(G)";

       } else if(fundgb == '11') {
          //기업 MMDA
          mySheet.SetColHidden(18,1);
          mySheet.SetColHidden(19,1);
          mySheet.SetColHidden(20,1);

          strHeader0 = 
             "점번호|점명|PG명|총금액\n(A)|"                                                                    // 4 
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|" // 10
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          strHeader1 = 
             "점번호|점명|PG명|총금액\n(A)|"                                                                   //4
            +"소계|금융기관성|거액조달처|본부조달|본부마케팅|임직원가족|단기신규해지|독도교차인정금액|마케팅제외|기타조정|체신관서|" // 10
           +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       } else {
          //전체
          mySheet.SetColHidden(18,0);
          mySheet.SetColHidden(19,0);
          mySheet.SetColHidden(20,0);

          strHeader0 = 
            "점번호|점명|PG명|총금액(A)|"
           +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|" 
           +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          strHeader1 = 
            "점번호|점명|PG명|총금액(A)|"
           +"소계|금융기관성|거액조달처|본부조달|본부마케팅|임직원가족|단기신규해지|독도교차인정금액|마케팅제외|기타조정|체신관서|"
           +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       }
    } else if(baseday >= '20160101') {
       if(fundgb == '12') {
          //순수 저원가성
          mySheet.SetColHidden(17,0);
          mySheet.SetColHidden(18,1);
          mySheet.SetColHidden(19,1);

          strHeader0 = 
             "점번호|점명|PG명|총금액\n(A)|"                                                                    // 4 
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|" // 9
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 2.0|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          strHeader1 = 
             "점번호|점명|PG명|총금액\n(A)|"                                                                   //4
            +"소계|금융기관성|거액조달처|본부조달|본부마케팅|임직원가족|단기신규해지|독도교차인정금액|마케팅제외|기타조정|" // 9
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 2.0|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       } else if(fundgb == '11') {
          //기업 MMDA
          mySheet.SetColHidden(17,1);
          mySheet.SetColHidden(18,1);
          mySheet.SetColHidden(19,1);

          strHeader0 = 
             "점번호|점명|PG명|총금액\n(A)|"                                                                    // 4 
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|" // 9
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          strHeader1 = 
             "점번호|점명|PG명|총금액\n(A)|"                                                                   //4
            +"소계|금융기관성|거액조달처|본부조달|본부마케팅|임직원가족|단기신규해지|독도교차인정금액|마케팅제외|기타조정|" // 9
           +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       } else {
          //전체
          mySheet.SetColHidden(17,0);
          mySheet.SetColHidden(18,0);
          mySheet.SetColHidden(19,0);

          strHeader0 = 
            "점번호|점명|PG명|총금액(A)|"
           +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|" 
           +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          strHeader1 = 
            "점번호|점명|PG명|총금액(A)|"
           +"소계|금융기관성|거액조달처|본부조달|본부마케팅|임직원가족|단기신규해지|독도교차인정금액|마케팅제외|기타조정|"
           +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       }
    } else if(baseday >= '20150701') {
       if(fundgb == '12') {
          //순수 저원가성
          mySheet.SetColHidden(16,0);
          mySheet.SetColHidden(17,1);
          mySheet.SetColHidden(18,1);

          strHeader0 = 
             "점번호|점명|PG명|총금액\n(A)|"                                                                    // 4 
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|" // 9
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 2.0|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          strHeader1 = 
             "점번호|점명|PG명|총금액\n(A)|"                                                                   //4
            +"소계|금융기관성|거액조달처|본부조달|본부마케팅|임직원가족|단기신규해지|독도교차인정금액|마케팅제외|" // 9
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 2.0|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       } else if(fundgb == '11') {
          //기업 MMDA
          mySheet.SetColHidden(16,1);
          mySheet.SetColHidden(17,1);
          mySheet.SetColHidden(18,1);

          strHeader0 = 
             "점번호|점명|PG명|총금액\n(A)|"                                                                    // 4 
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|" // 9
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          strHeader1 = 
             "점번호|점명|PG명|총금액\n(A)|"                                                                   //4
            +"소계|금융기관성|거액조달처|본부조달|본부마케팅|임직원가족|단기신규해지|독도교차인정금액|마케팅제외|" // 9
           +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       } else {
          //전체
          mySheet.SetColHidden(16,0);
          mySheet.SetColHidden(17,0);
          mySheet.SetColHidden(18,0);

          strHeader0 = 
            "점번호|점명|PG명|총금액(A)|"
           +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|" 
           +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          strHeader1 = 
            "점번호|점명|PG명|총금액(A)|"
           +"소계|금융기관성|거액조달처|본부조달|본부마케팅|임직원가족|단기신규해지|독도교차인정금액|마케팅제외|"
           +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       }
    } else if(baseday >= '20150101') {
       if(fundgb == '12') {
          //순수 저원가성
          mySheet.SetColHidden(16,0);
          mySheet.SetColHidden(17,1);
          mySheet.SetColHidden(18,1);

          strHeader0 = 
             "점번호|점명|PG명|총금액\n(A)|"                                                                    // 4 
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|" // 9
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1.5|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          strHeader1 = 
             "점번호|점명|PG명|총금액\n(A)|"                                                                   //4
            +"소계|금융기관성|거액조달처|본부조달|본부마케팅|임직원가족|단기신규해지|독도교차인정금액|마케팅제외|" // 9
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1.5|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       } else if(fundgb == '11') {
          //기업 MMDA
          mySheet.SetColHidden(16,1);
          mySheet.SetColHidden(17,1);
          mySheet.SetColHidden(18,1);

          strHeader0 = 
             "점번호|점명|PG명|총금액\n(A)|"                                                                    // 4 
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|" // 9
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          strHeader1 = 
             "점번호|점명|PG명|총금액\n(A)|"                                                                   //4
            +"소계|금융기관성|거액조달처|본부조달|본부마케팅|임직원가족|단기신규해지|독도교차인정금액|마케팅제외|" // 9
           +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       } else {
          //전체
          mySheet.SetColHidden(16,0);
          mySheet.SetColHidden(17,0);
          mySheet.SetColHidden(18,0);

          strHeader0 = 
            "점번호|점명|PG명|총금액(A)|"
           +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|" 
           +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          strHeader1 = 
            "점번호|점명|PG명|총금액(A)|"
           +"소계|금융기관성|거액조달처|본부조달|본부마케팅|임직원가족|단기신규해지|독도교차인정금액|마케팅제외|"
           +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       }
    } else {
       if(fundgb == '12') {
          //순수 저원가성
          mySheet.SetColHidden(17,1);
          mySheet.SetColHidden(18,1);

          strHeader0 = 
             "점번호|점명|PG명|총금액\n(A)|"                                                                    // 4 
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|" // 9
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1.3|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          strHeader1 = 
             "점번호|점명|PG명|총금액\n(A)|"                                                                   //4
            +"소계|금융기관성|거액조달처|본부조달|본부마케팅|임직원가족|단기신규해지|독도교차인정금액|마케팅제외|" // 9
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1.3|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       } else if(fundgb == '11') {
          //기업 MMDA
          mySheet.SetColHidden(17,1);
          mySheet.SetColHidden(18,1);

          strHeader0 = 
             "점번호|점명|PG명|총금액\n(A)|"                                                                    // 4 
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|" // 9
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 0.8|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          strHeader1 = 
             "점번호|점명|PG명|총금액\n(A)|"                                                                   //4
            +"소계|금융기관성|거액조달처|본부조달|본부마케팅|임직원가족|단기신규해지|독도교차인정금액|마케팅제외|" // 9
           +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 0.8|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       } else {
          //전체
          mySheet.SetColHidden(17,0);
          mySheet.SetColHidden(18,0);

          strHeader0 = 
            "점번호|점명|PG명|총금액(A)|"
           +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|" 
           +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          strHeader1 = 
            "점번호|점명|PG명|총금액(A)|"
           +"소계|금융기관성|거액조달처|본부조달|본부마케팅|임직원가족|단기신규해지|독도교차인정금액|마케팅제외|"
           +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       }
    }	 
}

/* Sheet 각종 처리 */
function doAction(sAction)
{
    isSelected  = true;
    baseday     = document.frm.baseday.value;
    sergb       = document.frm.sergb.value;
    fundgb      = document.frm.fundgb.value;

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
               hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2120.do?hidden_key=9&baseday="+baseday+"&sergb=98");
            } else {
               hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2120.do?hidden_key=9&baseday="+baseday+"&sergb=99");
            }*/
            break;
        case "조회":             // 조회(상위 GRID)
            if(baseday >= '20120701') {
              if(isRoleEnable != '1') { 
              	//alert('2012년도 하반기 일일성과 자료는 차후 오픈 예정입니다.');
              	//break;
              }	
            } 
            mySheet.DoSearch("rpdy.scr.rpdy_scr_2120.do?hidden_key=9&baseday="+baseday+"&sergb="+sergb+"&fundgb="+fundgb);
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
            inqText[2]=new Array();
            inqText[2][0]="예금구분";
            inqText[2][1]=document.frm.fundgb.options[document.frm.fundgb.selectedIndex].text;
            // 보안등급세팅
            seqLevel=document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[3]=new Array();
                inqText[3][0]="보안등급";
                inqText[3][1]=document.frm.Security_Level.value;
            }
            rExcVal=doExcel(mySheet, inqText, -1); //common.js 활용하여 excel 출력
            /*// 엑셀다운로드시 로그 저장
            if(rExcVal) {
               condition="기준일="+baseday+";조회구분="+sergb+";예금구분="+fundgb;
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

	if (baseday >= '20220101') setGrid2022();
    else if (baseday >= '20210701') setGrid2021H();
    else if (baseday >= '20200101') setGrid2020();
    else if (baseday >= '20190101') setGrid2019();
    else if (baseday >= '20170701') setGrid2017Q3();
    else if (baseday >= '20160101') setGrid2016();
    else setGrid2014Q3();
}

/*--------------------------------------------*/
/* 2022년 상반기 그리드 셋팅                  */
/*--------------------------------------------*/ 
function setGrid2022()
{
  	baseday = document.frm.baseday.value;
  	mySheet.Reset();
  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  	// 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

    strHeader0 = "점번호|RM(본부)|RM(본부)|PG명|총금액(A)|" // 5
      +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"  // 10
      +"누증실적\n(C)=(A+B)|외화예수금\n순증실적(D)|최종 누증실적\n(E)=(C+D)|조정전\n기준실적(F)|조정후\n기준실적(G)|순증실적\n(H)=(E-G)|목표\n(I)|달성률\n(J)=(H)/(I)";// 8

    strHeader1 = "점번호|직원번호|성명|PG명|총금액(A)|" // 5
      +"소계|금융기관성|본부조달|임직원|단기신규해지|본부마케팅|마케팅제외|독도상품실적|평가제외|기타조정|" // 10
      +"누증실적\n(C)=(A+B)|외화예수금\n순증실적(D)|최종 누증실적\n(E)=(C+D)|조정전\n기준실적(F)|조정후\n기준실적(G)|순증실적\n(H)=(E-G)|목표\n(I)|달성률\n(J)=(H)/(I)";

	mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:5 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

    //데이터속성[ROW,COL,       DATATYPE,    WIDTH,  DATAALIGN,  COLMERGE,    SAVENAME,              KEYFIELD,      CALCULOGIC,     DATAFORMAT,POINTCOUNT,UPDATEEDIT,INSERTEDIT,EDITLEN,FULLINPUT,SORTENABLE,TOOLTIP,ALLCHECK, SAVESTATUS, FORMATFIX]    
    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];

    mySheet.InitColumns(cols);

  	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetCountPosition(1); 
   	showUnitText("원");
   	newSetActionMenu(mySheet,"엑셀내려받기");
}

/*--------------------------------------------*/
/* 2021년 하반기 그리드 셋팅                  */
/*--------------------------------------------*/ 
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
       "점번호|RM(본부)|RM(본부)|PG명|총금액(A)|" // 5
      +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"  // 10
      +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I)/(J)" // 9
      ;    
		
	strHeader1 = 
       "점번호|직원번호|성명|PG명|총금액(A)|" // 5
      +"소계|금융기관성|본부조달|임직원|단기신규해지|본부마케팅|마케팅제외|독도상품실적|평가제외|기타조정|" // 10
      +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I)/(J)"// 9
      ;
	
   mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|18|-|20|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|21|/|22|*100",Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] //UnitText= "원";  
   showUnitText("원");
   newSetActionMenu(mySheet,"엑셀내려받기");
}



function setGrid2020()
{
  baseday = document.frm.baseday.value;
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	
	if( baseday < '20200701' ) {
        strHeader0 =
           "점번호|RM(본부)|RM(본부)|PG명|총금액(A)|" // 5
          +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"  // 10
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I)/(J)" // 9
          ;
        strHeader1 = 
           "점번호|직원번호|성명|PG명|총금액(A)|" // 5
          +"소계|금융기관성|본부조달|임직원가족|단기신규해지|본부마케팅|마케팅제외|독도상품실적|평가제외|기타조정|" // 10
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I)/(J)"// 9
          ;
    } else {
        strHeader0 = 
           "점번호|RM(본부)|RM(본부)|PG명|총금액(A)|" // 5
          +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"  // 10
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I)/(J)" // 9
          ;
        strHeader1 = 
           "점번호|직원번호|성명|PG명|총금액(A)|" // 5
          +"소계|금융기관성|본부조달|임직원가족|단기신규해지|본부마케팅|마케팅제외|독도상품실적|평가제외|기타조정|" // 10
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I)/(J)"// 9
          ;
    }
	
   mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|18|-|20|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|21|/|22|*100",Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] //UnitText= "원";  
   showUnitText("원");
   newSetActionMenu(mySheet,"엑셀내려받기");
}


function setGrid2019()
{
  baseday = document.frm.baseday.value;
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	
	if( baseday >= '20190701' ) {
        strHeader0 = 
           "점번호|RM(본부)|RM(본부)|PG명|총금액|총금액(A)\n(월중평잔적용)|"
          +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"  // 10
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|MMDA\n실적인정(E)|최종 누증실적\n(F)=(C+D+E)|조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F)-(H)|목표\n(J)|달성률\n(K)=(I)/(J)"
			;
        strHeader1 =
           "점번호|직원번호|성명|PG명|총금액|총금액(A)\n(월중평잔적용)|"
          +"소계|금융기관성|본부조달|임직원가족|단기신규해지|본부마케팅|마케팅제외|독도상품실적|평가제외|기타조정|"
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|MMDA\n실적인정(E)|최종 누증실적\n(F)=(C+D+E)|조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F)-(H)|목표\n(J)|달성률\n(K)=(I)/(J)"
			;
    } else {
        strHeader0 = 
           "점번호|RM(센터)|RM(센터)|PG명|총금액|총금액(A)\n(월중평잔적용)|"
          +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"  // 10
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|MMDA\n실적인정(E)|최종 누증실적\n(F)=(C+D+E)|조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F)-(H)|목표\n(J)|달성률\n(K)=(I)/(J)"
			;
        strHeader1 =
           "점번호|직원번호|성명|PG명|총금액|총금액(A)\n(월중평잔적용)|"
          +"소계|금융기관성|본부조달|임직원가족|단기신규해지|본부마케팅|마케팅제외|독도상품실적|평가제외|기타조정|"
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|MMDA\n실적인정(E)|최종 누증실적\n(F)=(C+D+E)|조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F)-(H)|목표\n(J)|달성률\n(K)=(I)/(J)"
			;
    }
	
   mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:6 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|19|-|21|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|22|/|23|*100",Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText= "원";  
   showUnitText("원");
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*------------------------------------------*/
/* @기능 : 2017년도 하반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2017Q3()
{
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

	strHeader0 =  
       "점번호|점명|PG명|총금액(A)|"
      +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|" 
      +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";    
		
	strHeader1 =  
       "점번호|점명|PG명|총금액(A)|"
      +"소계|금융기관성|거액조달처|본부조달|본부마케팅|임직원가족|단기신규해지|독도교차인정금액|마케팅제외|기타조정|체신관서|"
      +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";

   mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:4 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|15|-|16|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|18|/|19|*100",Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] //UnitText= "원";  
   showUnitText("원");
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*--------------------------------------*/
/* @기능 : 2016년도 기준 그리드 set     */
/*--------------------------------------*/        
function setGrid2016()
{
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

	strHeader0 =  
       "점번호|점명|PG명|총금액(A)|"
      +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|" 
      +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";    
		
	strHeader1 = 
       "점번호|점명|PG명|총금액(A)|"
      +"소계|금융기관성|거액조달처|본부조달|본부마케팅|임직원가족|단기신규해지|독도교차인정금액|마케팅제외|기타조정|"
      +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
	
   mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:4 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
               { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
          {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|14|-|15|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"Float",     Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|17|/|18|*100",Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] //UnitText= "원";  
   showUnitText("원");
   newSetActionMenu(mySheet,"엑셀내려받기");
}

/*---------------------------------------------*/
/* @기능 : 2014년도 하반기 기준 그리드 set     */
/*---------------------------------------------*/        
function setGrid2014Q3()
{
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정
	
	let strHeader0 = "";
	let strHeader1 = "";

	strHeader0 = 
       "점번호|점명|PG명|총금액(A)|"
      +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|" 
      +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";    
		
	strHeader1 = 
       "점번호|점명|PG명|총금액(A)|"
      +"소계|금융기관성|거액조달처|본부조달|본부마케팅|임직원가족|단기신규해지|독도교차인정금액|마케팅제외|"
      +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";

   mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:4 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|+|12|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
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
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|13|-|14|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|16|/|17|*100",Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText= "원";  
   showUnitText("원");
   newSetActionMenu(mySheet,"엑셀내려받기");
}
