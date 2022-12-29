package tpms.framework.component.log;

import java.net.URL;
import org.apache.log4j.xml.DOMConfigurator;

public class Log4jConfigureUtil
{

    private static Log4jConfigureUtil me;
    static Class class$tpms$framework$component$log$Log4jConfigureUtil; /* synthetic field */

    private void setConfig()
        throws Exception
    {
        String resource = "/log4jProperties.xml";
        try
        {
            URL configFileResource = (class$tpms$framework$component$log$Log4jConfigureUtil != null ? class$tpms$framework$component$log$Log4jConfigureUtil : (class$tpms$framework$component$log$Log4jConfigureUtil = setclass_name("tpms.framework.component.log.Log4jConfigureUtil"))).getResource(resource);
            DOMConfigurator.configure(configFileResource.getFile());
        }
        catch(Exception ex)
        {
            throw ex;
        }
    }

    private Log4jConfigureUtil()
    {
        try
        {
            setConfig();
        }
        catch(Exception ex)
        {
            System.err.println("log4jProperties.xml \uD30C\uC77C\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4! \uC5D0\uB7EC\uBA54\uC138\uC9C0=" + ex.getMessage());
        }
    }

    public static Log4jConfigureUtil getInstance()
    {
        return me;
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
        try
        {
            me = new Log4jConfigureUtil();
        }
        catch(Exception se)
        {
            System.err.println(se);
            se.printStackTrace(System.err);
        }
    }
}
