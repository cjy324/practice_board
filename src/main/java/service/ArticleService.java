package service;

import java.util.ArrayList;
import java.util.List;

import container.Container;
import dao.ArticleDao;
import dao.GenFileDao;
import dto.Article;
import dto.GenFile;

public class ArticleService {
	
	private ArticleDao articleDao;
	private GenFileDao genFileDao; 

	
	public ArticleService() {
		articleDao = Container.articleDao;
		genFileDao = Container.genFileDao;
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
	
	// 첨부파일 수 리스트 가져오기
	public List<Integer> getGenFileCounts(List<Article> articles) {
		
		List<Integer> genFileCounts = new ArrayList<>();
		
		for(Article article : articles) {
			int count = 0;
			List<GenFile> genFiles = genFileDao.getGenFilesByRelId(article.getId());
			
			if(genFiles == null) {
				count = 0;
			}else {
				count = genFiles.size();
			}
			
			genFileCounts.add(count);
		}
		
		return genFileCounts;
	}
		
}
