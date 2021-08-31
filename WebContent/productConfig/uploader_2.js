/* K업로더 config */
var G_UploaderConfig = {
    url: '/raonkupload/js/raonkupload.js',
    beforeCreate: function () {},
    create: function () {
        var raonkParam = {
            Id: "K_Uploader",
            Width: '100%',
            UploadHolder: "UPLOADER_AREA"  // UploadHolder를 지정해 주면 해당 id 태그에 업로더를 그린다.
        }
        new RAONKUpload(raonkParam);
    }
}