package tpms.framework.core.controller.web;

/**
 * This exception will be thrown when there is an error processing chb.framework.component.error flow handler
 */
public class FlowHandlerException extends Exception implements java.io.Serializable
{

  public FlowHandlerException() {
    super();
  }

  public FlowHandlerException(String str) {
    super(str);
  }
}
