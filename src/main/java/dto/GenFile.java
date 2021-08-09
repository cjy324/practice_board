package dto;

public class GenFile {
	
	public int id;
	public String regDate;
	public String updateDate;
	public String uploaded;
	public int relId;
	public String name;
	public String size;
	public String path;
	public String type;
	

	public GenFile() {

	}
	
	public GenFile(int id, String regDate, String updateDate, String uploaded, int relId, String name, String size, String path, String type) {
		this.id = id;
		this.regDate = regDate;
		this.updateDate = updateDate;
		this.uploaded = uploaded;
		this.relId = relId;
		this.name = name;
		this.size = size;
		this.path = path;
		this.type = type;

	}
}

