/* EXAM업로더 config */
var G_UploaderConfig = {
    url: '/EXAMUploader/uploader.js',
    beforeCreate: function () {
        var uploaderAreaNode = document.getElementById('UPLOADER_AREA');
        var uploaderFrame = document.createElement('iframe');
        uploaderFrame.id = 'uploader_holder';
        uploaderFrame.className = 'uploader_holder';
        uploaderFrame.width = '100%';
        uploaderFrame.height = '100%';
        
        uploaderAreaNode.appendChild(uploaderFrame);
    },
    create: function () {
        var uploaderPath = contextpath + "/EXAMUploader/uploaderHolder.html";
        var uploaderServerPath = contextpath + "/usr/upload/server";
        
        EXAMUploader.drawUploaderHtml(uploaderPath, uploaderServerPath);
        EXAMUploader.forDeleteFilePath = contextpath + "/usr/upload/deleteFile";
    }
}