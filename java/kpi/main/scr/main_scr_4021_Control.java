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
 *  클래스 개요    : 본부주관마케팅실적관리 조회 및 처리 <p>
 *  클래스 상세기능: 본부주관마케팅실적관리 upload 처리 및 조회하여 JSP에 전달한다.<p>
 *  작성일 : 2009. 6. 8<p>
 *  @version 1.0
 *  @author  조형석
 */
public class main_scr_4021_Control extends HTMLActionSupport
{
      /**
       * HttpRequst의 정보를 본부주관마케팅실적관리 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {

        HttpSession session   = request.getSession(false);
        ServletContext context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        String strEmpNo   = account.getHaengwon_no();

        String hidden_key = JSPUtil.getParameter(request, "hidden_key"," ");   // 조회,등록,변경,삭제 구분자
        String basemonth  = JSPUtil.getParameter(request, "basemonth" ," ");

        String costomerno = JSPUtil.getParameter(request, "costomerno" ," ");  // 고객번호
        String accunt     = JSPUtil.getParameter(request, "accunt" ," ");      // 계좌번호
        String accuntcode = JSPUtil.getParameter(request, "accuntcode" ," ");  // 계정과목코드
        String accdate    = JSPUtil.getParameter(request, "accdate" ," ");     // 계좌신규일
        String maketjum   = JSPUtil.getParameter(request, "maketjum" ," ");    // 마케팅주관부서

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
               rs = jado.callProc("UP_KPI_O_S_본부주관마케팅실적관리조회",basemonth);
               //조회종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();
               
               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                   +","  //2:rpop,1:rpdy,5:운영관리   
                             +"UP_KPI_O_S_본부주관마케팅실적관리조회"	+","  //프로그램ID
                             +startTime                             +","  //시작시간
                             +endTime                               +","  //완료시간
                             +account.getHaengwon_no()              +","  //사용자ID
                             +account.getBranch_no()                +","  //점번호
                             +request.getRemoteAddr()               +","  //사용자IP
                             +"조회 : 기준년월=" +basemonth         + ";" //기준년월
                             );
               
           }else if (hidden_key.equals("1")) { /***** 등록 *****/

