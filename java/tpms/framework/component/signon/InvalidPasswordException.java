package tpms.framework.component.signon;


public class InvalidPasswordException extends RuntimeException
{

    public InvalidPasswordException()
    {
    }

    public InvalidPasswordException(String str)
    {
        super(str);
    }

}
