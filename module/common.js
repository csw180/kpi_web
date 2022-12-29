var broswerObj = ""; //브라우저 종류
var rtnData = ""; // 인괘 관련 sheet rtnData 전역변수
var strUnitText = ""; //unittext 단위

function setCookie(name, value) {
document.cookie = name + "=" + escape(value) + "; path=/";
}

function getCookie( name )
{
  //alert(document.cookie.split(':').join('\n'));
	var nameOfCookie = name + "=";
	var x = 0;
	while ( x <= document.cookie.length )
	{
		var y = (x+nameOfCookie.length);
		if ( document.cookie.substring( x, y ) == nameOfCookie )
		{
			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
			endOfCookie = document.cookie.length;
			return unescape( document.cookie.substring( y, endOfCookie ) );
		}
		x = document.cookie.indexOf( " ", x ) + 1;
		if ( x == 0 )
		break;
	}
	return "";
}

function getCurMenu() {
  var value = getCookie("CURMENU");
  return value;
}

function setCurMenu(curmenu) {
  var premenu = getCurMenu();
  if (premenu == curmenu)
    setCookie("CURMENU", "");
  else
    setCookie("CURMENU", curmenu);
}

/*----------------------------------------------------*/
/* @기  능 :  WINDOW OPEN                             */
/*----------------------------------------------------*/
function win_open(url,width_v,height_v) {
	var top_x = (window.screen.width - width_v)/2;
	var top_y = (window.screen.height - height_v)/2;
  var win1  = "";
	win1=open(url,"WIN1","top="+top_y+",left="+top_x+",width="+width_v+",height="+height_v+",scrollbars=yes,status=no,toolbar=no,menubar=no,location=no,directories=no,resizable=no");
  return win1
}

function win_open2(url,width_v,height_v) {
	var top_x = (window.screen.width - width_v)/2;
	var top_y = (window.screen.height - height_v)/2;
  var win2  = "";
	//win2=open(url,"WIN2","top="+top_y+",left="+top_x+",width="+width_v+",height="+height_v+",scrollbars=no,status=no,toolbar=no,menubar=no,location=no,directories=no,resizable=no");
	win2=open(url,"","top="+top_y+",left="+top_x+",width="+width_v+",height="+height_v+",scrollbars=no,status=no,toolbar=no,menubar=no,location=no,directories=no,resizable=no");
  return win2
}

function win_openModal(obj, url,width_v,height_v) {
	var top_x = (window.screen.width - width_v)/2;
	var top_y = (window.screen.height - height_v)/2;

  var position = "dialogTop:"+top_x+"px; dialogLeft:"+top_y+"px;";
  var option = "dialogWidth:" + width_v + "px; dialogHeight:" + height_v + "px; status:no; toolbar:no; menubar:no; location:no; resizable:no; help:no; scroll:no;unadorned:yes" + position;

  var modal = window.showModalDialog(url,obj, option);
  return modal;
}

//공용 업무보고서(OP,HQ,RM) popup
function commPopup(url)
{
  var rv       = new Object;
  rv.src       = url;

  var width_v  = 820;
  var height_v = 580;
	var top_x    = (window.screen.width - width_v)/2;
	var top_y    = (window.screen.height - height_v)/2;
  //var param = "top="+top_y+",left="+top_x+",width="+width_v+",height="+height_v+",scrollbars=no,status=no,toolbar=no,menubar=no,location=no,directories=no,resizable=no";
  var param = "top="+top_y+",left="+top_x+",width="+width_v+",height="+height_v+",scrollbars=no,status=no,toolbar=no,menubar=no,location=no,directories=no,resizable=no";

  var win = open("module/commPopup.html","",param);
  //var win = window.showModalDialog("module/commPopup.html",rv, param);
  return win;
}

//공용 Modal Popup
function commModal(rv ,pwidth, pheight, pleft, ptop )
{
	if(pleft == "-1" && ptop == "-1"){
		param = "dialogWidth:" + pwidth + "px; dialogHeight:" + pheight + "px; status:no; toolbar:no; menubar:no; location:no; resizable:no; help:no; scroll:no;unadorned:yes";
	}else{
		param = "dialogLeft:"+pleft+"; dialogTop:"+ptop+"; dialogWidth:" + pwidth + "px; dialogHeight:" + pheight + "px; status:no; toolbar:no; menubar:no; location:no; resizable:yes; help:no; scroll:no ";
	}
  var modal = window.showModalDialog("module/commPopup.html",rv, param);
  return modal;
}

function win_open3(url,width_v,height_v) {
	var top_x = (window.screen.width - width_v)/2;
	var top_y = (window.screen.height - height_v)/2;
  var win3  = "";
	win3=open(url,"WIN3","top="+top_y+",left="+top_x+",width="+width_v+",height="+height_v+",scrollbars=yes,status=no,toolbar=no,menubar=no,location=no,directories=no,resizable=no");
    return win3
}

function win_open4(url,width_v,height_v) {
	var top_x = (window.screen.width - width_v)/2;
	var top_y = (window.screen.height - height_v)/2;
  var win4  = "";
	win4=open(url,"WIN4","top="+top_y+",left="+top_x+",width="+width_v+",height="+height_v+",scrollbars=yes,status=no,toolbar=no,menubar=no,location=no,directories=no,resizable=yes");
  return win4
}

function help_open() {
  url = document.URL;

  var url_str = url.substring(url.indexOf("/kpi/"));
  ui  = url_str.split(".");

  //alert(url_str + ",    doc/"+ui[1]+"/"+ui[2]+".htm")

  if(ui[0] == "/kpi/kpi"){
	/* to be 도움말 연결 -> pdf or html5에 따라 방식이 다름 */
	var helpFileNm = "doc/xps/"+ui[0]+"/"+ui[1]+".html";
	console.log("helpFileName : " + helpFileNm);
	
	/* as is 도움말 연결
  	open("doc/"+ui[1]+"/"+ui[2]+".htm", "HELP", "top=0,left=0,width=910,height=675,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no,directories=no,resizable=yes");
	*/
  }else{
	/* to be 도움말 연결 -> pdf or html5에 따라 방식이 다름 */
	var helpFileNm = "doc/xps/"+ui[0]+"/"+ui[1]+".html";
	console.log("helpFileName : " + helpFileNm);
	
	/* as is 도움말 연결
	sys = ui[0].split("/");
	
	alert("doc/"+sys[2]+"/"+ui[1]+".htm")
  	open("doc/"+sys[2]+"/"+ui[1]+".htm", "HELP", "top=0,left=0,width=910,height=675,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no,directories=no,resizable=yes");
	*/
  }
}

// DIALOG OPEN
function OpenDialog(url,width_v,height_v) {
	window.status="";
	strFeatures="dialogWidth="+width_v+"px;dialogHeight="+height_v+"px;scrollbars=no;center=yes;border=thin;help=no;status=no";
	strRtn=window.showModalDialog(url,"DialogBox",strFeatures);
}

//문자 바꾸기, 사용법 var str = 문자열.replaceAll("a", "1");  
String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/gi, "");
}

/*
function popupModal(pfilename ,pstr, pwidth, pheight, pleft, ptop ) {

	if(pleft == "-1" && ptop == "-1"){
		param = "dialogWidth:" + pwidth + "px; dialogHeight:" + pheight + "px; status:no; toolbar:no; menubar:no; location:no; resizable:no; help:no; scroll:no;unadorned:yes";
	}else{
		param = "dialogLeft:"+pleft+"; dialogTop:"+ptop+"; dialogWidth:" + pwidth + "px; dialogHeight:" + pheight + "px; status:no; toolbar:no; menubar:no; location:no; resizable:yes; help:no; scroll:no ";
	}

	var args = new Array();
	args[0] = window ;
	args[1] = pfilename;	//호출될 url
	args[2] = pstr;
	window.showModalDialog(pfilename,args, param);
}

function commModal(rv ,pwidth, pheight, pleft, ptop )
{
	if(pleft == "-1" && ptop == "-1"){
		param = "dialogWidth:" + pwidth + "px; dialogHeight:" + pheight + "px; status:no; toolbar:no; menubar:no; location:no; resizable:no; help:no; scroll:no;unadorned:yes";
	}else{
		param = "dialogLeft:"+pleft+"; dialogTop:"+ptop+"; dialogWidth:" + pwidth + "px; dialogHeight:" + pheight + "px; status:no; toolbar:no; menubar:no; location:no; resizable:yes; help:no; scroll:no ";
	}
  var modal = window.showModalDialog("/framework/html/commPopup.html",rv, param);
  return modal;
}

//SAMPLE - MODELESS
var url = '/hams/ds/299동산공통-재고조회.jsp';
  var result = "";
  //var firstList = new Array();

  var position = "dialogTop:160px; dialogLeft:190px;";
  var option = "unadorned:off;help:off; dialogHide:off;resizable:off;status:off;dialogWidth:700px;dialogHeight:520px;scroll:no;"+position;
  result = window.showModelessDialog(url,"", option);

  if (result == -1 || result == null || result == "") return;

  //sample - MODAL

}
*/

