/*Sheet 기본 설정 */
function LoadPage()
{
	//hiddenGrid2  = document.frm.hiddenGrid2;
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	createIBSheet2(  document.getElementById("hiddenGrid2Obj"),"hiddenGrid2", "200px", "400px");
	// 기준월 정보 Hidden GRID에 대한 속성정보 설정
	hiddenGrid2.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"HIDDEN", Align:"Center"} ];
   	hiddenGrid2.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
   	hiddenGrid2.InitColumns(cols);
    hiddenGrid2.SetVisible(0);
   	hiddenGrid2.SetEditable(0);

   	doAction("기준년월");
}

function ComboValue(el)
{
    //hiddenGrid2  = document.frm.hiddenGrid2;
    for ( ;el.options.length>1;) el.options.remove(1);
    for(i=1;i<=hiddenGrid2.GetTotalRows();i++){
       var oOption=document.createElement("OPTION");
       oOption.text=hiddenGrid2.GetCellValue(i, 1);
       oOption.value=hiddenGrid2.GetCellValue(i, 0);
       el.options.add(oOption);
    }
}
/* Sheet 각종 처리 */
function doAction(sAction)
{
    //mySheet      = document.frm.mySheet;
    //hiddenGrid2  = document.frm.hiddenGrid2;
    jikwonno     = document.frm.jikwonno.value;
    stmonth      = document.frm.stmonth.value;
    edmonth      = document.frm.edmonth.value;
    searchCode   = document.frm.searchCode.value;        // 조회사유코드


    switch(sAction)
    {
        case "고정필드설정":
        	mySheet.SetFrozenCol(mySheet.MouseCol());
        	ufSetMergeCell(mySheet, mySheet.HeaderRows(), 0, 1,2);
        	break;
        case "고정필드해제":
        	mySheet.SetFrozenCol(0);
        	ufSetMergeCell(mySheet, mySheet.HeaderRows(), 0, 1,2);
        	break;
        case "기준년월":
            hiddenGrid2.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&stmonth=201307");
            break;
        case "조회":                                            // 조회
            if(jikwonno == "" || jikwonno == null)
            {
              alert("직원번호는 필수입니다.");
              return;
            }
            
            if(stmonth > edmonth)
            {
              alert("조회구간의 시작년월이 종료년월 보다 같거나 작아야 합니다.");
              return;
            }

            if(stmonth.substr(0, 4) != edmonth.substr(0, 4))
            {
              alert("조회구간이 동일년도 이어야 합니다.");
              return;
            }
            if(searchCode == '00')
            {
              alert("조회사유코드는 필수입니다.");
              return;
            }

            result = confirm('본 보고서는 조회시간이 몇분 정도 걸릴수 있습니다.\n\n계속해서 조회하시겠습니까?');
            
            if(result)
            {

                mySheet.DoSearch("rpop.scr.rpop_scr_5080.do?hidden_key=0&jikwonno=" + jikwonno
                                                                  +"&stmonth="      + stmonth
                                                                  +"&edmonth="      + edmonth
                                                                  +"&searchCode="   + searchCode
                                                                  +"&pg_url="       + pg_url
                                                                  );
                //mySheet.FitSize(false,true);
            }
            
            break;
        case "엑셀내려받기":    // 엑셀내려받기
            inqText       = new Array();
            inqText[0]    = new Array();
            inqText[0][0] = "직원번호";
            inqText[0][1] = jikwonno;

            inqText[1]    = new Array();
            inqText[1][0] = "조회구간";
            inqText[1][1] = stmonth + '~' + edmonth;

            inqText[2]    = new Array();
            inqText[2][0] = "조회사유코드";
            inqText[2][1] = document.frm.searchCode.options[document.frm.searchCode.selectedIndex].text;            

            // 보안등급세팅
            seqLevel = document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[3]    = new Array();
                inqText[3][0] = "보안등급";
                inqText[3][1] = document.frm.Security_Level.value;
            }
                
            rExcVal = doExcelPW(mySheet, inqText, true); //common.js 활용하여 excel 출력
            // 엑셀다운로드시 로그 저장
            /*if(rExcVal) {
               condition = "직원번호="+jikwonno+";조회구간="+stmonth + "~" + edmonth;
               hiddenGrid2.DoSearch("comm.scr.comm_scr_9096.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2" // gubun 1:rpdy(일일성과) 2:rpop(영업점성과)
                                    +"&cust_no=0"+"&searchCode="+searchCode+"&pg_url="+pg_url);
            }*/
            break;      
    }
}
	
function initGrid()
{  
    setGrid2013();
}

function setGrid2013()
{
  	//mySheet = document.frm.mySheet;
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "780px");

  	stmonth  = document.frm.stmonth.value;
      
  	// 상위 GRID에 대한 속성정보 설정
 	mySheet.SetWaitTimeOut(600);
    i=0;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );
	
	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:"직급|성명|취급점번호|취급점명|신규일|계좌번호|계정과목코드|계정과목명|고객번호|고객명|잔액|평잔|이자이익\n(A)|비이자이익\n(B)|정상예상손실금액\n(C)|자본비용\n(D)|충당금\n(E)|이익\n(F)=(A+B-C-D-E)", Align:"Center"} ];
	mySheet.InitHeaders(headers, info);
	
	var cols = [ {Type:"Text",      Hidden:0,  MinWidth:50,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
	         {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
	         {Type:"Text",      Hidden:0,  MinWidth:70,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
	         {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
	         {Type:"Date",      Hidden:0,  MinWidth:60,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"Ymd",         PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
	         {Type:"Text",      Hidden:0,  MinWidth:110,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
	         {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
	         {Type:"Text",      Hidden:0,  MinWidth:110,  Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
	         {Type:"Text",      Hidden:0,  MinWidth:70,   Align:"Left",    SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
	         {Type:"Text",      Hidden:0,  MinWidth:120,  Align:"Left",    SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
	         {Type:"AutoSum",   Hidden:0, MinWidth:110,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	         {Type:"AutoSum",   Hidden:0, MinWidth:110,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	         {Type:"AutoSum",   Hidden:0, MinWidth:110,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	         {Type:"AutoSum",   Hidden:0, MinWidth:110,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	         {Type:"AutoSum",   Hidden:0, MinWidth:110,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	         {Type:"AutoSum",   Hidden:0, MinWidth:110,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	         {Type:"AutoSum",   Hidden:0, MinWidth:110,  Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	         {Type:"AutoSum",   Hidden:0, MinWidth:110,  Align:"Right",   SaveName:"",  CalcLogic:"|12|+|13|-|14|-|15|-|16|",Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
	   
	mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);
	
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(1);
	//지원안함[check again] UnitText="원";
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(0,20);
	showUnitText("원");
}
