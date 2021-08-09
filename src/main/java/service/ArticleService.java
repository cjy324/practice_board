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

	public int saveContent(String title, String body) {
		return articleDao.saveContent(title, body);
		
	}

	// 첨부파일 정보 저장
	public void saveGenFileInfo(int relId, String originName, String originSizeStr, String path, String originType) {
		articleDao.saveGenFileInfo(relId, originName, originSizeStr, path, originType);
		
	}


		
}
