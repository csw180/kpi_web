package tpms.framework.component.rowset;

import java.io.*;
import java.math.BigDecimal;
import java.sql.*;
import java.util.*;
import java.util.Date;
import javax.sql.*;

public class DBRowSet
    implements Serializable, Cloneable
{

    private Map typeMap;
    private int maxFieldSize;
    private int maxRows;
    private int fetchSize;
    private boolean escapeProcessing;
    private int concurrency;
    private boolean readOnly;
    private int fetchDirection;
    private int type;
    private SQLWarning sqlWarning;
    private int presentRow;
    private boolean previousColumnWasNull;
    private Vector listener;
    private DBRow insertRow;
    private int insertRowPosition;
    private boolean insertRowFlag;
    private int updateRowPosition;
    private boolean updateRowFlag;
    private ResultSetMetaData rowsetMetaData;
    private RowSetEvent rowsetEvent;
    private transient ResultSet resultSet;
    private transient Connection connection;
    private Vector rows;
    private Vector param;
    private String metaData[];
    private int colCount;
    private int rowCount;

    public DBRowSet()
    {
        presentRow = 0;
        previousColumnWasNull = false;
        listener = new Vector();
        param = new Vector();
        sqlWarning = new SQLWarning();
        escapeProcessing = false;
        insertRowFlag = false;
        updateRowFlag = false;
        type = 1005;
        fetchDirection = 1002;
        readOnly = true;
        maxFieldSize = 0;
        maxRows = 0;
        fetchSize = 0;
        typeMap = new HashMap();
        concurrency = 1007;
    }

    public boolean absolute(int i)
        throws SQLException
    {
        if(type == 1003)
            throw new SQLException("The RowSet type is TYPE_FORWARD_ONLY");
        if(i == 0 || Math.abs(i) > rowCount)
        {
            return false;
        } else
        {
            presentRow = i < 0 ? rowCount + i + 1 : i;
            notifyCursorMovement();
            return true;
        }
    }

    public void afterLast()
        throws SQLException
    {
        presentRow = rowCount + 1;
    }

    public void beforeFirst()
        throws SQLException
    {
        presentRow = 0;
    }

    private final void checkColumnIndex(int i)
        throws SQLException
    {
        if(readOnly)
            throw new SQLException("The RowSet is not write enabled");
        if(i < 1 || i > colCount)
            throw new SQLException("invalid index : " + i);
        else
            return;
    }

    private final void checkParamIndex(int i)
        throws SQLException
    {
        if(i < 1)
            throw new SQLException("Invalid parameter index : " + i);
        else
            return;
    }

    public synchronized void clearParameters()
        throws SQLException
    {
        param = null;
        param = new Vector();
        System.gc();
    }

    public void clearWarnings()
        throws SQLException
    {
        new SQLWarning();
    }

    public Object clone()
        throws CloneNotSupportedException
    {
        try{
          return createCopy();
        }catch(SQLException sqlexception){

        throw new CloneNotSupportedException("SQL Error occured while cloning,\n" + sqlexception.getMessage());
        }
    }

    public DBRowSet createCopy()
        throws SQLException
    {
        DBRowSet oraclecachedrowset = createShared();
        int i = rows.size();
        oraclecachedrowset.rows = new Vector(i);
        for(int j = 0; j < i; j++)
            oraclecachedrowset.rows.add(((DBRow)rows.elementAt(j)).createCopy());

        return oraclecachedrowset;
    }

    public DBRowSet createShared()
        throws SQLException
    {
        DBRowSet oraclecachedrowset = new DBRowSet();
        oraclecachedrowset.rows = rows;
        oraclecachedrowset.setTypeMap(getTypeMap());
        oraclecachedrowset.setMaxFieldSize(getMaxFieldSize());
        oraclecachedrowset.setMaxRows(getMaxRows());
        oraclecachedrowset.setFetchSize(getFetchSize());
        oraclecachedrowset.setEscapeProcessing(getEscapeProcessing());
        oraclecachedrowset.setReadOnly(readOnly);
        type = getType();
        fetchDirection = getFetchDirection();
        oraclecachedrowset.presentRow = presentRow;
        oraclecachedrowset.colCount = colCount;
        oraclecachedrowset.rowCount = rowCount;
        int i = listener.size();
        for(int j = 0; j < i; j++)
            oraclecachedrowset.listener.add(listener.elementAt(j));

        oraclecachedrowset.rowsetMetaData = new DBRowSetMetaData(rowsetMetaData);
        i = param.size();
        for(int k = 0; k < i; k++)
            oraclecachedrowset.param.add(param.elementAt(k));

        oraclecachedrowset.metaData = new String[metaData.length];
        System.arraycopy(metaData, 0, oraclecachedrowset.metaData, 0, metaData.length);
        return oraclecachedrowset;
    }

    public int findColumn(String s)
        throws SQLException
    {
        return getColumnIndex(s);
    }

    public boolean first()
        throws SQLException
    {
        return absolute(1);
    }

    public Array getArray(int i)
        throws SQLException
    {
        Object obj = getObject(i);
        if(obj == null || (obj instanceof Array))
            return (Array)obj;
        else
            throw new SQLException("Invalid column type");
    }

    public Array getArray(String s)
        throws SQLException
    {
        return getArray(getColumnIndex(s));
    }

    public InputStream getAsciiStream(int i)
        throws SQLException
    {
        InputStream inputstream = getStream(i);
        return inputstream == null ? null : inputstream;
    }

    public InputStream getAsciiStream(String s)
        throws SQLException
    {
        return getAsciiStream(getColumnIndex(s));
    }

    public BigDecimal getBigDecimal(int i)
        throws SQLException
    {
        BigDecimal bigdecimal = (BigDecimal)getNumber(i);
        return bigdecimal == null ? null : bigdecimal;
    }

    public BigDecimal getBigDecimal(int i, int j)
        throws SQLException
    {
        return getBigDecimal(i);
    }

    public BigDecimal getBigDecimal(String s)
        throws SQLException
    {
        return getBigDecimal(getColumnIndex(s));
    }

    public BigDecimal getBigDecimal(String s, int i)
        throws SQLException
    {
        return getBigDecimal(getColumnIndex(s), i);
    }

    public InputStream getBinaryStream(int i)
        throws SQLException
    {
        InputStream inputstream = getStream(i);
        return inputstream == null ? null : inputstream;
    }

    public InputStream getBinaryStream(String s)
        throws SQLException
    {
        return getBinaryStream(getColumnIndex(s));
    }

    public Blob getBlob(int i)
        throws SQLException
    {
        Object obj = getObject(i);
        if(obj instanceof DBBlob)
            return obj == null ? null : (Blob)obj;
        else
            throw new SQLException("Invalid column type");
    }

    public Blob getBlob(String s)
        throws SQLException
    {
        return getBlob(getColumnIndex(s));
    }

    public boolean getBoolean(int i)
        throws SQLException
    {
        Object obj = getObject(i);
        if(obj == null)
            return false;
        if(obj instanceof Boolean)
            return ((Boolean)obj).booleanValue();
        if(obj instanceof BigDecimal)
            return ((BigDecimal)obj).doubleValue() != 0.0D;
        else
            throw new SQLException("Fail to convert to internal representation");
    }

    public boolean getBoolean(String s)
        throws SQLException
    {
        return getBoolean(getColumnIndex(s));
    }

    public byte getByte(int i)
        throws SQLException
    {
        Object obj = getObject(i);
        if(obj == null)
            return 0;
        if(obj instanceof Byte)
            return ((Byte)obj).byteValue();
        if(obj instanceof BigDecimal)
            return ((BigDecimal)obj).toString().getBytes()[0];
        if(obj instanceof String)
            return ((String)obj).getBytes()[0];
        if(obj instanceof DBBlob)
        {
            DBBlob oracleserialblob = (DBBlob)obj;
            return oracleserialblob.getBytes(0L, 1)[0];
        }
        if(obj instanceof DBlClob)
        {
            DBlClob oracleserialclob = (DBlClob)obj;
            return oracleserialclob.getSubString(0L, 1).getBytes()[0];
        } else
        {
            throw new SQLException("Fail to convert to internal representation");
        }
    }

    public byte getByte(String s)
        throws SQLException
    {
        return getByte(getColumnIndex(s));
    }

    public byte[] getBytes(int i)
        throws SQLException
    {
        Object obj = getObject(i);
        if(obj == null)
            return (byte[])obj;
        if(obj instanceof byte[])
            return (byte[])obj;
        if(obj instanceof String)
            return ((String)obj).getBytes();
        if(obj instanceof BigDecimal)
            return ((BigDecimal)obj).toString().getBytes();
        if(obj instanceof DBBlob)
        {
            DBBlob oracleserialblob = (DBBlob)obj;
            return oracleserialblob.getBytes(0L, (int)oracleserialblob.length());
        }
        if(obj instanceof DBlClob)
        {
            DBlClob oracleserialclob = (DBlClob)obj;
            return oracleserialclob.getSubString(0L, (int)oracleserialclob.length()).getBytes();
        } else
        {
            throw new SQLException("Fail to convert to internal representation");
        }
    }

    public byte[] getBytes(String s)
        throws SQLException
    {
        return getBytes(getColumnIndex(s));
    }

    public synchronized Reader getCharacterStream(int i)
        throws SQLException
    {
        try{
          InputStream inputstream = getAsciiStream(i);
        if(inputstream == null)
            return null;
        CharArrayReader chararrayreader;
        StringBuffer stringbuffer = new StringBuffer();
        for(int j = 0; (j = inputstream.read()) != -1;)
            stringbuffer.append((char)j);

        char ac[] = new char[stringbuffer.length()];
        stringbuffer.getChars(0, stringbuffer.length(), ac, 0);
        chararrayreader = new CharArrayReader(ac);
        ac = null;
        return chararrayreader;
        }catch(IOException _ex){

          throw new SQLException("Error: could not read from the stream");
        }
    }

    public Reader getCharacterStream(String s)
        throws SQLException
    {
        return getCharacterStream(getColumnIndex(s));
    }

    public Clob getClob(int i)
        throws SQLException
    {
        Object obj = getObject(i);
        if(obj instanceof DBlClob)
            return obj == null ? null : (Clob)obj;
        else
            throw new SQLException("Invalid column type");
    }

    public Clob getClob(String s)
        throws SQLException
    {
        return getClob(getColumnIndex(s));
    }

    private final int getColumnIndex(String s)
        throws SQLException
    {
        s = s.toUpperCase();
        int i;
        for(i = 0; i < metaData.length; i++)
            if(s.equals(metaData[i]))
                break;

        if(i >= metaData.length)
            throw new SQLException("Invalid column name: " + s);
        else
            return i + 1;
    }

    public int getConcurrency()
        throws SQLException
    {
        return concurrency;
    }

    public Connection getConnection()
        throws SQLException
    {
        return connection;
    }

    DBRow getCurrentRow()
        throws SQLException
    {
        int i = presentRow - 1;
        if(presentRow < 1 || presentRow > rowCount)
            throw new SQLException("Operation with out calling next/previous");
        else
            return (DBRow)rows.elementAt(presentRow - 1);
    }

    public String getCursorName()
        throws SQLException
    {
        throw new SQLException("Getting the cursor name is not supported.");
    }

    public Date getDate(int i)
        throws SQLException
    {
        Object obj = getObject(i);
        if(obj == null)
            return (Date)obj;
        if(obj instanceof Timestamp)
        {
            Timestamp timestamp = (Timestamp)obj;
            return new Date(timestamp.getTime());
        } else
        {
            throw new SQLException("Invalid column type");
        }
    }

    public Date getDate(int i, Calendar calendar)
        throws SQLException
    {
        return getDate(i);
    }

    public Date getDate(String s)
        throws SQLException
    {
        return getDate(getColumnIndex(s));
    }

    public Date getDate(String s, Calendar calendar)
        throws SQLException
    {
        return getDate(getColumnIndex(s), calendar);
    }

    public double getDouble(int i)
        throws SQLException
    {
        Number number = getNumber(i);
        return number == null ? 0.0D : number.doubleValue();
    }

    public double getDouble(String s)
        throws SQLException
    {
        return getDouble(getColumnIndex(s));
    }

    public boolean getEscapeProcessing()
        throws SQLException
    {
        return escapeProcessing;
    }

    public int getFetchDirection()
        throws SQLException
    {
        return fetchDirection;
    }

    public int getFetchSize()
        throws SQLException
    {
        return fetchSize;
    }

    public float getFloat(int i)
        throws SQLException
    {
        Number number = getNumber(i);
        return number == null ? 0.0F : number.floatValue();
    }

    public float getFloat(String s)
        throws SQLException
    {
        return getFloat(getColumnIndex(s));
    }

    public int getInt(int i)
        throws SQLException
    {
        Number number = getNumber(i);
        return number == null ? 0 : number.intValue();
    }

    public int getInt(String s)
        throws SQLException
    {
        return getInt(getColumnIndex(s));
    }

    public long getLong(int i)
        throws SQLException
    {
        Number number = getNumber(i);
        return number == null ? 0L : number.longValue();
    }

    public long getLong(String s)
        throws SQLException
    {
        return getLong(getColumnIndex(s));
    }

    public int getMaxFieldSize()
        throws SQLException
    {
        return maxFieldSize;
    }

    public int getMaxRows()
        throws SQLException
    {
        return maxRows;
    }

    public ResultSetMetaData getMetaData()
        throws SQLException
    {
        return rowsetMetaData;
    }

    private synchronized Number getNumber(int i)
        throws SQLException
    {
        Object obj = getObject(i);
        if(obj == null || (obj instanceof BigDecimal) || (obj instanceof Number))
            return (Number)obj;
        else
            throw new SQLException("Fail to convert to internal representation");
    }

    public synchronized Object getObject(int i)
        throws SQLException
    {
        int j = (presentRow * colCount + i) - 1;
        Object obj = null;
        if(!isUpdated(i))
            obj = getCurrentRow().getColumn(i);
        else
            obj = getCurrentRow().getModifiedColumn(i);
        previousColumnWasNull = obj == null;
        return obj;
    }

    public Object getObject(int i, Map map)
        throws SQLException
    {
        return getObject(i);
    }

    public synchronized Object getObject(String s)
        throws SQLException
    {
        return getObject(getColumnIndex(s));
    }

    public Object getObject(String s, Map map)
        throws SQLException
    {
        return getObject(getColumnIndex(s), map);
    }

    public Object[] getParams()
        throws SQLException
    {
        return param.toArray();
    }

    public Ref getRef(int i)
        throws SQLException
    {
        Object obj = getObject(i);
        if(obj == null || (obj instanceof Ref))
            return (Ref)obj;
        else
            throw new SQLException("Invalid column type");
    }

    public Ref getRef(String s)
        throws SQLException
    {
        return getRef(getColumnIndex(s));
    }

    public int getRow()
        throws SQLException
    {
        if(presentRow > rowCount)
            return rowCount;
        if(presentRow == 0)
            return 1;
        else
            return presentRow;
    }

    public int getRowCount()
    {
        return rowCount;
    }

    public short getShort(int i)
        throws SQLException
    {
        Number number = getNumber(i);
        return number == null ? 0 : number.shortValue();
    }

    public short getShort(String s)
        throws SQLException
    {
        return getShort(getColumnIndex(s));
    }

    public Statement getStatement()
        throws SQLException
    {
        if(connection == null || connection.isClosed())
            throw new SQLException("Connection not open");
        if(resultSet == null)
            throw new SQLException("ResultSet not open");
        else
            return resultSet.getStatement();
    }

    private synchronized InputStream getStream(int i)
        throws SQLException
    {
        Object obj = getObject(i);
        if(obj == null)
            return null;
        if(obj instanceof InputStream)
            return (InputStream)obj;
        if(obj instanceof String)
            return new ByteArrayInputStream(((String)obj).getBytes());
        if(obj instanceof byte[])
            return new ByteArrayInputStream((byte[])obj);
        if(obj instanceof DBlClob)
            return ((DBlClob)obj).getAsciiStream();
        if(obj instanceof DBBlob)
            return ((DBBlob)obj).getBinaryStream();
        else
            throw new SQLException("Could not convert the column into a stream type");
    }

    public String getString(int i)
        throws SQLException
    {
        Object obj = getObject(i);
        if(obj == null)
            return (String)obj;
        if(obj instanceof String)
            return (String)obj;
        if(obj instanceof BigDecimal)
            return obj.toString();
        if(obj instanceof byte[])
            return new String((byte[])obj);
        if(obj instanceof DBlClob)
        {
            DBlClob oracleserialclob = (DBlClob)obj;
            return oracleserialclob.getSubString(0L, (int)oracleserialclob.length());
        }
        if(obj instanceof DBBlob)
        {
            DBBlob oracleserialblob = (DBBlob)obj;
            return new String(oracleserialblob.getBytes(0L, (int)oracleserialblob.length()));
        } else
        {
            throw new SQLException("Fail to convert to internal representation");
        }
    }

    public String getString(String s)
        throws SQLException
    {
        return getString(getColumnIndex(s));
    }

    public Time getTime(int i)
        throws SQLException
    {
        Object obj = getObject(i);
        if(obj == null)
            return (Time)obj;
        if(obj instanceof Timestamp)
        {
            Timestamp timestamp = (Timestamp)obj;
            return new Time(timestamp.getTime());
        } else
        {
            throw new SQLException("Invalid column type");
        }
    }

    public Time getTime(int i, Calendar calendar)
        throws SQLException
    {
        return getTime(i);
    }

    public Time getTime(String s)
        throws SQLException
    {
        return getTime(getColumnIndex(s));
    }

    public Time getTime(String s, Calendar calendar)
        throws SQLException
    {
        return getTime(getColumnIndex(s), calendar);
    }

    public Timestamp getTimestamp(int i)
        throws SQLException
    {
        Object obj = getObject(i);
        if(obj == null || (obj instanceof Timestamp))
            return (Timestamp)obj;
        else
            throw new SQLException("Invalid column type");
    }

    public Timestamp getTimestamp(int i, Calendar calendar)
        throws SQLException
    {
        return getTimestamp(i);
    }

    public Timestamp getTimestamp(String s)
        throws SQLException
    {
        return getTimestamp(getColumnIndex(s));
    }

    public Timestamp getTimestamp(String s, Calendar calendar)
        throws SQLException
    {
        return getTimestamp(getColumnIndex(s), calendar);
    }

    public int getType()
        throws SQLException
    {
        return type;
    }

    public Map getTypeMap()
        throws SQLException
    {
        return typeMap;
    }

    public InputStream getUnicodeStream(int i)
        throws SQLException
    {
        Object obj = getObject(i);
        if(obj == null)
            return (InputStream)obj;
        if(obj instanceof String)
            return null;
        else
            throw new SQLException("Fail to convert to internal representation");
    }

    public InputStream getUnicodeStream(String s)
        throws SQLException
    {
        return getUnicodeStream(getColumnIndex(s));
    }

    public SQLWarning getWarnings()
        throws SQLException
    {
        return sqlWarning;
    }

    public boolean isAfterLast()
        throws SQLException
    {
        return rowCount > 0 && presentRow == rowCount + 1;
    }

    public boolean isBeforeFirst()
        throws SQLException
    {
        return rowCount > 0 && presentRow == 0;
    }

    public boolean isFirst()
        throws SQLException
    {
        return presentRow == 1;
    }

    public boolean isLast()
        throws SQLException
    {
        return presentRow == rowCount;
    }

    public boolean isReadOnly()
    {
        return readOnly;
    }

    private final boolean isUpdated(int i)
        throws SQLException
    {
        if(i < 1 || i > colCount)
            throw new SQLException("Invalid index : " + i);
        else
            return getCurrentRow().isColumnChanged(i);
    }

    public boolean last()
        throws SQLException
    {
        return absolute(-1);
    }

    public void moveToCurrentRow()
        throws SQLException
    {
        insertRowFlag = false;
        updateRowFlag = false;
        absolute(presentRow);
    }

    public void moveToInsertRow()
        throws SQLException
    {
        insertRow = new DBRow(colCount, true);
        insertRowFlag = true;
        if(isAfterLast())
            insertRowPosition = presentRow;
        else
            insertRowPosition = presentRow + 1;
    }

    public boolean next()
        throws SQLException
    {
        if(rowCount < 0)
            return false;
        if(fetchDirection == 1000 || fetchDirection == 1002)
            if(presentRow + 1 <= rowCount)
            {
                presentRow++;
                notifyCursorMovement();
                return true;
            } else
            {
                presentRow = rowCount + 1;
                return false;
            }
        if(fetchDirection == 1001)
        {
            if(presentRow - 1 > 0)
            {
                presentRow--;
                notifyCursorMovement();
                return true;
            } else
            {
                presentRow = 0;
                return false;
            }
        } else
        {
            return false;
        }
    }

    private final synchronized void notifyCursorMovement()
    {
        if(insertRowFlag)
        {
            insertRowFlag = false;
            insertRow.setRowUpdated(false);
            sqlWarning.setNextWarning(new SQLWarning("Cancelling insertion, due to cursor movement."));
        } else
        if(updateRowFlag)
            try
            {
                updateRowFlag = false;
                int i = presentRow;
                presentRow = updateRowPosition;
                getCurrentRow().setRowUpdated(false);
                presentRow = i;
                sqlWarning.setNextWarning(new SQLWarning("Cancelling all updates, due to cursor movement."));
            }
            catch(SQLException _ex) { }
        int j = listener.size();
        if(j > 0)
        {
            for(int k = 0; k < j; k++)
                ((RowSetListener)listener.elementAt(k)).cursorMoved(rowsetEvent);

        }
    }

    private final void notifyRowSetModified()
    {
        int i = listener.size();
        if(i > 0)
        {
            for(int j = 0; j < i; j++)
                ((RowSetListener)listener.elementAt(j)).rowSetChanged(rowsetEvent);

        }
    }

    public synchronized void populate(ResultSet resultset)
        throws SQLException
    {
        rows = new Vector(50, 10);
        rowsetMetaData = new DBRowSetMetaData(resultset.getMetaData());
        metaData = new String[colCount = rowsetMetaData.getColumnCount()];
        for(int i = 0; i < colCount; i++)
            metaData[i] = rowsetMetaData.getColumnName(i + 1);

        populateInit(resultset);
        rowCount = 0;
        Object obj = null;
        while(resultset.next())
        {
            DBRow oraclerow = new DBRow(colCount);
            for(int j = 1; j <= colCount; j++)
            {
                Object obj1 = null;
                try
                {
                    obj1 = resultset.getObject(j, typeMap);
                }
                catch(Exception _ex)
                {
                    obj1 = resultset.getObject(j);
                }
                catch(AbstractMethodError _ex)
                {
                    obj1 = resultset.getObject(j);
                }
//                if((obj1 instanceof Clob) || (obj1 instanceof CLOB))
//                    oraclerow.setColumnValue(j, new DBlClob((Clob)obj1));
//                else
//                if((obj1 instanceof Blob) || (obj1 instanceof BLOB))
//                    oraclerow.setColumnValue(j, new DBBlob((Blob)obj1));
//                else
//                    oraclerow.setColumnValue(j, obj1);
            }

            rows.add(oraclerow);
            rowCount++;
        }
        notifyRowSetModified();
    }

    private final void populateInit(ResultSet resultset)
        throws SQLException
    {
        resultSet = resultset;
        Statement statement = resultset.getStatement();
        maxFieldSize = statement.getMaxFieldSize();
        maxRows = statement.getMaxRows();
        fetchSize = statement.getFetchSize();
        connection = statement.getConnection();
       /* typeMap = connection.getTypeMap();*/
        java.sql.DatabaseMetaData databasemetadata = connection.getMetaData();
    }

    public boolean previous()
        throws SQLException
    {
        if(rowCount < 0)
            return false;
        if(fetchDirection == 1001)
            if(presentRow + 1 <= rowCount)
            {
                presentRow++;
                notifyCursorMovement();
                return true;
            } else
            {
                presentRow = rowCount + 1;
                return false;
            }
        if(fetchDirection == 1000 || fetchDirection == 1002)
        {
            if(presentRow - 1 > 0)
            {
                presentRow--;
                notifyCursorMovement();
                return true;
            } else
            {
                presentRow = 0;
                return false;
            }
        } else
        {
            return false;
        }
    }

    public void refreshRow()
        throws SQLException
    {
        DBRow oraclerow = getCurrentRow();
        if(oraclerow.isRowUpdated())
            oraclerow.cancelRowUpdates();
    }

    public boolean relative(int i)
        throws SQLException
    {
        return absolute(presentRow + i);
    }

    public void release()
        throws SQLException
    {
        rows = null;
        rows = new Vector();
        if(connection != null && !connection.isClosed())
            connection.close();
        rowCount = 0;
        presentRow = 0;
    }

    public void restoreOriginal()
        throws SQLException
    {
        boolean flag = false;
        for(int i = 0; i < rowCount; i++)
        {
            DBRow oraclerow = (DBRow)rows.elementAt(i);
            if(oraclerow.isRowInserted())
            {
                rows.remove(i);
                rowCount--;
                i--;
                flag = true;
            } else
            if(oraclerow.isRowUpdated())
            {
                oraclerow.setRowUpdated(false);
                flag = true;
            } else
            if(oraclerow.isRowDeleted())
            {
                oraclerow.setRowDeleted(false);
                flag = true;
            }
        }

        if(!flag)
        {
            throw new SQLException("None of the rows are changed");
        } else
        {
            presentRow = 0;
            System.gc();
            return;
        }
    }

    public void setEscapeProcessing(boolean flag)
        throws SQLException
    {
        escapeProcessing = flag;
    }

    public void setFetchDirection(int i)
        throws SQLException
    {
        if(type == 1005)
            throw new SQLException("Fetch direction cannot be applied when RowSet type is TYPE_SCROLL_SENSITIVE");
        switch(i)
        {
        case 1000:
        case 1002:
            presentRow = 0;
            break;

        case 1001:
            if(type == 1003)
                throw new SQLException("FETCH_REVERSE cannot be applied when RowSet type is TYPE_FORWARD_ONLY");
            presentRow = rowCount + 1;
            break;

        default:
            throw new SQLException("Illegal fetch direction");
        }
        fetchDirection = i;
    }

    public void setFetchSize(int i)
        throws SQLException
    {
        fetchSize = i;
    }

    public void setMaxFieldSize(int i)
        throws SQLException
    {
        maxFieldSize = i;
    }

    public void setMaxRows(int i)
        throws SQLException
    {
        maxRows = i;
    }

    public void setMetaData(RowSetMetaData rowsetmetadata)
    {
        rowsetMetaData = rowsetmetadata;
    }

    public void setNull(int i, int j)
        throws SQLException
    {
        checkParamIndex(i);
        param.add(i - 1, null);
    }

    public void setNull(int i, int j, String s)
        throws SQLException
    {
        checkParamIndex(i);
        Object aobj[] = {
            new Integer(j), s
        };
        param.add(i - 1, ((Object) (aobj)));
    }

    public void setObject(int i, Object obj)
        throws SQLException
    {
        checkParamIndex(i);
        param.add(i - 1, obj);
    }

    public void setObject(int i, Object obj, int j)
        throws SQLException
    {
        checkParamIndex(i);
        Object aobj[] = {
            obj, new Integer(j)
        };
        param.add(i - 1, ((Object) (aobj)));
    }

    public void setObject(int i, Object obj, int j, int k)
        throws SQLException
    {
        checkParamIndex(i);
        Object aobj[] = {
            obj, new Integer(j), new Integer(k)
        };
        param.add(i - 1, ((Object) (aobj)));
    }

    public void setReadOnly(boolean flag)
        throws SQLException
    {
        readOnly = flag;
    }

    public void setRef(int i, Ref ref)
        throws SQLException
    {
        checkParamIndex(i);
        param.add(i - 1, ref);
    }

    public void setType(int i)
        throws SQLException
    {
        if(i == 1003 || i == 1004 || i == 1005)
            type = i;
        else
            throw new SQLException("Unknown RowSet type");
    }

    public void setTypeMap(Map map)
        throws SQLException
    {
        typeMap = map;
    }

    public void setUnicodeStream(int i, InputStream inputstream, int j)
        throws SQLException
    {
        checkParamIndex(i);
        Object aobj[] = {
            inputstream, new Integer(j), new Integer(273)
        };
        param.add(i - 1, ((Object) (aobj)));
    }

    public Collection toCollection()
        throws SQLException
    {
        Vector vector = new Vector(rowCount);
        for(int i = 0; i < rowCount; i++)
            vector.add(((DBRow)rows.elementAt(i)).toCollection());

        return vector;
    }

    public Collection toCollection(int i)
        throws SQLException
    {
        Vector vector = new Vector(1);
        DBRow oraclerow = getCurrentRow();
        vector.add(oraclerow.isColumnChanged(i) ? oraclerow.getModifiedColumn(i) : oraclerow.getColumn(i));
        return vector;
    }

    public boolean wasNull()
        throws SQLException
    {
        return previousColumnWasNull;
    }
}
