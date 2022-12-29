
var isInitBtnEnable = true;
var isInstBtnEnable = true;
var isMofyBtnEnable = false;
var isDelBrnEnable  = false;
var isExcelBtnEnable= true;

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

	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");
  
  	// Hidden GRID에 대한 속성정보 설정
    //hiddenGrid
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
	//mySheet
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"작업기준년월|KPI코드|KPI명|KPI정의내용|KPI구분|성과관리구분|출력순서|사용여부|평가주기|상한점수|하한점수|기준점수|목표부여여부|목표방향|상하향지표여부|점수화유형|소숫점자리수|화면ID|등록직원번호|등록일|출력순서", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",      Hidden:0,  MinWidth:90,  Align:"Center",    SaveName:"작업기준년월",    CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:70,  Align:"Center",  SaveName:"KPI코드",     CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:230,  Align:"Left",    SaveName:"KPI명",      CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:230,  Align:"Left",    SaveName:"KPI정의내용",   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"KPI구분",     CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:130,  Align:"Center",  SaveName:"성과관리구분",    CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"출력순서",      CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:60,  Align:"Center",   SaveName:"사용여부",      CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:60,  Align:"Center",  SaveName:"평가주기",      CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:60,  Align:"Right",   SaveName:"상한점수",      CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:60,  Align:"Right",   SaveName:"하한점수",      CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:60,  Align:"Right",   SaveName:"기준점수",      CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:80,  Align:"Center",  SaveName:"목표부여여부",    CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:80,  Align:"Left",    SaveName:"목표방향",      CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"상하향지표여부",   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:120,  Align:"Left",    SaveName:"점수화유형",     CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"소숫점자리수",    CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"화면ID",      CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"등록직원번호",    CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Date",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"등록일",       CalcLogic:"",   Format:"Ymd",         PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"KPI구분코드" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"성과관리구분코드" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"평가주기코드" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"목표방향코드" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"점수화유형코드" } ];
    
   	mySheet.InitColumns(cols);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
	mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetCountPosition(1);
	showUnitText("점수, 자릿수");
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
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=22");  //성과관리구분
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=10");  //KPI구분(이익,NONKPI..)
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=23");  //평가주기(월,반기,년)
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=24");  //목표방향(상향,하향)
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=16");  //점수화유형코드(증가형,감소형,유지형..)
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
            if(document.frm.v_columnname.selectedIndex>0)
            {
              column_name = document.frm.v_columnname.options[document.frm.v_columnname.selectedIndex].value;
              search_cont = document.frm.v_searchcont.value;
              
              if(document.frm.v_searchcont.value==null || document.frm.v_searchcont.value=="")
              {
                  alert("조회하고자하는 컬럼값을 입력하세요.");
                  document.frm.v_searchcont.focus();
                  return;
              }
              
				startRow=mySheet.GetSelectRow()+ 1;
              if(mySheet.GetSelectRow()==null)
                  startRow = 1;
              
              // FindText(Col, SearchText, [StartRow], [FullMatch])
              var fRow = mySheet.FindText(column_name, search_cont, startRow, 2 );
              
              if (fRow*1 > 0 )
              {
                mySheet.SelectCell(fRow, column_name);
              }
              else
              {
                if(mySheet.SelectRow == 1 && fRow < 0 )
                {
                    alert("해당 컬럼(" + column_name + ")에서 " +"지정된 값(" + search_cont + ")이 존재하지 않습니다. 확인 후 조회해주세요.");
                }
                else
                {
                  fRow = mySheet.FindText(column_name, search_cont, 1, 2 );
                  mySheet.SelectCell(fRow, column_name);
                
                }
              }
	
              break;     
            }
            else if(document.frm.v_columnname.selectedIndex==0)
            {
              mySheet.DoSearch("macd.scr.macd_scr_1011.do?hidden_key=9&v_inqtype=9&basemonth="+basemonth); 
            } 
            document.frm.reset();
            document.frm.basemonth.value = basemonth;
            isInstBtnEnable = true;
            isMofyBtnEnable = false;
            isDelBrnEnable  = false;
            document.frm.kpicode.disabled    = false;
            document.all.image2.style.cursor = "pointer" ;
            document.all.image3.style.cursor = "" ;
            document.all.image4.style.cursor = "" ;

			showUnitText("점수, 자릿수");

            break;            
        case "엑셀내려받기":    // 엑셀내려받기
            inqText = new Array();
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
			showUnitText("점수, 자릿수");
			break;      
            
        case "초기화":          // 초기화
            
            document.frm.reset();
            document.frm.basemonth.value = basemonth;
            isInstBtnEnable = true;
            isMofyBtnEnable = false;
            isDelBrnEnable  = false;
            document.frm.kpicode.disabled    = false;
            document.all.image2.style.cursor = "pointer" ;
            document.all.image3.style.cursor = "" ;
            document.all.image4.style.cursor = "" ;
            break;   
                       
        case "등록":            // 등록
            if(!isInstBtnEnable) return;

			//필수입력항목을 검증			
            if(!validateInsert()) return; 
			if(document.frm.kpicode.value.length < 3 )
            {
                alert('KPI코드 자리수가 올바르지않습니다. 확인하여 주십시요.');
                document.frm.kpicode.focus();
                return;
            }  
            
            hiddenGrid.DoSearch( encodeURI("macd.scr.macd_scr_1011.do?hidden_key=1"
                                    + "&basemonth="    + basemonth
                                    + "&resultgubun="  + document.frm.resultgubun.value   //성과관리구분 
                                    + "&kpigubun="     + document.frm.kpigubun.value      //KPI구분코드
                                    + "&kpicode="      + document.frm.kpicode.value       //KPI코드
                                    + "&kpiname="      + document.frm.kpiname.value       //KPI명
                                    + "&kpicontents="  + document.frm.kpicontents.value   //KPI정의내용
                                    + "&outputseq="    + document.frm.outputseq.value     //출력순서 
                                    + "&ratingperiod=" + document.frm.ratingperiod.value  // 평가주기코드
                                    + "&topposition="  + document.frm.topposition.value   //상한점수
                                    + "&lowposition="  + document.frm.lowposition.value   //하한점수 
                                    + "&objectyn="     + document.frm.objectyn.value      //목표부여여부
                                    + "&objectcourse=" + document.frm.objectcourse.value  //목표방향코드
                                    + "&updownyn="     + document.frm.updownyn.value      //상하향지표여부
                                    + "&typecode="     + document.frm.typecode.value      //점부화유형코드
                                    + "&stdscore="     + document.frm.stdscore.value      //기준점수
                                    + "&useyn="        + document.frm.useyn.value         //사용여부
                                    + "&dpoint="       + document.frm.dpoint.value        //소숫점자리수
                                    ));
			isCud = true;
            mySheet.DoSearch("macd.scr.macd_scr_1011.do?hidden_key=9&v_inqtype=9&basemonth="+basemonth); 

            break;
            
        case "변경":            // 변경
            if(!isMofyBtnEnable) return;
							
            //필수입력항목을 검증			
            if(!validateInsert()) return; 
			if(document.frm.kpicode.value.length < 3 )
            {
                alert('KPI코드 자리수가 올바르지않습니다. 확인하여 주십시요.');
                document.frm.kpicode.focus();
                return;
            }  
            hiddenGrid.DoSearch( encodeURI("macd.scr.macd_scr_1011.do?hidden_key=2"
                                    + "&basemonth="    + basemonth
                                    + "&resultgubun="  + document.frm.resultgubun.value   //성과관리구분 
                                    + "&kpigubun="     + document.frm.kpigubun.value      //KPI구분코드
                                    + "&kpicode="      + document.frm.kpicode.value       //KPI코드
                                    + "&kpiname="      + document.frm.kpiname.value       //KPI명
                                    + "&kpicontents="  + document.frm.kpicontents.value   //KPI정의내용
                                    + "&outputseq="    + document.frm.outputseq.value     //출력순서 
                                    + "&ratingperiod=" + document.frm.ratingperiod.value  // 평가주기코드
                                    + "&topposition="  + document.frm.topposition.value   //상한점수
                                    + "&lowposition="  + document.frm.lowposition.value   //하한점수 
                                    + "&objectyn="     + document.frm.objectyn.value      //목표부여여부
                                    + "&objectcourse=" + document.frm.objectcourse.value  //목표방향코드
                                    + "&updownyn="     + document.frm.updownyn.value      //상하향지표여부
                                    + "&typecode="     + document.frm.typecode.value      //점부화유형코드
                                    + "&stdscore="     + document.frm.stdscore.value      //기준점수
                                    + "&useyn="        + document.frm.useyn.value         //사용여부
                                    + "&dpoint="       + document.frm.dpoint.value        //소숫점자리수
                                    ));
                                    
            isCud = true;
            mySheet.DoSearch("macd.scr.macd_scr_1011.do?hidden_key=9&v_inqtype=9&basemonth="+basemonth); 
                                    
            break;
            
        case "삭제":            
            if(!isDelBrnEnable) return;
            if(deleteyn()==false) return;
            hiddenGrid.DoSearch( encodeURI("macd.scr.macd_scr_1011.do?hidden_key=3"
                                    + "&basemonth="    + basemonth
                                    + "&resultgubun="  + document.frm.resultgubun.value   //성과관리구분 
                                    + "&kpigubun="     + document.frm.kpigubun.value      //KPI구분코드
                                    + "&kpicode="      + document.frm.kpicode.value       //KPI코드
                                    + "&kpiname="      + document.frm.kpiname.value       //KPI명
                                    + "&kpicontents="  + document.frm.kpicontents.value   //KPI정의내용
                                    + "&outputseq="    + document.frm.outputseq.value     //출력순서 
                                    + "&ratingperiod=" + document.frm.ratingperiod.value  // 평가주기코드
                                    + "&topposition="  + document.frm.topposition.value   //상한점수
                                    + "&lowposition="  + document.frm.lowposition.value   //하한점수 
                                    + "&objectyn="     + document.frm.objectyn.value      //목표부여여부
                                    + "&objectcourse=" + document.frm.objectcourse.value  //목표방향코드
                                    + "&updownyn="     + document.frm.updownyn.value      //상하향지표여부
                                    + "&typecode="     + document.frm.typecode.value      //점부화유형코드
                                    + "&stdscore="     + document.frm.stdscore.value      //기준점수
                                    + "&useyn="        + document.frm.useyn.value         //사용여부
                                    + "&dpoint="       + document.frm.dpoint.value        //소숫점자리수
                                    ));           
            mySheet.DoSearch("macd.scr.macd_scr_1011.do?hidden_key=9&v_inqtype=9&basemonth="+basemonth); 
            doAction("초기화");
            break;
    }
}