// INPUTBOX SELECT
function select_ibox() {
	var el = window.event.srcElement;
	if (el.readOnly == false) {
		el.focus();
		el.select();
	}
}


// 월별 일수를 배열로 생성
function arry_days(isleapyear) {
	this[0]		= 31;
	this[1]		= 28;
	if (isleapyear)
	this[1]		= 29;
	this[2]		= 31;
	this[3]		= 30;
	this[4]		= 31;
	this[5]		= 30;
	this[6]		= 31;
	this[7]		= 31;
	this[8]		= 30;
	this[9]		= 31;
	this[10]	= 30;
	this[11]	= 31;
}

// 윤년을 체크하여 해당월의 일수를 리턴
function dayInmonth(month,year) {
	var isleapyear = (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0));
	var monthdays = new arry_days(isleapyear);

	return monthdays[month];
}

// 입력오류처리
function chk_date() {
	var el	= window.event.srcElement;
	var ln = el.value.length;

	if ((isNaN(el.value.substr(ln-1,1)))&&(el.value.substr(ln-1,1)!="/")) {
		alert("숫자만 입력가능합니다!!");
		el.value = "";
		el.focus();
		return false;
	}

	if (ln == 4)
		el.value = el.value + "/";
	if (ln == 7)
		el.value = el.value + "/";

	if (ln == 10) {
		var yy = el.value.substr(0,4);
		var mm = el.value.substr(5,2);
		var dd = el.value.substr(8,2);
		var numdays = dayInmonth((mm-1),yy);
		if ((yy < 1000)||(dd < 1)||(mm < 1)||(dd > numdays)||(mm > 12)||(isNaN(yy))||(isNaN(mm))||(isNaN(dd))) {
			alert("날짜 입력오류!!");
			el.value = "";
			el.focus();
			return false;
		}
	}
}


// 월입력 체크
function chk_month() {
	var el	= window.event.srcElement;
	var ln = el.value.length;

	if ((isNaN(el.value.substr(ln-1,1)))&&(el.value.substr(ln-1,1)!="/")) {
		alert("숫자만 입력가능합니다!!");
		el.value = "";
		el.focus();
		return false;
	}

	if (ln == 4)
		el.value = el.value + "/";
	if (ln == 10) {
		var yy = el.value.substr(0,4);
		var mm = el.value.substr(5,2);
		var numdays = dayInmonth((mm-1),yy);
		if ((yy < 1000)||(dd < 1)||(mm < 1)||(dd > numdays)||(mm > 12)||(isNaN(yy))||(isNaN(mm))||(isNaN(dd))) {
			alert("날짜 입력오류!!");
			el.value = "";
			el.focus();
			return false;
		}
	}
}

// MOVE CURSOR
function move_cursor(size,next_el) {
	var el = window.event.srcElement;
	var vl = el.value;
	var ln = vl.length;

	for(var i=0; i < ln; i++) {
		var ch = vl.charAt(i);
		if(ch < "0" || ch > "9") {
		   alert("숫자만 입력가능합니다.");
				el.value = "";
				el.focus();
				return false;
		}
	}

	if (ln == size) {
		next_el.focus();
		next_el.select();
	}
}

// GET MIN VALUE
function getMInVal(str) {
	j=0;
	for (i=0;i<str.length-1;i++) {
		if (str.charAt(i)=="/")
			j = i;
	}
	if (j>0) {
		strAry = str.split("/");
		strMin = Math.min(strAry[0],strAry[1]);
		return(strMin);
	}
	else
		return(str);
}
// 영문자 대문자로
function upper() {
    var el    = window.event.srcElement;
    var str = el.value;
    str=str.toUpperCase();
 }

// 숫자입력오류처리
function chk_num() {

	var el = window.event.srcElement;
	var vl = el.value;
	var ln = vl.length;

	for(var i=0; i < ln; i++) {
		var ch = vl.charAt(i);
		if(ch < "0" || ch > "9") {
		   alert("숫자만 입력가능합니다.");
				el.value = "";
				el.focus();
				return false;
		}
	}
}

function unFormatDate(sDate) {
    var year  = sDate.substring(0,4);
    var month = sDate.substring(5,7);
    var day   = sDate.substring(8,10);

    return (year+month+day);
}

function FormatDate(sDate) {
    var year  = sDate.substring(0,4);
    var month = sDate.substring(4,6);
    var day   = sDate.substring(6,8);
    return (year+"/"+month+"/"+day);
}


/*----------------------------------------------------*/
/* @기  능 : Excel download시 각종 속성을 설정하는    */
/*           함수                                     */
/* @리턴값 : Excel 속성 파라미터                      */
/*----------------------------------------------------*/
var  EXCEL_DOWN_ATTR_JSP = "/kpi/module/excel_down.jsp";
function genExcelParam(targetObj, headRows, htm_title, currency_text, inq_text)
{
    var excelParam       = "";  // Excel Parameter 정보
    var columnCount      = 0;   // Excel Download시 실제 컬럼개수
    var columnWidthParam = "";  // Grid의 각 컬럼의 넓이
    var inqTextParam     = "";

    for(var i=0; inq_text!=null && i<inq_text.length; i++)
    {
        inqTextParam += "&inq_text=" + encodeURI(inq_text[i][0]) + "&inq_value=" + encodeURI(inq_text[i][1]);
    }

	for(var i=0;;i++) {
		if(targetObj.GetCellValue(0, i) == -1) {
			break;
		} else if(  targetObj.GetCellProperty(0, i, "Type") != "Status"
				 && targetObj.GetCellProperty(0, i, "Type") != "DelCheck"
			
		         ) {
			if(targetObj.GetColHidden(i) == 0) {
				columnCount++;
                columnWidthParam += "&column_width=" + targetObj.GetColWidth(i);

//		alert(columnCount)
			} 	
		} 
	}
		
	/*
    for(var i=0; ;i++)
    {
        if(targetObj.GetCellValue("0", i)==null) break;
        else if( targetObj.GetCellProperty("0", i, "Type")!=dtHidden &&            // Excel download시 필요없는 컬럼을 체크한다.
				  targetObj.GetCellProperty("0", i, "Type")!=dtStatus &&
				  targetObj.GetCellProperty("0", i, "Type")!=dtDelCheck &&
				  targetObj.GetCellProperty("0", i, "Type")!=dtHiddenStatus &&
				  targetObj.GetCellProperty("0", i, "Type")!=dtDelCheckEx &&
				  targetObj.GetCellProperty("0", i, "Type")!=dtResult
               ) {
                columnCount++;
                columnWidthParam += "&column_width=" + targetObj.GetColWidth(i);
        }
    }
	*/

	/*
    excelParam  = "?title_text=" + targetObj.UrlEncoding(htm_title);
    if(targetObj.UrlEncoding(currency_text) !=null && targetObj.UrlEncoding(currency_text) != ''){
        excelParam += "&unit_text="  + "단위 / " + targetObj.UrlEncoding(currency_text);
    } else {
        excelParam += "&unit_text=" + targetObj.UrlEncoding(currency_text);
    }
	*/
	excelParam  = "?title_text=" + encodeURI(htm_title);
	excelParam += "&unit_text="  + encodeURI(currency_text);
    excelParam += "&head_rows="  + headRows;
    excelParam += "&title_cols=" + columnCount;
    excelParam += columnWidthParam;
    excelParam += inqTextParam;

	//alert(excelParam)

    return excelParam;
}

