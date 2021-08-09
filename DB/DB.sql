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
VALUES('2021-08-03', '2021-08-03', '�׽���1', '�׽�Ʈ ����1', '�׽�Ʈ ����1�Դϴ�.');

INSERT INTO article(regDate, updateDate, writer, title, body) 
VALUES('2021-08-03', '2021-08-03', '�׽���2', '�׽�Ʈ ����2', '�׽�Ʈ ����2�Դϴ�.');

INSERT INTO article(regDate, updateDate, writer, title, body) 
VALUES('2021-08-03', '2021-08-03', '�׽���3', '�׽�Ʈ ����3', '�׽�Ʈ ����3�Դϴ�.');

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