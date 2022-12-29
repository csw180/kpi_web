package tpms.common.web.handlers;

import tpms.framework.component.signon.SignOnUserAccount;
import tpms.framework.core.controller.web.FlowHandler;
import tpms.framework.core.controller.web.FlowHandlerException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.log4j.Logger;

public class SignOnFlowHandler
    implements FlowHandler
{

    private Logger log;

    public SignOnFlowHandler()
    {
        log = Logger.getLogger(getClass().getName());
        log.debug("SignOnFlowHandler");
    }

    public void doStart(HttpServletRequest httpservletrequest)
    {
    }

    public String processFlow(HttpServletRequest request)
        throws FlowHandlerException
    {
    	log.debug("SignOnFlowHandler - processFlow");
        HttpSession session = request.getSession();
        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        
        log.debug("account : " + account);

        String actionType = "0";

        log.debug("ActionType : " + actionType);
        return actionType;
    }

    public void doEnd(HttpServletRequest httpservletrequest)
    {
    }
}
