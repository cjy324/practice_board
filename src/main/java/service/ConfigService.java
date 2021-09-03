package service;

import container.Container;
import dao.ConfigDao;
import dto.GenSet;

public class ConfigService {
	
	private ConfigDao configDao;
	
	public ConfigService() {
		configDao = Container.configDao;
	}
	
	/* 환경설정값 가져오기 */
	public GenSet getOptions() {
		return configDao.getOptions();
	}
	
	/* 환경설정값 저장하기 */
	public void setOptions(int editorNum, int uploaderNum, int downloaderNum) {
		configDao.setOptions(editorNum, uploaderNum, downloaderNum);
		
	}
}
