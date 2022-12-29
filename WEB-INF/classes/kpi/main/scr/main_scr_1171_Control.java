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
 *  클래스 개요    : 10조달처 조회 및 관리 <p>
 *  클래스 상세기능 : 10조달처 변경,등록,삭제  처리 및 조회하여 JSP에 전달한다.<p>
 *  작성일 : 2007.12.27<p>
 *  @version 1.0
 *  @author  이우석
 */
public class main_scr_1171_Control extends HTMLActionSupport
{
      /**
       * HttpRequst의 정보를 10대조달처 조회 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {

        HttpSession session   = request.getSession(false);
        ServletContext context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        String hidden_key     = JSPUtil.getParameter(request, "hidden_key"," ");         // 조회,등록,변경,삭제 구분자
        String basemonth      = JSPUtil.getParameter(request, "basemonth" ," ");
        String customerno     = JSPUtil.getParameter(request, "customerno" ," ");
        String jumcode        = JSPUtil.getParameter(request, "jumcode" ," ");
        String pyungjan       = JSPUtil.getParameter(request, "pyungjan" ," ");
        String pyungjan1      = JSPUtil.getParameter(request, "pyungjan1" ," ");
        String pyungjan2      = JSPUtil.getParameter(request, "pyungjan2" ," ");
        String pyungjan3      = JSPUtil.getParameter(request, "pyungjan3" ," ");
        String strEmpNo       = account.getHaengwon_no();
        String oldcustomerno  = JSPUtil.getParameter(request, "oldcustomerno" ,"0");
        String oldjumcode     = JSPUtil.getParameter(request, "oldjumcode" ," ");
        String oldpyungjan    = JSPUtil.getParameter(request, "oldpyungjan" ," ");
        String oldpyungjan1   = JSPUtil.getParameter(request, "oldpyungjan1" ," ");
        String oldpyungjan2   = JSPUtil.getParameter(request, "oldpyungjan2" ," ");
        String oldpyungjan3   = JSPUtil.getParameter(request, "oldpyungjan3" ," ");

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
               rs = jado.callProc("UP_KPI_O_S_주요조달처조회",basemonth);
               //조회종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();
               
               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                             +"UP_KPI_O_S_주요조달처조회"	          +","  //프로그램ID
                             +startTime                           +","  //시작시간
                             +endTime                             +","  //완료시간
                             +account.getHaengwon_no()            +","  //사용자ID
                             +account.getBranch_no()              +","  //점번호
                             +request.getRemoteAddr()             +","  //사용자IP
                             +"조회 : 기준년월=" +basemonth       + ";" //기준년월
                             );
               
           }else if (hidden_key.equals("1")) { /***** 등록 *****/
               rc = jado.InputProc("UP_KPI_O_S_주요조달처처리","1," +
                                                           basemonth      + "," + 
                                                           customerno     + "," +
                                                           jumcode        + "," +
                                                           pyungjan       + "," +
                                                           pyungjan1      + "," +
                                                           pyungjan2      + "," +
                                                           pyungjan3      + "," +
                                                           strEmpNo       + "," +
                                                           oldcustomerno  + "," +
                                                           oldjumcode);

                //신규등록 종료시간
                endTime = tpms.framework.component.util.DateTime.getShortTimeString();
                //web log 생성 
                jado.InputProc("UP_KPI_C_S_WEBLOG"
                              ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                              +"UP_KPI_O_S_주요조달처처리"	         +","  //프로그램ID
                              +startTime                           +","  //시작시간
                              +endTime                             +","  //완료시간
                              +account.getHaengwon_no()            +","  //사용자ID
                              +account.getBranch_no()              +","  //점번호
                              +request.getRemoteAddr()             +","  //사용자IP
                              +"등록 : 기준년월=" +basemonth       + ";" //기준년월
                              +"고객번호="        +customerno      + ";" //고객번호
                              +"성과관리점번호="  +jumcode         + ";" //성과관리점번호
                              +"유지목표잔액="        +pyungjan        + ";" //유지목표잔액
                              +"유지목표반기평잔="    +pyungjan1       + ";" //유지목표반기평잔
                              +"유지목표기중평잔="    +pyungjan2       + ";" //유지목표기중평잔
                              +"유지목표분기평잔="    +pyungjan3       + ";" //유지목표분기평잔
                              );
                
