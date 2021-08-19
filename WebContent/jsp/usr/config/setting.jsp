<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="${pageContext.request.contextPath}/style.css">
<script defer src="${pageContext.request.contextPath}/detail.js"></script>
<title>SETTING</title>
</head>
<body>
	<section class="main_section">
		<div class="article_detail_header">
			<h3>환경설정 페이지</h3>
		</div>
		<div class="article_detail_body">
			<div class="article_detail_body__body">
				<div>
					<span>에디터 선택</span>
					<ul class="uploadZone" id="uploadZone">
						<li>
							<input id="editor_1" type='checkbox' name='editors' value='false' checked>
							<span>EXAMEditor</span>
						</li>
						<li>
							<input id="editor_2"  type='checkbox' name='editors' value='false' checked>
							<span>K-Editor</span>
						</li>
					</ul>
				</div>
				<div>
					<span>업로더 선택</span>
					<ul class="uploadZone" id="uploadZone">
						<li>
							<input id="uploader_1" type='checkbox' name='uploaders' value='false' checked>
							<span>EXAMUploader</span>
						</li>
						<li>
							<input id="uploader_2"  type='checkbox' name='uploaders' value='false' checked>
							<span>K-Uploader</span>
						</li>
					</ul>
				</div>
				<div>
					<span>다운로더 선택</span>
					<ul class="uploadZone" id="uploadZone">
						<li>
							<input id="downloader_1" type='checkbox' name='downloaders' value='false' checked>
							<span>EXAMDownloader</span>
						</li>
						<li>
							<input id="downloader_2"  type='checkbox' name='downloaders' value='false' checked>
							<span>K-Downloader</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="article_detail_foot">
			<button type="button" onclick="location.href='../article/list'" style="cursor: pointer;">
				설정 완료
			</button>
		</div>
	</section>
</body>
</html>