<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"
%><%@ page import="java.io.*"
%><%@ page import="com.fasoo.fcwpkg.packager.*"  
%><%@ page import="com.ibleaders.ibsheet7.ibsheet.excel.LoadExcel" 
%><%@ page import="com.ibleaders.ibsheet7.util.LoadExcelCallbackInterface" 
%><%@ page import="com.ibleaders.ibsheet7.util.Synchronizer" 
%><%@ page import="com.ibleaders.ibsheet7.util.IBPacketParser"%><%

    out.clear();
    out = pageContext.pushBody();

    LoadExcel ibExcel = new LoadExcel();
    ibExcel.setService(request, response);

    //System.out.println(com.ibleaders.ibsheet7.util.Version.getVersion());

    //====================================================================================================
    // [ 사용자 환경 설정 #1 ]
    //====================================================================================================
    // Html 페이지의 인코딩이 UTF-8 로 구성되어 있으면 "ibExcel.setPageEncoding("UTF-8")" 로 설정하십시오.
    // 한글 헤더가 있는 그리드에서 엑셀 로딩이 동작하지 않으면 이 값을 바꿔 보십시오.
    // Down2Excel.jsp 에서의 설정값과 동일하게 바꿔주십시오.
    //====================================================================================================
    ibExcel.setPageEncoding("UTF-8");

    //====================================================================================================
    // [ 사용자 환경 설정 #2 ]
    //====================================================================================================
    // LoadExcel 용도의 엑셀파일을 업로드하여 임시보관할 임시폴더경로를 지정해 주십시오.
    // 예 : "C:/tmp/"   "/usr/tmp/"
    //====================================================================================================
    String tmpDownBasePath = "/weblogic/bi/apps/kpi/kpi/log/"; //server dev live
    String tmpDownPath = tmpDownBasePath + "excelTmp/"; //server dev live
    File createDir;
    
    if(tmpDownPath.indexOf("C:") < 0) {
		createDir = new File(tmpDownBasePath);
		
		//System.out.println("exists " + tmpDownBasePath + " Dir : " + createDir.exists());
		
		if(!createDir.exists()) { 
        	createDir.mkdirs();
        	//System.out.println("create Dir : " + tmpDownBasePath);
        }
		
		createDir =new  File(tmpDownPath); 
		//System.out.println("createDir : " + createDir);
		//System.out.println("createDir exists : " + createDir.exists());
		
		//System.out.println("exists " + tmpDownPath + " Dir : " + createDir.exists());
		
        if(!createDir.exists()) { 
        	createDir.mkdirs();
        	//System.out.println("create Dir : " + tmpDownPath);
        }
    }
    
    
    //tmpDownPath = "C:\\suhyup_n\\workspace\\tpa\\src\\main\\webapp\\log\\excelTmp\\";
    ibExcel.setTempFolder(tmpDownPath);

    //====================================================================================================
    // [ 사용자 환경 설정 #3 ]
    //====================================================================================================
    // LoadExcel 처리를 허용할 최대 행 수를 설정한다.
    // 엑셀 데이터가 지정한 행 수보다 많은 경우 메시지를 출력하고 처리가 종료된다.
    //====================================================================================================
    // ibExcel.setMaxRows(100);

    //====================================================================================================
    // [ 사용자 환경 설정 #4 ]
    //====================================================================================================
    // HeaderMatch 사용 시 시트에 있는 헤더가 엑셀에 하나라도 존재하지 않는 경우 오류메시지를 출력하고 데이터를 로딩하지 않을지 여부.
    //====================================================================================================
    // ibExcel.setStrictHeaderMatch(true);

    //====================================================================================================
    // [ 사용자 환경 설정 #5 ]
    //====================================================================================================
    // LoadExcel 처리를 허용할 최대 열 수를 설정한다.
    // 엑셀 데이터가 지정한 열 수보다 많은 경우 메시지를 출력하고 처리가 종료된다.
    //====================================================================================================
    //ibExcel.setMaxColumns(3);

    //====================================================================================================
    // [ 사용자 환경 설정 #6 ]
    //====================================================================================================
    // 엑셀 전문의 MarkupTag Delimiter 사용자 정의 시 설정하세요.
    // 설정 값은 IBSheet7 환경설정(ibsheet.cfg)의 MarkupTagDelimiter 설정 값과 동일해야 합니다. 
    //====================================================================================================
    //IBPacketParser.setMarkupTagDelimiter("[s1]","[s2]","[s3]","[s4]");

    //====================================================================================================
    // [ 사용자 환경 설정 #7 ]
    //====================================================================================================
    // 시트에 포함될 문자열 중 STX(\u0002), ETX(\u0003) 이 포함된 경우에만 설정해주세요.
    // 설정을 원하지 않는 경우 주석처리해주세요.
    // 0 : 시트 구분자로 STX, ETX 문자를 사용합니다. (기본값)
    // 1 : 시트 구분자로 변형된 문자열을 사용합니다. (시트에 설정이 되어 있어야 합니다.)
    //====================================================================================================
    //IBPacketParser.setDelimMode(0);
	
	//====================================================================================================
	// [ 사용자 환경 설정 #8 ]
	//====================================================================================================
	// 엑셀의 비어있는 행도 로드하도록 설정합니다.
	// false로 설정하는 경우 비어있는 행을 로드하고, true인 경우에는 비어있는 행을 건너뜁니다.
	// 시트의 LoadExcel({ SkipEmptyRow  : false }); 옵션과 동일하게 작동합니다.
	// LoadExcel에서 StartRow를 설정한 경우, 해당 행은 검사하지 않습니다.
	//====================================================================================================
	//ibExcel.setSkipEmptyRow(false);
	//====================================================================================================
	
	// [ 사용자 환경 설정 #9 ]
	//====================================================================================================
	// Load 할 파일의 확장자를 지정합니다.
	// ibExcel.setFileExt("xlsx"); 로 설정시 XLSX 파일만 로드 됩니다.
	//====================================================================================================
	//ibExcel.setFileExt("xls|xlsx");

    boolean bToken = false;
    
	try {

        // 서버에서 병행처리를 허용할 최대 동시 작업 갯수를 설정한다.
        Synchronizer.init(5);
        
        // 싱크 처리 객체로 부터 처리권한을 확인한다.
        // 인자를 true로 설정하는 경우 : 싱크 처리 객체에서 자원을 사용가능해질때까지 최대 30초 동안 기다렸다가 자원 사용이 가능해졌을때 권한을 할당 후 true를 반환한다.
        // 인자를 false로 설정하는 경우 : 자원 사용여부를 확인후 즉시 반환. 사용 가능하면 할당 후 true를 반환하고, 사용이 불가능한 경우 false를 반환한다.
        bToken = Synchronizer.use(false);
        
        // 싱크 객체로 부터 권한을 정상 할당 받은 경우에만 엑셀 작업을 진행한다.
        if (bToken) {
	    
			//엑셀파일 로드
			ibExcel.setData();
	
		    // setData(); 호출 이후 ExtendParam 사용 가능
		    //String exParam = ibExcel.getExtendParam();
	        //System.out.println("exParam [" + exParam + "]");
	        //System.out.println("exParam [" + ibExcel.getExtendParam("TestParam") + "]");
			
			// 서버에 저장된 파일명
			String uploadFileName = ibExcel.getUploadFileName();
			//System.out.println("uploadFileName : " + uploadFileName);

			// TODO
			// 업로드된 엑셀 파일을 가공함 (예, 엑셀문서를 DRM 처리함)
			String drm_fsdinit_path = "/weblogic/bi/apps/kpi/kpi/WEB-INF/classes/fsdinit";			// DRM key 폴더 경로 
			String DECFileDir = tmpDownPath + "enc/";
			String DRMFileDir = tmpDownPath;
			String domain_id = "0100000000001611";
			
			String Filename = uploadFileName.substring(uploadFileName.lastIndexOf("/") + 1);
			//System.out.println("복호화 대상파일 : " + Filename);
			
			if(tmpDownPath.indexOf("C:") < 0) {
	            
	            createDir =new  File(DECFileDir); 
				//System.out.println("createDir : " + createDir);
				//System.out.println("createDir exists : " + createDir.exists());
				
	            if(!createDir.exists()) { 
	            	createDir.mkdirs();
	            	//System.out.println("create exists : " + createDir.exists());
	            }
			}
			
			String sErrMessage = "";
			int error_num = 0;
			String error_str = "";
			int Error_Check = 0;
			String Error_Message =""; 
			
			// 사용자가 업로드한 파일명
			String uploadFileNameOrg = ibExcel.getUploadFileNameOrg();
			//System.out.println("uploadFileNameOrg : " + uploadFileNameOrg);
			
			try {
				int iBret = 0;
				WorkPackager oWorkPackager = new WorkPackager();
				
				//System.out.println("GetFileType Filename: " + DRMFileDir + Filename);
				
				iBret = oWorkPackager.GetFileType(DRMFileDir + Filename);   //파일 타입 체크
				
				boolean bRet = false;
				
				System.out.println("iBret ? " + iBret);
	
				if (iBret == 103) {        //DRM(FSN) 문서일경우 복호화
					//System.out.println("File type ? " + iBret);
					 
		 			bRet = oWorkPackager.DoExtract( drm_fsdinit_path,		//key 폴더 경로
													domain_id,				//dsdcode
													DRMFileDir+Filename,	//복호화 대상 파일 경로
													DECFileDir+Filename		//복호화 파일 저장 경로
											   		);
			
					error_num = oWorkPackager.getLastErrorNum();
					error_str = oWorkPackager.getLastErrorStr();
			 	  
					if (error_num!=0){
						System.out.println("error_num = ? " + error_num);
						System.out.println("error_str = ?[ " + error_str+" ]");
		
						Error_Check = 1;
						Error_Message = "DRM_PKGING_ERROR";
					}	
			 		else
					{
			 			System.out.println(" DRM  문서 복호화");
			 			//System.out.println(" DRM  File type:"+iBret);
			 			//System.out.println("DoExtract Success!!! ");
					}
							
				}else{
	 				Error_Check = 1;
					Error_Message = "NOT Support File";
					System.out.println("File type ? " + iBret);
					System.out.println("Error_Message:"+Error_Message);
	 			} 
					
			} catch( Exception e ){
				System.out.println("Error_Check num = :"+error_num);
				System.out.println("error_str = :"+error_str);
				System.out.println("Error_Message = :"+Error_Message);
			}finally{
				//System.out.println("finally");
				
				//System.out.println("복호화 대상파일 : " + DRMFileDir + Filename);
				//System.out.println("복호화 파일 : " + DECFileDir + Filename);
				
				File fileEnc = new File(DRMFileDir + Filename);
				File fileDec = new File(DECFileDir + Filename);
				
				//fileEnc.delete();
				
				FileInputStream input = new FileInputStream(fileDec);
				FileOutputStream output = new FileOutputStream(fileEnc);
				
				byte[] buf = new byte[1024];
				
				int readData;
				while ((readData = input.read(buf)) > 0) {
					output.write(buf, 0, readData);
				}
			    
				input.close();
				output.close();
				
				fileDec.delete();
			}

			

			//IBSheet에 전달할 Json 데이터 출력
			ibExcel.writeToBrowser();
			
            // 엑셀 업로드 완료 후 싱크 객체로 할당받은 권한을 반환한다.
            Synchronizer.release();
            bToken = false;
        } else {
            //LoadExcelError({Code:-4,Msg:'엑셀 다운로드중 에러...'}와 같이, 
            //사용자 정의 에러코드 & 메시지를 정의하면, 
            //Client OnLoadExcel 이벤트 통해서 확인 가능
            //out.println("<script>var targetWnd = null; if(opener!=null) {targetWnd = opener;} else {targetWnd = parent;} targetWnd.Grids[0].LoadExcelError({Code:-4,Msg:'엑셀 다운로드중 에러가 발생하였습니다.[Server Busy]'}); </script>");
            OutputStream out2 = response.getOutputStream();
            out2.write(("<script>var targetWnd = null; if(opener!=null) {targetWnd = opener;} else {targetWnd = parent;} targetWnd.Grids[0].LoadExcelError({Code:-4,Msg:'엑셀 다운로드중 에러가 발생하였습니다.[Server Busy]'}); </script>").getBytes("UTF-8"));
            out2.flush();
        }
        
    } catch(Exception e) {
        //out.println("<script>var targetWnd = null; if(opener!=null) {targetWnd = opener;} else {targetWnd = parent;} targetWnd.Grids[0].LoadExcelError(); </script>");

        e.printStackTrace();

         //out.print()out.println() 방식으로 메시지가 정상적으로 출력되지 않는다면 다음과 같은 방식을 사용한다.
        OutputStream out2 = response.getOutputStream();
        out2.write(("<script>var targetWnd = null; if(opener!=null) {targetWnd = opener;} else {targetWnd = parent;} targetWnd.Grids[0].LoadExcelError(); </script>").getBytes());
        out2.flush();
        

    } catch (Error e) {
        //out.println("<script>try{var targetWnd = null; if(opener!=null) {targetWnd = opener;} else {targetWnd = parent;} targetWnd.Grids[0].LoadExcelError(); }catch(e){}</script>");
        OutputStream out2 = response.getOutputStream();
        out2.write(("<script>var targetWnd = null; if(opener!=null) {targetWnd = opener;} else {targetWnd = parent;} targetWnd.Grids[0].LoadExcelError(); </script>").getBytes());
        out2.flush();

        e.printStackTrace();
    } finally {
        //공유자원 반환이 되지 않은 상태라면, 반환 처리한다.
        if (bToken) {
            Synchronizer.release();
            bToken = false;
        }
        
        //Exception 발생 시, response 헤더 별도 설정하도록 한다. 
        response.setContentType("text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
    }
%>
