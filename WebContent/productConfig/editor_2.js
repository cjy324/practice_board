/* K에디터 config */
var G_EditorConfig = {
    url: '/raonkeditor/js/raonkeditor.js',
    beforeCreate: function () {},
    create: function () {
        var raonkParam = {
            Id: "K_Editor",
            Width: '100%',
            EditorHolder: "EDITOR_AREA",  // EditorHolder를 지정해 주면 해당 id 태그에 에디터를 그린다.
            DefaultMessage: "<span>이곳에 내용을 입력하세요.</span>"
        }
        new RAONKEditor(raonkParam);
    }
};

/* 에러 정보 콜백함수 */
function RAONKEDITOR_OnError(editorId, codemessage) {
    // codemessage.type; // 에러가 발생한 기능
    // codemessage.message; // 에러 메세지
    alert("에러 발생 기능: " + codemessage.type + "\n에러 메세지: " + codemessage.message);
};