//기본다운로드시 다운로드 컬럼 셋팅
function getExcelDownCol(targetObj){
	var lr = targetObj.LastCol();
	var downCols = [];
	for(var i=0; i<=lr ;i++){
		
		if(  targetObj.GetCellProperty(0, i, "Type") != "Status"
		  && targetObj.GetCellProperty(0, i, "Type") != "DelCheck"
		  ) {
			if(targetObj.GetColHidden(i) == 0) {
				downCols.push(i);
			}
		} 	
	}
	return downCols.join("|");
}


/*----------------------------------------------------*/
/* @기  능 : Session 체크하는 함수                    */
/* @리턴값 : true/false                               */
/*----------------------------------------------------*/
function ClickSessionCheck() {
    if((event.button==1) || (event.button==2)  || (event.button==3)) {
        document.checkSession.location.reload();
    }
}

function GridConfig(myGrid){
  with(myGrid){
     GridLine      = 1;
     HeadRowHeight = 22;
     DataRowHeight = 20;
     CountPosition = 1;
     HeadFontBold  = false;
     EditableColorDiff = true;
     DateFormatChar    = "-";
     KeyFieldImage     = "img/ess2.gif";
     SearchingImage    = "img/grid_search.gif";
     SavingImage       = "img/grid_save.gif";
     DownLoadImage     = "img/grid_transact.gif";
     HeadBackColor = RgbColor(205,215,217);
     HeadFontColor = RgbColor(0,0,0);
     InLineColor   = RgbColor(211,211,210);
     OutLineColor  = RgbColor(160,160,160);
     UnEditableColor = RgbColor(248,248,244);
     SelectBackColor = RgbColor(233,238,242);
     DataAltanateBackColor = RgbColor(248,248,244);
     SumBackColor  = RgbColor(232,233,237);
     DataFontColor = RgbColor(77,77,77);
     DataBackColor = RgbColor(248,248,244);
   //RequestTimeOut    = 60000;

  }
}



/*---------------------------------------------
 @기능 - 기준년월에 따른 기간구분을 enable/disable 시킴.
         (기준년이 '2005XX'이면, '월중'만 enable)
----------------------------------------------*/
function ctrlMonthGbCombo()
{
    v_monthgb_option       = new Array(2);
    v_monthgb_option[0]    = new Array(2);
    v_monthgb_option[1]    = new Array(2);

    v_monthgb_option[0][0] = '월중';
    v_monthgb_option[0][1] = '1';
    v_monthgb_option[1][0] = '기중';
    v_monthgb_option[1][1] = '2';

    v_basemonth = document.frm.basemonth;

    if(v_basemonth!=null && document.frm.monthgb!=null)
    {
        v_index = document.frm.monthgb.selectedIndex;

        for(i=0; i<document.frm.monthgb.options.length; i++)
        {
            document.frm.monthgb.options[i] = null;
        }
        document.frm.monthgb.options.length = 0;

        if(v_basemonth.options[v_basemonth.selectedIndex].value.substring(0, 4)=='2005')
        {
            for(i=0; i<v_monthgb_option.length; i++)
            {
                if(v_monthgb_option[i][1]=='1')
                {
                    document.frm.monthgb.options[0] = new Option(v_monthgb_option[i][0], v_monthgb_option[i][1]);
                }
            }
            document.frm.monthgb.length = 1;
        } else {
            for(i=0; i<v_monthgb_option.length; i++)
            {
                document.frm.monthgb.options[i] = new Option(v_monthgb_option[i][0], v_monthgb_option[i][1]);
            }
            document.frm.monthgb.length        = v_monthgb_option.length;
            document.frm.monthgb.options[v_index].selected = true;
        }
    }
}


/*---------------------------------------------
 @기능 - 사업부 코드를 점번호에 따라
         enabled/disabled 시킴.(PA 보고서용)
         (점번호 20000이상인 경우는 '합산'만 enable
----------------------------------------------*/
function ctrlSaupCombo(v_jeomgubun, v_login_jeomgubun)
{
    v_saupcode_option       = new Array(3);
    v_saupcode_option[0]    = new Array(2);
    v_saupcode_option[1]    = new Array(2);
    v_saupcode_option[2]    = new Array(2);

    v_saupcode_option[0][0] = '개인';
    v_saupcode_option[0][1] = '1';
    v_saupcode_option[1][0] = '기업';
    v_saupcode_option[1][1] = '2';
    v_saupcode_option[2][0] = '합산';
    v_saupcode_option[2][1] = '8';

    v_jumcode  = document.frm.v_jumcode;

    if(v_jumcode!=null && document.frm.saupcode!=null)
    {
        for(i=0; i<document.frm.saupcode.options.length; i++)
        {
            document.frm.saupcode.options[i] = null;
        }
        document.frm.saupcode.options.length = 0;

        if(v_login_jeomgubun==0 || v_login_jeomgubun==2)
        {
            for(i=0; i<v_saupcode_option.length; i++)
            {
                if(v_saupcode_option[i][1]=='8')
                {
                    document.frm.saupcode.options[0] = new Option(v_saupcode_option[i][0], v_saupcode_option[i][1]);
                }
            }
            document.frm.saupcode.length = 1;
        }
        else
        {
            if(parseInt(v_jumcode.value)<20000 && (v_jeomgubun==0 || v_jeomgubun==2))
            {
                for(i=0; i<v_saupcode_option.length; i++)
                {
                    document.frm.saupcode.options[i] = new Option(v_saupcode_option[i][0], v_saupcode_option[i][1]);
                }
                document.frm.saupcode.length = v_saupcode_option.length;
                document.frm.saupcode.selectedIndex = 2;
            } else {
                for(i=0; i<v_saupcode_option.length; i++)
                {
                    if(v_saupcode_option[i][1]=='8')
                    {
                        document.frm.saupcode.options[0] = new Option(v_saupcode_option[i][0], v_saupcode_option[i][1]);
                    }
                }
                document.frm.saupcode.length = 1;
            }
        }
    }
}


