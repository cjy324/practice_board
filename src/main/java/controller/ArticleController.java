package controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import container.Container;
import dto.Article;
import dto.GenSet;
import service.ArticleService;
import service.ConfigService;
import service.GenFileService;


public class ArticleController {
	
		private ConfigService configService;
		private ArticleService articleService;
		private GenFileService genFileService;
	
		public ArticleController() {
			configService = Container.configService;
			articleService = Container.articleService;
			genFileService = Container.genFileService;
		}
	
		public String list(HttpServletRequest request, HttpServletResponse response) throws IOException {
			
			// list요청
			List<Article> articles = new ArrayList<>();
			articles = articleService.getArticles();

			// 첨부파일 갯수 가져오기
			List<Integer> genFileCounts = new ArrayList<>();
			genFileCounts = genFileService.getGenFileCounts(articles);
			
			// 클라이언트에 전달
			request.setAttribute("articles", articles);
			request.setAttribute("genFileCounts", genFileCounts);
			
			return "usr/article/list";
		}
		
		public String detail(HttpServletRequest request, HttpServletResponse response) throws IOException {
			int id = Integer.parseInt(request.getParameter("id"));
			
			// article 요청
			Article article = new Article();
			article = articleService.getArticleById(id);
			
			// 클라이언트에 전달
			request.setAttribute("article", article);
			
			return "usr/article/detail";
		}
		
		public String write(HttpServletRequest request, HttpServletResponse response) throws IOException {
			return "usr/article/write";
		}
		
