<%@page import="com.ibleaders.ibsheet7.util.Version"%><%@
page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%><%@
page import="java.io.*" %><%@
page import="org.apache.poi.ss.usermodel.Workbook" %><%@
page import="com.ibleaders.ibsheet7.ibsheet.excel.Down2Excel" %><%@
page import="com.ibleaders.ibsheet7.util.Synchronizer" %><%@
page import="com.ibleaders.ibsheet7.util.IBPacketParser" %><%@
page import="com.ibleaders.ibsheet7.ibsheet.excel.ExcelPrintSetup"%>
<% 
	//====================================================================================================
	// [ 사용자 환경 설정 #0-1 ]
	//====================================================================================================
	// 대용량 엑셀파일 다운로드를 하는 경우 메모리가 부족한 상황이 생긴다면 
	// Down2Excel ibExcel = new Down2Excel(true); //형식으로 사용해 주세요.
	// 메모리 대신 파일버퍼를 사용해 엑셀파일을 생성합니다.
	// 이 모드에서는 reportXML 사용이 제한됩니다.
	// 메모리 부족 사유가 없다면 옵션을 주지 않는 것이 좋습니다.
	// 이 때 파일 확장자는 반드시 XLSX를 사용해야 합니다.
	//====================================================================================================
    Down2Excel ibExcel = new Down2Excel();
	
	//System.out.println(Version.getVersion());
	//====================================================================================================
	// [ 사용자 환경 설정 #0-2 ]
	//====================================================================================================
	// 대용량 엑셀파일 다운로드를 하는 경우 파일 버퍼의 사이즈를 설정합니다.
	// 100~5000 사이의 값을 사용할 수 있습니다.
	// 값이 작으면 파일 버퍼를 많이 사용하고 값이 크면 메모리를 더 사용하지만 파일 IO가 적습니다.
	// 기본값은 100입니다.
	//====================================================================================================
	// ibExcel.setBufferSize(1000);
	
	ibExcel.setService(request, response);
	//System.out.println(com.ibleaders.ibsheet7.util.Version.getVersion());

	//====================================================================================================
	// [ 사용자 환경 설정 #1 ]
	//====================================================================================================
	// Html 페이지의 인코딩이 UTF-8 로 구성되어 있으면 "ibExcel.setPageEncoding("UTF-8");" 로 설정하십시오.
	// 엑셀 문서의 한글이 깨지면 이 값을 공백("")으로 바꿔 보십시오. (설정하지 않거나 공백으로 설정 시 EUC-KR로 처리됩니다.)
	// LoadExcel.jsp 도 동일한 값으로 바꿔 주십시오.
	//====================================================================================================
	ibExcel.setPageEncoding("UTF-8");


	//====================================================================================================
	// [ 사용자 환경 설정 #2 ]
	//====================================================================================================
	// 엑셀에 포함될 이미지의 URL 에 가상폴더를 사용할 경우가 조금이라도 있다면 웹루트를 아래 변수에 직접 지정해 주십시오.
	// 엑셀에 포함될 이미지에 가상폴더를 사용하지 않으면 설정하지 마세요.
	//====================================================================================================
	//String webRootPath = "c:/temp";
	String webRootPath = "/weblogic/bi/apps/kpi/kpi/"; //server dev live
	//webRootPath = "C:\\suhyup_n\\workspace\\kpi\\src\\main\\webapp\\";
	ibExcel.setWebRoot(webRootPath);

	//====================================================================================================
	// [ 사용자 환경 설정 #3 ]
	//====================================================================================================
	// 트리 컬럼에서 레벨별로 … 를 덧붙여서 레벨별로 보기 좋게 만듭니다.
	// 만약 … 대신 다른 문자를 사용하기를 원하시면 아래 유니코드 \u2026 (16진수형태) 대신 다른 문자를 입력하십시오.
	// 트리 컬럼이 없으면 설정하지 마세요.
	//====================================================================================================
	ibExcel.setTreeChar("\u2026");

	//====================================================================================================
	// [ 사용자 환경 설정 #4 ]
	//====================================================================================================
	// 기본 폰트 이름과 폰트 크기를 설정합니다.
	// SheetDesign : 0,3 을 사용하는 경우에만 적용됩니다.
	//====================================================================================================
	ibExcel.setDefaultFontName("맑은고딕");
	ibExcel.setDefaultFontSize((short)10);

	//====================================================================================================
	// [ 사용자 환경 설정 #5 ]
	//====================================================================================================
	// IBSheet의 폰트 이름, 폰트 크기를 사용하지 않고 다음에서 설정한 값으로 강제적으로 적용합니다.
	// SheetDesign : 1, 2 를 사용하는 경우에만 적용됩니다.
	// 사용하지 않으시려면 주석처리 하세요.
	// 
	//ibExcel.setFontName("궁서");
	//ibExcel.setFontSize((short)15);

	//====================================================================================================
	// [ 사용자 환경 설정 #6 ]
	//====================================================================================================
	// 줄바꿈 설정을 다음에서 설정한 값으로 강제적으로 적용합니다.
	// 사용하지 않으시려면 주석처리 하세요.
	// 
	//ibExcel.setWordWrap(false);

	//====================================================================================================
	// [ 사용자 환경 설정 #7 ]
	//====================================================================================================
	// 엑셀에 포함될 이미지의 URL 이 다른 도메인에 있고 함께 다운로드 받으려면 다음을 설정합니다.
	// 기본값은 false 이며 다른 도메인에 존재하는 이미지는 다운로드 받지 않습니다.
	//ibExcel.setAllowDownloadRemoteImg(true);

	//====================================================================================================
	// [ 사용자 환경 설정 #8 ]
	//====================================================================================================
	// 엑셀에 포함될 이미지의 URL 이 같은 도메인에 있지만 "/image/imgDown.jsp?idx=365" 등과 같은 
	// 이미지 로딩 방식을 사용한다면 웹서버 도메인을 설정하세요.
	//ibExcel.setWebServerDomain("http://www.ibleaders.co.kr");
	
	//====================================================================================================
	// [ 사용자 환경 설정 #9 ]
	//====================================================================================================
	// 엑셀 다운로드 시 서버에 위치한 디자인 파일을 사용하는 경우 디자인 파일이 있는 폴더 위치를 설정하세요.
	// 디자인 파일을 사용하지 않는 경우 주석처리하세요.
	//====================================================================================================
	//String tempRoot = "D:/SVN/src/IBSheet7.TestPage";
	//ibExcel.setTempRoot(tempRoot);
	
	//====================================================================================================
	// [ 사용자 환경 설정 #10 ]
	//====================================================================================================
	// 엑셀 다운로드 시 헤더행의 글자색을 적용하고 싶은 경우에 설정하세요.
	// #3366FF 형태의 웹 컬러로 설정해주세요.
	// 설정을 원하지 않는 경우 주석처리해주세요.
	//====================================================================================================
	//ibExcel.setHeaderFontColor("#FF2233");

	//====================================================================================================
	// [ 사용자 환경 설정 #11 ]
	//====================================================================================================
	// 엑셀 다운로드 시 헤더행의 배경색을 적용하고 싶은 경우에 설정하세요.
	// #3366FF 형태의 웹 컬러로 설정해주세요.
	// 설정을 원하지 않는 경우 주석처리해주세요.
	//====================================================================================================
	//ibExcel.setHeaderBackColor("#4466aa");

	//====================================================================================================
	// [ 사용자 환경 설정 #12 ]
	//====================================================================================================
	// 엑셀 전문의 MarkupTag Delimiter 사용자 정의 시 설정하세요.
	// 설정 값은 IBSheet7 환경설정(ibsheet.cfg)의 MarkupTagDelimiter 설정 값과 동일해야 합니다. 
	//====================================================================================================
	//IBPacketParser.setMarkupTagDelimiter("[s1]","[s2]","[s3]","[s4]");

	//====================================================================================================
	// [ 사용자 환경 설정 #13 ]
	//====================================================================================================
	// 엑셀 다운로드 시 헤더행의 폰트 Bold 스타일을 적용하고 싶은 경우에 설정하세요.
	// 설정을 원하지 않는 경우 주석처리해주세요.
	//====================================================================================================
	//ibExcel.setHeaderFontBold(true);

	//====================================================================================================
	// [ 사용자 환경 설정 #14 ]
	//====================================================================================================
	// 엑셀 다운로드 시 포함된 이미지의 비율을 맞추고 싶을때 설정하세요..
	// 설정을 원하지 않는 경우 주석처리해주세요.
	// 0 : 셀의 가로/세로에 꽉 차게 이미지를 처리합니다. (기본값)
	// 1 : 셀의 중앙에 이미지를 원본 크기로 표시합니다. (xls 형식에서는 적용되지 않습니다.)
	// 2 : 이미지의 원본 가로/세로 비율을 유지하면서 셀에 맞춥니다.
	// 정상적인 이미지 처리를 위해서는 시트 옵션에서 [Merge : 2] 로 설정을 해야 합니다.
	//====================================================================================================
	//ibExcel.setImageProcessType(0);

	//====================================================================================================
	// [ 사용자 환경 설정 #15 ]
	//====================================================================================================
	// 시트에 포함될 문자열 중 STX(\u0002), ETX(\u0003) 이 포함된 경우에만 설정해주세요.
	// 설정을 원하지 않는 경우 주석처리해주세요.
	// 0 : 시트 구분자로 STX, ETX 문자를 사용합니다. (기본값)
	// 1 : 시트 구분자로 변형된 문자열을 사용합니다. (시트에 설정이 되어 있어야 합니다.)
	//====================================================================================================
	//ibExcel.setDelimMode(1);

	//====================================================================================================
	// [ 사용자 환경 설정 #16 ]
	//====================================================================================================
	// 엑셀 다운로드 시 저장되는 임시 파일을 삭제하고 싶은 경우에 설정하세요.
	// 설정을 원하지 않는 경우 주석처리해주세요.
	//====================================================================================================
	//ibExcel.setDeleteTempFile(false);

	//====================================================================================================
	// [ 사용자 환경 설정 #17 ]
	//====================================================================================================
	// 엑셀 파일의 인쇄 항목을 설정하고 싶은 경우에 설정하세요.
	// 설정을 원하지 않는 경우 주석처리해주세요.
	//====================================================================================================
	/**
	ExcelPrintSetup printSetup = new ExcelPrintSetup();
	//컬러 인쇄 여부를 설정합니다. 기본값은 true입니다. false로 설정하면 흑백인쇄 모드가 됩니다.
	printSetup.setColorPrint(true);
	//용지 사이즈를 설정합니다. 설정 가능한 용지는 Letter, Legal, A3, A4, A5, B4, B5 입니다.
	printSetup.setPageSize("A4");
	//용지 방향을 설정합니다. true는 가로, false는 세로 방향입니다.
	printSetup.setLandscape(true);
	//페이지를 나눌때 셀이 잘리지 않도록 설정합니다.
	printSetup.setAutoBreak(true);
	//용지 내에 페이지를 맞춰서 인쇄할 때 사용합니다.
	printSetup.setFitToPage(true);
	// 페이지 내에 열맞춤을 설정합니다. 이 옵션을 사용하려면 setFitToPage(true); 와 setFitHeight(false); 를 함께 설정해야 합니다.
	printSetup.setFitWidth(true);
	// 페이지 내에 행맞춤을 설정합니다. 이 옵션을 사용하려면 setFitToPage(true); 와 setFitWidth(false); 를 함께 설정해야 합니다.
	printSetup.setFitHeight(false);
	//머리글 부분의 여백을 Cm 단위로 설정합니다.
	printSetup.setHeaderMargin(0d);
	//꼬리글 부분의 여백을 Cm 단위로 설정합니다.
	printSetup.setFooterMargin(0d);
	//위쪽 여백을 Cm 단위로 설정합니다.
	printSetup.setTopMargin(0.5);
	//아래쪽 여백을 Cm 단위로 설정합니다.
	printSetup.setBottomMargin(0.5);
	//왼쪽 여백을 Cm 단위로 설정합니다.
	printSetup.setLeftMargin(0.5);
	//오른쪽 여백을 Cm 단위로 설정합니다.
	printSetup.setRightMargin(0.5);
	//엑셀 파일의 인쇄 설정을 파일에 적용합니다.
	ibExcel.setPrintSetup(printSetup);
	**/
	//====================================================================================================
	// [ 사용자 환경 설정 #18 ]
	// 다운받을 엑셀파일의 열 너비를 조절합니다. 기존 엑셀 너비값 * 인자 값 으로 설정됩니다. 
	// Type은 Double, Default : 1.0
	// ex) down.setColWidthRatio(2.0); 설정시 기존 내려받던 엑셀 파일의 너비가 30이라면 60으로 내려받습니다.
	// down.setColWidthRatio(0.8) 입력시 24로 내려받습니다.
	// 음수 및 인자 값이 없는 경우 1.0으로 처리됩니다.
	// 설정을 원하지 않는 경우 주석처리해주세요.
	//====================================================================================================
	// ibExcel.setColWidthRatio();
	boolean bToken = false;

	try {
		response.reset(); 

		// 서버에서 병행처리를 허용할 최대 동시 작업 갯수를 설정한다.
		Synchronizer.init(5);
		// 서버에 현재 ibExcel 객체의 정보를 추가한다. 해당 객체가 오류등의 이유로 강제 종료된 경우 자원을 자동으로 반환처리한다.
		Synchronizer.setProcess(ibExcel);

		// 싱크 처리 객체로 부터 처리권한을 확인한다.
		// 인자를 true로 설정하는 경우 : 싱크 처리 객체에서 자원을 사용가능해질때까지 최대 30초 동안 기다렸다가 자원 사용이 가능해졌을때 권한을 할당 후 true를 반환한다.
		// 인자를 false로 설정하는 경우 : 자원 사용여부를 확인후 즉시 반환. 사용 가능하면 할당 후 true를 반환하고, 사용이 불가능한 경우 false를 반환한다.
		bToken = Synchronizer.use(false);
		//bToken = false;

		// 싱크 객체로 부터 권한을 정상 할당 받은 경우에만 엑셀 작업을 진행한다.
		if (bToken) {

			// 파라메터 정보를 얻음
			String data = ibExcel.getData();
			
			//System.out.println("================================================");
			//System.out.println("Data : " + data);
			//System.out.println("================================================");			

			// 파라메터 정보를 다시 설정함 (예, 암호화된 파라메터를 복호화 처리를 하여 다시 설정)
			ibExcel.setData(data);

			// ExtendParam 사용 가능
			//String exParam = ibExcel.getExtendParam();

			// 엑셀 워크북을 생성
			Workbook workbook = ibExcel.makeExcel();

			//IllegalStateException 예방 코드를 response.getOutputStream(); 호출 전 시점으로 이동
			out.clear();
			out = pageContext.pushBody();
			
			// 다운로드 1. 생성된 엑셀 문서를 바로 다운로드 받음
			ServletOutputStream out2 = response.getOutputStream();
			
			//POI 3.10 엑셀 암호 기능 구현 버전 사용 시, 아래 "workbook.write(out2);"을 하단 주석처리된 코드로 대체한다.
			//System.out.println("비번 : " + ibExcel.getWorkbookPassword());
			//System.out.println("".equals(ibExcel.getWorkbookPassword()));
			//System.out.println("type : " + workbook.getClass().getName());
			
			if("".equals(ibExcel.getWorkbookPassword())) {
				workbook.write(out2);
			} else {
				
				
				//System.out.println("tmp dir :" + System.getProperty("java.io.tmpdir"));
				//System.out.println("tmp dir :" + System.getProperty("java.io.tmpdir")  + "poifiles" );
				File poiTmpDir =new  File(System.getProperty("java.io.tmpdir") + "poifiles");
				
				//System.out.println("poiTmpDir exists : " + poiTmpDir.exists());
				
				//Integer permission = 0;
				
				//permission = poiTmpDir.canExecute() ? 1 : 0;
				//permission += poiTmpDir.canWrite() ? 2 : 0;
				//permission += poiTmpDir.canRead() ? 4 : 0;
				
				//System.out.println("poiTmpDir permission : " + permission);
				
				
				String tmpDownPath = "/weblogic/bi/apps/kpi/kpi/log/excelTmp/"; //server dev live
				//String tmpDownPath = "/weblogic/bi/tpaDomain01/tmp/temp/log/excelTmp/"; //server dev live
				//tmpDownPath = "C:\\suhyup_n\\workspace\\kpi\\src\\main\\webapp\\log\\excelTmp\\";
				
				if(tmpDownPath.indexOf("C:") < 0) {
					File createDir =new  File(tmpDownPath); 
					System.out.println("createDir : " + createDir);
					System.out.println("createDir exists : " + createDir.exists());
					
		            if(!createDir.exists()) { 
		            	createDir.mkdirs();
		            	System.out.println("create exists : " + createDir.exists());
		            }
		            
		            //permission = createDir.canExecute() ? 1 : 0;
					//permission += createDir.canWrite() ? 2 : 0;
					//permission += createDir.canRead() ? 4 : 0;
					
					//System.out.println("tmpDownPath permission : " + permission);
				}
				
				//com.ibleaders.ibsheet7.ibsheet.excel.ProtectXLSX.encryptXLSX("d:/", ibExcel.getWorkbookPassword(), workbook, out2);
				com.ibleaders.ibsheet7.ibsheet.excel.ProtectXLSX.encryptXLSX(tmpDownPath, ibExcel.getWorkbookPassword(), workbook, out2);
				//workbook.write(out2);
			} 
			
			out2.flush();
			out2.close();
			
			// 다운로드 2. 생성된 엑셀 문서를 서버에 저장
			/*			
			// 다운로드 받을 파일 이름을 얻음
			String fileName = ibExcel.getDownloadFileName();
			FileOutputStream out2 = new FileOutputStream (webRootPath + "/" + fileName);
			workbook.write(out2);
			out2.close();

			// 생성된 엑셀 문서를 다운로드 받음 (예, 엑셀문서를 DRM 처리함)
			File file = new File( webRootPath + "/" + fileName ); 
			int fileLength = (int)file.length();

			response.setContentLength(fileLength);

			try {
				if (file.isFile()) {
					FileInputStream fileIn = new FileInputStream(file);
					ServletOutputStream out3 = response.getOutputStream();

					byte[] outputByte = new byte[fileLength];

					while (fileIn.read(outputByte, 0, fileLength) != -1) {
						out3.write(outputByte, 0, fileLength);
					}

					fileIn.close();
					out3.flush();;
					out3.close();
				} 
			} finally {
				file.delete();
			}
			*/
			
			//사용한 객체 종료처리
			ibExcel.close();

			// 엑셀 다운 완료 후 싱크 객체로 할당받은 권한을 반환한다.
			Synchronizer.release();
			bToken = false;
		} else {
			//response.setHeader("Content-Type", "text/html;charset=UTF-8");
			response.setContentType("text/html;charset=UTF-8");
			response.setCharacterEncoding("UTF-8");
			response.setHeader("Content-Disposition", "");

			out.println("<script>alert('엑셀 다운로드중 에러가 발생하였습니다.[Server Busy]'); </script>");
		}

	} catch (Exception e) {
		
		
		out.clear();
		
		//Exception 발생 시, response 헤더 별도 설정하도록 한다. 
		response.setContentType("text/html;charset=UTF-8");		
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Content-Disposition", "");

		/*
		out.println("<script>alert('엑셀 다운로드중 에러가 발생하였습니다.1111');</script>");
		out.flush();
		*/
		

		/* out.print()/out.println() 방식으로 메시지가 정상적으로 출력되지 않는다면 다음과 같은 방식을 사용한다. */
		OutputStream out2 = response.getOutputStream();
		out2.write(("오류 메시지").getBytes());
		out2.flush();
		/* */
		
		e.printStackTrace();
	} catch (Error e) {
		//Exception 발생 시, response 헤더 별도 설정하도록 한다. 
		response.setContentType("text/html;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Content-Disposition", "");

		out.println("<script>alert('엑셀 다운로드중 에러가 발생하였습니다.2222');</script>");
		out.flush();

		e.printStackTrace();
	} finally {
		//공유자원 반환이 되지 않은 상태라면, 반환 처리한다.
		if (bToken) {
			Synchronizer.release();
			bToken = false;
		}

		ibExcel.setDownFinish();
	}

	// 파일 정상 다운로드시 아래 구문을 실행하지 않으면 서버 Servlet에서  java.lang.IllegalStateException 이 발생한다.
	// 파일 최 하단에서 호출하도록 하면 다운로드 에러로 인한 Exception 메시지가 출력되지 않으므로 정상 다운시에만 처리하도록 한다.
	// out.flush();
	// out = pageContext.pushBody();
%>