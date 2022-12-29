package tpms.framework.security;

/**
 * <p>Title: 비밀번호 암호화 로직 </p>
 * @author not attributable
 * @version 1.0
 */
public class SecurityUtils {

    public static String encrypt(String aPwd) {

        String encryptPwd = ""; //완성 암호화 pwd
        String evenIdx = "";    //짝수 index 문자열
        String oddIdx = "";     //홀수 index 문자열

        String asc = "";        //ASCII 변화값
        byte[] bval = aPwd.trim().getBytes();
        for (int i = 0; i < bval.length; i++) {
            asc = asc + bval[i];
        }

        for (int i = 0; i < asc.length(); i++) {
            if (i % 2 == 0) { //짝수 index 값 추출
                evenIdx = evenIdx + String.valueOf(asc.charAt(i));
            } else {          //홀수 index 값 추출
                oddIdx = oddIdx + String.valueOf(asc.charAt(i));
            }
        }

        encryptPwd = evenIdx + oddIdx;

        return encryptPwd;
    }
}
