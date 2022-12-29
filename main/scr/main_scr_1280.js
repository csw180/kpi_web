var isInitBtnEnable = true;
var isInstBtnEnable = true;
var isMofyBtnEnable = false;
var isDelBrnEnable  = false;
var isExcelBtnEnable= true;
var v_chk = ""; 

/*Sheet 기본 설정 */
//main_scr_1280.js
function LoadPage(){

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
   	hiddenGrid.SetEditable(0);
	hiddenGrid.SetVisible(0);

  
    // 상위 GRID에 대한 속성정보 설정
	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"계좌관리점|계좌관리점명|계정과목코드|계정과목명|계좌번호|고객명|계좌관리점\n인정비율(%)|등록부서|등록일|승인여부|상태", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_1",    CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"v_sv_2",    CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_3",    CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"v_sv_4",    CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_5",    CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_6",    CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"v_sv_7",    CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Combo",     Hidden:0, MinWidth:100,  Align:"Right",   SaveName:"v_sv_8",    CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:1,   InsertEdit:0,   EditLen:2 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"v_sv_9",    CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"CheckBox",  Hidden:0, MinWidth:100,  Align:"Center",  SaveName:"v_sv_10",   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:1,   InsertEdit:0 },
             {Type:"Status",    Hidden:0, MinWidth:100,  Align:"Center",  SaveName:"v_status",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
   	mySheet.InitColumns(cols);

   	mySheet.SetEditable(1);
   	mySheet.SetColProperty(7, {ComboText:"전략사업부|성과현업|전산", ComboCode:"1|2|3"} );
   	mySheet.SetVisible(1);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetCountPosition(1);
	showUnitText("원");

    // 작업기준년월 가져오기
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=4"); 
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

/* Sheet 각종 처리 */
function doAction(sAction)
{
    isSelected  = true;
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
        case "조회":             // 조회(상위 GRID)
            mySheet.DoSearch("main.scr.main_scr_1281.do?hidden_key=9"); 
            break;
            
        case "엑셀내려받기":    // 엑셀내려받기
            inqText       = new Array();
            // 보안등급세팅
            seqLevel = document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[0]    = new Array();
                inqText[0][0] = "보안등급";
                inqText[0][1] = document.frm.Security_Level.value;
            }
             
            doExcel(mySheet, inqText, true); //common.js 활용하여 excel 출력
            break;      
            
        case "초기화":          // 초기화
            
            document.frm.reset();
            isInstBtnEnable = true;
            isMofyBtnEnable = false;
            isDelBrnEnable  = false;
            document.frm.jumcode.disabled    = false;
            document.frm.accountcode.disabled  = false;
            document.frm.accountno.disabled    = false;
            document.all.btn_entry.style.cursor = "pointer" ;
            document.all.image3.style.cursor = "" ;
            document.all.image4.style.cursor = "" ;
            break;   
                       
        case "등록":            // 등록
            
            mySheet.DoSave( "main.scr.main_scr_1281.do?hidden_key=1");
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
       document.all.btn_entry.style.display="";
    // 확정시
    } else if (chk==2) {
       document.all.btn_entry.style.display="none";
    // 조회후 그리드 선택시
    } else if (chk==3) {   
       document.all.btn_entry.style.display="";
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
       hiddenGrid.DoSearch(encodeURI("comm.scr.comm_scr_9098.screen?hidden_key=1&v_commit=0&scrName=외환전문역마케팅계좌승인&basemonth="+basemonth));
       //InputButtControl(1);
    // 확정 시킴
    } else if (chk== 2) {
       hiddenGrid.DoSearch(encodeURI("comm.scr.comm_scr_9098.screen?hidden_key=2&v_commit=1&scrName=외환전문역마케팅계좌승인&basemonth="+basemonth));
       //InputButtControl(3);
    // 확정취소 시킴
    } else if (chk== 3) {    
       hiddenGrid.DoSearch(encodeURI("comm.scr.comm_scr_9098.screen?hidden_key=2&v_commit=2&scrName=외환전문역마케팅계좌승인&basemonth="+basemonth));
       //InputButtControl(1);
    }
}

// 확정취소(btn_list1) 사용자권한이 전산정보부 성과/신기부성과(450/400)권한이고 완료(1) 상태 일때만 표시
// 확정    (btn_list2) 입력완료(2) 상태 일때만 표시
/*---------------------------------------------
 @기능 - 확정/해제 버튼 콘트롤 
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