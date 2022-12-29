package tpms.framework.core.controller.web;

import javax.servlet.http.HttpServletRequest;

/**
 * This class is the base interface to flow handlers on the
 * web tier.
 *
 */
public interface FlowHandler extends java.io.Serializable
{

  public void doStart(HttpServletRequest request);

  public String processFlow(HttpServletRequest request) throws FlowHandlerException;

  public void doEnd(HttpServletRequest request);

}
