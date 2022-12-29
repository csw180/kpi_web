package tpms.framework.core.controller.web.util;

/**
 *  웹 컨테이너에서 세션에 할당할 상수를 정의한다.
 */
public class WebKeys
{

  // COMPONENT MANAGER 세션값의 키상수
  public static final String COMPONENT_MANAGER="tpms.framework.core.comm.COMPONENT_MANAGER";
  // SCREEN FLOW MANAGER 세션값의 키상수
  public static final String SCREEN_FLOW_MANAGER="tpms.framework.core.comm.SCREEN_FLOW_MANAGER";
  // REQUEST PROCESSOR 세션값의 키상수
  public static final String REQUEST_PROCESSOR="tpms.framework.core.comm.REQUEST_PROCESSOR";
  // MENU PROCESSOR 세션값의 키상수
  public static final String MENU_PROCESSOR="tpms.framework.core.comm.MENU_PROCESSOR";
  // CURRENT_SCREEN 세션값의 키상수
  public static final String CURRENT_SCREEN="tpms.framework.core.comm.CURRENT_SCREEN";
  // PREVIOUS_SCREEN 세션값의 키상수
  public static final String PREVIOUS_SCREEN="tpms.framework.core.comm.PREVIOUS_SCREEN";
  // CURRENT_URL 세션값의 키상수
  public static final String CURRENT_URL="tpms.framework.core.comm.CURRENT_URL";
  // PREVIOUS_URL 세션값의 키상수
  public static final String PREVIOUS_URL="tpms.framework.core.comm.PREVIOUS_URL";
  // URL_MAPPINGS 세션값의 키상수
  public static final String URL_MAPPINGS="tpms.framework.core.comm.URL_MAPPINGS";
  // SERVICE_MAPPINGS 세션값의 키상수
  public static final String SERVICE_MAPPINGS="tpms.framework.core.comm.SERVICE_MAPPINGS";
  // EVENT_MAPPINGS 세션값의 키상수
  public static final String EVENT_MAPPINGS="tpms.framework.core.comm.EVENT_MAPPINGS";
  // MISSING_FORM_DATA 세션값의 키상수
  public static final String MISSING_FORM_DATA="tpms.framework.core.comm.MISSING_FORM_DATA";
  // SERVER_TYPE 세션값의 키상수
  public static final String SERVER_TYPE="tpms.framework.core.comm.SERVER_TYPE";
  // LOCALE 세션값의 키상수
  public static final String LOCALE="tpms.framework.core.comm.LOCALE";
  // WEB_CONTROLLER 세션값의 키상수
  public static final String WEB_CONTROLLER="tpms.framework.core.comm.WEB_CLIENT_CONTROLLER";
  // EJB_CONTROLLER 세션값의 키상수
  public static final String EJB_CONTROLLER="tpms.framework.core.comm.EJB_CLIENT_CONTROLLER ";
  // EXCEPTION_OBJECT 세션값의 키상수
  public static final String EXCEPTION_OBJECT="tpms.framework.core.comm.EXCEPTION_OBJECT      ";

  // 메뉴조회 결과 세션값의 키상수
  public static final String MENU_EVENT_RESPONSE="MenuEventResponse";
  // 메뉴 서블릿 세션값의 키상수
  public static final String PROGRAM_COLLECTION="tpms.framework.core.comm.ProgList";
  // 메뉴조회 결과 컨텍스트 세션값의 키상수
  public static final String MENU_EVENT_RESPONSE_CONTEXT="tpms.framework.core.comm.MenuEventResponse";

  public static final String PREVIOUS_REQUEST_PARAMETERS="tpms.framework.core.waf.PREVIOUS_REQUEST_PARAMETERS";
  public static final String PREVIOUS_REQUEST_ATTRIBUTES="tpms.framework.core.waf.PREVIOUS_REQUEST_ATTRIBUTES";

}
