package tpms.framework.component.signon;


public class SignOnInvalidCharException extends RuntimeException
{

    public SignOnInvalidCharException()
    {
    }

    public SignOnInvalidCharException(String str)
    {
        super(str);
    }
}
