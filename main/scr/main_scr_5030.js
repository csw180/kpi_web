var isEnableSave        = false;    // 저장여부 boolean값.
                                    // (초기 화면시 "조회" 버튼을 클릭하지 않고, 바로 Row Insert하는 기능을 막기 위함)
var underbarKeysValue   = "";       // Grid상에서 status가 Insert(I), Update(U)된 최종 '_' 구분로 조합된 Key값
var isCud               = false;    // CUD 상태 변수

/*-------------------------------------------------------*/
/* @기  능 : Grid들의 default attributes을 정의하는 함수 */
/*           (Page Loading시 호출됨)                     */
/* @리턴값 : 없음                                        */
/*-------------------------------------------------------*/
//main_scr_5030.js
function LoadPage()
{
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
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


    // 상위 GRID에 대한 속성정보 설정
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"상태|작업기준년월|평가반영월|계좌번호|계정과목코드|IS계정과목코드|세목|권유자번호|인정수익|이익구분|추가여부|평가대상구분", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Status",    Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"v_status",  KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_1",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:6 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_2",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:6 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_3",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_4",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:8 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_5",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:8 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_6",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:3 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"v_sv_7",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
             {Type:"Int",       Hidden:0,  MinWidth:130,  Align:"Right",   SaveName:"v_sv_8",    CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Combo",     Hidden:0, MinWidth:100,  Align:"Right",   SaveName:"v_sv_9",    CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:1 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_10",   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:2 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"v_sv_11",   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:3 } ];
    
   	mySheet.InitColumns(cols);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetColProperty(9, {ComboText:"이자|비이자", ComboCode:"1|2"} );
   	newSetActionMenu(mySheet,"엑셀내려받기");
   	//mySheet.FitSize(false, true);
	mySheet.SetCountPosition(1);
	showUnitText("원");
    doAction("기준년월");
}

/*---------------------------------------------
@기능 : 해당 항목의 '-'값을 삭제하는 함수
----------------------------------------------*/            
function removeHyphen(obj)
{           
    obj.value = obj.value.replace(/-/g, "");
    obj.select();
} 

/*---------------------------------------------
@기능 : 숫자만 입력가능 함수
----------------------------------------------*/            
function onlyNumberKeyUp(obj)
{   
    val = obj.value; 
    new_val = ''; 
    for(i=0;i<val.length;i++) { 
        char = val.substring(i,i+1); 
        if(char<'0' || char>'9') { 
            obj.value = new_val; 
            return; 
        } else { 
            new_val = new_val + char; 
        } 
    } 
} 

function ComboValue(el)
{
    for(i=1;i<=hiddenGrid.GetTotalRows();i++){
       var oOption = document.createElement("OPTION");
       oOption.text = hiddenGrid.GetCellValue(i, 1);
       oOption.value = hiddenGrid.GetCellValue(i, 0);
       el.options.add(oOption);
    }
}

/*----------------------------------------------------*/
/* @기  능 : 각 Button action별 처리하는 함수         */
/* @리턴값 : 없음                                     */
/*----------------------------------------------------*/
function doAction(sAction)
{
    basemonth  = document.frm.basemonth.value;
                 
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
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=4&stmonth=201307"); 
            break;
        case "조회":                    // 조회
             mySheet.DoSearch("main.scr.main_scr_5031.do?hidden_key=9&basemonth=" + basemonth); 
			 showUnitText("원");
             break;
            
        case "엑셀내려받기":            // 엑셀내려받기
             inqText       = new Array();
             inqText[0]    = new Array();
             inqText[0][0] = "기준년월";
             inqText[0][1] = document.frm.basemonth.options[document.frm.basemonth.selectedIndex].text;
             // 보안등급세팅
             seqLevel = document.frm.Security_Level.value;
             if(seqLevel !=null && seqLevel!='') {
                inqText[1]    = new Array();
                inqText[1][0] = "보안등급";
                inqText[1][1] = document.frm.Security_Level.value;
             }
            
             doExcel(mySheet, inqText, true); //common.js 활용하여 excel 출력
             break;

        case "엑셀올리기":              // 엑셀올리기
             
/*
             var sRow     = mySheet.FindStatusRow("I");
             var rowArray = sRow.split(";");
             for(i=0; i<rowArray.length; i++)
             {
                mySheet.RowDelete(1, false);
             }
*/
			mySheet.RemoveAll();                        
            mySheet.LoadExcel();
			showUnitText("원");
            break;      
                         
        case "초기화":                  // 초기화
             var sRow     = mySheet.FindStatusRow("I|U|D");
             var rowArray = sRow.split(";");
             for(i=0; i<rowArray.length; i++)
             {
                mySheet.ReturnData(rowArray[i]);
             }
             mySheet.CheckAll(1, 0);
             break;   
                       
        case "저장":                    // 저장
             var Row = mySheet.ColValueDup("1|2|3|4|5|6|7");
             if(Row>-1)
             {
                 alert('[' + Row + ']번째 Row의 데이터가 중복됩니다. 확인 후 거래하십시요.');
                 mySheet.SelectCell(Row, "0");
                 return;
             }
             
             for(i=1; i<=mySheet.RowCount(); i++)
             {
                if(mySheet.GetCellValue(i, 1)!=basemonth)
                {
                    alert('선택하신 작성기준년월(' + basemonth.substring(0,4) + '년 ' + basemonth.substring(4,6) + '월)과 [' + i + ']번째의 Row의 작성기준년월(' + mySheet.GetCellValue(i, 1).substring(0,4) + '년 ' + mySheet.GetCellValue(i, 1).substring(4,6) + '월)이 다릅니다.\n\n' +      
                          '확인 후 다시 Excel 업로드하시기 바랍니다.');
                    mySheet.SelectCell(i, "2");
                    return;
                }
             }
             
             var sRow     = mySheet.FindStatusRow("I");
             var rowArray = sRow.split(";");             
                                         
             if(rowArray.length-1>0 && !confirm("기존 " + basemonth.substring(0,4) + "년 " + basemonth.substring(4,6) + "월의 모든 데이터는 삭제되고, \n\n" + 
                                              "Excel 업로드된 데이터로 반영되게됩니다.\n\n등록하시겠습니까?"))
             {
                return;
             }
             
             
             //var isSuccess = mySheet.DoSave("main.scr.main_scr_5031.do?hidden_key=2&basemonth=" + basemonth, "", "", false); 
             var isSuccess = mySheet.DoSave("main.scr.main_scr_5031.do", {Param : "hidden_key=2&basemonth=" + basemonth}); 
             if(!isSuccess) return;
             
             break;
    }
}


/*---------------------------------------------
@기능 : 문자열에 숫자가 아닌 다른 문자가 있는지
        체크하는 함수
----------------------------------------------*/            
function isNumbers(obj)
{   
    var val     = obj; 
    var new_val = ''; 
    
    for(i=0; i<val.length; i++) { 
        
        char = val.substring(i,i+1); 
        
        if(char<'0' || char>'9') { 
            return false;
        } 
    }
    
    return true;
}