/*---------------------------------------------
 @기능 - 사업부 코드를 점번호에 따라
         enabled/disabled 시킴.(PA 보고서용)
         (점번호 20000이상인 경우는 '합산'만 enable
----------------------------------------------*/
function ctrlSaupCombo1(v_jumcode, v_jeomgubun)
{
    v_saupcode_option       = new Array(3);
    v_saupcode_option[0]    = new Array(2);
    v_saupcode_option[1]    = new Array(2);
    v_saupcode_option[2]    = new Array(2);

    v_saupcode_option[0][0] = '개인';
    v_saupcode_option[0][1] = '1';
    v_saupcode_option[1][0] = '기업';
    v_saupcode_option[1][1] = '2';
    v_saupcode_option[2][0] = '합산';
    v_saupcode_option[2][1] = '8';

    if(v_jumcode!=null && document.frm.saupcode!=null)
    {
        for(i=0; i<document.frm.saupcode.options.length; i++)
        {
            document.frm.saupcode.options[i] = null;
        }
        document.frm.saupcode.options.length = 0;

        if(v_jeomgubun==1)
        {
            for(i=0; i<v_saupcode_option.length; i++)
            {
                document.frm.saupcode.options[i] = new Option(v_saupcode_option[i][0], v_saupcode_option[i][1]);
            }
            document.frm.saupcode.length = v_saupcode_option.length;
            document.frm.saupcode.selectedIndex = 2;
        } else {
            for(i=0; i<v_saupcode_option.length; i++)
            {
                if(v_saupcode_option[i][1]=='8')
                {
                    document.frm.saupcode.options[0] = new Option(v_saupcode_option[i][0], v_saupcode_option[i][1]);
                }
            }
            document.frm.saupcode.length = 1;
        }
    }
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


/*---------------------------------------------
 @기능 - 왼쪽를 지정된 길이만큼 0으로 채워주는 함수
 @v_targetValue  변경시킬 값
 @v_length       채워줄 전체길이
----------------------------------------------*/
function lpad(v_targetValue, v_length)
{
    var v_result       = "";
    var v_targetValue1 = "";
        v_targetValue1 = v_targetValue + "";
    var v_count        = v_length-v_targetValue1.length;

    if(v_targetValue1!=null && v_targetValue1.length<v_length)
    {
        for(i=0; i<v_count; i++)
            v_result += "0";
    }

    return v_result + v_targetValue1;
}


/*---------------------------------------------
 @기능 - 해당 일자(yyyy-MM)를 지정된 값만큼
         개월수를 증감시키는 함수
 @v_yyyyMMdd  "yyyyMM" 포맷
 @v_month     개월을 증감시킬 값
----------------------------------------------*/
function addMonth(v_yyyyMM, v_month, flag){

    if(v_yyyyMM==null || v_yyyyMM.length!=6)
        return v_yyyyMM;

    var currYear   = eval(v_yyyyMM.substring(0, 4));  // 년
    var currMonth  = eval(v_yyyyMM.substring(4, 6));  // 월
    var currDay    = 1;                               // 일

    var currDate   = new Date(currYear, currMonth-1, currDay);
    var resultDate = new Date(currDate);

    resultDate.setYear(currDate.getYear());
    resultDate.setMonth(currDate.getMonth()+v_month);

	if(flag == '1'){
      return resultDate.getYear() + lpad((resultDate.getMonth()+1), 2);
	}
    else{
      return resultDate.getYear() + "년" + lpad((resultDate.getMonth()+1), 2) + "월";
	}
}


/*---------------------------------------------
 @기능 - 해당 일자(yyyy-MM-dd)를 지정된 값만큼
         개월수를 증감시키는 함수
 @v_yyyyMMdd  "yyyy-MM-dd" 포맷
 @v_month     개월을 증감시킬 값
----------------------------------------------*/
function addMonths(v_yyyyMMdd, v_month){

    if(v_yyyyMMdd==null || v_yyyyMMdd.split("-").length!=3)
        return v_yyyyMMdd;

    var currYear   = eval(v_yyyyMMdd.split("-")[0]);  // 년
    var currMonth  = eval(v_yyyyMMdd.split("-")[1]);  // 월
    var currDay    = eval(v_yyyyMMdd.split("-")[2]);  // 일

    var currDate   = new Date(currYear, currMonth-1, currDay);
    var resultDate = new Date(currDate);
    resultDate.setMonth(currDate.getMonth()+v_month);

    return resultDate.getYear() + "-" + lpad((resultDate.getMonth()+1), 2) + "-" + lpad(resultDate.getDate(), 2);
}


/*----------------------------------------------*/
/* @기능 : hidden된 컬럼을 disable시키는 함수   */
/*----------------------------------------------*/
function extendCols(targetGrid, columnCount)
{
//    for(var i=0; i<columnCount; i++)
//    {
//        targetGrid.CellText(0, i)      = targetGrid.CellText(0, i).replace(/\+/g, "-");
//
//        if(targetGrid.ColHidden(i))
//        {
//            targetGrid.ColHidden(i)        = false;
//            targetGrid.CellBackColor(0, i) = targetGrid.RgbColor(255,239,191);
//        }
//    }
}


/*----------------------------------------------*/
/* @기능 : GRID Object를 display하는 함수       */
/*----------------------------------------------*/
function displayGrid(objName, isHidden, isConfig)
{
//    document.write("<OBJECT ID='" + objName + "' CLASSID='CLSID:C838E9DA-1625-4E14-8B37-C6706B43C423' codebase='sheet/IBSheet.CAB#version=1,9,0,2'>");
    document.write("<OBJECT ID='" + objName + "' CLASSID='CLSID:341FBC5F-2AE4-41B8-BFE5-A03170569A27' codebase='sheet/IBSheet3.CAB#version=3,4,0,50'>");
    document.write("<param name='Visible'   value='false'>");

    if(isConfig)
        document.write("<param name='ConfigXml' value='sheet/IBSheet_design.xml'>");

    document.write("</OBJECT>");
}

/*----------------------------------------------*/
/* @기능 : Chart Object를 display하는 함수 20080515 */
/*  param 1 : chart name
    param 2 : chart 너비
    param 3 : chart 높이
    param 4 : description xml 파일 경로
/*----------------------------------------------*/
function displayChart(objName, cwidth , cheight , description)
{
    if(cwidth == null || cwidth ==""){ cwidth = "100%"}
    if(cheight == null || cheight ==""){ cheight = "100%"}
    document.write("<OBJECT ID='"+objName+"' name='"+objName+"' " );
    document.write(" width='"+cwidth+"' height='"+cheight+"' ");
    document.write("CLASSID='clsid:9cd77d36-9a9f-4cf8-86c5-18ae5b8ca118'");
    document.write("CODEBASE='sheet/IBChart/ibchart.cab#version=1,0,0,0'>");
    if(description){
        document.write("<param name='description' value='sheet/IBChart/IBChart_design.xml'>");
    }
    document.write("<param name='Visible' value='false'>");
    document.write("</OBJECT>");
}

/*----------------------------------------------*/
/* @기능 : AI Object를 display하는 함수         */
/*----------------------------------------------*/
function displayAI()
{
    var AICSObject = "<OBJECT ID='AIScriptGen' CLASSID='CLSID:D3B5B212-CE4B-4D52-B2CF-B329C467CD08' width='0' height='0'\n"
	               + " codebase='http://"+location.host+"/kpi/AIReportCS/AIScriptGen.cab#Version=1,0,0,6'></OBJECT>";
    document.write(AICSObject);
}


/*----------------------------------------------*/
/* @기능 : 화면 설명을 display하는 함수         */
/*----------------------------------------------*/
function displayMessage(str, type)
{
    var message = "";
    
    message += "<table><tr><td><font size=1 color='#FF6600'>▶ 더블클릭 시 \'" +str+ "\' 화면" ;
    if(type != null && type ==1){
      message += ", 오른쪽 마우스 클릭 시 분개가능화면 조회 가능";
    }
    message += "</font></td></tr></table>";

    document.write(message);
}

function displayLinkMessage(kpiname){
    alert(kpiname.trim() + "은(는) 연결화면이 없습니다.");
}


function displayMessageTooltip(str, type, str2)
{
    var message = "▶ 더블클릭 시 " +str+ " 화면" ;
    if(type != null && type ==1){
      //message += ", 오른쪽 마우스 클릭 시 분개화면 조회 가능";
      message += ",  오른쪽 마우스 클릭 시 "
      if(str2 != null && str2 != ''){
        message += str2;
      }
      else{
        message += "분개화면";
      }
      message += " 조회 가능";
    }
    return message;
}

/*----------------------------------------------*/
/* @기능 : ScriptX Object를 display하는 함수    */
/*----------------------------------------------*/
function displayScriptX()
{
    document.write("<object id='factory' viewastext style='display:none' classid='clsid:1663ed61-23eb-11d2-b92f-008048fdd814'"
                   +" codebase='/kpi/module/ScriptX.cab#Version=6,1,429,14'></object>");
}

/*----------------------------------------------*/
/* @기능 : main화면 크기 변동 시 Grid 의 크기를 자동 조정하는 함수    */
/*----------------------------------------------*/
window.onresize = function () {
	var iDocWidth = document.body.clientWidth;
	try{
    mySheet.SheetWidth  = 790 - (816 - iDocWidth);
	  mySheet1.SheetWidth = 790 - (816 - iDocWidth);
	}
	catch(e){
	}
}

/*----------------------------------------------*/
/* @기능 : 성과주기코드에 대한 명을 반환        */
/*----------------------------------------------*/
function getPeriodname(priod){
	var periodname = '';
	switch(priod)
	{
    case "1":
        periodname = '월';
        break;
		case '3':
			periodname = '반기';
			break;
		case '4':
			periodname = '년';
			break;
	}
	return periodname;
}

/*----------------------------------------------*/
/* @기능 : 각 보고서 화면에서 'ENTER'시 조회 수행 */
/*----------------------------------------------*/
function doEnterClick() {
	if(modal.style.display == "block") return false;
	if(modalOpt.style.display == "block") return false;
	if($(".jconfirm").is(":visible")) {
		$(".jconfirm").hide();
		return false;
	}
	
	
	var ieKey = window.event.keyCode;
	if(ieKey == 8) return false;
	
  	if(window.event.srcElement.type != "button") {
    	var ieKey = window.event.keyCode;
    	if (ieKey == 13 ) {
      		doAction("조회");
    	}
  	}
}


/*----------------------------------------------*/
/* @기능 :                                      */
/*----------------------------------------------*/
function initObject()
{
    document.write("<OBJECT ID='AIScriptGen' CLASSID='CLSID:D3B5B212-CE4B-4D52-B2CF-B329C467CD08'  CODEBASE='http://"+location.host+"/kpi/AIReportCS/AIScriptGen.cab#Version=1,0,0,6' WIDTH='0' HEIGHT='0'>");
    document.write("</OBJECT>");
//  document.write("<OBJECT ID='mySheet' CLASSID='CLSID:C838E9DA-1625-4E14-8B37-C6706B43C423' CODEBASE='http://"+location.host+"/kpi/sheet/IBSheet.CAB#version=1,9,0,2'>");
    document.write("<OBJECT ID='mySheet' CLASSID='CLSID:341FBC5F-2AE4-41B8-BFE5-A03170569A27' CODEBASE='http://"+location.host+"/kpi/sheet/IBSheet3.CAB#version=3,4,0,50'>");
    document.write("    <param name='Visible' value='false'>");
    document.write("    <param name='ConfigXml' value='sheet/IBSheet_design.xml'>");
    document.write("</OBJECT>");
}

	var now = new Date(); 
	var year  = now.getFullYear();
	var month = ("00" + (now.getMonth()+1).toString()).slice(-2);
	var date  = ("00" + now.getDate().toString()).slice(-2);
	var hour  = ("00" + now.getHours().toString()).slice(-2);
	var minutes = ("00" + now.getMinutes().toString()).slice(-2);
	var seconds = ("00" + now.getSeconds().toString()).slice(-2);
	var milliseconds = ("00" + now.getMilliseconds().toString()).slice(-3);
	var Exname = "Excel_" + year + month + date + hour + minutes + seconds + milliseconds;

/*----------------------------------------------*/
/* @기능 : 요청된 type 에따라 기본 포멧에 따른
           excel 변환
   @obj     : excel 변화하고자 하는 GRID
   @inqText : excel header 부 정보
   @type    : Down2Excel 사용여부 if == true then 사용
                                  else Down2Excel 사용
/*----------------------------------------------*/
function doExcel(obj, inqText, type)
{
  	//rows = obj.Rows - obj.RowCount;
	var tmpUnitText = "";
	var tmpNumberTypeToText = 0;
/*	var now = new Date(); 
	var year  = now.getFullYear();
	var month = ("00" + (now.getMonth()+1).toString()).slice(-2);
	var date  = ("00" + now.getDate().toString()).slice(-2);
	var hour  = ("00" + now.getHours().toString()).slice(-2);
	var minutes = ("00" + now.getMinutes().toString()).slice(-2);
	var seconds = ("00" + now.getSeconds().toString()).slice(-2);
	var milliseconds = ("00" + now.getMilliseconds().toString()).slice(-3);
	var Exname = "Excel_" + year + month + date + hour + minutes + seconds + milliseconds;*/
	
	if(strUnitText != "") {
		tmpUnitText = "단위 / " + strUnitText;
	}
	
	if(htm_title == "마진율추이표") {
		tmpNumberTypeToText = 1;
	}
	
  	//if(rows > 1){ //header 2 row 이상인 경우 팝업
	if(obj.HeaderRows() > 1) {
		//popup
		if (document.frm_optLayer.hdnExcelOpt.value != "") {
			retVal = document.frm_optLayer.hdnExcelOpt.value;
		} else {
	    	retVal = ln_Excel_file();
		}
	    
	    if(retVal == '1'){
	      	//rExcVal = obj.Down2Excel(type, false, false, ""      , EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, obj.UnitText, inqText));
		  	rExcVal = obj.Down2Excel({FileName:Exname + ".xlsx", "KeyFieldMark":false, DownCols:getExcelDownCol(obj), NumberTypeToText : tmpNumberTypeToText, HiddenColumn:1, SheetDesign:1, NumberExMode:1, NumberFormatMode:1, WordWrap:1, ReportXMLURL :EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, tmpUnitText, inqText)});
	    }
	    else if(retVal == '2'){
	      	//rExcVal = obj.Down2Excel     (type, false, false, true, "", EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, obj.UnitText, inqText));
		  	rExcVal = obj.Down2Excel({FileName:Exname + ".xlsx", "KeyFieldMark":false, DownCols:getExcelDownCol(obj), NumberTypeToText : tmpNumberTypeToText, HiddenColumn:1, SheetDesign:1, NumberExMode:1, NumberFormatMode:1, WordWrap:1, Merge:1, ReportXMLURL :EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, tmpUnitText, inqText)});
	    }
	    else{
	      	return;
	    }
	
		document.frm_optLayer.hdnExcelOpt.value = ""; //초기화
	}
	else
	{
    	//rExcVal = obj.Down2Excel(type, false, false, ""      , EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, obj.UnitText, inqText));
		rExcVal = obj.Down2Excel({FileName:Exname + ".xlsx", "KeyFieldMark":false, DownCols:getExcelDownCol(obj), NumberTypeToText : tmpNumberTypeToText, HiddenColumn:1, SheetDesign:1, NumberExMode:1, NumberFormatMode:1, WordWrap:1, Merge:1, ReportXMLURL :EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, tmpUnitText, inqText)});
	}
  
	return rExcVal;
}

