// self close 함수
// 함수 사용 후 self close를 해서 불필요한 메모리 할당을 줄이는 목적으로 사용
(function () {
    /* Editor */

    // 에디터 클래스
    const Editor = function() {
  
        // iframe window 가져오기
	    const editWindow = document.getElementById('edit_frame').contentWindow;
	    // 제목 값 가져오기
	    const titleInput = document.getElementById("titleInput");


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

        // 에디터 첫 로드 시 자동 포커스
        editWindow.addEventListener('load', function(){
            EXAMEditor.autoFocus();
        })

        // autoFocus 기능
        this.autoFocus = function() {
            editWindow.document.getElementById('edit_area').focus();
        }

        // 새 문서 기능
        this.newPage = function() {
            const answer = confirm('작성중인 문서가 삭제됩니다. 계속하시겠습니까?');
            if(answer){
                EXAMEditor.setStyle('selectAll', null);
                EXAMEditor.setStyle('removeFormat', null);
                EXAMEditor.setStyle('delete', null);
                EXAMEditor.autoFocus();
            }
        }

        // 버튼별 서식 적용
        this.setStyle = function(style, value) {
            if(value != null){
                editWindow.document.execCommand(style, false, value);
            }
            else{
                editWindow.document.execCommand(style);
            }
            EXAMEditor.autoFocus()  //서식 적용 후에도 커서 위치 유지하도록 적용
        }

        // 미리보기 창
        this.showPreview = function(){
            // 현재 document 내 iframe에 입력된 HTML 가져오기
            const editedContent = editWindow.document.getElementById('edit_area').innerHTML;

            // 팝업옵션 설정
            const options = 'top=100, left=500, width=800, height=800';
            const preview = window.open('about:blank', 'preview', options);

            // 팝업창에 HTML내용 넣기
            preview.document.write(editedContent);
            preview.document.close();
        }

        // 이미지 업로드용 전역 변수
        const imageFileList = [];
        const imageFileListIndex = 0;

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
            const formData = new FormData()
            formData.append("imgFiles", imageFileList[imageFileListIndex]);
            // ajax를 하기 위한 XmlHttpRequest 객체
            const xhttp = new XMLHttpRequest();
            // http 요청 타입 / 주소 / 동기식 여부 설정
            xhttp.open("POST", "http://localhost:8086/practiceBoard/usr/upload/imageUpload", true); // 메서드와 주소 설정
            // http 요청
            xhttp.send(formData);   // 요청 전송
            // XmlHttpRequest의 요청
            xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
                // XMLHttpRequest를 이벤트 파라미터에서 취득
                const req = e.target;
                let imagePath = "";

                // 통신 상태가 완료가 되면...
                if(req.readyState === XMLHttpRequest.DONE) {    // 요청이 완료되면
                    // Http response 응답코드가 200(정상)이면..
                    if(req.status === 200) {
                        if(imageFileList.length == 1){
                            imagePath = req.responseText;
                            // img 태그 생성  
                            EXAMEditor.drawImag(imagePath);
                            // IE상에서 focus 위치를 잡지 못해 다시 focus를 잡아주어야 함
                            EXAMEditor.setFocusForIE();
                        }
                        else if(imageFileList.length > 1 && imageFileListIndex < imageFileList.length-1){ // 만약, index가 imageFileList.length 보다 작으면
                            imagePath = req.responseText; 
                            // img 태그 생성
                            EXAMEditor.drawImag(imagePath);

                            imageFileListIndex++; // index 1 증가
                            EXAMEditor.doUploadImgAjax(imageFileList, imageFileListIndex);
                        }else{
                            imagePath = req.responseText;  
                            // img 태그 생성  
                            EXAMEditor.drawImag(imagePath);
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
        this.drawImag = function(imagePath){
            // img 태그 생성
            const newImg = editWindow.document.createElement("img");
            // img 태그의 속성 설정 
            newImg.src = imagePath;
            const newImgWidth = prompt('가로 길이를 입력해 주세요.(단위: px)');
            newImg.width = newImgWidth;
            // img 태그의 속성 설정 완료 후 커서 위치에 img node 삽입
            range.insertNode(newImg);
        }

        // IE상에서 커서 위치 포커싱
        this.setFocusForIE = function(){
            EXAMEditor.autoFocus();
            selection = editWindow.document.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }

        // 글 작성
        this.doWrite = function() {
            // 제목 값 가져오기
            const title = titleInput.value;

            if(title.trim() === ""){
                alert("제목을 입력해주세요.");
                return;
            }

            // 내용 값 가져오기
            const body = EXAMEditor.getBodyContent();

            if(body.trim() === "<p><br></p>"){
                alert("내용을 입력해주세요.");
                return;
            }

            // JSON 형태로 담기
            let textContent = {
                title: title,
                body: body
            }
            textContent = JSON.stringify(textContent);

            // ajax통신 시작
            EXAMEditor.saveByAjax(textContent);
            
        }

        // 글 body값 가져오기
        this.getBodyContent = function(){
            return editWindow.document.getElementById('edit_area').innerHTML;
        }

        // textContent ajax 전송
        this.saveByAjax = function(textContent) {
            // ajax 통신을 하기 위한 XmlHttpRequest 객체 생성
            const xhttp = new XMLHttpRequest(); 
            // http 요청 타입 / 주소 / 동기식 여부 설정
            xhttp.open("POST", "http://localhost:8086/practiceBoard/usr/article/saveContent", true); // 메서드와 주소 설정    
            // Header를 JSON으로 셋팅
            xhttp.setRequestHeader('Content-type', 'application/json');
            // http 요청
            xhttp.send(textContent);   // 요청 전송(JSON 전송)

            xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
                const req = e.target;

                if(req.readyState === 4) {
                    if(req.status === 200) {
                        console.log("------통신 성공------");
                        // 생성된 신규 게시물 ID값 받기
                        id = Number(xhttp.responseText);
                        console.log("id : " + id);
                        EXAMUploader.setUploadFileList(id)  // 파일 업로드 시작
                    }else{
                        console.error("------통신 실패------");
                        console.error("req.status: " + req.status);
                        console.error(xhttp.responseText);
                    }
                }
            }

        }

        
    }

    // Editor를 새 Object 객체 생성
    const EXAMEditor = new Editor();
    // windows에 이 객체 지정하기
    window.EXAMEditor = EXAMEditor;

    // select 버튼
    const btnFontType = document.getElementById('font_type');
    const btnFontSize = document.getElementById('font_size');
    const btnFontColor = document.getElementById('font_color');

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



    
})()