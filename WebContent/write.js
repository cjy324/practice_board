/** 사용자 커스텀 **/
/** Write **/

/* 제품 그리기 */
function drawProduct(genSet){
    /* 에디터 config 적용 */
    loadAndApplyProductConfig("editor_" + genSet.editorNum);
    /* 업로더 config 적용 */
    loadAndApplyProductConfig("uploader_" + genSet.uploaderNum);
}

/* text content */
let textContent = {
    title: "",
    body: ""
}

/* 게시물 저장 및 첨부파일 맵핑 */
function articleSaveAndAttchedFilesMappingByAjax(resultFileList) {
    // // ajax 통신을 하기 위한 XmlHttpRequest 객체 생성
    // const xhttp = new XMLHttpRequest(); 
    // http 요청 타입 / 주소 / 동기식 여부 설정
    xhttp.open("POST", "http://localhost:8086/practiceBoard/usr/article/saveContent", true); // 메서드와 주소 설정    
    // Header를 JSON으로 셋팅
    xhttp.setRequestHeader("Content-type", "application/json");
    // 텍스트정보와 파일정보를 data에 담기
    let data = {
        textContent: textContent,
        resultFileList: resultFileList
    }
    // http 요청
    xhttp.send(JSON.stringify(data));   // 요청 전송(JSON 전송)

    xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
        const req = e.target;

        if(req.readyState === 4) {
            if(req.status === 200) {
                // console.log("------통신 성공------");
                // 생성된 신규 게시물 ID값 받기
                id = Number(xhttp.responseText);
                alert(id + "번 게시물 작성 완료!!")
                goToDetailPage(id);
            }else{
                console.error("------통신 실패------");
                console.error("req.status: " + req.status);
                console.error(xhttp.responseText);
            }
        }
    }
}

/* EXAM업로더 */
/* 완료된 업로드리스트 받기 */
function EXAMUploader_UploadComplete(resultFileList) {
    // (가이드)업로드가 완료되면 이 함수가 호출됨
    // 서버로 업로드가 완료된 파일리스트를 인수로 받을 수 있음

    // (사용자커스텀) 게시물저장 및 첨부파일 맵핑
    articleSaveAndAttchedFilesMappingByAjax(resultFileList);
}
/* EXAM업로더 */
/* 업로드 중단 event시 msg와 파일정보 받기 */
function EXAMUploader_UploadInterruption(msg, interruptedFile) {
    alert(msg);
    console.log(interruptedFile);
}

/* K업로더 */
// K업로더로 업로드 시작
function uploadByKUploader(){
    document.getElementById('raonkuploader_frame_K_Uploader').contentWindow.document.getElementById('button_send').click()
}
/* K업로더 */
/* 완료된 업로드리스트 받기 */
function RAONKUPLOAD_UploadComplete(K_Uploader) {
    // 업로드 완료 후 처리할 내용
    // 이 이벤트 함수 안에서 아래 API로 업로드된 정보를 추출합니다.
    // json, xml, array, text delimit 방식으로 결과값을 제공합니다.

    var resultFileList = RAONKUPLOAD.GetNewUploadList('array', K_Uploader);
    
    if(resultFileList == null){
        resultFileList = [];
    }

    // (사용자커스텀) 게시물저장 및 첨부파일 맵핑
    articleSaveAndAttchedFilesMappingByAjax(resultFileList);

}

/* 첨부파일 업로드 시작 */
function startAttFilesUpload(){
    if(GENSET.uploaderNum === 1){  // EXAM업로더
        EXAMUploader.setUploadFileList();  // 파일 업로드 시작
    }
    if(GENSET.uploaderNum === 2){  // K업로더
        uploadByKUploader();  // 파일 업로드 시작
    } 
}

/* 글 작성(버튼 클릭 시) */
function doWrite() {

    // 제목 값 가져오기
    var titleInput = document.getElementById("titleInput");
    // 제목 값 가져오기
    var title = titleInput.value;

    if(title.trim() === ""){
        alert("제목을 입력해주세요.");
        return;
    }

    // 콜백함수
    // body값을 요청하는 함수 응답 이후에 진행되는 함수
    var afterGetBodyContents = function(body) {
        
        // 공백체크
        if(isBodyEmpty(body)){
            alert("내용을 입력해주세요.");
            return;
        }

        // textContent 전역객체에 정보 담기
        textContent.title = title;
        textContent.body = body;
    
        // 업로드 시작
        startAttFilesUpload();
    };

    // EXAM에디터
    if(GENSET.editorNum === 1){
        afterGetBodyContents(EXAMEditor.getBodyContent());
    }
    // K에디터
    else if(GENSET.editorNum === 2){
        // 라온K에디터의 경우
        // GetHtmlContents api가 비동기 방식이므로 동기방식 로직에 적용시 오류가 생긴다
        // 따라서 아래와 같이 콜백 개념으로 다음 로직을 짜야 비동기 방식으로 처리가 가능하다.
        var fn_callback = function(paramObj){
            afterGetBodyContents(paramObj.strData);
        };

        // GetHtmlContents api로 요청을 보내고 콜백함수로 content값을 리턴 받는 방식(비동기)
        // 따라서 다음 로직에 content값이 들어가지 않고 넘어가버릴 수 있음
        RAONKEDITOR.GetHtmlContents({type: 'body', callback: fn_callback}, "K_Editor")
    }
}