//미사용
function doExcel2(obj, inqText, type, ColumnSkipList)
{
  //rows = obj.Rows - obj.RowCount;
	var tmpUnitText = "";
	
	if(strUnitText != "") {
		tmpUnitText = "단위 / " + strUnitText;
	}
	
	
  //if(rows > 1){ //header 2 row 이상인 경우 팝업
  	if(obj.HeaderRows() > 1) {
    //alert(retVal);
    //popup
    	retVal = ln_Excel_file(); 
    
    	if(retVal == '1'){
      	//rExcVal = obj.Down2Excel(type, false, false, ""      , EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, obj.UnitText, inqText), false, false, "", false, ColumnSkipList);
			rExcVal = obj.Down2Excel({DownCols:getExcelDownCol(obj), HiddenColumn:1, SheetDesign:1, ReportXMLURL :EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, tmpUnitText, inqText)});
    	}
    	else if(retVal == '2'){
      		//rExcVal = obj.Down2Excel     (type, false, false, true, "", EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, obj.UnitText, inqText), false, false, "", false, ColumnSkipList);
			rExcVal = obj.Down2Excel({DownCols:getExcelDownCol(obj), HiddenColumn:1, SheetDesign:1, Merge:1, ReportXMLURL :EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, tmpUnitText, inqText)});
    	}
    	else{
      		return;
    	}
	}
	else{
		//rExcVal = obj.Down2Excel(type, false, false, ""      , EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, obj.UnitText, inqText), false, false, "", false, ColumnSkipList);
		rExcVal = obj.Down2Excel({DownCols:getExcelDownCol(obj), HiddenColumn:1, SheetDesign:1, Merge:1, ReportXMLURL :EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, tmpUnitText, inqText)});
	}

 	 return rExcVal;
}

//미사용
function doExcel3(obj, inqText, type, chkSheet)
{
  	var tmpUnitText = "";
	
	if(strUnitText != "") {
		tmpUnitText = "단위 / " + strUnitText;
	}
	
  	rExcVal = obj.Down2Excel(type, chkSheet, false, true, "", EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, tmpUnitText, inqText));
  	return rExcVal;
}
/*----------------------------------------------*/
/* @기능 : 요청된 type 에따라 기본 포멧에 따른
           excel 변환
   @obj     : excel 변화하고자 하는 GRID
   @inqText : excel header 부 정보
   @type    : Down2Excel 사용여부 if == true then 사용
                                  else Down2Excel 사용
   패스워드 입력 추가용
/*----------------------------------------------*/
function doExcelPW(obj, inqText, type)
{
	if (!window.showModalDialog) {
		if(stepFlag == 1) tmpRtnVal = "";
		
		retVal = doExcelPW_CHROME(obj, inqText, type);
	} else {
		retVal = doExcelPW_IE(obj, inqText, type);
	}
	
	return retVal;
}


