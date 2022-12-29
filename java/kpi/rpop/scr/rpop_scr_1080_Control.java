package kpi.rpop.scr;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import tpms.framework.component.dao.DBProcCall;
import tpms.framework.component.dao.DbResultSet;
import tpms.framework.component.signon.SignOnUserAccount;
import tpms.framework.component.util.JSPUtil;
import tpms.framework.core.controller.Event;
import tpms.framework.core.controller.EventResponse;
import tpms.framework.core.controller.web.html.HTMLActionException;
import tpms.framework.core.controller.web.html.HTMLActionSupport;


/**
 *  클래스 개요     : 경쟁영업점별비교 조회  <p>
 *  클래스 상세기능 : 경쟁영업점별비교를 읽어서 JSP에 전달한다.<p>
 *  작성일 : 2006.10.19<p>
 *  @version 1.0
 *  @author  남호준
 */
public class rpop_scr_1080_Control extends HTMLActionSupport
{
      /**
       * HttpRequst의 정보를 job코드 조회 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {

        HttpSession session   = request.getSession(false);
        ServletContext context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        String hidden_key = JSPUtil.getParameter(request, "hidden_key"," ");         // 조회,등록,변경,삭제 구분자
        String basemonth  = JSPUtil.getParameter(request, "basemonth" ," ");
        String v_jumcode  = JSPUtil.getParameter(request, "v_jumcode"," ");
        String v_jumcode2 = JSPUtil.getParameter(request, "v_jumcode2"," ");

        long rc           = 0;
        Exception ext     = null;
        DbResultSet rs    = null;
        String message    = "";
        
        try
        {
            DBProcCall jado = new DBProcCall();

            //기준점과 비교점의 PEER GROUP 동일성 검증            
            rs = jado.callProc("UP_KPI_C_S_CO영업점PG명",basemonth+","+v_jumcode);            
            String pgcode = "";
            String pgcode_cf = "";

            if (rs!=null){
              rs.first();
              while(rs.next())
              {
                pgcode = rs.getString("pg코드").trim();
              }
            }            
  
            rs = jado.callProc("UP_KPI_C_S_CO영업점PG명",basemonth+","+v_jumcode2); 
            if (rs!=null){
              rs.first();
              while(rs.next())
              {
                pgcode_cf = rs.getString("pg코드").trim();
              }
            }
            log.debug("pgcode = "+pgcode + ",  pgcode_cf = "+pgcode_cf);
            
            //조회된 pgcode 비교 후 조회 
            if(pgcode!= null && !pgcode.equals(pgcode_cf)){
              message = "동일 Peer Group의 기준점과 비교점으로만 조회가능합니다.";
              rs = null;
            }
            else{              
              
              //조회시작시간
              String startTime = tpms.framework.component.util.DateTime.getShortTimeString();

              rs = jado.callProc("UP_KPI_M_S_경쟁영업점별비교", hidden_key+","+basemonth +","+ v_jumcode+","+ v_jumcode2);
              
              //조회종료시간
              String endTime = tpms.framework.component.util.DateTime.getShortTimeString();

              log.debug("HTMLAction success!");
              
              //web log 생성 
              jado.InputProc("UP_KPI_C_S_WEBLOG"
                            ,"2"                       +","  //2:rpop,1:rpdy
                            +"UP_KPI_M_S_경쟁영업점별비교"   +","  //프로그램ID
                            +startTime                 +","  //시작시간
                            +endTime                   +","  //완료시간
                            +account.getHaengwon_no()  +","  //사용자ID
                            +account.getBranch_no()    +","  //점번호
                            +request.getRemoteAddr()   +","  //사용자IP
                            +"기준년월="   + basemonth   +";"  //조회조건 ~
                            +"기준점번호=" + v_jumcode   +";"
                            +"비교점번호=" + v_jumcode2  +";"
                            );
            }

            log.debug("message = "+message);

        }catch(Exception exe)
        {
            log.error("DAO 생성 오류 "+exe.toString(),exe);
            ext    =    exe;
        }
        
        //결과 SET 및 반환
        rpop_scr_EventResponse eventResponse    =        new rpop_scr_EventResponse(rs,rc,ext,message);
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
