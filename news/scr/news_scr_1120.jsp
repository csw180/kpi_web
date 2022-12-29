<%--===============================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : NEWS
'프로그램 ID  : news_scr_1120.jsp
'프로그램 명  : 게시판(pop-up)
'프로그램개요 : 게시판(pop-up)
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
<%  String    topmenu_name    = "게시판"; 
    String    leftmenu_name   = "보고서"; 
    String    htm_title       = "게시판"; 
    String    actionname      = "";
    String    haengwon_no     = "";
    Exception piex            = null;
    String    strErrMsg       = "";
    String    status          = "0";

    // USERID
    SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
    String UserID             = account.getHaengwon_no();
    
    //메인에서 넘어오는 값들..
    String key     =    JSPUtil.getParameter(request,"key","");         //메인에서 넘어온것일때 = 1
    
%>
<%@ include file="/module/pop_header.inc"%>

<script language="JavaScript">
    var g_key       = '<%=key.trim()%>';
    var g_userid    = '<%=UserID.trim()%>';
    var fstSrchFlag = true;
    
  	//paging 변수
    var tCnt = 0; //총건수
    
    function mySheet_OnSelectMenu(MenuStr, Code){
    	doAction(sAction);
   	}
    
	function mySheet_OnClick(Row,Col,Value){
		play_data(Row);
	    
	    if(document.frm.title.value.length>0)
	    {
	        document.all.print.style.display="";
	        document.all.print.style.cursor="hand";
	    }
	    else
	    {
	        document.all.print.style.display="none";
	        document.all.print.style.cursor="";
	    }  
    }
	
	function mySheet_OnSearchEnd(Code, Msg){
		if(!(key=="" || key==null)){ 
            var fRow=mySheet.FindText("KEY",key, 0, 2 );
            mySheet.SelectCell(fRow, "제목");
            play_data(fRow);
        }
		
		if(!fstSrchFlag) {
			makePaging(tCnt, c_page, pagecount);
    	}
		
		showMsg(Code, Msg);
	}	
	
	function hiddenGrid_OnSearchEnd(Code, Msg){
		
		if(fstSrchFlag) {
			tCnt = parseInt(hiddenGrid.GetCellValue(1, 0));
			/*
			count=hiddenGrid.GetCellValue(1, 0);
			
	        if(count%10==0) {pageTotal=count/10;}
	        else if(count > 10) {pageTotal=(count/10) + 1;}
	        else{ pageTotal=1;}
	        
			pageTotal=Math.round(pageTotal,0);
	        pagecount.innerHTML="";
	        
			for(pagecnt=1; pagecnt <= pageTotal; pagecnt++)
	        {
	        	pagecount.innerHTML  += "[<a href=\"javascript:doPage('"+pagecnt+"');\">"+pagecnt+"</a>]";
	        }
			*/
			makePaging(tCnt, c_page, pagecount);
			
			fstSrchFlag = false;
		}
		
		if(chkread) return;
	    var comt_val  = "";
	    for(var n=1; n<=hiddenGrid.RowCount(); n++) comt_val += hiddenGrid.GetCellValue(n, 0);
	    document.frm.comt.value = enter_chg1(comt_val);
	}

