package tpms.framework.component.signon.web;

import java.io.Serializable;

import javax.servlet.http.HttpSessionActivationListener;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionBindingListener;
import javax.servlet.http.HttpSessionEvent;

import org.apache.log4j.Logger;

import tpms.framework.component.signon.dao.UserDAO;

public class SignSessionListener
    implements Serializable, HttpSessionBindingListener
{

    private Logger log;

    public SignSessionListener()
    {
        log = Logger.getLogger(getClass().getName());
        log.debug("SignSessionListener");
    }

    public void valueBound(HttpSessionBindingEvent event){
    }

    public void valueUnbound(HttpSessionBindingEvent event){
        try {
            UserDAO userDAO = new UserDAO();
            userDAO.insertLog((String)event.getSession().getAttribute("j_signon_username"), "02", "");
        } catch(Exception ex) {
        }
    }
}
