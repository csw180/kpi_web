package tpms.framework.component.rowset;

import java.io.*;
import java.sql.Clob;
import java.sql.SQLException;

public class DBlClob
    implements Clob, Serializable, Cloneable
{

    private char buffer[];
    private long length;

    public DBlClob(Clob clob)
        throws SQLException
    {
        length = clob.length();
        buffer = new char[(int)length];
        BufferedReader bufferedreader = new BufferedReader(clob.getCharacterStream());
        try
        {
            int i = 0;
            int j = 0;
            do
            {
                i = bufferedreader.read(buffer, j, (int)(length - (long)j));
                j += i;
            } while(i > 0);
        }
        catch(IOException ioexception)
        {
            throw new SQLException("SerialClob: " + ioexception.getMessage());
        }
    }

    public InputStream getAsciiStream()
        throws SQLException
    {
        return null;
    }

    public Reader getCharacterStream()
        throws SQLException
    {
        return new CharArrayReader(buffer);
    }

    public String getSubString(long l, int i)
        throws SQLException
    {
        if(l < 0L || (long)i > length || l + (long)i > length)
            throw new SQLException("Invalid Arguments");
        else
            return new String(buffer, (int)l, i);
    }

    public long length()
        throws SQLException
    {
        return length;
    }

    public long position(String s, long l)
        throws SQLException
    {
        if(l < 0L || l > length || l + (long)s.length() > length)
            throw new SQLException("Invalid Arguments");
        char ac[] = s.toCharArray();
        int i = (int)(l - 1L);
        boolean flag = false;
        long l1 = ac.length;
        if(l < 0L || l > length)
            return -1L;
        while((long)i < length) 
        {
            int j = 0;
            long l2 = i + 1;
            while(ac[j++] == buffer[i++]) 
                if((long)j == l1)
                    return l2;
        }
        return -1L;
    }

    public long position(Clob clob, long l)
        throws SQLException
    {
        return position(clob.getSubString(0L, (int)clob.length()), l);
    }

    public OutputStream setAsciiStream(long l)
        throws SQLException
    {
        throw new SQLException("UnsupportedFeature");
    }

    public Writer setCharacterStream(long l)
        throws SQLException
    {
        throw new SQLException("UnsupportedFeature");
    }

    public int setString(long l, String s)
        throws SQLException
    {
        throw new SQLException("UnsupportedFeature");
    }

    public int setString(long l, String s, int i, int j)
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
	public Reader getCharacterStream(long pos, long length) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}
}
