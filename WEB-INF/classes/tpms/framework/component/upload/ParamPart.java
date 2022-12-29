package tpms.framework.component.upload;

import java.io.*;
import javax.servlet.ServletInputStream;

// Referenced classes of package tpms.framework.component.upload:
//            Part, PartInputStream

public class ParamPart extends Part
{

    private byte value[];
    private String encoding;

    ParamPart(String name, ServletInputStream in, String boundary, String encoding)
        throws IOException
    {
        super(name);
        this.encoding = encoding;
        PartInputStream pis = new PartInputStream(in, boundary);
        ByteArrayOutputStream baos = new ByteArrayOutputStream(512);
        byte buf[] = new byte[128];
        int i;
        while((i = pis.read(buf)) != -1) 
            baos.write(buf, 0, i);
        pis.close();
        baos.close();
        value = baos.toByteArray();
    }

    public byte[] getValue()
    {
        return value;
    }

    public String getStringValue()
        throws UnsupportedEncodingException
    {
        return getStringValue(encoding);
    }

    public String getStringValue(String encoding)
        throws UnsupportedEncodingException
    {
        return new String(value, encoding);
    }

    public boolean isParam()
    {
        return true;
    }
}
