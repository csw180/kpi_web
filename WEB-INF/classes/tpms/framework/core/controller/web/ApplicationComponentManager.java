package tpms.framework.core.controller.web;
import java.util.HashMap;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import tpms.framework.component.servicelocator.web.ServiceLocator;
import tpms.framework.core.controller.web.util.WebKeys;
import tpms.framework.component.error.ErrorHandler;
import tpms.framework.core.config.*;

public class ApplicationComponentManager implements ServletContextListener
{

  /** Log */
  private static org.apache.log4j.Logger log=org.apache.log4j.Logger.getLogger(ApplicationComponentManager.class);

  private tpms.framework.component.log.Log4jConfigureUtil logConfig=
      tpms.framework.component.log.Log4jConfigureUtil.getInstance();

  public ApplicationComponentManager() {}

  public void contextDestroyed(ServletContextEvent sce) {
    // do nothing for destroying now
  }

  public void contextInitialized(ServletContextEvent sce) {
    try {
      doInit(sce.getServletContext());
      getWebController(sce.getServletContext());
      getRequestProcessor(sce.getServletContext());
      getScreenFlowManager(sce.getServletContext());
      log.debug("서블릿 컨텍스트에 WebController,RequestProcessor,ScreenFlowManager 할당");
    } catch (Throwable ex) {
      log.fatal(new ErrorHandler("30101").getUserMessage(),ex);
      throw new RuntimeException();
    }
  }

  private void doInit(ServletContext context) {
    String requestMappingsURL=null;
    String schedulerMappingStr=null;
    try {
      requestMappingsURL=context.getResource(Globals.ACTION_MAPPINGS).toString();
    } catch (java.net.MalformedURLException ex) {
      log.fatal(new ErrorHandler("30101",Globals.ACTION_MAPPINGS+ " 을 얻지 못함").getUserMessage(),ex);
      System.err.println("ApplicationComponentManager: initializing ScreenFlowManager malformed URL exception: "+ex);
    }
    try {
      HashMap urlMappings=URLMappingsXmlDAO.loadRequestMappings(requestMappingsURL);
      context.setAttribute(WebKeys.URL_MAPPINGS,urlMappings);
      HashMap eventMappings=URLMappingsXmlDAO.loadEventMappings(requestMappingsURL);
      context.setAttribute(WebKeys.EVENT_MAPPINGS,eventMappings);
    } catch (Exception ex) {
      log.fatal(new ErrorHandler("30101","XMLDAO Reading 에러").getUserMessage(),ex);
      log.fatal("에러 URLMappingsXmlDAO ",ex);
    }
  }

  public static WebController getWebController(ServletContext context) {
    ServiceLocator sl=ServiceLocator.getInstance();
    WebController wc=(WebController)context.getAttribute(WebKeys.WEB_CONTROLLER);
/*    if (wc==null) {
     try {
        String wcClassName=sl.getString(JNDINames.DEFAULT_WEB_CONTROLLER);
        if ((wcClassName!=null)&&!wcClassName.toLowerCase().equals("none")) {
          wc=(WebController)Class.forName(wcClassName).newInstance();
          wc.init(context);
        }
      } catch (tpms.framework.component.servicelocator.ServiceLocatorException slx) {
        log.fatal(new ErrorHandler("30101",slx.getMessage()).getUserMessage(),slx);
      } catch (Exception exc) {
        log.fatal(new ErrorHandler("30101","ServletContext에 WebController 할당 실패").getUserMessage(),exc);
        throw new RuntimeException("Unable to create WebController: "+exc);
      }
    }*/
    return wc;
  }

  public static RequestProcessor getRequestProcessor(ServletContext context) {
    RequestProcessor rp=(RequestProcessor)context.getAttribute(WebKeys.REQUEST_PROCESSOR);
    if (rp==null) {
      rp=new RequestProcessor();
      rp.init(context);
      context.setAttribute(WebKeys.REQUEST_PROCESSOR,rp);
    }
    return rp;
  }

  public static ScreenFlowManager getScreenFlowManager(ServletContext context) {
    ScreenFlowManager screenManager=(ScreenFlowManager)context.getAttribute(WebKeys.SCREEN_FLOW_MANAGER);
    if (screenManager==null) {
      screenManager=new ScreenFlowManager();
      screenManager.init(context);
      context.setAttribute(WebKeys.SCREEN_FLOW_MANAGER,screenManager);
    }
    return screenManager;
  }

}
