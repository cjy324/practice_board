<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="${pageContext.request.contextPath}/style.css">
<script defer src="${pageContext.request.contextPath}/common.js"></script>
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
	                <input type="text" placeholder="제목 입력란">
	            </div>
	        </div>
        	<div class="editor_body">
	            <div id="btn_area_top" class="btn_area_top toolbar" >
	                <table>
	                    <tbody>
	                        <tr>
	                            <td>
	                                <button id="new_btn" type="button" onclick="EXAMEditor.newPage()" style="background-color:cornflowerblue;">
	                                    <span>새 문서</span>
	                                </button>
	                                <button id="undo_btn" type="button" onclick="EXAMEditor.setStyle('undo', null)" style="font-weight: bold;">
	                                    <span>←</span>
	                                </button>
	                                <button id="redo_btn" type="button" onclick="EXAMEditor.setStyle('redo', null)" style="font-weight: bold;">
	                                    <span>→</span>
	                                </button>
	                                <select id='font_type'>
	                                    <option value="">글꼴</option>
	                                    <option value="바탕">바탕</option>
	                                    <option value="돋움">돋움</option>
	                                    <option value="굴림">굴림</option>
	                                    <option value="궁서">궁서</option>
	                                    <option value="맑은 고딕">맑은 고딕</option>
	                                </select>
	                                <select id='font_size'>
	                                    <option value="3">10px</option>
	                                    <option value="1">4px</option>
	                                    <option value="2">8px</option>
	                                    <option value="3">10px</option>
	                                    <option value="4">12px</option>
	                                    <option value="5">16px</option>
	                                    <option value="6">20px</option>
	                                    <option value="7">30px</option>
	                                </select>
	                                <select id='font_color'>
	                                    <option value="">색상</option>
	                                    <option value="black">Black</option>
	                                    <option value="red">Red</option>
	                                    <option value="green">Green</option>
	                                    <option value="blue">Blue</option>
	                                    <option value="gray">Gray</option>
	                                    <option value="white">White</option>
	                                    <option value="yellow">Yellow</option>
	                                </select>
	                                <button id="bold_btn" type="button" onclick="EXAMEditor.setStyle('bold', null)" style="font-weight: bold;">
	                                    <span>B</span>
	                                </button>
	                                <button id="italic_btn" type="button" onclick="EXAMEditor.setStyle('italic', null)" style="font-style: italic; padding-right: 12px;">
	                                    <span>I</span>
	                                </button>
	                                <button id="underline_btn" type="button" onclick="EXAMEditor.setStyle('underline', null)" style="text-decoration: underline;">
	                                    <span>U</span>
	                                </button>
	                                <form id="uploadForm" action='doUpload' method='POST' enctype="multipart/form-data">
	                                    <label id="uploadBtnLabel" for="uploadBtn" style="background-color: midnightblue;">이미지</label>
	                                    <input id="uploadBtn" onchange="doUpload(event)" type='file' name='userfile' multiple style="display: none;">
	                                </form>
	                                <!-- <label id="uploadBtnLabel" for="uploadBtn">이미지</label>
	                                <input id="uploadBtn" type="file" onchange="imageUpload(event);" multiple style="display: none;"> -->
	                                <button id="justifyLeft_btn" type="button" onclick="EXAMEditor.setStyle('justifyLeft', null)">
	                                    <span>왼쪽 정렬</span>
	                                </button>
	                                <button id="justifyCenter_btn" type="button" onclick="EXAMEditor.setStyle('justifyCenter', null)">
	                                    <span>가운데 정렬</span>
	                                </button>
	                                <button id="justifyRight_btn" type="button" onclick="EXAMEditor.setStyle('justifyRight', null)">
	                                    <span>오른쪽 정렬</span>
	                                </button>
	                                <button id="insertOrderedList_btn" type="button" onclick="EXAMEditor.setStyle('insertOrderedList', null)">
	                                    <span>글머리 번호</span>
	                                </button>
	                                <button id="insertUnorderedList_btn" type="button" onclick="EXAMEditor.setStyle('insertUnorderedList', null)">
	                                    <span>글머리 기호</span>
	                                </button>
	                            </td>
	                        </tr>
	                    </tbody>
	                </table>
	            </div>
	            <div id="text_area" class="text_area">
	                <iframe id="edit_frame" class="edit_frame" src="${pageContext.request.contextPath}/jsp/usr/article/editArea.html" frameborder="0"></iframe>
	            </div>
	            <div id="btn_area_bottom" class="btn_area_bottom">
	                <button type="button" onclick="EXAMEditor.showPreview()" style="background-color: slategrey;">
	                    <span>미리보기</span>
	                </button>
	            </div>
	        </div>
	        <div class="uploader_body">
	            <div id="top_area" class="top_area">
	                <input id="allCheckbox" type="checkbox" checked="checked" onchange="EXAMUploader.setAllCheckbox()">
	                <div>파일 이름</div>
	                <div>파일 크기</div>
	            </div>
	            <div id="upload_area" class="upload_area">
					<input id="fileInput" type='file' onchange="EXAMUploader.setUploadFiles(event)" name='userfile' multiple style="display: none;">
					<ul class="uploadZone" id="uploadZone">
						<li style="height:100%; justify-content: center; align-items: center;">
							<span style="font-weight: normal; color: blue; font-size: 12px;">이곳에 파일을 Drag & Drop 하세요.</span>
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
        </div>
    	<div class="article_write_foot">
			<button type="button" onclick="alert('저장')" style="cursor: pointer;">
				완료
			</button>
			<button type="button" onclick="if(confirm('정말 작성을 취소하시겠습니까?')){location.href='../article/list'}" style="cursor: pointer;">
				취소
			</button>
    	</div>
    </section>
</body>
</html>