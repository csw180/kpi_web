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
import tpms.framework.security.SecurityUtils;


/**
 *  클래스 개요    : 메뉴관리 <p>
 *  클래스 상세기능 : request.getParameter 처리 및 DB에서 결과 가져오기<p>
 *  작성일 : 2003.06.10<p>
 *  @version 1.0
 *  @author  변휘원
 */
public class User_Control extends HTMLActionSupport {


    /**
     * HttpRequst의 정보를 연계계정관리 조회 데이타모델로 파싱하여 반환한다.
     */
    public EventResponse perform(HttpServletRequest request) throws
            HTMLActionException {

        HttpSession session = request.getSession(false);
        ServletContext context = session.getServletContext();
        String hidden_key = JSPUtil.getParameter(request, "hidden_key", " "); // 조회,등록,변경,삭제 구분자
        String cID = JSPUtil.getParameter(request, "UserID", ""); // 사용자 ID(사원번호)
        String period = JSPUtil.getParameter(request, "period", ""); // 작업구분

        SignOnUserAccount account = (SignOnUserAccount) session.getAttribute(
                "tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        DbResultSet menulist = null;
        String UserID = account.getHaengwon_no();
        try {
            DBProcCall jado = new DBProcCall();

            if (hidden_key.equals("9")) { //조회

                menulist = jado.callProc("UP_KPI_S_S_CO사용자관리");

            } else if (hidden_key.equals("2")) { //권한관리

                String sStatus[] = JSPUtil.getParameter(request, "sStatus", 0);
                String sUserID[] = JSPUtil.getParameter(request, "sUserID", 0);
                String sPassword[] = JSPUtil.getParameter(request, "sPassword",
                        0);
                String sUsername[] = JSPUtil.getParameter(request, "sUsername",
                        0);
                String sJumno[] = JSPUtil.getParameter(request, "sJumno", 0);
                String sJumname[] = JSPUtil.getParameter(request, "sJumname", 0);
                String sJoblablecode[] = JSPUtil.getParameter(request,
                        "sJoblablecode", 0);
                String sJoblablename[] = JSPUtil.getParameter(request,
                        "sJoblablename", 0);
                String sJuminno[] = JSPUtil.getParameter(request, "sJuminno", 0);

                for (int i = 0; i < sStatus.length; i++) {
                    jado.InputProc("wp_co사용자관리저장", sStatus[i] + "," +
                                   sUserID[i] + "," +
                                   sPassword[i] + "," +
                                   sUsername[i] + "," +
                                   sJumno[i] + "," +
                                   sJumname[i] + "," +
                                   sJoblablecode[i] + "," +
                                   sJoblablename[i] + "," +
                                   sJuminno[i]);

                }
                // jado.insertproc("wp_co메뉴저장",",,,");
            } else if (hidden_key.equals("3")) { //비밀번호 초기화

                jado.InputProc("wp_co사용자관리_비밀번호초기화", cID);

            } else if (hidden_key.equals("4")) { //비밀번호 암호화

                menulist = jado.callProc("wp_co비밀번호암호화대상조회");
                //log.debug(" menulist Size" + menulist.getRowCount());
                int i = 0;
                if (menulist != null) {

                    menulist.first();
                    while (menulist.next()) {
                        jado.InputProc("wp_co비밀번호암호화처리",
                                       menulist.getString("직원번호").trim() + "," +
                                       SecurityUtils.encrypt(menulist.getString(
                                "비밀번호").trim())
                                );
                        i++;
                        //log.debug("###### row count ###### " + i);

                    }
                }

                log.debug(" menulist Size" + menulist.getRowCount());

            } else if (hidden_key.equals("5")) { //접속제한 해제

                jado.InputProc("wp_co접속제한해제", cID);

            } 
        } catch (Exception exe) {
            log.error("DAO 생성 오류 " + exe.toString(), exe);
        }

        User_EventResponse eventResponse = new User_EventResponse(menulist,
                hidden_key);
        request.setAttribute("User_EventResponse", eventResponse);
        return eventResponse;
    } //end perform()

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
    public void doEnd(HttpServletRequest request, Event event) {
        request.setAttribute("Event", event);
        log.debug("setAttribute");
    }

} //end class
