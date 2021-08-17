/* 사용자 커스텀 */
/* Detail */

// 게시물 id
let id = 0;

// URL로 부터 게시물 ID값 가져오기
function getIdByUrl(){
    const url = window.location.href;
    return Number(url.split("?id=")[1]);
}

// 게시물 body 받아오기
function getBody(id){
    const xhttp = new XMLHttpRequest(); 
    // http 요청 타입 / 주소 / 동기식 여부 설정
    xhttp.open("POST", "http://localhost:8086/practiceBoard/usr/article/getBody?id=" + id, true); // 메서드와 주소 설정    
    // http 요청
    xhttp.send();   // 요청 전송

    xhttp.onreadystatechange = function(e){   // 요청에 대한 콜백
        const req = e.target;

        if(req.readyState === 4) {
            if(req.status === 200) {
                console.log("------통신 성공------");
                // DB로 부터 게시물 body 가져오기
                const body = xhttp.responseText;
                setBody(body); // 게시물 body 그리기
            }else{
                console.error("------통신 실패------");
                console.error("req.status: " + req.status);
                console.error(xhttp.responseText);
            }
        }
    }
}

// 게시물 body 그리기
function setBody(body){
    document.getElementById("detail_body__content").innerHTML = body;
    EXAMDownloader.fileLoad(id);
}