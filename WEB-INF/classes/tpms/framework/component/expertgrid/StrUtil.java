package tpms.framework.component.expertgrid;

import java.io.UnsupportedEncodingException;
import java.text.NumberFormat;
import java.util.StringTokenizer;
import java.util.HashMap;
import java.util.Locale;

/** ****************************************************************************
 * 문자열과 관련된 함수 모음 클래스.
 * @version   1.0
 * @author    2005.6.9 <A href="mailto:javapark@empal.com">yong il park</A>
 **************************************************************************** */
public class StrUtil {
    /** 로케일맵 */
    private static HashMap localeMap;

    static {
        localeMap = new HashMap();
        localeMap.put("ar", "ISO-8859-6");
        localeMap.put("be", "ISO-8859-5");
        localeMap.put("bg", "ISO-8859-5");
        localeMap.put("ca", "ISO-8859-1");
        localeMap.put("cs", "ISO-8859-2");
        localeMap.put("da", "ISO-8859-1");
        localeMap.put("de", "ISO-8859-1");
        localeMap.put("el", "ISO-8859-7");
        localeMap.put("en", "ISO-8859-1");
        localeMap.put("es", "ISO-8859-1");
        localeMap.put("et", "ISO-8859-1");
        localeMap.put("fi", "ISO-8859-1");
        localeMap.put("fr", "ISO-8859-1");
        localeMap.put("hr", "ISO-8859-2");
        localeMap.put("hu", "ISO-8859-2");
        localeMap.put("is", "ISO-8859-1");
        localeMap.put("it", "ISO-8859-1");
        localeMap.put("iw", "ISO-8859-8");
        localeMap.put("ja", "Shift_JIS");
        localeMap.put("ko", "EUC-KR");
        localeMap.put("lt", "ISO-8859-2");
        localeMap.put("lv", "ISO-8859-2");
        localeMap.put("mk", "ISO-8859-5");
        localeMap.put("nl", "ISO-8859-1");
        localeMap.put("no", "ISO-8859-1");
        localeMap.put("pl", "ISO-8859-2");
        localeMap.put("pt", "ISO-8859-1");
        localeMap.put("ro", "ISO-8859-2");
        localeMap.put("ru", "ISO-8859-5");
        localeMap.put("sh", "ISO-8859-5");
        localeMap.put("sk", "ISO-8859-2");
        localeMap.put("sl", "ISO-8859-2");
        localeMap.put("sq", "ISO-8859-2");
        localeMap.put("sr", "ISO-8859-5");
        localeMap.put("sv", "ISO-8859-1");
        localeMap.put("tr", "ISO-8859-9");
        localeMap.put("uk", "ISO-8859-5");
        localeMap.put("zh", "GB2312");
        localeMap.put("zh_TW", "Big5");
    }

    /** ************************************************************************
     * Locale 정보에서 charset을 얻어온다...
     * @param  loc Locale
     * @return charset
     ************************************************************************ */
    public static String getCharset(Locale loc) {
        String charset;
        charset = (String) localeMap.get(loc.toString());
        if (charset != null) return charset;
        charset = (String) localeMap.get(loc.getLanguage());
        return charset;  // 아마 null..
    }

    /** ************************************************************************
     * 숫자데이터만 추출. null 일때는 빈문자열 반환.
     * <pre>
     * String number = StringUtil.getNumberChar("123-30/33");
     * ( number == "1233033" )
     * </pre>
     * @param  source 원본문자열
     * @return 변환문자열
     ************************************************************************ */
    public static String getNumberChar(String source) {
        if ( source == null ) return "";
        StringBuffer strBuff = new StringBuffer();
        for (int i=0;i<source.length();i++) {
            char chr = source.charAt(i);
            if (   chr >= '0' && chr <= '9' ) {
                strBuff.append( chr );
            }
        }
        return strBuff.toString();
    }


    /** **********************************************
     * 한글인지 아닌지 검사 하는 함수.
     * @param uni20      원본 문자열
     * @return           한글일 경우 true
     *********************************************** */
    public static boolean checkHan(String uni20)
    {
        boolean result = false;
        if( uni20 == null ) return result;
        int len = uni20.length();
        char c;
        for (int i=0; i<len; i++) {
            c = uni20.charAt(i);
            if ( !( c < 0xac00 || 0xd7a3 < c ) ) {
                result = true;
                break;
            }
        }
        return result;
    }

