<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<!-- ie css root변수적용 --> 
<script> 
window.MSInputMethodContext && document.documentMode && document.write('<script src="https://cdn.jsdelivr.net/gh/nuxodin/ie11CustomProperties@4.1.0/ie11CustomProperties.min.js"><\/script>'); 
</script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/style.css">
<title>LIST</title>
</head>
<body>
	<section class="main_section">
		<div class="article_list_header">
			<h3>게시물 리스트</h3>
		</div>
		<button type="button" onclick="location.href='../config/setting'">
			환경설정
		</button>
		<div class="article_list_body">
			<div class="article_list_body__head">
				<div class="list_body__cell_id">번호</div>
				<div class="list_body__cell_regDate">작성일</div>
				<div class="list_body__cell_title">제목</div>
				<div class="list_body__cell_writer">작성자</div>
				<div class="list_body__cell_file">첨부</div>
			</div>
			<div class="article_list_body__body">
			<c:forEach var="article" items="${articles}" varStatus="status">
				<div class="article_list_body__cell">
					<div class="list_body__cell_id">${article.id}</div>
					<div class="list_body__cell_regDate">${article.regDate}</div>
					<div class="list_body__cell_title">
						<a href="../article/detail?id=${article.id}" class="hover-underline">${article.title}</a>
					</div>
					<div class="list_body__cell_writer">${article.writer}</div>
					<div class="list_body__cell_file">${genFileCounts.get(article.id-1)}</div>
				</div>
			</c:forEach>
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