<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="${pageContext.request.contextPath}/style.css">
<script defer="defer" src="${pageContext.request.contextPath}/writer.js"></script>
<title>WRITE</title>
</head>
<body>
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
        	<iframe id='editor_holder' class='editor_holder' src="http://localhost:8086/practiceBoard/Editor/editorHolder.html" frameborder='0'></iframe>
        	
        	
	        <div class="uploader_body">
	            <div id="top_area" class="top_area">
	                <input id="allCheckbox" type="checkbox" checked="checked" onchange="EXAMUploader.setAllCheckbox()">
	                <div>파일 이름</div>
	                <div>파일 크기</div>
	            </div>
	            <div id="upload_area" class="upload_area">
					<input id="fileInput" type='file' onchange="EXAMUploader.setUploadFiles(event)" name='userfile' multiple style="display: none;">
					<ul class="uploadZone" id="uploadZone">
						<li style="height:100%; display: flex; justify-content: center; align-items: center;">
							<span style="position: inherit; font-weight: normal; color: blue; font-size: 12px;">이곳에 파일을 Drag & Drop 하세요.</span>
						</li>
					</ul>
	            </div>
	            <div id="info_area" class="info_area">
	                <ul>
	                    <li id="basic_file_info" class="basic_file_info">
	                        최대
	                        <span>20</span>
	                        개
	                        <span>300 MB</span>
	                        제한
	                    </li>
	                    <li id="current_file_info" class="current_file_info">
	                        <span>0</span>
	                        개 ,
	                        <span>0 byte</span>
	                        <span>추가됨</span>
	                    </li>
	                </ul>
	            </div>
	            <div id="btn_area" class="btn_area">
	                <table>
	                    <tbody>
	                        <tr>
	                            <td>
	                            	<button type="button" id="button_add" onclick="EXAMUploader.selectFiles()">
	                            		<span>파일추가</span>
	                            	</button>
<!-- 	                            	<button type="button" id="button_send" onclick="setUploadFileList()">
	                            		<span>업로드</span>
	                            	</button>
	                                <button type="button" id="button_cancel" onclick="cancelUpload()">
	                            		<span>업로드 중단</span>
	                            	</button> -->
	                            	<button type="button" id="button_remove" onclick="EXAMUploader.removeSelectedFiles()">
	                            		<span>선택 삭제</span>
	                            	</button>
	                            	<button type="button" id="button_removeAll" onclick="EXAMUploader.selectAllFilesAndRemove()">
	                            		<span>전체 삭제</span>
	                            	</button>
	                            </td>
	                        </tr>
	                    </tbody>
	                </table>
	            </div>
	        </div>
	        <div id="progressBarZone">
	        </div>
        </div>
    	<div class="article_write_foot">
			<button type="button" onclick="EXAMEditor.doWrite()" style="cursor: pointer;">
				완료
			</button>
			<button type="button" onclick="if(confirm('정말 작성을 취소하시겠습니까?')){location.href='../article/list'}" style="cursor: pointer;">
				취소
			</button>
    	</div>
    </section>
</body>
</html>