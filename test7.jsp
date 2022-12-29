<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/module/jsp_header.inc"%>
<%  
    String      topmenu_name     = "";
    String      leftmenu_name    = ""; 
    String      htm_title        = "테스트"; 
    String      actionname       = "";
    String      haengwon_no      = "";
    String      strErrMsg        = "";
    String      status           = "0";
%>
<%@ include file="/module/htm_header.inc"%>
<script language="javascript" src="test7.js"></script>
<script language = "javascript">
function mySheet_OnSelectMenu(sAction) {
    doAction(sAction);
}
 
function mySheet_OnLoadExcel(result) {
	mySheet.FitSize(false, true);
}
</script>

<%@include file="/module/htm_title.inc"%>
<%@include file="/module/sub_title.inc"%>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabletype2 pdLR">
  <tr> 
    <td align="right" class="end">
      <img src="/kpi/img/sky/butt_upload.jpg"  border="0" onclick="javascript:doAction('엑셀올리기');"   style="cursor:pointer" name="btn_upload">
    </td>
  </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" class="pdLR mgT5">
  <tr>
    <td>
       <div id="sheetObj"></div>
    </td>
  </tr>
</table>
<div id="hiddenGridObj"></div>      
<%@include file="/module/htm_footer.inc"%>
<script language="javascript">
LoadPage();
htm_title = '<%=htm_title%>';
</script>