// CONSTRUCTOR for the CalendarPopup Object
var isCalAllLink = true;   // 2005.11.28/문기철
                           // true : weekend도 모두 hyperlink처리
                           // false: weekend는 hyperlink 제거
                           
function CalendarPopup() {
	var c;
	if (arguments.length>0) {
		c = new PopupWindow(arguments[0]);
		}
	else {
		c = new PopupWindow();
		c.setSize(190,157);
		}
	c.offsetX = -152;
	c.offsetY = 25;
	c.autoHide();
	// Calendar-specific properties
	c.monthNames = new Array("1","2","3","4","5","6","7","8","9","10","11","12");
	c.monthAbbreviations = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
	c.dayHeaders = new Array("일","월","화","수","목","금","토");
	c.returnFunction = "CalendarPopup_tmpReturnFunction";
	c.returnMonthFunction = "CalendarPopup_tmpReturnMonthFunction";
	c.returnQuarterFunction = "CalendarPopup_tmpReturnQuarterFunction";
	c.returnYearFunction = "CalendarPopup_tmpReturnYearFunction";
	c.weekStartDay = 0;
	c.isShowYearNavigation = false;
	c.displayType = "date";
	c.disabledWeekDays = new Object();
	c.yearSelectStartOffset = 2;
	c.currentDate = null;
	c.todayText="Today";
	window.CalendarPopup_targetInput = null;
	window.CalendarPopup_dateFormat = "yyyy-mm-dd";
	// Method mappings
	c.setReturnFunction = CalendarPopup_setReturnFunction;
	c.setReturnMonthFunction = CalendarPopup_setReturnMonthFunction;
	c.setReturnQuarterFunction = CalendarPopup_setReturnQuarterFunction;
	c.setReturnYearFunction = CalendarPopup_setReturnYearFunction;
	c.setMonthNames = CalendarPopup_setMonthNames;
	c.setMonthAbbreviations = CalendarPopup_setMonthAbbreviations;
	c.setDayHeaders = CalendarPopup_setDayHeaders;
	c.setWeekStartDay = CalendarPopup_setWeekStartDay;
	c.setDisplayType = CalendarPopup_setDisplayType;
	c.setDisabledWeekDays = CalendarPopup_setDisabledWeekDays;
	c.setYearSelectStartOffset = CalendarPopup_setYearSelectStartOffset;
	c.setTodayText = CalendarPopup_setTodayText;
	c.ShowYearNavigation = CalendarPopup_showYearNavigation;
	c.showCalendar = CalendarPopup_showCalendar;
	c.hideCalendar = CalendarPopup_hideCalendar;
	c.getStyles = CalendarPopup_getStyles;
	c.refreshCalendar = CalendarPopup_refreshCalendar;
	c.getCalendar = CalendarPopup_getCalendar;
	c.Select = CalendarPopup_select;
	// Return the object
	return c;
	}

// Temporary default functions to be called when items clicked, so no error is thrown
function CalendarPopup_tmpReturnFunction(y,m,d) {
    	var now=new Date();
	if (window.CalendarPopup_targetInput!=null) {
		var d = new Date(y,m-1,d,0,0,0);
        if(d > now) 
            alert("오늘 또는 이전의 날자만 선택 가능 합니다" );
        else
		window.CalendarPopup_targetInput.value = formatDate(d,window.CalendarPopup_dateFormat);

        if (window.CalendarPopup_targetInput.name=="bilsu")
        {
            ilsuac();
        }

	} else {
		alert('Use setReturnFunction() to define which function will get the clicked results!');
		}
	}
function CalendarPopup_tmpReturnMonthFunction(y,m) {
	alert('Use setReturnMonthFunction() to define which function will get the clicked results!\nYou clicked: year='+y+' , month='+m);
	}
function CalendarPopup_tmpReturnQuarterFunction(y,q) {
	alert('Use setReturnQuarterFunction() to define which function will get the clicked results!\nYou clicked: year='+y+' , quarter='+q);
	}
function CalendarPopup_tmpReturnYearFunction(y) {
	alert('Use setReturnYearFunction() to define which function will get the clicked results!\nYou clicked: year='+y);
	}

// Set the name of the functions to call to get the clicked item
function CalendarPopup_setReturnFunction(name) { this.returnFunction = name; }
function CalendarPopup_setReturnMonthFunction(name) { this.returnMonthFunction = name; }
function CalendarPopup_setReturnQuarterFunction(name) { this.returnQuarterFunction = name; }
function CalendarPopup_setReturnYearFunction(name) { this.returnYearFunction = name; }

// Over-ride the built-in month names
function CalendarPopup_setMonthNames() {
	for (var i=0; i<arguments.length; i++) { this.monthNames[i] = arguments[i]; }
	}

// Over-ride the built-in month abbreviations
function CalendarPopup_setMonthAbbreviations() {
	for (var i=0; i<arguments.length; i++) { this.monthAbbreviations[i] = arguments[i]; }
	}

// Over-ride the built-in column headers for each day
function CalendarPopup_setDayHeaders() {
	for (var i=0; i<arguments.length; i++) { this.dayHeaders[i] = arguments[i]; }
	}

// Set the day of the week (0-7) that the calendar display starts on
// This is for countries other than the US whose calendar displays start on Monday(1), for example
function CalendarPopup_setWeekStartDay(day) { this.weekStartDay = day; }