    /** **********************************************
     * 문자열 치환 함수.
     * <pre>
     * String source = "abcdefghabcdefgh";
     * String subject = "cd";
     * String object = "1234";
     * String rst = strUtil.replace(source,subject,object);
     * //rst 는 "ab1234efghab1234efgh" 가 된다.
     * </pre>
     * @param source        원본 문자열
     * @param subject        바뀔 문자열
     * @param object        바꿀 문자열
     * @return                바뀐 문자열
     *********************************************** */
    public static String replace(String source,
                                 String subject,
                                 String object)
    {
        return replace(source,subject,object,true);
    }

    /** **********************************************
     * 문자열 치환 함수.
     * <pre>
     * String source = "abcdefghabcdefgh";
     * String subject = "cd";
     * String object = "1234";
     * String rst = StrUtil.replace(source,subject,object,false);
     * //rst 는 "ab1234efghabcdefgh" 가 된다.
     * </pre>
     * @param source        원본 문자열
     * @param subject        바뀔 문자열
     * @param object        바꿀 문자열
     * @param doEnd          원본 문자열 끝자지 반복할지 여부
     * @return                바뀐 문자열
     *********************************************** */
    public static String replace(String source,
                                 String subject,
                                 String object,
                                 boolean doEnd)
    {
        if ( source == null ) return null;
        StringBuffer rtnStr = new StringBuffer();
        String preStr = "";
        String nextStr = source;
        while ( source.indexOf(subject) >= 0 ) {
            preStr = source.substring(0, source.indexOf(subject));
            nextStr = source.substring(source.indexOf(subject)+subject.length(), source.length());
            source = nextStr;
            rtnStr.append(preStr).append(object);
            if ( doEnd == false ) break;
        }
        rtnStr.append(nextStr);
        return rtnStr.toString();
    }


    /** **********************************************
     * 문자열을 원하는 형태의 CharSet으로 바꾸는 함수.
     * <pre>
     * String src = "가나다라마바사아";
     * String rst = StrUtil.changeCharset(src,"8859_1","ksc5601");
     * </pre>
     * @param source    원본 문자열
     * @param origin    원본 CharSet
     * @param target    지정 CharSet
     * @return          지정 CharSet으로 변환된 문자열
     *********************************************** */
    public static String changeCharset(String source,
                                       String origin,
                                       String target )
                        throws UnsupportedEncodingException
    {
        return new String(source.getBytes(origin),target);
    }


    /** **********************************************
     * 문자열이 null인지 확인하고 null인 경우 지정된 문자열로 바꾸는 함수.
     * <pre>
     * String id1 = StrUtil.isNull(request.getParameter("id1"),"");
     * 서블릿 요청 파라메터 id1에 대한 값이 null이면 "" 로 바꾼다.
     * </pre>
     * @param   src     원본 문자열
     * @param   def     null일경우 바뀔 문자열
     * @return  문자열
     *********************************************** */
    public static String isNull(String src,
                                String def)
    {
        if ( src == null )
            return def;
        else
            return src;
    }

    /** **********************************************
     * 문자열을 boolean 형으로 변환한다.
     * <pre>
     * String src = "true";
     * boolean rtn = StrUtil.parseInt(src,0);
     * </pre>
     * @param   src     원본 문자열
     * @param   def     변환이 실패할 경우의 기본값
     * @return  boolean ("true","on","yes" 일때만 true )
     *********************************************** */
    public static boolean parseBoolean(String src,
                                       boolean def)
    {
        try {
            return ( src.equalsIgnoreCase("true") || src.equalsIgnoreCase("on") || src.equalsIgnoreCase("yes") || src.equalsIgnoreCase("y") );
        } catch (Throwable t) {
            return def;
        }
    }

    /** **********************************************
     * 문자열을 byte[] 형으로 변환한다.
     * <pre>
     * String src = "1000";
     * byte[] rtn = StrUtil.parseInt(src,new byte[]{0});
     * </pre>
     * @param   src     원본 문자열
     * @param   def     변환이 실패할 경우의 기본값
     * @return  byte[]
     *********************************************** */
    public static byte[] parseByte(String src,
                                   byte[] def)
    {
        return parseByte(src,null,def);
    }

    /** **********************************************
     * 문자열을 byte[] 형으로 변환한다.
     * <pre>
     * String src = "1000";
     * byte[] rtn = StrUtil.parseInt(src,"EUC-KR",new byte[]{0});
     * </pre>
     * @param   src     원본 문자열
     * @param   enc     supported character encoding
     * @param   def     변환이 실패할 경우의 기본값
     * @return  byte[]
     *********************************************** */
    public static byte[] parseByte(String src,
                                   String enc,
                                   byte[] def)
    {
        try {
            if ( enc == null )
                return src.getBytes();
            else
                return src.getBytes(enc);
        } catch (Throwable t) {
            return def;
        }
    }

