
var isInitBtnEnable = true;
var isInstBtnEnable = true;
var isMofyBtnEnable = false;
var isDelBrnEnable  = false;
var isExcelBtnEnable= true;
var isModifyed = "";
var v_chk = ""; 

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
	createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "200px");
  
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
  
  	// 상위 GRID에 대한 속성정보 설정
    mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"적요코드1|적요코드2|기타참고사항1|기타참고사항2|기타참고사항3|기타참고사항4|기타참고사항5|기타참고사항6|사용여부|코드구분", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:100,  Align:"Left",    SaveName:"NONE" },
             {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"Center",  SaveName:"NONE" },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Left",    SaveName:"NONE" } ];
    
   	mySheet.InitColumns(cols);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
	newSetActionMenu(mySheet,"엑셀내려받기");
	mySheet.SetCountPosition(1);
  	doAction("기준년월");
}



/*-----------------------------------------*/
/* @기능 : 해당 InputBox ReadOnly로 처리   */
/*-----------------------------------------*/


/*-----------------------------------------*/
/* @기능 : 해당 InputBox ReadOnly 해제     */
/*-----------------------------------------*/        

function sel_basemonth(){
    basemonth=document.frm.basemonth.value;
    //기준년월 변경에 대한 후속처리 - 통합정보코드 콤보 조회
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=13&v_inqtype=2&basemonth="+basemonth);
}


function onChangeJekyo() 
{
    f   = document.frm;
    
    if(document.frm.jekyocode1.selectedIndex!=0) {
        document.frm.jekyocode2.value = '';
    }
}


function ComboValue1(el)  //적요코드1
{
    for ( ;el.options.length > 0;) el.options.remove(0);
    var oOption = document.createElement("OPTION");
    oOption.text  = '신규';
    oOption.value = 'N';
    el.options.add(oOption);
    
    for(i=1;i<=hiddenGrid.GetTotalRows();i++){
     	var oOption = document.createElement("OPTION");
       	oOption.text = hiddenGrid.GetCellValue(i, 1);
       	oOption.value = hiddenGrid.GetCellValue(i, 0);
       	el.options.add(oOption);
    }
}


function ComboValue(el)  //통합정보코드(적요코드1)  
{
    for ( ;el.options.length > 0;) el.options.remove(0);
    for(i=1;i<=hiddenGrid.GetTotalRows();i++){
       	var oOption = document.createElement("OPTION");
       	oOption.text = hiddenGrid.GetCellValue(i, 1);
       	oOption.value = hiddenGrid.GetCellValue(i, 0);
       	el.options.add(oOption);
    }
}


function onlyNumberKeyPressForJekyo()
{
    if(document.frm.jekyocode2.value=='0') {
        document.frm.jekyocode2.value = ''
        return false;
    }
    
    return true;
}