</script>
<script language="JavaScript" src="news/scr/news_scr_1120.js"></Script>
<%@ include file="/module/pop_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr> 
    <td>
      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2">
        <tr> 
          <th>조회조건</th>
          <td valign="middle">
            <select name="v_columnname" onchange="javascript:changedColumnName();" class="select">
              <option value="TOT">선택</option>
              <option value="제목">제목</option>
              <option value="작성자">작성자</option>
              <option value="작성일자">작성일자</option>
            </select>
            <input type="text" name="v_searchcont" size="40" readOnly class="input_l">
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
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="mgT5">
  <tr>
    <td align="center">
      <div id="sheetObj"></div>
    </td>
  </tr>
  <tr>
    <td align="center">
       <div id="pagecount" class="pdT5"></div>
    </td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="mgT5">
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
      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="mgT5">
        <tr> 
          <td class="blue" width="100%" align="right">
          	<span class="btn_Grd" style="cursor:pointer"  border="0" onclick="javascript:doAction('초기화');">초기화</span>
	  		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:answer();">답변</span>
	  		<span class="btn_Grd" style="cursor:pointer; display:none;" border="0" onclick="javascript:doAction('변경');">변경</span>
	  		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('등록');">등록</span>
	  		<span class="btn_Grd" style="cursor:pointer; display:;" id="iplay3" onclick="javascript:doAction('삭제');">삭제</span>
	  		<span class="btn_Grd" style="cursor:pointer; display:none;" onclick="javascript:doPrint();" id="print">인쇄</span>
	  		
            <!-- <img src="img/sky/butt_reset.gif" border="0" onclick="javascript:doAction('초기화');" style="cursor:hand">&nbsp;
            <img src="img/sky/butt_replay.jpg" border="0" onclick="javascript:answer();" style="cursor:hand">&nbsp;
            <img src="img/sky/butt_change.gif" border="0" style="display:none" onclick="javascript:doAction('변경');" style="cursor:hand">&nbsp;
            <img src="img/sky/butt_entry.gif"  border="0" onclick="javascript:doAction('답변');" style="cursor:hand">&nbsp;
            <img src="img/sky/butt_delete.gif" border="0" id="iplay3" style="display:" onclick="javascript:doAction('삭제');" style="cursor:hand">&nbsp;
            <img src="img/sky/butt_print.gif"   border="0" style="display:none" onclick="javascript:doPrint();" id="print"> -->
          </td>
        </tr>
      </table>
      </DIV>
      <DIV ID="butt3" STYLE="position:relative; display:none;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr> 
          <td class="blue" width="100%" align="right">
          	<span class="btn_Grd" style="cursor:pointer"  border="0" onclick="javascript:doAction('초기화');">초기화</span>
	  		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:answer_nonauthor();">답변</span>
          </td>
        </tr>
      </table>
      </DIV>  
      <DIV ID="butt4" STYLE="position:relative; display:none;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr> 
          <td class="blue" width="100%" align="right">
          	<span class="btn_Grd" style="cursor:pointer"  border="0" onclick="javascript:doAction('초기화');">초기화</span>
	  		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:answer();">답변</span>
	  		<span class="btn_Grd" style="cursor:pointer" border="0" onclick="javascript:doAction('등록');">등록</span>
            <!-- <img src="img/sky/butt_reset.gif"  border="0" onclick="javascript:doAction('초기화');" style="cursor:hand">
            <img src="img/sky/butt_replay.jpg" border="0" onclick="javascript:answer();" style="cursor:hand">
            <img src="img/sky/butt_entry.gif"  border="0" onclick="javascript:doAction('답변');" style="cursor:hand"> -->
          </td>
        </tr>
      </table>
      </DIV>               
    </td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="mgT5">
  <tr> 
    <td align="center">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2">
        
        <tr>
		    <th>제목</td>
			<td class="end">
			    <input type="text" name="title" class="input_bbs" size="70">
			    <input type="hidden" name="v_news_author">  <!-- 게시판 게시자 이름 -->
		         <input type="hidden" name="wt_date">        <!-- 게시판 작성일자    -->
		         <input type="hidden" name="wt_time">        <!-- 게시판 작성시간    -->
		         <input type="hidden" name="up_date">        
		         <input type="hidden" name="up_time">
		         <input type="hidden" name="v_page">
			</td>
        </tr>         
        <tr valign=top>
        	<th class="vtm nobor">내용</td>
        	<td class="end nobor"><textarea name="comt" rows="" cols="" style="width:99%;height:170px" class="input_bbs"></textarea></td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<div id="hiddenGridObj"></div>
<br>
<br>
<!--
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td background='img/pop_cbg.gif' valign='bottom' height='30'>
      <table width='100%'>
        <tr>
          <td height='28' align='left'><img src='img/bott_logoimg.gif'></td>
          <td align='right'><img src='img/sky/butt_close.gif' width='64' height='19' style='cursor:hand' onclick='javascript:window.close();'>&nbsp;
        </tr>
      </table>
    </td>
  </tr>  
</table> -->
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
    </table>
<%@ include file="/module/pop_footer.inc"%>  
<script language="javascript">
LoadPage();
htm_title = '<%=htm_title%>';
</script>
