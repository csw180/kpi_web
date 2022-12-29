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
 *  클래스 개요    : 부지점장 관리 조회 및 처리
 *  클래스 상세기능: 부지점장 관리 upload 처리 및 조회하여 JSP에 전달한다.
 *  작성일 : 2014.07.21
 *  @version 1.0
 *  @author  조형석
 */
public class main_scr_4511_Control extends HTMLActionSupport
{
      /**
       * HttpRequst의 정보를 개인별PI권유직원변경 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {

        HttpSession session   = request.getSession(false);
        ServletContext context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        String strEmpNo   = account.getHaengwon_no();

        String hidden_key = JSPUtil.getParameter(request, "hidden_key"," ");   // 조회,등록,변경,삭제 구분자
        String basemonth  = JSPUtil.getParameter(request, "basemonth" ," ");

        String emnm       = JSPUtil.getParameter(request, "emnm" ," ");      // 부지점장 직원번호
        String jumcode    = JSPUtil.getParameter(request, "jumcode" ," ");   // 부지점장 점번호
        String stdate     = JSPUtil.getParameter(request, "stdate" ," ");    // 발령일
        String enddate    = JSPUtil.getParameter(request, "enddate" ," ");   // 종료일
        String bpgcode    = JSPUtil.getParameter(request, "bpgcode" ," ");   // 부지점장PG코드

        long rc           = 0;
        Exception ext     = null;
        DbResultSet rs    = null;

        //조회 시작/종료 시간
        String startTime, endTime;

        // 등록 처리에 대한 Error 발생 시 메시지 처리를 위한 변수 ------------->
        String message    = "";

        try
        {
            DBProcCall jado = new DBProcCall();
            //START TIME 
            startTime = tpms.framework.component.util.DateTime.getShortTimeString();
            
           if (hidden_key.equals("9")){  /***** 조회 *****/
               rs = jado.callProc("UP_KPI_O_S_부지점장관리조회",basemonth);
               //조회종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();
               
               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                             +"부지점장관리조회"                  +","  //프로그램ID
                             +startTime                           +","  //시작시간
                             +endTime                             +","  //완료시간
                             +account.getHaengwon_no()            +","  //사용자ID
                             +account.getBranch_no()              +","  //점번호
                             +request.getRemoteAddr()             +","  //사용자IP
                             +"조회 : 기준년월=" +basemonth       + ";" //기준년월
                             );

           }else if (hidden_key.equals("1")) { /***** 등록 *****/

               rc = jado.InputProc("UP_KPI_O_S_부지점장관리처리","1,"   +
                                                           basemonth      + "," + 
                                                           emnm           + "," +
                                                           jumcode        + "," +
                                                           stdate         + "," +
                                                           enddate        + "," +
                                                           bpgcode        + "," +
                                                           emnm           + "," +
                                                           jumcode        + "," +
                                                           stdate         + "," +
                                                           enddate        + "," +
                                                           bpgcode        + "," +
                                                           strEmpNo      );
               //등록종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();

               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                  +","  //2:rpop,1:rpdy,5:운영관리
                             +"부지점장관리처리"                   +","  //프로그램ID
                             +startTime                            +","  //시작시간
                             +endTime                              +","  //완료시간
                             +account.getHaengwon_no()             +","  //사용자ID
                             +account.getBranch_no()               +","  //점번호
                             +request.getRemoteAddr()              +","  //사용자IP
                             +"등록 : 기준년월=" +basemonth        + ";" //기준년월
                             +"직원번호="        +emnm             + ";" //직원번호
                             +"점번호="          +jumcode          + ";" //점번호
                             +"발령일="          +stdate           + ";" //발령일
                             +"종료일="          +enddate          + ";" //종료일
                             +"PG코드="          +bpgcode          + ";" //PG코드
                             );
               rs = jado.callProc("UP_KPI_O_S_부지점장관리조회",basemonth);
           }else if (hidden_key.equals("2")) { /***** 변경 *****/

               String oldemnm     = JSPUtil.getParameter(request, "oldemnm" ," ");     // 구직원번호
               String oldjumcode  = JSPUtil.getParameter(request, "oldjumcode" ," ");  // 구점번호
               String oldstdate   = JSPUtil.getParameter(request, "oldstdate" ," ");   // 구발령일
               String oldenddate  = JSPUtil.getParameter(request, "oldenddate" ," ");  // 구종료일
               String oldbpgcode  = JSPUtil.getParameter(request, "oldbpgcode" ," ");  // 구PG코드

               rc = jado.InputProc("UP_KPI_O_S_부지점장관리처리","2,"   +
                                                           basemonth      + "," + 
                                                           emnm           + "," +
                                                           jumcode        + "," +
                                                           stdate         + "," +
                                                           enddate        + "," +
                                                           bpgcode        + "," +
                                                           oldemnm        + "," +
                                                           oldjumcode     + "," +
                                                           oldstdate      + "," +
                                                           oldenddate     + "," +
                                                           oldbpgcode     + "," +
                                                           strEmpNo       );
               //변경종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();

               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                  +","  //2:rpop,1:rpdy,5:운영관리
                             +"부지점장관리처리"                   +"," //프로그램ID
                             +startTime                            +","  //시작시간
                             +endTime                              +","  //완료시간
                             +account.getHaengwon_no()             +","  //사용자ID
                             +account.getBranch_no()               +","  //점번호
                             +request.getRemoteAddr()              +","  //사용자IP
                             +"변경 : 기준년월="     +basemonth    + ";" //기준년월
                             +"직원번호="            +emnm         + ";" //직원번호
                             +"점번호="              +jumcode      + ";" //점번호
                             +"발령일="              +stdate       + ";" //발령일
                             +"종료일="              +enddate      + ";" //종료일
                             +"PG코드="              +bpgcode      + ";" //PG코드
                             +"(구)직원번호="        +oldemnm      + ";" //구직원번호
                             +"(구)점번호="          +oldjumcode   + ";" //구점번호
                             +"(구)발령일="          +oldstdate    + ";" //구발령일
                             +"(구)종료일="          +oldenddate   + ";" //구종료일
                             +"(구)PG코드="          +oldbpgcode   + ";" //구PG코드
                             );
               rs = jado.callProc("UP_KPI_O_S_부지점장관리조회",basemonth);
           }else if (hidden_key.equals("3")) { /***** 삭제 *****/
               rc = jado.InputProc("UP_KPI_O_S_부지점장관리처리","3,"   +
                                                           basemonth      + "," + 
                                                           emnm           + "," +
                                                           jumcode        + "," +
                                                           stdate         + "," +
                                                           enddate        + "," +
                                                           bpgcode        + "," +
                                                           emnm           + "," +
                                                           jumcode        + "," +
                                                           stdate         + "," +
                                                           enddate        + "," +
                                                           bpgcode        + "," +
                                                           strEmpNo      );
               //삭제종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();

               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                  +","  //2:rpop,1:rpdy,5:운영관리
                             +"부지점장관리처리"                   +"," //프로그램ID
                             +startTime                            +","  //시작시간
                             +endTime                              +","  //완료시간
                             +account.getHaengwon_no()             +","  //사용자ID
                             +account.getBranch_no()               +","  //점번호
                             +request.getRemoteAddr()              +","  //사용자IP
                             +"삭제 : 기준년월=" +basemonth        + ";" //기준년월
                             +"직원번호="        +emnm             + ";" //직원번호
                             +"점번호="          +jumcode          + ";" //점번호
                             +"발령일="          +stdate           + ";" //발령일
                             +"종료일="          +enddate          + ";" //종료일
                             +"PG코드="          +bpgcode          + ";" //PG코드
                             );
               rs = jado.callProc("UP_KPI_O_S_부지점장관리조회",basemonth);
           }else if (hidden_key.equals("4")) { /***** 업로드 *****/
               String[] strStatus = JSPUtil.getParameter(request, "v_sv_0",  0);  // 상태               
               String[] emnmA     = JSPUtil.getParameter(request, "v_sv_1",  0);  // 직원번호
               String[] jumcodeA  = JSPUtil.getParameter(request, "v_sv_3",  0);  // 점번호
               String[] stdateA   = JSPUtil.getParameter(request, "v_sv_4",  0);  // 발령일
               String[] enddateA  = JSPUtil.getParameter(request, "v_sv_5",  0);  // 종료일
               String[] bpgcodeA  = JSPUtil.getParameter(request, "v_sv_7",  0);  // PG코드

               // 작업기준년월로 전체 테이타 삭제
               rc = jado.InputProc("UP_KPI_O_S_부지점장관리처리","4,"       +
                                                           basemonth          + "," + 
                                                           emnmA[0]           + "," +
                                                           jumcodeA[0]        + "," +
                                                           stdateA[0]         + "," +
                                                           enddateA[0]        + "," +
                                                           bpgcodeA[0]        + "," +
                                                           emnmA[0]           + "," +
                                                           jumcodeA[0]        + "," +
                                                           stdateA[0]         + "," +
                                                           enddateA[0]        + "," +
                                                           bpgcodeA[0]        + "," +
                                                           strEmpNo       );
               for(int i=0; i<strStatus.length; i++) {

                   rc = jado.InputProc("UP_KPI_O_S_부지점장관리처리","1,"   +
                                                           basemonth          + "," + 
                                                           emnmA[i]           + "," +
                                                           jumcodeA[i]        + "," +
                                                           stdateA[i]         + "," +
                                                           enddateA[i]        + "," +
                                                           bpgcodeA[i]        + "," +
                                                           emnmA[i]           + "," +
                                                           jumcodeA[i]        + "," +
                                                           stdateA[i]         + "," +
                                                           enddateA[i]        + "," +
                                                           bpgcodeA[i]        + "," +
                                                           strEmpNo       );
               }
                   //엑셀업로드 종료시간
                   endTime = tpms.framework.component.util.DateTime.getShortTimeString();

                   //web log 생성 :등록건수가 많아 timeout 예상되므로 등록자/일시 만 log로 남김
                   jado.InputProc("UP_KPI_C_S_WEBLOG"
                                 ,"5"                                      +","  //1:rpop,2:rphq,3:rprm,4:설문,5:운영관리
                                 +"부지점장관리처리"                       +","  //프로그램ID
                                 +startTime                                +","  //시작시간
                                 +endTime                                  +","  //완료시간
                                 +account.getHaengwon_no()                 +","  //사용자ID
                                 +account.getBranch_no()                   +","  //점번호
                                 +request.getRemoteAddr()                  +","  //사용자IP
                                 +"엑셀업로드 : 기준년월=" +basemonth      + ";" //기준년월
                                 );

           }
           log.debug(" HTMLAction success!");
        }catch(Exception exe)
        {
            log.error("DAO 생성 오류 "+exe.toString(),exe);
            
            // Error message 생성 --------------------------------------------->
            if (hidden_key.equals("1")) { /***** 등록 *****/
                message = "등록한 직원번호=" + emnm + "부임점번호" + jumcode + "발령일=" + stdate + " 정보를 확인하세요";
            }else if (hidden_key.equals("2")) { /***** 변경 *****/
                message = "변경한 직원번호=" + emnm + "부임점번호" + jumcode + "발령일=" + stdate + " 정보를 확인하세요";
            }else if (hidden_key.equals("3")) { /***** 삭제 *****/
                message = "삭제한 직원번호=" + emnm + "부임점번호" + jumcode + "발령일=" + stdate + " 정보를 확인하세요";
            }
            // ----------------------------------------------------------------/
            ext    =    exe;
        }
        // message 추가부 ----------------------------------------------------->
        main_scr_EventResponse eventResponse    =        new main_scr_EventResponse(rs,rc,ext,message); // message 추가부
        // --------------------------------------------------------------------/
        request.setAttribute("main_scr_EventResponse", eventResponse);
        return eventResponse;
  }
    /* HttpRequest의 attribute에 업무시나리오 수행결과 값 저장. */
    public void doEnd(HttpServletRequest request, EventResponse eventResponse) {

        request.setAttribute("EventResponse", eventResponse);

        log.debug("setAttribute");
    }

    /* HttpRequest의 attribute에 HttpRequest 파싱 수행결과 값 저장. */
    public void doEnd(HttpServletRequest request,Event event) {
        request.setAttribute("Event",event);
        log.debug("setAttribute");
    }

}//end class
