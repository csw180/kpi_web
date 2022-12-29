var isInitBtnEnable = true;
var isInstBtnEnable = true;
var isMofyBtnEnable = false;
var isDelBrnEnable  = false;
var isExcelBtnEnable= true;

//CUD 상태 변수
var isCud = false;	
var isMode = "";

/*Sheet 기본 설정 */
//main_scr_1330.js
function LoadPage(){
	
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", getDefaultHeight($("#sheetObj"),100));
	createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");
	createIBSheet2(  document.getElementById("hiddenGridObj1"),"hiddenGrid1", "200px", "400px");	//실명번호를 이용해 고객명 가져오기
  
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

    // Hidden GRID에 대한 속성정보 설정
   	hiddenGrid1.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"HIDDEN", Align:"Center"} ];
   	hiddenGrid1.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",      Hidden:1, MinWidth:0,    Align:"Center",  SaveName:"0",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
   	hiddenGrid1.InitColumns(cols);
   	hiddenGrid1.SetEditable(0);
	hiddenGrid1.SetVisible(0);
    // Hidden GRID에 대한 속성정보 설정
  
  	// 상위 GRID에 대한 속성정보 설정
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:4 } );

   	var info    = { Sort:1, ColMove:0, HeaderCheck:0, ColResize:1 };
   	var headers = [ { Text:"고객번호|고객명|계좌관리점|계좌관리점명|성과관리점|성과관리점명|성과관리점 인정비율(%)|타지점대상구분코드|타지점대상구분|등록일", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"고객번호",       KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"고객명",        CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"계좌관리점",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"계좌관리점명",     CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"성과관리점",      KeyField:1,   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"성과관리점명",     CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Float",     Hidden:0,  MinWidth:100,  Align:"Right",   SaveName:"성과관리점인정비율",  CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"타지점대상구분코드",  CalcLogic:"",   Format:"Integer",     PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"타지점대상구분",    CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"등록일",        CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
   	mySheet.InitColumns(cols);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetCountPosition(1);

  	doAction("기준년월");
  	doAction("조회");
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

/* Sheet 각종 처리 */
function doAction(sAction)
{
    isSelected  = true;
	isMode = "";
	
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
            hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=4"); 
            break;
        case "조회":             // 조회(상위 GRID)
            mySheet.DoSearch("main.scr.main_scr_1331.do?hidden_key=9"); 
            break;
            
        case "엑셀내려받기":    // 엑셀내려받기
            inqText       = new Array();          
            // 보안등급세팅
            seqLevel = document.frm.Security_Level.value;
            if(seqLevel !=null && seqLevel!='') {
                inqText[0]    = new Array();
                inqText[0][0] = "보안등급";
                inqText[0][1] = document.frm.Security_Level.value;
            }
             
            doExcel(mySheet, inqText, true); //common.js 활용하여 excel 출력
            break;      
            
        case "초기화":          // 초기화
            basemonth = document.frm.basemonth.value;
            document.frm.reset();
            isInstBtnEnable = true;
            isMofyBtnEnable = false;
            isDelBrnEnable  = false;
            document.frm.jumcode.disabled    = false;
            document.all.image2.style.cursor = "pointer" ;
            document.all.image3.style.cursor = "" ;
            document.all.image4.style.cursor = "" ;
            document.frm.basemonth.value=basemonth;
            break;   
                       
        case "등록":            // 등록
                
			isCud = true;
			isMode = "C";
			
            if(!isInstBtnEnable) return;
                        
            if(document.frm.customerno.value=="" || document.frm.customerno.value==null )
            {
                alert('고객번호가 입력되지 않았습니다. 확인하여 주십시요.');
                document.frm.customerno.focus();
                return;
            }
                                                         
            if(document.frm.adjgubuncode.value=="" || document.frm.adjgubuncode.value==null )
            {
                alert('타지점대상구분이 입력되지 않았습니다. 확인하여 주십시요.');
                document.frm.adjgubuncode.focus();
                return;
            }
            if(document.frm.jumcode.value=="" || document.frm.jumcode.value==null || document.frm.jumname.value=="" || document.frm.jumname.value==null )
            {
                alert('계좌관리점번호가 입력되지 않았습니다. 확인하여 주십시요.');
                document.frm.jumcode.focus();
                return;
            }
            if(document.frm.manjumcode.value=="" || document.frm.manjumcode.value==null || document.frm.manjumname.value=="" || document.frm.manjumname.value==null )
            {
                alert('성과관리점번호가 입력되지 않았습니다. 확인하여 주십시요.');
                document.frm.manjumcode.focus();
                return;
            }
            if(document.frm.period.value=="" || document.frm.period.value==null )
            {
                alert('성과관리점인정비율이 입력되지 않았습니다. 확인하여 주십시요.');
                document.frm.period.focus();
                return;
            }
            else if(document.frm.period.value > 100){
                alert('성과관리점인정비율은 100을 초과할 수 없습니다. 확인하여 주십시요.');
                document.frm.period.focus();
                return;
            }
            if(document.frm.manjumcode.value==document.frm.jumcode.value ){
                alert('계좌관리점번호와 성과관리점번호가 같습니다. 확인하여 주십시요.');
                return;
            }
            
            hiddenGrid.DoSearch( "main.scr.main_scr_1331.do?hidden_key=1"
                                    + "&customerno="   + document.frm.customerno.value 
                                    + "&jumcode="      + document.frm.jumcode.value 
                                    + "&manjumcode="   + document.frm.manjumcode.value     
                                    + "&period="       + document.frm.period.value
                                    + "&adjgubuncode=" + document.frm.adjgubuncode.value
                                    );
            break;
            
        case "변경":            // 변경
            isCud = true;
			isMode = "U";
			
            if(!isMofyBtnEnable) return;

            if(document.frm.customerno.value=="" || document.frm.customerno.value==null )
            {
                alert('고객번호가 입력되지 않았습니다. 확인하여 주십시요.');
                document.frm.customerno.focus();
                return;
            }
                                                         
            if(document.frm.adjgubuncode.value=="" || document.frm.adjgubuncode.value==null )
            {
                alert('타지점대상구분이 입력되지 않았습니다. 확인하여 주십시요.');
                document.frm.adjgubuncode.focus();
                return;
            }
            if(document.frm.jumcode.value=="" || document.frm.jumcode.value==null )
            {
                alert('계좌관리점번호가 입력되지 않았습니다. 확인하여 주십시요.');
                document.frm.jumcode.focus();
                return;
            }            
            if(document.frm.manjumcode.value=="" || document.frm.manjumcode.value==null )
            {
                alert('성과관리점번호가 입력되지 않았습니다. 확인하여 주십시요.');
                document.frm.manjumcode.focus();
                return;
            }
            if(document.frm.period.value=="" || document.frm.period.value==null )
            {
                alert('관리점비율이 입력되지 않았습니다. 확인하여 주십시요.');
                document.frm.period.focus();
                return;
            }
            else if(document.frm.period.value > 100){
                alert('성과관리점인정비율은 100을 초과할 수 없습니다. 확인하여 주십시요.');
                document.frm.period.focus();
                return;
            }
            if(document.frm.manjumcode.value==document.frm.jumcode.value ){
                alert('계좌관리점번호와 성과관리점번호가 같습니다. 확인하여 주십시요.');
                return;
            }
                        
            hiddenGrid.DoSearch( "main.scr.main_scr_1331.do?hidden_key=2"
                                    + "&customerno="   + document.frm.customerno.value 
                                    + "&jumcode="      + document.frm.jumcode.value 
                                    + "&manjumcode="   + document.frm.manjumcode.value     
                                    + "&period="       + document.frm.period.value
                                    + "&adjgubuncode=" + document.frm.adjgubuncode.value
                                    );
                     
            break;
            
        case "삭제":  
            isCud = true;
			isMode = "D";
			
            if(!isDelBrnEnable) return;

            if(!confirm("정말 삭제 하시겠읍니까")) return;
            hiddenGrid.DoSearch( "main.scr.main_scr_1331.do?hidden_key=3"
                                    + "&customerno="   + document.frm.customerno.value 
                                    + "&jumcode="      + document.frm.jumcode.value 
                                    + "&manjumcode="   + document.frm.manjumcode.value     
                                    + "&period="       + document.frm.period.value
                                    + "&adjgubuncode=" + document.frm.adjgubuncode.value
                                    );
            break;
    }
}

var jumgubun="";

function selectjumname(gubun)
{
	isMode = "";
    basemonth   = document.frm.basemonth.value;
    v_jumcode   = gubun==1 ? document.frm.jumcode.value:document.frm.manjumcode.value;
    jumgubun    = gubun;
    if(v_jumcode != '') {
      hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=1&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
    }
	  else{ 
      gubun==1 ? document.frm.jumname.value = '' : document.frm.manjumname.value = '';
    }
}
function popupJumCode(chk)
{
    basemonth = document.frm.basemonth.value;
    win_open2("comm.scr.comm_scr_1010.screen?basemonth="+basemonth+"&searchGubun="+chk, 250, 450);
}

function chk_manPeriod()
{
   	document.frm.period.readOnly = false;
    document.frm.period.value="";
}

function dotchk()
{
  v_period     =    document.frm.period.value;
  myNumb=new Number(v_period);
  document.frm.period.value  = myNumb.toFixed(2);
  return;
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
/*---------------------------------------------
 @기능 - 고객번호 팝업화면을 호출
----------------------------------------------*/

function popupCustomerCode()
{
    win_open2("comm.scr.comm_scr_9010.screen", 350, 450);
}

/*---------------------------------------------
 @기능 - 고객번호 입력시 고객명 자동 입력
----------------------------------------------*/
function selectCostomerno()
{
    customerno  = document.frm.customerno.value;
    
    if(customerno == null || customerno == "") return;
    hiddenGrid1.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=14&customerno="+customerno);
}

/*---------------------------------------------
 @기능 - 타지점대상구분 발췌
----------------------------------------------*/
function selectAdjgubun()
{
    basemonth = document.frm.basemonth.value;
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=55");  //기준실적상품분류코드    
}

function percOnly(obj,frm){
	//입력필드(사용자가 키보드를 처서 입력하는)의 입력값이 숫자와 '.'만 들어가도록 할 때 사용된다.
	//사용예 : <input type="text" name="text" onKeyUp="javascript:percOnly(this,document.frm,true);">
	//여기서 this는 오브젝트를 뜻하므로 그냥 사용하면 되고, document 다음의 frm 대신에 
	//자신이 사용한 form 이름을 적어준다.
	var dot = 0;
	
	if (event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39) return;
	var returnValue = "";
	for (var i = 0; i < obj.value.length; i++){
		if (parseInt(obj.value.charAt(i)) >= 0 && parseInt(obj.value.charAt(i)) <= 9){
		  if(i == 3 && obj.value.charAt(i) != '.' && dot != 1) {
		  }
		  else {
			  returnValue += obj.value.charAt(i);
			}
		}else if (obj.value.charAt(i) == '.'){
			returnValue += obj.value.charAt(i);
			dot = 1;
		}else{
		}
	}
	obj.value = returnValue;
}