package tpms.framework.component.util;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.text.*;
import java.util.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import tpms.framework.component.signon.*;

import org.apache.log4j.Logger;

/*********************************************************************
 *  클래스 개요    : DB Control <p>
 *  클래스 상세기능 : Value Ojbect<p>
 *  작성일 : 2003.06.10<p>
 *  @version 1.0
 *  @author  변휘원
 *-------------------------------------------------------------------- 
 * 수정자/수정일 : 문기철/2006.01.16
 * 수정사유      : 전산정보부 이우석 과장님 요청으로 
 *                 String getMonthList(String, String[]) method 추가
 *-------------------------------------------------------------------- 
 *********************************************************************/
public final class JSPUtil
{

    private static Logger log;
    private static TokenProcessor tokenProcessor = TokenProcessor.getInstance();
    public static final String defaultDateFormat = "yyyyMMdd";
    public static final String slashDateFormat = "yyyy/MM/dd";
    public static final String defaultSeparator = "-";
    static Class class$tpms$framework$component$util$JSPUtil; /* synthetic field */

    private JSPUtil()
    {
    	System.out.println("JSPUtil create");
    }

    public static String getParameter(HttpServletRequest req, String sName)
    {
        String value = req.getParameter(sName.trim());
        String retr = value != null ? value.trim().replaceAll(",","``") : "";
        return retr.toUpperCase();
    }

    public static String getParameter(HttpServletRequest req, String pName, String defaultValue)
    {
        String value = req.getParameter(pName.trim());
        String retr = "";
        if(value != null)
        {
            if(value.trim().equals(""))
                retr = defaultValue;
            else
                retr = value.trim().replaceAll(",","``");
        } else
        {
            retr = defaultValue;
        }
        return retr.toUpperCase();
    }

    public static String getParameter(HttpServletRequest req, String pName, String defaultValue, String encodingFlag)
    {
        String value = req.getParameter(pName.trim());
        String retr = value != null ? convertUni2Ksc2(value.trim().replaceAll(",","``")) : defaultValue;
        return retr.toUpperCase();
    }

    public static boolean getParameterAsBoolean(HttpServletRequest req, String sName, boolean defaultValue)
    {
        String value = req.getParameter(sName);
        if(null == value)
            return defaultValue;
        value = value.trim().toUpperCase();
        boolean retr;
        if(value.equals("TRUE") || value.equals("ON") || value.equals("1"))
            retr = true;
        else
        if(value.equals("FALSE") || value.equals("OFF") || value.equals("0"))
            retr = false;
        else
            retr = defaultValue;
        return retr;
    }

    private static String convertKsc2Uni(String sKscStr)
    {
        String retr = "";
        if(sKscStr != null)
            try
            {
                retr = new String(sKscStr.getBytes("KSC5601"), "8859_1");
            }
            catch(UnsupportedEncodingException e)
            {
                System.out.println("JSPUtil.convertKsc2Uni() has error");
            }
        return retr;
    }

    private static String convertUni2Ksc(String sUniCode)
    {
        String retr = "";
        if(sUniCode != null)
            try
            {
                retr = new String(sUniCode.getBytes("8859_1"), "KSC5601");
            }
            catch(UnsupportedEncodingException e)
            {
                System.out.println("JSPUtil.convertUni2Ksc() has error");
            }
        return retr;
    }

    private static String convertUni2Ksc2(String sUniCode)
    {
        String retr = "";
        if(sUniCode != null)
            try
            {
                retr = new String(sUniCode.getBytes("8859_1"), "KSC5601");
            }
            catch(UnsupportedEncodingException e)
            {
                System.out.println("JSPUtil.convertUni2Ksc() has error");
            }
        return retr;
    }

    public static String removeCharacter(String sStr, String sChr)
    {
        if(sStr == null)
            return sStr;
        String retr = "";
        for(StringTokenizer st = new StringTokenizer(sStr, sChr); st.hasMoreTokens();)
            retr = retr + st.nextToken();

        return retr;
    }

