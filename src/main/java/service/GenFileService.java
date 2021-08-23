package service;

import java.util.ArrayList;
import java.util.List;

import container.Container;
import dao.GenFileDao;
import dto.Article;
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
	public void saveGenFileInfo(int relId, String originName, long originSize, String path, String originType) {
		genFileDao.saveGenFileInfo(relId, originName, originSize, path, originType);
	}

	// 게시물 ID관련 첨부파일 리스트 가져오기
	public List<GenFile> getGenFilesByRelId(int relId) {
		return genFileDao.getGenFilesByRelId(relId);
	}

	// 첨부파일 수 리스트 가져오기
	public List<Integer> getGenFileCounts(List<Article> articles) {
		
		List<Integer> genFileCounts = new ArrayList<>();
		
		for(Article article : articles) {
			int count = 0;
			List<GenFile> genFiles = genFileDao.getGenFilesByRelId(article.getId());
			
			if(genFiles == null) {
				count = 0;
			}else {
				count = genFiles.size();
			}
			
			genFileCounts.add(count);
		}
		
		return genFileCounts;
	}

	public void deleteFileInfo(int relId, String path) {
		genFileDao.deleteFileInfo(relId, path);
	}

		
}
