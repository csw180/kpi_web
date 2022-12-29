package tpms.framework.core.view.template;

import javax.servlet.jsp.*;
import javax.servlet.jsp.tagext.TagSupport;
import org.apache.log4j.Logger;
import tpms.framework.core.controller.web.util.WebKeys;

/**
 * This class is works with chb.framework.component.error template jsp page to build
 * chb.framework.component.error composite view of chb.framework.component.error page.
 */

public class InsertTag extends TagSupport
{

  private org.apache.log4j.Logger log=org.apache.log4j.Logger.getLogger(this.getClass().getName());
  private boolean directInclude=false;
  private String parameter=null;
  private Parameter parameterRef=null;

  /**
   * default constructor
   */
  public InsertTag() {
    super();
  }

  public void setParameter(String parameter) {
    this.parameter=parameter;
  }

  public int doStartTag() throws JspTagException {
    try {
      pageContext.getOut().flush();
    } catch (Exception e) {
      // do nothing
    }
    Screen screen=null;
    // load the ScreenFlow
    try {
      screen=(Screen)pageContext.getRequest().getAttribute(WebKeys.CURRENT_SCREEN);
    } catch (NullPointerException e) {
      throw new JspTagException("Error extracting Screen from session: "+e);
    }
    if ((screen!=null)&&(parameter!=null)) {
      parameterRef=(Parameter)screen.getParameter(parameter);
    } else {
      System.err.println("InsertTag: screenManager is null");
    }
    if (parameterRef!=null)
      directInclude=parameterRef.isDirect();
    return SKIP_BODY;
  }

  public int doEndTag() throws JspTagException {
    try {
      if (directInclude&&parameterRef!=null) {
        pageContext.getOut().print(parameterRef.getValue());
      } else if (parameterRef!=null) {
        if (parameterRef.getValue()!=null)
          pageContext.getRequest().getRequestDispatcher(parameterRef.getValue()).include(pageContext.getRequest(),pageContext.getResponse());
      }
    } catch (Exception ex) {
      //System.err.println("InsertTag:doEndTag caught: " + ex);
      // ex.printStackTrace();
      log.error("err",ex);
    }
    // reset everything in that this tag may be pooled
    parameterRef=null;
    parameter=null;
    directInclude=false;
    return EVAL_PAGE;
  }
}
