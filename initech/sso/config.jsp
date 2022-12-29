<%@page import="com.initech.eam.api.NXNLSAPI"%> 
<%@page import="com.initech.eam.smartenforcer.SECode"%>
<%@page import="java.util.Vector"%>
<%@page import="com.initech.eam.nls.CookieManager"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="org.apache.log4j.PropertyConfigurator"%>
<%@page import="com.initech.eam.api.NXContext"%>
<%!
/**[INISAFE NEXESS JAVA AGENT]**********************************************************************
* 업무시스템 설정 사항 (업무 환경에 맞게 변경)
***************************************************************************************************/


/***[SERVICE CONFIGURATION]***********************************************************************/
	private static String SERVICE_NAME  = "";
	private static String SERVER_URL 	= "";
	private static String ASCP_URL      = "";
	
	private String custom_url = "";
/*************************************************************************************************/


/***[SSO CONFIGURATION]**]***********************************************************************/
	private static String NLS_URL 		 = "XXX";
	
	private static String NLS_LOGIN_URL = "";
	//private String NLS_LOGIN_URL = NLS_URL + ":" + NLS_PORT + "/nls3/cookieLogin.jsp";
	private static String NLS_LOGOUT_URL= "";
	private static String NLS_ERROR_URL = "";
	private static String ND_URL = "";
	private static String COOKING_PADDING = "";

	private static Vector PROVIDER_LIST = new Vector();

	private static final int COOKIE_SESSTION_TIME_OUT = 3000000;

	// 인증 타입 (ID/PW 방식 : 1, 인증서 : 3)
	private String TOA = "1";
	private static String SSO_DOMAIN = "";

	private static final int timeout = 15000;
	private static NXContext context = null;
	
	private static String providerServer = "" ; 
	private static String serverType = "TEST" ; // DEV, TEST, PROD
	
	static{
		System.out.println("serverType : " + serverType);
		
		/* 개발 없음 test로 사용*/
		if ( serverType.equals("DEV") ) {  // 개발환경 
			/* 업무시스템 환경 설정 */
			//SERVER_URL = "http://shssodev.suhyup.co.kr" ;
			//ASCP_URL = SERVER_URL + ":7060/3rdParty/sso/login_exec.jsp";
			SERVER_URL = "http://nkpitest.suhyup.co.kr" ;
            ASCP_URL = SERVER_URL + ":60060/kpi/initech/sso/login_exec.jsp";

			/* SSO 환경설정 */
			NLS_URL 		 = "http://shssodev.suhyup.co.kr";
			
			NLS_LOGIN_URL    = NLS_URL +  ":7060/nls3/clientLogin.jsp";
			NLS_LOGOUT_URL   = NLS_URL +  ":7060/nls3/NCLogout.jsp";
			NLS_ERROR_URL    = NLS_URL +  ":7060/nls3/error.jsp";
			
			ND_URL           = "http://shssodev.suhyup.co.kr:5480";
			
			COOKING_PADDING = "_V42" ;
			SSO_DOMAIN = ".suhyup.co.kr" ;
			providerServer = "shssodev.suhyup.co.kr" ;
		} else if ( serverType.equals("TEST") ) {  // 테스트환경 
			/* 업무시스템 환경 설정 */
			//SERVER_URL = "http://test.suhyup.co.kr/" ;
			//ASCP_URL = SERVER_URL + ":80/sso/login_exec.jsp";
			SERVER_URL = "http://nkpitest.suhyup.co.kr" ;
            ASCP_URL = SERVER_URL + ":60060/kpi/initech/sso/login_exec.jsp";
			/* SSO 환경설정 */
			NLS_URL 		 = "http://shssotest.suhyup.co.kr";
			
			NLS_LOGIN_URL    = NLS_URL +  ":7060/nls3/clientLogin.jsp";
			NLS_LOGOUT_URL   = NLS_URL +  ":7060/nls3/NCLogout.jsp";
			NLS_ERROR_URL    = NLS_URL +  ":7060/nls3/error.jsp";
			
			ND_URL           = "http://shssotest.suhyup.co.kr:5480";
			
			COOKING_PADDING = "_V42" ;
			SSO_DOMAIN = ".suhyup.co.kr" ;
			providerServer = "shssotest.suhyup.co.kr" ;
			
		} else {  // 운영환경
			/* 업무시스템 환경 설정 */
			//SERVER_URL = "http://prod.suhyup.co.kr/" ;
			//ASCP_URL = SERVER_URL + ":80/sso/login_exec.jsp";
			SERVER_URL = "http://nkpi.suhyup.co.kr" ;
			ASCP_URL = SERVER_URL + ":60060/kpi/initech/sso/login_exec.jsp";

			/* SSO 환경설정 */
			NLS_URL 		 = "http://shsso.suhyup.co.kr";
			
			NLS_LOGIN_URL    = NLS_URL +  ":7060/nls3/clientLogin.jsp";
			NLS_LOGOUT_URL   = NLS_URL +  ":7060/nls3/NCLogout.jsp";
			NLS_ERROR_URL    = NLS_URL +  ":7060/nls3/error.jsp";
			
			ND_URL           = "http://shsso.suhyup.co.kr:5480";
			
			COOKING_PADDING = "_V42P" ;
			SSO_DOMAIN = ".suhyup.co.kr" ;
			providerServer = "shsso.suhyup.co.kr" ;
			
		}
		
		List<String> serverurlList = new ArrayList<String>();
		serverurlList.add(ND_URL);

		context = new NXContext(serverurlList,timeout);
		CookieManager.setEncStatus(true);

		PROVIDER_LIST.add(providerServer);
		
		//NLS3 web.xml의 CookiePadding 값과 같아야 한다. 안그럼 검증 페일남
		//InitechEamUID +"_V42" .... 형태로 쿠명 생성됨
		SECode.setCookiePadding(COOKING_PADDING);
	}

	// 통합 SSO ID 조회
	public String getSsoId(HttpServletRequest request) {
		String sso_id = null;
		sso_id = CookieManager.getCookieValue(SECode.USER_ID, request);
		return sso_id;
	}
	
	// 통합 SSO 로그인페이지 이동
	public void goLoginPage_new(HttpServletResponse response)throws Exception {
		CookieManager.addCookie(SECode.R_TOA, TOA, SSO_DOMAIN, response);
		
		System.out.println("redirect : " + NLS_LOGIN_URL+"?UURL=" + ASCP_URL+"&RTN_URL=" + SERVER_URL);
		
		//response.sendRedirect(NLS_LOGIN_URL+"?UURL=" + ASCP_URL+"&RTN_URL=" + SERVER_URL);
		response.sendRedirect(NLS_LOGIN_URL+"?UURL=" + ASCP_URL) ; 
	} 
	
	public void goLoginPage(HttpServletResponse response)throws Exception {
		CookieManager.addCookie(SECode.USER_URL, ASCP_URL, SSO_DOMAIN, response);
		CookieManager.addCookie(SECode.R_TOA, TOA, SSO_DOMAIN, response);
		
	       //자체 로그인을 할경우 로그인 페이지 Setting
	    if(custom_url.equals(""))
	   	{
	    	//CookieManager.addCookie("CLP", "", SSO_DOMAIN, response);
	    }else{
	    	CookieManager.addCookie("CLP", custom_url , SSO_DOMAIN, response);
	    }
		
		//response.sendRedirect(NLS_LOGIN_URL);
	    response.sendRedirect(NLS_LOGIN_URL+"?UURL=" + ASCP_URL) ;
	}

	// 통합인증 세션을 체크 하기 위하여 사용되는 API
	public String getEamSessionCheckAndAgentVaild(HttpServletRequest request,HttpServletResponse response){
		String retCode = "";
		try {
			retCode = CookieManager.verifyNexessCookieAndAgentVaild(request, response, 10, COOKIE_SESSTION_TIME_OUT, PROVIDER_LIST, SERVER_URL, context);
		} catch(Exception npe) {
			npe.printStackTrace();
		}
		return retCode;
	}
	
	
	// 통합인증 세션을 체크 하기 위하여 사용되는 API(Agent 인증 없는 함수, 사용자제)
	//@deprecated
	public String getEamSessionCheck(HttpServletRequest request,HttpServletResponse response){
		String retCode = "";
		try {
			retCode = CookieManager.verifyNexessCookie(request, response, 10, COOKIE_SESSTION_TIME_OUT,PROVIDER_LIST);
		} catch(Exception npe) {
			npe.printStackTrace();
		}
		return retCode;
	}
	
	
	//ND API를 사용해서 쿠키검증하는것(현재 표준에서는 사용안함, 근데 해도 되기는 함)
	public String getEamSessionCheck2(HttpServletRequest request,HttpServletResponse response)
	{
		String retCode = "";
		try {
			NXNLSAPI nxNLSAPI = new NXNLSAPI(context);
			retCode = nxNLSAPI.readNexessCookie(request, response, 0, 0);
		} catch(Exception npe) {
			npe.printStackTrace();
		}
		return retCode;
	}

	// SSO 에러페이지 URL
	public void goErrorPage(HttpServletResponse response, int error_code)throws Exception {
		CookieManager.removeNexessCookie(SSO_DOMAIN, response);
		CookieManager.addCookie(SECode.USER_URL, ASCP_URL, SSO_DOMAIN, response);
		response.sendRedirect(NLS_ERROR_URL + "?errorCode=" + error_code);
	}

%>