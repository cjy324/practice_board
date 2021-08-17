/* EDITOR */
// self close 함수
// 함수 사용 후 self close를 해서 불필요한 메모리 할당을 줄이는 목적으로 사용
(function () {  
    // 에디터 클래스
    var Editor = function() {
        // 에디터 그리기
        this.drawEditorHtml = function(){
            var src = "http://localhost:8086/practiceBoard/EXAMEditor/editorHolder.html"
            var editorHolderFrame = document.getElementById("editor_holder");
            editorHolderFrame.src = src;
        }

        // 편집영역에 컨텐츠 그리기
        this.drawBodyContent = function(bodyContent){
            var editorHolderFrameWindow = document.getElementById("editor_holder").contentWindow;
            var editWindow = editorHolderFrameWindow.document.getElementById('edit_frame').contentWindow;
            document.getElementById("editor_holder").addEventListener("load", function(e) {
                editWindow.document.getElementById('edit_area').innerHTML = bodyContent;
            })
        }

        // autoFocus 기능
        this.autoFocus = function() {
            var editorHolderFrameWindow = document.getElementById("editor_holder").contentWindow;
            var editWindow = editorHolderFrameWindow.document.getElementById('edit_frame').contentWindow;
            editWindow.document.getElementById('edit_area').focus();
        }

        // caret 저장
        let selection; //selection, range 도입
        let range;  //range : 현재 커서가 위치한 node 정보와 위치 index 값이 저장되어 있음
        document.getElementById("editor_holder").addEventListener("load", function(e) {
            var editorHolderFrameWindow = document.getElementById("editor_holder").contentWindow;
            var editWindow = editorHolderFrameWindow.document.getElementById('edit_frame').contentWindow;
            editorHolderFrameWindow.document.getElementById('uploadBtnLabel').addEventListener('mouseover', function(e){
                selection = editWindow.document.getSelection();
                range = selection.getRangeAt(0);
            })
        })

        // p태그 자동 생성
        document.getElementById('editor_holder').addEventListener("load", function(e) {
            var editorHolderFrameWindow = document.getElementById("editor_holder").contentWindow;
            var editWindow = editorHolderFrameWindow.document.getElementById('edit_frame').contentWindow;
            editWindow.addEventListener('keyup', function(e){
                var editArea = editWindow.document.getElementById('edit_area')
                if(editArea.lastElementChild == null){
                    var pTag = editWindow.document.createElement('p')
                    editArea.appendChild(pTag)
                    var brTag = editWindow.document.createElement('br')
                    editArea.getElementsByTagName('p')[0].appendChild(brTag)
                }
            })
        })

        // 새 문서 기능
        this.newPage = function() {
            var answer = confirm('작성중인 문서가 삭제됩니다. 계속하시겠습니까?');
            if(answer){
                EXAMEditor.setStyle('selectAll', null);
                EXAMEditor.setStyle('removeFormat', null);
                EXAMEditor.setStyle('delete', null);
                EXAMEditor.autoFocus();
            }
        }

        // select 버튼
        document.getElementById('editor_holder').addEventListener("load", function(e) {
            var editorHolderFrameWindow = document.getElementById("editor_holder").contentWindow;

            var btnFontType = editorHolderFrameWindow.document.getElementById('font_type');
            var btnFontSize = editorHolderFrameWindow.document.getElementById('font_size');
            var btnFontColor = editorHolderFrameWindow.document.getElementById('font_color');

            // select 버튼별 이벤트 적용
            btnFontType.addEventListener('change', function (e) {
                EXAMEditor.setStyle('fontName', e.target.value)
            })
            btnFontSize.addEventListener('change', function (e) {
                EXAMEditor.setStyle('fontSize', e.target.value)
            })
            btnFontColor.addEventListener('change', function (e) {
                EXAMEditor.setStyle('foreColor', e.target.value)
            })
        })           
                
        // 버튼별 서식 적용
        this.setStyle = function(style, value) {
            var editorHolderFrameWindow = document.getElementById("editor_holder").contentWindow;
            var editWindow = editorHolderFrameWindow.document.getElementById('edit_frame').contentWindow;
            if(value != null){
                editWindow.document.execCommand(style, false, value);
            }
            else{
                editWindow.document.execCommand(style);
            }
            EXAMEditor.autoFocus()  // 서식 적용 후에도 커서 위치 유지하도록 적용
        }

        // 미리보기 창
        this.showPreview = function(){
            var editorHolderFrameWindow = document.getElementById("editor_holder").contentWindow;
            var editWindow = editorHolderFrameWindow.document.getElementById('edit_frame').contentWindow;
            // 현재 document 내 iframe에 입력된 HTML 가져오기
            var editedContent = editWindow.document.getElementById('edit_area').innerHTML;

            // 팝업옵션 설정
            var options = 'top=100, left=500, width=800, height=800';
            var preview = window.open('about:blank', 'preview', options);

            // 팝업창에 HTML내용 넣기
            preview.document.write(editedContent);
            preview.document.close();
        }

        // 이미지 업로드용 전역 변수
        var imageFileList = [];
        var imageFileListIndex = 0;

        // 이미지 업로드("이미지"버튼 클릭시)
        this.doUpload = function(e){
             // Input으로부터 추가된 FileList를 기존 globalFileList에 추가
            for(let i = 0; i < e.target.files.length; i++){
                imageFileList.push(e.target.files[i]);
            }
            EXAMEditor.doUploadImgAjax(imageFileList, imageFileListIndex)
        };

        // 이미지 업로드 ajax
        this.doUploadImgAjax = function(imageFileList, imageFileListIndex){
            var formData = new FormData()
            formData.append("imgFiles", imageFileList[imageFileListIndex]);
            // ajax를 하기 위한 XmlHttpRequest 객체
            var xhttp = new XMLHttpRequest();
            // http 요청 타입 / 주소 / 동기식 여부 설정
            xhttp.open("POST", "http://localhost:8086/practiceBoard/usr/upload/imageUpload", true); // 메서드와 주소 설정
            // http 요청
            xhttp.send(formData);   // 요청 전송
            // XmlHttpRequest의 요청
            xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
                // XMLHttpRequest를 이벤트 파라미터에서 취득
                var req = e.target;
                let imagePath = "";

                // 통신 상태가 완료가 되면...
                if(req.readyState === XMLHttpRequest.DONE) {    // 요청이 완료되면
                    // Http response 응답코드가 200(정상)이면..
                    if(req.status === 200) {
                        if(imageFileList.length == 1){
                            imagePath = req.responseText;
                            // img 태그 생성  
                            EXAMEditor.drawImg(imagePath);
                            // IE상에서 focus 위치를 잡지 못해 다시 focus를 잡아주어야 함
                            EXAMEditor.setFocusForIE();
                        }else if(imageFileList.length > 1 && imageFileListIndex < imageFileList.length-1){ // 만약, index가 imageFileList.length 보다 작으면
                            imagePath = req.responseText; 
                            // img 태그 생성
                            EXAMEditor.drawImg(imagePath);

                            imageFileListIndex++; // index 1 증가
                            EXAMEditor.doUploadImgAjax(imageFileList, imageFileListIndex);
                        }else{
                            imagePath = req.responseText;  
                            // img 태그 생성  
                            EXAMEditor.drawImg(imagePath);
                            // IE상에서 focus 위치를 잡지 못해 다시 focus를 잡아주어야 함
                            EXAMEditor.setFocusForIE();
                        } 
                    }else{
                        console.error(xhttp.responseText)
                    }
                }
            } 
        }

        // 이미지 그리기
        this.drawImg = function(imagePath){
            var editorHolderFrameWindow = document.getElementById("editor_holder").contentWindow;
            var editWindow = editorHolderFrameWindow.document.getElementById('edit_frame').contentWindow;
            // img 태그 생성
            var newImg = editWindow.document.createElement("img");
            // img 태그의 속성 설정 
            newImg.src = imagePath;
            var newImgWidth = prompt('가로 길이를 입력해 주세요.(단위: px)');
            newImg.width = newImgWidth;
            // img 태그의 속성 설정 완료 후 커서 위치에 img node 삽입
            range.insertNode(newImg);
        }

        // IE상에서 커서 위치 포커싱
        this.setFocusForIE = function(){
            var editorHolderFrameWindow = document.getElementById("editor_holder").contentWindow;
            var editWindow = editorHolderFrameWindow.document.getElementById('edit_frame').contentWindow;
            EXAMEditor.autoFocus();
            selection = editWindow.document.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }

        // 글 body값 가져오기
        this.getBodyContent = function(){
            var editorHolderFrameWindow = document.getElementById("editor_holder").contentWindow;
            var editWindow = editorHolderFrameWindow.document.getElementById('edit_frame').contentWindow;
            return editWindow.document.getElementById('edit_area').innerHTML;
        }

    }

    // Editor를 새 Object 객체 생성
    var EXAMEditor = new Editor();
    // 최상위 windows에 이 객체 지정하기
    top.EXAMEditor = EXAMEditor;
    
})()
