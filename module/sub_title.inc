<!-- sub_titile 시작입니다 -->
<%   String Security = JSPUtil.getParameter(request, "Security" ,"");
     String sIsPoup  = JSPUtil.getParameter(request, "IS_POPUP" ,"");
     String sProURL  = JSPUtil.getParameter(request, "SCREEN_URL" ,"");  
     
     if(sIsPoup.equals("Y")) { 
        DbResultSet rsSeurity       = null;
        DBProcCall  cpSeurity       = new DBProcCall();
    
        try {
            rsSeurity = cpSeurity.callProc("UP_KPI_S_S_CO프로그램보안등급", sProURL);
            if(rsSeurity != null) {
                rsSeurity.first();
                while(rsSeurity.next()){
                    Security = rsSeurity.getString("보안등급");                  
                }
            }
        }catch(Exception ex) {}   
     }   // end if
     
     String sSecurityLevel  = "";       // 보안등급
     int iSecLevel          = 0;
     
     if(!Security.equals("") && !Security.equals("0")){
        iSecLevel = new Integer(Security).intValue();
     }
      
     for(int i=0; i<4; i++) {
        if(iSecLevel == i) { break;}  
        sSecurityLevel = sSecurityLevel + "★";
     }
     
     for(int i=0; i<(4-iSecLevel); i++) {
        sSecurityLevel = sSecurityLevel + "☆";
     }
%>
  <table width="100%" border="0" cellspacing="0" cellpadding="0" align="cneter" class="pdLR">
    <tr> 
      <td width="10">
      	<input type='hidden' name='security' value='<%=Security%>'>
      	<img src="/kpi/img/board_title03.png" class="pdR5 pdT3">
      </td>
      <td width="468" class="menu3 pdTB"><%=htm_title%></td>
      <td align="right"><img src="/kpi/img/btn_help.gif" style="cursor:hand" onclick="help_open()" align="absmiddle">&nbsp;</td>
    <%if(!Security.equals("") && !Security.equals("0")){%><td width="118"><img src="/kpi/img/grade_<%=Security%>.gif" width="118" height="19" align="absmiddle"></td><%}%>     
    </tr>
    <tr > 
      
      <td height="2" colspan="4" background="/kpi/img/ico_line_title2.png"></td>
    </tr>
    <tr > 
      <td height="4" colspan="4" background="/kpi/img/board_title01.gif"></td>
    </tr>
  </table>
  <input type='hidden' name="Security_Level"    value="<%=sSecurityLevel%>">
<script language="javascript">
  var fullurl = document.URL;
  var pg_url  = fullurl.substring(fullurl.indexOf("/kpi/")+5, fullurl.indexOf("?"));
</script>
<!-- sub_titile 끝입니다 -->
