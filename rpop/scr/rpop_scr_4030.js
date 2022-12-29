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
function LoadPage()
{
	createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "750px", "400px");
	
	hiddenGrid.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
    var headers = [ { Text:"HIDDEN", Align:"Center"} ];
    
	hiddenGrid.InitHeaders(headers, info);

    var cols = [ {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
                
    hiddenGrid.InitColumns(cols);

	hiddenGrid.SetVisible(0);
    hiddenGrid.SetEditable(0);

  	doAction("기준년월");

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
	for(i=1;i<=hiddenGrid.GetTotalRows();i++) {
    	var oOption=document.createElement("OPTION");
		oOption.text=hiddenGrid.GetCellValue(i, 1);
		oOption.value=hiddenGrid.GetCellValue(i, 0);
       	el.options.add(oOption);
    }
}

function selectmonth()
{
    initGrid();  // 연체율 화면 그리드 초기화
    basemonth   = document.frm.basemonth.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=7&pggubun=2");
}
/* Sheet 각종 처리 */
function doAction(sAction)
{
    isSelected  = true;
    basemonth   = document.frm.basemonth.value;
    pgcode      = document.frm.pgcode.value;

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
        case "기준년월":             // 조회(상위 GRID)
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3");
            break;
        case "조회":             // 조회(상위 GRID)
            mySheet.DoSearch("rpop.scr.rpop_scr_4030.do?hidden_key=9&basemonth="+basemonth+"&pgcode="+pgcode+"&period="+4);
            //mySheet.FitSize(false, true);
            break;
        case "엑셀내려받기":    // 엑셀내려받기
            inqText       = new Array();
            inqText[0]    = new Array();
            inqText[0][0] = "작업기준년월";
            inqText[0][1] = basemonth;
            inqText[1]    = new Array();
            inqText[1][0] = "성과주기";
            inqText[1][1] = "년";
            inqText[2]    = new Array();
            inqText[2][0] = "PG명";
            inqText[2][1] = document.frm.pgcode.options[document.frm.pgcode.selectedIndex].text;
            // 보안등급세팅
            inqText[3]    = new Array();
            inqText[3][0] = "보안등급";
            inqText[3][1] = document.frm.Security_Level.value;


            rExcVal = doExcel(mySheet, inqText, false); //common.js 활용하여 excel 출력

            // 엑셀다운로드시 로그 저장
           /* if(rExcVal) {
               condition = "기준년월="+basemonth+";PG코드="+pgcode;
               hiddenGrid.DoSearch("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2"); // gubun 1:rpdy(일일성과) 2:rpop(영업점성과)
            }*/
            break;
    }
}

/*--------------------------------------------*/
/* @기능 : 선택된 기준년월에 따른 그리드 init */
/*--------------------------------------------*/
function initGrid()
{
	basemonth   = document.frm.basemonth.value;

    if (basemonth <= '200812')  setGrid2008();
    else if (basemonth <= '200912')  setGrid2009();
    else if (basemonth <= '201012')  setGrid2010();
    else if (basemonth <= '201112')  setGrid2011();
    else if (basemonth <= '201206')  setGrid2012();
    else if (basemonth <= '201212')  setGrid201207();
    else if (basemonth <= '201312')  setGrid2013();
    else if (basemonth <= '201406')  setGrid2014();
    else if (basemonth <= '201412')  setGrid2014Q3();
    else if (basemonth <= '201506')  setGrid2015();
    else if (basemonth <= '201512')  setGrid2015Q3();
    else if (basemonth <= '201606')  setGrid2016();
    else if (basemonth <= '201612')  setGrid2016Q3();
    else if (basemonth <= '201706')  setGrid2017();
    else if (basemonth <= '201712')  setGrid2017Q3();
    else if (basemonth <= '201806')  setGrid2018();
    else if (basemonth <= '201812')  setGrid2018Q3();
    else if (basemonth <= '201906')  setGrid2019H1();
    else if (basemonth <= '201912')  setGrid2019H2();
    else if (basemonth <= '202006')  setGrid2020H1();
    else if (basemonth <= '202012')  setGrid2020H2();
    else if (basemonth <= '202106')  setGrid2021H1();
    else if (basemonth <= '202109')  setGrid2021H2();
    else if (basemonth <= '202112')  setGrid2021Q4();
    else setGrid2022H1();
}

/*-----------------------------------------*/
/* @기능 : 2022년도 상반기 기준 그리드 set  */
/*-----------------------------------------*/
function setGrid2022H1()
{
	month   = document.frm.basemonth.value.substring(4,6);
	if(typeof(mySheet) !== "undefined") {
		
		 mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	
	let strHeader0 = "점번호|점명|PG명|"                                                                                                       //3
         +"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"                                    //4
         +"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"                                    //4
         +"기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|"                                    //4
         +"기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|"                                    //4
         +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"                                                              //2
         +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"                                                              //2
         +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"                                                              //2
         +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"                                                              //2
         +"기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|"                                                              //2
         +"기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|"                                                              //2
         +"기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|"                                                              //2
         +"기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|"                                                              //2
         +"핵심예수금(반기평잔)|핵심예수금(반기평잔)|핵심예수금(반기평잔)|핵심예수금(반기평잔)|"                                    //4
         +"핵심예수금(월중평잔)|핵심예수금(월중평잔)|핵심예수금(월중평잔)|핵심예수금(월중평잔)|"                                    //4
         +"대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|"                                                    //4
         +"외환사업(이자이익)|외환사업(이자이익)|외환사업(이자이익)|외환사업(이자이익)|"                                            //4
         +"외환사업(이자이익)|외환사업(이자이익)|외환사업(이자이익)|외환사업(이자이익)|"                                            //4
         +"외환사업(비이자이익)|외환사업(비이자이익)|외환사업(비이자이익)|외환사업(비이자이익)|"                                    //4
         +"외환사업(비이자이익)|외환사업(비이자이익)|외환사업(비이자이익)|외환사업(비이자이익)|"                                    //4
         +"카드사업(전체매출액)|카드사업(전체매출액)|카드사업(전체매출액)|카드사업(전체매출액)|"                                    //4
         +"카드사업(유효회원)|카드사업(유효회원)|카드사업(유효회원)|카드사업(유효회원)|"                                            //4
         +"신탁사업(특정금전)|신탁사업(특정금전)|신탁사업(특정금전)|신탁사업(특정금전)|"                                            //4
         +"신탁사업(부동산)|신탁사업(부동산)|신탁사업(부동산)|신탁사업(부동산)|신탁사업(부동산)|신탁사업(부동산)|"                  //6
         +"공제사업(이익)|공제사업(이익)|공제사업(이익)|공제사업(이익)|"                                                            //4
         +"공제사업(환산공제료)|공제사업(환산공제료)|공제사업(환산공제료)|공제사업(환산공제료)|"                                    //4
         +"펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|"                              //6
         +"펀드사업(잔고원금)|펀드사업(잔고원금)|펀드사업(잔고원금)|펀드사업(잔고원금)|"                                            //4
         +"펀드사업(잔고원금)|펀드사업(잔고원금)|펀드사업(잔고원금)|"                                                               //3
         +"펀드사업(고객수)|펀드사업(고객수)|펀드사업(고객수)|펀드사업(고객수)|"                                                    //4
         ;
	let strHeader1 = "점번호|점명|PG명|"                                                        //점관련                            3
         +"목표|실적|달성률|평점/배점|"                                              //개인예수금(반기평잔)              4
         +"목표|실적|달성률|평점/배점|"                                              //개인예수금(순증잔액)              4
         +"목표|실적|달성률|평점/배점|"                                              //기업예수금(반기평잔)              4
         +"목표|실적|달성률|평점/배점|"                                              //기업예수금(순증잔액)              4
         +"목표|실적|달성률|평점/배점|"                                              //개인저비용(반평)                  4
         +"목표|실적|달성률|평점/배점|"                                              //개인저비용(월평)                  4
         +"목표|실적|달성률|평점/배점|"                                              //기업저비용(반평)                  4
         +"목표|실적|달성률|평점/배점|"                                              //기업저비용(월평)                  4
         +"목표|실적|달성률|평점/배점|"                                              //핵심예수금(반기평잔)              4
         +"목표|실적|달성률|평점/배점|"                                              //핵심예수금(월중평잔)              4
         +"목표|실적|달성률|평점/배점|"                                              //대출금(순증잔액)                  4
         +"목표|실적|달성률|이자초과\n실적차감|비이자초과\n실적가산|최종실적|최종달성률|평점/배점|"             //외환사업(이자이익)   4
         +"목표|실적|달성률|비이자초과\n실적차감|이자초과\n실적가산|최종실적|최종달성률|평점/배점|"             //외환사업(비이자이익) 4
         +"목표|실적|달성률|평점/배점|"                                              //카드사업(전체매출액)              4
         +"목표|실적|달성률|평점/배점|"                                              //카드사업(유효회원)                4
         +"목표|실적|달성률|평점/배점|"                                              //신탁사업(특정금전)                4
         +"목표|실적|타기관|최종실적|달성률|평점/배점|"                              //신탁사업(부동산)                  6
         +"목표|실적|달성률|평점/배점|"                                              //공제사업(이익)                    4
         +"목표|실적|달성률|평점/배점|"                                              //공제사업(환산공제료)              4
         +"목표|판매보수|판매수수료|최종실적|달성률|평점/배점|"                      //펀드사업(이익)                    6
         +"목표|채권형 및 MMF 제외|채권형|MMF|최종실적|달성률|평점/배점|"            //펀드사업(잔고원금)                6
         +"목표|실적|달성률|평점/배점|"                                              //펀드사업(고객수)                  4
         ;

  // 상위 GRID에 대한 속성정보 설정
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );
	
	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
	          { Text:strHeader1, Align:"Center"} ];
	mySheet.InitHeaders(headers, info);
	
	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	    {Type:"Text",     Hidden:0,  MinWidth:180,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	    {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },

    //개인예수금(반기평잔)
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },

    //개인예수금(순증잔액)
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },

    //기업예수금(반기평잔)
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },

    //기업예수금(순증잔액)
	    
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },

    //개인저비용(반평)
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },

    //개인저비용(월평)
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },

    //기업저비용(반평)
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },

    //기업저비용(월평)
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },

    //핵심예수금(반기평잔)
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },

    //핵심예수금(월중평잔)
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },

    //대출금(순증잔액)
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },

    //외환사업(이지이악)
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },

    //외환사업(비이지이악)
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },

    //카드사업(전체매출액)
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },

    //카드사업(유효회원)
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },

    //신탁사업(특정금전)
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },

    //신탁사업(부동산)
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },

    //공제사업(이익)
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },

    //공제사업(환산공제료)
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },

    //펀드사업(이익)
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },

    //펀드사업(잔고원금)
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },

    //펀드사업(고객수)
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
	 
	mySheet.InitColumns(cols);
	
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetDataLinkMouse(true);
	mySheet.SetCountPosition(1);
	//지원안함[check again] UnitText="원, %, 점수";
	showUnitText("원, %, 점수")
	newSetActionMenu(mySheet,"엑셀내려받기");
}