// Show next/last year navigation links
function CalendarPopup_showYearNavigation() { this.isShowYearNavigation = true; }

// Which type of calendar to display
function CalendarPopup_setDisplayType(type) {
	if (type!="date"&&type!="week-end"&&type!="month"&&type!="quarter"&&type!="year") { alert("Invalid display type! Must be one of: date,week-end,month,quarter,year"); return false; }
	this.displayType=type;
	}

// How many years back to start by default for year display
function CalendarPopup_setYearSelectStartOffset(num) { this.yearSelectStartOffset=num; }

// Set which weekdays should not be clickable
function CalendarPopup_setDisabledWeekDays() {
	this.disabledWeekDays = new Object();
	for (var i=0; i<arguments.length; i++) { this.disabledWeekDays[arguments[i]] = true; }
	}

// Set the text to use for the "Today" link
function CalendarPopup_setTodayText(text) {
	this.todayText = text;
	}

// Hide a calendar object
function CalendarPopup_hideCalendar() {
	if (arguments.length > 0) { window.popupWindowObjects[arguments[0]].hidePopup(); }
	else { this.hidePopup(); }
	}

// Refresh the contents of the calendar display
function CalendarPopup_refreshCalendar(index) {
	var calObject = window.popupWindowObjects[index];
	if (arguments.length>1) {
		calObject.populate(calObject.getCalendar(arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]));
		}
	else {
		calObject.populate(calObject.getCalendar());
		}
	calObject.refresh();
	}

// Populate the calendar and display it
function CalendarPopup_showCalendar(anchorname) {
	this.populate(this.getCalendar());
	this.showPopup(anchorname);
	}

// Simple method to interface popup calendar with a text-entry box
function CalendarPopup_select(inputobj, linkname, format) {
	if (!window.getDateFromFormat) {
		alert("calendar.select: To use this method you must also include 'date.js' for date formatting");
		return;
		}
	if (this.displayType!="date"&&this.displayType!="week-end") {
		alert("calendar.select: This function can only be used with displayType 'date' or 'week-end'");
		return;
		}
	if (inputobj.type!="text" && inputobj.type!="hidden" && inputobj.type!="textarea") {
		alert("calendar.select: Input object passed is not a valid form input object");
		window.CalendarPopup_targetInput=null;
		return;
		}
	window.CalendarPopup_targetInput = inputobj;
	if (inputobj.value!="") {
		var time = getDateFromFormat(inputobj.value,format);
		if (time==0) { this.currentDate=null; }
		else { this.currentDate=new Date(time); }
		}
	else { this.currentDate=null; }
	window.CalendarPopup_dateFormat = format;
	this.showCalendar(linkname);
	}

// Get style block needed to display the calendar correctly
function CalendarPopup_getStyles() {
	var result = "";
	result += "<STYLE>\n";
	result += 'td {font: 9pt "굴림", "굴림체", "돋움체", "돋움","arial"}\n';
	result += 'A  {font: 9pt "굴림", "굴림체", "돋움체", "돋움","arial";text-decoration: none; color:#000000;}\n';
	result += '.month {font-family: "Tahoma"; font-size: 14pt; line-height: 20pt; color: #000000; font-weight:bold;}\n';
	result += '.year {font-family: "Tahoma"; font-size: 10pt; line-height: 10pt; color: #585858}\n';
	result += "</STYLE>\n";
	return result;
	}

