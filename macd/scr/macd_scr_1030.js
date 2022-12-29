/*------------------------------------------------------------------------------------------------------------------
 주  시 스 템 : 성과 관리시스템
'서브  시스템 : 운영관리 - 코드관리
'프로그램 ID  : macd_scr_1030.js
'프로그램 명  : KPI 상품그룹 관리
'프로그램개요 : KPI 상품그룹 관리
'작   성   자 : 변휘원
'작   성   일 : 2006.04.12
===============================================================================================================
'수정자/수정일    /수정사유  
'하진영/2011.02.11/기준실적상품분류코드 추가 (기준실적 상품분류별 입력) GRID 상품그룹별로 구별하여 보여주도록 변경 
'하진영'2012.02.06/1.상품에 대해서도 수수료구분 입력가능하도록 처리 (외화상품중 비이자처리하는 상품발생 - 2012년기준
                   2.신규발생고정이하여신대상여부 추가 - 2012년기준  
'하진영'2013.03.06/1.위험조정운용대상여부 추가 - 2013년기준
-----------------------------------------------------------------------------------------------------------------*/

var isInitBtnEnable = true;
var isInstBtnEnable = true;
var isMofyBtnEnable = false;
var isDelBrnEnable  = false;
var isExcelBtnEnable= true;

//CUD 상태 변수
var isCud = false;
var v_chk = ""; 


var tmp_sgubuncode = "";

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

  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj"), 200));
	createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");
  
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
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=13");  //상품구분
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=12");  //수수료구분 : common에서 상위레벨과 "비이자아님"제외되어옴.
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=50");  //기준실적상품분류코드
    
	document.frm.mgubun.value=999;
}
function sel_productgubun(){   	
    initGrid();  // 연체율 화면 그리드 초기화  

    basemonth    = document.frm.basemonth.value;
    productgubun = document.frm.productgubun.value;             
      
    hiddenGrid.DoSearch("kpi.macd.macd_1021.screen?hidden_key=9&v_inqtype=3&basemonth="+basemonth+"&jekyocode=1&productgubun="+productgubun); 
    if(productgubun=="1"){
    	
        document.frm.commissiongubun.value=0;
      
      	document.frm.sgubunname.value = "";
      	document.frm.sgubuncode.value = "";
    	  
        document.all.tr1.style.display="";
        document.all.tr2.style.display="";
        document.all.tr3.style.display="";
        document.all.tr4.style.display="";
    }else{
        document.frm.commissiongubun.value=0;
      	document.frm.sgubunname.value = "";
      	document.frm.sgubuncode.value = "";

        document.all.tr1.style.display="none";
        document.all.tr2.style.display="none";
        document.all.tr4.style.display="none";
        document.all.tr3.style.display="";
    }
}
function sel_bgubun(){
	basemonth    = document.frm.basemonth.value;
    productgubun = document.frm.productgubun.value;
    bgubun       = document.frm.bgubun.value;
    hiddenGrid.DoSearch("kpi.macd.macd_1021.screen?hidden_key=9&v_inqtype=3&basemonth="+basemonth+"&jekyocode=2&productgubun="+productgubun+"&bgubun="+bgubun); 
}
function changedColumnName()
{
    mySheet.SelectCell("1", "0");
}

function ComboValue(el)
{
    for ( ;el.options.length > 1;) el.options.remove(1);
	for(i=1;i<=hiddenGrid.GetTotalRows();i++){
       	var oOption=document.createElement("OPTION");
		oOption.text=hiddenGrid.GetCellValue(i, 1);
		oOption.value=hiddenGrid.GetCellValue(i, 0);
       	el.options.add(oOption);
    }	
}

