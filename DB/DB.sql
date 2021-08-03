DROP TABLE IF EXISTS article;

CREATE TABLE article (
	id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
	title CHAR(50) NOT NULL,
	body TEXT NOT NULL
);

INSERT INTO article(title, body) 
VALUES('테스트 제목1', '테스트 내용1입니다.');

INSERT INTO article(title, body) 
VALUES('테스트 제목2', '테스트 내용2입니다.');

INSERT INTO article(title, body) 
VALUES('테스트 제목3', '테스트 내용3입니다.');

CREATE TABLE genFile (
	id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
	relId INT NOT NULL,
	name CHAR(50) NOT NULL,
	size INT NOT NULL,
	path CHAR(100) NOT NULL,
	type CHAR(30) NOT NULL
);


SELECT * FROM article;
SELECT * FROM genFile;