package tpms.framework.component.expertgrid;

import java.io.Serializable;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


import tpms.framework.component.dao.DbResultSet;

/** ****************************************************************************
 * Xml문자열을 담아내는 Entity Object
 * @version   1.0
 * @author    2005.6.9 <A href="mailto:javapark@empal.com">yong il park</A>
 **************************************************************************** */

public class ExGridEtt implements Serializable, Cloneable {

    private List sheetList;
    private String strXml;

    public ExGridEtt() {
        this.sheetList = new ArrayList();
    }

    /** **********************************************
     * 메시지 전달을 위한 Xml문자열 Set 추가
     * @param   msg     내용
     *********************************************** */
    public void addSheet(String msg) throws SQLException {
        if ( this.sheetList == null ) {
            this.sheetList = new ArrayList();
            ExGridXmlEtt ett = new ExGridXmlEtt(msg);
            this.sheetList.add(ett);
        } else {
            this.getExGridXmlEtt(0).putEtc(ExGridConst.IB_ACTN_MSG,msg);
        }
    }

    /** **********************************************
     * 메시지 전달을 위한 Xml문자열 Set 추가
     * @param   point   에러발생지점 또는 기타정보
     * @param   msg     내용
     *********************************************** */
    public void addSheet(String tmpPoint, String tmpMsg) throws SQLException {
        String point = StrUtil.isNull(tmpPoint,"");
        String msg = StrUtil.isNull(tmpMsg,"");
        if ( this.sheetList == null ) {
            this.sheetList = new ArrayList();
            ExGridXmlEtt ett = new ExGridXmlEtt(point,msg);
            this.sheetList.add(ett);
        } else {
            this.getExGridXmlEtt(0).putEtc(point,msg);
        }
    }

    /** **********************************************
     * 메시지(key,param) 전달을 위한 Xml문자열 Set 추가
     * @param   key     메시지 key
     * @param   args    메시지 파라미터
     *********************************************** */
    public void addSheet(String point, String key, Object[] args) throws SQLException {
        String tmpMsg = ""; // this.context.getMessage(key, args);
        if ( this.sheetList == null ) {
            this.sheetList = new ArrayList();
            ExGridXmlEtt ett = new ExGridXmlEtt(point,tmpMsg);
            this.sheetList.add(ett);
        } else {
            this.getExGridXmlEtt(0).putEtc(point,tmpMsg);
        }

    }

    /** **********************************************
     * ResultSet 전달을 위한 Xml문자열 Set 추가
     * Xml문자열(ResultSet) Set 추가
     * @param   rs      ResultSet
     *********************************************** */
    public void addSheet(ResultSet rs) throws SQLException {
        ExGridXmlEtt ett = new ExGridXmlEtt(rs);
        this.sheetList.add(ett);
    }

    /** **********************************************
     * ResultSet 전달을 위한 Xml문자열 Set 추가
     * @param   rs      ResultSet
     * @param   colIdx  column 세팅 순서
     *********************************************** */
    public void addSheet(ResultSet rs, String colIdx) throws SQLException {
        ExGridXmlEtt ett = new ExGridXmlEtt(rs, colIdx);
        this.sheetList.add(ett);
    }

    /** **********************************************
     * ResultSet 전달을 위한 Xml문자열 Set 추가
     * Process단에서 Etc데이타 설정 경우
     * @param   rs      ResultSet
     * @param   xmlEtc  column 세팅 순서, 총카운트, 히든값 등
     *********************************************** */
    public void addSheet(ResultSet rs, Map xmlEtc) throws SQLException {
        ExGridXmlEtt ett = new ExGridXmlEtt(rs, xmlEtc);
        this.sheetList.add(ett);
    }

    /** **********************************************
     * DbResultSet 전달을 위한 Xml문자열 Set 추가
     * Process단에서 Etc데이타 설정 경우
     * @param   dbRs    DbResultSet
     * @param   xmlEtc  column 세팅 순서, 총카운트, 히든값 등
     *********************************************** */
    public void addSheet(DbResultSet dbRs, Map xmlEtc) throws SQLException {
        ExGridXmlEtt ett = new ExGridXmlEtt(dbRs, xmlEtc);
        this.sheetList.add(ett);
    }

    /** **********************************************
     * Action단 또는 Process단에서 Etc데이타 설정
     * @param   sheetIndex  Etc데이타 설정대상
     * @param   name        Etc데이타명
     * @param   value       Etc데이타값
     *********************************************** */
    public void addEtcData(int sheetIndex, String name, String value) throws SQLException {
        ExGridXmlEtt empEtt = null;
        if( sheetIndex < this.getSize()){
            empEtt = (ExGridXmlEtt) this.sheetList.get(sheetIndex);
            empEtt.putEtc(name, value);
        }
    }

    /** **********************************************
     * 담겨진 ExGridXmlEtt Set 개수
     * @return  int     Set 개수
     *********************************************** */
    public int getSize() {
        int size = 0;
        if( this.sheetList != null ) size = this.sheetList.size();
        return size;
    }

    /** **********************************************
     * 하나의 ExGridXmlEtt(Xml문자열Set) 추출
     * @param   i       Index
     * @return  String  Xml문자열 Set
     *********************************************** */
    public ExGridXmlEtt getExGridXmlEtt(int i) {
        ExGridXmlEtt empEtt = null;
        if( this.getSize() > i){
            empEtt = (ExGridXmlEtt) this.sheetList.get(i);
        }
        return empEtt;
    }

    /** **********************************************
     * 담겨진 모든 ExGridXmlEtt을 Xml문자열로 반환
     * @return  List    Xml문자열 Sets
     *********************************************** */
    public String getXmlString() {
        this.setXmlString();
        return this.strXml;
    }

    /** **********************************************
     * 담겨진 모든 ExGridXmlEtt을 Xml문자열로 설정
     *********************************************** */
    public void setXmlString() {

        StringBuffer buff = new StringBuffer();

        try {
            if( this.getSize() > 0) {
                for(int i=0; i < this.getSize(); i++){
                    // 1.기본데이타
                    buff.append( (String) this.getExGridXmlEtt(i).getXml() );
                    // 2.ETC데이타
                    buff.append( (String) this.getExGridXmlEtt(i).getXmlEtc() );
                    // 4.Xml문자열Set 구분자
                    if ( i != (this.getSize()-1) ) buff.append(ExGridConst.XML_DIV);
                }
                this.sheetList = null;
            }
        } catch (Exception e) { // java.io.NotSerializableException
            e.printStackTrace();
        }

        this.strXml = StrUtil.isNull(buff.toString(), "");
    }

    /** **********************************************
     * 담겨진 모든 ExGridXmlEtt 초기화한다. 에러발생시 사용
     *********************************************** */
    public void setRsNull() {
        this.sheetList = null;
    }

    /** **********************************************
     * 지정 ExGridXmlEtt 초기화한다. 에러발생시 사용
     *********************************************** */
    public void setRsNull(int sheetIndex) {
        if( sheetIndex < this.getSize() )
            this.sheetList.remove(sheetIndex);
    }

}
