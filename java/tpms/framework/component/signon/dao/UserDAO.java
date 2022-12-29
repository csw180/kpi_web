package tpms.framework.component.signon.dao;

import java.io.Serializable;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.log4j.Logger;

import oracle.jdbc.OracleTypes;
import tpms.framework.component.dao.DAOException;
import tpms.framework.component.dao.DBProcCall;
import tpms.framework.component.dao.DbResultSet;
import tpms.framework.component.dao.JDBCDAOSupport;
import tpms.framework.component.error.ErrorHandler;
import tpms.framework.component.signon.InvalidPasswordException;
import tpms.framework.component.signon.SignOnUserAccount;
import tpms.framework.security.SecurityUtils;
 
public class UserDAO extends JDBCDAOSupport implements Serializable {

	private Logger log;

	public UserDAO() {
		log = Logger.getLogger(getClass().getName());
	}

	public SignOnUserAccount createUser(String userName, String password) throws SignOnDAODupKeyException {
		SignOnUserAccount userInfo = null;
		return userInfo;
	}

	public SignOnUserAccount readUser(String userId) throws SignOnDAODupKeyException {
		SignOnUserAccount userInfo = null;
		try {
			DbResultSet rs = getUser(userId);
			String[] role = getRole(userId);
			if (rs != null) {
				rs.first();
				for (; rs.next(); userInfo.getJob_level_name()) {
					String haengwon_no = rs.getString("직원번호");
					String pswd_no = rs.getString("비밀번호");
					String haengwon_name = rs.getString("성명");
					String branch_no = rs.getString("점번호");
					String branch_name = rs.getString("점명");
					String job_level_code = rs.getString("잡레벨코드");
					String job_level_name = rs.getString("잡레벨명");
					String center = rs.getString("본부영업점구분");
					String passwdupdateday = rs.getString("비밀번호변경일자");
					String passwdpasschk = rs.getString("비밀번호체크");
					userInfo = new SignOnUserAccount(haengwon_no, pswd_no, haengwon_name, branch_no, branch_name,
							job_level_code, job_level_name, role, center, passwdupdateday, passwdpasschk);
					//log.debug(userInfo.toString());
					userInfo.getHaengwon_name();
				}

			}
		} catch (Exception ex) {
			log.debug("user id:" + userId + " 의 사용자 정보를 읽다가 오류발생", ex);
			throw new SignOnDAODupKeyException(ex.getMessage());
		}
		return userInfo;
	}

	public boolean matchPassword(String userid, String passwd)
			throws SignOnDAOFinderException, InvalidPasswordException, SignOnDAOExpiredDateException, DAOException {
		try {
			DbResultSet rs = getUser(userid);
			if (rs != null) {
				rs.first();
				if (rs.next()) {
					log.debug("::::비밀번호 검증 시작");

					if (!passwd.trim().equals("EKPUSER")) {
						// 입력받은 password 를 암호화하여 기존 비밀번호와 비교
						String chkPwd = "";

						log.debug("::::rs.getString(비밀번호).trim() = [" + rs.getString("비밀번호").trim() + "]");
						log.debug("::::rs.getString(주민번호).trim() = [" + rs.getString("주민번호").trim().substring(6) + "]");
						log.debug("::::rs.getString(실명번호).trim() = [" + rs.getString("실명번호").trim() + "]");

						if (rs.getString("비밀번호").trim().equals(rs.getString("주민번호").trim().substring(6))) {
							log.debug("::::암호화 미적용 비밀번호 검증 및 암호화 처리\n");
							chkPwd = passwd.trim();
							DBProcCall jado = new DBProcCall();
							jado.InputProc("UP_KPI_C_S_CO비밀번호변경", userid + "," + SecurityUtils.encrypt(passwd.trim()));
						} else {
							log.debug("::::암호화 적용 비밀번호 검증\n");
							chkPwd = SecurityUtils.encrypt(passwd.trim());
						}
						log.debug("::::암호화 비밀번호 = " + chkPwd);

						// DB 비밀번호와 입력비밀번호를 비교하여 다른경우 Exception
						if (!rs.getString("비밀번호").trim().equals(chkPwd)) {
							log.debug("::::오류 : DB 비밀번호와 입력비밀번호 다름");
							Passwordcnt(userid); // 비밀번호체크 증가
							if (Integer.parseInt(rs.getString("비밀번호체크").trim()) >= 2) {
								throw new InvalidPasswordException("비밀번호 3회 이상(누적횟수) 오류입니다. EKP를 통해 재접속 하세요. ");
							}
							//
							else {
								throw new InvalidPasswordException("비밀번호를 확인 하세요");
							}
						}
					}
				} else {
					log.info("user id:" + userid + " 의 사용자를 찾을 수 없음");
					throw new SignOnDAOFinderException(
							"user id:" + userid + " 의 사용자를 찾을 수 없음");
				}
			}
		} catch (InvalidPasswordException ie) {
			log.info("패스워드 오류", ie);
			throw ie;
		} catch (SignOnDAOFinderException fe) {
			log.error("패스워드 오류", fe);
			throw fe;
		} catch (Exception e) {
			log.info("패스워드 오류", e);
			return false;
		}

		return true;
	}