function onlyNumberKeyPress()
{
    if((event.keyCode<48)||(event.keyCode>57))
    {
        event.returnValue=false;
    }
    
    return true;
}
    
    
/* Sheet 각종 처리 */
function doAction(sAction)
{
    f = document.frm;
    
    isSelected  = true;
    basemonth = document.frm.basemonth.value;
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
        
        case "조회":
            jekyocode= document.frm.jekyocode.value;
            mySheet.DoSearch("macd.scr.macd_scr_1101.do?hidden_key=9&v_inqtype=9&basemonth="+basemonth+"&jekyocode="+jekyocode); 
            break;
        
        case "신규": 
            document.frm.jekyocode1.selectedIndex = 0;
            document.frm.jekyocode2.value         = 0;
            document.frm.etcref1.value            = 0;
            document.frm.etcref2.value            = '';
            document.frm.etcref3.value            = '';
            document.frm.etcref4.value            = '';
            document.frm.etcref5.value            = '';
            document.frm.etcref6.value            = '';            
            document.frm.useYN.value              = 'Y';
            document.frm.codeGubun.value          = 0;    //  정보코드구분 0-미정의, 1-고객, 2-코드, 3-계좌
            
            break;
 
		case "삭제":            
			var v_hidden_key = '';
             
            B_basemonth  = document.frm.basemonth.value;
            B_jekyocode  = document.frm.jekyocode.value;
            
			hiddenGrid.DoSearch( encodeURI("macd.scr.macd_scr_1101.do?hidden_key=3"
                                    + "&basemonth="     + basemonth
                                    + "&jekyocode="     + document.frm.jekyocode.value
                                    + "&jekyocode2="    + document.frm.jekyocode2.value
                                    + "&etcref1="       + document.frm.etcref1.value
                                    + "&etcref2="       + document.frm.etcref2.value
                                    + "&etcref3="       + document.frm.etcref3.value
                                    + "&etcref4="       + document.frm.etcref4.value    
                                    + "&etcref5="       + document.frm.etcref5.value
                                    + "&etcref6="       + document.frm.etcref6.value    
                                    + "&useYN="         + document.frm.useYN.value                                    
                                    + "&codeGubun="     + document.frm.codeGubun.value                                                                    
                                    ));    
                                    
           	//삭제후 통합정보코드 다시 read   
			if (document.frm.jekyocode2.value == '0'){ //적요코드1[0] 삭제시
				hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=13&v_inqtype=2&basemonth="+B_basemonth); 
           	} else {
              	document.frm.jekyocode.value = B_jekyocode;
           	}
           
           	//삭제후 해당 적용코드 조회  
           	if (document.frm.jekyocode2.value == '0'){//적요코드1[0] 삭제시
              	doAction("조회");    	
           	} else {
              	mySheet.DoSearch("macd.scr.macd_scr_1101.do?hidden_key=9&v_inqtype=9&basemonth="+B_basemonth+"&jekyocode="+B_jekyocode);              
           	}
           
          	// 화면 setting 부분 clear
            document.frm.jekyocode1.selectedIndex = 0;
            document.frm.jekyocode2.value         = 0;
            document.frm.etcref1.value            = 0;
            document.frm.etcref2.value            = '';
            document.frm.etcref3.value            = '';
            document.frm.etcref4.value            = '';
            document.frm.etcref5.value            = '';
            document.frm.etcref6.value            = '';
            document.frm.useYN.value              = 'Y';
            document.frm.codeGubun.value          = 0;    //  정보코드구분 0-미정의, 1-고객, 2-코드, 3-계좌
                                            
            break;
                       
            
        case "변경":            
			var v_hidden_key = '';

            jekyocode= document.frm.jekyocode.value;
            
            if(f.jekyocode2.value==null || f.jekyocode2.value.trim()=='') {
                alert('적요코드2을 입력하여주세요.');
                f.jekyocode2.focus();
                return;
            } else if(f.etcref1.value==null || f.etcref1.value.trim()=='') {
                alert('기타참고사항1을 입력하여주세요.');
                return;
            } else if(f.etcref2.value==null || f.etcref2.value.trim()=='') {
                alert('기타참고사항2을 입력하여주세요.');
                return;
            } else if(document.frm.jekyocode1.selectedIndex==0 && document.frm.jekyocode2.value!=0) {
                alert('신규일때는 적요코드2에 0이외의 값을 넣을수 없습니다.');
                return;
            } else if(document.frm.codeGubun.selectedIndex==0 ) {
                alert('코드구분 선택하세요.');
                return;
            }

            
            if(document.frm.jekyocode1.selectedIndex==0) {
                v_hidden_key = '1';
            } else {
                v_hidden_key = '2';
            }                            
                                         
            hiddenGrid.DoSearch( encodeURI("macd.scr.macd_scr_1101.do?hidden_key=" + v_hidden_key
                                    + "&basemonth="     + basemonth
                                    + "&jekyocode="     + document.frm.jekyocode1.value
                                    + "&jekyocode2="    + document.frm.jekyocode2.value
                                    + "&etcref1="       + document.frm.etcref1.value
                                    + "&etcref2="       + document.frm.etcref2.value
                                    + "&etcref3="       + document.frm.etcref3.value
                                    + "&etcref4="       + document.frm.etcref4.value  
                                    + "&etcref5="       + document.frm.etcref5.value
                                    + "&etcref6="       + document.frm.etcref6.value  
                                    + "&useYN="         + document.frm.useYN.value
                                    + "&codeGubun="     + document.frm.codeGubun.value                                                                                                          
                                    ));    
            
            if(v_hidden_key=='1')   //적요코드1[0] 신규등록인경우 
				doAction("기준년월");
				
			isModifyed = true;
                                           
            break;
                                                                    
            
        case "엑셀내려받기":    // 엑셀내려받기
            inqText = new Array();
            inqText[0]    = new Array();
            inqText[0][0] = "기준년월";
            inqText[0][1] = document.frm.basemonth.options[document.frm.basemonth.selectedIndex].text;
  	        inqText[1]    = new Array();
            inqText[1][0] = "통합정보코드";
            inqText[1][1] = document.frm.jekyocode.options[document.frm.jekyocode.selectedIndex].text;
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
    // 확정(0 = 없음,1 = 확정,2 = 확정취소)
    // 확정여부 조회
    if (chk== 1) {
		hiddenGrid.DoSearch(encodeURI("comm.scr.comm_scr_9098.screen?hidden_key=1&v_commit=0&scrName=통합정보코드관리&basemonth="+basemonth));
       	//InputButtControl(1);
    // 확정 시킴
    } else if (chk== 2) {
       	hiddenGrid.DoSearch(encodeURI("comm.scr.comm_scr_9098.screen?hidden_key=2&v_commit=1&scrName=통합정보코드관리&basemonth="+basemonth));
       	//InputButtControl(3);
    // 확정취소 시킴
    } else if (chk== 3) {    
       	hiddenGrid.DoSearch(encodeURI("comm.scr.comm_scr_9098.screen?hidden_key=2&v_commit=2&scrName=통합정보코드관리&basemonth="+basemonth));
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
