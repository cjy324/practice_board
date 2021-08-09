package controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import container.Container;
import dto.Article;
import service.ArticleService;
import service.GenFileService;


public class ArticleController {
	
		private ArticleService articleService;
		private GenFileService genFileService;
	
		public ArticleController() {
			articleService = Container.articleService;
			genFileService = Container.genFileService;
		}
	
		public String list(HttpServletRequest request, HttpServletResponse response) throws IOException {
			
			// list요청
			List<Article> articles = new ArrayList<>();
			articles = articleService.getArticles();

			// 
			List<Integer> genFileCounts = new ArrayList<>();
			genFileCounts = articleService.getGenFileCounts(articles);
			
			// 첨부파일 갯수 가져오기
			
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
		
		public String modify(HttpServletRequest request, HttpServletResponse response) throws IOException {
			
			
			return "usr/article/modify";
		}
		
}
