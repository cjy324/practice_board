/* 사용자 커스텀 */
/* Modify */

// 게시물 id
let id = 0;
// DB에서 삭제할 첨부파일리스트
let forDeleteFileList = [];

let originBody = "";

// URL로 부터 게시물 ID값 가져오기
function getIdByUrl(){
    const url = window.location.href;
    return Number(url.split("?id=")[1]);
}

// 게시물 body 받아오기
function getBody(id){
    const xhttp = new XMLHttpRequest(); 
    // http 요청 타입 / 주소 / 동기식 여부 설정
    xhttp.open("POST", "http://localhost:8086/practiceBoard/usr/article/getBody?id=" + id, true); // 메서드와 주소 설정    
    // http 요청
    xhttp.send();   // 요청 전송

    xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
        const req = e.target;

        if(req.readyState === 4) {
            if(req.status === 200) {
                console.log("------통신 성공------");
                // DB로 부터 게시물 body 가져오기
                originBody = xhttp.responseText;
                setBody(originBody); // 게시물 body 그리기
            }else{
                console.error("------통신 실패------");
                console.error("req.status: " + req.status);
                console.error(xhttp.responseText);
            }
        }
    }
}


// 파일 로드
function fileLoad() {
    // 서버로 DB정보 요청
    /* ajax통신 시작 */
    var xhttp = new XMLHttpRequest();
    // http 요청 타입 / 주소 / 동기식 여부 설정
    xhttp.open("POST", "http://localhost:8086/practiceBoard/usr/download/loadFiles?relId=" + id, true); // 메서드와 주소 설정    
    // http 요청
    xhttp.send();   // 요청 전송

    // XmlHttpRequest의 요청 // 통신 상태 모니터링
    xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
        var req = e.target;

        if(req.readyState === 4) {
            if(req.status === 200) {
                console.log("------통신 성공------");
                attFileList = Object.keys(JSON.parse(xhttp.responseText)).map(function(i) { return JSON.parse(xhttp.responseText)[i]});
                
                if(attFileList.length !== 0){
                    if(GENSET.uploaderNum === 1){  //EXAM업로더
                        // 업로더 제품(가이드)
                        // 업로드 대상 리스트를 인수로 넘겨주어야 함
                        // 리스트 내 객체의 속성으로 (name, size, type, path, uploaded)가 필수로 들어가야 함
                        // 예시) 
                        // files[0] = {
                        //     name: "테스트파일.jpg",
                        //     size: 50000,
                        //     type: "image/png",
                        //     path: "경로",
                        //     uploaded: "true"
                        // }
                        EXAMUploader.showFiles(attFileList);

                    }else if(GENSET.uploaderNum === 2){
                        console.log("GENSET.uploaderNum: " + GENSET.uploaderNum)
                    }
                }
                console.log("------첨부파일 로드 완료------");
            }else{
                console.error("------통신 실패------");
                console.error("req.status: " + req.status);
                console.error(xhttp.responseText);
            }
        }
    }
    /* ajax통신 끝 */
}

// 게시물 body 그리기
function setBody(body){
    if(GENSET.editorNum === 1){  //EXAM업로더
        EXAMEditor.drawBodyContent(body);
    }
    fileLoad();
}

// K에디터로 편집영역에 body값 넣기
function RAONKEDITOR_CreationComplete() {
    var html = originBody;

    // editor1인 에디터 디자인 영역에 html 소스를 입력합니다.
    RAONKEDITOR.SetHtmlContents(html, 'K_Editor');
}

// K업로더로 기존 업로드 파일 리스트 그리기
function RAONKUPLOAD_CreationComplete(K_Uploader) {
    for(let i = 0; i < attFileList.length; i++){
        RAONKUPLOAD.AddUploadedFile('1', attFileList[i].name, attFileList[i].path, attFileList[i].size, 'CustomValue', K_Uploader);
    }
}

// 게시물 리스트페이지로 이동
function goToDetailPage(){
    // location.replace()와 location.href를 이용해서 페이지를 이동시킬 수 있다.
    // replace: 현재 페이지에 덮어씌우기 때문에 replace를 사용한 다음에는 이전 페이지로 돌아갈 수 없다.
    // href: 그대로 페이지 이동을 의미
    location.replace("http://localhost:8086/practiceBoard/usr/article/detail?id=" + id);
}