               rc = jado.InputProc("UP_KPI_O_S_본부주관마케팅실적관리처리","1,"   +
                                                           basemonth         + "," + 
                                                           costomerno        + "," +
                                                           ("".equals(accunt) ? " " : accunt)            + "," +
                                                           ("".equals(accuntcode) ? " " : accuntcode)    + "," +
                                                           accdate           + "," +
                                                           maketjum          + "," +
                                                           costomerno        + "," +
                                                           accunt            + "," +
                                                           accuntcode        + "," +
                                                           accdate           + "," +
                                                           maketjum          + "," +
                                                           strEmpNo       );
               //등록종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();

               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                    +","  //2:rpop,1:rpdy,5:운영관리   
                             +"UP_KPI_O_S_본부주관마케팅실적관리처리"  +","  //프로그램ID
                             +startTime                              +","  //시작시간
                             +endTime                                +","  //완료시간
                             +account.getHaengwon_no()               +","  //사용자ID
                             +account.getBranch_no()                 +","  //점번호
                             +request.getRemoteAddr()                +","  //사용자IP
                             +"등록 : 기준년월=" +basemonth          + ";" //기준년월
                             +"고객번호="        +costomerno         + ";" //고객번호
                             +"계좌번호="        +accunt             + ";" //계좌번호             
                             +"계정과목코드="    +accuntcode         + ";" //계정과목코드
                             +"계좌신규일="      +accdate            + ";" //계좌신규일       
                             +"마케팅주관부서="  +maketjum           + ";" //마케팅주관부서
                             );
               rs = jado.callProc("UP_KPI_O_S_본부주관마케팅실적관리조회",basemonth);
           }else if (hidden_key.equals("2")) { /***** 변경 *****/

               String oldcostomerno = JSPUtil.getParameter(request, "oldcostomerno" ," ");  // 구고객번호
               String oldaccunt     = JSPUtil.getParameter(request, "oldaccunt" ," ");      // 구계좌번호
               String oldaccuntcode = JSPUtil.getParameter(request, "oldaccuntcode" ," ");  // 구계정과목코드
               String oldaccdate    = JSPUtil.getParameter(request, "oldaccdate" ," ");     // 구계좌신규일
               String oldmaketjum   = JSPUtil.getParameter(request, "oldmaketjum" ," ");    // 구마케팅주관부서

               rc = jado.InputProc("UP_KPI_O_S_본부주관마케팅실적관리처리","2,"   +
                                                           basemonth         + "," + 
                                                           costomerno        + "," +
                                                           ("".equals(accunt) ? " " : accunt)            + "," +
                                                           ("".equals(accuntcode) ? " " : accuntcode)    + "," +
                                                           accdate           + "," +
                                                           maketjum          + "," +
                                                           oldcostomerno     + "," +
                                                           oldaccunt         + "," +
                                                           oldaccuntcode     + "," +
                                                           oldaccdate        + "," +
                                                           oldmaketjum       + "," +
                                                           strEmpNo       );
               //변경종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();

               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                    +","  //2:rpop,1:rpdy,5:운영관리   
                             +"UP_KPI_O_S_본부주관마케팅실적관리처리"  +","  //프로그램ID
                             +startTime                              +","  //시작시간
                             +endTime                                +","  //완료시간
                             +account.getHaengwon_no()               +","  //사용자ID
                             +account.getBranch_no()                 +","  //점번호
                             +request.getRemoteAddr()                +","  //사용자IP
                             +"변경 : 기준년월="    +basemonth       + ";" //기준년월
                             +"고객번호="           +costomerno      + ";" //고객번호
                             +"계좌번호="           +accunt          + ";" //계좌번호             
                             +"계정과목코드="       +accuntcode      + ";" //계정과목코드
                             +"계좌신규일="         +accdate         + ";" //계좌신규일       
                             +"마케팅주관부서="     +maketjum        + ";" //마케팅주관부서
                             +"(구)고객번호="       +oldcostomerno   + ";" //구고객번호
                             +"(구)계좌번호="       +oldaccunt       + ";" //구계좌번호             
                             +"(구)계정과목코드="   +oldaccuntcode   + ";" //구계정과목코드
                             +"(구)계좌신규일="     +oldaccdate      + ";" //구계좌신규일       
                             +"(구)마케팅주관부서=" +oldmaketjum     + ";" //구마케팅주관부서
                             );
               rs = jado.callProc("UP_KPI_O_S_본부주관마케팅실적관리조회",basemonth);               
           }else if (hidden_key.equals("3")) { /***** 삭제 *****/
               rc = jado.InputProc("UP_KPI_O_S_본부주관마케팅실적관리처리","3,"   +
                                                           basemonth         + "," + 
                                                           costomerno        + "," +
                                                           accunt            + "," +
                                                           accuntcode        + "," +
                                                           accdate           + "," +
                                                           maketjum          + "," +
                                                           costomerno        + "," +
                                                           accunt            + "," +
                                                           accuntcode        + "," +
                                                           accdate           + "," +
                                                           maketjum          + "," +
                                                           strEmpNo       );
               //삭제종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();

               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                    +","  //2:rpop,1:rpdy,5:운영관리   
                             +"UP_KPI_O_S_본부주관마케팅실적관리처리"  +","  //프로그램ID
                             +startTime                              +","  //시작시간
                             +endTime                                +","  //완료시간
                             +account.getHaengwon_no()               +","  //사용자ID
                             +account.getBranch_no()                 +","  //점번호
                             +request.getRemoteAddr()                +","  //사용자IP
                             +"삭제 : 기준년월=" +basemonth          + ";" //기준년월
                             +"고객번호="        +costomerno         + ";" //고객번호
                             +"계좌번호="        +accunt             + ";" //계좌번호             
                             +"계정과목코드="    +accuntcode         + ";" //계정과목코드
                             +"계좌신규일="      +accdate            + ";" //계좌신규일       
                             +"마케팅주관부서="  +maketjum           + ";" //마케팅주관부서
                             );
               rs = jado.callProc("UP_KPI_O_S_본부주관마케팅실적관리조회",basemonth);
           }else if (hidden_key.equals("4")) { /***** 업로드 *****/
               String[] strStatus     = JSPUtil.getParameter(request, "v_sv_0",  0);  // 상태               
               String[] oldcostomerno = JSPUtil.getParameter(request, "v_sv_2",  0);  // 구고객번호          
               String[] oldaccunt     = JSPUtil.getParameter(request, "v_sv_3",  0);  // 구계좌번호            
               String[] oldaccuntcode = JSPUtil.getParameter(request, "v_sv_4",  0);  // 구계정과목코드              
               String[] oldaccdate    = JSPUtil.getParameter(request, "v_sv_6",  0);  // 구계좌신규일   
               String[] oldmaketjum   = JSPUtil.getParameter(request, "v_sv_7",  0);  // 구마케팅주관부서              

               // 작업기준년월로 전체 테이타 삭제
               rc = jado.InputProc("UP_KPI_O_S_본부주관마케팅실적관리처리","4,"   +
                                                           basemonth         + "," + 
                                                           oldcostomerno[0]  + "," +
                                                           oldaccunt[0]      + "," +
                                                           oldaccuntcode[0]  + "," +
                                                           oldaccdate[0]     + "," +
                                                           oldmaketjum[0]    + "," +
                                                           oldcostomerno[0]  + "," +
                                                           oldaccunt[0]      + "," +
                                                           oldaccuntcode[0]  + "," +
                                                           oldaccdate[0]     + "," +
                                                           oldmaketjum[0]    + "," +
                                                           strEmpNo       );
               for(int i=0; i<strStatus.length; i++) {

                   rc = jado.InputProc("UP_KPI_O_S_본부주관마케팅실적관리처리","1,"   +
                                                             basemonth         + "," + 
                                                             oldcostomerno[i]  + "," +
                                                             ("".equals(oldaccunt[i]) ? " " : oldaccunt[i])       + "," +
                                                             ("".equals(oldaccuntcode[i]) ? " " : oldaccuntcode[i])       + "," +
                                                             oldaccdate[i]     + "," +
                                                             oldmaketjum[i]    + "," +
                                                             oldcostomerno[i]  + "," +
                                                             oldaccunt[i]      + "," +
                                                             oldaccuntcode[i]  + "," +
                                                             oldaccdate[i]     + "," +
                                                             oldmaketjum[i]    + "," +
                                                             strEmpNo       );
               }
                   //엑셀업로드 종료시간
                   endTime = tpms.framework.component.util.DateTime.getShortTimeString();

                   //web log 생성 :등록건수가 많아 timeout 예상되므로 등록자/일시 만 log로 남김
                   jado.InputProc("UP_KPI_C_S_WEBLOG"
                                 ,"5"                                    +","  //2:rpop,1:rpdy,5:운영관리   
                                 +"UP_KPI_O_S_본부주관마케팅실적관리처리"  +","  //프로그램ID
                                 +startTime                              +","  //시작시간
                                 +endTime                                +","  //완료시간
                                 +account.getHaengwon_no()               +","  //사용자ID
                                 +account.getBranch_no()                 +","  //점번호
                                 +request.getRemoteAddr()                +","  //사용자IP
                                 +"엑셀업로드 :기준년월=" +basemonth     + ";" //기준년월
                                 );

           }
           log.debug(" HTMLAction success!");
        }catch(Exception exe)
        {
            log.error("DAO 생성 오류 "+exe.toString(),exe);
            
            // Error message 생성 --------------------------------------------->
            if (hidden_key.equals("1")) { /***** 등록 *****/
                message = "등록한 고객번호=" + costomerno + "계좌번호=" + accunt + "계정과목코드=" + accuntcode + " 정보를 확인하세요";
            }else if (hidden_key.equals("2")) { /***** 변경 *****/
                message = "변경한 고객번호=" + costomerno + "계좌번호=" + accunt + "계정과목코드=" + accuntcode + " 정보를 확인하세요";
            }else if (hidden_key.equals("3")) { /***** 삭제 *****/
                message = "삭제한 고객번호=" + costomerno + "계좌번호=" + accunt + "계정과목코드=" + accuntcode + " 정보를 확인하세요";
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
