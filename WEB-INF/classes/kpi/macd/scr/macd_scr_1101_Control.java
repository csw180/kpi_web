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
 *  클래스 개요    : 통합정보코드 조회  <p>
 *  클래스 상세기능 : 통합정보코드를 읽어서 JSP에 전달한다.<p>
 *  작성일 : 2011.01.<p>
 *  @version 1.0
 *  @author  하진영
 */
public class macd_scr_1101_Control extends HTMLActionSupport
{
      /**
       * HttpRequst의 정보를 통합정보코드 조회 데이타모델로 파싱하여 반환한다.
       */
     public EventResponse perform(HttpServletRequest request) throws HTMLActionException {

        HttpSession session   = request.getSession(false);
        ServletContext context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        String hidden_key = JSPUtil.getParameter(request, "hidden_key","");         // 조회,등록,변경,삭제 구분자
        String basemonth  = JSPUtil.getParameter(request, "basemonth" ,"");
        String jekyocode  = JSPUtil.getParameter(request, "jekyocode" ,"");    // 적요코드1
        String jekyocode2 = JSPUtil.getParameter(request, "jekyocode2","");    // 적요코드2
        String etcref1    = JSPUtil.getParameter(request, "etcref1"   ,"");    // 기타참고사항1
        String etcref2    = JSPUtil.getParameter(request, "etcref2"   ,"");    // 기타참고사항2
        String etcref3    = JSPUtil.getParameter(request, "etcref3"   ,"");    // 기타참고사항3
        String etcref4    = JSPUtil.getParameter(request, "etcref4"   ,"");    // 기타참고사항4
        String etcref5    = JSPUtil.getParameter(request, "etcref5"   ,"");    // 기타참고사항5
        String etcref6    = JSPUtil.getParameter(request, "etcref6"   ,"");    // 기타참고사항6
        String useYN      = JSPUtil.getParameter(request, "useYN"     ,"");    // 사용여부
        String codeGubun  = JSPUtil.getParameter(request, "codeGubun" ,"");    // 코드구분
        String strEmpNo = account.getHaengwon_no();                            // 직원번호

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
             
             if(hidden_key.equals("9")) {
        	        String gubun      = "1";   // wp_co정보코드 procedure 에서 구분 1로 강제 셋팅
      	        
                  rs = jado.callProc("UP_KPI_O_S_통합정보코드조회", basemonth +","+
                                                                  jekyocode +"," + 
                                                                  gubun 
                                                                   );
               //조회종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();
               
               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                             +"UP_KPI_O_S_통합정보코드조회"	        +","  //프로그램ID
                             +startTime                           +","  //시작시간
                             +endTime                             +","  //완료시간
                             +account.getHaengwon_no()            +","  //사용자ID
                             +account.getBranch_no()              +","  //점번호
                             +request.getRemoteAddr()             +","  //사용자IP
                             +"조회 : 기준년월=" +basemonth       + ";" //기준년월
                             +"적요코드=" +jekyocode              + ";" //적요코드
                             );
                                                                   
                                                                   
             } else if(hidden_key.equals("1")|| hidden_key.equals("2")||hidden_key.equals("3")) {
             	
                   rc = jado.InputProc("UP_KPI_O_S_통합정보코드처리", hidden_key +"," + 
                                                                    basemonth  +"," + 
                                                                    jekyocode  +"," + 
                                                                    jekyocode2 +"," + 
                                                                    etcref1    +"," + 
                                                                    etcref2    +"," + 
                                                                    etcref3    +"," + 
                                                                    etcref4    +"," + 
                                                                    etcref5    +"," + 
                                                                    etcref6    +"," + 
                                                                    useYN      +"," + 
                                                                    codeGubun  +"," + 
                                                                    strEmpNo
                                                                    );  
                   //등록,변경,삭제 종료시간
                   endTime = tpms.framework.component.util.DateTime.getShortTimeString();
                   
                   //web log 생성 
                   jado.InputProc("UP_KPI_C_S_WEBLOG"
                                 ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                                 +"UP_KPI_O_S_통합정보코드처리"         +","  //프로그램ID
                                 +startTime                           +","  //시작시간
                                 +endTime                             +","  //완료시간
                                 +account.getHaengwon_no()            +","  //사용자ID
                                 +account.getBranch_no()              +","  //점번호
                                 +request.getRemoteAddr()             +","  //사용자IP
                                 +"기준년월="       +basemonth        + ";" //기준년월
                                 +"처리구분(1:등록/2:변경/3:삭제)="   +hidden_key       + ";" //처리구분 1(등록),2(변경),3(삭제)
                                 +"적요코드1="      +jekyocode        + ";" //적요코드1
                                 +"적요코드2="      +jekyocode2       + ";" //적요코드2
                                 +"기타참고사항1="  +etcref1          + ";" //기타참고사항1
                                 +"기타참고사항2="  +etcref2          + ";" //기타참고사항2
                                 +"기타참고사항3="  +etcref3          + ";" //기타참고사항3
                                 +"기타참고사항4="  +etcref4          + ";" //기타참고사항4
                                 +"기타참고사항5="  +etcref5          + ";" //기타참고사항5
                                 +"기타참고사항6="  +etcref6          + ";" //기타참고사항6
                                 +"사용여부="       +useYN            + ";" //사용여부
                                 +"코드구분="       +codeGubun        + ";" //코드구분
                                 );
                                                                                   
            }
            log.debug(" HTMLAction success!");
        }catch(Exception exe)
        { 
            log.error("DAO 생성 오류 "+exe.toString(),exe); 
            // Error message 생성 --------------------------------------------->
            if (hidden_key.equals("9")) { /***** 조회 *****/
                message = "통합정보코드 조회월 =" + basemonth + "적요코드=" + jekyocode + " 정보를 확인하세요";
            }else if(hidden_key.equals("1")) { /***** 등록 *****/
                message = "등록 통합정보코드 적요코드1=" + "적요코드1=" + jekyocode + "적요코드2=" + jekyocode2
                        + "기타참고사항1=" + etcref1 + "기타참고사항2=" + etcref2 + "기타참고사항3=" + etcref3 
                        + "기타참고사항4=" + etcref4 + "기타참고사항5=" + etcref5 + "기타참고사항6=" + etcref6
                        + "사용여부=" + useYN + " 정보를 확인하세요";                
            }else if(hidden_key.equals("2")) { /***** 변경 *****/
                message = "변경 통합정보코드 적요코드1=" + "적요코드1=" + jekyocode + "적요코드2=" + jekyocode2
                        + "기타참고사항1=" + etcref1 + "기타참고사항2=" + etcref2 + "기타참고사항3=" + etcref3 
                        + "기타참고사항4=" + etcref4 + "기타참고사항5=" + etcref5 + "기타참고사항6=" + etcref6
                        + "사용여부=" + useYN + " 정보를 확인하세요";                
            }else if(hidden_key.equals("3")) { /***** 삭제 *****/
                message = "삭제 통합정보코드 적요코드1=" + "적요코드1=" + jekyocode + "적요코드2=" + jekyocode2
                        + "기타참고사항1=" + etcref1 + "기타참고사항2=" + etcref2 + "기타참고사항3=" + etcref3 
                        + "기타참고사항4=" + etcref4 + "기타참고사항5=" + etcref5 + "기타참고사항6=" + etcref6
                        + "사용여부=" + useYN + " 정보를 확인하세요";                
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
