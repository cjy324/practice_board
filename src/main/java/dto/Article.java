package dto;

public class Article {
	
	public int id;
	public String regDate;
	public String writer;
	public String title;
	public String body;
	
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

	public String getWriter() {
		return writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public Article() {

	}
	
	public Article(int id, String regDate, String writer, String title, String body) {
		this.id = id;
		this.regDate = regDate;
		this.writer = writer;
		this.title = title;
		this.body = body;
	}
}
