
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

	if (getUrlParameter ('IS_POPUP') == "Y") {
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "380px");
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	}
	
  	createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");
  
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
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"구분|당월누적성과|전월누적성과|증감", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:320,  Align:"Left",    ColMerge:1,   SaveName:"col1" },
             {Type:"Int",       Hidden:0,  MinWidth:150,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:150,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:150,  Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

   	mySheet.SetEditable(0);
   	mySheet.SetDataAutoTrim(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
      //지원안함[check again] UnitText="원";
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원");
	doAction("기준년월");
}


/*-------------------------------------------------*/
/* @기능 : 점번호 숫자와 RM번호만 입력가능하도록   */
/*-------------------------------------------------*/

function chk_jum() 
{	
	//  hiddenGrid  = document.frm.hiddenGrid;
	basemonth   = document.frm.basemonth.value;

  // 2012년부터 RM점번호 생성됨.
	if (basemonth < '201201')
		chk_num();
  	else 
	{
    	var el = window.event.srcElement;
        var vl = el.value;
        var ln = vl.length;
          
        var chst = vl.charAt(0);
          
        if (chst =='0' || chst == 'R' || chst == '1')  
		{
        	for(var i=1; i < ln; i++) 
			{
            	var ch = vl.charAt(i);
                if(ch < "0" || ch > "9") 
				{
                	alert("숫자만 입력가능합니다.");
                	el.value = "";
                	el.focus();
                	return false;
               }
        	}
		}
        else 
       		alert("점번호는 0~, R~ 만 가능합니다. 점번호 확인하세요" );
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

function changedColumnName()
{
    mySheet.SelectCell("1", "0");
}

function selectjumname()
{
	allDelDataGrid(mySheet);
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
    allDelDataGrid(mySheet);
	showUnitText('원');
    basemonth = document.frm.basemonth.value;
    win_open2("comm.scr.comm_scr_1010.screen?basemonth="+basemonth+"&searchGubun=5", 250, 450);
}
function selectjum()
{
    allDelDataGrid(mySheet);
	showUnitText("원");
    //hiddenGrid  = document.frm.hiddenGrid;
    basemonth   = document.frm.basemonth.value;
    v_jumcode   = document.frm.jumcode.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=6&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
}

function selectmonth(){
    allDelDataGrid(mySheet);
	showUnitText("원");
    basemonth    = document.frm.basemonth.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=11&v_inqtype=3&basemonth="+basemonth+"&jekyocode=1&productgubun=1"); 
    
    
    if(basemonth >= "201307"){
        document.all.td1.style.display="";
        document.all.td2.style.display="";
    }else{
        document.all.td1.style.display="none";
        document.all.td2.style.display="none";
    }

    if (basemonth >= "201801"){
       document.frm.pygubun.value='3';   
       document.frm.pygubun.disabled = true;
    } else {       
    	 document.frm.pygubun.value='4';  
    	 document.frm.pygubun.disabled = false; 
    }
    
    selectjum();
}
function sel_bgubun(){
    allDelDataGrid(mySheet);
    basemonth    = document.frm.basemonth.value;
    bgubun       = document.frm.bgubun.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=11&v_inqtype=3&basemonth="+basemonth+"&jekyocode=2&productgubun=1"+"&bgubun="+bgubun); 
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
    isSelected=true;
    basemonth=document.frm.basemonth.value;
    v_jumcode=document.frm.jumcode.value;
	v_jumname=document.frm.jumname.value;
    bgubun=document.frm.bgubun.value;
    mgubun=document.frm.mgubun.value;
    excsubpdt=document.frm.excsubpdt.checked ? 1:0;
    pygubun=document.frm.pygubun.value;
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
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3" );
            break;
        case "조회":             // 조회(상위 GRID)
            if(v_jumcode=="" || v_jumname==""){
                alert("점번호를 입력하지 않았습니다.");
			        	document.frm.jumcode.focus();
                return;
            }
            mySheet.DoSearch("rpop.scr.rpop_scr_1070.do?hidden_key=9&basemonth="+basemonth+"&v_jumcode="+v_jumcode+"&excsubpdt="+excsubpdt+"&bgubun="+bgubun+"&mgubun="+mgubun+"&pygubun="+pygubun);
            //mySheet.FitSize(false, false);
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
            inqText[2][0]="중분류";
            inqText[2][1]=document.frm.bgubun.options[document.frm.bgubun.selectedIndex].text;	
            inqText[3]=new Array();
            inqText[3][0]="소분류";
            inqText[3][1]=document.frm.mgubun.options[document.frm.mgubun.selectedIndex].text;
            seqLevel=document.frm.Security_Level.value;
            // 2013년 7월 이후부터 구분 있음
            if(basemonth >= '201307') { 
               inqText[4]=new Array();
               inqText[4][0]="구분";
               inqText[4][1]=document.frm.pygubun.options[document.frm.pygubun.selectedIndex].text;
               // 보안등급세팅
               if(seqLevel !=null && seqLevel!='') {
                   inqText[5]=new Array();
                   inqText[5][0]="보안등급";
                   inqText[5][1]=document.frm.Security_Level.value;
               }
            } else {
               if(seqLevel !=null && seqLevel!='') {
                   inqText[4]=new Array();
                   inqText[4][0]="보안등급";
                   inqText[4][1]=document.frm.Security_Level.value;
               }
            }	
            rExcVal=doExcel(mySheet, inqText, true); //common.js 활용하여 excel 출력
            // 엑셀다운로드시 로그 저장
            /*if(rExcVal) {
               condition="기준년월="+basemonth+";점번호="+v_jumcode+";하위상품제외="+excsubpdt+";중분류="+bgubun+";소분류="+mgubun+";구분="+pygubun;
               hiddenGrid.DoSearch("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2");
				//gubun1:rpdy(일일성과)2:rpop(영업점성과)
            }*/
            break;      
    }

}

function call1020()
{
	f = document.frm;
  	basemonth = f.basemonth.value;
  	jumcode   = f.jumcode.value;
  	jumname   = f.jumname.value;
  	pgcode    = f.pgcode.value;
  	pgname    = f.pgname.value;
  	url = "kpi.rpop.rpop_1020.screen?basemonth="+basemonth+"&jumcode="+jumcode+"&jumname="+jumname+"&pgcode="+pgcode+"&pgname="+pgname+"&IS_POPUP=Y&SCREEN_URL=kpi.rpop.rpop_1020.screen";
  	win_open2(url,820,580);    
}

function call_main_1060()
{
	f = document.frm;
  	basemonth = f.basemonth.value;
  	jumcode   = f.jumcode.value;
  	jumname   = f.jumname.value;
  	pygb      = f.pygubun.value;
  	if(basemonth < '201307') pygb = '0'; // 평가구분 2013년 7월부터 추가 이전까지는 '전체'로 조회하도록 처리
  	url = "kpi.main.main_1060.screen?basemonth="+basemonth+"&jumcode="+jumcode+"&jumname="+jumname+"&pygb="+pygb+"&IS_POPUP=Y&SCREEN_URL=kpi.main.main_1060.screen";
  	win_open2(url,820,580);    
}