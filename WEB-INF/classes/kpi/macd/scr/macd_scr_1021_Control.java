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
 *  클래스 개요    : 상품그룹 조회  <p>
 *  클래스 상세기능 : 상품그룹을 읽어서 JSP에 전달한다.<p>
 *  작성일 : 2006.07.01<p>
 *  @version 1.0
 *  @author  변휘원
 */
public class macd_scr_1021_Control extends HTMLActionSupport   
{
      /**
       * HttpRequst의 정보를 상품그룹정보 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {

        HttpSession session   = request.getSession(false);
        ServletContext context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        String hidden_key       = JSPUtil.getParameter(request, "hidden_key"," ");         // 조회,등록,변경,삭제 구분자
        String basemonth        = JSPUtil.getParameter(request, "basemonth"," ");
 
        String productgubun     = JSPUtil.getParameter(request, "productgubun"," ");       // 상품구분
        String bgubun           = JSPUtil.getParameter(request, "bgubun","999");           // 대분류
        String mgubun           = JSPUtil.getParameter(request, "mgubun","999");           // 중분류코드
        String sgubuncode       = JSPUtil.getParameter(request, "sgubuncode","999");       // 세분류코드

        String interestgb       = JSPUtil.getParameter(request, "interestgb","");          // 순이자수익 대상상품구분
        String delayyn          = JSPUtil.getParameter(request, "delayyn","");             // 연체 대상상품여부
        String creditdelayyn    = JSPUtil.getParameter(request, "creditdelayyn","");       // 신용카드연체 대상상품여부
        String lowcostyn        = JSPUtil.getParameter(request, "lowcostyn","");           // 저원가성여부
        String loanyn           = JSPUtil.getParameter(request, "loanyn","");              // 총여신구분
        String piijayn          = JSPUtil.getParameter(request, "piijayn","");             // PI이자대상구분
        String commissiongubun  = JSPUtil.getParameter(request, "commissiongubun","");     // 수수료 구분
        String BasicProductCode = JSPUtil.getParameter(request, "BasicProductCode","");    // 기준실적상품분류코드
        String LoanBelowYN      = JSPUtil.getParameter(request, "LoanBelowYN","");         // 신규고정이하여신제외여부
        String ExpAdjYN         = JSPUtil.getParameter(request, "ExpAdjYN","");            // 위험조정운용대상여부
        String spsgcode         = JSPUtil.getParameter(request, "spsgcode","");            // 특정상품분류
        String dimagubun        = JSPUtil.getParameter(request, "dimagubun","");           // 디마케팅제외구분
        String retaloangb       = JSPUtil.getParameter(request, "retaloangb","");          // 소매여신구분
        String strEmpNo         = account.getHaengwon_no();          // 직원번호
        
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
                rs = jado.callProc("UP_KPI_O_S_상품그룹조회", basemonth    +","+
                                                            productgubun +","+
                                                            bgubun       +","+
                                                            mgubun       +","+
                                                            sgubuncode 
                                                           );
                                                           
               //조회종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();
               
               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                 +","  //2:rpop,1:rpdy,5:운영관리
                             +"UP_KPI_O_S_상품그룹조회"	+","  //프로그램ID
                             +startTime                           +","  //시작시간
                             +endTime                             +","  //완료시간
                             +account.getHaengwon_no()            +","  //사용자ID
                             +account.getBranch_no()              +","  //점번호
                             +request.getRemoteAddr()             +","  //사용자IP
                             +"조회 : 기준년월=" +basemonth              + ";" //기준년월
                             +"상품구분="        +productgubun           + ";" //상품구분
                             +"대분류="          +bgubun                 + ";" //대분류
                             +"중분류="          +mgubun                 + ";" //중분류
                             +"세분류="          +sgubuncode             + ";" //세분류
                             );
                                                           
            }else if (hidden_key.equals("2")){ /***** 상품그룹 변경 *****/

               //상품그룹 변경등록 시작시간
               startTime = tpms.framework.component.util.DateTime.getShortTimeString();
                
               rc = jado.InputProc("UP_KPI_O_S_상품그룹처리", basemonth        + "," +
                                                            productgubun     + "," + 
                                                            sgubuncode       + "," + 
                                                            interestgb       + "," + 
                                                            delayyn          + "," + 
                                                            creditdelayyn    + "," + 
                                                            lowcostyn        + "," + 
                                                            loanyn           + "," + 
                                                            piijayn          + "," + 
                                                            commissiongubun  + "," + 
                                                            BasicProductCode + "," + 
                                                            LoanBelowYN      + "," + 
                                                            ExpAdjYN         + "," + 
                                                            spsgcode         + "," + 
                                                            dimagubun        + "," + 
                                                            retaloangb       + "," + 
                                                            strEmpNo                  
                                      );
                                      