function doExcelPW_CHROME(obj, inqText, type) {
	
	if(stepFlag == 1) {
		if (modal.style.display == "none") document.frm_pwLayer.iLayer_excelPW.value = "";
	   	
		modal.style.display = "block";
		document.frm_pwLayer.iLayer_excelPW.focus();
		            	
		//retVal = document.frm_pwLayer.iLayer_excelPW.value;
		retVal = tmpRtnVal;
		
		
		if (retVal == '') { return; } // 값 없을때 뜨루패스
	  	if (typeof retVal == 'undefined') { return; } // 닫기 선택시 종료
	 
	  	if (retVal == "") {
	     	alert("비밀번호를 입력하시지 않았습니다");
	  	}

		return;
	} else {
		retVal = tmpRtnVal;
		
		var tmpUnitText = "";
	
		if(strUnitText != "") {
			tmpUnitText = "단위 / " + strUnitText;
		}
		
		if(obj.HeaderRows() > 1) {
	    	//popup
	    	if (document.frm_optLayer.hdnExcelOpt.value != "") {
				retVal1 = document.frm_optLayer.hdnExcelOpt.value;
			} else {
		    	retVal1 = ln_Excel_file();
			}
	
	    	if(retVal1 == '1'){
	      		//rExcVal = obj.Down2Excel(type, false, false, ""      , EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, obj.UnitText, inqText));
			    obj.Down2Excel({FileName:Exname + ".xlsx", "KeyFieldMark":false, DownCols:getExcelDownCol(obj), HiddenColumn:1, SheetDesign:1, WorkbookPassword:retVal, ReportXMLURL :EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, tmpUnitText, inqText)});	
			}
	    	else if(retVal1 == '2'){
	      		//rExcVal = obj.Down2Excel     (type, false, false, true, "", EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, obj.UnitText, inqText));
				obj.Down2Excel({FileName:Exname + ".xlsx", "KeyFieldMark":false, DownCols:getExcelDownCol(obj), HiddenColumn:1, SheetDesign:1, Merge:1, WorkbookPassword:retVal, ReportXMLURL :EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, tmpUnitText, inqText)});
	    	}
	    	else{
	      		return;
	    	}
	
			document.frm_optLayer.hdnExcelOpt.value = ""; //초기화
	  	}
	  	else{
	    	//rExcVal = obj.Down2Excel(type, false, false, ""      , EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, obj.UnitText, inqText));
			obj.Down2Excel({FileName:Exname + ".xlsx", "KeyFieldMark":false, DownCols:getExcelDownCol(obj), HiddenColumn:1, SheetDesign:1, Merge:1, WorkbookPassword:retVal, ReportXMLURL :EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, tmpUnitText, inqText)});
	  	}

		if(stepFlag == 2) {
			stepFlag = 1;
			tmpRtnVal = "";	
		}
		
	  	return rExcVal;
	}
	
}

function doExcelPW_IE(obj, inqText, type) {
	retVal=ln_ExcelPW();
	
	if (retVal == '') { return; } // 값 없을때 뜨루패스
  	if (typeof retVal == 'undefined') { return; } // 닫기 선택시 종료
 
  	if (retVal != "") {
     	obj.ExcelDownloadPassword = retVal; 
  	}
  	else {
     	alert("비밀번호를 입력하시지 않았습니다");
     	return;
  	}

	var tmpUnitText = "";
	
	if(strUnitText != "") {
		tmpUnitText = "단위 / " + strUnitText;
	}
	
	if(obj.HeaderRows() > 1) {
		
    	//popup
    	if (document.frm_optLayer.hdnExcelOpt.value != "") {
			retVal1 = document.frm_optLayer.hdnExcelOpt.value;
		} else {
	    	retVal1 = ln_Excel_file();
		}

    	if(retVal1 == '1'){
      		//rExcVal = obj.Down2Excel(type, false, false, ""      , EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, obj.UnitText, inqText));
		    rExcVal1 = obj.Down2Excel({FileName:Exname + ".xlsx", "KeyFieldMark":false, DownCols:getExcelDownCol(obj), HiddenColumn:1, SheetDesign:1, WorkbookPassword:retVal, ReportXMLURL :EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, tmpUnitText, inqText)});	
		}
    	else if(retVal1 == '2'){
      		//rExcVal = obj.Down2Excel     (type, false, false, true, "", EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, obj.UnitText, inqText));
			rExcVal1 = obj.Down2Excel({FileName:Exname + ".xlsx", "KeyFieldMark":false, DownCols:getExcelDownCol(obj), HiddenColumn:1, SheetDesign:1, Merge:1, WorkbookPassword:retVal, ReportXMLURL :EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, tmpUnitText, inqText)});
    	}
    	else{
      		return;
    	}

		document.frm_optLayer.hdnExcelOpt.value = ""; //초기화
  	}
  	else{
    	//rExcVal = obj.Down2Excel(type, false, false, ""      , EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, obj.UnitText, inqText));
		rExcVal = obj.Down2Excel({FileName:Exname + ".xlsx", "KeyFieldMark":false, DownCols:getExcelDownCol(obj), HiddenColumn:1, SheetDesign:1, Merge:1, WorkbookPassword:retVal, ReportXMLURL :EXCEL_DOWN_ATTR_JSP + genExcelParam(obj, 1, htm_title, tmpUnitText, inqText)});
  	}
	
  	return rExcVal;
}

// excel 선택 popup
function ln_Excel_file()
{
	//스피드 or 일반모드 선택
	if (!window.showModalDialog) {

		document.frm_optLayer.exceltype[0].checked = true;
    	modalOpt.style.display = "block";
    	retVal = document.frm_optLayer.hdnExcelOpt.value;

    } else {
		var g_RetVal;
	  	var g_PrmVal;
	  	var g_PrmVal = "" + "|" + "";
    	modeless = window.showModalDialog("/kpi/module/p_Excel.html",
                                   g_PrmVal,
                                   "unadorned:off;help:off; dialogHide:off;resizable:off;status:off;scroll:no;dialogWidth:253px; dialogHeight:205px;");
  		return modeless;
    }
}

// excel 비밀번호 입력 popup
function ln_ExcelPW()
{
  	if (!window.showModalDialog) {
		if (modal.style.display == "") document.frm_pwLayer.iLayer_excelPW.value = "";
           	
        modal.style.display = "block";
        document.frm_pwLayer.iLayer_excelPW.focus();
            	            	
        retVal = document.frm_pwLayer.iLayer_excelPW.value;

		if (retVal == '') { return; } // 값 없을때 뜨루패스
		if (typeof retVal == 'undefined') { return; } // 닫기 선택시 종료
		            
		if (retVal == "") {                                                                                                                    
			alert("비밀번호를 입력하시지 않았습니다");                                                                                          
		    return;                                                                                                                             
		}
		
	} else {
		var g_PrmVal = "" + "|" + "";
	  	modeless = window.showModalDialog("/kpi/module/p_ExcelPW.html",
	                                   g_PrmVal,
	                                   "unadorned:off;help:off; dialogHide:off;resizable:off;status:off;scroll:no;dialogWidth:253px; dialogHeight:135px;");
	  	return modeless;
	}
}

/*----------------------------------------------*/
/* @기능 : 추이표에서 사용하는 헤더생성         */
/*----------------------------------------------*/
function makeHeader(basemonth){
	var Head = "";
	if(basemonth == "") {
		Head = "|||||||||||";
		
	} else {

	  	var year  = basemonth.substring(2,4)*1;
	  	var month = basemonth.substring(4,6)*1;
	  	var Head  = "";
	  
		if(year  < 10) year="0"+year;
	  	if(month < 10) Head = year+"년 0"+month+"월";
	  	else           Head = year+"년 "+month+"월";
	  
		for(i=1;i<12;i++){
	      	month--;
	      	if(month < 1){
	           	year  = year-1;
	          	month = 12;
	      	}
	      		if(year  < 10) year="0"+year*1;
	      		if(month < 10) Head=year+'년 0'+month+"월|"+Head;
	      		else           Head=year+'년 '+month+"월|"+Head;
	  		}
	}

  	return Head;
}

