package tpms.framework.component.dao;

import tpms.framework.component.error.ErrorHandler;
import java.sql.*;
import javax.naming.InitialContext;
import javax.sql.DataSource;
import org.apache.log4j.Logger;
/*
* JDBC Connection 소스 연결
*
*/
public abstract class JDBCDAOSupport
{

    protected transient Logger log;
    public static final String DEFAULT_DATASOURCE_NAME = "jdbc/dsKpiOra19";

    protected JDBCDAOSupport()
    {
        log = Logger.getLogger(getClass().getName());
        if(log == null)
            log = Logger.getLogger(getClass().getName());
    }

    /**
    *  jdbc/asiqnffc 데이타베이스 Connection 반환
    *  jdbc/dsKpiOra19 데이타베이스 Connection 반환
    */
   protected final Connection getConnection()
        throws DAOException
    {
        try{
          Connection con;
        con = null;
        DataSource datasource = null;
        //log.debug("Oracle");
        datasource = getDataSource();
        con = datasource.getConnection();
        log.debug("데이타베이스 연결 성공");
        return con;
    }catch(Exception ex){

        log.error(" DataSourceName: jdbc/dsKpiOra19 Oracle Connection 에러" + ex.getMessage(), ex);
        throw new DAOException((new ErrorHandler("30502")).getMessage());
    }
    }

    /**
    *  사용자 데이타베이스 Connection 반환
    */
   protected final Connection getConnection(String datasourceName)
        throws DAOException
    {
        try{
          Connection con;
        con = null;
        DataSource ds = null;
        log.debug("데이타베이스 연결 시도");
        if (datasourceName.equals("jdbc/oracle_FTP")) ds = getOraDataSource();
        else  ds = getDataSource(datasourceName);
        log.debug("데이타베이스 연결 "+ds.toString());
        con = ds.getConnection();
        log.debug("데이타베이스 연결 성공"+con.toString());
        return con;
        }catch(Exception ex){

          log.error(" DataSourceName: " + datasourceName +
                    " Connection 에러" + ex.getMessage(), ex);
          throw new DAOException( (new ErrorHandler("30502")).getMessage());
        }
    }

    /**
     *  sybase 데이타베이스 Connection 풀 반환
     */
    protected final DataSource getDataSource() throws DAOException {
      DataSource ds=null;
      try {
        InitialContext ctx=new InitialContext();
        ds=(DataSource)ctx.lookup(DEFAULT_DATASOURCE_NAME);
        return ds;
      } catch (Exception ex) {
        log.error("데이타베이스 Connection 오류"+ex.getMessage(),ex);
        throw new DAOException(new ErrorHandler("59001").getMessage());
      }

    }
    /**
    *  oracle 데이타베이스 Connection 풀 반환
    */
    protected final DataSource getOraDataSource()
         throws DAOException
     {
       try
       {
         InitialContext ctx;
         DataSource ds = null;
         ctx = null;
             ctx = new InitialContext();
             ds = (DataSource)ctx.lookup("jdbc/oracle_FTP_noxa");
             log.debug("데이타베이스 ----"+ds.toString());
             return ds;
         }
         catch(Exception ex)
         {
             log.error(" DataSourceName: jdbc/oracle_FTP Connection 에러" + ex.getMessage(), ex);
             throw new DAOException(ex.getMessage());
         }
         finally
         {
         }
      }

      /**
       *  데이타베이스 Connection 풀 반환
       */
      protected final DataSource getDataSource(String datasourceName) throws DAOException {
        DataSource ds=null;
        try {
          InitialContext ctx=new InitialContext();
          //javax.naming.Context contextEnv = (javax.naming.Context)  ctx.lookup("java:comp/env");
          ds=(DataSource)ctx.lookup(datasourceName);
          return ds;
          //return (DataSource) ServiceLocator.getInstance().getDataSource(datasourceName);
        } catch (Exception ex) {
          log.error("데이타베이스 Connection 오류"+ex.getMessage(),ex);
          throw new DAOException(new ErrorHandler("59001").getMessage());
        }

      }

    /**
     * 데이타 베이스 Connection 닫기
     */
    protected final void closeConnection(Connection conn) {
      try {
        if (conn!=null) {
          conn.close();
        }
      } catch (SQLException se) {
        log.error("데이타베이스 연결 종료 에러"+se.getMessage());
        // throw new DAOSysException("SQLException while closing " + "DB connection :" + se.getMessage());
      }
    }

    /**
     *  결과셋 닫기
     */
    protected final void closeResultSet(ResultSet result) {
      try {
        if (result!=null) {
          result.close();
        }
      } catch (SQLException se) {
        log.error("데이타베이스 ResultSet 종료 에러"+se.getMessage());
      }
    }

    /**
     * PreparedStatement 닫기
     */
    protected final void closeStatement(PreparedStatement stmt) {
      try {
        if (stmt!=null) {
          stmt.close();
        }
      } catch (SQLException se) {
        log.error("데이타베이스 PreparedStatement 종료 에러"+se.getMessage());
      }
    }
    
    protected final void closeStatement(CallableStatement stmt) {
        try {
          if (stmt!=null) {
            stmt.close();
          }
        } catch (SQLException se) {
          log.error("데이타베이스 CallableStatement 종료 에러"+se.getMessage());
        }
      }

    /**
     * Statement 닫기
     */
    protected final void closeStatement(Statement stmt) {
      try {
        if (stmt!=null) {
          stmt.close();
        }
      } catch (SQLException se) {
        log.error("데이타베이스 Statement 종료 에러"+se.getMessage());
      }
    }
}
