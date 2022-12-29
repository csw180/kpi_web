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
//main_scr_4030.js
function LoadPage()
{
    createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj"), 100));     // 고객관리자 data
    createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");   // 기준년월 
    createIBSheet2(  document.getElementById("hiddenGridObj1"),"hiddenGrid1", "200px", "400px"); // 확정해제 

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

   	hiddenGrid1.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:1 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"", Align:"Center"} ];
   	hiddenGrid1.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",      Hidden:1, MinWidth:200,  Align:"Left",    ColMerge:1,   SaveName:"NONE" } ];
    
   	hiddenGrid1.InitColumns(cols);

   	hiddenGrid1.SetEditable(0);
   	hiddenGrid1.SetVisible(0);


    // 상위 GRID에 대한 속성정보 설정
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"상태|직원번호|성명|구분", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Status",    Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"v_sv_0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:6 },
             {Type:"Text",      Hidden:0,  MinWidth:150,  Align:"Center",  SaveName:"v_sv_1",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
             {Type:"Text",      Hidden:0,  MinWidth:150,  Align:"Right",   SaveName:"v_sv_2",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:6 },
             {Type:"Combo",     Hidden:0, MinWidth:150,  Align:"Right",   SaveName:"v_sv_3",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:5 } ];
    
   	mySheet.InitColumns(cols);

   	mySheet.SetEditable(0);
   	mySheet.SetColProperty(3, {ComboText:"오류|무기계약직|일반계약직", ComboCode:"0|1|2"} );
   	mySheet.SetVisible(1);
	mySheet.SetCountPosition(1);
	newSetActionMenu(mySheet,"엑셀내려받기");
   	//mySheet.FitSize(false, true);

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
    member     = document.frm.member.value;
    membergb   = document.frm.membergb.value;

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
        case "조회":                    // 조회
             mySheet.DoSearch("main.scr.main_scr_4031.do?hidden_key=9&basemonth=" + basemonth); 
             //mySheet.FitSize(false, true);
             isEnableSave        = true;
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
            if(member == "")
            {
              alert("직원번호 미입력");
              return;
            }
            if(membergb == "")
            {
              alert("구분 미입력");
              return;
            }
            mySheet.DoSearch("main.scr.main_scr_4031.do?hidden_key=1"
                                                          +"&basemonth="+basemonth
                                                          +"&member="+member
                                                          +"&membergb="+membergb
                                                          ); 
            //doAction('조회');                                                          
            
            break;
        
        case "변경":                                                           //변경
            if(mySheet.GetRowStatus(v_selrow) == "I")  // 엑셀 UPLOAD시 
            {
              alert("엑셀 업로드를 저장하시고 변경하세요");
              return;
            }
            if(member == "")
            {
              alert("직원번호 미입력");
              return;
            }
            if(membergb == "")
            {
              alert("구분 미입력");
              return;
            }
            
            mySheet.DoSearch("main.scr.main_scr_4031.do?hidden_key=2"
                                                          +"&basemonth="+basemonth
                                                          +"&member="+member
                                                          +"&membergb="+membergb
                                                          +"&oldmember="+mySheet.GetCellValue(v_selrow, 1)
                                                          +"&oldmembergb="+mySheet.GetCellValue(v_selrow, 3)
                                                          ); 
            //doAction('조회');                                                          
            
            break;
        
        case "삭제":   
            if(mySheet.GetRowStatus(v_selrow) == "I")  // 엑셀 UPLOAD시 
            {
              alert("엑셀 업로드를 저장하시고 삭제하세요");
              return;
            }
            if(member == "")
            {
              alert("직원번호 미입력");
              return;
            }
            if(membergb == "")
            {
              alert("구분 미입력");
              return;
            }
            mySheet.DoSearch("main.scr.main_scr_4031.do?hidden_key=3"
                                                          +"&basemonth="+basemonth
                                                          +"&member="+member
                                                          +"&membergb="+membergb
                                                          ); 
            //doAction('조회');                                                          
            
            break;
        case "엑셀올리기":           // 엑셀올리기
             mySheet.RemoveAll();
             InputButtControl(1);
             mySheet.LoadExcel();
             break;
        case "엑셀저장":             // 엑셀저장
             var Row = mySheet.ColValueDup("1");
             if(Row>-1)
             {
                 alert('[' + Row + ']번째 Row의 데이터가 중복됩니다. 확인 후 거래하십시요.');
                 mySheet.SelectCell(Row, "0");
                 return;
             }
             
             if(fchk) {
                 alert("오류검증을 수정해 주세요");
                 fchk = false;          // 엑셀 업로드시 체크 결과 초기화
                 return;
             }
             
             var sRow     = mySheet.FindStatusRow("I");
             var rowArray = sRow.split(";");             
                                         
             if(rowArray.length-1>0 && !confirm("기존 " + basemonth.substring(0,4) + "년 " + basemonth.substring(4,6) + "월의 모든 데이터는 삭제되고, \n\n" + 
                                              "Excel 업로드된 데이터로 반영되게됩니다.\n\n저장하시겠습니까?"))
             {
                return;
             }
             
