package tpms.framework.component.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.CallableStatement;
//import oracle.jdbc.driver.OracleTypes;
import oracle.jdbc.OracleTypes;

import tpms.framework.component.dao.*;
import tpms.framework.component.rowset.*;
import tpms.framework.component.error.ErrorHandler;

/**
 * 클래스 개요 : DB Control
 * <p>
 * 클래스 상세기능 : Value Ojbect
 * <p>
 * 작성일 : 2003.06.10
 * <p>
 * 
 * @version 1.0
 * @author 변휘원
 */
public class DBProcCall extends JDBCDAOSupport {
	public DBProcCall() {
	}
	
	public DbResultSet callProc(String procname, String argument, int rtnPosi) throws DAOException {
		Connection con;
		// PreparedStatement ps;
		CallableStatement ps;
		ResultSet rs;
		con = null;
		DbResultSet dRs = null;
		ps = null;
		rs = null;

		// String query = " call "+procname+"(";
		String query = "{ call " + procname + "(";

		DbResultSet dbresultset;
		int i;
		try {
			String argData[] = argument.split(",");
			if (!argument.equals("")) {
				for (i = 0; i < argData.length; i++)
					if (i == 0)
						query = query + "?";
					else
						query = query + ",?";
			}

			if (rtnPosi > 0) {
				query = query + ", ?";
			}

			query = query + ") }";

			con = getConnection();
			log.debug("tpa - callProc_3 : " +  query);
			
			// ps = con.prepareStatement(query);
			ps = con.prepareCall(query);

			if (!argument.equals("")) {
				for (i = 0; i < argData.length; i++)
					//ps.setString(i + 1, argData[i]);
					ps.setString(i + 1, argData[i]);
			}

			if (rtnPosi > 0) {
				ps.registerOutParameter(rtnPosi, OracleTypes.CURSOR);
			}

			// rs = ps.executeQuery();
			ps.executeQuery();
			rs = (ResultSet) ps.getObject(rtnPosi);

			log.debug("쿼리성공");
			dbresultset = new DbResultSet(rs);
			log.debug("DbResultSet 성공");
		} catch (SQLException se) {
			log.error("err=" + se.getMessage(), se);
			throw new DAOException(se.getMessage());
		} catch (Exception e) {
			log.error("err=" + e.getMessage(), e);
			throw new DAOException(e.getMessage());
		} finally {
			closeResultSet(rs);
			closeStatement(ps);
			closeConnection(con);
		}
		return dbresultset;
	}
	
	public DbResultSet callProc(String procname, String argument) throws DAOException {
		
		return callProcORA(procname, argument);
		
		/*
		Connection con;
		// PreparedStatement ps;
		CallableStatement ps;
		ResultSet rs;
		con = null;
		DbResultSet dRs = null;
		ps = null;
		rs = null;

		// String query = " call "+procname+"(";
		String query = "{ call " + procname + "(";

		DbResultSet dbresultset;
		int i;
		try {
			String argData[] = argument.split(",");
			if (!argument.equals("")) {
				for (i = 0; i < argData.length; i++)
					if (i == 0)
						query = query + "?";
					else
						query = query + ",?";
			}

			query = query + ") }";

			con = getConnection();
			log.debug("tpa - callProc_2 : " + query);
			
			// ps = con.prepareStatement(query);
			ps = con.prepareCall(query);

			if (!argument.equals("")) {
				for (i = 0; i < argData.length; i++)
					ps.setString(i + 1, argData[i]);
			}

			rs = ps.executeQuery();
			log.debug("쿼리성공");
			dbresultset = new DbResultSet(rs);
			log.debug("DbResultSet 성공");
		} catch (SQLException se) {
			log.error("err=" + se.getMessage(), se);
			throw new DAOException(se.getMessage());
		} catch (Exception e) {
			log.error("err=" + e.getMessage(), e);
			throw new DAOException(e.getMessage());
		} finally {
			closeResultSet(rs);
			closeStatement(ps);
			closeConnection(con);
		}
		return dbresultset;
		*/
	}
	

