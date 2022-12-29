package tpms.framework.component.signon.dao;


public class SignOnDAOExpiredDateException extends Exception
{

    private String userId;
    private String userName;
    private String deptName;

    public SignOnDAOExpiredDateException(String str)
    {
        super(str);
        userId = "";
        userName = "";
        deptName = "";
    }

    public SignOnDAOExpiredDateException()
    {
        userId = "";
        userName = "";
        deptName = "";
    }

    public void setUserId(String userId)
    {
        this.userId = userId;
    }

    public String getUserId()
    {
        return userId;
    }
}