//             var isSuccess = mySheet.DoSave("main.scr.main_scr_4031.do?hidden_key=4"
//                                                                  +"&basemonth="+basemonth
//                                                                  +"&member="+member
//                                                                  +"&membergb="+membergb
//                                                                  , "", "", false);

				let strParam = "hidden_key=4"
                                      +"&basemonth="+basemonth
                                      +"&member="+member
                                      +"&membergb="+membergb;

				var isSuccess = mySheet.DoSave("main.scr.main_scr_4031.do", {Param : strParam}); 
 
             if(!isSuccess) return;
             doAction('조회');
             break;
    }
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
       butt1.style.display = "";
       butt2.style.display = "none";
       butt3.style.display = "none";
       document.frm.member.value  = "";
       document.frm.membergb.value  = "";
       enableElements();
    // 확정시
    } else if (chk==2) {
       butt1.style.display = "none";
       butt2.style.display = "none";
       butt3.style.display = "";
       document.frm.member.value  = "";
       document.frm.membergb.value  = "";
       disableElements();
    // 조회후 그리드 선택시
    } else if (chk==3) {   
       butt1.style.display = "none";
       butt2.style.display = "";  
       butt3.style.display = "none";    
       if (v_inChk == 1) disableElements();
       else enableElements();
    }       
    if (v_inChk==1 ) v_okChkTxt="확인완료";
    else v_okChkTxt="확인하세요";
    document.frm.inchkname.value = v_okChkTxt;
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
       hiddenGrid1.DoSearch("kpi.main.main_4032.screen?hidden_key=1&v_commit=0&basemonth="+basemonth);
       //InputButtControl(1);
    // 확정 시킴
    } else if (chk== 2) {
       hiddenGrid1.DoSearch("kpi.main.main_4032.screen?hidden_key=2&v_commit=1&basemonth="+basemonth);
       //InputButtControl(3);
    // 확정취소 시킴
    } else if (chk== 3) {    
       hiddenGrid1.DoSearch("kpi.main.main_4032.screen?hidden_key=2&v_commit=2&basemonth="+basemonth);
       //InputButtControl(1);
    }
    
}

// 확정취소(btn_list1) 사용자권한이 전산정보부 성과/신기부성과(450/400)권한이고 완료(1) 상태 일때만 표시
// 확정    (btn_list2) 입력완료(2) 상태 일때만 표시
/*---------------------------------------------
 @기능 - 버튼 콘트롤 
----------------------------------------------*/
function button_contril(){
  if(v_inChk!=0){
      if(v_manager=="1" ){
          if(v_inChk==1){
              document.all.btn_list1.style.display="none";
              document.all.btn_list2.style.display="";
          }else {
              document.all.btn_list1.style.display="";
              document.all.btn_list2.style.display="none";
          }    
      }else{
          if(v_inChk==1){
              document.all.btn_list1.style.display="none";
              document.all.btn_list2.style.display="";
          }else {
              document.all.btn_list1.style.display="";
              document.all.btn_list2.style.display="none";
          }    
      }
  }
}

/*---------------------------------------------
 @기능 - 해당 Elements들을 Enable시킨다.
----------------------------------------------*/
function enableElements()
{
    document.frm.member.disabled      = false;
    document.frm.membergb.disabled    = false;
}

/*---------------------------------------------
 @기능 - 해당 Elements들을 Disabled시킨다.
----------------------------------------------*/
function disableElements()
{
    document.frm.member.disabled      = true;
    document.frm.membergb.disabled    = true;
}
