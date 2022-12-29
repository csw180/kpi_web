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
 *  클래스 개요    : 후선보임권유계좌관리 조회 및 처리 <p>
 *  클래스 상세기능: 후선보임권유계좌관리 upload 처리 및 조회하여 JSP에 전달한다.<p>
 *  작성일 : 2013.11.19<p>
 *  @version 1.0
 *  @author  조형석
 */
public class main_scr_5021_Control extends HTMLActionSupport
{
      /**
       * HttpRequst의 정보를 후선보임권유계좌관리 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {

        HttpSession session   = request.getSession(false);
        ServletContext context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        String strEmpNo   = account.getHaengwon_no();

        String hidden_key = JSPUtil.getParameter(request, "hidden_key"," ");   // 조회,등록,변경,삭제 구분자
        String basemonth  = JSPUtil.getParameter(request, "basemonth" ," ");

        String emnm       = JSPUtil.getParameter(request, "emnm" ," ");       // 후선보임직원번호
        String jumcode    = JSPUtil.getParameter(request, "jumcode" ," ");    // 취급점번호
        String accunt     = JSPUtil.getParameter(request, "accunt" ," ");     // 계좌번호
        String accuntcode = JSPUtil.getParameter(request, "accuntcode" ," "); // 계정과목코드
        String acmgb      = JSPUtil.getParameter(request, "acmgb" ," ");      // 계좌관리구분

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
               rs = jado.callProc("UP_KPI_O_S_후선보임권유계좌관리조회",basemonth);
               //조회종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();
               
               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                             +"후선보임권유계좌관리조회"	        +","  //프로그램ID
                             +startTime                           +","  //시작시간
                             +endTime                             +","  //완료시간
                             +account.getHaengwon_no()            +","  //사용자ID
                             +account.getBranch_no()              +","  //점번호
                             +request.getRemoteAddr()             +","  //사용자IP
                             +"조회 : 기준년월=" +basemonth       + ";" //기준년월
                             );
               
           }else if (hidden_key.equals("1")) { /***** 등록 *****/

