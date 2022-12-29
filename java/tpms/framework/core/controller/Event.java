package tpms.framework.core.controller;

import tpms.common.web.FormCommand;

public interface Event extends java.io.Serializable
{

  public void setCommandClassName(String commandClassName);

  public String getCommandClassName();

  public String getEventName();

  public void setFormCommand(FormCommand fcmd);

  public FormCommand getFormCommand();

}
