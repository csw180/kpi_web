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
 *  클래스 개요    : 후선배치직원권유계좌 조회 및 관리 <p>
 *  클래스 상세기능 : 후선배치직원권유계좌 upload 처리 및 조회하여 JSP에 전달한다.<p>
 *  작성일 : 2008.02.28<p>
 *  @version 1.0
 *  @author  조형석
 */
public class main_scr_1181_Control extends HTMLActionSupport
{
      /**
       * HttpRequst의 정보를 후선배치직원권유계좌 조회 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {

        HttpSession session   = request.getSession(false);
        ServletContext context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        String hidden_key     = JSPUtil.getParameter(request, "hidden_key"," ");         // 조회,등록,변경,삭제 구분자
        String basemonth      = JSPUtil.getParameter(request, "basemonth" ," ");
        String jumcode        = JSPUtil.getParameter(request, "jumcode" ," ");
        String accountno      = JSPUtil.getParameter(request, "accountno" ," ");
        String accountcode    = JSPUtil.getParameter(request, "accountcode" ," ");
        String gunsabun       = JSPUtil.getParameter(request, "gunsabun" ," ");
        String mjumrate       = JSPUtil.getParameter(request, "mjumrate" ,"0");

        String strEmpNo       = account.getHaengwon_no();
        String oldjumcode     = JSPUtil.getParameter(request, "oldjumcode" ," ");
        String oldaccountno   = JSPUtil.getParameter(request, "oldaccountno" ," ");
        String oldaccountcode = JSPUtil.getParameter(request, "oldaccountcode" ," ");
        String oldgunsabun    = JSPUtil.getParameter(request, "oldgunsabun" ," ");
        String oldmjumrate    = JSPUtil.getParameter(request, "oldmjumrate" ,"0");

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
               rs = jado.callProc("UP_KPI_O_S_후선배치직원실적조회",basemonth);
                //조회종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();
               
               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                             +"UP_KPI_O_S_후선배치직원실적조회"	    +","  //프로그램ID
                             +startTime                           +","  //시작시간
                             +endTime                             +","  //완료시간
                             +account.getHaengwon_no()            +","  //사용자ID
                             +account.getBranch_no()              +","  //점번호
                             +request.getRemoteAddr()             +","  //사용자IP
                             +"조회 : 기준년월=" +basemonth       + ";" //기준년월
                             );

           }else if (hidden_key.equals("1")) { /***** 1건 등록 미사용*****/
               rc = jado.InputProc("UP_KPI_O_S_후선배치직원실적처리","1," +
                                                           basemonth   + "," + 
                                                           jumcode     + "," +
                                                           accountno   + "," +
                                                           accountcode + "," +
                                                           gunsabun    + "," +
                                                           mjumrate    + "," +
                                                           strEmpNo    + "," +
                                                           jumcode     + "," +
                                                           accountno   + "," +
                                                           accountcode + "," +
                                                           gunsabun    + "," +
                                                           mjumrate           
                                                           );
                                                           
