package service;

import java.util.List;

import container.Container;
import dao.GenFileDao;
import dto.GenFile;

public class GenFileService {
	
	private GenFileDao genFileDao;
	
	public GenFileService() {
		genFileDao = Container.genFileDao;
	}
	
	// 파일 리스트 가져오기
	public List<GenFile> getGenFiles(){
		return genFileDao.getGenFiles();
	}

	// 첨부파일 정보 저장
	public void saveGenFileInfo(int relId, String originName, String originSizeStr, String path, String originType) {
		genFileDao.saveGenFileInfo(relId, originName, originSizeStr, path, originType);
	}

	// 게시물 ID관련 첨부파일 리스트 가져오기
	public List<GenFile> getGenFilesByRelId(int relId) {
		return genFileDao.getGenFilesByRelId(relId);
	}

		
}
