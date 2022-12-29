package tpms.framework.component.rowset;

import java.io.Serializable;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import javax.sql.RowSetMetaData;

public class DBRowSetMetaData
    implements RowSetMetaData, Serializable
{

    private int columnCount;
    private int nullable[];
    private int columnDisplaySize[];
    private int precision[];
    private int scale[];
    private int columnType[];
    private boolean searchable[];
    private boolean caseSensitive[];
    private boolean readOnly[];
    private boolean writable[];
    private boolean definatelyWritable[];
    private boolean currency[];
    private boolean autoIncrement[];
    private boolean signed[];
    private String columnLabel[];
    private String schemaName[];
    private String columnName[];
    private String tableName[];
    private String columnTypeName[];
    private String catalogName[];
    private String columnClassName[];

    DBRowSetMetaData(ResultSetMetaData resultsetmetadata)
        throws SQLException
    {
        columnCount = resultsetmetadata.getColumnCount();
        searchable = new boolean[columnCount];
        caseSensitive = new boolean[columnCount];
        readOnly = new boolean[columnCount];
        nullable = new int[columnCount];
        signed = new boolean[columnCount];
        columnDisplaySize = new int[columnCount];
        columnType = new int[columnCount];
        columnLabel = new String[columnCount];
        columnName = new String[columnCount];
        schemaName = new String[columnCount];
        precision = new int[columnCount];
        scale = new int[columnCount];
        tableName = new String[columnCount];
        columnTypeName = new String[columnCount];
        writable = new boolean[columnCount];
        definatelyWritable = new boolean[columnCount];
        currency = new boolean[columnCount];
        autoIncrement = new boolean[columnCount];
        catalogName = new String[columnCount];
        columnClassName = new String[columnCount];
        for(int i = 0; i < columnCount; i++)
        {
            searchable[i] = resultsetmetadata.isSearchable(i + 1);
            caseSensitive[i] = resultsetmetadata.isCaseSensitive(i + 1);
            readOnly[i] = resultsetmetadata.isReadOnly(i + 1);
            nullable[i] = resultsetmetadata.isNullable(i + 1);
            signed[i] = resultsetmetadata.isSigned(i + 1);
            columnDisplaySize[i] = resultsetmetadata.getColumnDisplaySize(i + 1);
            columnType[i] = resultsetmetadata.getColumnType(i + 1);
            columnLabel[i] = resultsetmetadata.getColumnLabel(i + 1);
            columnName[i] = resultsetmetadata.getColumnName(i + 1);
    /*        schemaName[i] = resultsetmetadata.getSchemaName(i + 1);*/
            if(columnType[i] == 2 || columnType[i] == 2 || columnType[i] == -5 || columnType[i] == 3 || columnType[i] == 8 || columnType[i] == 6 || columnType[i] == 4)
            {
                precision[i] = resultsetmetadata.getPrecision(i + 1);
                scale[i] = resultsetmetadata.getScale(i + 1);
            } else
            {
                precision[i] = 0;
                scale[i] = 0;
            }
     /*       tableName[i] = resultsetmetadata.getTableName(i + 1);*/
            columnTypeName[i] = resultsetmetadata.getColumnTypeName(i + 1);
            writable[i] = resultsetmetadata.isWritable(i + 1);
            definatelyWritable[i] = resultsetmetadata.isDefinitelyWritable(i + 1);
            currency[i] = resultsetmetadata.isCurrency(i + 1);
            autoIncrement[i] = resultsetmetadata.isAutoIncrement(i + 1);
        /*    catalogName[i] = resultsetmetadata.getCatalogName(i + 1);*/
            columnClassName[i] = resultsetmetadata.getColumnClassName(i + 1);
        }

    }

    public String getCatalogName(int i)
        throws SQLException
    {
        validateColumnIndex(i);
        return catalogName[i - 1];
    }

    public String getColumnClassName(int i)
        throws SQLException
    {
        validateColumnIndex(i);
        return columnClassName[i - 1];
    }

    public int getColumnCount()
        throws SQLException
    {
        return columnCount;
    }

    public int getColumnDisplaySize(int i)
        throws SQLException
    {
        validateColumnIndex(i);
        return columnDisplaySize[i - 1];
    }

    public String getColumnLabel(int i)
        throws SQLException
    {
        validateColumnIndex(i);
        return columnLabel[i - 1];
    }

    public String getColumnName(int i)
        throws SQLException
    {
        validateColumnIndex(i);
        return columnName[i - 1];
    }

    public int getColumnType(int i)
        throws SQLException
    {
        validateColumnIndex(i);
        return columnType[i - 1];
    }

    public String getColumnTypeName(int i)
        throws SQLException
    {
        validateColumnIndex(i);
        return columnTypeName[i - 1];
    }

    public int getPrecision(int i)
        throws SQLException
    {
        validateColumnIndex(i);
        return precision[i - 1];
    }

    public int getScale(int i)
        throws SQLException
    {
        validateColumnIndex(i);
        return scale[i - 1];
    }

    public String getSchemaName(int i)
        throws SQLException
    {
        validateColumnIndex(i);
        return schemaName[i - 1];
    }

    public String getTableName(int i)
        throws SQLException
    {
        validateColumnIndex(i);
        return tableName[i - 1];
    }

    public boolean isAutoIncrement(int i)
        throws SQLException
    {
        validateColumnIndex(i);
        return autoIncrement[i - 1];
    }

    public boolean isCaseSensitive(int i)
        throws SQLException
    {
        validateColumnIndex(i);
        return caseSensitive[i - 1];
    }

    public boolean isCurrency(int i)
        throws SQLException
    {
        validateColumnIndex(i);
        return currency[i - 1];
    }

    public boolean isDefinitelyWritable(int i)
        throws SQLException
    {
        validateColumnIndex(i);
        return definatelyWritable[i - 1];
    }

    public int isNullable(int i)
        throws SQLException
    {
        validateColumnIndex(i);
        return nullable[i - 1];
    }

    public boolean isReadOnly(int i)
        throws SQLException
    {
        validateColumnIndex(i);
        return readOnly[i - 1];
    }

    public boolean isSearchable(int i)
        throws SQLException
    {
        validateColumnIndex(i);
        return searchable[i - 1];
    }

    public boolean isSigned(int i)
        throws SQLException
    {
        validateColumnIndex(i);
        return signed[i - 1];
    }

    public boolean isWritable(int i)
        throws SQLException
    {
        validateColumnIndex(i);
        return writable[i - 1];
    }

    public void setAutoIncrement(int i, boolean flag)
        throws SQLException
    {
        validateColumnIndex(i);
        autoIncrement[i - 1] = flag;
    }

    public void setCaseSensitive(int i, boolean flag)
        throws SQLException
    {
        validateColumnIndex(i);
        caseSensitive[i - 1] = flag;
    }

    public void setCatalogName(int i, String s)
        throws SQLException
    {
        validateColumnIndex(i);
        catalogName[i - 1] = s;
    }

    public void setColumnCount(int i)
        throws SQLException
    {
        columnCount = i;
    }

    public void setColumnDisplaySize(int i, int j)
        throws SQLException
    {
        validateColumnIndex(i);
        columnDisplaySize[i - 1] = j;
    }

    public void setColumnLabel(int i, String s)
        throws SQLException
    {
        validateColumnIndex(i);
        columnLabel[i - 1] = s;
    }

    public void setColumnName(int i, String s)
        throws SQLException
    {
        validateColumnIndex(i);
        columnName[i - 1] = s;
    }

    public void setColumnType(int i, int j)
        throws SQLException
    {
        validateColumnIndex(i);
        columnType[i - 1] = j;
    }

    public void setColumnTypeName(int i, String s)
        throws SQLException
    {
        validateColumnIndex(i);
        columnTypeName[i - 1] = s;
    }

    public void setCurrency(int i, boolean flag)
        throws SQLException
    {
        validateColumnIndex(i);
        currency[i - 1] = flag;
    }

    public void setNullable(int i, int j)
        throws SQLException
    {
        validateColumnIndex(i);
        nullable[i - 1] = j;
    }

    public void setPrecision(int i, int j)
        throws SQLException
    {
        validateColumnIndex(i);
        precision[i - 1] = j;
    }

    public void setScale(int i, int j)
        throws SQLException
    {
        validateColumnIndex(i);
        scale[i - 1] = j;
    }

    public void setSchemaName(int i, String s)
        throws SQLException
    {
        validateColumnIndex(i);
        schemaName[i - 1] = s;
    }

    public void setSearchable(int i, boolean flag)
        throws SQLException
    {
        validateColumnIndex(i);
        searchable[i - 1] = flag;
    }

    public void setSigned(int i, boolean flag)
        throws SQLException
    {
        validateColumnIndex(i);
        signed[i - 1] = flag;
    }

    public void setTableName(int i, String s)
        throws SQLException
    {
        validateColumnIndex(i);
        tableName[i - 1] = s;
    }

    private void validateColumnIndex(int i)
        throws SQLException
    {
        if(i < 1 || i > columnCount)
            throw new SQLException("Invalid column index : " + i);
        else
            return;
    }

	@Override
	public <T> T unwrap(Class<T> iface) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isWrapperFor(Class<?> iface) throws SQLException {
		// TODO Auto-generated method stub
		return false;
	}
}
