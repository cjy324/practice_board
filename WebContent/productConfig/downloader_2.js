/* K다운로더 config */
var G_DownloaderConfig = {
    url: '/raonkupload/js/raonkupload.js',
    beforeCreate: function () {},
    create: function () {
        var raonkParam = {
            Id: "K_Downloader",
            Width: '100%',
            Mode: 'view', // 다운로더 모드
            UploadHolder: "DOWNLOADER_AREA"  // UploadHolder를 지정해 주면 해당 id 태그에 업로더를 그린다.
        }
        new RAONKUpload(raonkParam);
    }
};