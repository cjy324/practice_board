<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="${pageContext.request.contextPath}/style.css">
<script defer src="${pageContext.request.contextPath}/script.js"></script>
<title>MODIFY</title>
</head>
<body onload="fileLoad()">
	<section class="main_section">
		<div class="article_modify_header">
			<h4>게시물 수정페이지</h4>
		</div>     
        <div class="article_modify_body">
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
	                                <button id="new_btn" type="button" onclick="newPage()" style="background-color:cornflowerblue;">
	                                    <span>새 문서</span>
	                                </button>
	                                <button id="undo_btn" type="button" onclick="setStyle('undo', null)" style="font-weight: bold;">
	                                    <span>←</span>
	                                </button>
	                                <button id="redo_btn" type="button" onclick="setStyle('redo', null)" style="font-weight: bold;">
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
	                                <button id="bold_btn" type="button" onclick="setStyle('bold', null)" style="font-weight: bold;">
	                                    <span>B</span>
	                                </button>
	                                <button id="italic_btn" type="button" onclick="setStyle('italic', null)" style="font-style: italic; padding-right: 12px;">
	                                    <span>I</span>
	                                </button>
	                                <button id="underline_btn" type="button" onclick="setStyle('underline', null)" style="text-decoration: underline;">
	                                    <span>U</span>
	                                </button>
	                                <form id="uploadForm" action='doUpload' method='POST' enctype="multipart/form-data">
	                                    <label id="uploadBtnLabel" for="uploadBtn" style="background-color: midnightblue;">이미지</label>
	                                    <input id="uploadBtn" onchange="doUpload(event)" type='file' name='userfile' multiple style="display: none;">
	                                </form>
	                                <!-- <label id="uploadBtnLabel" for="uploadBtn">이미지</label>
	                                <input id="uploadBtn" type="file" onchange="imageUpload(event);" multiple style="display: none;"> -->
	                                <button id="justifyLeft_btn" type="button" onclick="setStyle('justifyLeft', null)">
	                                    <span>왼쪽 정렬</span>
	                                </button>
	                                <button id="justifyCenter_btn" type="button" onclick="setStyle('justifyCenter', null)">
	                                    <span>가운데 정렬</span>
	                                </button>
	                                <button id="justifyRight_btn" type="button" onclick="setStyle('justifyRight', null)">
	                                    <span>오른쪽 정렬</span>
	                                </button>
	                                <button id="insertOrderedList_btn" type="button" onclick="setStyle('insertOrderedList', null)">
	                                    <span>글머리 번호</span>
	                                </button>
	                                <button id="insertUnorderedList_btn" type="button" onclick="setStyle('insertUnorderedList', null)">
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
	                <button type="button" onclick="showPreview()" style="background-color: slategrey;">
	                    <span>미리보기</span>
	                </button>
	                <button id="print_btn" type="button" onclick="doPrint()" style="background-color:teal;">
	                    <span>인쇄</span>
	                </button>
	            </div>
	        </div>
	        <script lang="text/javascript">
	            // iframe window 가져오기
	            const editWindow = document.getElementById('edit_frame').contentWindow;
	            
	            // autoFocus 기능
	            function autoFocus(){
	                editWindow.document.getElementById('edit_area').focus();
	            }
	    
	            // 에디터 첫 로드 시 자동 포커스
	            document.body.onload = autoFocus;
	    
	            // caret 저장
	            let selection; //selection, range 도입
	            let range;  //range : 현재 커서가 위치한 node 정보와 위치 index 값이 저장되어 있음
	            document.getElementById('uploadBtnLabel').addEventListener('mouseover', function(e){
	                selection = editWindow.document.getSelection();
	                range = selection.getRangeAt(0);
	            })
	    
	            // p태그 자동 생성
	            editWindow.addEventListener('keyup', function(e){
	                const editArea = editWindow.document.getElementById('edit_area')
	                if(editArea.lastElementChild == null){
	                    const pTag = editWindow.document.createElement('p')
	                    editArea.appendChild(pTag)
	                    const brTag = editWindow.document.createElement('br')
	                    editArea.getElementsByTagName('p')[0].appendChild(brTag)
	                }
	            })
	    
	            // 새 문서 기능
	            function newPage(){
	                const answer = confirm('작성중인 문서가 삭제됩니다. 계속하시겠습니까?');
	                if(answer){
	                    setStyle('selectAll', null);
	                    setStyle('removeFormat', null);
	                    setStyle('delete', null);
	                    autoFocus();
	                }
	            }
	    
	            // 인쇄 기능
	            function doPrint(){
	                editWindow.print();
	            }
	    
	            // select 버튼
	            const btnFontType = document.getElementById('font_type');
	            const btnFontSize = document.getElementById('font_size');
	            const btnFontColor = document.getElementById('font_color');
	    
	            // select 버튼별 이벤트 적용
	            btnFontType.addEventListener('change', function (e) {
	                setStyle('fontName', e.target.value)
	            })
	            btnFontSize.addEventListener('change', function (e) {
	                setStyle('fontSize', e.target.value)
	            })
	            btnFontColor.addEventListener('change', function (e) {
	                setStyle('foreColor', e.target.value)
	            })
	    
	            // 버튼별 서식 적용
	            function setStyle(style, value){
	                if(value != null){
	                    editWindow.document.execCommand(style, false, value);
	                }
	                else{
	                    editWindow.document.execCommand(style);
	                }
	                autoFocus()  //서식 적용 후에도 커서 위치 유지하도록 적용
	            }
	    
	            // 미리보기 창
	            function showPreview(){
	                // 현재 document 내 iframe에 입력된 HTML 가져오기
	                const editedContent = editWindow.document.getElementById('edit_area').innerHTML;
	    
	                // 팝업옵션 설정
	                const options = 'top=100, left=500, width=800, height=800';
	                const preview = window.open('about:blank', 'preview', options);
	    
	                // 팝업창에 HTML내용 넣기
	                preview.document.write(editedContent);
	                preview.document.close();
	            }
	    
	            // 이미지 업로드
	            function doUpload(event){
	                // form으로부터 FormData 가져오기
	                const form = document.getElementById("uploadForm");
	                const formData = new FormData(form)
	                // ajax를 하기 위한 XmlHttpRequest 객체
	                const xhttp = new XMLHttpRequest();
	    
	                // http 요청 타입 / 주소 / 동기식 여부 설정
	                xhttp.open("POST", "http://127.0.0.1:8085/doUpload", true); // 메서드와 주소 설정
	                // http 요청
	                xhttp.send(formData);   // 요청 전송
	                // XmlHttpRequest의 요청
	                xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
	                    // XMLHttpRequest를 이벤트 파라미터에서 취득
	                    const req = e.target;
	                    // console.log(req);   // 콘솔 출력
	    
	                    // 통신 상태가 완료가 되면...
	                    if(req.readyState === XMLHttpRequest.DONE) {    // 요청이 완료되면
	                        // Http response 응답코드가 200(정상)이면..
	                        if(req.status === 200) {
	                            const imagesName = JSON.parse(req.responseText);  // parse: json타입을 object형식으로 변환
	                            const imagesNameLength = Object.keys(imagesName).length; // 내장 객체 Object를 이용하면 JSON형태의 객체 값의 개수를 확인할 수 있다.
	    
	                            for(let i = 0; i < imagesNameLength; i++){
	                                // img 태그 생성
	                                const newImg = editWindow.document.createElement("img");
	                                // img 태그의 속성 설정 
	                                newImg.src = "http://127.0.0.1:8085/" + imagesName[i];
	                                const newImgWidth = prompt('가로 길이를 입력해 주세요.(단위: px)');
	                                newImg.width = newImgWidth;
	                        
	                                // img 태그의 속성 설정 완료 후 커서 위치에 img node 삽입
	                                range.insertNode(newImg);
	                            }
	    
	                            // IE상에서 focus 위치를 잡지 못해 다시 focus를 잡아주어야 함
	                            autoFocus()
	                            selection = editWindow.document.getSelection();
	                            selection.removeAllRanges();
	                            selection.addRange(range);
	    
	                        }else{
	                            console.error(xhttp.responseText)
	                        }
	                    }
	                } 
	            };
	
	        </script>
	        <div class="uploader_body">
	            <div id="top_area" class="top_area">
	                <input id="allCheckbox" type="checkbox" checked="checked" onchange="setAllCheckbox()">
	                <div>파일 이름</div>
	                <div>파일 크기</div>
	            </div>
	            <div id="upload_area" class="upload_area">
					<input id="fileInput" type='file' onchange="setUploadFiles(event)" name='userfile' multiple style="display: none;">
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
	                            	<button type="button" id="button_add" onclick="selectFiles()">
	                            		<span>파일추가</span>
	                            	</button>
<!-- 	                            	<button type="button" id="button_send" onclick="setUploadFileList()">
	                            		<span>업로드</span>
	                            	</button>
	                                <button type="button" id="button_cancel" onclick="cancelUpload()">
	                            		<span>업로드 중단</span>
	                            	</button> -->
	                            	<button type="button" id="button_remove" onclick="removeSelectedFiles()">
	                            		<span>선택 삭제</span>
	                            	</button>
	                            	<button type="button" id="button_removeAll" onclick="selectAllFilesAndRemove()">
	                            		<span>전체 삭제</span>
	                            	</button>
	                            </td>
	                        </tr>
	                    </tbody>
	                </table>
	            </div>
	        </div>
        </div>
    	<div class="article_modify_foot">
			<button type="button" onclick="alert('저장')" style="cursor: pointer;">
				완료
			</button>
			<button type="button" onclick="if(confirm('정말 수정을 취소하시겠습니까?')){location.href='../article/list'}" style="cursor: pointer;">
				취소
			</button>
    	</div>
    </section>
</body>
</html>