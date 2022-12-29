package tpms.framework.component.dao;

import java.io.Serializable;

public class DAOException extends Exception
    implements Serializable
{

    public DAOException()
    {
    }

    public DAOException(String str)
    {
        super(str);
    }
}
