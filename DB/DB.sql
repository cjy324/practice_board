DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS genFile;

CREATE TABLE article (
	id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
	regDate CHAR(50) NOT NULL,
	updateDate CHAR(50) NOT NULL,
	writer VARCHAR(MAX) NOT NULL,
	title VARCHAR(MAX) NOT NULL,
	body TEXT NOT NULL

);

INSERT INTO article(regDate, updateDate, writer, title, body) 
VALUES('2021-08-03', '2021-08-03', '테스터1', '테스트 제목1', '테스트 내용1입니다.');

INSERT INTO article(regDate, updateDate, writer, title, body) 
VALUES('2021-08-03', '2021-08-03', '테스터2', '테스트 제목2', '테스트 내용2입니다.');

INSERT INTO article(regDate, updateDate, writer, title, body) 
VALUES('2021-08-03', '2021-08-03', '테스터3', '테스트 제목3', '테스트 내용3입니다.');

CREATE TABLE genFile (
	id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
	regDate CHAR(50) NOT NULL,
	updateDate CHAR(50) NOT NULL,
	uploaded CHAR(30) NOT NULL,
	relId INT NOT NULL,
	name VARCHAR(MAX) NOT NULL,
	size VARCHAR(MAX) NOT NULL,
	path VARCHAR(MAX) NOT NULL,
	type VARCHAR(MAX) NOT NULL
);


SELECT * FROM article;
SELECT * FROM genFile;