package tpms.framework.component.upload;

import java.io.IOException;

import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;

public class LimitedServletInputStream extends ServletInputStream
{

    private ServletInputStream in;
    private int totalExpected;
    private int totalRead;

    public LimitedServletInputStream(ServletInputStream in, int totalExpected)
    {
        totalRead = 0;
        this.in = in;
        this.totalExpected = totalExpected;
    }

    public int readLine(byte b[], int off, int len)
        throws IOException
    {
        int left = totalExpected - totalRead;
        if(left <= 0)
            return -1;
        int result = in.readLine(b, off, Math.min(left, len));
        if(result > 0)
            totalRead += result;
        return result;
    }

    public int read()
        throws IOException
    {
        if(totalRead >= totalExpected)
            return -1;
        int result = in.read();
        if(result != -1)
            totalRead++;
        return result;
    }

    public int read(byte b[], int off, int len)
        throws IOException
    {
        int left = totalExpected - totalRead;
        if(left <= 0)
            return -1;
        int result = in.read(b, off, Math.min(left, len));
        if(result > 0)
            totalRead += result;
        return result;
    }

	@Override
	public boolean isFinished() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isReady() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void setReadListener(ReadListener arg0) {
		// TODO Auto-generated method stub
		
	}
}