function ComboValue1(el)
{
	for(i=0;i<=el.options.length;i++){el.options.remove(0);}	
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
        case "기준년월":         // 조회(상위 GRID)
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=4"); 
            break;
        case "조회":             // 조회(상위 GRID)
			f.sgubuncode.value='';
            f.sgubunname.value='';
            productgubun= f.productgubun.value;
            bgubun= f.bgubun.value;
            mgubun= f.mgubun.value;
            sgubuncode = '999';         // 상품전체조회
            mySheet.DoSearch("macd.scr.macd_scr_1021.do?hidden_key=9&v_inqtype=9&basemonth="+basemonth+"&productgubun="+productgubun+"&bgubun="+bgubun+"&mgubun="+mgubun+"&mgubun="+mgubun); 
            break;
            
        case "엑셀내려받기":    // 엑셀내려받기
            inqText = new Array();
            inqText[0]    = new Array();
            inqText[0][0] = "기준년월";
            inqText[0][1] = document.frm.basemonth.options[document.frm.basemonth.selectedIndex].text;
	      	inqText[1]    = new Array();
            inqText[1][0] = "상품구분";
            inqText[1][1] = document.frm.productgubun.options[document.frm.productgubun.selectedIndex].text;
			inqText[2]    = new Array();
            inqText[2][0] = "대분류";
            inqText[2][1] = document.frm.bgubun.options[document.frm.bgubun.selectedIndex].text;
			inqText[3]    = new Array();
            inqText[3][0] = "중분류";
            inqText[3][1] = document.frm.mgubun.options[document.frm.mgubun.selectedIndex].text;
            // 보안등급세팅
            seqLevel = document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[4]    = new Array();
                inqText[4][0] = "보안등급";
                inqText[4][1] = document.frm.Security_Level.value;
            }
            
            doExcel(mySheet, inqText, true); //common.js 활용하여 excel 출력
            break;      
        case "변경":            // 변경
            if(!isMofyBtnEnable) return;

            var v_commissiongubun = f.commissiongubun.value;
           // if(f.productgubun.value=='1') {
           //     v_commissiongubun = f.h_commissiongubun.value;
           // }
            
			isCud = true;
			tmp_sgubuncode = f.sgubuncode.value; 

            hiddenGrid.DoSearch( encodeURI("macd.scr.macd_scr_1021.do?hidden_key=2"
                                    + "&basemonth="        + basemonth
                                    + "&productgubun="     + f.productgubun.value 
                                    + "&sgubuncode="       + f.sgubuncode.value 
                                    + "&interestgb="       + f.interestgb.value     
                                    + "&delayyn="          + f.delayyn.value   
                                    + "&creditdelayyn="    + f.creditdelayyn.value
                                    + "&lowcostyn="        + f.lowcostyn.value
                                    + "&loanyn="           + f.loanyn.value
                                    + "&piijayn="          + f.piijayn.value
                                    + "&commissiongubun="  + v_commissiongubun   
                                    + "&BasicProductCode=" + f.BasicProductCode.value   
                                    + "&LoanBelowYN="      + f.LoanBelowYN.value      //신규고정이하여신대상여부
                                    + "&ExpAdjYN="         + f.ExpAdjYN.value         //위험조정운용대상여부
                                    + "&spsgcode="         + f.spsgcode.value         //특정상품분류
                                    + "&dimagubun="        + f.dimagubun.value        //디마케팅제외구분
                                    + "&retaloangb="       + f.retaloangb.value       //소매여신구분
                                   ));
 
			//productgubun= f.productgubun.value;
            //bgubun= f.bgubun.value;
            //mgubun= f.mgubun.value;
            //isCud = true;
            //mySheet.DoSearch("macd.scr.macd_scr_1021.do?hidden_key=9&v_inqtype=9&basemonth="+basemonth+"&productgubun="+productgubun+"&bgubun="+bgubun+"&mgubun="+mgubun+"&sgubuncode="+sgubuncode);
			//doAction("조회");
	
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
       	setList.style.display = "";
    // 확정시
    } else if (chk==2) {
       	setList.style.display = "none";
    // 조회후 그리드 선택시
    } else if (chk==3) {   
       	setList.style.display = "";
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
       	hiddenGrid.DoSearch(encodeURI("comm.scr.comm_scr_9098.screen?hidden_key=1&v_commit=0&scrName=KPI상품그룹관리&basemonth="+basemonth));
       	//InputButtControl(1);
    // 확정 시킴
    } else if (chk== 2) {
       	hiddenGrid.DoSearch(encodeURI("comm.scr.comm_scr_9098.screen?hidden_key=2&v_commit=1&scrName=KPI상품그룹관리&basemonth="+basemonth));
       	//InputButtControl(3);
    // 확정취소 시킴
    } else if (chk== 3) {    
       	hiddenGrid.DoSearch(encodeURI("comm.scr.comm_scr_9098.screen?hidden_key=2&v_commit=2&scrName=KPI상품그룹관리&basemonth="+basemonth));
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

/*--------------------------------------------*/
/* @기능 : 신규관리회계상품코드 이행          */
/*--------------------------------------------*/        
function newcode_insert()
{   
    var prt_url = "http://"+location.hostname+":"+location.port +"/kpi/macd/scr";
    mySheet.DoSearch(prt_url+"/macd_scr_1031.jsp?hidden_key=2");
    //mySheet.DoSearch("kpi.macd.macd_1031.screen?hidden_key=2");
    document.all.btn_newcode.style.display="none";

	doAction("조회");
}

/*--------------------------------------------*/
/* @기능 : 선택된 상품구분에 따른 그리드 init */
/*--------------------------------------------*/        
function initGrid()
{   
	v_productgubun = document.frm.productgubun.value; 
	    
    if (v_productgubun == '1')  setGridProduct();
    else setGridNonProduct();
}

/*---------------------------------------*/
/* @기능 : 상품구분에 따른 Grid set      */
/*---------------------------------------*/   
function setGridProduct()
{
  	//mySheet.RemoveAll();
  	mySheet.Reset();

  	// 상위 GRID에 대한 속성정보 설정
   	let strHeader="상태|대분류코드|대분류명|중분류코드|중분류명|세분류코드|세분류명"  +
   		"|순이자\n수익대상\n상품구분|연체\n대상\n여부|신용카드\n연체대상\n여부"   +
   		"|저원가성\n여부|총여신\n구분|PI이자대상구분|기준실적\n상품분류"    +
   		"|신규고정이하\n여신대상여부|위험조정운용\n대상여부|특정상품\n분류|디마케팅\n제외구분|소매여신\n구분|수수료구분|수수료구분코드|기준실적상품분류코드";

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [{Text:strHeader,Align:"center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"세분류코드" },
             {Type:"Text",     Hidden:0,  MinWidth:300,  Align:"Left",    SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Combo",     Hidden:0, MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Combo",     Hidden:0, MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Combo",     Hidden:0, MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"NONE" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"NONE" } ];
    
   	mySheet.InitColumns(cols);

   	mySheet.SetEditable(0);
   	mySheet.SetColProperty(16, {ComboText:"한도대출", ComboCode:"01"} );
   	mySheet.SetColProperty(17, {ComboText:"미분류|서민금융|가계종통|신용카드|예금담보대출|기타", ComboCode:"0|1|2|3|4|5"} );
   	mySheet.SetColProperty(18, {ComboText:"N|Y", ComboCode:"0|1"} );
   	mySheet.SetVisible(1);
	mySheet.SetDataLinkMouse(true);
	mySheet.SetCountPosition(1);
   	newSetActionMenu(mySheet,"엑셀내려받기");
}

/*---------------------------------------*/
/* @기능 : 비상품(수수료)  Grid set      */
/*---------------------------------------*/   
function setGridNonProduct()
{
  	//mySheet.RemoveAll();
  	mySheet.Reset();

  	// 상위 GRID에 대한 속성정보 설정
	let strHeader="상태|대분류코드|대분류명|중분류코드|중분류명|세분류코드|세분류명"  +
   		"|순이자\n수익대상\n상품구분|연체\n대상\n여부|신용카드\n연체대상\n여부"   +
   		"|저원가성\n여부|총여신\n구분|PI이자대상구분|기준실적\n상품분류"    +
   		"|신규고정이하\n여신대상여부|위험조정운용\n대상여부|특정상품\n분류|디마케팅\n제외구분|소매여신\n구분|수수료구분|수수료구분코드|기준실적상품분류코드";

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ {Text:strHeader, Align:"center"}];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:200,  Align:"Left",    SaveName:"세분류코드" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"NONE" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"NONE" } ];
    
   	mySheet.InitColumns(cols);

   	mySheet.SetEditable(0);
	mySheet.SetDataLinkMouse(true);
   	newSetActionMenu(mySheet,"엑셀내려받기");
}
