<%--===============================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : NEWS
'프로그램 ID  : news_scr_1110.jsp
'프로그램 명  : 공지사항(pop-up)
'프로그램개요 : 공지사항(pop-up)
'작   성   자 : 변휘원
'작   성   일 : 2006.9.12
====================================================================
'수정자/수정일 :
'수정사유      :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="tpms.common.web.CommonWebKeys"%>
<%@ page import="tpms.framework.component.util.JSPUtil"%>
<%@ page import="tpms.framework.component.signon.SignOnUserAccount"%>
<%@ page import="tpms.framework.component.error.ErrorHandler"%>
<%@ page import="tpms.framework.component.dao.*"%>
<%  String    topmenu_name    = "공지사항"; 
    String    leftmenu_name   = "보고서"; 
    String    htm_title       = "공지사항"; 
    String    actionname      = "";
    String    haengwon_no     = "";
    Exception piex            = null;
    
    String    strErrMsg       = "";
    String    status          = "0";
    String    chk             = "";
    String    UserID          = "";
    int       rolechk         = 0;
    
    DbResultSet rs1           = null;
    DBProcCall cp             = new DBProcCall();
        
    //메인에서 넘어오는 값들..
    String key = JSPUtil.getParameter(request,"key","");         //메인에서 넘어온것일때 = 1

    // USERID
    try {
        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);
        haengwon_no   = account.getHaengwon_no();
        UserID        = account.getHaengwon_no();
        
        rs1=cp.callProc("UP_KPI_C_S_CO상세권한",haengwon_no);
        if(rs1 != null)                       
        {
            rs1.first();
            if(rs1.next()){
               chk = rs1.getString("권한").trim();
               if(chk.equals("2")){
                   rolechk=1; //쓰기권한
               }
            }
        }
    }catch(Exception exx)  {
                 
    }
%>
<%@ include file="/module/pop_header.inc"%>
<script language="JavaScript">
    var g_key       = '<%=key.trim()%>';
    var g_rolechk   =  <%=rolechk%>;
    var g_userid    =  '<%=UserID.trim()%>';
    
    var fstSrchFlag = true;
    
  	//paging 변수
    var tCnt = 0; //총건수
    
    function mySheet_OnSelectMenu(MenuStr, Code) {
    	doAction(sAction);  	
    }
    
    function mySheet_OnClick(Row,Col,Value) {
    	play_data(Row);
    	   
        if(document.frm.title.value.length>0) {
            document.all.print.style.display = "";
            document.all.print.style.cursor  = "hand";
        } else {
            document.all.print.style.display = "none";
            document.all.print.style.cursor  = "";
        }    
    }
    
    
    function mySheet_OnSearchEnd(Code, Msg) {
    	if(!(key=="" || key==null)){ 
            var fRow=mySheet.FindText("KEY",key, 0, 2 );
            mySheet.SelectCell(fRow, "제목");
            play_data(fRow);
        }	
    	
    	if(!fstSrchFlag) {
    		makePaging(tCnt, c_page, pagecount);
    	}
    }
    
    
    function hiddenGrid_OnSearchEnd(Code, Msg) {
    	if(fstSrchFlag) {
    		tCnt = parseInt(hiddenGrid.GetCellValue(1, 0));
    		/*
	    	count=hiddenGrid.GetCellValue(1, 0);  //totalCnt
	        
	    	if(count%10==0) {pageTotal=count/10;} //10 page data, pageCnt 
	        else if(count > 10) {pageTotal=(count/10) + 1;}
	        else{ pageTotal=1;}	    	
	        pageTotal=Math.round(pageTotal,0);
	        
	        pagecount.innerHTML="";
	        
	        
	        for(pagecnt=1; pagecnt <= pageTotal; pagecnt++) {
	          pagecount.innerHTML  += "[<a href=\"javascript:doPage('"+pagecnt+"');\">"+pagecnt+"</a>]";
	        }
	        */
	        
	        makePaging(tCnt, c_page, pagecount);
	        
	        fstSrchFlag = false;
    	}
        
    	if(chkread) return;
    	var comt_val  = "";
    	for(var n=1; n<=hiddenGrid.RowCount(); n++) {
			comt_val += hiddenGrid.GetCellValue(n, 0);
    	}

    	document.frm.comt.value = enter_chg1(comt_val);
    }	
    
    function mySheet1_OnSearchEnd(Code, Msg) {
    	
    	attach_files.innerHTML  = "";
        for(var i=1; i<=mySheet1.RowCount(); i++)
        {
            attach_files.innerHTML  += "<a href='/kpi/FileDownServlet?wt_date=" + mySheet1.GetCellValue(i, 0) + "&wt_time=" + mySheet1.GetCellValue(i, 1) + "&filename=" + mySheet1.GetCellValue(i, 3) + "'><img src='img/pds_down.gif' border='0'>&nbsp;" + mySheet1.GetCellValue(i, 3) + "</a><br>";
        }    	
    }
