package tpms.framework.component.util;

import tpms.framework.component.upload.*;
import java.io.File;
import java.io.IOException;
import java.util.*;
import javax.servlet.http.HttpServletRequest;

public class MultipartRequest
{

    private static final int DEFAULT_MAX_POST_SIZE = 0x100000;
    private static final String DEFAULT_ENCODING = "EUC-KR";
    protected Hashtable parameters;
    protected Hashtable files;

    public MultipartRequest(HttpServletRequest request, String saveDirectory)
        throws IOException
    {
        this(request, saveDirectory, 0x100000);
    }

    public MultipartRequest(HttpServletRequest request, String saveDirectory, int maxPostSize)
        throws IOException
    {
        this(request, saveDirectory, maxPostSize, "EUC-KR", null);
    }

    public MultipartRequest(HttpServletRequest request, String saveDirectory, String encoding)
        throws IOException
    {
        this(request, saveDirectory, 0x100000, encoding, null);
    }

    public MultipartRequest(HttpServletRequest request, String saveDirectory, FileRenamePolicy policy)
        throws IOException
    {
        this(request, saveDirectory, 0x100000, "EUC-KR", policy);
    }

    public MultipartRequest(HttpServletRequest request, String saveDirectory, int maxPostSize, FileRenamePolicy policy)
        throws IOException
    {
        this(request, saveDirectory, maxPostSize, "EUC-KR", policy);
    }

    public MultipartRequest(HttpServletRequest request, String saveDirectory, int maxPostSize, String encoding)
        throws IOException
    {
        this(request, saveDirectory, maxPostSize, encoding, null);
    }

    public MultipartRequest(HttpServletRequest request, String saveDirectory, int maxPostSize, String encoding, FileRenamePolicy policy)
        throws IOException
    {
        parameters = new Hashtable();
        files = new Hashtable();
        if(request == null)
            throw new IllegalArgumentException("request cannot be null");
        if(saveDirectory == null)
            throw new IllegalArgumentException("saveDirectory cannot be null");
        if(maxPostSize <= 0)
            throw new IllegalArgumentException("maxPostSize must be positive");
        File dir = new File(saveDirectory);
        if(!dir.isDirectory())
            throw new IllegalArgumentException("Not a directory: " + saveDirectory);
        if(!dir.canWrite())
            throw new IllegalArgumentException("Not writable: " + saveDirectory);
        MultipartParser parser = new MultipartParser(request, maxPostSize, true, true, encoding);
        Part part1;
        while((part1 = parser.readNextPart()) != null)
        {
            String name = part1.getName();
            if(part1.isParam())
            {
                ParamPart paramPart = (ParamPart)part1;
                String value = paramPart.getStringValue();
                Vector existingValues = (Vector)parameters.get(name);
                if(existingValues == null)
                {
                    existingValues = new Vector();
                    parameters.put(name, existingValues);
                }
                existingValues.addElement(value);
            } else
            if(part1.isFile())
            {
                FilePart filePart = (FilePart)part1;
                String fileName = filePart.getFileName();
                if(fileName != null)
                {
                    filePart.setRenamePolicy(policy);
                    filePart.writeTo(dir);
                    files.put(name, new UploadedFile(dir.toString(), filePart.getFileName(), fileName, filePart.getContentType()));
                } else
                {
                    files.put(name, new UploadedFile(null, null, null, null));
                }
            }
        }
    }

    public Enumeration getParameterNames()
    {
        return parameters.keys();
    }

    public Enumeration getFileNames()
    {
        return files.keys();
    }

    public String getParameter(String name)
    {
        try{
          Vector values = (Vector) parameters.get(name);
          if (values == null || values.size() == 0)
            return null;
          String value;
          value = (String) values.elementAt(values.size() - 1);
          if (value == null)
            value = "";
          return value;
        }catch(Exception e){

          return null;
        }
    }

    public String[] getParameterValues(String name)
    {
        try{
          Vector values = (Vector)parameters.get(name);
          if (values == null || values.size() == 0)
            return null;
          String valuesArray[];
          valuesArray = new String[values.size()];
          values.copyInto(valuesArray);
          return valuesArray;
        }catch(Exception e){
          return null;
        }
    }

    public String getFilesystemName(String name)
    {
        try{
          UploadedFile file = (UploadedFile)files.get(name);
          return file.getFilesystemName();
        }catch(Exception e){
          return null;
        }
    }

    public String getOriginalFileName(String name)
    {
        try{
          UploadedFile file = (UploadedFile)files.get(name);
          return file.getOriginalFileName();
        }catch(Exception e){
          return null;
        }
    }

    public String getContentType(String name)
    {
        try{
          UploadedFile file = (UploadedFile)files.get(name);
          return file.getContentType();
        }catch(Exception e){
          return null;
        }
    }

    public File getFile(String name)
    {
        try{
          UploadedFile file = (UploadedFile)files.get(name);
          return file.getFile();
        }catch(Exception e){
          return null;
        }
    }
}
