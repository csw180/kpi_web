package tpms.framework.component.dao;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.Serializable;
import java.sql.Blob;
import java.sql.Clob;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.StringTokenizer;
import java.math.BigDecimal;


/**
 * ResultSet을 받아서 특정형태의 구조체 형태로 변환하는 클래스
 *		필요 멤버변수 ;
 *		Properties	pt	 = new Properties();	//레코드를 담은 구조체역할을 하는 객체
 *		long		lPos = 0;	//레코드 위치
 *		long		lCnt = 0;	//레코드 갯수
 *
 *		1. 넘어온 rs를 순환하며 값을 다음과 같은 형식으로 필드값과 필드명을 매칭한다.
 *			getMetaData()를 이용하여 rsmd를 생성하고 각 필드타입에 따라 각
 *			필드 값을 String으로 처리 저장
 *			레코드는 각 필드명에 순번을 매겨 저장한다.
 *			pt.setProperty( "Field" + m_nRecordCnt, value);
 *
 *		2. 읽어온 레코드 개수를 설정한다.
 *
 *		3. 레코드의 초기 순번(멤버변수)은 0으로 설정한다.
 *			int	nPos = 0;
 *
 *		4. rs.next()를 외부에서 호출할 경우 레코드 순번을 증가시킨다.
 *			nPos++;
 *
 *		5. getString( "field")를 한 경우
 *
 *		현재 nPos와 nCnt를 비교한다( 갯수보다 위치가 크면 안되므로)
 *		getProperty( "field" + nPos, "defaultvalue" )를 활용하여 값을 처리
 *		현재 nPos와 nCnt를 비교한다( 갯수보다 위치가 크면 안되므로)
 *		ret = getProperty( "field" + nPos, "defaultvalue" )를 활용하여 값을 처리
 *		그런 후  Long.parseLong( ret, 10 ).longValue()를 활용하여 처리.
 *
 *		6. getLong( "field" )를 한 경우
 *
 *		현재 nPos와 nCnt를 비교한다( 갯수보다 위치가 크면 안되므로)
 *		ret = getProperty( "field" + nPos, "defaultvalue" )를 활용하여 값을 처리
 *		그런 후  Long.parseLong( ret, 10 ).longValue()를 활용하여 처리.
 */
public class DbResultSet implements Serializable,Cloneable
{
  // 여러 레코드 담을 객체
  List m_vt=new ArrayList();
  // 레코드의 칼럼과 칼럼명을 담아 놓을 객체
  Properties m_pt=new Properties();
  // 레코드의 칼럼과 칼럼사이즈를 담아 놓을 객체
  Properties m_nt=new Properties();

  Properties s_pt=new Properties();
  // 레코드 위치
  int m_nRecordPos=0;
  // 레코드 갯수
  int m_nRecordCnt=0;
  // 레코드 컬럼 갯수
  int m_nColumnCnt=0;
  // 실제 ResultSet의 Row Count;
  int m_nRowCount=0;
  // 화면출력여부 flag
  private final boolean verbose=false;
 
  /**
   *  생성자
   */
  public DbResultSet(ResultSet rs) throws SQLException {
    if (!makeSet(rs)) {
      System.out.println("DbResultSet : Make Set is false");
    }
  }

  /**
   * ResultSet에서 필요한 컬럼만을 선별하여 PcbsResultSet구성
   *
   * (예)  select tpms.framework.component.error, b, c, d FROM kkk;
   *   	 makeSet(ResultSet, "1,2,4");
   * 주의: 필요한 컬럼에 대한 숫자에서는 구분자로 ","이 사용되며
   *		 숫자사이에 공백이 있으면 않됨.
   * @param 	rs	SQL문에 대한 결과를 담고 있는 ResultSet
   * @param 	ss  rs중 필요한 컬럼에 대한 숫자를 담고 있는 문자열
   *				delimiter는 "," 임.
   *				(예) "1,2,3,45"
   * @return 	true or false
   */
  public DbResultSet(ResultSet rs,String col) throws SQLException {
    if (!makeSet(rs,col)) {
      System.out.println("DbResultSet : Make Set is false");
    }
  }