    public static String FormatNumber(String amount)
    {
        String pattern=null;
        StringTokenizer st = new StringTokenizer(amount, ".");
        if(st.countTokens() > 1) pattern="###,###,##0.0#";
        else pattern="###,###,##0";
        double nNumber= new Double(amount).doubleValue();
        NumberFormat nf = NumberFormat.getCurrencyInstance();
        DecimalFormat df = (DecimalFormat)nf;
        String retr = "";
        df.setMinimumFractionDigits(2);
        df.setMaximumFractionDigits(2);
        df.setDecimalSeparatorAlwaysShown(true);
        df.applyPattern(pattern);
        try
        {
            retr = df.format(nNumber);
        }
        catch(IllegalArgumentException e)
        {
            System.out.println("JSPUtil.toDecimalFormat() has error");
        }
        return retr;
    }

    public static String toDecimalFormat(double amount, String pattern)
    {
        NumberFormat nf = NumberFormat.getCurrencyInstance();
        DecimalFormat df = (DecimalFormat)nf;
        String retr = "";
        df.setMinimumFractionDigits(2);
        df.setMaximumFractionDigits(2);
        df.setDecimalSeparatorAlwaysShown(true);
        df.applyPattern(pattern);
        try
        {
            retr = df.format(amount);
        }
        catch(IllegalArgumentException e)
        {
            System.out.println("JSPUtil.toDecimalFormat() has error");
        }
        return retr;
    }


    public static String formatCurrency(double amount)
    {
        NumberFormat nf = NumberFormat.getCurrencyInstance();
        String retr = "";
        try
        {
            retr = nf.format(amount);
            if(retr.charAt(0) == '-')
                retr = '-' + retr.substring(2);
            else
                retr = retr.substring(1);
        }
        catch(NumberFormatException e)
        {
            System.out.println("JSPUtil.formatCurrency() has error");
        }
        return retr;
    }

    public static String formatCurrency(String amountString)
    {
        if(amountString == null || amountString.trim().length() == 0)
            return amountString;
        double amount = Double.parseDouble(amountString);
        NumberFormat nf = NumberFormat.getCurrencyInstance();
        String retr = "";
        try
        {
            retr = nf.format(amount);
            if(retr.charAt(0) == '-')
                retr = '-' + retr.substring(2);
            else
                retr = retr.substring(1);
        }
        catch(NumberFormatException e)
        {
            System.out.println("JSPUtil.formatCurrency() has error");
        }
        return retr;
    }

    public static String cutStringByLimit(String str, int length)
    {
        if(str == null)
            return str;
        int initLength = str.length();
        int cnt = 0;
        if(initLength <= length)
            return str;
        if(initLength > length)
        {
            for(int i = length; i >= 0; i--)
            {
                if(str.charAt(i) < '\177')
                    break;
                cnt++;
            }

            if(cnt == 0)
                cnt = 1;
            cnt %= 2;
            if(cnt == 0)
                length--;
        }
        return str.substring(0, length);
    }

    public static String cutStringByLimitWithSign(String str, int length)
    {
        if(str == null)
            return str;
        int initLength = str.length();
        int cnt = 0;
        if(initLength <= length)
            return str;
        if(initLength > length)
        {
            for(int i = length; i >= 0; i--)
            {
                if(str.charAt(i) < '\177')
                    break;
                cnt++;
            }

            if(cnt == 0)
                cnt = 1;
            cnt %= 2;
            if(cnt == 0)
                length--;
        }
        return str.substring(0, length) + "...";
    }

    public static String cutStringForBalloon(String orgStr, int gubun, int cutlength)
    {
        if(orgStr == null)
            return orgStr;
        int strLength = orgStr.length();
        if(strLength < cutlength)
            return orgStr;
        String cutStr = "";
        String strTemp = removeCharacter(orgStr, "\"");
        if(gubun == 1)
            cutStr = cutStringByLimitWithSign(strTemp, cutlength);
        else
            cutStr = cutStringByLimit(strTemp, cutlength);
        return "<font title=\"" + strTemp + "\">" + cutStr + "</font>";
    }

    public static String n2Br(String str)
    {
        if(str == null)
            return str;
        for(int pos = str.indexOf(10); pos >= 0; pos = str.indexOf(10))
            str = str.substring(0, pos) + "<br>" + str.substring(pos + 1);

        return str;
    }
    public static String NullToBlank(String st){
      if(st == null) st=" ";
      return st;
    }

