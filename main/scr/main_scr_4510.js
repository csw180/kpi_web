var isEnableSave        = false;    // 저장여부 boolean값.
                                    // (초기 화면시 "조회" 버튼을 클릭하지 않고, 바로 Row Insert하는 기능을 막기 위함)
var isCud               = false;    // CUD 상태 변수

/*-------------------------------------------------------*/
/* @기  능 : Grid들의 default attributes을 정의하는 함수 */
/*           (Page Loading시 호출됨)                     */
/* @리턴값 : 없음                                        */
/*-------------------------------------------------------*/
//main_scr_4510.js
function LoadPage()
{
    createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj"), 180));      // 후선보임인력 DATA
    createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");   // 기준년월 

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

    // 상위 GRID에 대한 속성정보 설정
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"구분|직원번호|직원명|부임점번호|발령일|종료일|화면조회권한부여|PG코드|PG명", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Status",    Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"v_sv_0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:6 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"v_sv_1",  KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_2",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:15 },
             {Type:"Text",      Hidden:0,  MinWidth:130,  Align:"Center",  SaveName:"v_sv_3",  KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:8 },
             {Type:"Text",      Hidden:0,  MinWidth:130,  Align:"Center",  SaveName:"v_sv_4",  KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:8 },
             {Type:"Text",      Hidden:0,  MinWidth:130,  Align:"Center",  SaveName:"v_sv_5",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
             {Type:"Text",      Hidden:0,  MinWidth:130,  Align:"Center",  SaveName:"v_sv_6",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
             {Type:"Text",      Hidden:0,  MinWidth:130,  Align:"Center",  SaveName:"v_sv_7",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:2 },
             {Type:"Text",      Hidden:0,  MinWidth:130,  Align:"Center",  SaveName:"v_sv_8",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:20 } ];
    
   	mySheet.InitColumns(cols);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetCountPosition(1);
   	//mySheet.FitSize(false, true);

    doAction("기준년월");
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
    emnm       = document.frm.emnm.value;
    jumcode    = document.frm.jumcode.value;
    stdate     = document.frm.stdate.value;
    enddate    = document.frm.enddate.value;
    bpgcode    = document.frm.bpgcode.value;

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
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=4&stmonth=201407"); 
            break;
        case "조회":                    // 조회
             mySheet.DoSearch("main.scr.main_scr_4511.do?hidden_key=9&basemonth=" + basemonth); 
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

        case "초기화":                  // 초기화
             InputButtControl(1);
             break;   

        case "등록":                    //등록
            if(emnm == "")
            {
              alert("직원번호 미입력");
              return;
            }
            if(jumcode == "")
            {
              alert("점번호 미입력");
              return;
            }
            if(stdate == "")
            {
              alert("발령일 미입력");
              return;
            }
            if(enddate == "")
            {
              alert("종료일 미입력");
              return;
            }
            if(bpgcode == "")
            {
              alert("PG코드 미입력");
              return;
            }

            mySheet.DoSearch("main.scr.main_scr_4511.do?hidden_key=1"
                                                          +"&basemonth="+basemonth
                                                          +"&emnm="+emnm
                                                          +"&jumcode="+jumcode
                                                          +"&stdate="+stdate
                                                          +"&enddate="+enddate
                                                          +"&bpgcode="+bpgcode
                                                          ); 
            //doAction('조회');                                                          
            
            break;
        
        case "변경":                                                           //변경
            if(mySheet.GetRowStatus(v_selrow) == "I")  // 엑셀 UPLOAD시 
            {
              alert("엑셀 업로드를 저장하시고 변경하세요");
              return;
            }
            if(emnm == "")
            {
              alert("직원번호 미입력");
              return;
            }
            if(jumcode == "")
            {
              alert("점번호 미입력");
              return;
            }
            if(stdate == "")
            {
              alert("발령일 미입력");
              return;
            }
            if(enddate == "")
            {
              alert("종료일 미입력");
              return;
            }
            if(bpgcode == "")
            {
              alert("PG코드 미입력");
              return;
            }

            mySheet.DoSearch("main.scr.main_scr_4511.do?hidden_key=2"
                                                          +"&basemonth="+basemonth
                                                          +"&emnm="+emnm
                                                          +"&jumcode="+jumcode
                                                          +"&stdate=" +stdate
                                                          +"&enddate="+enddate
                                                          +"&bpgcode="+bpgcode
                                                          +"&oldemnm="+mySheet.GetCellValue(v_selrow, 1)
                                                          +"&oldjumcode="+mySheet.GetCellValue(v_selrow, 3)
                                                          +"&oldstdate=" +mySheet.GetCellValue(v_selrow, 4)
                                                          +"&oldenddate="+mySheet.GetCellValue(v_selrow, 5)
                                                          +"&oldbpgcode="+mySheet.GetCellValue(v_selrow, 7)
                                                          ); 
            //doAction('조회');                                                          
            
            break;
        
        case "삭제":   
            if(mySheet.GetRowStatus(v_selrow) == "I")  // 엑셀 UPLOAD시 
            {
              alert("엑셀 업로드를 저장하시고 삭제하세요");
              return;
            }
            if(emnm == "")
            {
              alert("직원번호 미입력");
              return;
            }
            if(jumcode == "")
            {
              alert("점번호 미입력");
              return;
            }
            if(stdate == "")
            {
              alert("발령일 미입력");
              return;
            }
            if(enddate == "")
            {
              alert("종료일 미입력");
              return;
            }
            if(bpgcode == "")
            {
              alert("PG코드 미입력");
              return;
            }
            mySheet.DoSearch("main.scr.main_scr_4511.do?hidden_key=3"
                                                          +"&basemonth="+basemonth
                                                          +"&emnm="+emnm
                                                          +"&jumcode="+jumcode
                                                          +"&stdate=" +stdate
                                                          +"&enddate="+enddate
                                                          +"&bpgcode="+bpgcode
                                                          ); 
            //doAction('조회');                                                          
            
            break;
        case "엑셀올리기":           // 엑셀올리기
             mySheet.RemoveAll();
             InputButtControl(1);
             mySheet.LoadExcel();
             break;
        case "엑셀저장":             // 엑셀저장
             var Row = mySheet.ColValueDup("1|3|4");
             if(Row>-1)
             {
                 alert('[' + Row + ']번째 Row의 데이터가 중복됩니다. 확인 후 거래하십시요.');
                 mySheet.SelectCell(Row, "0");
                 return;
             }

             var sRow     = mySheet.FindStatusRow("I");
             var rowArray = sRow.split(";");             
                                         
             if(rowArray.length-1>0 && !confirm("기존 " + basemonth.substring(0,4) + "년 " + basemonth.substring(4,6) + "월의 모든 데이터는 삭제되고, \n\n" + 
                                              "Excel 업로드된 데이터로 반영되게됩니다.\n\n저장하시겠습니까?"))
             {
                return;
             }

			/*             
             var isSuccess = mySheet.DoSave("main.scr.main_scr_4511.do?hidden_key=4"
                                                                    +"&basemonth="+basemonth
                                                                    +"&emnm="+emnm
                                                                    +"&jumcode="+jumcode
                                                                    +"&stdate=" +stdate
                                                                    +"&enddate="+enddate
                                                                    +"&bpgcode="+bpgcode
                                                                    , "", "", false);
			*/ 

			let strParam = "hidden_key=4"
	                                +"&basemonth="+basemonth
	                                +"&emnm="+emnm
	                                +"&jumcode="+jumcode
	                                +"&stdate=" +stdate
	                                +"&enddate="+enddate
	                                +"&bpgcode="+bpgcode;
			var isSuccess = mySheet.DoSave("main.scr.main_scr_4511.do", {Param : strParam} ); 

             if(!isSuccess) return;
              
             break;
    }
}