  /**
   * ResultSet에서 필요한 컬럼만을 선별하여 PcbsResultSet구성
   *
   * (예)  select tpms.framework.component.error, b, c, d FROM kkk;
   *   	 makeSet(ResultSet, "1,2,4", 20, 389);
   *		 ResultSet == 2000개의 data
   *		 1,2,4 column과 20~389까지의 row만 PcbsResultSet에 담는다.
   *
   * 주의: 필요한 컬럼에 대한 숫자에서는 구분자로 ","이 사용되며
   *		 숫자사이에 공백이 있으면 않됨.
   * @param 	rs	SQL문에 대한 결과를 담고 있는 ResultSet
   * @param 	ss  rs중 필요한 컬럼에 대한 숫자를 담고 있는 문자열
   *				delimiter는 "," 임.
   *				(예) "1,2,3,45"
   * @param	startRow	PcbsResultSet에 담을 시작위치
   * @param 	endRow		PcbsResultSet에 담을 끝위치
   * @return 	true or false
   */
  public DbResultSet(ResultSet rs,String col,int startRow,int endRow) throws SQLException {
    if (!makeSet(rs,col,startRow,endRow)) {
      System.out.println("DbResultSet : Make Set is false");
    }
  }

  /**
   * 인스탄스의 복제
   */
  public DbResultSet CopyObject() throws CloneNotSupportedException {
    return (DbResultSet)this.clone();
  }

  /**
   * 처음 레코드로 위치를 이동시키는 것
   */
  public boolean first() {
    if (m_nRecordCnt<=0)
      return false; //레코드가 한 건도 없을 경우

    m_nRecordPos=0;
    return true;
  }

  /**
   * 다음 레코드로 위치를 이동시키는 것
   */
  public boolean next() {
    if (m_nRecordCnt<=0)
      return false; //레코드가 한 건도 없을 경우
//    System.out.println( "====" + m_nRecordCnt + " ===" + m_nRecordPos );

    m_nRecordPos++; // Current Position을 증가시킨다.

    if (m_nRecordPos <= m_nRecordCnt) {
      return true;
    }
    return false;
  }

  /**
   * 이전 레코드로 위치를 이동시키는 것
   * 만약 레코드가 1개라도 있고 위치가 1에 있으면 0번 위치로 간다.
   */
  public boolean previous() {
    if (m_nRecordCnt<=0)
      return false; //레코드가 한 건도 없을 경우

    if ((m_nRecordPos<0)||(m_nRecordPos>m_nRecordCnt))
      return false; //레코드위치가 오류인 경우

    if (m_nRecordPos>=1) {
      m_nRecordPos--;
      return true;
    }

    return false;
  }

  /**
   * 마지막 레코드로 위치를 이동시키는 것
   */
  public boolean last() {
    if (m_nRecordCnt<=0)
      return false; //레코드가 한 건도 없을 경우
    m_nRecordPos=m_nRecordCnt;
    return true;
  }

  /**
   * 특정 레코드로 위치를 이동시키는 것
   */
  public boolean move(int nPos) {
    boolean bRet=true;

    if (m_nRecordCnt<=0)
      return false; //레코드가 한 건도 없을 경우

    int nTmp=m_nRecordPos+nPos;
    if (nTmp>m_nRecordCnt||(nTmp<0))
      bRet=false;
    else
      bRet=true;

    m_nRecordPos+=nPos; // Current Position을 증가시킨다.

    return bRet;
  }

