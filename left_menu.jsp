<%--===============================================================
'주  시 스 템 : 성과관리시스템
'서브  시스템 : 왼쪽메뉴
'프로그램 ID  : left_menu.jsp
'프로그램 명  : 왼쪽메뉴
'프로그램개요 : 왼쪽메뉴.
'작   성   자 : 변휘원
'작   성   일 : 2006.03.21
====================================================================
'수정자/수정일 :
'수정사유      :
===============================================================--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="tpms.common.web.CommonWebKeys"%>
<%@ page import="tpms.framework.component.util.JSPUtil"%>
<%@ page import="tpms.framework.component.signon.SignOnUserAccount"%>
<%@ page import="tpms.framework.component.signon.dao.*"%>
<%@ page import="tpms.framework.component.error.ErrorHandler"%>
<%@ page import="tpms.framework.component.dao.*"%>

<% String haengwon_no   = "";
   String haengwon_name = "";
   String menu_gubun    = "";
   String mname         = "";
   String branchName    = "";
   String menuitem      = "";
   String image         = "";
   String tempImage     = ""; //메뉴관련 default 설정부
   String menu_group    = JSPUtil.getParameter(request,"group",""); //top menu 에서 선택된 menu
   String prgNm    		= JSPUtil.getParameter(request,"prgNm",""); //top menu 에서 선택된 menuName
   DbResultSet rs       = null;
   DBProcCall  cp       = new DBProcCall();
   UserDAO     userDAO  = new UserDAO();

   try
   {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (int loop = 0; loop < cookies.length; loop++) {
                if (cookies[loop].getName().equals("topitem")) {
                    menu_gubun=cookies[loop].getValue();
                }
                if (cookies[loop].getName().equals("menuitem")) {
                    menuitem=cookies[loop].getValue();
                }
            }
        }
   }catch(Exception e){

   }

   //top 에서 선택된 경우
   if (!menu_group.equals("")){
        if(!menu_group.equals(menu_gubun)){
            menu_gubun=menu_group;
       }
   }

   rs=null;
   //if(menu_group.equals("999999")) menu_gubun="10000"; //첫로딩인 경우 (즉 로그인 후)

   try
   {    SignOnUserAccount account = (SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);
        haengwon_no   = account.getHaengwon_no();
        haengwon_name = account.getHaengwon_name();
        branchName    = account.getBranch_name();
        //rs            = cp.callProc("wp_co메뉴목록","TOP,00000,"+haengwon_no);
        rs            = cp.callProc("UP_KPI_S_S_CO메뉴목록","TOP,00000,"+ haengwon_no);

        if(!menu_gubun.equals("")){

            if(rs!=null){
               rs.first();
               int i = 0;
               while(rs.next()){

                   if (rs.getString("프로그램ID").trim().equals(menu_gubun)){
                       mname=rs.getString("프로그램명");
                       image=rs.getString("이미지").trim();
                       break;
                   }

                   //메뉴관련 default 설정부
                   if(tempImage.equals("")){
                      //로그인 후 첫번째 메뉴 로딩인 경우 default 설정인 경우
                      if(menu_group.equals("999999")) menu_gubun = rs.getString("프로그램ID").trim();
                      tempImage  = rs.getString("이미지").trim();
                   }
                   i++;
               }
           }
        }
        rs = null;
        //rs = cp.callProc("wp_co메뉴목록","LEFT,"+menu_gubun+","+haengwon_no);
        rs = cp.callProc("UP_KPI_S_S_CO메뉴목록","LEFT,"+menu_gubun+","+haengwon_no);

   }catch(Exception ex) {
   }

   String  strMsg = "";
   DbResultSet rs1 = userDAO.getLastLoginInfo(haengwon_no);
   if(rs1!=null && rs1.next()) {
       if(rs1.getString("IP")!=null) {
           strMsg = "IP     : " +  (rs1.getString("IP")==null ? "" : rs1.getString("IP")) + "\\n\\n" +
                    "일시  : " + (rs1.getString("발생일자")!=null && rs1.getString("발생일자").length()==8 ? rs1.getString("발생일자").substring(0, 4) + "년 " +
                                                                                                             rs1.getString("발생일자").substring(4, 6) + "월 " +
                                                                                                             rs1.getString("발생일자").substring(6, 8) + "일 " : "")
                               + (rs1.getString("발생시간")!=null && rs1.getString("발생시간").length()==6 ? rs1.getString("발생시간").substring(0, 2) + "시 " +
                                                                                                             rs1.getString("발생시간").substring(2, 4) + "분 " : "") + "\\n\\n" +
                    "에 최종로그아웃 하셨습니다.";
                                                                                                                            
       }
   }
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1">
<title></title>
<link rel="stylesheet" href="css/css.css" type="text/css">
</head>
<script language=javascript src="module/common.js"></script>
<script language=javascript src="module/left_menu.js"></script>
<script language="JavaScript">
function topcallbody(m,n){
<%if(!menu_group.equals("999999")){%>
   var programurl=eval("document.left.url"+m+n+".value;");
   window.parent.mainFrame.location=programurl;
<%}%>
}
</script>
<body  leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" style="background:#f4fdff;overflow-y:auto;overflow-x:hidden;">
<!-- <body  leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" oncontextmenu="return false" onselectstart="return false" ondragstart="return false"> -->
<form name="left">
<div align="left">
  <table width="190" height="100%" border="0" cellpadding="0" cellspacing="0"><!-- 467 -->
    <tr>
      <!-- 메뉴관련 default 설정부  -->
      <%-- <td width="190" height="36"><img src="img/left_title<%=image.equals("")?tempImage:image%>.gif" width="190" height="36"></td> --%>
      <td width="190">
      	<div style="height:50px;background:#33628e;color:#ffffff;">
	      	<span class="Menu_Title"><%=("".equals(prgNm)) ? "영업점보고서" : prgNm%></span>
      	</div>
      </td>
    </tr>
    <tr>
      <td align="center" valign="top" class="pdL10" background="img/left_bg01.gif">
       <table width="176" border="0" cellspacing="0" cellpadding="0">
