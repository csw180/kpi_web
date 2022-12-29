package tpms.framework.component.rowset;

import java.io.*;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.Vector;

public class DBRow
    implements Serializable, Cloneable
{

    private Object column[];
    private Object changedColumn[];
    private byte columnChangeFlag[];
    private int noColumn;
    private int noColumnsInserted;
    private boolean rowDeleted;
    private boolean rowInserted;
    private final byte COLUMN_CHANGED = 17;
    private boolean rowUpdated;

    public DBRow(int i)
    {
        noColumn = 0;
        rowDeleted = false;
        rowInserted = false;
        rowUpdated = false;
        noColumn = i;
        column = new Object[i];
        changedColumn = new Object[i];
        columnChangeFlag = new byte[i];
        for(int j = 0; j < i; j++)
            columnChangeFlag[j] = 0;

    }

    public DBRow(int i, boolean flag)
    {
        this(i);
        rowInserted = flag;
        noColumnsInserted = 0;
    }

    public DBRow(int i, Object aobj[])
    {
        this(i);
        System.arraycopy(((Object) (aobj)), 0, ((Object) (column)), 0, i);
    }

    public void cancelRowDeletion()
    {
        rowDeleted = false;
    }

    public void cancelRowUpdates()
    {
        noColumnsInserted = 0;
        for(int i = 0; i < noColumn; i++)
            columnChangeFlag[i] = 0;

        changedColumn = null;
        changedColumn = new Object[noColumn];
        System.gc();
    }

    public Object clone()
        throws CloneNotSupportedException
    {
    try{
      return createCopy();
    }catch(SQLException sqlexception){

        throw new CloneNotSupportedException("Error while cloning\n" + sqlexception.getMessage());
    }
    }

    public DBRow createCopy()
        throws SQLException
    {
        DBRow oraclerow = new DBRow(noColumn);
        for(int i = 0; i < noColumn; i++)
        {
            oraclerow.column[i] = getCopy(column[i]);
            oraclerow.changedColumn[i] = getCopy(changedColumn[i]);
        }

        System.arraycopy(columnChangeFlag, 0, oraclerow.columnChangeFlag, 0, noColumn);
        oraclerow.noColumnsInserted = noColumnsInserted;
        oraclerow.rowDeleted = rowDeleted;
        oraclerow.rowInserted = rowInserted;
        oraclerow.rowUpdated = rowUpdated;
        return oraclerow;
    }

    public Object getColumn(int i)
    {
        return column[i - 1];
    }

    public Object getCopy(Object obj)
        throws SQLException
    {
        Object obj1 = null;
        if(obj == null)
            return null;
        try
        {
            if(obj instanceof String)
                obj1 = new String((String)obj);
            else
            if(obj instanceof Number)
                obj1 = new BigDecimal(((Number)obj).toString());
            else
            if(obj instanceof Timestamp)
                obj1 = new Timestamp(((Timestamp)obj).getTime());
            else
            if(obj instanceof InputStream)
                obj1 = new DataInputStream((InputStream)obj);
            else
            if(obj instanceof OutputStream)
                obj1 = new DataOutputStream((OutputStream)obj);
            else
                throw new SQLException("Error, could not reproduce the copy of the object, " + obj.getClass().getName());
        }
        catch(Exception exception)
        {
            throw new SQLException("Error while creating a copy of the column of type, " + obj.getClass().getName() + "\n" + exception.getMessage());
        }
        return obj1;
    }

    public Object getModifiedColumn(int i)
    {
        return changedColumn[i - 1];
    }

    public Object[] getOriginalRow()
    {
        return column;
    }

    public void insertRow()
    {
        columnChangeFlag = null;
        columnChangeFlag = new byte[noColumn];
        System.arraycopy(((Object) (changedColumn)), 0, ((Object) (column)), 0, noColumn);
        changedColumn = null;
        changedColumn = new Object[noColumn];
        System.gc();
    }

    public boolean isColumnChanged(int i)
    {
        return columnChangeFlag[i - 1] == 17;
    }

    public boolean isRowDeleted()
    {
        return rowDeleted;
    }

    public boolean isRowFullyPopulated()
    {
        if(!rowInserted)
            return false;
        else
            return noColumnsInserted == noColumn;
    }

    public boolean isRowInserted()
    {
        return rowInserted;
    }

    public boolean isRowUpdated()
    {
        if(rowInserted || rowDeleted)
            return false;
        for(int i = 0; i < noColumn; i++)
            if(columnChangeFlag[i] == 17)
                return true;

        return false;
    }

    public void setColumnValue(int i, Object obj)
    {
        if(rowInserted)
            noColumnsInserted++;
        column[i - 1] = obj;
    }

    public void setInsertedFlag(boolean flag)
    {
        rowInserted = flag;
    }

    public void setRowDeleted(boolean flag)
    {
        rowDeleted = flag;
    }

    public void setRowUpdated(boolean flag)
    {
        rowUpdated = flag;
        if(!flag)
            cancelRowUpdates();
    }

    public Collection toCollection()
    {
        Vector vector = new Vector(noColumn);
        for(int i = 0; i < noColumn; i++)
            vector.add(isColumnChanged(i) ? getModifiedColumn(i) : getColumn(i));

        return vector;
    }

    public void updateObject(int i, Object obj)
    {
        if(rowInserted)
            noColumnsInserted++;
        columnChangeFlag[i - 1] = 17;
        changedColumn[i - 1] = obj;
    }
}
