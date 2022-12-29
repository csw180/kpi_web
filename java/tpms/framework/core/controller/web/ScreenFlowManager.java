package tpms.framework.core.controller.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import tpms.framework.core.config.Globals;
import tpms.framework.component.error.ErrorHandler;
import tpms.framework.core.controller.web.util.WebKeys;

/**
 * This file looks at the Request URL and maps the request
 * to the page for the web-templating mechanism.
 */
public class ScreenFlowManager implements java.io.Serializable
{

  /** Log */
  private org.apache.log4j.Logger log=org.apache.log4j.Logger.getLogger(this.getClass().getName());

  private HashMap screens;
  private HashMap urlMappings;
  private ArrayList exceptionMappings;
  private HashMap screenDefinitionMappings;
  private String defaultScreen="";
  private ServletContext context;

  public ScreenFlowManager() {
    screens=new HashMap();
  }

  public void init(ServletContext context) {
    this.context=context;
    String requestMappingsURL=null;
    try {
      requestMappingsURL=context.getResource(Globals.ACTION_MAPPINGS).toString();
    } catch (java.net.MalformedURLException ex) {
      log.fatal(new ErrorHandler("30103",Globals.ACTION_MAPPINGS + " 을 찾을 수 없음 ").getUserMessage(),ex);
    }
    urlMappings=(HashMap)context.getAttribute(WebKeys.URL_MAPPINGS);
    ScreenFlowData screenFlowData=URLMappingsXmlDAO.loadScreenFlowData(requestMappingsURL);
    defaultScreen=screenFlowData.getDefaultScreen();
    exceptionMappings=screenFlowData.getExceptionMappings();
  }

  /**
   * The UrlMapping object contains information that will match
   * chb.framework.component.error url to chb.framework.component.error mapping object that contains information about
   * the current screen, the WebAction that is needed to
   * process chb.framework.component.error request, and the WebAction that is needed
   * to insure that the propper screen is displayed.
   */

  private URLMapping getURLMapping(String urlPattern) {
    if ((urlMappings!=null)&&urlMappings.containsKey(urlPattern)) {
      return (URLMapping)urlMappings.get(urlPattern);
    } else {
      return null;
    }
  }

  /**
   * Using the information we have in the request along with
   * The url map for the current url we will insure that the
   * propper current screen is selected based on the settings
   * in both the screendefinitions.xml file and requestmappings.xml
   * files.
   */
  public void forwardToNextScreen(HttpServletRequest request,HttpServletResponse response) throws java.io.IOException,FlowHandlerException,javax.servlet.ServletException {
    // set the presious screen
    String fullURL=request.getRequestURI();
    log.debug("전체 URI="+fullURL);
    // get the screen name
    String selectedURL=defaultScreen;

    int lastPathSeparator=fullURL.lastIndexOf("/")+1;
    if (lastPathSeparator!=-1) {
      selectedURL=fullURL.substring(lastPathSeparator,fullURL.length());
      log.debug("해당 Request URI="+selectedURL);
    }
    String currentScreen="";
    URLMapping urlMapping=getURLMapping(selectedURL);
    if (urlMapping!=null) {
      if (!urlMapping.useFlowHandler()) {
        currentScreen=urlMapping.getScreen();
      } else {
        // load the flow handler
        FlowHandler handler=null;
        String flowHandlerString=urlMapping.getFlowHandler();
        log.debug("스크린 플로우 핸들러="+flowHandlerString);
        try {
          handler=(FlowHandler)getClass().getClassLoader().loadClass(flowHandlerString).newInstance();
          // invoke the processFlow(HttpServletRequest)
          handler.doStart(request);
          String flowResult=handler.processFlow(request);
          log.debug("스크린 플로우 핸들러 결과="+flowResult);
          handler.doEnd(request);
          currentScreen=urlMapping.getResultScreen(flowResult);
          log.debug("스크린 플로우 핸들러 이동 대상 화면="+currentScreen);
          // if there were no screens by the id then assume that the result was
          //the screen itself
          if (currentScreen==null)
            currentScreen=flowResult;
        } catch (Exception ex) {
          log.error("스크린 플로우 핸들러 오류 ",ex);
        }
      }
    }
    if (currentScreen==null) {
      throw new RuntimeException("Screen not found for "+selectedURL);
    }
    log.debug("최종 이동 대상 화면="+currentScreen);
    context.getRequestDispatcher("/"+currentScreen).forward(request,response);

  }

  /**
          go through the list and use the Class.isAssignableFrom(Class method)
          to see it is chb.framework.component.error subclass of one of the exceptions
   */
  public String getExceptionScreen(Throwable e) {
    Iterator it=exceptionMappings.iterator();
    while (it.hasNext()) {
      ErrorMapping em=(ErrorMapping)it.next();
      String exceptionName=em.getExceptionClassName();
      // check if the exception is chb.framework.component.error sub class of matches the exception
      if (exceptionName.equals(e.getClass().getName())) {
        return "/"+(em.getScreenName());
      }
    }
    return null;
  }

  public void setDefaultScreen(String defaultScreen) {
    this.defaultScreen=defaultScreen;
  }

  /**
   * Returs the current screen
   */

  public String getCurrentScreen(HttpSession session) {
    return (String)session.getAttribute(WebKeys.CURRENT_SCREEN);
  }
}
