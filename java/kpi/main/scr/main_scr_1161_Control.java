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
 *  클래스 개요    : 고객관리자코드 조회 및 관리 <p>
 *  클래스 상세기능 : 고객관리자코드 처리 및 조회하여 JSP에 전달한다.<p>
 *  작성일 : 2006.12.18<p>
 *  @version 1.0
 *  @author  이현희
 */
public class main_scr_1161_Control extends HTMLActionSupport
{
      /**
       * HttpRequst의 정보를 고객관리자코드 조회 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {

        HttpSession session    = request.getSession(false);
        ServletContext context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        String hidden_key = JSPUtil.getParameter(request, "hidden_key"," ");         // 조회,등록,변경,삭제 구분자
        String basemonth  = JSPUtil.getParameter(request, "basemonth" ," ");
        String rmcode     = JSPUtil.getParameter(request, "rmcode" ,"9999999999");
        String jumcode    = JSPUtil.getParameter(request, "jumcode" ," ");
        String stdate     = JSPUtil.getParameter(request, "stdate" ," ");
        String enddate    = JSPUtil.getParameter(request, "enddate" ," ");
        String aclist     = JSPUtil.getParameter(request, "aclist" ," ");
        String RMjum      = JSPUtil.getParameter(request, "RMjum" ," ");

        String oldrmcode  = JSPUtil.getParameter(request, "oldrmcode" ," ");
        String oldjumcode = JSPUtil.getParameter(request, "oldjumcode" ," ");
        String oldaclist  = JSPUtil.getParameter(request, "oldaclist" ," ");
        String oldrmjum   = JSPUtil.getParameter(request, "oldrmjum"   ," ");
        String strEmpNo   = account.getHaengwon_no();

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

            //System.out.println(rmcode);
            //System.out.println(rmcode.trim().length());
            
            //START TIME 
            startTime = tpms.framework.component.util.DateTime.getShortTimeString();

           if (aclist.trim().length() > 0) {
              // 고객관리자 제외 계좌번호 조회 및 처리 	
              if (hidden_key.equals("9")){  /***** 조회 *****/
              	
