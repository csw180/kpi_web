var menu=0;
var sub=0;
function mouseover_class(id) {
    eval("document.all.td"+id+".style.backgroundColor='#9999ff';");
}
function mouseout_class(id) {
    eval("document.all.td"+id+".style.backgroundColor='#FAF9F8';");
}
function winopen(url) {

    var width_v  = 480;
    var height_v = 500;
    var top_x    = (window.screen.width - width_v)/2;
    var top_y    = (window.screen.height - height_v)/2;

    open(url,"WIN2","top="+top_y+",left="+top_x+",width="+width_v+",height="+height_v+",scrollbars=no,status=no,toolbar=no,menubar=no,location=no,directories=no,resizable=no");

}
function chk_span(chk){
    icnt=document.left.icnt.value * 1;
    for(i=1;i<=icnt;i++){
            if (i==chk){
                eval("if(document.all.sp"+i+".style.display =='none') {  "+
                     "    document.all.sp"+i+".style.display = '';       "+
                     "    document.all.img"+i+".src=\"img/left_bullet_mi.gif\"; "+
                     "}else{                                             "+
                     "    document.all.sp"+i+".style.display = \"none\"; "+
                     "    document.all.img"+i+".src=\"img/left_bullet.gif\"; "+
                     "} ");

            }else{
                eval("document.all.sp"+i+".style.display = \"none\";");
                eval("document.all.img"+i+".src=\"img/left_bullet.gif\";");
            }
    }
}
function clickSub(m,n){    
    //alert("m = " + m + ",  n = " + n)
    if(menu && sub){
        var prev=eval("sub"+menu+sub);
        prev.className="cMenuTextTd_off";
    }
    var spot=eval("sub"+m+n);
    spot.className="cMenuTextTd_03";
    menu=m;
    sub=n;
}
function Home(){
    parent.location="MainPage.do";
}
function call_body(programurl){ 
   window.parent.mainFrame.location=programurl;
}
