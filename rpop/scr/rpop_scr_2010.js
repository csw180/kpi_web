
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
function LoadPage() {

  	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "420px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
	
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
   	mySheet.SetDataAutoTrim(0);
  
  // 상위 GRID에 대한 속성정보 설정
  	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

   	var msInfo    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var msHeaders = [ { Text:"구분|당월누적성과|전월누적성과|증감|고객구분", Align:"Center"} ];
   	mySheet.InitHeaders(msHeaders, msInfo);

   	var msCols = [ {Type:"Text",     Hidden:0,  MinWidth:180,  Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:10,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
	mySheet.InitColumns(msCols);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");

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
    hiddenGrid.DoSearch("kpi.macd.macd_1021.screen?hidden_key=9&v_inqtype=3&basemonth="+basemonth+"&jekyocode=1&productgubun=1"); 
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
    var oOption = document.createElement("OPTION");
    oOption.text = "전체";
    oOption.value = "99999";
    el.options.add(oOption);
    for(i=1;i<=hiddenGrid.GetTotalRows();i++){
       var oOption = document.createElement("OPTION");
       oOption.text = hiddenGrid.GetCellValue(i, 1);
       oOption.value = hiddenGrid.GetCellValue(i, 0);
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
    bgubun='';
    mgubun='';
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
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3");
            break;
        case "조회":             // 조회(상위 GRID)
            if(v_jumcode=="" || v_jumname==""){
                alert("점번호를 입력하지 않았습니다.");
				document.frm.jumcode.focus();
                return;
            }
            mySheet.DoSearch("rpop.scr.rpop_scr_2010.do?hidden_key=9&basemonth="+basemonth+"&v_jumcode="+v_jumcode+"&bgubun="+bgubun+"&mgubun="+mgubun);
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
            // 보안등급세팅
            seqLevel=document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[2]=new Array();
                inqText[2][0]="보안등급";
                inqText[2][1]=document.frm.Security_Level.value;
            }
            rExcVal=doExcel(mySheet, inqText, true); //common.js 활용하여 excel 출력
            // 엑셀다운로드시 로그 저장
            /*if(rExcVal) {
               condition="기준년월="+basemonth+";점번호="+v_jumcode;
               hiddenGrid.DoSearch("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition);
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
  //commPopup(url);
  win_open2(url,820,580);    
}