/*---------------------------------------------
 @기능 - 해당 Elements들을 Enable시킨다.
----------------------------------------------*/
function enableElements()
{
    document.frm.emnm.disabled     = false;
    document.frm.jumcode.disabled  = false;
    document.frm.stdate.disabled   = false;
    document.frm.enddate.disabled  = false;  
    document.frm.bpgcode.disabled  = false;  
}

/*---------------------------------------------
 @기능 - 해당 Elements들을 Disabled시킨다.
----------------------------------------------*/
function disableElements()
{
    document.frm.emnm.disabled     = true;
    document.frm.jumcode.disabled  = true;
    document.frm.stdate.disabled   = true;
    document.frm.enddate.disabled  = true;  
    document.frm.bpgcode.disabled  = true;  
}

/*---------------------------------------------
 @기능 - 입력가능여부에 따른 버튼 컨트롤
----------------------------------------------*/
function InputButtControl(chk)
{
    // 입력가능시 초기화면 or 확정취소시
    if (chk==1) {
       butt1.style.display = "";
       butt2.style.display = "none";
       butt3.style.display = "none";
       document.frm.emnm.value    = "";
       document.frm.jumcode.value = "";
       document.frm.stdate.value  = "";
       document.frm.enddate.value = "";
       document.frm.bpgcode.value = "";
       enableElements();
    // 조회후 그리드 선택시
    } else if (chk==3) {   
       butt1.style.display = "none";
       butt2.style.display = "";  
       butt3.style.display = "none";    
    }       
}