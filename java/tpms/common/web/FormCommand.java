package tpms.common.web;

import tpms.framework.component.util.JSPUtil;
import java.io.Serializable;
import java.lang.reflect.Field;
import javax.servlet.http.HttpServletRequest;

/**
 *  클래스 개요: 공통 데이타 모델
 *  HttpRequest에서 f_cmd 변수를 파싱하여 command에 할당한다.
 */
public final class FormCommand
    implements Serializable
{

    public static final int DEFAULT = -1;
    public static final int INIT = 0;
    public static final int SELECT = 1;
    public static final int INSERT = 2;
    public static final int UPDATE = 3;
    public static final int DELETE = 4;
    public static final int PRINT = 5;
    public static final int COMMAND01 = 11;
    public static final int COMMAND02 = 12;
    public static final int COMMAND03 = 13;
    public static final int COMMAND04 = 14;
    public static final int COMMAND05 = 15;
    public static final int COMMAND06 = 16;
    public static final int COMMAND07 = 17;
    public static final int COMMAND08 = 18;
    public static final int COMMAND09 = 19;
    public static final int COMMAND10 = 20;
    private int command;

    public FormCommand()
    {
      /** 사용자 이벤트 default:-1 */
        command = -1;
    }

    public int getCommand()
    {
        return command;
    }

    public boolean isCommand(int actionType)
    {
        boolean retValue = false;
        if(command == actionType)
            retValue = true;
        else
            retValue = false;
        return retValue;
    }

    public void setCommand(int command)
    {
        this.command = command;
    }

    public static FormCommand fromRequest(HttpServletRequest request)
    {
        FormCommand model = new FormCommand();
        try
        {
            model.setCommand(Integer.parseInt(JSPUtil.getParameter(request, "f_cmd", "-1")));
        }
        catch(Exception ex) { }
        return model;
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
