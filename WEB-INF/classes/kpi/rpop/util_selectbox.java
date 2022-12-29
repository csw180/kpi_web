package kpi.rpop;

import javax.servlet.http.HttpServletRequest;
import tpms.framework.component.util.JSPUtil;
import tpms.framework.component.dao.*;
import tpms.framework.component.signon.SignOnUserAccount;
import tpms.framework.core.controller.Event;
import tpms.framework.core.controller.EventResponse;
import tpms.framework.core.controller.web.html.HTMLActionException;
import tpms.framework.core.controller.web.html.HTMLActionSupport;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *  클래스 개요    : SELECTBOX_UTIL /HTML 화면별 db에서 불러오는 콤보박스 유틸 <p>
 *  클래스 상세기능 : HTTP parser<p>
 *  작성일 : 2014.09.03<p>
 *  @version 1.0
 *  @author  조형석
 */
public class util_selectbox
{
  public String htmltag   = "";           
  public String strName   = "";
  public String strValue  = "";

  public void setData(String procedure_name,String param,String culumnvalue,String culumname)
  {
    DbResultSet rs  =  null;
    try
    {
      DBProcCall jado  =  new DBProcCall();
      rs = jado.callProc(procedure_name, param);
      if(rs != null)
      {
        rs.first();
        while(rs.next())
        {
          htmltag  += "<option value='" + rs.getString(culumnvalue).trim() + "'>" + rs.getString(culumname).trim() + "</option>";
        }
      }
    }
    catch(Exception e)
    {
      htmltag  =  e.toString();
    }
  }  
  
  
  public void setData2(String procedure_name,String param,String culumnvalue,String culumname)
  {
    DbResultSet rs  =  null;
    try
    {
      DBProcCall jado  =  new DBProcCall();
      rs = jado.callProc(procedure_name, param);
      if(rs != null)
      {
        rs.first();
        while(rs.next())
        {
          htmltag  += "<option value='" + rs.getString(culumnvalue).trim() + "'>" + rs.getString(culumnvalue).trim() + "|" + rs.getString(culumname).trim() + "</option>";
        }
      }
    }
    catch(Exception e)
    {
      htmltag  =  e.toString();
    }
  }  
    
  public String getData()
  {
    return htmltag;
  }
}