    public static void fixBlank(Object o)
    {
        if(o == null)
            return;
        Class c = o.getClass();
        if(c.isPrimitive())
            return;
        Field fields[] = c.getDeclaredFields();
        try
        {
            for(int i = 0; i < fields.length; i++)
            {
                Object f = fields[i].get(o);
                Class fc = fields[i].getType();
                if(fc.getName().equals("java.lang.String"))
                {
                    int mod = fields[i].getModifiers();
                    if((!Modifier.isStatic(mod) || !Modifier.isFinal(mod)) && (f == null || ((String)f).trim().equals("")))
                        fields[i].set(o, "&nbsp;");
                }
            }

        }
        catch(Exception e)
        {
            e.printStackTrace();
            System.out.println(e.getMessage());
        }
    }

    public static String getMonthList(int months,int basemonth,int smonth)
    {   
        StringBuffer sb = new StringBuffer("");
        int i;
        int year=Integer.parseInt(JSPUtil.getKSTDate().substring(0,4));
        int month=Integer.parseInt(JSPUtil.getKSTDate().substring(5,7))-1;
        if (basemonth>0)month=basemonth;
        String selectedchk="";
        if (months<0) months=-months;
        for (i=0;i<months;i++){
            if (month-i < 1){
                year = year-1;
                month = 12+month;
            }
            if (smonth==month-i) selectedchk=" selected ";
            else selectedchk="";
            if(year < 2005 || (year == 2005 && month-i < 9)) break;
            if ( month-i < 10){
                sb.append("<option value=\""+Integer.toString(year)+"0"+
                          Integer.toString(month-i)+"\" "+selectedchk+">"+Integer.toString(year)+
                          "년 0"+Integer.toString(month-i)+"월</option>\n");
            }else{
                sb.append("<option value=\""+Integer.toString(year)+
                        Integer.toString(month-i)+"\" "+selectedchk+">"+Integer.toString(year)+
                        "년 "+Integer.toString(month-i)+"월</option>\n");
            }
        }
        return sb.toString();
    }
    
    
    public static String getMonthList(String gubun)
    {
        StringBuffer sb = new StringBuffer("");
        tpms.framework.component.dao.DbResultSet rs = null;
        tpms.framework.component.dao.DBProcCall  cp = new tpms.framework.component.dao.DBProcCall();
        try
        {  
            // gubun(구분) 1:직무비중 2:코드검증 3:기타검증 4:ABC보고서 5:PA보고서 6:본부입력
            rs  = cp.callProc("xwp_co조회작업기준년월", gubun);
            if(rs!=null && rs.first()){
                while(rs.next()){
                    sb.append("<option value=\""+rs.getString("기준년월")+"\">"+
                                rs.getString("기준년월").substring(0,4)+"년 "+
                                rs.getString("기준년월").substring(4,6)+"월</option>\n");
                }
            }

        } catch(Exception ex) {
        }

        return sb.toString();
    }
    
    
    /**
     * 각 업무별 작업기준년월 데이터를 가져온다.
     * @param   gubun     업무구분
     * @param   rolelist  로그인한 사용자의 role리스트
     * @returun 업무 + 권한에 해당된 <option> 리스트
     */
    public static String getMonthList(String gubun, javax.servlet.http.HttpSession session)
    {
        StringBuffer sb      = new StringBuffer("");
        
        tpms.framework.component.dao.DbResultSet rs = null;
        tpms.framework.component.dao.DBProcCall  cp = new tpms.framework.component.dao.DBProcCall();
        try
        {  
            // 해당 사용자의 Role이 신기부종수(998), 전산정보부종수(999), 금융기획부 성과(5)인 
            // 경우는 업무 구분에 상관없이 등록된 모든 작업기준년월의
            // 데이터를 보여준다.
            SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
            if(account!=null)
            {
                String[]    roleList = account.getRole();
                for(int i=0; roleList!=null && i<roleList.length; i++)
                {
                    if("998".equals(roleList[i].trim()) || "999".equals(roleList[i].trim()) || "5".equals(roleList[i].trim()))
                        gubun = "9";
                }
            }
            
            // gubun(구분) 1:직무비중 2:코드검증 3:기타검증 4:ABC보고서 5:PA보고서 6:본부입력
            rs  = cp.callProc("xwp_co조회작업기준년월", gubun);
            if(rs!=null && rs.first()){
                while(rs.next()){
                    sb.append("<option value=\""+rs.getString("기준년월")+"\">"+
                                rs.getString("기준년월").substring(0,4)+"년 "+
                                rs.getString("기준년월").substring(4,6)+"월</option>\n");
                }
            }
        } catch(Exception ex) {
        }

        return sb.toString();
    }
        
    
    public static String getBaseMonth()
    {
        StringBuffer sb = new StringBuffer("");
        int i;
        int year=Integer.parseInt(JSPUtil.getKSTDate().substring(0,4));
        int month=Integer.parseInt(JSPUtil.getKSTDate().substring(5,7))-1;
        if (month < 1){
            year = year-1;
            month = 12+month;
        }
        if ( month < 10){
                sb.append(Integer.toString(year)+"0"+Integer.toString(month));
        }else{
                sb.append(Integer.toString(year)+Integer.toString(month));
        }
        return sb.toString();
    }

