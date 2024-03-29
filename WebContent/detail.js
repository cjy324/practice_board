/** 사용자 커스텀 **/
/** Detail **/

/* 제품 그리기 */
function drawProduct(genSet){
    /* 다운로더 config 적용 */
    loadAndApplyProductConfig("downloader_" + genSet.downloaderNum);

    // 상세페이지 그리기
    id = getIdByUrl();
    // 게시물 body 요청하기
    getBody(id);
}

/* 첨부파일리스트 */
let attFileList = [];
/* 게시물 원본 body */
let body = "";

/* DB로부터 게시물 body 받아오기 */
function getBody(id){
    // http 요청 타입 / 주소 / 동기식 여부 설정
    xhttp.open("POST", "http://localhost:8086/practiceBoard/usr/article/getBody?id=" + id, true); // 메서드와 주소 설정    
    // http 요청
    xhttp.send();   // 요청 전송

    xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
        var req = e.target;

        if(req.readyState === 4) {
            if(req.status === 200) {
                // console.log("------getBody통신 성공------");
                // DB로 부터 게시물 body 가져오기
                body = xhttp.responseText;    
                setBody(body);
                fileLoad();
            }else{
                console.error("------통신 실패------");
                console.error("req.status: " + req.status);
                console.error(xhttp.responseText);
            }
        }
    }
}

/* 첨부 파일 로드 */
function fileLoad() {
    // 서버로 DB정보 요청
    // http 요청 타입 / 주소 / 동기식 여부 설정
    xhttp.open("POST", "http://localhost:8086/practiceBoard/usr/article/loadAttFiles?relId=" + id, true); // 메서드와 주소 설정    
    // http 요청
    xhttp.send();   // 요청 전송
    // XmlHttpRequest의 요청 // 통신 상태 모니터링
    xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
        var req = e.target;
        if(req.readyState === 4) {
            if(req.status === 200) {
                // console.log("------fileLoad통신 성공------");
                attFileList = Object.keys(JSON.parse(xhttp.responseText)).map(function(i) { return JSON.parse(xhttp.responseText)[i]});
                // console.log("------첨부파일 로드 완료------");
            }else{
                console.error("------통신 실패------");
                console.error("req.status: " + req.status);
                console.error(xhttp.responseText);
            }
        }
    }
    /* ajax통신 끝 */
}

/* 게시물 body 그리기 */
function setBody(body){
    document.getElementById("detail_body__content").innerHTML = body;
}

/* EXAM다운로더 */
/* 첨부파일 리스트 그리기 */
function EXAMDownloader_OnLoad(){
    // 다운로더 제품(가이드)
    // 다운로드 대상 리스트를 인수로 넘겨주어야 함
    // 리스트 내 객체의 속성으로 (name, size, type, path, uploaded)가 필수로 들어가야 함
    // 예시) 
    // files[0] = {
    //     name: "테스트파일.jpg",
    //     size: 50000,
    //     type: "image/png",
    //     path: "경로",
    //     uploaded: "true"
    // }
    EXAMDownloader.setAndDrawDownloadFileList(attFileList);
}

/* K다운로더 */
/* 첨부파일 리스트 그리기 */
function RAONKUPLOAD_CreationComplete(K_Downloader) {
    for(let i = 0; i < attFileList.length; i++){
        RAONKUPLOAD.AddUploadedFile('1', attFileList[i].name, attFileList[i].path, attFileList[i].size, 'CustomValue', K_Downloader);
    }
}