// Return a string containing all the calendar code to be displayed
function CalendarPopup_getCalendar() {
	var now = new Date();
	// Reference to window
	if (this.type == "WINDOW") { var windowref = "window.opener."; }
	else { var windowref = ""; }
	var result = "";
	// If POPUP, write entire HTML document
	if (this.type == "WINDOW") {
		result += "<HTML><HEAD><TITLE>Calendar</TITLE>"+this.getStyles()+"</HEAD>\n";
        result += "<script language='javascript'>";
        result += "function LoadPage(){";
        result += "}";
        result += "</script>";
        result += "<BODY MARGINWIDTH=0 MARGINHEIGHT=0 TOPMARGIN=0 RIGHTMARGIN=0 LEFTMARGIN=0 onload='LoadPage()'>\n";
		result += "<table width='100%' height='100%' border='0' cellpadding='0' cellspacing='0'>\n";
		result += "<tr>\n<td valign='top' background='img/cal_bg.GIF'>\n";
		result += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>\n";
		result += "<tr><td height='5' colspan='2'></td></tr>\n";
		result += "<tr><td width='5'>&nbsp;</td><td>\n";
		result += "<table width='180' border='1' cellspacing='0' cellpadding='3' bgcolor='#FFFFFF' bordercolor='#CCCCCC'><tr><td>\n";
		result += "<TABLE WIDTH=100% BORDER=0 BORDERWIDTH=0 CELLSPACING=0 CELLPADDING=0>\n";
		}
	else {
		result += '<TABLE WIDTH=144 BORDER=1 BORDERWIDTH=1 BORDERCOLOR="#808080" CELLSPACING=0 CELLPADDING=1>\n';
		result += '<TR><TD ALIGN=CENTER>\n';
		}

	// Code for DATE display (default)
	// -------------------------------
	if (this.displayType=="date" || this.displayType=="week-end") {
		if (this.currentDate==null) { this.currentDate = now; }
		if (arguments.length > 0) { var month = arguments[0]; }
			else { var month = this.currentDate.getMonth()+1; }
		if (arguments.length > 1) { var year = arguments[1]; }
			else { var year = this.currentDate.getFullYear(); }
		var daysinmonth= new Array(0,31,28,31,30,31,30,31,31,30,31,30,31);
		if ( ( (year%4 == 0)&&(year%100 != 0) ) || (year%400 == 0) ) {
			daysinmonth[2] = 29;
			}
		var current_month = new Date(year,month-1,1);
		var display_year = year;
		var display_month = month;
		var display_date = 1;
		var weekday= current_month.getDay();
		var offset = 0;
		if (weekday >= this.weekStartDay) {
			offset = weekday - this.weekStartDay;
			}
		else {
			offset = 7-this.weekStartDay+weekday;
			}
		if (offset > 0) {
			display_month--;
			if (display_month < 1) { display_month = 12; display_year--; }
			display_date = daysinmonth[display_month]-offset+1;
			}
		var next_month = month+1;
		var next_month_year = year;
		if (next_month > 12) { next_month=1; next_month_year++; }
		var last_month = month-1;
		var last_month_year = year;
		if (last_month < 1) { last_month=12; last_month_year--; }
		var date_class;
		if (this.type!="WINDOW") {
			result += '<TABLE WIDTH=144 BORDER=0 BORDERWIDTH=0 CELLSPACING=0 CELLPADDING=0>\n';
			}
		result += '<TR>\n';
		var refresh = 'javascript:'+windowref+'CalendarPopup_refreshCalendar';
		if (this.isShowYearNavigation) {
			var td = '<TD height="25" ';
			result += td + ' width="20" align="right"' + ' ><B><A CLASS="cal" HREF="'+refresh+'('+this.index+','+month+','+(year-1)+');"><img src="img/c_5.gif" width="10" height="12" border="0"></A></B></TD>\n';
			result += td + ' width="40" colspan="5" class="year" align="center"' + ' >'+year+'</TD>\n';
			result += td + ' width="10" align="left"' + ' ><B><A CLASS="cal" HREF="'+refresh+'('+this.index+','+month+','+(year+1)+');"><img src="img/c_6.gif" width="10" height="12" border="0"></A></B></TD>\n';
			result += td + ' width="15" >&nbsp;</TD>\n';
			result += td + ' width="10" align="center"' +  ' ><B><A CLASS="cal" HREF="'+refresh+'('+this.index+','+last_month+','+last_month_year+');"><img src="img/c_1.gif" width="10" height="12" border="0"></A></B></TD>\n';
			result += td + ' width="50" class="month" align="center"' +  ' >'+this.monthNames[month-1]+'</TD>\n';
			result += td + ' width="20" colspan="5" align="center"' +  ' ><B><A CLASS="cal" HREF="'+refresh+'('+this.index+','+next_month+','+next_month_year+');"><img src="img/c_2.gif" width="10" height="12" border="0"></A></B></TD>\n';
			}
		else {
			result += '	<TD BGCOLOR="#C0C0C0" CLASS="cal" WIDTH=22 ALIGN=CENTER VALIGN=MIDDLE><B><A CLASS="cal" HREF="'+refresh+'('+this.index+','+last_month+','+last_month_year+');">&lt;&lt;</A></B></TD>\n';
			result += '	<TD BGCOLOR="#C0C0C0" CLASS="cal" WIDTH=100 ALIGN=CENTER>'+this.monthNames[month-1]+' '+year+'</TD>\n';
			result += '	<TD BGCOLOR="#C0C0C0" CLASS="cal" WIDTH=22 ALIGN=CENTER VALIGN=MIDDLE><B><A CLASS="cal" HREF="'+refresh+'('+this.index+','+next_month+','+next_month_year+');">&gt;&gt;</A></B></TD>\n';
			}
		result += '</TR></TABLE>\n';
		result += '<TABLE width="100%" border="0" cellspacing="0" cellpadding="0">\n';
		result += '<TR align="right">\n<td  height="1" colspan="8" bgcolor="95BBC9"></td>\n</tr>\n';
		result += '<TR align="right" bgcolor="E0EBEF" valign="middle">\n';
		var td = '	<TD height="20">';
		for (var j=0; j<7; j++) {
			if (j==0) {
				result += td + '<b><font color="FD5E0A">'+this.dayHeaders[(this.weekStartDay+j)%7]+'</font></b></TD>\n';
			} else if (j==6) {
				result += td + '<b><font color="047DAA">'+this.dayHeaders[(this.weekStartDay+j)%7]+'</font></b></TD>\n';
			} else {
				result += td + '<b><font color="585858">'+this.dayHeaders[(this.weekStartDay+j)%7]+'</font></b></TD>\n';
			}
		}
		result += '<td height="20">&nbsp;</td>\n';
		result += '</TR>\n';
		result += '<TR align="right">\n<td  height="1" colspan="8" bgcolor="95BBC9"></td>\n</tr>\n';
		result += '<TR align="right">\n<td  height="3" colspan="8"></td>\n</tr>\n';
		for (var row=1; row<=5; row++) {
			result += '<TR align="right" height="14">\n';
			for (var col=1; col<=7; col++) {
				if (col==1) {
					dayFont = '<font color="#FD5E0A">';
				} else if (col==7) {
					dayFont = '<font color="#047DAA">';
				} else {
					dayFont = '<font color="000000">';
				}
				if (display_month != month) {
					dayFont = '<font color="808080">';
					}
					var selected_date = display_date;
					var selected_month = display_month;
					var selected_year = display_year;
					if (this.displayType=="week-end") {
						var d = new Date(selected_year,selected_month-1,selected_date,0,0,0,0);
						d.setDate(d.getDate() + (7-col));
						selected_year = d.getYear();
						if (selected_year < 1000) { selected_year += 1900; }
						selected_month = d.getMonth()+1;
						selected_date = d.getDate();
						}
				if ((display_month == this.currentDate.getMonth()+1) && (display_date==this.currentDate.getDate()) && (display_year==this.currentDate.getFullYear())) {
                    if ((dayFont == '<font color="#FD5E0A">' || dayFont == '<font color="#047DAA">') && !isCalAllLink)
                        result += '	<TD class="tahoma">'+dayFont+'<b>'+display_date+'</b></TD>\n';
                    else
                        result += '	<TD class="tahoma"><A HREF="javascript:'+windowref+this.returnFunction+'('+selected_year+','+selected_month+','+selected_date+');'+windowref+'CalendarPopup_hideCalendar(\''+this.index+'\');" CLASS="'+date_class+'">'+dayFont+'<b>'+display_date+'</b></font></A></TD>\n';
				} else {
                    if ((dayFont == '<font color="#FD5E0A">' || dayFont == '<font color="#047DAA">') && !isCalAllLink)
                        result += '	<TD class="tahoma">'+dayFont+'<b>'+display_date+'</b></TD>\n';
                    else
					    result += '	<TD class="tahoma"><A HREF="javascript:'+windowref+this.returnFunction+'('+selected_year+','+selected_month+','+selected_date+');'+windowref+'CalendarPopup_hideCalendar(\''+this.index+'\');" CLASS="'+date_class+'">'+dayFont+display_date+'</font></A></TD>\n';
				}
				display_date++;
				if (display_date > daysinmonth[display_month]) {
					display_date=1;
					display_month++;
					}
				if (display_month > 12) {
					display_month=1;
					display_year++;
					}
				}
			result += '<td width="12" class="tahoma">&nbsp;</td>\n';
			result += '</TR>';
			}
		var current_weekday = now.getDay();
		result += '<TR>\n';
		result += '	<TD height="15" colspan="8" align="right" valign="bottom">\n';
		result += '		<A HREF="javascript:'+windowref+this.returnFunction+'(\''+now.getFullYear()+'\',\''+(now.getMonth()+1)+'\',\''+now.getDate()+'\');'+windowref+'CalendarPopup_hideCalendar(\''+this.index+'\');"><img src="img/today.gif" width="36" height="12" border="0"></A>\n';
        result += ' &nbsp;</TD></TR>\n';
		result += '	</TABLE></CENTER></TD></TR></TABLE>\n';
	}

	// Code common for MONTH, QUARTER, YEAR
	// ------------------------------------
	if (this.displayType=="month" || this.displayType=="quarter" || this.displayType=="year") {
		if (arguments.length > 0) { var year = arguments[0]; }
		else {
			if (this.displayType=="year") {	var year = now.getFullYear()-this.yearSelectStartOffset; }
			else { var year = now.getFullYear(); }
			}
		if (this.displayType!="year" && this.isShowYearNavigation) {
			result += '<TABLE WIDTH=144 BORDER=0 BORDERWIDTH=0 CELLSPACING=0 CELLPADDING=0>\n';
			result += '<TR BGCOLOR="#C0C0C0">\n';
			result += '	<TD BGCOLOR="#C0C0C0" CLASS="cal" WIDTH=22 ALIGN=CENTER VALIGN=MIDDLE><B><A CLASS="cal" HREF="javascript:'+windowref+'CalendarPopup_refreshCalendar('+this.index+','+(year-1)+');">&lt;&lt;</A></B></TD>\n';
			result += '	<TD BGCOLOR="#C0C0C0" CLASS="cal" WIDTH=100 ALIGN=CENTER>'+year+'</TD>\n';
			result += '	<TD BGCOLOR="#C0C0C0" CLASS="cal" WIDTH=22 ALIGN=CENTER VALIGN=MIDDLE><B><A CLASS="cal" HREF="javascript:'+windowref+'CalendarPopup_refreshCalendar('+this.index+','+(year+1)+');">&gt;&gt;</A></B></TD>\n';
			result += '</TR></TABLE>\n';
			}
		}

	// Code for MONTH display (default)
	// -------------------------------
	if (this.displayType=="month") {
		// If POPUP, write entire HTML document
		result += '<TABLE WIDTH=120 BORDER=0 CELLSPACING=1 CELLPADDING=0 ALIGN=CENTER>\n';
		for (var i=0; i<4; i++) {
			result += '<TR>';
			for (var j=0; j<3; j++) {
				var monthindex = ((i*3)+j);
				result += '<TD WIDTH=33% ALIGN=CENTER><A CLASS="textlink" HREF="javascript:'+windowref+this.returnMonthFunction+'('+year+','+(monthindex+1)+');'+windowref+'CalendarPopup_hideCalendar(\''+this.index+'\');" CLASS="'+date_class+'">'+this.monthAbbreviations[monthindex]+'</A></TD>';
				}
			result += '</TR>';
			}
		result += '</TABLE></TD></TR></TABLE>\n';
		}

	// Code for QUARTER display (default)
	// ----------------------------------
	if (this.displayType=="quarter") {
		result += '<BR><TABLE WIDTH=120 BORDER=1 CELLSPACING=0 CELLPADDING=0 ALIGN=CENTER>\n';
		for (var i=0; i<2; i++) {
			result += '<TR>';
			for (var j=0; j<2; j++) {
				var quarter = ((i*2)+j+1);
				result += '<TD WIDTH=50% ALIGN=CENTER><BR><A CLASS="textlink" HREF="javascript:'+windowref+this.returnQuarterFunction+'('+year+','+quarter+');'+windowref+'CalendarPopup_hideCalendar(\''+this.index+'\');" CLASS="'+date_class+'">Q'+quarter+'</A><BR><BR></TD>';
				}
			result += '</TR>';
			}
		result += '</TABLE></TD></TR></TABLE>\n';
		}

	// Code for YEAR display (default)
	// -------------------------------
	if (this.displayType=="year") {
		var yearColumnSize = 4;
		result += '<TABLE WIDTH=144 BORDER=0 BORDERWIDTH=0 CELLSPACING=0 CELLPADDING=0>\n';
		result += '<TR BGCOLOR="#C0C0C0">\n';
		result += '	<TD BGCOLOR="#C0C0C0" CLASS="cal" WIDTH=50% ALIGN=CENTER VALIGN=MIDDLE><B><A CLASS="cal" HREF="javascript:'+windowref+'CalendarPopup_refreshCalendar('+this.index+','+(year-(yearColumnSize*2))+');">&lt;&lt;</A></B></TD>\n';
		result += '	<TD BGCOLOR="#C0C0C0" CLASS="cal" WIDTH=50% ALIGN=CENTER VALIGN=MIDDLE><B><A CLASS="cal" HREF="javascript:'+windowref+'CalendarPopup_refreshCalendar('+this.index+','+(year+(yearColumnSize*2))+');">&gt;&gt;</A></B></TD>\n';
		result += '</TR></TABLE>\n';
		result += '<TABLE WIDTH=120 BORDER=0 CELLSPACING=1 CELLPADDING=0 ALIGN=CENTER>\n';
		for (var i=0; i<yearColumnSize; i++) {
			for (var j=0; j<2; j++) {
				var currentyear = year+(j*yearColumnSize)+i;
				result += '<TD WIDTH=50% ALIGN=CENTER><A CLASS="textlink" HREF="javascript:'+windowref+this.returnYearFunction+'('+currentyear+');'+windowref+'CalendarPopup_hideCalendar(\''+this.index+'\');" CLASS="'+date_class+'">'+currentyear+'</A></TD>';
				}
			result += '</TR>';
			}
		result += '</TABLE></TD></TR></TABLE>\n';
		}
	// Common
	if (this.type == "WINDOW") {
		result += "</td></tr></table></td></tr></table></BODY></HTML>\n";
		}
	return result;
	}







