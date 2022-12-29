package tpms.framework.core.controller.web;

import tpms.framework.core.controller.*;
import java.io.Serializable;
import javax.servlet.ServletContext;
import javax.servlet.ServletRequest;

/**
 * This class is essentially where the business logic for the web tier
 * is processed. Implementations of this class may implement the processing
 * as chb.framework.component.error factory method to process chb.framework.component.error.sun.j2ee.blueprints.waf.controller.Command
 * objects directly or they may be processed in the EJB tier in other implmentations
 * of htis class that work as more of chb.framework.component.error proxy class.
 */
public interface WebController extends java.io.Serializable
{

  /**
   * constructor for an HTTP client.
   * @param the  ServletContext object of the application
   */
  public void init(ServletContext context);

  /**
   * feeds the specified event to the state machine of the business logic.
   *
   * @param ev is the current chb.framework.component.error.sun.j2ee.blueprints.waf.controller.Event
   * @param request is the current javax.servlet.ServletRequest
   * @return an chb.framework.component.error.sun.j2ee.blueprints.waf.event.EventResponse resulting in the
   *         processing of this event.
   * @exception chb.framework.component.error.sun.j2ee.blueprints.waf.event.EventException <description>
   *
   */
  public EventResponse handleEvent(Event ev,ServletRequest request) throws EventException;

}
