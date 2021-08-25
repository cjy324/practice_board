<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="${pageContext.request.contextPath}/style.css">
<script defer src="${pageContext.request.contextPath}/detail.js"></script>
<script type="text/javascript">
	// contextpath
	var contextpath = "http://localhost:8086/practiceBoard";
	
	// 업로더 설정값
	var G_DownloaderConfig = {
		downloader1: {
			url: '/EXAMDownloader/downloader.js',
			beforeCreate: function () {
				var downloaderAreaNode = document.getElementById('DOWNLOADER_AREA');
				var downloaderFrame = document.createElement('iframe');
				downloaderFrame.id = 'downloader_holder';
				downloaderFrame.className = 'downloader_holder';
				downloaderFrame.width = '100%';
				downloaderFrame.height = '100%';
		    	
				downloaderAreaNode.appendChild(downloaderFrame);
			},
			create: function () {
				// 다운로더 적용	
				var downloaderPath = contextpath + "/EXAMDownloader/downloaderHolder.html";
				var downloaderServerPath = contextpath + "/usr/download/server";
				var downloadProgressPath = contextpath + "/usr/download/progress";
					
				EXAMDownloader.drawDownloaderHtml(downloaderPath, downloaderServerPath, downloadProgressPath);
			}
		},
		downloader2: {
			url: '/raonkupload/js/raonkupload.js',
	        beforeCreate: function () {},
			create: function () {
				var raonkParam = {
					Id: "K_Downloader",
		            Width: '100%',
		            Mode: 'view', // 다운로더 모드
		            UploadHolder: "DOWNLOADER_AREA"  // UploadHolder를 지정해 주면 해당 id 태그에 업로더를 그린다.
		        }
				new RAONKUpload(raonkParam);
			}
		}
	};
	
	function drawProduct(genSet){
		// window 전역변수로 저장
		window.GENSET = {
				editorNum: genSet.editorNum, 
				uploaderNum: genSet.uploaderNum, 
				downloaderNum: genSet.downloaderNum
				};

	     // 다운로더 적용
	    var downloaderConfig = G_DownloaderConfig['downloader' + genSet.downloaderNum];
		
	    downloaderConfig.beforeCreate();
	
	    var downloaderScript = document.createElement('script');
	    downloaderScript.src = contextpath + downloaderConfig.url;
	    downloaderScript.defer = "defer";
	    document.head.appendChild(downloaderScript);
	
	    downloaderScript.onload = function () {
	    	downloaderConfig.create();
	    };
	 	// 상세페이지 그리기
		id = getIdByUrl();
	    // 게시물 body 요청하기
	    getBody(id);
	}
	
	function getOptionsByAjax(){
		// 환경설정값
		let genSet = {
			    editorNum: 0,
			    uploaderNum: 0,
			    downloaderNum: 0
			}
	    
		// ajax 통신을 하기 위한 XmlHttpRequest 객체 생성
	    const xhttp = new XMLHttpRequest(); 
	    // http 요청 타입 / 주소 / 동기식 여부 설정
	    xhttp.open("POST", "http://localhost:8086/practiceBoard/usr/config/getOptions", true); // 메서드와 주소 설정    
	    // http 요청
	    xhttp.send();   // 요청 전송

	    xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
	        const req = e.target;

	        if(req.readyState === 4) {
	            if(req.status === 200) {
	                console.log("------통신 성공------");
	                genSet = JSON.parse(xhttp.responseText);
	                drawProduct(genSet)
	            }else{
	                console.error("------통신 실패------");
	                console.error("req.status: " + req.status);
	                console.error(xhttp.responseText);
	            }
	        }
	    }
	}

	function start(){

		getOptionsByAjax();
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
			<div id="DOWNLOADER_AREA" class="DOWNLOADER_AREA"></div>
			
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