//------------------------------------------PopupWindow--------------------------------------------//








// Set the position of the popup window based on the anchor
function PopupWindow_getXYPosition(anchorname) {
	var coordinates;
	if (this.type == "WINDOW") {
		coordinates = getAnchorWindowPosition(anchorname);
		}
	else {
		coordinates = getAnchorPosition(anchorname);
		}
	this.x = coordinates.x+150;
	this.y = coordinates.y;
	}
// Set width/height of DIV/popup window
function PopupWindow_setSize(width,height) {
	this.width = width;
	this.height = height;
	}
// Fill the window with contents
function PopupWindow_populate(contents) {
	this.contents = contents;
	this.populated = false;
	}
// Refresh the displayed contents of the popup
function PopupWindow_refresh() {
	if (this.divName != null) {
		// refresh the DIV object
		if (this.use_gebi) {
			document.getElementById(this.divName).innerHTML = this.contents;
			}
		else if (this.use_css) {
			document.all[this.divName].innerHTML = this.contents;
			}
		else if (this.use_layers) {
			var d = document.layers[this.divName];
			d.document.open();
			d.document.writeln(this.contents);
			d.document.close();
			}
		}
	else {
		if (this.popupWindow != null && !this.popupWindow.closed) {
			this.popupWindow.document.open();
			this.popupWindow.document.writeln(this.contents);
			this.popupWindow.document.close();
			this.popupWindow.focus();
			}
		}
	}