	public DbResultSet callProc(String procname) throws DAOException {
		return callProcORA(procname);
		/*
		Connection con;
		PreparedStatement ps;
		ResultSet rs;
		con = null;
		DbResultSet dRs = null;
		ps = null;
		rs = null;
		String query = " call " + procname + "()";
		DbResultSet dbresultset;
		int i;
		try {
			con = getConnection();
			ps = con.prepareStatement(query);
			rs = ps.executeQuery();
			log.debug("쿼리성공");
			dbresultset = new DbResultSet(rs);
			log.debug("DbResultSet 성공");
		} catch (SQLException se) {
			log.error("err=" + se.getMessage(), se);
			throw new DAOException(se.getMessage());
		} catch (Exception e) {
			log.error("err=" + e.getMessage(), e);
			throw new DAOException(e.getMessage());
		} finally {
			closeResultSet(rs);
			closeStatement(ps);
			closeConnection(con);
		}
		return dbresultset;
		*/
	}

	public DbResultSet callProcORA(String procname) throws DAOException {
		Connection con;
		CallableStatement ps;
		ResultSet rs;

		con = null;
		DbResultSet dRs = null;
		ps = null;
		rs = null;
		//String query = " begin " + procname + "(?); end;";
		String query = " { call " + procname + "(?) }";
		
		log.debug("Qeury : " + query.replace(") }", "); }"));
		
		DbResultSet dbresultset;
		
		try {
			// con = getConnection("jdbc/oracle_FTP");
			con = getConnection();
			
			ps = con.prepareCall(query);
			ps.registerOutParameter(1, OracleTypes.CURSOR);
			//ps.execute();
			rs = ps.executeQuery();
			
			rs = (ResultSet) ps.getObject(1);
			log.debug("쿼리성공");
			dbresultset = new DbResultSet(rs);
			log.debug("DbResultSet 성공");
		} catch (SQLException se) {
			log.error("err=" + se.getMessage(), se);
			throw new DAOException(se.getMessage());
		} catch (Exception e) {
			log.error("err=" + e.getMessage(), e);
			throw new DAOException(e.getMessage());
		} finally {
			closeResultSet(rs);
			closeStatement(ps);
			closeConnection(con);
		}
		return dbresultset;
	}

	public DbResultSet callProcORA(String procname, String argument) throws DAOException {
		Connection con;
		CallableStatement ps;
		ResultSet rs;
		con = null;
		DbResultSet dRs = null;
		
		ps = null;
		rs = null;
		
		String query = " { call " + procname + "(?";
		DbResultSet dbresultset;
		int i;
		try {
			
			String argData[] = argument.split(",");
			log.debug("argData : " + argument);
			log.debug("argData length : " + argData.length);
			
			if (!argument.equals("")) { 
				for (i = 0; i < argData.length; i++)
					query = query + ",?";
			}
			query = query + ") } ";
			
			log.debug("Qeury : " + query.replace(") }", "); }"));
			
			//con = getConnection("jdbc/oracle_FTP");
			con = getConnection();
			
			ps = con.prepareCall(query);			
			ps.registerOutParameter(1, OracleTypes.CURSOR);
			
			if (!argument.equals("")) { 
				String argStr = ":tmp_cur";
				
				for (i = 0; i < argData.length; i++) {
					//ps.setString(i + 2, argData[i]);
					ps.setString(i + 2, argData[i].trim());
					
					argStr += ", '" + argData[i].trim() + "'" ;
				}
				
				log.debug("Param : " + argStr);
			}
			
			//ps.execute();
			rs = ps.executeQuery();
			
			rs = (ResultSet) ps.getObject(1);
			log.debug("쿼리성공");
			dbresultset = new DbResultSet(rs);
			log.debug("DbResultSet 성공");
			
			/*
			rs = (ResultSet) ps.getObject(1);
			log.debug("쿼리성공");
			dbresultset = new DbResultSet(rs);
			log.debug("DbResultSet 성공");
			*/
		} catch (SQLException se) {
			log.error("err=" + se.getMessage(), se);
			throw new DAOException(se.getMessage());
		} catch (Exception e) {
			log.error("err=" + e.getMessage(), e);
			throw new DAOException(e.getMessage());
		} finally {
			closeResultSet(rs);
			closeStatement(ps);
			closeConnection(con);
		}
		return dbresultset;
	}