    public static String FormatDate(String date)
   {
       String str;
       if (date==null) return null;
       if (date.length() != 8) return null;
       str=date.substring(0,4)+'/'+date.substring(4,6)+'/'+date.substring(6,8);
       return str;
   }

   public static String getKST(String format)
    {
        int millisPerHour = 0x36ee80;
        SimpleDateFormat fmt = new SimpleDateFormat(format);
        SimpleTimeZone timeZone = new SimpleTimeZone(9 * millisPerHour, "KST");
        fmt.setTimeZone(timeZone);
        long time = System.currentTimeMillis();
        String str = fmt.format(new Date(time));
        return str;
    }

    public static String getKSTDate()
    {
        SimpleTimeZone pdt = new SimpleTimeZone(0x1ee6280, "KST");
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
        Date currentTime = new Date();
        return formatter.format(currentTime);
    }

    public static String getKSTDateTime()
    {
        SimpleTimeZone pdt = new SimpleTimeZone(0x1ee6280, "KST");
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date currentTime = new Date();
        return formatter.format(currentTime);
    }

    public static double round(double dAmount, int i)
    {
        long rest = 1L;
        for(int x = 0; x < Math.abs(i); x++)
            rest *= 10L;

        if(i > 0)
            return (double)(Math.round(dAmount / (double)rest) * rest);
        else
            return (double)Math.round(dAmount * (double)rest) / (double)rest;
    }

    public static double cut(double dAmount, int i)
    {
        long rest = 1L;
        for(int x = 0; x < Math.abs(i); x++)
            rest *= 10L;

        if(i > 0)
            return (double)(long)(dAmount / (double)rest) * (double)rest;
        else
            return (double)(long)(dAmount * (double)rest) / (double)rest;
    }

    public static boolean isValidPersonalId(String personalId)
    {
        if(personalId == null)
            return false;
        if(personalId.length() != 13)
            return false;
        int total = 0;
        int iarray[] = new int[14];
        for(int i = 1; i <= 13; i++)
            iarray[i] = Character.digit(personalId.charAt(i - 1), 10);

        for(int i = 1; i <= 12; i++)
        {
            int k = i + 1;
            if(k >= 10)
                k = k % 10 + 2;
            total += iarray[i] * k;
        }

        int chd = 11 - total % 11;
        if(chd == 10 || chd == 11)
            chd = 0;
        int mm = iarray[3] * 10 + iarray[4];
        int dd = iarray[5] * 10 + iarray[6];
        return chd == iarray[13] && mm < 13 && dd < 32 && 1 <= iarray[7] && iarray[7] <= 4;
    }

    public static boolean isValidAge(String personalId, int limitAge)
    {
        if(personalId == null)
            return false;
        boolean retr = true;
        if(personalId.length() == 10)
            return true;
        String birthday = "";
        if(personalId.charAt(6) == '1' || personalId.charAt(6) == '2')
            birthday = "19" + personalId.substring(0, 6);
        else
        if(personalId.charAt(6) == '3' || personalId.charAt(6) == '4')
            birthday = "20" + personalId.substring(0, 6);
        Calendar today = Calendar.getInstance();
        today.add(1, -limitAge);
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
        try
        {
            if(today.getTime().getTime() < formatter.parse(birthday).getTime())
                retr = false;
        }
        catch(ParseException pe)
        {
            retr = false;
        }
        return retr;
    }

