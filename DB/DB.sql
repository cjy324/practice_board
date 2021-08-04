DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS genFile;

CREATE TABLE article (
	id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
	regDate CHAR(100) NOT NULL,
	writer CHAR(50) NOT NULL,
	title CHAR(50) NOT NULL,
	body TEXT NOT NULL,

);

INSERT INTO article(regDate, writer, title, body) 
VALUES('2021-08-03','테스터1', '테스트 제목1', '테스트 내용1입니다.');

INSERT INTO article(regDate, writer, title, body) 
VALUES('2021-08-03','테스터2', '테스트 제목2', '테스트 내용2입니다.');

INSERT INTO article(regDate, writer, title, body) 
VALUES('2021-08-03','테스터3', '테스트 제목3', '테스트 내용3입니다.');

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