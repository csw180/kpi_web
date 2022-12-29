package tpms.framework.core.controller.web.html;

import tpms.common.web.FormCommand;
import tpms.framework.component.error.ErrorHandler;
import tpms.framework.component.util.MultipartRequest;
import tpms.framework.component.util.TokenProcessor;
import tpms.framework.core.controller.Event;
import tpms.framework.core.controller.EventResponse;
import tpms.framework.core.controller.web.ActionException;
import java.util.HashMap;
import javax.servlet.ServletContext;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import org.apache.log4j.Logger;
/**
 * This class is the default implementation of the WebAction
 *
 */
public abstract class HTMLActionSupport
    implements HTMLAction
{

    private static TokenProcessor token = TokenProcessor.getInstance();
    private HashMap params;
    protected transient Logger log;
    protected ServletContext context;

    public HTMLActionSupport()
    {
        params = null;
        log = Logger.getLogger(getClass().getName());
        if(log == null)
            log = Logger.getLogger(getClass().getName());
    }

    public void setServletContext(ServletContext context)
    {
        this.context = context;
    }

    public void doStart(ServletRequest request)
    {
        doStart((HttpServletRequest)request);
    }

    public void doStart(HttpServletRequest httpservletrequest)
    {
    }

    public EventResponse perform(ServletRequest request)
        throws ActionException
    {
        return perform((HttpServletRequest)request);
    }

    public final void addFormCommand(ServletRequest request)
        throws ActionException
    {
        Event event = (Event)request.getAttribute("Event");
        if(null != event)
        {
            FormCommand fcmd = FormCommand.fromRequest((HttpServletRequest)request);
            event.setFormCommand(fcmd);
        }
    }

    public void doEnd(ServletRequest request, EventResponse eventResponse)
    {
        doEnd((HttpServletRequest)request, eventResponse);
    }

    public void doEnd(HttpServletRequest httpservletrequest, EventResponse eventresponse)
    {
    }

    public void setParams(HashMap params)
    {
        this.params = params;
    }

    public boolean isMultiPart(HttpServletRequest request)
    {
        String contentType = request.getContentType();
        return contentType != null && contentType.startsWith("multipart/form-data");
    }

    public final void processTransactonToken(ServletRequest request)
        throws ActionException
    {
        HttpServletRequest hRequest = (HttpServletRequest)request;
        ActionException ex = null;
        if(!isTokenValid(hRequest))
            ex = new ActionException((new ErrorHandler("30401")).getUserMessage());
        resetToken(hRequest);
        saveToken(hRequest);
        if(ex != null)
            throw ex;
        else
            return;
    }

    public final void processTransactonToken(ServletRequest request, MultipartRequest multi)
        throws ActionException
    {
        HttpServletRequest hRequest = (HttpServletRequest)request;
        ActionException ex = null;
        if(!isTokenValid(hRequest, multi))
            ex = new ActionException((new ErrorHandler("30401")).getUserMessage());
        resetToken(hRequest);
        saveToken(hRequest);
        if(ex != null)
            throw ex;
        else
            return;
    }

    private String generateToken(HttpServletRequest request)
    {
        return token.generateToken(request);
    }

    private boolean isTokenValid(HttpServletRequest request)
    {
        boolean retValue = token.isTokenValid(request, false);
        log.debug("isToken=" + retValue);
        return retValue;
    }

    private boolean isTokenValid(HttpServletRequest request, MultipartRequest multi)
    {
        if(multi == null)
            return true;
        String transactionNeed = (String)request.getAttribute("tpms.framework.isTransaction");
        log.debug("--------------------------------");
        log.debug("\uB9AC\uD018\uC2A4\uD2B8\uC5D0\uC11C \uD2B8\uB79C\uC7AD\uC158 \uD544\uC694\uC5EC\uBD80 \uD30C\uC545 ");
        log.debug("--------------------------------");
        log.debug("transactionNeed=" + transactionNeed);
        if(transactionNeed != null && transactionNeed.equalsIgnoreCase("true"))
        {
            String tokenString = multi.getParameter("TOKEN");
            boolean retValue = token.isTokenValid(request, tokenString, false);
            log.debug("isTokenValid=" + retValue);
            return retValue;
        } else
        {
            return true;
        }
    }

    private void resetToken(HttpServletRequest request)
    {
        token.resetToken(request);
    }

    private void saveToken(HttpServletRequest request)
    {
        token.saveToken(request);
    }

    private String toHex(byte buffer[])
    {
        return token.toHex(buffer);
    }

}