               //등록 종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();
               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                             +"UP_KPI_O_S_후선배치직원실적처리"	    +","  //프로그램ID
                             +startTime                           +","  //시작시간
                             +endTime                             +","  //완료시간
                             +account.getHaengwon_no()            +","  //사용자ID
                             +account.getBranch_no()              +","  //점번호
                             +request.getRemoteAddr()             +","  //사용자IP
                             +"등록 : 기준년월="  +basemonth      + ";" //기준년월
                             +"점번호="           +jumcode        + ";" //점번호
                             +"계좌번호="         +accountno      + ";" //계좌번호
                             +"계정과목코드="     +accountcode    + ";" //계정과목코드
                             +"권유자직원번호="   +gunsabun       + ";" //권유자직원번호
                             +"관리점비율="       +mjumrate       + ";" //관리점비율
                             );
                                                        
           }else if (hidden_key.equals("2")) { /***** 변경 미사용*****/
               rc = jado.InputProc("UP_KPI_O_S_후선배치직원실적처리","2," +
                                                           basemonth      + "," + 
                                                           jumcode        + "," +
                                                           accountno      + "," +
                                                           accountcode    + "," +
                                                           gunsabun       + "," +
                                                           mjumrate       + "," +
                                                           strEmpNo       + "," +
                                                           oldjumcode     + "," +
                                                           oldaccountno   + "," +
                                                           oldaccountcode + "," +
                                                           oldgunsabun    + "," +
                                                           oldmjumrate            );
               //변경 종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();
               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                             +"UP_KPI_O_S_후선배치직원실적처리"	    +","  //프로그램ID
                             +startTime                           +","  //시작시간
                             +endTime                             +","  //완료시간
                             +account.getHaengwon_no()            +","  //사용자ID
                             +account.getBranch_no()              +","  //점번호
                             +request.getRemoteAddr()             +","  //사용자IP
                             +"변경 : 기준년월="    +basemonth            + ";" //기준년월
                             +"점번호="             +jumcode              + ";" //점번호
                             +"계좌번호="           +accountno            + ";" //계좌번호
                             +"계정과목코드="       +accountcode          + ";" //계정과목코드
                             +"권유자직원번호="     +gunsabun             + ";" //권유자직원번호
                             +"관리점비율="         +mjumrate             + ";" //관리점비율
                             +"(구)점번호="         +oldjumcode           + ";" //(변경전)점번호
                             +"(구)계좌번호="       +oldaccountno         + ";" //(변경전)계좌번호
                             +"(구)계정과목코드="   +oldaccountcode       + ";" //(변경전)계정과목코드
                             +"(구)권유자직원번호=" +oldgunsabun          + ";" //(변경전)권유자직원번호
                             +"(구)관리점비율="     +oldmjumrate          + ";" //(변경전)관리점비율
                             );
           }else if (hidden_key.equals("3")) { /***** 건별삭제 (미사용)*****/
               rc = jado.InputProc("UP_KPI_O_S_후선배치직원실적처리","3," +
                                                           basemonth   + "," + 
                                                           jumcode     + "," +
                                                           accountno   + "," +
                                                           accountcode + "," +
                                                           gunsabun    + "," +
                                                           mjumrate    + "," +
                                                           strEmpNo    + "," +
                                                           jumcode     + "," +
                                                           accountno   + "," +
                                                           accountcode + "," +
                                                           gunsabun    + "," +
                                                           mjumrate            );
               //삭제 종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();
               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                             +"UP_KPI_O_S_후선배치직원실적처리"	    +","  //프로그램ID
                             +startTime                           +","  //시작시간
                             +endTime                             +","  //완료시간
                             +account.getHaengwon_no()            +","  //사용자ID
                             +account.getBranch_no()              +","  //점번호
                             +request.getRemoteAddr()             +","  //사용자IP
                             +"삭제 : 기준년월="  +basemonth      + ";" //기준년월
                             +"점번호="           +jumcode        + ";" //점번호
                             +"계좌번호="         +accountno      + ";" //계좌번호
                             +"계정과목코드="     +accountcode    + ";" //계정과목코드
                             +"권유자직원번호="   +gunsabun       + ";" //권유자직원번호
                             +"관리점비율="       +mjumrate       + ";" //관리점비율
                             );

           }else if (hidden_key.equals("4")) { /***** 엑셀 UPLOAD *****/
              rc = jado.InputProc("UP_KPI_O_S_후선배치직원실적처리","4,"  +
                                                           basemonth   + "," + 
                                                           jumcode     + "," +
                                                           accountno   + "," +
                                                           accountcode + "," +
                                                           gunsabun    + "," +
                                                           mjumrate    + "," +
                                                           strEmpNo    + "," +
                                                           jumcode     + "," +
                                                           accountno   + "," +
                                                           accountcode + "," +
                                                           gunsabun    + "," +
                                                           mjumrate            );
               //삭제 종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();
               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                             +"UP_KPI_O_S_후선배치직원실적처리"	    +","  //프로그램ID
                             +startTime                           +","  //시작시간
                             +endTime                             +","  //완료시간
                             +account.getHaengwon_no()            +","  //사용자ID
                             +account.getBranch_no()              +","  //점번호
                             +request.getRemoteAddr()             +","  //사용자IP
                             +"삭제 : 기준년월="  +basemonth      + ";" //기준년월
                             );
                                                           
              String sStatus[]      = JSPUtil.getParameter(request,"v_status" ,0);
              String v_sv_1[]       = JSPUtil.getParameter(request,"v_sv_1"   ,0);
              String v_sv_2[]       = JSPUtil.getParameter(request,"v_sv_2"   ,0);
              String v_sv_3[]       = JSPUtil.getParameter(request,"v_sv_3"   ,0);
              String v_sv_4[]       = JSPUtil.getParameter(request,"v_sv_4"   ,0);
              String v_sv_5[]       = JSPUtil.getParameter(request,"v_sv_5"   ,0);
              String v_sv_6[]       = JSPUtil.getParameter(request,"v_sv_6"   ,0);
              for(int i = 0; i < sStatus.length; i++) {
              rc = jado.InputProc("UP_KPI_O_S_후선배치직원실적처리","1," +
                                                           v_sv_1[i]  + "," +
                                                           v_sv_2[i]  + "," +
                                                           v_sv_3[i]  + "," +
                                                           v_sv_4[i]  + "," +
                                                           v_sv_5[i]  + "," +
                                                           v_sv_6[i]  + "," +
                                                           strEmpNo   + "," +
                                                           v_sv_2[i]  + "," +
                                                           v_sv_3[i]  + "," +
                                                           v_sv_4[i]  + "," +
                                                           v_sv_5[i]  + "," +
                                                           v_sv_6[i]          );
                  // Error message 값 SET 위한 index -------------------------->
                  idx++;
                  // ----------------------------------------------------------/
                }
              //등록 종료시간
              endTime = tpms.framework.component.util.DateTime.getShortTimeString();
              //web log 생성 : 등록데이터가 많을경우 timeout 발생가능하므로 최종등록자/일시만 log처리.
              jado.InputProc("UP_KPI_C_S_WEBLOG"
                            ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                            +"UP_KPI_O_S_후선배치직원실적처리"	   +","  //프로그램ID
                            +startTime                           +","  //시작시간
                            +endTime                             +","  //완료시간
                            +account.getHaengwon_no()            +","  //사용자ID
                            +account.getBranch_no()              +","  //점번호
                            +request.getRemoteAddr()             +","  //사용자IP
                            +"등록 : 기준년월="  +basemonth      + ";" //기준년월
                            );
               
            }
                       
            log.debug(" HTMLAction success!");
        }catch(Exception exe)
        {
            log.error("DAO 생성 오류 "+exe.toString(),exe);
            
            // Error message 생성 --------------------------------------------->
            if (hidden_key.equals("1")) { /***** 등록 *****/
                message = "등록한 " + "점번호=" + jumcode + " 계좌번호=" + accountno + " 계정코드=" + accountcode + " 정보를 확인하세요";
            }else if (hidden_key.equals("2")) { /***** 변경 *****/
                message = "변경한 " + "점번호=" + jumcode + " 계좌번호=" + accountno + " 계정코드=" + accountcode + " 정보를 확인하세요";
            }else if (hidden_key.equals("3")) { /***** 삭제 *****/
                message = "삭제한 " + "점번호=" + jumcode + " 계좌번호=" + accountno + " 계정코드=" + accountcode + " 정보를 확인하세요";
            }
            // ----------------------------------------------------------------/
            ext    =    exe;
        }
/****************************변경************************/
        // message 추가부 ----------------------------------------------------->
        main_scr_EventResponse eventResponse    =  new main_scr_EventResponse(rs,rc,ext,message); // message 추가부
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
