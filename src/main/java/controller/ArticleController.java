package controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class ArticleController {
	
		public String list(HttpServletRequest request, HttpServletResponse response) throws IOException {
			
			
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
