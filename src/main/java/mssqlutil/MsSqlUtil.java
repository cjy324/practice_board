package mssqlutil;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class MsSqlUtil {
    public static void main(String[] args) throws ClassNotFoundException {
        Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");  
        
        // https://lab-502.tistory.com/4
        String connectionUrl =
                "jdbc:sqlserver://localhost:10161;"
                        + "database=TEST;"
                		+ "integratedSecurity=true;";
 
        try (Connection connection = DriverManager.getConnection(connectionUrl);) {
            // Code here.
              Statement stmt = connection.createStatement();
              System.out.println("MS-SQL 서버 접속에 성공했습니다.");
              ResultSet rs = stmt.executeQuery("SELECT * FROM article");
 
              while (rs.next()) {
                  int id = rs.getInt("id");
                  String title = rs.getString("title");
                  
                  System.out.println("id : " + id + ", title : " + title);                  
              }           
            rs.close();
            stmt.close();
            connection.close();
        }
        // Handle any errors that may have occurred.
        catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
