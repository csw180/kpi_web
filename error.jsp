<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
  String message=null;
  String hidden_key=null;
  
  try {
    message=request.getParameter("FORM_MESSAGE");
    hidden_key=request.getParameter("hidden_key");
    
    if (message != null && message.length()>2 ) {
    	System.out.println("message is not null");
    	System.out.println("message : " + message.indexOf("직원"));

    	if (message.equals("직원번호를 확인 하세요") || message.equals("비밀번호를 확인 하세요")) {
    		message = "등록되지 않은 사용자입니다. 관리자에게 문의 바랍니다."; 
    	}
%>
<SCRIPT LANGUAGE="javascript">
<!--
	alert("<%=message%>");
    self.location="/kpi/ssologinMess.htm?LOGIN=1";
-->
</SCRIPT>

<%  } else if (hidden_key !=null && hidden_key.length()>=1 ) {%>
<?xml version="1.0"  ?>
<SHEET>
<RESULT Code="-1" Message="세션이 없습니다 다시 로그인 하세요"/>
</SHEET>
<%  }else{%>

<SCRIPT LANGUAGE="javascript">
<!--
    alert("세션이 없습니다 다시 로그인 하세요");
        
	if(window.parent!=null){
        window.top.location="ssologinMess.htm";
    } else {
	    if(window.opener==null || window.opener==""){ 
	        window.top.location="ssologinMess.htm";
	    }else{ 
	        window.opener.top.location="ssologinMess.htm";
	        window.close();
	    }
    }
-->
</SCRIPT>
<%
    }
  }catch(Exception exxx) {

  }
%>

