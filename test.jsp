<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="javax.naming.*" %>
<%@ page import="javax.sql.*" %>
<%@ page import="java.sql.*" %>
<%//@ page import="org.apache.log4j.Logger" %>
<%@ page import="java.util.Properties" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>test</title>

</head>
<body>
<%
InitialContext cxt = new InitialContext();

if ( cxt == null ) {
   throw new Exception("Uh oh -- no context!");
}

DataSource ds = (DataSource) cxt.lookup( "jdbc/dsKpiOra19" );
//DataSource ds1 = (DataSource) cxt.lookup( "jdbc/dsTpa01Ora19" );
//DataSource ds = (DataSource) cxt.lookup( "java:/comp/env/jdbc/postgres" );


if ( ds == null ) {
   throw new Exception("Data source not found!");
}

Connection conn = ds.getConnection();
//Connection conn1 = ds1.getConnection();

//log.debug("test=========================================");
%>
kpi = <%=conn %><br>1111111111111111111
<%
   if( conn != null) {
      conn.close();
   }
%>

<form id="excelUploadForm" name="excelUploadForm" enctype="multipart/form-data" method="post" action="excelUploadAjax.do1">
   <input id="excelFile" type="file" name="excelFile"/>
   <button type="button" id="addExcelImportBtn"  onclick="check()"><span>추가</span></button>
</form>

</body>
<SCRIPT LANGUAGE="javascript">
   function checkFileType(filePath) {
      var fileFormat = filePath.split(".");
      var rtnVal = false;
      
      if(fileFormat.indexOf("xls") > -1 || fileFormat.indexOf("xlsx") > -1) {
         rtnVal = true;
      } 
      
      return rtnVal;
   }
   function check() {
      var file = $('#excelFile').val();
      
      if(file == "" || file == null) {
         alert("File Nothing!");
         return false;
      } else if(!checkFileType(file)) {
         alert("File Missing!");
         return false;
      } 
      
      if(confirm("Want Upload?")) {
         var options = {
            success:function(data) {
               console.log(data)
               alert("Upload Ok!")
            }, dataType:"POST"   
         };
         
         $('#excelUploadForm').ajaxSubmit();
      }
   }
</script>
</html>