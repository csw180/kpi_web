package tpms.framework.component.signon.web;

import tpms.framework.component.signon.*;
import tpms.framework.component.signon.dao.SignOnDAOExpiredDateException;
import tpms.framework.component.signon.dao.SignOnDAOFinderException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URLEncoder;
import java.util.HashMap;
import javax.servlet.*;
import javax.servlet.http.*;
import org.apache.log4j.Logger;
import tpms.framework.component.dao.DAOException;
import tpms.framework.component.signon.dao.UserDAO;
import tpms.framework.component.dao.*;

public class SignOnFilter implements Filter {

	private Logger log;
	public static final String FORM_SIGNON_URL = "j_signon_check.do";
	public static final String FORM_USER_ID = "j_username";
	public static final String FORM_PASSWORD = "j_password";
	public static final String REMEMBER_USERID = "j_remember_username";
	public static final String USER_ID = "j_signon_username";
	public static final String SIGNED_ON_USER = "j_signon";
	public static final String ORIGINAL_URL = "j_signon_original_url";
	public static final String CREATE_USER_URL = "j_create_user";
	public static final String COOKIE_NAME = "bp_signon";
	public static final String START_PAGE = "MainPage.do";
	private HashMap protectedResources;
	private HashMap loginResources;
	private String signMainPage;
	private FilterConfig config;
	private String signOnErrorPage;
	private String signOnPage;
	private String userCreationError;
	private boolean authorizedCheck;

	public SignOnFilter() {
		log = Logger.getLogger(getClass().getName());
		signMainPage = null;
		config = null;
		signOnErrorPage = null;
		signOnPage = null;
		userCreationError = null;
		authorizedCheck = false;
	}

	public void init(FilterConfig config) throws ServletException {
		this.config = config;
		java.net.URL protectedResourcesURL = null;
		try {
			protectedResourcesURL = config.getServletContext().getResource("/WEB-INF/signon-config.xml");
			ConfigFileSignOnDAO dao = new ConfigFileSignOnDAO(protectedResourcesURL);
			signOnErrorPage = dao.getSignOnErrorPage();
			signOnPage = dao.getSignOnPage();
			signMainPage = dao.getSignMainPage();
			protectedResources = dao.getProtectedResources();
			String auth = config.getInitParameter("authorizedcheck");

			config.getServletContext().setAttribute("tpms.framework.core.waf.AUTHORIZED_CHECK", auth);

			// log.debug("auth : " + auth);

			if (auth != null && auth.equalsIgnoreCase("true"))
				authorizedCheck = true;

			log.debug("권한 검증 여부: " + authorizedCheck + " signOnErrorPage:" + signOnErrorPage);
		} catch (MalformedURLException ex) {
			log.fatal("SignonFilter: malformed URL exception: ", ex);
			throw new RuntimeException(ex.getMessage());
		}
	}

