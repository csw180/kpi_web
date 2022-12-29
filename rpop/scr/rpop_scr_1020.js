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
  		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "420px");
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
 	var alleRole;

    mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

    var msInfo    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
    var msHeaders = [ { Text:"구분|성과지표|목표|점수|배점|당월누적성과|당월누적성과|당월누적성과|당월누적성과|당월누적성과|전월누적성과|전월누적성과|전월누적성과|전월누적성과|전월누적성과|KPI코드", Align:"Center"},
                  { Text:"구분|성과지표|목표|점수|배점|실적|달성도|PeerGroup|PeerGroup|PeerGroup|실적|달성도|PeerGroup|PeerGroup|PeerGroup|KPI코드", Align:"Center"},
                  { Text:"구분|성과지표|목표|점수|배점|실적|달성도|평균|최고|순위|실적|달성도|평균|최고|순위|KPI코드", Align:"Center"} ];
    mySheet.InitHeaders(msHeaders, msInfo);

    var msCols = [ {Type:"Text",     Hidden:0,  MinWidth:70,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:220,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Center",  ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Text",      Hidden:1, MinWidth:30,   Align:"Left",    ColMerge:1,   SaveName:"NONE" } ];
        
	if (alleRole=="1") {
    	mySheet.SetColHidden(15,0);
    } else
		mySheet.SetColHidden(15,1); 
		
	mySheet.InitColumns(msCols);
	mySheet.SetCountPosition(1);
    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetDataLinkMouse(true);
    newSetActionMenu(mySheet,"엑셀내려받기");
	//showUnitText("원, 점수, %, 명, 개");
  	doAction("기준년월");
}


/*-------------------------------------------------*/
/* @기능 : 점번호 숫자와 RM번호만 입력가능하도록   */
/*-------------------------------------------------*/

function chk_jum() 
{
	basemonth   = document.frm.basemonth.value;

  	// 2012년부터 RM점번호 생성됨.
  	if (basemonth < '201201')chk_num();
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
    basemonth=document.frm.basemonth.value;
    v_jumcode=document.frm.jumcode.value;
    if(v_jumcode != ''){
	  hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=1&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
    }
    else
	{ 
      document.frm.jumname.value='';
      document.frm.pgcode.value='';
      document.frm.pgname.value='';
    }

}

function popupJumCode()
{
    allDelDataGrid(mySheet);
    basemonth = document.frm.basemonth.value;
    win_open2("comm.scr.comm_scr_1010.screen?basemonth="+basemonth+"&searchGubun=5", 250, 450);
}

function selectjum()
{
    basemonth=document.frm.basemonth.value;
    v_jumcode=document.frm.jumcode.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=6&basemonth="+basemonth+"&v_jumcode="+v_jumcode);

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
    pgcode=document.frm.pgcode.value;
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
        case "기준년월":
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3");
            //changeUnitText();
            break;
        case "조회":
            if(v_jumcode=="" || v_jumname==""){
                alert("점번호를 입력하지 않았습니다.");
                document.frm.jumcode.focus();
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
            mySheet.DoSearch("rpop.scr.rpop_scr_1020.do?hidden_key=9&basemonth="+basemonth+"&v_jumcode="+v_jumcode+"&pgcode="+pgcode);
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
               condition="기준년월="+basemonth+";점번호="+v_jumcode+";PG코드="+pgcode;
               hiddenGrid.DoSearch("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2");
				 // gubun 1:rpdy(일일성과) 2:rpop(영업점성과)
            }*/
            break;      
    }

}

//성과집계표보기
function call1020()
{
	f = document.frm;
  	basemonth = f.basemonth.value;
  	period    = 3;
  	jumcode   = f.jumcode.value;
  	pgcode    = f.pgcode.value;
  	url = "kpi.rpop.rpop_1020.screen?basemonth="+basemonth+"&jumcode="+jumcode+"&IS_POPUP=Y&SCREEN_URL=kpi.rpop.rpop_1020.screen";
  	win_open2(url,820,580);    
}

//보고서출력
function doPrint()
{  

  	if(mySheet.RowCount() > 0)
	{
    
		basemonth = document.frm.basemonth.options[document.frm.basemonth.selectedIndex].value;
    	jumname   = document.frm.jumname.value;
    	pgcode    = document.frm.pgname.value;
    	//security  = document.frm.security.value
    	//security  = document.frm.Security_Level.value;
    	//unit      = mySheet.UnitText;

    	//var params  = "basemonth="+basemonth+"&jumname="+encodeURI(jumname)+"&pgcode="+pgcode+"&security="+security+"&unit="+unit;
    	//var prt_url = "http://"+location.hostname+":"+location.port +"/kpi/rpop/prt";

		var params  = "basemonth="+basemonth+"&jumname="+encodeURI(jumname)+"&pgcode="+encodeURI(pgcode);
	
    	report_view("/rpop/scr/rpop_scr_1020.jsp?"+params  , "/rpop/prt/rpop_prt_1020.crf", rtnData);
  	}
  	else
	{
    	alert("조회내역이 없습니다. 조회 후 보고서를 출력하세요.");
  	}
}

function changeUnitText()
{
    allDelDataGrid(mySheet);
    basemonth   = document.frm.basemonth.value;
	
    if(basemonth >= '201401') {
       showUnitText("원, 점수, %, 명, 개, 미불");
    } else { 
       showUnitText("원, 점수, %, 명, 개");
    }            
}
