package tpms.framework.component.error;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

/**
 *
 *
 */

public class DatabaseMessageLoader extends MessageLoader
{
    public final String DEFAULT_DATASOURCE_NAME = "jdbc/asiqnffc";
    public final String SELECT_QUERY = "select ";
    protected transient DataSource datasource=null;

    public DatabaseMessageLoader() {
      super();
    }

    public void loadMessageList()
    {
        Connection conn = null;
        try
        {
            conn = getConnection();
            for(ResultSet rset = conn.createStatement().executeQuery(SELECT_QUERY); rset.next(); messageMap.put(rset.getString(1), rset.getString(2)));
        }
        catch(SQLException se)
        {
            se.printStackTrace();
        }
        catch(NamingException ne)
        {
            ne.printStackTrace();
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
        }
        finally
        {
            closeConnection(conn);
        }
    }

/*    private Connection getJdbcConnection()
        throws SQLException, Exception
    {
        String DRIVER_CLASS = "oracle.jdbc.driver.OracleDriver";
        String DRIVER_URL = "jdbc:sybase:thin:@138.240.37.111:2638:asiqnffc";
        String DATABASE_USER = "tpmsdb03";
        String DATABASE_PASSWD = "tpmsdb03";
        Connection conn = null;
        Class.forName(DRIVER_CLASS);
        System.out.println("======== Driver Loading is OK.. ===============");
        conn = DriverManager.getConnection(DRIVER_URL, DATABASE_USER, DATABASE_PASSWD);
        System.out.println("======== getConnection is OK.. ===============");
        return conn;
    }
*/
    private Connection getConnection()
        throws SQLException, NamingException
    {
        if(datasource == null)
            datasource = getDataSource();
        return datasource.getConnection();
    }

    private DataSource getDataSource()
        throws NamingException
    {
        DataSource ds = null;
        InitialContext ctx = new InitialContext();
        try
        {
            ds = (DataSource)ctx.lookup("jdbc/asiqnffc");
        }
        catch(Exception ex) { }
        finally
        {
            try
            {
                ctx.close();
            }
            catch(Exception ex) { }
        }
        return ds;
    }

    private void closeConnection(Connection conn)
    {
        try
        {
            if(conn != null)
                conn.close();
        }
        catch(SQLException se) { }
    }
}
