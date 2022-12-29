package tpms.managesystem.menu;

import javax.servlet.http.HttpServletRequest;
import tpms.framework.component.dao.*;
import tpms.framework.component.util.JSPUtil;
import tpms.framework.component.signon.SignOnUserAccount;
import tpms.framework.core.controller.Event;
import tpms.framework.core.controller.EventResponse;
import tpms.framework.core.controller.web.html.HTMLActionException;
import tpms.framework.core.controller.web.html.HTMLActionSupport;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


/**
 *  클래스 개요    : 로그관리 <p>
 *  클래스 상세기능 : request.getParameter 처리 및 DB에서 결과 가져오기<p>
 *  작성일 : 2006.11.17<p>
 *  @version 1.0
 *  @author  이택영
 */
public class LogControl extends HTMLActionSupport
{

      /**
       * HttpRequst의 정보를 Batch/Web 로그 관련 조회 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {


        HttpSession         session         = request.getSession(false);
        ServletContext      context         = session.getServletContext();
        SignOnUserAccount   account         = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");

        DbResultSet         rs              = null;
        long                rc              = 0;
        Exception           ext             = null;
        
        //조회조건
        String upmuGubun    = JSPUtil.getParameter(request, "upmuGubun"  ,  "0");    //업무구분
        String programId    = JSPUtil.getParameter(request, "programId"  ,  "");    //프로그램ID
        String jobDateFrom  = JSPUtil.getParameter(request, "jobDateFrom",  "");    //작업일자 FROM
        String jobDateTo    = JSPUtil.getParameter(request, "jobDateTo"  ,  "");    //작업일자 TO
        String jumcode      = JSPUtil.getParameter(request, "jumcode"    ,  "0000");    //점번호
        String userid       = JSPUtil.getParameter(request, "userid"     ,  "0");    //사용자

        try {
            DBProcCall jado    =  new DBProcCall();
            
            log.debug( 
                       "\n업무구분      = " + upmuGubun    +
                       "\n프로그램ID    = " + programId    +
                       "\n작업일자 FROM = " + jobDateFrom  +
                       "\n작업일자 TO   = " + jobDateTo    +
                       "\n점번호        = " + jumcode      +
                       "\n사용자        = " + userid       
                     );

            // Batch/Web 로그 데이터 조회
            rs = jado.callProc("UP_KPI_C_S_WEBLOG조회", upmuGubun    +   ","  + //업무구분
                                                programId    +   ","  + //프로그램ID
                                                jobDateFrom  +   ","  + //작업일자 FROM
                                                jobDateTo    +   ","  + //작업일자 TO
                                                jumcode      +   ","  + //점번호
                                                userid          //사용자
                              );

        } catch(Exception exe) {
            log.error("DAO 생성 오류 "+exe.toString(),exe);
            ext    =    exe;
        }
        
        //결과정보 Set 및 반환
        Log_EventResponse eventResponse = new Log_EventResponse(rs, rc, ext);
        request.setAttribute("Log_EventResponse", eventResponse);
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

} // end class