		public String saveContent(HttpServletRequest request, HttpServletResponse response) throws IOException {
			
			//JSON Parsing
			StringBuffer data = new StringBuffer();
			String line = null;
			
			try {
				// BufferedReader로 request읽기
				BufferedReader reader = request.getReader();
				
				while ((line = reader.readLine()) != null) {
					data.append(line);
				};
				
				// JSONParser객체 생성
				JSONParser parser = new JSONParser();
				// JSONParser로 파싱 후
				// JSONObject에 JSON형태로 담기
				JSONObject textContent = (JSONObject) parser.parse(data.toString());
				
				// String 형태로 옮겨 담기
				String title = textContent.get("title").toString();
				String body = textContent.get("body").toString();
				
				// DB에 저장 후 id값 가져오기
				int id = articleService.saveContent(title, body);
				
				// id값 클라이언트로 리턴
				response.getWriter().append(String.valueOf(id));
				
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			return "notJspPath";
		}
		
		public String mappingFiles(HttpServletRequest request, HttpServletResponse response) throws IOException {
	
			int relId = Integer.parseInt(request.getParameter("relId"));
			
			//JSON Parsing
			StringBuffer data = new StringBuffer();
			String line = null;
			
			try {
				// BufferedReader로 request읽기
				BufferedReader reader = request.getReader();
				
				while ((line = reader.readLine()) != null) {
					data.append(line);
				};
				
				// JSONParser객체 생성
				JSONParser parser = new JSONParser();
				// JSONParser로 파싱 후
				// JSONObject에 JSON형태로 담기
				JSONArray files = (JSONArray) parser.parse(data.toString());
				JSONObject json = new JSONObject();
				
				// 업로더 제품 확인
				GenSet genSet = configService.getOptions();
				
				if(genSet.getUploaderNum() == 1) {  // EXAM 에디터
					for(int i = 0; i < files.size(); i++) {
						json = (JSONObject) files.get(i);
						
						String originName = json.get("name").toString();
						long originSize = Long.parseLong(json.get("size").toString());
						String path = json.get("path").toString();
						String originType = json.get("type").toString();
						
						// DB에 파일 정보 저장
						genFileService.saveGenFileInfo(relId, originName, originSize, path, originType);
					}
				}else if(genSet.getUploaderNum() == 2) {  // K 에디터
					for(int i = 0; i < files.size(); i++) {
						json = (JSONObject) files.get(i);
						
						String originName = json.get("originalName").toString();
						long originSize = Long.parseLong(json.get("size").toString());
						String path = "D:\\eclipse-workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\Practice_board" + json.get("uploadPath").toString();
						String originType = json.get("mimeType").toString();
						
						// DB에 파일 정보 저장
						genFileService.saveGenFileInfo(relId, originName, originSize, path, originType);
					}
				}

				
				
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			// 클라이언트로 완료 메시지 전달
			response.getWriter().append("DONE");

			return "notJspPath";
		}
		
		public String modify(HttpServletRequest request, HttpServletResponse response) throws IOException {
			int id = Integer.parseInt(request.getParameter("id"));
			
			// article 요청
			Article article = new Article();
			article = articleService.getArticleById(id);
			
			// 클라이언트에 전달
			request.setAttribute("article", article);
			
			return "usr/article/modify";
		}
		
		public String getBody(HttpServletRequest request, HttpServletResponse response) throws IOException {
			int id = Integer.parseInt(request.getParameter("id"));
			
			// article 요청
			Article article = new Article();
			article = articleService.getArticleById(id);
			
			// 클라이언트에 전달
			response.getWriter().print(article.getBody());
			
			return "notJspPath";
		}
		
		public String modifyContent(HttpServletRequest request, HttpServletResponse response) throws IOException {
			
			int id = Integer.parseInt(request.getParameter("id"));
			
			//JSON Parsing
			StringBuffer data = new StringBuffer();
			String line = null;
			
			try {
				// BufferedReader로 request읽기
				BufferedReader reader = request.getReader();
				
				while ((line = reader.readLine()) != null) {
					data.append(line);
				};
				
				// JSONParser객체 생성
				JSONParser parser = new JSONParser();
				// JSONParser로 파싱 후
				// JSONObject에 JSON형태로 담기
				JSONObject textContent = (JSONObject) parser.parse(data.toString());
				
				// String 형태로 옮겨 담기
				String title = textContent.get("title").toString();
				String body = textContent.get("body").toString();
				
				// DB에 저장 후 id값 가져오기
				articleService.modifyContent(id, title, body);
				
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			return "notJspPath";
		}

		// 관련 첨부파일 정보 DB상에서 삭제
		public String dlelateAttFiles(HttpServletRequest request, HttpServletResponse response) throws IOException {
			int relId = Integer.parseInt(request.getParameter("relId"));
			

			//JSON Parsing
			StringBuffer data = new StringBuffer();
			String line = null;
			
			try {
				// BufferedReader로 request읽기
				BufferedReader reader = request.getReader();
				
				while ((line = reader.readLine()) != null) {
					data.append(line);
				};
				
				// JSONParser객체 생성
				JSONParser parser = new JSONParser();
				// JSONParser로 파싱 후
				// JSONObject에 JSON형태로 담기
				JSONArray files = (JSONArray) parser.parse(data.toString());
				JSONObject json = new JSONObject();

				// 업로더 제품 확인
				GenSet genSet = configService.getOptions();
				if(genSet.getUploaderNum() == 1) {  // EXAM 에디터
					for(int i = 0; i < files.size(); i++) {
						json = (JSONObject) files.get(i);
						
						String path = json.get("path").toString();
						
						// DB에서 관련 정보 삭제
						genFileService.deleteFileInfo(relId, path);
					}
				}else if(genSet.getUploaderNum() == 2) {  // K 에디터
					for(int i = 0; i < files.size(); i++) {
						json = (JSONObject) files.get(i);
						
						String path = json.get("uploadPath").toString();
						// 실제 파일 삭제
						File delFile = new File(path);
						if(delFile.exists()) {
							delFile.delete();
						}
						
						// DB에서 관련 정보 삭제
						genFileService.deleteFileInfo(relId, path);
					}
				}

				
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			// 클라이언트로 완료 메시지 전달
			response.getWriter().append("DONE");

			return "notJspPath";
		}
		
}