               rc = jado.InputProc("UP_KPI_O_S_후선보임권유계좌관리처리","1,"   +
                                                           basemonth          + "," + 
                                                           emnm               + "," +
                                                           jumcode            + "," +
                                                           accunt             + "," +
                                                           accuntcode         + "," +
                                                           acmgb              + "," +
                                                           emnm               + "," +
                                                           jumcode            + "," +
                                                           accunt             + "," +
                                                           accuntcode         + "," +
                                                           acmgb              + "," +
                                                           strEmpNo       );
               //등록종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();

               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                  +","  //2:rpop,1:rpdy,5:운영관리
                             +"후선보임권유계좌관리처리"           +"," //프로그램ID
                             +startTime                            +","  //시작시간
                             +endTime                              +","  //완료시간
                             +account.getHaengwon_no()             +","  //사용자ID
                             +account.getBranch_no()               +","  //점번호
                             +request.getRemoteAddr()              +","  //사용자IP
                             +"등록 : 기준년월=" +basemonth        + ";" //기준년월
                             +"후선보임직원번호="+emnm             + ";" //후선보임직원번호
                             +"점번호="          +jumcode          + ";" //취급점번호
                             +"계좌번호="        +accunt           + ";" //계좌번호
                             +"계정과목코드="    +accuntcode       + ";" //계정과목코드
                             +"계좌관리구분="    +acmgb            + ";" //계좌관리구분
                             );

           }else if (hidden_key.equals("2")) { /***** 변경 *****/

               String oldemnm       = JSPUtil.getParameter(request, "oldemnm" ," ");       // 구후선보임직원번호
               String oldjumcode    = JSPUtil.getParameter(request, "oldjumcode" ," ");    // 구취급점번호
               String oldaccunt     = JSPUtil.getParameter(request, "oldaccunt" ," ");     // 구계좌번호
               String oldaccuntcode = JSPUtil.getParameter(request, "oldaccuntcode" ," "); // 구계정과목코드
               String oldacmgb      = JSPUtil.getParameter(request, "oldacmgb" ," ");      // 구계좌관리구분

               rc = jado.InputProc("UP_KPI_O_S_후선보임권유계좌관리처리","2,"   +
                                                           basemonth          + "," + 
                                                           emnm               + "," +
                                                           jumcode            + "," +
                                                           accunt             + "," +
                                                           accuntcode         + "," +
                                                           acmgb              + "," +
                                                           oldemnm            + "," +
                                                           oldjumcode         + "," +
                                                           oldaccunt          + "," +
                                                           oldaccuntcode      + "," +
                                                           oldacmgb           + "," +
                                                           strEmpNo       );
               //변경종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();

               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                   +","  //2:rpop,1:rpdy,5:운영관리
                             +"후선보임권유계좌관리처리"            +"," //프로그램ID
                             +startTime                             +","  //시작시간
                             +endTime                               +","  //완료시간
                             +account.getHaengwon_no()              +","  //사용자ID
                             +account.getBranch_no()                +","  //점번호
                             +request.getRemoteAddr()               +","  //사용자IP
                             +"변경 : 기준년월="     +basemonth     + ";" //기준년월
                             +"후선보임직원번호="    +emnm          + ";" //후선보임직원번호
                             +"점번호="              +jumcode       + ";" //취급점번호
                             +"계좌번호="            +accunt        + ";" //계좌번호
                             +"계정과목코드="        +accuntcode    + ";" //계정과목코드
                             +"계좌관리구분="        +acmgb         + ";" //계좌관리구분
                             +"(구)후선보임직원번호="+oldemnm       + ";" //구후선보임직원번호
                             +"(구)점번호="          +oldjumcode    + ";" //구취급점번호
                             +"(구)계좌번호="        +oldaccunt     + ";" //구계좌번호
                             +"(구)계정과목코드="    +oldaccuntcode + ";" //구계정과목코드
                             +"(구)계좌관리구분="    +oldacmgb      + ";" //구계좌관리구분
                             );
           }else if (hidden_key.equals("3")) { /***** 삭제 *****/
               rc = jado.InputProc("UP_KPI_O_S_후선보임권유계좌관리처리","3,"   +
                                                           basemonth          + "," + 
                                                           emnm               + "," +
                                                           jumcode            + "," +
                                                           accunt             + "," +
                                                           accuntcode         + "," +
                                                           acmgb              + "," +
                                                           emnm               + "," +
                                                           jumcode            + "," +
                                                           accunt             + "," +
                                                           accuntcode         + "," +
                                                           acmgb              + "," +
                                                           strEmpNo       );
               //삭제종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();

               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                  +","  //2:rpop,1:rpdy,5:운영관리
                             +"후선보임권유계좌관리처리"           +","  //프로그램ID
                             +startTime                            +","  //시작시간
                             +endTime                              +","  //완료시간
                             +account.getHaengwon_no()             +","  //사용자ID
                             +account.getBranch_no()               +","  //점번호
                             +request.getRemoteAddr()              +","  //사용자IP
                             +"삭제 : 기준년월=" +basemonth        + ";" //기준년월
                             +"후선보임직원번호="+emnm             + ";" //후선보임직원번호
                             +"점번호="          +jumcode          + ";" //취급점번호
                             +"계좌번호="        +accunt           + ";" //계좌번호
                             +"계정과목코드="    +accuntcode       + ";" //계정과목코드
                             +"계좌관리구분="    +acmgb            + ";" //계좌관리구분
                             );

           }else if (hidden_key.equals("4")) { /***** 업로드 *****/
               String[] strStatus   = JSPUtil.getParameter(request, "v_sv_0",  0);  // 상태               
               String[] emnmA       = JSPUtil.getParameter(request, "v_sv_1",  0);  // 후선보임직원번호
               String[] jumcodeA    = JSPUtil.getParameter(request, "v_sv_3",  0);  // 취급점번호
               String[] accuntA     = JSPUtil.getParameter(request, "v_sv_5",  0);  // 계좌번호
               String[] accuntcodeA = JSPUtil.getParameter(request, "v_sv_6",  0);  // 계정과목코드
               String[] acmgbA      = JSPUtil.getParameter(request, "v_sv_7",  0);  // 계좌관리구분

               // 작업기준년월로 전체 테이타 삭제
               rc = jado.InputProc("UP_KPI_O_S_후선보임권유계좌관리처리","4,"  +
                                                           basemonth         + "," + 
                                                           emnmA[0]          + "," +
                                                           jumcodeA[0]       + "," +
                                                           accuntA[0]        + "," +
                                                           accuntcodeA[0]    + "," +
                                                           acmgbA[0]         + "," +
                                                           emnmA[0]          + "," +
                                                           jumcodeA[0]       + "," +
                                                           accuntA[0]        + "," +
                                                           accuntcodeA[0]    + "," +
                                                           acmgbA[0]         + "," +
                                                           strEmpNo       );
               
               String[]	tmpArrParam = new String[strStatus.length];
               String tmpQuery = "";
               
               for(int i=0; i<strStatus.length; i++) {

            	   /*
                   rc = jado.InputProc("UP_KPI_O_S_후선보임권유계좌관리처리","1,"  +
                                                               basemonth         + "," + 
                                                               emnmA[i]          + "," +
                                                               jumcodeA[i]       + "," +
                                                               accuntA[i]        + "," +
                                                               accuntcodeA[i]    + "," +
                                                               acmgbA[i]         + "," +
                                                               emnmA[i]          + "," +
                                                               jumcodeA[i]       + "," +
                                                               accuntA[i]        + "," +
                                                               accuntcodeA[i]    + "," +
                                                               acmgbA[i]         + "," +
                                                               strEmpNo       );
                                                               */
            	   
            	   String tmpParam = "";
               	
	       			tmpParam += "1,"  +
                            basemonth         + "," + 
                            emnmA[i]          + "," +
                            jumcodeA[i]       + "," +
                            accuntA[i]        + "," +
                            accuntcodeA[i]    + "," +
                            acmgbA[i]         + "," +
                            emnmA[i]          + "," +
                            jumcodeA[i]       + "," +
                            accuntA[i]        + "," +
                            accuntcodeA[i]    + "," +
                            acmgbA[i]         + "," +                                                                                                                                                                            
                            strEmpNo       ;    
	           		
	       			tmpArrParam[i] = tmpParam;
	       			
	       			if(i==0) tmpQuery = jado.InputProcS("UP_KPI_O_S_후선보임권유계좌관리처리", tmpParam);
               }
               
               rc = jado.InputProcN(tmpQuery, tmpArrParam);
               
                   //엑셀업로드 종료시간
                   endTime = tpms.framework.component.util.DateTime.getShortTimeString();

                   //web log 생성 :등록건수가 많아 timeout 예상되므로 등록자/일시 만 log로 남김
                   jado.InputProc("UP_KPI_C_S_WEBLOG"
                                 ,"5"                                      +","  //1:rpop,2:rphq,3:rprm,4:설문,5:운영관리
                                 +"후선보임권유계좌관리처리"               +","  //프로그램ID
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
                message = "등록한 후선보임직원번호=" + emnm + "점번호=" + jumcode + "계좌번호=" + accunt + "계정과목코드=" + accuntcode + " 정보를 확인하세요";
            }else if (hidden_key.equals("2")) { /***** 변경 *****/
                message = "변경한 후선보임직원번호=" + emnm + "점번호=" + jumcode + "계좌번호=" + accunt + "계정과목코드=" + accuntcode + " 정보를 확인하세요";
            }else if (hidden_key.equals("3")) { /***** 삭제 *****/
                message = "삭제한 후선보임직원번호=" + emnm + "점번호=" + jumcode + "계좌번호=" + accunt + "계정과목코드=" + accuntcode + " 정보를 확인하세요";
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
