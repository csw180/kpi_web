package tpms.framework.component.signon;


public class SignOnDupKeyException extends RuntimeException
{

    public SignOnDupKeyException()
    {
    }

    public SignOnDupKeyException(String str)
    {
        super(str);
    }
}
