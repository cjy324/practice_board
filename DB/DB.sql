DROP TABLE IF EXISTS article;

CREATE TABLE article (
	id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
	title CHAR(50) NOT NULL,
	body TEXT NOT NULL
);

INSERT INTO article(title, body) 
VALUES('�׽�Ʈ ����1', '�׽�Ʈ ����1�Դϴ�.');

INSERT INTO article(title, body) 
VALUES('�׽�Ʈ ����2', '�׽�Ʈ ����2�Դϴ�.');

INSERT INTO article(title, body) 
VALUES('�׽�Ʈ ����3', '�׽�Ʈ ����3�Դϴ�.');

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