var isInitBtnEnable = true;
var isInstBtnEnable = true;
var isMofyBtnEnable = true;
var isDelBrnEnable  = true;
var chkread         = true;
var c_page = 0;

/*Sheet 기본 설정 */
function LoadPage(){

  	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "230px");
	

	//지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
   	mySheet.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"순번|제목|작성자|작성일자|작성시간", Align:"Center"} ];
   	mySheet.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",      Hidden:0,  MinWidth:50,   Align:"Center",  SaveName:"순번",    CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:400,  Align:"Left",    SaveName:"제목",    CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"작성자",   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Date",      Hidden:0,  MinWidth:100,  Align:"Center",  SaveName:"작성일자",  CalcLogic:"",   Format:"Ymd",         PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:0,  MinWidth:80,   Align:"Center",  SaveName:"작성시간",  CalcLogic:"",   Format:"Hms",         PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"상위일자",  CalcLogic:"",   Format:"Ymd",         PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"상위시간",  CalcLogic:"",   Format:"Hms",         PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"직원번호",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 },
             {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"KEY",   CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
   	mySheet.InitColumns(cols);

   	mySheet.SetEditable(0);
   	mySheet.SetVisible(1);
   	mySheet.SetDataAutoTrim(0);


	createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "750px", "400px");
  
	//지원안함[check again] if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
   	hiddenGrid.SetConfig( { SearchMode:2, MergeSheet:0, Page:20, FrozenCol:0 } );

   	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   	var headers = [ { Text:"HIDDEN", Align:"Center"} ];
   	hiddenGrid.InitHeaders(headers, info);

   	var cols = [ {Type:"Text",      Hidden:1, MinWidth:100,  Align:"Center",  SaveName:"",  CalcLogic:"",   Format:"",            PointCount:-1,  UpdateEdit:0,   InsertEdit:0 } ];
    
   	hiddenGrid.InitColumns(cols);

   	hiddenGrid.SetEditable(0);
   	hiddenGrid.SetVisible(0);

  doAction("조회");
}


/*조회조건 ENTER KEY 이력시 조회*/
function check_Enter()
{
  if (event.keyCode==13) doAction("조회");
}

