var menu="0";
function call_msg(){
   alert("권한이 없습니다...확인 하세요...");
}

//마우스 out
function MM_swapImgRestore(n) { 
    //default menu 인 경우
    if(menu == n){ 
        var prev=eval("document.all.Image2"+menu);
        prev.src="img/topmenu_"+menu+"on.gif";
    }else{
        var spot=eval("document.all.Image2"+n);
        spot.src="img/topmenu_"+n+".gif";
    }    
}
//마우스 over
function MM_swapImage(n) { 
    if(menu == n){
        var prev=eval("document.all.Image2"+menu);
        prev.src="img/topmenu_"+menu+".gif";
    }
    var spot=eval("document.all.Image2"+n);

    spot.src="img/topmenu_"+n+"over.gif";
    submenu(0);
}


/* 새로추가부 
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
*/

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}
/*
function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
*/

function call_Home(url){
    if(url=="0") {
       setCookie('isMessage','');
	    // parent.location="login.jsp?logout=yes";
       parent.location="ssologinMess.jsp";
    } else parent.location=url;
}
function call_pass(){    
    var width_v  = 400;
    var height_v = 330;
    var top_x    = (window.screen.width - width_v)/2;
    var top_y    = (window.screen.height - height_v)/2;
    open("comm.password.screen","비밀번호변경","top="+top_y+",left="+top_x+",width="+width_v+",height="+height_v+",scrollbars=no,status=no,toolbar=no,menubar=no,location=no,directories=no,resizable=no");
}
function call_code(){
    var width_v  = 450;
    var height_v = 450;
    var top_x    = (window.screen.width - width_v)/2;
    var top_y    = (window.screen.height - height_v)/2;
    open("comm.scr.comm_scr_9020.screen","통합코드조회","top="+top_y+",left="+top_x+",width="+width_v+",height="+height_v+",scrollbars=no,status=no,toolbar=no,menubar=no,location=no,directories=no,resizable=no");
}
/* 쿠키 가져오기 */
function getCookie(varname) {
    varname += "=";
    startpos	= document.cookie.indexOf(varname);

    if	(startpos >= 0) {
      startpos += varname.length;
      endpos = document.cookie.indexOf(";", startpos);
      if (endpos == -1) endpos = document.cookie.length;
      return unescape(document.cookie.substring(startpos, endpos));
    } 
}

function call_News(gubun){
    var width_v=800;
    var scroll = "auto";
    if (gubun==1) {
      url="news.scr.news_scr_1110.screen";   //공지사항
      height_v=663; 
      scroll ="yes"
    }
    else if(gubun==2){
      url="news.scr.news_scr_1120.screen";   //게시판
      height_v=556;      
    }
    else 
    {             
      url="news.scr.news_scr_1130.screen";      
      height_v= '430';      
      width_v = '570';
    }

    var top_x = (window.screen.width - width_v)/2;
    var top_y = (window.screen.height - height_v)/2;
    
    //'toolbar=no,location=no,status=no,menubar=no,scrollbars=auto,resizable=no,width=424,height=219 top=10 left=10'
    window.open(url,"news"+gubun,"top="+top_y+",left="+top_x+",width="+width_v+",height="+height_v+",scrollbars="+scroll);
}

function submenu(arg){
//  if(arg==1) document.all.sub.style.display="";
//  else  document.all.sub.style.display="none";
}
function call_left_menu(programid,programurl,m, prgNm){
	/*
  if(m!="0"){
    if(menu!="0"){
      var prev=eval("document.all.Image2"+menu);
      prev.src="img/topmenu_"+menu+".gif";
    }
    var spot=eval("document.all.Image2"+m);
    spot.src="img/topmenu_"+m+"over.gif";
    menu=m;
  }else{
    var prev=eval("document.all.Image2"+menu);
    if(prev!=null) prev.src="img/topmenu_"+menu+".gif";
    m="04";
    var spot=eval("document.all.Image2"+m);
    spot.src="img/topmenu_"+m+"over.gif";
    menu=m;
  }
*/
	setCookie('topitem',programid);
  	window.parent.leftFrame.location="left.screen?group="+programid+"&prgNm=" + prgNm;
	
	$("td.menu").removeClass("on");
	$("#0"+m).addClass("on");
  /*
  if (top.frame_body.cols == '0,14,*' ){
     setTimeout("left_out()", 500);
  }
  */
}
function default_top_menu(m){
	$("td.menu").removeClass("on");
	$("#01").addClass("on");
    //var spot=eval("document.all.Image2"+m);
    //spot.src="img/topmenu_"+m+"on.gif";
    //menu=m;

}
function left_out(){
  top.frame_body.cols = '180,14,*';  
}