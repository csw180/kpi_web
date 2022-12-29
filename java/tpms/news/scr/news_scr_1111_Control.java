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
import javax.servlet.http.HttpSession;
import java.lang.*;
import java.util.*;
import java.text.*;
import java.io.*;
import java.math.BigDecimal;
import tpms.framework.component.upload.*;

/**
 *  클래스 개요    : 공지사항-Dispatch <p>
 *  클래스 상세기능 : HTTP parser<p>
 *  작성일 : 2006.06.20<p>
 *  @version 1.0
 *  @author  변휘원
 */
public class news_scr_1111_Control extends HTMLActionSupport   
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
        String v_page     =    JSPUtil.getParameter(request,"v_page","1");        //현재페이지
        String wt_date    =    JSPUtil.getParameter(request,"wt_date"," ");       //작성일자
        String wt_time    =    JSPUtil.getParameter(request,"wt_time"," ");       //작성시간
        String title      =    JSPUtil.getParameter(request,"title"," ");         //제목
        String end_date_s =    JSPUtil.getParameter(request,"end_date_s"," ");    //공지시작
        String end_date_e =    JSPUtil.getParameter(request,"end_date_e"," ");    //공지완료
        String up_date    =    JSPUtil.getParameter(request,"up_date"," ");       //상위일자
        String up_time    =    JSPUtil.getParameter(request,"up_time"," ");       //상위시간
        String comt       =    JSPUtil.getParameter(request,"comt"," ");          //내용
        String path       =    "";                                                //파일저장 위치
        int    filecnt    =    0;                                                 //저장될 파일 갯수
        
        try{
            DBProcCall jado    =    new DBProcCall();
            
/****************************변경************************/
             rs = jado.callProc("UP_KPI_S_S_NEWS공지사항", kongigb + "," + v_page);
/****************************변경************************/

         log.debug(" HTMLAction success!");
        }catch(Exception exe)
        { 
          log.error("DAO 생성 오류 "+exe.toString(),exe); 
          ext  =  exe;
        }
/****************************변경************************/
        news_scr_1111_EventResponse eventResponse  =    new news_scr_1111_EventResponse(rs,rc,ext);
        request.setAttribute("news_scr_1111_EventResponse", eventResponse);
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