               rs = jado.callProc("UP_KPI_O_S_고객관리자제외계좌조회",basemonth+","+rmcode+","+RMjum);
               //고객관리자제외계좌 조회종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();
               //고객관리자제외계좌 조회 web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                             +"UP_KPI_O_S_고객관리자제외계좌조회"	  +","  //프로그램ID
                             +startTime                           +","  //시작시간
                             +endTime                             +","  //완료시간
                             +account.getHaengwon_no()            +","  //사용자ID
                             +account.getBranch_no()              +","  //점번호
                             +request.getRemoteAddr()             +","  //사용자IP
                             +"조회 : 기준년월=" +basemonth       + ";" //기준년월
                             +"고객관리자코드="  +rmcode          + ";" //고객관리자코드
                             +"RM점번호="        +RMjum           + ";" //RM점번호
                             );
              	
              }else if (hidden_key.equals("1")) { /***** 등록 *****/
                  rc = jado.InputProc("UP_KPI_O_S_고객관리자제외계좌처리","1," +
                                                              basemonth + "," + 
                                                              rmcode    + "," +
                                                              RMjum     + "," +
                                                              jumcode   + "," +
                                                              aclist    + "," +
                                                              rmcode    + "," +
                                                              RMjum     + "," +
                                                              jumcode   + "," +
                                                              aclist    + "," +   
                                                              strEmpNo  );

                  //고객관리자제외계좌 신규등록 종료시간
                  endTime = tpms.framework.component.util.DateTime.getShortTimeString();
                  //고객관리자제외계좌 신규등록 web log 생성 
                  jado.InputProc("UP_KPI_C_S_WEBLOG"
                                ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                                +"UP_KPI_O_S_고객관리자제외계좌처리"   +","  //프로그램ID
                                +startTime                           +","  //시작시간
                                +endTime                             +","  //완료시간
                                +account.getHaengwon_no()            +","  //사용자ID
                                +account.getBranch_no()              +","  //점번호
                                +request.getRemoteAddr()             +","  //사용자IP
                                +"등록 : 기준년월=" +basemonth       + ";" //기준년월
                                +"고객관리자코드="  +rmcode          + ";" //고객관리자코드
                                +"RM점번호="        +RMjum           + ";" //RM점번호
                                +"점번호="          +jumcode         + ";" //점번호
                                +"계좌번호="        +aclist          + ";" //계좌번호
                                );
                 
                  rs = jado.callProc("UP_KPI_O_S_고객관리자제외계좌조회",basemonth+","+rmcode+","+RMjum);
                  
              }else if (hidden_key.equals("2")) { /***** 변경 *****/
                  rc = jado.InputProc("UP_KPI_O_S_고객관리자제외계좌처리","2," +
                                                              basemonth  + "," + 
                                                              rmcode     + "," +
                                                              RMjum      + "," +
                                                              jumcode    + "," +
                                                              aclist     + "," +
                                                              oldrmcode  + "," +
                                                              oldrmjum   + "," +
                                                              oldjumcode + "," +
                                                              oldaclist  + "," +
                                                              strEmpNo  );

                  //고객관리자제외계좌 변경등록 종료시간
                  endTime = tpms.framework.component.util.DateTime.getShortTimeString();
                  //고객관리자제외계좌 변경등록 web log 생성 
                  jado.InputProc("UP_KPI_C_S_WEBLOG"
                                ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                                +"UP_KPI_O_S_고객관리자제외계좌처리"   +","  //프로그램ID
                                +startTime                           +","  //시작시간
                                +endTime                             +","  //완료시간
                                +account.getHaengwon_no()            +","  //사용자ID
                                +account.getBranch_no()              +","  //점번호
                                +request.getRemoteAddr()             +","  //사용자IP
                                +"변경 : 기준년월=" +basemonth       + ";" //기준년월
                                +"고객관리자코드="  +rmcode          + ";" //고객관리자코드
                                +"RM점번호="        +RMjum           + ";" //RM점번호
                                +"점번호="          +jumcode         + ";" //점번호
                                +"계좌번호="        +aclist          + ";" //계좌번호
                                +"(구)고객관리자코드="  +oldrmcode          + ";" //(변경전)고객관리자코드
                                +"(구)RM점번호="        +oldrmjum           + ";" //(변경전)RM점번호
                                +"(구)점번호="          +oldjumcode         + ";" //(변경전)점번호
                                +"(구)계좌번호="        +oldaclist          + ";" //(변경전)계좌번호
                                );
                  rs = jado.callProc("UP_KPI_O_S_고객관리자제외계좌조회",basemonth+","+rmcode+","+RMjum);
              }else if (hidden_key.equals("3")) { /***** 삭제 *****/
                  rc = jado.InputProc("UP_KPI_O_S_고객관리자제외계좌처리","3," +
                                                              basemonth + "," + 
                                                              rmcode    + "," +
                                                              RMjum     + "," +
                                                              jumcode   + "," +
                                                              aclist    + "," +
                                                              rmcode    + "," +
                                                              jumcode   + "," +
                                                              RMjum     + "," +
                                                              aclist    + "," +   
                                                              strEmpNo  );

                  //고객관리자제외계좌 삭제  종료시간
                  endTime = tpms.framework.component.util.DateTime.getShortTimeString();
                  //고객관리자제외계좌 삭제 web log 생성 
                  jado.InputProc("UP_KPI_C_S_WEBLOG"
                                ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                                +"UP_KPI_O_S_고객관리자제외계좌처리"   +","  //프로그램ID
                                +startTime                           +","  //시작시간
                                +endTime                             +","  //완료시간
                                +account.getHaengwon_no()            +","  //사용자ID
                                +account.getBranch_no()              +","  //점번호
                                +request.getRemoteAddr()             +","  //사용자IP
                                +"삭제 : 기준년월=" +basemonth       + ";" //기준년월
                                +"고객관리자코드="  +rmcode          + ";" //고객관리자코드
                                +"RM점번호="        +RMjum           + ";" //RM점번호
                                +"점번호="          +jumcode         + ";" //점번호
                                +"계좌번호="        +aclist          + ";" //계좌번호
                                );
                  rs = jado.callProc("UP_KPI_O_S_고객관리자제외계좌조회",basemonth+","+rmcode+","+RMjum);
              }
           } else {	
              // 고객관리자 조회 및 처리
              if (hidden_key.equals("9")){  /***** 조회 *****/

                  rs = jado.callProc("UP_KPI_O_S_고객관리자조회",basemonth);
                  //고객관리자 조회 종료시간
                  endTime = tpms.framework.component.util.DateTime.getShortTimeString();
               
                  //고객관리자 조회 web log 생성 
                  jado.InputProc("UP_KPI_C_S_WEBLOG"
                                ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                                +"UP_KPI_O_S_고객관리자조회"	         +","  //프로그램ID
                                +startTime                           +","  //시작시간
                                +endTime                             +","  //완료시간
                                +account.getHaengwon_no()            +","  //사용자ID
                                +account.getBranch_no()              +","  //점번호
                                +request.getRemoteAddr()             +","  //사용자IP
                                +"조회 : 기준년월=" +basemonth       + ";" //기준년월
                                );
              	
              }else if (hidden_key.equals("1")) { /***** 등록 *****/
                  rc = jado.InputProc("UP_KPI_O_S_고객관리자처리","1," +
                                                              basemonth + "," + 
                                                              rmcode    + "," +
                                                              jumcode   + "," +
                                                              stdate    + "," +
                                                              enddate   + "," +
                                                              RMjum     + "," +
                                                              rmcode    + "," +
                                                              jumcode   + "," +
                                                              strEmpNo  );

                  //고객관리자 신규등록 종료시간
                  endTime = tpms.framework.component.util.DateTime.getShortTimeString();
               
                  //고객관리자 신규등록 web log 생성 
                  jado.InputProc("UP_KPI_C_S_WEBLOG"
                                ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                                +"UP_KPI_O_S_고객관리자처리"	         +","  //프로그램ID
                                +startTime                           +","  //시작시간
                                +endTime                             +","  //완료시간
                                +account.getHaengwon_no()            +","  //사용자ID
                                +account.getBranch_no()              +","  //점번호
                                +request.getRemoteAddr()             +","  //사용자IP
                                +"등록 : 기준년월=" +basemonth       + ";" //기준년월
                                +"고객관리자코드="  +rmcode          + ";" //고객관리자코드
                                +"점번호="          +jumcode         + ";" //점번호
                                +"발령일="          +stdate          + ";" //발령일
                                +"종료일="          +stdate          + ";" //종료일
                                +"RM점번호="        +RMjum           + ";" //RM점번호
                                );
                  rs = jado.callProc("UP_KPI_O_S_고객관리자조회",basemonth);                  	
              }else if (hidden_key.equals("2")) { /***** 변경 *****/
                  rc = jado.InputProc("UP_KPI_O_S_고객관리자처리","2," +
                                                              basemonth  + "," + 
                                                              rmcode     + "," +
                                                              jumcode    + "," +
                                                              stdate     + "," +
                                                              enddate    + "," +
                                                              RMjum      + "," +
                                                              oldrmcode  + "," +
                                                              oldjumcode + "," +   
                                                              strEmpNo  );

                  //고객관리자 변경 종료시간
                  endTime = tpms.framework.component.util.DateTime.getShortTimeString();
               
                  //고객관리자 변경 web log 생성 
                  jado.InputProc("UP_KPI_C_S_WEBLOG"
                                ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                                +"UP_KPI_O_S_고객관리자처리"	         +","  //프로그램ID
                                +startTime                           +","  //시작시간
                                +endTime                             +","  //완료시간
                                +account.getHaengwon_no()            +","  //사용자ID
                                +account.getBranch_no()              +","  //점번호
                                +request.getRemoteAddr()             +","  //사용자IP
                                +"변경 : 기준년월=" +basemonth       + ";" //기준년월
                                +"고객관리자코드="  +rmcode          + ";" //고객관리자코드
                                +"점번호="          +jumcode         + ";" //점번호
                                +"발령일="          +stdate          + ";" //발령일
                                +"종료일="          +stdate          + ";" //종료일
                                +"RM점번호="        +RMjum           + ";" //RM점번호
                                +"(구)고객관리자코드="  +rmcode          + ";" //(변경전)고객관리자코드
                                +"(구)점번호="          +jumcode         + ";" //(변경전)점번호
                                );
                  rs = jado.callProc("UP_KPI_O_S_고객관리자조회",basemonth);
              }else if (hidden_key.equals("3")) { /***** 삭제 *****/
                  rc = jado.InputProc("UP_KPI_O_S_고객관리자처리","3," +
                                                              basemonth + "," + 
                                                              rmcode    + "," +
                                                              jumcode   + "," +
                                                              stdate    + "," +
                                                              enddate   + "," +
                                                              RMjum     + "," +
                                                              rmcode    + "," +
                                                              jumcode   + "," +   
                                                              strEmpNo  );

                  //고객관리자 삭제 종료시간
                  endTime = tpms.framework.component.util.DateTime.getShortTimeString();
               
                  //고객관리자 삭제 web log 생성 
                  jado.InputProc("UP_KPI_C_S_WEBLOG"
                                ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                                +"UP_KPI_O_S_고객관리자처리"	         +","  //프로그램ID
                                +startTime                           +","  //시작시간
                                +endTime                             +","  //완료시간
                                +account.getHaengwon_no()            +","  //사용자ID
                                +account.getBranch_no()              +","  //점번호
                                +request.getRemoteAddr()             +","  //사용자IP
                                +"삭제 : 기준년월=" +basemonth       + ";" //기준년월
                                +"고객관리자코드="  +rmcode          + ";" //고객관리자코드
                                +"점번호="          +jumcode         + ";" //점번호
                                +"발령일="          +stdate          + ";" //발령일
                                +"종료일="          +stdate          + ";" //종료일
                                +"RM점번호="        +RMjum           + ";" //RM점번호
                                );
                  rs = jado.callProc("UP_KPI_O_S_고객관리자조회",basemonth);
              }
           }   
           log.debug(" HTMLAction success!");
        }catch(Exception exe)
        {
            log.error("DAO 생성 오류 "+exe.toString(),exe);
            
            // Error message 생성 --------------------------------------------->
            if (hidden_key.equals("1")) { /***** 등록 *****/
                message = "등록한 고객관리자코드=" + rmcode + " 정보를 확인하세요";
            }else if (hidden_key.equals("2")) { /***** 변경 *****/
                message = "변경한 고객관리자코드=" + rmcode + " 정보를 확인하세요";
            }else if (hidden_key.equals("3")) { /***** 삭제 *****/
                message = "삭제한 고객관리자코드=" + rmcode + " 정보를 확인하세요";
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
