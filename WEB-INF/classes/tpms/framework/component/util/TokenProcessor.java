package tpms.framework.component.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.log4j.Logger;

public class TokenProcessor
{

    private static Logger log;
    private static TokenProcessor instance = new TokenProcessor();
    static Class class$tpms$framework$component$util$TokenProcessor; /* synthetic field */

    public static TokenProcessor getInstance()
    {
        return instance;
    }

    protected TokenProcessor()
    {
    }

    public synchronized boolean isTokenValid(HttpServletRequest request)
    {
        return isTokenValid(request, false);
    }

    public synchronized boolean isTokenValid(HttpServletRequest request, boolean reset)
    {
        HttpSession session = request.getSession(false);
        if(session == null)
            return false;
        log.debug("request request=" + request);
        String saved = (String)session.getAttribute("tpms.framework.transaction.TOKEN");
        log.debug("saved token=" + saved);
        if(saved == null)
            return false;
        if(reset)
            resetToken(request);
        String token = request.getParameter("TOKEN");
        log.debug("request token=" + token);
        if(token == null)
            return false;
        else
            return saved.equals(token);
    }

    public synchronized boolean isTokenValid(HttpServletRequest request, String tokenString, boolean reset)
    {
        HttpSession session = request.getSession(false);
        if(session == null)
            return false;
        log.debug("request request=" + request);
        String saved = (String)session.getAttribute("tpms.framework.transaction.TOKEN");
        log.debug("saved token=" + saved);
        if(saved == null)
            return false;
        if(reset)
            resetToken(request);
        if(tokenString == null)
            return false;
        else
            return saved.equals(tokenString);
    }

    public synchronized void resetToken(HttpServletRequest request)
    {
        HttpSession session = request.getSession(false);
        if(session == null)
        {
            return;
        } else
        {
            session.removeAttribute("tpms.framework.transaction.TOKEN");
            return;
        }
    }

    public synchronized void saveToken(HttpServletRequest request)
    {
        HttpSession session = request.getSession();
        String token = generateToken(request);
        if(token != null)
            session.setAttribute("tpms.framework.transaction.TOKEN", token);
    }

    public String generateToken(HttpServletRequest request)
    {
        try{
           HttpSession session = request.getSession();
        MessageDigest md;
        byte id[] = session.getId().getBytes();
        byte now[] = (new Long(System.currentTimeMillis())).toString().getBytes();
        md = MessageDigest.getInstance("MD5");
        md.update(id);
        md.update(now);
        return toHex(md.digest());
    }catch(IllegalStateException e){
    }catch(NoSuchAlgorithmException e){
    }
    return null;
    }

    public String toHex(byte buffer[])
    {
        StringBuffer sb = new StringBuffer();
        String s = null;
        for(int i = 0; i < buffer.length; i++)
        {
            s = Integer.toHexString(buffer[i] & 0xff);
            if(s.length() < 2)
                sb.append('0');
            sb.append(s);
        }

        return sb.toString();
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
        log = Logger.getLogger(class$tpms$framework$component$util$TokenProcessor != null ? class$tpms$framework$component$util$TokenProcessor : (class$tpms$framework$component$util$TokenProcessor = setclass_name("tpms.framework.component.util.TokenProcessor")));
    }
}
