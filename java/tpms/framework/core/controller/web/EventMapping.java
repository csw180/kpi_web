package tpms.framework.core.controller.web;

/**
 * This class represents the mapping between an Event and the necessary EJB Action Class
 */

public class EventMapping implements java.io.Serializable
{

  private String eventClass=null;
  private String commandClass=null;

  public EventMapping(String eventClassName,String commandClass) {
    this.eventClass=eventClassName;
    this.commandClass=commandClass;
  }

  public String getCommandClassName() {
    return commandClass;
  }

  public String getEventClassName() {
    return eventClass;
  }

  public String toString() {
    return "[EventMapping:"+
        " eventClass="+eventClass+
        ", commandClass="+commandClass+
        "]";
  }
}
