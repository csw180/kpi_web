package tpms.framework.component.rowset;

import java.io.*;
import java.sql.Blob;
import java.sql.SQLException;

public class DBBlob
    implements Blob, Serializable, Cloneable
{

    private byte buffer[];
    private long length;

    public DBBlob(Blob blob)
        throws SQLException
    {
        length = blob.length();
        buffer = new byte[(int)length];
        BufferedInputStream bufferedinputstream = new BufferedInputStream(blob.getBinaryStream());
        try
        {
            int i = 0;
            int j = 0;
            do
            {
                i = bufferedinputstream.read(buffer, j, (int)(length - (long)j));
                j += i;
            } while(i > 0);
        }
        catch(IOException ioexception)
        {
            throw new SQLException("SerialBlob: " + ioexception.getMessage());
        }
    }

    public InputStream getBinaryStream()
        throws SQLException
    {
        return new ByteArrayInputStream(buffer);
    }

    public byte[] getBytes(long l, int i)
        throws SQLException
    {
        if(l < 0L || (long)i > length || l + (long)i > length)
        {
            throw new SQLException("Invalid Arguments");
        } else
        {
            byte abyte0[] = new byte[i];
            System.arraycopy(buffer, (int)l, abyte0, 0, i);
            return abyte0;
        }
    }

    public long length()
        throws SQLException
    {
        return length;
    }

    public long position(Blob blob, long l)
        throws SQLException
    {
        return position(blob.getBytes(0L, (int)blob.length()), l);
    }

    public long position(byte abyte0[], long l)
        throws SQLException
    {
        if(l < 0L || l > length || l + (long)abyte0.length > length)
            throw new SQLException("Invalid Arguments");
        int i = (int)(l - 1L);
        boolean flag = false;
        long l1 = abyte0.length;
        if(l < 0L || l > length)
            return -1L;
        while((long)i < length) 
        {
            int j = 0;
            long l2 = i + 1;
            while(abyte0[j++] == buffer[i++]) 
                if((long)j == l1)
                    return l2;
        }
        return -1L;
    }

    public OutputStream setBinaryStream(long l)
        throws SQLException
    {
        throw new SQLException("UnsupportedFeature");
    }

    public int setBytes(long l, byte abyte0[])
        throws SQLException
    {
        throw new SQLException("UnsupportedFeature");
    }

    public int setBytes(long l, byte abyte0[], int i, int j)
        throws SQLException
    {
        throw new SQLException("UnsupportedFeature");
    }

    public void truncate(long l)
        throws SQLException
    {
        throw new SQLException("UnsupportedFeature");
    }

	@Override
	public void free() throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public InputStream getBinaryStream(long pos, long length) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}
}
