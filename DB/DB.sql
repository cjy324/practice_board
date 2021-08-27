DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS genFile;
DROP TABLE IF EXISTS genSet;

-- 게시물 테이블
CREATE TABLE article (
	id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
	regDate CHAR(50) NOT NULL,
	updateDate CHAR(50) NOT NULL,
	writer VARCHAR(MAX) NOT NULL,
	title VARCHAR(MAX) NOT NULL,
	body TEXT NOT NULL
);
-- 테스트 게시물1
INSERT INTO article(regDate, updateDate, writer, title, body) 
VALUES('2021-08-03', '2021-08-03', '테스터1', '테스트 제목1', '테스트 내용1입니다.');
-- 테스트 게시물2
INSERT INTO article(regDate, updateDate, writer, title, body) 
VALUES('2021-08-03', '2021-08-03', '테스터2', '테스트 제목2', '테스트 내용2입니다.');
-- 테스트 게시물3
INSERT INTO article(regDate, updateDate, writer, title, body) 
VALUES('2021-08-03', '2021-08-03', '테스터3', '테스트 제목3', '테스트 내용3입니다.');


-- 첨부파일 테이블
CREATE TABLE genFile (
	id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
	regDate CHAR(50) NOT NULL,
	updateDate CHAR(50) NOT NULL,
	uploaded CHAR(30) NOT NULL,
	relId INT NOT NULL,
	name VARCHAR(MAX) NOT NULL,
	size BIGINT NOT NULL,
	path VARCHAR(MAX) NOT NULL,
	type VARCHAR(MAX) NOT NULL
);


-- 환경설정 테이블
CREATE TABLE genSet (
	editorNum INT NOT NULL,
	uploaderNum INT NOT NULL,
	downloaderNum INT NOT NULL
);
-- 환경설정 초기값
INSERT INTO genSet(editorNum, uploaderNum, downloaderNum) 
VALUES(1,1,1);


SELECT * FROM article;
SELECT * FROM genFile;
SELECT * FROM genSet;