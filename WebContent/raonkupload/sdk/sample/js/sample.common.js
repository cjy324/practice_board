//////////////////////////////////////////////////////////////////////////////////////////////////
// K Upload API
//////////////////////////////////////////////////////////////////////////////////////////////////

// 전송시작
function fn_transfer(currUploadID) {
    if (currUploadID) {
        RAONKUPLOAD.Transfer(currUploadID);
    } else {
        RAONKUPLOAD.Transfer(G_UploadID);
    }
}

// 파일추가 
function fn_openFileDialog(currUploadID) {
    if (currUploadID) {
        RAONKUPLOAD.OpenFileDialog(currUploadID);
    } else {
        RAONKUPLOAD.OpenFileDialog(G_UploadID);
    }
}

// 모든 파일삭제
function fn_deleteAllFile(currUploadID) {
    if (currUploadID) {
        RAONKUPLOAD.DeleteAllFile(currUploadID);
    } else {
        RAONKUPLOAD.DeleteAllFile(G_UploadID);
    }
}

// 선택한 파일삭제
function fn_deleteSelectedFile(currUploadID) {
    if (currUploadID) {
        RAONKUPLOAD.DeleteSelectedFile(currUploadID);
    } else {
        RAONKUPLOAD.DeleteSelectedFile(G_UploadID);
    }
}

// 선택한 파일 다운로드
function fn_downloadFile(currUploadID) {
    if (currUploadID) {
        RAONKUPLOAD.DownloadFile(currUploadID);
    } else {
        RAONKUPLOAD.DownloadFile(G_UploadID);
    }
}

// 모든파일 다운로드
function fn_downloadAllFile(currUploadID) {
    if (currUploadID) {
        RAONKUPLOAD.DownloadAllFile(currUploadID);
    } else {
        RAONKUPLOAD.DownloadAllFile(G_UploadID);
    }
}

// 전체 파일개수
function fn_getTotalFileCount(currUploadID) {
    if (currUploadID) {
        alert(RAONKUPLOAD.GetTotalFileCount(currUploadID));
    } else {
        alert(RAONKUPLOAD.GetTotalFileCount(G_UploadID));
    }
}

// 전체 파일크기(Bytes)
function fn_getTotalFileSize(currUploadID) {
    if (currUploadID) {
        alert(RAONKUPLOAD.GetTotalFileSize(currUploadID));
    } else {
        alert(RAONKUPLOAD.GetTotalFileSize(G_UploadID));
    }
}

// 업로드 모드 변경
function fn_setUploadMode(mode, currUploadID) {
    // mode : edit / view / open / download
    if (currUploadID) {
        RAONKUPLOAD.SetUploadMode(mode, currUploadID);
    } else {
        RAONKUPLOAD.SetUploadMode(mode, G_UploadID);
    }
}

// 업로드 보이기
function fn_uploadShow(currUploadID) {
    if (currUploadID) {
        RAONKUPLOAD.Show(currUploadID);
    } else {
        RAONKUPLOAD.Show(G_UploadID);
    }
}

