/* 사용자 커스텀 */
/* Write */

let id = 0;

// 게시물 리스트페이지로 이동
function goToDetailPage(){
    // location.replace()와 location.href를 이용해서 페이지를 이동시킬 수 있다.
    // replace: 현재 페이지에 덮어씌우기 때문에 replace를 사용한 다음에는 이전 페이지로 돌아갈 수 없다.
    // href: 그대로 페이지 이동을 의미
    location.replace("http://localhost:8086/practiceBoard/usr/article/detail?id=" + id);
}

// textContent ajax 전송
function saveByAjax(textContent) {
    // ajax 통신을 하기 위한 XmlHttpRequest 객체 생성
    const xhttp = new XMLHttpRequest(); 
    // http 요청 타입 / 주소 / 동기식 여부 설정
    xhttp.open("POST", "http://localhost:8086/practiceBoard/usr/article/saveContent", true); // 메서드와 주소 설정    
    // Header를 JSON으로 셋팅
    xhttp.setRequestHeader("Content-type", "application/json");
    // http 요청
    xhttp.send(textContent);   // 요청 전송(JSON 전송)

    xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
        const req = e.target;

        if(req.readyState === 4) {
            if(req.status === 200) {
                console.log("------통신 성공------");
                // 생성된 신규 게시물 ID값 받기
                id = Number(xhttp.responseText);
                console.log("id : " + id);
                EXAMUploader.setUploadFileList(id);  // 파일 업로드 시작
            }else{
                console.error("------통신 실패------");
                console.error("req.status: " + req.status);
                console.error(xhttp.responseText);
            }
        }
    }

    // 업로드 상태 모니터링
    const startInterval = setInterval(function(){
        if(EXAMUploader.indicator === "STOP"){
            alert("업로드 중단");
            clearInterval(startInterval);
            return;
        }
        if(EXAMUploader.indicator === "DONE"){
            alert(id + "번 게시물 작성 완료!!!");
            clearInterval(startInterval);
            goToDetailPage();
        }
    }, 100);  // ex) 1초 = 1000
}

// 글 작성
function doWrite() {
    // 제목 값 가져오기
    const titleInput = document.getElementById("titleInput");
    // 제목 값 가져오기
    const title = titleInput.value;

    if(title.trim() === ""){
        alert("제목을 입력해주세요.");
        return;
    }

    // 내용 값 가져오기
    const body = EXAMEditor.getBodyContent();

    if(body.trim() === "<p><br></p>"){
        alert("내용을 입력해주세요.");
        return;
    }

    // JSON 형태로 담기
    let textContent = {
        title: title,
        body: body
    }
    textContent = JSON.stringify(textContent);

    // ajax통신 시작
    saveByAjax(textContent);
    
}