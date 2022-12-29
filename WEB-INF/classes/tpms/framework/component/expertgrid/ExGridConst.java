package tpms.framework.component.expertgrid;

/** ****************************************************************************
* ExGrid 상수 클래스
* @version   1.0
* @author    2005.6.9 <A href="mailto:javapark@empal.com">yong il park</A>
**************************************************************************** */

public class ExGridConst {

    /** ************************************************************************
     * 기본파람명
     ************************************************************************ */
    // 트랜잭션 수행여부
    public static final String IB_CRUD_DIV = "IB_CRUD_DIV"; // R:조회, T:저장

    // 정상처리여부
    public static final String IB_RESULT   = "IB_RESULT"; // 00:정상처리여부, 01:그외

    // 메시지 발생지점 구분
    public static final String IB_COMM_MSG = "ExGridCommMsg";
    public static final String IB_PORC_MSG = "ExGridProcMsg";
    public static final String IB_ACTN_MSG = "ExGridActnMsg";

    // Result 결과 시트에 로딩시 Index 지정
    public static final String COL_IDX  = "ExGridColumnIndex";

    // Result 결과 시트에 로딩시 Index 지정
    public static final String TREE_IDX = "ExGridTreeLevel";

    /** ************************************************************************
     * Result DataSet 구분자 : 시작점,끝점,col분리,row분리
     ************************************************************************ */
    public static final byte[] b_sdiv = {28};
    public static final byte[] b_ediv = {29};
    public static final byte[] b_bcol = {26};
    public static final byte[] b_brow = {27};

    public static final String STTDIV = new String(b_sdiv); // 조회:'<SHEET>'  저장:'<RESULT>'
    public static final String ENDDIV = new String(b_ediv); // 조회:'</SHEET>' 저장:'</RESULT>'
    public static final String COLDIV = new String(b_bcol);
    public static final String ROWDIV = new String(b_brow);

    // JavaScript용
    public static final String J_STT = "/" + STTDIV + "/g";
    public static final String J_END = "/" + ENDDIV + "/g";
    public static final String J_COL = "/" + COLDIV + "/g";
    public static final String J_ROW = "/" + ROWDIV + "/g";

    /** ************************************************************************
     * ETC-DATA 구분자 : 시작점,끝점,ETC NAME시작점,ETC NAME끝점,row분리
     ************************************************************************ */
    public static final byte[] b_etc_stt = {1};
    public static final byte[] b_etc_end = {2};
    public static final byte[] b_etc_nms = {3};
    public static final byte[] b_etc_nme = {4};
    public static final byte[] b_etc_row = {18};

    public static final String ETC_STT  = new String(b_etc_stt);
    public static final String ETC_END  = new String(b_etc_end);
    public static final String ETC_NMS  = new String(b_etc_nms);
    public static final String ETC_NME  = new String(b_etc_nme);
    public static final String ETC_ROW  = new String(b_etc_row);

    // javascript 용 ETC-DATA 구분자
    public static final String J_ETC_STT = "/" + ETC_STT + "/g";
    public static final String J_ETC_END = "/" + ETC_END + "/g";
    public static final String J_ETC_NMS = "/" + ETC_NMS + "/g";
    public static final String J_ETC_NME = "/" + ETC_NME + "/g";
    public static final String J_ETC_ROW = "/" + ETC_ROW + "/g";

    /** ************************************************************************
     * NONEDATA 구분자
     ************************************************************************ */
    public static final byte[] b_noneData = {24};
    public static final String NONEDATA  = new String(b_noneData);
    public static final String J_NONE  = "/" + NONEDATA + "/g";

    /** ************************************************************************
     * TREE의 Level 구분자
     ************************************************************************ */
    public static final byte[] b_tdiv   = {16};
    public static final String TREDIV   = new String(b_tdiv);
    public static final String J_TREDIV = "/" + TREDIV + "/g";

    /** ************************************************************************
     * XML DATA 구분자
     ************************************************************************ */
    public static final String XML_DIV  = "|!|";
    public static final String J_XML_DIV  = "/" + XML_DIV + "/g";
}

