package tpms.framework.component.signon.web;

import java.io.*;
import java.util.*;

public class ProtectedResource
    implements Serializable {

  private String name;
  private String urlPattern;
  private ArrayList roles;

  public ProtectedResource(String name, String urlPattern, ArrayList roles) {
    this.name = null;
    this.urlPattern = null;
    this.roles = null;
    this.name = name;
    this.urlPattern = urlPattern;
    this.roles = roles;
  }

  public String getName() {
    return name;
  }

  public String getURLPattern() {
    return urlPattern;
  }

  public ArrayList getRoles() {
    return roles;
  }

  public String toString() {
    return "ProtectedResource [ name=" + name + ", urlPattern=" + urlPattern +
        ", roles=" + roles + "]";
  }
}
