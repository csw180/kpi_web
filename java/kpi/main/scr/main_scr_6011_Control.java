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
 *  클래스 개요     : SPC수탁업무수수료 관리  <p>
 *  클래스 상세기능 : SPC수탁업무수수료 읽어서 JSP에 전달한다.<p>
 *  작성일 : 2011.01.<p>
 *  @version 1.0
 *  @author  하진영
 */
public class main_scr_6011_Control extends HTMLActionSupport
{
      /**
       * HttpRequst의 정보를 SPC수탁업무수수료 조회 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {

        HttpSession session   = request.getSession(false);
        ServletContext context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        String hidden_key = JSPUtil.getParameter(request, "hidden_key"," ");         // 조회,등록,변경,삭제 구분자
        String basemonth  = JSPUtil.getParameter(request,"basemonth"," ");

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
                rs = jado.callProc("UP_KPI_O_S_SPC수탁업무수수료조회", basemonth);
               //조회종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();
               
               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                             +"UP_KPI_O_S_SPC수탁업무수수료조회"	  +","  //프로그램ID
                             +startTime                           +","  //시작시간
                             +endTime                             +","  //완료시간
                             +account.getHaengwon_no()            +","  //사용자ID
                             +account.getBranch_no()              +","  //점번호
                             +request.getRemoteAddr()             +","  //사용자IP
                             +"조회 : 기준년월=" +basemonth       + ";" //기준년월
                             );
                
           }else{ /***** 등록,변경,삭제 *****/
                rc = jado.InputProc("UP_KPI_O_S_SPC수탁업무수수료처리","4," + basemonth + ",0,0,0,0,0,0,0,0,0,0" );
                //삭제 종료시간
                endTime = tpms.framework.component.util.DateTime.getShortTimeString();
                //web log 생성 
                jado.InputProc("UP_KPI_C_S_WEBLOG"
                              ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                              +"UP_KPI_O_S_SPC수탁업무수수료처리"	   +","  //프로그램ID
                              +startTime                           +","  //시작시간
                              +endTime                             +","  //완료시간
                              +account.getHaengwon_no()            +","  //사용자ID
                              +account.getBranch_no()              +","  //점번호
                              +request.getRemoteAddr()             +","  //사용자IP
                              +"삭제 : 기준년월=" +basemonth       + ";" //기준년월
                              );

                //input data
                String sStatus[] = JSPUtil.getParameter(request,"v_status" ,0);
                String v_sv_1[]  = JSPUtil.getParameter(request,"v_sv_1"   ,0);
                String v_sv_2[]  = JSPUtil.getParameter(request,"v_sv_2"   ,0);
                String v_sv_3[]  = JSPUtil.getParameter(request,"v_sv_3"   ,0);
                String v_sv_4[]  = JSPUtil.getParameter(request,"v_sv_4"   ,0);
                String v_sv_5[]  = JSPUtil.getParameter(request,"v_sv_5"   ,0);
                String v_sv_6[]  = JSPUtil.getParameter(request,"v_sv_6"   ,0);
                String v_sv_7[]  = JSPUtil.getParameter(request,"v_sv_7"   ,0);
                String v_sv_8[]  = JSPUtil.getParameter(request,"v_sv_8"   ,0);
                String v_sv_9[]  = JSPUtil.getParameter(request,"v_sv_9"   ,0);
                String v_sv_10[] = JSPUtil.getParameter(request,"v_sv_10"  ,0);
                String strEmpNo  = account.getHaengwon_no();

                for(int i = 0; i < sStatus.length; i++) {
                  rc = jado.InputProc("UP_KPI_O_S_SPC수탁업무수수료처리","1," +
                                                           v_sv_1[i]  + "," +
                                                           v_sv_2[i]  + "," +
                                                           v_sv_3[i]  + "," +
                                                           v_sv_4[i]  + "," +
                                                           v_sv_5[i]  + "," +
                                                           v_sv_6[i]  + "," +
                                                           v_sv_7[i]  + "," +
                                                           v_sv_8[i]  + "," +
                                                           v_sv_9[i]  + "," +
                                                           v_sv_10[i] + "," +
                                                           strEmpNo       
                                                                  );

                  //등록 종료시간
                  endTime = tpms.framework.component.util.DateTime.getShortTimeString();
                  //web log 생성 
                  jado.InputProc("UP_KPI_C_S_WEBLOG"
                                ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                                +"UP_KPI_O_S_SPC수탁업무수수료처리"	   +","  //프로그램ID
                                +startTime                           +","  //시작시간
                                +endTime                             +","  //완료시간
                                +account.getHaengwon_no()            +","  //사용자ID
                                +account.getBranch_no()              +","  //점번호
                                +request.getRemoteAddr()             +","  //사용자IP
                                +"등록 : 기준년월="  +basemonth              + ";" //기준년월
                                +"점번호="           +v_sv_2[i]              + ";" //점번호
                                +"계정과목코드="     +v_sv_3[i]              + ";" //계정과목코드
                                +"고객번호="         +v_sv_5[i]              + ";" //고객번호
                                +"권유수당="         +v_sv_6[i]              + ";" //권유수당
                                +"권유직원번호="     +v_sv_7[i]              + ";" //권유직원번호
                                +"금액="             +v_sv_8[i]              + ";" //금액
                                +"비율="             +v_sv_9[i]              + ";" //영업점평가차감비율
                                );
                                                                  
                  // Error message 값 SET 위한 index -------------------------->
                  idx++;
                  // ----------------------------------------------------------/
                }
            }
            log.debug(" HTMLAction success!");
        }catch(Exception exe)
        {
            log.error("DAO 생성 오류 "+exe.toString(),exe);

            // Error message 생성 --------------------------------------------->
            if (!hidden_key.equals("9")){                
              String v_sv_1[]  = JSPUtil.getParameter(request,"v_sv_1"   ,0);
              String v_sv_2[]  = JSPUtil.getParameter(request,"v_sv_2"   ,0);
              String v_sv_3[]  = JSPUtil.getParameter(request,"v_sv_3"   ,0);
              String v_sv_4[]  = JSPUtil.getParameter(request,"v_sv_4"   ,0);
              String v_sv_5[]  = JSPUtil.getParameter(request,"v_sv_5"   ,0);
              message = "[" + (idx+1) + " 행] : " 
                      + "작업기준년월=" + v_sv_1[idx] 
                      + ",점번호="      + v_sv_2[idx] 
                      + ",계정코드="    + v_sv_3[idx] 
                      + ",SPC명="       + v_sv_4[idx] 
                      + ",실명번호="    + v_sv_5[idx] 
                      +" 오류\n\nExcel 정보를 확인하세요.";              
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