  /**
   * ResultSet으로부터 데이터를 읽어서 자료구조를 만든다.
   */
  public boolean makeSet(ResultSet rs) throws SQLException {
    ResultSetMetaData rsmd=rs.getMetaData();

    if (rsmd==null)
      return false;

    String str="";

    try {
      m_nColumnCnt=rsmd.getColumnCount(); //칼럼개수
      int colPos=1;                       //칼럼 타입을 파악할 컬럼 위치
      int nType=0;                        //칼럼 타입
      String strColName="";               //칼럼 명
      int nColSize=0;                     //칼럼 사이즈
      Properties pt = null;               //레코드를 담은 구조체역할을 하는 객체
      //System.out.println( "==m_nColumnCnt==" + m_nColumnCnt);

      //1. 레코드내의 칼럼갯수를 알아내어 그 수 만큼 순환.
      for (colPos=1; colPos<=m_nColumnCnt; colPos++) {
        //칼럼명을 얻어옴...
        strColName=rsmd.getColumnName(colPos);
        //칼럼명과 칼럼 위치를 매핑
        m_pt.setProperty(strColName.toLowerCase(),""+colPos);
        m_nt.setProperty(""+colPos,strColName.toLowerCase());

        //칼럼의 사이즈를 얻어옴...
        nColSize=rsmd.getColumnDisplaySize(colPos);

        //칼럼위치와 사이즈를 매핑
        s_pt.setProperty(""+colPos,""+nColSize);
      }

      //System.out.println( "==m_pt==" + m_pt);

      //2. 레코드 순환하며  값을 설정함
      m_nRecordCnt=0;
      m_nRowCount=0;
      while (rs.next()) {
        m_nRecordCnt++; //레코드 갯수 증가시킴.
        //System.out.println( "==m_nRecordCnt==" + m_nRecordCnt);
        pt=new Properties(); //레코드를 담은 구조체역할을 하는 객체

        //3. 레코드내의 칼럼갯수 만큼 순환.
        for (colPos=1; colPos<=m_nColumnCnt; colPos++) {
          nType=rsmd.getColumnType(colPos);
          //4. 컬럼타입에 따라 값을 다르게 가져옴.
          //   put하는 경우 어느 하나의 매개변수도 Null이면 안됨...

          try {
            switch (nType) {
              case Types.CLOB:
                str=readClob((Clob)rs.getObject(colPos));
                break;
              case Types.BLOB:
                str=readBlob((Blob)rs.getObject(colPos));
                break;
              default:
                str=rs.getString(colPos);
                break;
            } //switch

            if (str==null)
              str=" ";
            pt.setProperty(""+colPos,str); //index로 찾는 경우

          } catch (Exception e) {
            System.out.println("DbResultSet : nType = "+nType);
            System.out.println("DbResultSet : colPos = "+colPos+" 칼럼 catch error ==="+e);
            System.out.println("DbResultSet : pt = "+pt);
          }
        } //for - 칼럼갯수만큼 순환

        m_vt.add(pt);
        m_nRowCount++;

      } //while - 레코드 갯수만큼 순환

      //System.out.println("DbResultSet : Record Count = " + getRowCount() );

      return true;

    } catch (Exception e) { //try finish
      System.out.println("DbResultSet : Error :::::::::::::::::");
      System.out.println("DbResultSet : "+e.getMessage());
      e.printStackTrace();
    }

    return false;
  }

