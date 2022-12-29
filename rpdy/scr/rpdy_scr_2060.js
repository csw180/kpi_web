var isInitBtnEnable = true;
var isInstBtnEnable = true;
var isMofyBtnEnable = false;
var isDelBrnEnable  = false;
var isExcelBtnEnable= true;
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

  createIBSheet2(  document.getElementById("hiddenGridObj"),"hiddenGrid", "200px", "400px");   // 기본정보 (기준일, 명칭등)
  createIBSheet2(  document.getElementById("hiddGridmonObj"),"hiddGridmon", "200px", "400px");  // 정보출력
  
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
   hiddGridmon.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

   var hgmInfo    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
   var hgmHeaders = [ { Text:"점번호|점명|", Align:"Center"} ];
   hiddGridmon.InitHeaders(hgmHeaders, hgmInfo);

   var hgmCols = [ {Type:"Text",     Hidden:1,  MinWidth:60,   Align:"Center",  ColMerge:1,   SaveName:"NONE" },
             {Type:"Text",     Hidden:1,  MinWidth:80,   Align:"Left",    ColMerge:1,   SaveName:"NONE" } ];
    
   hiddGridmon.InitColumns(hgmCols);
   hiddGridmon.SetEditable(0);
   hiddGridmon.SetVisible(0);

  doAction("기준일");

  //if(isRoleEnable != '1') {
  //  doAction("조회");
  //}
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




function ComboValue(el)
{
    for ( ;el.options.length>1;) el.options.remove(1);
    for(i=1;i<=hiddenGrid.GetTotalRows();i++){
       var oOption=document.createElement("OPTION");
     oOption.text=hiddenGrid.GetCellValue(i, 1);
     oOption.value=hiddenGrid.GetCellValue(i, 0);
       el.options.add(oOption);
    }

}

function selectjumname()
{
    // 최근 기준년월 가져오기
  basemonth=hiddGridmon.GetCellValue(1, 0);
    v_jumcode=document.frm.jumcode.value;
    if(v_jumcode != '') hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=1&basemonth="+basemonth+"&v_jumcode="+v_jumcode);
    else{ 
    document.frm.jumname.value='';
  }
}

function popupJumCode()
{
    // 최근 기준년월 가져오기
    basemonth=hiddGridmon.GetCellValue(1, 0);
    win_open2("comm.scr.comm_scr_1010.screen?basemonth="+basemonth+"&searchGubun=2", 250, 450);
}

function selectmonth()
{   
    // 최근 기준년월 가져오기
    basemonth=hiddGridmon.GetCellValue(1, 0);
    hiddenGrid.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=2&basemonth="+basemonth+"&jekyocode=7");
}

/* Sheet 각종 처리 */
function doAction(sAction)
{
    isSelected  = true;
    baseday     = document.frm.baseday.value;
    jumcode     = document.frm.jumcode.value;

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
        case "기준일":           // 조회(상위 GRID)
            
           // 기준년월 정보 (최근 기준년월), superFlg는 성과담당자 권한을 갖는다 고로 가장 최근일자임. 점번호 조회시 필요
           hiddGridmon.DoSearch("comm.scr.comm_scr_9099.screen?hidden_key=9&v_inqtype=1&jekyocode=3&superFlg=Y");
            
           // 기준일자 정보
           //if(isRoleEnable == '1') {
               // 전산정보부 및 성과 담당자
           //     hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2060.do?hidden_key=9&baseday="+baseday+"&sergb=98");
           // } else {
           //     hiddenGrid.DoSearch("rpdy.scr.rpdy_scr_2060.do?hidden_key=9&baseday="+baseday+"&sergb=99");
           // }
            
            break;
        case "조회":             // 조회(상위 GRID)
            //if(baseday >= '20200101') {
            //  if(isRoleEnable != '1') { 
            //    alert('2020년도 상반반기 일일성과 자료는 차후 오픈 예정입니다.');
            //    break;
            //  } 
            //} 
            if(jumcode == '') {
               alert("점번호를 입력하세요");
               break;
            }
            doPrint();

            // WEB로그 출력
            condition="기준일="+baseday+";점번호="+jumcode;
            hiddenGrid.DoSearch(encodeURI("kpi.rpdy.rpdy_2061.screen?condition="+condition));
            break;
    }

}

