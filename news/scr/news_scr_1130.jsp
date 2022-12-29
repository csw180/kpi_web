<%--===============================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : NEWS
'프로그램 ID  : news_scr_1130.jsp
'프로그램 명  : 공지사항(pop-up)
'프로그램개요 : 공지사항(pop-up)
'작   성   자 : 변휘원
'작   성   일 : 2006.9.12
====================================================================
'수정자/수정일 :
'수정사유      :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.text.*"%>
<%@ page import="java.util.*"%>
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
    
    SimpleDateFormat formatter  = new SimpleDateFormat ("yyyyMMdd");
    String    strCurrDate       = formatter.format(new Date(System.currentTimeMillis()));

    DbResultSet  rs          = null;
    DbResultSet  rs1         = null;
    DBProcCall   cp          = new DBProcCall();
    String       strCont     = "";
    int          intCount    = 0;
%>
<%@ include file="/module/pop_header.inc"%>
<script language="JavaScript">
	function setCookie( name, value, expiredays ) {
		var todayDate = new Date();
		todayDate.setDate( todayDate.getDate() + expiredays );
		document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
	}

	function closeWin() { 
		if ( document.frm.notice.checked ) setCookie( "tpms_news_<%=strCurrDate%>", "done" , 1);
		self.close(); 
	}
</script>
<style type="text/css">
<!--
body { background-color: "#eeeeee"}
h1       {font-size:13px;	font-family:"돋움";	color:#676767;	letter-spacing:-1px;	height: 20px;
					border-bottom: 1px;	border-bottom-style: solid;	border-bottom-color: #E9E9E9;	padding: 5px}
.pop_txt {font-size:12px;	font-family:"돋움";	color:#676767; font-style: normal}
table.line {width: 98%; height:5px; background-image:url(/kpi/img/bg_dot.gif)}
.Notice_Title {font-size:24px;font-family:맑은 고딕; font-weight:bold;background:#6a8095;color:#ffffff;text-align:left;padding-left:10px;}
-->
</style>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" scroll="auto" style="overflow-x:hidden">
<form name='frm'>    
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR">
	<tr>
		<td>
<table width="450" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td height="53" align="center" class="Notice_Title">공지사항</td>
  </tr>
  <tr>
    <td valign="top">
      <div align="center">
<%   
   try
   {       
       rs1 = cp.callProc("UP_KPI_C_S_CO공지사항", "1,2");
       if(rs1 != null)                       
       {
            rs1.first();
            while(rs1.next())
            {
                strCont  =   "";
                intCount++;
                                
                rs = cp.callProc("UP_KPI_S_S_NEWS공지사항내용","2,"+rs1.getString("작성일자")+","+rs1.getString("작성시간"));
               
                if(rs != null){
                    rs.first();
                    while(rs.next()){
                        strCont = strCont + rs.getString("내용").trim();
                    }
                }
%>
<!------------------- 여기서부터 반복구간 ------------------------------>
        <table width="450"  border="0" cellspacing="0" cellpadding="0" style="border:1px solid #cccccc;padding:10px;">
          
          <tr>
            <td width="418" valign="top" bgcolor="#FFFFFF">
              <table width="100%"  border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <h1><B><%=rs1.getString("제목").trim()%></B></h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:50px;"><span class="pop_txt"><%=strCont%></span></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
<!------------------- 여기까지 반복구간 ------------------------------>
<%          } // end while
        } // end if
    }catch(Exception ex) {
    }
%>
      </div>
    </td>
  </tr>
  <tr>
    <td height="25" bgcolor="#eeeeee">
<!-- 닫기버튼 -->
      <table border="0" width="100%" height="20" cellpadding="0" cellspacing="0" bgcolor="#eeeeee">
          <tr>
      		<td width="10">&nbsp;</td>
      		<td align="center" width="20"><input type="checkbox" name="notice" value="checkbox" onClick="closeWin()"></td>
      		<td align="left" width="210">오늘은 이 창을 띄우지 않겠습니다.</td>
      		<td width="*">&nbsp;</td>
      		<td align="right" width="150" class="pdTB"><a href="javascript:self.close();"><span class="btn_Grd" style="cursor:pointer" border="0">닫기</span></a></td>
      	    <td width="10">&nbsp;</td>
          </tr>
      </table>
    </td>
  </tr>
</table>
</td></tr></table>
</form>
</body>
<%@ include file="/module/pop_footer.inc"%>  
<%    
    if(intCount==1)
    {
    %>    
<script>
    // 공지 게시물 사이즈가 600 이상미면 600 으로, 미만이면 해당사이즈로 팝업크기를 재조정
    //var iDocHeight = document.body.clientHeight; 
    var iDocHeight = window.innerHeight; 
    //alert(iDocHeight)
    if(iDocHeight < 600){
      //alert("111")
      window.resizeTo(500, iDocHeight);
    }
    else{
      //alert("222")
      window.resizeTo(500, 600);
    }
</script>        
    <%    
    }
%>   