// Position and show the popup, relative to an anchor object
function PopupWindow_showPopup(anchorname) {
	this.getXYPosition(anchorname);
	this.x += this.offsetX;
	this.y += this.offsetY;
	if (!this.populated && (this.contents != "")) {
		this.populated = true;
		this.refresh();
		}
	if (this.divName != null) {
		// Show the DIV object
		if (this.use_gebi) {
			document.getElementById(this.divName).style.left = this.x;
			document.getElementById(this.divName).style.top = this.y;
			document.getElementById(this.divName).style.visibility = "visible";
			}
		else if (this.use_css) {
			document.all[this.divName].style.left = this.x;
			document.all[this.divName].style.top = this.y;
			document.all[this.divName].style.visibility = "visible";
			}
		else if (this.use_layers) {
			document.layers[this.divName].left = this.x;
			document.layers[this.divName].top = this.y;
			document.layers[this.divName].visibility = "visible";
			}
		}
	else {
		if (this.popupWindow == null || this.popupWindow.closed) {
			// If the popup window will go off-screen, move it so it doesn't
			if (screen && screen.availHeight) {
				if ((this.y + this.height) > screen.availHeight) {
					this.y = screen.availHeight - this.height;
					}
				}
			if (screen && screen.availWidth) {
				if ((this.x + this.width) > screen.availWidth) {
					this.x = screen.availWidth - this.width;
					}
				}
			this.popupWindow = window.open("about:blank","window_"+anchorname,
			"toolbar=no,location=no,status=no,menubar=no,scrollbars=auto,resizable=no,alwaysRaised,dependent,titlebar=no,width="
			+this.width+",height="+this.height+",screenX="+this.x+",left="+this.x+",screenY="+this.y+",top="+this.y+"");
			}
		this.refresh();
		}
	}
