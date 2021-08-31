/** 사용자 커스텀 **/
/** Common **/

/* contextpath */
var contextpath = "http://localhost:8086/practiceBoard";

/* xhttp */
var xhttp = new XMLHttpRequest(); 

/* DB로부터 설정된 제품 번호 가져오기 */
function getOptionsAndDrawProduct(){
    // 설정된 제품 번호
    let genSet = {
            editorNum: 0,
            uploaderNum: 0,
            downloaderNum: 0
        }

    // http 요청 타입 / 주소 / 동기식 여부 설정
    xhttp.open("POST", contextpath + "/usr/config/getOptions", true); // 메서드와 주소 설정    
    // http 요청
    xhttp.send();   // 요청 전송

    xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
        var req = e.target;

        if(req.readyState === 4) {
            if(req.status === 200) {
                // console.log("------통신 성공------");
                genSet = JSON.parse(xhttp.responseText);
                // window 전역변수로 저장
                window.GENSET = {
                    editorNum: genSet.editorNum, 
                    uploaderNum: genSet.uploaderNum, 
                    downloaderNum: genSet.downloaderNum
                };
                drawProduct(genSet);
            }else{
                console.error("------통신 실패------");
                console.error("req.status: " + req.status);
                console.error(xhttp.responseText);
            }
        }
    }
}

// /* 에디터 config */
// var G_EditorConfig = {
//     editor1: {
//         url: '/EXAMEditor/editor.js',
//         beforeCreate: function () {
//             var editorAreaNode = document.getElementById('EDITOR_AREA');
//             var editorFrame = document.createElement('iframe');
//             editorFrame.id = 'editor_holder';
//             editorFrame.className = 'editor_holder';
//             editorFrame.width = '100%';
//             editorFrame.height = '100%';
            
//             editorAreaNode.appendChild(editorFrame);
//         },
//         create: function () {
//             var editorPath = contextpath + "/EXAMEditor/editorHolder.html";
//             var editorImgUploadServerPath = contextpath + "/usr/editor/server";
//             var editorImgContextpath = contextpath;
            
//             EXAMEditor.drawEditorHtml(editorPath, editorImgUploadServerPath, editorImgContextpath);
//         }
//     },
//     editor2: {
//         url: '/raonkeditor/js/raonkeditor.js',
//         beforeCreate: function () {},
//         create: function () {
//             var raonkParam = {
//                 Id: "K_Editor",
//                 Width: '100%',
//                 EditorHolder: "EDITOR_AREA",  // EditorHolder를 지정해 주면 해당 id 태그에 에디터를 그린다.
//                 DefaultMessage: "<span>이곳에 내용을 입력하세요.</span>"
//             }
//             new RAONKEditor(raonkParam);
//         }
//     }
// };

// /* 업로더 config */
// var G_UploaderConfig = {
//     uploader1: {
//         url: '/EXAMUploader/uploader.js',
//         beforeCreate: function () {
//             var uploaderAreaNode = document.getElementById('UPLOADER_AREA');
//             var uploaderFrame = document.createElement('iframe');
//             uploaderFrame.id = 'uploader_holder';
//             uploaderFrame.className = 'uploader_holder';
//             uploaderFrame.width = '100%';
//             uploaderFrame.height = '100%';
            
//             uploaderAreaNode.appendChild(uploaderFrame);
//         },
//         create: function () {
//             var uploaderPath = contextpath + "/EXAMUploader/uploaderHolder.html";
//             var uploaderServerPath = contextpath + "/usr/upload/server";
            
//             EXAMUploader.drawUploaderHtml(uploaderPath, uploaderServerPath);
//             EXAMUploader.forDeleteFilePath = contextpath + "/usr/upload/deleteFile";
//         }
//     },
//     uploader2: {
//         url: '/raonkupload/js/raonkupload.js',
//         beforeCreate: function () {},
//         create: function () {
//             var raonkParam = {
//                 Id: "K_Uploader",
//                 Width: '100%',
//                 UploadHolder: "UPLOADER_AREA"  // UploadHolder를 지정해 주면 해당 id 태그에 업로더를 그린다.
//             }
//             new RAONKUpload(raonkParam);
//         }
//     }
// };

// /* 다운로더 config */
// var G_DownloaderConfig = {
//     downloader1: {
//         url: '/EXAMDownloader/downloader.js',
//         beforeCreate: function () {
//             var downloaderAreaNode = document.getElementById('DOWNLOADER_AREA');
//             var downloaderFrame = document.createElement('iframe');
//             downloaderFrame.id = 'downloader_holder';
//             downloaderFrame.className = 'downloader_holder';
//             downloaderFrame.width = '100%';
//             downloaderFrame.height = '100%';
            
