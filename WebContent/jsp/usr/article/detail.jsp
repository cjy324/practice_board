<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="${pageContext.request.contextPath}/style.css">
<script defer src="${pageContext.request.contextPath}/downloader.js"></script>
<title>DETAIL</title>
</head>
<body onload="EXAMDownloader.fileLoad()">
	<section class="main_section">
		<div class="article_detail_header">
			<h4>게시물 상세페이지</h4>
		</div>
		<div class="article_detail_body">
			<div class="article_detail_body__head">
				<div class="detail_body__cell_id">번호: ${article.id}</div>
				<div class="detail_body__cell_regDate">작성일: ${article.regDate}</div>
				<div class="detail_body__cell_writer">작성자: ${article.writer}</div>
				<div class="detail_body__cell_title">제목: ${article.title}</div>				
			</div>
			<div class="article_detail_body__body">
				<div id="detail_body__content" class="detail_body__content">
					${article.body}
				</div>
			</div>
			<div class="downloader_body">
	            <div id="top_area" class="top_area">
	                <input id="allCheckbox" type="checkbox" checked="checked" onchange="EXAMDownloader.setAllCheckbox()">
	                <div>파일 이름</div>
	                <div>파일 크기</div>
	            </div>
	            <div id="download_area" class="download_area">
					<ul id="downloadZone" class="downloadZone">
						<li style="height: 100%; display: flex; justify-content: center; align-items: center;">
							<span style="position: inherit; font-weight: normal; color: blue; font-size: 12px;">첨부 파일 없음</span>
						</li>
					</ul>
	            </div>
	            <div id="info_area" class="info_area">
	                <ul>
	                    <li id="current_file_info" class="current_file_info">
	                        <span>0</span>
	                        개 ,
	                        <span>0 byte</span>
	                    </li>
	                </ul>
	            </div>
	            <div id="btn_area" class="btn_area">
	                <table>
	                    <tbody>
	                        <tr>
	                            <td>
	                            	<button id="button_down" type="button" onclick="EXAMDownloader.startDownload(0)">
	                            		<span>다운로드</span>
	                            	</button>
	                            </td>
	                        </tr>
	                    </tbody>
	                </table>
	            </div>
	        </div>
		</div>
		<div class="article_detail_foot">
			<button type="button" onclick="location.href='../article/list'" style="cursor: pointer;">
				글 목록
			</button>
			<button type="button" onclick="location.href='../article/modify?id=${article.id}'" style="cursor: pointer;">
				글 수정
			</button>
		</div>
		<iframe id="download_frame" name="download_frame" style="display: none;" src=""></iframe>
	</section>
</body>
</html>