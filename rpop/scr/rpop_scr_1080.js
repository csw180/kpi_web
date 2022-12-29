var isInitBtnEnable = true;
var isInstBtnEnable = true;
var isMofyBtnEnable = false;
var isDelBrnEnable  = false;
var isExcelBtnEnable= true;

var jumgubun=1;   //기준점과 비교점 구분위한 변수선언
var pgchk = "0";  //기준점과 같은 PG의 점목록만 조회위한 변수선언
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
            obj.options[i].selected=true;
            break;
        }
    }
}

/*Sheet 기본 설정 */
function LoadPage(){

	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj")));
  	createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");

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
  
  	// 상위 GRID에 대한 속성정보 설정
   	i=0;

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:2 } );

   	var msInfo    = { Sort:0, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var msHeaders = [ { Text:"구분|성과지표|기준영업점(A)|기준영업점(A)|기준영업점(A)|기준영업점(A)|비교영업점(B)|비교영업점(B)|비교영업점(B)|비교영업점(B)|차이(A-B)|차이(A-B)|차이(A-B)|차이(A-B)", Align:"Center"},
                 { Text:"구분|성과지표|실적|달성도|평점/배점|순위|실적|달성도|평점/배점|순위|실적|달성도|평점|순위|", Align:"Center"} ];
   	mySheet.InitHeaders(msHeaders, msInfo);

   	var msCols = [ {Type:"Text",     Hidden:0,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:150,  Align:"Left",    ColMerge:1,   SaveName:"NONE" },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:0,  UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Float",       PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
             {Type:"Int",       Hidden:0,  MinWidth:100,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Text",      Hidden:1, MinWidth:130,  Align:"Right",   ColMerge:1,   SaveName:"",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0,   EditLen:false },
             {Type:"Text",      Hidden:1, MinWidth:30,   Align:"Left",    ColMerge:1,   SaveName:"NONE" } ];
    
   	mySheet.InitColumns(msCols);
	mySheet.SetCountPosition(1);
   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetAutoSumPosition(0);
   	mySheet.SetDataLinkMouse(false);//Grid Link 시 '손'표시안함
   	//지원안함[check again] UnitText="원, %, 명, 개";
   	newSetActionMenu(mySheet,"엑셀내려받기");
	showUnitText("원, %, 명, 개");
	doAction("기준년월");
}

/* Sheet 각종 처리 */
function doAction(sAction)
{
//    mySheet     = document.frm.mySheet;
//    hiddenGrid  = document.frm.hiddenGrid;
    isSelected=true;
    basemonth=document.frm.basemonth.value;
    v_jumcode=document.frm.jumcode.value;
	v_jumname=document.frm.jumname.value;
    v_jumcode2=document.frm.cfjumcode.value;
    pgcode=document.frm.pgcode.value;
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
        case "기준년월":
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3" );
            break;
        case "조회":
            if(v_jumcode=="" || v_jumname==""){
                alert("기준점번호를 입력하지 않았습니다.");
                document.frm.jumcode.focus();
                return;
            }else if(v_jumcode2==""){
              alert("비교점번호를 입력하지 않았습니다.");
                      document.frm.cfjumcode.focus();
              return;        
            }else if(v_jumcode2==v_jumcode){
              alert("기준점과 비교점번호가 동일합니다.");
                      document.frm.cfjumcode.focus();
              return;        
            }else if(document.frm.pgcode.value != document.frm.cfpgcode.value){
                alert('동일 Peer Group의 기준점과 비교점으로만 조회가능합니다.');
                      document.frm.jumcode.focus();
              return;                        
            }
            if(basemonth < '201001')
              {
                if (pgcode == '16'){
                     alert("기업금융센터 2010년부터 조회가능합니다.");
			        	document.frm.basemonth.focus();
                return;
              }  
            }        
            mySheet.DoSearch("rpop.scr.rpop_scr_1080.do?hidden_key=9&basemonth="+basemonth+"&v_jumcode="+v_jumcode+"&v_jumcode2="+v_jumcode2+"&pgcode="+pgcode);
            if(mySheet.RowCount()> 0){
              mySheet.FitSize(false, true);
            }
            break;            
        case "엑셀내려받기":    // 엑셀내려받기		        
            inqText=new Array();
            inqText[0]=new Array();
            inqText[0][0]="작업기준년월";
            inqText[0][1]=basemonth;
            inqText[1]=new Array();
            inqText[1][0]="기준점명";
            inqText[1][1]=document.frm.jumname.value;
            inqText[2]=new Array();
            inqText[2][0]="비교점명";
            inqText[2][1]=document.frm.cfjumname.value;
            inqText[3]=new Array();
            inqText[3][0]="PG명";
            inqText[3][1]=document.frm.pgname.value;            
            // 보안등급세팅
            seqLevel=document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[4]=new Array();
                inqText[4][0]="보안등급";
                inqText[4][1]=document.frm.Security_Level.value;
            }    
            rExcVal=doExcel(mySheet, inqText, true); //common.js 활용하여 excel 출력
            // 엑셀다운로드시 로그 저장
            /*if(rExcVal) {
               condition="기준년월="+basemonth+";기준점번호="+v_jumcode+";비교점번호="+v_jumcode2;
               hiddenGrid.DoSearch("comm.scr.comm_scr_9097.screen?&htm_title="+htm_title+"&condition="+condition+"&gubun=2");
				//gubun1:rpdy(일일성과)2:rpop(영업점성과)
            }*/
            break;      
    }

}

