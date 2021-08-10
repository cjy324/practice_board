package service;

import java.util.List;

import container.Container;
import dao.ArticleDao;
import dao.GenFileDao;
import dto.Article;

public class ArticleService {
	
	private ArticleDao articleDao;
	
	public ArticleService() {
		articleDao = Container.articleDao;
	}
	
	// 게시물 리스트 가져오기
	public List<Article> getArticles(){
		return articleDao.getArticles();
	}

	// 게시물 ID로 게시물 가져오기
	public Article getArticleById(int id) {
		List<Article> articles = articleDao.getArticles();
		
		Article article = new Article();
		
		for(int i = 0; i < articles.size(); i++) {
			if(articles.get(i).getId() == id) {
				article = articles.get(i);
			}
		}
		
		return article;
	}

	// 글 내용 저장
	public int saveContent(String title, String body) {
		return articleDao.saveContent(title, body);
	}

	// 게시물 수정
	public void modifyContent(int id, String title, String body) {
		articleDao.modifyContent(id, title, body);
	}
		
}