    /** **********************************************
     * 문자열을 double 형으로 변환한다(콤마는 자동제거한다).
     * <pre>
     * String src = "1000";
     * double rtn = StrUtil.parseDouble(src,0);
     * </pre>
     * @param   src     원본 문자열
     * @param   def     변환이 실패할 경우의 기본값
     * @return  double
     *********************************************** */
    public static double parseDouble(String src,
                                     double def)
    {
        try {
            return Double.parseDouble( replace(src,",","") );
        } catch (Throwable t) {
            return def;
        }
    }

    /** **********************************************
     * 문자열을 float 형으로 변환한다(콤마는 자동제거한다).
     * <pre>
     * String src = "1000";
     * float rtn = StrUtil.parseFloat(src,0);
     * </pre>
     * @param   src     원본 문자열
     * @param   def     변환이 실패할 경우의 기본값
     * @return  double
     *********************************************** */
    public static float parseFloat(String src,
                                   float def)
    {
        try {
            return Float.parseFloat(replace(src,",",""));
        } catch (Throwable t) {
            return def;
        }
    }

    /** **********************************************
     * 문자열을 int 형으로 변환한다(콤마는 자동제거한다).
     * <pre>
     * String src = "1000";
     * int rtn = StrUtil.parseInt(src,0);
     * </pre>
     * @param   src     원본 문자열
     * @param   def     변환이 실패할 경우의 기본값
     * @return  int
     *********************************************** */
    public static int parseInt(String src,
                               int def)
    {
        try {
            return Integer.parseInt(replace(src,",",""));
        } catch (Throwable t) {
            return def;
        }
    }

    /** **********************************************
     * 문자열을 long 형으로 변환한다(콤마는 자동제거한다).
     * <pre>
     * String src = "1000";
     * long rtn = StrUtil.parseLong(src,0);
     * </pre>
     * @param   src     원본 문자열
     * @param   def     변환이 실패할 경우의 기본값
     * @return  long
     *********************************************** */
    public static long parseLong(String src,
                                 long def)
    {
        try {
            return Long.parseLong(replace(src,",",""));
        } catch (Throwable t) {
            return def;
        }
    }

    /** **********************************************
     * 문자열을 short 형으로 변환한다(콤마는 자동제거한다).
     * <pre>
     * String src = "1000";
     * short rtn = StrUtil.parseShort(src,0);
     * </pre>
     * @param   src     원본 문자열
     * @param   def     변환이 실패할 경우의 기본값
     * @return  short
     *********************************************** */
    public static short parseShort(String src,
                                   short def)
    {
        try {
            return Short.parseShort(replace(src,",",""));
        } catch (Throwable t) {
            return def;
        }
    }

    /** **********************************************
     * 문자열을 금액형으로 변환한다(콤마는 자동제거한다).
     * <pre>
     * String src = "1000";
     * String rtn = StrUtil.parseMoney(src,"0");
     * </pre>
     * @param   src     원본 문자열
     * @param   def     변환이 실패할 경우의 기본값
     * @return  3자리 콤마
     *********************************************** */
    public static String parseMoney(String src,
                                    String def)
    {
        try {
            double val = parseDouble( src, 0 );
            NumberFormat format = NumberFormat.getInstance();
            return format.format(val);
        } catch (Throwable t) {
            return def;
        }
    }

    /** **********************************************
     * 문자열을 달러형으로 변환한다(콤마는 자동제거한다).
     * <pre>
     * String src = "1000";
     * String rtn = StrUtil.parseDollarCent(src,"0");
     * </pre>
     * @param   src     원본 문자열(센트단위)
     * @param   def     변환이 실패할 경우의 기본값
     * @return  3자리 콤마
     *********************************************** */
    public static String parseDollarCent(String src,
                                         String def)
    {
        String rtn = null;
        try {
            double val = parseDouble( src, 0 );
            val = val/100;
            NumberFormat format = NumberFormat.getInstance();
            rtn = format.format(val);
        } catch (Throwable t) {
            rtn = def;
        }
        return rtn;
    }

    /** **********************************************
     * 문자열을 달러형으로 변환한다(콤마는 자동제거한다).
     * <pre>
     * String src = "1000";
     * String rtn = StrUtil.parseDollar(src,"0");
     * </pre>
     * @param   src     원본 문자열(달러단위)
     * @param   def     변환이 실패할 경우의 기본값
     * @return  3자리 콤마
     *********************************************** */
    public static String parseDollar(String src,
                                     String def)
    {
        String rtn = null;
        try {
            double val = parseDouble( src, 0 );
            NumberFormat format = NumberFormat.getInstance();
            rtn = format.format(val);
        } catch (Throwable t) {
            rtn = def;
        }
        return rtn;
    }

