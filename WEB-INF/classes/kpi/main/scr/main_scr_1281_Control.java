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
 *  클래스 개요     : 외환전문역마케팅계좌 승인  <p>
 *  클래스 상세기능 : 외환전문역마케팅등록 계좌를 성과담당자가 승인한다.<p>
 *  작성일 : 2010.05.18<p>
 *  @version 1.0
 *  @author  하진영
 */
public class main_scr_1281_Control extends HTMLActionSupport   
{
      /**
       * HttpRequst의 정보를 외환전문역마케팅계좌 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {

        HttpSession session   = request.getSession(false);
        ServletContext context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        String hidden_key = JSPUtil.getParameter(request, "hidden_key"," ");         // 조회,등록,변경,삭제 구분자
        String basemonth  = JSPUtil.getParameter(request, "basemonth"," ");
        
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
           if (hidden_key.equals("9")){  /***** 조회 *****/
                //조회시작시간
                startTime = tpms.framework.component.util.DateTime.getShortTimeString();
           	
                rs = jado.callProc("UP_KPI_O_S_외환전문역마케팅계좌");
                //조회종료시간
                endTime = tpms.framework.component.util.DateTime.getShortTimeString();
                //web log 생성 
                jado.InputProc("UP_KPI_C_S_WEBLOG"
                              ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                              +"UP_KPI_O_S_외환전문역마케팅계좌"	   +","  //프로그램ID
                              +startTime                           +","  //시작시간
                              +endTime                             +","  //완료시간
                              +account.getHaengwon_no()            +","  //사용자ID
                              +account.getBranch_no()              +","  //점번호
                              +request.getRemoteAddr()             +","  //사용자IP
                              +"조회"
                              );

            }else{ /***** 등록,변경,삭제 *****/
                String sStatus[] = JSPUtil.getParameter(request,"v_status"  ,0);   //상태
                String v_sv_1[]  = JSPUtil.getParameter(request,"v_sv_1"    ,0);   //계좌관리점
                String v_sv_3[]  = JSPUtil.getParameter(request,"v_sv_3"    ,0);   //계정과목코드
                String v_sv_5[]  = JSPUtil.getParameter(request,"v_sv_5"    ,0);   //계좌번호
                String v_sv_8[]  = JSPUtil.getParameter(request,"v_sv_8"    ,0);   //등록부서구분
                String v_sv_10[] = JSPUtil.getParameter(request,"v_sv_10"   ,0);   //승인여부
                String strEmpNo  = account.getHaengwon_no();  // 직원번호
                for(int i = 0; i < sStatus.length; i++) {
                //외환전문역마케팅계좌 승인  시작시간
                startTime = tpms.framework.component.util.DateTime.getShortTimeString();                	
                	
                rc = jado.InputProc("UP_KPI_O_S_외환전문역마케팅계좌승인", v_sv_1[i]  + "," + //계좌관리점 
                                                                         v_sv_3[i]  + "," + //계정과목코드
                                                                         v_sv_5[i]  + "," + //계좌번호
                                                                         v_sv_10[i] + "," + //승인여부
                                                                         v_sv_8[i]  + "," + //등록부서구분
                                                                         strEmpNo           //직원번호       
                                                                       );
                //등록,변경,삭제 종료시간
                endTime = tpms.framework.component.util.DateTime.getShortTimeString();
                  
                //web log 생성 
                jado.InputProc("UP_KPI_C_S_WEBLOG"
                              ,"5"                                   +","  //2:rpop,1:rpdy,5:운영관리
                              +"UP_KPI_O_S_외환전문역마케팅계좌승인"   +"," //프로그램ID
                              +startTime                             +","  //시작시간
                              +endTime                               +","  //완료시간
                              +account.getHaengwon_no()              +","  //사용자ID
                              +account.getBranch_no()                +","  //점번호
                              +request.getRemoteAddr()               +","  //사용자IP      
                              +"계좌관리점번호=" +v_sv_1[i]       + ";"  //점번호
                              +"계정과목코드="   +v_sv_3[i]       + ";"  //계정과목코드
                              +"계좌번호="       +v_sv_5[i]       + ";"  //계좌번호
                              +"승인여부="       +v_sv_10[i]      + ";"  //승인여부
                              +"등록부서구분="   +v_sv_8[i]       + ";"  //등록부서구분
                              );
                                                                       
                }
            }
            log.debug(" HTMLAction success!");
        }catch(Exception exe)
        { 
            log.error("DAO 생성 오류 "+exe.toString(),exe); 
            // Error message 생성 --------------------------------------------->
            if (hidden_key.equals("9")) { /***** 조회 *****/
                message = "외환전문역마케팅계좌 조회 정보를 확인하세요";
            }else   /***** 승인 *****/
                message = "외환전문역마케팅계좌 승인 정보를 확인하세요";
            // ----------------------------------------------------------------/                        
            ext    =    exe;
        }
/****************************변경************************/
        main_scr_EventResponse eventResponse    =        new main_scr_EventResponse(rs,rc,ext);
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
