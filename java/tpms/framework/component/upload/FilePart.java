package tpms.framework.component.upload;

import java.io.*;
import javax.servlet.ServletInputStream;

public class FilePart extends Part
{

    private String fileName;
    private String filePath;
    private String contentType;
    private PartInputStream partInput;
    private FileRenamePolicy policy;

    FilePart(String name, ServletInputStream in, String boundary, String contentType, String fileName, String filePath)
        throws IOException
    {
        super(name);
        this.fileName = fileName;
        this.filePath = filePath;
        this.contentType = contentType;
        partInput = new PartInputStream(in, boundary);
    }

    public void setRenamePolicy(FileRenamePolicy policy)
    {
        this.policy = policy;
    }

    public String getFileName()
    {
        return fileName;
    }

    public String getFilePath()
    {
        return filePath;
    }

    public String getContentType()
    {
        return contentType;
    }

    public InputStream getInputStream()
    {
        return partInput;
    }

    public long writeTo(File fileOrDirectory)
        throws IOException
    {
        long written = 0L;
        OutputStream fileOut = null;
        try
        {
            if(fileName != null)
            {
                File file;
                if(fileOrDirectory.isDirectory())
                    file = new File(fileOrDirectory, fileName);
                else
                    file = fileOrDirectory;
                if(policy != null)
                {
                    file = policy.rename(file);
                    fileName = file.getName();
                }
                fileOut = new BufferedOutputStream(new FileOutputStream(file));
                written = write(fileOut);
            }
        }
        finally
        {
            if(fileOut != null)
                fileOut.close();
        }
        return written;
    }

    public long writeTo(OutputStream out)
        throws IOException
    {
        long size = 0L;
        if(fileName != null)
            size = write(out);
        return size;
    }

    long write(OutputStream out)
        throws IOException
    {
        if(contentType.equals("application/vnd.ms-powerpoint"))
            out = new MacBinaryDecoderOutputStream(out);
        long size = 0L;
        byte buf[] = new byte[8192];
        int i;
        while((i = partInput.read(buf)) != -1)
        {
            out.write(buf, 0, i);
            size += i;
        }
        return size;
    }

    public boolean isFile()
    {
        return true;
    }
}