    public static String[] getParameter(HttpServletRequest req, String key, int length)
    {
        String values[] = req.getParameterValues(key);
        String retr[] = new String[values.length];
        for(int i = 0; i < values.length; i++)
            if(values != null)
            {
                if(i < values.length)
                    retr[i] = values[i] != null ? values[i].trim().replaceAll(",","``") : "";
                else
                    retr[i] = "";
            } else
            {
                retr[i] = "";
            }

        return retr;
    }

    public static String getCutString(String value, int position)
    {
        if(value == null)
            return value;
        String retValue = "";
        try
        {
            retValue = value.substring(0, value.length() - position);
        }
        catch(Exception ex)
        {
            retValue = "error";
        }
        return retValue;
    }

    public static String cardString(int param, int size)
    {
        String ret = Integer.toString(param);
        int length = ret.length();
        for(int i = 0; i < size - length; i++)
            ret = "0" + ret;

        return ret;
    }

    public static String cardString(String param, int size)
    {
        if(param == null)
            return param;
        int length = param.length();
        for(int i = 0; i < size - length; i++)
            param = "0" + param;

        return param;
    }

    public static String replace(String src, String oldstr, String newstr)
    {
        if(src == null)
            return src;
        StringBuffer dest = new StringBuffer("");
        int len = oldstr.length();
        int srclen = src.length();
        int pos = 0;
        int oldpos;
        for(oldpos = 0; (pos = src.indexOf(oldstr, oldpos)) >= 0; oldpos = pos + len)
        {
            dest.append(src.substring(oldpos, pos));
            dest.append(newstr);
        }

        if(oldpos < srclen)
            dest.append(src.substring(oldpos, srclen));
        return dest.toString();
    }

