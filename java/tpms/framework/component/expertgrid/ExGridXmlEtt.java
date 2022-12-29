package tpms.framework.component.expertgrid;

import java.io.Serializable;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import tpms.framework.component.dao.DbResultSet;

/** ****************************************************************************
 * Xml 문자열 Set Entity
 * @version   1.0
 * @author    2005.6.9 <A href="mailto:javapark@empal.com">yong il park</A>
 **************************************************************************** */

public class ExGridXmlEtt implements Serializable, Cloneable {

    private String xml;
    private String xmlEtc;
    private Map etcMap  = new HashMap();
    private Map procMap = new HashMap();

    /** **********************************************
     * 조회 : 데이타가 없거나 에러발생시 메시지 전달
     * 저장 : 에러발생시 메시지 전
     * @param   msg     내용
     * @return  String  xml문자열
     *********************************************** */
    public ExGridXmlEtt(String msg) throws SQLException {
		this("",msg);
    }

    /** **********************************************
     * 조회 : 데이타가 없거나 에러발생시 메시지 전달
     * 저장 : 에러발생시 메시지 전
     * @param   point   에러발생지점 또는 기타정보
     * @param   msg     내용
     * @return  String  xml문자열
     *********************************************** */
    public ExGridXmlEtt(String point, String msg) throws SQLException {
        this.etcMap.put(StrUtil.isNull(point, ExGridConst.IB_COMM_MSG), msg);
        this.xml = ExGridUtil.toRsXML(msg);
   }

    /** **********************************************
     * 조회 : 데이타가 없거나 에러발생시 메시지 전달
     * 저장 : 에러발생시 메시지 전
     * @param   context context정보
     * @param   key     메시지 key
     * @param   args    메시지 파라미터
     * @return  String  xml문자열
     *********************************************** */
    public ExGridXmlEtt(String point, String key, Object[] args) throws SQLException {
        String tmpMsg = ""; // this.context.getMessage(key, args);
        this.etcMap.put(StrUtil.isNull(point, ExGridConst.IB_COMM_MSG), tmpMsg);
        this.xml = ExGridUtil.toRsXML( tmpMsg );
    }

    /** **********************************************
     * ResultSet을 XML문자형으로 변환한다
     * <pre>
     * ResultSet rs  = pstmt.executeQuery();
     * String strXM = ExGridUtil.toRsXML(rs);
     * </pre>
     * @param   context context정보
     * @param   rs      원본 ResultSet
     * @return  String  xml문자열
     *********************************************** */
    public ExGridXmlEtt(ResultSet rs) throws SQLException {
        this(rs, "");
    }

    /** **********************************************
     * ResultSet을 XML문자형으로 변환한다
     * <pre>
     * ResultSet rs  = pstmt.executeQuery();
     * String colIdx = "4|1|2|7|8";
     * String strXM = ExGridUtil.toRsXML(rs,colIdx);
     * </pre>
     * @param   context context정보
     * @param   rs      원본 ResultSet
     * @param   colIdx  column 세팅 순서
     * @return  String  xml문자열
     *********************************************** */
    public ExGridXmlEtt(ResultSet rs, String ExGridColumnIndex) throws SQLException {
        String tmpMsg = ""; // this.context.getMessage("SYSTEM_ERROR", null);
        
        if(!"".equals(StrUtil.isNull(ExGridColumnIndex, "")))
        	this.putEtc(ExGridConst.COL_IDX, ExGridColumnIndex);

        try {
            this.xml = ExGridUtil.toRsXML(rs, ExGridColumnIndex);
        } catch (Exception e) {
            this.xml = ExGridUtil.toRsXML( tmpMsg );
         }
    }

    /** **********************************************
     * ResultSet을 XML문자형으로 변환한다
     * <pre>
     * ResultSet rs  = pstmt.executeQuery();
     * Map xmlEtc = new HashMap();
     * String strXM = ExGridUtil.toRsXML(rs,xmlEtc);
     * </pre>
     * @param   context context정보
     * @param   rs      원본 ResultSet
     * @param   xmlEtc  column 세팅 순서, 총카운트, 히든값 등
     * @return  String  xml문자열
     *********************************************** */
    public ExGridXmlEtt(ResultSet rs, Map xmlEtc ) throws SQLException {
        String tmpMsg = ""; // this.context.getMessage("SYSTEM_ERROR", null);
        this.procMap.putAll(xmlEtc);

        try {
            this.xml = ExGridUtil.toRsXML(rs, xmlEtc);
        } catch (Exception e) {
            this.xml = ExGridUtil.toRsXML( tmpMsg );
        }
    }

    /** **********************************************
     * TaoResult을 XML문자형으로 변환한다
     * <pre>
     * TaoResult rs = con.execute(TSN, input);
     * Map xmlEtc = new HashMap();
     * </pre>
     * @param   context context정보
     * @param   rs      원본 TaoResult
     * @param   xmlEtc  column 세팅 순서, 총카운트, 히든값 등
     * @return  String  xml문자열
     *********************************************** */
    public ExGridXmlEtt(DbResultSet dbRs, Map xmlEtc ) throws SQLException {
        String tmpMsg = ""; // this.context.getMessage("SYSTEM_ERROR", null);
        this.procMap.putAll(xmlEtc);

        try {
            this.xml = ExGridUtil.toDbRsXML(dbRs, xmlEtc);
        } catch (Exception e) {
            this.xml = ExGridUtil.toRsXML( tmpMsg );
        }
    }

    /** **********************************************
     * 1.기본데이타 XML문자열 리턴
     * @return  String  xml문자열
     *********************************************** */
    public String getXml() {
        return this.xml;
    }

    /** **********************************************
     * 2.Etc 데이타 XML문자열 리턴
     * @return  String  xml문자열
     *********************************************** */
    public String getXmlEtc() {

        StringBuffer bf = new StringBuffer();

        if( (this.etcMap.size() + this.procMap.size()) > 0 ){

            bf.append(ExGridConst.ETC_STT);
            // process단에서 설정한 map정보
            if( this.procMap.size() > 0 ){
                bf.append(ExGridUtil.mapToIBString(this.procMap));
            }
            // action단에서 설정한 map정보
            if( this.etcMap.size() > 0 ){
                bf.append(ExGridUtil.mapToIBString(this.etcMap));
            }
            bf.append(ExGridConst.ETC_END);
        }

        return bf.toString();
    }

    /** **********************************************
     * Etc 데이타용 Map정보 설정
     * @param   name
     * @param   value
     *********************************************** */
    public void putEtc(String name, String value) {
        this.etcMap.put(name, value);
    }



}