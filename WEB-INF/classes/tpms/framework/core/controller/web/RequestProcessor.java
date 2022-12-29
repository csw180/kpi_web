package tpms.framework.core.controller.web;

import tpms.framework.component.error.ErrorHandler;
import tpms.framework.core.controller.Event;
import tpms.framework.core.controller.EventResponse;
import tpms.framework.core.controller.EventException;
import java.io.Serializable;
import java.util.HashMap;
import javax.servlet.*;
import org.apache.log4j.Logger;
import tpms.framework.core.controller.web.util.WebKeys;
/**
 * This is the web tier controller for the sample application.
 *
 * This class is responsible for processing web requests
 * that could originate from any number of front controllers
 *
 * This class is responsible for ensuring that the dependencies
 * of the client accessing the controller prior to the being
 * passed off to the WebController.
 *
 */
public class RequestProcessor implements java.io.Serializable
{
  private org.apache.log4j.Logger log=org.apache.log4j.Logger.getLogger(this.getClass().getName());
  private ServletContext context;
  private HashMap urlMappings;
  private HashMap eventMappings;
  private HashMap actionMap;

  public RequestProcessor() {
    actionMap=new HashMap();
  }

  public void init(ServletContext context) {
    this.context=context;
    urlMappings=(HashMap)context.getAttribute(WebKeys.URL_MAPPINGS);
    eventMappings=(HashMap)context.getAttribute(WebKeys.EVENT_MAPPINGS);
  }

  /**
   * The UrlMapping object contains information that will match
   * chb.framework.component.error url to chb.framework.component.error mapping object that contains information about
   * the current screen, the HTMLAction that is needed to
   * process chb.framework.component.error request, and the HTMLAction that is needed
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
   * The EventMapping object contains information that will match
   * chb.framework.component.error event class name to an EJBActionClass.
   *
   */
  private EventMapping getEventMapping(Event eventClass) {
    // get the fully qualified name of the event class
    //log.debug("eventClass=" +eventClass);
    String eventClassName=eventClass.getClass().getName();
    log.debug("eventClassName="+eventClassName);
    if ((eventMappings!=null)&&eventMappings.containsKey(eventClassName)) {
      return (EventMapping)eventMappings.get(eventClassName);
    } else {
      log.debug("이벤트가 없음");
      return null;
    }
  }

  /**
   * This method is the core of the RequestProcessor. It receives all requests
   *  and generates the necessary events.
   */
  public void processRequest(URLMapping urlMapping,ServletRequest request) throws ActionException,EventException,ServletException {
    EventResponse ev=null;
    
    Action action=getAction(urlMapping);
    
    //log.debug("processRequest action : " + action);
    
    if (action!=null) {
      //HTMLAction 수행
      action.setServletContext(context);
      action.doStart(request);
      ev=action.perform(request);
      action.addFormCommand(request);
      //EJBCommand 수행
      EventResponse eventResponse=null;
/*      if (ev!=null) {
        // set the command class name on the event
        EventMapping eventMapping=getEventMapping(ev);
        //log.debug(eventMapping.toString());
        if (eventMapping!=null) {
          ev.setCommandClassName(eventMapping.getCommandClassName());
        }
        WebController wc=(WebController)context.getAttribute(WebKeys.WEB_CONTROLLER);
        eventResponse=wc.handleEvent(ev,request);
      }*/
      eventResponse=ev;
      action.doEnd(request,eventResponse);
    }
  }

  /**
   * This method load the necessary Action class necessary to
   * process chb.framework.component.error the request for the specified URL. Action instances
   * are cached so that they may be re-used.
   */
  private Action getAction(URLMapping urlMapping) {
    Action handler=null;
    //log.debug("urlMapping : " + urlMapping);
    if (urlMapping!=null) {
      if (urlMapping.isAction()) {
        String actionClassString=urlMapping.getWebAction();
        
        //log.debug("actionClassString="+actionClassString);
        
        if ((actionClassString!=null)&&
            actionMap.containsKey(actionClassString)) {
          handler=(Action)actionMap.get(actionClassString);
        } else {
        	//log.debug("actionClassString is nothing!");
        	
        	if(actionClassString!="") {
	            try {
	            
	            	handler=(Action)getClass().getClassLoader().loadClass(actionClassString).newInstance();
	            	//log.debug("handler : " + handler);
	            
	            	actionMap.put(actionClassString,handler);
	            } catch (Exception ex) {
	            	log.fatal(new ErrorHandler("30102").getUserMessage(),ex);
	            }
        	}
        }
      }
    }
    return handler;
  }
}
