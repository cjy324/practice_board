package mssqlutil;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import dto.Article;
import dto.GenFile;
import dto.GenSet;

public class MsSqlUtil {
	
	private Connection con;
	private Statement stmt;
	private ResultSet rs;
	
    public static void main(String[] args) throws ClassNotFoundException {
        Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");  
    }
    
    /* SQLserver와 연결 시작 */
    private void DBconnectionStart() throws SQLException {
    	// 참고: https://lab-502.tistory.com/4
    	String connectionUrl = "jdbc:sqlserver://127.0.0.1:1433;"  // TCP 포트
    						+ "database=TEST;"  // 연결할 DB
    						+ "integratedSecurity=true;";  // windows 인증일 경우 
		con = DriverManager.getConnection(connectionUrl);
		//System.out.println("MS-SQL 서버 접속에 성공했습니다.");
	}
    
    /* SQLserver와 연결 종료 */
    private void DBconnectionEnd() throws SQLException {
    	if(rs != null) {
    		rs.close();
    	}
        stmt.close();
        con.close();
        //System.out.println("MS-SQL 서버 연결을 종료했습니다.");
	}

    /* 게시물 리스트 가져오기 */
	public List<Article> selectArticles(String sql) throws SQLException {
		DBconnectionStart();
        
		List<Article> articles = new ArrayList<>();

        /* executeQuery vs executeUpdate*/
        // 출처: https://aricode.tistory.com/9 [아리의 코딩 모험]
        // - executeQuery(String sql): 조회문(select, show 등)을 실행할 목적으로 사용
        // - executeUpdate(String sql): create, drop, insert, delete, update 등등 문을 처리할 때 사용
		stmt = con.createStatement();
        rs = stmt.executeQuery(sql);
 
    	while (rs.next()) {
    			int id = rs.getInt("id");
    			String regDate = rs.getString("regDate");
    			String updateDate = rs.getString("updateDate");
    			String writer = rs.getString("writer");
    			String title = rs.getString("title");
    			String body = rs.getString("body");
              			
    			Article article = new Article(id, regDate, updateDate, writer, title, body);
    			articles.add(article);
    	}
    	
    	DBconnectionEnd();

		return articles;	
	}

	/* 게시물 or 첨부파일 정보 저장 */
	public int insert(String sql) throws SQLException {
		DBconnectionStart();

        /* executeQuery vs executeUpdate*/
        // 출처: https://aricode.tistory.com/9 [아리의 코딩 모험]
        // - executeQuery(String sql): 조회문(select, show 등)을 실행할 목적으로 사용
        // - executeUpdate(String sql): create, drop, insert, delete, update 등등 문을 처리할 때 사용
		stmt = con.createStatement();
		rs = stmt.executeQuery(sql);
		int id = 0;
		
		while (rs.next()) {
			id = rs.getInt("id");
		}
    	
    	DBconnectionEnd();
    	
    	return id;
	}

	/* 파일리스트 가져오기 */
	public List<GenFile> selectGenFiles(String sql) throws SQLException {
		DBconnectionStart();
        
		List<GenFile> genFiles = new ArrayList<>();

        /* executeQuery vs executeUpdate*/
        // 출처: https://aricode.tistory.com/9 [아리의 코딩 모험]
        // - executeQuery(String sql): 조회문(select, show 등)을 실행할 목적으로 사용
        // - executeUpdate(String sql): create, drop, insert, delete, update 등등 문을 처리할 때 사용
		stmt = con.createStatement();
        rs = stmt.executeQuery(sql);
 
    	while (rs.next()) {
    			int id = rs.getInt("id");
    			String regDate = rs.getString("regDate");
    			String updateDate = rs.getString("updateDate");
    			String uploaded = rs.getString("uploaded");
    			int relId = rs.getInt("relId");
    			String name = rs.getString("name");
    			long size = rs.getLong("size");
    			String path = rs.getString("path");
    			String type = rs.getString("type");
              			
    			GenFile genFile = new GenFile(id, regDate, updateDate, uploaded, relId, name, size, path, type);
    			genFiles.add(genFile);
    	}
    	
    	DBconnectionEnd();

		return genFiles;
	}

	/* 게시물 정보 or 환경설정값 수정 */
	public void update(String sql) throws SQLException {
		DBconnectionStart();

        /* executeQuery vs executeUpdate*/
        // 출처: https://aricode.tistory.com/9 [아리의 코딩 모험]
        // - executeQuery(String sql): 조회문(select, show 등)을 실행할 목적으로 사용
        // - executeUpdate(String sql): create, drop, insert, delete, update 등등 문을 처리할 때 사용
		stmt = con.createStatement();
		stmt.executeUpdate(sql);
    	
    	DBconnectionEnd();
	}

	/* 첨부파일 정보 삭제 */
	public void delete(String sql) throws SQLException {
		DBconnectionStart();

        /* executeQuery vs executeUpdate*/
        // 출처: https://aricode.tistory.com/9 [아리의 코딩 모험]
        // - executeQuery(String sql): 조회문(select, show 등)을 실행할 목적으로 사용
        // - executeUpdate(String sql): create, drop, insert, delete, update 등등 문을 처리할 때 사용
		stmt = con.createStatement();
		stmt.executeUpdate(sql);
    	
    	DBconnectionEnd();
	}
	
	/* 환경설정값 조회 */
	public GenSet selectGenSet(String sql) throws SQLException {
		DBconnectionStart();
        
		GenSet genSet = new GenSet();

        /* executeQuery vs executeUpdate*/
        // 출처: https://aricode.tistory.com/9 [아리의 코딩 모험]
        // - executeQuery(String sql): 조회문(select, show 등)을 실행할 목적으로 사용
        // - executeUpdate(String sql): create, drop, insert, delete, update 등등 문을 처리할 때 사용
		stmt = con.createStatement();
        rs = stmt.executeQuery(sql);
 
    	while (rs.next()) {
    			int editorNum = rs.getInt("editorNum");
    			int uploaderNum = rs.getInt("uploaderNum");
    			int downloaderNum = rs.getInt("downloaderNum");

    			genSet = new GenSet(editorNum, uploaderNum, downloaderNum);
    	}
    	
    	DBconnectionEnd();

		return genSet;
	}

}
