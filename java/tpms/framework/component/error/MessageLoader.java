package tpms.framework.component.error;

import tpms.framework.component.util.SingletonRegistry;
import java.util.HashMap;

public abstract class MessageLoader
{
   private static MessageLoader instance=null;
   protected HashMap messageMap=new HashMap();
   public static final int LOADER_OF_DATABASE=1;
   public static final int LOADER_OF_PROPERTY=2;

   protected MessageLoader() {
     loadMessageList();
   }
    public static MessageLoader getInstance(int loaderKind) {
      if (loaderKind==LOADER_OF_DATABASE) {
          return (DatabaseMessageLoader)SingletonRegistry.REGISTRY.getInstance("tpms.framework.component.error.DatabaseMessageLoader");
      }else  if (loaderKind==LOADER_OF_PROPERTY){
          return (PropertyMessageLoader)SingletonRegistry.REGISTRY.getInstance("tpms.framework.component.error.PropertyMessageLoader");
      }else {
          return (DatabaseMessageLoader)SingletonRegistry.REGISTRY.getInstance("tpms.framework.component.error.DatabaseMessageLoader");
      }
    }

    public static MessageLoader getInstance() {
        return (DatabaseMessageLoader)SingletonRegistry.REGISTRY.getInstance("tpms.framework.component.error.DatabaseMessageLoader");
    }

    public abstract void loadMessageList();

    public String getMessage(String code) {
      return messageMap.get(code)==null?"":(String)messageMap.get(code);
    }
}
