package tpms.framework.component.signon;

import tpms.framework.component.dao.DAOException;
import tpms.framework.component.error.ErrorHandler;
import tpms.framework.component.signon.dao.SignOnDAOAuthorizedFailureException;
import tpms.framework.component.signon.dao.SignOnDAODupKeyException;
import tpms.framework.component.signon.dao.SignOnDAOExpiredDateException;
import tpms.framework.component.signon.dao.SignOnDAOFinderException;
import tpms.framework.component.signon.dao.UserDAO;
import javax.naming.InitialContext;
import javax.transaction.UserTransaction;
import org.apache.log4j.Logger;

public class SignOnFacade {

	private Logger log;
	public static final int MAX_USERID_LENGTH = 25;
	public static final int MAX_PASSWD_LENGTH = 25;
	private UserDAO userDAO;

	public SignOnFacade() {
		log = Logger.getLogger(getClass().getName());
		userDAO = null;
		userDAO = new UserDAO();
	}

	public boolean authenticate(String userid, String password)
			throws SignOnDAOFinderException, InvalidPasswordException, SignOnDAOExpiredDateException, DAOException {
		return userDAO.matchPassword(userid, password);
	}

	public SignOnUserAccount createSignOn(String userid, String password)
			throws SignOnLongIdException, SignOnInvalidCharException, SignOnDupKeyException {
		SignOnUserAccount userInfo = null;
		try {
			userInfo = userDAO.createUser(userid, password);
		} catch (SignOnDAODupKeyException sdke) {
			log.debug("Duplicate User: " + userid, sdke);
			throw new SignOnDupKeyException("Duplicate User: " + userid);
		}
		return userInfo;
	}

	public SignOnUserAccount getAccount(String userid)
			throws SignOnLongIdException, SignOnInvalidCharException, SignOnDupKeyException {
		SignOnUserAccount userInfo = null;
		try {
			userInfo = userDAO.readUser(userid);
		} catch (SignOnDAODupKeyException sdke) {
			log.debug("Duplicate User: " + userid, sdke);
			throw new SignOnDupKeyException("Duplicate User: " + userid);
		}
		return userInfo;
	}

	public boolean isAuthorized(String userid, String progId) {
		boolean valid = false;
		try {
			valid = userDAO.isAuthorized(userid, progId);
		} catch (SignOnDAOAuthorizedFailureException sfx) {
			return false;
		} catch (Exception ix) {
			return false;
		}
		return valid;
	}

	public void updatePassword(String haengwonNo, String oldPassword, String newPassword)
			throws SignOnDAOFinderException {
		boolean tx_started = false;
		UserTransaction ut = null;
		try {
			InitialContext ic = new InitialContext();
			ut = (UserTransaction) ic.lookup("java:comp/UserTransaction");
			ut.begin();
			tx_started = true;
			userDAO.updatePassword(haengwonNo, oldPassword, newPassword);
			ut.commit();
		} catch (DAOException de) {
			log.debug("Duplicate User: " + haengwonNo, de);
			try {
				if (tx_started && ut != null)
					ut.rollback();
			} catch (Exception re) {
			}
			throw new SignOnDAOFinderException(de.getMessage());
		} catch (Exception de) {
			log.debug("\uD328\uC2A4\uC6CC\uB4DC \uC218\uC815 \uC2E4\uD328 " + haengwonNo, de);
			try {
				if (tx_started && ut != null)
					ut.rollback();
			} catch (Exception re) {
			}
			throw new SignOnDAOFinderException(
					(new ErrorHandler("\uD328\uC2A4\uC6CC\uB4DC \uC218\uC815 \uC2E4\uD328")).getMessage());
		}
	}

	private void isInputValidLength(String userName, String password)
			throws SignOnLongIdException, SignOnInvalidCharException {
		if (userName.length() > 25)
			throw new SignOnLongIdException("User ID cant be more than 25 chars long");
		if (password.length() > 25)
			throw new SignOnLongIdException("Password cant be more than 25 chars long");
		if (userName.indexOf(37) != -1 || userName.indexOf(42) != -1)
			throw new SignOnInvalidCharException("User Id cannot have '%' or '*' characters");
		else
			return;
	}
}