// Hide the popup
function PopupWindow_hidePopup() {
	if (this.divName != null) {
		if (this.use_gebi) {
			document.getElementById(this.divName).style.visibility = "hidden";
			}
		else if (this.use_css) {
			document.all[this.divName].style.visibility = "hidden";
			}
		else if (this.use_layers) {
			document.layers[this.divName].visibility = "hidden";
			}
		}
	else {
		if (this.popupWindow && !this.popupWindow.closed) {
			this.popupWindow.close();
			this.popupWindow = null;
			}
		}
	}
// Pass an event and return whether or not it was the popup DIV that was clicked
function PopupWindow_isClicked(e) {
	if (this.divName != null) {
		if (this.use_layers) {
			var clickX = e.pageX;
			var clickY = e.pageY;
			var t = document.layers[this.divName];
			if ((clickX > t.left) && (clickX < t.left+t.clip.width) && (clickY > t.top) && (clickY < t.top+t.clip.height)) {
				return true;
				}
			else { return false; }
			}
		else if (document.all) { // Need to hard-code this to trap IE for error-handling
			var t = window.event.srcElement;
			while (t.parentElement != null) {
				if (t.id==this.divName) {
					return true;
					}
				t = t.parentElement;
				}
			return false;
			}
		else if (this.use_gebi) {
			var t = e.originalTarget;
			while (t.parentNode != null) {
				if (t.id==this.divName) {
					return true;
					}
				t = t.parentNode;
				}
			return false;
			}
		return false;
		}
	return false;
	}

// Check an onMouseDown event to see if we should hide
function PopupWindow_hideIfNotClicked(e) {
	if (this.autoHideEnabled && !this.isClicked(e)) {
		this.hidePopup();
		}
	}
// Call this to make the DIV disable automatically when mouse is clicked outside it
function PopupWindow_autoHide() {
	this.autoHideEnabled = true;
	}
// This global function checks all PopupWindow objects onmouseup to see if they should be hidden
function PopupWindow_hidePopupWindows(e) {
	for (var i=0; i<popupWindowObjects.length; i++) {
		if (popupWindowObjects[i] != null) {
			var p = popupWindowObjects[i];
			p.hideIfNotClicked(e);
			}
		}
	}
// Run this immediately to attach the event listener
function PopupWindow_attachListener() {
	if (document.layers) {
		document.captureEvents(Event.MOUSEUP);
		}
	window.popupWindowOldEventListener = document.onmouseup;
	if (window.popupWindowOldEventListener != null) {
		document.onmouseup = new Function("window.popupWindowOldEventListener(); PopupWindow_hidePopupWindows();");
		}
	else {
		document.onmouseup = PopupWindow_hidePopupWindows;
		}
	}
// CONSTRUCTOR for the PopupWindow object
// Pass it a DIV name to use a DHTML popup, otherwise will default to window popup
function PopupWindow() {
	if (!window.popupWindowIndex) { window.popupWindowIndex = 0; }
	if (!window.popupWindowObjects) { window.popupWindowObjects = new Array(); }
	if (!window.listenerAttached) {
		window.listenerAttached = true;
		PopupWindow_attachListener();
		}
	this.index = popupWindowIndex++;
	popupWindowObjects[this.index] = this;
	this.divName = null;
	this.popupWindow = null;
	this.width=0;
	this.height=0;
	this.populated = false;
	this.visible = false;
	this.autoHideEnabled = false;

	this.contents = "";
	if (arguments.length>0) {
		this.type="DIV";
		this.divName = arguments[0];
		}
	else {
		this.type="WINDOW";
		}
	this.use_gebi = false;
	this.use_css = false;
	this.use_layers = false;
	if (document.getElementById) { this.use_gebi = true; }
	else if (document.all) { this.use_css = true; }
	else if (document.layers) { this.use_layers = true; }
	else { this.type = "WINDOW"; }
	this.offsetX = 0;
	this.offsetY = 0;
	// Method mappings
	this.getXYPosition = PopupWindow_getXYPosition;
	this.populate = PopupWindow_populate;
	this.refresh = PopupWindow_refresh;
	this.showPopup = PopupWindow_showPopup;
	this.hidePopup = PopupWindow_hidePopup;
	this.setSize = PopupWindow_setSize;
	this.isClicked = PopupWindow_isClicked;
	this.autoHide = PopupWindow_autoHide;
	this.hideIfNotClicked = PopupWindow_hideIfNotClicked;
	}







