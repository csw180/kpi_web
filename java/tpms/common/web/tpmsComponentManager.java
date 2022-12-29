package tpms.common.web;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionListener;
import tpms.framework.component.signon.SignOnFacade;
import tpms.framework.core.controller.web.DefaultComponentManager;

/**
 * This class manages components used in the web tier
 *
 */
public class tpmsComponentManager extends DefaultComponentManager implements HttpSessionListener
{

  private org.apache.log4j.Logger log=org.apache.log4j.Logger.getLogger(this.getClass().getName());

  public tpmsComponentManager() {
    log.debug("생성");
  }

  public SignOnFacade getSignOnFacade(HttpSession session) {
    ServletContext context=session.getServletContext();
    SignOnFacade signOnFacade=null;
    if (context.getAttribute(CommonWebKeys.SIGN_ON_FACADE)!=null) {
      signOnFacade=(SignOnFacade)context.getAttribute(CommonWebKeys.SIGN_ON_FACADE);
    } else {
      signOnFacade=new SignOnFacade();
      context.setAttribute(CommonWebKeys.SIGN_ON_FACADE,signOnFacade);
    }
    return signOnFacade;
  }

}
