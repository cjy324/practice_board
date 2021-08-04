package controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import container.Container;
import dto.Article;
import service.ArticleService;


public class ArticleController {
	
		private ArticleService articleService;
	
		public ArticleController() {
			articleService = Container.articleService;
		}
	
		public String list(HttpServletRequest request, HttpServletResponse response) throws IOException {
			
			// list요청
			List<Article> articles = new ArrayList<>();
			articles = articleService.getArticles();
			
			// 클라이언트에 전달
			request.setAttribute("articles", articles);
			
			return "usr/article/list";
		}
		
		public String detail(HttpServletRequest request, HttpServletResponse response) throws IOException {
			
			
			return "usr/article/detail";
		}
		
		public String write(HttpServletRequest request, HttpServletResponse response) throws IOException {
			
			
			return "usr/article/write";
		}		
		
		public String modify(HttpServletRequest request, HttpServletResponse response) throws IOException {
			
			
			return "usr/article/modify";
		}
		
}
