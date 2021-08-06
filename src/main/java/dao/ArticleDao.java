package dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import dto.Article;
import mssqlutil.MsSqlUtil;

public class ArticleDao {
	
	private MsSqlUtil msSqlUtil;
	private String sql;
	
	public ArticleDao() {
		msSqlUtil = new MsSqlUtil();
		sql = null;
	}

	// 게시물 리스트 가져오기
	public List<Article> getArticles() {
		
		sql = "SELECT * FROM article";
		
		List<Article> articles = new ArrayList<>();
		
		try {
			articles = msSqlUtil.select(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return articles;
	}

	// 게시물 저장하기
	public void saveContent(String title, String body) {
		
		sql = "INSERT INTO article(regDate, writer, title, body)"
			+ "VALUES(CONVERT(date,GETDATE()),'테스터1', '"
			+ title + "', '"
			+ body + "');";
		
		try {
			msSqlUtil.insert(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
			
		
	}
	

		
}
