<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="${pageContext.request.contextPath}/style.css">
<script defer src="${pageContext.request.contextPath}/EXAMEditor/editor.js"></script>
<script defer src="${pageContext.request.contextPath}/EXAMUploader/uploader.js"></script>
<script defer src="${pageContext.request.contextPath}/modify.js"></script>
<script type="text/javascript">
	function start(){
		EXAMEditor.drawEditorHtml();
		EXAMUploader.drawUploaderHtml();
		// 상세페이지 그리기
		id = getIdByUrl();
	    // 게시물 body 요청하기
	    getBody(id);
	}
</script>
<title>MODIFY</title>
</head>
<body onload="start()">
	<section class="main_section">
		<div class="article_write_header">
			<h3>게시물 수정페이지</h3>
		</div>     
        <div class="article_write_body">
        	<div class="editor_header">
	            <div>
	                <div>
	                    <span>제목</span>
	                </div>
	                <input id="titleInput" type="text" value="${article.title}">
	            </div>
	        </div>
	        
			<!-- Editor -->
        	<iframe id='editor_holder' class='editor_holder' src="" frameborder='0'></iframe>
        	<!-- Uploader -->
        	<iframe id='uploader_holder' class='uploader_holder' src="" frameborder='0'></iframe>
        	
        </div>
    	<div class="article_write_foot">
			<button type="button" onclick="doModify()" style="cursor: pointer;">
				완료
			</button>
			<button type="button" onclick="if(confirm('정말 수정을 취소하시겠습니까?')){location.href='../article/list'}" style="cursor: pointer;">
				취소
			</button>
    	</div>
    </section>
</body>
</html>