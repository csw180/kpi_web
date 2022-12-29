package tpms.news.scr;

import javax.servlet.http.HttpServletRequest;
import tpms.framework.component.util.JSPUtil;
import tpms.framework.component.dao.*;
import tpms.framework.component.signon.SignOnUserAccount;
import tpms.framework.core.controller.Event;
import tpms.framework.core.controller.EventResponse;
import tpms.framework.core.controller.web.html.HTMLActionException;
import tpms.framework.core.controller.web.html.HTMLActionSupport;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.lang.Byte.*;
import java.util.*;
import java.text.*;
import java.io.*;
import java.math.BigDecimal;


/**
 *  클래스 개요    : 공지사항-Dispatch <p>
 *  클래스 상세기능 : HTTP parser<p>
 *  작성일 : 2006.06.20<p>
 *  @version 1.0
 *  @author  변휘원
 */
public class news_scr_1112_Control extends HTMLActionSupport   
{
      /**
       * HttpRequst의 정보를 연계계정관리 조회 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {


        HttpSession session = request.getSession(false);
        ServletContext context = session.getServletContext();


        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        
        DbResultSet rs    =    null;
        long        rc    =    0;
        long        rc1   =    0;
        Exception   ext   =    null;
        
        String UserID     =    account.getHaengwon_no();
        
        String hidden_key =    JSPUtil.getParameter(request,"hidden_key"," ");    //조회,등록,변경,삭제 구분자
        String kongigb    =    JSPUtil.getParameter(request,"kongigb"," ");       //공지사항 = 1, 게시판 = 2
        String wt_date    =    JSPUtil.getParameter(request,"wt_date"," ");       //작성일자
        String wt_time    =    JSPUtil.getParameter(request,"wt_time"," ");       //작성시간
        
        try{
            DBProcCall jado    =    new DBProcCall();
/****************************변경************************/
             rs = jado.callProc("UP_KPI_S_S_NEWS공지사항내용", kongigb + "," + wt_date+ "," + wt_time);
/****************************변경************************/

         log.debug(" HTMLAction success!");
        }catch(Exception exe)
        { 
          log.error("DAO 생성 오류 "+exe.toString(),exe); 
          ext  =  exe;
        }
/****************************변경************************/
        news_scr_1112_EventResponse eventResponse  =    new news_scr_1112_EventResponse(rs,rc,ext);
        request.setAttribute("news_scr_1112_EventResponse", eventResponse);
/****************************변경************************/
        return eventResponse;
  }//end perform()

    /**
     * HttpRequest의 attribute에 업무시나리오 수행결과 값 저장.
     */
    public void doEnd(HttpServletRequest request, EventResponse eventResponse) {

        request.setAttribute("EventResponse", eventResponse);

        log.debug("setAttribute");
    }

    /**
     * HttpRequest의 attribute에 HttpRequest 파싱 수행결과 값 저장.
     */
    public void doEnd(HttpServletRequest request,Event event) {
        request.setAttribute("Event",event);
        log.debug("setAttribute");
    }
    
}//end class