  /**
   * ResultSet에서 필요한 컬럼만을 선별하여 PcbsResultSet구성
   *
   * (예)  select tpms.framework.component.error, b, c, d FROM kkk;
   *   	 makeSet(ResultSet, "1,2,4");
   *
   *
   *
   * 주의: 필요한 컬럼에 대한 숫자에서는 구분자로 ","이 사용되며
   *		 숫자사이에 공백이 있으면 않됨.
   */
  public boolean makeSet(ResultSet rs,String ss) throws SQLException {
    List vts=new ArrayList();
    ResultSetMetaData rsmd=rs.getMetaData();
    if (rsmd==null)
      return false;

    String str="";

    //1. 사용자가 원하는 칼럼의 번호를 입력한다.
    StringTokenizer st=new StringTokenizer(ss,",");
    while (st.hasMoreTokens()) {
      vts.add(new Integer(st.nextToken()));
      m_nColumnCnt++;

    } //end while

    //System.out.println("==vts==" + vts);

    try {
      int scolPos=0;
      int colPos=1; //칼럼 타입을 파악할 컬럼 위치
      int nType=0; //칼럼 타입
      String strColName=""; //칼럼 명
      int nColSize=0; //칼럼 사이즈
      Properties pt=null; //레코드를 담은 구조체역할을 하는 객체

      //2. 원하는 레코드내의 칼럼갯수를 만큼 순환. vts.size()
      for (colPos=1; colPos<=vts.size(); colPos++) {
        strColName=rsmd.getColumnName(((Integer)vts.get(colPos-1)).intValue());
        m_pt.setProperty(strColName,""+colPos);
        //칼럼의 사이즈를 얻어옴...
        nColSize=rsmd.getColumnDisplaySize(colPos);
        //칼럼위치와 사이즈를 매핑
        s_pt.setProperty(""+colPos,""+nColSize);

      } //for

      //3. 레코드 순환하며  값을 설정함
      m_nRecordCnt=0;
      m_nRowCount=0;
      while (rs.next()) {
        pt=new Properties(); //레코드를 담은 구조체역할을 하는 객체

        //3. 원하는 칼럼갯수 만큼 순환.
        for (colPos=1; colPos<=vts.size(); colPos++) {

          scolPos=((Integer)vts.get(colPos-1)).intValue();
          nType=rsmd.getColumnType(scolPos);

          //4. 컬럼타입에 따라 값을 다르게 가져옴.
          //   put하는 경우 어느 하나의 매개변수도 Null이면 안됨...
          try {
            switch (nType) {
              case Types.CLOB:
                str=readClob((Clob)rs.getObject(scolPos));
                break;
              case Types.BLOB:
                str=readBlob((Blob)rs.getObject(colPos));
                break;
              default:
                str=rs.getString(scolPos);
                if (str==null)
                  str="";

            } //switch

            pt.setProperty(""+colPos,str); //index로 찾는 경우
            break;

          } catch (Exception e) { //end try
            System.out.println("DbResultSet : nType = "+nType);
            System.out.println("DbResultSet : colPos = "+colPos+" 칼럼 catch error ==="+e);
            System.out.println("DbResultSet : scolPos = "+scolPos+" 칼럼 catch error ==="+e);
            System.out.println("DbResultSet : pt = "+pt);
          }

        } //for - 칼럼갯수만큼 순환

        m_nRecordCnt++; //레코드 갯수 증가시킴.
        m_vt.add(pt);
        m_nRowCount++;
      } //while - 레코드 갯수만큼 순환

      return true;

    } catch (Exception e) { //try finish
      System.out.println("DbResultSet : Error :::::::::::::::::");
      System.out.println("DbResultSet : "+e.getMessage());
      e.printStackTrace();
    }
    return false;
  }

