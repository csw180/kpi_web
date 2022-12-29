/*Sheet 기본 설정 */
function LoadPage()
{
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	createIBSheet2(  document.getElementById("hiddenGrid2Obj"),"hiddenGrid2", "750px", "400px");
  	createIBSheet2(  document.getElementById("hiddenGrid3Obj"),"hiddenGrid3", "750px", "400px");
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

  	// 동일점 직원번호 Hidden GRID에 대한 속성정보 설정
  	hiddenGrid3.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info1    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers1 = [ { Text:"직원번호", Align:"Center"} ];
   	hiddenGrid3.InitHeaders(headers1, info1);

   	var cols1 = [ {Type:"Text",      Hidden:0,  MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
   	hiddenGrid3.InitColumns(cols1);

   	hiddenGrid3.SetEditable(0);
   	hiddenGrid3.SetVisible(0);
  	doAction("직원번호");
  	doAction("기준년월");
}

function ComboValue(el)
{
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
    jikwonno     = document.frm.jikwonno.value;
    stmonth      = document.frm.stmonth.value;
    edmonth      = document.frm.edmonth.value;
    segb         = document.frm.segb.value;
    pigb         = document.frm.pigb.value;
    searchCode   = document.frm.searchCode.value;        // 조회사유코드    

    switch(sAction)
    {
        case "고정필드설정":
        	mySheet.SetFrozenCol(mySheet.MouseCol());
        	ufSetMergeCell(mySheet,mySheet.LastRow(), 0, 1,2);
        	break;
        case "고정필드해제":
        	mySheet.SetFrozenCol(0);
        	ufSetMergeCell(mySheet,mySheet.LastRow(), 0, 1,2);
        	break;
        case "기준년월":
            if (monthRole != "true") {
            	 hiddenGrid2.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=6&stmonth=201101");   //종합이익증대평가는 2011년부터 개발됨.
            }
            else { 
            	 hiddenGrid2.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=9&stmonth=201101"); 
            }
            break;

        case "직원번호":
            hiddenGrid3.DoSearch("kpi.rpop.rpop_5021.screen?hidden_key=9"); 
            break;

        case "조회":                                            // 조회
            if(jikwonno == "" || jikwonno == null)
            {
              alert("직원번호는 필수입니다.");
              return;
            }

            if (allRole != "true") {
            	 jikwonno = "0000000000" + jikwonno;  // 직원번호 10자리 '0' 채움
            	 jikwonno = jikwonno.substring(jikwonno.length-10,jikwonno.length);  // 직원번호 10자리로 생성

               var fRow = hiddenGrid3.FindText(0, jikwonno, 0, true);
               if (fRow <= 0 ) {
                  alert("  동일점포 직원번호만  \n\n  조회가능합니다.");
                 return;
               }
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

            if(pigb == 'N' &&  stmonth.substr(0, 4) < "2012")
            {
              alert("미대상실적은 2012년 부터 조회가능합니다.");
              return;
            }

            if(segb == 2 &&  stmonth.substr(0, 4) < "2014")
            {
              alert("우수직원실적평가는 2014년부터 조회가능합니다.");
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

                mySheet.DoSearch("rpop.scr.rpop_scr_5030.do?hidden_key=0&jikwonno=" + jikwonno
                                                                  +"&stmonth="  + stmonth
                                                                  +"&edmonth="  + edmonth
                                                                  +"&segb="+ segb
                                                                  +"&pigb="+ pigb
                                                                  +"&searchCode="+ searchCode
                                                                  +"&pg_url="+ pg_url
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

            if (segb == 1){
                inqText[2]    = new Array();
                inqText[2][0] = "조회구분";
                inqText[2][1] = "종합이익증대평가";
            }else {
                inqText[2]    = new Array();
                inqText[2][0] = "조회구분";
                inqText[2][1] = "우수직원실적평가";
            }
           
            if (pigb == 'Y'){
                inqText[3]    = new Array();
                inqText[3][0] = "실적구분";
                inqText[3][1] = "대상실적";
            }else {
                inqText[3]    = new Array();
                inqText[3][0] = "실적구분";
                inqText[3][1] = "미대상실적";
            }

            inqText[4]    = new Array();
            inqText[4][0] = "조회사유코드";
            inqText[4][1] = document.frm.searchCode.options[document.frm.searchCode.selectedIndex].text;            
                                    
            // 보안등급세팅
            seqLevel = document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[5]    = new Array();
                inqText[5][0] = "보안등급";
                inqText[5][1] = document.frm.Security_Level.value;
            }
                
            //doExcelPW(mySheet, inqText, true); //common.js 활용하여 excel 출력

            rExcVal = doExcelPW(mySheet, inqText, true); //common.js 활용하여 excel 출력
            // 엑셀다운로드시 로그 저장
            /*if(rExcVal) {
               condition = "직원번호="+jikwonno+";조회구간="+stmonth + "~" + edmonth;
               hiddenGrid2.DoSearch("comm.scr.comm_scr_9096.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=3"
                                     +"&searchCode="+searchCode+"&pg_url="+pg_url); // gubun 1:rpdy(일일성과) 2:rpop(영업점성과), 3:rpop(개인PI)
            }*/
            break;      
    }
}

// 실적구분 선택시
function onpigb()
{		
    stmonth  = document.frm.stmonth.value;  
    
    allDelDataGrid(mySheet);
    showUnitText("원");

    if (stmonth >= '201301'){
        if (document.frm.pigb.value == 'Y') {    	 
            mySheet.SetColHidden(18,1);
        } else {
    	       mySheet.SetColHidden(18,0);
        }
    }else { 
         if (document.frm.pigb.value == 'Y') {    	 
             mySheet.SetColHidden(14,1);
         } else {
    	       mySheet.SetColHidden(14,0);
         }
   }  	
}

	
function initGrid()
{  
    stmonth  = document.frm.stmonth.value;
        
    if (stmonth >= '201301') setGrid2013();
    else setGrid();
}

function setGrid2013()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	stmonth  = document.frm.stmonth.value;
      
  	// 상위 GRID에 대한 속성정보 설정
  	//GridConfig(mySheet);
  	mySheet.SetWaitTimeOut(600);
  
    for(col=13; col<13; col++ ){
    	mySheet.SetCellAlign(0,col,"CenterTop");
    }

    mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

    var strHeader0 = "성명|소속|직급|계좌번호|고객명|고객번호|신규일|손익코드|계정명|세목명|평가대상구분|기간평잔|순이자이익(+)|충당전순이자이익|대손충당금\n<순이자>|비이자이익(+)|충당전비이자이익|대손충당금\n<비이자>|평가제외사유";

    var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:strHeader0, Align:"Center"} ];
    
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",      Hidden:0,  MinWidth:70,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
           {Type:"Text",      Hidden:0,  MinWidth:150,  Align:"Left",    SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
           {Type:"Text",      Hidden:0,  MinWidth:70,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
           {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Center",   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"Text",      Hidden:0,  MinWidth:50,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
           {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Center",   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"Date",      Hidden:0,  MinWidth:80,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"Ymd",         PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"Text",      Hidden:0,  MinWidth:70,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"Text",      Hidden:0,  MinWidth:150,  Align:"Left",    SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
           {Type:"Text",      Hidden:0,  MinWidth:70,   Align:"Left",    SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"Text",      Hidden:0,  MinWidth:50,   Align:"Left",    SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"AutoSum",   Hidden:0, MinWidth:70,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"AutoSum",   Hidden:0, MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"AutoSum",   Hidden:0, MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"AutoSum",   Hidden:0, MinWidth:70,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"Text",      Hidden:0,  MinWidth:150,  Align:"Left",    SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
     
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);

    mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(-1);
    mySheet.SetColHidden(13,1);
    mySheet.SetColHidden(14,1);
    mySheet.SetColHidden(16,1);
    mySheet.SetColHidden(17,1);
    newSetActionMenu(mySheet,"엑셀내려받기");
    mySheet.SetRowHeight(1,22);
	showUnitText("원");
	onpigb();
}

function setGrid()
{
	if(typeof(mySheet) !== "undefined") {
		mySheet.Reset();
	}
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	stmonth = document.frm.stmonth.value;
  
  // 상위 GRID에 대한 속성정보 설정
   	//GridConfig(mySheet);
    mySheet.SetWaitTimeOut(600);

    mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

    var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:"성명|소속|직급|계좌번호|고객명|고객번호|신규일|손익코드|계정명|세목명|평가대상구분|기간평잔|순이자이익|비이자이익|평가제외사유", Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",      Hidden:0,  MinWidth:70,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
           {Type:"Text",      Hidden:0,  MinWidth:150,  Align:"Left",    SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
           {Type:"Text",      Hidden:0,  MinWidth:70,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
           {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Center",   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"Text",      Hidden:0,  MinWidth:50,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
           {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Center",   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"Date",      Hidden:0,  MinWidth:80,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"Ymd",         PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"Text",      Hidden:0,  MinWidth:70,   Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"Text",      Hidden:0,  MinWidth:150,  Align:"Left",    SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
           {Type:"Text",      Hidden:0,  MinWidth:70,   Align:"Left",    SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"Text",      Hidden:0,  MinWidth:50,   Align:"Left",    SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"AutoSum",   Hidden:0, MinWidth:70,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"AutoSum",   Hidden:0, MinWidth:70,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"AutoSum",   Hidden:0, MinWidth:50,   Align:"Right",   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
           {Type:"Text",      Hidden:0,  MinWidth:150,  Align:"Left",    SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
     
    mySheet.InitColumns(cols);
	mySheet.SetCountPosition(1);
	mySheet.SetEditable(0);
    mySheet.SetVisible(1);
    mySheet.SetAutoSumPosition(-1);
    newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원");
    onpigb();
}