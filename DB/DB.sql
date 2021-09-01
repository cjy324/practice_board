DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS genFile;
DROP TABLE IF EXISTS genSet;

-- CHAR, NCHAR 자료형을 가진 컬럼에 데이터를 INSERT 하게 되면 남은 문자열 길이만큼 오른쪽에 공백이 채워지게 됩니다. 
-- VARCHAR, NVARCHAR 자료형은 공백 없이 자료형이 INSERT 됩니다. 
-- 따라서 VAR가 있으면 가변 길이 문자열이 되며 VAR가 없으면 고정길이 문자열이 됩니다.

-- 게시물 테이블
CREATE TABLE article (
	id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
	regDate VARCHAR(MAX) NOT NULL,
	updateDate VARCHAR(MAX) NOT NULL,
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
	regDate VARCHAR(MAX) NOT NULL,
	updateDate VARCHAR(MAX) NOT NULL,
	uploaded VARCHAR(MAX) NOT NULL,
	relId INT NOT NULL,
	name VARCHAR(MAX) NOT NULL,
	size BIGINT NOT NULL,
	path VARCHAR(MAX) NOT NULL,
	type VARCHAR(MAX) NOT NULL
);


-- 환경설정 테이블
CREATE TABLE genSet (
	editorNum TINYINT NOT NULL,
	uploaderNum TINYINT NOT NULL,
	downloaderNum TINYINT NOT NULL
);
-- 환경설정 초기값
INSERT INTO genSet(editorNum, uploaderNum, downloaderNum) 
VALUES(1,1,1);


SELECT * FROM article;
SELECT * FROM genFile;
SELECT * FROM genSet;