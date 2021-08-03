<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="${pageContext.request.contextPath}/style.css">
<script defer src="${pageContext.request.contextPath}/script.js"></script>
<title>LIST</title>
</head>
<body>
	<section class="main_section">
		<div class="article_list_header">
			<h4>게시물 리스트</h4>
		</div>
		<div class="article_list_body">
			<div class="article_list_body__head">
				<div class="list_body__cell_id">번호</div>
				<div class="list_body__cell_regDate">작성일</div>
				<div class="list_body__cell_title">제목</div>
				<div class="list_body__cell_writer">작성자</div>
				<div class="list_body__cell_file">첨부</div>
			</div>
			<div class="article_list_body__body">
				<div class="article_list_body__cell">
					<div class="list_body__cell_id">1</div>
					<div class="list_body__cell_regDate">2021-08-03</div>
					<div class="list_body__cell_title">
						&nbsp <a href="../article/detail?id=1" class="hover-underline">테스트 제목1</a>
					</div>
					<div class="list_body__cell_writer">테스터1</div>
					<div class="list_body__cell_file">2</div>
				</div>
				<div class="article_list_body__cell">
					<div class="list_body__cell_id">1</div>
					<div class="list_body__cell_regDate">2021-08-03</div>
					<div class="list_body__cell_title">
						&nbsp <a href="../article/detail?id=1" class="hover-underline">테스트 제목1</a>
					</div>
					<div class="list_body__cell_writer">테스터1</div>
					<div class="list_body__cell_file">2</div>
				</div>
				<div class="article_list_body__cell">
					<div class="list_body__cell_id">1</div>
					<div class="list_body__cell_regDate">2021-08-03</div>
					<div class="list_body__cell_title">
						&nbsp <a href="../article/detail?id=1" class="hover-underline">테스트 제목1</a>
					</div>
					<div class="list_body__cell_writer">테스터1</div>
					<div class="list_body__cell_file">2</div>
				</div>
				<div class="article_list_body__cell">
					<div class="list_body__cell_id">1</div>
					<div class="list_body__cell_regDate">2021-08-03</div>
					<div class="list_body__cell_title">
						&nbsp <a href="../article/detail?id=1" class="hover-underline">테스트 제목1</a>
					</div>
					<div class="list_body__cell_writer">테스터1</div>
					<div class="list_body__cell_file">2</div>
				</div>	
			</div>
		</div>
		<div class="article_list_foot">
			<button type="button" onclick="location.href='../article/write'" style="cursor: pointer;">
				글 작성
			</button>
		</div>
	</section> 
</body>
</html>