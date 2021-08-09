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
VALUES('2021-08-03','�׽���1', '�׽�Ʈ ����1', '�׽�Ʈ ����1�Դϴ�.');

INSERT INTO article(regDate, writer, title, body) 
VALUES('2021-08-03','�׽���2', '�׽�Ʈ ����2', '�׽�Ʈ ����2�Դϴ�.');

INSERT INTO article(regDate, writer, title, body) 
VALUES('2021-08-03','�׽���3', '�׽�Ʈ ����3', '�׽�Ʈ ����3�Դϴ�.');

CREATE TABLE genFile (
	id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
	uploaded CHAR(30) NOT NULL,
	relId INT NOT NULL,
	name CHAR(100) NOT NULL,
	size VARCHAR(MAX) NOT NULL,
	path CHAR(300) NOT NULL,
	type CHAR(100) NOT NULL
);


SELECT * FROM article;
SELECT * FROM genFile;