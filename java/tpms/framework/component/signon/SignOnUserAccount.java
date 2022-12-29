package tpms.framework.component.signon;

import java.io.Serializable;
import java.lang.reflect.Field;
public class SignOnUserAccount
    implements Serializable
{

    private String haengwon_no;
    private String branch_no;
    private String haengwon_name;
    private String pswd_no;
    private String branch_name;
    private String job_level_code;
    private String job_level_name;
    private String center_yn;
    private String passwdupdateday;
    private String passwdpasschk;
    private String[] role;

    public SignOnUserAccount()
    {
    }

    public String getHaengwon_no()
    {
        return haengwon_no;
    }

    public String getBranch_no()
    {
        return branch_no;
    }
    public String getCenter()
    {
        return center_yn;
    }

    public String getHaengwon_name()
    {
        return haengwon_name;
    }

    public String getPswd_no()
    {
        return pswd_no;
    }


    public String getBranch_name()
    {
        return branch_name;
    }

    public String getjob_level_code()
    {
           return job_level_code;
    }


    public String getJob_level_name()
    {
        return job_level_name;
    }
    public String[] getRole()
    {
        return role;
    }
    public String get_passwdupdateday()
    {
        return passwdupdateday;
    }
    public String get_passwdpasschk()
    {
        return passwdpasschk;
    }

    public SignOnUserAccount(String haengwon_no, String pswd_no, String haengwon_name, String branch_no,
                             String branch_name,  String job_level_code, String job_level_name,
                             String[] role,String center_yn,String passwdupdateday,String passwdpasschk)
    {
        this.haengwon_no = haengwon_no;
        this.branch_no = branch_no;
        this.haengwon_name = haengwon_name;
        this.pswd_no = pswd_no;
        this.branch_name = branch_name;
        this.job_level_code = job_level_code;
        this.job_level_name = job_level_name;
        this.center_yn = center_yn;
        this.passwdupdateday = passwdupdateday;
        this.passwdpasschk = passwdpasschk;
        this.role = role;
    }

    public String toString()
    {
        StringBuffer ret = new StringBuffer();
        Field field[] = getClass().getDeclaredFields();
        String space = "                              ";
        try
        {
            for(int i = 0; i < field.length; i++)
            {
                String arr[] = null;
                try
                {
                    arr = (String[])field[i].get(this);
                }
                catch(Exception ex)
                {
                    arr = new String[1];
                    arr[0] = String.valueOf(field[i].get(this));
                }
                if(arr != null)
                {
                    for(int j = 0; j < arr.length; j++)
                        ret.append(field[i].getName().concat(space).substring(0, 30).concat("= ") + arr[j] + "\n");

                } else
                {
                    ret.append(field[i].getName() + " =  null \n");
                }
            }

        }
        catch(Exception ex) { }
        return ret.toString();
    }
}