	public DbResultSet calldw(String procname, String argument) throws DAOException {
		Connection con;
		PreparedStatement ps;
		ResultSet rs;
		Exception exception;
		con = null;
		DBRowSet rowset;
		DbResultSet dRs = null;
		ps = null;
		rs = null;
		String query = " call " + procname + "(";
		DbResultSet dbresultset;
		int i;
		try {

			String argData[] = argument.split(",");
			for (i = 0; i < argData.length; i++)
				if (i == 0)
					query = query + "?";
				else
					query = query + ",?";
			query = query + ");";
			log.debug(query);
			con = getConnection("jdbc/asiqdw");
			ps = con.prepareStatement(query);
			for (i = 0; i < argData.length; i++) {
				//ps.setString(i + 1, argData[i]);
				ps.setString(i + 1, argData[i]);
			}
			rs = ps.executeQuery();
			dbresultset = new DbResultSet(rs);
		} catch (SQLException se) {
			log.error("err=" + se.getMessage(), se);
			throw new DAOException(se.getMessage());
		} catch (Exception e) {
			log.error("err=" + e.getMessage(), e);
			throw new DAOException(e.getMessage());
		} finally {
			closeResultSet(rs);
			closeStatement(ps);
			closeConnection(con);
		}
		return dbresultset;
	}

	public DbResultSet calldw(String procname) throws DAOException {
		Connection con;
		PreparedStatement ps;
		ResultSet rs;
		Exception exception;
		con = null;
		DBRowSet rowset;
		DbResultSet dRs = null;
		ps = null;
		rs = null;
		String query = " call " + procname + "();";
		DbResultSet dbresultset;
		int i;
		try {
			log.debug(query);
			con = getConnection("jdbc/asiqdw");
			ps = con.prepareStatement(query);
			rs = ps.executeQuery();
			dbresultset = new DbResultSet(rs);
		} catch (SQLException se) {
			log.error("err=" + se.getMessage(), se);
			throw new DAOException(se.getMessage());
		} catch (Exception e) {
			log.error("err=" + e.getMessage(), e);
			throw new DAOException(e.getMessage());
		} finally {
			closeResultSet(rs);
			closeStatement(ps);
			closeConnection(con);
		}
		return dbresultset;
	}

	public long InputProc(String procname, String argument) throws DAOException {
		
		return InputProcORA(procname, argument);
		
		/*
		Connection con = null;
		// PreparedStatement ps=null;
		CallableStatement ps = null;

		long resultCount = 0;
		// String query = " call "+procname+"(";
		String query = "{ call " + procname + "(";
		int i;
		try {
			//log.debug(argument);
			String argData[] = argument.split(",");
			for (i = 0; i < argData.length; i++)
				if (i == 0)
					query = query + "?";
				else
					query = query + ",?";
			// query=query+");";
			query = query + ") }";
			log.debug(query);
			
			
			
			con = getConnection();
			// ps=con.prepareStatement(query);
			ps = con.prepareCall(query);
			for (i = 0; i < argData.length; i++) {
				ps.setString(i + 1, argData[i].replaceAll("``", ","));
			}
			resultCount = ps.executeUpdate();
			if (resultCount == 0) {
				log.debug(" 처리내용없음 ");
			} else if (resultCount < 0) {
				throw new DAOException(new ErrorHandler("51001").getMessage());
			}
		} catch (SQLException se) {
			log.error(se.getMessage(), se);
			throw new DAOException(new ErrorHandler(se).getMessage());
		} catch (DAOException de) {
			log.error(de.getMessage(), de);
			throw de;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new DAOException(e.getMessage());
		} finally {
			closeStatement(ps);
			closeConnection(con);
		}
		return resultCount;
		*/
	}

	public long InputProc(String procname) throws DAOException {
		Connection con = null;
		PreparedStatement ps = null;
		long resultCount = 0;
		String query = " call " + procname + "();";
		int i;
		try {
			con = getConnection();
			ps = con.prepareStatement(query);
			resultCount = ps.executeUpdate();
			if (resultCount < 1) {
				throw new DAOException(new ErrorHandler("51001").getMessage());
			}
		} catch (SQLException se) {
			log.error(se.getMessage(), se);
			throw new DAOException(new ErrorHandler(se).getMessage());
		} catch (DAOException de) {
			log.error(de.getMessage(), de);
			throw de;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new DAOException(e.getMessage());
		} finally {
			closeStatement(ps);
			closeConnection(con);
		}
		return resultCount;
	}

