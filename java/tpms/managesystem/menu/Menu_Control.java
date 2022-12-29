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
 *  클래스 개요    : 메뉴관리 <p>
 *  클래스 상세기능 : request.getParameter 처리 및 DB에서 결과 가져오기<p>
 *  작성일 : 2003.06.10<p>
 *  @version 1.0
 *  @author  변휘원
 */
public class Menu_Control extends HTMLActionSupport
{



      /**
       * HttpRequst의 정보를 연계계정관리 조회 데이타모델로 파싱하여 반환한다.
       */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException {

        HttpSession session = request.getSession(false);
        ServletContext context = session.getServletContext();
        String cEvent = JSPUtil.getParameter(request,"event","");
				long rc           = 0;
        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        Exception ext     = null;
        DbResultSet menulist=null;
        String UserID=account.getHaengwon_no();
        try{
            DBProcCall jado=new DBProcCall();
	        if(cEvent.equals("조회")){
                menulist = jado.callProc("UP_KPI_S_S_CO메뉴관리");
            }else if(cEvent.equals("저장")){
                
                String sStatus[]    = JSPUtil.getParameter(request,"sStatus"   ,0);
                String sMenugubun[] = JSPUtil.getParameter(request,"sMenugubun",0);
                String sPgrmid[]    = JSPUtil.getParameter(request,"sPgrmid"   ,0);
                String sPgrmname[]  = JSPUtil.getParameter(request,"sPgrmname" ,0);
                String sPgrmurl[]   = JSPUtil.getParameter(request,"sPgrmurl"  ,0);
                String smenulevle[] = JSPUtil.getParameter(request,"smenulevle",0);
                String supmenuid[]  = JSPUtil.getParameter(request,"supmenuid" ,0);
                String sSeq[]       = JSPUtil.getParameter(request,"sSeq"      ,0);
                String sPopyn[]     = JSPUtil.getParameter(request,"sPopyn"    ,0);
                String sImage[]     = JSPUtil.getParameter(request,"sImage"    ,0);
                String sSecurity[]  = JSPUtil.getParameter(request,"sSecurity" ,0);
                String sDocMan[]    = JSPUtil.getParameter(request,"sDocMan"   ,0);
                for(int i = 0; i < sStatus.length; i++) {
                    rc = jado.InputProc("UP_KPI_S_S_CO메뉴관리저장",sStatus[i]    + "," +
                                                       sPgrmid[i]    + "," +
                                                       sMenugubun[i] + "," +
                                                       sPgrmname[i]  + "," +
                                                       sPgrmurl[i]   + "," +
                                                       supmenuid[i]  + "," +
                                                       smenulevle[i] + "," +
                                                       sSeq[i]       + "," +
                                                       sPopyn[i]     + "," +
                                                       sImage[i]     + "," +
                                                       (sSecurity[i].length()==0?'0':sSecurity[i])  + "," +
                                                       (sDocMan[i].length()==0?'0':sSecurity[i])
                                  );
                    
                }
               // jado.insertproc("wp_co메뉴저장",",,,");
            }
            
        }catch(Exception exe)
        {
        		log.error("DAO 생성 오류 "+exe.toString(),exe);
        		ext    =    exe;
        }

        Menu_EventResponse eventResponse= new Menu_EventResponse(menulist,cEvent,rc,ext);
        request.setAttribute("Menu_EventResponse", eventResponse);
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
