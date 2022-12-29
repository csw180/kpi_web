var isInitBtnEnable = true;
var isInstBtnEnable = true;
var isMofyBtnEnable = false;
var isDelBrnEnable  = false;
var isExcelBtnEnable= true;

function GridSizeByIsPopup() {
	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "320px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
}

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

  GridSizeByIsPopup();
  createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");

  // Hidden GRID에 대한 속성정보 설정
  hiddenGrid.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

  var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
  var headers = [ { Text:"HIDDEN|test", Align:"Center"} ];
  hiddenGrid.InitHeaders(headers, info);

  var cols = [ {Type:"Text",      Hidden:1, MinWidth:0,    Align:"left",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
         {Type:"Text",      Hidden:1, MinWidth:0,    Align:"left",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
   
  hiddenGrid.InitColumns(cols);

  hiddenGrid.SetVisible(0);
  hiddenGrid.SetEditable(0);
  hiddenGrid.SetDataAutoTrim(0);

  //console.log(hiddenGrid.GetDataAutoTrim())
  
  doAction("기준년월");

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

function selectjumname()
{
    basemonth   = document.frm.basemonth.value;
    v_jumcode   = document.frm.jumcode.value;
    if(v_jumcode != '') hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=1&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
    else{ 
		document.frm.jumname.value = '';
		document.frm.pgcode.value = '';
		document.frm.pgname.value = '';
	}
}

function popupJumCode()
{
    basemonth = document.frm.basemonth.value;
    win_open2("comm.scr.comm_scr_1010.screen?basemonth="+basemonth+"&searchGubun=2", 250, 450);
}

function selectjum()
{
    basemonth   = document.frm.basemonth.value;
    v_jumcode   = document.frm.jumcode.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=6&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
}

function selectmonth(){
	
    basemonth    = document.frm.basemonth.value;		
    if (basemonth < '200901') {
       document.frm.custstat.disabled = false;  
       if (document.frm.baseamt.length > 1) {
          document.frm.baseamt.options[5].text = "오십만원미만";
       }
    } else {
       document.frm.custstat.disabled = true;  
       if (document.frm.baseamt.length > 1) {
          document.frm.baseamt.options[5].text = "오십만원미만(비이자 유실적)";
       }

    }    	
    
	initGrid();  //화면 그리드 초기화

    //hiddenGrid.DataAutoTrim = false;  //자동 trim - off
	//hiddenGrid.SetDataAutoTrim(0);
    //고객구분
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&basemonth="+basemonth+"&v_inqtype=2&jekyocode=8&gubun=1");  
    //hiddenGrid.DataAutoTrim = true;   //자동 trim - on
	//hiddenGrid.SetDataAutoTrim(1);
    
	//고객상태
	hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&basemonth="+basemonth+"&v_inqtype=2&jekyocode=11");    
}

function selectCustgubun(){
         custgubun    = document.frm.custgubun.value.substring(0, 2);
         basemonth    = document.frm.basemonth.value;		

	//기업인경우 고객상태 = 고정처리
	if(custgubun == '12'){
		document.frm.custstat.value = '21'; //고정
		document.frm.custstat.disabled = true;  
		setPuyngzan();
	}
	//종교...
	else if(document.frm.custgubun.value == '113'){
		document.frm.custstat.value = '19'; //고정
		document.frm.custstat.disabled = true;  
		setPuyngzan();
	} 
	else{
		document.frm.custstat.value = 0;
		setPuyngzan();  		
                if (basemonth < '200901') {
                   document.frm.custstat.disabled = false;  
                } else {
                   document.frm.custstat.disabled = true;  
                   document.frm.baseamt.options[5].text = "오십만원미만(비이자 유실적)";
                }    	
	}    
}

function selectCustStat(){
    custStat    = document.frm.custstat.value;	
    setPuyngzan();
}

function setPuyngzan(){
    
	custgubun = document.frm.custgubun.value;
	custstat  = document.frm.custstat.value;
	var baseamtArr = new Array();
    
	if((custgubun == '100' || custgubun == '110' || custgubun == '111') && (custstat == '11' || custstat == '0')){
        baseamtArr[0] = new Array(        '', '선택');
		baseamtArr[1] = new Array('50000000', '오천만원이상');
		baseamtArr[2] = new Array('10000000', '일천만원이상 오천만원미만');
		baseamtArr[3] = new Array( '3000000', '삼백만원이상 일천만원미만');
		baseamtArr[4] = new Array(  '500000', '오십만원이상 삼백만원미만');
		baseamtArr[5] = new Array(  '499999', '오십만원미만');
	}
	else if((custgubun == '100' || custgubun == '110' || custgubun == '111') && custstat == '14'){
		baseamtArr[0] = new Array(  '500001', '오십만원이상');
	}		
	else{        
		baseamtArr[0] = new Array(       '0', '전체');
		baseamtArr[1] = new Array('50000000', '오천만원이상');
		baseamtArr[2] = new Array('10000000', '일천만원이상 오천만원미만');
		baseamtArr[3] = new Array( '3000000', '삼백만원이상 일천만원미만');
		baseamtArr[4] = new Array(  '500000', '오십만원이상 삼백만원미만');
		baseamtArr[5] = new Array(  '499999', '오십만원미만');
	} 
	
	setCombo(baseamtArr);			
}

function setCombo(baseamtArr){
	el = document.frm.baseamt;	
	while(el.options.length > 0){el.options.remove(0);}

  for(i=0;i<parseInt(baseamtArr.length);i++){	   
    var oOption = document.createElement("OPTION");
	  oOption.value = baseamtArr[i][0];
    oOption.text  = baseamtArr[i][1];       
    el.options.add(oOption);
  }
}

function ComboValue(el)
{
	if(el.name == "custgubun" && el.length > 0 ) 
		for ( ;el.options.length;) el.options.remove(0);
	else 
		for ( ;el.options.length>1;) el.options.remove(1);
	
	
    for(i=1;i<=hiddenGrid.GetTotalRows();i++){
       
		var oOption=document.createElement("OPTION");
	    oOption.value=hiddenGrid.GetCellValue(i, 0);
		oOption.text = hiddenGrid.GetCellValue(i, 1).replace(/ /gi, "\u00A0");
		
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

function getTimeStamp(str){
  dateObj = new Date();
  if(str == "1") {document.frm.start.value = dateObj}//.getHour() + ":" + dateObj.getMinute() +":"+dateObj.getSecond();}
  else           {document.frm.end.value  = dateObj}//.getHour() + ":" + dateObj.getMinute() +":"+dateObj.getSecond();}
}

/* Sheet 각종 처리 */
function doAction(sAction)
{
  isSelected  = true;
  basemonth   = document.frm.basemonth.value;
  v_jumcode   = document.frm.jumcode.value;
  v_jumname   = document.frm.jumname.value;
  custgubun   = document.frm.custgubun.value;
  custstat    = document.frm.custstat.value;
  baseamt     = document.frm.baseamt.value;
  searchCode  = document.frm.searchCode.value;  // 조회사유코드
	  
  switch(sAction)
  {		
    case "고정필드설정":
    	mySheet.SetFrozenCol(mySheet.MouseCol());
		ufSetMergeCell(mySheet, mySheet.LastRow(), 0, 1,3);
    	break;
    case "고정필드해제":
    	mySheet.SetFrozenCol(0);
		ufSetMergeCell(mySheet, mySheet.LastRow(), 0, 1,3);
    	break;
    case "기준년월":             // 조회(상위 GRID)
      hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&stmonth=201101");
      break;
    
    case "조회":             // 조회(상위 GRID)
      if(v_jumcode=="" || v_jumname==""){
        alert("점번호를 입력하지 않았습니다.");
        document.frm.jumcode.focus();
        return;
      }	
      else if(custgubun=='100' && custstat=='0'){ //전체-전체 
      	if (basemonth < '200901') {
           alert("고객구분이나 상태를 입력하세요");
        } else {
           alert("고객구분을 입력하세요");
        }
        document.frm.custgubun.focus();
        return;
      }
      else if((custgubun=='100' || custgubun=='110' || custgubun=='111')  && custstat=='0'){ //전체|개인|순수 - 전체
      	if (basemonth < '200901') {
           alert("고객상태를 선택하세요");
           document.frm.custstat.focus();
           return;
        } else {
               if (baseamt == '') {
                   alert("평잔기준금액을 입력하세요");
                   document.frm.baseamt.options[5].text = "오십만원미만(비이자 유실적)";
                   document.frm.baseamt.focus();
                   return;
               }
        }	
        
      }
      else if(baseamt == ''){
        alert("평잔기준금액을 입력하세요");
        document.frm.baseamt.focus();
        return;
      }
      if(searchCode == '00')
      {
        alert("조회사유코드는 필수입니다.");
        return;
      }

      result = true;
       
      getTimeStamp("1");
      if(result){			    
        mySheet.DoSearch("rpop.scr.rpop_scr_3010.do?hidden_key=9&basemonth="+basemonth+"&v_jumcode="+v_jumcode+"&custgubun="+custgubun+"&custstat="+custstat+"&baseamt="+baseamt+"&bgubun=0&mgubun=0"+"&searchCode="+searchCode+"&pg_url="+pg_url);
        mySheet.FitSize(false, false);

        break;
      }
      else{
        return;
      }

    case "엑셀내려받기":    // 엑셀내려받기
      
      inqText       = new Array();
      inqText[0]    = new Array();
      inqText[0][0] = "작업기준년월";
      inqText[0][1] = basemonth;
      inqText[1]    = new Array();
      inqText[1][0] = "점명";
      inqText[1][1] = document.frm.jumname.value;
      inqText[2]    = new Array();
      inqText[2][0] = "고객구분";
      inqText[2][1] = document.frm.custgubun.options[document.frm.custgubun.selectedIndex].text;	
      inqText[3]    = new Array();
      inqText[3][0] = "고객상태";
      inqText[3][1] = document.frm.custstat.options[document.frm.custstat.selectedIndex].text;
      inqText[4]    = new Array();
      inqText[4][0] = "평잔기준금액";
      inqText[4][1] = document.frm.baseamt.options[document.frm.baseamt.selectedIndex].text;	
      inqText[5]    = new Array();
      inqText[5][0] = "조회사유코드";
      inqText[5][1] = document.frm.searchCode.options[document.frm.searchCode.selectedIndex].text;
      // 보안등급세팅
      seqLevel = document.frm.Security_Level.value;
      if(seqLevel !=null && seqLevel!='') {
        inqText[6]    = new Array();
        inqText[6][0] = "보안등급";
        inqText[6][1] = document.frm.Security_Level.value;
      }
      rExcVal = doExcelPW(mySheet, inqText, true); //common.js 활용하여 excel 출력
      // 엑셀다운로드시 로그 저장
      /*if(rExcVal) {
         condition = "기준년월="+basemonth+";점번호="+v_jumcode+";고객구분="+custgubun+";고객상태="+custstat+";평잔기준금액="+baseamt ;
         hiddenGrid.DoSearch("comm.scr.comm_scr_9096.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"+"&searchCode="+searchCode+"&pg_url="+pg_url);
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
    basemonth   = document.frm.basemonth.value;

    if (basemonth <= '200812')  setGrid2008();
    else setGrid2009();

}

/*---------------------------------------*/
/* @기능 : 2008년도 이전 기준 그리드 set */
/*---------------------------------------*/        
function setGrid2008()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
  
  	GridSizeByIsPopup();

  // 상위 GRID에 대한 속성정보 설정
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:"고객명|고객번호|고객구분|고객상태|당월누적성과|당월누적성과|당월누적성과|당월누적성과|전월누적성과|전월누적성과|전월누적성과|전월누적성과|증감|증감|증감|증감|전년누적성과|전년누적성과|전년누적성과|전년누적성과", Align:"Center"},
                  { Text:"고객명|고객번호|고객구분|고객상태|평잔|잔액|순이자수익|비이자수익|평잔|잔액|순이자수익|비이자수익|평잔|잔액|순이자수익|비이자수익|평잔|잔액|순이자수익|비이자수익", Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"col2" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"col3" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"col4" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:110,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:110,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:110,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:110,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
       
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(1);
	showUnitText("원");
    newSetActionMenu(mySheet,"엑셀내려받기");
    mySheet.SetToolTipText(0,1,"조회된 셀에 잠시 마우스를 머무르면 실명번호가 표시됩니다.");
}

/*---------------------------------------*/
/* @기능 : 2009년도 기준 그리드 set */
/*---------------------------------------*/        
function setGrid2009()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
   
  	GridSizeByIsPopup();
  
  // 상위 GRID에 대한 속성정보 설정
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"고객명|고객번호|고객구분|고객상태|당월누적성과|당월누적성과|당월누적성과|당월누적성과|전월누적성과|전월누적성과|전월누적성과|전월누적성과|증감|증감|증감|증감|전년누적성과|전년누적성과|전년누적성과|전년누적성과", Align:"Center"},
                 { Text:"고객명|고객번호|고객구분|고객상태|평잔|잔액|순이자수익|비이자수익|평잔|잔액|순이자수익|비이자수익|평잔|잔액|순이자수익|비이자수익|평잔|잔액|순이자수익|비이자수익", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"col2" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"col3" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  ColMerge:1,   SaveName:"col4" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:110,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:110,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:110,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:110,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(1);
	showUnitText("원");
   	newSetActionMenu(mySheet,"엑셀내려받기");
   	mySheet.SetToolTipText(0,1,"조회된 셀에 잠시 마우스를 머무르면 실명번호가 표시됩니다.");
}
