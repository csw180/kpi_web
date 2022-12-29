package tpms.framework.component.error;

import java.io.*;
import java.net.URL;
import java.util.*;

public class PropertyMessageLoader extends MessageLoader
{

    private static final String FILE_PATH = "/tpms/framework/component/error/errorMapping.properties";
    static Class class$tpms$framework$component$error$PropertyMessageLoader; /* synthetic field */

    public PropertyMessageLoader()
    {
    }

    public static void main(String argv[])
    {
        MessageLoader propLoader = getInstance();
        propLoader.loadMessageList();
        System.out.println(propLoader.messageMap);
    }

    public void loadMessageList()
    {
        try
        {
            URL configURL = (class$tpms$framework$component$error$PropertyMessageLoader != null ? class$tpms$framework$component$error$PropertyMessageLoader : (class$tpms$framework$component$error$PropertyMessageLoader= setClass_name("tpms.framework.component.error.PropertyMessageLoader"))).getResource("/tpa/framework/component/error/errorMapping.properties");
            Properties prop = new Properties();
            prop.load(configURL.openStream());
            String str = null;
            for(Enumeration enu = prop.propertyNames(); enu.hasMoreElements(); messageMap.put(str, toKor(prop.getProperty(str))))
                str = (String)enu.nextElement();

        }
        catch(IOException e)
        {
            e.printStackTrace();
        }
    }

    private String toKor(String eng)
    {
        String kor = null;
        try
        {
            kor = new String(eng.getBytes("8859_1"), "KSC5601");
        }
        catch(UnsupportedEncodingException ue) { }
        return kor;
    }
    static Class setClass_name(String x0)
    {
        try{

          return Class.forName(x0);
        }catch(ClassNotFoundException x1){
          throw new NoClassDefFoundError(x1.getMessage());
        }
    }


}
