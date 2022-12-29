package tpms.framework.component.util;

import java.io.File;

class UploadedFile
{

    private String dir;
    private String filename;
    private String original;
    private String type;

    UploadedFile(String dir, String filename, String original, String type)
    {
        this.dir = dir;
        this.filename = filename;
        this.original = original;
        this.type = type;
    }

    public String getContentType()
    {
        return type;
    }

    public String getFilesystemName()
    {
        return filename;
    }

    public String getOriginalFileName()
    {
        return original;
    }

    public File getFile()
    {
        if(dir == null || filename == null)
            return null;
        else
            return new File(dir + File.separator + filename);
    }
}