                /********************조회 20220217 oyj 추가 ********************/
                rs = jado.callProc("UP_KPI_O_S_주요조달처조회",basemonth);
           }else if (hidden_key.equals("2")) { /***** 변경 *****/
               rc = jado.InputProc("UP_KPI_O_S_주요조달처처리","2," +
                                                           basemonth      + "," + 
                                                           customerno     + "," +
                                                           jumcode        + "," +
                                                           pyungjan       + "," +
                                                           pyungjan1      + "," +
                                                           pyungjan2      + "," +
                                                           pyungjan3      + "," +
                                                           strEmpNo       + "," +
                                                           oldcustomerno  + "," +
                                                           oldjumcode);

                //변경등록 종료시간
                endTime = tpms.framework.component.util.DateTime.getShortTimeString();
                //web log 생성 
                jado.InputProc("UP_KPI_C_S_WEBLOG"
                              ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                              +"UP_KPI_O_S_주요조달처처리"	         +","  //프로그램ID
                              +startTime                           +","  //시작시간
                              +endTime                             +","  //완료시간
                              +account.getHaengwon_no()            +","  //사용자ID
                              +account.getBranch_no()              +","  //점번호
                              +request.getRemoteAddr()             +","  //사용자IP
                              +"변경 : 기준년월=" +basemonth       + ";" //기준년월
                              +"고객번호="        +customerno      + ";" //고객번호
                              +"성과관리점번호="  +jumcode         + ";" //성과관리점번호
                              +"유지목표잔액="        +pyungjan        + ";" //유지목표잔액
                              +"유지목표반기평잔="    +pyungjan1       + ";" //유지목표반기평잔
                              +"유지목표기중평잔="    +pyungjan2       + ";" //유지목표기중평잔
                              +"유지목표분기평잔="    +pyungjan3       + ";" //유지목표분기평잔
                              +"(구)고객번호="        +oldcustomerno   + ";" //(변경전)고객번호
                              +"(구)성과관리점번호="  +oldjumcode      + ";" //(변경전)성과관리점번호
                              );
                /********************조회 20220217 oyj 추가 ********************/
                rs = jado.callProc("UP_KPI_O_S_주요조달처조회",basemonth);
                
           }else if (hidden_key.equals("3")) { /***** 삭제 *****/
               rc = jado.InputProc("UP_KPI_O_S_주요조달처처리","3," +
                                                           basemonth      + "," + 
                                                           customerno     + "," +
                                                           jumcode        + "," +
                                                           pyungjan       + "," +
                                                           pyungjan1      + "," +
                                                           pyungjan2      + "," +
                                                           pyungjan3      + "," +
                                                           strEmpNo       + "," +
                                                           oldcustomerno  + "," +
                                                           oldjumcode);

                //삭제 종료시간
                endTime = tpms.framework.component.util.DateTime.getShortTimeString();
                //web log 생성 
                jado.InputProc("UP_KPI_C_S_WEBLOG"
                              ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                              +"UP_KPI_O_S_주요조달처처리"	         +","  //프로그램ID
                              +startTime                           +","  //시작시간
                              +endTime                             +","  //완료시간
                              +account.getHaengwon_no()            +","  //사용자ID
                              +account.getBranch_no()              +","  //점번호
                              +request.getRemoteAddr()             +","  //사용자IP
                              +"삭제 : 기준년월=" +basemonth       + ";" //기준년월
                              +"고객번호="        +customerno      + ";" //고객번호
                              +"성과관리점번호="  +jumcode         + ";" //성과관리점번호
                              );
                                     
                /********************조회 20220217 oyj 추가 ********************/
                rs = jado.callProc("UP_KPI_O_S_주요조달처조회",basemonth);
           }
            log.debug(" HTMLAction success!");
        }catch(Exception exe)
        {
            log.error("DAO 생성 오류 "+exe.toString(),exe);
            
            // Error message 생성 --------------------------------------------->
            if (hidden_key.equals("1")) { /***** 등록 *****/
                message = "등록한 고객번호=" + customerno + " 정보를 확인하세요";
            }else if (hidden_key.equals("2")) { /***** 변경 *****/
                message = "변경한 고객번호=" + customerno + " 정보를 확인하세요";
            }else if (hidden_key.equals("3")) { /***** 삭제 *****/
                message = "삭제한 고객번호=" + basemonth + customerno + jumcode + " 정보를 확인하세요";
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
