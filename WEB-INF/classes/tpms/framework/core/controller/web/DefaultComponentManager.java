package tpms.framework.core.controller.web;

import tpms.framework.component.servicelocator.web.ServiceLocator;
import java.io.Serializable;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import org.apache.log4j.Logger;
import tpms.framework.core.controller.web.util.WebKeys;

/**
 * This implmentation class of the ComponentManager provides access to services
 * in the web tier and ejb tier.
 *
 */
public class DefaultComponentManager implements ComponentManager, HttpSessionBindingListener, java.io.Serializable {

	private org.apache.log4j.Logger log = org.apache.log4j.Logger.getLogger(this.getClass().getName());

	protected ServiceLocator sl = null;

	public DefaultComponentManager() {
		sl = ServiceLocator.getInstance();
		log.debug("서비스 로케이터 생성");
	}

	/**
	 *
	 * Create the WebController which in turn should create the EJBClientController.
	 *
	 */
	public void sessionCreated(HttpSessionEvent se) {
		log.debug("sessionCreated");

		HttpSession session = se.getSession();
		sl = ServiceLocator.getInstance();
		session.setAttribute(WebKeys.COMPONENT_MANAGER, this);
		log.debug("세션이 최초 성생됨! " + WebKeys.COMPONENT_MANAGER + " 세션에 할당됨");
	}

	public WebController getWebController(ServletContext context) {
		return (WebController) context.getAttribute(WebKeys.WEB_CONTROLLER);
	}

	/**
	 * Destroy the EJBClientController
	 */
	public void sessionDestroyed(HttpSessionEvent se) {
	}

	public void valueBound(HttpSessionBindingEvent event) {
		log.debug("WEB Session에 변수 할당 " + event.getName() + ":" + event.getValue());
	}

	public void valueUnbound(HttpSessionBindingEvent event) {
		HttpSession session = event.getSession();
		String name = event.getName();
		log.debug(name);
		if (WebKeys.COMPONENT_MANAGER.equals(name)) {
		}

	}
}
