package tpms.news.scr;

import javax.servlet.http.HttpServletRequest;
import tpms.framework.component.util.JSPUtil;
import tpms.framework.component.dao.*;
import tpms.framework.component.signon.SignOnUserAccount;
import tpms.framework.core.controller.Event;
import tpms.framework.core.controller.EventResponse;
import tpms.framework.core.controller.web.html.HTMLActionException;
import tpms.framework.core.controller.web.html.HTMLActionSupport;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import java.lang.*;
import java.util.*;
import java.text.*;
import java.io.*;
import java.math.BigDecimal;
import tpms.framework.component.upload.*;

/**
 *  클래스 개요    : 공지사항-Dispatch <p>
 *  클래스 상세기능 : HTTP parser<p>
 *  작성일 : 2005.06.20<p>
 *  @version 1.0
 *  @author  전정길
 */
public class news_scr_1114_Control extends HTMLActionSupport   
{
    /**
     * 공지사항 첨부파일이 저장될 Directory
     */
	/* unix dev, live 용 */
    public static final String  MAIN_BBS_UPLOAD_DIR = "/kpidata/mainlog/bbs_upload/";
    public static final String  SUB_BBS_UPLOAD_DIR  = "/kpidata/sublog/bbs_upload/";

    /* window local 용 */
	/*
    public static final String  MAIN_BBS_UPLOAD_DIR = "C:\\suhyup_n\\workspace\\kpi\\src\\main\\webapp\\log\\mainlog\\bbs_upload\\";
    public static final String  SUB_BBS_UPLOAD_DIR  = "C:\\suhyup_n\\workspace\\kpi\\src\\main\\webapp\\log\\sublog\\bbs_upload\\";
    */
    /**
     * HttpRequst의 정보를 연계계정관리 조회 데이타모델로 파싱하여 반환한다.
     */
    public EventResponse perform(HttpServletRequest request) throws HTMLActionException 
    {
        HttpSession     session = request.getSession(false);
        ServletContext  context = session.getServletContext();

        SignOnUserAccount account = (SignOnUserAccount)session.getAttribute("tpms.component.signon.SIGN_ON_USER_ACCOUNT");
        
        DbResultSet rs    =    null;
        long        rc    =    0;
        Exception   ext   =    null;

        boolean     isMain=    "jeus".equals(System.getProperty("user.name")) ? true : false;
                
        String UserID     =    account.getHaengwon_no();
        
        String hidden_key =    JSPUtil.getParameter(request,"hidden_key"    , " ");     // 조회,등록,변경,삭제 구분자
        String kongigb    =    JSPUtil.getParameter(request,"kongigb"       , " ");     // 공지사항 = 1, 게시판 = 2
        String v_page     =    JSPUtil.getParameter(request,"v_page"        , "1");     // 현재페이지
        String wt_date    =    JSPUtil.getParameter(request,"wt_date"       , " ");     // 작성일자
        String wt_time    =    JSPUtil.getParameter(request,"wt_time"       , " ");     // 작성시간
        String title      =    JSPUtil.getParameter(request,"title"         , " ");     // 제목
        String end_date_s =    JSPUtil.getParameter(request,"end_date_s"    , " ");     // 공지시작
        String end_date_e =    JSPUtil.getParameter(request,"end_date_e"    , " ");     // 공지완료
        String up_date    =    JSPUtil.getParameter(request,"up_date"       , " ");     // 상위일자
        String up_time    =    JSPUtil.getParameter(request,"up_time"       , " ");     // 상위시간
        String comt       =    JSPUtil.getParameter(request,"comt"          , " ");     // 내용
        String createchk  =    JSPUtil.getParameter(request,"createchk"     , " ");     // 디렉토리 체크
                                                                                     
        String path       =    "";                                                      // 파일저장 위치
        int    filecnt    =    0;                                                       // 변경될 파일 갯수
        
        // 등록시 작성일자,작성시간을 구한다.        
        Date currentTime = new Date();
        if(wt_date.trim().equals("") || wt_date.length()==0)
        {
            wt_date = (new SimpleDateFormat("yyyyMMdd")).format(currentTime);
            wt_time = (new SimpleDateFormat("HHmmss")).format(currentTime);
        }
        
        // 내용을 FORMAT에 맞게 CUTTING 한다.
        // MAX_LENGTH 자리씩 잘라 'tb_bmat공지내용' 테이블 '내용'(1024byte) 에 INSERT할 값을 구한다.
        int seq        = 0;
        int max_length = 300;
        int st_comt    = 0;
        int ed_comt    = max_length;
        int remainder  = 0;
        String seq_comt= "";
        
        //총길이에서 MAX_LENGTH를 나눈다.
        seq       = comt.length() / max_length;
        remainder = comt.length() % max_length;
        if(remainder != 0) seq += 1;
        if(seq == 0) seq = 1;
        
        try {
            DBProcCall jado    =    new DBProcCall();
            
            /*-----------------------------------------*/
            /* 공지사항 게시물 등록                    */
            /*-----------------------------------------*/
            if(hidden_key.equals("1"))                      
            {
                // SERVER 등록
                // 디렉토리 생성
                if(createchk.equals("1")) {
                    path  = isMain ? MAIN_BBS_UPLOAD_DIR + wt_date + wt_time : SUB_BBS_UPLOAD_DIR + wt_date + wt_time;
                
                    File createDir =new  File(path); 
                    if(!createDir.exists()) createDir.mkdirs();
                    
                    // "MS949" = "한글처리"
                    //MultipartParser parser = new MultipartParser(request, 1024*1024*5*10, true, true, "MS949");
                    MultipartParser parser = new MultipartParser(request, 1024*1024*5*10, true, true, "UTF-8");
                    
                    Part part;
                    while((part = parser.readNextPart()) != null) 
                    {
                        //String name = new String(part.getName().getBytes("8859_1"), "euc-kr");
                    	String name = new String(part.getName().getBytes("UTF-8"), "UTF-8");
                        // 폼이 파일 일때
                        if(part.isFile())
                        {
                          FilePart filePart = (FilePart) part;
                          String fileName = filePart.getFileName(); 
                          if ( fileName != null )
                          { 
                            //fileName = new String(filePart.getFileName().getBytes("8859_1"),"euc-kr"); 
                            fileName = new String(filePart.getFileName().getBytes("UTF-8"),"UTF-8");
                          }
                          // 폼안에 파일이 있을때
                          if (fileName != null) 
                          { 
                            long size = filePart.writeTo(createDir); 
                          }
                          // 폼안에 파일이 없을때
                          else 
                          {
                            log.debug("file; name=" + name + "; EMPTY(빈값)");
                          }
                        }
                        // 폼이 파일이 아닐때                  
                        else if(part.isParam()) 
                        {
                          ParamPart paramPart = (ParamPart) part; 
                          //String value = new String(paramPart.getStringValue().getBytes("8859_1"), "euc-kr");
                          String value = new String(paramPart.getStringValue().getBytes("UTF-8"), "UTF-8");
                          log.debug("param; name=" + name + ", value=" + value); 
                        }
                    }
                    
                    String[] files  = createDir.list();
                    for (int i = 0; i < files.length; i++) {
                        jado.InputProc("UP_KPI_S_S_NEWS첨부파일처리",hidden_key
                                                        + "," + wt_date
                                                        + "," + wt_time
                                                        + "," + (i+1)
                                                        + "," + files[i]);    
                    }   
                }

                rc  =  jado.InputProc("UP_KPI_S_S_NEWS공지사항처리",hidden_key
                                                    + "," + wt_date
                                                    + "," + wt_time
                                                    + "," + title
                                                    + "," + end_date_s
                                                    + "," + end_date_e
                                                    + "," + up_date
                                                    + "," + up_time
                                                    + "," + UserID);
                for(int i=0;i<seq;i++)
                {   
                    if(i == seq-1) {
                        seq_comt  = comt.substring(st_comt);
                    } else {
                        seq_comt  = comt.substring(st_comt,ed_comt);
                    }
                    
                    jado.InputProc("UP_KPI_S_S_NEWS공지사항내용처리",hidden_key
                                                        + "," + wt_date
                                                        + "," + wt_time
                                                        + "," + seq_comt
                                                        + "," + (i+1));
                    st_comt += max_length;
                    ed_comt += max_length;                                                    
                }
            }
            /*-----------------------------------------*/
            /* 공지사항 게시물 변경                    */
            /*-----------------------------------------*/            
            else if(hidden_key.equals("2"))
            {
                if(createchk.equals("1")) {
                    // SERVER 수정
                    path  = isMain ? MAIN_BBS_UPLOAD_DIR + wt_date + wt_time : SUB_BBS_UPLOAD_DIR + wt_date + wt_time;
                    
                    File createDir = new  File(path); 
                    if(!createDir.exists()) createDir.mkdirs();
                    
                    // "MS949" = "한글처리"
                    //MultipartParser parser = new MultipartParser(request, 1024*1024*5*10, true, true, "MS949");
                    MultipartParser parser = new MultipartParser(request, 1024*1024*5*10, true, true, "UTF-8");
                    
                    Part part;
                    while((part = parser.readNextPart()) != null) 
                    {
                        //String name = new String(part.getName().getBytes("8859_1"), "euc-kr");
                        String name = new String(part.getName().getBytes("UTF-8"), "UTF-8");
                        
                        // 폼이 파일 일때
                        if(part.isFile())
                        {
                            FilePart filePart = (FilePart) part;
                            String fileName = filePart.getFileName(); 
                            
                            if ( fileName != null )
                            { 
                                //fileName = new String(filePart.getFileName().getBytes("8859_1"),"euc-kr");
                                fileName = new String(filePart.getFileName().getBytes("UTF-8"),"UTF-8");
                            }
                            
                            // 폼안에 파일이 있을때
                            if (fileName != null) 
                            { 
                                long size = 0;
                                filecnt++;
                                //첨부된 파일을 수정한다... 비교해서 새로운 파일들하고 같으면 남겨두고 틀릴경우는 삭제한다.
                                File deleteFile = null;                 //삭제 할파일
                                String[] files  = createDir.list();     //현재 첨부된 파일들.
                                log.debug("현재 안에 있는 파일갯수:" + files.length);
                                if(filecnt == 1)                        //변경될 파일이 존재할 경우 모두 삭제후 새로운 파일을 업로드 한다.
                                {
                                    for (int i = 0; i < files.length; i++) 
                                    {
                                        deleteFile = new File(path+"/"+files[i]);
                                        if(!fileName.equals(files[i]))        // 폼 파일과 첨부된 파일이 틀릴경우.
                                        {
                                            deleteFile.delete();   // 디렉토리안 해당 파일 삭제
                                        }
                                    }
                                }
                                
                                size = filePart.writeTo(createDir);
                                
                                log.debug("file; name=" + name + "; filename=" + fileName + 
                                  //", filePath=" + new String(filePart.getFilePath().getBytes("8859_1"),"euc-kr") +
                                  ", filePath=" + new String(filePart.getFilePath().getBytes("UTF-8"),"UTF-8") +
                                  ", content type=" + filePart.getContentType() + 
                                  ", size=" + size); 
                            }
                            else // 폼안에 파일이 없을때
                            {
                              log.debug("file; name=" + name + "; EMPTY(빈값)");
                            }
                        }
                        else if(part.isParam()) // 폼이 파일이 아닐때
                        {
                            ParamPart paramPart = (ParamPart) part; 
                            //String    value     = new String(paramPart.getStringValue().getBytes("8859_1"), "euc-kr");
                            String    value     = new String(paramPart.getStringValue().getBytes("UTF-8"), "UTF-8");
                            log.debug("param; name=" + name + ", value=" + value); 
                        }
                    }            
                    
                    String[] files  = createDir.list();
                    
                    for (int i = 0; i < files.length; i++) 
                    {
                      jado.InputProc("UP_KPI_S_S_NEWS첨부파일처리",hidden_key
                                                      + "," + wt_date
                                                      + "," + wt_time
                                                      + "," + (i+1)
                                                      + "," + files[i]);    
                    }           
                }

                rc  =  jado.InputProc("UP_KPI_S_S_NEWS공지사항처리",hidden_key
                                                    + "," + wt_date
                                                    + "," + wt_time
                                                    + "," + title
                                                    + "," + end_date_s
                                                    + "," + end_date_e
                                                    + "," + up_date
                                                    + "," + up_time
                                                    + "," + UserID);
                for(int i=0;i<seq;i++)
                {   
                    if(i == seq-1){seq_comt  = comt.substring(st_comt);}
                    else{seq_comt  = comt.substring(st_comt,ed_comt);}
                    
                    jado.InputProc("UP_KPI_S_S_NEWS공지사항내용처리",hidden_key
                                                        + "," + wt_date
                                                        + "," + wt_time
                                                        + "," + seq_comt
                                                        + "," + (i+1));
                    st_comt += max_length;
                    ed_comt += max_length;                                                    
                }  
            }
            /*-----------------------------------------*/
            /* 공지사항 게시물 삭제                    */
            /*-----------------------------------------*/               
            else if(hidden_key.equals("3"))
            {
                if(createchk.equals("1")) {
                    // SERVER 삭제
                    path  = isMain ? MAIN_BBS_UPLOAD_DIR + wt_date + wt_time : SUB_BBS_UPLOAD_DIR + wt_date + wt_time;
                    
                    System.out.println(">> 삭제할 directory : " + path);
                    File deleteFile = null;                             // 삭제할파일
                    File deleteDir  = new  File(path);                  // 삭제할디렉토리
                    String[] files  = deleteDir.list();

                    //directory 존재여부 체크
                    if(deleteDir.exists()) {
	                    for (int i = 0; i < files.length; i++) 
	                    {
	                        deleteFile = new File(path + "/" + files[i]);   // 디렉토리안 모든 파일 삭제
	                        deleteFile.delete();
	                    }
	                    
	                    
	                    deleteDir.delete();
                    }
                } 
                
                // DB 삭제
                rc  =  jado.InputProc("UP_KPI_S_S_NEWS공지사항처리",hidden_key
                                                    + "," + wt_date
                                                    + "," + wt_time
                                                    + "," + title
                                                    + "," + end_date_s
                                                    + "," + end_date_e
                                                    + "," + up_date
                                                    + "," + up_time
                                                    + "," + UserID);
            }
            
            rs = jado.callProc("UP_KPI_S_S_NEWS공지사항", kongigb + "," + v_page);

        } catch(Exception exe) { 
            log.error("DAO 생성 오류 "+exe.toString(),exe); 
            ext  =  exe;
        }

        news_scr_1114_EventResponse eventResponse  =    new news_scr_1114_EventResponse(rs,rc,ext);
        request.setAttribute("news_scr_1114_EventResponse", eventResponse);

        return eventResponse;
    } //end perform()

    /**
     * HttpRequest의 attribute에 업무시나리오 수행결과 값 저장.
     */
    public void doEnd(HttpServletRequest request, EventResponse eventResponse) {

        request.setAttribute("EventResponse", eventResponse);

        log.debug("setAttribute");
    }

    /**
     * HttpRequest의 attribute에 HttpRequest 파싱 수행결과 값 저장.
     */
    public void doEnd(HttpServletRequest request,Event event) {
        request.setAttribute("Event",event);
        log.debug("setAttribute");
    }
    
}//end class
