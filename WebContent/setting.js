
/* 제품 미리보기 그리기 */
function drawProduct(){
    // 에디터 적용
    var editorPath = "http://localhost:8086/practiceBoard/EXAMEditor/editorHolder.html";
    var editorImgUploadServerPath = "http://localhost:8086/practiceBoard/usr/editor/server";
    var editorImgContextpath = "http://localhost:8086/practiceBoard";
    
    EXAMEditor.drawEditorHtml(editorPath, editorImgUploadServerPath, editorImgContextpath);
    
    // 업로더 적용
    var uploaderPath = "http://localhost:8086/practiceBoard/EXAMUploader/uploaderHolder.html";
    var uploaderServerPath = "http://localhost:8086/practiceBoard/usr/upload/server";
    
    EXAMUploader.drawUploaderHtml(uploaderPath, uploaderServerPath);
}

/* 라디오 값 가져오기 */
function getCheckedOptions(){
    var editors = document.getElementsByName("editors");
    var uploaders = document.getElementsByName("uploaders");
    var downloaders = document.getElementsByName("downloaders");

    let checkedOpteions = [0, 0, 0];

    for(let i = 0; i < editors.length; i++){
        if(editors[i].checked){ 
            // checkedOpteions[0] = Number(editors[i].id.split("_")[1]);
            checkedOpteions[0] = Number(editors[i].value);
        }
    }
    for(let i = 0; i < uploaders.length; i++){
        if(uploaders[i].checked){ 
            // checkedOpteions[1] = Number(uploaders[i].id.split("_")[1]);
            checkedOpteions[1] = Number(uploaders[i].value);
        }
    }
    for(let i = 0; i < downloaders.length; i++){
        if(downloaders[i].checked){ 
            // checkedOpteions[2] = Number(downloaders[i].id.split("_")[1]);
            checkedOpteions[2] = Number(downloaders[i].value);
        }
    }

    return checkedOpteions;
}

/* DB에 설정값 저장하기 */
function saveOptions(array){
    
    // ajax 통신을 하기 위한 XmlHttpRequest 객체 생성
    const xhttp = new XMLHttpRequest(); 
    // http 요청 타입 / 주소 / 동기식 여부 설정
    xhttp.open("POST", "http://localhost:8086/practiceBoard/usr/config/setOptions", true); // 메서드와 주소 설정    
    // Header를 JSON으로 셋팅
    xhttp.setRequestHeader("Content-type", "application/json");
    // http 요청
    xhttp.send(JSON.stringify(array));   // 요청 전송(JSON 전송)

    xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
        const req = e.target;

        if(req.readyState === 4) {
            if(req.status === 200) {
                console.log("------통신 성공------");
                if(xhttp.responseText == "DONE"){
                    location.replace("http://localhost:8086/practiceBoard/usr/article/list");
                }
            }else{
                console.error("------통신 실패------");
                console.error("req.status: " + req.status);
                console.error(xhttp.responseText);
                alert("저장 실패");
            }
        }
    }
    
}

/* 설정값 저장(버튼 클릭시) */
function setOptions(){
    if(confirm("저장하시겠습니까?")){
        // 체크된 옵션 가져오기
        let checkedOpteionArray = getCheckedOptions();
        // DB에 설정값 저장
        saveOptions(checkedOpteionArray);
    }
}


// /* 한개의 체크박스만 선택 시작 */
// function checkOnlyOneEditors(element) {
//     var checkboxes = document.getElementsByName("editors");
    
//     checkboxes.forEach((cb) => {
//         cb.checked = false;
//     })
    
//     element.checked = true;
// }
// function checkOnlyOneUploaders(element) {
//     var checkboxes = document.getElementsByName("uploaders");
    
//     checkboxes.forEach((cb) => {
//         cb.checked = false;
//     })
    
//     element.checked = true;
// }
// function checkOnlyOneDownloaders(element) {
//     var checkboxes = document.getElementsByName("downloaders");
    
//     checkboxes.forEach((cb) => {
//         cb.checked = false;
//     })
    
//     element.checked = true;
// }
// /* 한개의 체크박스만 선택 끝 */