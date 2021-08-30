package controller;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.DefaultFileRenamePolicy;


public class EditorController {
	
		boolean isDevMode; 
		
		public EditorController() {
			isDevMode = false;  // 디버깅 모드
		}
	
		// 이미지 업로드 서버
		public String server(HttpServletRequest request, HttpServletResponse response) throws IOException {
			try {
				String contextpath = request.getParameter("contextpath");				
				if(isDevMode) {		// (디버깅 모드)
					System.out.println("LOG { ------- RequestURL: " + request.getRequestURL() + " ------- }");
					System.out.println("LOG { LINE 25, INFO " + "Contextpath: " + contextpath + " }");
				}
				
				// multipartRequest로 파일 생성시 용량
				int sizeLimit = 10 * 1024 * 1024; // 약 10MB
				
				String encType = "UTF-8";

				// 파일 실제 업로드 경로 설정
				String realPath = request.getServletContext().getRealPath("imageUpload");
				if(isDevMode) {		// (디버깅 모드)
					System.out.println("LOG { LINE 35, INFO " + "RealPath : " + realPath + " }");
				}
				
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
				
				// 이미지 경로
				String imgUploadPath = contextpath + "/imageUpload/" + fileName;
				if(isDevMode) {		// (디버깅 모드)
					System.out.println("LOG { LINE 57, INFO " + "ImgUploadPath: " + imgUploadPath + " }");
				}
				
				// 이미지 경로 클라이언트로 전달
				response.getWriter().append(imgUploadPath);
			}catch (Exception e) {
				// 에러 메시지 클라이언트로 전달
				response.getWriter().append(e.toString());
			}
			

			return "notJspPath";
		}

}

