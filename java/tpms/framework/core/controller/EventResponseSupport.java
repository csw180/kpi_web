package tpms.framework.core.controller;

/**
 *  이벤트 반환 오브젝트의 추상클래스
 */
import tpms.framework.component.dao.DbResultSet;

public abstract class EventResponseSupport implements EventResponse
{

  /** Log */
  protected transient org.apache.log4j.Logger log=
          org.apache.log4j.Logger.getLogger(this.getClass().getName());

  private Object payload=null;
  private DbResultSet rs;
  private String flowFlag;

  public EventResponseSupport() {
      if (log ==null) {
          log=org.apache.log4j.Logger.getLogger(this.getClass().getName());
      }
  }

  public EventResponseSupport(DbResultSet rs) {
    this.rs=rs;
  }

  public EventResponseSupport(Object payload) {
    this.payload=payload;
  }

  public Object getPayload() {
    return payload;
  }

  public String getFlowFlag() {
    return this.flowFlag;
  }

  public void setFlowFlag(String flowFlag) {
    this.flowFlag=flowFlag;
    log.debug("flowFlag="+flowFlag);
  }

}
