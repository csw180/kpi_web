<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="tpms.framework.component.signon.*"%>
<%@ include file="./config.jsp" %>
<%
	String uurl = "";
	String uparam = "";
	int loginCnt = 0; 
	
	//http://test.suhyup.co.kr/agent/sso/login_exec.jsp : 꼭 도메인으로 호출해야 된다.
	//1.SSO ID 수신
	String sso_id = getSsoId(request);
	System.out.println("*================== [login_exec.jsp]  sso_id = "+sso_id);
	
	if(sso_id != null) {
		if(session.getAttribute("LOGIN_CNT") != null) {
			loginCnt = (int)session.getAttribute("LOGIN_CNT");
		}
	} 
	
	if(loginCnt == 0) {
		uurl = request.getParameter("UURL");
		uparam = request.getParameter("PARAM");
	} else if(loginCnt > 0) {
		if(uurl == null || "".equals(uurl)) {
			Cookie[] cookies = request.getCookies();
			if (cookies != null) {
				for (int loop = 0; loop < cookies.length; loop++) {
					if (cookies[loop].getName().equals("tmpUurl")) {
						uurl=cookies[loop].getValue();
					}
				}
			}
			
			System.out.println("*================== [login_exec.jsp] cookie uurl = "+uurl);
		}
	}
	
	//System.out.println("*================== [login_exec.jsp] loginCnt = "+loginCnt);
	System.out.println("*================== [login_exec.jsp] get param uurl = "+uurl);
	System.out.println("*================== [login_exec.jsp] get param param = "+uparam);
	
	if(loginCnt == 0 && uurl != null && !"".equals(uurl)) {
		//session.setAttribute("TMP_UURL",uurl);
		
		System.out.println("*================== [login_exec.jsp]  cookie tmpUurl 등록 S ");
		Cookie tmpUurl = new Cookie("tmpUurl", uurl);
		tmpUurl.setPath("/");
		response.addCookie(tmpUurl);
		
		if(!"".equals(uparam) && uparam != null) {
			
			String[] arrParam = uparam.split("@@");
			
			for(int i = 0; i<arrParam.length; i++) {
				
				System.out.println("*================== [login_exec.jsp]  cookie param 등록 SS1 " + arrParam[i]);
				
				String [] itemParam = arrParam[i].split(":");
				
				if(!":".equals(arrParam[i].substring(arrParam[i].length()-1)) ) {
					
					Cookie cParam = new Cookie(itemParam[0], itemParam[1]);
					cParam.setPath("/");
					response.addCookie(cParam);
					
					System.out.println("*================== [login_exec.jsp]  cookie param 등록 SS2 " + itemParam[0] + " : " + itemParam[1]);
				
				}
				
				//CookieManager.addCookie(itemParam[0], itemParam[1], SSO_DOMAIN, response);
				
			}
		}
		
		System.out.println("*================== [login_exec.jsp]  cookie param 등록 E ");

		session.setAttribute("LOGIN_CNT", 1);
	}
	
	
	if (sso_id == null || sso_id.equals("")) {
		System.out.println("*================== [login_exec.jsp]  sso_id is null go loginPage ");
		
		//2.SSO 로그인 페이지 호출
		goLoginPage(response);
		
		return;
	} else {
		
		System.out.println("*================== [login_exec.jsp]  sso_id Convert user id = "+convertEmpNo(sso_id));

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
		String rUrl = "";
		if(!"".equals(uurl) && uurl != null) {
			rUrl = "?UURL=" + uurl;
		}
		//response.sendRedirect("template.jsp"+rUrl);
		//out.println("인증성공");
		
		//System.out.println("rUrl : " + rUrl);
		
		session.setAttribute("SSO_SYNC_ID",convertEmpNo(sso_id));
		session.setAttribute("SSO_SYNC_PASSWORD","SSO_PASS");
		response.sendRedirect("/kpi/login1.jsp"+rUrl);
		
		/*
		SignOnFacade signOn = new SignOnFacade();
		boolean authenticated = signOn.authenticate(convertEmpNo(sso_id), "EKPUSER");
		out.println("authenticated : " + authenticated);
		*/		
	}
%>
<%!
	// sso ID를 사번으로 변경 
  	public String convertEmpNo(String ssoId){ 
    	String empNo = ssoId;
    	
    	if(ssoId != null) {
    		if(ssoId.length()==10) {
    			if(ssoId.substring(0,3).equals("000")){
         			empNo = ssoId.substring(3);             
	           		
         			if(empNo.substring(0,1).equals("0")){
	             			empNo = empNo.substring(1);
	           		}
	       		}
    		}
    		/* 개발자 임시 */
           	else {
           		if(ssoId.substring(0,4).equals("TPM_")){
           			empNo = "9999" + ssoId.substring(4);
           		} else {
           			empNo = ssoId;
           		}
           	}
    	}
    	
        return empNo;
  	}
%>
