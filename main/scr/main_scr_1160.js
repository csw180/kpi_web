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
//main_scr_1160.js
function LoadPage()
{
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj"), 150));	// 고객관리자 data
	createIBSheet2(  document.getElementById("aclSheetObj"),"aclSheet", "100%", getDefaultHeight($("#sheetObj"), 150));	// 고객관리자제외계좌 date
	createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");	// 기준년월
	createIBSheet2(  document.getElementById("hiddenGridObj1"),"hiddenGrid1", "200px", "400px");	// 확정해제
	createIBSheet2(  document.getElementById("hiddenGridObj2"),"hiddenGrid2", "200px", "400px");	// 점번호를 이용해 점명 가져오기

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
   

    // Hidden GRID에 대한 속성정보 설정
	hiddenGrid2.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"HIDDEN", Align:"Center"} ];
   	hiddenGrid2.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
   	hiddenGrid2.InitColumns(cols);
   	hiddenGrid2.SetEditable(0);
	hiddenGrid2.SetVisible(0);

    
    // 상위 GRID에 대한 속성정보 설정
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"비고|고객관리자코드|소속점번호|성명|발령일|종료일|RM점번호", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",      Hidden:0,  MinWidth:50,   Align:"Center",  SaveName:"v_sv_0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:6 },
             {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Center",  SaveName:"RMCODE",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:6 },
             {Type:"Text",      Hidden:0,  MinWidth:60,   Align:"Center",  SaveName:"v_sv_2",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
             {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Center",   SaveName:"v_sv_3",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
             {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Center",  SaveName:"v_sv_4",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
             {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Center",  SaveName:"v_sv_5",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
             {Type:"Text",      Hidden:0,  MinWidth:60,   Align:"Center",  SaveName:"v_sv_6",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:5 } ];
    
   	mySheet.InitColumns(cols);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetCountPosition(1);
   	mySheet.FitSize(false, true);


    // 상위 GRID에 대한 속성정보 설정
   	aclSheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"고객관리자코드|소속점번호|계좌번호|발령일|종료일|RM번호", Align:"Center"} ];
   	aclSheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"sub0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"sub1",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
             {Type:"Text",      Hidden:0,  MinWidth:130,  Align:"Right",   SaveName:"계좌번호",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
             {Type:"Text",      Hidden:1, MinWidth:130,  Align:"Center",  SaveName:"sub2",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:8 },
             {Type:"Text",      Hidden:1, MinWidth:130,  Align:"Center",  SaveName:"sub2",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:8 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"sub2",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:5 } ];
    
   	aclSheet.InitColumns(cols);

   	aclSheet.SetEditable(0);
   	aclSheet.SetVisible(1);
	aclSheet.SetActionMenu("계좌엑셀내려받기");
   	aclSheet.FitSize(false, true);
	aclSheet.SetCountPosition(1);
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
    rmcode     = document.frm.rmcode.value;
    jumcode    = document.frm.jumcode.value;
    jumname    = document.frm.jumname.value;
    stdate     = document.frm.stdate.value;
    enddate    = document.frm.enddate.value;
    aclist     = document.frm.aclist.value;
    RMjum      = document.frm.RMjum.value;

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
        case "조회":                    // 조회
             if(aclist.length > 0) {
                doAction('계좌조회');	
                break;
             }
             mySheet.DoSearch("main.scr.main_scr_1161.do?hidden_key=9&basemonth=" + basemonth); 
             break;

        case "계좌조회":                 // 고객관리자 제외 계좌 조회
             // 전체를 조회
             aclSheet.DoSearch("main.scr.main_scr_1161.do?hidden_key=9"
                                                         +"&basemonth=" + basemonth 
                                                         +"&rmcode=9999999999"     // 고객관리자제외 계좌리스트 전체 
                                                         +"&aclist=99999999999999999999" // 이렇게 하는이유는 Class에서 프로지셔 호출시 비교하기 위함
                                                         ); 
             //aclSheet.FitSize(false, true);
             isEnableSave        = true;
             break;
            
        case "엑셀내려받기":            // 엑셀내려받기
             inqText       = new Array();
             inqText[0]    = new Array();
             inqText[0][0] = "기준일자";
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

                                 
            if(rmcode == "")
            {
              alert("고객관리자코드는 필수입니다.");
              return;
            }
            if(jumcode == "" || jumname == "")
            {
              alert("점번호는 필수입니다.");
              return;
            }
             if(stdate == "")
            {
              alert("발령일 입력하세요");
              return;
            }

            if(aclist.length > 0) {
               // 고객관리자 제외계좌번호 등록   
               aclSheet.DoSearch("main.scr.main_scr_1161.do?hidden_key=1"
                                                             +"&basemonth="+basemonth
                                                             +"&rmcode="+rmcode
                                                             +"&RMjum="+RMjum
                                                             +"&jumcode="+jumcode
                                                             +"&aclist="+aclist
                                                             ); 
                //doAction('계좌조회');
               
            } else {
               // 고객관리자코드 등록
               mySheet.DoSearch("main.scr.main_scr_1161.do?hidden_key=1"
                                                             +"&basemonth="+basemonth
                                                             +"&rmcode="+rmcode
                                                             +"&jumcode="+jumcode
                                                             +"&stdate="+stdate
                                                             +"&enddate="+enddate
                                                             +"&aclist="+aclist
                                                             ); 
               //doAction('조회');

            }	                                                          

            break;
        
        case "변경":                                                           //변경
            if(rmcode == "")
            {
              alert("고객관리자코드는 필수입니다.");
              return;
            }
            if(jumcode == "")
            {
              alert("점번호는 필수입니다.");
              return;
            }
            
            // 아직 변경부분은 수정하지 않았음
            if(aclist.length > 0) {
               // 고객관리자 제외계좌번호 변경
               
              
               aclSheet.DoSearch("main.scr.main_scr_1161.do?hidden_key=2"
                                                             +"&basemonth="+basemonth
                                                             +"&rmcode="+rmcode
                                                             +"&RMjum="+RMjum
                                                             +"&jumcode="+jumcode
                                                             +"&aclist="+aclist
                                                             +"&oldrmcode="+aclSheet.GetCellValue(v_selrow, 0)
                                                             +"&oldrmjum="+aclSheet.GetCellValue(v_selrow, 5) 
                                                             +"&oldjumcode="+aclSheet.GetCellValue(v_selrow, 1)
                                                             +"&oldaclist="+aclSheet.GetCellValue(v_selrow, 2)); 
                //doAction('계좌조회');
               
               
            } else {
               // 고객관리자코드 변경
               mySheet.DoSearch("main.scr.main_scr_1161.do?hidden_key=2"
                                                             +"&basemonth="+basemonth
                                                             +"&rmcode="+rmcode
                                                             +"&jumcode="+jumcode
                                                             +"&stdate="+stdate
                                                             +"&enddate="+enddate
                                                             +"&aclist="+aclist
                                                             +"&oldrmcode="+mySheet.GetCellValue(v_selrow, 1)
                                                             +"&oldjumcode="+mySheet.GetCellValue(v_selrow, 2)); 
               //doAction('조회');                                                          
               
            }   

            break;
        
        case "삭제":   
            if(rmcode == "")
            {
              alert("고객관리자코드는 필수입니다.");
              return;
            }
            if(jumcode == "")
            {
              alert("점번호는 필수입니다.");
              return;
            }

            if(aclist.length > 0) {
               // 고객관리자 제외계좌번호 삭제
                aclSheet.DoSearch("main.scr.main_scr_1161.do?hidden_key=3"
                                                              +"&basemonth="+basemonth
                                                              +"&rmcode="+rmcode
                                                              +"&RMjum="+RMjum
                                                              +"&jumcode="+jumcode
                                                              +"&aclist="+aclist
                                                              ); 
                //doAction('계좌조회');                                                          
            } else {
                mySheet.DoSearch("main.scr.main_scr_1161.do?hidden_key=3"
                                                              +"&basemonth="+basemonth
                                                              +"&rmcode="+rmcode
                                                              +"&jumcode="+jumcode
                                                              +"&stdate="+stdate
                                                              +"&enddate="+enddate
                                                              +"&aclist="+aclist
                                                              +"&RMjum="+RMjum
                                                              ); 
                //doAction('조회');                                                          
            }

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

/*---------------------------------------------
 @기능 - 입력가능여부에 따른 버튼 컨트롤
----------------------------------------------*/
function InputButtControl(chk)
{
	
	 if (v_inChk==1 ) v_okChkTxt="확인완료";
      else v_okChkTxt="확인하세요";
    document.frm.inchkname.value = v_okChkTxt;

    // DB값이 확정일경우 chk값을 변경
    if (v_inChk == 1) chk = 2;
    // 입력가능시 초기화면 or 확정취소시
    if (chk==1) {
       butt1.style.display = "";
       butt2.style.display = "none";
       butt3.style.display = "none";
       document.frm.rmcode.value  = "";
       document.frm.jumcode.value = "";
       document.frm.jumname.value = "";
       document.frm.stdate.value  = "";
       document.frm.enddate.value = "";
       document.frm.aclist.value = "";
       document.frm.RMjum.value = "";
       enableElements();
    
    // 확정시
    } else if (chk==2) {
       butt1.style.display = "none";
       butt2.style.display = "none";
       butt3.style.display = "";
       document.frm.rmcode.value  = "";
       document.frm.jumcode.value = "";
       document.frm.jumname.value = "";
       document.frm.stdate.value  = "";
       document.frm.enddate.value = "";
       document.frm.aclist.value = "";
       document.frm.RMjum.value = "";
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
       hiddenGrid1.DoSearch(encodeURI("comm.scr.comm_scr_9098.screen?hidden_key=1&v_commit=0&scrName=고객관리자코드관리&basemonth="+basemonth));
       //InputButtControl(1);
    // 확정 시킴
    } else if (chk== 2) {
       hiddenGrid1.DoSearch(encodeURI("comm.scr.comm_scr_9098.screen?hidden_key=2&v_commit=1&scrName=고객관리자코드관리&basemonth="+basemonth));
       //InputButtControl(3);
    // 확정취소 시킴
    } else if (chk== 3) {    
       hiddenGrid1.DoSearch(encodeURI("comm.scr.comm_scr_9098.screen?hidden_key=2&v_commit=2&scrName=고객관리자코드관리&basemonth="+basemonth));
       //InputButtControl(1);
    }
}



// 확정취소(btn_list1) 사용자권한이 전산정보부 종수/신기부종수(999/998)권한이고 완료(1) 상태 일때만 표시
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



function popupJumCode(chk)
{
    basemonth = document.frm.basemonth.value;
    win_open2("comm.scr.comm_scr_1010.screen?basemonth="+basemonth+"&searchGubun="+chk, 250, 450);
}

function selectjumname(gubun)
{
    basemonth   = document.frm.basemonth.value;
    v_jumcode   = document.frm.jumcode.value;
    hiddenGrid2.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=1&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
}


/*---------------------------------------------
 @기능 - 해당 Elements들을 Enable시킨다.
----------------------------------------------*/
function enableElements()
{
    document.frm.rmcode.disabled          = false;
    document.frm.jumcode.disabled         = false;
    document.frm.jumname.disabled         = false;  
    document.frm.stdate.disabled          = false;
    document.frm.enddate.disabled         = false;
//    document.frm.aclist.disabled          = false;
}

/*---------------------------------------------
 @기능 - 해당 Elements들을 Disabled시킨다.
----------------------------------------------*/
function disableElements()
{
    document.frm.rmcode.disabled          = true;
    document.frm.jumcode.disabled         = true;
    document.frm.jumname.disabled         = true;  
    document.frm.stdate.disabled          = true;
    document.frm.enddate.disabled         = true;
    document.frm.aclist.disabled          = true;
}
