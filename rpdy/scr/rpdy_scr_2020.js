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
  
  // Hidden GRID에 대한 속성정보 설정 //기준일, peer group
   hiddenGrid.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

    var hdnInfo    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var hdnHeaders = [ { Text:"HIDDEN", Align:"Center"} ];
    hiddenGrid.InitHeaders(hdnHeaders, hdnInfo);

    var hdnCols = [ {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
              {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
    hiddenGrid.InitColumns(hdnCols);
	hiddenGrid.SetVisible(0);
    hiddenGrid.SetEditable(0);

//metrogbhiddenGrid에 대한 속성정보 설정 //광역금융본부
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

   var hgmCols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" } ];
    
   hiddGridmon.InitColumns(hgmCols);
   hiddGridmon.SetEditable(0);
   hiddGridmon.SetVisible(0);
 
  doAction("기준일");

  initGrid(); // 화면 그리드 초기화  
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
    initGrid();  // 화면 그리드 초기화

	if(baseday >= '20200101') {
       document.frm.fundgb.disabled = true;
       document.frm.fundgb.value = "00";
       document.frm.pgcode.disabled = true;
       document.frm.pgcode.value = "16";
    } else if(baseday >= '20190701') {
       document.frm.fundgb.disabled = true;
       document.frm.fundgb.value = "00";
       document.frm.pgcode.disabled = true;
       document.frm.pgcode.value = "16";
    } else if(baseday >= '20190101') {
       document.frm.fundgb.disabled = true;
       document.frm.fundgb.value = "00";
	   document.frm.pgcode.disabled = false;
    } else if(baseday >= '20140701') {
       document.frm.fundgb.disabled = false;
	   document.frm.pgcode.disabled = false;
    } else {
       document.frm.fundgb.disabled = true;
       document.frm.fundgb.value = "00";
	   document.frm.pgcode.disabled = false;
    }

	if (baseday >= '20140701') {
    	//setFundgb();
	}

    // 최근 기준년월 가져오기
    basemonth=hiddGridmon.GetCellValue(1, 0);

    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=7");
    //hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth=201501&jekyocode=7"); //peergroup 조회(IMSI20150223),월성과 201501오픈전까지 유지.
    metrogbhiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=49");
}

/* Sheet 각종 처리 */
function doAction(sAction)
{
    isSelected  = true;
    baseday     = document.frm.baseday.value;
    pgcode      = document.frm.pgcode.value;
    sergb       = document.frm.sergb.value;
    metrogb     = document.frm.metrogb.value;
    fundgb      = document.frm.fundgb.value;

    switch(sAction)
    {
        case "고정필드설정":
        	mySheet.SetFrozenCol(mySheet.MouseCol());
        	ufSetMergeCell(mySheet, mySheet.HeaderRows(), 0, 1,3);
        	break;
        case "고정필드해제":
        	mySheet.SetFrozenCol(0);
        	ufSetMergeCell(mySheet, mySheet.HeaderRows(), 0, 1,3);
        	break;
        case "기준일":           // 조회(상위 GRID)
            // 기준년월 정보 (최근 기준년월)
            hiddGridmon.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&superFlg=Y");
			
			/*
			//basemonth=hiddGridmon.GetCellValue(1, 0);  //-1나옴...
            //baseday=basemonth+'01'; // 기준일자를 가져오기 위한 baseday에 기본값 설정(JAVA에서 PROC 구분에 사용)
            // 기준일자 정보
			
            if(isRoleEnable == '1') {
            	 // 전산정보부 및 성과 담당자
                hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2020.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=98");
            } else {
                hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2020.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb=99");
            }
			*/
			
            break;
        case "조회":             // 조회(상위 GRID)
            if(baseday > '20110101') {
              if(isRoleEnable != '1') { 
              	//alert('2011년도 일일성과 자료는 개발중으로 2월중 완료예정입니다.');
              	//break;
              }	
            } 
            mySheet.DoSearch("rpdy.scr.rpdy_scr_2020.do?hidden_key=9&baseday="+baseday+"&pgcode="+pgcode+"&sergb="+sergb+"&metrogb="+metrogb+"&fundgb="+fundgb);
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
            inqText[2][0]="조회구분";
            inqText[2][1]=document.frm.sergb.options[document.frm.sergb.selectedIndex].text;
            inqText[3]=new Array();
            inqText[3][0]="광역금융본부";
            inqText[3][1]=document.frm.metrogb.options[document.frm.metrogb.selectedIndex].text;
            if(baseday <= '20181231' && baseday >= '20140701') {
               inqText[4]=new Array();
               inqText[4][0]="예금분류";
               inqText[4][1]=document.frm.fundgb.options[document.frm.fundgb.selectedIndex].text;
            }
            // 보안등급세팅
            seqLevel=document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
               if(baseday <= '20181231' && baseday >= '20140701') {
                   inqText[5]=new Array();
                   inqText[5][0]="보안등급";
                   inqText[5][1]=document.frm.Security_Level.value;
               } else {
                   inqText[4]=new Array();
                   inqText[4][0]="보안등급";
                   inqText[4][1]=document.frm.Security_Level.value;
               }
            }
            rExcVal=doExcel(mySheet, inqText, -1); //common.js 활용하여 excel 출력
            /*// 엑셀다운로드시 로그 저장
            if(rExcVal) {
               condition="기준일="+baseday+";PG코드="+pgcode+";조회구분="+sergb+";광역금융본부="+metrogb;
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
    pgcode    = document.frm.pgcode.value;

    if  (baseday >= '20200101') setGrid2022_RMC();
    else if  (baseday >= '20200101') {
		setGrid2020_RMC();						// 금융본부 고정
    } else if  (baseday >= '20190101') {
        if (pgcode != '16') setGrid2019();
        else setGrid2019_RMC();
    } else if (baseday >= '20170101') setGrid2017();
    else if (baseday >= '20160101') setGrid2016();
    else if (baseday >= '20150101') setGrid2015();
    else if (baseday >= '20140701') setGrid2014Q3();
    else if (baseday >= '20140101') setGrid2014();
    else if (baseday >= '20130731') setGrid20130731();
    else setGrid2013();
}

/*---------------------------------------------*/
/* @기능 : 상품분류선택시 그리드 화면 컨드롤   */
/*---------------------------------------------*/        
/*function setFundgb()
{
    baseday = document.frm.baseday.value;
    fundgb  = document.frm.fundgb.value;

	mySheet.RemoveAll();

	let strHeader0 = "";
	let strHeader1 = "";

	if(baseday >= '20190101') {					// 사용 안함
        return false;
    } else if(baseday >= '20170701') {
		alert(fundgb)
	
       	if(fundgb == '12') {
          	//순수 저원가성
          	mySheet.SetColHidden(17,0);
          	mySheet.SetColHidden(21,1);
          	mySheet.SetColHidden(22,1);
          	mySheet.SetColHidden(23,0);
          	mySheet.SetColHidden(24,1);
          	mySheet.SetColHidden(25,1);

          	strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 2.0|개인실적\n추가인정 2배(G)|최종인정실적\n(F)=(E) X 2.0";
          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|기타조정|체신관서|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 2.0|개인실적\n추가인정 2배(G)|최종인정실적\n(F)=(E) X 2.0";
       
		} else if(fundgb == '11') {
          	//기업 MMDA
          	mySheet.SetColHidden(17,0);
          	mySheet.SetColHidden(21,1);
          	mySheet.SetColHidden(22,1);
          	mySheet.SetColHidden(23,1);
          	mySheet.SetColHidden(24,1);
          	mySheet.SetColHidden(25,1);

          	strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|기타조정|체신관서|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       	} else {
          	//전체
          	mySheet.SetColHidden(17,0);
          	mySheet.SetColHidden(21,0);
          	mySheet.SetColHidden(22,1);
          	mySheet.SetColHidden(23,1);
          	mySheet.SetColHidden(24,0);
          	mySheet.SetColHidden(25,0);
          	strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|개인실적\n추가인정 2배(G)|최종인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";

		 	var tmp = strHeader0.split("|");
			alert(tmp.length)

          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|기타조정|체신관서|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|개인실적\n추가인정 2배(G)|최종인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
		}
	} else if(baseday >= '20170101') {
		if(fundgb == '12') {
          	//순수 저원가성
          	mySheet.SetColHidden(17,1);
          	mySheet.SetColHidden(21,0);
          	mySheet.SetColHidden(22,0);
          	mySheet.SetColHidden(23,0);
          	mySheet.SetColHidden(24,1);
          	mySheet.SetColHidden(25,1);

          	strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 2.0|개인실적\n추가인정 2배(G)|최종인정실적\n(H)=(F)+(G)";
          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|기타조정|체신관서|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 2.0|개인실적\n추가인정 2배(G)|최종인정실적\n(H)=(F)+(G)";
       	} else if(fundgb == '11') {
          	//기업 MMDA
          	mySheet.SetColHidden(17,1);
          	mySheet.SetColHidden(21,1);
          	mySheet.SetColHidden(22,1);
          	mySheet.SetColHidden(23,1);
          	mySheet.SetColHidden(24,1);
          	mySheet.SetColHidden(25,1);
          	strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|기타조정|체신관서|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       	} else {
          	//전체
          	mySheet.SetColHidden(17,1);
          	mySheet.SetColHidden(21,1);	
          	mySheet.SetColHidden(22,1);
          	mySheet.SetColHidden(23,0);
          	mySheet.SetColHidden(24,0);
          	mySheet.SetColHidden(25,0);
          	strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|개인실적\n추가인정 2배(G)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|기타조정|체신관서|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|개인실적\n추가인정 2배(G)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
		}
    } else if(baseday >= '20160101') {
      	 if(fundgb == '12') {
          	//순수 저원가성
          	mySheet.SetColHidden(20,0);
          	mySheet.SetColHidden(21,1);
          	mySheet.SetColHidden(22,1);
          	strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 2.0|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|기타조정|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 2.0|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       	} else if(fundgb == '11') {
          	//기업 MMDA
          	mySheet.SetColHidden(20,1);
          	mySheet.SetColHidden(21,1);
          	mySheet.SetColHidden(22,1);
          	strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|기타조정|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       	} else {
          	//전체
          	mySheet.SetColHidden(20,0);
          	mySheet.SetColHidden(21,0);
          	mySheet.SetColHidden(22,0);
          	strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|기타조정|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";

       	}
    } else if(baseday >= '20150701') {
       	if(fundgb == '12') {
          	//순수 저원가성
          	mySheet.SetColHidden(19,0);
          	mySheet.SetColHidden(20,1);
          	mySheet.SetColHidden(21,1);
          	strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 2.0|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 2.0|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       	} else if(fundgb == '11') {
          	//기업 MMDA
          	mySheet.SetColHidden(19,1);
          	mySheet.SetColHidden(20,1);
          	mySheet.SetColHidden(21,1);
          	strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       	} else {
          	//전체
          	mySheet.SetColHidden(19,0);
          	mySheet.SetColHidden(20,0);
          	mySheet.SetColHidden(21,0);
          	strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       	}
    } else if(baseday >= '20150101') {   //부지점장권유예금 추가. 201501
       	if(fundgb == '12') {
          	//순수 저원가성
          	mySheet.SetColHidden(19,0);
          	mySheet.SetColHidden(20,1);
          	mySheet.SetColHidden(21,1);
          	strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1.5|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1.5|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       	} else if(fundgb == '11') {
          	//기업 MMDA
          	mySheet.SetColHidden(19,1);
          	mySheet.SetColHidden(20,1);
          	mySheet.SetColHidden(21,1);
          	strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       	} else {
          	//전체
          	mySheet.SetColHidden(19,0);
          	mySheet.SetColHidden(20,0);
          	mySheet.SetColHidden(21,0);
          	strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       	}
	} else if(baseday >= '20140701') {
       	if(fundgb == '12') {
          	//순수 저원가성
          	mySheet.SetColHidden(19,1);
          	mySheet.SetColHidden(20,1);
          	strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1.3|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1.3|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       	} else if(fundgb == '11') {
          	//기업 MMDA
          	mySheet.SetColHidden(19,1);
          	mySheet.SetColHidden(20,1);
          	strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 0.8|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 0.8|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       	} else {
			//전체
          	mySheet.SetColHidden(19,0);
          	mySheet.SetColHidden(20,0);
          	strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
       	}
	}

    mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1, AutoSum:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	
	mySheet.InitHeaders(headers, info);
	
	mySheet.SetMergeSheet(5);
	mySheet.SetAutoSumPosition(0);
    mySheet.SetCountPosition(1); 
      //지원안함[check again] UnitText="원, %";
	showUnitText("원, %");

}*/

/*---------------------------------------------*/
/* @기능 : PG그룹선택시 그리드 화면 컨드롤     */
/*---------------------------------------------*/
function selectpgcode()
{
    //allDelDataGrid(mySheet);
	showUnitText("원, %");
    
    initGrid();
}


/*-----------------------------------------*/
/* @기능 : 2022년도 상반기 기준 그리드 set */
/*         RMC                             */ 
/*-----------------------------------------*/
function setGrid2022_RMC()
{
   baseday  = document.frm.baseday.value;
  //mySheet.RemoveAll();
   mySheet.Reset();
   createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	
	strHeader0 = "점번호|점명|PG명|총금액(A)|" // 4
		      +"조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|"  // 조정실적 (10)
		      +"누증실적\n(C)=(A+B)|외화예수금\n순증실적(D)|최종 누증실적\n(E)=(C+D)|조정전\n기준실적(F)|조정후\n기준실적(G)|순증실적\n(H)=(E-G)|목표\n(I)|달성률\n(J)=(H/I)|" // 8
		      ;

	strHeader1 = "점번호|점명|PG명|총금액(A)|" // 4
		      +"소계|금융기관성|본부조달|임직원|단기신규해지|본부마케팅|마케팅제외|독도상품실적|평가제외|기타조정|"                    // 조정내역 (10)
		      +"누증실적\n(C)=(A+B)|외화예수금\n순증실적(D)|최종 누증실적\n(E)=(C+D)|조정전\n기준실적(F)|조정후\n기준실적(G)|순증실적\n(H)=(E-G)|목표\n(I)|달성률\n(J)=(H/I)|" // 8
		      ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:4 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",      PointCount:0,  DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",      PointCount:0,  DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",      PointCount:0,  DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",      PointCount:0,  DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",      PointCount:0,  DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",      PointCount:0,  DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",      PointCount:0,  DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",      PointCount:0,  DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",      PointCount:0,  DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",      PointCount:0,  DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",      PointCount:0,  DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",      PointCount:0,  DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",      PointCount:0,  DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",      PointCount:0,  DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",      PointCount:0,  DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",      PointCount:0,  DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",      PointCount:0,  DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",      PointCount:0,  DecimalAdjust:1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
   mySheet.InitColumns(cols);

   mySheet.SetEditable(0);
   mySheet.SetVisible(1);
   mySheet.SetAutoSumPosition(0);
   mySheet.SetCountPosition(1); 
   //지원안함[check again] UnitText="원, %";
   showUnitText("원, %");
   newSetActionMenu(mySheet,"엑셀내려받기");
}


/*-----------------------------------------*/
/* @기능 : 2020년도 상반기 기준 그리드 set */
/*         RMC                             */ 
/*-----------------------------------------*/
function setGrid2020_RMC()
{
  baseday  = document.frm.baseday.value;

  //mySheet.RemoveAll();
  mySheet.Reset();

  createIBSheet2(document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	
	if( baseday < '20210701') {
       	strHeader0 = "점번호|점명|PG명|총금액(A)|" // 4
          +"조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|"  // 조정실적 (10)
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)|" // 9
          ;    
		
		strHeader1 = "점번호|점명|PG명|총금액(A)|" // 4
          +"소계|금융기관성|본부조달|임직원가족|단기신규해지|본부마케팅|마케팅제외|독도상품실적|평가제외|기타조정|"                    // 조정내역 (10)
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)|" // 9
          ;
    }else {
        //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
        strHeader0 =  "점번호|점명|PG명|총금액(A)|" // 4
          +"조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|"  // 조정실적 (10)
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)|" // 9
          ;
        strHeader1 = "점번호|점명|PG명|총금액(A)|" // 4
          +"소계|금융기관성|본부조달|임직원|단기신규해지|본부마케팅|마케팅제외|독도상품실적|평가제외|기타조정|"                    // 조정내역 (10)
          +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|외화예수금\n순증실적(E)|최종 누증실적\n(F)=(C+D+E)|조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)|" // 9
          ;    		
    }

	
   mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:4 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|20|/|21|*100",Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
    mySheet.InitColumns(cols);


    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetCountPosition(1); 
      //지원안함[check again] UnitText="원, %";
	showUnitText("원, %");
    newSetActionMenu(mySheet,"엑셀내려받기");
}