	public void destroy() {
		config = null;
		log.debug("FilterConfig \uC5B8\uB85C\uB4DC");
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		log.debug("Request 검사 시작");

		HttpServletRequest hreq = (HttpServletRequest) request;
		HttpServletResponse hres = (HttpServletResponse) response;
		String currentURL = hreq.getRequestURI();
		String imsidata = null;
		String URL = "";
		String value = hreq.getParameter("hidden_key");
		int firstSlash = currentURL.indexOf("/", 1);

		String targetURL = null;

		log.debug("currentURL : " + currentURL);
		log.debug("firstSlash : " + firstSlash);

		if (firstSlash != -1) {
			targetURL = currentURL.substring(firstSlash + 1, currentURL.length());
			log.debug("targetURL=>>" + targetURL);
		}

		if (targetURL != null && targetURL.equals("j_signon_check.do")) {
			validateSignOn(request, response, chain);
			return;
		}
		boolean signedOn = false;
		if (hreq.getSession().getAttribute("j_signon") != null)
			signedOn = ((Boolean) hreq.getSession().getAttribute("j_signon")).booleanValue();
		else
			hreq.getSession().setAttribute("j_signon", new Boolean(false));
		if (signedOn) {
			log.debug("로그인된 유저 : " + authorizedCheck);

			if (authorizedCheck) {
				log.debug("\uAD8C\uD55C \uAC80\uC99D \uC2DC\uC791");
				String progId = "";
				int iDOFind = targetURL.lastIndexOf(".do");
				int iScreenFind = targetURL.lastIndexOf(".screen");
				if (iDOFind > 0)
					progId = targetURL.substring(0, iDOFind);
				else if (iScreenFind > 0)
					progId = targetURL.substring(0, iScreenFind);
				log.debug("\uD504\uB85C\uADF8\uB7A8ID: " + progId);
				boolean authorized = authCheckProcess(request, response, progId);
				if (!authorized) {
					log.debug("\uAD8C\uD55C \uC5C6\uC2B5\uB2C8\uB2E4!");
					URLEncoder.encode("\uAD8C\uD55C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4!", imsidata);
					hres.sendRedirect(signOnErrorPage + "?FORM_MESSAGE=" + imsidata);
					return;
				}
			}
			chain.doFilter(request, response);
			return;
		} else {
			log.debug("\uC6D0\uB798 \uC694\uAD6C\uD55C URL=" + targetURL);
			targetURL = START_PAGE;
			if (value == null)
				URL = signOnPage;
			else if (!value.equals(""))
				URL = signOnPage + "?hidden_key=1";
			else
				URL = signOnPage;
			hreq.getSession().setAttribute("j_signon_original_url", targetURL);
			config.getServletContext().getRequestDispatcher("/" + URL).forward(request, response);
			return;
		}
	}

	public boolean authCheckProcess(ServletRequest request, ServletResponse response, String progId)
			throws IOException, ServletException {
		String userId = null;
		boolean authorized = false;
		SignOnFacade signOn = null;
		HttpServletRequest hreq = null;
		HttpServletResponse hres = null;
		boolean flag;
		boolean flag1;
		SignOnUserAccount account;
		try {
			label0: {

				try {
					if (progId == null || !"MainPage".equalsIgnoreCase(progId) && !"signoff".equalsIgnoreCase(progId)
							&& !"SignOn".equalsIgnoreCase(progId) && !"ChangePswd".equalsIgnoreCase(progId))
						break label0;
					flag = true;
				} finally {
					signOn = null;
				}
				return flag;
			}
			hreq = (HttpServletRequest) request;
			hres = (HttpServletResponse) response;
			account = (SignOnUserAccount) hreq.getSession().getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
			userId = account.getHaengwon_no();
			signOn = new SignOnFacade();
			authorized = signOn.isAuthorized(userId, progId);
			flag1 = authorized;
			return flag1;
		} catch (Exception ex) {
			log.error("\uAD8C\uD55C \uCCB4\uD06C\uC911.. \uC5D0\uB7EC ", ex);
		}
		flag1 = false;
		return flag1;
	}