/*-----------------------------------------*/
/* @기능 : 2021년도 4분기 기준 그리드 set  */
/*-----------------------------------------*/
function setGrid2021Q4()
{
  	month   = document.frm.basemonth.value.substring(4,6);
  	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	
	let strHeader0 = "점번호|점명|PG명|"                                                                                                       //3
         +"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"                                    //4
         +"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"                                    //4
         +"기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|"                                    //4
         +"기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|"                                    //4
         +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"                                                              //2
         +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"                                                              //2
         +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"                                                              //2
         +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"                                                              //2
         +"기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|"                                                              //2
         +"기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|"                                                              //2
         +"기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|"                                                              //2
         +"기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|"                                                              //2
         +"대출금(순증잔액_최종밴드평가)|대출금(순증잔액_최종밴드평가)|"                                                            //2
         +"대출금(순증잔액_최종밴드평가)|대출금(순증잔액_최종밴드평가)|"                                                            //2
         +"신규대출금|신규대출금|신규대출금|신규대출금|신규대출금|신규대출금|신규대출금|"                                           //7
         +"외환사업(이익)|외환사업(이익)|외환사업(이익)|외환사업(이익)|"                                                            //4
         +"카드사업(전체매출액)|카드사업(전체매출액)|카드사업(전체매출액)|카드사업(전체매출액)|"                                    //4
         +"카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|"                            //4
         +"신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|"                              //6
         +"공제사업(신계약보장성)|공제사업(신계약보장성)|공제사업(신계약보장성)|공제사업(신계약보장성)|"                            //4
         +"공제사업(신계약적립식)|공제사업(신계약적립식)|공제사업(신계약적립식)|공제사업(신계약적립식)|"                            //4
         +"공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|"                            //4
         +"펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|"                              //6
         +"펀드사업(법인신규물량)|펀드사업(법인신규물량)|펀드사업(법인신규물량)|"                                                   //3
         +"펀드사업(법인신규물량)|펀드사업(법인신규물량)|펀드사업(법인신규물량)|"                                                   //3
         ;
	let strHeader1 = "점번호|점명|PG명|"                                                        //점관련                            3
         +"목표|실적|달성률|평점/배점|"                                              //개인예수금(반기평잔)              4
         +"목표|실적|달성률|평점/배점|"                                              //개인예수금(순증잔액)              4
         +"목표|실적|달성률|평점/배점|"                                              //기업예수금(반기평잔)              4
         +"목표|실적|달성률|평점/배점|"                                              //기업예수금(순증잔액)              4
         +"목표|실적|달성률|평점/배점|"                                              //개인저비용(반평)                  4
         +"목표|실적|달성률|평점/배점|"                                              //개인저비용(월평)                  4
         +"목표|실적|달성률|평점/배점|"                                              //기업저비용(반평)                  4
         +"목표|실적|달성률|평점/배점|"                                              //기업저비용(월평)                  4
         +"밴드범위|실적|최종밴드범위 이탈금액|평점/배점|"                           //대출금(순증잔액_최종밴드평가)     4
         +"목표|보증서|소액|소호|최종실적|달성률|평점/배점|"                         //신규대출금                        7
         +"목표|실적|달성률|평점/배점|"                                              //외환사업                          4
         +"목표|실적|달성률|평점/배점|"                                              //카드사업(전체매출액)              4
         +"목표|실적|달성률|평점/배점|"                                              //카드사업(신규유효회원)            4
         +"목표|금전|부동산|최종실적|달성률|평점/배점|"                              //신탁사업(보수)                    6
         +"목표|실적|달성률|평점/배점|"                                              //공제사업(신계약보장성)            4
         +"목표|실적|달성률|평점/배점|"                                              //공제사업(신계약적립식)            4
         +"목표|실적|달성률|평점/배점|"                                              //공제사업(신계약일시납)            4
         +"목표|판매보수|선취판매 수수료|최종실적|달성률|평점/배점|"                 //펀드사업(이익)                    6
         +"목표|MMF제외|MMF|최종실적|달성률|평점/배점|"                              //펀드사업(법인신규물량)            6
         ;

  // 상위 GRID에 대한 속성정보 설정
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );
	
	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
	          { Text:strHeader1, Align:"Center"} ];
	mySheet.InitHeaders(headers, info);
	
	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	    {Type:"Text",     Hidden:0,  MinWidth:180,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	    {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	    {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
          
	mySheet.InitColumns(cols);
	
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetDataLinkMouse(true);
	mySheet.SetCountPosition(1);
	//지원안함[check again] UnitText="원, %, 점수";
	showUnitText("원, %, 점수")
	newSetActionMenu(mySheet,"엑셀내려받기");
}

/*-----------------------------------------*/
/* @기능 : 2021년도 하반기 기준 그리드 set */
/*-----------------------------------------*/
function setGrid2021H2()
{
	month   = document.frm.basemonth.value.substring(4,6);
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	

  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
		"점번호|점명|PG명|"                                                                                                       //3
	    +"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"                                    //4
	    +"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"                                    //4
	    +"기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|"                                    //4
	    +"기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|"                                    //4
	    +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"                                                              //2
	    +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"                                                              //2
	    +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"                                                              //2
	    +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"                                                              //2
	    +"기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|"                                                              //2
	    +"기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|"                                                              //2
	    +"기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|"                                                              //2
	    +"기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|"                                                              //2
	    +"대출금(순증잔액_밴드평가)|대출금(순증잔액_밴드평가)|대출금(순증잔액_밴드평가)|대출금(순증잔액_밴드평가)|"                //4
	    +"신규대출금|신규대출금|신규대출금|신규대출금|신규대출금|신규대출금|신규대출금|"                                           //7
	    +"외환사업(이익)|외환사업(이익)|외환사업(이익)|외환사업(이익)|"                                                            //4
	    +"카드사업(전체매출액)|카드사업(전체매출액)|카드사업(전체매출액)|카드사업(전체매출액)|"                                    //4
	    +"카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|"                            //4
	    +"신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|"                              //6
	    +"공제사업(신계약보장성)|공제사업(신계약보장성)|공제사업(신계약보장성)|공제사업(신계약보장성)|"                            //4
	    +"공제사업(신계약적립식)|공제사업(신계약적립식)|공제사업(신계약적립식)|공제사업(신계약적립식)|"                            //4
	    +"공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|"                            //4
	    +"펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|"                              //6
	    +"펀드사업(법인신규물량)|펀드사업(법인신규물량)|펀드사업(법인신규물량)|"                                                   //3
	    +"펀드사업(법인신규물량)|펀드사업(법인신규물량)|펀드사업(법인신규물량)|"                                                   //3
	    ;

	var strHeader1 =
    	"점번호|점명|PG명|"                                                        //점관련                            3
      	+"목표|실적|달성률|평점/배점|"                                              //개인예수금(반기평잔)              4
      	+"목표|실적|달성률|평점/배점|"                                              //개인예수금(순증잔액)              4
      	+"목표|실적|달성률|평점/배점|"                                              //기업예수금(반기평잔)              4
      	+"목표|실적|달성률|평점/배점|"                                              //기업예수금(순증잔액)              4
      	+"목표|실적|달성률|평점/배점|"                                              //개인저비용(반평)                  4
      	+"목표|실적|달성률|평점/배점|"                                              //개인저비용(월평)                  4
      	+"목표|실적|달성률|평점/배점|"                                              //기업저비용(반평)                  4
      	+"목표|실적|달성률|평점/배점|"                                              //기업저비용(월평)                  4
      	+"밴드범위|실적|밴드범위이탈금액|평점/배점|"                                //대출금(순증잔액_밴드평가)         4
      	+"목표|보증서|소액|소호|최종실적|달성률|평점/배점|"                         //신규대출금                        7
      	+"목표|실적|달성률|평점/배점|"                                              //외환사업                          4
      	+"목표|실적|달성률|평점/배점|"                                              //카드사업(전체매출액)              4
      	+"목표|실적|달성률|평점/배점|"                                              //카드사업(신규유효회원)            4
      	+"목표|금전|부동산|최종실적|달성률|평점/배점|"                              //신탁사업(보수)                    6
      	+"목표|실적|달성률|평점/배점|"                                              //공제사업(신계약보장성)            4
      	+"목표|실적|달성률|평점/배점|"                                              //공제사업(신계약적립식)            4
      	+"목표|실적|달성률|평점/배점|"                                              //공제사업(신계약일시납)            4
      	+"목표|판매보수|선취판매 수수료|최종실적|달성률|평점/배점|"                 //펀드사업(이익)                    6
      	+"목표|MMF제외|MMF|최종실적|달성률|평점/배점|"                              //펀드사업(법인신규물량)            6
      	;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );
	
	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	
	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];

	mySheet.InitHeaders(headers, info);
	
	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	       {Type:"Text",     Hidden:0,  MinWidth:140,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	       {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:Text,        Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
	 
	mySheet.InitColumns(cols);
	
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetCountPosition(1);
	showUnitText("원, %, 점수");
}

/*-----------------------------------------*/
/* @기능 : 2021년도 상반기 기준 그리드 set */
/*-----------------------------------------*/
function setGrid2021H1()
{
  	month   = document.frm.basemonth.value.substring(4,6);

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
  	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 =
		"점번호|점명|PG명|"                                                                                                       //3
	   	+"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"                                    //4
	   	+"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"                                    //4
	   	+"기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|"                                    //4
	   	+"기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|"                                    //4
	   	+"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"                                                              //2
	   	+"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"                                                              //2
	   	+"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"                                                              //2
	   	+"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"                                                              //2
	   	+"기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|"                                                              //2
	   	+"기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|"                                                              //2
	   	+"기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|"                                                              //2
	   	+"기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|"                                                              //2
	   	+"대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|"                                                    //4
	   	+"외환사업(이익)|외환사업(이익)|외환사업(이익)|외환사업(이익)|"                                                            //4
	   	+"카드사업(전체매출액)|카드사업(전체매출액)|카드사업(전체매출액)|카드사업(전체매출액)|"                                    //4
	   	+"카드사업(신규신용매출액)|카드사업(신규신용매출액)|카드사업(신규신용매출액)|카드사업(신규신용매출액)|"                    //4
	   	+"신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|"                              //6
	   	+"공제사업(이익)|공제사업(이익)|공제사업(이익)|공제사업(이익)|"                                                            //4
	   	+"공제사업(신계약적립식)|공제사업(신계약적립식)|공제사업(신계약적립식)|공제사업(신계약적립식)|"                            //4
	   	+"공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|"                            //4
	   	+"펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|펀드사업(이익)|"                              //6
	   	;
	var strHeader1 =
		"점번호|점명|PG명|"                                 //점관련                            3
	   	+"목표|실적|달성률|평점/배점|"                       //개인예수금(반기평잔)              4
	   	+"목표|실적|달성률|평점/배점|"                       //개인예수금(순증잔액)              4
	   	+"목표|실적|달성률|평점/배점|"                       //기업예수금(반기평잔)              4
	   	+"목표|실적|달성률|평점/배점|"                       //기업예수금(순증잔액)              4
	   	+"목표|실적|달성률|평점/배점|"                       //개인저비용(반평)                  4
	   	+"목표|실적|달성률|평점/배점|"                       //개인저비용(월평)                  4
	   	+"목표|실적|달성률|평점/배점|"                       //기업저비용(반평)                  4
	   	+"목표|실적|달성률|평점/배점|"                       //기업저비용(월평)                  4
	   	+"목표|실적|달성률|평점/배점|"                       //대출금(순증잔액)                  4
	   	+"목표|실적|달성률|평점/배점|"                       //외환사업                          4
	   	+"목표|실적|달성률|평점/배점|"                       //카드사업(전체매출액)              4
	   	+"목표|실적|달성률|평점/배점|"                       //카드사업(신규신용매출액)          4
	   	+"목표|금전|부동산|최종실적|달성률|평점/배점|"       //신탁사업(보수)                    6
	   	+"목표|실적|달성률|평점/배점|"                       //공제사업(이익)                    4
	   	+"목표|실적|달성률|평점/배점|"                       //공제사업(신계약적립식)            4
	   	+"목표|실적|달성률|평점/배점|"                       //공제사업(신계약일시납)            4
	   	+"목표|판매보수실적|선취판매 수수료실적|최종실적|달성률|평점/배점|"             //펀드사업(이익)                    6
	   	;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );
	
	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
	mySheet.InitHeaders(headers, info);
	
	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	          {Type:"Text",     Hidden:0,  MinWidth:140,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	          {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
	 
	mySheet.InitColumns(cols);
	
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetCountPosition(1);
	showUnitText("원, %, 점수");
}

/*-----------------------------------------*/
/* @기능 : 2020년도 하반기 기준 그리드 set */
/*-----------------------------------------*/
function setGrid2020H2()
{
  	month   = document.frm.basemonth.value.substring(4,6);

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
 	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
	   "점번호|점명|PG명|"                                                                                                       //3
	   +"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"                                    //4
	   +"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"                                    //4
	   +"기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|"                                    //4
	   +"기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|"                                    //4
	   +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"                                                              //2
	   +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"                                                              //2
	   +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"                                                              //2
	   +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"                                                              //2
	   +"기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|"                                                              //2
	   +"기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|"                                                              //2
	   +"기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|"                                                              //2
	   +"기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|"                                                              //2
	   +"대출금(신규잔액)|대출금(신규잔액)|대출금(신규잔액)|대출금(신규잔액)|"                                                    //4
	   +"외환사업(이익)|외환사업(이익)|외환사업(이익)|외환사업(이익)|"                                                            //4
	   +"카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|"                            //4
	   +"카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|"                                                    //4
	   +"신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|"                                                            //4
	   +"공제사업(신계약적립식_누증)|공제사업(신계약적립식_누증)|공제사업(신계약적립식_누증)|공제사업(신계약적립식_누증)|"        //4
	   +"공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|"                            //4
	   +"공제사업(노란우산)|공제사업(노란우산)|공제사업(노란우산)|공제사업(노란우산)|"                                            //4
	   +"펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|"                                                    //4
	   +"펀드사업(적립식건수)|펀드사업(적립식건수)|펀드사업(적립식건수)|펀드사업(적립식건수)|"                                    //4
	   +"자율목표제|자율목표제"                                                                                                   //2
	   ;
	var strHeader1 = 
	   "점번호|점명|PG명|"                                 //점관련                            3
	   +"목표|실적|달성률|평점/배점|"                       //개인예수금(반기평잔)              4
	   +"목표|실적|달성률|평점/배점|"                       //개인예수금(순증잔액)              4
	   +"목표|실적|달성률|평점/배점|"                       //기업예수금(반기평잔)              4
	   +"목표|실적|달성률|평점/배점|"                       //기업예수금(순증잔액)              4
	   +"목표|실적|달성률|평점/배점|"                       //개인저비용(반평)                  4
	   +"목표|실적|달성률|평점/배점|"                       //개인저비용(월평)                  4
	   +"목표|실적|달성률|평점/배점|"                       //기업저비용(반평)                  4
	   +"목표|실적|달성률|평점/배점|"                       //기업저비용(월평)                  4
	   +"목표|실적|달성률|평점/배점|"                       //대출금(신규잔액)                  4
	   +"목표|실적|달성률|평점/배점|"                       //외환사업                          4
	   +"목표|실적|달성률|평점/배점|"                       //카드사업(신규유효회원)            4
	   +"목표|실적|달성률|평점/배점|"                       //카드사업(매출액)                  4
	   +"목표|실적|달성률|평점/배점|"                       //신탁사업(보수)                    4
	   +"목표|실적|달성률|평점/배점|"                       //공제사업(신계약적립식_누증)       4
	   +"목표|실적|달성률|평점/배점|"                       //공제사업(신계약일시납)            4
	   +"목표|실적|달성률|평점/배점|"                       //공제사업(노란우산)                4
	   +"목표|실적|달성률|평점/배점|"                       //펀드사업(수탁고)                  4
	   +"목표|실적|달성률|평점/배점|"                       //펀드사업(적립식건수)              4
	   +"달성률|가점"                                       //자율목표제                        2
	   ;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );
	
	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
	mySheet.InitHeaders(headers, info);
	
	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	          {Type:"Text",     Hidden:0,  MinWidth:140,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	          {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
	 
	mySheet.InitColumns(cols);
	
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetCountPosition(1);
	showUnitText("원, %, 점수");
}

/*-----------------------------------------*/
/* @기능 : 2020년도 상반기 기준 그리드 set */
/*-----------------------------------------*/
function setGrid2020H1()
{
  	month   = document.frm.basemonth.value.substring(4,6);

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 =
	   "점번호|점명|PG명|"                                                                                                       //3
	   +"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"                                    //4
	   +"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"                                    //4
	   +"기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|"                                    //4
	   +"기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|"                                    //4
	   +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"                                                              //2
	   +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"                                                              //2
	   +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"                                                              //2
	   +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"                                                              //2
	   +"기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|"                                                              //2
	   +"기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|"                                                              //2
	   +"기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|"                                                              //2
	   +"기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|"                                                              //2
	   +"대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|대출금(순증잔액)|"                                                    //4
	   +"외환사업(이익)|외환사업(이익)|외환사업(이익)|외환사업(이익)|"                                                            //4
	   +"카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|카드사업(신규유효회원)|"                            //4
	   +"카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|"                                                    //4
	   +"신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|신탁사업(보수)|"                                                            //4
	   +"공제사업(신계약적립식_누증)|공제사업(신계약적립식_누증)|공제사업(신계약적립식_누증)|공제사업(신계약적립식_누증)|"        //4
	   +"공제사업(신계약적립식_초회)|공제사업(신계약적립식_초회)|공제사업(신계약적립식_초회)|공제사업(신계약적립식_초회)|"        //4
	   +"공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|"                            //4
	   +"공제사업(노란우산)|공제사업(노란우산)|공제사업(노란우산)|공제사업(노란우산)|"                                            //4
	   +"펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|"                                                    //4
	   +"펀드사업(적립식건수)|펀드사업(적립식건수)|펀드사업(적립식건수)|펀드사업(적립식건수)|"                                    //4
	   ;

	var strHeader1 =
	   "점번호|점명|PG명|"                                 //점관련                            3
	   +"목표|실적|달성률|평점/배점|"                       //개인예수금(반기평잔)              4
	   +"목표|실적|달성률|평점/배점|"                       //개인예수금(순증잔액)              4
	   +"목표|실적|달성률|평점/배점|"                       //기업예수금(반기평잔)              4
	   +"목표|실적|달성률|평점/배점|"                       //기업예수금(순증잔액)              4
	   +"목표|실적|달성률|평점/배점|"                       //개인저비용(반평)                  4
	   +"목표|실적|달성률|평점/배점|"                       //개인저비용(월평)                  4
	   +"목표|실적|달성률|평점/배점|"                       //기업저비용(반평)                  4
	   +"목표|실적|달성률|평점/배점|"                       //기업저비용(월평)                  4
	   +"목표|실적|달성률|평점/배점|"                       //대출금(순증잔액)                  4
	   +"목표|실적|달성률|평점/배점|"                       //외환사업                          4
	   +"목표|실적|달성률|평점/배점|"                       //카드사업(신규유효회원)            4
	   +"목표|실적|달성률|평점/배점|"                       //카드사업(매출액)                  4
	   +"목표|실적|달성률|평점/배점|"                       //신탁사업(보수)                    4
	   +"목표|실적|달성률|평점/배점|"                       //공제사업(신계약적립식_누증)       4
	   +"목표|실적|달성률|평점/배점|"                       //공제사업(신계약적립식_초회)       4
	   +"목표|실적|달성률|평점/배점|"                       //공제사업(신계약일시납)            4
	   +"목표|실적|달성률|평점/배점|"                       //공제사업(노란우산)                4
	   +"목표|실적|달성률|평점/배점|"                       //펀드사업(수탁고)                  4
	   +"목표|실적|달성률|평점/배점|"                       //펀드사업(적립식건수)              4
	   ;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );
	
	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
	mySheet.InitHeaders(headers, info);
	
	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	          {Type:"Text",     Hidden:0,  MinWidth:140,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	          {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
	 
	mySheet.InitColumns(cols);
	
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetCountPosition(1);
	showUnitText("원, %, 점수");
}

/*-----------------------------------------*/
/* @기능 : 2019년도 하반기 기준 그리드 set */
/*-----------------------------------------*/
function setGrid2019H2()
{
  	month   = document.frm.basemonth.value.substring(4,6);

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
  	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 =
	   "점번호|점명|PG명|"                                                                                       //3
	   +"개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|개인예수금(반기평잔)|"                    //4
	   +"개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|개인예수금(순증잔액)|"                    //4
	   +"기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|기업예수금(반기평잔)|"                    //4
	   +"기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|기업예수금(순증잔액)|"                    //4
	   +"신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|신규 예수금 고객|"                                    //4
	   +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"                                              //2
	   +"개인저비용성예수금(반기평잔)|개인저비용성예수금(반기평잔)|"                                              //2
	   +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"                                              //2
	   +"개인저비용성예수금(월중평잔)|개인저비용성예수금(월중평잔)|"                                              //2
	   +"기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|"                                              //2
	   +"기업저비용성예수금(반기평잔)|기업저비용성예수금(반기평잔)|"                                              //2
	   +"기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|"                                              //2
	   +"기업저비용성예수금(월중평잔)|기업저비용성예수금(월중평잔)|"                                              //2
	   +"소매대출금(순증잔액)|소매대출금(순증잔액)|소매대출금(순증잔액)|소매대출금(순증잔액)|"                    //4
	   +"기업/수산대출금(순증잔액)|기업/수산대출금(순증잔액)|"                                                    //2
	   +"기업/수산대출금(순증잔액)|기업/수산대출금(순증잔액)|"                                                    //2
	   +"외환사업(이익)|외환사업(이익)|외환사업(이익)|외환사업(이익)|"                                            //4
	   +"카드사업(순증유효회원)|카드사업(순증유효회원)|카드사업(순증유효회원)|카드사업(순증유효회원)|"            //4
	   +"카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|카드사업(매출액)|"                                    //4
	   +"신탁사업(금전)|신탁사업(금전)|신탁사업(금전)|신탁사업(금전)|"                                            //4
	   +"신탁사업(부동산)|신탁사업(부동산)|신탁사업(부동산)|신탁사업(부동산)|"                                    //4
	   +"공제사업(신계약적립식)|공제사업(신계약적립식)|공제사업(신계약적립식)|공제사업(신계약적립식)|"            //4
	   +"공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|공제사업(신계약일시납)|"            //4
	   +"펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|펀드사업(수탁고)|"                                    //4
	   +"연계증권(ELF,ELT)|연계증권(ELF,ELT)|연계증권(ELF,ELT)|연계증권(ELF,ELT)|"                                //4
	   ;
	
	var strHeader1 = 
	   "점번호|점명|PG명|"                                 //점관련                            3
	   +"목표|실적|달성률|평점/배점|"                       //개인예수금(반기평잔)              4
	   +"목표|실적|달성률|평점/배점|"                       //개인예수금(순증잔액)              4
	   +"목표|실적|달성률|평점/배점|"                       //기업예수금(반기평잔)              4
	   +"목표|실적|달성률|평점/배점|"                       //기업예수금(순증잔액)              4
	   +"목표|실적|달성률|평점/배점|"                       //신규 예수금 고객                  4
	   +"목표|실적|달성률|평점/배점|"                       //개인저비용(반평)                  4
	   +"목표|실적|달성률|평점/배점|"                       //개인저비용(월평)                  4
	   +"목표|실적|달성률|평점/배점|"                       //기업저비용(반평)                  4
	   +"목표|실적|달성률|평점/배점|"                       //기업저비용(월평)                  4
	   +"목표|실적|달성률|평점/배점|"                       //소매대출금(순증잔액)              4
	   +"목표|실적|달성률|평점/배점|"                       //기업/수산(순증잔액)               4
	   +"목표|실적|달성률|평점/배점|"                       //외환사업                          4
	   +"목표|실적|달성률|평점/배점|"                       //카드사업(순증유효회원)            4
	   +"목표|실적|달성률|평점/배점|"                       //카드사업(매출액)                  4
	   +"목표|실적|달성률|평점/배점|"                       //신탁사업(금전)                    4
	   +"목표|실적|달성률|평점/배점|"                       //신탁사업(부동산)                  4
	   +"목표|실적|달성률|평점/배점|"                       //공제사업(신계약적립식)            4
	   +"목표|실적|달성률|평점/배점|"                       //공제사업(신계약일시납)            4
	   +"목표|실적|달성률|평점/배점|"                       //펀드사업(수탁고)                  4
	   +"목표|실적|달성률|평점/배점|"                       //연계증권                          4
	   ;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:3 } );
	
	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
                 { Text:strHeader1, Align:"Center"} ];
	mySheet.InitHeaders(headers, info);
	
	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	          {Type:"Text",     Hidden:0,  MinWidth:140,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	          {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Float",     Hidden:0,  MinWidth:50,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	          {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
	 
	mySheet.InitColumns(cols);
	
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetCountPosition(1);
	showUnitText("원, %, 점수");
}

/*------------------------------------------*/
/* @기능 : 2019년 상반기 기준 그리드 set    */
/*------------------------------------------*/
function  setGrid2019H1()
{
  	basemonth   = document.frm.basemonth.value;

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
  	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
	  "점번호|점명|PG명"
      /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/  // 전략사업
      + "| \n전\n략\n사\n업\n\n| \n전\n략\n사\n업\n\n"                                                                                                      // 2 전략사업-합산
      + "| \n전\n략\n사\n업\n\n(리얼카드)| \n전\n략\n사\n업\n\n(리얼카드)| \n전\n략\n사\n업\n\n(리얼카드)"                                                  // 3 리얼카드
      + "| \n전\n략\n사\n업\n\n(적립식 펀드)| \n전\n략\n사\n업\n\n(적립식 펀드)| \n전\n략\n사\n업\n\n(적립식 펀드)"                                         // 3 적립식펀드
      + "| \n전\n략\n사\n업\n\n(적립식 공제)| \n전\n략\n사\n업\n\n(적립식 공제)| \n전\n략\n사\n업\n\n(적립식 공제)"                                         // 3 적립식공제
      + "| \n전\n략\n사\n업\n\n(개인정액적립식예금)| \n전\n략\n사\n업\n\n(개인정액적립식예금)| \n전\n략\n사\n업\n\n(개인정액적립식예금)"                    // 3 개인정액적립식예금
      + "| \n전\n략\n사\n업\n\n(외화예금)| \n전\n략\n사\n업\n\n(외화예금)| \n전\n략\n사\n업\n\n(외화예금)"                                                  // 3 외화예금
      + "| \n전\n략\n사\n업\n\n(개인사업자)| \n전\n략\n사\n업\n\n(개인사업자)| \n전\n략\n사\n업\n\n(개인사업자)"                                            // 3 개인사업자
      + "| \n전\n략\n사\n업\n\n(SH전세대출)| \n전\n략\n사\n업\n\n(SH전세대출)| \n전\n략\n사\n업\n\n(SH전세대출)"                                            // 3 SH전세대출
      + "| \n전\n략\n사\n업\n\n(보증서대출)| \n전\n략\n사\n업\n\n(보증서대출)| \n전\n략\n사\n업\n\n(보증서대출)"                                            // 3 보증서대출
      /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/  // 소매
      + "| \n개\n인\n예\n수\n금\n\n(반기평잔)| \n개\n인\n예\n수\n금\n\n(반기평잔)"                                                                          // 2
      + "| \n개\n인\n예\n수\n금\n\n(반기평잔)| \n개\n인\n예\n수\n금\n\n(반기평잔)"                                                                          // 2
      + "| \n개\n인\n예\n수\n금\n\n(순증잔액)| \n개\n인\n예\n수\n금\n\n(순증잔액)"                                                                          // 2
      + "| \n개\n인\n예\n수\n금\n\n(순증잔액)| \n개\n인\n예\n수\n금\n\n(순증잔액)"                                                                          // 2
      + "| \n저\n비\n용\n성\n예\n수\n금\n\n(반기평잔)\n| \n저\n비\n용\n성\n예\n수\n금\n\n(반기평잔)\n"                                                      // 2
      + "| \n저\n비\n용\n성\n예\n수\n금\n\n(반기평잔)\n| \n저\n비\n용\n성\n예\n수\n금\n\n(반기평잔)\n"                                                      // 2
      + "| \n저\n비\n용\n성\n예\n수\n금\n\n(월중평잔)\n| \n저\n비\n용\n성\n예\n수\n금\n\n(월중평잔)\n"                                                      // 2
      + "| \n저\n비\n용\n성\n예\n수\n금\n\n(월중평잔)\n| \n저\n비\n용\n성\n예\n수\n금\n\n(월중평잔)\n"                                                      // 2
      + "| \n소\n매\n대\n출\n금\n\n(순증잔액)| \n소\n매\n대\n출\n금\n\n(순증잔액)"                                                                          // 2
      + "| \n소\n매\n대\n출\n금\n\n(순증잔액)| \n소\n매\n대\n출\n금\n\n(순증잔액)"                                                                          // 2
      /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/  // 기업
      + "| \n기\n업\n예\n수\n금\n\n(반기평잔)| \n기\n업\n예\n수\n금\n\n(반기평잔)"                                                                          // 2
      + "| \n기\n업\n예\n수\n금\n\n(반기평잔)| \n기\n업\n예\n수\n금\n\n(반기평잔)"                                                                          // 2
      + "| \n기\n업\n예\n수\n금\n\n(순증잔액)| \n기\n업\n예\n수\n금\n\n(순증잔액)"                                                                          // 2
      + "| \n기\n업\n예\n수\n금\n\n(순증잔액)| \n기\n업\n예\n수\n금\n\n(순증잔액)"                                                                          // 2
      + "| \n기\n업\n대\n출\n금\n\n(순증잔액)| \n기\n업\n대\n출\n금\n\n(순증잔액)"                                                                          // 2
      + "| \n기\n업\n대\n출\n금\n\n(순증잔액)| \n기\n업\n대\n출\n금\n\n(순증잔액)"                                                                          // 2
      + "| \n수\n산\n대\n출\n금\n\n(순증잔액)| \n수\n산\n대\n출\n금\n\n(순증잔액)"                                                                          // 2
      + "| \n수\n산\n대\n출\n금\n\n(순증잔액)| \n수\n산\n대\n출\n금\n\n(순증잔액)"                                                                          // 2
      /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/  // 외환사업
      + "| \n외\n환\n사\n업\n(이익)| \n외\n환\n사\n업\n(이익)| \n외\n환\n사\n업\n(이익)| \n외\n환\n사\n업\n(이익)"                                          // 4
      /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/  // 카드사업
      + "| \n카\n드\n사\n업\n\n(매출액)| \n카\n드\n사\n업\n\n(매출액)| \n카\n드\n사\n업\n\n(매출액)| \n카\n드\n사\n업\n\n(매출액)"                          // 4
      + "| \n카\n드\n사\n업\n\n(순증유효회원)| \n카\n드\n사\n업\n\n(순증유효회원)| \n카\n드\n사\n업\n\n(순증유효회원)| \n카\n드\n사\n업\n\n(순증유효회원)"  // 4
      /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/  // 신탁사업
      + "| \n신\n탁\n사\n업\n\n(금전)| \n신\n탁\n사\n업\n\n(금전)| \n신\n탁\n사\n업\n\n(금전)| \n신\n탁\n사\n업\n\n(금전)"                                  // 4
      + "| \n신\n탁\n사\n업\n\n(부동산)| \n신\n탁\n사\n업\n\n(부동산)| \n신\n탁\n사\n업\n\n(부동산)| \n신\n탁\n사\n업\n\n(부동산)"                          // 4
      /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/  // 공제사업
      + "| \n공\n제\n사\n업\n\n(신계약\n적립식)| \n공\n제\n사\n업\n\n(신계약\n적립식)"                                                                      // 2
      + "| \n공\n제\n사\n업\n\n(신계약\n적립식)| \n공\n제\n사\n업\n\n(신계약\n적립식)"                                                                      // 2
      + "| \n공\n제\n사\n업\n\n(신계약\n일시납)| \n공\n제\n사\n업\n\n(신계약\n일시납)"                                                                      // 2
      + "| \n공\n제\n사\n업\n\n(신계약\n일시납)| \n공\n제\n사\n업\n\n(신계약\n일시납)"                                                                      // 2
      /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/  // 펀드사업
      + "| \n펀\n드\n사\n업\n\n(수탁고)| \n펀\n드\n사\n업\n\n(수탁고)| \n펀\n드\n사\n업\n\n(수탁고)| \n펀\n드\n사\n업\n\n(수탁고)"                          // 4
      /*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/  // 연계증권
      + "| \n연\n계\n증\n권\n\n(ELF,ELT)| \n연\n계\n증\n권\n\n(ELF,ELT)"                                                                                    // 2
      + "| \n연\n계\n증\n권\n\n(ELF,ELT)| \n연\n계\n증\n권\n\n(ELF,ELT)"                                                                                    // 2
      ;

	var strHeader1 = 
	  "점번호|점명|PG명"
      + "|달성사업수|전략평점(☞)"             //2 전략사업_합산
      + "|목표|실적|달성률"                    //3 전략사업_리얼카드
      + "|목표|실적|달성률"                    //3 전략사업_적립식펀드
      + "|목표|실적|달성률"                    //3 전략사업_적립식공제
      + "|목표|실적|달성률"                    //3 전략사업_정액적립식예금
      + "|목표|실적|달성률"                    //3 전략사업_외화예금
      + "|목표|실적|달성률"                    //3 전략사업_개인사업자
      + "|목표|실적|달성률"                    //3 전략사업_SH전세대출
      + "|목표|실적|달성률"                    //3 전략사업_보증서대출
      + "|목표|실적|달성률|평점(☞)"           //4 개인예수금-반기평잔
      + "|목표|실적|달성률|평점(☞)"           //4 개인예수금_순증잔액
      + "|목표|실적|달성률|평점(☞)"           //4 저비용성예수금(반기평잔)
      + "|목표|실적|달성률|평점(☞)"           //4 저비용성예수금(월중평잔)
      + "|목표|실적|달성률|평점(☞)"           //4 소매대출금(순증잔액)
      + "|목표|실적|달성률|평점(☞)"           //4 기업예수금(반기평잔)
      + "|목표|실적|달성률|평점(☞)"           //4 기업예수금(순증잔액)
      + "|목표|실적|달성률|평점(☞)"           //4 기업대출금(순증잔액)
      + "|목표|실적|달성률|평점(☞)"           //4 수산대출금(순증잔액)
      + "|목표|실적|달성률|평점(☞)"           //4 외환사업_이익
      + "|목표|실적|달성률|평점(☞)"           //4 카드사업_매출액
      + "|목표|실적|달성률|평점(☞)"           //4 카드사업_순증유효회원
      + "|목표|실적|달성률|평점(☞)"           //4 신탁사업_금전
      + "|목표|실적|달성률|평점(☞)"           //4 신탁사업_부동산
      + "|목표|실적|달성률|평점(☞)"           //4 공제사업_신계약적립식
      + "|목표|실적|달성률|평점(☞)"           //4 공제사업_신계약일시납
      + "|목표|실적|달성률|평점(☞)"           //4 펀드사업_수탁고
      + "|목표|실적|달성률|평점(☞)"           //4 연계증권
      ;

	for(col=3; col<101; col++ ){
  		mySheet.SetCellAlign(0,col,"CenterTop");
  	}

  	i=0;

  	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

  	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
  
	var headers = [ { Text:strHeader0, Align:"Center"},
           	{ Text:strHeader1, Align:"Center"} ];

	mySheet.InitHeaders(headers, info);
	
	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	       {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	       {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
	 
	mySheet.InitColumns(cols);
	
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(5,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(8,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(11,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(14,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(17,1);
	mySheet.SetColHidden(18,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(20,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(22,1);
	mySheet.SetColHidden(23,1);
	mySheet.SetColHidden(24,1);
	mySheet.SetColHidden(25,1);
	mySheet.SetColHidden(26,1);
	mySheet.SetColHidden(27,1);
	mySheet.SetColHidden(28,1);
	mySheet.SetColHidden(29,1);
	mySheet.SetColHidden(30,1);
	mySheet.SetColHidden(31,1);
	mySheet.SetColHidden(33,1);
	mySheet.SetColHidden(34,1);
	mySheet.SetColHidden(35,1);
	mySheet.SetColHidden(37,1);
	mySheet.SetColHidden(38,1);
	mySheet.SetColHidden(39,1);
	mySheet.SetColHidden(41,1);
	mySheet.SetColHidden(42,1);
	mySheet.SetColHidden(43,1);
	mySheet.SetColHidden(45,1);
	mySheet.SetColHidden(46,1);
	mySheet.SetColHidden(47,1);
	mySheet.SetColHidden(49,1);
	mySheet.SetColHidden(50,1);
	mySheet.SetColHidden(51,1);
	mySheet.SetColHidden(53,1);
	mySheet.SetColHidden(54,1);
	mySheet.SetColHidden(55,1);
	mySheet.SetColHidden(57,1);
	mySheet.SetColHidden(58,1);
	mySheet.SetColHidden(59,1);
	mySheet.SetColHidden(61,1);
	mySheet.SetColHidden(62,1);
	mySheet.SetColHidden(63,1);
	mySheet.SetColHidden(65,1);
	mySheet.SetColHidden(66,1);
	mySheet.SetColHidden(67,1);
	mySheet.SetColHidden(69,1);
	mySheet.SetColHidden(70,1);
	mySheet.SetColHidden(71,1);
	mySheet.SetColHidden(73,1);
	mySheet.SetColHidden(74,1);
	mySheet.SetColHidden(75,1);
	mySheet.SetColHidden(77,1);
	mySheet.SetColHidden(78,1);
	mySheet.SetColHidden(79,1);
	mySheet.SetColHidden(81,1);
	mySheet.SetColHidden(82,1);
	mySheet.SetColHidden(83,1);
	mySheet.SetColHidden(85,1);
	mySheet.SetColHidden(86,1);
	mySheet.SetColHidden(87,1);
	mySheet.SetColHidden(89,1);
	mySheet.SetColHidden(90,1);
	mySheet.SetColHidden(91,1);
	mySheet.SetColHidden(93,1);
	mySheet.SetColHidden(94,1);
	mySheet.SetColHidden(95,1);
	mySheet.SetColHidden(97,1);
	mySheet.SetColHidden(98,1);
	mySheet.SetColHidden(99,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
}

/*------------------------------------------*/
/* @기능 : 2018년 하반기 기준 그리드 set    */
/*------------------------------------------*/
function  setGrid2018Q3()
{
  	basemonth   = document.frm.basemonth.value;

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	

  //지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
	var strHeader0 = 
		"점번호|점명|PG명"
		/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/  // 전략사업
		+ "| \n전\n략\n사\n업\n\n| \n전\n략\n사\n업\n\n"                                                                                                      // 2 전략사업-합산
		+ "| \n전\n략\n사\n업\n\n(리얼카드)| \n전\n략\n사\n업\n\n(리얼카드)| \n전\n략\n사\n업\n\n(리얼카드)"                                                  // 3 리얼카드
		+ "| \n전\n략\n사\n업\n\n(적립식 펀드)| \n전\n략\n사\n업\n\n(적립식 펀드)| \n전\n략\n사\n업\n\n(적립식 펀드)"                                         // 3 적립식펀드
		+ "| \n전\n략\n사\n업\n\n(적립식 공제)| \n전\n략\n사\n업\n\n(적립식 공제)| \n전\n략\n사\n업\n\n(적립식 공제)"                                         // 3 적립식공제
		+ "| \n전\n략\n사\n업\n\n(전자단기사채)| \n전\n략\n사\n업\n\n(전자단기사채)| \n전\n략\n사\n업\n\n(전자단기사채)"                                      // 3 전자단기사채
		+ "| \n전\n략\n사\n업\n\n(외화예금)| \n전\n략\n사\n업\n\n(외화예금)| \n전\n략\n사\n업\n\n(외화예금)"                                                  // 3 외화예금
		+ "| \n전\n략\n사\n업\n\n(명태및수호적금)| \n전\n략\n사\n업\n\n(명태및수호적금)| \n전\n략\n사\n업\n\n(명태및수호적금)"                                // 3 명태및수호적금
		+ "| \n전\n략\n사\n업\n\n(으뜸모기지)| \n전\n략\n사\n업\n\n(으뜸모기지)| \n전\n략\n사\n업\n\n(으뜸모기지)"                                            // 3 으뜸모기지
		+ "| \n전\n략\n사\n업\n\n(SH전세대출)| \n전\n략\n사\n업\n\n(SH전세대출)| \n전\n략\n사\n업\n\n(SH전세대출)"                                            // 3 SH전세대출
		+ "| \n전\n략\n사\n업\n\n(보증서대출)| \n전\n략\n사\n업\n\n(보증서대출)| \n전\n략\n사\n업\n\n(보증서대출)"                                            // 3 보증서대출
		/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/  // 소매
		+ "| \n개\n인\n예\n수\n금\n\n(반기평잔)| \n개\n인\n예\n수\n금\n\n(반기평잔)"                                                                          // 2
		+ "| \n개\n인\n예\n수\n금\n\n(반기평잔)| \n개\n인\n예\n수\n금\n\n(반기평잔)"                                                                          // 2
		+ "| \n개\n인\n예\n수\n금\n\n(순증잔액)| \n개\n인\n예\n수\n금\n\n(순증잔액)"                                                                          // 2
		+ "| \n개\n인\n예\n수\n금\n\n(순증잔액)| \n개\n인\n예\n수\n금\n\n(순증잔액)"                                                                          // 2
		+ "| \n개\n인\n적\n립\n식\n예\n수\n금\n\n(신규잔액)\n| \n개\n인\n적\n립\n식\n예\n수\n금\n\n(신규잔액)\n"                                              // 2
		+ "| \n개\n인\n적\n립\n식\n예\n수\n금\n\n(신규잔액)\n| \n개\n인\n적\n립\n식\n예\n수\n금\n\n(신규잔액)\n"                                              // 2
		+ "| \n소\n매\n대\n출\n금\n\n(순증잔액)| \n소\n매\n대\n출\n금\n\n(순증잔액)"                                                                          // 2
		+ "| \n소\n매\n대\n출\n금\n\n(순증잔액)| \n소\n매\n대\n출\n금\n\n(순증잔액)"                                                                          // 2
		/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/  // 기업
		+ "| \n기\n업\n예\n수\n금\n\n(반기평잔)| \n기\n업\n예\n수\n금\n\n(반기평잔)"                                                                          // 2
		+ "| \n기\n업\n예\n수\n금\n\n(반기평잔)| \n기\n업\n예\n수\n금\n\n(반기평잔)"                                                                          // 2
		+ "| \n기\n업\n예\n수\n금\n\n(순증잔액)| \n기\n업\n예\n수\n금\n\n(순증잔액)"                                                                          // 2
		+ "| \n기\n업\n예\n수\n금\n\n(순증잔액)| \n기\n업\n예\n수\n금\n\n(순증잔액)"                                                                          // 2
		+ "| \n기\n업\n대\n출\n금\n\n(순증잔액)| \n기\n업\n대\n출\n금\n\n(순증잔액)"                                                                          // 2
		+ "| \n기\n업\n대\n출\n금\n\n(순증잔액)| \n기\n업\n대\n출\n금\n\n(순증잔액)"                                                                          // 2
		+ "| \n수산\n해양\n대\n출\n금\n\n(순증잔액)| \n수산\n해양\n대\n출\n금\n\n(순증잔액)"                                                                  // 2
		+ "| \n수산\n해양\n대\n출\n금\n\n(순증잔액)| \n수산\n해양\n대\n출\n금\n\n(순증잔액)"                                                                  // 2
		/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/  // 외환사업
		+ "| \n외\n환\n사\n업| \n외\n환\n사\n업| \n외\n환\n사\n업| \n외\n환\n사\n업"                                                                          // 4
		/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/  // 카드사업
		+ "| \n카\n드\n사\n업\n\n(매출액)| \n카\n드\n사\n업\n\n(매출액)| \n카\n드\n사\n업\n\n(매출액)| \n카\n드\n사\n업\n\n(매출액)"                          // 4
		+ "| \n카\n드\n사\n업\n\n(순증유효회원)| \n카\n드\n사\n업\n\n(순증유효회원)| \n카\n드\n사\n업\n\n(순증유효회원)| \n카\n드\n사\n업\n\n(순증유효회원)"  // 4
		/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/  // 신탁사업
		+ "| \n신\n탁\n사\n업\n\n(금전)| \n신\n탁\n사\n업\n\n(금전)| \n신\n탁\n사\n업\n\n(금전)| \n신\n탁\n사\n업\n\n(금전)"                                  // 4
		+ "| \n신\n탁\n사\n업\n\n(부동산)| \n신\n탁\n사\n업\n\n(부동산)| \n신\n탁\n사\n업\n\n(부동산)| \n신\n탁\n사\n업\n\n(부동산)"                          // 4
		/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/  // 공제사업
		+ "| \n공\n제\n사\n업\n\n(공제료이익)| \n공\n제\n사\n업\n\n(공제료이익)| \n공\n제\n사\n업\n\n(공제료이익)| \n공\n제\n사\n업\n\n(공제료이익)"          // 4
		+ "| \n공\n제\n사\n업\n\n(신계약\n생명공제료)| \n공\n제\n사\n업\n\n(신계약\n생명공제료)"                                                              // 2
		+ "| \n공\n제\n사\n업\n\n(신계약\n생명공제료)| \n공\n제\n사\n업\n\n(신계약\n생명공제료)"                                                              // 2
		+ "| \n공\n제\n사\n업\n\n(신계약\n손해공제료)| \n공\n제\n사\n업\n\n(신계약\n손해공제료)"                                                              // 2
		+ "| \n공\n제\n사\n업\n\n(신계약\n손해공제료)| \n공\n제\n사\n업\n\n(신계약\n손해공제료)"                                                              // 2
		/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/  // 펀드사업
		+ "| \n펀\n드\n사\n업\n\n(수탁고)| \n펀\n드\n사\n업\n\n(수탁고)| \n펀\n드\n사\n업\n\n(수탁고)| \n펀\n드\n사\n업\n\n(수탁고)"                          // 4
		;
		
	var strHeader1 = 
		"점번호|점명|PG명"
		+ "|달성사업수|전략평점(☞)"             //2 전략사업_합산
		+ "|목표|실적|달성률"                    //3 전략사업_리얼카드
		+ "|목표|실적|달성률"                    //3 전략사업_적립식펀드
		+ "|목표|실적|달성률"                    //3 전략사업_적립식공제
		+ "|목표|실적|달성률"                    //3 전략사업_전자단기사채
		+ "|목표|실적|달성률"                    //3 전략사업_외화예금
		+ "|목표|실적|달성률"                    //3 전략사업_명태및수호적금
		+ "|목표|실적|달성률"                    //3 전략사업_으뜸모기지
		+ "|목표|실적|달성률"                    //3 전략사업_SH전세대출
		+ "|목표|실적|달성률"                    //3 전략사업_보증서대출
		+ "|목표|실적|달성률|평점(☞)"           //4 개인예수금-반기평잔
		+ "|목표|실적|달성률|평점(☞)"           //4 개인예수금_순증잔액
		+ "|목표|실적|달성률|평점(☞)"           //4 개인적립식예수금
		+ "|목표|실적|달성률|평점(☞)"           //4 소매대출금_순증잔액
		+ "|목표|실적|달성률|평점(☞)"           //4 기업예수금_반기평잔
		+ "|목표|실적|달성률|평점(☞)"           //4 기업예수금_순증잔액
		+ "|목표|실적|달성률|평점(☞)"           //4 기업대출금_순증잔액
		+ "|목표|실적|달성률|평점(☞)"           //4 수산해양대출금
		+ "|목표|실적|달성률|평점(☞)"           //4 외환사업
		+ "|목표|실적|달성률|평점(☞)"           //4 카드사업_매출액
		+ "|목표|실적|달성률|평점(☞)"           //4 카드사업_순증유효회원
		+ "|목표|실적|달성률|평점(☞)"           //4 신탁사업_금전
		+ "|목표|실적|달성률|평점(☞)"           //4 신탁사업_부동산
		+ "|목표|실적|달성률|평점(☞)"           //4 공제사업_공제료이익
		+ "|목표|실적|달성률|평점(☞)"           //4 공제사업_생명공제료
		+ "|목표|실적|달성률|평점(☞)"           //4 공제사업_손해공제료
		+ "|목표|실적|달성률|평점(☞)"           //4 펀드사업_수탁고
		;
		
	for(col=3; col<100; col++ ){
		mySheet.SetCellAlign(0,col,"CenterTop");
	}
	
	i=0;
	
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );
	
	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	
	var headers = [ { Text:strHeader0, Align:"Center"},
		{ Text:strHeader1, Align:"Center"} ];	
	
	mySheet.InitHeaders(headers, info);

	var cols = 
		[ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
		{Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"Text",      Hidden:0,  MinWidth:65,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
       
	mySheet.InitColumns(cols);
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(5,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(8,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(11,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(14,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(17,1);
	mySheet.SetColHidden(18,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(20,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(22,1);
	mySheet.SetColHidden(23,1);
	mySheet.SetColHidden(24,1);
	mySheet.SetColHidden(25,1);
	mySheet.SetColHidden(26,1);
	mySheet.SetColHidden(27,1);
	mySheet.SetColHidden(28,1);
	mySheet.SetColHidden(29,1);
	mySheet.SetColHidden(30,1);
	mySheet.SetColHidden(31,1);
	mySheet.SetColHidden(32,1);
	mySheet.SetColHidden(33,1);
	mySheet.SetColHidden(34,1);
	mySheet.SetColHidden(36,1);
	mySheet.SetColHidden(37,1);
	mySheet.SetColHidden(38,1);
	mySheet.SetColHidden(40,1);
	mySheet.SetColHidden(41,1);
	mySheet.SetColHidden(42,1);
	mySheet.SetColHidden(44,1);
	mySheet.SetColHidden(45,1);
	mySheet.SetColHidden(46,1);
	mySheet.SetColHidden(48,1);
	mySheet.SetColHidden(49,1);
	mySheet.SetColHidden(50,1);
	mySheet.SetColHidden(52,1);
	mySheet.SetColHidden(53,1);
	mySheet.SetColHidden(54,1);
	mySheet.SetColHidden(56,1);
	mySheet.SetColHidden(57,1);
	mySheet.SetColHidden(58,1);
	mySheet.SetColHidden(60,1);
	mySheet.SetColHidden(61,1);
	mySheet.SetColHidden(62,1);
	mySheet.SetColHidden(64,1);
	mySheet.SetColHidden(65,1);
	mySheet.SetColHidden(66,1);
	mySheet.SetColHidden(68,1);
	mySheet.SetColHidden(69,1);
	mySheet.SetColHidden(70,1);
	mySheet.SetColHidden(72,1);
	mySheet.SetColHidden(73,1);
	mySheet.SetColHidden(74,1);
	mySheet.SetColHidden(76,1);
	mySheet.SetColHidden(77,1);
	mySheet.SetColHidden(78,1);
	mySheet.SetColHidden(80,1);
	mySheet.SetColHidden(81,1);
	mySheet.SetColHidden(82,1);
	mySheet.SetColHidden(84,1);
	mySheet.SetColHidden(85,1);
	mySheet.SetColHidden(86,1);
	mySheet.SetColHidden(88,1);
	mySheet.SetColHidden(89,1);
	mySheet.SetColHidden(90,1);
	mySheet.SetColHidden(92,1);
	mySheet.SetColHidden(93,1);
	mySheet.SetColHidden(94,1);
	mySheet.SetColHidden(96,1);
	mySheet.SetColHidden(97,1);
	mySheet.SetColHidden(98,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
}

/*----------------------------------------*/
/* @기능 : 2018년 기준 그리드 set         */
/*----------------------------------------*/
function  setGrid2018()
{
  	basemonth   = document.frm.basemonth.value;

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));

	var strHeader0 = 
		 "점번호|점명|PG명"
		 + "| \n전\n략\n사\n업\n\n| \n전\n략\n사\n업\n\n"
		 + "| \n전\n략\n사\n업\n\n(카드신규유효회원)| \n전\n략\n사\n업\n\n(카드신규유효회원)| \n전\n략\n사\n업\n\n(카드신규유효회원)"
		 + "| \n전\n략\n사\n업\n\n(적립식펀드)| \n전\n략\n사\n업\n\n(적립식펀드)| \n전\n략\n사\n업\n\n(적립식펀드)"
		 + "| \n전\n략\n사\n업\n\n(생명보장성공제)| \n전\n략\n사\n업\n\n(생명보장성공제)| \n전\n략\n사\n업\n\n(생명보장성공제)"
		 + "| \n전\n략\n사\n업\n\n(금전신탁)| \n전\n략\n사\n업\n\n(금전신탁)| \n전\n략\n사\n업\n\n(금전신탁)"
		 + "| \n전\n략\n사\n업\n\n(무역외송금)| \n전\n략\n사\n업\n\n(무역외송금)| \n전\n략\n사\n업\n\n(무역외송금)"
		 + "| \n전\n략\n사\n업\n\n(정액적립식)| \n전\n략\n사\n업\n\n(정액적립식)| \n전\n략\n사\n업\n\n(정액적립식)"
		 + "| \n전\n략\n사\n업\n\n(으뜸모기지)| \n전\n략\n사\n업\n\n(으뜸모기지)| \n전\n략\n사\n업\n\n(으뜸모기지)"
		 + "| \n전\n략\n사\n업\n\n(SH전세대출)| \n전\n략\n사\n업\n\n(SH전세대출)| \n전\n략\n사\n업\n\n(SH전세대출)"
		 + "| \n외\n환\n사\n업| \n외\n환\n사\n업| \n외\n환\n사\n업"
		 + "| \n카\n드\n사\n업\n\n(매출액)| \n카\n드\n사\n업\n\n(매출액)| \n카\n드\n사\n업\n\n(매출액)"
		 + "| \n카\n드\n사\n업\n\n(누증유효회원)| \n카\n드\n사\n업\n\n(누증유효회원)| \n카\n드\n사\n업\n\n(누증유효회원)"
		 + "| \n신\n탁\n사\n업\n\n(금전)| \n신\n탁\n사\n업\n\n(금전)| \n신\n탁\n사\n업\n\n(금전)"
		 + "| \n신\n탁\n사\n업\n\n(부동산)| \n신\n탁\n사\n업\n\n(부동산)| \n신\n탁\n사\n업\n\n(부동산)"
		 + "| \n공\n제\n사\n업\n\n(총납입공제료)| \n공\n제\n사\n업\n\n(총납입공제료)| \n공\n제\n사\n업\n\n(총납입공제료)"
		 + "| \n공\n제\n사\n업\n\n(신규저축성)| \n공\n제\n사\n업\n\n(신규저축성)| \n공\n제\n사\n업\n\n(신규저축성)"
		 + "| \n공\n제\n사\n업\n\n(신규보장성)| \n공\n제\n사\n업\n\n(신규보장성)| \n공\n제\n사\n업\n\n(신규보장성)"
		 + "| \n펀\n드\n사\n업\n\n(전략상품\n수탁고)| \n펀\n드\n사\n업\n\n(전략상품\n수탁고)| \n펀\n드\n사\n업\n\n(전략상품\n수탁고)"
		 + "| \n소\n매\n예\n수\n금\n\n(반기평잔)| \n소\n매\n예\n수\n금\n\n(반기평잔)| \n소\n매\n예\n수\n금\n\n(반기평잔)"
		 + "| \n소\n매\n예\n수\n금\n\n(순증잔액)| \n소\n매\n예\n수\n금\n\n(순증잔액)| \n소\n매\n예\n수\n금\n\n(순증잔액)"
		 + "| \n적\n립\n식\n예\n수\n금\n(신규잔액)| \n적\n립\n식\n예\n수\n금\n(신규잔액)\n| \n적\n립\n식\n예\n수\n금\n(신규잔액)"
		 + "| \n기\n업\n예\n수\n금\n\n(반기평잔)| \n기\n업\n예\n수\n금\n\n(반기평잔)| \n기\n업\n예\n수\n금\n\n(반기평잔)"
		 + "| \n기\n업\n예\n수\n금\n\n(월중평잔)| \n기\n업\n예\n수\n금\n\n(월중평잔)| \n기\n업\n예\n수\n금\n\n(월중평잔)"
		 + "| \n소\n매\n대\n출\n금\n\n(순증잔액)| \n소\n매\n대\n출\n금\n\n(순증잔액)| \n소\n매\n대\n출\n금\n\n(순증잔액)"
		 + "| \n기\n업\n대\n출\n금\n\n(순증잔액)| \n기\n업\n대\n출\n금\n\n(순증잔액)| \n기\n업\n대\n출\n금\n\n(순증잔액)"
		 + "| \n수산\n해양\n대\n출\n금\n\n(순증잔액)| \n수산\n해양\n대\n출\n금\n\n(순증잔액)| \n수산\n해양\n대\n출\n금\n\n(순증잔액)"
		 ;
	
	var strHeader1 = 
		 "점번호|점명|PG명"
		 + "|달성사업수|전략평점(☞)"    //2 전략사업_합산
		 + "|목표|실적|달성률"           //3 전략사업_카드신규유효회원
		 + "|목표|실적|달성률"           //3 전략사업_적립식펀드
		 + "|목표|실적|달성률"           //3 전략사업_생명보장성공제
		 + "|목표|실적|달성률"           //3 전략사업_금전신탁
		 + "|목표|실적|달성률"           //3 전략사업_무역외송금
		 + "|목표|실적|달성률"           //3 전략사업_정액적립식
		 + "|목표|실적|달성률"           //3 전략사업_으뜸모기지
		 + "|목표|실적|달성률"           //3 전략사업_SH전세대출
		 + "|목표|실적|평점(☞)"           //3 외환사업
		 + "|목표|실적|평점(☞)"           //3 카드사업_매출액
		 + "|목표|실적|평점(☞)"           //3 카드사업_누증유효회원
		 + "|목표|실적|평점(☞)"           //3 신탁사업_금전
		 + "|목표|실적|평점(☞)"           //3 신탁사업_부동산
		 + "|목표|실적|평점(☞)"           //3 공제사업_총납입공제료
		 + "|목표|실적|평점(☞)"           //3 공제사업_신규저축성
		 + "|목표|실적|평점(☞)"           //3 공제사업_신규보장성
		 + "|목표|실적|평점(☞)"           //3 펀드사업_전략상품수탁고
		 + "|목표|실적|평점(☞)"           //3 소매예수금_반기평잔
		 + "|목표|실적|평점(☞)"           //3 소매예수금_순증잔액
		 + "|목표|실적|평점(☞)"           //3 적립식예수금-신규잔액
		 + "|목표|실적|평점(☞)"           //3 기업예수금_반기평잔
		 + "|목표|실적|평점(☞)"           //3 기업예수금_월중평잔
		 + "|목표|실적|평점(☞)"           //3 소매대출금_순증잔액
		 + "|목표|실적|평점(☞)"           //3 기업대출금_순증잔액
		 + "|목표|실적|평점(☞)"           //3 수산해양대출금_순증잔액
		 ;
	
	for(col=3; col<81; col++ ) {
		mySheet.SetCellAlign(0,col,"CenterTop");
	}
	
	i=0;
	
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );
	
	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	
	var headers = [ { Text:strHeader0, Align:"Center"},
		{ Text:strHeader1, Align:"Center"} ];
		
	mySheet.InitHeaders(headers, info);

	var cols = 
		[ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
		{Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
                   
	mySheet.InitColumns(cols);
	
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(5,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(8,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(11,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(14,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(17,1);
	mySheet.SetColHidden(18,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(20,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(22,1);
	mySheet.SetColHidden(23,1);
	mySheet.SetColHidden(24,1);
	mySheet.SetColHidden(25,1);
	mySheet.SetColHidden(26,1);
	mySheet.SetColHidden(27,1);
	mySheet.SetColHidden(28,1);
	mySheet.SetColHidden(29,1);
	mySheet.SetColHidden(30,1);
	mySheet.SetColHidden(32,1);
	mySheet.SetColHidden(33,1);
	mySheet.SetColHidden(35,1);
	mySheet.SetColHidden(36,1);
	mySheet.SetColHidden(38,1);
	mySheet.SetColHidden(39,1);
	mySheet.SetColHidden(41,1);
	mySheet.SetColHidden(42,1);
	mySheet.SetColHidden(44,1);
	mySheet.SetColHidden(45,1);
	mySheet.SetColHidden(47,1);
	mySheet.SetColHidden(48,1);
	mySheet.SetColHidden(50,1);
	mySheet.SetColHidden(51,1);
	mySheet.SetColHidden(53,1);
	mySheet.SetColHidden(54,1);
	mySheet.SetColHidden(56,1);
	mySheet.SetColHidden(57,1);
	mySheet.SetColHidden(59,1);
	mySheet.SetColHidden(60,1);
	mySheet.SetColHidden(62,1);
	mySheet.SetColHidden(63,1);
	mySheet.SetColHidden(65,1);
	mySheet.SetColHidden(66,1);
	mySheet.SetColHidden(68,1);
	mySheet.SetColHidden(69,1);
	mySheet.SetColHidden(71,1);
	mySheet.SetColHidden(72,1);
	mySheet.SetColHidden(74,1);
	mySheet.SetColHidden(75,1);
	mySheet.SetColHidden(77,1);
	mySheet.SetColHidden(78,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
    mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
}

/*----------------------------------------*/
/* @기능 : 2017년하반기도 기준 그리드 set */
/*----------------------------------------*/
function  setGrid2017Q3()
{
	basemonth   = document.frm.basemonth.value;

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
	

  	// 상위 GRID에 대한 속성정보 설정
   //지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
	var strHeader0 =
		"점번호|점명|PG명" 
		+ "| \n전\n략\n사\n업\n\n| \n전\n략\n사\n업\n\n"
		+ "| \n전\n략\n사\n업\n\n(카드유효회원)| \n전\n략\n사\n업\n\n(카드유효회원)| \n전\n략\n사\n업\n\n(카드유효회원)"
		+ "| \n전\n략\n사\n업\n\n(적립식펀드)| \n전\n략\n사\n업\n\n(적립식펀드)| \n전\n략\n사\n업\n\n(적립식펀드)"
		+ "| \n전\n략\n사\n업\n\n(적립식공제)| \n전\n략\n사\n업\n\n(적립식공제)| \n전\n략\n사\n업\n\n(적립식공제)"
		+ "| \n전\n략\n사\n업\n\n(금전신탁)| \n전\n략\n사\n업\n\n(금전신탁)| \n전\n략\n사\n업\n\n(금전신탁)"
		+ "| \n전\n략\n사\n업\n\n(외환매매익)| \n전\n략\n사\n업\n\n(외환매매익)| \n전\n략\n사\n업\n\n(외환매매익)"
		+ "| \n전\n략\n사\n업\n\n(정액적립식)| \n전\n략\n사\n업\n\n(정액적립식)| \n전\n략\n사\n업\n\n(정액적립식)"
		+ "| \n전\n략\n사\n업\n\n(적격+으뜸)| \n전\n략\n사\n업\n\n(적격+으뜸)| \n전\n략\n사\n업\n\n(적격+으뜸)"
		+ "| \n전\n략\n사\n업\n\n(보증서대출)| \n전\n략\n사\n업\n\n(보증서대출)| \n전\n략\n사\n업\n\n(보증서대출)"
		+ "| \n외\n환\n사\n업| \n외\n환\n사\n업| \n외\n환\n사\n업"
		+ "| \n카\n드\n사\n업\n\n(매출액)| \n카\n드\n사\n업\n\n(매출액)| \n카\n드\n사\n업\n\n(매출액)"
		+ "| \n카\n드\n사\n업\n\n(순증유효회원)| \n카\n드\n사\n업\n\n(순증유효회원)| \n카\n드\n사\n업\n\n(순증유효회원)"
		+ "| \n신\n탁\n사\n업\n\n(금전)| \n신\n탁\n사\n업\n\n(금전)| \n신\n탁\n사\n업\n\n(금전)"
		+ "| \n신\n탁\n사\n업\n\n(부동산)| \n신\n탁\n사\n업\n\n(부동산)| \n신\n탁\n사\n업\n\n(부동산)"
		+ "| \n공\n제\n사\n업\n\n(총납입\n 공제료)| \n공\n제\n사\n업\n\n(총납입\n 공제료)| \n공\n제\n사\n업\n\n(총납입\n 공제료)"
		+ "| \n공\n제\n사\n업\n\n(적용평점)| \n공제사업\n\n(신규보장성건수)| \n공제사업\n\n(신규보장성건수)| \n공제사업\n\n(신규적립식 공제료)| \n공제사업\n\n(신규적립식 공제료)"
		+ "| \n펀\n드\n사\n업\n\n(전략상품\n수탁고)| \n펀\n드\n사\n업\n\n(전략상품\n수탁고)| \n펀\n드\n사\n업\n\n(전략상품\n수탁고)"
		+ "| \n총\n예\n수\n금\n\n(반기평잔)| \n총\n예\n수\n금\n\n(반기평잔)| \n총\n예\n수\n금\n\n(반기평잔)"
		+ "| \n총\n예\n수\n금\n\n(월중평잔)| \n총\n예\n수\n금\n\n(월중평잔)| \n총\n예\n수\n금\n\n(월중평잔)"
		+ "| \n개인\n예\n수\n금\n\n(반기평잔)| \n개인\n예\n수\n금\n\n(반기평잔)| \n개인\n예\n수\n금\n\n(반기평잔)"
		+ "| \n개인\n예\n수\n금\n\n(잔액)| \n개인\n예\n수\n금\n\n(잔액)| \n개인\n예\n수\n금\n\n(잔액)"
		+ "| \n적립식\n예금\n\n(신규잔액)| \n적립식\n예금\n\n(신규잔액)| \n적립식\n예금\n\n(신규잔액)"
		+ "| \n예\n대\n율| \n예\n대\n율"
		+ "| \n일\n반\n여\n신\n\n(신규잔액)| \n일\n반\n여\n신\n\n(신규잔액)| \n일\n반\n여\n신\n\n(신규잔액)"
		+ "| \n수산\n해양\n여신\n\n(순증잔액)| \n수산\n해양\n여신\n\n(순증잔액)| \n수산\n해양\n여신\n\n(순증잔액)"
		+ "| \n소\n매\n여\n신\n\n(신규잔액)| \n소\n매\n여\n신\n\n(신규잔액)| \n소\n매\n여\n신\n\n(신규잔액)"
		;
		
	var strHeader1 = 
		"점번호|점명|PG명"
		+ "|달성사업수|전략평점(☞)|목표|실적|달성률|목표|실적|달성률|목표|실적|달성률|목표|실적|달성률|목표|실적|달성률|목표|실적|달성률|목표|실적|달성률|목표|실적|달성률"
		+ "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
		+ "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
		+ "|적용평점(☞)|목표|실적|목표|실적|목표|실적|평점(☞)"                        //공제사업
		+ "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"                   //펀드사업,총예수금(반기,월평)
		+ "|목표|실적|평점(☞)|목표|실적|평점(☞)"                                      //개인예수금,적립식
		+ "|예대율|예대평점(☞)"                                                      //예대율
		+ "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"                   //일반여신,수산해양,소매여신
		;
		
	for(col=3; col<81; col++ ){
		mySheet.SetCellAlign(0,col,"CenterTop");
	}
		
	i=0;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
		{ Text:strHeader1, Align:"Center"} ];
	mySheet.InitHeaders(headers, info);

	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
          {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
          {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
          {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
	if( basemonth == '201712' ) {
		cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
		//GetColHidden(i-1)  = true;
		mySheet.GetColHidden(58,1);
		cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
		//GetColHidden(i-1)  = true;
		mySheet.GetColHidden(59,1);
		cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	} else {
		cols.push({Type:"Text",      Hidden:1, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
		//GetColHidden(i-1)  = true;
		mySheet.GetColHidden(58,1);
		cols.push({Type:"Text",      Hidden:1, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
		//GetColHidden(i-1)  = true;
		mySheet.GetColHidden(59,1);
		cols.push({Type:"Text",      Hidden:1, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	}
	
	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });

	mySheet.InitColumns(cols);

	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(5,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(8,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(11,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(14,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(17,1);
	mySheet.SetColHidden(18,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(20,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(22,1);
	mySheet.SetColHidden(23,1);
	mySheet.SetColHidden(24,1);
	mySheet.SetColHidden(25,1);
	mySheet.SetColHidden(26,1);
	mySheet.SetColHidden(27,1);
	mySheet.SetColHidden(28,1);
	mySheet.SetColHidden(29,1);
	mySheet.SetColHidden(30,1);
	mySheet.SetColHidden(32,1);
	mySheet.SetColHidden(33,1);
	mySheet.SetColHidden(35,1);
	mySheet.SetColHidden(36,1);
	mySheet.SetColHidden(38,1);
	mySheet.SetColHidden(39,1);
	mySheet.SetColHidden(41,1);
	mySheet.SetColHidden(42,1);
	mySheet.SetColHidden(44,1);
	mySheet.SetColHidden(45,1);
	mySheet.SetColHidden(48,1);
	mySheet.SetColHidden(49,1);
	mySheet.SetColHidden(50,1);
	mySheet.SetColHidden(51,1);
	mySheet.SetColHidden(52,1);
	mySheet.SetColHidden(53,1);
	mySheet.SetColHidden(55,1);
	mySheet.SetColHidden(56,1);
	mySheet.SetColHidden(61,1);
	mySheet.SetColHidden(62,1);
	mySheet.SetColHidden(64,1);
	mySheet.SetColHidden(65,1);
	mySheet.SetColHidden(67,1);
	mySheet.SetColHidden(68,1);
	mySheet.SetColHidden(70,1);
	mySheet.SetColHidden(72,1);
	mySheet.SetColHidden(73,1);
	mySheet.SetColHidden(75,1);
	mySheet.SetColHidden(76,1);
	mySheet.SetColHidden(78,1);
	mySheet.SetColHidden(79,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
}

/*----------------------------------*/
/* @기능 : 2017년도 기준 그리드 set */
/*----------------------------------*/
function setGrid2017()
{
	basemonth   = document.frm.basemonth.value;

	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
	var strHeader0 = 
		"점번호|점명|PG명"
		+ "| \n전\n략\n사\n업\n\n| \n전\n략\n사\n업\n\n"
		+ "| \n전\n략\n사\n업\n\n(카드유효회원)| \n전\n략\n사\n업\n\n(카드유효회원)| \n전\n략\n사\n업\n\n(카드유효회원)"
		+ "| \n전\n략\n사\n업\n\n(적립식펀드)| \n전\n략\n사\n업\n\n(적립식펀드)| \n전\n략\n사\n업\n\n(적립식펀드)"
		+ "| \n전\n략\n사\n업\n\n(적립식공제)| \n전\n략\n사\n업\n\n(적립식공제)| \n전\n략\n사\n업\n\n(적립식공제)"
		+ "| \n전\n략\n사\n업\n\n(I S A)| \n전\n략\n사\n업\n\n(I S A)| \n전\n략\n사\n업\n\n(I S A)"
		+ "| \n전\n략\n사\n업\n\n(외화예금)| \n전\n략\n사\n업\n\n(외화예금)| \n전\n략\n사\n업\n\n(외화예금)"
		+ "| \n전\n략\n사\n업\n\n(정액적립식)| \n전\n략\n사\n업\n\n(정액적립식)| \n전\n략\n사\n업\n\n(정액적립식)"
		+ "| \n전\n략\n사\n업\n\n(적격대출)| \n전\n략\n사\n업\n\n(적격대출)| \n전\n략\n사\n업\n\n(적격대출)"
		+ "| \n전\n략\n사\n업\n\n(보증서대출)| \n전\n략\n사\n업\n\n(보증서대출)| \n전\n략\n사\n업\n\n(보증서대출)"
		+ "| \n외\n환\n사\n업| \n외\n환\n사\n업| \n외\n환\n사\n업"
		+ "| \n카\n드\n사\n업\n\n(매출액)| \n카\n드\n사\n업\n\n(매출액)| \n카\n드\n사\n업\n\n(매출액)"
		+ "| \n카\n드\n사\n업\n\n(순증유효회원)| \n카\n드\n사\n업\n\n(순증유효회원)| \n카\n드\n사\n업\n\n(순증유효회원)"
		+ "| \n신\n탁\n사\n업\n\n(특정금전)| \n신\n탁\n사\n업\n\n(특정금전)| \n신\n탁\n사\n업\n\n(특정금전)"
		+ "| \n신\n탁\n사\n업\n\n(부동산)| \n신\n탁\n사\n업\n\n(부동산)| \n신\n탁\n사\n업\n\n(부동산)"
		+ "| \n공\n제\n사\n업\n\n(총납입\n 공제료)| \n공\n제\n사\n업\n\n(총납입\n 공제료)| \n공\n제\n사\n업\n\n(총납입\n 공제료)"
		+ "| \n공\n제\n사\n업\n\n(적용평점)| \n공제사업\n\n(신규보장성건수)| \n공제사업\n\n(신규보장성건수)| \n공제사업\n\n(신규적립식 공제료)| \n공제사업\n\n(신규적립식 공제료)"
		+ "| \n펀\n드\n사\n업\n\n(전략상품\n수탁고)| \n펀\n드\n사\n업\n\n(전략상품\n수탁고)| \n펀\n드\n사\n업\n\n(전략상품\n수탁고)"
		+ "| \n총\n예\n수\n금\n\n(반기평잔)| \n총\n예\n수\n금\n\n(반기평잔)| \n총\n예\n수\n금\n\n(반기평잔)"
		+ "| \n총\n예\n수\n금\n\n(월중평잔)| \n총\n예\n수\n금\n\n(월중평잔)| \n총\n예\n수\n금\n\n(월중평잔)"
		+ "| \n중\n저원가성\n예금\n\n(반기평잔)| \n중\n저원가성\n예금\n\n(반기평잔)| \n중\n저원가성\n예금\n\n(반기평잔)"
		+ "| \n적립식\n예금\n\n(신규잔액)| \n적립식\n예금\n\n(신규잔액)| \n적립식\n예금\n\n(신규잔액)"
		+ "| \n예\n대\n율| \n예\n대\n율| \n예\n대\n율"
		+ "| \nR\nO\nR\nW\nA| \nR\nO\nR\nW\nA"
		+ "| \n일\n반\n여\n신\n\n(순증잔액)| \n일\n반\n여\n신\n\n(순증잔액)| \n일\n반\n여\n신\n\n(순증잔액)"
		+ "| \n수산\n해양\n여신\n\n(순증잔액)| \n수산\n해양\n여신\n\n(순증잔액)| \n수산\n해양\n여신\n\n(순증잔액)"
		+ "| \n소\n매\n여\n신\n\n(신규잔액)| \n소\n매\n여\n신\n\n(신규잔액)| \n소\n매\n여\n신\n\n(신규잔액)"
		;
	var strHeader1 =
		"점번호|점명|PG명" 
		+ "|달성사업수|전략평점(☞)|목표|실적|달성률|목표|실적|달성률|목표|실적|달성률|목표|실적|달성률|목표|실적|달성률|목표|실적|달성률|목표|실적|달성률|목표|실적|달성률"
		+ "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
		+ "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
		+ "|적용평점(☞)|목표|실적|목표|실적|목표|실적|평점(☞)"
		+ "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
		+ "|목표|실적|평점(☞)"                                                         //중저원가,적립식
		+ "|예대율|총예수금달성률|평점(☞)|실적|RWA평점(☞)"                            //예대율,RORWA
		+ "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"                   //일반여신,수산해양,소매여신
		;
		
	for(col=3; col<81; col++ ){
		mySheet.SetCellAlign(0,col,"CenterTop");
	}
	
	i=0;
	
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );
	
	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
		{ Text:strHeader1, Align:"Center"} ];
		
	mySheet.InitHeaders(headers, info);

	 var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	 {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	 {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
 	 
	if( basemonth == '201706') {
		 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
		 //GetColHidden(i-1)  = true;
		 mySheet.GetColHidden(58,1);
		 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
		 //GetColHidden(i-1)  = true;
		 mySheet.GetColHidden(59,1);
		 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	 } else {
		 cols.push({Type:"Text",      Hidden:1, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
		 //GetColHidden(i-1)  = true;
		 mySheet.GetColHidden(58,1);
		 cols.push({Type:"Text",      Hidden:1, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
		 //GetColHidden(i-1)  = true;
		 mySheet.GetColHidden(59,1);
		 cols.push({Type:"Text",      Hidden:1, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	 }

	 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	 cols.push({Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 });
	 
	 mySheet.InitColumns(cols);
	
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(5,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(8,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(11,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(14,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(17,1);
	mySheet.SetColHidden(18,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(20,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(22,1);
	mySheet.SetColHidden(23,1);
	mySheet.SetColHidden(24,1);
	mySheet.SetColHidden(25,1);
	mySheet.SetColHidden(26,1);
	mySheet.SetColHidden(27,1);
	mySheet.SetColHidden(28,1);
	mySheet.SetColHidden(29,1);
	mySheet.SetColHidden(30,1);
	mySheet.SetColHidden(32,1);
	mySheet.SetColHidden(33,1);
	mySheet.SetColHidden(35,1);
	mySheet.SetColHidden(36,1);
	mySheet.SetColHidden(38,1);
	mySheet.SetColHidden(39,1);
	mySheet.SetColHidden(41,1);
	mySheet.SetColHidden(42,1);
	mySheet.SetColHidden(44,1);
	mySheet.SetColHidden(45,1);
	mySheet.SetColHidden(48,1);
	mySheet.SetColHidden(49,1);
	mySheet.SetColHidden(50,1);
	mySheet.SetColHidden(51,1);
	mySheet.SetColHidden(52,1);
	mySheet.SetColHidden(53,1);
	mySheet.SetColHidden(55,1);
	mySheet.SetColHidden(56,1);
	mySheet.SetColHidden(61,1);
	mySheet.SetColHidden(62,1);
	mySheet.SetColHidden(64,1);
	mySheet.SetColHidden(65,1);
	mySheet.SetColHidden(67,1);
	mySheet.SetColHidden(68,1);
	mySheet.SetColHidden(70,1);
	mySheet.SetColHidden(72,1);
	mySheet.SetColHidden(73,1);
	mySheet.SetColHidden(75,1);
	mySheet.SetColHidden(76,1);
	mySheet.SetColHidden(78,1);
	mySheet.SetColHidden(79,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
}

/*-----------------------------------------*/
/* @기능 : 2016년도 하반기 기준 그리드 set */
/*-----------------------------------------*/
function setGrid2016Q3()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	

  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
	  "점번호|점명|PG명"
      + "| \n순수\n개인예금\n\n(잔액)| \n순수\n개인예금\n\n(잔액)| \n순수\n개인예금\n\n(잔액)"
      + "| \n순수\n개인예금\n\n(평잔)| \n순수\n개인예금\n\n(평잔)| \n순수\n개인예금\n\n(평잔)"
      + "| \n거치\n적립식예금\n\n(잔액)| \n거치\n적립식예금\n\n(잔액)| \n거치\n적립식예금\n\n(잔액)"
      + "| \n거치\n적립식예금\n\n(평잔)| \n거치\n적립식예금\n\n(평잔)| \n거치\n적립식예금\n\n(평잔)"
      + "| \n중\n저원가성\n예금\n\n(평잔)| \n중\n저원가성\n예금\n\n(평잔)| \n중\n저원가성\n예금\n\n(평잔)"
      + "| \nR\nO\nR\nW\nA| \nR\nO\nR\nW\nA"
      + "| \n대\n출\n금\n\n(신규잔액)| \n대\n출\n금\n\n(신규잔액)| \n대\n출\n금\n\n(신규잔액)"
      + "| \n소\n매\n여\n신\n\n(신규잔액)| \n소\n매\n여\n신\n\n(신규잔액)| \n소\n매\n여\n신\n\n(신규잔액)"
      + "| \n외\n환\n사\n업| \n외\n환\n사\n업| \n외\n환\n사\n업"
      + "| \n카\n드\n사\n업\n\n(신규유효회원)| \n카\n드\n사\n업\n\n(신규유효회원)| \n카\n드\n사\n업\n\n(신규유효회원)"
      + "| \n카\n드\n사\n업\n\n(순증유효회원)| \n카\n드\n사\n업\n\n(순증유효회원)| \n카\n드\n사\n업\n\n(순증유효회원)"
      + "| \n카\n드\n사\n업\n\n(신용카드 매출액)| \n카\n드\n사\n업\n\n(신용카드 매출액)| \n카\n드\n사\n업\n\n(신용카드 매출액)"
      + "| \n카\n드\n사\n업\n\n(체크카드 매출액)| \n카\n드\n사\n업\n\n(체크카드 매출액)| \n카\n드\n사\n업\n\n(체크카드 매출액)"
      + "| \n카\n드\n사\n업\n\n(법인카드 매출액)| \n카\n드\n사\n업\n\n(법인카드 매출액)| \n카\n드\n사\n업\n\n(법인카드 매출액)"
      + "| \n신\n탁\n사\n업\n\n(특정금전)| \n신\n탁\n사\n업\n\n(특정금전)| \n신\n탁\n사\n업\n\n(특정금전)"
      + "| \n신\n탁\n사\n업\n\n(부동산신탁)| \n신\n탁\n사\n업\n\n(부동산신탁)| \n신\n탁\n사\n업\n\n(부동산신탁)"
      + "| \n펀\n드\n사\n업\n\n(전략상품\n수탁고)| \n펀\n드\n사\n업\n\n(전략상품\n수탁고)| \n펀\n드\n사\n업\n\n(전략상품\n수탁고)"
      + "| \n펀\n드\n사\n업\n\n(장기고객수)| \n펀\n드\n사\n업\n\n(장기고객수)| \n펀\n드\n사\n업\n\n(장기고객수)"
      + "| \n공\n제\n사\n업\n\n(총납입\n 공제료)| \n공\n제\n사\n업\n\n(총납입\n 공제료)| \n공\n제\n사\n업\n\n(총납입\n 공제료)"
      + "| \n공\n제\n사\n업\n\n(적용평점)| \n공제사업\n\n(신규보장성건수)| \n공제사업\n\n(신규보장성건수)| \n공제사업\n\n(신규적립식 공제료)| \n공제사업\n\n(신규적립식 공제료)"
      + "| \n전\n자\n금\n융\n\n(인터넷뱅킹)| \n전\n자\n금\n융\n\n(인터넷뱅킹)| \n전\n자\n금\n융\n\n(인터넷뱅킹)"
      + "| \n전\n자\n금\n융\n\n(스마트폰뱅킹)| \n전\n자\n금\n융\n\n(스마트폰뱅킹)| \n전\n자\n금\n융\n\n(스마트폰뱅킹)"
      + "| \n전\n자\n금\n융\n\n(PUSH서비스)| \n전\n자\n금\n융\n\n(PUSH서비스)| \n전\n자\n금\n융\n\n(PUSH서비스)"
      ;

	var strHeader1 = 
	  "점번호|점명|PG명"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)|실적|RWA평점(☞)"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
      + "|목표|실적|카드평점|목표|실적|카드평점"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)|적용평점(☞)|목표|실적|목표|실적"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
      ;

	for(col=3; col<73; col++ ){
 		mySheet.SetCellAlign(0,col,"CenterTop");
    }

    i=0;

  	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

  	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
		{ Text:strHeader1, Align:"Center"} ];
		
  	mySheet.InitHeaders(headers, info);

  	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
         {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
         {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
         {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
   
	mySheet.InitColumns(cols);

	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(18,1);
	mySheet.SetColHidden(29,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(23,1);
	mySheet.SetColHidden(24,1);
	mySheet.SetColHidden(26,1);
	mySheet.SetColHidden(27,1);
	mySheet.SetColHidden(29,1);
	mySheet.SetColHidden(30,1);
	mySheet.SetColHidden(32,1);
	mySheet.SetColHidden(33,1);
	mySheet.SetColHidden(35,1);
	mySheet.SetColHidden(36,1);
	mySheet.SetColHidden(38,1);
	mySheet.SetColHidden(39,1);
	mySheet.SetColHidden(41,1);
	mySheet.SetColHidden(42,1);
	mySheet.SetColHidden(44,1);
	mySheet.SetColHidden(45,1);
	mySheet.SetColHidden(47,1);
	mySheet.SetColHidden(48,1);
	mySheet.SetColHidden(50,1);
	mySheet.SetColHidden(51,1);
	mySheet.SetColHidden(53,1);
	mySheet.SetColHidden(54,1);
	mySheet.SetColHidden(56,1);
	mySheet.SetColHidden(57,1);
	mySheet.SetColHidden(60,1);
	mySheet.SetColHidden(61,1);
	mySheet.SetColHidden(62,1);
	mySheet.SetColHidden(63,1);
	mySheet.SetColHidden(64,1);
	mySheet.SetColHidden(65,1);
	mySheet.SetColHidden(67,1);
	mySheet.SetColHidden(68,1);
	mySheet.SetColHidden(70,1);
	mySheet.SetColHidden(71,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
}

/*------------------------------------*/
/* @기능 : 2016년도 기준 그리드 set   */
/*------------------------------------*/
function setGrid2016()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	

    //지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
	var strHeader0 = 
	   "점번호|점명|PG명"
       + "| \n순수\n개인예금\n\n(잔액)| \n순수\n개인예금\n\n(잔액)| \n순수\n개인예금\n\n(잔액)"
       + "| \n순수\n개인예금\n\n(평잔)| \n순수\n개인예금\n\n(평잔)| \n순수\n개인예금\n\n(평잔)"
       + "| \n거치\n적립식예금\n\n(잔액)| \n거치\n적립식예금\n\n(잔액)| \n거치\n적립식예금\n\n(잔액)"
       + "| \n거치\n적립식예금\n\n(평잔)| \n거치\n적립식예금\n\n(평잔)| \n거치\n적립식예금\n\n(평잔)"
       + "| \n중\n저원가성\n예금\n\n(평잔)| \n중\n저원가성\n예금\n\n(평잔)| \n중\n저원가성\n예금\n\n(평잔)"
       + "| \n대\n출\n금\n\n(순증잔액)| \n대\n출\n금\n\n(순증잔액)| \n대\n출\n금\n\n(순증잔액)"
       + "| \n대\n출\n금\n\n(신규잔액)| \n대\n출\n금\n\n(신규잔액)| \n대\n출\n금\n\n(신규잔액)"
       + "| \n소\n매\n여\n신\n\n(순증잔액)| \n소\n매\n여\n신\n\n(순증잔액)| \n소\n매\n여\n신\n\n(순증잔액)"
       + "| \n소\n매\n여\n신\n\n(신규잔액)| \n소\n매\n여\n신\n\n(신규잔액)| \n소\n매\n여\n신\n\n(신규잔액)"
       + "| \n외\n환\n사\n업| \n외\n환\n사\n업| \n외\n환\n사\n업"
       + "| \n카\n드\n사\n업\n\n(신규유효회원)| \n카\n드\n사\n업\n\n(신규유효회원)| \n카\n드\n사\n업\n\n(신규유효회원)"
       + "| \n카\n드\n사\n업\n\n(순증유효회원)| \n카\n드\n사\n업\n\n(순증유효회원)| \n카\n드\n사\n업\n\n(순증유효회원)"
       + "| \n카\n드\n사\n업\n\n(신용카드 매출액)| \n카\n드\n사\n업\n\n(신용카드 매출액)| \n카\n드\n사\n업\n\n(신용카드 매출액)"
       + "| \n카\n드\n사\n업\n\n(체크카드 매출액)| \n카\n드\n사\n업\n\n(체크카드 매출액)| \n카\n드\n사\n업\n\n(체크카드 매출액)"
       + "| \n신\n탁\n사\n업\n\n(특정금전)| \n신\n탁\n사\n업\n\n(특정금전)| \n신\n탁\n사\n업\n\n(특정금전)"
       + "| \n신\n탁\n사\n업\n\n(부동산신탁)| \n신\n탁\n사\n업\n\n(부동산신탁)| \n신\n탁\n사\n업\n\n(부동산신탁)"
       + "| \n펀\n드\n사\n업\n\n(전략상품\n수탁고)| \n펀\n드\n사\n업\n\n(전략상품\n수탁고)| \n펀\n드\n사\n업\n\n(전략상품\n수탁고)"
       + "| \n펀\n드\n사\n업\n\n(장기고객수)| \n펀\n드\n사\n업\n\n(장기고객수)| \n펀\n드\n사\n업\n\n(장기고객수)"
       + "| \n공\n제\n사\n업\n\n(총납입\n 공제료)| \n공\n제\n사\n업\n\n(총납입\n 공제료)| \n공\n제\n사\n업\n\n(총납입\n 공제료)"
       + "| \n공\n제\n사\n업\n\n(적용평점)| \n공제사업\n\n(신규보장성건수)| \n공제사업\n\n(신규보장성건수)| \n공제사업\n\n(신규적립식 공제료)| \n공제사업\n\n(신규적립식 공제료)"
       + "| \n전\n자\n금\n융\n\n(인터넷뱅킹)| \n전\n자\n금\n융\n\n(인터넷뱅킹)| \n전\n자\n금\n융\n\n(인터넷뱅킹)"
       + "| \n전\n자\n금\n융\n\n(스마트폰뱅킹)| \n전\n자\n금\n융\n\n(스마트폰뱅킹)| \n전\n자\n금\n융\n\n(스마트폰뱅킹)"
       + "| \n전\n자\n금\n융\n\n(PUSH서비스)| \n전\n자\n금\n융\n\n(PUSH서비스)| \n전\n자\n금\n융\n\n(PUSH서비스)"
       ;

	var strHeader1 = 
	   "점번호|점명|PG명"
       + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
       + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
       + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
       + "|목표|실적|평점(☞)|목표|실적|카드평점|목표|실적|카드평점"
       + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
       + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
       + "|목표|실적|평점(☞)|적용평점(☞)|목표|실적|목표|실적"
       + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
       ;

	for(col=3; col<74; col++ )
	{
    	mySheet.SetCellAlign(0,col,"CenterTop");
	}
	
    i=0;

    mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

    var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
		{ Text:strHeader1, Align:"Center"} ];
    mySheet.InitHeaders(headers, info);

	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
		{Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
                
	mySheet.InitColumns(cols);
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(4-1,1);
	mySheet.SetColHidden(5-1,1);
	mySheet.SetColHidden(7-1,1);
	mySheet.SetColHidden(8-1,1);
	mySheet.SetColHidden(10-1,1);
	mySheet.SetColHidden(11-1,1);
	mySheet.SetColHidden(13-1,1);
	mySheet.SetColHidden(14-1,1);
	mySheet.SetColHidden(16-1,1);
	mySheet.SetColHidden(17-1,1);
	mySheet.SetColHidden(19-1,1);
	mySheet.SetColHidden(20-1,1);
	mySheet.SetColHidden(22-1,1);
	mySheet.SetColHidden(23-1,1);
	mySheet.SetColHidden(25-1,1);
	mySheet.SetColHidden(26-1,1);
	mySheet.SetColHidden(28-1,1);
	mySheet.SetColHidden(29-1,1);
	mySheet.SetColHidden(31-1,1);
	mySheet.SetColHidden(32-1,1);
	mySheet.SetColHidden(34-1,1);
	mySheet.SetColHidden(35-1,1);
	mySheet.SetColHidden(37-1,1);
	mySheet.SetColHidden(38-1,1);
	mySheet.SetColHidden(40-1,1);
	mySheet.SetColHidden(41-1,1);
	mySheet.SetColHidden(43-1,1);
	mySheet.SetColHidden(44-1,1);
	mySheet.SetColHidden(46-1,1);
	mySheet.SetColHidden(47-1,1);
	mySheet.SetColHidden(49-1,1);
	mySheet.SetColHidden(50-1,1);
	mySheet.SetColHidden(52-1,1);
	mySheet.SetColHidden(53-1,1);
	mySheet.SetColHidden(55-1,1);
	mySheet.SetColHidden(56-1,1);
	mySheet.SetColHidden(58-1,1);
	mySheet.SetColHidden(59-1,1);
	mySheet.SetColHidden(62-1,1);
	mySheet.SetColHidden(63-1,1);
	mySheet.SetColHidden(64-1,1);
	mySheet.SetColHidden(65-1,1);
	mySheet.SetColHidden(66-1,1);
	mySheet.SetColHidden(67-1,1);
	mySheet.SetColHidden(69-1,1);
	mySheet.SetColHidden(70-1,1);
	mySheet.SetColHidden(72-1,1);
	mySheet.SetColHidden(73-1,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
}

/*-------------------------------------------*/
/* @기능 : 2015년도 하반기 기준 그리드 set   */
/*-------------------------------------------*/
function setGrid2015Q3()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
	var strHeader0 =
		"점번호|점명|PG명"
		+ "| \n개인\n거치식\n적립식\n예금\n\n(평잔)| \n개인\n거치식\n적립식\n예금\n\n(평잔)| \n개인\n거치식\n적립식\n예금\n\n(평잔)"
		+ "| \n기업\n거치식\n적립식\n예금\n\n(평잔)| \n기업\n거치식\n적립식\n예금\n\n(평잔)| \n기업\n거치식\n적립식\n예금\n\n(평잔)"
		+ "| \n중\n저원가성\n예금\n\n(평잔)| \n중\n저원가성\n예금\n\n(평잔)| \n중\n저원가성\n예금\n\n(평잔)"
		+ "| \n대\n출\n금\n\n(잔액)| \n대\n출\n금\n\n(잔액)| \n대\n출\n금\n\n(잔액)"
		+ "| \n대\n출\n금\n\n(평잔)| \n대\n출\n금\n\n(평잔)| \n대\n출\n금\n\n(평잔)"
		+ "| \n소\n매\n여\n신\n\n(순증잔액)| \n소\n매\n여\n신\n\n(순증잔액)| \n소\n매\n여\n신\n\n(순증잔액)"
		+ "| \n소\n매\n여\n신\n\n(신규잔액)| \n소\n매\n여\n신\n\n(신규잔액)| \n소\n매\n여\n신\n\n(신규잔액)"
		+ "| \n외\n환\n사\n업| \n외\n환\n사\n업| \n외\n환\n사\n업"
		+ "| \n카\n드\n사\n업\n\n(유효회원)| \n카\n드\n사\n업\n\n(유효회원)| \n카\n드\n사\n업\n\n(유효회원)"
		+ "| \n카\n드\n사\n업\n\n(매출액)| \n카\n드\n사\n업\n\n(매출액)| \n카\n드\n사\n업\n\n(매출액)"
		+ "| \n신\n탁\n사\n업\n\n(특정금전)| \n신\n탁\n사\n업\n\n(특정금전)| \n신\n탁\n사\n업\n\n(특정금전)"
		+ "| \n신\n탁\n사\n업\n\n(퇴직연금)| \n신\n탁\n사\n업\n\n(퇴직연금)| \n신\n탁\n사\n업\n\n(퇴직연금)"
		+ "| \n펀\n드\n사\n업\n\n(전략상품\n수탁고)| \n펀\n드\n사\n업\n\n(전략상품\n수탁고)| \n펀\n드\n사\n업\n\n(전략상품\n수탁고)"
		+ "| \n펀\n드\n사\n업\n\n(장기고객수)| \n펀\n드\n사\n업\n\n(장기고객수)| \n펀\n드\n사\n업\n\n(장기고객수)"
		+ "| \n공\n제\n사\n업\n\n(총납입\n 공제료)| \n공\n제\n사\n업\n\n(총납입\n 공제료)| \n공\n제\n사\n업\n\n(총납입\n 공제료)"
		+ "| \n공\n제\n사\n업\n\n(적용평점)| \n공제사업\n\n(신규보장성건수)| \n공제사업\n\n(신규보장성건수)| \n공제사업\n\n(신규적립식 공제료)| \n공제사업\n\n(신규적립식 공제료)"
		+ "| \n전\n자\n금\n융\n\n(ShCashPlus)| \n전\n자\n금\n융\n\n(ShCashPlus)| \n전\n자\n금\n융\n\n(ShCashPlus)"
		+ "| \n전\n자\n금\n융\n\n(스마트폰뱅킹)| \n전\n자\n금\n융\n\n(스마트폰뱅킹)| \n전\n자\n금\n융\n\n(스마트폰뱅킹)"
		;
	
	var strHeader1 =
		"점번호|점명|PG명"
		+ "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
		+ "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
		+ "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
		+ "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
		+ "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|적용평점(☞)|목표|실적|목표|실적"
		+ "|목표|실적|평점(☞)|목표|실적|평점(☞)"
		;
	
	for(col=3; col<59; col++ ){
		mySheet.SetCellAlign(0,col,"CenterTop");
	}
	
	i=0;
	
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );
	
	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
		{ Text:strHeader1, Align:"Center"} ];
		
	mySheet.InitHeaders(headers, info);

	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
		{Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
                   
	mySheet.InitColumns(cols);
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(18,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(22,1);
	mySheet.SetColHidden(23,1);
	mySheet.SetColHidden(25,1);
	mySheet.SetColHidden(26,1);
	mySheet.SetColHidden(28,1);
	mySheet.SetColHidden(29,1);
	mySheet.SetColHidden(31,1);
	mySheet.SetColHidden(32,1);
	mySheet.SetColHidden(34,1);
	mySheet.SetColHidden(35,1);
	mySheet.SetColHidden(37,1);
	mySheet.SetColHidden(38,1);
	mySheet.SetColHidden(40,1);
	mySheet.SetColHidden(41,1);
	mySheet.SetColHidden(43,1);
	mySheet.SetColHidden(44,1);
	mySheet.SetColHidden(46,1);
	mySheet.SetColHidden(47,1);
	mySheet.SetColHidden(50,1);
	mySheet.SetColHidden(51,1);
	mySheet.SetColHidden(52,1);
	mySheet.SetColHidden(53,1);
	mySheet.SetColHidden(54,1);
	mySheet.SetColHidden(55,1);
	mySheet.SetColHidden(56,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
}

/*-------------------------------------*/
/* @기능 : 2015년도  기준 그리드 set   */
/*-------------------------------------*/
function setGrid2015()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
	  "점번호|점명|PG명"
      + "| \n개인\n거치식\n적립식\n예금\n\n(평잔)| \n개인\n거치식\n적립식\n예금\n\n(평잔)| \n개인\n거치식\n적립식\n예금\n\n(평잔)"
      + "| \n기업\n거치식\n적립식\n예금\n\n(평잔)| \n기업\n거치식\n적립식\n예금\n\n(평잔)| \n기업\n거치식\n적립식\n예금\n\n(평잔)"
      + "| \n중\n저원가성\n예금\n\n(평잔)| \n중\n저원가성\n예금\n\n(평잔)| \n중\n저원가성\n예금\n\n(평잔)"
      + "| \n대\n출\n금\n\n(잔액)| \n대\n출\n금\n\n(잔액)| \n대\n출\n금\n\n(잔액)"
      + "| \n대\n출\n금\n\n(평잔)| \n대\n출\n금\n\n(평잔)| \n대\n출\n금\n\n(평잔)"
      + "| \n소\n매\n여\n신\n\n(순증잔액)| \n소\n매\n여\n신\n\n(순증잔액)| \n소\n매\n여\n신\n\n(순증잔액)"
      + "| \n소\n매\n여\n신\n\n(신규잔액)| \n소\n매\n여\n신\n\n(신규잔액)| \n소\n매\n여\n신\n\n(신규잔액)"
      + "| \n외\n환\n사\n업| \n외\n환\n사\n업| \n외\n환\n사\n업"
      + "| \n카\n드\n사\n업| \n카\n드\n사\n업| \n카\n드\n사\n업"
      + "| \n신\n탁\n사\n업\n\n(특정금전)| \n신\n탁\n사\n업\n\n(특정금전)| \n신\n탁\n사\n업\n\n(특정금전)"
      + "| \n신\n탁\n사\n업\n\n(퇴직연금)| \n신\n탁\n사\n업\n\n(퇴직연금)| \n신\n탁\n사\n업\n\n(퇴직연금)"
      + "| \n펀\n드\n사\n업\n\n(전략상품\n수탁고)| \n펀\n드\n사\n업\n\n(전략상품\n수탁고)| \n펀\n드\n사\n업\n\n(전략상품\n수탁고)"
      + "| \n펀\n드\n사\n업\n\n(장기고객수)| \n펀\n드\n사\n업\n\n(장기고객수)| \n펀\n드\n사\n업\n\n(장기고객수)"
      + "| \n공\n제\n사\n업\n\n(총납입\n 공제료)| \n공\n제\n사\n업\n\n(총납입\n 공제료)| \n공\n제\n사\n업\n\n(총납입\n 공제료)"
      + "| \n공\n제\n사\n업\n\n(적용평점)| \n공제사업\n\n(신규보장성건수)| \n공제사업\n\n(신규보장성건수)| \n공제사업\n\n(신규적립식 공제료)| \n공제사업\n\n(신규적립식 공제료)"
      + "| \n전\n자\n금\n융\n\n(인터넷뱅킹)| \n전\n자\n금\n융\n\n(인터넷뱅킹)| \n전\n자\n금\n융\n\n(인터넷뱅킹)"
      + "| \n전\n자\n금\n융\n\n(스마트폰뱅킹)| \n전\n자\n금\n융\n\n(스마트폰뱅킹)| \n전\n자\n금\n융\n\n(스마트폰뱅킹)"
      ;
	var strHeader1 = 
	  "점번호|점명|PG명"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)|적용평점(☞)|목표|실적|목표|실적"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)"
      ;

	for(col=3; col<56; col++ ){
    	mySheet.SetCellAlign(0,col,"CenterTop");
    }

	i=0;
	
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );
	
	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
		{ Text:strHeader1, Align:"Center"} ];
		
	mySheet.InitHeaders(headers, info);
	
	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
       {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
       {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
 
	mySheet.InitColumns(cols);
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(18,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(22,1);
	mySheet.SetColHidden(24,1);
	mySheet.SetColHidden(25,1);
	mySheet.SetColHidden(27,1);
	mySheet.SetColHidden(28,1);
	mySheet.SetColHidden(30,1);
	mySheet.SetColHidden(31,1);
	mySheet.SetColHidden(33,1);
	mySheet.SetColHidden(34,1);
	mySheet.SetColHidden(36,1);
	mySheet.SetColHidden(37,1);
	mySheet.SetColHidden(39,1);
	mySheet.SetColHidden(40,1);
	mySheet.SetColHidden(42,1);
	mySheet.SetColHidden(43,1);
	mySheet.SetColHidden(46,1);
	mySheet.SetColHidden(47,1);
	mySheet.SetColHidden(48,1);
	mySheet.SetColHidden(49,1);
	mySheet.SetColHidden(50,1);
	mySheet.SetColHidden(51,1);
	mySheet.SetColHidden(53,1);
	mySheet.SetColHidden(54,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
}

/*--------------------------------------------*/
/* @기능 : 2014년도  하반기 기준 그리드 set   */
/*--------------------------------------------*/
function setGrid2014Q3()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
	var strHeader0 = 
		"점번호|점명|PG명"
    	+ "| \n거치식\n적립식\n예금\n\n(평잔)\n| \n거치식\n적립식\n예금\n\n(평잔)\n| \n거치식\n적립식\n예금\n\n(평잔)\n"
        + "| \n중\n저원가성\n예금\n\n(평잔)\n| \n중\n저원가성\n예금\n\n(평잔)\n| \n중\n저원가성\n예금\n\n(평잔)\n"
        + "| \n대\n출\n금\n\n(잔액)\n| \n대\n출\n금\n\n(잔액)\n| \n대\n출\n금\n\n(잔액)\n"
        + "| \n대\n출\n금\n\n(평잔)\n| \n대\n출\n금\n\n(평잔)\n| \n대\n출\n금\n\n(평잔)\n"
        + "| \n소\n매\n여\n신\n\n(순증잔액)\n| \n소\n매\n여\n신\n\n(순증잔액)\n| \n소\n매\n여\n신\n\n(순증잔액)\n"
        + "| \n소\n매\n여\n신\n\n(신규잔액)\n| \n소\n매\n여\n신\n\n(신규잔액)\n| \n소\n매\n여\n신\n\n(신규잔액)\n"
        + "| \n외\n환\n사\n업\n| \n외\n환\n사\n업\n| \n외\n환\n사\n업\n"
        + "| \n카\n드\n사\n업\n| \n카\n드\n사\n업\n| \n카\n드\n사\n업\n"
        + "| \n신\n탁\n사\n업\n\n(특정금전)\n| \n신\n탁\n사\n업\n\n(특정금전)\n| \n신\n탁\n사\n업\n\n(특정금전)\n"
        + "| \n신\n탁\n사\n업\n\n(퇴직연금)\n| \n신\n탁\n사\n업\n\n(퇴직연금)\n| \n신\n탁\n사\n업\n\n(퇴직연금)\n"
        + "| \n공\n제\n사\n업\n| \n공\n제\n사\n업\n| \n공\n제\n사\n업\n"
        + "| \n펀\n드\n사\n업\n| \n펀\n드\n사\n업\n| \n펀\n드\n사\n업\n"
        + "| \n전\n자\n금\n융\n| \n전\n자\n금\n융\n| \n전\n자\n금\n융\n"
        ;

	var strHeader1 = 
		"점번호|점명|PG명"
    	+ "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
        + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
        + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
        + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
        + "|목표|실적|평점(☞)"
        ;

	for(col=3; col<42; col++ ){
		mySheet.SetCellAlign(0,col,"CenterTop");
	}

	i=0;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
		{ Text:strHeader1, Align:"Center"} ];
	mySheet.InitHeaders(headers, info);

	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
		{Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
		{Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
		{Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
                
	mySheet.InitColumns(cols);
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(18,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(22,1);
	mySheet.SetColHidden(24,1);
	mySheet.SetColHidden(25,1);
	mySheet.SetColHidden(27,1);
	mySheet.SetColHidden(28,1);
	mySheet.SetColHidden(30,1);
	mySheet.SetColHidden(31,1);
	mySheet.SetColHidden(33,1);
	mySheet.SetColHidden(34,1);
	mySheet.SetColHidden(36,1);
	mySheet.SetColHidden(37,1);
	mySheet.SetColHidden(39,1);
	mySheet.SetColHidden(40,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
}

/*--------------------------------------------*/
/* @기능 : 2014년도       기준 그리드 set     */
/*--------------------------------------------*/
function setGrid2014()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	

  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
	  "점번호|점명|PG명"
      + "| \n예\n수\n금\n\n(평잔)\n| \n예\n수\n금\n\n(평잔)\n| \n예\n수\n금\n\n(평잔)\n"
      + "| \n대\n출\n금\n\n(잔액)\n| \n대\n출\n금\n\n(잔액)\n| \n대\n출\n금\n\n(잔액)\n"
      + "| \n대\n출\n금\n\n(평잔)\n| \n대\n출\n금\n\n(평잔)\n| \n대\n출\n금\n\n(평잔)\n"
      + "| \n소\n매\n여\n신\n\n(잔액)\n| \n소\n매\n여\n신\n\n(잔액)\n| \n소\n매\n여\n신\n\n(잔액)\n"
      + "| \n외\n환\n사\n업\n| \n외\n환\n사\n업\n| \n외\n환\n사\n업\n"
      + "| \n카\n드\n사\n업\n| \n카\n드\n사\n업\n| \n카\n드\n사\n업\n"
      + "| \n신\n탁\n사\n업\n\n(특정금전)\n| \n신\n탁\n사\n업\n\n(특정금전)\n| \n신\n탁\n사\n업\n\n(특정금전)\n"
      + "| \n신\n탁\n사\n업\n\n(퇴직연금)\n| \n신\n탁\n사\n업\n\n(퇴직연금)\n| \n신\n탁\n사\n업\n\n(퇴직연금)\n"
      + "| \n공\n제\n사\n업\n| \n공\n제\n사\n업\n| \n공\n제\n사\n업\n"
      + "| \n펀\n드\n사\n업\n| \n펀\n드\n사\n업\n| \n펀\n드\n사\n업\n"
      + "| \n전\n자\n금\n융\n| \n전\n자\n금\n융\n| \n전\n자\n금\n융\n"
      ;

	var strHeader1 = 
	  "점번호|점명|PG명"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)"
      ;
	
	for(col=3; col<34; col++ ){
    	mySheet.SetCellAlign(0,col,"CenterTop");
    }

	i=0;
	
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );
	
	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
		{ Text:strHeader1, Align:"Center"} ];
		
	mySheet.InitHeaders(headers, info);
	
	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	       {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	       {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
	 
	mySheet.InitColumns(cols);
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(18,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(22,1);
	mySheet.SetColHidden(24,1);
	mySheet.SetColHidden(25,1);
	mySheet.SetColHidden(27,1);
	mySheet.SetColHidden(28,1);
	mySheet.SetColHidden(30,1);
	mySheet.SetColHidden(31,1);
	mySheet.SetColHidden(33,1);
	mySheet.SetColHidden(34,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명, 미불");
}

/*--------------------------------------------*/
/* @기능 : 2013년도       기준 그리드 set     */
/*--------------------------------------------*/
function setGrid2013()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
	var strHeader0 = 
		"점번호|점명|PG명"
        + "| \n예\n수\n금\n\n(평잔)\n| \n예\n수\n금\n\n(평잔)\n| \n예\n수\n금\n\n(평잔)\n"
        + "| \n대\n출\n금\n\n(잔액)\n| \n대\n출\n금\n\n(잔액)\n| \n대\n출\n금\n\n(잔액)\n"
        + "| \n대\n출\n금\n\n(평잔)\n| \n대\n출\n금\n\n(평잔)\n| \n대\n출\n금\n\n(평잔)\n"
		;
		
	var strHeader1 = 
		"점번호|점명|PG명"
		+ "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)";
	
	for(col=3; col<13; col++ ){
		mySheet.SetCellAlign(0,col,"CenterTop");
	}
	i=0;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
		{ Text:strHeader1, Align:"Center"} ];
	mySheet.InitHeaders(headers, info);

	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
                   
	mySheet.InitColumns(cols);
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명");
}

/*--------------------------------------------*/
/* @기능 : 2012년도 하반기기준 그리드 set     */
/* 예수금분기평잔 추가                        */
/*--------------------------------------------*/
function setGrid201207()
{
  	//mySheet = document.frm.mySheet;
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	

  // 상위 GRID에 대한 속성정보 설정
  //지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
	var strHeader0 =
	  "점번호|점명|PG명"
      + "| \n개\n인\n예\n수\n금\n\n(반기평잔)\n| \n개\n인\n예\n수\n금\n\n(반기평잔)\n| \n개\n인\n예\n수\n금\n\n(반기평잔)\n"
      + "| \n개\n인\n예\n수\n금\n\n(분기평잔)\n| \n개\n인\n예\n수\n금\n\n(분기평잔)\n| \n개\n인\n예\n수\n금\n\n(분기평잔)\n"
      + "| \n기\n업\n예\n수\n금\n\n(반기평잔)\n| \n기\n업\n예\n수\n금\n\n(반기평잔)\n| \n기\n업\n예\n수\n금\n\n(반기평잔)\n"
      + "| \n기\n업\n예\n수\n금\n\n(분기평잔)\n| \n기\n업\n예\n수\n금\n\n(분기평잔)\n| \n기\n업\n예\n수\n금\n\n(분기평잔)\n"
      + "| \n대\n출\n금\n\n(순증평잔)\n| \n대\n출\n금\n\n(순증평잔)\n| \n대\n출\n금\n\n(순증평잔)\n"
      + "| \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n"
      + "| \n대\n출\n금\n\n(분기잔액)\n| \n대\n출\n금\n\n(분기잔액)\n| \n대\n출\n금\n\n(분기잔액)\n"
      + "| \n개\n인\n대\n출\n금\n\n(순증평잔)\n| \n개\n인\n대\n출\n금\n\n(순증평잔)\n| \n개\n인\n대\n출\n금\n\n(순증평잔)\n"
      + "| \n개\n인\n대\n출\n금\n\n(순증잔액)\n| \n개\n인\n대\n출\n금\n\n(순증잔액)\n| \n개\n인\n대\n출\n금\n\n(순증잔액)\n"
      + "| \n개\n인\n대\n출\n금\n\n(분기잔액)\n| \n개\n인\n대\n출\n금\n\n(분기잔액)\n| \n개\n인\n대\n출\n금\n\n(분기잔액)\n"
      + "| \n기\n업\n대\n출\n금\n\n(순증평잔)\n| \n기\n업\n대\n출\n금\n\n(순증평잔)\n| \n기\n업\n대\n출\n금\n\n(순증평잔)\n"
      + "| \n기\n업\n대\n출\n금\n\n(순증잔액)\n| \n기\n업\n대\n출\n금\n\n(순증잔액)\n| \n기\n업\n대\n출\n금\n\n(순증잔액)\n"
      + "| \n기\n업\n대\n출\n금\n\n(분기잔액)\n| \n기\n업\n대\n출\n금\n\n(분기잔액)\n| \n기\n업\n대\n출\n금\n\n(분기잔액)\n"
      + "| \n외\n환\n취\n급\n액| \n외\n환\n취\n급\n액| \n외\n환\n취\n급\n액"
      + "| \n퇴\n직\n연\n금| \n퇴\n직\n연\n금| \n퇴\n직\n연\n금"
      + "| \n신\n용\n카\n드\n매\n출\n액| \n신\n용\n카\n드\n매\n출\n액| \n신\n용\n카\n드\n매\n출\n액"
      + "| \n구\n매\n카\n드\n\n(평잔)| \n구\n매\n카\n드\n\n(평잔)| \n구\n매\n카\n드\n\n(평잔)";

	var strHeader1 =
	  "점번호|점명|PG명"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)";

    for(col=3; col<55; col++ ){
    	mySheet.SetCellAlign(0,col,"CenterTop");
   	}

    i=0;

    mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

    var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
			{ Text:strHeader1, Align:"Center"} ];
		
    mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
       
	mySheet.InitColumns(cols);

	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(18,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(22,1);
	mySheet.SetColHidden(24,1);
	mySheet.SetColHidden(25,1);
	mySheet.SetColHidden(27,1);
	mySheet.SetColHidden(28,1);
	mySheet.SetColHidden(30,1);
	mySheet.SetColHidden(31,1);
	mySheet.SetColHidden(33,1);
	mySheet.SetColHidden(34,1);
	mySheet.SetColHidden(36,1);
	mySheet.SetColHidden(37,1);
	mySheet.SetColHidden(39,1);
	mySheet.SetColHidden(40,1);
	mySheet.SetColHidden(42,1);
	mySheet.SetColHidden(43,1);
	mySheet.SetColHidden(45,1);
	mySheet.SetColHidden(46,1);
	mySheet.SetColHidden(48,1);
	mySheet.SetColHidden(49,1);
	mySheet.SetColHidden(51,1);
	mySheet.SetColHidden(52,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명");
}

/*----------------------------------*/
/* @기능 : 2012년도 기준 그리드 set */
/*----------------------------------*/
function setGrid2012()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
	  "점번호|점명|PG명"
      + "| \n개\n인\n예\n수\n금\n\n(순증평잔)\n| \n개\n인\n예\n수\n금\n\n(순증평잔)\n| \n개\n인\n예\n수\n금\n\n(순증평잔)\n"
      + "| \n개\n인\n예\n수\n금\n\n(순증잔액)\n| \n개\n인\n예\n수\n금\n\n(순증잔액)\n| \n개\n인\n예\n수\n금\n\n(순증잔액)\n"
      + "| \n기\n업\n예\n수\n금\n\n(순증평잔)\n| \n기\n업\n예\n수\n금\n\n(순증평잔)\n| \n기\n업\n예\n수\n금\n\n(순증평잔)\n"
      + "| \n기\n업\n예\n수\n금\n\n(순증잔액)\n| \n기\n업\n예\n수\n금\n\n(순증잔액)\n| \n기\n업\n예\n수\n금\n\n(순증잔액)\n"
      + "| \n대\n출\n금\n\n(순증평잔)\n| \n대\n출\n금\n\n(순증평잔)\n| \n대\n출\n금\n\n(순증평잔)\n"
      + "| \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n"
      + "| \n대\n출\n금\n\n(분기잔액)\n| \n대\n출\n금\n\n(분기잔액)\n| \n대\n출\n금\n\n(분기잔액)\n"
      + "| \n개\n인\n대\n출\n금\n\n(순증평잔)\n| \n개\n인\n대\n출\n금\n\n(순증평잔)\n| \n개\n인\n대\n출\n금\n\n(순증평잔)\n"
      + "| \n개\n인\n대\n출\n금\n\n(순증잔액)\n| \n개\n인\n대\n출\n금\n\n(순증잔액)\n| \n개\n인\n대\n출\n금\n\n(순증잔액)\n"
      + "| \n개\n인\n대\n출\n금\n\n(분기잔액)\n| \n개\n인\n대\n출\n금\n\n(분기잔액)\n| \n개\n인\n대\n출\n금\n\n(분기잔액)\n"
      + "| \n기\n업\n대\n출\n금\n\n(순증평잔)\n| \n기\n업\n대\n출\n금\n\n(순증평잔)\n| \n기\n업\n대\n출\n금\n\n(순증평잔)\n"
      + "| \n기\n업\n대\n출\n금\n\n(순증잔액)\n| \n기\n업\n대\n출\n금\n\n(순증잔액)\n| \n기\n업\n대\n출\n금\n\n(순증잔액)\n"
      + "| \n기\n업\n대\n출\n금\n\n(분기잔액)\n| \n기\n업\n대\n출\n금\n\n(분기잔액)\n| \n기\n업\n대\n출\n금\n\n(분기잔액)\n"
      + "| \n외\n환\n취\n급\n액| \n외\n환\n취\n급\n액| \n외\n환\n취\n급\n액"
      + "| \n퇴\n직\n연\n금| \n퇴\n직\n연\n금| \n퇴\n직\n연\n금"
      + "| \n신\n용\n카\n드\n매\n출\n액| \n신\n용\n카\n드\n매\n출\n액| \n신\n용\n카\n드\n매\n출\n액"
      + "| \n구\n매\n카\n드\n\n(평잔)| \n구\n매\n카\n드\n\n(평잔)| \n구\n매\n카\n드\n\n(평잔)";

	var strHeader1 = 
	  "점번호|점명|PG명"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
      + "|목표|실적|평점(☞)|목표|실적|평점(☞)";

	for(col=3; col<55; col++ ){
		mySheet.SetCellAlign(0,col,"CenterTop");
	}
	
	i=0;
	
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );
	
	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
		{ Text:strHeader1, Align:"Center"} ];
	mySheet.InitHeaders(headers, info);
	
	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	       {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	       {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	       {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
       
    mySheet.InitColumns(cols);

	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(18,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(22,1);
	mySheet.SetColHidden(24,1);
	mySheet.SetColHidden(25,1);
	mySheet.SetColHidden(27,1);
	mySheet.SetColHidden(28,1);
	mySheet.SetColHidden(30,1);
	mySheet.SetColHidden(31,1);
	mySheet.SetColHidden(33,1);
	mySheet.SetColHidden(34,1);
	mySheet.SetColHidden(36,1);
	mySheet.SetColHidden(37,1);
	mySheet.SetColHidden(39,1);
	mySheet.SetColHidden(40,1);
	mySheet.SetColHidden(42,1);
	mySheet.SetColHidden(43,1);
	mySheet.SetColHidden(45,1);
	mySheet.SetColHidden(46,1);
	mySheet.SetColHidden(48,1);
	mySheet.SetColHidden(49,1);
	mySheet.SetColHidden(51,1);
	mySheet.SetColHidden(52,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명");
}

/*---------------------------------------*/
/* @기능 : 2008년도 이전 기준 그리드 set */
/*---------------------------------------*/
function setGrid2008()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
	var strHeader0 = 
		"점번호|점명|PG명"
        + "| \n예\n수\n금\n달\n성\n률\nI\n개\n인| \n예\n수\n금\n달\n성\n률\nI\n개\n인| \n예\n수\n금\n달\n성\n률\nI\n개\n인"
        + "| \n예\n수\n금\n달\n성\n률\nI\n기\n업| \n예\n수\n금\n달\n성\n률\nI\n기\n업| \n예\n수\n금\n달\n성\n률\nI\n기\n업"
        + "| \n저\n원\n가\n성\n예\n수\n금\n달\n성\n률\nI\n개\n인| \n저\n원\n가\n성\n예\n수\n금\n달\n성\n률\nI\n개\n인| \n저\n원\n가\n성\n예\n수\n금\n달\n성\n률\nI\n개\n인"
        + "| \n저\n원\n가\n성\n예\n수\n금\n달\n성\n률\nI\n기\n업| \n저\n원\n가\n성\n예\n수\n금\n달\n성\n률\nI\n기\n업| \n저\n원\n가\n성\n예\n수\n금\n달\n성\n률\nI\n기\n업"
        + "| \n여\n신\n잔\n액\n달\n성\n률\nI\n개\n인| \n여\n신\n잔\n액\n달\n성\n률\nI\n개\n인| \n여\n신\n잔\n액\n달\n성\n률\nI\n개\n인"
        + "| \n여\n신\n잔\n액\n달\n성\n률\nI\n기\n업| \n여\n신\n잔\n액\n달\n성\n률\nI\n기\n업| \n여\n신\n잔\n액\n달\n성\n률\nI\n기\n업"
        + "| \n여\n신\n평\n잔\n달\n성\n률\nI\n개\n인| \n여\n신\n평\n잔\n달\n성\n률\nI\n개\n인| \n여\n신\n평\n잔\n달\n성\n률\nI\n개\n인"
        + "| \n여\n신\n평\n잔\n달\n성\n률\nI\n기\n업| \n여\n신\n평\n잔\n달\n성\n률\nI\n기\n업| \n여\n신\n평\n잔\n달\n성\n률\nI\n기\n업"
        + "| \n신\n규\n여\n신\n달\n성\n률\nI\n개\n인| \n신\n규\n여\n신\n달\n성\n률\nI\n개\n인| \n신\n규\n여\n신\n달\n성\n률\nI\n개\n인"
        + "| \n신\n규\n여\n신\n달\n성\n률\nI\n기\n업| \n신\n규\n여\n신\n달\n성\n률\nI\n기\n업| \n신\n규\n여\n신\n달\n성\n률\nI\n기\n업"
        + "| \n도\n매\n형\n수\n탁\n고| \n도\n매\n형\n수\n탁\n고| \n도\n매\n형\n수\n탁\n고"
        + "| \n소\n매\n형\n수\n탁\n고| \n소\n매\n형\n수\n탁\n고| \n소\n매\n형\n수\n탁\n고"
        + "| \n외\n환\n취\n급\n고| \n외\n환\n취\n급\n고| \n외\n환\n취\n급\n고"
        + "| \n보\n장\n성\n공\n제\n료| \n보\n장\n성\n공\n제\n료| \n보\n장\n성\n공\n제\n료"
        + "| \n저\n축\n성\n공\n제\n료| \n저\n축\n성\n공\n제\n료| \n저\n축\n성\n공\n제\n료"
        + "| \n카\n드\n유\n효\n회\n원\n수| \n카\n드\n유\n효\n회\n원\n수| \n카\n드\n유\n효\n회\n원\n수"
        + "| \n카\n드\n매\n출\n액\n증\n대\n실\n적| \n카\n드\n매\n출\n액\n증\n대\n실\n적| \n카\n드\n매\n출\n액\n증\n대\n실\n적"
        + "| \n신\n용\n카\n드\n신\n규\n회\n원\n수| \n신\n용\n카\n드\n신\n규\n회\n원\n수| \n신\n용\n카\n드\n신\n규\n회\n원\n수"
        + "| \n체\n크\n카\n드\n신\n규\n회\n원\n수| \n체\n크\n카\n드\n신\n규\n회\n원\n수| \n체\n크\n카\n드\n신\n규\n회\n원\n수"
        + "| \n공\n제\n료\nI\n누\n증| \n공\n제\n료\nI\n누\n증| \n공\n제\n료\nI\n누\n증";

	var strHeader1 = 
		"점번호|점명|PG명"
        + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
        +"|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)";

	for(col=3; col<63; col++ ){
		mySheet.SetCellAlign(0,col,"CenterTop");
	}
	
	i=0;

 	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
		{ Text:strHeader1, Align:"Center"} ];
		
	mySheet.InitHeaders(headers, info);

             var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
                   
	mySheet.InitColumns(cols);

	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(5,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(18,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(22,1);
	mySheet.SetColHidden(24,1);
	mySheet.SetColHidden(25,1);
	mySheet.SetColHidden(27,1);
	mySheet.SetColHidden(28,1);
	mySheet.SetColHidden(30,1);
	mySheet.SetColHidden(31,1);
	mySheet.SetColHidden(33,1);
	mySheet.SetColHidden(34,1);
	mySheet.SetColHidden(36,1);
	mySheet.SetColHidden(37,1);
	mySheet.SetColHidden(39,1);
	mySheet.SetColHidden(40,1);
	mySheet.SetColHidden(42,1);
	mySheet.SetColHidden(43,1);
	mySheet.SetColHidden(45,1);
	mySheet.SetColHidden(46,1);
	mySheet.SetColHidden(48,1);
	mySheet.SetColHidden(49,1);
	mySheet.SetColHidden(51,1);
	mySheet.SetColHidden(52,1);
	mySheet.SetColHidden(54,1);
	mySheet.SetColHidden(55,1);
	mySheet.SetColHidden(57,1);
	mySheet.SetColHidden(58,1);
	mySheet.SetColHidden(60,1);
	mySheet.SetColHidden(61,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명");
}

/*----------------------------------*/
/* @기능 : 2009년도 기준 그리드 set */
/*----------------------------------*/
function setGrid2009()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
	var strHeader0 = 
		"점번호|점명|PG명"
        + "| \n총\n예\n수\n금\n달\n성\n률\nI\n개\n인\n\n(순증평잔)| \n총\n예\n수\n금\n달\n성\n률\nI\n개\n인\n\n(순증평잔)| \n총\n예\n수\n금\n달\n성\n률\nI\n개\n인\n\n(순증평잔)"
        + "| \n총\n예\n수\n금\n달\n성\n률\nI\n개\n인\n\n(순증잔액)| \n총\n예\n수\n금\n달\n성\n률\nI\n개\n인\n\n(순증잔액)| \n총\n예\n수\n금\n달\n성\n률\nI\n개\n인\n\n(순증잔액)"
        + "| \n총\n예\n수\n금\n달\n성\n률\nI\n개\n인\n\n(반기평잔)| \n총\n예\n수\n금\n달\n성\n률\nI\n개\n인\n\n(반기평잔)| \n총\n예\n수\n금\n달\n성\n률\nI\n개\n인\n\n(반기평잔)"
        + "| \n총\n예\n수\n금\n달\n성\n률\nI\n기\n업\n\n(순증평잔)| \n총\n예\n수\n금\n달\n성\n률\nI\n기\n업\n\n(순증평잔)| \n총\n예\n수\n금\n달\n성\n률\nI\n기\n업\n\n(순증평잔)"
        + "| \n총\n예\n수\n금\n달\n성\n률\nI\n기\n업\n\n(순증잔액)| \n총\n예\n수\n금\n달\n성\n률\nI\n기\n업\n\n(순증잔액)| \n총\n예\n수\n금\n달\n성\n률\nI\n기\n업\n\n(순증잔액)"
        + "| \n총\n예\n수\n금\n달\n성\n률\nI\n기\n업\n\n(반기평잔)| \n총\n예\n수\n금\n달\n성\n률\nI\n기\n업\n\n(반기평잔)| \n총\n예\n수\n금\n달\n성\n률\nI\n기\n업\n\n(반기평잔)"
        + "| \n저\n원\n가\n성\n예\n수\n금\n달\n성\n률\nI\n개\n인| \n저\n원\n가\n성\n예\n수\n금\n달\n성\n률\nI\n개\n인| \n저\n원\n가\n성\n예\n수\n금\n달\n성\n률\nI\n개\n인"
        + "| \n저\n원\n가\n성\n예\n수\n금\n달\n성\n률\nI\n기\n업| \n저\n원\n가\n성\n예\n수\n금\n달\n성\n률\nI\n기\n업| \n저\n원\n가\n성\n예\n수\n금\n달\n성\n률\nI\n기\n업"
        + "| \n소\n액\n대\n출\n금| \n소\n액\n대\n출\n금| \n소\n액\n대\n출\n금"
        + "| \n개\n인\n여\n신\n전\n략\n상\n품| \n개\n인\n여\n신\n전\n략\n상\n품| \n개\n인\n여\n신\n전\n략\n상\n품"
        + "| \n외\n환\n취\n급\n고| \n외\n환\n취\n급\n고| \n외\n환\n취\n급\n고"
        + "| \n퇴\n직\n연\n금\n신\n탁| \n퇴\n직\n연\n금\n신\n탁| \n퇴\n직\n연\n금\n신\n탁"
        + "| \n카\n드\n매\n출\n액\n증\n대\n실\n적| \n카\n드\n매\n출\n액\n증\n대\n실\n적| \n카\n드\n매\n출\n액\n증\n대\n실\n적"
        + "| \n특\n정\n금\n전\n신\n탁| \n특\n정\n금\n전\n신\n탁| \n특\n정\n금\n전\n신\n탁";

	var strHeader1 = 
		"점번호|점명|PG명"
        + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
        +"|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)";

	for(col=3; col<45; col++ ){
		mySheet.SetCellAlign(0,col,"CenterTop");
	}
	
	i=0;

	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
		{ Text:strHeader1, Align:"Center"} ];
	mySheet.InitHeaders(headers, info);
	
	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
	 {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	 {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	 {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
	       
	mySheet.InitColumns(cols);
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(18,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(22,1);
	mySheet.SetColHidden(24,1);
	mySheet.SetColHidden(25,1);
	mySheet.SetColHidden(27,1);
	mySheet.SetColHidden(28,1);
	mySheet.SetColHidden(30,1);
	mySheet.SetColHidden(31,1);
	mySheet.SetColHidden(33,1);
	mySheet.SetColHidden(34,1);
	mySheet.SetColHidden(36,1);
	mySheet.SetColHidden(37,1);
	mySheet.SetColHidden(39,1);
	mySheet.SetColHidden(40,1);
	mySheet.SetColHidden(42,1);
	mySheet.SetColHidden(43,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명");
}

/*----------------------------------*/
/* @기능 : 2010년도 기준 그리드 set */
/*----------------------------------*/
function setGrid2010()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
  // 상위 GRID에 대한 속성정보 설정
	var strHeader0 = 
	   "점번호|점명|PG명"
	   + "| \n총\n예\n수\n금\n달\n성\n률\nI\n개\n인\n\n(순증평잔)\n| \n총\n예\n수\n금\n달\n성\n률\nI\n개\n인\n\n(순증평잔)\n| \n총\n예\n수\n금\n달\n성\n률\nI\n개\n인\n\n(순증평잔)\n"
	   + "| \n총\n예\n수\n금\n달\n성\n률\nI\n개\n인\n\n(순증잔액)\n| \n총\n예\n수\n금\n달\n성\n률\nI\n개\n인\n\n(순증잔액)\n| \n총\n예\n수\n금\n달\n성\n률\nI\n개\n인\n\n(순증잔액)\n"
	   + "| \n총\n예\n수\n금\n달\n성\n률\nI\n개\n인\n\n(반기평잔)\n| \n총\n예\n수\n금\n달\n성\n률\nI\n개\n인\n\n(반기평잔)\n| \n총\n예\n수\n금\n달\n성\n률\nI\n개\n인\n\n(반기평잔)\n"
	   + "| \n총\n예\n수\n금\n달\n성\n률\nI\n기\n업\n\n(순증평잔)\n| \n총\n예\n수\n금\n달\n성\n률\nI\n기\n업\n\n(순증평잔)\n| \n총\n예\n수\n금\n달\n성\n률\nI\n기\n업\n\n(순증평잔)\n"
	   + "| \n총\n예\n수\n금\n달\n성\n률\nI\n기\n업\n\n(순증잔액)\n| \n총\n예\n수\n금\n달\n성\n률\nI\n기\n업\n\n(순증잔액)\n| \n총\n예\n수\n금\n달\n성\n률\nI\n기\n업\n\n(순증잔액)\n"
	   + "| \n총\n예\n수\n금\n달\n성\n률\nI\n기\n업\n\n(반기평잔)\n| \n총\n예\n수\n금\n달\n성\n률\nI\n기\n업\n\n(반기평잔)\n| \n총\n예\n수\n금\n달\n성\n률\nI\n기\n업\n\n(반기평잔)\n"
	   + "| \n적\n립\n식\n예\n금| \n적\n립\n식\n예\n금| \n적\n립\n식\n예\n금"
	   + "| \n저\n원\n가\n성\n예\n수\n금\n달\n성\n률\n\n(누증평잔)| \n저\n원\n가\n성\n예\n수\n금\n달\n성\n률\n\n(누증평잔)| \n저\n원\n가\n성\n예\n수\n금\n달\n성\n률\n\n(누증평잔)"
	   + "| \n저\n원\n가\n성\n예\n수\n금\n달\n성\n률\n\n(순증평잔)| \n저\n원\n가\n성\n예\n수\n금\n달\n성\n률\n\n(순증평잔)| \n저\n원\n가\n성\n예\n수\n금\n달\n성\n률\n\n(순증평잔)"
	   + "| \n소\n액\n대\n출\n금| \n소\n액\n대\n출\n금| \n소\n액\n대\n출\n금"
	   + "| \n총\n여\n신\n운\n용\n\n(순증평잔)| \n총\n여\n신\n운\n용\n\n(순증평잔)| \n총\n여\n신\n운\n용\n\n(순증평잔)"
	   + "| \n총\n여\n신\n운\n용\n\n(순증잔액)| \n총\n여\n신\n운\n용\n\n(순증잔액)| \n총\n여\n신\n운\n용\n\n(순증잔액)"
	   + "| \n총\n여\n신\n운\n용\n\n(반기평잔)| \n총\n여\n신\n운\n용\n\n(반기평잔)| \n총\n여\n신\n운\n용\n\n(반기평잔)"
	   + "| \n외\n환\n취\n급\n고| \n외\n환\n취\n급\n고| \n외\n환\n취\n급\n고"
	   + "| \n퇴\n직\n연\n금\n신\n탁| \n퇴\n직\n연\n금\n신\n탁| \n퇴\n직\n연\n금\n신\n탁"
	   + "| \n카\n드\n매\n출\n액\n\n(신용카드)| \n카\n드\n매\n출\n액\n\n(신용카드)| \n카\n드\n매\n출\n액\n\n(신용카드)"
	   + "| \n카\n드\n매\n출\n액\n\n(구매카드)| \n카\n드\n매\n출\n액\n\n(구매카드)| \n카\n드\n매\n출\n액\n\n(구매카드)";

	var strHeader1 = 
	   "점번호|점명|PG명"
	   + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
	   + "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)";

   	for(col=3; col<54; col++ ){
   		mySheet.SetCellAlign(0,col,"CenterTop");
   	}

   	i=0;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

   	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
		{ Text:strHeader1, Align:"Center"} ];
	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
    
	mySheet.InitColumns(cols);
	
	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(9,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(12,1);
	mySheet.SetColHidden(13,1);
	mySheet.SetColHidden(15,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(18,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(22,1);
	mySheet.SetColHidden(24,1);
	mySheet.SetColHidden(25,1);
	mySheet.SetColHidden(27,1);
	mySheet.SetColHidden(28,1);
	mySheet.SetColHidden(30,1);
	mySheet.SetColHidden(31,1);
	mySheet.SetColHidden(33,1);
	mySheet.SetColHidden(34,1);
	mySheet.SetColHidden(36,1);
	mySheet.SetColHidden(37,1);
	mySheet.SetColHidden(39,1);
	mySheet.SetColHidden(40,1);
	mySheet.SetColHidden(42,1);
	mySheet.SetColHidden(43,1);
	mySheet.SetColHidden(45,1);
	mySheet.SetColHidden(46,1);
	mySheet.SetColHidden(48,1);
	mySheet.SetColHidden(49,1);
	mySheet.SetColHidden(51,1);
	mySheet.SetColHidden(52,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명");
}

/*----------------------------------*/
/* @기능 : 2011년도 기준 그리드 set */
/*----------------------------------*/
function setGrid2011()
{
	if(typeof(mySheet) !== "undefined") {
		
		mySheet.Reset();
	}
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	
	var strHeader0 = 
		"점번호|점명|PG명"
		+ "| \n개\n인\n예\n수\n금\n\n(순증평잔)\n| \n개\n인\n예\n수\n금\n\n(순증평잔)\n| \n개\n인\n예\n수\n금\n\n(순증평잔)\n"
		+ "| \n개\n인\n예\n수\n금\n\n(순증잔액)\n| \n개\n인\n예\n수\n금\n\n(순증잔액)\n| \n개\n인\n예\n수\n금\n\n(순증잔액)\n"
		+ "| \n기\n업\n예\n수\n금\n\n(순증평잔)\n| \n기\n업\n예\n수\n금\n\n(순증평잔)\n| \n기\n업\n예\n수\n금\n\n(순증평잔)\n"
		+ "| \n기\n업\n예\n수\n금\n\n(순증잔액)\n| \n기\n업\n예\n수\n금\n\n(순증잔액)\n| \n기\n업\n예\n수\n금\n\n(순증잔액)\n"
		+ "| \n저\n원\n가\n성\n예\n수\n금\n\n(순증평잔)\n| \n저\n원\n가\n성\n예\n수\n금\n\n(순증평잔)\n| \n저\n원\n가\n성\n예\n수\n금\n\n(순증평잔)\n"
		+ "| \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n| \n대\n출\n금\n\n(순증잔액)\n"
		+ "| \n대\n출\n금\n\n(분기잔액)\n| \n대\n출\n금\n\n(분기잔액)\n| \n대\n출\n금\n\n(분기잔액)\n"
		+ "| \n개\n인\n대\n출\n금\n\n(순증잔액)\n| \n개\n인\n대\n출\n금\n\n(순증잔액)\n| \n개\n인\n대\n출\n금\n\n(순증잔액)\n"
		+ "| \n개\n인\n대\n출\n금\n\n(분기잔액)\n| \n개\n인\n대\n출\n금\n\n(분기잔액)\n| \n개\n인\n대\n출\n금\n\n(분기잔액)\n"
		+ "| \n기\n업\n대\n출\n금\n\n(순증잔액)\n| \n기\n업\n대\n출\n금\n\n(순증잔액)\n| \n기\n업\n대\n출\n금\n\n(순증잔액)\n"
		+ "| \n기\n업\n대\n출\n금\n\n(분기잔액)\n| \n기\n업\n대\n출\n금\n\n(분기잔액)\n| \n기\n업\n대\n출\n금\n\n(분기잔액)\n"
		+ "| \n외\n환\n취\n급\n액| \n외\n환\n취\n급\n액| \n외\n환\n취\n급\n액"
		+ "| \n퇴\n직\n연\n금| \n퇴\n직\n연\n금| \n퇴\n직\n연\n금"
		+ "| \n신\n용\n카\n드\n매\n출\n액| \n신\n용\n카\n드\n매\n출\n액| \n신\n용\n카\n드\n매\n출\n액"
		+ "| \n구\n매\n카\n드\n\n(평잔)| \n구\n매\n카\n드\n\n(평잔)| \n구\n매\n카\n드\n\n(평잔)";
		
	var strHeader1 = 
		"점번호|점명|PG명"
		+ "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)"
		+ "|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)|목표|실적|평점(☞)";
		
	for(col=3; col<48; col++ ){
		mySheet.SetCellAlign(0,col,"CenterTop");
	}
	
	i=0;
	
	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );
	
	var info    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
	var headers = [ { Text:strHeader0, Align:"Center"},
		{ Text:strHeader1, Align:"Center"} ];
		
	mySheet.InitHeaders(headers, info);

    var cols = [ {Type:"Text",     Hidden:0,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:160,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:120,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:0,   DecimalAdjust:1, UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"AutoSum",   Hidden:0, MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 } ];
                
    mySheet.InitColumns(cols);

	mySheet.SetEditable(0);
	mySheet.SetVisible(1);
	mySheet.SetAutoSumPosition(0);
	mySheet.SetColHidden(3,1);
	mySheet.SetColHidden(4,1);
	mySheet.SetColHidden(6,1);
	mySheet.SetColHidden(7,1);
	mySheet.SetColHidden(10,1);
	mySheet.SetColHidden(11,1);
	mySheet.SetColHidden(14,1);
	mySheet.SetColHidden(16,1);
	mySheet.SetColHidden(18,1);
	mySheet.SetColHidden(19,1);
	mySheet.SetColHidden(21,1);
	mySheet.SetColHidden(22,1);
	mySheet.SetColHidden(24,1);
	mySheet.SetColHidden(25,1);
	mySheet.SetColHidden(27,1);
	mySheet.SetColHidden(28,1);
	mySheet.SetColHidden(30,1);
	mySheet.SetColHidden(31,1);
	mySheet.SetColHidden(34,1);
	mySheet.SetColHidden(35,1);
	mySheet.SetColHidden(38,1);
	mySheet.SetColHidden(39,1);
	mySheet.SetColHidden(42,1);
	mySheet.SetColHidden(43,1);
	mySheet.SetColHidden(46,1);
	mySheet.SetColHidden(47,1);
	mySheet.SetColHidden(49,1);
	mySheet.SetColHidden(50,1);
	mySheet.SetColHidden(52,1);
	mySheet.SetColHidden(53,1);
	mySheet.SetDataLinkMouse(true);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetRowHeight(1,22);
	mySheet.SetCountPosition(1);
	showUnitText("원, 점수, 명");
}