//---------------------------------------------Date----------------------------------------------//








var MONTH_NAMES=new Array('January','February','March','April','May','June','July','August','September','October','November','December','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
function LZ(x) {return(x<0||x>9?"":"0")+x}

function formatDate(date,format) {
	format=format+"";
	var result="";
	var i_format=0;
	var c="";
	var token="";
	var y=date.getYear()+"";
	var M=date.getMonth()+1;
	var d=date.getDate();
	var H=date.getHours();
	var m=date.getMinutes();
	var s=date.getSeconds();
	var yyyy,yy,MMM,MM,dd,hh,h,mm,ss,ampm,HH,H,KK,K,kk,k;
	// Convert real date parts into formatted versions
	var value=new Object();
	if (y.length < 4) {y=""+(y-0+1900);}
	value["y"]=""+y;
	value["yyyy"]=y;
	value["yy"]=y.substring(2,4);
	value["M"]=M;
	value["MM"]=LZ(M);
	value["MMM"]=MONTH_NAMES[M-1];
	value["d"]=d;
	value["dd"]=LZ(d);
	value["H"]=H;
	value["HH"]=LZ(H);
	if (H==0){value["h"]=12;}
	else if (H>12){value["h"]=H-12;}
	else {value["h"]=H;}
	value["hh"]=LZ(value["h"]);
	if (H>11){value["K"]=H-12;} else {value["K"]=H;}
	value["k"]=H+1;
	value["KK"]=LZ(value["K"]);
	value["kk"]=LZ(value["k"]);
	if (H > 11) { value["a"]="PM"; }
	else { value["a"]="AM"; }
	value["m"]=m;
	value["mm"]=LZ(m);
	value["s"]=s;
	value["ss"]=LZ(s);
	while (i_format < format.length) {
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
			}
		if (value[token] != null) { result=result + value[token]; }
		else { result=result + token; }
		}
	return result;
	}

// ------------------------------------------------------------------
// Utility functions for parsing in getDateFromFormat()
// ------------------------------------------------------------------
function _isInteger(val) {
	var digits="1234567890";
	for (var i=0; i < val.length; i++) {
		if (digits.indexOf(val.charAt(i))==-1) { return false; }
		}
	return true;
	}
function _getInt(str,i,minlength,maxlength) {
	for (var x=maxlength; x>=minlength; x--) {
		var token=str.substring(i,i+x);
		if (token.length < minlength) { return null; }
		if (_isInteger(token)) { return token; }
		}
	return null;
	}

// ------------------------------------------------------------------
// getDateFromFormat( date_string , format_string )
//
// This function takes a date string and a format string. It matches
// If the date string matches the format string, it returns the
// getTime() of the date. If it does not match, it returns 0.
// ------------------------------------------------------------------
function getDateFromFormat(val,format) {
	val=val+"";
	format=format+"";
	var i_val=0;
	var i_format=0;
	var c="";
	var token="";
	var token2="";
	var x,y;
	var now=new Date();
	var year=now.getYear();
	var month=now.getMonth()+1;
	var date=now.getDate();
	var hh=now.getHours();
	var mm=now.getMinutes();
	var ss=now.getSeconds();
	var ampm="";

	while (i_format < format.length) {
		// Get next token from format string
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
			}
		// Extract contents of value based on format token
		if (token=="yyyy" || token=="yy" || token=="y") {
			if (token=="yyyy") { x=4;y=4; }
			if (token=="yy")   { x=2;y=2; }
			if (token=="y")    { x=2;y=4; }
			year=_getInt(val,i_val,x,y);
			if (year==null) { return 0; }
			i_val += year.length;
			if (year.length==2) {
				if (year > 70) { year=1900+(year-0); }
				else { year=2000+(year-0); }
				}
			}
		else if (token=="MMM"){
			month=0;
			for (var i=0; i<MONTH_NAMES.length; i++) {
				var month_name=MONTH_NAMES[i];
				if (val.substring(i_val,i_val+month_name.length).toLowerCase()==month_name.toLowerCase()) {
					month=i+1;
					if (month>12) { month -= 12; }
					i_val += month_name.length;
					break;
					}
				}
			if ((month < 1)||(month>12)){return 0;}
			}
		else if (token=="MM"||token=="M") {
			month=_getInt(val,i_val,token.length,2);
			if(month==null||(month<1)||(month>12)){return 0;}
			i_val+=month.length;}
		else if (token=="dd"||token=="d") {
			date=_getInt(val,i_val,token.length,2);
			if(date==null||(date<1)||(date>31)){return 0;}
			i_val+=date.length;}
		else if (token=="hh"||token=="h") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<1)||(hh>12)){return 0;}
			i_val+=hh.length;}
		else if (token=="HH"||token=="H") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<0)||(hh>23)){return 0;}
			i_val+=hh.length;}
		else if (token=="KK"||token=="K") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<0)||(hh>11)){return 0;}
			i_val+=hh.length;}
		else if (token=="kk"||token=="k") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<1)||(hh>24)){return 0;}
			i_val+=hh.length;hh--;}
		else if (token=="mm"||token=="m") {
			mm=_getInt(val,i_val,token.length,2);
			if(mm==null||(mm<0)||(mm>59)){return 0;}
			i_val+=mm.length;}
		else if (token=="ss"||token=="s") {
			ss=_getInt(val,i_val,token.length,2);
			if(ss==null||(ss<0)||(ss>59)){return 0;}
			i_val+=ss.length;}
		else if (token=="a") {
			if (val.substring(i_val,i_val+2).toLowerCase()=="am") {ampm="AM";}
			else if (val.substring(i_val,i_val+2).toLowerCase()=="pm") {ampm="PM";}
			else {return 0;}
			i_val+=2;}
		else {
			if (val.substring(i_val,i_val+token.length)!=token) {return 0;}
			else {i_val+=token.length;}
			}
		}
	// If there are any trailing characters left in the value, it doesn't match
	if (i_val != val.length) { return 0; }
	// Is date valid for month?
	if (month==2) {
		// Check for leap year
		if ( ( (year%4==0)&&(year%100 != 0) ) || (year%400==0) ) { // leap year
			if (date > 29){ return false; }
			}
		else { if (date > 28) { return false; } }
		}
	if ((month==4)||(month==6)||(month==9)||(month==11)) {
		if (date > 30) { return false; }
		}
	// Correct hours value
	if (hh<12 && ampm=="PM") { hh+=12; }
	else if (hh>11 && ampm=="AM") { hh-=12; }
	var newdate=new Date(year,month-1,date,hh,mm,ss);
	return newdate.getTime();
	}








