package container;

import controller.ArticleController;
import controller.DownloadController;
import controller.HomeController;
import controller.UploadController;

public class Container {

	public static HomeController homeController;
	public static UploadController uploadController;
	public static DownloadController downloadController;
	public static ArticleController articleController;

	static {
		homeController = new HomeController();
		uploadController = new UploadController();
		downloadController = new DownloadController();
		articleController = new ArticleController();
	}
}

