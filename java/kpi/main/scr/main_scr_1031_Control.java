package kpi.main.scr;

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
 *  클래스 개요    : 타지점실적계좌 등록  <p>
 *  클래스 상세기능 : 타지점실적계좌를 등록한다.<p>
 *  작성일 : 2006.07.01<p>
 *  @version 1.0
 *  @author  변휘원
 */
public class main_scr_1031_Control extends HTMLActionSupport
{
      /**
       * HttpRequst의 정보를 타지점실적계좌 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {

        HttpSession session   = request.getSession(false);
        ServletContext context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        String hidden_key    = JSPUtil.getParameter(request, "hidden_key"," ");         // 조회,등록,변경,삭제 구분자
        String basemonth     = JSPUtil.getParameter(request, "basemonth"," ");
                             
        String jumcode       = JSPUtil.getParameter(request, "jumcode","");          // 계좌관리점
        String accountcode   = JSPUtil.getParameter(request, "accountcode","");      // 계정과목코드
        String manjumcode    = JSPUtil.getParameter(request, "manjumcode","");       // 성과관리점
        String accountno     = JSPUtil.getParameter(request, "accountno","");        // 계좌번호
        String period        = JSPUtil.getParameter(request, "period","");           // 성과관리점인정비율
        String lastRole      = JSPUtil.getParameter(request, "lastRole","");         // 등록부서구분
        String strEmpNo      = account.getHaengwon_no();                             // 등록직원번호
                

        long rc           = 0;
        Exception ext     = null;
        DbResultSet rs    = null;

        //조회 시작/종료 시간
        String startTime, endTime;

        // 등록 처리에 대한 Error 발생 시 메시지 처리를 위한 변수 ------------->
        String message    = "";
        int idx = 0;
        // --------------------------------------------------------------------/
        
        try
        {
            DBProcCall jado = new DBProcCall();
            //START TIME 
            startTime = tpms.framework.component.util.DateTime.getShortTimeString();
            
           if (hidden_key.equals("9")){  /***** 조회 *****/
                rs = jado.callProc("UP_KPI_O_S_타지점실적계좌");

                //조회종료시간
                endTime = tpms.framework.component.util.DateTime.getShortTimeString();
                
                //web log 생성 
                jado.InputProc("UP_KPI_C_S_WEBLOG"
                              ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                              +"UP_KPI_O_S_타지점실적계좌"	         +","  //프로그램ID
                              +startTime                           +","  //시작시간
                              +endTime                             +","  //완료시간
                              +account.getHaengwon_no()            +","  //사용자ID
                              +account.getBranch_no()              +","  //점번호
                              +request.getRemoteAddr()             +","  //사용자IP
                              +"조회" 
                              );
                 
            }else{ /***** 등록,변경,삭제 *****/                
                rc = jado.InputProc("UP_KPI_O_S_타지점실적계좌처리", hidden_key   + "," +
                                                                   jumcode      + "," +
                                                                   accountcode  + "," +
                                                                   accountno    + "," +
                                                                   manjumcode   + "," +
                                                                   period       + "," +
                                                                   lastRole     + "," +
                                                                   strEmpNo
                                      );
                //등록,변경,삭제 종료시간
                endTime = tpms.framework.component.util.DateTime.getShortTimeString();
                
                //web log 생성 
                jado.InputProc("UP_KPI_C_S_WEBLOG"
                              ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                              +"UP_KPI_O_S_타지점실적계좌처리"	     +","  //프로그램ID
                              +startTime                           +","  //시작시간
                              +endTime                             +","  //완료시간
                              +account.getHaengwon_no()            +","  //사용자ID
                              +account.getBranch_no()              +","  //점번호
                              +request.getRemoteAddr()             +","  //사용자IP
                              +"처리구분(1:등록/2:변경/3:삭제)=" +hidden_key + ";" //처리구분
                              +"점번호="             +jumcode                + ";" //점번호
                              +"계정과목코드="       +accountcode            + ";" //계정과목코드
                              +"성과관리점="         +manjumcode             + ";" //성과관리점번호
                              +"계좌번호="           +accountno              + ";" //계좌번호
                              +"성과관리점인정비율=" +period                 + ";" //성과관리점인정비율
                              +"등록부서="           +lastRole               + ";" //등록부서구분
                              );
                                      
            }
            log.debug(" HTMLAction success!");
        }catch(Exception exe)
        {
            log.error("DAO 생성 오류 "+exe.toString(),exe);
            // Error message 생성 --------------------------------------------->
            if (!hidden_key.equals("9")){                
              message = "타지점실적계좌처리" 
                      + "처리구분(1:등록,2:변경,3:삭제)=" +hidden_key
                      + ",점번호="        +jumcode
                      + ",계정과목코드="  +accountcode
                      + ",계좌번호="      +accountno
                      + ",성과관리점="    +manjumcode
                      +" 오류\n\nExcel 정보를 확인하세요.";              
            }
            // ----------------------------------------------------------------/
            ext    =    exe;
        }
/****************************변경************************/
        main_scr_EventResponse eventResponse    =        new main_scr_EventResponse(rs,rc,ext);
        request.setAttribute("main_scr_EventResponse", eventResponse);
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
