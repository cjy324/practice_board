<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="java.io.BufferedInputStream"%>
<%@page import="java.io.BufferedOutputStream"%>
<%@page import="java.io.File"%>
<%@page import="java.io.FileInputStream"%>
<%@page import="java.io.FileOutputStream"%>
<%@page import="java.io.IOException"%>
<%@page import="java.io.RandomAccessFile"%>
<%@page import="java.net.URLEncoder"%>

<%
//파일에 대한 정보를 parameter로 받기
			int index = Integer.parseInt(request.getParameter("index"));
			String guid = request.getParameter("guid");
			String originName = request.getParameter("originName");
			long originSize = Long.parseLong(request.getParameter("originSize"));
			String originPath = request.getParameter("originPath");
			String originType = request.getParameter("originType");
			
			// (테스트용)
//			System.out.println("index : " + index);
//			System.out.println("guid : " + guid);
//			System.out.println("originName : " + originName);
//			System.out.println("originSize : " + originSize);
//			System.out.println("originPath : " + originPath);
//			System.out.println("originType : " + originType);
			
			/* HTTP 헤더 셋팅 시작 */
			response.reset();
			
			// IE체크
			if(request.getHeader("User-Agent").indexOf("MSIE5.0") > -1) {
				// IE가 아닌 경우
				response.setHeader("Content-Type", "dosen/matter;");
			}else {
				// IE인 경우
				response.setHeader("Content-Type", "application/unknown");
			}
			response.setHeader("Content-Disposition",
	                "attachment; filename=\"" + URLEncoder.encode(originName, "UTF-8") + "\"");
			/* HTTP 헤더 셋팅 끝 */
			
			// 파일 임시 업로드 경로 설정
			String tempPath = request.getServletContext().getRealPath("temp");
			// System.out.println("tempPath : " + tempPath); //(테스트용)

			File tempDir = new File(tempPath);
			if(!tempDir.exists()){	// 만약, tempPath 경로에 폴더가 없으면 폴더 생성
				tempDir.mkdirs();
			};
			
			// 다운로드 상태를 임시 저장해 놓을 txt파일 생성
			String tempTxtPath = tempPath + "\\" + guid + ".txt";
			File tempTxtFile = new File(tempTxtPath);			
			tempTxtFile.createNewFile();
			FileOutputStream fos = new FileOutputStream(tempTxtFile);
			
			/* 파일 다운로드(브라우저로 전송) 시작 */
			File file = new File(originPath);
			int read = 0;
			long count = 0;
			
			byte[] bytes = new byte[1024]; //(int) originSize
			
			// BufferedInputStream 과 BufferedOutputStream은 바이트 기반의 성능 향상 보조 스트림이고,
			// BufferedReader 와 BufferedWriter는 문자 기반 성능 향상 스트림	
			BufferedInputStream bis = new BufferedInputStream(new FileInputStream(file));
			BufferedOutputStream bos = new BufferedOutputStream(response.getOutputStream());
			// 파일 읽어서 브라우저로 출력
			while((read=bis.read(bytes)) != -1) {
				bos.write(bytes, 0, read);
				count++;
				// 임시 txt파일에 현재 다운로드된 byte 크기 쓰기
				if(tempTxtFile.exists()) {
					long doneSize = count*1024;
					int x = (int) doneSize;
					int y = (int) originSize;
					int percentage = (int) Math.round((double) x/y*100);
					if(percentage > 100) { // 100보다 크면 최종값을 100으로..
						percentage = 100;
					}
					String state = percentage + "/" + 100 + "\r\n";

					fos.write(state.getBytes());
				}
			}

			// 자원 사용 종료 
			bos.flush();
			fos.close();
			bis.close();
			bos.close();
			// flush() : FileWriter 내부 버퍼의 내용을 파일에 writer합니다. 
			// flush()를 호출하지 않는다면 내용이 버퍼에만 남고 파일에는 쓰이지 않는 상황이 나올 수 있습니다.
			// close() : FileWriter는 스트림을 이용하여 파일의 내용을 읽어들입니다. 
			// 이때 close()를 호출하여 스트림을 닫으면 그 스트림을 다시 이용하여 파일에 쓰는 것이 불가능합니다.
			// 파일은 파일시스템이나 기타 다른 곳에 있으므로 이 내용을 스트림으로 읽어 들이는데 메모리를 소모합니다. 
			// 작업이 끝나면 close()를 호출하여 스트림을 닫아 종료된 작업에 대해 메모리를 확보해야 합니다.


			/* 파일 다운로드(브라우저로 전송) 끝 */



%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

</body>
</html>