//---------------------------------------------Anchor----------------------------------------------//







function getAnchorPosition(anchorname) {
	// This function will return an Object with x and y properties
	var useWindow=false;
	var coordinates=new Object();
	var x=0,y=0;
	// Browser capability sniffing
	var use_gebi=false, use_css=false, use_layers=false;
	if (document.getElementById) { use_gebi=true; }
	else if (document.all) { use_css=true; }
	else if (document.layers) { use_layers=true; }
	// Logic to find position
 	if (use_gebi && document.all) {
		x=AnchorPosition_getPageOffsetLeft(document.all[anchorname]);
		y=AnchorPosition_getPageOffsetTop(document.all[anchorname]);
		}
	else if (use_gebi) {
		var o=document.getElementById(anchorname);
		x=o.offsetLeft; y=o.offsetTop;
		}
 	else if (use_css) {
		x=AnchorPosition_getPageOffsetLeft(document.all[anchorname]);
		y=AnchorPosition_getPageOffsetTop(document.all[anchorname]);
		}
	else if (use_layers) {
		var found=0;
		for (var i=0; i<document.anchors.length; i++) {
			if (document.anchors[i].name==anchorname) { found=1; break; }
			}
		if (found==0) {
			coordinates.x=0; coordinates.y=0; return coordinates;
			}
		x=document.anchors[i].x;
		y=document.anchors[i].y;
		}
	else {
		coordinates.x=0; coordinates.y=0; return coordinates;
		}
	coordinates.x=x;
	coordinates.y=y;
	return coordinates;
	}

// getAnchorWindowPosition(anchorname)
//   This function returns an object having .x and .y properties which are the coordinates
//   of the named anchor, relative to the window
function getAnchorWindowPosition(anchorname) {
	var coordinates=getAnchorPosition(anchorname);
	var x=0;
	var y=0;
	if (document.getElementById) {
		if (isNaN(window.screenX)) {
			x=coordinates.x-document.body.scrollLeft+window.screenLeft;
			y=coordinates.y-document.body.scrollTop+window.screenTop;
			}
		else {
			x=coordinates.x+window.screenX+(window.outerWidth-window.innerWidth)-window.pageXOffset;
			y=coordinates.y+window.screenY+(window.outerHeight-24-window.innerHeight)-window.pageYOffset;
			}
		}
	else if (document.all) {
		x=coordinates.x-document.body.scrollLeft+window.screenLeft;
		y=coordinates.y-document.body.scrollTop+window.screenTop;
		}
	else if (document.layers) {
		x=coordinates.x+window.screenX+(window.outerWidth-window.innerWidth)-window.pageXOffset;
		y=coordinates.y+window.screenY+(window.outerHeight-24-window.innerHeight)-window.pageYOffset;
		}
	coordinates.x=x;
	coordinates.y=y;
	return coordinates;
	}

// Functions for IE to get position of an object
function AnchorPosition_getPageOffsetLeft (el) {
	var ol=el.offsetLeft;
	while ((el=el.offsetParent) != null) { ol += el.offsetLeft; }
	return ol;
	}
function AnchorPosition_getWindowOffsetLeft (el) {
	return AnchorPosition_getPageOffsetLeft(el)-document.body.scrollLeft;
	}
function AnchorPosition_getPageOffsetTop (el) {
	var ot=el.offsetTop;
	while((el=el.offsetParent) != null) { ot += el.offsetTop; }
	return ot;
	}
function AnchorPosition_getWindowOffsetTop (el) {
	return AnchorPosition_getPageOffsetTop(el)-document.body.scrollTop;
	}
