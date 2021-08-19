package dto;

public class GenSet {
	
	public int editorNum;
	public int uploaderNum;
	public int downloaderNum;
	
	
	public int getEditorNum() {
		return editorNum;
	}

	public void setEditorNum(int editorNum) {
		this.editorNum = editorNum;
	}

	public int getUploaderNum() {
		return uploaderNum;
	}

	public void setUploaderNum(int uploaderNum) {
		this.uploaderNum = uploaderNum;
	}

	public int getDownloaderNum() {
		return downloaderNum;
	}

	public void setDownloaderNum(int downloaderNum) {
		this.downloaderNum = downloaderNum;
	}


	public GenSet() {

	}
	
	public GenSet(int editorNum, int uploaderNum, int downloaderNum) {
		this.editorNum = editorNum;
		this.uploaderNum = uploaderNum;
		this.downloaderNum = downloaderNum;

	}
}