/*-----------------------------------------*/
/* @기능 : 해당 InputBox ReadOnly로 처리   */
/*-----------------------------------------*/


/*-----------------------------------------*/
/* @기능 : 해당 InputBox ReadOnly 해제     */
/*-----------------------------------------*/        


/*-----------------------------------------*/
/* @기능 : 점이름 조회(1:기준점 2:비교점)  */
/*-----------------------------------------*/
function selectjumname(gubun)
{
	allDelDataGrid(mySheet);
    //hiddenGrid  = document.frm.hiddenGrid;
    basemonth   = document.frm.basemonth.value;
    v_jumcode   = gubun==1 ? document.frm.jumcode.value:document.frm.cfjumcode.value;   
    jumgubun    = gubun;

    if(v_jumcode != ''){
      hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=1&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
    }
    else{ 
      gubun==1 ? document.frm.jumname.value = '' : document.frm.cfjumname.value = '';
    }    
}
/*---------------------------------------------------*/
/* @기능 : 점코드 팝업조회                           */
/* searchGubun(0:전체 1:본부 2:영업점 3:비교영업점)  */
/*---------------------------------------------------*/
function popupJumCode(chk)
{
	allDelDataGrid(mySheet);
	if(chk == '2') {
		jumgubun = 1;
	    basemonth = document.frm.basemonth.value;
        win_open2("comm.scr.comm_scr_1010.screen?basemonth="+basemonth+"&searchGubun="+chk, 250, 450);
	} else if(chk == '3') {
		jumgubun = 2;
	    pgchk = document.frm.jumcode.value;		 //같은 PG의 영업점팝업조회 위한 기준점번호
    	win_open2("comm.scr.comm_scr_1170.screen?basemonth="+basemonth+"&searchGubun="+chk+"&pgGubun="+pgchk, 250, 450);
	}	
}
/*-----------------------------------------*/
/* @기능 : 점그룹명조회(1:기준점 2:비교점) */
/*-----------------------------------------*/
function selectjum()
{    
	allDelDataGrid(mySheet);
	showUnitText("원, %, 명, 개");
    //hiddenGrid  = document.frm.hiddenGrid;
    basemonth   = document.frm.basemonth.value;
    v_jumcode   = jumgubun==1 ? document.frm.jumcode.value:document.frm.cfjumcode.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=6&basemonth="+basemonth+"&v_jumcode="+v_jumcode);   
}
/*-----------------------------------------*/
/* @기능 :                                 */
/*-----------------------------------------*/
function ComboValue(el)
{
    //hiddenGrid  = document.frm.hiddenGrid;
    for ( ;el.options.length>1;) el.options.remove(1);
    for(i=1;i<=hiddenGrid.GetTotalRows();i++){
       var oOption=document.createElement("OPTION");
	   oOption.text=hiddenGrid.GetCellValue(i, 1);
	   oOption.value=hiddenGrid.GetCellValue(i, 0);
       el.options.add(oOption);
    }

}
/*-----------------------------------------*/
/* @기능 :                                 */
/*-----------------------------------------*/
function ComboValue1(el)
{
    //hiddenGrid  = document.frm.hiddenGrid;
    for ( ;el.options.length;) el.options.remove(0);
    var oOption=document.createElement("OPTION");
    oOption.text="전체";
    oOption.value="99999";
    el.options.add(oOption);
    for(i=1;i<=hiddenGrid.GetTotalRows();i++){
       var oOption=document.createElement("OPTION");
	   oOption.text=hiddenGrid.GetCellValue(i, 1);
	   oOption.value=hiddenGrid.GetCellValue(i, 0);
       el.options.add(oOption);
    }

}
/*-----------------------------------------*/
/* @기능 :                                 */
/*-----------------------------------------*/
function call1020(){
  f = document.frm;
  basemonth = f.basemonth.value;
  period    = 3;
  jumcode   = f.jumcode.value;
  jumname   = f.jumname.value;
  pgcode    = f.pgcode.value;

  url = "kpi.rpop.rpop_1020.screen?basemonth="+basemonth+"&jumcode="+jumcode+"&jumname="+jumname+"&IS_POPUP=Y&SCREEN_URL=kpi.rpop.rpop_1020.screen";
  win_open2(url,820,580);    
}
