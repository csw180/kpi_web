package tpms.managesystem.menu;

import tpms.framework.core.controller.EventResponseSupport;
import tpms.framework.component.dao.*;
import tpms.framework.component.expertgrid.ExGridEtt;

/**
 *  클래스 개요 : 직무분장 . <p><p>
 *  영업점 신청 /
 *  <p>
 *  작성일 : 2006.05.15<p>
 *  @version 1.0
 *  @author  변휘원
 */

public class Menu_EventResponse extends EventResponseSupport
{
  DbResultSet menulist;
  long        rc;
  String cEvent;
  Exception   ext;
  public Menu_EventResponse() {
  }

  public Menu_EventResponse(DbResultSet menulist,String cEvent,long rc, Exception ext) {
      this.menulist=menulist;
      this.cEvent=cEvent;
      this.ext = ext;
      this.rc  = rc;
  }

  public DbResultSet getmenulist() {
    return this.menulist;
  }
  public String getcEvent() {
    return this.cEvent;
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
