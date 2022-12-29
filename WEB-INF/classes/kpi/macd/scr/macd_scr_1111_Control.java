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
 *  클래스 개요    : 통합정보코드 업로드 관리 조회 및 처리
 *  클래스 상세기능: 통합정보코드 upload 처리 및 조회하여 JSP에 전달한다.
 *  작성일 : 2020.02.19
 *  @version 1.0
 *  @author  양인찬
 */
public class macd_scr_1111_Control extends HTMLActionSupport
{
      /**
       * HttpRequst의 정보를 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {

        HttpSession session   = request.getSession(false);
        ServletContext context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        String strEmpNo    = account.getHaengwon_no();

        String hidden_key  = JSPUtil.getParameter(request, "hidden_key"," ");    // 조회,등록,변경,삭제 구분자
        String basemonth   = JSPUtil.getParameter(request, "basemonth" ," ");    // 작업기준년월
         
        String jekyocode1  = JSPUtil.getParameter(request, "jekyocode1" ," ");   // 적요코드1
        String jekyocode2  = JSPUtil.getParameter(request, "jekyocode2" ," ");   // 적요코드2
        String etcref1     = JSPUtil.getParameter(request, "etcref1   " ," ");   // 기타참고사항1
        String etcref2     = JSPUtil.getParameter(request, "etcref2"    ," ");   // 기타참고사항2
        String etcref3     = JSPUtil.getParameter(request, "etcref3"    ," ");   // 기타참고사항3
        String etcref4     = JSPUtil.getParameter(request, "etcref4"    ," ");   // 기타참고사항4
        String etcref5     = JSPUtil.getParameter(request, "etcref5"    ," ");   // 기타참고사항5
        String etcref6     = JSPUtil.getParameter(request, "etcref6"    ," ");   // 기타참고사항6
        String useYN       = JSPUtil.getParameter(request, "useYN"      ," ");   // 사용구분
        String codeGubun   = JSPUtil.getParameter(request, "codeGubun"  ," ");   // 코드구분

        long rc            = 0;
        Exception ext      = null;
        DbResultSet rs     = null;

        //조회 시작/종료 시간
        String startTime, endTime;

        // 등록 처리에 대한 Error 발생 시 메시지 처리를 위한 변수 ------------->
        String message    = "";

        try
        {
            DBProcCall jado = new DBProcCall();
            //START TIME 
            startTime = tpms.framework.component.util.DateTime.getShortTimeString();
            
           if (hidden_key.equals("9")) {
        	        String gubun      = "1";   // wp_co정보코드 procedure 에서 구분 1로 강제 셋팅
      	        
                  rs = jado.callProc("UP_KPI_O_S_통합정보코드조회", basemonth  +","+
                                                                  jekyocode1 +"," + 
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
                             +"적요코드=" +jekyocode1             + ";" //적요코드
                             );
                                                                   
                                                                   
             } else if (hidden_key.equals("4")) { /***** 업로드 *****/
               String[] strStatus    = JSPUtil.getParameter(request, "v_sv_0",  0);  // 상태    
               String[] jekyocode1A  = JSPUtil.getParameter(request, "v_sv_1",  0);  // 점번호  
               String[] jekyocode2A  = JSPUtil.getParameter(request, "v_sv_2",  0);  // 점번호  
               String[] etcref1A     = JSPUtil.getParameter(request, "v_sv_3",  0);  // 점번호  
               String[] etcref2A     = JSPUtil.getParameter(request, "v_sv_4",  0);  // 점번호  
               String[] etcref3A     = JSPUtil.getParameter(request, "v_sv_5",  0);  // 점번호  
               String[] etcref4A     = JSPUtil.getParameter(request, "v_sv_6",  0);  // 점번호  
               String[] etcref5A     = JSPUtil.getParameter(request, "v_sv_7",  0);  // 점번호  
               String[] etcref6A     = JSPUtil.getParameter(request, "v_sv_8",  0);  // 점번호  
               String[] useYNA       = JSPUtil.getParameter(request, "v_sv_9",  0);  // 점번호  

               // 작업기준년월로 전체 테이타 삭제
               rc = jado.InputProc("UP_KPI_O_S_통합정보코드업로드처리","4,"       +
                                                           basemonth        + "," +
                                                           jekyocode1A[0]    + "," +
                                                           jekyocode2A[0]    + "," +
                                                           etcref1A[0]       + "," +
                                                           etcref2A[0]       + "," +
                                                           etcref3A[0]       + "," +
                                                           etcref4A[0]       + "," +
                                                           etcref5A[0]       + "," +
                                                           etcref6A[0]       + "," +
                                                           useYNA[0]         + "," +
                                                           codeGubun         + "," +
                                                           strEmpNo       );
               for(int i=0; i<strStatus.length; i++) {

                   rc = jado.InputProc("UP_KPI_O_S_통합정보코드업로드처리","1,"   +
                                                           basemonth        + "," +
                                                           jekyocode1A[i]    + "," +
                                                           jekyocode2A[i]    + "," +
                                                           etcref1A[i]       + "," +
                                                           etcref2A[i]       + "," +
                                                           etcref3A[i]       + "," +
                                                           etcref4A[i]       + "," +
                                                           etcref5A[i]       + "," +
                                                           etcref6A[i]       + "," +
                                                           useYNA[i]         + "," +
                                                           codeGubun         + "," +
                                                           strEmpNo       );
               }
                   //엑셀업로드 종료시간
                   endTime = tpms.framework.component.util.DateTime.getShortTimeString();

                   //web log 생성 :등록건수가 많아 timeout 예상되므로 등록자/일시 만 log로 남김
                   jado.InputProc("UP_KPI_C_S_WEBLOG"
                                 ,"5"                                      +","  //1:rpop,2:rphq,3:rprm,4:설문,5:운영관리
                                 +"통합정보코드업로드처리"                 +","  //프로그램ID
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
            
        //    if (hidden_key.equals("1")) { /***** 등록 *****/
        //        message = "등록한 직원번호=" + emnm + "부임점번호" + jumcode + "발령일=" + stdate + " 정보를 확인하세요";
        //    }else if (hidden_key.equals("2")) { /***** 변경 *****/
        //        message = "변경한 직원번호=" + emnm + "부임점번호" + jumcode + "발령일=" + stdate + " 정보를 확인하세요";
        //    }else if (hidden_key.equals("3")) { /***** 삭제 *****/
        //        message = "삭제한 직원번호=" + emnm + "부임점번호" + jumcode + "발령일=" + stdate + " 정보를 확인하세요";
        //    }
            // ----------------------------------------------------------------/
            ext    =    exe;
        }
        // message 추가부 ----------------------------------------------------->
        macd_scr_EventResponse eventResponse    =        new macd_scr_EventResponse(rs,rc,ext,message); // message 추가부
        // --------------------------------------------------------------------/
        request.setAttribute("macd_scr_EventResponse", eventResponse);
        return eventResponse;
  }
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
