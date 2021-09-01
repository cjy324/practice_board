DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS genFile;
DROP TABLE IF EXISTS genSet;

-- CHAR, NCHAR �ڷ����� ���� �÷��� �����͸� INSERT �ϰ� �Ǹ� ���� ���ڿ� ���̸�ŭ �����ʿ� ������ ä������ �˴ϴ�. 
-- VARCHAR, NVARCHAR �ڷ����� ���� ���� �ڷ����� INSERT �˴ϴ�. 
-- ���� VAR�� ������ ���� ���� ���ڿ��� �Ǹ� VAR�� ������ �������� ���ڿ��� �˴ϴ�.

-- �Խù� ���̺�
CREATE TABLE article (
	id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
	regDate VARCHAR(MAX) NOT NULL,
	updateDate VARCHAR(MAX) NOT NULL,
	writer VARCHAR(MAX) NOT NULL,
	title VARCHAR(MAX) NOT NULL,
	body TEXT NOT NULL
);
-- �׽�Ʈ �Խù�1
INSERT INTO article(regDate, updateDate, writer, title, body) 
VALUES('2021-08-03', '2021-08-03', '�׽���1', '�׽�Ʈ ����1', '�׽�Ʈ ����1�Դϴ�.');
-- �׽�Ʈ �Խù�2
INSERT INTO article(regDate, updateDate, writer, title, body) 
VALUES('2021-08-03', '2021-08-03', '�׽���2', '�׽�Ʈ ����2', '�׽�Ʈ ����2�Դϴ�.');
-- �׽�Ʈ �Խù�3
INSERT INTO article(regDate, updateDate, writer, title, body) 
VALUES('2021-08-03', '2021-08-03', '�׽���3', '�׽�Ʈ ����3', '�׽�Ʈ ����3�Դϴ�.');


-- ÷������ ���̺�
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


-- ȯ�漳�� ���̺�
CREATE TABLE genSet (
	editorNum TINYINT NOT NULL,
	uploaderNum TINYINT NOT NULL,
	downloaderNum TINYINT NOT NULL
);
-- ȯ�漳�� �ʱⰪ
INSERT INTO genSet(editorNum, uploaderNum, downloaderNum) 
VALUES(1,1,1);


SELECT * FROM article;
SELECT * FROM genFile;
SELECT * FROM genSet;