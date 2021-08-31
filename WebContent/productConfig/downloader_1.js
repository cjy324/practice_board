/* EXAM다운로더 config */
var G_DownloaderConfig = {
    url: '/EXAMDownloader/downloader.js',
    beforeCreate: function () {
        var downloaderAreaNode = document.getElementById('DOWNLOADER_AREA');
        var downloaderFrame = document.createElement('iframe');
        downloaderFrame.id = 'downloader_holder';
        downloaderFrame.className = 'downloader_holder';
        downloaderFrame.width = '100%';
        downloaderFrame.height = '100%';
        
        downloaderAreaNode.appendChild(downloaderFrame);
    },
    create: function () {	
        var downloaderPath = contextpath + "/EXAMDownloader/downloaderHolder.html";
        var downloaderServerPath = contextpath + "/usr/download/server";
        var downloadProgressPath = contextpath + "/usr/download/progress";
            
        EXAMDownloader.drawDownloaderHtml(downloaderPath, downloaderServerPath, downloadProgressPath);
    }
};

/* 에러 정보 콜백함수 */
function EXAMDownloader_OnError(errorCode, message){
    alert("에러 코드: " + errorCode + "\n에러 메세지: " + message);
};