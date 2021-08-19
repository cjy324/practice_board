package container;

import controller.ArticleController;
import controller.ConfigController;
import controller.DownloadController;
import controller.HomeController;
import controller.UploadController;
import dao.ArticleDao;
import dao.GenFileDao;
import service.ArticleService;
import service.GenFileService;

public class Container {

	public static HomeController homeController;
	public static ConfigController configController;
	public static UploadController uploadController;
	public static DownloadController downloadController;
	public static ArticleController articleController;
	public static ArticleService articleService;
	public static ArticleDao articleDao;
	public static GenFileService genFileService;
	public static GenFileDao genFileDao;

	static {
		articleDao = new ArticleDao();
		genFileDao = new GenFileDao();
		
		articleService = new ArticleService();
		genFileService = new GenFileService();
		
		configController = new ConfigController();
		homeController = new HomeController();
		uploadController = new UploadController();
		downloadController = new DownloadController();
		articleController = new ArticleController();
	}
}