// 업로드 숨기기
function fn_uploadHidden(currUploadID) {
    if (currUploadID) {
        RAONKUPLOAD.Hidden(currUploadID);
    } else {
        RAONKUPLOAD.Hidden(G_UploadID);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// UTIL
//////////////////////////////////////////////////////////////////////////////////////////////////
function fn_RPAD(s, c, n) {
    if (!s || !c || s.length >= n) {
        return s;
    }

    var max = (n - s.length) / c.length;
    for (var i = 0; i < max; i++) {
        s += c;
    }

    return s;
}

// array
function fn_newArrayToString(arrayNew) {
    var str = '-- 업로드 파일 정보 시작 --<br/>';
    str += fn_RPAD('RealFileName', ' ', 20) + ' : {0}<br/>';
    str += fn_RPAD('ServerFileName', ' ', 20) + ' : {1}<br/>';
    str += fn_RPAD('IsLargeFile', ' ', 20) + ' : {2}<br/>';
    str += fn_RPAD('Size', ' ', 20) + ' : {3}<br/>';
    str += fn_RPAD('UploadPath', ' ', 20) + ' : {4}<br/>';
    str += fn_RPAD('LogicalPath', ' ', 20) + ' : {5}<br/>';
    str += fn_RPAD('fileExtention', ' ', 20) + ' : {6}<br/>';
    str += fn_RPAD('LocalPath', ' ', 20) + ' : {7}<br/>';
    str += fn_RPAD('CustomValue', ' ', 20) + ' : {8}<br/>';
    str += fn_RPAD('ResponseCustomValue', ' ', 20) + ' : {9}<br/>';
    str += fn_RPAD('Order', ' ', 20) + ' : {10}<br/>';
    str += '-- 업로드 파일 정보 끝 --<br/>';

    var originalName = '';
    var uploadName = '';
    var size = '';
    var uploadPath = '';
    var logicalPath = '';
    var fileExtension = '';
    var localPath = '';
    var customValue = '';
    var responseCustomValue = '';
    var order = '';
    var isLargeFile = '';

    var fileLen = arrayNew.length;
    for (var i = 0; i < fileLen; i++){

        originalName += arrayNew[i].originalName;
        uploadName += arrayNew[i].uploadName;
        isLargeFile += arrayNew[i].isLargeFile;
        size += arrayNew[i].size;
        uploadPath += arrayNew[i].uploadPath;
        logicalPath += arrayNew[i].logicalPath;
        fileExtension += arrayNew[i].extension;
        localPath += arrayNew[i].localPath;
        customValue += arrayNew[i].customValue;
        responseCustomValue += arrayNew[i].responseCustomValue;
        order += arrayNew[i].order;

        if (i != fileLen - 1) {
            originalName += ',';
            uploadName += ',';
            size += ',';
            uploadPath += ',';
            logicalPath += ',';
            fileExtension += ',';
            localPath += ',';
            customValue += ',';
            responseCustomValue += ',';
            order += ',';
            isLargeFile += ',';
        }
    }

    str = str.replace('{0}', originalName);
    str = str.replace('{1}', uploadName);
    str = str.replace('{2}', isLargeFile);
    str = str.replace('{3}', size);
    str = str.replace('{4}', uploadPath);
    str = str.replace('{5}', logicalPath);
    str = str.replace('{6}', fileExtension);
    str = str.replace('{7}', localPath);
    str = str.replace('{8}', customValue);
    str = str.replace('{9}', responseCustomValue);
    str = str.replace('{10}', order);

    var logBox = document.getElementById("logBox");

    logBox.innerHTML += str;
}

function fn_delArrayToString(arrayDel) {
    var str = '-- 삭제된 파일 정보 --<br/>';
    str += fn_RPAD('Key', ' ', 8) + ' : {0}<br/>';
    str += fn_RPAD('FileName', ' ', 8) + ' : {1}<br/>';
    str += fn_RPAD('Size', ' ', 8) + ' : {2}<br/><br/>';
    str += '-- 삭제된 파일 정보 끝 --<br/>';

    var sUniqKey = '';
    var sOriginalName = '';
    var sSize = '';

    var filesArrLen = arrayDel.length;
    for (var i = 0; i < filesArrLen; i++) {
        sUniqKey += arrayDel[i].uniqKey;
        sOriginalName += arrayDel[i].originalName;
        sSize += arrayDel[i].size;

        if (i != filesArrLen - 1) {
            sUniqKey += ',';
            sOriginalName += ',';
            sSize += ',';
        }
    }

    str = str.replace('{0}', sUniqKey);
    str = str.replace('{1}', sOriginalName);
    str = str.replace('{2}', sSize);

    var logBox = document.getElementById("logBox");

    logBox.innerHTML += str;
}

// text
function fn_newTextToString(textNew, uploadID) {
    var str = '-- 업로드 파일 정보 시작 --<br/>';
    str += fn_RPAD('RealFileName', ' ', 20) + ' : {0}<br/>';
    str += fn_RPAD('ServerFileName', ' ', 20) + ' : {1}<br/>';
    str += fn_RPAD('IsLargeFile', ' ', 20) + ' : {2}<br/>';
    str += fn_RPAD('Size', ' ', 20) + ' : {3}<br/>';
    str += fn_RPAD('UploadPath', ' ', 20) + ' : {4}<br/>';
    str += fn_RPAD('LogicalPath', ' ', 20) + ' : {5}<br/>';
    str += fn_RPAD('fileExtention', ' ', 20) + ' : {6}<br/>';
    str += fn_RPAD('LocalPath', ' ', 20) + ' : {7}<br/>';
    str += fn_RPAD('CustomValue', ' ', 20) + ' : {8}<br/>';
    str += fn_RPAD('ResponseCustomValue', ' ', 20) + ' : {9}<br/>';
    str += fn_RPAD('Order', ' ', 20) + ' : {10}<br/>';
    str += '-- 업로드 파일 정보 끝 --<br/>';

    var originalName = '';
    var uploadName = '';
    var size = '';
    var uploadPath = '';
    var logicalPath = '';
    var fileExtension = '';
    var localPath = '';
    var customValue = '';
    var responseCustomValue = '';
    var order = '';
    var isLargeFile = '';

    var filesArr = textNew.split(RAONKUPLOAD.GetUploadByName(uploadID)._config.unitDelimiter);
    var filesArrLen = filesArr.length;
    for (var i = 0; i < filesArrLen; i++) {
        var oneFileAttr = filesArr[i].split(RAONKUPLOAD.GetUploadByName(uploadID)._config.unitAttributeDelimiter);

        originalName += oneFileAttr[0];
        uploadName += oneFileAttr[1];
        isLargeFile += oneFileAttr[10];
        size += oneFileAttr[2];
        uploadPath += oneFileAttr[3];
        logicalPath += oneFileAttr[5];
        fileExtension += oneFileAttr[6];
        localPath += oneFileAttr[7];
        customValue += oneFileAttr[8];
        responseCustomValue += oneFileAttr[9];
        order += oneFileAttr[11];

        if (i != filesArrLen - 1) {
            originalName += ',';
            uploadName += ',';
            size += ',';
            uploadPath += ',';
            logicalPath += ',';
            fileExtension += ',';
            localPath += ',';
            customValue += ',';
            responseCustomValue += ',';
            order += ',';
            isLargeFile += ',';
        }
    }

    str = str.replace('{0}', originalName);
    str = str.replace('{1}', uploadName);
    str = str.replace('{2}', isLargeFile);
    str = str.replace('{3}', size);
    str = str.replace('{4}', uploadPath);
    str = str.replace('{5}', logicalPath);
    str = str.replace('{6}', fileExtension);
    str = str.replace('{7}', localPath);
    str = str.replace('{8}', customValue);
    str = str.replace('{9}', responseCustomValue);
    str = str.replace('{10}', order);

    var logBox = document.getElementById("logBox");

    logBox.innerHTML += str;
}

function fn_delTextToString(textDel, uploadID) {
    var str = '-- 삭제된 파일 정보 --<br/>';
    str += fn_RPAD('Key', ' ', 8) + ' : {0}<br/>';
    str += fn_RPAD('FileName', ' ', 8) + ' : {1}<br/>';
    str += fn_RPAD('Size', ' ', 8) + ' : {2}<br/>';
    var str = '-- 삭제된 파일 정보 끝--<br/>';

    var sUniqKey = '';
    var sOriginalName = '';
    var sSize = '';

    var filesArr = textDel.split(RAONKUPLOAD.GetUploadByName(uploadID)._config.unitDelimiter);
    var filesArrLen = filesArr.length;
    for (var i = 0; i < filesArrLen; i++) {
        var oneFileAttr = filesArr[i].split(RAONKUPLOAD.GetUploadByName(uploadID)._config.unitAttributeDelimiter);

        sUniqKey += oneFileAttr[0];
        sOriginalName += oneFileAttr[1];
        sSize += oneFileAttr[2];

        if (i != filesArrLen - 1) {
            sUniqKey += ',';
            sOriginalName += ',';
            sSize += ',';
        }
    }

    str = str.replace('{0}', sUniqKey);
    str = str.replace('{1}', sOriginalName);
    str = str.replace('{2}', sSize);

    var logBox = document.getElementById("logBox");

    logBox.innerHTML += str;
}

// json
function fn_newJsonToString(jsonNew) {
    var str = '-- 업로드 파일 정보 시작 --<br/>';
    str += fn_RPAD('RealFileName', ' ', 20) + ' : {0}<br/>';
    str += fn_RPAD('ServerFileName', ' ', 20) + ' : {1}<br/>';
    str += fn_RPAD('IsLargeFile', ' ', 20) + ' : {2}<br/>';
    str += fn_RPAD('Size', ' ', 20) + ' : {3}<br/>';
    str += fn_RPAD('UploadPath', ' ', 20) + ' : {4}<br/>';
    str += fn_RPAD('LogicalPath', ' ', 20) + ' : {5}<br/>';
    str += fn_RPAD('fileExtention', ' ', 20) + ' : {6}<br/>';
    str += fn_RPAD('LocalPath', ' ', 20) + ' : {7}<br/>';
    str += fn_RPAD('CustomValue', ' ', 20) + ' : {8}<br/>';
    str += fn_RPAD('ResponseCustomValue', ' ', 20) + ' : {9}<br/>';
    str += fn_RPAD('Order', ' ', 20) + ' : {10}<br/>';
    str += '-- 업로드 파일 정보 끝 --<br/>';

    var originalName = jsonNew.originalName;
    var uploadName = jsonNew.uploadName;
    var isLargeFile = jsonNew.isLargeFile;
    var size = jsonNew.size;
    var uploadPath = jsonNew.uploadPath;
    var logicalPath = jsonNew.logicalPath;
    var fileExtension = jsonNew.extension;
    var localPath = jsonNew.localPath;
    var customValue = jsonNew.customValue;
    var responseCustomValue = jsonNew.responseCustomValue;
    var order = jsonNew.order;

    str = str.replace('{0}', originalName);
    str = str.replace('{1}', uploadName);
    str = str.replace('{2}', isLargeFile);
    str = str.replace('{3}', size);
    str = str.replace('{4}', uploadPath);
    str = str.replace('{5}', logicalPath);
    str = str.replace('{6}', fileExtension);
    str = str.replace('{7}', localPath);
    str = str.replace('{8}', customValue);
    str = str.replace('{9}', responseCustomValue);
    str = str.replace('{10}', order);

    var logBox = document.getElementById("logBox");

    logBox.innerHTML += str;
}

function fn_delJsonToString(jsonDel) {
    var str = '-- 삭제된 파일 정보 --<br/>';
    str += fn_RPAD('Key', ' ', 8) + ' : {0}<br/>';
    str += fn_RPAD('FileName', ' ', 8) + ' : {1}<br/>';
    str += fn_RPAD('Size', ' ', 8) + ' : {2}<br/>';
    str += '-- 삭제된 파일 정보 끝 --<br/>';

    var uniqKey = jsonDel.uniqKey;
    var originalName = jsonDel.originalName;
    var size = jsonDel.size;

    var sUniqKey = '';
    var sOriginalName = '';
    var sSize = '';

    for (var i = 0; i < originalName.length; i++) {
        if (i != 0) {
            sUniqKey += ',';
            sOriginalName += ',';
            sSize += ',';
        }

        sUniqKey += uniqKey[i];
        sOriginalName += originalName[i];
        sSize += size[i];
    }

    str = str.replace('{0}', sUniqKey);
    str = str.replace('{1}', sOriginalName);
    str = str.replace('{2}', sSize);

    var logBox = document.getElementById("logBox");

    logBox.innerHTML += str;
}

// xml
function fn_newXmlToString(xmlNew) {
    var str = '-- 업로드 파일 정보 시작 --<br/>';
    str += fn_RPAD('RealFileName', ' ', 20) + ' : {0}<br/>';
    str += fn_RPAD('ServerFileName', ' ', 20) + ' : {1}<br/>';
    str += fn_RPAD('IsLargeFile', ' ', 20) + ' : {2}<br/>';
    str += fn_RPAD('Size', ' ', 20) + ' : {3}<br/>';
    str += fn_RPAD('UploadPath', ' ', 20) + ' : {4}<br/>';
    str += fn_RPAD('LogicalPath', ' ', 20) + ' : {5}<br/>';
    str += fn_RPAD('fileExtention', ' ', 20) + ' : {6}<br/>';
    str += fn_RPAD('LocalPath', ' ', 20) + ' : {7}<br/>';
    str += fn_RPAD('CustomValue', ' ', 20) + ' : {8}<br/>';
    str += fn_RPAD('ResponseCustomValue', ' ', 20) + ' : {9}<br/>';
    str += fn_RPAD('Order', ' ', 20) + ' : {10}<br/>';
    str += '-- 업로드 파일 정보 끝 --<br/>';

    var originalName = '';
    var uploadName = '';
    var size = '';
    var uploadPath = '';
    var logicalPath = '';
    var fileExtension = '';
    var localPath = '';
    var customValue = '';
    var responseCustomValue = '';
    var order = '';
    var isLargeFile = '';

    var files = $(xmlNew).find('file');
    var filesLen = files.length;
    for (var i = 0; i < filesLen; i++) {

        originalName += $(files[i]).find('originalName').text();
        uploadName += $(files[i]).find('uploadName').text();
        isLargeFile += $(files[i]).find('isLargeFile').text();
        size += $(files[i]).find('size').text();
        uploadPath += $(files[i]).find('uploadPath').text();
        logicalPath += $(files[i]).find('logicalPath').text();
        fileExtension += $(files[i]).find('extension').text();
        localPath += $(files[i]).find('localPath').text();
        customValue += $(files[i]).find('customValue').text();
        responseCustomValue += $(files[i]).find('responseCustomValue').text();
        order += $(files[i]).find('order').text();

        if (i != filesLen - 1) {
            originalName += ',';
            uploadName += ',';
            size += ',';
            uploadPath += ',';
            logicalPath += ',';
            fileExtension += ',';
            localPath += ',';
            customValue += ',';
            responseCustomValue += ',';
            order += ',';
            isLargeFile += ',';
        }
    }

    str = str.replace('{0}', originalName);
    str = str.replace('{1}', uploadName);
    str = str.replace('{2}', isLargeFile);
    str = str.replace('{3}', size);
    str = str.replace('{4}', uploadPath);
    str = str.replace('{5}', logicalPath);
    str = str.replace('{6}', fileExtension);
    str = str.replace('{7}', localPath);
    str = str.replace('{8}', customValue);
    str = str.replace('{9}', responseCustomValue);
    str = str.replace('{10}', order);

    var logBox = document.getElementById("logBox");

    logBox.innerHTML += str;
}

function fn_delXmlToString(xmlDel) {
    var str = '-- 삭제된 파일 정보 --<br/>';
    str += fn_RPAD('Key', ' ', 8) + ' : {0}<br/>';
    str += fn_RPAD('FileName', ' ', 8) + ' : {1}<br/>';
    str += fn_RPAD('Size', ' ', 8) + ' : {2}<br/>';
    var str = '-- 삭제된 파일 정보 --<br/>';

    var sUniqKey = '';
    var sOriginalName = '';
    var sSize = '';

    var files = $(xmlDel).find('file');
    var filesLen = files.length;
    for (var i = 0; i < filesLen; i++) {
        sUniqKey += $(files[i]).find('uniqKey').text();
        sOriginalName += $(files[i]).find('originalName').text();
        sSize += $(files[i]).find('size').text();

        if (i != filesLen - 1) {
            sUniqKey += ',';
            sOriginalName += ',';
            sSize += ',';
        }
    }

    str = str.replace('{0}', sUniqKey);
    str = str.replace('{1}', sOriginalName);
    str = str.replace('{2}', sSize);

    var logBox = document.getElementById("logBox");

    logBox.innerHTML += str;
}