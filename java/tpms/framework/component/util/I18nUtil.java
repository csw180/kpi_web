package tpms.framework.component.util;

import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.text.*;
import java.util.Locale;
import java.util.Vector;
import org.apache.log4j.Logger;

public final class I18nUtil
{

    private Logger log;

    public I18nUtil()
    {
        log = Logger.getLogger(getClass().getName());
    }

    public static String convertJISEncoding(String target)
    {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        if(target == null)
            return null;
        String paramString = target.trim();
        for(int loop = 0; loop < paramString.length(); loop++)
        {
            int i = paramString.charAt(loop);
            bos.write(i);
        }

        String convertedString = null;
        try
        {
            convertedString = new String(bos.toByteArray(), "JISAutoDetect");
        }
        catch(UnsupportedEncodingException uex) { }
        return convertedString;
    }

    public static String formatCurrency(double amount, int precision, String pattern, Locale locale)
    {
        NumberFormat nf = NumberFormat.getCurrencyInstance(locale);
        DecimalFormat df = (DecimalFormat)nf;
        df.setMinimumFractionDigits(precision);
        df.setMaximumFractionDigits(precision);
        df.setDecimalSeparatorAlwaysShown(true);
        df.applyPattern(pattern);
        return df.format(amount);
    }

    public static String formatNumber(double amount, int precision, String pattern, Locale locale)
    {
        NumberFormat nf = NumberFormat.getNumberInstance(locale);
        DecimalFormat df = (DecimalFormat)nf;
        df.setMinimumFractionDigits(precision);
        df.setMaximumFractionDigits(precision);
        df.setDecimalSeparatorAlwaysShown(true);
        df.applyPattern(pattern);
        return df.format(amount);
    }

    public static String formatCurrency(double amount, int precision, Locale locale)
    {
        NumberFormat nf = NumberFormat.getCurrencyInstance(locale);
        nf.setMinimumFractionDigits(precision);
        nf.setMaximumFractionDigits(precision);
        return nf.format(amount);
    }

    public static String formatNumber(double amount, int precision, Locale locale)
    {
        NumberFormat nf = NumberFormat.getNumberInstance(locale);
        nf.setMinimumFractionDigits(precision);
        nf.setMaximumFractionDigits(precision);
        return nf.format(amount);
    }

    public static Vector parseKeywords(String keywordString)
    {
        if(keywordString != null){
          try{
          Vector keywords;
        BreakIterator breakIt;
        int index;
        keywords = new Vector();
        breakIt = BreakIterator.getWordInstance();
        index = 0;
        int previousIndex = 0;
        breakIt.setText(keywordString);
        while(index < keywordString.length())
        {
            previousIndex = index;
            index = breakIt.next();
            String word = keywordString.substring(previousIndex, index);
            if(!word.trim().equals(""))
                keywords.addElement(word);
        }
        return keywords;
        }catch(Throwable e){
          return null;
        }
        }else{
          return null;
        }
    }

    public static Vector parseKeywords(String keywordString, Locale locale)
    {
        if(keywordString == null) {
           return null;
        }else{
          try {

            Vector keywords;
            BreakIterator breakIt;
            int index;
            keywords = new Vector();
            breakIt = BreakIterator.getWordInstance(locale);
            index = 0;
            int previousIndex = 0;
            breakIt.setText(keywordString);
            while (index < keywordString.length()) {
              previousIndex = index;
              index = breakIt.next();
              String word = keywordString.substring(previousIndex, index);
              if (!word.trim().equals(""))
                keywords.addElement(word);
            }
            return keywords;
          }
          catch (Throwable e) {
            return null;
          }
        }
    }

    public static Locale getLocaleFromString(String localeString)
    {
        if(localeString == null)
            return null;
        if(localeString.toLowerCase().equals("default"))
            return Locale.getDefault();
        int languageIndex = localeString.indexOf(95);
        if(languageIndex == -1)
            return null;
        int countryIndex = localeString.indexOf(95, languageIndex + 1);
        String country = null;
        if(countryIndex == -1)
            if(localeString.length() > languageIndex)
                country = localeString.substring(languageIndex + 1, localeString.length());
            else
                return null;
        int variantIndex = -1;
        if(countryIndex != -1)
            countryIndex = localeString.indexOf(95, countryIndex + 1);
        String language = localeString.substring(0, languageIndex);
        String variant = null;
        if(variantIndex != -1)
            variant = localeString.substring(variantIndex + 1, localeString.length());
        if(variant != null)
            return new Locale(language, country, variant);
        else
            return new Locale(language, country);
    }
}