               //상품그룹 변경등록 종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();

               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                  +","  //2:rpop,1:rpdy,5:운영관리
                             +"UP_KPI_O_S_상품그룹처리"              +","  //프로그램ID
                             +startTime                            +","  //시작시간
                             +endTime                              +","  //완료시간
                             +account.getHaengwon_no()             +","  //사용자ID
                             +account.getBranch_no()               +","  //점번호
                             +request.getRemoteAddr()              +","  //사용자IP
                             +"변경 : 기준년월="          +basemonth               + ";" //기준년월
                             +"상품구분="                 +productgubun            + ";" //상품구분
                             +"세분류="                   +sgubuncode              + ";" //세분류코드
                             +"순이자수익구분="           +interestgb              + ";" //순이자수익대상상품구분
                             +"연체대상여부="             +delayyn                 + ";" //연체 대상상품여부          
                             +"신용카드연체여부="         +creditdelayyn           + ";" //신용카드연체 대상상품여부  
                             +"저원가성여부="             +lowcostyn               + ";" //저원가성여부                             
                             +"총여신구분="               +loanyn                  + ";" //총여신구분                 
                             +"PI대상구분="               +piijayn                 + ";" //PI이자대상구분             
                             +"수수료구분="               +commissiongubun         + ";" //수수료 구분                
                             +"기준실적상품분류코드="     +BasicProductCode        + ";" //기준실적상품분류코드       
                             +"신규고정이하제외여부="     +LoanBelowYN             + ";" //신규고정이하여신제외여부   
                             +"위험조정운용여부="         +ExpAdjYN                + ";" //위험조정운용대상여부
                             +"특정상품분류="             +spsgcode                + ";" //특정상품분류
                             +"디마케팅제외구분="         +dimagubun               + ";" //디마케팅제외구분
                             +"소매여신구분="             +retaloangb              + ";" //소매여신구분
                             ); 
                                      
            }else if (hidden_key.equals("3")){ /***** 상품레벨 변경 *****/

               rc = jado.InputProc("UP_KPI_O_S_상품그룹레벨처리", basemonth       + "," +
                                                                productgubun    + "," + 
                                                                sgubuncode      + "," + 
                                                                mgubun          + "," + 
                                                                strEmpNo                  
                                      );

               //상품레벨변경 등록종료시간
               endTime = tpms.framework.component.util.DateTime.getShortTimeString();

               //web log 생성 
               jado.InputProc("UP_KPI_C_S_WEBLOG"
                             ,"5"                                  +","  //2:rpop,1:rpdy,5:운영관리
                             +"UP_KPI_O_S_상품그룹레벨처리"          +","  //프로그램ID
                             +startTime                            +","  //시작시간
                             +endTime                              +","  //완료시간
                             +account.getHaengwon_no()             +","  //사용자ID
                             +account.getBranch_no()               +","  //점번호
                             +request.getRemoteAddr()              +","  //사용자IP
                             +"변경 : 기준년월=" +basemonth              + ";"  //기준년월
                             +"상품구분="        +productgubun           + ";"  //상품구분
                             +"대분류="          +bgubun                 + ";"  //대분류
                             +"중분류="          +mgubun                 + ";"  //중분류
                             +"세분류="          +sgubuncode             + ";"  //세분류
                             );                                       

            }
            log.debug(" HTMLAction success!");
        }catch(Exception exe)
        { 
            log.error("DAO 생성 오류 "+exe.toString(),exe);
            
            // Error message 생성 --------------------------------------------->
            if (hidden_key.equals("2")) { /*상품 정보 등록변경 */
                message = "변경등록상품코드=" + sgubuncode +"순이자수익대상="  + interestgb + "연체대상=" + delayyn 
                        + "신용카드연체대상=" + creditdelayyn +"저원가성=" + lowcostyn + "총여신=" + loanyn 
                        + "PI이자대상=" + piijayn +"수수료구분=" + commissiongubun +"기준실적상품분류코드=" + BasicProductCode 
                        + "신규고정이하제외="+ LoanBelowYN + "위험조정운용="+ ExpAdjYN+"특정상품분류="+ spsgcode
                        + "디마케팅제외구분="+ dimagubun + "소매여신구분="+ retaloangb+ " 정보를 확인하세요";
            }else if (hidden_key.equals("3")) { /*상품레벨 정보 등록변경 */
                message = "변경등록 상품레벨 상품구분=" + productgubun 
                        + "대분류=" + bgubun + "중분류=" + mgubun + "세분류=" + sgubuncode + " 정보를 확인하세요";
            }else if (hidden_key.equals("9")) { /*상품정보 조회 */
                message = "조회 상품구분=" + productgubun 
                        + "대분류=" + bgubun + "중분류=" + mgubun + "세분류=" + sgubuncode + " 정보를 확인하세요";
            }
            // ----------------------------------------------------------------/
            ext    =    exe;        }
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
