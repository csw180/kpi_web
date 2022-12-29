package tpms.framework.core.controller;

/**
 *  이벤트 반환 오브젝트의 서비스를 지정한다.
 */
public interface EventResponse extends java.io.Serializable
{

  /**
   *  이벤트명을 반환한다.
   */

  public String getEventName();

  public void setFlowFlag(String flowFlag);

  public String getFlowFlag();

}