function validateInsert(){
    
    f = document.frm;
		
	//S : 성과관리구분
	if(validateChecker("S", f.resultgubun , "성과관리구분"     )) return false;
	
	//S : KPI구분
	if(validateChecker("S", f.kpigubun    , "KPI구분"          )) return false;
	
	//I : KPI코드
	if(validateChecker("I", f.kpicode     , "KPI코드"          )) return false;
	
	//I : KPI명
	if(validateChecker("I", f.kpiname     , "KPI명"            )) return false;
	
	//I : KPI정의내용
	if(validateChecker("I", f.kpicontents , "KPI정의내용"      )) return false;
	
	//I : 출력순서
	if(validateChecker("I", f.outputseq   ,  "출력순서"        )) return false;
	
	//S : 평가주기
	if(validateChecker("S", f.ratingperiod, "평가주기"         )) return false;
		
	//I : 상한점수
	if(validateChecker("I", f.topposition , "상한점수"         )) return false;
	
	//I : 하한점수
	if(validateChecker("I", f.lowposition , "하한점수"         )) return false;
	
	//S : 목표부여여부
	if(validateChecker("S", f.objectyn    , "목표부여여부"     )) return false;
	
	//S : 목표방향
	if(validateChecker("S", f.objectcourse, "목표방향"         )) return false;
	
	//S : 상하향지표여부
	if(validateChecker("S", f.updownyn    , "상하향지표여부"   )) return false;
	
	//S : 점수화유형코드
	if(validateChecker("S", f.typecode    , "점수화유형코드"   )) return false;

	//S : 소숫점자리수
	if(validateChecker("I", f.stdscore    , "기준점수"         )) return false;
	
	//S : 소숫점자리수
	if(validateChecker("I", f.dpoint      , "소숫점자리수"     )) return false;

	//S : 사용여부
	if(validateChecker("S", f.useyn       , "사용여부"         )) return false;

	return true;
}

