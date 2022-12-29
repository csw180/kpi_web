package tpms.framework.component.util;

import java.text.*;
import java.util.*;

public final class DateTime
{

    private DateTime()
    {
    }

    public static Date check(String s)
        throws ParseException
    {
        return check(s, "yyyyMMdd");
    }

    public static Date check(String s, String format)
        throws ParseException
    {
        if(s == null)
            throw new ParseException("date string to check is null", 0);
        if(format == null)
            throw new ParseException("format string to check date is null", 0);
        SimpleDateFormat formatter = new SimpleDateFormat(format, Locale.KOREA);
        Date date = null;
        try
        {
            date = formatter.parse(s);
        }
        catch(ParseException e)
        {
            throw new ParseException(" wrong date:\"" + s + "\" with format \"" + format + "\"", 0);
        }
        if(!formatter.format(date).equals(s))
            throw new ParseException("Out of bound date:\"" + s + "\" with format \"" + format + "\"", 0);
        else
            return date;
    }

    public static boolean isValid(String s)
        throws Exception
    {
        return isValid(s, "yyyyMMdd");
    }

    public static boolean isValid(String s, String format)
    {
        if(s == null || format == null)
            return false;
        SimpleDateFormat formatter = new SimpleDateFormat(format, Locale.KOREA);
        Date date = null;
        try
        {
            date = formatter.parse(s);
        }
        catch(ParseException e)
        {
            return false;
        }
        return formatter.format(date).equals(s);
    }

    public static String getDateString()
    {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy.MM.dd", Locale.KOREA);
        return formatter.format(new Date());
    }

    public static int getDay()
    {
        return getNumberByPattern("dd");
    }

    public static int getYear()
    {
        return getNumberByPattern("yyyy");
    }

    public static int getMonth()
    {
        return getNumberByPattern("MM");
    }

