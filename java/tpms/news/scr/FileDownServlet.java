package tpms.news.scr;

import java.io.*;
import java.net.*;
import java.sql.*;
import java.text.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class FileDownServlet extends HttpServlet
{

   public void doGet(HttpServletRequest request, HttpServletResponse response) 
     throws ServletException, IOException {
    doPost(request,response);
   }


  public void doPost(HttpServletRequest request, HttpServletResponse response) 
     throws ServletException, IOException {
        
        response.setContentType("application/smnet");
        
        boolean isMain    = "jeus".equals(System.getProperty("user.name")) ? true : false;
        
        String  wt_date   = request.getParameter("wt_date")  == null ? "" : request.getParameter("wt_date").trim();   // wt_date
        String  wt_time   = request.getParameter("wt_time")  == null ? "" : request.getParameter("wt_time").trim();   // wt_time
        String  filename  = request.getParameter("filename") == null ? "" : request.getParameter("filename").trim();  // filename


        /* 파일 다운로드 시작*/
        String filepath  = isMain ? news_scr_1114_Control.MAIN_BBS_UPLOAD_DIR : news_scr_1114_Control.SUB_BBS_UPLOAD_DIR;
        
        String dFileName = filename;
        
        
        if(wt_date!=null && wt_date.length()>0)
            filepath = filepath + wt_date + wt_time + "/";
            
        File file = new File(filepath,filename);


        long filesize = file.length(); // 파일의 크기

        byte b[] = new byte[(int)filesize];

        String strClient = request.getHeader("User-Agent");

        if(strClient.indexOf("MSIE 5.5")>-1) {
            response.setHeader("Content-Disposition", "filename=" + filename + ";");
        } else {
            response.setHeader("Content-Disposition", "attachment;filename=" + filename + ";");
        }

        response.setHeader ("Content-Length", ""+filesize );

        if (filesize > 0 && file.isFile()) {
            BufferedInputStream fin   = new BufferedInputStream(new FileInputStream(file));
            BufferedOutputStream outs = new BufferedOutputStream(response.getOutputStream());
            int read = 0;

            try{
                while((read = fin.read(b)) != -1) {
                    outs.write(b,0,read);
                }
            } 
            catch (Exception e) {
                System.out.println(e.getMessage());
            } 
            finally {
                outs.close();
                fin.close();
            }
        }
    }
}