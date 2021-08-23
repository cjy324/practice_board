/* 사용자 커스텀 */
/* Write */

let id = 0;

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
    xhttp.open("POST", "http://localhost:8086/practiceBoard/usr/article/saveContent", true); // 메서드와 주소 설정    
    // Header를 JSON으로 셋팅
    xhttp.setRequestHeader("Content-type", "application/json");
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

                if(GENSET.uploaderNum === 1){  // EXAM 업로드
                    console.log("GENSET.uploaderNum: " + GENSET.uploaderNum);
                    EXAMUploader.setUploadFileList();  // 파일 업로드 시작
                }
                if(GENSET.uploaderNum === 2){  // K 업로드
                    console.log("GENSET.uploaderNum: " + GENSET.uploaderNum);
                    setUploadByKeditor()
                }
                return;
                
            }else{
                console.error("------통신 실패------");
                console.error("req.status: " + req.status);
                console.error(xhttp.responseText);
            }
        }
    }

    // // 업로드 상태 모니터링
    // const startInterval = setInterval(function(){
    //     if(EXAMUploader.indicator === "STOP"){
    //         alert("업로드 중단");
    //         clearInterval(startInterval);
    //         return;
    //     }
    //     if(EXAMUploader.indicator === "DONE"){
    //         alert(id + "번 게시물 작성 완료!!!");
    //         clearInterval(startInterval);
    //         goToDetailPage();
    //     }
    // }, 100);  // ex) 1초 = 1000
}

// 첨부파일 매핑 및 DB에 저장
function articleAndAttchedFilesMappingByAjax(resultFileList) {
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
                    alert(id + "번 게시물 작성 완료!!")
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

// (가이드)업로드가 완료되면 이 함수가 호출됨
// 서버로 업로드가 완료된 파일리스트를 인수로 받을 수 있음
function EXAMUploader_UploadComplete(resultFileList) {
    if(resultFileList.length > 0){
        for(let i = 0; i < resultFileList.length; i++){
            console.log(resultFileList[i]);
        }
        // 사용자커스텀
        articleAndAttchedFilesMappingByAjax(resultFileList);
    }else{
        alert(id + "번 게시물 작성 완료!!")
        goToDetailPage();
    }
}

// 글 작성
function doWrite() {

    console.log(typeof(EXAMEditor))
    console.log(typeof(RAONKEditor))
    console.log(GENSET.editorNum)
    console.log(GENSET.uploaderNum)
    console.log(GENSET.downloaderNum)

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

function RAONKUPLOAD_UploadComplete(K_Uploader) {
    // 업로드 완료 후 처리할 내용
    // 이 이벤트 함수 안에서 아래 API로 업로드된 정보를 추출합니다.
    // json, xml, array, text delimit 방식으로 결과값을 제공합니다.

    var resultFileList = RAONKUPLOAD.GetNewUploadList('array', K_Uploader);
    if(resultFileList.length > 0){
        for(let i = 0; i < resultFileList.length; i++){
            console.log(resultFileList[i]);
        }
        // 사용자커스텀
        articleAndAttchedFilesMappingByAjax(resultFileList);
    }else{
        alert(id + "번 게시물 작성 완료!!")
        goToDetailPage();
    }

}

// 케이에디터로 업로드
function setUploadByKeditor(){
    document.getElementById('raonkuploader_frame_K_Uploader').contentWindow.document.getElementById('button_send').click()
}