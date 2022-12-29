var menu=0;
var ns4      = document.layers
var ie4      = document.all
var ns6      = document.getElementById&&!document.all

var crossobj = new Array(3);

function call_Newsarg(gubun,para){  
  var width_v=800;
  if (gubun==1) height_v=870;
  else          height_v=750;
	var top_x = (window.screen.width - width_v)/2;
	var top_y = (window.screen.height - height_v)/2;
    if(gubun==1)      url="news.scr.news_scr_1110.screen?";   //공지사항
    else if(gubun==2) url="news.scr.news_scr_1120.screen?";   //게시판
	open(url+para,"news"+gubun,"top="+top_y+",left="+top_x+",width="+width_v+",height="+height_v+",scrollbars=yes,status=no,toolbar=no,menubar=no,location=no,directories=no,resizable=no");
}
function call_News(gubun){
  var width_v=800;
  if (gubun==1) height_v=870;
  else          height_v=750;

	var top_x = (window.screen.width - width_v)/2;
	var top_y = (window.screen.height - height_v)/2;
  if(gubun==1)      url="news.scr.news_scr_1110.screen";   //공지사항
  else if(gubun==2) url="news.scr.news_scr_1120.screen";   //게시판
  else              url="news.scr.news_scr_1130.screen";
	open(url,"news"+gubun,"top="+top_y+",left="+top_x+",width="+width_v+",height="+height_v+",scrollbars=yes,status=no,toolbar=no,menubar=no,location=no,directories=no,resizable=no");
}
function openUrl(url){
	open(url);
}

function MM_swapImgRestore(n) { 
    if(menu == n){
        var prev=eval("document.all.Image1"+menu);
        prev.src="img/layer_m"+menu+".gif";
    }else{
        var spot=eval("document.all.Image1"+n);
        spot.src="img/layer_m"+n+"_over.gif";
    }
}

function MM_swapImage(n) { 
    if(menu == n){
        var prev=eval("document.all.Image1"+menu);
        prev.src="img/layer_m"+menu+"_over.gif";
    }
    var spot=eval("document.all.Image1"+n);
    spot.src="img/layer_m"+n+".gif";
}
/*-------------------------------------------------------*/
/* @기  능 : 각 업무별 담당자 연락처 Hidden시키는 함수   */
/* @리턴값 : 없음                                        */
/*-------------------------------------------------------*/
function closeit(idx){
    if (ie4||ns6)
        crossobj[idx-1].style.visibility="hidden"
    else if (ns4)
        crossobj[idx-1].visibility="hide"        
}


/*-------------------------------------------------------*/
/* @기  능 : 각 업무별 담당자 연락처 Display하는 함수    */
/* @리턴값 : 없음                                        */
/*-------------------------------------------------------*/
function showit(idx){
    
    if (ie4||ns6)
        crossobj[idx-1].style.visibility="visible";
    else if (ns4)
        crossobj[idx-1].visibility="show"
    
    if(idx==1)
    {
        closeit(2);
        closeit(3);
    } 
    else if(idx==2) 
    {
        closeit(1);
        closeit(3);
    }
    else if(idx==3) 
    {
        closeit(1);
        closeit(2);
    }
    if (menu>0){
        var prev=eval("document.all.Image1"+menu);
        prev.src="img/layer_m"+menu+"_over.gif";
    }
    var spot=eval("document.all.Image1"+idx);
    spot.src="img/layer_m"+idx+".gif";
    menu=idx
}

/*-------------------------------------------------------*/
/* @기  능 : Flash 함수                                  */
/* @리턴값 : 없음                                        */
/*-------------------------------------------------------*/
function displayImg(str){
  if(str == '1'){ //로그인
    document.write("<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0' width='505' height='124'>");
    document.write("  <param name='movie' value='img/log_img01.swf'>");
    document.write("  <param name='quality' value='high'>");
    document.write("  <embed src='img/log_img01.swf' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='505' height='124'></embed>");
    document.write("</object>");
  }  
  else if(str == '2'){ //news = Main 화면
    document.write("<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0' width='363' height='507'>");
    document.write("  <param name='movie' value='img/main_img.swf'>");
    document.write("  <param name='quality' value='high'>");
    document.write("  <embed src='img/main_img.swf' quality='high' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='363' height='507'></embed>");
    document.write("</object>");
  }
}