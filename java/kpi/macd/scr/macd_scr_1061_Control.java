package kpi.macd.scr;

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
 *  클래스 개요    : 영업점peergroup 조회  <p>
 *  클래스 상세기능 : 영업점peergroup을 읽어서 JSP에 전달한다.<p>
 *  작성일 : 2006.07.01<p>
 *  @version 1.0
 *  @author  변휘원
 *  수정자/수정일: 하진영/2011.02.10
 *  수정사유     : 광역금융본부코드,광역금융본부명 추가 
 */
public class macd_scr_1061_Control extends HTMLActionSupport   
{
      /**
       * HttpRequst의 정보를 영업점PeerGroup 조회 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {

        HttpSession session   = request.getSession(false);
        ServletContext context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        String hidden_key     = JSPUtil.getParameter(request, "hidden_key"," ");         // 조회,등록,변경,삭제 구분자
        String basemonth      = JSPUtil.getParameter(request, "basemonth"," ");

        long rc           = 0;
        Exception ext     = null;
        DbResultSet rs    = null;

        //조회 시작/종료 시간
        String startTime, endTime;

        // 등록 처리에 대한 Error 발생 시 메시지 처리를 위한 변수 ------------->
        String message    = "";
        int idx = 0;
        
        try
        {
            DBProcCall jado = new DBProcCall();
            //START TIME 
            startTime = tpms.framework.component.util.DateTime.getShortTimeString();
            
            if (hidden_key.equals("9")){  /***** 조회 *****/
               rs = jado.callProc("UP_KPI_O_S_영업점peergroup", basemonth);
               //조회종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();
               
               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                             +"UP_KPI_O_S_영업점peergroup"	        +","  //프로그램ID
                             +startTime                           +","  //시작시간
                             +endTime                             +","  //완료시간
                             +account.getHaengwon_no()            +","  //사용자ID
                             +account.getBranch_no()              +","  //점번호
                             +request.getRemoteAddr()             +","  //사용자IP
                             +"조회 : 기준년월=" +basemonth       + ";" //기준년월
                             );
                
            }else if (hidden_key.equals("2")){ /***** 비율 변경 *****/

                String jumno          = JSPUtil.getParameter(request, "jumno"," ");          // 점번호
                String pgcode         = JSPUtil.getParameter(request, "pgcode ","");         // peer group 코드
                String pgname         = JSPUtil.getParameter(request, "pgname ","");         // peer group 코드 명
                String jumsu_yn       = JSPUtil.getParameter(request, "jumsu_yn ","");       // 점수산출여부
                String totjum         = JSPUtil.getParameter(request, "totjum","");          // 합산점                                                                                             
                String WideCode       = JSPUtil.getParameter(request, "WideCode ","");       // 광역금융본부 코드
                String WideCodeName   = JSPUtil.getParameter(request, "WideCodeName ","");   // 광역금융본부 코드 명
                String strEmpNo       = account.getHaengwon_no();                            // 직원번호

                rc = jado.InputProc("UP_KPI_O_S_영업점peergroup처리", basemonth     + "," +
                                                                    jumno         + "," + 
                                                                    pgcode        + "," + 
                                                                    pgname        + "," + 
                                                                    jumsu_yn      + "," + 
                                                                    totjum        + "," + 
                                                                    WideCode      + "," + 
                                                                    WideCodeName  + "," + 
                                                                    strEmpNo                  
                                                                     );
               //변경 종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();

               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                             +"UP_KPI_O_S_영업점peergroup처리"      +"," //프로그램ID
                             +startTime                           +","  //시작시간
                             +endTime                             +","  //완료시간
                             +account.getHaengwon_no()            +","  //사용자ID
                             +account.getBranch_no()              +","  //점번호
                             +request.getRemoteAddr()             +","  //사용자IP
                             +"변경 : 기준년월="     +basemonth      + ";" //기준년월
                             +"점번호="              +jumno          + ";" //점번호
                             +"PG코드="              +pgcode         + ";" //PG코드
                             +"PG코드명="            +pgname         + ";" //PG코드명
                             +"점수산출여부="        +jumsu_yn       + ";" //점수산출여부
                             +"합산점번호="          +totjum         + ";" //합산점번호
                             +"광역금융본부코드="    +WideCode       + ";" //광역금융본부코드
                             +"광역금융본부코드명="  +WideCodeName   + ";" //광역금융본부코드명
                             );
                                                                     
            }
            log.debug(" HTMLAction success!");
        }catch(Exception exe)
        { 
            log.error("DAO 생성 오류 "+exe.toString(),exe);      
            String jumno   = JSPUtil.getParameter(request, "jumno"," ");          // 점번호            
            // Error message 생성 --------------------------------------------->
            if (hidden_key.equals("9")) { /***** 조회 *****/
                message = "영업점PeerGroup 조회월 =" + basemonth + " 정보를 확인하세요";
            }else  message = "변경등록 점번호=" + jumno  + " 정보를 확인하세요";                
            // ----------------------------------------------------------------/
            ext    =    exe;

        }
/****************************변경************************/
        macd_scr_EventResponse eventResponse    =        new macd_scr_EventResponse(rs,rc,ext);
        request.setAttribute("macd_scr_EventResponse", eventResponse);
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
