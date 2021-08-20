<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="${pageContext.request.contextPath}/style.css">
<script src="${pageContext.request.contextPath}/write.js"></script>
<script type="text/javascript">

	// contextpath
	var contextpath = "http://localhost:8086/practiceBoard";
	
	// 에디터 설정값
	var G_EditorConfig = {
		editor1: {
			url: '/EXAMEditor/editor.js',
			beforeCreate: function () {
				var editorAreaNode = document.getElementById('EDITOR_AREA');
				var editorFrame = document.createElement('iframe');
		    	editorFrame.id = 'editor_holder';
		    	editorFrame.className = 'editor_holder';
		    	editorFrame.width = '100%';
		    	editorFrame.height = '100%';
		    	
		    	editorAreaNode.appendChild(editorFrame);
			},
			create: function () {
				var editorPath = "http://localhost:8086/practiceBoard/EXAMEditor/editorHolder.html";
		        var editorImgUploadPath = "http://localhost:8086/practiceBoard/usr/upload/imageUpload";
		        
		        EXAMEditor.drawEditorHtml(editorPath, editorImgUploadPath);
			}
		},
		editor2: {
			url: '/raonkeditor/js/raonkeditor.js',
	        beforeCreate: function () {},
			create: function () {
				var raonkParam = {
					Id: "K_Editor",
		            Width: '100%',
		            EditorHolder: "EDITOR_AREA",  // EditorHolder를 지정해 주면 해당 id 태그에 에디터를 그린다.
		            DefaultMessage: "<span>이곳에 내용을 입력하세요.</span>"
		        }
				new RAONKEditor(raonkParam);
			}
		}
	};
	
	// 업로더 설정값
	var G_UploaderConfig = {
		uploader1: {
			url: '/EXAMUploader/uploader.js',
			beforeCreate: function () {
				var uploaderAreaNode = document.getElementById('UPLOADER_AREA');
				var uploaderFrame = document.createElement('iframe');
				uploaderFrame.id = 'uploader_holder';
				uploaderFrame.className = 'uploader_holder';
				uploaderFrame.width = '100%';
				uploaderFrame.height = '100%';
		    	
				uploaderAreaNode.appendChild(uploaderFrame);
			},
			create: function () {
				var uploaderPath = "http://localhost:8086/practiceBoard/EXAMUploader/uploaderHolder.html";
		        var uploaderServerPath = "http://localhost:8086/practiceBoard/usr/upload/server";
		        
		        EXAMUploader.drawUploaderHtml(uploaderPath, uploaderServerPath);
			}
		},
		uploader2: {
			url: '/raonkupload/js/raonkupload.js',
	        beforeCreate: function () {},
			create: function () {
				var raonkParam = {
					Id: "K_Uploader",
		            Width: '100%',
		            UploadHolder: "UPLOADER_AREA"  // UploadHolder를 지정해 주면 해당 id 태그에 업로더를 그린다.
		        }
				new RAONKUpload(raonkParam);
			}
		}
	};
	
	function drawProduct(genSet){
	    // 에디터 적용
	    var editorConfig = G_EditorConfig['editor' + genSet.editorNum];
	
	    editorConfig.beforeCreate();
	
	    var editorScript = document.createElement('script');
	    editorScript.src = contextpath + editorConfig.url;
	    editorScript.defer = "defer";
	    document.head.appendChild(editorScript);
	
	    editorScript.onload = function () {
	    	editorConfig.create();
	    };

	     // 업로더 적용
	    var uploaderConfig = G_UploaderConfig['uploader' + genSet.uploaderNum];
		
	    uploaderConfig.beforeCreate();
	
	    var uploaderScript = document.createElement('script');
	    uploaderScript.src = contextpath + uploaderConfig.url;
	    uploaderScript.defer = "defer";
	    document.head.appendChild(uploaderScript);
	
	    uploaderScript.onload = function () {
	    	uploaderConfig.create();
	    };
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
			<div id="EDITOR_AREA" class="EDITOR_AREA"></div>
			
			<!-- Uploader -->
			<div id="UPLOADER_AREA" class="UPLOADER_AREA"></div>
        	
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