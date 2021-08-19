function RAONKUPLOAD_Extend_Function(name, id, version) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = '<object ID="raonkPatent" CLASSID="CLSID:' + id + '" WIDTH="0" HEIGHT="0"></object>';
    document.body.appendChild(tempDiv.firstChild);
}

/* GKCMYK */
var CMYKControl = {};

/* GKDirCtl */
var DirControl = {
    openFile: '',
    nextLineNo: 0,
    BLACK_LIST: '',
    allowExeFile: '',
    allowViewerFile: ''
};

/* GKZipUtil */
var ZipPaper = {};

/* GKZipUtil */
var UnZipPaper = {
    SendDelFileList: '',
    ZipSourceDir: '',
    ZipSourceFile: '',
    UnZipTargetFile: ''
};

/* GKFileDialog */
var SelectFile = {
    initDir: '',
    DialogTitle: '',
    Filter: '',
    fileName: '',
    fileExt: '',
    fileLength: 0,
    dirPath: ''
};

/* GKIECtrl */
var kipoie = {};

/* 함수 맵핑 예제입니다. */
CMYKControl.GetCompressionType = RAONKUPLOAD.GetCompressionType;
DirControl.GetLocalDirList = RAONKUPLOAD.GetLocalDirList;
DirControl.MakeDir = RAONKUPLOAD.MakeDir;
DirControl.RemoveDir = RAONKUPLOAD.RemoveDir;
DirControl.RemoveFile = RAONKUPLOAD.RemoveFile;
DirControl.Rename = RAONKUPLOAD.Rename;
DirControl.FileExe = RAONKUPLOAD.ExcuteFile;
DirControl.ExecTheViewer = RAONKUPLOAD.ExcuteViewer;
DirControl.OpenLocalFile = RAONKUPLOAD.OpenLocalFile;
DirControl.CloseLocalFile = RAONKUPLOAD.CloseLocalFile;
DirControl.WriteString = RAONKUPLOAD.WriteString;
DirControl.WritelnString = RAONKUPLOAD.WritelnString;
DirControl.ReadString = RAONKUPLOAD.ReadString;
DirControl.SaveUTF8 = RAONKUPLOAD.SaveUTF8;
DirControl.OpenHtml = RAONKUPLOAD.OpenFileToBrowser;
DirControl.OpenHref = RAONKUPLOAD.OpenFileToBrowser2;
ZipPaper.ZipFile = RAONKUPLOAD.ZipFile;
ZipPaper.UnZipFile = RAONKUPLOAD.UnZipFile;
ZipPaper.UnZipPaperInfo = RAONKUPLOAD.UnZipPaperInfo;
UnZipPaper.ZipFile = RAONKUPLOAD.ZipFile;
UnZipPaper.UnZipFile = RAONKUPLOAD.UnZipFile;
UnZipPaper.UnZipPaperInfo = RAONKUPLOAD.UnZipPaperInfo;
SelectFile.MultiSave = RAONKUPLOAD.OpenDialogMultiSelect;
SelectFile.Show = RAONKUPLOAD.OpenFolderDialog;
SelectFile.ShowOpen = RAONKUPLOAD.OpenDialogSingleSelect;
SelectFile.ShowSave = RAONKUPLOAD.OpenSaveDialog;
SelectFile.getFileName = RAONKUPLOAD.GetDialogFilePath;
SelectFile.getDirPath = RAONKUPLOAD.GetDialogFolderPath;
SelectFile.getFileLength = RAONKUPLOAD.GetDialogFileSize;
SelectFile.getFileExt = RAONKUPLOAD.GetDialogFileExt;
kipoie.getregstring = RAONKUPLOAD.GetRegValue;
kipoie.setregstring = RAONKUPLOAD.SetRegValue;