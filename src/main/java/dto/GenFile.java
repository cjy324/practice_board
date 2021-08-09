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

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getRegDate() {
		return regDate;
	}

	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	public String getUploaded() {
		return uploaded;
	}

	public void setUploaded(String uploaded) {
		this.uploaded = uploaded;
	}

	public int getRelId() {
		return relId;
	}

	public void setRelId(int relId) {
		this.relId = relId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

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

