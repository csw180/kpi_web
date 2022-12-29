package tpms.framework.core.controller;

/**
 *  이벤트에 에러 클래스
 */
public class EventException extends Exception implements java.io.Serializable
{

  public EventException() {
    super();
  }

  public EventException(String str) {
    super(str);
  }
}
