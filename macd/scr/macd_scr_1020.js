
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

  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");
  
  	// Hidden GRID에 대한 속성정보 설정
   	hiddenGrid.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"HIDDEN|txt", Align:"Center"} ];
   	hiddenGrid.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
   	hiddenGrid.InitColumns(cols);
   	hiddenGrid.SetEditable(0);
	hiddenGrid.SetVisible(0);
  
  	// 상위 GRID에 대한 속성정보 설정
   	let strHeader="상태|대분류코드|대분류명|중분류코드|중분류명|세분류코드|세분류명"  +
   						"|순이자\n수익대상\n상품구분|연체\n대상\n여부|신용카드\n연체대상\n여부"   +
   						"|저원가성\n여부|총여신\n여부|PI이자\n대상구분|기준실적\n상품분류|신규고정이하\n여신대상여부|위험조정운용\n대상여부|특정상품\n분류|디마케팅\n제외구분|소매여신\n구분|수수료구분";

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [{Text:strHeader, Align:"center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:300,  Align:"Left",    SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Combo",     Hidden:0, MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Combo",     Hidden:0, MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Combo",     Hidden:0, MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"NONE" } ];

	mySheet.InitColumns(cols);
	mySheet.SetColProperty(16, {ComboText:"한도대출", ComboCode:"01"} );
	mySheet.SetColProperty(17, {ComboText:"미분류|서민금융|가계종통|신용카드|예금담보대출|기타", ComboCode:"0|1|2|3|4|5"} );
	mySheet.SetColProperty(18, {ComboText:"N|Y", ComboCode:"0|1"} );

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
    newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetCountPosition(1);
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

function sel_basemonth(){
    basemonth=document.frm.basemonth.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=13"); //상품구분 
}
function sel_productgubun(){
	  document.frm.mgubun.value = 999;
	  
    basemonth    = document.frm.basemonth.value;
    productgubun = document.frm.productgubun.value;
    
    //상품별대분류 산출 1021.jsp에서 별도 proc call
    hiddenGrid.DoSearch("kpi.macd.macd_1021.screen?hidden_key=9&v_inqtype=3&basemonth="+basemonth+"&jekyocode=1&productgubun="+productgubun); 
}
function sel_bgubun(){
  
    basemonth    = document.frm.basemonth.value;
    productgubun = document.frm.productgubun.value;
    bgubun       = document.frm.bgubun.value;
    
    //상품별중분류산출 1021.jsp에서 별도 proc call 
    hiddenGrid.DoSearch("kpi.macd.macd_1021.screen?hidden_key=9&v_inqtype=3&basemonth="+basemonth+"&jekyocode=2&productgubun="+productgubun+"&bgubun="+bgubun);   
}
function changedColumnName()
{
  	mySheet.SelectCell("1", "0");
}

function ComboValue(el)
{
    for ( ;el.options.length > 1;) el.options.remove(1);
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
    isSelected  = true;
    basemonth   = document.frm.basemonth.value;
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
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=4"); 
            break;
        case "조회":             // 조회(상위 GRID)
            productgubun= document.frm.productgubun.value;
            bgubun= document.frm.bgubun.value;
            mgubun= document.frm.mgubun.value;
                      
            mySheet.DoSearch("macd.scr.macd_scr_1021.do?hidden_key=9&v_inqtype=9&basemonth="+basemonth+"&productgubun="+productgubun+"&bgubun="+bgubun+"&mgubun="+mgubun); 
            break;
            
        case "엑셀내려받기":    // 엑셀내려받기
            inqText = new Array();
            inqText[0]    = new Array();
            inqText[0][0] = "기준년월";
            inqText[0][1] = document.frm.basemonth.options[document.frm.basemonth.selectedIndex].text;
			inqText[1]    = new Array();
            inqText[1][0] = "상품구분";
            inqText[1][1] = document.frm.productgubun.options[document.frm.productgubun.selectedIndex].text;
			inqText[2]    = new Array();
            inqText[2][0] = "대분류";
            inqText[2][1] = document.frm.bgubun.options[document.frm.bgubun.selectedIndex].text;
			inqText[3]    = new Array();
            inqText[3][0] = "중분류";
            inqText[3][1] = document.frm.mgubun.options[document.frm.mgubun.selectedIndex].text;
            // 보안등급세팅
            seqLevel = document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[4]    = new Array();
                inqText[4][0] = "보안등급";
                inqText[4][1] = document.frm.Security_Level.value;
            }
             
            doExcel(mySheet, inqText, true); //common.js 활용하여 excel 출력
            break;      
	}
}
