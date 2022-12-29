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
 *  클래스 개요    : 개인별PI직원정보관리 조회 및 처리 <p>
 *  클래스 상세기능: 개인별PI직원정보관리 upload 처리 및 조회하여 JSP에 전달한다.<p>
 *  작성일 : 2009. 6. 8<p>
 *  @version 1.0
 *  @author  조형석
 */
public class main_scr_4031_Control extends HTMLActionSupport
{
      /**
       * HttpRequst의 정보를 개인별PI직원정보관리 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {

        HttpSession session   = request.getSession(false);
        ServletContext context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        String strEmpNo   = account.getHaengwon_no();

        String hidden_key = JSPUtil.getParameter(request, "hidden_key"," ");   // 조회,등록,변경,삭제 구분자
        String basemonth  = JSPUtil.getParameter(request, "basemonth" ," ");

        String member     = JSPUtil.getParameter(request, "member" ," ");   // 직원번호
        String membergb   = JSPUtil.getParameter(request, "membergb" ," "); // 구분

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
               rs = jado.callProc("UP_KPI_O_S_개인별PI직원정보관리조회",basemonth);
               //조회종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();
               
               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                  +","  //2:rpop,1:rpdy,5:운영관리   
                             +"UP_KPI_O_S_개인별PI직원정보관리조회"	 +","  //프로그램ID
                             +startTime                            +","  //시작시간
                             +endTime                              +","  //완료시간
                             +account.getHaengwon_no()             +","  //사용자ID
                             +account.getBranch_no()               +","  //점번호
                             +request.getRemoteAddr()              +","  //사용자IP
                             +"조회 : 기준년월=" +basemonth        + ";" //기준년월
                             );
               
           }else if (hidden_key.equals("1")) { /***** 등록 *****/

