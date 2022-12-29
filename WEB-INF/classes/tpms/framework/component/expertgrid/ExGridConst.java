package tpms.framework.component.expertgrid;

/** ****************************************************************************
* ExGrid ��� Ŭ����
* @version   1.0
* @author    2005.6.9 <A href="mailto:javapark@empal.com">yong il park</A>
**************************************************************************** */

public class ExGridConst {

    /** ************************************************************************
     * �⺻�Ķ���
     ************************************************************************ */
    // Ʈ����� ���࿩��
    public static final String IB_CRUD_DIV = "IB_CRUD_DIV"; // R:��ȸ, T:����

    // ����ó������
    public static final String IB_RESULT   = "IB_RESULT"; // 00:����ó������, 01:�׿�

    // �޽��� �߻����� ����
    public static final String IB_COMM_MSG = "ExGridCommMsg";
    public static final String IB_PORC_MSG = "ExGridProcMsg";
    public static final String IB_ACTN_MSG = "ExGridActnMsg";

    // Result ��� ��Ʈ�� �ε��� Index ����
    public static final String COL_IDX  = "ExGridColumnIndex";

    // Result ��� ��Ʈ�� �ε��� Index ����
    public static final String TREE_IDX = "ExGridTreeLevel";

    /** ************************************************************************
     * Result DataSet ������ : ������,����,col�и�,row�и�
     ************************************************************************ */
    public static final byte[] b_sdiv = {28};
    public static final byte[] b_ediv = {29};
    public static final byte[] b_bcol = {26};
    public static final byte[] b_brow = {27};

    public static final String STTDIV = new String(b_sdiv); // ��ȸ:'<SHEET>'  ����:'<RESULT>'
    public static final String ENDDIV = new String(b_ediv); // ��ȸ:'</SHEET>' ����:'</RESULT>'
    public static final String COLDIV = new String(b_bcol);
    public static final String ROWDIV = new String(b_brow);

    // JavaScript��
    public static final String J_STT = "/" + STTDIV + "/g";
    public static final String J_END = "/" + ENDDIV + "/g";
    public static final String J_COL = "/" + COLDIV + "/g";
    public static final String J_ROW = "/" + ROWDIV + "/g";

    /** ************************************************************************
     * ETC-DATA ������ : ������,����,ETC NAME������,ETC NAME����,row�и�
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

    // javascript �� ETC-DATA ������
    public static final String J_ETC_STT = "/" + ETC_STT + "/g";
    public static final String J_ETC_END = "/" + ETC_END + "/g";
    public static final String J_ETC_NMS = "/" + ETC_NMS + "/g";
    public static final String J_ETC_NME = "/" + ETC_NME + "/g";
    public static final String J_ETC_ROW = "/" + ETC_ROW + "/g";

    /** ************************************************************************
     * NONEDATA ������
     ************************************************************************ */
    public static final byte[] b_noneData = {24};
    public static final String NONEDATA  = new String(b_noneData);
    public static final String J_NONE  = "/" + NONEDATA + "/g";

    /** ************************************************************************
     * TREE�� Level ������
     ************************************************************************ */
    public static final byte[] b_tdiv   = {16};
    public static final String TREDIV   = new String(b_tdiv);
    public static final String J_TREDIV = "/" + TREDIV + "/g";

    /** ************************************************************************
     * XML DATA ������
     ************************************************************************ */
    public static final String XML_DIV  = "|!|";
    public static final String J_XML_DIV  = "/" + XML_DIV + "/g";
}

