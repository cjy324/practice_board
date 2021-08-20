<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="${pageContext.request.contextPath}/style.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/raonkeditor/js/raonkeditor.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/raonkupload/js/raonkupload.js"></script>
<script defer="defer" src="${pageContext.request.contextPath}/EXAMEditor/editor.js"></script>
<script defer src="${pageContext.request.contextPath}/EXAMUploader/uploader.js"></script>
<script defer="defer" type="text/javascript" src="${pageContext.request.contextPath}/setting.js"></script>
<title>SETTING</title>
</head>
<script defer="defer" type="text/javascript">
	function draw(){
		// 에디터 적용
		var editorPath = "http://localhost:8086/practiceBoard/EXAMEditor/editorHolder.html";
		var editorImgUploadPath = "http://localhost:8086/practiceBoard/usr/upload/imageUpload";
		
		EXAMEditor.drawEditorHtml(editorPath, editorImgUploadPath);
		
		// 업로더 적용
		var uploaderPath = "http://localhost:8086/practiceBoard/EXAMUploader/uploaderHolder.html";
        var uploaderServerPath = "http://localhost:8086/practiceBoard/usr/upload/server";
        
        EXAMUploader.drawUploaderHtml(uploaderPath, uploaderServerPath);
	}
</script>
<body onload="draw()">
	<section class="main_section">
		<div class="config_setting_header">
			<h3>환경설정 페이지</h3>
		</div>
		<div class="config_setting_body">
			<div class="config_setting_body__content">
				<div class="config_setting_body__content_cell">
					<span>에디터 선택</span>
					<ul class="selectZone" id="uploadZone">
						<li>
							<input id="editor_1" type='checkbox' name='editors' onclick="checkOnlyOneEditors(this)" value='false' checked>
							<span>EXAMEditor</span>
						</li>
						<li>
							<input id="editor_2"  type='checkbox' name='editors' onclick="checkOnlyOneEditors(this)" value='false'>
							<span>K-Editor</span>
						</li>
					</ul>
				</div>
				<div class="config_setting_body__content_cell">
					<span>업로더 선택</span>
					<ul class="selectZone" id="uploadZone">
						<li>
							<input id="uploader_1" type='checkbox' name='uploaders' onclick="checkOnlyOneUploaders(this)" value='false' checked>
							<span>EXAMUploader</span>
						</li>
						<li>
							<input id="uploader_2"  type='checkbox' name='uploaders' onclick="checkOnlyOneUploaders(this)" value='false'>
							<span>K-Uploader</span>
						</li>
					</ul>
				</div>
				<div class="config_setting_body__content_cell">
					<span>다운로더 선택</span>
					<ul class="selectZone" id="uploadZone">
						<li>
							<input id="downloader_1" type='checkbox' name='downloaders' onclick="checkOnlyOneDownloaders(this)" value='false' checked>
							<span>EXAMDownloader</span>
						</li>
						<li>
							<input id="downloader_2"  type='checkbox' name='downloaders' onclick="checkOnlyOneDownloaders(this)" value='false'>
							<span>K-Downloader</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="config_setting_body__btn">
				<button onclick="setOptions()">설정값 저장</button>
			</div>
			<div>
				<h2>미리보기</h2>
			</div>
			<div style="text-align: center; width: 100%;">
				<h4>EXAMEditor</h4>
				<div style="width: 80%; display:inline-block;">
					<!-- Editor -->
					<div id="EDITOR_AREA" class="EDITOR_AREA">
						<iframe id='editor_holder' class='editor_holder' src="" width="100%" height="100%"></iframe>
					</div>
				</div>
			</div>
			<div style="text-align: center; width: 100%;">
				<h4>K_Editor</h4>
				<div style="width: 80%; display:inline-block;">
					<script type="text/javascript">
						var raonkParam = {
								Id: "K_Editor",
					            Width: '100%',
					            DefaultMessage: "<span>이곳에 내용을 입력하세요.</span>"
					        }
						var editor = new RAONKEditor(raonkParam);
					</script>
				</div>
			</div>
			<div style="text-align: center; width: 100%;">
				<h4>EXAMUploader</h4>
				<div style="width: 80%; display:inline-block;">
					<!-- Uploader -->
        			<iframe id='uploader_holder' class='uploader_holder' src="" frameborder='0'></iframe>
				</div>
			</div>
			<div style="text-align: center; width: 100%;">
				<h4>K_Uploader</h4>
				<div style="width: 80%; display:inline-block;">
					<script type="text/javascript">
						var raonkParam = {
								Id: "K_Uploader",
					            Width: '100%'
					        }
						var upload = new RAONKUpload(raonkParam);
					</script>
				</div>
			</div>
		</div>
		<div class="config_setting_foot">
			<button type="button" onclick="location.href='../article/list'" style="cursor: pointer;">
				설정 완료
			</button>
		</div>
		
	</section>
</body>
</html>