package mssqlutil;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import dto.Article;

public class MsSqlUtil {
	
	private Connection con;
	private Statement stmt;
	private ResultSet rs;
	
    public static void main(String[] args) throws ClassNotFoundException {
        Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");  
              
    }
    
    public void DBconnectionStart() throws SQLException {
    	String connectionUrl = "jdbc:sqlserver://127.0.0.1:1433;"
    						+ "database=TEST;"
    						+ "integratedSecurity=true;";
		con = DriverManager.getConnection(connectionUrl);
		System.out.println("MS-SQL 서버 접속에 성공했습니다.");
	}
    
    private void DBconnectionEnd() throws SQLException {
    	rs.close();
        stmt.close();
        con.close();
        System.out.println("MS-SQL 서버 연결을 종료했습니다.");
	}

	public List<Article> select(String sql) throws SQLException {
		DBconnectionStart();
        // https://lab-502.tistory.com/4
		List<Article> articles = new ArrayList<>();
		
		stmt = con.createStatement();
        
        
        /* executeQuery vs executeUpdate*/
        // 출처: https://aricode.tistory.com/9 [아리의 코딩 모험]
        // - executeQuery(String sql): 조회문(select, show 등)을 실행할 목적으로 사용
        // - executeUpdate(String sql): create, drop, insert, delete, update 등등 문을 처리할 때 사용

        rs = stmt.executeQuery(sql);
 
    	while (rs.next()) {
    			int id = rs.getInt("id");
    			String regDate = rs.getString("regDate");
    			String writer = rs.getString("writer");
    			String title = rs.getString("title");
    			String body = rs.getString("body");
              			
    			Article article = new Article(id, regDate, writer, title, body);
    			articles.add(article);
    	}
    	DBconnectionEnd();

		return articles;	
	}
}
