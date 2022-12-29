package tpms.managesystem.menu;

import tpms.framework.core.controller.EventResponseSupport;
import tpms.framework.component.dao.*;
import tpms.framework.component.expertgrid.ExGridEtt;

/**
 *  클래스 개요 : 로그내역 결과  <p><p>
 *  시스템관리 /
 *  <p>
 *  작성일 : 2006.05.15<p>
 *  @version 1.0
 *  @author  변휘원
 */

public class Log_EventResponse extends EventResponseSupport
{
  DbResultSet menulist;
  long        rc;  
  Exception   ext;
  public Log_EventResponse() {
  }

  public Log_EventResponse(DbResultSet menulist,long rc, Exception ext) {
      this.menulist=menulist;      
      this.ext = ext;
      this.rc  = rc;
  }

  public DbResultSet getmenulist() {
    return this.menulist;
  }

  public long getCnt()
  {
    return this.rc;
  }

  public Exception getExt()
  {
    return this.ext;
  }

  /**
   * 이벤트명 반환
   */

  public String toString() {
    return "Menu_EventResponse";
  }

  public String getEventName() {
    return "Menu_EventResponse";
  }

}