/*-----------------------------------------*/
/* @기능 : 2019년도 상반기 기준 그리드 set */
/*         일반영업점                      */ 
/*-----------------------------------------*/
function setGrid2019()
{
	
  baseday  = document.frm.baseday.value;

  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

	strHeader0 =  
       "점번호|점명|PG명|총금액|총금액(A)\n(월중평잔적용)|"
      +"조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|"  // 조정실적 (14)
      +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|MMDA\n실적인정(E)|최종 누증실적\n(F)=(C+D+E)|조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)|";    
		
	strHeader1 = 
       "점번호|점명|PG명|총금액|총금액(A)\n(월중평잔적용)|"
      +"소계|금융기관성|RM(센터)실적|RM(영업점)실적|연구위원|타지점|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도상품실적|평가제외|기타조정|"                    // 조정내역(14)
      +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|MMDA\n실적인정(E)|최종 누증실적\n(F)=(C+D+E)|조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)|";

   mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|+|16|+|17|+|18|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|25|/|26|*100",Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
    mySheet.InitColumns(cols);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetCountPosition(1); 
      //지원안함[check again] UnitText="원, %";
	showUnitText("원, %");
    newSetActionMenu(mySheet,"엑셀내려받기");
}

/*-----------------------------------------*/
/* @기능 : 2019년도 상반기 기준 그리드 set */
/*         RMC                             */ 
/*-----------------------------------------*/
function setGrid2019_RMC()
{
  baseday  = document.frm.baseday.value;

  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정
	let strHeader0 = "";
	let strHeader1 = "";

	strHeader0 = "점번호|점명|PG명|총금액|총금액(A)\n(월중평잔적용)|"
      +"조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|조정실적(B)|"  // 조정실적 (10)
      +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|MMDA\n실적인정(E)|최종 누증실적\n(F)=(C+D+E)|조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)|";    
		
	strHeader1 = "점번호|점명|PG명|총금액|총금액(A)\n(월중평잔적용)|"
      +"소계|금융기관성|본부조달|임직원가족|단기신규해지|본부마케팅|마케팅제외|독도상품실적|평가제외|기타조정|"                    // 조정내역 (10)
      +"누증실적\n(C)=(A+B)|순수저비용성\n추가인정(D)|MMDA\n실적인정(E)|최종 누증실적\n(F)=(C+D+E)|조정전\n기준실적(G)|조정후\n기준실적(H)|순증실적\n(I)=(F-H)|목표\n(J)|달성률\n(K)=(I/J)|";
  
   mySheet.SetConfig( { SearchMode:2, MergeSheet:7, Page:20, FrozenCol:5 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|21|/|22|*100",Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
    mySheet.InitColumns(cols);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetCountPosition(1); 
      //지원안함[check again] UnitText="원, %";
	showUnitText("원, %");
    newSetActionMenu(mySheet,"엑셀내려받기");
}


/*-----------------------------------------*/
/* @기능 : 2017년 그리드 set               */
/*-----------------------------------------*/        
function setGrid2017()
{
    baseday = document.frm.baseday.value;
    fundgb  = document.frm.fundgb.value;	
	
  //mySheet.RemoveAll();
  mySheet.Reset();

  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정


	let strHeader0 = "";
	let strHeader1 = "";

	/*strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
      +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
      +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|개인실적\n추가인정 2배(G)|최종인정실적\n(H)=(F)+(G)|순증목표\n(G)|달성률\n(H)=(F)/(G)";    
		
	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
      +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|기타조정|체신관서|"  // 조정내역(B)
      +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|개인실적\n추가인정 2배(G)|최종인정실적\n(H)=(F)+(G)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
*/
	if (baseday >= '20170701'){
		if(fundgb == '12') {
			
			strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
	            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 2.0|개인실적\n추가인정 2배(G)|최종인정실적\n(F)=(E) X 2.0";
	          	
			strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
	            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|기타조정|체신관서|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 2.0|개인실적\n추가인정 2배(G)|최종인정실적\n(F)=(E) X 2.0";
	
		}else if(fundgb == '11'){
			
			strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
	            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";
	          	
			strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
	            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|기타조정|체신관서|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";
	
		}else{
			
			strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
		      +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
		      +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|개인실적\n추가인정 2배(G)|최종인정실적\n(H)=(F)+(G)|순증목표\n(G)|달성률\n(H)=(F)/(G)";    
			
			strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
		      +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|기타조정|체신관서|"  // 조정내역(B)
		      +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|개인실적\n추가인정 2배(G)|최종인정실적\n(H)=(F)+(G)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
			
		}
	}else if(baseday >= '20170101'){
		if(fundgb == '12') {
			
			strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
	            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 2.0|개인실적\n추가인정 2배(G)|최종인정실적\n(H)=(F)+(G)";
	          	
			strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
	            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|기타조정|체신관서|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 2.0|개인실적\n추가인정 2배(G)|최종인정실적\n(H)=(F)+(G)";
			
		}else if(fundgb == '11'){
			
			strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
	            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";
	          	
			strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
	            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|기타조정|체신관서|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";
	
		}else{
			strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
	            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|개인실적\n추가인정 2배(G)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
	          	
			strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
	            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|기타조정|체신관서|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|개인실적\n추가인정 2배(G)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
		}
	}
   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|+|16|+|17|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
    mySheet.InitColumns(cols);

	if (baseday >= '20170701'){
		if(fundgb == '12') {
			//순수 저원가성
          	mySheet.SetColHidden(17,0);
          	mySheet.SetColHidden(21,1);
          	mySheet.SetColHidden(22,1);
          	mySheet.SetColHidden(23,0);
          	mySheet.SetColHidden(24,1);
          	mySheet.SetColHidden(25,1);

		}else if(fundgb == '11'){
			//기업 MMDA
          	mySheet.SetColHidden(17,0);
          	mySheet.SetColHidden(21,1);
          	mySheet.SetColHidden(22,1);
          	mySheet.SetColHidden(23,1);
          	mySheet.SetColHidden(24,1);
          	mySheet.SetColHidden(25,1);
			
		}else{
			//전체
          	mySheet.SetColHidden(17,0);
          	mySheet.SetColHidden(21,0);
          	mySheet.SetColHidden(22,1);
          	mySheet.SetColHidden(23,1);
          	mySheet.SetColHidden(24,0);
          	mySheet.SetColHidden(25,0);
		}
	}else if(baseday >= '20170101'){
		if(fundgb == '12') {
			//순수 저원가성
          	mySheet.SetColHidden(17,1);
          	mySheet.SetColHidden(21,0);
          	mySheet.SetColHidden(22,0);
          	mySheet.SetColHidden(23,0);
          	mySheet.SetColHidden(24,1);
          	mySheet.SetColHidden(25,1);

		}else if(fundgb == '11'){
			//기업 MMDA
          	mySheet.SetColHidden(17,1);
          	mySheet.SetColHidden(21,1);
          	mySheet.SetColHidden(22,1);
          	mySheet.SetColHidden(23,1);
          	mySheet.SetColHidden(24,1);
          	mySheet.SetColHidden(25,1);

		}else{
			//전체
          	mySheet.SetColHidden(17,1);
          	mySheet.SetColHidden(21,1);	
          	mySheet.SetColHidden(22,1);
          	mySheet.SetColHidden(23,0);
          	mySheet.SetColHidden(24,0);
          	mySheet.SetColHidden(25,0);

		}
	}

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    //setFundgb();
    mySheet.SetCountPosition(1); 
      //지원안함[check again] UnitText="원, %";
	showUnitText("원, %");
    newSetActionMenu(mySheet,"엑셀내려받기");
}

/*-----------------------------------------*/
/* @기능 : 2016년 그리드 set               */
/*-----------------------------------------*/        
function setGrid2016()
{
	baseday = document.frm.baseday.value;
    fundgb  = document.frm.fundgb.value;

  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

  // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	
	if (baseday >= '20160101'){
		if(fundgb == '12') {
			
			strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
	            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 2.0|순증목표\n(G)|달성률\n(H)=(F)/(G)";

          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
	            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|기타조정|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 2.0|순증목표\n(G)|달성률\n(H)=(F)/(G)";
			
		} else if(fundgb == '11'){
			
			strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
	            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";

          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
	            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|기타조정|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";

		} else{
			
			strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
	            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";

          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
	            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|기타조정|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
		}
	}

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|+|16|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
    mySheet.InitColumns(cols);

    if(fundgb == '12') {
      	//순수 저원가성
      	mySheet.SetColHidden(20,0);
      	mySheet.SetColHidden(21,1);
      	mySheet.SetColHidden(22,1);
      	
    } else if(fundgb == '11') {
      	//기업 MMDA
      	mySheet.SetColHidden(20,1);
      	mySheet.SetColHidden(21,1);
      	mySheet.SetColHidden(22,1);
      	
    } else {
      	//전체
      	mySheet.SetColHidden(20,0);
      	mySheet.SetColHidden(21,0);
      	mySheet.SetColHidden(22,0);
      	
    }

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetCountPosition(1); 
      //지원안함[check again] UnitText="원, %";
	showUnitText("원, %");
    newSetActionMenu(mySheet,"엑셀내려받기");
}

/*-----------------------------------------*/
/* @기능 : 2015년 그리드 set               */
/*-----------------------------------------*/        
function setGrid2015()
{
	baseday = document.frm.baseday.value;
    fundgb  = document.frm.fundgb.value;
	
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

 // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";
	
	if (baseday >= '20150701'){
		if(fundgb == '12') {
			
			strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
	            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 2.0|순증목표\n(G)|달성률\n(H)=(F)/(G)";

          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
	            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 2.0|순증목표\n(G)|달성률\n(H)=(F)/(G)";

		}else if(fundgb == '11'){
			
			strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
	            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";

          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
	            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";

		}else{
			
			strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";

          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
		}
	}else if(baseday >= '20150101'){
		if(fundgb == '12') {
			
			strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
	            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1.5|순증목표\n(G)|달성률\n(H)=(F)/(G)";

          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
	            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1.5|순증목표\n(G)|달성률\n(H)=(F)/(G)";

		}else if(fundgb == '11'){
			
			strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
	            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";

          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
	            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1|순증목표\n(G)|달성률\n(H)=(F)/(G)";

		}else{
			
			strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
	            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";

          	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
	            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|부지점장권유예금|"
	            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";	

		}
	}

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Text",      Hidden:1, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
    mySheet.InitColumns(cols);

	if(baseday >= '20150701') {
	    if(fundgb == '12') {
	 	   	//순수 저원가성
	 	   	mySheet.SetColHidden(19,0);
	 	   	mySheet.SetColHidden(20,1);
	 	   	mySheet.SetColHidden(21,1);
	     
	    } else if(fundgb == '11') {
	 	   	//기업 MMDA
	 	   	mySheet.SetColHidden(19,1);
	 	   	mySheet.SetColHidden(20,1);
	 	   	mySheet.SetColHidden(21,1);
	     
	    } else {
	 	   	//전체
	 	   	mySheet.SetColHidden(19,0);
	 	   	mySheet.SetColHidden(20,0);
	 	   	mySheet.SetColHidden(21,0);
	        	
	     	}
	 } else if(baseday >= '20150101') {   //부지점장권유예금 추가. 201501
		if(fundgb == '12') {
		   	//순수 저원가성
		   	mySheet.SetColHidden(19,0);
		   	mySheet.SetColHidden(20,1);
		   	mySheet.SetColHidden(21,1);
		 
		} else if(fundgb == '11') {
		   	//기업 MMDA
		   	mySheet.SetColHidden(19,1);
		   	mySheet.SetColHidden(20,1);
		   	mySheet.SetColHidden(21,1);
		 
		} else {
		   	//전체
		   	mySheet.SetColHidden(19,0);
		   	mySheet.SetColHidden(20,0);
		   	mySheet.SetColHidden(21,0);
		 
		}
	}

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetCountPosition(1); 
      //지원안함[check again] UnitText="원, %";
	showUnitText("원, %");
    newSetActionMenu(mySheet,"엑셀내려받기");
}

/*-----------------------------------------*/
/* @기능 : 2014년 하반기 이후 그리드 set   */
/*-----------------------------------------*/        
function setGrid2014Q3()
{
	fundgb  = document.frm.fundgb.value;
	
  	//mySheet.RemoveAll();
  	mySheet.Reset();
  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

 	// 상위 GRID에 대한 속성정보 설정
	let strHeader0 = "";
	let strHeader1 = "";
	
	
	if(fundgb == '12') {
    	//순수 저원가성
		strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1.3|순증목표\n(G)|달성률\n(H)=(F)/(G)";
        strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 1.3|순증목표\n(G)|달성률\n(H)=(F)/(G)";
	} else if(fundgb == '11') {
		//기업 MMDA
       	strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 0.8|순증목표\n(G)|달성률\n(H)=(F)/(G)";
        	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)=(E) X 0.8|순증목표\n(G)|달성률\n(H)=(F)/(G)";
	} else {
		strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
            +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
        strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
            +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|"
            +"누증실적\n(C)=(A+B)|기준실적\n(D)|순증실적\n(E)=(C)-(D)|인정실적\n(F)|순증목표\n(G)|달성률\n(H)=(F)/(G)";
	}

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
    mySheet.InitColumns(cols);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetCountPosition(1); 
      //지원안함[check again] UnitText="원, %";
	showUnitText("원, %");
    newSetActionMenu(mySheet,"엑셀내려받기");

	if(fundgb == '12') {
    	//순수 저원가성
		mySheet.SetColHidden(19,1);
        mySheet.SetColHidden(20,1);
	} else if(fundgb == '11') {
		//기업 MMDA
       	mySheet.SetColHidden(19,1);
        mySheet.SetColHidden(20,1);
	} else {
		mySheet.SetColHidden(19,0);
        mySheet.SetColHidden(20,0);
	}
}

