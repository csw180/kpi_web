package tpms.framework.core.controller.web;

import java.util.ArrayList;

public class ScreenFlowData implements java.io.Serializable
{

  private ArrayList exceptionMappings;
  private String defaultScreen=null;

  public ScreenFlowData(ArrayList exceptionMappings,
                        String defaultScreen) {
    this.exceptionMappings=exceptionMappings;
    this.defaultScreen=defaultScreen;
  }

  public String getDefaultScreen() {
    return defaultScreen;
  }

  public ArrayList getExceptionMappings() {
    return exceptionMappings;
  }

  public String toString() {
    return "ScreenFlowData: {defaultScreen="+defaultScreen+", "+
        " exceptionMappings="+exceptionMappings+"}";
  }
}
