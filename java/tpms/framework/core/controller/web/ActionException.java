package tpms.framework.core.controller.web;

/**
 * This exception will be thrown when there is an error processing chb.framework.component.error flow handler
 */
public class ActionException extends Exception implements java.io.Serializable
{
  public ActionException() {
    super();
  }

  public ActionException(String str) {
    super(str);
  }
}