  /**
   * ResultSet에서 필요한 컬럼만을 선별하여 PcbsResultSet구성
   *
   * (예)  select tpms.framework.component.error, b, c, d FROM kkk;
   *   	 makeSet(ResultSet, "1,2,4", 20, 389);
   *		 ResultSet == 2000개의 data
   *		 1,2,4 column과 20~389까지의 row만 PcbsResultSet에 담는다.
   *
   * 주의: 필요한 컬럼에 대한 숫자에서는 구분자로 ","이 사용되며
   *		 숫자사이에 공백이 있으면 않됨.
   */
  public boolean makeSet(ResultSet rs,String ss,int startRow,int endRow) throws SQLException {
    List vts=new ArrayList();
    ResultSetMetaData rsmd=rs.getMetaData();
    if (rsmd==null)
      return false;

    String str="";
    int n=0;

    //1. 사용자가 원하는 칼럼의 번호를 입력한다.
    StringTokenizer st=new StringTokenizer(ss,",");
    while (st.hasMoreTokens()) {
      vts.add(new Integer(st.nextToken()));
      m_nColumnCnt++;

    } //end while

    //System.out.println("DbResultSet : vts = " + vts);

    try {
      int scolPos=0;
      int colPos=1; //칼럼 타입을 파악할 컬럼 위치
      int nType=0; //칼럼 타입
      int chkRange=0; //row 범위를 확인하기 위한것
      String strColName=""; //칼럼 명
      int nColSize=0; //칼럼 사이즈
      Properties pt=null; //레코드를 담은 구조체역할을 하는 객체

      //2. 원하는 레코드내의 칼럼갯수를 만큼 순환. vts.size()
      for (colPos=1; colPos<=vts.size(); colPos++) {
        strColName=rsmd.getColumnName(((Integer)vts.get(colPos-1)).intValue());
        m_pt.setProperty(strColName,""+colPos);
        //칼럼의 사이즈를 얻어옴...
        nColSize=rsmd.getColumnDisplaySize(colPos);
        //칼럼위치와 사이즈를 매핑
        s_pt.setProperty(""+colPos,""+nColSize);

      } //for
      //System.out.println( "==m_pt==" + m_pt);

      //3. 레코드 순환하며  값을 설정함
      m_nRecordCnt=0;
      m_nRowCount=0;
      while (rs.next()) {

        /*
         *	원하는 범위의 row만 담는것
         *	chkRange는 현재의 위치가 startRow와 endRow범위
         *  	내에 있는지 확인하기 위한 check field 변수
         */
        if ((chkRange>=startRow)&&(chkRange<=endRow)) {
          //System.out.println( "==m_nRecordCnt==" + m_nRecordCnt);
          pt=new Properties(); //레코드를 담은 구조체역할을 하는 객체

          //3. 원하는 칼럼갯수 만큼 순환.
          for (colPos=1; colPos<=vts.size(); colPos++) {

            scolPos=((Integer)vts.get(colPos-1)).intValue();
            nType=rsmd.getColumnType(scolPos);

            //4. 컬럼타입에 따라 값을 다르게 가져옴.
            //   put하는 경우 어느 하나의 매개변수도 Null이면 안됨...

            try {
              switch (nType) {
                case Types.CLOB:
                  str=readClob((Clob)rs.getObject(scolPos));
                  break;
                case Types.BLOB:
                  str=readBlob((Blob)rs.getObject(colPos));
                  break;
                default:
                  str=rs.getString(scolPos);
                  break;
              } //switch

              if (str==null)
                str="";
              pt.setProperty(""+colPos,str); //index로 찾는 경우

            } catch (Exception e) { //end try
              System.out.println("DbResultSet : nType = "+nType);
              System.out.println("DbResultSet : colPos = "+colPos+" 칼럼 catch error ==="+e);
              System.out.println("DbResultSet : scolPos = "+scolPos+" 칼럼 catch error ==="+e);
              System.out.println("DbResultSet : pt = "+pt);
            }

          } //for - 칼럼갯수만큼 순환

          m_nRecordCnt++; //레코드 갯수 증가시킴.
          m_vt.add(pt);
        } //end if

        m_nRowCount++;
        chkRange++;

      } //while - 레코드 갯수만큼 순환

      return true;

    } catch (Exception e) { //try finish
      System.out.println("DbResultSet : Error :::::::::::::::::");
      System.out.println("DbResultSet : "+e.getMessage());
      e.printStackTrace();
    }
    return false;
  }

  /**
   * 칼럼명으로 값을 얻고자 할 경우 해당 칼럼위치를 찾아내주는 기능을 수행
   * 모두 소문자로 처리하여 비교 함.
   */
  protected int findIndex(String columnName) {
    try {
      //default value로 1을 설정
      Integer n=new Integer(m_pt.getProperty(columnName.toLowerCase(),"1"));
      int nIndex=n.intValue();
      return nIndex;
    } catch (Exception e) {
      System.out.println("DbResultSet : findIndex Error :::::::::::::::::");
      System.out.println("DbResultSet : "+e.getMessage());
      e.printStackTrace();
    }

    return 1;
  }

  /**
   * String 타입 칼럼을 Column Index를 이용하여 얻는다.
   * 이때 데이터베이스의 Charater Set을 System의 Chracter Set으로 변환한다.
   */
  public String getString(int columnIndex) {
    String str="";
    try {
      if (m_nRecordPos<=0)
          return "<record position is 0>";
      Properties pt=(Properties)m_vt.get(m_nRecordPos-1);

      //Character Set을 변환하여 가져온다.
      //System.out.println( "columnIndex=" + columnIndex );
      try {
        StringTokenizer st=new StringTokenizer(pt.getProperty(""+columnIndex,""),".");
        if (st.countTokens()>1) {
          str = new String("" + (new Double(pt.getProperty("" + columnIndex, "0"))).doubleValue());
          //System.out.println( "Double =" + str );
          str = new String("" + new BigDecimal(pt.getProperty("" + columnIndex, "0")));
          //System.out.println( "BigDecimal=" + str );

        } else {
          str=new String(pt.getProperty(""+columnIndex,""));
        }

      } catch (Exception f) {
        str=new String(pt.getProperty(""+columnIndex,""));
        return str;
      }
      return str;
    } catch (Exception e) {
      System.out.println("DbResultSet : getString Error :::::::::::::::::");
      System.out.println("DbResultSet : "+e.getMessage());
      e.printStackTrace();
    }
    return "";
  }

