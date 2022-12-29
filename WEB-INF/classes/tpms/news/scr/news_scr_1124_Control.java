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
 *  클래스 개요    : 게시판-Dispatch <p>
 *  클래스 상세기능 : HTTP parser<p>
 *  작성일 : 2006.06.20<p>
 *  @version 1.0
 *  @author  변휘원
 */
public class news_scr_1124_Control extends HTMLActionSupport   
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
        
        log.debug("내용 구한다.$$$$$$" + comt);
        log.debug("내용 length를 구한다.$$$$$$" + comt.length());
        
        //등록시 작성일자,작성시간을 구한다.        
        Date currentTime = new Date();
        if(wt_date.trim().equals("")||wt_date.length()==0)
        {
          wt_date = (new SimpleDateFormat("yyyyMMdd")).format(currentTime);
          wt_time = (new SimpleDateFormat("HHmmss")).format(currentTime);
          log.debug("날짜 구한다.$$$$$$" + wt_date);
          log.debug("시간 구한다.$$$$$$" + wt_time);
        }
        
        //내용을 FORMAT에 맞게 CUTTING 한다.
        //MAX_LENGTH 자리씩 잘라 'tb_bmat공지내용' 테이블 '내용'(1024byte) 에 INSERT할 값을 구한다.
        int seq        = 0;
        int max_length = 300;
        int st_comt    = 0;
        int ed_comt    = max_length;
        int remainder  = 0;
        String seq_comt= "";
        
        //총길이에서 MAX_LENGTH를 나눈다.
        log.debug("나눈값" + comt.length() / max_length);
        log.debug("나머지값" + comt.length() % max_length);
        seq       = comt.length() / max_length;
        remainder = comt.length() % max_length;
        if(remainder != 0) seq += 1;
        if(seq == 0) seq = 1;
        
        try{
            DBProcCall jado    =    new DBProcCall();
            
            if(hidden_key.equals("1"))                      // 게시물 등록
            {
              // DB 등록
              log.debug("등록");
              up_date = wt_date;                            // 등록시 상위날짜을 등록날짜하고 같게 한다.
              up_time = wt_time;                            // 등록시 상위시간을 등록시간하고 같게 한다.
              rc  =  jado.InputProc("UP_KPI_S_S_NEWS게시판처리",hidden_key
                                                  + "," + wt_date
                                                  + "," + wt_time
                                                  + "," + title
                                                  + "," + end_date_s
                                                  + "," + end_date_e
                                                  + "," + up_date
                                                  + "," + up_time
                                                  + "," + UserID);
              for(int i=0;i<seq;i++)
              {   
                if(i == seq-1){seq_comt  = comt.substring(st_comt);}
                else{seq_comt  = comt.substring(st_comt,ed_comt);}
                
                jado.InputProc("UP_KPI_S_S_NEWS게시판내용처리",hidden_key
                                                    + "," + wt_date
                                                    + "," + wt_time
                                                    + "," + seq_comt
                                                    + "," + (i+1));
                st_comt += max_length;
                ed_comt += max_length;                                                    
              }
            }
            else if(hidden_key.equals("2"))                 // 게시물 변경
            {
              // DB 수정
              log.debug("수정");
              rc  =  jado.InputProc("UP_KPI_S_S_NEWS게시판처리",hidden_key
                                                  + "," + wt_date
                                                  + "," + wt_time
                                                  + "," + title
                                                  + "," + end_date_s
                                                  + "," + end_date_e
                                                  + "," + up_date
                                                  + "," + up_time
                                                  + "," + UserID);
              for(int i=0;i<seq;i++)
              {   
                if(i == seq-1){seq_comt  = comt.substring(st_comt);}
                else{seq_comt  = comt.substring(st_comt,ed_comt);}
                
                jado.InputProc("UP_KPI_S_S_NEWS게시판내용처리",hidden_key
                                                    + "," + wt_date
                                                    + "," + wt_time
                                                    + "," + seq_comt
                                                    + "," + (i+1));
                st_comt += max_length;
                ed_comt += max_length;                                                    
              }  
            }
            else if(hidden_key.equals("3"))                 // 게시물 삭제
            {
              // DB 삭제
              log.debug("삭제");
              rc  =  jado.InputProc("UP_KPI_S_S_NEWS게시판처리",hidden_key
                                                  + "," + wt_date
                                                  + "," + wt_time
                                                  + "," + title
                                                  + "," + end_date_s
                                                  + "," + end_date_e
                                                  + "," + up_date
                                                  + "," + up_time
                                                  + "," + UserID);
            }
            if(hidden_key.equals("4"))                      // 게시물 답변
            {
              // DB 등록
              log.debug("답변");
              wt_date = (new SimpleDateFormat("yyyyMMdd")).format(currentTime);
              wt_time = (new SimpleDateFormat("HHmmss")).format(currentTime);
              hidden_key = "1";
              rc  =  jado.InputProc("UP_KPI_S_S_NEWS게시판처리",hidden_key
                                                  + "," + wt_date
                                                  + "," + wt_time
                                                  + "," + title
                                                  + "," + end_date_s
                                                  + "," + end_date_e
                                                  + "," + up_date
                                                  + "," + up_time
                                                  + "," + UserID);
              for(int i=0;i<seq;i++)
              {   
                if(i == seq-1){seq_comt  = comt.substring(st_comt);}
                else{seq_comt  = comt.substring(st_comt,ed_comt);}
                
                jado.InputProc("UP_KPI_S_S_NEWS게시판내용처리",hidden_key
                                                    + "," + wt_date
                                                    + "," + wt_time
                                                    + "," + seq_comt
                                                    + "," + (i+1));
                st_comt += max_length;
                ed_comt += max_length;                                                    
              }
            }            
/****************************변경************************/
             rs = jado.callProc("UP_KPI_S_S_NEWS게시판", kongigb + "," + v_page);
/****************************변경************************/
         log.debug(" HTMLAction success!");
        }catch(Exception exe)
        { 
          log.error("DAO 생성 오류 "+exe.toString(),exe); 
          ext  =  exe;
        }
/****************************변경************************/
        news_scr_1124_EventResponse eventResponse  =    new news_scr_1124_EventResponse(rs,rc,ext);
        request.setAttribute("news_scr_1124_EventResponse", eventResponse);
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
