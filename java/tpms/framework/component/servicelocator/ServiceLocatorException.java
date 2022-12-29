package tpms.framework.component.servicelocator;


public class ServiceLocatorException extends RuntimeException
{

    private Exception exception;

    public ServiceLocatorException(String message, Exception exception)
    {
        super(message);
        this.exception = exception;
    }

    public ServiceLocatorException(String message)
    {
        this(message, null);
    }

    public ServiceLocatorException(Exception exception)
    {
        this(null, exception);
    }

    public Exception getException()
    {
        return exception;
    }

    public Exception getRootCause()
    {
        if(exception instanceof ServiceLocatorException)
            return ((ServiceLocatorException)exception).getRootCause();
        else
            return ((Exception) (exception != null ? exception : this));
    }

    public String toString()
    {
        if(exception instanceof ServiceLocatorException)
            return ((ServiceLocatorException)exception).toString();
        else
            return exception != null ? exception.toString() : super.toString();
    }
}
