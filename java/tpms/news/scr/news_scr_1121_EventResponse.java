package tpms.news.scr;

import tpms.framework.core.controller.EventResponseSupport;
import tpms.framework.component.dao.*;
import tpms.framework.component.expertgrid.ExGridEtt;

/**
 *  클래스 개요 : 게시판 . <p><p>
 *  영업점 신청 /
 *  <p>
 *  작성일 : 2006.06.20<p>
 *  @version 1.0
 *  @author  변휘원
 */

public class news_scr_1121_EventResponse extends EventResponseSupport
{
  DbResultSet news_scr_1121;
  long        rc;
  Exception   ext;
  
  public news_scr_1121_EventResponse() {
  }

  public news_scr_1121_EventResponse(DbResultSet news_scr_1121,long rc,Exception ext) {
      this.news_scr_1121  =  news_scr_1121;
      this.rc             =  rc;
      this.ext            =  ext;
  }
  
  public long getCnt()
  {
      return this.rc;
  }
  
  public DbResultSet getList() 
  {
    return this.news_scr_1121;
  }
  
  public Exception getExt()
  {
    return this.ext;
  }



  /**
   * 이벤트명 반환
   */

  public String toString() {
    return "news_scr_1121_EventResponse";
  }

  public String getEventName() {
    return "news_scr_1121_EventResponse";
  }

}