// textContent ajax 전송
function saveTextContentByAjax(textContent) {
    // ajax 통신을 하기 위한 XmlHttpRequest 객체 생성
    const xhttp = new XMLHttpRequest(); 
    // http 요청 타입 / 주소 / 동기식 여부 설정
    xhttp.open("POST", "http://localhost:8086/practiceBoard/usr/article/modifyContent?id=" + id, true); // 메서드와 주소 설정    
    // Header를 JSON으로 셋팅
    xhttp.setRequestHeader("Content-type", "application/json");
    // http 요청
    xhttp.send(textContent);   // 요청 전송(JSON 전송)

    xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
        const req = e.target;

        if(req.readyState === 4) {
            if(req.status === 200) {
                console.log("------통신 성공------");
                if(GENSET.uploaderNum === 1){  // EXAM 업로드
                    console.log("GENSET.uploaderNum: " + GENSET.uploaderNum);
                    EXAMUploader.setUploadFileList();  // 파일 업로드 시작
                }
                if(GENSET.uploaderNum === 2){  // K 업로드
                    console.log("GENSET.uploaderNum: " + GENSET.uploaderNum);
                    setUploadByKeditor()
                }
            }else{
                console.error("------통신 실패------");
                console.error("req.status: " + req.status);
                console.error(xhttp.responseText);
            }
        }
    }
}


// 첨부파일 매핑 및 DB에 저장
function articleAndAttchedFilesMappingByAjax(resultFileList, deleteFileList) {
    // ajax 통신을 하기 위한 XmlHttpRequest 객체 생성
    const xhttp = new XMLHttpRequest(); 
    // http 요청 타입 / 주소 / 동기식 여부 설정
    xhttp.open("POST", "http://localhost:8086/practiceBoard/usr/article/mappingFiles?relId=" + id, true); // 메서드와 주소 설정    
    // Header를 JSON으로 셋팅
    xhttp.setRequestHeader("Content-type", "application/json");
    // http 요청
    xhttp.send(JSON.stringify(resultFileList));   // 요청 전송(JSON 전송)

    xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
        const req = e.target;

        if(req.readyState === 4) {
            if(req.status === 200) {
                console.log("------통신 성공------");
                if(xhttp.responseText == "DONE"){
                    if(deleteFileList.length > 0){
                        delelteAttFilelistByAjax(deleteFileList)
                    }else{
                        alert(id + "번 게시물 수정 완료!!")
                        goToDetailPage();
                    }
                }
            }else{
                console.error("------통신 실패------");
                console.error("req.status: " + req.status);
                console.error(xhttp.responseText);
            }
        }
    }
}

// DB상에서 관련 파일정보 삭제
function delelteAttFilelistByAjax(deleteFileList){
    // ajax 통신을 하기 위한 XmlHttpRequest 객체 생성
    const xhttp = new XMLHttpRequest(); 
    // http 요청 타입 / 주소 / 동기식 여부 설정
    xhttp.open("POST", "http://localhost:8086/practiceBoard/usr/article/dlelateAttFiles?relId=" + id, true); // 메서드와 주소 설정    
    // Header를 JSON으로 셋팅
    xhttp.setRequestHeader("Content-type", "application/json");
    // http 요청
    xhttp.send(JSON.stringify(deleteFileList));   // 요청 전송(JSON 전송)

    xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
        const req = e.target;

        if(req.readyState === 4) {
            if(req.status === 200) {
                console.log("------통신 성공------");
                if(xhttp.responseText == "DONE"){
                    alert(id + "번 게시물 수정 완료!!")
                    goToDetailPage();
                }
            }else{
                console.error("------통신 실패------");
                console.error("req.status: " + req.status);
                console.error(xhttp.responseText);
            }
        }
    }
}

