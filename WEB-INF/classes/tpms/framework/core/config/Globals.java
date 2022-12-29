package tpms.framework.core.config;

import java.io.Serializable;

/**
 *  프레임웍 정의 상수 정의
 */
public class Globals
    implements Serializable
{

    //업무 시나리오 클래스 지정을 위한 xml 파일 위치
    public static final String ACTION_MAPPINGS = "/WEB-INF/mappings.xml";
    //화면 지정을 위한 xml 파일 위치
    public static final String SCREEN_MAPPINGS = "/WEB-INF/screendefinitions_";
    //보호자원 지정을 위한 xml 파일 위치
    public static final String SIGNON_CONFIG = "/WEB-INF/signon-config.xml";
    public static final boolean isDo = true;
    public static final String FRAMEWORK_CONFIG = "/WEB-INF/framework-config.xml";
    //로그 지정을 위한 xml 파일 위치
    public static final String LOG4J_CONFIG_XML = "log4jProperties.xml";
    public static final String TRANSACTION_TOKEN_KEY = "tpms.framework.transaction.TOKEN";
    public static final String TOKEN_KEY = "TOKEN";
    public static final String IS_TRANSACTION = "tpms.framework.isTransaction";

    public Globals()
    {
    }
}
