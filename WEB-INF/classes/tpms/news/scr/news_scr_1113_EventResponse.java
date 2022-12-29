package tpms.news.scr;

import tpms.framework.core.controller.EventResponseSupport;
import tpms.framework.component.dao.*;
import tpms.framework.component.expertgrid.ExGridEtt;

/**
 *  클래스 개요 : 첨부파일 . <p><p>
 *  영업점 신청 /
 *  <p>
 *  작성일 : 2006.06.20<p>
 *  @version 1.0
 *  @author  변휘원
 */

public class news_scr_1113_EventResponse extends EventResponseSupport
{
  DbResultSet news_scr_1113;
  long        rc;
  Exception   ext;
  
  public news_scr_1113_EventResponse() {
  }

  public news_scr_1113_EventResponse(DbResultSet news_scr_1113,long rc,Exception ext) {
      this.news_scr_1113  =  news_scr_1113;
      this.rc             =  rc;
      this.ext            =  ext;
  }
  
  public long getCnt()
  {
      return this.rc;
  }
  
  public DbResultSet getList() 
  {
    return this.news_scr_1113;
  }
  
  public Exception getExt()
  {
    return this.ext;
  }



  /**
   * 이벤트명 반환
   */

  public String toString() {
    return "news_scr_1113_EventResponse";
  }

  public String getEventName() {
    return "news_scr_1113_EventResponse";
  }

}