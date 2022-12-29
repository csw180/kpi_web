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
 *  클래스 개요    : 개인별PI권유직원변경 조회 및 처리 <p>
 *  클래스 상세기능: 개인별PI권유직원변경 upload 처리 및 조회하여 JSP에 전달한다.<p>
 *  작성일 : 2008. 6.23<p>
 *  @version 1.0
 *  @author  조형석
 */
public class main_scr_4011_Control extends HTMLActionSupport
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

        String accunt     = JSPUtil.getParameter(request, "accunt" ," ");      // 계좌번호
        String accuntcode = JSPUtil.getParameter(request, "accuntcode" ," ");  // 계정과목코드
        String gusabun    = JSPUtil.getParameter(request, "gusabun" ," ");     // 권유자직원번호
        String wonjangch  = JSPUtil.getParameter(request, "wonjangch" ," ");   // 원장변경여부
        String ijagbn     = JSPUtil.getParameter(request, "ijagbn" ," ");      // 이자여부
        String pgagbn     = JSPUtil.getParameter(request, "pgagbn" ," ");      // 평가대상구분

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
               rs = jado.callProc("UP_KPI_O_S_개인별PI권유직원변경조회",basemonth);
               //조회종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();
               
               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                             +"UP_KPI_O_S_개인별PI권유직원변경조회"	+","  //프로그램ID
                             +startTime                           +","  //시작시간
                             +endTime                             +","  //완료시간
                             +account.getHaengwon_no()            +","  //사용자ID
                             +account.getBranch_no()              +","  //점번호
                             +request.getRemoteAddr()             +","  //사용자IP
                             +"조회 : 기준년월=" +basemonth       + ";" //기준년월
                             );
               
           }else if (hidden_key.equals("1")) { /***** 등록 *****/

               rc = jado.InputProc("UP_KPI_O_S_개인별PI권유직원변경처리","1,"   +
                                                           basemonth         + "," + 
                                                           accunt            + "," +
                                                           accuntcode        + "," +
                                                           gusabun           + "," +
                                                           wonjangch         + "," +
                                                           ijagbn            + "," +
                                                           pgagbn            + "," +
                                                           accunt            + "," +
                                                           accuntcode        + "," +
                                                           gusabun           + "," +
                                                           wonjangch         + "," +
                                                           ijagbn            + "," +
                                                           pgagbn            + "," +
                                                           strEmpNo       );
               //등록종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();

               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                  +","  //2:rpop,1:rpdy,5:운영관리
                             +"UP_KPI_O_S_개인별PI권유직원변경처리"  +"," //프로그램ID
                             +startTime                            +","  //시작시간
                             +endTime                              +","  //완료시간
                             +account.getHaengwon_no()             +","  //사용자ID
                             +account.getBranch_no()               +","  //점번호
                             +request.getRemoteAddr()              +","  //사용자IP
                             +"등록 : 기준년월=" +basemonth        + ";" //기준년월
                             +"계좌번호="        +accunt           + ";" //계좌번호             
                             +"계정과목코드="    +accuntcode       + ";" //계정과목코드
                             +"권유직원번호="    +gusabun          + ";" //권유자직원번호       
                             +"원장변경여부="    +wonjangch        + ";" //원장변경여부
                             +"이자여부="        +ijagbn           + ";" //이자여부             
                             +"평가대상구분="    +pgagbn           + ";" //평가대상구분
                             );
               rs = jado.callProc("UP_KPI_O_S_개인별PI권유직원변경조회",basemonth);
           }else if (hidden_key.equals("2")) { /***** 변경 *****/

               String oldaccunt     = JSPUtil.getParameter(request, "oldaccunt" ," ");      // 구계좌번호
               String oldaccuntcode = JSPUtil.getParameter(request, "oldaccuntcode" ," ");  // 구계정과목코드
               String oldgusabun    = JSPUtil.getParameter(request, "oldgusabun" ," ");     // 구권유자직원번호
               String oldwonjangch  = JSPUtil.getParameter(request, "oldwonjangch" ," ");   // 구원장변경여부
               String oldijagbn     = JSPUtil.getParameter(request, "oldijagbn" ," ");      // 구이자여부
               String oldpgagbn     = JSPUtil.getParameter(request, "oldpgagbn" ," ");      // 평가대상구분

               rc = jado.InputProc("UP_KPI_O_S_개인별PI권유직원변경처리","2,"   +
                                                           basemonth         + "," + 
                                                           accunt            + "," +
                                                           accuntcode        + "," +
                                                           gusabun           + "," +
                                                           wonjangch         + "," +
                                                           ijagbn            + "," +
                                                           pgagbn            + "," +
                                                           oldaccunt         + "," +
                                                           oldaccuntcode     + "," +
                                                           oldgusabun        + "," +
                                                           oldwonjangch      + "," +
                                                           oldijagbn         + "," +
                                                           oldpgagbn         + "," +
                                                           strEmpNo       );
               //변경종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();

               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                  +","  //2:rpop,1:rpdy,5:운영관리
                             +"UP_KPI_O_S_개인별PI권유직원변경처리"  +"," //프로그램ID
                             +startTime                            +","  //시작시간
                             +endTime                              +","  //완료시간
                             +account.getHaengwon_no()             +","  //사용자ID
                             +account.getBranch_no()               +","  //점번호
                             +request.getRemoteAddr()              +","  //사용자IP
                             +"변경 : 기준년월="   +basemonth      + ";" //기준년월
                             +"계좌번호="          +accunt         + ";" //계좌번호             
                             +"계정과목코드="      +accuntcode     + ";" //계정과목코드
                             +"권유직원번호="      +gusabun        + ";" //권유자직원번호       
                             +"원장변경여부="      +wonjangch      + ";" //원장변경여부
                             +"이자여부="          +ijagbn         + ";" //이자여부             
                             +"평가대상구분="      +pgagbn         + ";" //평가대상구분             
                             +"(구)계좌번호="      +oldaccunt      + ";" //구계좌번호             
                             +"(구)계정과목코드="  +oldaccuntcode  + ";" //구계정과목코드
                             +"(구)권유직원번호="  +oldgusabun     + ";" //구권유자직원번호       
                             +"(구)원장변경여부="  +oldwonjangch   + ";" //구원장변경여부
                             +"(구)이자여부="      +oldijagbn      + ";" //구이자여부             
                             +"(구)평가대상구분="  +oldpgagbn      + ";" //구평가대상구분
                             );
               rs = jado.callProc("UP_KPI_O_S_개인별PI권유직원변경조회",basemonth);               
           }else if (hidden_key.equals("3")) { /***** 삭제 *****/
               rc = jado.InputProc("UP_KPI_O_S_개인별PI권유직원변경처리","3,"   +
                                                           basemonth         + "," + 
                                                           accunt            + "," +
                                                           accuntcode        + "," +
                                                           gusabun           + "," +
                                                           wonjangch         + "," +
                                                           ijagbn            + "," +
                                                           pgagbn            + "," +
                                                           accunt            + "," +
                                                           accuntcode        + "," +
                                                           gusabun           + "," +
                                                           wonjangch         + "," +
                                                           ijagbn            + "," +
                                                           pgagbn            + "," +
                                                           strEmpNo       );
               //삭제종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();

               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                  +","  //2:rpop,1:rpdy,5:운영관리
                             +"UP_KPI_O_S_개인별PI권유직원변경처리"  +"," //프로그램ID
                             +startTime                            +","  //시작시간
                             +endTime                              +","  //완료시간
                             +account.getHaengwon_no()             +","  //사용자ID
                             +account.getBranch_no()               +","  //점번호
                             +request.getRemoteAddr()              +","  //사용자IP
                             +"삭제 : 기준년월=" +basemonth        + ";" //기준년월
                             +"계좌번호="        +accunt           + ";" //계좌번호             
                             +"계정과목코드="    +accuntcode       + ";" //계정과목코드
                             +"권유직원번호="    +gusabun          + ";" //권유자직원번호       
                             +"원장변경여부="    +wonjangch        + ";" //원장변경여부
                             +"이자여부="        +ijagbn           + ";" //이자여부             
                             +"평가대상구분="    +pgagbn           + ";" //평가대상구분             
                             );
               rs = jado.callProc("UP_KPI_O_S_개인별PI권유직원변경조회",basemonth);
           }else if (hidden_key.equals("4")) { /***** 업로드 *****/
               String[] strStatus     = JSPUtil.getParameter(request, "v_sv_0",  0);  // 상태               
               String[] oldaccunt     = JSPUtil.getParameter(request, "v_sv_1",  0);  // 구계좌번호              
               String[] oldaccuntcode = JSPUtil.getParameter(request, "v_sv_2",  0);  // 구계정과목코드              
               String[] oldgusabun    = JSPUtil.getParameter(request, "v_sv_3",  0);  // 구권유자직원번호        
               String[] oldwonjangch  = JSPUtil.getParameter(request, "v_sv_4",  0);  // 구시작월                   
               String[] oldijagbn     = JSPUtil.getParameter(request, "v_sv_5",  0);  // 구원장변경여부
               String[] oldpgagbn     = JSPUtil.getParameter(request, "v_sv_6",  0);  // 구평가대상구분

               // 작업기준년월로 전체 테이타 삭제
               rc = jado.InputProc("UP_KPI_O_S_개인별PI권유직원변경처리","4,"   +
                                                           basemonth         + "," + 
                                                           oldaccunt[0]      + "," +
                                                           oldaccuntcode[0]  + "," +
                                                           oldgusabun[0]     + "," +
                                                           oldwonjangch[0]   + "," +
                                                           oldijagbn[0]      + "," +
                                                           oldpgagbn[0]      + "," +
                                                           oldaccunt[0]      + "," +
                                                           oldaccuntcode[0]  + "," +
                                                           oldgusabun[0]     + "," +
                                                           oldwonjangch[0]   + "," +
                                                           oldijagbn[0]      + "," +
                                                           oldpgagbn[0]      + "," +
                                                           strEmpNo       );
               for(int i=0; i<strStatus.length; i++) {

                   rc = jado.InputProc("UP_KPI_O_S_개인별PI권유직원변경처리","1,"   +
                                                               basemonth         + "," + 
                                                               oldaccunt[i]      + "," +
                                                               oldaccuntcode[i]  + "," +
                                                               oldgusabun[i]     + "," +
                                                               oldwonjangch[i]   + "," +
                                                               oldijagbn[i]      + "," +
                                                               oldpgagbn[i]      + "," +
                                                               oldaccunt[i]      + "," +
                                                               oldaccuntcode[i]  + "," +
                                                               oldgusabun[i]     + "," +
                                                               oldwonjangch[i]   + "," +
                                                               oldijagbn[i]      + "," +
                                                               oldpgagbn[i]      + "," +
                                                               strEmpNo       );
               }
                   //엑셀업로드 종료시간
                   endTime = tpms.framework.component.util.DateTime.getShortTimeString();

                   //web log 생성 :등록건수가 많아 timeout 예상되므로 등록자/일시 만 log로 남김
                   jado.InputProc("UP_KPI_C_S_WEBLOG"
                                 ,"5"                                      +","  //1:rpop,2:rphq,3:rprm,4:설문,5:운영관리
                                 +"UP_KPI_O_S_개인별PI권유직원변경처리"      +","  //프로그램ID
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
                message = "등록한 계좌번호=" + accunt + "계정과목코드=" + accuntcode + "권유자직원번호=" + gusabun + " 정보를 확인하세요";
            }else if (hidden_key.equals("2")) { /***** 변경 *****/
                message = "변경한 계좌번호=" + accunt + "계정과목코드=" + accuntcode + "권유자직원번호=" + gusabun + " 정보를 확인하세요";
            }else if (hidden_key.equals("3")) { /***** 삭제 *****/
                message = "삭제한 계좌번호=" + accunt + "계정과목코드=" + accuntcode + "권유자직원번호=" + gusabun + " 정보를 확인하세요";
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
