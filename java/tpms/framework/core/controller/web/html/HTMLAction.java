package tpms.framework.core.controller.web.html;

import tpms.framework.core.controller.EventResponse;
import tpms.framework.core.controller.web.Action;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
/**
 * This class is the base interface to request handlers on the
 * web tier.
 *
 */
public interface HTMLAction
    extends Action
{

    public abstract void setServletContext(ServletContext servletcontext);

    public abstract void doStart(HttpServletRequest httpservletrequest);

    public abstract EventResponse perform(HttpServletRequest httpservletrequest)
        throws HTMLActionException;

    public abstract void doEnd(HttpServletRequest httpservletrequest, EventResponse eventresponse);
}
