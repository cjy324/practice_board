package mssqlutil;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class MsSqlUtil2 {
	
	public static void main(String[] args) throws ClassNotFoundException, SQLException {
        Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        DBconnectionStart();
    }
	
	public static void DBconnectionStart() throws SQLException {
		// https://lab-502.tistory.com/4
        String connectionUrl =
                "jdbc:sqlserver://127.0.0.1:1433;"
                        + "database=TEST;"
                		+ "integratedSecurity=true;";

        try (Connection con = DriverManager.getConnection(connectionUrl);) {
            // Code here.
        	Statement stmt = con.createStatement();
              System.out.println("MS-SQL 서버 접속에 성공했습니다.");
              
              test(stmt);
   
            
            stmt.close();
            con.close();
        }
        // Handle any errors that may have occurred.
        catch (SQLException e) {
            e.printStackTrace();
        }
	}

	public static void test(Statement stmt) throws SQLException {
		
		ResultSet rs = stmt.executeQuery("SELECT * FROM article");
		while (rs.next()) {
            int id = rs.getInt("id");
            String title = rs.getString("title");

            System.out.println("id : " + id + ", title : " + title);                  
        } 
		
		rs.close();
		
	}

}