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
	

		
}