/*Sheet 각종 처리*/
function doAction(sAction)
{
  v_page      =   document.frm.v_page.value;
  
  wt_date     =   document.frm.wt_date.value;
  wt_time     =   document.frm.wt_time.value;
  title       =   document.frm.title.value;
  up_date     =   document.frm.up_date.value;
  up_time     =   document.frm.up_time.value;
  comt        =   document.frm.comt.value;
  key         =   g_key;


  switch(sAction)
  {
    case "고정필드설정":
    	mySheet.SetFrozenCol(mySheet.MouseCol());
    	break;
    case "고정필드해제":
    	mySheet.SetFrozenCol(0);
    	break;
    case "조회":                                                           //조회
      if(document.frm.v_columnname.selectedIndex>0)
      {
        if(document.frm.v_searchcont.value==null || document.frm.v_searchcont.value=="")
        {
          alert("조회하고자하는 컬럼값을 입력하세요.");
          document.frm.v_searchcont.focus();
          return;
        }
        
        column_name = document.frm.v_columnname.options[document.frm.v_columnname.selectedIndex].value;
        search_cont = document.frm.v_searchcont.value;
                
        var startRow=mySheet.GetSelectRow();
        startRow=mySheet.GetSelectRow()+ 1;
        if(mySheet.GetSelectRow()== null)
          startRow="1";
        // FindText(Col, SearchText, [StartRow], [FullMatch])
        var fRow=mySheet.FindText(column_name, search_cont, startRow, "2" );
        if (fRow > 0 )
          mySheet.SelectCell(fRow, column_name);
        else
          alert("위 조건에 맞는 게시물이 업습니다. 확인 후 조회해주세요.");
        break; 
      }
      else if(document.frm.v_columnname.selectedIndex==0)
      {
        chkread=true;
		mySheet.DoSearch("news.scr.news_scr_1121.do?kongigb=1&v_page="+v_page );
		hiddenGrid.DoSearch("news.scr.news_scr_1121.do?kongigb=2&v_page=1" );
      } 
      break;

    case "엑셀내려받기":                                                   //엑셀내려받기
      doExcel(mySheet, inqText, true); //common.js 활용하여 excel 출력
      break;      
    case "초기화":                                                         //초기화
      document.frm.reset();
      butt1.style.display = "";
      butt2.style.display = "none";
      butt3.style.display = "none";
      butt4.style.display = "none";
      document.frm.title.disabled = false;
      document.frm.comt.disabled = false;
      break;      
      
    case "등록":                                                           //등록
      if(title == "")
      {
        alert("제목을 입력바랍니다.");
        document.frm.title.focus();
        return;
      }
      if(comt == "")
      {
        alert("내용을 입력바랍니다.");
        document.frm.comt.focus();
        return;
      }
      document.frm.action="news.scr.news_scr_1124.do?hidden_key=1"
                                                    +"&kongigb=2"
                                                    +"&wt_date="+wt_date
                                                    +"&wt_time="+wt_time
                                                    +"&title="+title
                                                    +"&up_date="+up_date
                                                    +"&up_time="+up_time
                                                    //+"&comt="+enter_chg(comt); 
                                                    +"&comt="+enter_chg(comt.replace(/\n/g, '<br>'));
      document.frm.submit();  
      document.frm.reset();
   
    break;
    case "답변":                                                           //답변
      if(title == "")
      {
        alert("제목을 입력바랍니다.");
        document.frm.title.focus();
        return;
      }
      if(comt == "")
      {
        alert("내용을 입력바랍니다.");
        document.frm.comt.focus();
        return;
      }
      document.frm.action="news.scr.news_scr_1124.do?hidden_key=4"
                                                    +"&kongigb=2"
                                                    +"&wt_date="+wt_date
                                                    +"&wt_time="+wt_time
                                                    +"&title="+title
                                                    +"&up_date="+up_date
                                                    +"&up_time="+up_time
                                                    //+"&comt="+enter_chg(comt);
                                                    +"&comt="+enter_chg(comt.replace(/\n/g, '<br>'));
      document.frm.submit();  
      document.frm.reset();
    break;
    case "변경":                                                           //변경
      if(isMofyBtnEnable){
      if(title == "")
      {
        alert("제목을 입력바랍니다.");
        document.frm.title.focus();
        return;
      }
      if(comt == "")
      {
        alert("내용을 입력바랍니다.");
        document.frm.comt.focus();
        return;
      }    
      document.frm.action="news.scr.news_scr_1124.do?hidden_key=2"
                                                    +"&kongigb=2"
                                                    +"&wt_date="+wt_date
                                                    +"&wt_time="+wt_time
                                                    +"&title="+title
                                                    +"&up_date="+up_date
                                                    +"&up_time="+up_time
                                                    //+"&comt="+enter_chg(comt)
                                                    +"&comt="+enter_chg(comt.replace(/\n/g, '<br>'));
      document.frm.submit();       
      document.frm.reset();
      }
    break;
    case "삭제":   
      if(isDelBrnEnable){
      if(!confirm("삭제 하시겠습니까?"))
      {
        return;
      }  
      if(wt_date == "")
      {
        alert("삭제할 내역이 없습니다.");
        return;
      }     
      document.frm.action="news.scr.news_scr_1124.do?hidden_key=3"
                                                    +"&kongigb=2"
                                                    +"&wt_date="+wt_date
                                                    +"&wt_time="+wt_time;
      document.frm.submit();
      document.frm.reset();
      }
    break;
  }
}
function changedColumnName()                                               //컬럼별 검색시 셀포커스를 처음으로 돌린다.
{
    if(document.frm.v_columnname.value == "TOT")
    {
      document.frm.v_searchcont.value = "";
      document.frm.v_searchcont.readOnly = true;
    }
    else
    {
      document.frm.v_searchcont.readOnly = false;
    }
    mySheet.SelectCell("1", "0");
    return;
}