/*----------------------------------------------*/
/* @기능 : 추이표에서 사용하는 헤더생성         */
/*----------------------------------------------*/
function dispalyCloseBtn(){
  
  document.write("  </td>");
  document.write("  <td width='7'></td>");
  document.write("</tr>");
  document.write("<tr>");
  document.write("  <td valign='bottom' colspan='3' height='30' class='borT'>");
  document.write("    <table width='100%' border='0' cellspacing='0' cellpadding='0' class='pdLR mgT5'>");
  document.write("      <tr>");
  document.write("        <td class='al_L pdL10'><img src='img/ft_logo.png'></td>");    
  document.write("        <td class='al_R pdR7'><span class='btn_Grd' style='cursor:pointer' border='0' onclick='javascript:window.close();'>닫기</span>");
  document.write("      </tr>");
  document.write("    </table>");  
}

/*-----------------------------------------*/
/* @기능 : 그리드의 전체 데이타값 지움     */
/*-----------------------------------------*/
function allDelDataGrid(targetGrid)
{
  targetGrid.RemoveAll();
} 


/*-----------------------------------------*/
/* @기능 : 보고서 조회     */
/*-----------------------------------------*/
DEV_SERVER_IP = "138.240.38.38";
REPORT_CRF_URL_PRE = "";
REPORT_VIEWER = "http://nkpi.suhyup.co.kr:60061/ClipReport4";	//보고서 viewer 운영

REPORT_CRF_URL_PRE_LOCAL = "";			//보고서파일(crf) 위치하는 서버
REPORT_VIEWER_DEV = "http://138.240.38.38:60080/ClipReport4";	//보고서 viewer

function report_view(crfPath, crfFile, data) {
	
	var sysFlag = "";
	
	if(document.location.host.indexOf("localhost") > -1) {
		REPORT_VIEWER = REPORT_VIEWER_DEV;
		REPORT_CRF_URL_PRE = REPORT_CRF_URL_PRE_LOCAL; 
		
		sysFlag = "local"
	} else if(  document.location.host.indexOf("test") > -1
			 || document.location.host.indexOf(DEV_SERVER_IP) > -1	
	         ) {
		REPORT_VIEWER = REPORT_VIEWER_DEV;
		REPORT_CRF_URL_PRE = REPORT_CRF_URL_PRE_LOCAL;
		sysFlag = "dev"
	}
	
	if(sysFlag != "") console.log(sysFlag);
	
	var winName = "rpViewerWinNew";
	var winURL = REPORT_VIEWER + crfPath;
	var windowoption ="resizable=yes, height=1000, width=1200, location=0, menubar=0, scrollbars=1";
	
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", winURL);
	form.setAttribute("target", winName);
	
	var input = document.createElement("input"); 
	input.type = "hidden";
	input.name = "url";
	input.value = REPORT_CRF_URL_PRE + crfFile;
	form.appendChild(input);
	
	var input1 = document.createElement("input");
	input1.type = "hidden";
	input1.name = "data";
	input1.value = data;
	form.appendChild(input1);
	
	document.body.appendChild(form);
	window.open('', winName, windowoption);
	form.target = winName;
	form.submit();
	document.body.removeChild(form);
}


/*-----------------------------------------*/
/* @기능 : iframe 스냅샷리포트 뷰어     */
/*-----------------------------------------*/
function report_viewFrame(crfPath, crfFile, ifObj) {
	
	var sysFlag = "";
	
	if(document.location.host.indexOf("localhost") > -1) {
		REPORT_VIEWER = REPORT_VIEWER_DEV;
		REPORT_CRF_URL_PRE = REPORT_CRF_URL_PRE_LOCAL; 
		
		sysFlag = "local"
	} else if(  document.location.host.indexOf("test") > -1
			 || document.location.host.indexOf(DEV_SERVER_IP) > -1	
	         ) {
		REPORT_VIEWER = REPORT_VIEWER_DEV;
		sysFlag = "dev"
	}
	
	if(sysFlag != "") console.log(sysFlag);
	
	var ifr = document.getElementById(ifObj);
	var winURL = REPORT_VIEWER + crfPath;
	
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", winURL);
	form.setAttribute("target", ifr.name);
	
	var input = document.createElement("input"); 
	input.type = "hidden";
	input.name = "url";
	input.value = REPORT_CRF_URL_PRE + crfFile;
	form.appendChild(input);
	
	var input1 = document.createElement("input");
	input1.type = "hidden";
	input1.name = "data";
	input1.value = "";
	form.appendChild(input1);
	
	document.body.appendChild(form);
	form.target = ifr.name;
	
	form.submit();
	document.body.removeChild(form);
}


/*-----------------------------------------*/
/* @기능 : 건수 보이는 곳에 UnitText 보여주기     */
/*-----------------------------------------*/
function showUnitText(str) {
	
	if(typeof(str) !== "undefined") {
		strUnitText = str;
	}
	
	if(strUnitText != "") {
		$('.GMCountRowTop .GMAlignRight > div').html('단위 / ' + strUnitText);
	}
}

/*-----------------------------------------*/
/* @기능 : 건수 보이는 곳에 UnitText 보여주기  및 셀고정해제 시 Display 제어   */
/*-----------------------------------------*/
function ufSetMergeCell(sheetObj, startRow, startCol, endRow, endCol) {
	showUnitText();
	
	if(  typeof(sheetObj) !== "undefined" 
	  && typeof(startRow) !== "undefined"
	  && typeof(startCol) !== "undefined"
	  && typeof(endRow) !== "undefined"
	  && typeof(endCol) !== "undefined") {
		//sheetObj.SetCellAlign(sheetObj.LastRow(),0,"Center");
		sheetObj.SetMergeCell(startRow, startCol, endRow, endCol);
	}
}


function showUnitTextEvent(str, sheetObj, totPosition, frozenRightCol) {
	if(str != "") {
		showUnitText(str);
	}
	
	if(  typeof(sheetObj) !== "undefined" 
	  && typeof(totPosition) !== "undefined"
	  && typeof(frozenRightCol) !== "undefined") {
		sheetObj.SetMergeCell(sheetObj.HeaderRows(), totPosition, 1, frozenRightCol);
	}
}




/*-----------------------------------------*/
/* @기능 : 메세지 종류, 브라우져별 메시지 출력   */
/*-----------------------------------------*/
function showMsg(code, msg) {
	
	//alert("common : code [" + code + "], msg : [" + msg + "]");  
	
	if(broswerObj == "") {
		setBroswerObj();
	}
	
	if(msg != null && msg != "") {
		 
		if(msg.toString().indexOf("@")>=0) {
			var tmpMsg = msg.substring(msg.toString().indexOf("@")+1, msg.length);
			
			if(code != "0") {
				if(broswerObj == "IE")			 	
	                window.status = tmpMsg
				else 
					alert(tmpMsg)
			}
        } else {
			if(code != "0" || msg != "0") alert(msg);
		}
    	
    }

	if(msg == "세션이 없습니다 다시 로그인 하세요") {
		setTimeout(function() { 
			
			if(window.parent!=null){
		        window.top.location="ssologinMess.htm";
		    }
		    if(window.opener==null || window.opener==""){ 
		        window.top.location="ssologinMess.htm";
		    }else{ 
		        window.opener.top.location="ssologinMess.htm";
		        window.close();
		    }	
			
		}, 1000);
	}
}

/*-----------------------------------------*/
/* @기능 : 전역변수에  브라우저 종류 셋팅   */
/*-----------------------------------------*/
function setBroswerObj() {
	if(navigator.userAgent.indexOf("Trident") != -1) {
		broswerObj = "IE";
	} else if(navigator.vendor == "Firefox") {
		broswerObj = "FF";
	} else if(navigator.vendor == "Google Inc.") {
		broswerObj = "CR";
	}	
}

/*-----------------------------------------*/
/* @기능 : 자기창 닫기     */
/*-----------------------------------------*/
function ComClosePopup() {
	self.close();
}

