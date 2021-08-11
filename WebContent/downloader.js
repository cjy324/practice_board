// self close 함수
// 함수 사용 후 self close를 해서 불필요한 메모리 할당을 줄이는 목적으로 사용
// 현재 페이지 URL값 가져오는 함수

(function () {
    /* ----- 주요 전역 변수 모음 ----- */
    let globalFileList = [];  // 업로드/다운로드 fileList를 담을 배열
    const xhttp = new XMLHttpRequest(); // ajax 통신을 하기 위한 XmlHttpRequest 객체 생성
    /* ----- 주요 전역 변수 모음 ----- */

    // 게시물 id
    let id = 0;

    // URL로 부터 게시물 ID값 가져오기
    function getIdByUrl(){
        const url = window.location.href;
        return Number(url.split('?id=')[1]);
    }

    // GUID 생성 함수
    function createGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
        });
    }

    // URL로 부터 게시물 ID값 가져오기
    id = document.body.onload = getIdByUrl();


    /* -------------------------------------------------------------------------------------------------------------- */


    /* Editor */
    
    const Editor = function() {

        // 게시물 body 받아오기
        this.getBody = function(){
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
                        const body = xhttp.responseText;
                        EXAMEditor.setBody(body); // 게시물 body 그리기
                    }else{
                        console.error("------통신 실패------");
                        console.error("req.status: " + req.status);
                        console.error(xhttp.responseText);
                    }
                }
            }
        }

        // 게시물 body 그리기
        this.setBody = function(body){
            document.getElementById('detail_body__content').innerHTML = body;
            EXAMDownloader.fileLoad();
        }
    }

    // Editor를 새 Object 객체 생성
    const EXAMEditor = new Editor();

    // windows에 이 객체 지정하기
    window.EXAMEditor = EXAMEditor;

    // 게시물 body 가져오기
    document.body.onload = EXAMEditor.getBody;

    /* -------------------------------------------------------------------------------------------------------------- */
    /* 다운로더 */

    // 태그 가져오기
    const downlaodFrame = document.getElementById("download_frame");
    const downloadZone = document.getElementById("downloadZone");
    const downFiles = document.getElementsByName("downFiles");
    const infoZone = document.getElementById("current_file_info");
    const progressBarZone_down = document.getElementById("progressBarZone_down");
    const allFilesProgressBar_down = document.getElementById("allFilesProgressBar_down");
    const progressBar_down = document.getElementById("progressBar_down");
    const allFilesMessage_down = document.getElementById("allFilesMessage_down");
    const message_down = document.getElementById("message_down");

    // let globalFileList = []; // 다운로드 파일 정보를 담아놓을 전역변수(삭제)
    let forDownloadFilelistIndex = 0;

    // 다운로드 진행률
    let progressPercentage = 0;

    // 다운로더 클래스화??
    const Downloader = function (){
        
        // DB로 요청 후에 이미 파일 정보를 가져왔다고 가정..
        // 파일 정보 가져와 다운로드 대상리스트 태그 그리기
        // 파일 정보를 가져와서 전역변수에 담아놓기
        this.fileLoad = function() {
            
            // 서버로 DB정보 요청
            /* ajax통신 시작 */
            // http 요청 타입 / 주소 / 동기식 여부 설정
            xhttp.open("POST", "http://localhost:8086/practiceBoard/usr/download/loadFiles?relId=" + id, true); // 메서드와 주소 설정    
            // http 요청
            xhttp.send();   // 요청 전송
    
            // XmlHttpRequest의 요청 // 통신 상태 모니터링
            xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
                const req = e.target;
    
                if(req.readyState === 4) {
                    if(req.status === 200) {
                        console.log("------통신 성공------");
                        // console.log("globalFileList : " + Object.values(JSON.parse(xhttp1.responseText)));
                        // JSON 형태로 온 값을 Object형태로 변경 후 globalFileList로 옮겨 담기
                        globalFileList = Object.values(JSON.parse(xhttp.responseText));  
                        if(globalFileList.length !== 0){
                            EXAMDownloader.drawDownloadFileList(globalFileList);
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

        // 전체 선택/해제
        this.setAllCheckbox = function() {
            if(downFiles.length > 0){
                const allCheckbox = document.getElementById("allCheckbox");
                if(allCheckbox.checked){
                    for(let i = 0; i < downFiles.length; i++){
                        downFiles[i].checked = true;
                    }
                }else{
                    for(let i = 0; i < downFiles.length; i++){
                        downFiles[i].checked = false;
                    }
                }
            }  
        }

        // downloadZone에 그리기
        this.drawDownloadFileList = function(globalFileList) {
            let forDownloadFileListLi = "";	// uploadedZone에 upload한 파일별 태그 생성
            
            for(let i = 0; i < globalFileList.length; i++) {
                forDownloadFileListLi += "<li>";
                forDownloadFileListLi += "<input id='chk_file_" + [i] + "' type='checkbox' name='downFiles' value='false' checked>";
                forDownloadFileListLi += "<span>" + globalFileList[i].name + "</span>";
                forDownloadFileListLi += "<span> " + globalFileList[i].size + " Byte</span>";
                forDownloadFileListLi += "</li>";
            }

            downloadZone.innerHTML = forDownloadFileListLi;

            let filesSize = 0;
            let fileListInfo = "";
                fileListInfo += "<span>";
                fileListInfo += globalFileList.length;
                fileListInfo += "</span>개 , ";
                fileListInfo += "<span>";
                for(let k = 0; k < globalFileList.length; k++){
                    filesSize += Number(globalFileList[k].size); 
                }
                fileListInfo += filesSize;
                fileListInfo += " byte </span>";

            infoZone.innerHTML = fileListInfo;
        }

        // 다운로드 시작("다운로드" 버튼 클릭시)
        this.startDownload = function(forDownloadFilelistIndex) {

            let downloadTargetIndex = -1;
            let forDownloadFilelist = []; // 실제 다운로드를 진행할 파일들의 정보를 담을 리스트

            for(let i = 0; i < downFiles.length; i++){
                if(downFiles[i].checked){  // 체크된 파일만 필터링
                    downloadTargetIndex = Number(downFiles[i].id.split("_")[2]);
                    // 체크된 파일 index와 downloadFilelist의 파일 index가 일치하면 다운로드용 리스트에 새로 담기
                    for(let k = 0; k < globalFileList.length; k++){
                        if(downloadTargetIndex == k){
                            forDownloadFilelist.push(globalFileList[k]);
                        }
                    }
                }
            }
            if(forDownloadFilelist.length == 0){
                alert("선택된 파일이 없습니다.")
                return;
            }else{
                this.startIframRequestForDownload(forDownloadFilelist, forDownloadFilelistIndex);
            }
        }

        // iframe으로 다운로드 요청 보내기
        this.startIframRequestForDownload = function(forDownloadFilelist, forDownloadFilelistIndex) {
            // 선택된 파일들에 대한 정보 URL로 담기
            // iframe에 URL 세팅
            let forDownloadUrl = "http://localhost:8086/practiceBoard/usr/download/server?";
            let downFileGuid = createGuid();

            forDownloadUrl += "index=" + forDownloadFilelistIndex;
            forDownloadUrl += "&guid=" + downFileGuid;
            forDownloadUrl += "&originName=" + forDownloadFilelist[forDownloadFilelistIndex].name;
            forDownloadUrl += "&originSize=" + forDownloadFilelist[forDownloadFilelistIndex].size;
            forDownloadUrl += "&originPath=" + forDownloadFilelist[forDownloadFilelistIndex].path;
            forDownloadUrl += "&originType=" + forDownloadFilelist[forDownloadFilelistIndex].type;

            downlaodFrame.src = encodeURI(forDownloadUrl); // encodeURI 참고 : https://jamesdreaming.tistory.com/2

            // setInterval(타겟함수,설정시간) 함수는 주기적으로 인자를 실행하는 함수
            // 일정한 시간 간격으로 작업을 수행하기 위해서 사용
            // clearInterval 함수를 사용하여 중지
            // 지정된 작업은 모두 실행되고 다음 작업 스케쥴이 중지
            const startInterval = setInterval(function(){
                if(progressPercentage < 100){  // 다운로드 진행률 값이 100보다 작으면..
                    EXAMDownloader.checkDownProgress(downFileGuid, forDownloadFilelist, forDownloadFilelistIndex);
                }else if(progressPercentage == 100){  // 다운로드 진행률 값이 100이면...종료
                    clearInterval(startInterval);
                    if(forDownloadFilelistIndex < forDownloadFilelist.length-1){ // 아직 다운로드해야 할 파일이 남았는지 체크
                        progressPercentage = 0;
                        forDownloadFilelistIndex++;
                        EXAMDownloader.startIframRequestForDownload(forDownloadFilelist, forDownloadFilelistIndex); // 다음 파일 다운로드 시작
                    }
                }
            }, 100);  // ex) 1초 = 1000

        }

        // 현재 다운로드 진행률 모니터링
        this.checkDownProgress = function(downFileGuid, forDownloadFilelist, forDownloadFilelistIndex) {

            /* ajax통신 시작 */
            // http 요청 타입 / 주소 / 동기식 여부 설정
            xhttp.open("POST", "http://localhost:8086/practiceBoard/usr/download/progress?guid=" + downFileGuid, true); // 메서드와 주소 설정    
            // http 요청
            xhttp.send();   // 요청 전송

            // XmlHttpRequest의 요청 // 통신 상태 모니터링
            xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
                const req = e.target;
    
                if(req.readyState === 4) {
                    if(req.status === 200) {
                        console.log("------통신 성공------");
                        console.log("doneByte : " + xhttp.responseText);
                        progressPercentage = Number(xhttp.responseText);
                        //this.drawDownloadProgressBar(progressPercentage, forDownloadFilelist, forDownloadFilelistIndex);
                    }else{
                        console.error("------통신 실패------");
                        console.error("req.status: " + req.status);
                        console.error(xhttp.responseText);
                    }
                }
            }
            /* ajax통신 끝 */
            
        }

        // 다운로드 프로그래스바 그리기
        this.drawDownloadProgressBar = function(progressPercentage, forDownloadFilelist, forDownloadFilelistIndex) {
            
            progressBar_down.value = progressPercentage;
            progressBar_down.max = 100;
            message_down.textContent = "\"" + forDownloadFilelist[forDownloadFilelistIndex].name + "\"" + " file downloading...";
            allFilesProgressBar_down.value = (forDownloadFilelistIndex+1)/(forDownloadFilelist.length)*100;
            allFilesProgressBar_down.max = 100;

            if(progressPercentage == 100 && forDownloadFilelistIndex+1 == forDownloadFilelist.length){
                allFilesMessage_down.textContent = "ALL Files Download complete!!";
                message_down.textContent = "";
            }
        }
    }

    // Downloader를 새 Object 객체 생성
    const EXAMDownloader = new Downloader();

    // windows에 이 객체 지정하기
    window.EXAMDownloader = EXAMDownloader;

})()

