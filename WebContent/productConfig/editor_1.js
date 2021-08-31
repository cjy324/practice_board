/* EXAM에디터 config */
var G_EditorConfig = {
    url: '/EXAMEditor/editor.js',
    beforeCreate: function () {
        var editorAreaNode = document.getElementById('EDITOR_AREA');
        var editorFrame = document.createElement('iframe');
        editorFrame.id = 'editor_holder';
        editorFrame.className = 'editor_holder';
        editorFrame.width = '100%';
        editorFrame.height = '100%';
        
        editorAreaNode.appendChild(editorFrame);
    },
    create: function () {
        var editorPath = contextpath + "/EXAMEditor/editorHolder.html";
        var editorImgUploadServerPath = contextpath + "/usr/editor/server";
        var editorImgContextpath = contextpath;
        
        EXAMEditor.drawEditorHtml(editorPath, editorImgUploadServerPath, editorImgContextpath);
    }
};

/* 에러 정보 콜백함수 */
function EXAMEditor_OnError(errorCode, message, imageFileList){
    alert("에러 코드: " + errorCode + "\n에러 메세지: " + message);
    console.log("imageFileList: " + imageFileList);
};