<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="${pageContext.request.contextPath}/style.css">
<script defer="defer" src="${pageContext.request.contextPath}/EXAMEditor/editor.js"></script>
<script defer="defer" src="${pageContext.request.contextPath}/EXAMUploader/uploader.js"></script>
<script defer="defer" src="${pageContext.request.contextPath}/writer.js"></script>
<script type="text/javascript">
	function start(){
		EXAMEditor.drawEditorHtml();
		EXAMUploader.drawUploaderHtml();
	}
</script>
<title>WRITE</title>
</head>
<body onload="start()">
	<section class="main_section">
		<div class="article_write_header">
			<h4>게시물 작성페이지</h4>
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
			
        	<iframe id='editor_holder' class='editor_holder' src="" frameborder='0'></iframe>
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