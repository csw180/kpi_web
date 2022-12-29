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

public class User_EventResponse extends EventResponseSupport
{
  DbResultSet menulist;
  String cEvent;
  public User_EventResponse() {
  }

  public User_EventResponse(DbResultSet menulist,String cEvent) {
      this.menulist=menulist;
      this.cEvent=cEvent;
  }

  public DbResultSet getmenulist() {
    return this.menulist;
  }
  public String getcEvent() {
    return this.cEvent;
  }



  /**
   * 이벤트명 반환
   */

  public String toString() {
    return "User_EventResponse";
  }

  public String getEventName() {
    return "User_EventResponse";
  }

}
