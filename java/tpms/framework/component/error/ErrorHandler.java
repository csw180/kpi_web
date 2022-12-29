package tpms.framework.component.error;

import tpms.framework.component.dao.DAOException;
import tpms.framework.component.util.JStringTokenizer;
import java.sql.SQLException;
import java.util.NoSuchElementException;

public final class ErrorHandler
{
  private final static String DELIMITER="<||>";
  private String type;
  private String code;
  private String userMessage;
  private String debugMessage;

  /** @link dependency */
  /*# MessageLoader lnkMessageLoader; */

  public ErrorHandler(String type,String code,String userMessaege,String debugMessage) {
    this.type=type;
    this.code=code;
    this.userMessage=userMessage;
    this.debugMessage=debugMessage;
  }

  /**
   *  생성자
   */
  public ErrorHandler() {}

  /**
   * 생성자
   */
  public ErrorHandler(String code) {
    MessageLoader ml=null;
    if (code !=null && code.startsWith("3")) {
        this.type=ErrorType.FRA;
        ml=MessageLoader.getInstance(MessageLoader.LOADER_OF_PROPERTY);
    }else{
        this.type=ErrorType.USR;
        ml=MessageLoader.getInstance();
    }
    this.code=code;
    this.userMessage=ml.getMessage(code);
    this.debugMessage="";
  }


  /**
   * 생성자
   */
  public ErrorHandler(String code,String debugMessage) {
    MessageLoader ml=null;
    if (code !=null && code.startsWith("3")) {
        this.type=ErrorType.FRA;
        ml=MessageLoader.getInstance(MessageLoader.LOADER_OF_PROPERTY);
        this.userMessage=ml.getMessage(code)+debugMessage;
    }else{
        this.type=ErrorType.USR;
        ml=MessageLoader.getInstance();
        this.userMessage=ml.getMessage(code);
        this.debugMessage=debugMessage;
    }
    this.code=code;


  }

  /**
   * 생성자
   */
  public ErrorHandler(SQLException se) {
    type=ErrorType.ORA;
    code=String.valueOf(se.getErrorCode());
    debugMessage=se.getMessage();

    /*
        1: 중복에러
      904: 컬럼이름이 없음
      918: 컬럼이름이 모호함
      942: 테이블이 없음
     */
    String userMessage=null;
    switch (se.getErrorCode()) {
      case 1:
        userMessage=MessageLoader.getInstance().getMessage("50001");
        break;
      case 904:
        userMessage=MessageLoader.getInstance().getMessage("50904");
        break;
      case 918:
        userMessage=MessageLoader.getInstance().getMessage("50918");
        break;
      case 942:
        userMessage=MessageLoader.getInstance().getMessage("50942");
        break;
      default:
        userMessage=MessageLoader.getInstance().getMessage("59999");
        break;
    }
    this.userMessage=userMessage;
  }

  /**
   * 생성자
   */
  public ErrorHandler(Exception ex) {

    unmarshal(ex.getMessage());
  }

  public String getType() {
    return type;
  }

  public String getCode() {
    return code;
  }

  public String getUserMessage() {
    return userMessage;
  }

  public String getDebugMessage() {
    return debugMessage;
  }

  public String loadPopupMessage() {
    return loadPopupMessage("1");
  }

  /**
   * 에러 메세지가 정의된 클래스를 로딩한다.
   */
  public String loadPopupMessage(String btnCnt) {
    /*
          return
              "  window.showModalDialog ('MsgDiag.screen?"
     + "type=" + type
     + "&userMessage=" + URLEncoder.encode(userMessage)
     + "&debugMessage=" + URLEncoder.encode(debugMessage)
     + "&btncnt=" + btnCnt
     + "', '', 'dialogHeight:230px;dialogWidth:415px;status:no; help:no;')";
     */
    /*
             return "alert("
            + "'에러타입=" + type
            + "\n에러메시지=" + userMessage
            + "\n상세에러메시지=" + debugMessage
            + "');";
     */

    return ("에러타입:"+type
            +" 에러메시지:"+userMessage
            +" 상세에러메시지:"+debugMessage).replace('\n',' ');

  }

  public String getMessage() {
    return marshal();
  }

  /**
   * errorHandler의 property들을 key와 value의 쌍으로 리턴한다.
   */
  private String marshal() {
    return type+DELIMITER+code+DELIMITER+userMessage+DELIMITER+debugMessage;
  }

  /**
   * error message의 String을 받아 error handler property에 설정한다.
   */
  private void unmarshal(String message) {
    JStringTokenizer jst=new JStringTokenizer(message,DELIMITER,false,true);
    try {
      type=jst.nextToken();
      code=jst.nextToken();
      userMessage=jst.nextToken();
      debugMessage=jst.nextToken();
    } catch (NoSuchElementException nsee) {
      type=ErrorType.GEN;
      code="99999";
      userMessage="";
      debugMessage=message;
      // nsee.printStackTrace();
    }
  }

  public String toString() {
    return "type = "+type+"\n"+
        "code = "+code+"\n"+
        "userMessage = "+userMessage+"\n"+
        "debugMessage = "+debugMessage;
  }

  /**
   *  에러 타입에 대한 내부 클래스
   */
  static class ErrorType
  {
    public static final String USR="USR";
    public static final String EAI="EAI";
    public static final String WF="WF";
    public static final String ORA="ORA";
    public static final String APP="APP";
    public static final String GEN="GEN";
    public static final String FRA="FRA";

  }

  public static void main(String[] argv) {
//        System.out.println("message = " + new ErrorHandler("70042").getMessage());
//        System.out.println(new ErrorHandler("70042").loadPopupMessage());
//        ErrorHandler eh = new ErrorHandler("70041");
//        System.out.println(eh.toString());
//        System.out.println(MessageLoader.getInstance().getMessage("70042"));

      /*
    try {
      System.out.println("hi");
      throw new DAOException(new ErrorHandler("70042").getMessage());
    } catch (Exception ex) {
      ErrorHandler handler=new ErrorHandler(ex);
      System.out.println(handler.loadPopupMessage());
      System.out.println(handler.toString());
    }
      */
    try {
      System.out.println("hi");
      throw new DAOException(new ErrorHandler("30202").getMessage());
    } catch (Exception ex) {
      ErrorHandler handler=new ErrorHandler(ex);
      System.out.println(handler.loadPopupMessage());
      System.out.println(handler.toString());
      System.out.println( new ErrorHandler("30202","debug").getUserMessage());
    }

  }


}
