package tpms.framework.component.util;

import java.util.*;
import org.apache.log4j.Logger;

public class SingletonRegistry
{

    private static Logger log;
    public static SingletonRegistry REGISTRY = new SingletonRegistry();
    private static Map map = Collections.synchronizedMap(new HashMap());
    static Class class$tpms$framework$component$util$SingletonRegistry; /* synthetic field */

    protected SingletonRegistry()
    {
    }

    public static synchronized Object getInstance(String classname)
    {
        Object singleton = map.get(classname);
        if(singleton != null)
        {
            log.debug("return Singleton =" + classname);
            return singleton;
        }
        try
        {
            singleton = Class.forName(classname).newInstance();
            map.put(classname, singleton);
            log.debug("created Singleton =" + singleton + " classname =" + classname);
        }
        catch(ClassNotFoundException cnf)
        {
            log.fatal("Couldn't find class " + classname);
        }
        catch(InstantiationException ie)
        {
            log.fatal("Couldn't instantiate an object of type " + classname);
        }
        catch(IllegalAccessException ia)
        {
            log.fatal("Couldn't access class " + classname);
        }
        return singleton;
    }

    static Class setClass_name(String x0)
    {
        try{
          return Class.forName(x0);
        }catch(ClassNotFoundException x1){
          throw new NoClassDefFoundError(x1.getMessage());
        }
    }

    static
    {
        log = Logger.getLogger(class$tpms$framework$component$util$SingletonRegistry != null ? class$tpms$framework$component$util$SingletonRegistry : (class$tpms$framework$component$util$SingletonRegistry = setClass_name("tpms.framework.component.util.SingletonRegistry")));
    }
}