// 기존 업로드파일 삭제 시나리오별 처리
function checkScenarioAndDeleteFiles(resultFileList, forDeleteFileList){

    console.log("resultFileList: " + resultFileList)
    console.log("forDeleteFileList: " + forDeleteFileList)
    // 1. 업로드될 신규 파일이 있고 기존 삭제할 파일 있는 경우 
    if(resultFileList.length > 0 && forDeleteFileList.length > 0){
        for(let i = 0; i < resultFileList.length; i++){
            console.log(resultFileList[i]);
        }
        articleAndAttchedFilesMappingByAjax(resultFileList, forDeleteFileList);
    }// 2. 업로드될 신규 파일은 없고 기존 삭제할 파일 있는 경우 
    else if(resultFileList.length <= 0 && forDeleteFileList.length > 0){
        delelteAttFilelistByAjax(forDeleteFileList)
    }// 3. 업로드될 신규 파일은 있고 기존 삭제할 파일은 없는 경우
    else if(resultFileList.length > 0 && forDeleteFileList.length <= 0){
        var emptyList = [];
        articleAndAttchedFilesMappingByAjax(resultFileList, emptyList);
    }// 4. 둘 다 없는 경우 
    else if(resultFileList.length <= 0 && forDeleteFileList.length <= 0){
        alert(id + "번 게시물 수정 완료!!")
        goToDetailPage();
    }
}

// (가이드)업로드가 완료되면 이 함수가 호출됨
// 서버로 업로드가 완료된 파일리스트를 인수로 받을 수 있음
function EXAMUploader_UploadComplete(resultFileList) {
    // 사용자커스텀
    checkScenarioAndDeleteFiles(resultFileList, EXAMUploader.forDeleteFileList);
}

// 글 수정
function doModify() {
    // 제목 값 가져오기
    const titleInput = document.getElementById("titleInput");
    // 제목 값 가져오기
    const title = titleInput.value;

    if(title.trim() === ""){
        alert("제목을 입력해주세요.");
        return;
    }

    // 콜백함수
    // body값을 요청하는 함수 응답 이후에 진행되는 함수
    var afterGetBodyContents = function (body) {
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
        saveTextContentByAjax(textContent);
    };

    // EXAM
    if(GENSET.editorNum === 1){
        afterGetBodyContents(EXAMEditor.getBodyContent());
    }
    // RAONK
    else if(GENSET.editorNum === 2){
        // 라온K에디터의 경우
        // GetHtmlContents api가 비동기 방식이므로 동기방식 로직에 적용시 오류가 생긴다
        // 따라서 아래와 같이 콜백 개념으로 다음 로직을 짜야 비동기 방식으로 처리가 가능하다.
        var fn_callback = function (paramObj){
            afterGetBodyContents(paramObj.strData);
        };

        // GetHtmlContents api로 요청을 보내고 콜백함수로 content값을 리턴 받는 방식(비동기)
        // 따라서 다음 로직에 content값이 들어가지 않고 넘어가버릴 수 있음
        RAONKEDITOR.GetHtmlContents({type: 'body', callback: fn_callback}, "K_Editor")
    }
}


// 케이에디터 업로드된 리스트 가져오기
function RAONKUPLOAD_UploadComplete(K_Uploader) {
    // 업로드 완료 후 처리할 내용
    // 이 이벤트 함수 안에서 아래 API로 업로드된 정보를 추출합니다.
    // json, xml, array, text delimit 방식으로 결과값을 제공합니다.
    var resultFileList = RAONKUPLOAD.GetNewUploadList('array', K_Uploader);
    if(resultFileList == null){
        resultFileList = [];
    }
    // 업로드 완료 후 삭제된 파일 리스트에 대한 정보를 추출함.
    // 리턴받은 데이터에서 원하는 정보를 추출하는 방법은 kupload/sample/js/sample.common.js 에서 상세히 확인하실 수 있습니다.
    var forDeleteFileList = RAONKUPLOAD.GetDeleteList("array", K_Uploader);
    if(forDeleteFileList == null){
        forDeleteFileList = [];
    }

    // 사용자커스텀
    checkScenarioAndDeleteFiles(resultFileList, forDeleteFileList);

}

// 케이에디터로 업로드 시작
function setUploadByKeditor(){
    document.getElementById('raonkuploader_frame_K_Uploader').contentWindow.document.getElementById('button_send').click();
}