/*-----------------------------------------*/
/* @기능 : 페이징 바 만들기 닫기 doPage 함수는 기존 화면의 함수 사용     */
/*-----------------------------------------*/
//function makePaging(obj, pageNo, pagecountObj) {
function makePaging(tCnt, pageNo, pagecountObj) {
		if(pageNo <= 0) pageNo = 1; 
    	
    	//var totalCnt = parseInt(obj.GetCellValue(1, 0));
		var totalCnt = parseInt(tCnt);
    	var dataSize = 10;
    	var pageSize = 30;
    	
    	pagecountObj.innerHTML="";
    	
    	if(totalCnt <= 0) return;
    	
    	var pageCnt = totalCnt % dataSize;
    	
    	if(pageCnt == 0) {
    		pageCnt = parseInt(totalCnt / dataSize);
    	} else {
    		pageCnt = parseInt(totalCnt / dataSize) + 1;
    	}
    	
    	var pRcnt = parseInt(pageNo/pageSize);
    	if(pageNo % pageSize == 0) {
    		pRcnt = parseInt(pageNo/pageSize) - 1;
    	} 
    	
    	//이전
    	if(pageNo > pageSize) {
    		var s2;
    		if(pageNo % pageSize == 0) {
    			s2 = pageNo - pageSize;
    		} else {
    			s2 = pageNo - pageNo % pageSize;
    		}
    		
    		pagecountObj.innerHTML  += " <a href=\"javascript:doPage('"+s2+"');\"><<</a> ";
    	}
    	
    	// paging bar
    	for(var i = pRcnt * pageSize + 1; i < (pRcnt +1) * pageSize + 1; i++) {
    		if(i==pageNo) {
    			pagecountObj.innerHTML += "[<strong>" + i + "</strong>]"; 
    		} else {
    			pagecountObj.innerHTML += "[<a href=\"javascript:doPage('"+i+"');\">"+i+"</a>]";
    		}
    		
    		if(i == pageCnt) break;
    	}
    	
    	// 다음
    	if(pageCnt > (pRcnt + 1) * pageSize) {
    		pagecountObj.innerHTML  += " <a href=\"javascript:doPage('"+ ((pRcnt + 1) * pageSize + 1) +"');\">>></a> ";
    	} 
    	
    }

/*-----------------------------------------*/
/* @기능 : 비빌번호 문자숫자 여부 체크
/*-----------------------------------------*/
    function ContainsChars(obj,chars) {
        for (var inx = 0; inx < obj.length; inx++) {
           if (chars.indexOf(obj.charAt(inx)) != -1)
               return true;
        }
        return false;
    }

/*-----------------------------------------*/
/* @기능 : 비밀번호 유효체크 onBlur
/*-----------------------------------------*/
    function fnValidChk(obj) {
    	if (obj == "") return;
    
    	if (obj.length < 9){
    		alert('비밀번호 자릿수는 9 이상이어야 합니다.');
    		return false;
    	}
    
      var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@#$%^&*()+|\=-`;:/<>{}[]?.";
      if (!ContainsChars(obj,chars)) {
    	  alert('비밀번호는 영문,숫자,특수문자가 조합되어야 합니다.');
    		return false;
    	}

      var chars = "0123456789"
      if (!ContainsChars(obj,chars)) {
    	  alert('비밀번호는 영문,숫자,특수문자가 조합되어야 합니다.');
    		return false;
    	}

      var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if (!ContainsChars(obj,chars)) {
    	  alert('비밀번호는 영문,숫자,특수문자가 조합되어야 합니다.');
    		return false;
    	}

      var chars = "~!@#$%^&*()+|\=-`;:/<>{}[]?."
      if (!ContainsChars(obj,chars)) {
    	  alert('비밀번호는 영문,숫자,특수문자가 조합되어야 합니다.');
    		return false;
    	}
        
    	return true;
    }

/*-----------------------------------------*/
/* @기능 : obj(Sheet)의 기본 높이 구하기
/*-----------------------------------------*/
function getDefaultHeight(obj, mArea) {
	var defaultArea = 40;
	if(broswerObj == "") {
		setBroswerObj();
	}
	if(broswerObj == "IE")  defaultArea +=10;
	if(typeof(mArea) !== "undefined") defaultArea += mArea;
	var finalHeight = window.innerHeight - obj.offset().top - defaultArea;
	return (finalHeight <= 560 ? 560 :finalHeight) + "px";
}

/*-----------------------------------------*/
/* @기능 : obj(Sheet)의 기본 넓이 구하기
/*-----------------------------------------*/
function getDefaultWidth(obj, mArea) {
	var defaultArea = 30;
	if(broswerObj == "") {
		setBroswerObj();
	}
	if(broswerObj == "IE")  defaultArea +=10;
	if(typeof(mArea) !== "undefined") defaultArea += mArea;
	var finalWidth = window.innerWidth - obj.offset().left - defaultArea;
	return (finalWidth <= 1440 ? 1440 :finalWidth)  + "px";
	//return finalWidth + "px";
}

/*-----------------------------------------*/
/* @기능 : obj(Sheet)의 서브메뉴 이미지 넣기
/*-----------------------------------------*/
function newSetActionMenu(obj, str) {
	
	var arrStr = str.split("|");
	var Menu = [];
	var strContextMenu = "";
	
	arrStr.forEach(function(item) {
		if (item == "저장") {
			strContextMenu = {Text: item, Code: item, Icon: "/kpi/img/ico_action_save.png"};
		} else if (item == "삽입") {
			strContextMenu = {Text: item, Code: item, Icon: "/kpi/img/ico_action_ins.png"};
		} else if (item == "복사") {
			strContextMenu = {Text: item, Code: item, Icon: "/kpi/img/ico_action_copy.png"};
		} else if (item == "삭제") {
			strContextMenu = {Text: item, Code: item, Icon: "/kpi/img/ico_action_del.png"};
		} else if (item == "엑셀내려받기") {
			strContextMenu = {Text: item, Code: item, Icon: "/kpi/img/ico_action_excel.png"};
		} else if (item == "엑셀전환") {
			strContextMenu = {Text: item, Code: item, Icon: "/kpi/img/ico_action_excel.png"};
		} else if (item.indexOf("조회") > -1) {
			strContextMenu = {Text: item, Code: item, Icon: "/kpi/img/ico_action_search.png"};
		} else {
			strContextMenu = {Text: item, Code: item};
		}
			
		Menu.push ( strContextMenu );
	});
	
	Menu.push( {Text: "*-", Code: "*-"} );
	Menu.push( {Text: "고정필드설정", Code: "고정필드설정", Icon: "/kpi/img/ico_action_fix.png"} );
	Menu.push( {Text: "고정필드해제", Code: "고정필드해제", Icon: "/kpi/img/ico_action_unfix.png"} );

	obj.SetActionMenu(Menu);
	//obj.SetActionMenu(str + "|*-|고정필드설정|고정필드해제");
}

/*-----------------------------------------*/
/* @기능 : 브라우저 url 에서 파라메터 값 얻기 oyj
/*-----------------------------------------*/
function getUrlParameter(sParam) {
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	var sParameterName;
	var i;
	
	for (i =0 ; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');
		
		if(sParameterName[0] == sParam) {
			return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
		}
	}
	return false;
}

/*-----------------------------------------*/
/* @기능 : obj의 limit 글자수 제한(영문1, 한글2자리 처리)
/*-----------------------------------------*/
function fn_checkByte(obj, limit, objNm) {
	const maxByte = limit;
	const text_val = obj.value;
	const text_len = text_val.length;
	var rlen = 0;
	
	let totalByte = 0;
	for(let i=0; i<text_len; i++) {
		const each_char = text_val.charAt(i);
		const uni_char = escape(each_char);
		
		if(uni_char.length > 4) {
			totalByte += 2;
		}  else {
			totalByte += 1;
		}
		
		if(totalByte <= maxByte) {
			rLen = i+1;
		}
	}
	
	if(totalByte > maxByte) {
		
		if(objNm !== "undefined") {
			alert(objNm + "이(가) 길이 " + limit + "자를 초과하여 입력할수 없습니다.");
		}
		
		var subStrText = text_val.substr(0, rLen);
		obj.value = subStrText;
	}	
}


function alert(msg) {

	var tmpMsg = "";
	
	if(msg.indexOf("tpms.framework.component.dao.DAOException") == 0) {	
		tmpMsg = "해당 자료가 존재하지 않습니다.";
	} else {
		tmpMsg = msg.toString().replace(/\n/gi, "<BR>");
		
	}
	
	$.alert({
		title:'성과관리시스템',
		content:tmpMsg,
	});
}
