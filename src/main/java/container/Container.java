package container;

import controller.ArticleController;
import controller.DownloadController;
import controller.HomeController;
import controller.UploadController;
import dao.ArticleDao;
import service.ArticleService;

public class Container {

	public static HomeController homeController;
	public static UploadController uploadController;
	public static DownloadController downloadController;
	public static ArticleController articleController;
	public static ArticleService articleService;
	public static ArticleDao articleDao;

	static {
		articleDao = new ArticleDao();
		
		articleService = new ArticleService();
		
		homeController = new HomeController();
		uploadController = new UploadController();
		downloadController = new DownloadController();
		articleController = new ArticleController();
	}
}