    public static int getNumberByPattern(String pattern)
    {
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, Locale.KOREA);
        String dateString = formatter.format(new Date());
        return Integer.parseInt(dateString);
    }

    public static String getFormatString(String pattern)
    {
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, Locale.KOREA);
        String dateString = formatter.format(new Date());
        return dateString;
    }

    public static String getShortDateString()
    {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd", Locale.KOREA);
        return formatter.format(new Date());
    }

    public static String getShortTimeString()
    {
        SimpleDateFormat formatter = new SimpleDateFormat("HHmmss", Locale.KOREA);
        return formatter.format(new Date());
    }

    public static String getTimeStampString()
    {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy.MM.dd HH:mm:ss:SSS", Locale.KOREA);
        return formatter.format(new Date());
    }

    public static String getTimeStampString2()
    {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy.MM.dd HH:mm:ss", Locale.KOREA);
        return formatter.format(new Date());
    }

    public static String convertDateToFormat(String s)
    {
        if(s == null)
            return s;
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss", Locale.KOREA);
        Date date = null;
        try
        {
            date = formatter.parse(s);
        }
        catch(ParseException e)
        {
            return s;
        }
        return formatter.format(date);
    }

    public static String convertDateToFormatYYYY_MM_DD(String s)
    {
        if(s == null)
            return s;
        if(s.trim().length() < 8)
            return s;
        if(s.trim().length() < 14)
        {
            int length = s.length();
            for(int i = 0; i < 14 - length; i++)
                s = s + "0";

        }
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss", Locale.KOREA);
        Date date = null;
        try
        {
            date = formatter.parse(s);
        }
        catch(ParseException e)
        {
            return s;
        }
        SimpleDateFormat formatter2 = new SimpleDateFormat("yyyy.MM.dd", Locale.KOREA);
        return formatter2.format(date);
    }

    public static String convertDateToFormatWithSeparator(String s)
    {
        if(s == null)
            return s;
        if(s.trim().length() < 8)
            return s;
        if(s.trim().length() < 14)
        {
            int length = s.length();
            for(int i = 0; i < 14 - length; i++)
                s = s + "0";

        }
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss", Locale.KOREA);
        Date date = null;
        try
        {
            date = formatter.parse(s);
        }
        catch(ParseException e)
        {
            return s;
        }
        SimpleDateFormat formatter2 = new SimpleDateFormat("yyyy.MM.dd HH:mm:ss", Locale.KOREA);
        return formatter2.format(date);
    }

    public static String getFormatDate(Date date, String pattern)
    {
        SimpleDateFormat df = new SimpleDateFormat(pattern);
        return df.format(date);
    }

    public static String getFormatDate(String date, String currentPattern, String outputPattern)
    {
        try{
          if(date == null) return date;
        return getFormatDate((new SimpleDateFormat(currentPattern)).parse(date), outputPattern);
    }catch(ParseException e){

        return date;
    }
    }

    public static String getTimeString()
    {
        SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss", Locale.KOREA);
        return formatter.format(new Date());
    }

    public static int whichDay(String s)
        throws ParseException
    {
        return whichDay(s, "yyyyMMdd");
    }

    public static int whichDay(String s, String format)
        throws ParseException
    {
        if(s == null)
            throw new ParseException("date string to check is null", 0);
        if(format == null)
        {
            throw new ParseException("format string to check date is null", 0);
        } else
        {
            SimpleDateFormat formatter = new SimpleDateFormat(format, Locale.KOREA);
            Date date = check(s, format);
            Calendar calendar = formatter.getCalendar();
            calendar.setTime(date);
            return calendar.get(7);
        }
    }

    public static int daysBetween(String from, String to)
        throws ParseException
    {
        return daysBetween(from, to, "yyyyMMdd");
    }

    public static int daysBetween(String from, String to, String format)
        throws ParseException
    {
        if(from == null || to == null)
            throw new ParseException("date string to check is null", 0);
        if(format == null)
        {
            throw new ParseException("format string to check date is null", 0);
        } else
        {
            SimpleDateFormat formatter = new SimpleDateFormat(format, Locale.KOREA);
            Date d1 = check(from, format);
            Date d2 = check(to, format);
            long duration = d2.getTime() - d1.getTime();
            return (int)(duration / 0x5265c00L);
        }
    }

    public static int ageBetween(String from, String to)
        throws ParseException
    {
        return ageBetween(from, to, "yyyyMMdd");
    }

    public static int ageBetween(String from, String to, String format)
        throws ParseException
    {
        return daysBetween(from, to, format) / 365;
    }

    public static String addDays(String s, int day)
        throws ParseException
    {
        return addDays(s, day, "yyyyMMdd");
    }

    public static String addDays(String s, int day, String format)
        throws ParseException
    {
        if(s == null)
            throw new ParseException("date string to check is null", 0);
        if(format == null)
        {
            throw new ParseException("format string to check date is null", 0);
        } else
        {
            SimpleDateFormat formatter = new SimpleDateFormat(format, Locale.KOREA);
            Date date = check(s, format);
            date.setTime(date.getTime() + (long)day * 1000L * 60L * 60L * 24L);
            return formatter.format(date);
        }
    }

    public static String addMonths(String s, int month)
        throws Exception
    {
        return addMonths(s, month, "yyyyMMdd");
    }

    public static String addMonths(String s, int addMonth, String format)
        throws Exception
    {
        if(s == null)
            throw new ParseException("date string to check is null", 0);
        if(format == null)
            throw new ParseException("format string to check date is null", 0);
        SimpleDateFormat formatter = new SimpleDateFormat(format, Locale.KOREA);
        Date date = check(s, format);
        SimpleDateFormat yearFormat = new SimpleDateFormat("yyyy", Locale.KOREA);
        SimpleDateFormat monthFormat = new SimpleDateFormat("MM", Locale.KOREA);
        SimpleDateFormat dayFormat = new SimpleDateFormat("dd", Locale.KOREA);
        int year = Integer.parseInt(yearFormat.format(date));
        int month = Integer.parseInt(monthFormat.format(date));
        int day = Integer.parseInt(dayFormat.format(date));
        month += addMonth;
        if(addMonth > 0)
            while(month > 12)
            {
                month -= 12;
                year++;
            }
        else
            while(month <= 0)
            {
                month += 12;
                year--;
            }
        DecimalFormat fourDf = new DecimalFormat("0000");
        DecimalFormat twoDf = new DecimalFormat("00");
        String tempDate = String.valueOf(fourDf.format(year)) + String.valueOf(twoDf.format(month)) + String.valueOf(twoDf.format(day));
        Date targetDate = null;
        try
        {
            targetDate = check(tempDate, "yyyyMMdd");
        }
        catch(ParseException pe)
        {
            day = lastDay(year, month);
            tempDate = String.valueOf(fourDf.format(year)) + String.valueOf(twoDf.format(month)) + String.valueOf(twoDf.format(day));
            targetDate = check(tempDate, "yyyyMMdd");
        }
        return formatter.format(targetDate);
    }

    public static String addYears(String s, int year)
        throws ParseException
    {
        return addYears(s, year, "yyyyMMdd");
    }

    public static String addYears(String s, int year, String format)
        throws ParseException
    {
        if(s == null)
            throw new ParseException("date string to check is null", 0);
        if(format == null)
        {
            throw new ParseException("format string to check date is null", 0);
        } else
        {
            SimpleDateFormat formatter = new SimpleDateFormat(format, Locale.KOREA);
            Date date = check(s, format);
            date.setTime(date.getTime() + (long)year * 1000L * 60L * 60L * 24L * 366L);
            return formatter.format(date);
        }
    }

    public static int monthsBetween(String from, String to)
        throws ParseException
    {
        return monthsBetween(from, to, "yyyyMMdd");
    }

    public static int monthsBetween(String from, String to, String format)
        throws ParseException
    {
        if(from == null || to == null)
            throw new ParseException("date string to check is null", 0);
        if(format == null)
            throw new ParseException("format string to check date is null", 0);
        SimpleDateFormat formatter = new SimpleDateFormat(format, Locale.KOREA);
        Date fromDate = check(from, format);
        Date toDate = check(to, format);
        if(fromDate.compareTo(toDate) == 0)
            return 0;
        SimpleDateFormat yearFormat = new SimpleDateFormat("yyyy", Locale.KOREA);
        SimpleDateFormat monthFormat = new SimpleDateFormat("MM", Locale.KOREA);
        SimpleDateFormat dayFormat = new SimpleDateFormat("dd", Locale.KOREA);
        int fromYear = Integer.parseInt(yearFormat.format(fromDate));
        int toYear = Integer.parseInt(yearFormat.format(toDate));
        int fromMonth = Integer.parseInt(monthFormat.format(fromDate));
        int toMonth = Integer.parseInt(monthFormat.format(toDate));
        int fromDay = Integer.parseInt(dayFormat.format(fromDate));
        int toDay = Integer.parseInt(dayFormat.format(toDate));
        int result = 0;
        result += (toYear - fromYear) * 12;
        result += toMonth - fromMonth;
        if(toDay - fromDay > 0)
            result += toDate.compareTo(fromDate);
        return result;
    }

    public static String lastDayOfMonth(String src)
        throws ParseException
    {
        return lastDayOfMonth(src, "yyyyMMdd");
    }

    public static String lastDayOfMonth(String src, String format)
        throws ParseException
    {
        if(src == null)
            throw new ParseException("date string to check is null", 0);
        if(format == null)
        {
            throw new ParseException("format string to check date is null", 0);
        } else
        {
            SimpleDateFormat formatter = new SimpleDateFormat(format, Locale.KOREA);
            Date date = check(src, format);
            SimpleDateFormat yearFormat = new SimpleDateFormat("yyyy", Locale.KOREA);
            SimpleDateFormat monthFormat = new SimpleDateFormat("MM", Locale.KOREA);
            int year = Integer.parseInt(yearFormat.format(date));
            int month = Integer.parseInt(monthFormat.format(date));
            int day = lastDay(year, month);
            DecimalFormat fourDf = new DecimalFormat("0000");
            DecimalFormat twoDf = new DecimalFormat("00");
            String tempDate = String.valueOf(fourDf.format(year)) + String.valueOf(twoDf.format(month)) + String.valueOf(twoDf.format(day));
            date = check(tempDate, format);
            return formatter.format(date);
        }
    }

    private static int lastDay(int year, int month)
        throws ParseException
    {
        int day = 0;
        switch(month)
        {
        case 1: // '\001'
        case 3: // '\003'
        case 5: // '\005'
        case 7: // '\007'
        case 8: // '\b'
        case 10: // '\n'
        case 12: // '\f'
            day = 31;
            break;

        case 2: // '\002'
            if(year % 4 == 0)
            {
                if(year % 100 == 0 && year % 400 != 0)
                    day = 28;
                else
                    day = 29;
            } else
            {
                day = 28;
            }
            break;

        case 4: // '\004'
        case 6: // '\006'
        case 9: // '\t'
        case 11: // '\013'
        default:
            day = 30;
            break;
        }
        return day;
    }

    public static void main(String args1[])
    {
    }
}
