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

  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));      // 정보출력
  createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");   // 기본정보 (기준일, 명칭등)
  createIBSheet2(  document.getElementById("mtrhiddenGridObj"),"metrogbhiddenGrid", "200px", "400px");  // 광역금융본부 콤보박스정보
  createIBSheet2(  document.getElementById("hiddGridmonObj"),"hiddGridmon", "200px", "400px");  // 정보출력
  
  // Hidden GRID에 대한 속성정보 설정
   hiddenGrid.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   var hdnInfo    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var hdnHeaders = [ { Text:"HIDDEN", Align:"Center"} ];
   hiddenGrid.InitHeaders(hdnHeaders, hdnInfo);

   var hdnCols = [ {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
          {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
   hiddenGrid.InitColumns(hdnCols);
   hiddenGrid.SetVisible(0);
   hiddenGrid.SetEditable(0);

//metrogbhiddenGrid에 대한 속성정보 설정
   metrogbhiddenGrid.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   var mtrhdnInfo    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var mtrhdnHeaders = [ { Text:"HIDDEN", Align:"Center"} ];
   metrogbhiddenGrid.InitHeaders(mtrhdnHeaders, mtrhdnInfo);

   var mtrhdnCols = [ {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
   metrogbhiddenGrid.InitColumns(mtrhdnCols);
   metrogbhiddenGrid.SetVisible(0);
   metrogbhiddenGrid.SetEditable(0);

  // 상위 GRID에 대한 속성정보 설정
  // hiddGridmon에 대한 속성정보 설정
   hiddGridmon.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

   var hgmInfo    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var hgmHeaders = [ { Text:"점번호|점명|", Align:"Center"} ];
   hiddGridmon.InitHeaders(hgmHeaders, hgmInfo);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" } ];
    
   hiddGridmon.InitColumns(cols);
   hiddGridmon.SetEditable(0);
   hiddGridmon.SetVisible(0);
    
  doAction("기준일");
  
  initGrid(); // 연체율 화면 그리드 초기화  
    
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
    for ( ;el.options.length>1;) el.options.remove(1);
    for(i=1;i<=hiddenGrid.GetTotalRows();i++){
       var oOption=document.createElement("OPTION");
	   oOption.text=hiddenGrid.GetCellValue(i, 1);
	   oOption.value=hiddenGrid.GetCellValue(i, 0);
       el.options.add(oOption);
    }

}

function ComboValue1(el)
{
    for ( ;el.options.length>1;) el.options.remove(1);
    for(i=1;i<=metrogbhiddenGrid.GetTotalRows();i++){
       var oOption=document.createElement("OPTION");
	   oOption.text=metrogbhiddenGrid.GetCellValue(i, 1);
	   oOption.value=metrogbhiddenGrid.GetCellValue(i, 0);
       el.options.add(oOption);
    }

}

function selectmonth()
{    
    initGrid();  // 연체율 화면 그리드 초기화

	//peer group
    document.frm.pgcode.disabled = true;
    document.frm.pgcode.value = 0;  // 전체로 기본 설정   

	//광연본부
    document.frm.metrogb.disabled = true;
    document.frm.metrogb.value = 0;  // 전체로 기본 설정        

    //allDelDataGrid(mySheet);

    // 최근 기준년월 가져오기
    basemonth=hiddGridmon.GetCellValue(1, 0);
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=7");
    metrogbhiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=49");
}

function selectpgcode()
{
    allDelDataGrid(mySheet);
	showUnitText("백만원,포인트,%");
	pgcode    = document.frm.pgcode.value;
    initGrid();
}

function selectsubchk()
{
    subChk      = document.frm.subChk.checked;
    baseday     = document.frm.baseday.value;
    pgcode      = document.frm.pgcode.value;
    
    // 2022년 하반기부터 세부내역 체크 X
    if (baseday >= '20220101') {
        if (subChk) { 								// 세부내역 체크 전
              // 신규예수금고객
              mySheet.SetColHidden(9,0);
              mySheet.SetColHidden(10,0);
              mySheet.SetColHidden(11,0);
              // 예수금(반기평잔)
              mySheet.SetColHidden(14,0);
              mySheet.SetColHidden(15,0);
              mySheet.SetColHidden(16,0);
              // 예수금(순증잔액)
              mySheet.SetColHidden(19,0);
              mySheet.SetColHidden(20,0);
              mySheet.SetColHidden(21,0);
              // 저비용성예수금(반기평잔)        
              mySheet.SetColHidden(24,0);
              mySheet.SetColHidden(25,0);
              mySheet.SetColHidden(26,0);
              // 저비용성예수금(월중평잔)
              mySheet.SetColHidden(29,0);
              mySheet.SetColHidden(30,0);
              mySheet.SetColHidden(31,0);
              // 핵심예금(반기평잔)  
              mySheet.SetColHidden(34,0);
              mySheet.SetColHidden(35,0);
              mySheet.SetColHidden(36,0);
              // 핵심예금(월중평잔)
              mySheet.SetColHidden(39,0);
              mySheet.SetColHidden(40,0);
              mySheet.SetColHidden(41,0);
               // 대출금(순증잔액)
              mySheet.SetColHidden(44,0);
              mySheet.SetColHidden(45,0);
              mySheet.SetColHidden(46,0);
              // 연체율
              mySheet.SetColHidden(49,0);
              mySheet.SetColHidden(50,0);
              mySheet.SetColHidden(51,0);
                                
        }
        else {
              // 신규예수금고객
              mySheet.SetColHidden(9,1);
              mySheet.SetColHidden(10,1);
              mySheet.SetColHidden(11,1);
              // 예수금(반기평잔)
              mySheet.SetColHidden(14,1);
              mySheet.SetColHidden(15,1);
              mySheet.SetColHidden(16,1);
              // 예수금(순증잔액)
              mySheet.SetColHidden(19,1);
              mySheet.SetColHidden(20,1);
              mySheet.SetColHidden(21,1);
              // 저비용성예수금(반기평잔)        
              mySheet.SetColHidden(24,1);
              mySheet.SetColHidden(25,1);
              mySheet.SetColHidden(26,1);
              // 저비용성예수금(월중평잔)  
              mySheet.SetColHidden(29,1);
              mySheet.SetColHidden(30,1);
              mySheet.SetColHidden(31,1);
              // 핵심예금(반기평잔)        
              mySheet.SetColHidden(34,1);
              mySheet.SetColHidden(35,1);
              mySheet.SetColHidden(36,1);
              // 핵심예금(월중평잔)  
              mySheet.SetColHidden(39,1);
              mySheet.SetColHidden(40,1);
              mySheet.SetColHidden(41,1);
              // 대출금(순증잔액)
              mySheet.SetColHidden(44,1);
              mySheet.SetColHidden(45,1);
              mySheet.SetColHidden(46,1);
              // 연체율
              mySheet.SetColHidden(49,1);
              mySheet.SetColHidden(50,1);
              mySheet.SetColHidden(51,1);
                                            
          }        	        	                         
    }	         
    else if (baseday >= '20211001') {
        if (subChk) { 								// 세부내역 체크 전
              // 신규예수금고객
              mySheet.SetColHidden(9,0);
              mySheet.SetColHidden(10,0);
              mySheet.SetColHidden(11,0);
              // 예수금(반기평잔)
              mySheet.SetColHidden(14,0);
              mySheet.SetColHidden(15,0);
              mySheet.SetColHidden(16,0);
              // 예수금(순증잔액)
              mySheet.SetColHidden(19,0);
              mySheet.SetColHidden(20,0);
              mySheet.SetColHidden(21,0);
              // 저비용성예수금(반기평잔)        
              mySheet.SetColHidden(24,0);
              mySheet.SetColHidden(25,0);
              mySheet.SetColHidden(26,0);
              // 저비용성예수금(월중평잔)
              mySheet.SetColHidden(29,0);
              mySheet.SetColHidden(30,0);
              mySheet.SetColHidden(31,0);
              // 대출금(순증잔액)
              mySheet.SetColHidden(34,0);
              mySheet.SetColHidden(35,0);
              mySheet.SetColHidden(36,0);
              // 주거래기업 가점
              mySheet.SetColHidden(39,0);
              mySheet.SetColHidden(40,0);
              mySheet.SetColHidden(41,0);
              // 연체율
              mySheet.SetColHidden(44,0);
              mySheet.SetColHidden(45,0);
              mySheet.SetColHidden(46,0);
        }
        else {
              // 신규예수금고객
              mySheet.SetColHidden(9,1);
              mySheet.SetColHidden(10,1);
              mySheet.SetColHidden(11,1);
              // 예수금(반기평잔)
              mySheet.SetColHidden(14,1);
              mySheet.SetColHidden(15,1);
              mySheet.SetColHidden(16,1);
              // 예수금(순증잔액)
              mySheet.SetColHidden(19,1);
              mySheet.SetColHidden(20,1);
              mySheet.SetColHidden(21,1);
              // 저비용성예수금(반기평잔)        
              mySheet.SetColHidden(24,1);
              mySheet.SetColHidden(25,1);
              mySheet.SetColHidden(26,1);
              // 저비용성예수금(월중평잔)  
              mySheet.SetColHidden(29,1);
              mySheet.SetColHidden(30,1);
              mySheet.SetColHidden(31,1);
              // 대출금(순증잔액)
              mySheet.SetColHidden(34,1);
              mySheet.SetColHidden(35,1);
              mySheet.SetColHidden(36,1);
              // 주거래기업 가점
              mySheet.SetColHidden(39,1);
              mySheet.SetColHidden(40,1);
              mySheet.SetColHidden(41,1);
              // 연체율
              mySheet.SetColHidden(44,1);
              mySheet.SetColHidden(45,1);
              mySheet.SetColHidden(46,1);
          }        	        	                         
    }	     
    else if (baseday >= '20210701') {    
        if (subChk) { 								// 세부내역 체크 전
              // 신규예수금고객
              mySheet.SetColHidden(9,0);
              mySheet.SetColHidden(10,0);
              mySheet.SetColHidden(11,0);
              // 예수금(반기평잔)
              mySheet.SetColHidden(14,0);
              mySheet.SetColHidden(15,0);
              mySheet.SetColHidden(16,0);
              // 예수금(순증잔액)
              mySheet.SetColHidden(19,0);
              mySheet.SetColHidden(20,0);
              mySheet.SetColHidden(21,0);
              // 저비용성예수금(반기평잔)        
              mySheet.SetColHidden(24,0);
              mySheet.SetColHidden(25,0);
              mySheet.SetColHidden(26,0);
              // 저비용성예수금(월중평잔)
              mySheet.SetColHidden(29,0);
              mySheet.SetColHidden(30,0);
              mySheet.SetColHidden(31,0);
              // 대출금(순증잔액)
              mySheet.SetColHidden(34,0);
              mySheet.SetColHidden(35,0);
              mySheet.SetColHidden(36,0);
              // 주거래기업 가점
              mySheet.SetColHidden(39,0);
              mySheet.SetColHidden(40,0);
              mySheet.SetColHidden(41,0);
              // 연체율
              mySheet.SetColHidden(44,0);
              mySheet.SetColHidden(45,0);
              mySheet.SetColHidden(46,0);
              // 경영현안_가점
              mySheet.SetColHidden(49,0);
              mySheet.SetColHidden(50,0);
              mySheet.SetColHidden(51,0);
        }
        else {
              // 신규예수금고객
              mySheet.SetColHidden(9,1);
              mySheet.SetColHidden(10,1);
              mySheet.SetColHidden(11,1);
              // 예수금(반기평잔)
              mySheet.SetColHidden(14,1);
              mySheet.SetColHidden(15,1);
              mySheet.SetColHidden(16,1);
              // 예수금(순증잔액)
              mySheet.SetColHidden(19,1);
              mySheet.SetColHidden(20,1);
              mySheet.SetColHidden(21,1);
              // 저비용성예수금(반기평잔)        
              mySheet.SetColHidden(24,1);
              mySheet.SetColHidden(25,1);
              mySheet.SetColHidden(26,1);
              // 저비용성예수금(월중평잔)  
              mySheet.SetColHidden(29,1);
              mySheet.SetColHidden(30,1);
              mySheet.SetColHidden(31,1);
              // 대출금(순증잔액)
              mySheet.SetColHidden(34,1);
              mySheet.SetColHidden(35,1);
              mySheet.SetColHidden(36,1);
              // 주거래기업 가점
              mySheet.SetColHidden(39,1);
              mySheet.SetColHidden(40,1);
              mySheet.SetColHidden(41,1);
              // 연체율
              mySheet.SetColHidden(44,1);
              mySheet.SetColHidden(45,1);
              mySheet.SetColHidden(46,1);
              // 경영현안_가점
              mySheet.SetColHidden(49,1);
              mySheet.SetColHidden(50,1);
              mySheet.SetColHidden(51,1);
          }        	        	                         
    }	     
    else if (baseday >= '20210101') {
        if (subChk) { 								// 세부내역 체크 전
              // 신규예수금고객
              mySheet.SetColHidden(9,0);
              mySheet.SetColHidden(10,0);
              mySheet.SetColHidden(11,0);
              // 신규기업대출금고객
              mySheet.SetColHidden(14,0);
              mySheet.SetColHidden(15,0);
              mySheet.SetColHidden(16,0);
              // 예수금(반기평잔)
              mySheet.SetColHidden(19,0);
              mySheet.SetColHidden(20,0);
              mySheet.SetColHidden(21,0);
              // 예수금(순증잔액)
              mySheet.SetColHidden(24,0);
              mySheet.SetColHidden(25,0);
              mySheet.SetColHidden(26,0);
              // 저비용성예수금(반기평잔)        
              mySheet.SetColHidden(29,0);
              mySheet.SetColHidden(30,0);
              mySheet.SetColHidden(31,0);
              // 저비용성예수금(월중평잔)  
              mySheet.SetColHidden(34,0);
              mySheet.SetColHidden(35,0);
              mySheet.SetColHidden(36,0);
              // 대출금(순증잔액)
              mySheet.SetColHidden(39,0);
              mySheet.SetColHidden(40,0);
              mySheet.SetColHidden(41,0);
              // 주거래기업 가점
              mySheet.SetColHidden(44,0);
              mySheet.SetColHidden(45,0);
              mySheet.SetColHidden(46,0);
              // 연체율
              mySheet.SetColHidden(49,0);
              mySheet.SetColHidden(50,0);
              mySheet.SetColHidden(51,0);
        }
        else {
              // 신규예수금고객
              mySheet.SetColHidden(9,1);
              mySheet.SetColHidden(10,1);
              mySheet.SetColHidden(11,1);
              // 신규기업대출금고객
              mySheet.SetColHidden(14,1);
              mySheet.SetColHidden(15,1);
              mySheet.SetColHidden(16,1);
              // 예수금(반기평잔)
              mySheet.SetColHidden(19,1);
              mySheet.SetColHidden(20,1);
              mySheet.SetColHidden(21,1);
              // 예수금(순증잔액)
              mySheet.SetColHidden(24,1);
              mySheet.SetColHidden(25,1);
              mySheet.SetColHidden(26,1);
              // 저비용성예수금(반기평잔)        
              mySheet.SetColHidden(29,1);
              mySheet.SetColHidden(30,1);
              mySheet.SetColHidden(31,1);
              // 저비용성예수금(월중평잔)  
              mySheet.SetColHidden(34,1);
              mySheet.SetColHidden(35,1);
              mySheet.SetColHidden(36,1);
              // 대출금(순증잔액)
              mySheet.SetColHidden(39,1);
              mySheet.SetColHidden(40,1);
              mySheet.SetColHidden(41,1);
              // 주거래기업 가점
              mySheet.SetColHidden(44,1);
              mySheet.SetColHidden(45,1);
              mySheet.SetColHidden(46,1);
              // 연체율
              mySheet.SetColHidden(49,1);
              mySheet.SetColHidden(50,1);
              mySheet.SetColHidden(51,1);
          }        	        	                         
    }	
 
}

/* Sheet 각종 처리 */
function doAction(sAction)
{
    isSelected  = true;
    baseday     = document.frm.baseday.value;
    pgcode      = document.frm.pgcode.value;
    metrogb     = document.frm.metrogb.value;

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
        case "기준일":           // 조회(상위 GRID)
            // 기준년월 정보 (최근 기준년월), superFlg는 성과담당자 권한을 갖는다 고로 가장 최근일자임.
            hiddGridmon.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&superFlg=Y");
            /*// 기준일자 정보
            if(isRoleEnable == '1') {
            	 // 전산정보부 및 성과 담당자
               hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2330.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=98");
            } else {
               hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2330.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=99");
            }*/
            break;
        case "조회":             // 조회(상위 GRID)
            if(baseday < '20210315') {
              if(isRoleEnable != '1') { 
              	alert('RM(본부) 성과집계표 세부내역 오픈 예정전 일자입니다. 2021년 3월 15일 부터 조회 가능합니다.');
              	break;
              }	
            }
    				//if (baseday >= '20210101') 
    				//{
						//	if (pgcode == '16') 
						//	{	           
						//		alert('RM(금융본부) 성과집계표는 별도 신설 오픈 예정입니다.');
						//		return;
						//	}
						//}
						
            //pgcode 16으로 셋팅해서 호출
            mySheet.DoSearch("rpdy.scr.rpdy_scr_2330.do?hidden_key=9&baseday="+baseday+"&pgcode=16&metrogb="+metrogb);
            //mySheet.FitSize(false, true);
            break;
        case "엑셀내려받기":    // 엑셀내려받기
            inqText=new Array();
            inqText[0]=new Array();
            inqText[0][0]="기준일";
            inqText[0][1]=baseday;            
            inqText[1]=new Array();
            inqText[1][0]="PG명";
            inqText[1][1]=document.frm.pgcode.options[document.frm.pgcode.selectedIndex].text;
            inqText[2]=new Array();
            inqText[2][0]="광역금융본부";
            inqText[2][1]=document.frm.metrogb.options[document.frm.metrogb.selectedIndex].text;
            // 보안등급세팅
            seqLevel=document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[3]=new Array();
                inqText[3][0]="보안등급";
                inqText[3][1]=document.frm.Security_Level.value;
            }
            rExcVal=doExcel(mySheet, inqText, -1); //common.js 활용하여 excel 출력
            /*// 엑셀다운로드시 로그 저장
            if(rExcVal) {
               condition="기준일="+baseday+";PG코드="+pgcode+";광역금융본부="+metrogb;
               hiddenGrid.DoSearch("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition);
            }*/
            break;      
    }

}

/*--------------------------------------------*/
/* @기능 : 선택된 기준년월에 따른 그리드 init */
/*--------------------------------------------*/        
function initGrid()
{
    baseday   = document.frm.baseday.value;
    
    if      (baseday >= '20220101') setGrid2022H();
    else if (baseday >= '20220101') setGrid2022();
    else if (baseday >= '20211001') setGrid2021H2();
    else if (baseday >= '20210701') setGrid2021H();
    else if (baseday >= '20210101') setGrid2021();            

    //세부내역 체크에 따른 그리드 설정
    selectsubchk(); 	
}

 /* -----------------------------------------------------------------------------
	Title   :   문자열에서 지정된 문자를 제거한다	
	Argument:	[0]String : 대상 문자열
	          [1]char   : 제거 될 문자열
	Return	:	[0]String : 제거 될 문자열이 제거 된 문자열
  Example : 1) delChar('2005-05-23','-');   ==>  '20050523'
			      2) delChar('244,000',',');      ==>  '244000'
----------------------------------------------------------------------------- */
function delChar(newValue, ch){
	
	if( newValue == null || newValue == '' )
		return "";
	var len = newValue.length;
	var ret = "";
	
	for (i=0; i<len; ++i)
	{
		if (newValue.substring(i,i+1) != ch)
		ret = ret + newValue.substring(i,i+1);
	}
	
	return ret;
}


/*------------------------------------------------------------------------------*/
/*  @기능 : 3자리 단위로 comma 찍기 
	Argument:	[0]String or Number : Comma 를 찍을 문자열 및 숫자
	Return	:	[0]String : Comma 를 찍힌 문자열
  Example :   1) Format_Comma('283849933223');     ==>  283,849,933,223       */
/*------------------------------------------------------------------------------*/
function Format_Comma(newValue_1){

	var newValue = newValue_1 + ""; //숫자인 경우 문자열로 변환
	var len = newValue.length;
	var ch = "";
	var j = 1;
	var formatValue = "";
	var newVal1 = "";
	var newVal11 = "";
	var ch22=0;
	var ch11=0;


	//comma(,) 제거
	newValue = delChar(newValue, ',');

	if(parseInt(newValue,10)  == 0){
		return 0;
	}


	if (newValue < 0 ){

		for (p =  0 ; p < newValue.length ;p++ )
		{

			if (p==newValue.length)
				break;

			ch11 = newValue.substring(p+1,p+2);
			if (ch11 != 0)
				ch22++;


			if (ch22 > 0){
				newVal1 = newVal1 + ch11;
			}
		}

		len = newVal1.length;

		for (i = len; i > 0; i--)
		{
			ch = newVal1.substring(i - 1, i);
			formatValue = ch + formatValue;

			if ((j % 3) == 0 && i > 1)
			{
				formatValue = "," + formatValue;
			}

			j++;
		}

		formatValue = "-" + formatValue
	}else{
		//comma 제거된 문자열 길이
		for (p =  0 ; p < newValue.length ;p++ )
		{
			if (p==newValue.length)
				break;
			ch11 = newValue.substring(p,p+1);
			if (ch11 != 0)
				ch22++;


			if (ch22 > 0){
				newVal1 = newVal1 + ch11;
			}
		}
		len = newVal1.length;

		for (i = len; i > 0; i--)
		{
			ch = newVal1.substring(i - 1, i);
			formatValue = ch + formatValue;

			if ((j % 3) == 0 && i > 1)
			{
				formatValue = "," + formatValue;
			}

			j++;
		}
	}

	return formatValue;
}

/*------------------------------------------*/
/* @기능 : 2022년도 하반기 기준  set        */
/*------------------------------------------*/        
function setGrid2022H()
{
  pgcode  = document.frm.pgcode.value;
  baseday = document.frm.baseday.value;
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	
	strHeader0 = "소속점번호|소속점명|점번호|RM(본부)|RM(본부)|RM(본부)|PG명|일일성과\n평점합계|그룹내\n순위|"      //9
		      +"신규예수금고객|신규예수금고객|신규예수금고객|신규예수금고객|신규예수금고객|"                      //5      
		      +"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"            //5
		      +"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"            //5
		      +"저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|"            //5
		      +"저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|"            //5      
		      +"핵심예수금(반기평잔)|핵심예수금(반기평잔)|핵심예수금(반기평잔)|핵심예수금(반기평잔)|핵심예수금(반기평잔)|"            //5
		      +"핵심예수금(월중평잔)|핵심예수금(월중평잔)|핵심예수금(월중평잔)|핵심예수금(월중평잔)|핵심예수금(월중평잔)|"            //5      
		      +"대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|"       //5      
		      +"감점 : 연체율|감점 : 연체율|감점 : 연체율|감점 : 연체율|감점 : 연체율|"                                //5    
		      +"가점 : 저비용성증대|가점 : 저비용성증대|가점 : 저비용성증대|가점 : 저비용성증대|가점 : 저비용성증대|"  //5      
		      ;
	
	strHeader1 = "소속점번호|소속점명|점번호|직원번호|직급|성명|PG명|일일성과\n평점합계|그룹내\n순위|"    // 9
		      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                   // 5 신규예수금고객      
		      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                   // 5 예수금(반기평잔)
		      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                   // 5 예수금(순증잔액)
		      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                   // 5 저비용성예수금(반기평잔)
		      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                   // 5 저비용성예수금(월중평잔)                
		      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                   // 5 핵심예수금(반기평잔)
		      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                   // 5 핵심예수금(월중평잔)                      
		      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                   // 5 대출금(순증잔액)     
		      +"총여신|연체액|연체율|평점/배점|그룹내순위|"                                             // 5 감점 : 연체율
		      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                   // 5 가점 : 저비용성증대
		      ;

    mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:9 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
              { Text:strHeader1, Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
        {Type:"Text",     Hidden:0,  MinWidth:90,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
        {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" } ];
     
    mySheet.InitColumns(cols);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
	mySheet.SetCountPosition(1); 
	//지원안함[check again] UnitText="백만원,포인트,%";
	showUnitText("백만원,포인트,%");
    newSetActionMenu(mySheet,"엑셀내려받기");

    //AutoSumBottom = false;    //합계행 상단 : false, 하단 : true
  
}

/*------------------------------------------*/
/* @기능 : 2022년도 상반기 기준  set        */
/*------------------------------------------*/        
function setGrid2022()
{
  pgcode  = document.frm.pgcode.value;
  baseday = document.frm.baseday.value;
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	
	strHeader0 = "소속점번호|소속점명|점번호|RM(본부)|RM(본부)|RM(본부)|PG명|일일성과\n평점합계|그룹내\n순위|"      //9
		      +"신규예수금고객|신규예수금고객|신규예수금고객|신규예수금고객|신규예수금고객|"                      //5      
		      +"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"            //5
		      +"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"            //5
		      +"저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|"            //5
		      +"저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|"            //5      
		      +"핵심예수금(반기평잔)|핵심예수금(반기평잔)|핵심예수금(반기평잔)|핵심예수금(반기평잔)|핵심예수금(반기평잔)|"            //5
		      +"핵심예수금(월중평잔)|핵심예수금(월중평잔)|핵심예수금(월중평잔)|핵심예수금(월중평잔)|핵심예수금(월중평잔)|"            //5      
		      +"대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|"       //5      
		      +"연체율_감점|연체율_감점|연체율_감점|연체율_감점|연체율_감점|"                                //5      
		      ;
	
	strHeader1 = "소속점번호|소속점명|점번호|직원번호|직급|성명|PG명|일일성과\n평점합계|그룹내\n순위|"    // 9
		      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                   // 5 신규예수금고객      
		      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                   // 5 예수금(반기평잔)
		      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                   // 5 예수금(순증잔액)
		      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                   // 5 저비용성예수금(반기평잔)
		      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                   // 5 저비용성예수금(월중평잔)                
		      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                   // 5 핵심예수금(반기평잔)
		      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                   // 5 핵심예수금(월중평잔)                      
		      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                   // 5 대출금(순증잔액)     
		      +"총여신|연체액|연체율|평점/배점|그룹내순위|"                                             // 5 연체율
		      ;

    mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:9 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
              { Text:strHeader1, Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
        {Type:"Text",     Hidden:0,  MinWidth:90,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
        {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
     
    mySheet.InitColumns(cols);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
	mySheet.SetCountPosition(1); 
	//지원안함[check again] UnitText="백만원,포인트,%";
	showUnitText("백만원,포인트,%");
    newSetActionMenu(mySheet,"엑셀내려받기");

    //AutoSumBottom = false;    //합계행 상단 : false, 하단 : true
  
}


/*------------------------------------------*/
/* @기능 : 2021년도 하반기 기준 그리드 set  
           2021년도 10월요건 반영           */
/*------------------------------------------*/        
function setGrid2021H2()
{
  pgcode  = document.frm.pgcode.value;
  baseday = document.frm.baseday.value;
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

	strHeader0 = 
       "소속점번호|소속점명|점번호|RM(본부)|RM(본부)|RM(본부)|PG명|일일성과\n평점합계|그룹내\n순위|"    //9
      +"신규예수금고객|신규예수금고객|신규예수금고객|신규예수금고객|신규예수금고객|"                      //5      
      +"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"            //5
      +"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"            //5
      +"저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|"            //5
      +"저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|"            //5
      +"대출금(순증잔액_최종밴드평가)|대출금(순증잔액_최종밴드평가)|대출금(순증잔액_최종밴드평가)|대출금(순증잔액_최종밴드평가)|대출금(순증잔액_최종밴드평가)|"       //5
      +"주거래기업_가점|주거래기업_가점|주거래기업_가점|주거래기업_가점|주거래기업_가점|"                 //5
      +"연체율_감점|연체율_감점|연체율_감점|연체율_감점|연체율_감점|"            //5
      +"경영현안_가점|경영현안_가점|경영현안_가점|경영현안_가점|경영현안_가점|"            //5
      ;    
		
	strHeader1 = 
       "소속점번호|소속점명|점번호|직원번호|직급|성명|PG명|일일성과\n평점합계|그룹내\n순위|"    //9                                                                         // 5
      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                                                                    // 5 신규예수금고객      
      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                                                                    // 5 예수금(반기평잔)
      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                                                                    // 5 예수금(순증잔액)
      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                                                                    // 5 저비용성예수금(반기평잔)
      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                                                                    // 5 저비용성예수금(월중평잔)          
      +"밴드범위|실적|최종밴드범위이탈금액\n(평균득점률)|평점/배점|그룹내순위|"                                                                      // 5 대출금(순증잔액)
      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                                                                    // 5 주거래기업
      +"총여신|연체액|연체율|평점/배점|그룹내순위|"                                                                               // 5 연체율
      +"목표|실적|달성률|평점/배점|그룹내순위|"                                                                                   // 5 경영현안_가점
      ;

    mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:9 } );
    
    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"},
              { Text:strHeader1, Align:"Center"} ];
    mySheet.InitHeaders(headers, info);
    
    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
        {Type:"Text",     Hidden:0,  MinWidth:90,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
        {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:90,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
        {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
        {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
     
    mySheet.InitColumns(cols);
    
    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
	mySheet.SetCountPosition(1); 
	//지원안함[check again] UnitText="백만원,포인트,%";
	showUnitText("백만원,포인트,%");
    newSetActionMenu(mySheet,"엑셀내려받기");

    //AutoSumBottom = false;    //합계행 상단 : false, 하단 : true
}

/*------------------------------------------*/
/* @기능 : 2021년도 하반기 기준 그리드 set          
/*------------------------------------------*/        
function setGrid2021H()
{
  pgcode  = document.frm.pgcode.value;
  baseday = document.frm.baseday.value;
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

	strHeader0 =  
       "소속점번호|소속점명|점번호|RM(본부)|RM(본부)|RM(본부)|PG명|일일성과\n평점합계|그룹내\n순위|"    //9
      +"신규예수금고객|신규예수금고객|신규예수금고객|신규예수금고객|신규예수금고객|"                      //5      
      +"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"            //5
      +"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"            //5
      +"저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|"            //5
      +"저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|"            //5
      +"대출금(순증잔액_밴드평가)|대출금(순증잔액_밴드평가)|대출금(순증잔액_밴드평가)|대출금(순증잔액_밴드평가)|대출금(순증잔액_밴드평가)|"       //5
      +"주거래기업_가점|주거래기업_가점|주거래기업_가점|주거래기업_가점|주거래기업_가점|"                 //5
      +"연체율_감점|연체율_감점|연체율_감점|연체율_감점|연체율_감점|"            //5     
      ;    
		
	strHeader1 =  
       "소속점번호|소속점명|점번호|직원번호|직급|성명|PG명|일일성과\n평점합계|그룹내\n순위|"    //9                                                                         // 5
      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                                                                    // 5 신규예수금고객      
      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                                                                    // 5 예수금(반기평잔)
      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                                                                    // 5 예수금(순증잔액)
      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                                                                    // 5 저비용성예수금(반기평잔)
      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                                                                    // 5 저비용성예수금(월중평잔)          
      +"밴드범위|실적|밴드범위이탈금액\n(평균득점률)|평점/배점|그룹내순위|"                                                                      // 5 대출금(순증잔액)
      +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                                                                    // 5 주거래기업
      +"총여신|연체액|연체율|평점/배점|그룹내순위|"                                                                               // 5 연체율      
      ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:9 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:90,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:90,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,포인트,%";
   showUnitText("백만원,포인트,%");
   newSetActionMenu(mySheet,"엑셀내려받기");

    //AutoSumBottom = false;    //합계행 상단 : false, 하단 : true
}



/*------------------------------------------*/
/* @기능 : 2021년도 상반기 기준 그리드 set  */
/*------------------------------------------*/        
function setGrid2021()
{
  pgcode  = document.frm.pgcode.value;
  baseday = document.frm.baseday.value;
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

	strHeader0 = 
           "소속점번호|소속점명|점번호|RM(본부)|RM(본부)|RM(본부)|PG명|일일성과\n평점합계|그룹내\n순위|"    //9
          +"신규예수금고객|신규예수금고객|신규예수금고객|신규예수금고객|신규예수금고객|"                      //5
          +"신규기업대출금고객|신규기업대출금고객|신규기업대출금고객|신규기업대출금고객|신규기업대출금고객|"          //5
          +"예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|예수금(반기평잔)|"            //5
          +"예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|예수금(순증잔액)|"            //5
          +"저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|저비용성예수금(반기평잔)|"            //5
          +"저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|저비용성예수금(월중평잔)|"            //5
          +"대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|"            //5
          +"주거래기업_가점|주거래기업_가점|주거래기업_가점|주거래기업_가점|주거래기업_가점|"                 //5
          +"연체율_감점|연체율_감점|연체율_감점|연체율_감점|연체율_감점|"            //5
          ;    
		
	strHeader1 = 
           "소속점번호|소속점명|점번호|직원번호|직급|성명|PG명|일일성과\n평점합계|그룹내\n순위|"    //9                                                                         // 5
          +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                                                                    // 5 신규예수금고객
          +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                                                                    // 5 신규기업대출금고객
          +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                                                                    // 5 예수금(반기평잔)
          +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                                                                    // 5 예수금(순증잔액)
          +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                                                                    // 5 저비용성예수금(반기평잔)
          +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                                                                    // 5 저비용성예수금(월중평잔)          
          +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                                                                    // 5 대출금(순증잔액)
          +"목표|실적|달성률\n(평균득점률)|평점/배점|그룹내순위|"                                                                                    // 5 주거래기업
          +"총여신|연체액|연체율|평점/배점|그룹내순위|"                                                                               // 5 연체율
          ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:9 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:90,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:90,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Int",       Hidden:0,  MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="백만원,포인트,%";
   showUnitText("백만원,포인트,%");
   newSetActionMenu(mySheet,"엑셀내려받기");

    //AutoSumBottom = false;    //합계행 상단 : false, 하단 : true
}