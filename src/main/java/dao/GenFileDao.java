package dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import dto.GenFile;
import mssqlutil.MsSqlUtil;

public class GenFileDao {
	
	private MsSqlUtil msSqlUtil;
	private String sql;
	
	public GenFileDao() {
		msSqlUtil = new MsSqlUtil();
		sql = null;
	}

	// 게시물 리스트 가져오기
	public List<GenFile> getGenFiles() {
		
		sql = "SELECT * FROM genFile";
		
		List<GenFile> genFiles = new ArrayList<>();
		
		try {
			genFiles = msSqlUtil.selectGenFiles(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return genFiles;
	}

	// 파일 정보 저장
	public void saveGenFileInfo(int relId, String originName, long originSize, String path, String originType) {
		
		sql = "INSERT INTO genFile(regDate, updateDate, uploaded, relId, name, size, path, type)"
				+ "VALUES(CONVERT(date,GETDATE()), CONVERT(date,GETDATE()), "
				+ "'true', "
				+ relId + ", '"
				+ originName + "', "
				+ originSize + ", '"
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
	}
	
	// 게시물 ID관련 첨부파일 리스트 가져오기
	public List<GenFile> getGenFilesByRelId(int relId) {
		sql = "SELECT * FROM genFile "
			+ "WHERE relId = " + relId;
		
		List<GenFile> genFiles = new ArrayList<>();
		
		try {
			genFiles = msSqlUtil.selectGenFiles(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return genFiles;
	}
	
	// 게시물 ID관련 첨부파일 삭제
	public void deleteFileInfo(int relId, String path) {
		sql = "DELETE genFile "
			+ "WHERE relId = " + relId
			+ " AND path = '" + path + "'";
		
		try {
			msSqlUtil.delete(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

		
}
