package service;

import java.util.List;

import container.Container;
import dao.ArticleDao;
import dto.Article;

public class ArticleService {
	
	private ArticleDao articleDao;
	
	public ArticleService() {
		articleDao = Container.articleDao;
	}
	
	public List<Article> getArticles(){
		return articleDao.getArticles();
	}

		
}