<% int icnt       = 0;
   int jcnt       = 0;
   int chk_sp     = 0; // 초기값 1에서 0으로 변경 사유 : 하위 메뉴가 없는경우 상위 메뉴를 메뉴리스트로 생성됨.
   String prgmid  = "";
   String submenu = "";
   String security ="";
   try
   {
       if(rs != null)
       {
            rs.first();
            while(rs.next())
            {

                if(rs.getString("메뉴종류").trim().equals("LEFT")){
                    if (!rs.getString("상위프로그램ID").trim().equals(menu_gubun)) continue;
                    submenu=rs.getString("프로그램ID").trim();
                    icnt++;
                    if(chk_sp!=0){ // 값 1에서 0으로 변경 사유 : 하위 메뉴가 없는경우 상위 메뉴를 메뉴리스트로 생성됨.
%>
                        </table>
                        </span>
                        <!--------첫번�메뉴서브테이블끝----------->
                      </td>
                    </tr>
<%                  }%>
          <tr id="img<%=icnt%>" onclick="chk_span(<%=icnt%>);setCurMenu('<%=icnt%>');" style="cursor:pointer">
            <td width="7" height="28">&nbsp;</td>
            <td width="16" height="28"><img src="img/bullet_02.gif"></td>
            <td width="153" height="30" class="menu1"><%=rs.getString("프로그램명").trim()%></td>
          </tr>
          <tr bgcolor="#e2e2e2" ><td height="1" colspan="3" ></td></tr>
       <tr>
        <td align="center" colspan="3"><span id="sp<%=icnt%>" style="display:none">
         <table width="100%" border="0" cellspacing="0" cellpadding="0" class="Lmenupd">
<%                      chk_sp=1;
                }else if(rs.getString("메뉴종류").trim().equals("GM")){
                    if(rs.getString("상위프로그램ID").trim().equals(menu_gubun)){
                        submenu = menu_gubun;
                    }
                    if (!rs.getString("상위프로그램ID").trim().equals(submenu)) continue;
                        chk_sp++;
                        if(rs.getString("프로그램URL").trim().indexOf('?') > 0) security="&Security=";
                        else                                                    security="?Security=";
%>
          <tr id="sub<%=icnt%><%=chk_sp%>">
            <!-- <td height="23" width="14">&nbsp;</td> -->
            <td height="23"><img src="img/bullet_03.gif" class="vtm pdR4"></td>
            <td height="23">
              <a href="javascript:<%if(rs.getString("팝업유무").trim().equals("1")){%>winopen('<%=rs.getString("프로그램URL").trim()%><%=security%><%=rs.getString("보안등급").trim()%>');<%}else{%>call_body('<%=rs.getString("프로그램URL").trim()%><%=security%><%=rs.getString("보안등급").trim()%>')<%}%>" onfocus="this.blur()" onclick="clickSub('<%=icnt%>','<%=chk_sp%>');"><%=rs.getString("프로그램명").trim()%></a>
              <input type="hidden" name="url<%=icnt%><%=chk_sp%>" value="<%=rs.getString("프로그램URL").trim()%>?Security=<%=rs.getString("보안등급").trim()%>">
            </td>
          </tr>
<%                  jcnt++;
                }

            }
       }
   }catch(Exception exx)  {

   }
%>
<%if(icnt>0){%>
      </table></span></td></tr>
<%}%>
    <input type="hidden" name=icnt value="<%=icnt%>">
   </table></td></tr>
  <tr><td height="1"></td></tr>
 </table>
</form>
</body>
</html>
<script language='javascript'>
    function viewMessage() {
        setCookie('isMessage','true');
        //최종로그아웃 화면출력 제거
        //alert("<%=strMsg%>");
    }

    setCookie('topitem','<%=menu_gubun%>');
<%
    if(strMsg!=null && strMsg.length()>0) {
%>      if(getCookie('isMessage')!='true') {
            setTimeout("viewMessage()", 500);
        }
<%  }%>
</script>
