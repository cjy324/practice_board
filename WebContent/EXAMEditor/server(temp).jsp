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
<%@page import="com.oreilly.servlet.MultipartRequest"%>
<%@page import="com.oreilly.servlet.multipart.DefaultFileRenamePolicy"%>

<%
//multipartRequest로 파일 생성시 용량
			int sizeLimit = 10 * 1024 * 1024; // 약 10MB
			String encType = "UTF-8";

			// 파일 실제 업로드 경로 설정
			String realPath = request.getServletContext().getRealPath("imageUpload");
			System.out.println("realPath : " + realPath); //(테스트용)
			
			File imageUploadDir = new File(realPath);
			if(!imageUploadDir.exists()){	// 만약, realPath 경로에 폴더가 없으면 폴더 생성
				imageUploadDir.mkdirs();
			};
			
			// Multipart로 요청 받기 위한 객체 생성
			MultipartRequest multiReq = new MultipartRequest(
					request, 
					realPath, // 파일을 저장할 디렉토리 지정
					sizeLimit, // 첨부파일 최대 용량 설정(bite)
					encType, // 인코딩 방식 지정
					new DefaultFileRenamePolicy() // 중복 파일 처리(동일한 파일명이 업로드되면 뒤에 숫자 등을 붙여 중복 회피)
				);

			// 각 파일별 이름 받아오기
			String fileName = multiReq.getFilesystemName("imgFiles");
			// System.out.println(fileName);
			// String originFileName = multiReq.getOriginalFileName("imgFiles");
			// System.out.println(originFileName);
			// String fileType = multiReq.getContentType("imgFiles");
			// System.out.println(fileType);
			
			String imgPath = "http://localhost:8086/practiceBoard/imageUpload/" + fileName;
			
			// 저장된 파일 이름 클라이언트로 전달
			response.getWriter().append(URLEncoder.encode(imgPath, "UTF-8"));



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