               rc = jado.InputProc("UP_KPI_O_S_개인별PI직원정보관리처리","1,"   +
                                                            basemonth         + "," + 
                                                            member            + "," +
                                                            membergb          + "," +
                                                            member            + "," +
                                                            membergb          + "," +
                                                            strEmpNo   );
               //등록종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();

               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리   
                             +"UP_KPI_O_S_개인별PI직원정보관리처리" +","  //프로그램ID
                             +startTime                           +","  //시작시간
                             +endTime                             +","  //완료시간
                             +account.getHaengwon_no()            +","  //사용자ID
                             +account.getBranch_no()              +","  //점번호
                             +request.getRemoteAddr()             +","  //사용자IP
                             +"등록 : 기준년월=" +basemonth       + ";" //기준년월
                             +"직원번호="        +member          + ";" //직원번호
                             +"구분="            +membergb        + ";" //구분
                             );
               rs = jado.callProc("UP_KPI_O_S_개인별PI직원정보관리조회",basemonth);
           }else if (hidden_key.equals("2")) { /***** 변경 *****/

               String oldmember    = JSPUtil.getParameter(request, "oldmember" ," ");    // 구직원번호
               String oldmembergb  = JSPUtil.getParameter(request, "oldmembergb" ," ");  // 구구분

               rc = jado.InputProc("UP_KPI_O_S_개인별PI직원정보관리처리","2,"    +
                                                           basemonth     + "," + 
                                                           member        + "," +
                                                           membergb      + "," +
                                                           oldmember     + "," +
                                                           oldmembergb   + "," +
                                                           strEmpNo   );
               //변경종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();

               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리   
                             +"UP_KPI_O_S_개인별PI직원정보관리처리" +","  //프로그램ID
                             +startTime                           +","  //시작시간
                             +endTime                             +","  //완료시간
                             +account.getHaengwon_no()            +","  //사용자ID
                             +account.getBranch_no()              +","  //점번호
                             +request.getRemoteAddr()             +","  //사용자IP
                             +"변경 : 기준년월="   +basemonth     + ";" //기준년월
                             +"직원번호="          +member        + ";" //직원번호
                             +"구분="              +membergb      + ";" //구분
                             +"구직원번호="        +oldmember     + ";" //구직원번호
                             +"구구분="            +oldmembergb   + ";" //구구분
                             );
               rs = jado.callProc("UP_KPI_O_S_개인별PI직원정보관리조회",basemonth);               
           }else if (hidden_key.equals("3")) { /***** 삭제 *****/

               rc = jado.InputProc("UP_KPI_O_S_개인별PI직원정보관리처리","3,"    +
                                                           basemonth     + "," + 
                                                           member        + "," +
                                                           membergb      + "," +
                                                           member        + "," +
                                                           membergb      + "," +
                                                           strEmpNo   );
               //삭제종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();

               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리   
                             +"UP_KPI_O_S_개인별PI직원정보관리처리" +","  //프로그램ID
                             +startTime                           +","  //시작시간
                             +endTime                             +","  //완료시간
                             +account.getHaengwon_no()            +","  //사용자ID
                             +account.getBranch_no()              +","  //점번호
                             +request.getRemoteAddr()             +","  //사용자IP
                             +"삭제 : 기준년월="   +basemonth     + ";" //기준년월
                             +"직원번호="          +member        + ";" //직원번호
                             +"구분="              +membergb      + ";" //구분
                             );
               rs = jado.callProc("UP_KPI_O_S_개인별PI직원정보관리조회",basemonth);
           }else if (hidden_key.equals("4")) { /***** 업로드 *****/
               String[] strStatus     = JSPUtil.getParameter(request, "v_sv_0",  0);  // 상태               
               String[] oldmember     = JSPUtil.getParameter(request, "v_sv_1",  0);  // 구직원번호
               String[] oldmembergb   = JSPUtil.getParameter(request, "v_sv_3",  0);  // 구구분

               // 작업기준년월로 전체 테이타 삭제
               rc = jado.InputProc("UP_KPI_O_S_개인별PI직원정보관리처리","4,"  +
                                                           basemonth         + "," + 
                                                           oldmember[0]      + "," +
                                                           oldmembergb[0]    + "," +
                                                           oldmember[0]      + "," +
                                                           oldmembergb[0]    + "," +
                                                           strEmpNo   );
               for(int i=0; i<strStatus.length; i++) {

                   rc = jado.InputProc("UP_KPI_O_S_개인별PI직원정보관리처리","1,"   +
                                                             basemonth         + "," + 
                                                             oldmember[i]      + "," +
                                                             oldmembergb[i]    + "," +
                                                             oldmember[i]      + "," +
                                                             oldmembergb[i]    + "," +
                                                             strEmpNo       );
               }
                   //엑셀업로드 종료시간
                   endTime = tpms.framework.component.util.DateTime.getShortTimeString();

                   //web log 생성 :등록건수가 많아 timeout 예상되므로 등록자/일시 만 log로 남김
                   jado.InputProc("UP_KPI_C_S_WEBLOG"
                                 ,"5"                                  +","  //2:rpop,1:rpdy,5:운영관리   
                                 +"UP_KPI_O_S_개인별PI직원정보관리처리"  +","  //프로그램ID
                                 +startTime                            +","  //시작시간
                                 +endTime                              +","  //완료시간
                                 +account.getHaengwon_no()             +","  //사용자ID
                                 +account.getBranch_no()               +","  //점번호
                                 +request.getRemoteAddr()              +","  //사용자IP
                                 +"엑셀업로드 : 기준년월="   +basemonth      + ";" //기준년월                                 
                                 );

           }
           log.debug(" HTMLAction success!");
        }catch(Exception exe)
        {
            log.error("DAO 생성 오류 "+exe.toString(),exe);
            
            // Error message 생성 --------------------------------------------->
            if (hidden_key.equals("1")) { /***** 등록 *****/
                message = "등록한 직원번호=" + member + "구분=" + membergb  + " 정보를 확인하세요";
            }else if (hidden_key.equals("2")) { /***** 변경 *****/
                message = "변경한 직원번호=" + member + "구분=" + membergb  + " 정보를 확인하세요";
            }else if (hidden_key.equals("3")) { /***** 삭제 *****/
                message = "삭제한 직원번호=" + member + "구분=" + membergb  + " 정보를 확인하세요";
            }
            // ----------------------------------------------------------------/
            ext    =    exe;
        }
/****************************변경************************/
        // message 추가부 ----------------------------------------------------->
        main_scr_EventResponse eventResponse    =        new main_scr_EventResponse(rs,rc,ext,message); // message 추가부
        // --------------------------------------------------------------------/
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
