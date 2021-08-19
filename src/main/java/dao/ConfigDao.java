package dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import dto.Article;
import dto.GenFile;
import dto.GenSet;
import mssqlutil.MsSqlUtil;

public class ConfigDao {
	
	private MsSqlUtil msSqlUtil;
	private String sql;
	
	public ConfigDao() {
		msSqlUtil = new MsSqlUtil();
		sql = null;
	}

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
