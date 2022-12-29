package tpms.framework.component.expertgrid;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import tpms.framework.component.dao.DbResultSet;

/** ****************************************************************************
 * Converting to Xml(Message, ResultSet)
 * @version   1.0
 * @author    2005.6.9 <A href="mailto:javapark@empal.com">yong il park</A>
 **************************************************************************** */

public class ExGridUtil
{
    /** **********************************************
     * 조회 : 데이타가 없거나 에러발생시 메시지 전달
     * 저장 : 에러발생시 메시지 전
     * <pre>
     * ResultSet rs  = pstmt.executeQuery();
     * String strXM = ExGridUtil.toRsXML(rs);
     * </pre>
     * @param   msg     메시지
     * @return  String  xml문자열
     *********************************************** */
    public static String toRsXML(String msg) throws SQLException {
        Map tmpMap = null;
        return toRsXML(null, tmpMap);
    }

    /** **********************************************
     * ResultSet을 XML문자형으로 변환한다
     * <pre>
     * ResultSet rs  = pstmt.executeQuery();
     * String strXM = ExGridUtil.toRsXML(rs);
     * </pre>
     * @param   rs      원본 ResultSet
     * @return  String  xml문자열
     *********************************************** */
    public static String toRsXML(ResultSet rs) throws SQLException {
        Map tmpMap = null;
        return toRsXML(rs, tmpMap);
    }

    /** **********************************************
     * ResultSet을 XML문자형으로 변환한다
     * <pre>
     * ResultSet rs  = pstmt.executeQuery();
     * String strXM = ExGridUtil.toRsXML(rs,colIdx);
     * </pre>
     * @param   rs      원본 ResultSet
     * @param   colIdx    column 세팅 순서
     * @return  String  xml문자열
     *********************************************** */
    public static String toRsXML(ResultSet rs, String colIdx) throws SQLException {
        Map tmpMap = new HashMap();
        
		if(!"".equals(StrUtil.isNull(colIdx, "")))
        	tmpMap.put(ExGridConst.COL_IDX, colIdx);
        	
        return toRsXML(rs, tmpMap);
    }

