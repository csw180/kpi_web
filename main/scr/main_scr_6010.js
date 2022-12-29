var isEnableSave        = false;    // 저장여부 boolean값.
                                    // (초기 화면시 "조회" 버튼을 클릭하지 않고, 바로 Row Insert하는 기능을 막기 위함)
var underbarKeysValue   = "";       // Grid상에서 status가 Insert(I), Update(U)된 최종 '_' 구분로 조합된 Key값
var isCud               = false;    // CUD 상태 변수
var v_chk = ""; 

/*-------------------------------------------------------*/
/* @기  능 : Grid들의 default attributes을 정의하는 함수 */
/*           (Page Loading시 호출됨)                     */
/* @리턴값 : 없음                                        */
/*-------------------------------------------------------*/
//main_scr_6010.js
function LoadPage()
{
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));	    
    createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");	// 기준년월 
    createIBSheet2(  document.getElementById("hiddenGridObj1"),"hiddenGrid1", "200px", "400px");	// 확정해제 

    // Hidden GRID에 대한 속성정보 설정
   	hiddenGrid.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"HIDDEN", Align:"Center"} ];
   	hiddenGrid.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
   	hiddenGrid.InitColumns(cols);
   	hiddenGrid.SetEditable(0);
	hiddenGrid.SetVisible(0);


	//hiddenGrid1
   	hiddenGrid1.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:1 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"", Align:"Center"} ];
   	hiddenGrid1.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",      Hidden:1, MinWidth:200,  Align:"Left",    ColMerge:1,   SaveName:"NONE" } ];
    
   	hiddenGrid1.InitColumns(cols);

   	hiddenGrid1.SetEditable(0);
   	hiddenGrid1.SetVisible(0);


    // 상위 GRID에 대한 속성정보 설정
	//mySheet
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"상태|작업기준년월|점번호|계정과목코드|SPC명|고객번호|권유수당|권유자직원번호|금액|<영업점평가>\n차감비율(%)|신규일", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Status",    Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"v_status",  KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_1",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:6 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_2",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:13 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_3",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:13 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_4",    CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:13 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_5",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:13 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_6",    CalcLogic:"",   Format:"NullInteger", PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:13 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_7",    CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:13 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_8",    CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:13 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_9",    CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:13 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_10",   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:8 } ];
    
   	mySheet.InitColumns(cols);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
	newSetActionMenu(mySheet,"엑셀내려받기");
   	//mySheet.FitSize(false, true);
	mySheet.SetCountPosition(1);

    doAction("기준년월");
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
/* @기  능 : 날짜변환(YYYYMMDD -> YYYY-MM-DD)         */
/* @리턴값 : 없음                                     */
/*----------------------------------------------------*/
function convDate(obj)
{
    obj.value = obj.value.replace(/-/g, "");

    if(obj.value!="" && obj.value.length==8)
    {    
        var yy    = obj.value.substr(0,4); // 년
    	var mm    = obj.value.substr(4,2); // 월
    	var dd    = obj.value.substr(6,2); // 일
    	
    	obj.value = yy + "-" + mm + "-" + dd;
	}
}


