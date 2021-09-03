package container;

import controller.ArticleController;
import controller.ConfigController;
import controller.DownloadController;
import controller.EditorController;
import controller.UploadController;
import dao.ArticleDao;
import dao.ConfigDao;
import dao.GenFileDao;
import service.ArticleService;
import service.ConfigService;
import service.GenFileService;

public class Container {

	public static ConfigController configController;
	public static EditorController editorController;
	public static UploadController uploadController;
	public static DownloadController downloadController;
	public static ArticleController articleController;
	public static ArticleService articleService;
	public static ArticleDao articleDao;
	public static GenFileService genFileService;
	public static GenFileDao genFileDao;
	public static ConfigService configService;
	public static ConfigDao configDao;

	static {
		configDao = new ConfigDao();
		articleDao = new ArticleDao();
		genFileDao = new GenFileDao();
		
		configService = new ConfigService();
		articleService = new ArticleService();
		genFileService = new GenFileService();
		
		configController = new ConfigController();
		editorController = new EditorController();
		uploadController = new UploadController();
		downloadController = new DownloadController();
		articleController = new ArticleController();
	}
}

