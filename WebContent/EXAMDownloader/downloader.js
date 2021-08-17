/* DOWNLOADER */
// self close 함수
// 함수 사용 후 self close를 해서 불필요한 메모리 할당을 줄이는 목적으로 사용
(function () {
    // 다운로더 클래스
    var Downloader = function (){
        // 다운로더 그리기
        this.drawDownloaderHtml = function(){
            var src = "http://localhost:8086/practiceBoard/EXAMDownloader/downloaderHolder.html"
            var downloaderHolderFrame = document.getElementById("downloader_holder");
            downloaderHolderFrame.src = src;
        }

        /* *************************************************************************** */
        
        // 전역변수
        this.globalFileList = []; // 다운로드 파일 정보를 담아놓을 fileList
        // let forDownloadFilelistIndex = 0; 
        this.relId = 0; // 게시물 relId
        this.popupWindow = null;  // 프로그래스바 팝업 윈도우
        let progressPercentage = 0; // 다운로드 진행률
        
        /* *************************************************************************** */
        
        
        // 파일 로드
        this.fileLoad = function(id) {
            EXAMDownloader.relId = id;
            // 서버로 DB정보 요청
            /* ajax통신 시작 */
            var xhttp = new XMLHttpRequest();
            // http 요청 타입 / 주소 / 동기식 여부 설정
            xhttp.open("POST", "http://localhost:8086/practiceBoard/usr/download/loadFiles?relId=" + EXAMDownloader.relId, true); // 메서드와 주소 설정    
            // http 요청
            xhttp.send();   // 요청 전송
    
            // XmlHttpRequest의 요청 // 통신 상태 모니터링
            xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
                var req = e.target;
    
                if(req.readyState === 4) {
                    if(req.status === 200) {
                        console.log("------통신 성공------");
                        // console.log("globalFileList : " + Object.values(JSON.parse(xhttp1.responseText)));
                        // JSON 형태로 온 값을 Object형태로 변경 후 globalFileList로 옮겨 담기
                        // EXAMDownloader.globalFileList = Object.values(JSON.parse(xhttp.responseText));  
                        
                        // 21.08.17 IE 호환을 위한 로직 수정
                        // Internet Explorer(이하 IE) 11 이하버전에서 스크립트 객체에 키를 구하는 함수는 사용이 되나
                        // 그 값을 구하는 함수는 오류가 발생한다.
                        // var keys = Object.keys(parameters); // 오류 발생 안함
                        // var values = Object.values(parameters); // 오류 발생. "개체가 'values' 속성이나 메서드를 지원하지 않습니다."
                        // 출처: https://sehoonkim.tistory.com/246 [Think Different]
                        EXAMDownloader.globalFileList = Object.keys(JSON.parse(xhttp.responseText)).map(function(i) { return JSON.parse(xhttp.responseText)[i]});
                        
                        if(EXAMDownloader.globalFileList.length !== 0){
                            EXAMDownloader.drawDownloadFileList(EXAMDownloader.globalFileList);
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

        // downloadZone에 그리기
        this.drawDownloadFileList = function(globalFileList) {
            var componentWindow = document.getElementById("downloader_holder").contentWindow;
            var downloadZone = componentWindow.document.getElementById("downloadZone");
            var infoZone = componentWindow.document.getElementById("current_file_info");
            
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
            var componentWindow = document.getElementById("downloader_holder").contentWindow;
            var downFiles = componentWindow.document.getElementsByName("downFiles");

            if(EXAMDownloader.globalFileList.length == 0){
                alert("첨부된 파일이 없습니다.")
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
                return;
            }else{
                EXAMDownloader.createProgressBarWindow();
                EXAMDownloader.startIframRequestForDownload(forDownloadFilelist, forDownloadFilelistIndex);
            }
        }

        // GUID 생성 함수
        this.createGuid = function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
            });
        }

        // iframe으로 다운로드 요청 보내기
        this.startIframRequestForDownload = function(forDownloadFilelist, forDownloadFilelistIndex) {
            var componentWindow = document.getElementById("downloader_holder").contentWindow;
            var downlaodFrame = componentWindow.document.getElementById("download_frame");

            // 선택된 파일들에 대한 정보 URL로 담기
            // iframe에 URL 세팅
            let forDownloadUrl = "http://localhost:8086/practiceBoard/usr/download/server?";
            let downFileGuid = EXAMDownloader.createGuid();

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
            var startInterval = setInterval(function(){
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
            var xhttp = new XMLHttpRequest();
            // http 요청 타입 / 주소 / 동기식 여부 설정
            xhttp.open("POST", "http://localhost:8086/practiceBoard/usr/download/progress?guid=" + downFileGuid, true); // 메서드와 주소 설정    
            // http 요청
            xhttp.send();   // 요청 전송

            // XmlHttpRequest의 요청 // 통신 상태 모니터링
            xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
                var req = e.target;
    
                if(req.readyState === 4) {
                    if(req.status === 200) {
                        console.log("------통신 성공------");
                        console.log("doneByte : " + xhttp.responseText);
                        progressPercentage = Number(xhttp.responseText);
                        EXAMDownloader.drawDownloadProgressBar(progressPercentage, forDownloadFilelist, forDownloadFilelistIndex);
                    }else{
                        console.error("------통신 실패------");
                        console.error("req.status: " + req.status);
                        console.error(xhttp.responseText);
                    }
                }
            }
            /* ajax통신 끝 */
            
        }

        // 다운로드 프로그래스바 창 생성
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

        // 다운로드 프로그래스바 그리기
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

    // Downloader를 새 Object 객체 생성
    var EXAMDownloader = new Downloader();

    // 최상위 window에 이 객체 지정하기
    top.EXAMDownloader = EXAMDownloader;

})()