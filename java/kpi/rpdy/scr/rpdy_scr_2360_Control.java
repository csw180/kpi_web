package kpi.rpdy.scr;

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

/**
 *  클래스 개요     : 영업점 일일 기업부지점장 B 조회 
 *  클래스 상세기능 : 영업점 일일 팀별 관리지표 내역을 읽어서 JSP에 전달한다. 
 *  작성일 : 2021.03.18 
 *  @version 1.0
 *  @author  이상용
 */
public class rpdy_scr_2360_Control extends HTMLActionSupport   
{
      /**
       * HttpRequst의 정보를 job코드 조회 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {

        HttpSession session   = request.getSession(false);
        ServletContext context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        String hidden_key = JSPUtil.getParameter(request, "hidden_key"," ");         // 조회,등록,변경,삭제 구분자
        String baseday    = JSPUtil.getParameter(request, "baseday"," ");
        String sergb      = JSPUtil.getParameter(request, "sergb"," ");
        String pgcode     = JSPUtil.getParameter(request, "pgcode"," ");
        String metrogb    = JSPUtil.getParameter(request, "metrogb"," ");
        
        long rc           = 0;
        Exception ext     = null;
        DbResultSet rs    = null;
        
        try
        {
            DBProcCall jado = new DBProcCall();
            
            //조회시작시간
            String startTime = tpms.framework.component.util.DateTime.getShortTimeString();
                                                   
            rs = jado.callProc("UP_KPI_D_S_N일일업무형부지점장평가실적_기업", baseday+","+pgcode+","+sergb+","+metrogb);
            
            //조회종료시간
            String endTime = tpms.framework.component.util.DateTime.getShortTimeString();

            log.debug("HTMLAction success!");
            
            if (!sergb.equals("99")){  /***** 기준일 조회 *****/
                //web log 생성 
                jado.InputProc("UP_KPI_C_S_WEBLOG"
                              ,"1"                       +","  //1:rpdy,rpop, 2:rphq, 3:rprm, 4:설문
                              +"일일업무형부지점장평가실적_기업"        +","  //프로그램ID
                              +startTime                 +","  //시작시간
                              +endTime                   +","  //완료시간
                              +account.getHaengwon_no()  +","  //사용자ID
                              +account.getBranch_no()    +","  //점번호
                              +request.getRemoteAddr()   +","  //사용자IP
                              +"기준일="     + baseday   +";"  //조회조건 ~
                              +"PG코드="     + pgcode    +";"
                              +"광역금융본부=" + metrogb +";"
                              +"조회구분="   + sergb     +";"
                              );
            }                  
        }catch(Exception exe)
        { 
            log.error("DAO 생성 오류 "+exe.toString(),exe); 
            ext    =    exe;
        }
        
        //결과 SET 및 반환
        rpdy_scr_EventResponse eventResponse    =   new rpdy_scr_EventResponse(rs,rc,ext);
        request.setAttribute("rpdy_scr_EventResponse", eventResponse);
        return eventResponse;
    }

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
