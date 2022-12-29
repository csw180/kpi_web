var isEnableSave        = false;    // 저장여부 boolean값.
                                    // (초기 화면시 "조회" 버튼을 클릭하지 않고, 바로 Row Insert하는 기능을 막기 위함)
var underbarKeysValue   = "";       // Grid상에서 status가 Insert(I), Update(U)된 최종 '_' 구분로 조합된 Key값

/*-------------------------------------------------------*/
/* @기  능 : Grid들의 default attributes을 정의하는 함수 */
/*           (Page Loading시 호출됨)                     */
/* @리턴값 : 없음                                        */
/*-------------------------------------------------------*/
//main_scr_3050.js
function LoadPage()
{
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
	
    doAction("기준년월");
	mySheet.SetCountPosition(1);
	showUnitText("원, 명");
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
    v_jumcode  = document.frm.jumcode.value;
    role_chk   = document.frm.role_chk.value;
                 
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
             initGrid() ;
             mySheet.DoSearch("main.scr.main_scr_3051.do?hidden_key=9&basemonth="+basemonth+"&v_jumcode="+v_jumcode+"&role_chk="+role_chk); 
             break;
            
        case "엑셀내려받기":            // 엑셀내려받기
             inqText       = new Array();
             inqText[0]    = new Array();
             inqText[0][0] = "기준일자";
             inqText[0][1] = document.frm.basemonth.options[document.frm.basemonth.selectedIndex].text;
             inqText[1]    = new Array();
             inqText[1][0] = "점명";
             inqText[1][1] = document.frm.jumname.value;
             // 보안등급세팅
             seqLevel = document.frm.Security_Level.value;
             if(seqLevel !=null && seqLevel!='') {
                inqText[2]    = new Array();
                inqText[2][0] = "보안등급";
                inqText[2][1] = document.frm.Security_Level.value;
             }
            
             doExcel(mySheet, inqText, true); //common.js 활용하여 excel 출력
             break;            
    }
}

/*-----------------------------------------*/
/* @기능 : 점번호 숫자와 RM번호만 입력가능하도록   */
/*-----------------------------------------*/

function chk_jum() {
	
    basemonth   = document.frm.basemonth.value;

  // 2012년부터 RM점번호 생성됨.
  if (basemonth < '201201')chk_num();
  else {
         var el = window.event.srcElement;
         var vl = el.value;
         var ln = vl.length;
          
          var chst = vl.charAt(0);
          
          if (chst =='0' || chst == 'R' || chst =='1' )  {
               for(var i=1; i < ln; i++) {
                 var ch = vl.charAt(i);
                if(ch < "0" || ch > "9") {
                  alert("숫자만 입력가능합니다.");
                el.value = "";
                el.focus();
                return false;
               }
               }
              }
          else 
                alert("점번호는 0~, 1~, R~ 만 가능합니다. 점번호 확인하세요" );
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
function selectjumname()
{
    basemonth   = document.frm.basemonth.value;
    v_jumcode   = document.frm.jumcode.value;
    if(v_jumcode != '') hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=1&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
	  else document.frm.jumname.value = '';
}
function popupJumCode()
{
    basemonth = document.frm.basemonth.value;
    win_open2("comm.scr.comm_scr_1010.screen?basemonth="+basemonth+"&searchGubun=5", 250, 450);
}

/*--------------------------------------------*/
/* @기능 : 선택된 기준년월에 따른 그리드 init */
/*--------------------------------------------*/        
function initGrid()
{
    basemonth   = document.frm.basemonth.value;

    if (basemonth >= '202101') setGrid2021H2();

}

/*---------------------------------------------
@ `21.06 부터 처리
----------------------------------------------*/            
function setGrid2021H2()
{
	role_chk = document.frm.role_chk.value;
    
	//mySheet.RemoveAll();
    mySheet.Reset();
	
    // 상위 GRID에 대한 속성정보 설정
   	let strHeader="작업기준년월|KPI코드|KPI명|점번호|점명|사업부소속코드|< 기준실적 >\n 상품분류코드" +	
   		"|1분기|2분기|3분기|연간목표" +
   		"|반기1st월목표|반기2nd월목표|반기3rd월목표|반기4th월목표" +
   		"|반기5th월목표|반기6th월목표|일련번호|처리사유";

   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [{Text: strHeader, Align: "Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"작업기준년월",      CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"KPI코드",       CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:180,  Align:"Left",    SaveName:"KPI명",        CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"점번호",         CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"점명",          CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"사업부소속코드",     CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];

	if (role_chk == "1")
   		cols.push({Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"기준실적상품분류코드",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 });
   	else
   		cols.push({Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"기준실적상품분류코드",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 });

	   cols.push({Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   SaveName:"",            CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
	   cols.push({Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   SaveName:"",            CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
	   cols.push({Type:"Text",      Hidden:1, MinWidth:100,  Align:"Right",   SaveName:"",            CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
	   cols.push({Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",            CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
	   cols.push({Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",            CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
	   cols.push({Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",            CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
	   cols.push({Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",            CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
	   cols.push({Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",            CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
	   cols.push({Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",            CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
	   cols.push({Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",            CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
	   cols.push({Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",            CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });
	   cols.push({Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"",            CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 });

   	mySheet.SetVisible(1);
   	
   	newSetActionMenu(mySheet,"엑셀내려받기");
 
   	mySheet.InitColumns(cols);

   	mySheet.SetEditable(1);
   	mySheet.SetVisible(1);
	mySheet.SetCountPosition(1);
	showUnitText("원, 명");	
}