	private DbResultSet getUser(String userId) throws DAOException {
		Connection con;
		// PreparedStatement ps; //sysbase
		CallableStatement ps;
		ResultSet rs;
		Exception exception;
		con = null;
		DbResultSet dRs = null;
		ps = null;
		rs = null;

		// String query = " call xwp_co로그인(?); "; //sysbase
		String query = " { call UP_KPI_C_S_CO로그인(?, ?) }";

		DbResultSet dbresultset;
		try {
			con = getConnection();

			/*
			 * sysbase ps = con.prepareStatement(query); 
			 * ps.setString(1, userId); 
			 * rs = ps.executeQuery();
			 */

			ps = con.prepareCall(query);
			ps.registerOutParameter(1, OracleTypes.CURSOR);
			ps.setString(2, userId);
			
			ps.executeQuery();
			rs = (ResultSet) ps.getObject(1);

			log.debug("Query : " + query);

			dRs = new DbResultSet(rs);
			dbresultset = dRs;
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

	private String[] getRole(String userId) throws DAOException {
		Connection con;
		// PreparedStatement ps;
		CallableStatement ps;
		ResultSet rs;
		Exception exception;
		con = null;
		String[] dRs = null;
		int i = 0;
		ps = null;
		rs = null;
		// String query = "{ call xwp_co사용자권한(?) }";
		String query = " { call UP_KPI_C_S_CO사용자권한(?, ?) }";
		DbResultSet dbresultset;
		try {
			con = getConnection();
			log.debug("Query : " + query);

			/*
			 * ps = con.prepareStatement(query); 
			 * ps.setString(1, userId); 
			 * rs = ps.executeQuery();
			 */

			ps = con.prepareCall(query);
			ps.registerOutParameter(1, OracleTypes.CURSOR);
			ps.setString(2, userId);
			
			ps.executeQuery();
			rs = (ResultSet) ps.getObject(1);

			dbresultset = new DbResultSet(rs);
			if (dbresultset != null) {
				dRs = new String[dbresultset.getRowCount()];
				dbresultset.first();
				while (dbresultset.next()) {
					dRs[i++] = dbresultset.getString("권한");
				}
			}
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
		return dRs;
	}

	public boolean isAuthorized(String userId, String progId) throws SignOnDAOAuthorizedFailureException {
		Connection con;
		PreparedStatement ps;
		ResultSet rs;
		Exception exception;
		con = null;
		ps = null;
		rs = null;
		boolean retValue = false;
		String query = "{ call wp_co프로그램권한유무(?,?) }";
		boolean flag;
		try {
			con = getConnection();
			log.debug("Query : " + query);

			ps = con.prepareStatement(query);
			ps.setString(1, userId);
			ps.setString(2, progId);
			rs = ps.executeQuery();
			if (rs.next())
				retValue = true;
			flag = retValue;
		} catch (SQLException se) {
			log.error("err=" + se.getMessage(), se);
			throw new SignOnDAOAuthorizedFailureException(se.getMessage());
		} catch (Exception e) {
			log.error("err=" + e.getMessage(), e);
			throw new SignOnDAOAuthorizedFailureException(e.getMessage());
		} finally {
			closeResultSet(rs);
			closeStatement(ps);
			closeConnection(con);
		}
		return flag;
	}

	public void updatePassword(String haengwonNo, String oldPassword, String newPassword) throws DAOException {
		Connection con = null;
		PreparedStatement ps = null;
		long resultCount = 0L;
		String queryStr = "{ call wp_co비밀번호갱신(?,?) }";
		log.debug(queryStr);
		try {
			con = getConnection();

			ps = con.prepareStatement(queryStr);
			ps.setString(1, newPassword);
			ps.setString(2, haengwonNo);
			resultCount = ps.executeUpdate();
			if (resultCount < 1L)
				throw new DAOException((new ErrorHandler("51001")).getMessage());
		} catch (SQLException se) {
			log.error(se.getMessage(), se);
			throw new DAOException((new ErrorHandler(se)).getMessage());
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
	}

	public void Passwordcnt(String haengwonNo) throws DAOException {
		Connection con = null;
		PreparedStatement ps = null;
		long resultCount = 0L;
		String queryStr = "{ call UP_KPI_C_S_CO비밀번호오류체크(1,?) }";
		log.debug(queryStr);
		try {
			con = getConnection();
			ps = con.prepareStatement(queryStr);
			ps.setString(1, haengwonNo);
			resultCount = ps.executeUpdate();
			if (resultCount < 1L)
				throw new DAOException((new ErrorHandler("51001")).getMessage());
		} catch (SQLException se) {
			log.error(se.getMessage(), se);
			throw new DAOException((new ErrorHandler(se)).getMessage());
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
	}

	public void insertLog(String userId, String logGubun, String ip) throws DAOException {
		Connection con;
		// PreparedStatement ps;
		CallableStatement ps;
		ResultSet rs;
		Exception exception;
		con = null;
		DbResultSet dRs = null;
		ps = null;
		rs = null;
		// String query = "{ call wp_co접속로그(1, ?, ?, ?) }";
		String query = " { call UP_KPI_C_S_CO접속로그(?, 1, ?, ?, ?) }";
		DbResultSet dbresultset;
		try {
			log.debug("param : [" + userId + "][" + logGubun + "][" + ip + "]");
			con = getConnection();
			log.debug("Query : " + query);

			// ps = con.prepareStatement(query);
			ps = con.prepareCall(query);
			ps.registerOutParameter(1, OracleTypes.CURSOR);
			ps.setString(2, userId);
			ps.setString(3, "");
			ps.setString(4, "");
			
			ps.executeUpdate();

			System.out.println("step1 : [" + userId + "][" + logGubun + "][" + ip + "]");

			if ("01".equals(logGubun)) {
				closeResultSet(rs);
				closeStatement(ps);
				closeConnection(con);

				// query = "{ call wp_co접속로그(4, ?, ?, ?) }";
				query = " { call UP_KPI_C_S_CO접속로그(?, 4, ?, ?, ?) }";
				con = getConnection();
				log.debug("Query : " + query);

				// ps = con.prepareStatement(query);
				ps = con.prepareCall(query);
				ps.registerOutParameter(1, OracleTypes.CURSOR);
				ps.setString(2, userId);
				ps.setString(3, logGubun);
				ps.setString(4, ip);
				
				ps.executeUpdate();
			}
		} catch (SQLException se) {
			System.out.println("err=" + se.getMessage() + se);
			throw new DAOException(se.getMessage());
		} catch (Exception e) {
			log.error("err=" + e.getMessage(), e);
			throw new DAOException(e.getMessage());
		} finally {
			closeResultSet(rs);
			closeStatement(ps);
			closeConnection(con);
		}
	}

	public DbResultSet getLastLoginDate(String userId) throws DAOException {
		Connection con;
		// PreparedStatement ps;
		CallableStatement ps;
		ResultSet rs;
		Exception exception;
		con = null;
		DbResultSet dRs = null;
		ps = null;
		rs = null;
		// String query = "{ call wp_co접속로그(2, ?, ?, ?) }";
		String query = " { call UP_KPI_C_S_CO접속로그(?, 2, ?, ?, ?) }";
		
		DbResultSet dbresultset;
		try {
			con = getConnection();
			log.debug("Query : " + query);

			/*
			 * ps = con.prepareStatement(query); 
			 * ps.setString(1, userId); 
			 * ps.setString(2, ""); 
			 * ps.setString(3, ""); 
			 * rs = ps.executeQuery();
			 */

			ps = con.prepareCall(query);
			ps.registerOutParameter(1, OracleTypes.CURSOR);
			ps.setString(2, userId);
			ps.setString(3, "");
			ps.setString(4, "");
			
			ps.executeQuery();
			rs = (ResultSet) ps.getObject(1);

			dRs = new DbResultSet(rs);
			dbresultset = dRs;
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

	public DbResultSet getLastLoginInfo(String userId) throws DAOException {
		Connection con;
		// PreparedStatement ps;
		CallableStatement ps;
		ResultSet rs;
		Exception exception;
		con = null;
		DbResultSet dRs = null;
		ps = null;
		rs = null;
		// String query = "{ call wp_co접속로그(3, ?, ?, ?) }";
		String query = " { call UP_KPI_C_S_CO접속로그(?, 3, ?, ?, ?) }";
		DbResultSet dbresultset;
		try {
			con = getConnection();
			log.debug("Query : " + query);

			/*
			 * ps = con.prepareStatement(query); 
			 * ps.setString(1, userId); 
			 * ps.setString(2, ""); 
			 * ps.setString(3, ""); 
			 * rs = ps.executeQuery();
			 */

			ps = con.prepareCall(query);
			ps.registerOutParameter(1, OracleTypes.CURSOR);
			ps.setString(2, userId);
			ps.setString(3, "");
			ps.setString(4, "");
			
			ps.executeQuery();
			rs = (ResultSet) ps.getObject(1);
			dRs = new DbResultSet(rs);
			dbresultset = dRs;
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
}