  /**
   * String 타입 칼럼을 Column Name을 이용하여 얻는다.
   * 이때 데이터베이스의 Charater Set을 System의 Chracter Set으로 변환한다.
   */
  public String getString(String columnName) {
    //칼럼의 위치로 찾아내는 메소드를 이용함...
    return getString(findIndex(columnName));
  }

  /**
   * 현재 담고 있는 Vector의 레코드 갯수를 반환시킴
   */
  public int getRowCount() {
    try {
      return m_vt.size();
    } catch (Exception e) { //try finish
      System.out.println("DbResultSet : getRowCount Error :::::::::::::::::");
      System.out.println("DbResultSet : "+e.getMessage());
      e.printStackTrace();
    }
    return-1;
  }

  /**
   * 멤버 Vector의 레코드 컬럼 갯수를 반환시킴
   */
  public int getColumnCount() {
    try {
      return m_nColumnCnt;
    } catch (Exception e) { //try finish
      System.out.println("DbResultSet : getColumnCount Error :::::::::::::::::");
      System.out.println("DbResultSet : "+e.getMessage());
      e.printStackTrace();
    }
    return-1;
  }
  /**
   * 멤버 Vector의 레코드 컬럼명을 반환시킴
   */

  public String getColumnname(int columnIndex)
  {
      String str = "";
      try
      {
           str = new String(m_nt.getProperty("" + columnIndex, ""));
      }
      catch(Exception e)
      {
          System.out.println("DbResultSet : getString Error :::::::::::::::::");
          System.out.println("DbResultSet : "+e.getMessage());
          e.printStackTrace();
      }
      return str;
    }
  /**
   * 일부의 Row만 담았을 경우 ResultSet의 내의 총 총 멤버 ArrayList의 레코드 컬럼 갯수를 반환시킴
   */
  public int getMaxRowCount() {
    try {
      return m_nRowCount;
    } catch (Exception e) { //try finish
      System.out.println("DbResultSet : getMaxRowCount Error :::::::::::::::::");
      System.out.println("DbResultSet : "+e.getMessage());
      e.printStackTrace();
    }
    return-1;
  }

  /**
   * 칼럼인덱스으로 컬럼의 사이즈값을 찾아내주는 기능을 수행
   */
  public int getColumnDisplaySize(int columnindex) {
    Integer nVal=new Integer(s_pt.getProperty(""+columnindex,"0"));
    return nVal.intValue();
  }

  /**
   * 칼럼명으로 컬럼의 사이즈값을 찾아내주는 기능을 수행
   */
  public int getColumnDisplaySize(String columnName) {
    Integer nVal=new Integer(s_pt.getProperty(""+findIndex(columnName),"0"));
    return nVal.intValue();
  }

  private String readClob(Clob clob) throws SQLException,IOException {
    int len;
    BufferedReader br=new BufferedReader(clob.getCharacterStream());
    char[] buf=new char[1024];
    StringBuffer sb=new StringBuffer();
    while ((len=br.read(buf,0,1024))!=-1)
      sb.append(buf,0,len);
    return sb.toString();
  }

  private String readBlob(Blob blob) throws SQLException,IOException {
    int len;
    InputStream is;
    byte[] buf=new byte[1024];

    System.out.println("blob length : "+blob.length());
    is=blob.getBinaryStream();
    StringBuffer sb=new StringBuffer();

    while ((len=is.read(buf,0,1024))!=-1) {
      //System.out.println(new String(buf));
      sb.append(new String(buf,0,len));
    }
    //System.out.println("======================");
    //System.out.println(sb.toString());
    return sb.toString();
  }
}