/**
 * param : type - input type 에 따른 처리, (I=input, S=combo)
 */
function validateChecker(type, obj, msg){
    
	if(type == "I" && (obj.value=="" || obj.value==null))
	{
		alert('[' + msg + '] 항목이 입력되지 않았습니다. 확인하여 주세요.');
		obj.focus();
		return true;
	}
	else if (type == "S" && obj.selectedIndex==0)
	{
        alert('[' + msg + '] 항목이 선택되지 않았습니다. 확인하여 주세요.');
		obj.focus();
		return true;
	}

	return false;
}
/*컬럼별 검색시 셀포커스를 처음으로 돌린다*/
function changedColumnName()                                               
{
    if(document.frm.v_columnname.value == "TOT")
    {
      document.frm.v_searchcont.value = "";
      document.frm.v_searchcont.readOnly = true;
    }
    else
    {
      document.frm.v_searchcont.readOnly = false;
    }
    mySheet.SelectCell("1", "0");
    return;
}


// 숫자입력오류처리(음수금액도 확인하고 체크)
function chk_numF() {

	var el = window.event.srcElement;
	var vl = el.value;
	var ln = vl.length;

	for(var i=0; i < ln; i++) {
		var ch = vl.charAt(i);
		if((ch != "-") &&((ch < "0" || ch > "9" ))) {
		   alert("숫자만 입력가능합니다!!.");
				el.value = "";
				el.focus();
				return false;
		}
	}
}