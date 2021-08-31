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