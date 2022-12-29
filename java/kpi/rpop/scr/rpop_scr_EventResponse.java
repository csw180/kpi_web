package kpi.rpop.scr;

import tpms.framework.core.controller.EventResponseSupport;
import tpms.framework.component.dao.*;

/**
 *  클래스 개요 :  <p>
 *  영업점 신청 /
 *  <p>
 *  작성일 : 2006.07.01<p>
 *  @version 1.0
 *  @author  변휘원
 */

public class rpop_scr_EventResponse extends EventResponseSupport
{
  DbResultSet rs;
  long        rc;
  Exception   ext;
  String      message = "";
  
  public rpop_scr_EventResponse() {
  }

  public rpop_scr_EventResponse(DbResultSet rs,long rc,Exception ext) {
      this.rs  = rs;
      this.rc  = rc;
      this.ext = ext;
  }
  
  public rpop_scr_EventResponse(DbResultSet rs,long rc,Exception ext,String message) {
    this.rs  = rs;
    this.rc  = rc;
    this.ext = ext;
    this.message = message;      
  }
  
  public long getCnt()
  {
        return this.rc;
  }
    
  public DbResultSet getList() 
  {
    return this.rs;
  }
  
  public Exception getExt()
  {
      return this.ext;
  }
  
  public String getMessage()
  {
    return this.message;
  }


  /**
   * 이벤트명 반환
   */

  public String toString() {
    return "rpop_scr_EventResponse";
  }

  public String getEventName() {
    return "rpop_scr_EventResponse";
  }

}