var isInitBtnEnable = true;
var isInstBtnEnable = true;
var isMofyBtnEnable = false;
var isDelBrnEnable  = false;
var isExcelBtnEnable= true;

let strMsHeaders = "";

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
	var srchFlag = true;
	
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
		srchFlag = false;
	} else {
		createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "200px");
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
	}
	
  // 상위 GRID에 대한 속성정보 설정
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var msInfo    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var msHeaders = [ { Text:"구분|" + makeHeader(""), Align:"Center"} ]; //순번|
   	mySheet.InitHeaders(msHeaders, msInfo);

   	var msCols = [ {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Left",  ColMerge:1,   SaveName:"col1",  UpdateEdit:0,   InsertEdit:0},
             //{Type:"Text",      Hidden:1, MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"col3" },
             {Type:"Text",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
	mySheet.InitColumns(msCols);
	//mySheet.SetColProperty(0, {ComboText:"이익|  순이자수익|  비이자수익|  특별수익|  기타수익|  업무원가", ComboCode:"1|2|3|4|5|6", } );
	//mySheet.SetColBackColor(0, "#C9E1F5");
	initLeftColumn();
	mySheet.SelectCell(1, 0);  
   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
	mySheet.SetColProperty(0, 0, {Focus:0});
	mySheet.SetColProperty(0, 1, {Focus:0});
	//mySheet.SetCountPosition(1);
	showUnitText("원");
   	newSetActionMenu(mySheet,"엑셀내려받기");

	if(typeof(myChart) === "undefined") {
		createIBChart(document.getElementById("chartObj"), "myChart", {Width: "100%",height: "300px"});
	}
	
	initChart();
	
	if(srchFlag)
  		doAction("기준년월");
}

function initLeftColumn()
{
	mySheet.DataInsert(0);
	mySheet.DataInsert(1);
	mySheet.DataInsert(2);
	mySheet.DataInsert(3);
	mySheet.DataInsert(4);
	mySheet.DataInsert(5);

	for(var i=1; i<6; i++)
	{
		for(var j=1; j<13; j++)
		{
			mySheet.SetCellText(i,j," ");
		}
	}
	
	mySheet.SetCellValue(1,1,"");
	mySheet.SetCellText(1,0,"이익");
	mySheet.SetCellText(2,0,"순이자수익");
	mySheet.SetCellText(3,0,"비이자수익");
	mySheet.SetCellText(4,0,"특별수익");
	mySheet.SetCellText(5,0,"기타수익");
	mySheet.SetCellText(6,0,"업무원가");
	mySheet.SetCellAlign(1,0,"Left")
	mySheet.SetCellAlign(2,0,"Center")
	mySheet.SetCellAlign(3,0,"Center")
	mySheet.SetCellAlign(4,0,"Center")
	mySheet.SetCellAlign(5,0,"Center")
	mySheet.SetCellAlign(6,0,"Center")
	mySheet.SetColBackColor(0, "#C9E1F5");

}
function initChart() {
	myChart.removeAll();
	
	myChart.setOptions({
		subtitle:{
					text:"[단위 / 백만원]",
					align:"right",
					style:{
						color:"#15498B",
						fontFamily:"Dotum"
					}
		} 
	},{
	  		append: true,
			redraw: true
	});
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
    basemonth = document.frm.basemonth.value;
    win_open2("comm.scr.comm_scr_1010.screen?basemonth="+basemonth+"&searchGubun=2", 250, 450);
}
function selectjum()
{
    //hiddenGrid  = document.frm.hiddenGrid;
    basemonth   = document.frm.basemonth.value;
    v_jumcode   = document.frm.jumcode.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=6&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
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
    //mySheet     = document.frm.mySheet;
    //hiddenGrid  = document.frm.hiddenGrid;
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
        case "기준년월":             // 조회(상위 GRID)
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3" );
            break;
        case "조회":             // 조회(상위 GRID)
            if (v_jumcode=="" || v_jumcode==null || v_jumname=="" || v_jumname==null){
                if(v_jumcode == "" || v_jumcode==null)
					alert("점번호를 입력하지 않았습니다.");
				else 
					alert("올바르지 않은 점번호를 입력하였습니다.");
					
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
            //Header 정보를 생성
            //지원안함[implemented common] mySheet.InitHeadRow(0, "구분|순번|" + makeHeader(basemonth), true);
			if(typeof(mySheet) !== "undefined") {
				
				mySheet.Reset();
				initChart();
			}
		    mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

			var msInfo    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
			
			strMsHeaders = "구분|" + makeHeader(basemonth);//순번|
			
			var msHeaders = [ { Text:strMsHeaders, Align:"Center"} ];
			mySheet.InitHeaders(msHeaders, msInfo);
			
			var msCols = [ {Type:"Combo",     Hidden:0,  MinWidth:100,  Align:"Left",  ColMerge:1,   SaveName:"col1", UpdateEdit:0,   InsertEdit:0 },
			          //{Type:"Text",      Hidden:1, MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"col3" },
			          {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			          {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			          {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			          {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			          {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			          {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			          {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			          {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			          {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			          {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			          {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
			          {Type:"Int",       Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",      CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
			 
			mySheet.InitColumns(msCols);
			mySheet.SetColProperty(0, {ComboText:"이익|  순이자수익|  비이자수익|  특별수익|  기타수익|  업무원가", ComboCode:"1|2|3|4|5|6", } );
			mySheet.SetColBackColor(0, "#C9E1F5");
			mySheet.SetCountPosition(1);
			mySheet.SetColProperty(0, 0, {Focus:0});
			mySheet.SetColProperty(0, 1, {Focus:0});
            mySheet.DoSearch("rpop.scr.rpop_scr_1050.do?hidden_key=9&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
            //mySheet.FitSize(false, true);
            callgrap();
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
               condition="기준년월="+basemonth+";점번호="+v_jumcode;
               hiddenGrid.DoSearch("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2");
				//gubun1:rpdy(일일성과)2:rpop(영업점성과)
            }*/
            break;      
    }

}

//성과집계표 팝업 호출
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

//Chart Call
function callgrap()
{
	initChart();
	if(mySheet.RowCount()<= 0) return;
	
	var title1="이익";
	var title2="순이자수익";
	var title3="비이자수익";
	var title4="특별수익";
	var title5="기타수익";
	var title6="업무원가";
	
	var title1Flag = document.frm.grapyn1.checked;
	var title2Flag = document.frm.grapyn2.checked;
	var title3Flag = document.frm.grapyn3.checked;
	var title4Flag = document.frm.grapyn4.checked;
	var title5Flag = document.frm.grapyn5.checked;
	var title6Flag = document.frm.grapyn6.checked;
	
	var categories = new Array();
	var categorie = strMsHeaders.split("|");
	
	for(var i=2; i<categorie.length; i++) {
		categories.push(categorie[i]);
		
	}
	
	var seriesArr = new Array();
	var series1 = new Array();
	var series2 = new Array();
	var series3 = new Array();
	var series4 = new Array();
	var series5 = new Array();
	var series6 = new Array();
	
	
	for(var i=2; i<categorie.length; i++) {
		if(title1Flag) {
			series1.push(mySheet.GetCellValue(1, i) / 1000000);
		}
		if(title2Flag) {
			series2.push(mySheet.GetCellValue(2, i) / 1000000);
		}
		if(title3Flag) {
			series3.push(mySheet.GetCellValue(3, i) / 1000000);
		}
		if(title4Flag) {
			series4.push(mySheet.GetCellValue(4, i) / 1000000);
		}
		if(title5Flag) {
			series5.push(mySheet.GetCellValue(5, i) / 1000000);
		}
		if(title6Flag) {
			series6.push(mySheet.GetCellValue(6, i) / 1000000);
		}
	}
	
	if(title1Flag) {
		seriesArr.push({
			type: "line",
		    zIndex: 1,  // z-layer index
		    name : title1,
		    data : series1
		});
	}
	
	if(title2Flag) {
		seriesArr.push({
			type: "line",
		    zIndex: 2,  // z-layer index
		    name : title2,
		    data : series2
		});
	}
	
	if(title3Flag) {
		seriesArr.push({
			type: "line",
		    zIndex: 3,  // z-layer index
		    name : title3,
		    data : series3
		});
	}
	
	if(title4Flag) {
		seriesArr.push({
			type: "line",
		    zIndex: 4,  // z-layer index
		    name : title4,
		    data : series4
		});
	}
	
	if(title5Flag) {
		seriesArr.push({
			type: "line",
		    zIndex: 5,  // z-layer index
		    name : title5,
		    data : series5
		});
	}
	
	if(title6Flag) {
		seriesArr.push({
			type: "line",
		    zIndex: 6,  // z-layer index
		    name : title6,
		    data : series6
		});
	}
	
	myChart.setOptions({	
		series: seriesArr,
  		yAxis:[{
  			title:{
				style:{
					fontFamily:"Dotum",
					color:"#15498B"
				},
				text:""
			},
			gridLineColor:"#333333",
			tickColor:"#333333",
			//tickInterval:10.2,
			labels:{
				formatter:function(){
					return this.value;
				},
				style:{
					fontFamily:"Dotum"
				}
			}
			
		}],
		xAxis: [
			{
				categories:categories
  			}
		]
	},{
  		append: true,
		redraw: true
	});

	/*	
  var basemonth = document.frm.basemonth.value;
  var jumcode = document.frm.jumcode.value;
  var grapyn1 = document.frm.grapyn1.checked ? 1:0;
  var grapyn2 = document.frm.grapyn2.checked ? 1:0;
  var grapyn3 = document.frm.grapyn3.checked ? 1:0;
  var grapyn4 = document.frm.grapyn4.checked ? 1:0;
  var grapyn5 = document.frm.grapyn5.checked ? 1:0;
  var grapyn6 = document.frm.grapyn6.checked ? 1:0;

  var prt_url = "http://"+location.hostname+":"+location.port +"/kpi/rpop/prt";
  prt_url = prt_url + "/rpop_prt_1050_chart.jsp?basemonth="+basemonth+"&jumcode="+jumcode+"&grapyn1="+grapyn1+"&grapyn2="+grapyn2+"&grapyn3="+grapyn3+"&grapyn4="+grapyn4+"&grapyn5="+grapyn5+"&grapyn6="+grapyn6;
  
  params = "menubar=false&zoom_rate=95&ard_save=false&excel_convert=false&pdf_convert=false&hwp_convert=false&mail_trans=false";
  //embedAI(iframe1, prt_url);
*/
}
//보고서출력
function doPrint(){  

  if(mySheet.GetCellValue(1,1) != '') {
    
	//basemonth=document.frm.basemonth.options[document.frm.basemonth.selectedIndex].text;
    basemonth=document.frm.basemonth.value;
    jumname=document.frm.jumname.value;
    pgcode=document.frm.pgname.value;
    //security  = document.frm.security.value
    //security=document.frm.Security_Level.value;
    //지원안함[check again] unit=mySheet.UnitText;
    
    //var prt_url="http://"+location.hostname+":"+location.port +"/kpi/rpop/prt";
    
	// script/AIScriptCS.js 이용
    //popAI(prt_url, "rpop_cs_1050.esp", params);
	
	var monLabelArr = createHeader(basemonth).split('|');
	
	var params  = "basemonth="+basemonth+
				  "&jumname="+encodeURI(jumname)+
				  "&pgcode="+encodeURI(pgcode)+
		          "&monLabelArr="+encodeURI(monLabelArr);
	
    report_view("/rpop/scr/rpop_scr_1050.jsp?"+params  , "/rpop/prt/rpop_prt_1050.crf", rtnData);

  }
  else{
     alert("조회내역이 없습니다. 조회 후 보고서를 출력하세요.");
  }
}

function createHeader(basemonth){
	var Head = "";
		
	var preYear  = basemonth.substring(0,2)*1;
  	var endYear  = basemonth.substring(2,4)*1;
	
	var year = preYear +''+ endYear;
  	var month = basemonth.substring(4,6)*1;
  	var Head  = "";
  
	if(year  < 10) year="0"+year;
  	if(month < 10) Head = year+"/"+"0"+month;
  	else           Head = year+"/"+month;
  
	for(i=1;i<12;i++){
      	month--;
      	if(month < 1){
           	year  = year-1;
          	month = 12;
      	}
      		if(year  < 10) year="0"+year*1;
      		if(month < 10) Head=year+"/"+'0'+month+"|"+Head;
      		else           Head=year+'/'+month+"|"+Head;
  	}

  	return Head;
}