    /** **********************************************
     * 문자열을 지정한 분리자에 의해 배열로 리턴하는 함수.
     * <pre>
     * String[] rst = StrUtil.split("2002-01-20","-");
     * 결과 rst[0] = 2002, rst[1] = 01, rst[2] = 20
     *
     * String[] rst = StrUtil.split("20020120","-");
     * 결과 rst[0] = 20020120
     * </pre>
     * @param   src     원본 문자열
     * @param   delim   분리자
     * @return  분리자로 나뉘어진 문자열배열 or null
     *********************************************** */
    public static String[] split(String src,
                                 String delim)
    {
        String[] rtn = null;
        try {
            StringTokenizer st = new StringTokenizer(src,delim);
            rtn = new String[st.countTokens()];
            int i=0;
            while ( st.hasMoreTokens() ) {
                rtn[i] = st.nextToken();
                i++;
            }
        } catch (Throwable t) {
            rtn = null;
        }
        return rtn;
    }

    /** **********************************************
     * 문자열을 지정한 분리자에 의해 지정한 길이의 배열로 리턴하는 함수.
     * <pre>
     * String[] rst = StrUtil.split("2002-01-20","-",2);
     * 결과 rst[0] = 2002, rst[1] = 01
     *
     * String[] rst = StrUtil.split("20020120","-",3);
     * 결과 rst[0] = 20020120, rst[1]="", rst[2]=""
     * </pre>
     * @param   src     원본 문자열
     * @param   delim   분리자
     * @param   len     배열길이
     * @return  분리자로 나뉘어진 문자열배열 or null
     *********************************************** */
    public static String[] split(String src,
                                 String delim,
                                 int    len)
    {
        String[] rtn = new String[len];
        int i=0;
        try {
            StringTokenizer st = new StringTokenizer(src,delim);
            rtn = new String[st.countTokens()];
            while ( st.hasMoreTokens() ) {
                rtn[i] = st.nextToken();
                i++;
            }
        } catch (Throwable t) {

        }
        for(int j=i; j<len; j++ ) {
            rtn[j] = "";
        }
        return rtn;
    }

    /** **********************************************
     * 문자열배열을 지정한 분리자에 의해 합한 문자열로 리턴하는 함수.
     * <pre>
     * test[0] = "2000", test[1] = "02", test[2] = "00"
     * String rst = StrUtil.patch(request.getParameterValues("test"),"-",true);
     * 결과 rst = "2002-02-00"
     * </pre>
     * @param   src         원본 문자열 배열
     * @param   delim       분리자
     * @return  분리자 합친 문자열
     *********************************************** */
    public static String patch(String[] src,
                               String delim)
    {
        return patch(src,delim,true);
    }


    /** **********************************************
     * 문자열배열을 지정한 분리자에 의해 합한 문자열로 리턴하는 함수.
     * <pre>
     * test[0] = "2000", test[1] = "", test[2] = "02", test[3] = "00"
     * String rst = StrUtil.patch(request.getParameterValues("test"),"-",true);
     * 결과
     * blankable 이 false 시 rst = "2002-02-00"
     * blankable 이 true 시 rst = "2002--02-00"
     * </pre>
     * @param   src         원본 문자열 배열
     * @param   delim       분리자
     * @param   blankable   null에서 분리자를 표시할 지 여부
     * @return  분리자 합친 문자열
     *********************************************** */
    public static String patch(String[] src,
                               String   delim,
                               boolean  blankable )
    {
        StringBuffer rtn = new StringBuffer();
        try {
            int cnt = 0;
            if ( src != null ) {
                for ( int i=0; i<src.length; i++ ) {
                    if ( blankable ) {
                        if ( cnt!=0 ) rtn.append(delim);
                        rtn.append(isNull(src[i],""));
                        cnt++;
                    } else {
                        if ( isNull(src[i],"").length() > 0 ) {
                            if ( cnt!=0 ) rtn.append(delim);
                            rtn.append(src[i]);
                            cnt++;
                        }
                    }
                }
            }
        } catch (Throwable t) {

        }
        return rtn.toString();
    }


    public static String lpad (String inputString , int length,char format)
    {

        int padding_length = length - inputString.length();
        char padding_Arr[] = new char[padding_length] ;
        for (int i = 0; i < padding_length; i++)
        {
            padding_Arr[i] = format;
        }
        String returnString = new String(padding_Arr);
        returnString = returnString+inputString;
        return returnString;
    }

}
