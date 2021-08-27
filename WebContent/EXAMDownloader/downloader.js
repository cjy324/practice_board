/* DOWNLOADER */
// self close 함수
// 함수 사용 후 self close를 해서 불필요한 메모리 할당을 줄이는 목적으로 사용
(function () {
    // 다운로더 클래스
    var Downloader = function (){


        /* *************************************************************************** */
        
        /**** 전역변수 ****/
        this.usrDownloaderServerPath = "";  // 사용자 다운로더 서버 경로
        this.usrDownloadProgressPath ="";  // 사용자 다운로더 진행률 모니터링 요청 경로
        this.globalFileList = []; // 다운로드 파일 정보를 담아놓을 fileList
        // let forDownloadFilelistIndex = 0; 
        this.relId = 0; // 게시물 relId
        this.popupWindow = null;  // 프로그래스바 팝업 윈도우
        let progressPercentage = 0; // 다운로드 진행률
        this.indicator = "DEFUALT";  // 다운로더 상태를 알려주는 indicator
        // DEFUALT: 초기값, START: 시작, DONE: 종료, STOP: 중단, ERROR: 에러

        /**** 에러 관련 ****/
        var errorCode = "";
        var message = "";
        
        /* *************************************************************************** */
        

        /* 다운로더 그리기 */
        this.drawDownloaderHtml = function(usrDownloaderPath, usrDownloaderServerPath, usrDownloadProgressPath){
            var src = usrDownloaderPath;
            var downloaderHolderFrame = document.getElementById("downloader_holder");
            downloaderHolderFrame.src = src;
            EXAMDownloader.usrDownloaderServerPath = usrDownloaderServerPath;
            EXAMDownloader.usrDownloadProgressPath = usrDownloadProgressPath;  

            // 에러 함수 호출
            // 함수 존재여부 체크 참고: https://zzznara2.tistory.com/310
            if( typeof(window.EXAMDownloader_OnError) == 'function' ) {
                if(usrDownloaderPath == null || usrDownloaderPath.indexOf("downloaderHolder.html") == -1){
                    // JS에서 string 포함 여부 확인하는 방법
                    // 참고: https://han.gl/3jiPg
                    errorCode = "DEC_001"
                    message = "downloaderHolder.html의 경로를 확인해주세요."
                    window.EXAMDownloader_OnError(errorCode, message);
                }
                if(usrDownloaderServerPath == null || usrDownloaderServerPath == ""){
                    errorCode = "DEC_002"
                    message = "EXAMDownloader 서버 경로를 확인해주세요."
                    window.EXAMDownloader_OnError(errorCode, message);
                }
                if(usrDownloadProgressPath == null || usrDownloadProgressPath == ""){
                    errorCode = "DEC_003"
                    message = "EXAMDownloader 진행률 서버 경로를 확인해주세요."
                    window.EXAMDownloader_OnError(errorCode, message);
                }
            }
        }

        /* 단위변환 유틸 함수 */
        this.formatBytes = function(bytes, decimals) {
            if (bytes === 0) return '0 Bytes';
        
            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        
            const i = Math.floor(Math.log(bytes) / Math.log(k));
        
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        }

        /* 전체 선택/해제 */
        this.setAllCheckbox = function() {
            var componentWindow = document.getElementById("downloader_holder").contentWindow;
            var downFiles = componentWindow.document.getElementsByName("downFiles");
            if(downFiles.length > 0){
                var allCheckbox = componentWindow.document.getElementById("allCheckbox");
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

        /* globalFileList값 셋팅 및 downloadZone에 그리기 */
        this.setAndDrawDownloadFileList = function(fileList) {
            var componentWindow = document.getElementById("downloader_holder").contentWindow;
            var downloadZone = componentWindow.document.getElementById("downloadZone");
            var infoZone = componentWindow.document.getElementById("current_file_info");
            
            let forDownloadFileListLi = "";	// uploadedZone에 upload한 파일별 태그 생성
            if(fileList.length > 0){
                
                for(let i = 0; i < fileList.length; i++) {
                    forDownloadFileListLi += "<li>";
                    forDownloadFileListLi += "<input id='chk_file_" + [i] + "' type='checkbox' name='downFiles' value='false' checked>";
                    forDownloadFileListLi += "<span>" + fileList[i].name + "</span>";
                    forDownloadFileListLi += "<span> " + this.formatBytes(fileList[i].size, 2) + "</span>";
                    forDownloadFileListLi += "</li>";
                }

                downloadZone.innerHTML = forDownloadFileListLi;

                let filesSize = 0;
                let fileListInfo = "";
                    fileListInfo += "<span style='font-weight:bold; color: brown;'>";
                    fileListInfo += fileList.length;
                    fileListInfo += "</span>개 / ";
                    fileListInfo += "<span style='font-weight:bold; color: brown;'>";
                    for(let k = 0; k < fileList.length; k++){
                        filesSize += Number(fileList[k].size); 
                    }
                    fileListInfo += this.formatBytes(filesSize, 2);
                    fileListInfo += " </span>";

                infoZone.innerHTML = fileListInfo;
            }else{
                forDownloadFileListLi += "<li style='height: 100%; display: flex; justify-content: center; align-items: center;'>";
                forDownloadFileListLi += "<span style='position: inherit; font-weight: normal; color: blue; font-size: 12px;'>첨부 파일 없음</span>";
                forDownloadFileListLi += "</li>";
                
                downloadZone.innerHTML = forDownloadFileListLi;
            }

            // 파일리스트 셋팅
            EXAMDownloader.globalFileList = fileList;
        }

        /* 다운로드 시작("다운로드" 버튼 클릭시) */
        this.startDownload = function(forDownloadFilelistIndex) {

            EXAMDownloader.indicator = "START"; // DEFUALT: 초기값, START: 시작, DONE: 종료, STOP: 중단, ERROR: 에러

            var componentWindow = document.getElementById("downloader_holder").contentWindow;
            var downFiles = componentWindow.document.getElementsByName("downFiles");

            if(EXAMDownloader.globalFileList.length == 0){
                alert("첨부된 파일이 없습니다.")
                EXAMDownloader.indicator = "DONE"; // DEFUALT: 초기값, START: 시작, DONE: 종료, STOP: 중단, ERROR: 에러
                return;
            }

            let downloadTargetIndex = -1;
            let forDownloadFilelist = []; // 실제 다운로드를 진행할 파일들의 정보를 담을 리스트

            for(let i = 0; i < downFiles.length; i++){
                if(downFiles[i].checked){  // 체크된 파일만 필터링
                    downloadTargetIndex = Number(downFiles[i].id.split("_")[2]);
                    // 체크된 파일 index와 downloadFilelist의 파일 index가 일치하면 다운로드용 리스트에 새로 담기
                    for(let k = 0; k < EXAMDownloader.globalFileList.length; k++){
                        if(downloadTargetIndex == k){
                            forDownloadFilelist.push(EXAMDownloader.globalFileList[k]);
                        }
                    }
                }
            }

            if(forDownloadFilelist.length == 0){
                alert("선택된 파일이 없습니다.")
                EXAMDownloader.indicator = "DONE"; // DEFUALT: 초기값, START: 시작, DONE: 종료, STOP: 중단, ERROR: 에러
                return;
            }else{
                EXAMDownloader.createProgressBarWindow();
                EXAMDownloader.startIframRequestForDownload(forDownloadFilelist, forDownloadFilelistIndex);
            }
        }

        /* GUID 생성 함수 */
        this.createGuid = function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
            });
        }

        /* iframe으로 다운로드 요청 보내기 */
        this.startIframRequestForDownload = function(forDownloadFilelist, forDownloadFilelistIndex) {
            var componentWindow = document.getElementById("downloader_holder").contentWindow;
            var downlaodFrame = componentWindow.document.getElementById("download_frame");

            // 선택된 파일들에 대한 정보 URL로 담기
            // iframe에 URL 세팅
            let forDownloadServerUrl = EXAMDownloader.usrDownloaderServerPath + "?";
            let downFileGuid = EXAMDownloader.createGuid();

            forDownloadServerUrl += "guid=" + downFileGuid;
            forDownloadServerUrl += "&originName=" + forDownloadFilelist[forDownloadFilelistIndex].name;
            forDownloadServerUrl += "&originSize=" + forDownloadFilelist[forDownloadFilelistIndex].size;
            forDownloadServerUrl += "&originPath=" + forDownloadFilelist[forDownloadFilelistIndex].path;

            // iframe으로 서버에 요청 전송
            downlaodFrame.src = encodeURI(forDownloadServerUrl); // encodeURI 참고 : https://jamesdreaming.tistory.com/2

            // setInterval(타겟함수,설정시간) 함수는 주기적으로 인자를 실행하는 함수
            // 일정한 시간 간격으로 작업을 수행하기 위해서 사용
            // clearInterval 함수를 사용하여 중지
            // 지정된 작업은 모두 실행되고 다음 작업 스케쥴이 중지
            var startInterval = setInterval(function(){
                if(progressPercentage < 100 && EXAMDownloader.indicator != "ERROR"){  // 다운로드 진행률 값이 100보다 작으면..
                    EXAMDownloader.checkDownProgress(downFileGuid, forDownloadFilelist, forDownloadFilelistIndex);
                }else if(progressPercentage == 100 || EXAMDownloader.indicator == "ERROR"){  // 다운로드 진행률 값이 100이면...종료
                    clearInterval(startInterval);
                    progressPercentage = 0;
                    if(forDownloadFilelistIndex < forDownloadFilelist.length-1 && EXAMDownloader.indicator != "ERROR"){ // 아직 다운로드해야 할 파일이 남았는지 체크
                        forDownloadFilelistIndex++;
                        EXAMDownloader.startIframRequestForDownload(forDownloadFilelist, forDownloadFilelistIndex); // 다음 파일 다운로드 시작
                    }
                }
            }, 100);  // ex) 1초 = 1000

        }

        /* 현재 다운로드 진행률 모니터링 */
        this.checkDownProgress = function(downFileGuid, forDownloadFilelist, forDownloadFilelistIndex) {

            /* ajax통신 시작 */
            var xhttp = new XMLHttpRequest();
            // http 요청 타입 / 주소 / 동기식 여부 설정
            xhttp.open("POST", EXAMDownloader.usrDownloadProgressPath + "?guid=" + downFileGuid, true); // 메서드와 주소 설정    
            // http 요청
            xhttp.send();   // 요청 전송

            // XmlHttpRequest의 요청 // 통신 상태 모니터링
            xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
                var req = e.target;
    
                if(req.readyState === 4) {
                    if(req.status === 200) {
                        console.log("------통신 성공------");
                        if(xhttp.responseText.length > 10){  // 서버 로직수행 중 오류
                            EXAMDownloader.indicator = "ERROR"; // DEFUALT: 초기값, START: 시작, DONE: 종료, STOP: 중단, ERROR: 에러
                            // 에러 함수 호출
                            if( typeof(window.EXAMDownloader_OnError) == 'function' ) {
                                errorCode = "DEC_004"
                                message = "다운로드 서버 처리 과정 중 에러 발생.\nhttp status=" + req.status + "\nserver response=\n" + xhttp.responseText;
                                window.EXAMDownloader_OnError(errorCode, message);
                            }
                        }else if(xhttp.responseText == "NULL"){ // 실제 파일이 존재하지 않는 경우
                            EXAMDownloader.indicator = "ERROR"; // DEFUALT: 초기값, START: 시작, DONE: 종료, STOP: 중단, ERROR: 에러
                            // 에러 함수 호출
                            if( typeof(window.EXAMDownloader_OnError) == 'function' ) {
                                errorCode = "DEC_005"
                                message = "\"" + forDownloadFilelist[forDownloadFilelistIndex].name + "\" 파일이 존재하지 않습니다.\nhttp status=" + req.status;
                                window.EXAMDownloader_OnError(errorCode, message);
                            }
                        }else{
                            console.log("doneByte : " + xhttp.responseText);
                            progressPercentage = Number(xhttp.responseText);
                            EXAMDownloader.drawDownloadProgressBar(progressPercentage, forDownloadFilelist, forDownloadFilelistIndex);
                        }
                    }else{  // 통신 오류
                        console.error("------통신 실패------");
                        console.error("req.status: " + req.status);
                        console.error(xhttp.responseText);

                        EXAMDownloader.indicator = "ERROR"; // DEFUALT: 초기값, START: 시작, DONE: 종료, STOP: 중단, ERROR: 에러

                        // 에러 함수 호출
                        if( typeof(window.EXAMDownloader_OnError) == 'function' ) {
                            errorCode = "DEC_006"
                            message = "다운로드 진행률 모니터링 과정 중 에러 발생.\nhttp status=" + req.status + "\nserver response=\n" + xhttp.responseText;
                            window.EXAMDownloader_OnError(errorCode, message);
                        }
                    }
                }
            }
            /* ajax통신 끝 */
            
        }

        /* 다운로드 프로그래스바 팝업창 생성 */
        this.createProgressBarWindow = function() {

            // 팝업 창
            // 팝업옵션 설정
            var options = 'top=100, left=500, width=600, height=250';
            EXAMDownloader.popupWindow = window.open('about:blank', 'progress', options);

            let progressTag = "<div id='progressBarZone_down' style='width:100%; text-align:center;'>"
                            + "<p id='allFilesMessage_down' style='font-weight: bold;'></p>"
                            + "<span style='font-size: 14px;'>총 진행률</span>"
                            + "<progress id='allFilesProgressBar_down' value='0' max='100' style='width:50%'></progress>"
                            + "<br/><br/>"
                            + "<span style='font-size: 14px;'>파일별 진행률</span>"
                            + "<progress id='progressBar_down' value='0' max='100' style='width:50%'></progress>"
                            + "<p id='message_down'></p>"
                            + "</div>";

            // 팝업창에 HTML내용 넣기
            EXAMDownloader.popupWindow.document.write(progressTag);
            EXAMDownloader.popupWindow.document.close();
            
        }

        /* 다운로드 프로그래스바 그리기 */
        this.drawDownloadProgressBar = function(progressPercentage, forDownloadFilelist, forDownloadFilelistIndex) {

            var allFilesProgressBar_down = EXAMDownloader.popupWindow.document.getElementById("allFilesProgressBar_down");
            var progressBar_down = EXAMDownloader.popupWindow.document.getElementById("progressBar_down");
            var allFilesMessage_down = EXAMDownloader.popupWindow.document.getElementById("allFilesMessage_down");
            var message_down = EXAMDownloader.popupWindow.document.getElementById("message_down");

            progressBar_down.value = progressPercentage;
            progressBar_down.max = 100;
            message_down.textContent = "\"" + forDownloadFilelist[forDownloadFilelistIndex].name + "\"" + " file downloading...";
            allFilesProgressBar_down.value = (forDownloadFilelistIndex+1)/(forDownloadFilelist.length)*100;
            allFilesProgressBar_down.max = 100;

            if(progressPercentage == 100 && forDownloadFilelistIndex+1 == forDownloadFilelist.length){
                allFilesMessage_down.textContent = "ALL Files Download complete!!";
                message_down.textContent = "";
                EXAMDownloader.popupWindow.close(); // 팝업창 닫기
            }
        }
    }

    /* Downloader를 새 Object 객체 생성 */
    var EXAMDownloader = new Downloader();

    /* 최상위 window에 이 객체 지정하기 */
    top.EXAMDownloader = EXAMDownloader;

})()