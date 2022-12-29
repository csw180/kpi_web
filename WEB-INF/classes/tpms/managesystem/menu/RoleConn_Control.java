package tpms.managesystem.menu;

import javax.servlet.http.HttpServletRequest;
import tpms.framework.component.dao.*;
import tpms.framework.component.util.JSPUtil;
import tpms.framework.component.signon.SignOnUserAccount;
import tpms.framework.core.controller.Event;
import tpms.framework.core.controller.EventResponse;
import tpms.framework.core.controller.web.html.HTMLActionException;
import tpms.framework.core.controller.web.html.HTMLActionSupport;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *  클래스 개요    : 실행정정-Dispatch <p>
 *  클래스 상세기능 : HTTP parser<p>
 *  작성일 : 2003.06.10<p>
 *  @version 1.0
 *  @author  윤교임
 */
public class RoleConn_Control extends HTMLActionSupport
{
      /**
       * HttpRequst의 정보를 연계계정관리 조회 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {
        HttpSession session    = request.getSession(false);
        ServletContext context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        String cEvent     = JSPUtil.getParameter(request,"event","");
        String gubun      = JSPUtil.getParameter(request,"gubun","");
        String svalue     = JSPUtil.getParameter(request,"svalue","");
        String strEmpNo   = account.getHaengwon_no(); // 등록직원번호

        DbResultSet menulist=null;

        try{
             DBProcCall jado=new DBProcCall();
	           if(cEvent.equals("조회")){
	        	   System.out.println("param : " + gubun+","+svalue);
	        	   
                menulist = jado.callProc("UP_KPI_S_S_COROLE권한",gubun+","+svalue);
             }else if(cEvent.equals("저장")){
                      String sStatus[]    = JSPUtil.getParameter(request,"sStatus"   ,0);
                      String sRolecode[]  = JSPUtil.getParameter(request,"sRolecode" ,0);

                      for(int i = 0; i < sStatus.length; i++) {
                          jado.InputProc("UP_KPI_S_S_COROLE권한저장", gubun       +","
                                                             +svalue      +","
                                                             +sStatus[i]  +","
                                                             +sRolecode[i]+","
                                                             +strEmpNo
                                         );
                    
                      }
            }
        }catch(Exception exe)
        { log.error("DAO 생성 오류 "+exe.toString(),exe); }

        RoleConn_EventResponse eventResponse= new RoleConn_EventResponse(menulist,cEvent);
        request.setAttribute("RoleConn_EventResponse", eventResponse);
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