	public long InputProcdw(String procname, String argument) throws DAOException {
		Connection con = null;
		PreparedStatement ps = null;
		long resultCount = 0;
		String query = " call " + procname + "(";
		int i;
		try {
			String argData[] = argument.split(",");
			for (i = 0; i < argData.length; i++)
				if (i == 0)
					query = query + "?";
				else
					query = query + ",?";
			query = query + "); ";
			log.debug(query);
			con = getConnection("jdbc/asiqdw");
			ps = con.prepareStatement(query);
			for (i = 0; i < argData.length; i++) {
				//ps.setString(i + 1, argData[i].replaceAll("``", ","));
				ps.setString(i + 1, argData[i].replaceAll("``", ","));
			}
			resultCount = ps.executeUpdate();
			System.out.println(resultCount);
			if (resultCount < 1) {
				throw new DAOException(new ErrorHandler("51001").getMessage());
			}
		} catch (SQLException se) {
			log.error(se.getMessage(), se);
			throw new DAOException(new ErrorHandler(se).getMessage());
		} catch (DAOException de) {
			log.error(de.getMessage(), de);
			throw de;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new DAOException(e.getMessage());
		} finally {
			closeStatement(ps);
			closeConnection(con);
		}
		return resultCount;
	}

	public long InputProcORA(String procname, String argument) throws DAOException {
		Connection con = null;
		CallableStatement ps = null;
		long resultCount = 0;
		String query = " { call " + procname + "(";
		int i;
		
		boolean rtnCFlag = false;
		PreparedStatement pps = null;
		ResultSet prs = null;
		
		try {
			
			con = getConnection();
			
			String query1 = "SELECT CASE WHEN COUNT(*) > 0 THEN 'Y' ELSE 'N' END FROM all_arguments WHERE owner = 'KPIPRC' AND object_name = upper(?) AND data_type = 'REF CURSOR'";
			pps = con.prepareStatement(query1);
			pps.setString(1, procname);
			prs = pps.executeQuery();
			prs.next();
			
			if("Y".equals(prs.getObject(1))) { 
				rtnCFlag = true;
			} 
			
			int asi = 0;
			
			if(rtnCFlag) {
				query += "?,";
				asi = 1;
			}
			
			String argData[] = argument.split(",");
			
			for (i = 0; i < argData.length; i++)
				if (i == 0)
					query = query + "?";
				else
					query = query + ",?";
			query = query + ") }";
			
			log.debug("Qeury : " + query.replace(") }", "); }"));
			
			//con = getConnection("jdbc/oracle_FTP");
			
			ps = con.prepareCall(query);
			
			String argStr = "";
			
			if(rtnCFlag) {
				argStr = ":tmp_cur, ";
				ps.registerOutParameter(1, OracleTypes.CURSOR);
			}
			
			for (i = 0; i < argData.length; i++) {
				//ps.setString(i + 1, argData[i].replaceAll("``", ","));
				ps.setString(asi + i + 1, argData[i].replaceAll("``", ","));
				
				if(i > 0) argStr += ", ";
				argStr += "'" + argData[i] + "'" ;
			}
			
			log.debug("Param : " + argStr);
			
			resultCount = ps.executeUpdate();
			//System.out.println(resultCount);
		} catch (SQLException se) {
			log.error(se.getMessage(), se);
			throw new DAOException(new ErrorHandler(se).getMessage());
		} catch (DAOException de) {
			log.error(de.getMessage(), de);
			throw de;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new DAOException(e.getMessage());
		} finally {
			closeStatement(pps);
			closeStatement(ps);
			closeConnection(con);
		}
		return resultCount;
	}