</script>
<script language="JavaScript" src="news/scr/news_scr_1110.js"></Script>

<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<form name="frm" method="post" enctype="multipart/form-data" action="">
<table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">  
  <tr>
    <td valign="top"> 
      <!------------제목타이틀소메뉴시작--------->
      <table width="100%" border="0" cellspacing="0" cellpadding="0"> 
        <tr>
          <td height="38" style="border-bottom:1px solid #cccccc;">
            <table width="170" border="0" cellspacing="0" cellpadding="0" class="pdLR">
              <tr> 
                <!-- <td width="5"><img src="img/pop_img01.gif" width="5" height="38"></td> -->
                <td width="30"> 
                  <div align="center"><img src="img/pop_point01.gif" width="8" height="17"></div></td>
                <td width="476" class="pop_title01"><%=htm_title%></td>
              </tr>
            </table>
          </td>
        </tr>
      <!----------제목타이틀소메뉴끝---------->
        <tr><td>&nbsp;</td></tr> 
        <tr> 
          <td align="center">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR">
              <tr> 
                <td>
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2">
                    <tr> 
                      <th>조회조건</th>
                      <td>
                        <select name="v_columnname" onchange="javascript:changedColumnName();" class="select">
                          <option value="TOT">선택</option>
                          <option value="제목">제목</option>
                          <option value="작성자">작성자</option>
                          <option value="작성일자">작성일자</option>
                        </select>
                        <input type="text" name="v_searchcont" size="15" readOnly class="input_l">
                      </td>
                      <td class="al_R end">
			          	<span class="btn_Grd" style="cursor:pointer"  border="0" onclick="javascript:doAction('조회');">조회</span>
				  		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:self.close();">닫기</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr> 
            </table>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
              <tr>
                <td align="center">
                  <div id="sheetObj"></div>
                </td>
              </tr>
              <tr>
                <td align="center" class="pdT5">
                   <div id="pagecount"></div>
                </td>
              </tr>
            </table>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
      <% if(rolechk==1){ %>
              <tr>
                <td>
                  <DIV ID="butt1" STYLE="position:relative; display:;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr> 
                      <td class="al_R end">
			          	<span class="btn_Grd" style="cursor:pointer"  border="0" onclick="javascript:doAction('초기화');">초기화</span>
				  		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('등록');">등록</span>
                      </td>
                    </tr>
                  </table>
                  </DIV>
                  <DIV ID="butt2" STYLE="position:relative; display:none;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr> 
                      <td class="al_R end">
			          	<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('초기화');">초기화</span>
				  		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('변경');">등록</span>
				  		<span class="btn_Grd" style="cursor:pointer" onclick="javascript:doAction('삭제');">삭제</span>
				  		<span class="btn_Grd" style="cursor:pointer" onclick="javascript:doPrint();" style="display:none" id="print">인쇄</span>
                      </td>
                    </tr>
                  </table>
                  </DIV>
                  <DIV ID="butt3" STYLE="position:relative; display:none;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr> 
                      <td class="al_R end">
			          	<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('초기화');">초기화</span>
                      </td>
                    </tr>
                  </table>
                  </DIV>      
                </td>
              </tr>
      <%  
        } else {
      %>
              <tr>
                <td>
                  <DIV ID="butt1" STYLE="position:relative; display:;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  </table>
                  </DIV>
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr> 
                      <td class="blue" width="100%" align="right">
                        <img src="img/sky/butt_print.gif"   border="0" style="display:none" onclick="javascript:doPrint();" id="print">
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
      <%  
        } 
      %>
            </table>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
              <tr> 
                <td align="center">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2">
	                      <input type="hidden" name="v_news_author">  <!-- 게시판 게시자 이름 -->
	                      <input type="hidden" name="wt_date">
	                      <input type="hidden" name="wt_time">
	                      <input type="hidden" name="up_date">
	                      <input type="hidden" name="up_time">
	                      <input type="hidden" name="v_page">
                    <tr>
                      <th>기간</th>
                      <td class="end">
                        <input type="text" name="end_date_s" size="10" onKeyUp="chk_date();" maxlength="10" class="input_bbs">
                        ~
                        <input type="text" name="end_date_e" size="10" onKeyUp="chk_date();" maxlength="10" class="input_bbs">			    
                      </td>
                    </tr>               
                    <tr>
                      <th class="nobor">제목</th>
                      <td class="nobor end"><input type="text" name="title" class="input_bbs" size="70"></td>
                    </tr>       
                    <tr>
                      <th class="nobor">내용</th>
                      <!-- <td class="nobor end"><textarea name="comt" style="width:99%;height:173" class="input_bbs"></textarea></td> -->
                      <td class="nobor end"><textarea name="comt" style="width:99%;height:170px" class="input_bbs"></textarea></td>
                    </tr>			
                    <tr>
                      <th class="nobor">첨부파일</th>
                      <td class="nobor end" colspan="2">
                      <div id="attach_files"></div>                    
                      <!-- <OBJECT ID="mySheet1" CLASSID="CLSID:C838E9DA-1625-4E14-8B37-C6706B43C423">
                        <PARAM name="Visible" value="false"></PARAM>
                      </OBJECT>   -->        
                      </td>
                    </tr>            
      <% if(rolechk==1){ %>
                     <tr>
                      <td class="nobor first end" colspan="2">
                        <select name="fileNumber" onChange="javascript:fileNumberChange()" class="select">
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select> 파일첨부할 갯수 선택 (최대 10개까지 가능합니다.)
                      </td>          
                    </tr>        
                    <tr>
                      <td class="nobor topB" colspan="2">
                      <DIV ID="attach0" STYLE="position:relative; display:none;"><INPUT size="50" TYPE="file" NAME="file0" class="input_l"></DIV>
                      <DIV ID="attach1" STYLE="position:relative; display:none;"><INPUT size="50" TYPE="file" NAME="file1" class="input_l"></DIV>
                      <DIV ID="attach2" STYLE="position:relative; display:none;"><INPUT size="50" TYPE="file" NAME="file2" class="input_l"></DIV>
                      <DIV ID="attach3" STYLE="position:relative; display:none;"><INPUT size="50" TYPE="file" NAME="file3" class="input_l"></DIV>
                      <DIV ID="attach4" STYLE="position:relative; display:none;"><INPUT size="50" TYPE="file" NAME="file4" class="input_l"></DIV>
                      <DIV ID="attach5" STYLE="position:relative; display:none;"><INPUT size="50" TYPE="file" NAME="file5" class="input_l"></DIV>
                      <DIV ID="attach6" STYLE="position:relative; display:none;"><INPUT size="50" TYPE="file" NAME="file6" class="input_l"></DIV>
                      <DIV ID="attach7" STYLE="position:relative; display:none;"><INPUT size="50" TYPE="file" NAME="file7" class="input_l"></DIV>
                      <DIV ID="attach8" STYLE="position:relative; display:none;"><INPUT size="50" TYPE="file" NAME="file8" class="input_l"></DIV>
                      <DIV ID="attach9" STYLE="position:relative; display:none;"><INPUT size="50" TYPE="file" NAME="file9" class="input_l"></DIV>
                      </td>
                    </tr>
      <% }else{ %>
                   
      <% }%>
                    <!-- <tr>
                      <td height="1" bgcolor=#D3D3D2 colspan="2"></td>
                    </tr>	 -->	
                  </table>
                </td>
              </tr>
            </table>
            <br>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR">
              <tr> 
                <td height="8" align="center">
                    <div id="hiddenGridObj"></div>
                    <div id="sheetObj1"></div>
                </td>
              </tr>           
            </table>  
          </td>
        </tr>
      </table>  
<!------------------------------------------------------>
  </td>  
</tr>
<tr>
  <td valign='bottom' height='28' style="border-top:1px solid #cccccc;padding:5px 0px;">
    <table width='100%' border="0" cellspacing="0" cellpadding="0" class="pdLR">
      <tr>
        <td height='28' align='left'><img src='img/ft_logo.png'></td>
        <td align='right' valign='bottom'>
       <span class="btn_Grd" style="cursor:pointer"  border="0" onclick="javascript:window.close();">닫기</span>
 </tr>
<!-- <tr>
  <td background='img/pop_cbg.gif' valign='bottom' height='28'>
    <table width='100%'>
      <tr>
        <td height='28' align='left'><img src='img/bott_logoimg.gif'></td>
        <td align='right' valign='bottom'><img src='img/sky/butt_close.gif' width='64' height='19' style='cursor:hand' onclick='javascript:window.close();'>&nbsp;
</tr> -->
    </table>
<%@ include file="/module/pop_footer.inc"%>  
<script language="javascript">
LoadPage();
htm_title = '<%=htm_title%>';
</script>
