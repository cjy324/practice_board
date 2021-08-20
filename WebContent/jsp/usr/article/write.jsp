<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="${pageContext.request.contextPath}/style.css">
<script defer src="${pageContext.request.contextPath}/EXAMEditor/editor.js"></script>
<script defer src="${pageContext.request.contextPath}/EXAMUploader/uploader.js"></script>
<script defer src="${pageContext.request.contextPath}/write.js"></script>
<script type="text/javascript">

	function drawProduct(genSet){
		console.log(typeof(genSet))
	    // 에디터 적용
	    if(genSet.editorNum === 1){
	        var editorPath = "http://localhost:8086/practiceBoard/EXAMEditor/editorHolder.html";
	        var editorImgUploadPath = "http://localhost:8086/practiceBoard/usr/upload/imageUpload";
	        
	        EXAMEditor.drawEditorHtml(editorPath, editorImgUploadPath);
	    }else if(genSet.editorNum === 2){
	        alert("k에디터 적용")
	    }
	     
	     // 업로더 적용
	    if(genSet.uploaderNum === 1){
	        var uploaderPath = "http://localhost:8086/practiceBoard/EXAMUploader/uploaderHolder.html";
	        var uploaderServerPath = "http://localhost:8086/practiceBoard/usr/upload/server";
	        
	        EXAMUploader.drawUploaderHtml(uploaderPath, uploaderServerPath);
	    }else if(genSet.uploaderNum === 2){
	        alert("k업로더 적용")
	    }
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
<title>WRITE</title>
</head>
<body onload="start()">
	<section class="main_section">
		<div class="article_write_header">
			<h3>게시물 작성페이지</h3>
		</div>     
        <div class="article_write_body">
        	<div class="editor_header">
			    <div>
			        <div>
			            <span>제목</span>
			        </div>
			        <input id="titleInput" type="text" placeholder="제목 입력란">
			    </div>
			</div>
			<!-- Editor -->
        	<iframe id='editor_holder' class='editor_holder' src="" frameborder='0'></iframe>
        	<!-- Uploader -->
        	<iframe id='uploader_holder' class='uploader_holder' src="" frameborder='0'></iframe>
        </div>
    	<div class="article_write_foot">
			<button type="button" onclick="doWrite()" style="cursor: pointer;">
				완료
			</button>
			<button id="test" type="button" onclick="if(confirm('정말 작성을 취소하시겠습니까?')){location.href='../article/list'}" style="cursor: pointer;">
				취소
			</button>
    	</div>
    </section>
</body>
</html>