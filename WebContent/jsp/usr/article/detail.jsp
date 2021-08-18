<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="${pageContext.request.contextPath}/style.css">
<script defer src="${pageContext.request.contextPath}/EXAMDownloader/downloader.js"></script>
<script defer src="${pageContext.request.contextPath}/detail.js"></script>
<script type="text/javascript">
	function start(){
		EXAMDownloader.drawDownloaderHtml();
		
		// 상세페이지 그리기
		id = getIdByUrl();
	    // 게시물 body 요청하기
	    getBody(id);
	}
</script>
<title>DETAIL</title>
</head>
<body onload="start()">
	<section class="main_section">
		<div class="article_detail_header">
			<h3>게시물 상세페이지</h3>
		</div>
		<div class="article_detail_body">
			<div class="article_detail_body__head">
				<br/>
				<div class="detail_body__cell_id">&nbsp 번호: ${article.id}</div>
				<div class="detail_body__cell_regDate">&nbsp 작성일: ${article.regDate}</div>
				<div class="detail_body__cell_writer">&nbsp 작성자: ${article.writer}</div>
				<div class="detail_body__cell_title">&nbsp 제목: ${article.title}</div>
				<br/>				
			</div>
			<div class="article_detail_body__body">
				<div id="detail_body__content" class="detail_body__content">
				</div>
			</div>
			<!-- Downloader -->
			<iframe id='downloader_holder' class='downloader_holder' src="" frameborder='0'></iframe>
			
		</div>
		<div class="article_detail_foot">
			<button type="button" onclick="location.href='../article/list'" style="cursor: pointer;">
				글 목록
			</button>
			<button type="button" onclick="location.href='../article/modify?id=${article.id}'" style="cursor: pointer;">
				글 수정
			</button>
		</div>
	</section>
</body>
</html>