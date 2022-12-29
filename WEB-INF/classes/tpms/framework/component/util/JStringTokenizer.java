package tpms.framework.component.util;

import java.io.PrintStream;
import java.util.*;

public class JStringTokenizer
    implements Enumeration
{

    private int currentPosition;
    private int newPosition;
    private int maxPosition;
    private String str;
    private ArrayList delimiters;
    private boolean retDelims;
    private boolean delimsChanged;
    private boolean allowZeroLength;

    public JStringTokenizer(String str, ArrayList delim, boolean returnDelims, boolean allowZeroLength)
    {
        currentPosition = 0;
        newPosition = -1;
        delimsChanged = false;
        this.str = str;
        maxPosition = str.length();
        delimiters = delim;
        retDelims = returnDelims;
        this.allowZeroLength = allowZeroLength;
    }

    public JStringTokenizer(String str, String delim, boolean returnDelims, boolean allowZeroLength)
    {
        currentPosition = 0;
        newPosition = -1;
        delimsChanged = false;
        this.str = str;
        maxPosition = str.length();
        delimiters = new ArrayList();
        delimiters.add(delim);
        retDelims = returnDelims;
        this.allowZeroLength = allowZeroLength;
    }

    public JStringTokenizer(String str, ArrayList delim, boolean returnDelims)
    {
        this(str, delim, returnDelims, false);
    }

    public JStringTokenizer(String str, String delim, boolean returnDelims)
    {
        this(str, delim, returnDelims, false);
    }

    public JStringTokenizer(String str, ArrayList delim)
    {
        this(str, delim, false, false);
    }

    public JStringTokenizer(String str, String delim)
    {
        this(str, delim, false, false);
    }

    private String findToken(int position)
    {
        for(int i = 0; i < delimiters.size(); i++)
        {
            String delim = (String)delimiters.get(i);
            if(str.startsWith(delim, position))
                return delim;
        }

        return null;
    }

    private int skipDelimiters(int startPos)
    {
        if(delimiters == null)
            throw new NullPointerException();
        int position;
        for(position = startPos; !retDelims && position < maxPosition;)
        {
            String delim;
            if((delim = findToken(position)) == null)
                break;
            position += delim.length();
            if(allowZeroLength)
                break;
        }

        return position;
    }

    private int scanToken(int startPos)
    {
        String delim;
        int position;
        for(position = startPos; position < maxPosition; position++)
            if((delim = findToken(position)) != null)
                break;

        if(retDelims && startPos == position && (delim = findToken(position)) != null)
            position += delim.length();
        return position;
    }

    public boolean hasMoreTokens()
    {
        newPosition = skipDelimiters(currentPosition);
        return newPosition < maxPosition;
    }

    public String nextToken()
    {
        currentPosition = newPosition < 0 || delimsChanged ? skipDelimiters(currentPosition) : newPosition;
        delimsChanged = false;
        newPosition = -1;
        if(currentPosition >= maxPosition)
        {
            throw new NoSuchElementException();
        } else
        {
            int start = currentPosition;
            currentPosition = scanToken(currentPosition);
            return str.substring(start, currentPosition);
        }
    }

    public String nextToken(ArrayList delim)
    {
        delimiters = delim;
        delimsChanged = true;
        return nextToken();
    }

    public boolean hasMoreElements()
    {
        return hasMoreTokens();
    }

    public Object nextElement()
    {
        return nextToken();
    }

    public int countTokens()
    {
        int count = 0;
        for(int currpos = currentPosition; currpos < maxPosition;)
        {
            currpos = skipDelimiters(currpos);
            if(currpos >= maxPosition)
                break;
            currpos = scanToken(currpos);
            count++;
        }

        return count;
    }

    public static void main(String args[])
    {
        String testStr = "12\t\t3\t456\t\t789\t\t";
        JStringTokenizer jst = new JStringTokenizer(testStr, "\t", false, true);
        int i = 0;
        for(; jst.hasMoreTokens(); System.out.println("token " + i + ": " + jst.nextToken()))
            i++;

    }
}
