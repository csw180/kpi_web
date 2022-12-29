package kpi.rpop.scr;

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
 *  클래스 개요     : RM(본부) 핵심예수금합산 실적 조회 <p>
 *  클래스 상세기능 : RM(본부) 핵심예수금합산 실적을 읽어서 JSP에 전달한다.<p>
 *  작성일 : 2022.03.07<p>
 *  @version 1.0
 *  @author  양인찬
 */
public class rpop_scr_5460_Control extends HTMLActionSupport   
{
      /**
       * HttpRequst의 정보를 job코드 조회 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {

        HttpSession session   = request.getSession(false);
        ServletContext context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        String hidden_key = JSPUtil.getParameter(request, "hidden_key"," ");      // 조회,등록,변경,삭제 구분자
        String basemonth  = JSPUtil.getParameter(request, "basemonth"," ");
        String pgcode     = JSPUtil.getParameter(request, "pgcode"," ");
        String WideCode   = JSPUtil.getParameter(request, "WideCode"," ");        // 광역금융본부
        String sergb      = JSPUtil.getParameter(request, "sergb"," ");           // 조회구분

        // 기준년월별 프로시져를 입력받기 위한 변수들
        String procName   = "";
        int    baseMon    = 0;
                
        long rc           = 0;
        Exception ext     = null;
        DbResultSet rs    = null;
        
        try
        {
            DBProcCall jado = new DBProcCall();


            //기준년월을 정수형으로 변환(if으로 비교하기 위함)
            baseMon  = Integer.parseInt(basemonth);

            //프로시져명 설정
            procName = "UP_KPI_M_S_RM핵심예수금합산내역" + basemonth.substring(0,4);
            
            //조회시작시간
            String startTime = tpms.framework.component.util.DateTime.getShortTimeString();

            rs = jado.callProc(procName, basemonth+","+pgcode+","+WideCode+","+sergb);
            
            //조회종료시간
            String endTime = tpms.framework.component.util.DateTime.getShortTimeString();

            log.debug("HTMLAction success!");
            
            //web log 생성 
            jado.InputProc("UP_KPI_C_S_WEBLOG"
                          ,"2"                        +","  //2:rpop,1:rpdy
                          +"RM핵심예수금합산내역"     +","  //프로그램ID
                          +startTime                  +","  //시작시간
                          +endTime                    +","  //완료시간
                          +account.getHaengwon_no()   +","  //사용자ID
                          +account.getBranch_no()     +","  //점번호
                          +request.getRemoteAddr()    +","  //사용자IP
                          +"기준년월=" + basemonth    +";"  //조회조건 ~
                          +"PG코드="   + pgcode       +";"
                          +"광역금융본부=" + WideCode +";"
                          +"조회구분=" + sergb        +";"
                          );

        }catch(Exception exe)
        { 
            log.error("DAO 생성 오류 "+exe.toString(),exe); 
            ext    =    exe;
        }
        
        //결과 SET 및 반환
        rpop_scr_EventResponse eventResponse    =    new rpop_scr_EventResponse(rs,rc,ext);
        request.setAttribute("rpop_scr_EventResponse", eventResponse);
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