/*----------------------------------------------------*/
/* @기  능 : 날짜 체크함수                            */
/* @리턴값 : 없음                                     */
/*----------------------------------------------------*/
function checkDate(obj) 
{
	var ln    = obj.value.length;
	
    isValid   = true;
    
	if(ln>0 && ln!=10)
	    isValid = false;
	    
	if (ln==10) {
		var yy      = obj.value.substr(0,4); // 년	
		var mm      = obj.value.substr(5,2); // 월
		var dd      = obj.value.substr(8,2); // 일
		var numdays = dayInmonth((mm-1), yy);	
		
		if ((yy<1000)||(dd < 1)||(mm < 1)||(dd > numdays)||(mm > 12)||(isNaN(yy))||(isNaN(mm))||(isNaN(dd))) {
		    isValid = false;
		}
		
		obj.value = yy + "-" + mm + "-" + dd;
	}
	
    if(!isValid)
    {
        alert("[" + obj.title + "]란이 날짜형식에 맞지않습니다.");
		removeHyphen(obj);
		
		return false;
    }	
    
    return true;
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
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=3&jekyocode=4"); 
            break;
        case "조회":                 // 조회
             mySheet.DoSearch("main.scr.main_scr_6011.do?hidden_key=9&basemonth=" + basemonth); 
             break;
            
        case "엑셀내려받기":         // 엑셀내려받기
             inqText       = new Array();
             inqText[0]    = new Array();
             inqText[0][0] = "기준일자";
             inqText[0][1] = document.frm.basemonth.options[document.frm.basemonth.selectedIndex].text;
             /*
			       inqText[1]    = new Array();
             inqText[1][0] = "점명";
             inqText[1][1] = document.frm.jumname.value;
             */
             // 보안등급세팅
             seqLevel = document.frm.Security_Level.value;
             if(seqLevel !=null && seqLevel!='') {
                inqText[1]    = new Array();
                inqText[1][0] = "보안등급";
                inqText[1][1] = document.frm.Security_Level.value;
             }
             
             doExcel(mySheet, inqText, true); //common.js 활용하여 excel 출력
             break;

        case "엑셀올리기":           // 엑셀올리기
            
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
             var Row = mySheet.ColValueDup("1|2|3|5");
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
                    mySheet.SelectCell(i, "1");
                    return;
                }
              
                if(mySheet.GetCellValue(i, 2).substring(0,1)!= '0')
                {
                    alert('점번호 확인 후 다시 Excel 업로드하시기 바랍니다.\n\n ex> 26 -> 0026');
                    mySheet.SelectCell(i, "2");
                    return;
                }

                if(mySheet.GetCellValue(i, 3).length != 8)
                {
                    alert('계정과목코드 확인 후 다시 Excel 업로드하시기 바랍니다.\n\n' +      
                          '(계정과목코드는 8자리입니다.)');
                    mySheet.SelectCell(i, "3");
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
             
             concatPrimaryKeys(mySheet, "1|2|3|5");
             
             //var isSuccess = mySheet.DoSave("main.scr.main_scr_6011.do?hidden_key=1&basemonth=" + basemonth, "", "", false); 
             var isSuccess = mySheet.DoSave("main.scr.main_scr_6011.do", {Param : "hidden_key=1&basemonth=" + basemonth}); 
             if(!isSuccess) return;
             
             break;
            
        case "삭제":                    // 삭제

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

/*---------------------------------------------
 @기능 - 입력가능여부에 따른 버튼 컨트롤
----------------------------------------------*/
function InputButtControl(chk)
{
    // DB값이 확정일경우 chk값을 변경
    if (v_inChk == 1) chk = 2;
    // 입력가능시 초기화면 or 확정취소시
    if (chk==1) {
       document.all.btn_upload.style.display="";
       document.all.btn_entry.style.display="";
    // 확정시
    } else if (chk==2) {
       document.all.btn_upload.style.display="none";
       document.all.btn_entry.style.display="none";
    // 조회후 그리드 선택시
    } else if (chk==3) {   
       document.all.btn_upload.style.display="";
       document.all.btn_entry.style.display="";
    }       
    if (v_inChk==1 ) v_okChkTxt="등록완료";
    else v_okChkTxt="등록하세요";
    document.all.inchkname.value = v_okChkTxt;
}

/*---------------------------------------------
 @기능 - 확정 해제 관리
----------------------------------------------*/
function selectcommit(chk)
{
	v_chk = chk;
    basemonth  = document.frm.basemonth.value;

    // 확정(0 = 없음,1 = 확정,2 = 확정취소)
    // 확정여부 조회
    if (chk== 1) {
       hiddenGrid.DoSearch(encodeURI("comm.scr.comm_scr_9098.screen?hidden_key=1&v_commit=0&scrName=SPC수탁업무수수료&basemonth="+basemonth));
       //InputButtControl(1);
    // 확정 시킴
    } else if (chk== 2) {
       hiddenGrid.DoSearch(encodeURI("comm.scr.comm_scr_9098.screen?hidden_key=2&v_commit=1&scrName=SPC수탁업무수수료&basemonth="+basemonth));
       //InputButtControl(3);
    // 확정취소 시킴
    } else if (chk== 3) {    
       hiddenGrid.DoSearch(encodeURI("comm.scr.comm_scr_9098.screen?hidden_key=2&v_commit=2&scrName=SPC수탁업무수수료&basemonth="+basemonth));
       //InputButtControl(1);
    }
}

/*------------------------------------------*/
 // 확정취소(btn_list1) 사용자권한이 전산정보부 종수/신기부종수(999/998)권한이고 완료(1) 상태 일때만 표시
// 확정    (btn_list2) 입력완료(2) 상태 일때만 표시
/*---------------------------------------------
 @기능 - 버튼 콘트롤 
----------------------------------------------*/
// 최종수정 20080502 (확정/취소 버튼 핸들링은 이소소로 할것

function button_contril(){
  // v_inChk = 1 이면 등록완료
  // v_inChk (0 = 없음,1 = 확정,2 = 확정취소)
  if(v_inChk!=1){
      document.all.btn_list1.style.display="";
      document.all.btn_list2.style.display="none";
  }else if(v_inChk==1){
      // 확정취소 권한을 가지고 있다면
      if(v_manager=="1" ){
         document.all.btn_list1.style.display="none";
         document.all.btn_list2.style.display="";
      // 확정취소 권한이 없으면
      }else{
          document.all.btn_list1.style.display="none";
          document.all.btn_list2.style.display="none";
      }
  }
}