	public void validateSignOn(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest hreq;
		HttpServletResponse hres;
		String userid;
		String password;
		String imsidata = "";
		boolean authenticated;
		hreq = (HttpServletRequest) request;
		hres = (HttpServletResponse) response;
		
		userid = hreq.getParameter("j_username");
		password = hreq.getParameter("j_password");
		String rememberUserId = hreq.getParameter("j_remember_username");

		//log.debug("validateSignOn userid : " + userid);
		//log.debug("validateSignOn password : " + password);
		//log.debug("validateSignOn rememberUserId : " + rememberUserId);
		
		if (rememberUserId != null) {
			Cookie userIdCookie = new Cookie("bp_signon", userid);
			userIdCookie.setMaxAge(60 * 60 * 24 * 10);// 0x28de80
			hres.addCookie(userIdCookie);
		} else {
			Cookie cookies[] = hreq.getCookies();
			if (cookies != null) {
				for (int loop = 0; loop < cookies.length; loop++)
					if (cookies[loop].getName().equals("bp_signon")) {
						cookies[loop].setMaxAge(0);
						hres.addCookie(cookies[loop]);
					}

			}
		}
		
		SignOnFacade signOn = new SignOnFacade();
		try {
			authenticated = signOn.authenticate(userid, password);
			
			//log.debug("authenticated : " + authenticated);
			
			if (authenticated) {
				if (hreq.getSession().getAttribute("j_signon_username") != null)
					hreq.getSession().removeAttribute("j_signon_username");
				hreq.getSession().setAttribute("j_signon_username", userid);
				if (hreq.getSession().getAttribute("j_signon") != null)
					hreq.getSession().removeAttribute("j_signon");
				hreq.getSession().setAttribute("j_signon", new Boolean(true));
				String targetURL = (String) hreq.getSession().getAttribute("j_signon_original_url");

				log.debug("타겟URL=" + targetURL);

				if (targetURL == null || targetURL.equalsIgnoreCase("login.jsp")
						|| targetURL.equalsIgnoreCase("signoff.do") || targetURL.equalsIgnoreCase("SignOn.screen")) {
					targetURL = "MainPage.do";
					log.debug("수정 타겟URL=" + targetURL);
				}

				// 사용자 로그인시 접속로그를 남긴다.
				UserDAO userDAO = new UserDAO();
				
				DbResultSet rs = userDAO.getLastLoginDate(userid);
				
				if (rs != null && rs.next()) {
					int intDay = Integer.parseInt(rs.getString("미사용일수"));
					if (intDay >= 30) {
						imsidata = "전산보안업무방법에 의거 1개월이상 접속하지 아니여 접속을 차단합니다.\\n\\n담당자에게 문의하여 주시기바랍니다.&FORM_ERR_KIND=NOT_USE_LONG_TERM";
						hres.sendRedirect(
								signOnErrorPage + "?FORM_MESSAGE=" + imsidata + "&FORM_ERR_KIND=PASSWORD_CHANGE");
						return;
					}
				}

				userDAO.insertLog(userid, "01", hreq.getRemoteAddr());

				hres.sendRedirect(targetURL);

				return;
			}
			imsidata = "직원번호 또는 비밀번호를 확인 하세요"; // 시스템 장애입니다. 잠시후 재접속하여 주세요
			hres.sendRedirect(signOnErrorPage + "?FORM_MESSAGE=" + imsidata);
			return;
		} catch (InvalidPasswordException ie) {
			try {
				UserDAO userDAO = new UserDAO();
				userDAO.insertLog(userid, "03", hreq.getRemoteAddr());
			} catch (DAOException de) {
			}
			log.info("\uD328\uC2A4\uC6CC\uB4DC \uC624\uB958", ie);
			imsidata = ie.getMessage();// "비밀번호를 확인 하세요";
			hres.sendRedirect(signOnErrorPage + "?FORM_MESSAGE=" + imsidata);
			return;
		} catch (SignOnDAOExpiredDateException se) {
			log.info(
					"\uC554\uD638 \uC0AC\uC6A9\uAE30\uAC04\uC774 \uB05D\uB0AC\uC2B5\uB2C8\uB2E4! \uC554\uD638\uB97C \uBCC0\uACBD\uD558\uC9C0 \uC54A\uC73C\uBA74 \uB85C\uADF8\uC778\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4!",
					se);
			imsidata = "직원번호 또는 비밀번호를 확인 하세요";
			hres.sendRedirect(signOnErrorPage + "?FORM_MESSAGE=" + imsidata + "&FORM_ERR_KIND=PASSWORD_CHANGE");
			return;
		} catch (SignOnDAOFinderException fe) {
			imsidata = "직원번호를 확인 하세요";
			hres.sendRedirect(signOnErrorPage + "?FORM_MESSAGE=" + imsidata);
			return;
		} catch (DAOException de) {
			imsidata = "시스템 장애입니다. 잠시후 재접속하여 주세요";
			hres.sendRedirect(signOnErrorPage + "?FORM_MESSAGE=" + imsidata);
			return;
		} catch (Exception e) {
			log.error("SignOnFilter signOnError:::exception to:", e);
		}
		return;
	}
}
