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
 *  클래스 개요    : KPI코드 조회  <p>
 *  클래스 상세기능 : KPI코드 정보 update 및 조회하여 JSP에 전달한다.<p>
 *  작성일 : 2011.01.<p>
 *  @version 1.0
 *  @author  하진영
 */
public class macd_scr_1011_Control extends HTMLActionSupport   
{
      /**
       * HttpRequst의 정보를 KPI코드 조회 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {

        HttpSession session   = request.getSession(false);
        ServletContext context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        String  hidden_key   = JSPUtil.getParameter(request, "hidden_key"," ");         // (9)조회,(1)등록,(2)변경,(3)삭제 구분자
        String  basemonth    = JSPUtil.getParameter(request,"basemonth"," ");
        
        String  kpicode      = JSPUtil.getParameter(request, "kpicode","");             // kpi 코드
        String  kpiname      = JSPUtil.getParameter(request, "kpiname","");             // kpi명
        String  kpicontents  = JSPUtil.getParameter(request, "kpicontents","");         // kpi내용
        String  kpigubun     = JSPUtil.getParameter(request, "kpigubun","");            // kpi구분
        String  resultgubun  = JSPUtil.getParameter(request, "resultgubun","");         // 성과관리구분
        String  outputseq    = JSPUtil.getParameter(request, "outputseq","");           // 출력순서
        String  ratingperiod = JSPUtil.getParameter(request, "ratingperiod","");        // 평가주기
        String  topposition  = JSPUtil.getParameter(request, "topposition","");         // 상한점수
        String  lowposition  = JSPUtil.getParameter(request, "lowposition","");         // 하한점수
        String  objectyn     = JSPUtil.getParameter(request, "objectyn","");            // 목표부여여부
        String  objectcourse = JSPUtil.getParameter(request, "objectcourse","");        // 목표방향
        String  updownyn     = JSPUtil.getParameter(request, "updownyn","");            // 상하향지표여부
        String  typecode     = JSPUtil.getParameter(request, "typecode","");            // 점수화유형코드
        String  strEmpNo     = account.getHaengwon_no();                                // 직원번호
        String  stdScore     = JSPUtil.getParameter(request, "stdscore","");            // 기준점수
        String  useyn        = JSPUtil.getParameter(request, "useyn","");               // 사용여부
        String  dpoint       = JSPUtil.getParameter(request, "dpoint","");              // 소숫점자리수
        
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
               rs = jado.callProc("UP_KPI_O_S_kpi코드조회", basemonth);
               //조회종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();
               
               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                             +"UP_KPI_O_S_kpi코드조회"	            +","  //프로그램ID
                             +startTime                           +","  //시작시간
                             +endTime                             +","  //완료시간
                             +account.getHaengwon_no()            +","  //사용자ID
                             +account.getBranch_no()              +","  //점번호
                             +request.getRemoteAddr()             +","  //사용자IP
                             +"조회 : 기준년월=" +basemonth              + ";" //기준년월
                             );
                              
                              
            }else{ /***** 등록,변경,삭제 *****/
                rc = jado.InputProc("UP_KPI_O_S_kpi코드처리", hidden_key   + "," + 
                                                            basemonth    + "," +
                                                            kpicode      + "," + 
                                                            kpiname      + "," + 
                                                            kpicontents  + "," + 
                                                            kpigubun     + "," + 
                                                            resultgubun  + "," + 
                                                            outputseq    + "," + 
                                                            ratingperiod + "," + 
                                                            topposition  + "," + 
                                                            lowposition  + "," + 
                                                            objectyn     + "," +
                                                            objectcourse + "," +
                                                            updownyn     + "," + 
                                                            typecode     + "," + 
                                                            strEmpNo     + "," +
                                                            stdScore     + "," +
                                                            useyn        + "," +
                                                            dpoint             
                                      );

               //등록,변경,삭제 종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();

               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                             +"UP_KPI_O_S_kpi코드처리"              +"," //프로그램ID
                             +startTime                           +","  //시작시간
                             +endTime                             +","  //완료시간
                             +account.getHaengwon_no()            +","  //사용자ID
                             +account.getBranch_no()              +","  //점번호
                             +request.getRemoteAddr()             +","  //사용자IP
                             +"기준년월="                             +basemonth        + ";" //기준년월
                             +"처리구분(1:등록/2:변경/3:삭제)="       +hidden_key       + ";" //처리구분(1:등록,2:변경,3:삭제)
                             +"KPI코드="                              +kpicode          + ";" //KPI코드
                             +"KPI명="                                +kpiname          + ";" //kpi명
                             +"KPI구분="                              +kpigubun         + ";" //kpi구분      
                             +"출력순서="                             +outputseq        + ";" //출력순서
                             +"상한점수="                             +topposition      + ";" //상한점수
                             +"하한점수="                             +lowposition      + ";" //하한점수
                             +"기준점수="                             +stdScore         + ";" //기준점수
                             +"목표부여여부="                         +objectyn         + ";" //목표부여여부
                             +"목표방향="                             +objectcourse     + ";" //목표방향
                             +"상하향지표여부="                       +updownyn         + ";" //상하향지표여부
                             +"점수화유형코드="                       +typecode         + ";" //점수화유형코드
                             +"소숫점자리수="                         +dpoint           + ";" //소숫점자리수
                             +"사용여부="                             +useyn            + ";" //사용여부
                             );
                                      
            }
            log.debug(" HTMLAction success!");
        }catch(Exception exe)
        { 
            log.error("DAO 생성 오류 "+exe.toString(),exe); 
            // Error message 생성 --------------------------------------------->
            if (hidden_key.equals("9")) { /***** 조회 *****/
                message = "KPI코드 조회월 =" + basemonth + " 정보를 확인하세요";
            }else { /***** 등록,변경,삭제 *****/
                message = "작업기준월=" + basemonth + ",처리구분=" + hidden_key +"KPI코드=" + kpicode + ",KPI명=" + kpiname + " 정보를 확인하세요";                
            }
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