    public static String getPageList(int totalcount, int currentpage, int lineNum)
    {
        String PageList = "";
        int PAGE_NUM = 10;
        String CURRENT_PAGE_COLOR = "black";
        String PAGE_LIST_COLOR = "black";
        try
        {
            String leftArrow = "<img src='img/page_pre.gif' width='12' height='12' border='0'>";
            String rightArrow = "<img src='img/page_next.gif' width='12' height='12' border='0'>";
            int totalpage = totalcount / lineNum;
            if(totalcount % lineNum > 0)
                totalpage++;
            int endpage = (currentpage / PAGE_NUM + 1) * PAGE_NUM;
            int startpage = (endpage - PAGE_NUM) + 1;
            if(currentpage % PAGE_NUM == 0)
            {
                startpage = (currentpage - PAGE_NUM) + 1;
                endpage = currentpage;
            }
            if(endpage > totalpage)
                endpage = totalpage;
            PageList = PageList + "<table width='100%' height='40' border='0'>\n";
            PageList = PageList + "  <tr>\n";
            PageList = PageList + "    <td width='25%'>&nbsp</td>\n";
            PageList = PageList + "    <td align='center'>\n";
            if(startpage > PAGE_NUM)
                PageList = PageList + "<a href=\"javascript:fnGoPage('" + String.valueOf(startpage - PAGE_NUM) + "');\"><font color='" + PAGE_LIST_COLOR + "'>" + leftArrow + "</font></a> &nbsp;\n";
            else
                PageList = PageList + "<font color='" + CURRENT_PAGE_COLOR + "'>" + leftArrow + " &nbsp;\n";
            for(int i = startpage; i <= endpage; i++)
                if(i == currentpage)
                    PageList = PageList + "<font color='" + CURRENT_PAGE_COLOR + "'><b>" + i + "</b></font> &nbsp;\n";
                else
                    PageList = PageList + "<a href=\"javascript:fnGoPage('" + i + "')\"><font color='" + PAGE_LIST_COLOR + "'>" + i + "</font></a> &nbsp;\n";

            if(endpage < totalpage)
                PageList = PageList + "<a href=\"javascript:fnGoPage('" + String.valueOf(endpage + 1) + "');\"><font color='" + PAGE_LIST_COLOR + "'>" + rightArrow + "</font></a>\n";
            else
                PageList = PageList + "<font color='" + CURRENT_PAGE_COLOR + "'>" + rightArrow + "</font> &nbsp;\n";
            if(totalpage > 0)
                PageList = PageList + "    <td width='25%' align='right'>(&nbsp;" + currentpage + "&nbsp;/&nbsp;" + totalpage + "&nbsp;&nbsp;Page&nbsp;)&nbsp;&nbsp;&nbsp;</td>\n";
            else
                PageList = PageList + "    <td width='25%' align='right'>&nbsp;</td>\n";
            PageList = PageList + "    </td>\n";
            PageList = PageList + "  </tr>\n";
            PageList = PageList + "</table\n";
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        return PageList;
    }

    public static String getSeperatorJuminNo(String value, String RGBstr)
    {
        if(value == null)
            return value;
        value = removeCharacter(value, "-");
        if(value.length() != 13)
        {
            if(RGBstr.length() == 0)
                return value;
            else
                return "<font color=\"#" + RGBstr + "\">" + value + "</font>";
        } else
        {
            return value.substring(0, 6) + "-" + value.substring(6);
        }
    }

    public static String getSeperatorAccountNo(String value, String RGBstr)
    {
        if(value == null)
            return value;
        value = removeCharacter(value, "-");
        if(value.length() != 11)
        {
            if(RGBstr.length() == 0)
                return value;
            else
                return "<font color=\"#" + RGBstr + "\">" + value + "</font>";
        } else
        {
            return value.substring(0, 3) + "-" + value.substring(3, 5) + "-" + value.substring(5);
        }
    }

    public static String getSeperatorCardNo(String value, String RGBstr)
    {
        if(value == null)
            return value;
        value = removeCharacter(value, "-");
        if(value.length() != 16)
        {
            if(RGBstr.length() == 0)
                return value;
            else
                return "<font color=\"#" + RGBstr + "\">" + value + "</font>";
        } else
        {
            return value.substring(0, 4) + "-" + value.substring(4, 8) + "-" + value.substring(8, 12) + "-" + value.substring(12, 16);
        }
    }

    private static synchronized String renderToken(HttpServletRequest req)
    {
        StringBuffer results = new StringBuffer();
        HttpSession session = req.getSession(false);
        if(session != null)
        {
            String token = (String)session.getAttribute("tpms.framework.transaction.TOKEN");
            if(token != null)
            {
                results.append("<input type=\"hidden\" name=\"");
                results.append("TOKEN");
                results.append("\" value=\"");
                results.append(token);
                results.append("\" />");
            }
        }
        return results.toString();
    }

    private static synchronized String renderTokenForNew(HttpServletRequest req)
    {
        StringBuffer results = new StringBuffer();
        HttpSession session = req.getSession(false);
        String retToken = null;
        if(session != null)
        {
            retToken = (String)session.getAttribute("tpms.framework.transaction.TOKEN");
            if(retToken == null)
            {
                tokenProcessor.resetToken(req);
                tokenProcessor.saveToken(req);
                retToken = (String)session.getAttribute("tpms.framework.transaction.TOKEN");
            }
        }
        return retToken;
    }

    public static String getTokenLinkString(HttpServletRequest req)
    {
        String retValue = null;
        retValue = "?TOKEN=" + renderTokenForNew(req);
        return retValue;
    }

    public static String getIncludeString(HttpServletRequest req)
    {
        String retValue = null;
        retValue = renderToken(req);
        return retValue;
    }

    public static String getSeperatorTelNo(String value)
    {
        if(value == null)
            return value;
        value = removeCharacter(value, "-");
        int length = value.length() - 4;
        int temp;
        try
        {
            temp = Integer.valueOf(value).intValue();
        }
        catch(NumberFormatException ex)
        {
            return value;
        }
        if(value.length() > 8)
        {
            if("02".equals(value.substring(0, 2)))
                return value.substring(0, 2) + "-" + value.substring(2, length) + "-" + value.substring(length);
            else
                return value.substring(0, 3) + "-" + value.substring(3, length) + "-" + value.substring(length);
        } else
        {
            return value.substring(0, length) + "-" + value.substring(length);
        }
    }

    public static void main(String args[])
    {
        System.out.println(getCutString("1234567", 4));
        System.out.println("==============================================");
        System.out.println(System.getProperty("java.library.path"));
    }

    static Class setclass_name(String x0)
    {
        try{
          return Class.forName(x0);
        }catch(ClassNotFoundException x1){
              throw new NoClassDefFoundError(x1.getMessage());
        }
    }

    static
    {
        log = Logger.getLogger(class$tpms$framework$component$util$JSPUtil != null ? class$tpms$framework$component$util$JSPUtil : (class$tpms$framework$component$util$JSPUtil = setclass_name("tpms.framework.component.util.JSPUtil")));
    }
}
