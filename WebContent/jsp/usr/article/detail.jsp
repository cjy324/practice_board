<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="${pageContext.request.contextPath}/style.css">
<script defer src="${pageContext.request.contextPath}/script.js"></script>
<title>DETAIL</title>
</head>
<body>
	<section class="main_section">
		<div class="article_detail_header">
			<h4>게시물 상세페이지</h4>
		</div>
		<div class="article_detail_body">
			<div class="article_detail_body__head">
				<div class="detail_body__cell_id">번호: 1</div>
				<div class="detail_body__cell_regDate">작성일: 2021-08-03</div>
				<div class="detail_body__cell_writer">작성자: 테스터1</div>
				<div class="detail_body__cell_title">제목: 테스트 제목1</div>				
			</div>
			<div class="article_detail_body__body">
				<div class="detail_body__content">
					테스트 내용입니다.
				</div>
			</div>
		</div>
		<div class="article_detail_foot">
			<button type="button" onclick="location.href='../article/list'" style="cursor: pointer;">
				글 목록
			</button>
			<button type="button" onclick="location.href='../article/modify?id=1'" style="cursor: pointer;">
				글 수정
			</button>
		</div>
	</section>
</body>
</html>