var underbarKeysValue   = "";       // Grid상에서 status가 Insert(I), Update(U)된 최종 '_' 구분로 조합된 Key값
var isCud               = false;    // CUD 상태 변수

/*-------------------------------------------------------*/
/* @기  능 : Grid들의 default attributes을 정의하는 함수 */
/*           (Page Loading시 호출됨)                     */
/* @리턴값 : 없음                                        */
/*-------------------------------------------------------*/
//main_scr_1340.js
function LoadPage()
{
    createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
    
	// 상위 GRID에 대한 속성정보 설정
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"상태|기준일|점번호|실적", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Status",    Hidden:0, MinWidth:100,  Align:"Center",  SaveName:"v_status",  KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_1",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:8 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_2",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
             {Type:"Float",     Hidden:0,  MinWidth:130,  Align:"Right",   SaveName:"v_sv_3",    CalcLogic:"",   Format:"NullFloat",   PointCount:4,   UpdateEdit:0,   InsertEdit:0,   EditLen:15 } ];
    
   	mySheet.InitColumns(cols);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
	newSetActionMenu(mySheet,"엑셀내려받기");
   	mySheet.FitSize(false, true);
	mySheet.SetCountPosition(1);
}

/*----------------------------------------------------*/
/* @기  능 : Grid status가 I, U인 row들중 첫번째에    */
/*           대한 key값을 '_'구분자로 만들어 준다.    */
/* @리턴값 : 없음                                     */
/*----------------------------------------------------*/
function concatPrimaryKeys(targetGrid, primaryKeys)
{
    var sRow     = targetGrid.FindStatusRow("I|U");
    var rowArray = sRow.split(";");
    
    if(rowArray!=null && rowArray!="" && rowArray.length>0)
    {
        var keyArray      = primaryKeys.split("|");
        underbarKeysValue = "";
        
        for(i=0; i<keyArray.length; i++)
        {
            underbarKeysValue += targetGrid.GetCellValue(rowArray[0], keyArray[i]).toString().replace(/(^ *)|( *$)/g, "") + "_";
        }
        
        underbarKeysValue = underbarKeysValue.substring(0, underbarKeysValue.length-1);
    }
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

/*----------------------------------------------------*/
/* @기  능 : 각 Button action별 처리하는 함수         */
/* @리턴값 : 없음                                     */
/*----------------------------------------------------*/
function doAction(sAction)
{
    baseday    = document.frm.baseday.value;
    kpicode    = document.frm.kpicode.value;
                 
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
        case "조회":                    // 조회
             if(baseday == "") {
                 alert("기준일 미입력");
                 return;
             }
             mySheet.DoSearch("main.scr.main_scr_1341.do?hidden_key=9&baseday=" + baseday + "&kpicode=" + kpicode);
             //mySheet.CheckAll(1) = 0;
             break;

        case "엑셀내려받기":            // 엑셀내려받기
             inqText       = new Array();
             inqText[0]    = new Array();
             inqText[0][0] = "기준일";
             inqText[0][1] = document.frm.baseday.value;
             inqText[1]    = new Array();
             inqText[1][0] = "실적선택";
             inqText[1][1] = document.frm.kpicode.options[document.frm.kpicode.selectedIndex].text;
             // 보안등급세팅
             seqLevel = document.frm.Security_Level.value;
             if(seqLevel !=null && seqLevel!='') {
                inqText[2]    = new Array();
                inqText[2][0] = "보안등급";
                inqText[2][1] = document.frm.Security_Level.value;
             }
            
             doExcel(mySheet, inqText, true); //common.js 활용하여 excel 출력
             break;

        case "엑셀올리기":              // 엑셀올리기
             mySheet.RemoveAll();
             mySheet.LoadExcel();
             break;      
                       
        case "저장":                    // 저장
             if(baseday == "") {
                 alert("기준일 미입력");
                 return;
             }

             var Row = mySheet.ColValueDup("1|2");
             if(Row>-1)
             {
                 alert('[' + Row + ']번째 Row의 데이터가 중복됩니다. 확인 후 거래하십시요.');
                 mySheet.SelectCell(Row, "0");
                 return;
             }

             var sRow     = mySheet.FindStatusRow("I");
             var rowArray = sRow.split(";");             

             if(rowArray.length-1>0 && !confirm("기존 " + baseday + "일의 모든 " + document.frm.kpicode.options[document.frm.kpicode.selectedIndex].text + " 데이터는 삭제되고, \n\n" 
                                               +"Excel 업로드된 실적으로 반영되게됩니다.\n\n등록하시겠습니까?"))
             {
                return;
             }

             concatPrimaryKeys(mySheet, "1|2");

             //var isSuccess = mySheet.DoSave("main.scr.main_scr_1341.do?hidden_key=1&baseday=" + baseday + "&kpicode=" + kpicode, "", "", false);
             var isSuccess = mySheet.DoSave("main.scr.main_scr_1341.do", {Param : "hidden_key=1&baseday=" + baseday + "&kpicode=" + kpicode});

             if(!isSuccess) return;

             break;
    }
}
