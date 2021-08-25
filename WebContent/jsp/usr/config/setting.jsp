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
<script defer src="${pageContext.request.contextPath}/setting.js"></script>
<title>SETTING</title>
</head>
<body onload="drawProduct()">
	<section class="main_section">
		<div class="config_setting_header">
			<h3>환경설정 페이지</h3>
		</div>
		<div class="config_setting_body">
			<div class="config_setting_body__content">
				<div class="config_setting_body__content_cell">
					<span>에디터 선택</span>
					<ul class="selectZone" id="selectZone">
						<li>
							<!-- <input id="editor_1" type='checkbox' name='editors' onclick="checkOnlyOneEditors(this)" value='false' checked>
							<span>EXAMEditor</span> -->
							<input id="editor_1" style="cursor: pointer;" type='radio' name='editors' value='1' checked>
							<label for="editor_1" style="cursor: pointer;">EXAMEditor</label>
						</li>
						<li>
							<!-- <input id="editor_2"  type='checkbox' name='editors' onclick="checkOnlyOneEditors(this)" value='false'>
							<span>K-Editor</span> -->
							<input id="editor_2" style="cursor: pointer;" type='radio' name='editors' value='2'>
							<label for="editor_2" style="cursor: pointer;">K-Editor</label>
						</li>
					</ul>
				</div>
				<div class="config_setting_body__content_cell">
					<span>업로더 선택</span>
					<ul class="selectZone" id="selectZone">
						<li>
<!-- 							<input id="uploader_1" type='checkbox' name='uploaders' value='false' checked>
							<span>EXAMUploader</span> -->
							<input id="uploader_1" style="cursor: pointer;" type='radio' name='uploaders' value='1' checked>
							<label for="uploader_1" style="cursor: pointer;">EXAMUploader</label>
						</li>
						<li>
<!-- 							<input id="uploader_2"  type='checkbox' name='uploaders' onclick="checkOnlyOneUploaders(this)" value='false'>
							<span>K-Uploader</span> -->
							<input id="uploader_2" style="cursor: pointer;"  type='radio' name='uploaders' value='2'>
							<label for="uploader_2" style="cursor: pointer;">K-Uploader</label>
						</li>
					</ul>
				</div>
				<div class="config_setting_body__content_cell">
					<span>다운로더 선택</span>
					<ul class="selectZone" id="selectZone">
						<li>
<!-- 							<input id="downloader_1" type='checkbox' name='downloaders' onclick="checkOnlyOneDownloaders(this)" value='false' checked>
							<span>EXAMDownloader</span> -->
							<input id="downloader_1" style="cursor: pointer;"  type='radio' name='downloaders' value='1' checked>
							<label for="downloader_1" style="cursor: pointer;">EXAMDownloader</label>
						</li>
						<li>
<!-- 							<input id="downloader_2"  type='checkbox' name='downloaders' onclick="checkOnlyOneDownloaders(this)" value='false'>
							<span>K-Downloader</span> -->
							<input id="downloader_2" style="cursor: pointer;"  type='radio' name='downloaders' value='2'>
							<label for="downloader_2" style="cursor: pointer;">K-Downloader</label>
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
	</section>
</body>
</html>