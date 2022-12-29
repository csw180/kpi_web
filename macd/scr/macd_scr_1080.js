
var isInitBtnEnable = true;
var isInstBtnEnable = true;
var isMofyBtnEnable = false;
var isDelBrnEnable  = false;
var isExcelBtnEnable= true;
var detailcode      = "";

//CUD 상태 변수
var isCud = false;

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
  
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", getDefaultWidth($("#sheetObj")), getDefaultHeight($("#sheetObj")));
	createIBSheet2(  document.getElementById("sheetObj1"),"mySheet1", "790px", "400px");
	createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "200px");
  
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
	mySheet.SetConfig( { SearchMode:2, MergeSheet:1, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"상태|삭제|제목여부|상세번호|가중치|세부항목명", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Status",    Hidden:0, MinWidth:0,    Align:"Center",  SaveName:"Status" },
             {Type:"DelCheck",  Hidden:0, MinWidth:0,    Align:"Center",  SaveName:"delcheck" },
             {Type:"CheckBox",  Hidden:0, MinWidth:100,  Align:"Center",  SaveName:"titlechk" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"detailno1" },
             {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   SaveName:"weight",      CalcLogic:"",   Format:"Integer",     PointCount:0,    DecimalAdjust:1, UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"detailname" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   SaveName:"detailno",    CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 } ];
    
   	mySheet.InitColumns(cols);

   	mySheet.SetEditable(1);
   	mySheet.SetVisible(1);
	mySheet.SetDataLinkMouse(0,1);
   	newSetActionMenu(mySheet,"엑셀내려받기");

  	// 상위 GRID에 대한 속성정보 설정
   	mySheet1.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"상태|1.매우미흡|2.미흡|3.보통|4.우수|5.매우우수", Align:"Center"} ];
   	mySheet1.InitHeaders(headers, info);

   	var cols = [ {Type:"Status",    Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"Status",  Wrap:1 },
             {Type:"Text",     Hidden:0,  MinWidth:156,  Align:"Left",    SaveName:"grid1",   Wrap:1 },
             {Type:"Text",     Hidden:0,  MinWidth:156,  Align:"Left",    SaveName:"grid2",   Wrap:1 },
             {Type:"Text",     Hidden:0,  MinWidth:156,  Align:"Left",    SaveName:"grid3",   Wrap:1 },
             {Type:"Text",     Hidden:0,  MinWidth:156,  Align:"Left",    SaveName:"grid4",   Wrap:1 },
             {Type:"Text",     Hidden:0,  MinWidth:156,  Align:"Left",    SaveName:"grid5",   Wrap:1 } ];
    
   	mySheet1.InitColumns(cols);

   	mySheet1.SetEditable(1);
   	mySheet1.SetVisible(1);
	mySheet1.SetDataRowHeight(80);
   	mySheet1.SetActionMenu("엑셀내려받기");

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
function selectjum()
{
    basemonth   = document.frm.basemonth.value;
    v_jumcode   = document.frm.jumcode.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=1&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
}
function selectjumname()
{
    hiddenGrid  = document.frm.hiddenGrid;
    basemonth   = document.frm.basemonth.value;
    v_jumcode   = document.frm.jumcode.value;
    if(v_jumcode != '') hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=2&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
	else document.frm.jumname.value = '';
}
function selectkpiname()
{
    basemonth   = document.frm.basemonth.value;
    v_kpicode   = document.frm.v_kpicode.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=3&basemonth="+basemonth+"&v_kpicode="+v_kpicode);
}
function popupJumCode()
{
    basemonth = document.frm.basemonth.value;
    win_open2("comm.scr.comm_scr_1010.screen?basemonth="+basemonth+"&searchGubun=1", 250, 450);
}
function popupKpiCode()
{
    basemonth = document.frm.basemonth.value;
    win_open2("comm.scr.comm_scr_1020.screen?basemonth="+basemonth+"&searchGubun=0", 330, 450);
}
/* Sheet 각종 처리 */
function doAction(sAction)
{
    f = document.frm;
    isSelected  = true;
    basemonth   = f.basemonth.value;
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
        case "조회1":             // 조회(상위 GRID)
            if(f.v_kpicode.value ==""){
                alert("KPI코드를 입력하지 않았습니다.");
                return;
            }
            if(f.jumcode.value==""){
                alert("점번호를 입력하지 않았습니다.");
		         		document.frm.jumcode.focus();
                return;
            }
            if(f.teamcode.selectedIndex==0){
                alert("팀코드를 선택하지 않았습니다.");
				        document.frm.teamcode.focus();
                return;
            }
           mySheet.DoSearch("macd.scr.macd_scr_1081.do?hidden_key=9"
                                    + "&basemonth=" + basemonth
                                    + "&v_kpicode=" + f.v_kpicode.value 
                                    + "&v_jumcode=" + f.jumcode.value 
                                    + "&teamcode="  + f.teamcode.value 
                                    + "&detailcode=0"
                                   ); 
            mySheet.FitSize(false, true);
            break;
        case "조회2":             // 조회(상위 GRID)
            mySheet1.DoSearch("macd.scr.macd_scr_1081.do?hidden_key=8"
                                    + "&basemonth="   + basemonth
                                    + "&v_kpicode="   + f.v_kpicode.value 
                                    + "&v_jumcode="   + f.jumcode.value 
                                    + "&teamcode="    + f.teamcode.value
                                    + "&detailcode="  + detailcode
                              ); 
            mySheet1.FitSize(true, false);
            break;
            
        case "삽입":             //입력
            var Row = mySheet.DataInsert();
            break;
        
		case "삭제" :
			mySheet.SetRowStatus(mySheet.GetSelectRow(),"D"); break;

        case "엑셀내려받기":     // 엑셀내려받기
            inqText = new Array();
            inqText[0]    = new Array();
            inqText[0][0] = "기준년월";
            inqText[0][1] = document.frm.basemonth.options[document.frm.basemonth.selectedIndex].text;
            inqText[1]    = new Array();
            inqText[1][0] = "점명";
            inqText[1][1] = document.frm.jumname.value;
            inqText[2]    = new Array();
            inqText[2][0] = "팀코드";
            inqText[2][1] = document.frm.teamcode.options[document.frm.teamcode.selectedIndex].text;
            inqText[3]    = new Array();
            inqText[3][0] = "KPI코드/명";
            inqText[3][1] = document.frm.v_kpicode.value+"["+document.frm.v_kpiname.value+"]";
            inqText[4]    = new Array();
            inqText[4][0] = "평가주체";
            inqText[4][1] = document.frm.ratingmain.value;
            // 보안등급세팅
            seqLevel = document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[5]    = new Array();
                inqText[5][0] = "보안등급";
                inqText[5][1] = document.frm.Security_Level.value;
            }
             
            doExcel(mySheet, inqText, true); //common.js 활용하여 excel 출력
            break;      
        case "저장1":            // 변경
            sum = 0;						
			      for(i=1; i<=mySheet.RowCount(); i++){              			  
              if(mySheet.GetCellValue(i,1) != 1){
                sum += parseInt(mySheet.GetCellValue(i,4));
			      }
			}
            			
			if(100 != parseInt(sum)){
                alert('입력된 가중치의 합은 ' + sum + ' 입니다  \n\n가중치의 합을 100으로 조정하세요') ;
                mySheet.SelectCell(1, 4);
				return;
			}

            mySheet.DoSave("macd.scr.macd_scr_1081.do?hidden_key=1"
                                    + "&basemonth="   + basemonth
                                    + "&v_kpicode="   + f.v_kpicode.value 
                                    + "&v_jumcode="   + f.jumcode.value 
                                    + "&teamcode="    + f.teamcode.value
                                   )
			isCud = true;
			doAction('조회1');
            break;
        case "저장2":            // 변경
            mySheet1.DoSave("macd.scr.macd_scr_1081.do?hidden_key=2"
                                    + "&basemonth="   + basemonth
                                    + "&v_kpicode="   + f.v_kpicode.value 
                                    + "&v_jumcode="   + f.jumcode.value 
                                    + "&teamcode="    + f.teamcode.value
                                    + "&detailcode="  + detailcode
                                    + "&grid1="       + mySheet1.GetCellValue(1,1)
                                    + "&grid2="       + mySheet1.GetCellValue(1,2)
                                    + "&grid3="       + mySheet1.GetCellValue(1,3)
                                    + "&grid4="       + mySheet1.GetCellValue(1,4)
                                    + "&grid5="       + mySheet1.GetCellValue(1,5)
                                   )
			isCud = true;
			doAction('조회2');
            break;
    }
}

