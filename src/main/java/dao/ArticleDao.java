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
	public int saveContent(String title, String body) {
		
		// query 전송 시 작은따옴표 입력으로 인한 에러 방지
		title = title.replace("'", "''");
		body = body.replace("'", "''");
		
		sql = "INSERT INTO article(regDate, writer, title, body)"
			+ "VALUES(CONVERT(date,GETDATE()),'테스터1', '"
			+ title + "', '"
			+ body + "')"
			+ " SELECT @@IDENTITY AS id";
		
		int id = 0;
		try {
			id = msSqlUtil.insert(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
//		int id = getArticleIdByTitleAndBody(title, body);
		System.out.println("id: " + id);
		
		return id;
		
	}

	public void saveGenFileInfo(int relId, String originName, String originSizeStr, String path, String originType) {
		
		sql = "INSERT INTO genFile(uploaded, relId, name, size, path, type)"
				+ "VALUES("
				+ "'true', "
				+ relId + ", '"
				+ originName + "', '"
				+ originSizeStr + "', '"
				+ path + "', '"
				+ originType + "')"
				+ " SELECT @@IDENTITY AS id";
		
		int id = 0;
		try {
			id = msSqlUtil.insert(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
//		int id = getArticleIdByTitleAndBody(title, body);
		System.out.println("id: " + id);
	}

		
}
