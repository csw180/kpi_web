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
 *  클래스 개요     : 부지점장배점  <p>
 *  클래스 상세기능 : 부지점장배점 정보를 읽어서 JSP에 전달한다.<p>
 *  작성일 : 2014.07.21<p>
 *  @version 1.0
 *  @author  조형석
 */
public class main_scr_4531_Control extends HTMLActionSupport   
{
    /* HttpRequst의 정보를 영업점목표 조회 데이타모델로 파싱하여 반환한다. */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {
        HttpSession session   = request.getSession(false);
        ServletContext context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        String hidden_key = JSPUtil.getParameter(request,"hidden_key"," ");         // 조회,등록,변경,삭제 구분자
        String basemonth  = JSPUtil.getParameter(request,"basemonth"," ");
        String jumcode    = JSPUtil.getParameter(request,"jumcode","0");

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
                rs = jado.callProc("UP_KPI_O_S_부지점장배점조회",basemonth+","+jumcode);
                //조회종료시간
                endTime = tpms.framework.component.util.DateTime.getShortTimeString();
                
                //web log 생성 
                jado.InputProc("UP_KPI_C_S_WEBLOG"
                              ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                              +"부지점장배점조회"                  +","  //프로그램ID
                              +startTime                           +","  //시작시간
                              +endTime                             +","  //완료시간
                              +account.getHaengwon_no()            +","  //사용자ID
                              +account.getBranch_no()              +","  //점번호
                              +request.getRemoteAddr()             +","  //사용자IP
                              +"조회 : 기준년월=" +basemonth       + ";" //기준년월
                              +"점번호="          +jumcode         + ";" //점번호
                              );
                 
            }else { /***** 등록,변경,삭제 *****/
                if (hidden_key.equals("1")){
                    rc = jado.InputProc("UP_KPI_O_S_부지점장배점삭제", basemonth);
                    //삭제종료시간
                    endTime = tpms.framework.component.util.DateTime.getShortTimeString();
                    //web log 생성 
                    jado.InputProc("UP_KPI_C_S_WEBLOG"
                                  ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                                  +"부지점장배점삭제"                  +","  //프로그램ID
                                  +startTime                           +","  //시작시간
                                  +endTime                             +","  //완료시간
                                  +account.getHaengwon_no()            +","  //사용자ID
                                  +account.getBranch_no()              +","  //점번호
                                  +request.getRemoteAddr()             +","  //사용자IP
                                  +"삭제 : 기준년월=" +basemonth       + ";" //기준년월
                                  );
                }

                String sStatus[] = JSPUtil.getParameter(request,"v_status"  ,0);   //상태
                String v_sv_1[]  = JSPUtil.getParameter(request,"v_sv_1"    ,0);   //작업기준년월
                String v_sv_2[]  = JSPUtil.getParameter(request,"v_sv_2"    ,0);   //직원번호
                String v_sv_3[]  = JSPUtil.getParameter(request,"v_sv_3"    ,0);   //점번호
                String v_sv_4[]  = JSPUtil.getParameter(request,"v_sv_4"    ,0);   //KPI코드
                String v_sv_5[]  = JSPUtil.getParameter(request,"v_sv_5"    ,0);   //배점
                String  strEmpNo     = account.getHaengwon_no();                   //직원번호
                for(int i = 0; i < sStatus.length; i++) {
                rc = jado.InputProc("UP_KPI_O_S_부지점장배점처리", hidden_key + "," +
                                                                v_sv_1[i]   + "," + 
                                                                v_sv_2[i]   + "," + 
                                                                v_sv_3[i]   + "," + 
                                                                v_sv_4[i]   + "," + 
                                                                v_sv_5[i]   + "," + 
                                                                strEmpNo );
                // Error message 값 SET 위한 index -------------------------->
                  idx++;
                  // ----------------------------------------------------------/
                }
                  //등록종료시간
                  endTime = tpms.framework.component.util.DateTime.getShortTimeString();
                  
                  //web log 생성 :등록건수가 많아 timeout 예상되므로 등록자/일시 만 log로 남김
                  jado.InputProc("UP_KPI_C_S_WEBLOG"
                                ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                                +"부지점장배점처리"                  +","  //프로그램ID
                                +startTime                           +","  //시작시간
                                +endTime                             +","  //완료시간
                                +account.getHaengwon_no()            +","  //사용자ID
                                +account.getBranch_no()              +","  //점번호
                                +request.getRemoteAddr()             +","  //사용자IP
                                +"등록 : 기준년월=" +basemonth       + ";" //기준년월
                                );
            }
            log.debug(" HTMLAction success!");
        }catch(Exception exe)
        { 
            log.error("DAO 생성 오류 "+exe.toString(),exe); 
            // Error message 생성 --------------------------------------------->
            if (!hidden_key.equals("9")){                
              String v_sv_2[]  = JSPUtil.getParameter(request,"v_sv_2"   ,0);
              String v_sv_3[]  = JSPUtil.getParameter(request,"v_sv_3"   ,0);
              String v_sv_4[]  = JSPUtil.getParameter(request,"v_sv_4"   ,0);
              message = "[" + (idx+1) + " 행] : " 
                      + "직원번호="   + v_sv_2[idx] 
                      + "점번호="     + v_sv_3[idx] 
                      + "KPI코드="    + v_sv_4[idx] 
                      + " 오류\n\nExcel 정보를 확인하세요.";
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
