package tpms.framework.component.signon;

import tpms.common.web.tpmsComponentManager;
import tpms.framework.core.controller.EventResponse;
import tpms.framework.core.controller.web.html.HTMLActionException;
import tpms.framework.core.controller.web.html.HTMLActionSupport;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.log4j.Logger;

public final class SignOnHTMLAction extends HTMLActionSupport
{

    private Logger log;
    public static final String ACCOUNT_READ_ACTION = "readAccount";
    public static final String ACCOUNT_CREATE_ACTION = "createAccount";

    public SignOnHTMLAction()
    {
        log = Logger.getLogger(getClass().getName());
    }

    public EventResponse perform(HttpServletRequest request)
        throws HTMLActionException
    {
        SignOnUserAccount resultBean = null;
        String targetAction = request.getParameter("target_action");
        HttpSession session = request.getSession();
        tpmsComponentManager acm = (tpmsComponentManager)session.getAttribute("tpms.framework.core.comm.COMPONENT_MANAGER");
        SignOnFacade facade = acm.getSignOnFacade(session);
        if(targetAction != null && targetAction.equals("createAccount"))
        {
            resultBean = createAccount(request, facade);
        } else
        {
            Boolean signedOn = (Boolean)request.getSession().getAttribute("j_signon");
            if(signedOn != null && signedOn.booleanValue())
                resultBean = readAccount(session, facade);
            else
                throw new HTMLActionException("CustomerHTMLAction: User is not signed on.");
        }
        session.setAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT", resultBean);
        log.debug("\uC0AC\uC778\uC628 \uC720\uC800\uC815\uBCF4 \uBCF4\uAD00" + resultBean);
        return null;
    }

    protected void validate(String userId)
        throws Exception
    {
        if(userId == null || userId.trim().length() == 0)
            throw new Exception("Unfortunately, there was tpms.framework.component.error problem: The userId must have data. Your request has not been sent.");
        else
            return;
    }

    public SignOnUserAccount readAccount(HttpSession session, SignOnFacade facade)
        throws HTMLActionException
    {
        String userId = (String)session.getAttribute("j_signon_username");
        SignOnUserAccount acct = null;
        try
        {
            acct = facade.getAccount(userId);
        }
        catch(Exception e)
        {
            e.printStackTrace();
            throw new HTMLActionException("CustomerHTMLAction:: CustomerAppException accessing Customer Component: ");
        }
        return acct;
    }

    private SignOnUserAccount createAccount(HttpServletRequest request, SignOnFacade facade)
        throws HTMLActionException
    {
        String userId = (String)request.getSession().getAttribute("j_signon_username");
        String userName = request.getParameter("acct_familyName");
        String passwd = request.getParameter("acct_givenName");
        SignOnUserAccount userInfo = null;
        try
        {
            userInfo = facade.createSignOn("", "");
        }
        catch(Exception e)
        {
            throw new HTMLActionException("CustomerBD:: CustomerAppException Error Creating Customer");
        }
        return userInfo;
    }
}