    /** **********************************************
     * ResultSet을 XML문자형으로 변환한다
     * <pre>
     * ResultSet rs  = pstmt.executeQuery();
     * String colIdx = "4|0|0|0|1|2|7|8";('0'인 경우는 빈 td)
     * String levelIdx = "2"; (rs의 두번째 인자값이 level)
     * String strXM = ExGridUtil.toRsXML(rs,colIdx,levelIdx);
     * </pre>
     * @param   rs        원본 ResultSet
     * @param   colIdx    column 세팅 순서
     * @param   levelIdx  tree level 세팅
     * @return  String    xml문자열
     *********************************************** */
    public static String toRsXML(ResultSet rs, Map tmpMap) throws SQLException
    {
        StringBuffer xml = new StringBuffer();
        try {
            //1.조회칼럼 순서조정
            //  1-1.단일라인
            //  1-2.다중라인
            //2.트리조회 설정
            String[] colArr = null;
            String levelIdx = "";

            if( tmpMap == null ) {
                colArr = new String[1];
                colArr[0] = "";
            } else {
                for( Iterator it = tmpMap.keySet().iterator(); it.hasNext(); ) {
                    String etcNm = (String)it.next();
                    Object o = null;
                    etcNm = StrUtil.isNull(etcNm, "");

                    // ExGridConst.COL_IDX
                    if( etcNm.equals(ExGridConst.COL_IDX) ){
                        o = tmpMap.get(etcNm);
                        if ( o instanceof String ) {
                            colArr = new String[1];
                            colArr[0] = (String)o;
                        } else if ( o instanceof String[] ) {
                            colArr = (String[])o;
                        }

                    // ExGridConst.TREE_IDX
                    } else if( etcNm.equals(ExGridConst.TREE_IDX) ){
                        o = tmpMap.get(etcNm);
                        if ( o instanceof String ) {
                            levelIdx = StrUtil.isNull((String)o, "");
                        }
                    }
                }
            }

            if (colArr == null) {
                colArr = new String[1];
                colArr[0] = "";
            }

            // 기본 데이타 세팅
            xml.append( ExGridConst.STTDIV );

            if( rs == null ){
                xml.append(ExGridConst.NONEDATA);

            } else {
                ResultSetMetaData rsmd = rs.getMetaData();
                int colCount = rsmd.getColumnCount();
                int[] idxArr = null;
                String[] tmpIdx = null;

                String colIdx = "";

                while (rs.next())
                {
                    for (int iLine = 0; iLine < colArr.length; iLine++)
                    {
                        colIdx = colArr[iLine];
                        // 조회칼럼순서조정
                        if("".equals(colIdx)){
                            idxArr = new int[colCount];
                            for(int i=0; i<colCount; i++)
                                idxArr[i] = i+1;
                        } else {
                            tmpIdx = StrUtil.split(colIdx,"|");
                            idxArr = new int[tmpIdx.length];
                            for(int i=0; i<tmpIdx.length; i++){
                                tmpIdx[i] = StrUtil.isNull(tmpIdx[i],"0");
                                idxArr[i] = StrUtil.parseInt((tmpIdx[i]).trim(),0);
                            }
                        }

                        for (int i = 0; i < idxArr.length; i++)
                        {
                            // 화면단의 [순번],[상태],[삭제],[완전삭제] : 0으로 설정
                            if( idxArr[i] != 0 ){
                                Object value = rs.getObject(idxArr[i]);
                                if (value != null)
                                {
                                    xml.append(value.toString().trim());
                                }
                            }
                            if( !"".equals(StrUtil.isNull(levelIdx, "")) && i == 0 ){
                                xml.append(ExGridConst.TREDIV);
                            } else {
                                xml.append(ExGridConst.COLDIV);
                            }
                        }
                        xml.append(ExGridConst.ROWDIV);
                    }
                }
            }
            xml.append( ExGridConst.ENDDIV );

            // 3.Etc 데이타 세팅
            // ExGridXmlEtt의 getXmlEtc에서 처리

        } catch (Exception e) {
            e.printStackTrace();
        }
        return xml.toString();
    }

