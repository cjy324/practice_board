package service;

import container.Container;
import dao.ConfigDao;
import dto.GenSet;

public class ConfigService {
	
	private ConfigDao configDao;
	
	public ConfigService() {
		configDao = Container.configDao;
	}

	public GenSet getOptions() {
		return configDao.getOptions();
	}
	
	public void setOptions(int editorNum, int uploaderNum, int downloaderNum) {
		configDao.setOptions(editorNum, uploaderNum, downloaderNum);
		
	}
}
