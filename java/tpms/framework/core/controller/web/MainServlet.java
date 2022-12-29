package tpms.framework.core.controller.web;

import tpms.framework.component.util.I18nUtil;
import java.io.IOException;
import java.util.HashMap;
import java.util.Locale;
import javax.servlet.*;
import javax.servlet.http.*;
import org.apache.log4j.Logger;
import tpms.framework.core.controller.web.util.WebKeys;

public class MainServlet extends HttpServlet
{

  /** Log */
  private org.apache.log4j.Logger log=org.apache.log4j.Logger.getLogger(this.getClass().getName());
  private ServletContext context;
  private HashMap urlMappings;
  private HashMap eventMappings;
  private Locale defaultLocale=null;

  private RequestProcessor requestProcessor;
  private ScreenFlowManager screenFlowManager;

  public void init(ServletConfig config) throws ServletException {
    String defaultLocaleString=config.getInitParameter("default_locale");
    defaultLocale=I18nUtil.getLocaleFromString(defaultLocaleString);
    this.context=config.getServletContext();

    // these will have been initialized by the ApplicationComponentManager
    eventMappings=(HashMap)context.getAttribute(WebKeys.EVENT_MAPPINGS);
    urlMappings=(HashMap)context.getAttribute(WebKeys.URL_MAPPINGS);
    requestProcessor=(RequestProcessor)context.getAttribute(WebKeys.REQUEST_PROCESSOR);
    screenFlowManager=(ScreenFlowManager)context.getAttribute(WebKeys.SCREEN_FLOW_MANAGER);
  }

  public void doGet(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException {
    doProcess(request,response);
  }

  public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException {
    doProcess(request,response);

  }

  private void doProcess(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException {
    // set the locale of the user to default if not set
    if (request.getSession().getAttribute(WebKeys.LOCALE)==null) {
      request.getSession().setAttribute(WebKeys.LOCALE,defaultLocale);
    }
    try {
      String fullURL=request.getRequestURI();
      
      // get the screen name
      String selectedURL=null;
      int lastPathSeparator=fullURL.lastIndexOf("/")+1;
      
      if (lastPathSeparator!=-1) {
        selectedURL=fullURL.substring(lastPathSeparator,fullURL.length());
      }
      
      URLMapping urlMapping=getURLMapping(selectedURL);
      
      requestProcessor.processRequest(urlMapping,request);
      
      log.debug("screenFlowManager");
      screenFlowManager.forwardToNextScreen(request,response);
    } catch (Exception ex) {
      log.debug("사용자 이벤트 및 스크린 관리에서 Error 발생",ex);
      //String className = ex.getClass().getName();
      //String nextScreen = screenFlowManager.getExceptionScreen(ex);
      // put the exception in the request
      try {
        request.setAttribute(WebKeys.EXCEPTION_OBJECT,ex);
        log.debug("Request Attribute에 에러 할당",ex);
        screenFlowManager.forwardToNextScreen(request,response);
      } catch (Exception exx) {
          log.debug("에러 처리후 화면 전송 에러",exx);
      }
      /*
                   if (nextScreen == null) {
          ex.printStackTrace();
          throw new ServletException("MainServlet: unknown exception: " + className);
                   }
                   context.getRequestDispatcher(nextScreen).forward(request, response);
       */
    }
  }

  /**
   * The UrlMapping object contains information that will match
   * chb.framework.component.error url to chb.framework.component.error mapping object that contains information about
   * the current screen, the Action that is needed to
   * process chb.framework.component.error request, and the Action that is needed
   * to insure that the propper screen is displayed.
   */
  private URLMapping getURLMapping(String urlPattern) {
    if ((urlMappings!=null)&&urlMappings.containsKey(urlPattern)) {
      return (URLMapping)urlMappings.get(urlPattern);
    } else {
      return null;
    }
  }
}