    /** **********************************************
     * DbResultSet을 XML문자형으로 변환한다
     * <pre>
     * DbResultSet dbRs = null;
     * String colIdx = "4|0|0|0|1|2|7|8";('0'인 경우는 빈 td)
     * String levelIdx = "2"; (rs의 두번째 인자값이 level)
     * </pre>
     * @param   dbRs        원본 DbResultSet을
     * @param   colIdx    column 세팅 순서
     * @param   levelIdx  tree level 세팅
     * @return  String    xml문자열
     *********************************************** */
    public static String toDbRsXML(DbResultSet dbRs, Map tmpMap) throws SQLException
    {
        StringBuffer xml = new StringBuffer();

        try {
            //1.조회칼럼 순서조정
            //  1-1.단일라인
            //  1-2.다중라인
            //2.트리조회 설정
            String[] colArr = null;
            String levelIdx = "";

            if( tmpMap == null ) {
                colArr = new String[1];
                colArr[0] = "";
            } else {
                for( Iterator it = tmpMap.keySet().iterator(); it.hasNext(); ) {
                    String etcNm = (String)it.next();
                    Object o = null;
                    etcNm = StrUtil.isNull(etcNm, "");

                    // ExGridConst.COL_IDX
                    if( etcNm.equals(ExGridConst.COL_IDX) ){
                        o = tmpMap.get(etcNm);
                        if ( o instanceof String ) {
                            colArr = new String[1];
                            colArr[0] = (String)o;
                        } else if ( o instanceof String[] ) {
                            colArr = (String[])o;
                        }

                    // ExGridConst.TREE_IDX
                    } else if( etcNm.equals(ExGridConst.TREE_IDX) ){
                        o = tmpMap.get(etcNm);
                        if ( o instanceof String ) {
                            levelIdx = StrUtil.isNull((String)o, "");
                        }
                    }
                }
            }

            if (colArr == null) {
                colArr = new String[1];
                colArr[0] = "";
            }

            // 기본 데이타 세팅
            xml.append( ExGridConst.STTDIV );

            if( dbRs == null ){
                xml.append(ExGridConst.NONEDATA);

            } else {

                int colCount = colArr.length;
                String[] idxArr = null;
                String[] tmpIdx = null;

                String colIdx = "";

                dbRs.first();

                while( dbRs.next() ) {

                    for (int iLine = 0; iLine < colArr.length; iLine++)
                    {
                        colIdx = colArr[iLine];
                        // 조회칼럼순서조정
                        if(!"".equals(colIdx)){
                            tmpIdx = StrUtil.split(colIdx,"|");
                            idxArr = new String[tmpIdx.length];
                            for(int i=0; i<tmpIdx.length; i++){
                                tmpIdx[i] = StrUtil.isNull(tmpIdx[i],"0");
                                idxArr[i] = StrUtil.isNull((tmpIdx[i]).trim(),"0");
                            }
                        }

                        for (int i = 0; i < idxArr.length; i++)
                        {
                            // 화면단의 [순번],[상태],[삭제],[완전삭제] : 0으로 설정
                            if( !"0".equals(idxArr[i]) ){
								String value = StrUtil.isNull(dbRs.getString(idxArr[i]), "");
 
                                if (value != null)
                                {
                                    xml.append(value.trim());
                                }
                            }
                            if( !"".equals(StrUtil.isNull(levelIdx, "")) && i == 0 ){
                                xml.append(ExGridConst.TREDIV);
                                xml.append(ExGridConst.COLDIV);
                            } else {
                                xml.append(ExGridConst.COLDIV);
                            }
                        }
                        xml.append(ExGridConst.ROWDIV);
                    }
                }
            }
            xml.append( ExGridConst.ENDDIV );

            // 3.Etc 데이타 세팅
            // ExGridXmlEtt의 getXmlEtc에서 처리

        } catch (Exception e) {
            e.printStackTrace();
        }
        return xml.toString();
    }


    /** **********************************************
     * Save Result를 XML문자형으로 변환한다
     * <pre>
     * 1.성공여부값,
     * 2.String[] sStatus 값
     * </pre>
     * @param   obj     sStatus등
     * @return  String  xml문자열
     *********************************************** */
    public static String toSaveResultXML(Object obj) throws SQLException {
        StringBuffer xml = new StringBuffer();

        if ( obj instanceof String[] ) {
            ;
        } else {
            ;
        }

        return xml.toString();
    }

    /** **********************************************
     * Etc 데이타 XML문자열 리턴
     *  Map 데이타 중에서 String, String[] 타입만 찾음.
     * @return  String  xml문자열
     *********************************************** */
    public static String mapToIBString(Map m) {
        StringBuffer bf = new StringBuffer();

        for( Iterator it = m.keySet().iterator(); it.hasNext(); ) {
            String etcNm = (String)it.next();
            Object o = null;
            etcNm = StrUtil.isNull(etcNm, "");

            // 특수문자 처리 필요 .........
            if( !etcNm.equals("") ){
                o = m.get(etcNm);
                if ( o instanceof String ) {
                    String etcValue = (String)o;
                    etcValue = StrUtil.isNull(etcValue, "");

                    bf.append(ExGridConst.ETC_NMS);
                    bf.append(etcNm.trim());
                    bf.append(ExGridConst.ETC_NME);
                    bf.append(etcValue.trim());
                    bf.append(ExGridConst.ETC_ROW);
                } else if ( o instanceof String[] ) {
                    String[] etcValue = (String[])o;
                    for(int i=0; i<etcValue.length; i++){
                        etcValue[i] = StrUtil.isNull(etcValue[i], "");

                        bf.append(ExGridConst.ETC_NMS);
                        bf.append(etcNm.trim());
                        if( etcValue.length > 1 ) bf.append(String.valueOf(i+1));
                        bf.append(ExGridConst.ETC_NME);
                        bf.append(etcValue[i].trim());
                        bf.append(ExGridConst.ETC_ROW);
                    }
                }
            }
        }
        return bf.toString();
    }
}

