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
			articles = msSqlUtil.selectArticles(sql);
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
		
		sql = "INSERT INTO article(regDate, updateDate, writer, title, body)"
			+ "VALUES(CONVERT(date,GETDATE()), CONVERT(date,GETDATE()), '테스터1', '"
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
		
		return id;
		
	}

	// 게시물 수정하기
	public void modifyContent(int id, String title, String body) {
		// query 전송 시 작은따옴표 입력으로 인한 에러 방지
		title = title.replace("'", "''");
		body = body.replace("'", "''");
		
		sql = "UPDATE article "
			+ "SET "
			+ "updateDate = CONVERT(date,GETDATE()), "			
			+ "title = '" + title + "', "
			+ "body = '" + body + "' "
			+ "WHERE id = " + id;
		
		try {
			msSqlUtil.update(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
		
}
