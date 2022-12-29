
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

	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"HIDDEN", Align:"Center"} ];
   	hiddenGrid.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
   	hiddenGrid.InitColumns(cols);
	hiddenGrid.SetVisible(0);
   	hiddenGrid.SetEditable(0);

  	doAction("기준년월");
  	initGrid(); // RM권유계좌 화면 그리드 초기화
}

/*-----------------------------------------*/
/* @기능 : RM점번호 check                  */
/*-----------------------------------------*/
function chk_RM() {
    //hiddenGrid  = document.frm.hiddenGrid;
    basemonth   = document.frm.basemonth.value;

    var el = window.event.srcElement;
    var vl = el.value;
    var ln = vl.length;
    var chst = vl.charAt(0);
          
    if (chst == 'R')  {
       for(var i=1; i < ln; i++) {
           var ch = vl.charAt(i);
           if (ch < "0" || ch > "9") {
              alert("숫자만 입력가능합니다.");
              el.value = "";
              el.focus();
              return false;
           }
       }
    } else alert("점번호는 (R~) RM점번호만 가능합니다. 점번호 확인하세요" );
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
}

function popupJumCode()
{
    basemonth = document.frm.basemonth.value;
    win_open2("comm.scr.comm_scr_1010.screen?basemonth="+basemonth+"&searchGubun=9", 250, 450);
}

function selectjum()
{
    //hiddenGrid  = document.frm.hiddenGrid;
    basemonth   = document.frm.basemonth.value;
    v_jumcode   = document.frm.jumcode.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=6&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
}

function selectmonth(){
    basemonth   = document.frm.basemonth.value;
    
    if (basemonth < '201307') {
       document.frm.pygubun.value = "3";
       document.frm.pygubun.disabled = true;
    } else {
       document.frm.pygubun.value = "4";
    	 document.frm.pygubun.disabled = false;
    }	

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

/* Sheet 각종 처리 */
function doAction(sAction)
{
    basemonth   = document.frm.basemonth.value;
    v_jumcode   = document.frm.jumcode.value;
	v_jumname   = document.frm.jumname.value;	
    pygubun     = document.frm.pygubun.value;
    searchCode  = document.frm.searchCode.value;  // 조회사유코드

    switch(sAction)
    {
        case "고정필드설정":
        	mySheet.SetFrozenCol(mySheet.MouseCol());
        	ufSetMergeCell(mySheet, mySheet.LastRow(), 0, 1,5);
        	break;
        case "고정필드해제":
        	mySheet.SetFrozenCol(0);
        	ufSetMergeCell(mySheet, mySheet.LastRow(), 0, 1,5);
        	break;
        case "기준년월":             // 조회(상위 GRID)
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&stmonth=201201"); 
            break;
        case "조회":             // 조회(상위 GRID)
            if(v_jumcode=="" || v_jumname==""){
                alert("RM점번호를 입력하지 않았습니다.");
			         	document.frm.jumcode.focus();
                return;
            }
            if(searchCode == '00')
            {
              alert("조회사유코드는 필수입니다.");
              return;
            }
            mySheet.DoSearch("rpop.scr.rpop_scr_7030.do?hidden_key=9&basemonth="+basemonth+"&v_jumcode="+v_jumcode+"&pygubun="+pygubun+"&searchCode="+searchCode+"&pg_url="+pg_url);
            break;
            
        case "엑셀내려받기":    // 엑셀내려받기
            inqText       = new Array();
            inqText[0]    = new Array();
            inqText[0][0] = "작업기준년월";
            inqText[0][1] = basemonth;
            inqText[1]    = new Array();
            inqText[1][0] = "점명";
            inqText[1][1] = document.frm.jumname.value;
            inqText[2]    = new Array();
            inqText[2][0] = "구분";
            inqText[2][1] = document.frm.pygubun.options[document.frm.pygubun.selectedIndex].text;
            inqText[3]    = new Array();
            inqText[3][0] = "조회사유코드";
            inqText[3][1] = document.frm.searchCode.options[document.frm.searchCode.selectedIndex].text;
            // 보안등급세팅
            seqLevel = document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[4]    = new Array();
                inqText[4][0] = "보안등급";
                inqText[4][1] = document.frm.Security_Level.value;
            }
            
            rExcVal = doExcelPW(mySheet, inqText, true); //common.js 활용하여 excel 출력
            // 엑셀다운로드시 로그 저장
            /*if(rExcVal) {
               condition = "기준년월="+basemonth+";점번호="+v_jumcode+";구분="+pygubun;
               hiddenGrid.DoSearch("comm.scr.comm_scr_9096.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"+"&searchCode="+searchCode+"&pg_url="+pg_url);
            }*/
            break;   	
    }
}

/*--------------------------------------------*/
/* @기능 : 선택된 기준년월에 따른 그리드 init */
/*--------------------------------------------*/        
function initGrid()
{
    basemonth   = document.frm.basemonth.value;
    if (basemonth >= '201201')  setGrid2012();

}

/*----------------------------------*/
/* @기능 : 2012년도 기준 그리드 set */
/*----------------------------------*/        
function setGrid2012()
{
	pygubun = document.frm.pygubun.value;
	if(typeof(mySheet) !== "undefined") {  
		
  		mySheet.Reset();
	}
  
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

	var strHeader0 = "";
	
  // 상위 GRID에 대한 속성정보 설정
  	if(pygubun=="4") {
		strHeader0 = 
			"RM점번호|RM명|PG명|계좌번호|신규일|계정과목코드|계정과목명|고객번호|고객명|기중평잔|잔액|"
			+"이자마진\n(A)|마진율|수입수수료\n(B)|지급수수료\n(C)|직접비용\n(D)|정상예상손실금액\n(E)|이익\n(F)=(A+B-C-D-E)";
	} else {
		strHeader0 = 
			"RM점번호|RM명|PG명|계좌번호|신규일|계정과목코드|계정과목명|고객번호|고객명|반기평잔|잔액|"
			+"이자마진\n(A)|마진율|수입수수료\n(B)|지급수수료\n(C)|직접비용\n(D)|정상예상손실금액\n(E)|이익\n(F)=(A+B-C-D-E)";
	}
	
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"}];

   	mySheet.InitHeaders(headers, info);

	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"col1" },
             {Type:"Text",     Hidden:0,  MinWidth:120,   Align:"Left",    ColMerge:1,   SaveName:"col3" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"col2" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"col4" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",    ColMerge:1,   SaveName:"col5" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",   ColMerge:1,   SaveName:"col6" },
             {Type:"Text",     Hidden:0,  MinWidth:120,   Align:"Left",   ColMerge:1,   SaveName:"col7" },
             {Type:"Text",     Hidden:0,  MinWidth:120,   Align:"Center",   ColMerge:1,   SaveName:"col8" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Left",   ColMerge:1,   SaveName:"col9" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
    mySheet.SetDataAutoTrim(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(1);
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원");
}
