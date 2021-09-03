package dao;

import java.sql.SQLException;

import dto.GenSet;
import mssqlutil.MsSqlUtil;

public class ConfigDao {
	
	private MsSqlUtil msSqlUtil;
	private String sql;
	
	public ConfigDao() {
		msSqlUtil = new MsSqlUtil();
		sql = null;
	}
	
	/* 환경설정값 가져오기 */
	public GenSet getOptions() {
		sql = "SELECT * FROM genSet";
		
		GenSet genSet = new GenSet();
		
		try {
			genSet = msSqlUtil.selectGenSet(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return genSet;
	}
	
	/* 환경설정값 저장하기 */
	public void setOptions(int editorNum, int uploaderNum, int downloaderNum) {
		// DB에 설정값 저장
		sql = "UPDATE genSet "
			+ "SET "
			+ "editorNum = " + editorNum + ", "
			+ "uploaderNum = " + uploaderNum + ", "
			+ "downloaderNum = " + downloaderNum;
		
		try {
			msSqlUtil.update(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