function numOnly(obj,frm,isCash){
  //입력필드(사용자가 키보드를 처서 입력하는)의 입력값이 숫자만 들어가도록 할 때 사용된다.
  //사용예 : <input type="text" name="text" onKeyUp="javascript:numOnly(this,document.frm,true);">
  //여기서 this는 오브젝트를 뜻하므로 그냥 사용하면 되고, document 다음의 frm 대신에 
  //자신이 사용한 form 이름을 적어준다.
  //마지막 파라미터로 true,false 를 줄 수 있는데 true로 주면 금액등에 쓰이는 3자리마다 콤마를 
  //false 로 주면 그냥 숫자만 입력하게 한다.
  if (event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39) return;
  var returnValue = "";
  for (var i = 0; i < obj.value.length; i++){
    if (obj.value.charAt(i) >= "0" && obj.value.charAt(i) <= "9"){
      returnValue += obj.value.charAt(i);
    }else{
      returnValue += "";
    }
  }
    
  if (isCash){
    obj.value = cashReturn(returnValue);
    return;
  }
  obj.focus();
  obj.value = returnValue;
  
}


function cashReturn(numValue){
  //금액을 위한 함수, 코더들은 이 function을 직접 부를 필요 없다. numOnly함수에 마지막
  //파라미터를 true로 주고 numOnly를 부른다.
  var cashReturn = "";
  for (var i = numValue.length-1; i >= 0; i--){
    cashReturn = numValue.charAt(i) + cashReturn;
    if (i != 0 && i%3 == numValue.length%3) cashReturn = "," + cashReturn;
  }
  
  return cashReturn;
}


function removeComma(cash){
  //콤마를 없애준다.
  //사용법 : 만약 INPUT BOX의 이름이 trns_limit이면
  //       모든 value check 후 submit 바로 전에 document.frm.tran_limit.value = removeComma(document.frm.tran_limit.value);
  var returnValue = "";
  for (var i = 0; i < cash.length; i++){
    if (cash.charAt(i) != ","){
      returnValue += cash.charAt(i);
    }
  }
  return returnValue;
}


function enter_chg(str) 
{
  var ret = "";
  for (i = 0; i < str.length; i++)
  {
    if (str.charAt(i) == '\r')
      ret += "<br>";
    else
      ret += str.charAt(i);
  }
  return ret;
}


function enter_chg1(str) 
{
  re  = /<br>/gi;
  str = str.replace(re,'\r');
  return str;
}


function doPage(v_page)
{
	c_page = v_page;
  	mySheet.DoSearch("news.scr.news_scr_1121.do?kongigb=1"+"&v_page="+v_page); 
  	return;
}


function answer()
{
    document.frm.title.disabled       = false;
    document.frm.comt.disabled        = false;
    document.frm.title.value = "답변 : "+document.frm.title.value+" - "
    document.frm.comt.value  = "<"+document.frm.comt.value+">\n";
}


function answer_nonauthor()
{
    answer();
    
    butt1.style.display = "none";
    butt2.style.display = "none";
    butt3.style.display = "none";
    butt4.style.display = "";    
}


function play_data(Row){
	document.frm.title.value=mySheet.GetCellValue(Row, 1);
	document.frm.v_news_author.value=mySheet.GetCellValue(Row, 2);  //  게시판 게시자 성명
	document.frm.wt_date.value=mySheet.GetCellValue(Row, 3);
	document.frm.wt_time.value=mySheet.GetCellValue(Row, 4);
	document.frm.up_date.value=mySheet.GetCellValue(Row, 5);
	document.frm.up_time.value=mySheet.GetCellValue(Row, 6);
    chkread=false;

    hiddenGrid.DoSearch("news.scr.news_scr_1122.do?kongigb=2"
                                                 +"&wt_date="+mySheet.GetCellValue(Row, 3)
                                                 +"&wt_time="+mySheet.GetCellValue(Row, 4));      //내용 표시시 HIDDEN GRID를 조회한다.
    if(mySheet.GetCellValue(Row, 7)==g_userid)
    {
        butt1.style.display = "none";
        butt2.style.display = "";
        butt3.style.display = "none";
        butt4.style.display = "none";
    } else {
        butt1.style.display = "none";
        butt2.style.display = "none";
        butt3.style.display = "";
        butt4.style.display = "none";
    }
}


/*---------------------------------------------
 @기능 - 보고서 출력
----------------------------------------------*/
function doPrint()
{	
	win_open("/kpi/news/prt/news_prt_1120.jsp", 740, 600);
}
