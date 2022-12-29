package tpms.framework.core.controller.web;

import tpms.framework.core.controller.EventResponse;
import javax.servlet.ServletContext;
import javax.servlet.ServletRequest;

/**
 * This class is the base interface to request handlers on the
 * web tier.
 *
 */
public interface Action extends java.io.Serializable
{

  public void setServletContext(ServletContext context);

  public void doStart(ServletRequest request);

  public EventResponse perform(ServletRequest request) throws ActionException;

  public void addFormCommand(ServletRequest request) throws ActionException;

  public void doEnd(ServletRequest request,EventResponse eventResponse);
}
