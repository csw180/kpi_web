package tpms.framework.core.controller.web.html;

import tpms.framework.core.controller.web.ActionException;
import java.io.Serializable;

public class HTMLActionException extends ActionException
    implements Serializable
{

    public HTMLActionException()
    {
    }

    public HTMLActionException(String str)
    {
        super(str);
    }
}
