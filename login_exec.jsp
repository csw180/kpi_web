<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="./config.jsp" %>
<%

	String uurl = null;
	uurl = request.getParameter("UURL");

	//http://test.suhyup.co.kr/agent/sso/login_exec.jsp : 꼭 도메인으로 호출해야 된다.
	//1.SSO ID 수신
	String sso_id = getSsoId(request);
	System.out.println("*================== [login_exec.jsp]  sso_id = "+sso_id);
	
	//System.out.println(getEamSessionCheckAndAgentValid(request, response));
	
	
	if (sso_id == null || sso_id.equals("")) {
		//2.SSO 로그인 페이지 호출
		goLoginPage(response); 
		return;
	} else {

		//3.쿠키 유효성 확인 :0(정상)
		String retCode = getEamSessionCheckAndAgentVaild(request,response);
		System.out.println("*================== [retCode]  retCode = " + retCode);
	
		if(!retCode.equals("0")){
			goErrorPage(response, Integer.parseInt(retCode));
			return;
		}
		//
		//4.업무시스템에 읽을 사용자 아이디를 세션으로 생성
		String EAM_ID = (String)session.getAttribute("SSO_ID");
		if(EAM_ID == null || EAM_ID.equals("")) {
			session.setAttribute("SSO_ID", sso_id);
		}
		out.println("SSO 인증 성공!!");

		//5.업무시스템 페이지 호출(세션 페이지 또는 메인페이지 지정)  --> 업무시스템에 맞게 URL 수정!
		//response.sendRedirect("app01.jsp");
		response.sendRedirect("template.jsp?UURL="+uurl);
		//out.println("인증성공");
	}
%>