function doPrint() 
{
    var baseday = document.frm.baseday.value;
    var jumcode = document.frm.jumcode.value;
    var prt_url = "/rpdy/scr"; //"http://"+location.hostname+":"+location.port +"/kpi/rpdy/prt";
  var prt_file = "/rpdy/prt";

    if (baseday >= '20220701') {
        var prt_url = prt_url + "/rpdy_scr_206q.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
    var prt_file = prt_file + "/rpdy_prt_206q.crf";                 
    } else if (baseday >= '20220101') {
        var prt_url = prt_url + "/rpdy_scr_206p.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
    var prt_file = prt_file + "/rpdy_prt_206p.crf";                 
    } else if (baseday >= '20211001') {
        var prt_url = prt_url + "/rpdy_scr_206o.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
    var prt_file = prt_file + "/rpdy_prt_206o.crf";                 
    } else if (baseday >= '20210701') {
    var prt_url = prt_url + "/rpdy_scr_206n.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
    var prt_file = prt_file + "/rpdy_prt_206n.crf";           
    } else if (baseday >= '20210101') {
    var prt_url = prt_url + "/rpdy_scr_206m.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
    var prt_file = prt_file + "/rpdy_prt_206m.crf";           
    } else if (baseday >= '20200701') {
        var prt_url = prt_url + "/rpdy_scr_206l.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
    var prt_file = prt_file + "/rpdy_prt_206l.crf";        
    //if (baseday >= '20200701') {
    //    var prt_url = prt_url + "/rpdy_prt_206k.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
    } else if (baseday >= '20200101') {
        var prt_url = prt_url + "/rpdy_scr_206j.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
    var prt_file = prt_file + "/rpdy_prt_206j.crf";
    } else if (baseday >= '20190701') {
        var prt_url = prt_url + "/rpdy_scr_206i.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
    var prt_file = prt_file + "/rpdy_prt_206i.crf";
    } else if (baseday >= '20190101') {
        var prt_url = prt_url + "/rpdy_scr_206h.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
    var prt_file = prt_file + "/rpdy_prt_206h.crf";
    } else if (baseday >= '20181011') {
        // 2018.10.11 RMC 신탁사업 -> 특정금전신탁 , 재산신탁 분리
        var prt_url = prt_url + "/rpdy_scr_206g.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
    var prt_file = prt_file + "/rpdy_prt_206g.crf";
    } else if (baseday >= '20180701') {
        // 2018년도 하반기
        var prt_url = prt_url + "/rpdy_scr_206f.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
    var prt_file = prt_file + "/rpdy_prt_206f.crf";
    } else if( baseday >= '20180101') {
        if ( (baseday >= '20180601' && baseday <= '20180630') ) {
            // 2018 상반기 말월
            var prt_url = prt_url + "/rpdy_scr_206e.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
      var prt_file = prt_file + "/rpdy_prt_206e.crf";
        } else {
          // 2018년도 상반기
            var prt_url = prt_url + "/rpdy_scr_206d.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
      var prt_file = prt_file + "/rpdy_prt_206d.crf";
        } // 2017.06.21 : 2017년 반기 말월 월중평잔 표시 (6월은 19일자 부터)
    } else if( baseday >= '20170701') {
        if ( (baseday >= '20171201' && baseday <= '20171231') ) {
            // 2017 하반기 말월
            var prt_url = prt_url + "/rpdy_scr_206c.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
      var prt_file = prt_file + "/rpdy_prt_206c.crf";
        } else {
          // 2017년도 하반기
            var prt_url = prt_url + "/rpdy_scr_206b.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
      var prt_file = prt_file + "/rpdy_prt_206b.crf";
        }
    } else if (baseday >= '20170101') {
        if ( (baseday >= '20170619' && baseday <= '20170630') ) {
            // 2017 상반기 말월
            var prt_url = prt_url + "/rpdy_scr_206a.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
      var prt_file = prt_file + "/rpdy_prt_206a.crf";
        } else {
          // 2017년도 상반기
            var prt_url = prt_url + "/rpdy_scr_2069.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
      var prt_file = prt_file + "/rpdy_prt_2069.crf";
        }
    } else if (baseday >= '20160701') {
        // 2016년도 하반기
        var prt_url = prt_url + "/rpdy_scr_2068.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
    var prt_file = prt_file + "/rpdy_prt_2068.crf";
    } else if (baseday >= '20160101') {
        // 2016년도 상반기
        var prt_url = prt_url + "/rpdy_scr_2067.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
    var prt_file = prt_file + "/rpdy_prt_2067.crf";
    } else if (baseday >= '20150701') {
        // 2015년도 하반기
        var prt_url = prt_url + "/rpdy_scr_2066.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
    var prt_file = prt_file + "/rpdy_prt_2066.crf";
    } else if (baseday >= '20150101') {
        // 2015년도 상반기
        var prt_url = prt_url + "/rpdy_scr_2065.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
    var prt_file = prt_file + "/rpdy_prt_2065.crf";
    } else if (baseday >= '20140701') {
        // 2014년도 하반기
        var prt_url = prt_url + "/rpdy_scr_2064.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
    var prt_file = prt_file + "/rpdy_prt_2064.crf";
    } else if (baseday >= '20140101') {
        // 2014년도
        var prt_url = prt_url + "/rpdy_scr_2063.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
    var prt_file = prt_file + "/rpdy_prt_2063.crf";
    } else if (baseday >= '20130101') {
        var prt_url = prt_url + "/rpdy_scr_2062.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
    var prt_file = prt_file + "/rpdy_prt_2062.crf";
    } else if (baseday >= '20120701') {
        // 2012년도 하반기
        var prt_url = prt_url + "/rpdy_scr_2061.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
    var prt_file = prt_file + "/rpdy_prt_2061.crf";
    } else {
        var prt_url = prt_url + "/rpdy_scr_2060.jsp?as_of_date="+baseday+"&jumcode="+jumcode;
    var prt_file = prt_file + "/rpdy_prt_2060.crf";
    } 

    //params="init_mode=view&zoom_rate=140&ard_save=false&mail_trans=false";
    params="&init_mode=view&zoom_rate=140&ard_save=false&excel_convert=false&hwp_convert=false&pdf_convert=false&word_convert=false&xml_convert=false&rtf_convert=false&gif_convert=false&jpg_convert=false&bmp_convert=false&wmf_convert=false&mail_trans=false";

//    embedAI("ifprint", prt_url);
  report_viewFrame(prt_url + params  , prt_file, "ifprint");
}
