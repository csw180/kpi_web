package kpi.rpop.scr;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import tpms.framework.component.dao.DBProcCall;
import tpms.framework.component.dao.DbResultSet;
import tpms.framework.component.signon.SignOnUserAccount;
import tpms.framework.component.util.JSPUtil;
import tpms.framework.core.controller.Event;
import tpms.framework.core.controller.EventResponse;
import tpms.framework.core.controller.web.html.HTMLActionException;
import tpms.framework.core.controller.web.html.HTMLActionSupport;


/**
 *  클래스 개요    : 고객별실적보고서 조회  <p>
 *  클래스 상세기능 : 고객별실적보고서를 읽어서 JSP에 전달한다.<p>
 *  작성일 : 2006.07.01<p>
 *  @version 1.0
 *  @author  변휘원
 */
public class rpop_scr_3010_Control extends HTMLActionSupport   
{
      /**
       * HttpRequst의 정보를 job코드 조회 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {

        HttpSession session   = request.getSession(false);
        ServletContext context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        String hidden_key = JSPUtil.getParameter(request, "hidden_key"," ");         // 조회,등록,변경,삭제 구분자
        String basemonth  = JSPUtil.getParameter(request, "basemonth"," ");
        String v_jumcode  = JSPUtil.getParameter(request, "v_jumcode"," "); 
        String custgubun  = JSPUtil.getParameter(request, "custgubun"," "); 
        String custstat   = JSPUtil.getParameter(request, "custstat"," "); 
        String baseamt    = JSPUtil.getParameter(request, "baseamt"," ");         
        String bgubun     = JSPUtil.getParameter(request, "bgubun"," "); 
        String mgubun     = JSPUtil.getParameter(request, "mgubun"," ");
        String searchCode = JSPUtil.getParameter(request, "searchCode"," ");   //조회사유코드
        String pg_url     = JSPUtil.getParameter(request, "pg_url"," ");       //프로그램URL

        long rc           = 0;
        Exception ext     = null;
        DbResultSet rs    = null;
        
        try
        {            
            DBProcCall jado = new DBProcCall();            
            
            //조회시작시간
             String startTime = tpms.framework.component.util.DateTime.getShortTimeString();

            rs = jado.callProc("UP_KPI_M_S_고객별실적보고서", basemonth +","+ v_jumcode+","+custgubun+","+custstat+","+baseamt+","+bgubun+","+mgubun);
            
            //조회종료시간
            String endTime = tpms.framework.component.util.DateTime.getShortTimeString();

            log.debug("HTMLAction success!");
            
            //web log 생성 
            jado.InputProc("UP_KPI_C_S_WEBLOGN"
                          ,"2"                         +","  //2:rpop,1:rpdy
                          +"UP_KPI_M_S_고객별실적보고서" +","  //프로그램ID
                          +startTime                   +","  //시작시간
                          +endTime                     +","  //완료시간
                          +account.getHaengwon_no()    +","  //사용자ID
                          +account.getBranch_no()      +","  //점번호
                          +request.getRemoteAddr()     +","  //사용자IP
                          +"기준년월="    + basemonth  +";"  //조회조건 ~
                          +"점번호="      + v_jumcode  +";"
                          +"고객구분= "   + custgubun  +";"
                          +"고객상태= "   + custstat   +";"
                          +"평잔기준금액=" + baseamt   +";,"
                          +"0"                         +","  //조회고객번호
                          + searchCode                 +","  //조회사유코드
                          + pg_url                           //프로그램URL"
                          );
                          
        }catch(Exception exe)
        { 
            log.error("DAO 생성 오류 "+exe.toString(),exe); 
            ext    =    exe;
        }
        
        //결과 SET 및 반환
        rpop_scr_EventResponse eventResponse    =        new rpop_scr_EventResponse(rs,rc,ext);
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
