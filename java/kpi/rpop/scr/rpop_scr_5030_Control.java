package kpi.rpop.scr;

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
 *  클래스 개요    :  개인종합이익세부내역 조회  <p>
 *  클래스 상세기능 : 개인종합이익세부내역내역 보고서를 읽어서 JSP에 전달한다.<p>
 *  작성일 : 2014.04.10<p>
 *  @version 1.0
 *  @author  하진영
 */
public class rpop_scr_5030_Control extends HTMLActionSupport   
{
      /**
       * HttpRequst의 정보를 개인별PI세부내역 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {

        HttpSession session   = request.getSession(false);
        ServletContext context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        String hidden_key   = JSPUtil.getParameter(request, "hidden_key"," ");     // 조회,등록,변경,삭제 구분자
        String jikwonno     = JSPUtil.getParameter(request, "jikwonno"," ");       // 직원번호
        String stmonth      = JSPUtil.getParameter(request, "stmonth"," ");        // 조회시작년월
        String edmonth      = JSPUtil.getParameter(request, "edmonth"," ");        // 조회종료년월 
        String segb         = JSPUtil.getParameter(request, "segb"," ");           // 조회구분  : 1-종합이익증대평가, 2-우수직원실적평가
        String pigb         = JSPUtil.getParameter(request, "pigb","Y");           // 실적구분  : Y 대상실적, N 미대상실적
        String searchCode   = JSPUtil.getParameter(request,"searchCode"," ");      //조회사유코드
        String pg_url       = JSPUtil.getParameter(request,"pg_url"," ");          //프로그램URL        

         // 기준년월별 프로시져를 입력받기 위한 변수들
        String procName   = "";
        String screenName   = "";
        
        long rc           = 0;
        Exception ext     = null;
        DbResultSet rs    = null;
        try
        {
            DBProcCall jado = new DBProcCall();
            
            //조회시작시간
            String startTime = tpms.framework.component.util.DateTime.getShortTimeString();
            
            if (segb.equals("1")) procName = "UP_KPI_M_S_종합이익증대평가세부내역";
            else procName = "UP_KPI_M_S_우수직원실적평가세부내역";

            if (segb.equals("1")) screenName = "종합이익증대";
            else screenName = "우수직원실적";
            
            rs = jado.callProc(procName, jikwonno +","+ stmonth+ "," + edmonth + "," + pigb);
            
            //조회종료시간
            String endTime = tpms.framework.component.util.DateTime.getShortTimeString();

            log.debug("HTMLAction success!");
            
            //web log 생성 
            jado.InputProc("UP_KPI_C_S_WEBLOGN"
                          ,"3"                         +","  //2:rpop,1:rpdy,3:개인PI,5;운영관리
                          +"개인종합이익세부내역"      +","  //화면명
                          +startTime                   +","  //시작시간
                          +endTime                     +","  //완료시간
                          +account.getHaengwon_no()    +","  //사용자ID
                          +account.getBranch_no()      +","  //점번호
                          +request.getRemoteAddr()     +","  //사용자IP
                          +"직원번호=" + jikwonno      +";"  //조회조건 ~
                          +"시작월="   + stmonth       +";"  //조회조건 ~
                          +"종료월="   + edmonth       +";"  //조회조건 ~
                          +"조회구분=" + screenName    +";"  //조회조건 ~
                          +"실적구분=" + pigb          +";,"
                          +"0"                         +","  //조회고객번호
                          + searchCode                 +","  //조회사유코드
                          + pg_url                           //프로그램URL                              
                          );

        }catch(Exception exe)
        { 
            log.error("DAO 생성 오류 "+exe.toString(),exe); 
            ext    =    exe;
        }
        
        //결과 SET 및 반환
        rpop_scr_EventResponse eventResponse    =        new rpop_scr_EventResponse(rs,rc,ext);
        request.setAttribute("rpop_scr_EventResponse", eventResponse);
        return eventResponse;
    }

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