//             downloaderAreaNode.appendChild(downloaderFrame);
//         },
//         create: function () {	
//             var downloaderPath = contextpath + "/EXAMDownloader/downloaderHolder.html";
//             var downloaderServerPath = contextpath + "/usr/download/server";
//             var downloadProgressPath = contextpath + "/usr/download/progress";
                
//             EXAMDownloader.drawDownloaderHtml(downloaderPath, downloaderServerPath, downloadProgressPath);
//         }
//     },
//     downloader2: {
//         url: '/raonkupload/js/raonkupload.js',
//         beforeCreate: function () {},
//         create: function () {
//             var raonkParam = {
//                 Id: "K_Downloader",
//                 Width: '100%',
//                 Mode: 'view', // 다운로더 모드
//                 UploadHolder: "DOWNLOADER_AREA"  // UploadHolder를 지정해 주면 해당 id 태그에 업로더를 그린다.
//             }
//             new RAONKUpload(raonkParam);
//         }
//     }
// };

/* script 태그 그리기 */
function drawScriptTag(url){
    var script = document.createElement('script');
    script.src = contextpath + url;
    script.defer = "defer";
    document.head.appendChild(script);

    return script;
}

/* 제품별 config.js script 그리기 */
function loadAndApplyProductConfig(product){
    // 제품config.js script 태그 생성
    var script = drawScriptTag("/productConfig/" + product + ".js");

    // script태그 생성 후 제품별 config값 적용
    script.onload = function () {
        if(product.indexOf("editor_") !== -1){
            applyProductConfig(G_EditorConfig);
        }else if(product.indexOf("uploader_") !== -1){
            applyProductConfig(G_UploaderConfig);
        }else if(product.indexOf("downloader_") !== -1){
            applyProductConfig(G_DownloaderConfig);
        }
    };
}

/* 제품별 config값 적용 */
function applyProductConfig(productConfig){
    // 제품별 전처리
    productConfig.beforeCreate();

    // 제품.js script 태그 생성
    var script = drawScriptTag(productConfig.url);

    // script태그 생성 후 제품 그리기
    script.onload = function () {
        productConfig.create();
    };
}

/* 게시물 id */
let id = 0;

/* URL로 부터 게시물 ID값 가져오기 */
function getIdByUrl(){
    var url = window.location.href;
    return Number(url.split("?id=")[1]);
}

/* 게시물 상세페이지로 이동 */
function goToDetailPage(id){
    // location.replace()와 location.href를 이용해서 페이지를 이동시킬 수 있다.
    // replace: 현재 페이지에 덮어씌우기 때문에 replace를 사용한 다음에는 이전 페이지로 돌아갈 수 없다.
    // href: 그대로 페이지 이동을 의미
    location.replace("http://localhost:8086/practiceBoard/usr/article/detail?id=" + id);
}


// /** 에러 정보 콜백함수 모음 **/
// /* EXAM에디터 */
// function EXAMEditor_OnError(errorCode, message, imageFileList){
//     alert("에러 코드: " + errorCode + "\n에러 메세지: " + message);
//     console.log("imageFileList: " + imageFileList);
// };

// /* K에디터 */
// function RAONKEDITOR_OnError(editorId, codemessage) {
//     // codemessage.type; // 에러가 발생한 기능
//     // codemessage.message; // 에러 메세지
//     alert("에러 발생 기능: " + codemessage.type + "\n에러 메세지: " + codemessage.message);
// };

// /* EXAM업로더 */
// function EXAMUploader_OnError(errorCode, message, uploadCompleteList, forDeleteFileList){
//     alert("에러 코드: " + errorCode + "\n에러 메세지: " + message);
//     console.log("uploadCompleteList: " + uploadCompleteList);
//     console.log("uploadCompleteList: " + forDeleteFileList);
// };

// /* K업로더&다운로더 */
// function RAONKUPLOAD_OnError(uploadID, paramObj){
//     //에러 발생 후 오류메시지 띄어주는 예제
//     alert("Error Code : " + paramObj.strCode + "\nError Message : " + paramObj.strMessage);
// };

// /* EXAM다운로더 */
// function EXAMDownloader_OnError(errorCode, message){
//     alert("에러 코드: " + errorCode + "\n에러 메세지: " + message);
// };


