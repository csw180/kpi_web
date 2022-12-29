package tpms.framework.component.signon.web;

import java.io.Serializable;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;

import org.apache.log4j.Logger;

import tpms.common.web.tpmsComponentManager;
import tpms.framework.component.signon.SignOnHTMLAction;

public class SignOnNotifier
    implements Serializable, HttpSessionAttributeListener
{

    private Logger log;

    public SignOnNotifier()
    {
        log = Logger.getLogger(getClass().getName());
    }

    public void attributeRemoved(HttpSessionBindingEvent se)
    {
        log.debug("session이 제거됨 명:" + se.getName() + " 값:" + se.getValue());
    }

    public void attributeAdded(HttpSessionBindingEvent se)
    {
        log.debug("session에 attribute 추가됨 명:" + se.getName() + " 값:" + se.getValue());
        processEvent(se);
    }

    public void attributeReplaced(HttpSessionBindingEvent se)
    {
        log.debug("session에 attribute \uBCC0\uACBD\uB428 명:" + se.getName() + " 값:" + se.getValue());
        processEvent(se);
    }

    private void processEvent(HttpSessionBindingEvent se)
    {
        HttpSession session = se.getSession();
        ServletContext context = session.getServletContext();
        
        String name = se.getName();
        
        if(name.equals("j_signon"))
        {
            boolean aSignOn = ((Boolean)se.getValue()).booleanValue();

            if(aSignOn)
            {
                SignOnHTMLAction action = new SignOnHTMLAction();
                tpms.framework.component.signon.SignOnUserAccount bean = null;
                try
                {
                    tpmsComponentManager cm = (tpmsComponentManager)session.getAttribute("tpms.framework.core.comm.COMPONENT_MANAGER");
                    
                    log.debug("cm : " + cm);
                    
                    tpms.framework.component.signon.SignOnFacade facade = cm.getSignOnFacade(session);
                    bean = action.readAccount(session, facade);
                }
                catch(Exception cex)
                {
                    log.debug("유저정보조회에러", cex);
                    cex.printStackTrace();
                }
                session.setAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT", bean);
                log.debug("인온 유저정보 보관 - " + bean);
            }
        }
    }
}