	public long InputProcORA(String procname) throws DAOException {
		Connection con = null;
		CallableStatement ps = null;
		long resultCount = 0;
		
		boolean rtnCFlag = false;
		PreparedStatement pps = null;
		ResultSet prs = null;
		
		String query = " { " + procname + "() };";
		try {
			con = getConnection();
			String query1 = "SELECT CASE WHEN COUNT(*) > 0 THEN 'Y' ELSE 'N' END FROM all_arguments WHERE owner = 'KPIPRC' AND object_name = upper(?) AND data_type = 'REF CURSOR'";
			
			pps = con.prepareStatement(query1);
			pps.setString(1, procname);
			prs = pps.executeQuery();
			prs.next();
			
			if("Y".equals(prs.getObject(1))) { 
				rtnCFlag = true;
			} 
			
			if(rtnCFlag) {
				query = " { " + procname + "(?) };";
			}
			
			log.debug("Qeury : " + query.replace(") }", "); }"));
			
			//con = getConnection("jdbc/oracle_FTP");
			
			ps = con.prepareCall(query);
			
			String argStr = "";
			
			if(rtnCFlag) {
				argStr = ":tmp_cur, ";
				ps.registerOutParameter(1, OracleTypes.CURSOR);
				
				log.debug("Param : " + argStr);
			}
			
			resultCount = ps.executeUpdate();
			
		} catch (SQLException se) {
			log.error(se.getMessage(), se);
			throw new DAOException(se.getMessage());
		} catch (DAOException de) {
			log.error(de.getMessage(), de);
			throw de;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new DAOException(e.getMessage());
		} finally {
			closeStatement(ps);
			closeConnection(con);
		}
		return resultCount;
	}

	public long InputProcdw(String procname) throws DAOException {
		Connection con = null;
		PreparedStatement ps = null;
		long resultCount = 0;
		String query = " call " + procname + "();";
		int i;
		try {
			con = getConnection("jdbc/asiqdw");
			ps = con.prepareStatement(query);
			resultCount = ps.executeUpdate();
			System.out.println(resultCount);
			if (resultCount < 1) {
				throw new DAOException(new ErrorHandler("51001").getMessage());
			}
		} catch (SQLException se) {
			log.error(se.getMessage(), se);
			throw new DAOException(new ErrorHandler(se).getCode());
		} catch (DAOException de) {
			log.error(de.getMessage(), de);
			throw de;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new DAOException(e.getMessage());
		} finally {
			closeStatement(ps);
			closeConnection(con);
		}
		return resultCount;
	}

	public String toString() {
		return "DBProcCall";
	}

	/**
	 * 이벤트명 반환
	 */
	public String getEventName() {
		return "DBProcCall";
	}
	
	
	/* procedure Query Str 생성 */
	public String InputProcS(String procname, String argument) throws DAOException {
		
		String query = "{ call " + procname + "(";
		int i;

		String argData[] = argument.split(",");
		for (i = 0; i < argData.length; i++)
			if (i == 0)
				query = query + "?";
			else
				query = query + ",?";
		query = query + ") }";

		return query;
	}
	
	
	/* procedure 다건 실행 */
	public long InputProcN(String query, String[] paramArr) throws DAOException {
		Connection con = null;
		CallableStatement ps = null;
		long resultCount = 0;
		
		try {
			con = getConnection();
			
			ps = con.prepareCall(query);
			log.debug("Qeury : " + query.replace(") }", "); }"));
			
			for(int i =0; i < paramArr.length; i ++) {
				
				String argData[] = paramArr[i].split(",");
				String argStr = "";
				
				for (int j = 0; j < argData.length; j++) {
					//ps.setString(j + 1, argData[j].replaceAll("``", ","));
					ps.setString(j + 1, argData[j].replaceAll("``", ","));
					
					if(j > 0) argStr += ", ";
					
					argStr += "'" + argData[j] + "'" ;
				}
				
				log.debug("Param : " + argStr);
				
				ps.addBatch();
				ps.clearParameters();
				
				resultCount ++;
				
				if(resultCount % 10000 == 0) {
					ps.executeBatch();
					con.commit();
					ps.clearBatch();
				}
			}
			
			ps.executeBatch();
			con.commit();
			ps.clearBatch();
			
		} catch (SQLException se) {
			log.error(se.getMessage(), se);
			throw new DAOException(new ErrorHandler(se).getMessage());
		} catch (DAOException de) {
			log.error(de.getMessage(), de);
			throw de;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new DAOException(e.getMessage());
		} finally {
			closeStatement(ps);
			closeConnection(con);
		}
		return resultCount;
	}
}
