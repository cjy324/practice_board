/* UPLOADER */
// self close 함수
// 함수 사용 후 self close를 해서 불필요한 메모리 할당을 줄이는 목적으로 사용
(function () {
    /*** 업로더 클래스 ***/
        // 참고: https://mygumi.tistory.com/312
        // 자바스크립트에서 프로토타입은 자신을 만들어낸 객체의 원형을 뜻한다.
        // Prototype Link - 자신을 만들어낸 객체의 원형
        // Prototype Object - 자신을 통해 만들어질 객체의 원형
    var Uploader = function (){
        

        /* *************************************************************************** */

        /**** 전역변수 ****/
        this.usrServerPath = "";  // 사용자 업로더 서버 경로
        this.forDeleteFilePath = "";  // 서버상 업로더된 파일들을 삭제하기 위한 경로
        this.globalFileList = [];  // 업로드/다운로드 fileList를 담을 배열
        this.uploadCompleteList = []  // 업로드 완료 파일리스트
        this.relId = 0;  // 게시물 id
        this.totalNum = 0;  // 업로드 대기리스트 수
        this.totalSize = 0;  // 업로드 대기리스트 용량
        this.popupWindow = null;  // 프로그래스바 팝업 윈도우
        this.forUploadFileList = [];  // 실제 업로드될 리스트(실제 선택된 파일들을 담을)
        this.forUploadFileListIndex = 0;  // 업로드를 위한 파일 인덱스
        this.forDeleteFileList = [];  // 수정모드에서 기존 업로드되었던 파일을 삭제할 경우 실제 파일도 삭제하기 위해 이 배열도 필요
        this.forDeleteFileIndex = 0;  // 수정모드에서 삭제될 파일 인덱스
        this.indicator = "DEFUALT";  // 업로더 상태를 알려주는 indicator
        // DEFUALT: 초기값, START: 시작, DONE: 종료, STOP: 중단, ERROR: 에러

        /**** 에러 관련 ****/
        var errorCode = "";
        var message = "";

        /* *************************************************************************** */


        /* 업로더 그리기 */
        this.drawUploaderHtml = function(usrUploaderPath, usrServerPath){
            var src = usrUploaderPath;
            var uploaderHolderFrame = document.getElementById("uploader_holder");

            uploaderHolderFrame.src = src;
            EXAMUploader.usrServerPath = usrServerPath;

            // 에러 함수 호출
            // 함수 존재여부 체크 참고: https://zzznara2.tistory.com/310
            if( typeof(window.EXAMUploader_OnError) == 'function' ) {
                if(usrUploaderPath == null || usrUploaderPath.indexOf("uploaderHolder.html") == -1){
                    // JS에서 string 포함 여부 확인하는 방법
                    // 참고: https://han.gl/3jiPg
                    errorCode = "UEC_001"
                    message = "uploaderHolder.html의 경로를 확인해주세요."
                    window.EXAMUploader_OnError(errorCode, message, EXAMUploader.uploadCompleteList, EXAMUploader.forDeleteFileList);
                }
                if(usrServerPath == null || usrServerPath == ""){
                    errorCode = "UEC_002"
                    message = "EXAMUploader 서버 경로를 확인해주세요."
                    window.EXAMUploader_OnError(errorCode, message, EXAMUploader.uploadCompleteList, EXAMUploader.forDeleteFileList);
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

        /* 버튼으로 파일추가input 불러오기 */
        this.selectFiles = function() {
            var componentWindow = document.getElementById('uploader_holder').contentWindow;
            var fileInput = componentWindow.document.getElementById("fileInput");
            fileInput.click();
        }

        /* Drag & Drop */
        document.getElementById('uploader_holder').addEventListener("load", function(e) {
            var componentWindow = document.getElementById('uploader_holder').contentWindow;
            var uploadZone = componentWindow.document.getElementById("uploadZone");
            // 드래그한 파일이 최초로 uploadZone에 진입했을 때
            uploadZone.addEventListener("dragenter", function(e) {
                e.stopPropagation();
                e.preventDefault();
            })
            // 드래그한 파일이 uploadZone을 벗어났을 때
            uploadZone.addEventListener("dragleave", function(e) {
                e.stopPropagation();
                e.preventDefault();
            })
            // 드래그한 파일이 uploadZone에 머물러 있을 때
            uploadZone.addEventListener("dragover", function(e) {
                e.stopPropagation();
                e.preventDefault();
            })
            // 드래그한 파일이 uploadZone에 드랍되었을 때
            uploadZone.addEventListener("drop", function(e) {
                e.preventDefault();
                
                var droppedFiles = e.dataTransfer && e.dataTransfer.files;
                console.log("droppedFiles: " + droppedFiles);
                
                if (droppedFiles != null) {
                    // 만약 files의 갯수가 1보다 작으면 "폴더 업로드 불가" 알림
                    if (droppedFiles.length < 1) {
                        alert("폴더 업로드 불가");
                        return;
                    }
                    if((EXAMUploader.totalNum + droppedFiles.length) > 20){
                        alert("최대 업로드 가능 갯수 초과(최대: 20개)");
                        return;
                    }
        
                    let filesSize = 0;
                    for(let i = 0; i < droppedFiles.length; i++){
                        filesSize += Number(droppedFiles[i].size); 
                    }
        
                    if((EXAMUploader.totalSize + filesSize) > 314572800){
                        alert("최대 업로드 가능 용량 초과(최대: 300MB)");
                        return;
                    }

                    // uploadZone에 드랍된 파일들로 파일리스트 세팅
                    for(let i = 0; i < droppedFiles.length; i++){
                        EXAMUploader.globalFileList.push(droppedFiles[i]);
                    }
                    EXAMUploader.showFiles(EXAMUploader.globalFileList);
                } else {
                    alert("ERROR");
                }
            })
        })

        /* 업로드 될 파일리스트 그리기 */
        this.showFiles = function(files) {
            var componentWindow = document.getElementById('uploader_holder').contentWindow;
            var uploadZone = componentWindow.document.getElementById("uploadZone");
            var infoZone = componentWindow.document.getElementById("current_file_info");
            let fileListLi = "";	// dropZone에 drop한 파일별 태그 생성
        
            for(let i = 0; i < files.length; i++) {
                fileListLi += "<li>";
                fileListLi += "<input id='chk_file_" + [i] + "' type='checkbox' value='false' name='uploadFiles' checked>";
                fileListLi += "<span>" + files[i].name + "</span>";
                fileListLi += "<span> " + this.formatBytes(files[i].size, 2) + "</span>";
                fileListLi += "</li>";
            }
            
            uploadZone.innerHTML = fileListLi;

            let filesSize = 0;
            let fileListInfo = "";
                fileListInfo += "<span style='font-weight:bold; color: brown;'>";
                fileListInfo += files.length;
                fileListInfo += "</span>개 / ";
                fileListInfo += "<span style='font-weight:bold; color: brown;'>";
                for(let k = 0; k < files.length; k++){
                    filesSize += Number(files[k].size); 
                    EXAMUploader.totalNum++;
                }
                fileListInfo += this.formatBytes(filesSize, 2);
                fileListInfo += " </span>";
                fileListInfo += "<span>추가됨</span>";

            EXAMUploader.totalSize = filesSize;
            

            infoZone.innerHTML = fileListInfo;

            if(files.length == 0){
                let uploadZoneMessage = "";
                uploadZoneMessage += "<li style='height:100%; display: flex; justify-content: center; align-items: center;'>";
                uploadZoneMessage += "<span style='position: inherit; font-weight: normal; color: blue; font-size: 12px;'>이곳에 파일을 Drag & Drop 하세요.</span>";
                uploadZoneMessage += "</li>";
                
                uploadZone.innerHTML = uploadZoneMessage; 
            }

            // 파일리스트 셋팅
            EXAMUploader.globalFileList = files;
        }

        /* 파일 업로드를 위한 데이터 셋팅(from Input) */
        this.setUploadFiles = function(e) {

            if((EXAMUploader.totalNum + e.target.files.length) > 20){
                alert("최대 업로드 가능 갯수 초과(최대: 20개)");
                return;
            }

            let filesSize = 0;
            for(let i = 0; i < e.target.files.length; i++){
                filesSize += Number(e.target.files[i].size); 
            }

            if((EXAMUploader.totalSize + filesSize) > 314572800){
                alert("최대 업로드 가능 용량 초과(최대: 300MB)");
                return;
            }

            // Input으로부터 추가된 FileList를 기존 globalFileList에 추가
            for(let i = 0; i < e.target.files.length; i++){
                EXAMUploader.globalFileList.push(e.target.files[i]);
            }
            // input에 파일이 들어오면 dropZone에 업로드 될 파일리스트 그리기
            EXAMUploader.showFiles(EXAMUploader.globalFileList);
        }

        /* 전체 선택/해제 */
        this.setAllCheckbox = function() {
            var componentWindow = document.getElementById('uploader_holder').contentWindow;
            var uploadFiles = componentWindow.document.getElementsByName("uploadFiles");
            if(uploadFiles.length > 0){
                var allCheckbox = componentWindow.document.getElementById("allCheckbox");
                if(allCheckbox.checked){
                    for(let i = 0; i < uploadFiles.length; i++){
                        uploadFiles[i].checked = true;
                    }
                }else{
                    for(let i = 0; i < uploadFiles.length; i++){
                        uploadFiles[i].checked = false;
                    }
                }
            }  
        }

        /* 선택된 파일 삭제 */
        this.removeSelectedFiles = function() {
            var componentWindow = document.getElementById('uploader_holder').contentWindow;
            var uploadFiles = componentWindow.document.getElementsByName("uploadFiles");

            if(confirm("정말 삭제하시겠습니까?") == false){
                return;
            }
    
            let removeTargetIndex = -1;
            let tempArray = [];  
    
            // FileList 객체는 Array 객체가 아니므로 splice()함수를 쓸 수 없음
            // 따라서 splice()를 사용하기 위해 임시로 FileList를 Array로 담아서 진행
            for(let x = 0; x < EXAMUploader.globalFileList.length; x++){
                tempArray.push(EXAMUploader.globalFileList[x]);
            }
    
            // 1. tempArray 내 체크된 파일 원소의 내용만 삭제(빈 공간만 남음, index는 유지됨)
            for(let i = 0; i < uploadFiles.length; i++){
                if(uploadFiles[i].checked){  // 체크된 파일만 필터링
                    removeTargetIndex = Number(uploadFiles[i].id.split("_")[2]);
                    
                    for(let k = 0; k < tempArray.length; k++){
                        if(removeTargetIndex == k){  // 체크된 파일 index와 tempArray의 index가 일치하면.....
                            console.log("tempArray[k].uploaded : " + tempArray[k].uploaded);
                            if(tempArray[k].uploaded){  // 1. 기존 업로드됐던 파일인 경우 실제 파일도 삭제하기 위해 forDeleteFileList에 정보 담아두기
                                EXAMUploader.forDeleteFileList.push(tempArray[k]);  
                                console.log(k + " file pushed to 'forDeleteFileList'");
                            }
                            delete tempArray[k]; // 2. tempArray의 index가 removeTargetIndex인 원소의 내용 삭제(빈 공간만 남음)
                            console.log(k + " file delete")
                        }
                    }
                }
            }
            console.log("EXAMUploader.forDeleteFileList.length: " + EXAMUploader.forDeleteFileList.length)
    
            // 2. tempArray 내 비어있는 요소 삭제(공간까지 삭제, index가 순차적으로 변경됨)
            for(let y = 0; y < tempArray.length; y++){
                if(tempArray[y] === undefined){
                    tempArray.splice(y, 1);
                    y--;
                }
            }
    
            // 다시 원래대로 FileLiet 객체 형태로 담기
            EXAMUploader.globalFileList = tempArray;
    
            // 만약, removeTargetIndex가 여전히 -1이면, 
            // 즉, 선택된 파일이 없으면...
            if(removeTargetIndex == -1){
                alert("선택된 파일이 없습니다.");
                return;
            }
            
            EXAMUploader.showFiles(EXAMUploader.globalFileList);
        }

        /* 전체 파일 선택 및 삭제 */
        this.selectAllFilesAndRemove = function() {
            var componentWindow = document.getElementById('uploader_holder').contentWindow;
            var uploadFiles = componentWindow.document.getElementsByName("uploadFiles");
            for(let i = 0; i < uploadFiles.length; i++){
                uploadFiles[i].checked = true;
            }
            EXAMUploader.removeSelectedFiles();
        }

        /* 선택된 업로드 파일 담기("전송하기" 버튼 클릭) */
        this.setUploadFileList = function() {

            // 업로드 중단, 에러 등으로 업로드중이던 파일 중복 업로드되지 않도록 초기화
            EXAMUploader.forUploadFileList = [];
            EXAMUploader.uploadCompleteList = [];

            // 새로 업로드될 파일리스트만 forUploadFileList에 담기
            for(let i = 0; i < EXAMUploader.globalFileList.length; i++){
                if(EXAMUploader.globalFileList[i].uploaded === undefined){
                    EXAMUploader.forUploadFileList.push(EXAMUploader.globalFileList[i])
                }
            }

            // console.log("EXAMUploader.globalFileList.length: " + EXAMUploader.globalFileList.length)
            // console.log("EXAMUploader.forUploadFileList.length: " + EXAMUploader.forUploadFileList.length)

            // 업로드 시나리오별 필터링
            if(EXAMUploader.globalFileList.length > 0 && EXAMUploader.forUploadFileList.length == 0){  // 1. 신규 업로드될 파일이 없는 경우
                if(EXAMUploader.forDeleteFileList.length > 0){ // 신규 업로드될 파일이 없지만 기존 업로드된 파일 중 삭제할 파일이 있는 경우
                    EXAMUploader.deleteFiles(EXAMUploader.forDeleteFileIndex);
                    return;
                }
                // 업로드 완료 함수 호출
                // 함수 존재여부 체크 참고: https://zzznara2.tistory.com/310
                if( typeof(window.EXAMUploader_UploadComplete) == 'function' ) {
                    window.EXAMUploader_UploadComplete(EXAMUploader.uploadCompleteList);
                }
                // EXAMUploader.indicator = "DONE";  // DEFUALT: 초기값, START: 시작, DONE: 종료, STOP: 중단, ERROR: 에러
                return;
            }else if(EXAMUploader.forUploadFileList.length == 0){  // 2. 선택된 파일이 없는 경우
                if(EXAMUploader.forDeleteFileList.length > 0){ // 선택된 파일이 없지만 기존 업로드된 파일 중 삭제할 파일이 있는 경우
                    EXAMUploader.deleteFiles(EXAMUploader.forDeleteFileIndex);
                    return;
                }
                // 업로드 완료 함수 호출
                if( typeof(window.EXAMUploader_UploadComplete) == 'function' ) {
                    window.EXAMUploader_UploadComplete(EXAMUploader.uploadCompleteList);
                }
                // EXAMUploader.indicator = "DONE";  // DEFUALT: 초기값, START: 시작, DONE: 종료, STOP: 중단, ERROR: 에러
                return;
            }else{                                // 3. 신규 업로드할 파일이 있는 경우
                if(EXAMUploader.forDeleteFileList.length > 0){ // 신규 업로드될 파일이 있고 기존 업로드된 파일 중 삭제할 파일이 있는 경우
                    EXAMUploader.deleteFiles(EXAMUploader.forDeleteFileIndex);
                }else{  // 신규 업로드될 파일이 있고 기존 업로드된 파일 중 삭제할 파일이 없는 경우
                    EXAMUploader.createProgressBarWindow();
                    EXAMUploader.startUpload(EXAMUploader.forUploadFileListIndex);
                }
            }
        }

        /* 기존 업로드된 파일 삭제 */
        this.deleteFiles = function(forDeleteFileIndex){
            // console.log("forDeleteFileIndex: " + forDeleteFileIndex)
            var params = "path="+ encodeURI(EXAMUploader.forDeleteFileList[forDeleteFileIndex].path);

            EXAMUploader.startDeleteAjax(params, forDeleteFileIndex);
        }

        /* 기존 업로드된 파일 삭제를 위한 ajax통신 */
        this.startDeleteAjax = function(params, forDeleteFileIndex){
            /* ajax통신 시작 */
            var xhttp = new XMLHttpRequest();
            // http 요청 타입 / 주소 / 동기식 여부 설정
            xhttp.open("POST", EXAMUploader.forDeleteFilePath + "?" + params, true); // 메서드와 주소 설정    
            // http 요청
            xhttp.send();   // 요청 전송
            // XmlHttpRequest의 요청 // 통신 상태 모니터링
            xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
                var req = e.target;
                
                if(req.readyState === 4) {
                    if(req.status === 200) {
                        console.log("------통신 성공------");
                        if(forDeleteFileIndex < EXAMUploader.forDeleteFileList.length-1){ // 만약, index가 forDeleteFileList.length 보다 작으면
                            forDeleteFileIndex++; // index 1 증가
                            EXAMUploader.deleteFiles(forDeleteFileIndex);
                        }else if(forDeleteFileIndex >= EXAMUploader.forDeleteFileList.length-1 && EXAMUploader.forUploadFileList.length > 0){
                            EXAMUploader.createProgressBarWindow();
                            EXAMUploader.startUpload(EXAMUploader.forUploadFileListIndex);
                        }else{
                            EXAMUploader.indicator = "DONE";  // DEFUALT: 초기값, START: 시작, DONE: 종료, STOP: 중단, ERROR: 에러
                            // 업로드 완료 함수 호출
                            if( typeof(window.EXAMUploader_UploadComplete) == 'function' ) {
                                window.EXAMUploader_UploadComplete(EXAMUploader.uploadCompleteList);
                            }   
                        } 
                    }else{
                        console.error("------통신 실패------");
                        console.error("req.status: " + req.status);
                        console.error(xhttp.responseText);

                        // 에러 함수 호출
                        if( typeof(window.EXAMUploader_OnError) == 'function' ) {
                            errorCode = "UEC_004"
                            message = "기존 파일 삭제 과정 중 에러 발생.\nhttp status=" + req.status + "\nserver response=\n" + xhttp.responseText;
                            window.EXAMUploader_OnError(errorCode, message, EXAMUploader.uploadCompleteList, EXAMUploader.forDeleteFileList);
                        }
                    }
                }
            }
            /* ajax통신 끝 */
        }

        /* 업로드 프로그래스바 창 생성 */
        this.createProgressBarWindow = function() {
            // 팝업 창
            // 팝업옵션 설정
            var options = 'top=100, left=500, width=600, height=250';
            EXAMUploader.popupWindow = window.open('about:blank', 'progress', options);
        
            let progressTag = "<div id='progressBarZone' style='width:100%; text-align:center;'>"
                            + "<p id='allFilesMessage' style='font-weight: bold;'></p>"
                            + "<span style='font-size: 14px;'>총 진행률</span>"
                            + "<progress id='allFilesProgressBar' value='0' max='100' style='width:50%'></progress>"
                            + "<br/><br/>"
                            + "<span style='font-size: 14px;'>파일별 총 진행률</span>"
                            + "<progress id='allProgressBar' value='0' max='100' style='width:50%'></progress>"
                            + "<p id='allMessage'></p>"
                            + "<span style='font-size: 14px;'>분할파일별 진행률</span>"
                            + "<progress id='progressBar' value='0' max='100' style='width:50%'></progress>"
                            + "<p id='message'></p>"
                            + "</div>";

            // 팝업창에 HTML내용 넣기
            EXAMUploader.popupWindow.document.write(progressTag);
            EXAMUploader.popupWindow.document.close();
        }

        /* GUID 생성 함수 */
        this.createGuid = function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
            });
        }

        /* 파일 업로드 시작 */
        this.startUpload = function(forUploadFileListIndex) {

            EXAMUploader.indicator = "START";  // DEFUALT: 초기값, START: 시작, DONE: 종료, STOP: 중단, ERROR: 에러
            // console.log("startUpload--------------- forUploadFileListIndex: " + forUploadFileListIndex + " ---------------");  

            // 단일 파일 제한 용량 설정
            // 참고: Tomcat은 기본적으로 Post로 전송할 데이터의 크기를 최대2MB까지 Default로 잡고있다.(https://youngram2.tistory.com/110)
            var limitSize = 1 * 1024 * 1024;  // Byte // 약 1MB
            
            // 분할한 파일을 담을 배열 객체
            var slicedFiles = [];
            // 분할 전송시 사용할 index
            let slicedFileIndex = 0;

            /* 분할 시작 */
            // 만약, 파일용량이 제한용량보다 크면
            if(EXAMUploader.forUploadFileList[forUploadFileListIndex].size >= limitSize){ 
                // 용량에 따른 분할 수 계산
                var slicedFilesNum = Math.ceil(EXAMUploader.forUploadFileList[forUploadFileListIndex].size / limitSize); 
                // console.log("slicedFilesNum: " + slicedFilesNum);
                // 파일 분할
                for(let f = 0; f < slicedFilesNum; f++){
                    // 각 분할 횟수별 분할 시작 포인트 설정
                    var startPoint = limitSize * f;
                    // slice(시작점, 자를점, Type)로 파일 분할
                    var slicedFile = EXAMUploader.forUploadFileList[forUploadFileListIndex].slice(startPoint, startPoint + limitSize, EXAMUploader.forUploadFileList[forUploadFileListIndex].type);
                    // 분할된 파일 slicedFiles 배열 객체에 담기
                    slicedFiles.push(slicedFile);
                }
                // console.log("slicedFiles : " + slicedFiles);
                // console.log("slicedFiles.length : " + slicedFiles.length);
                
            }
            /* 분할 끝 */

            // 기본 파라미터 정보 담기
            let params = "&limitSize=" + limitSize;
                params += "&originName=" + EXAMUploader.forUploadFileList[forUploadFileListIndex].name;
                params += "&originSize=" + EXAMUploader.forUploadFileList[forUploadFileListIndex].size;
                params += "&originType=" + EXAMUploader.forUploadFileList[forUploadFileListIndex].type;

            /* 단일 파일일 경우 단일 전송 시작 */
            if(slicedFiles.length == 0){
                // console.log("------단일 파일 전송 시작------");

                // params 추가 정보 담기
                params += "&sliced=false";
                params += "&guid=" + "0";
                params += "&slicedFilesLength=" + 0;
                
                // ajax통신 시작
                EXAMUploader.startAjax(slicedFiles, slicedFileIndex, "0", params, EXAMUploader.forUploadFileList, forUploadFileListIndex);

            /* 단일 파일 전송 끝 */
            }
            
            /* 분할 파일일 경우 분할 전송 시작 */
            if(slicedFiles.length > 0){
                // console.log("------분할 파일 전송 시작------");

                let guid = EXAMUploader.createGuid();
            
                /* 로컬스토리지에 저장된 기존 업로드 중단된 파일 정보들 확인 시작 */
                // Key: "resume_upload_" + guid
                // Vlaue: guid + "__" + slicedFileIndex + "__" + globalFileList[forUploadFileListIndex].name + "__" + globalFileList[forUploadFileListIndex].size
                // 구분자: __
                let canceledFileName;
                let canceledFileSize;
                if(localStorage.length > 0){
                    // console.log("localStorage.length : " + localStorage.length);
                    for(let l = 0; l < localStorage.length; l++){
                        // 로컬스토리지로부터 정보 가져와 구분자를 기준으로 문자열 자르기
                        // console.log("localStorage.getItem(localStorage.key(l)) : " + localStorage.getItem(localStorage.key(l)));
                        canceledFileName = localStorage.getItem(localStorage.key(l)).split("__")[2];
                        canceledFileSize = localStorage.getItem(localStorage.key(l)).split("__")[3];

                        // 파일명과 파일크기로 파일 정보 대조
                        if(EXAMUploader.forUploadFileList[forUploadFileListIndex].name == canceledFileName && EXAMUploader.forUploadFileList[forUploadFileListIndex].size == canceledFileSize){
                            // 이어올리기 선택
                            if(confirm("기존에 업로드된 데이터가 있습니다. 이어서 업로드하시겠습니까?")){
                                // 저장되있던 정보로 현재 파일의 정보 업데이트
                                guid = localStorage.getItem(localStorage.key(l)).split("__")[0];
                                slicedFileIndex = Number(localStorage.getItem(localStorage.key(l)).split("__")[1]);
                                // 해당 파일에 대한 로컬스토리지 정보 삭제
                                localStorage.removeItem(localStorage.key(l));
                            }else{
                                localStorage.removeItem(localStorage.key(l));
                            }
                        }
                    }
                }
                /* 로컬스토리지에 저장된 기존 업로드 중단된 파일 정보들 확인 끝 */

                // params 추가 정보 담기
                params += "&sliced=true";
                params += "&guid=" + guid;
                params += "&slicedFilesLength=" + slicedFiles.length;

                // ajax통신 시작
                EXAMUploader.startAjax(slicedFiles, slicedFileIndex, guid, params, EXAMUploader.forUploadFileList, forUploadFileListIndex);
            
            /* 분할 파일 전송 끝 */
            }
        }

        /* 파일 전송을 위한 ajax통신 */
        this.startAjax = function(slicedFiles, slicedFileIndex, guid, params, forUploadFileList, forUploadFileListIndex) {

            var xhttp = new XMLHttpRequest();

            var allFilesProgressBar = EXAMUploader.popupWindow.document.getElementById("allFilesProgressBar");
            var allProgressBar = EXAMUploader.popupWindow.document.getElementById("allProgressBar");
            var progressBar = EXAMUploader.popupWindow.document.getElementById("progressBar");
            var allFilesMessage = EXAMUploader.popupWindow.document.getElementById("allFilesMessage");
            var allMessage = EXAMUploader.popupWindow.document.getElementById("allMessage");
            var message = EXAMUploader.popupWindow.document.getElementById("message");
            // console.log(forUploadFileList[forUploadFileListIndex].name + " file" + "[" + Number(slicedFileIndex+1) + "]" + "업로드 시작");
            
            /* progressBar 시작 */
            xhttp.upload.onloadstart = function (e) {
                progressBar.value = 0;
                progressBar.max = e.total;
                allProgressBar.value = 0;
                allProgressBar.max = e.total;
                allMessage.textContent = "\"" + forUploadFileList[forUploadFileListIndex].name + "\"" + " file uploading...";
            };
            // 단일 전송인 경우
            if(slicedFiles.length == 0){
                xhttp.upload.onprogress = function (e) {
                    allFilesProgressBar.value = (forUploadFileListIndex+1)/(forUploadFileList.length)*100;
                    allFilesProgressBar.max = 100;
                    allProgressBar.value = e.loaded;
                    allProgressBar.max = e.total;
                    progressBar.value = e.loaded;
                    progressBar.max = e.total;
                };
                xhttp.upload.onloadend = function (e) {
                    allMessage.textContent = "\"" + forUploadFileList[forUploadFileListIndex].name + "\"" + " file upload complete!!";
                    message.textContent = "\"" + forUploadFileList[forUploadFileListIndex].name + "\"" + " file upload complete!!";
                    if(forUploadFileListIndex+1 == forUploadFileList.length){
                        allFilesMessage.textContent = "ALL Files Upload Complete!!!";
                        allMessage.textContent = "";
                        message.textContent = "";
                    }
                };
            // 분할 전송인 경우
            }else{
                xhttp.upload.onprogress = function (e) {
                    allFilesProgressBar.value = (forUploadFileListIndex+1)/(forUploadFileList.length)*100;
                    allFilesProgressBar.max = 100;
                    allProgressBar.value = (slicedFileIndex+1)/(slicedFiles.length)*100;
                    allProgressBar.max = 100;
                    progressBar.value = e.loaded;
                    progressBar.max = e.total;
                };
                xhttp.upload.onloadend = function (e) {
                    allMessage.textContent = "\"" + forUploadFileList[forUploadFileListIndex].name + "\"" + " file uploading...";
                    if(slicedFileIndex+1 == slicedFiles.length){
                        allMessage.textContent = "\"" + forUploadFileList[forUploadFileListIndex].name + "\"" + " file upload complete!!";
                    }
                    message.textContent = "\"" + forUploadFileList[forUploadFileListIndex].name + "[" + Number(slicedFileIndex+1) + "]" + "\"" + " file upload complete!!";
                    if(slicedFileIndex == slicedFiles.length-1 && forUploadFileListIndex+1 == forUploadFileList.length){
                        allFilesMessage.textContent = "ALL Files Upload complete!!";
                        allMessage.textContent = "";
                        message.textContent = "";
                    }
                }
            }
            /* progressBar 끝 */

            /* 파일 전송을 위한 ajax통신 시작 */
            // file 전송 정보를 담을 formData 객체 생성
            var newFormData = new FormData();
            // 각 file을 formData 객체에 담기
            if(slicedFiles.length == 0){ // 단일 전송인 경우
                newFormData.append("files", forUploadFileList[forUploadFileListIndex]);
            }else{  // 분할 전송인 경우
                newFormData.append("slicedFiles", slicedFiles[slicedFileIndex]);
            }

            // http 요청 타입 / 주소 / 동기식 여부 설정
            if(slicedFiles.length == 0){    // 단일 전송인 경우
                xhttp.open("POST", EXAMUploader.usrServerPath + "?index=" + 0 + encodeURI(params), true); // 메서드와 주소 설정    
            }else{      // 분할 전송인 경우
                xhttp.open("POST", EXAMUploader.usrServerPath + "?index=" + slicedFileIndex + encodeURI(params), true); // 메서드와 주소 설정
            }
            
            // http 요청
            xhttp.send(newFormData);   // 요청 전송(formData 전송)

            // XmlHttpRequest의 요청
            // 통신 상태 모니터링
            xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
                // XMLHttpRequest를 이벤트 파라미터에서 취득
                var req = e.target;

                // 통신 상태가 완료가 되면...
                if(req.readyState === 4) {    // 요청이 완료되면
                    // Http response 응답코드가 200(정상)
                    // states = 0 unintialized 요청이 초기화 안 된 상태, open() not called yet.
                    // 1=loaded 서버 연결 설정된(열린) 상태, open() has been called.
                    // 2=loading 요청 접수된 상태, send() has been called
                    // 3=interactive 요청 처리 중 상태
                    // 4=complete 요청 완료되고 응답 준비된 상태
                    if(req.status === 200 && EXAMUploader.indicator === "START") {
                        var uploadedFile = null;
                        
                        if(slicedFileIndex < slicedFiles.length-1){ // 만약, index가 slicedFiles.length 보다 작으면
                            slicedFileIndex++; // index 1 증가
                            // 재귀함수: 함수 내에서 자신을 다시 호출
                            EXAMUploader.startAjax(slicedFiles, slicedFileIndex, guid, params, forUploadFileList, forUploadFileListIndex);
                        }else if(forUploadFileListIndex < forUploadFileList.length-1){
                            // 업로드된 파일 경로 받아 저장하기
                            uploadedFile = {
                                name: forUploadFileList[forUploadFileListIndex].name,
                                size: forUploadFileList[forUploadFileListIndex].size,
                                type: forUploadFileList[forUploadFileListIndex].type,
                                path: decodeURI(xhttp.responseText).replace("%3A", ":")
                            }
                            EXAMUploader.uploadCompleteList.push(uploadedFile);

                            forUploadFileListIndex++;
                            console.log(forUploadFileList[forUploadFileListIndex].name + " file 업로드 시작");  
                            EXAMUploader.startUpload(forUploadFileListIndex);
                        }else{
                            // 업로드된 파일 경로 받아 저장하기
                            uploadedFile = {
                                name: forUploadFileList[forUploadFileListIndex].name,
                                size: forUploadFileList[forUploadFileListIndex].size,
                                type: forUploadFileList[forUploadFileListIndex].type,
                                path: decodeURI(xhttp.responseText).replace("%3A", ":")
                            }
                            EXAMUploader.uploadCompleteList.push(uploadedFile);

                            console.log(forUploadFileList[forUploadFileListIndex].name + " file" + "업로드 - 종료")
                            EXAMUploader.afterUploaded(); // 업로드 후 대기 파일리스트 리셋
                            EXAMUploader.popupWindow.close(); // 팝업창 닫기
                            EXAMUploader.indicator = "DONE"; // DEFUALT: 초기값, START: 시작, DONE: 종료, STOP: 중단, ERROR: 에러

                            // 업로드 완료 함수 호출
                            if( typeof(window.EXAMUploader_UploadComplete) == 'function' ) {
                                window.EXAMUploader_UploadComplete(EXAMUploader.uploadCompleteList);
                            }
                        }              
                    }else if(req.status === 200 && EXAMUploader.indicator === "STOP" && slicedFileIndex < slicedFiles.length-1){
                        console.log("---업로드 중단---");
                        console.log("----LocalStorage에 현재 파일 정보 저장 시작----");
                        // 업로드시 여러 파일이 중단될 수도 있으니 
                        // 여러 파일이 중단될 경우를 고려해서
                        // loacalStorage에 담을때 구분자, 배열 등을 활용해 잘 저장해 놓는 것이 중요
                        // 나중에 이어올리기시 localStorage에 있는 해당 키들을 for문으로 돌리면서 일치하는 값 찾을 수 있도록 하기 위함..
                        localStorage.setItem("resume_upload_" + guid, guid + "__" + slicedFileIndex + "__" + forUploadFileList[forUploadFileListIndex].name + "__" + forUploadFileList[forUploadFileListIndex].size);
                        console.log("resume_upload_" + guid + " : " + guid + "__" + slicedFileIndex + "__" + forUploadFileList[forUploadFileListIndex].name + "__" + forUploadFileList[forUploadFileListIndex].size);
                        console.log("----LocalStorage에 현재 파일 정보 저장 완료----");

                        // 업로드 중단 함수 호출
                        if( typeof(window.EXAMUploader_UploadInterruption) == 'function' ) {
                            window.EXAMUploader_UploadInterruption("업로드가 중단되었습니다.", forUploadFileList[forUploadFileListIndex]);
                        } 
                    }else if(req.status === 200 && EXAMUploader.indicator === "DONE" && slicedFileIndex == slicedFiles.length-1){
                        alert("이미 \"" + forUploadFileList[forUploadFileListIndex].name + "\" file의 업로드가 완료되었습니다.");  
                    }else{
                        console.error("------통신 실패------");
                        EXAMUploader.indicator = "ERROR";  // DEFUALT: 초기값, START: 시작, DONE: 종료, STOP: 중단, ERROR: 에러
                        console.error("req.status: " + req.status);
                        console.error(xhttp.responseText);

                        // console.log("---에러로 인한 업로드 중단---");
                        // console.log("----LocalStorage에 현재 파일 정보 저장 시작----");
                        // // 업로드시 여러 파일이 중단될 수도 있으니 
                        // // 여러 파일이 중단될 경우를 고려해서
                        // // loacalStorage에 담을때 구분자, 배열 등을 활용해 잘 저장해 놓는 것이 중요
                        // // 나중에 이어올리기시 localStorage에 있는 해당 키들을 for문으로 돌리면서 일치하는 값 찾을 수 있도록 하기 위함..
                        // if(){

                        // }
                        // localStorage.setItem("resume_upload_" + guid, guid + "__" + slicedFileIndex + "__" + forUploadFileList[forUploadFileListIndex].name + "__" + forUploadFileList[forUploadFileListIndex].size);
                        // console.log("resume_upload_" + guid + " : " + guid + "__" + slicedFileIndex + "__" + forUploadFileList[forUploadFileListIndex].name + "__" + forUploadFileList[forUploadFileListIndex].size);
                        // console.log("----LocalStorage에 현재 파일 정보 저장 완료----");

                        // 에러 함수 호출
                        if( typeof(window.EXAMUploader_OnError) == 'function' ) {
                            errorCode = "UEC_003"
                            message = "업로드 과정 중 에러 발생.\nhttp status=" + req.status + "\nserver response=\n" + xhttp.responseText;
                            window.EXAMUploader_OnError(errorCode, message, EXAMUploader.uploadCompleteList, EXAMUploader.forDeleteFileList);
                        }
                    }
                }
            }
            /* 파일 전송을 위한 ajax통신 끝 */
        }

        /* 업로드 후 대기 파일리스트 리셋 */
        this.afterUploaded = function() {
            var componentWindow = document.getElementById('uploader_holder').contentWindow;
            var uploadZone = componentWindow.document.getElementById("uploadZone");
            var infoZone = componentWindow.document.getElementById("current_file_info");

            let uploadZoneMessage = "";
                uploadZoneMessage += "<li style='height:100%; display: flex; justify-content: center; align-items: center;'>";
                uploadZoneMessage += "<span style='position: inherit; font-weight: normal; color: blue; font-size: 12px;'>이곳에 파일을 Drag & Drop 하세요.</span>";
                uploadZoneMessage += "</li>";
            
            uploadZone.innerHTML = uploadZoneMessage; 

            let resetFileListInfo = "";
                resetFileListInfo += "<span>0</span>개 , ";
                resetFileListInfo += "<span>0 byte </span>";
                resetFileListInfo += "<span>추가됨</span>";

            infoZone.innerHTML = resetFileListInfo;
        }

        // 업로드 중단 버튼
        this.cancelUpload = function() {
            // xhttp.abort(); // 통신 강제 중단
            // 만약, abort()를 통해 통신을 강제 중단시켜버리면 업로드 상태가 어떨지 알 수 없기 때문에 위험하다.
            // 따라서,
            // 통신 indicator를 false로 변경해서 다음 로직을 타지 않게끔해서 비교적 안전하게 업로드를 중단해준다.
            EXAMUploader.indicator = "STOP";  // DEFUALT: 초기값, START: 시작, DONE: 종료, STOP: 중단, ERROR: 에러
            console.log("-------------upload canceled-------------");
        }
    }

    /* Uploader를 새 Object 객체 생성 */
    var EXAMUploader = new Uploader();

    /* 최상위 windows에 이 객체 지정하기 */
    top.EXAMUploader = EXAMUploader;
    
})()