/*----------------------------------------------------*/
/* @기능 : 2014년 이후 그리드 set - 최소유지평잔 추가 */
/*----------------------------------------------------*/        
function setGrid2014()
{
  	//mySheet.RemoveAll();
  	mySheet.Reset();

  	createIBSheet2(document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

 	// 상위 GRID에 대한 속성정보 설정
	let strHeader0 = "";
	let strHeader1 = "";

	strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
      +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
      +"누증실적\n(C)=(A+B)|'13년말 잔액\n(D)|최소유지평잔\n(E)|'14년 조정잔액\n(F)|인정실적(G)\n(C,D,E,F 비교)"
      ;    
		
	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
      +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|구속성예금|임직원가족|단기신규해지|본부마케팅|독도지점교차실적|"  // 조정내역(B)
      +"누증실적\n(C)=(A+B)|'13년말 잔액\n(D)|최소유지평잔\n(E)|'14년 조정잔액\n(F)|인정실적(G)\n(C,D,E,F 비교)"
      ;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
    	mySheet.InitColumns(cols);

    	mySheet.SetEditable(0);
    	mySheet.SetVisible(1);
    	mySheet.SetAutoSumPosition(0);
    	mySheet.SetCountPosition(1); 
      	//지원안함[check again] UnitText="원, %";
		showUnitText("원, %");
    	newSetActionMenu(mySheet,"엑셀내려받기");
}

/*------------------------------------------------------------------------------*/
/* @기능 : 2013년 7월 31일 이후 그리드 set - 수시입출식 상반기 대비 가중치 반영 */
/*------------------------------------------------------------------------------*/        
function setGrid20130731()
{
  //mySheet.RemoveAll();
  mySheet.Reset();
  createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

 // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

	strHeader0 = "점번호|점명|PG명|총금액\n(A)|"
      +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|"
      +"누증실적\n(C)=(A+B)|기준실적\n(D)|'12년말 잔액\n(E)|인정실적(F)\n(C-D),(C-min(D,E))|하반기순증\n가중치인정\n실적(G)|최종인정실적\n (H)=(F+G)"
      ;    
		
	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
      +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|혐의거래|외환전문역마케팅|구속성예금|임직원가족|본부마케팅|독도지점교차실적|"  // 조정내역(B)
      +"누증실적\n(C)=(A+B)|기준실적\n(D)|'12년말 잔액\n(E)|인정실적(F)\n(C-D),(C-min(D,E))|하반기순증\n가중치인정\n실적(G)|최종인정실적\n (H)=(F+G)"
      ;

   mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
   mySheet.InitHeaders(headers, info);

   var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
    mySheet.InitColumns(cols);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetCountPosition(1); 
      //지원안함[check again] UnitText="원, %";
	showUnitText("원, %");
    newSetActionMenu(mySheet,"엑셀내려받기");

}

/*---------------------------------------*/
/* @기능 : 2013년도  기준 그리드 set */
/*---------------------------------------*/        
function setGrid2013()
{
	baseday   = document.frm.baseday.value;
	
	//mySheet.RemoveAll();
  	mySheet.Reset();
  
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

 // 상위 GRID에 대한 속성정보 설정

	let strHeader0 = "";
	let strHeader1 = "";

	strHeader0 = "점번호|점명|PG명|총금액\n(A)|" //4
      +"조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|조정내역(B)|" //12
      +"누증실적\n(C)=(A+B)|기준실적\n(D)|'12년말 잔액\n(E)|인정실적(F)\n(C-D),(C-min(D,E))" //5
      ;    
		
	strHeader1 = "점번호|점명|PG명|총금액\n(A)|"
      +"소계|금융기관성|RM실적|연구위원 등|타지점 등|본부조달|혐의거래|외환전문역마케팅|구속성예금|임직원가족|본부마케팅|독도지점교차실적|"  // 조정내역(B)
      +"누증실적\n(C)=(A+B)|기준실적\n(D)|'12년말 잔액\n(E)|인정실적(F)\n(C-D),(C-min(D,E))"
      ;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:strHeader0, Align:"Center"},
                	   { Text:strHeader1, Align:"Center"} ];

   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Text",     Hidden:0,  MinWidth:180,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
          {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"|5|+|6|+|7|+|8|+|9|+|10|+|11|+|12|+|13|+|14|+|15|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
    mySheet.InitColumns(cols);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(0);
    mySheet.SetCountPosition(1); 
      //지원안함[check again] UnitText="원, %";
	showUnitText("원, %");
    newSetActionMenu(mySheet,"엑셀내려받기");

}
