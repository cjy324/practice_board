// 게시물 리스트페이지로 이동
function goToListPage(){
    // location.replace()와 location.href를 이용해서 페이지를 이동시킬 수 있다.
    // replace: 현재 페이지에 덮어씌우기 때문에 replace를 사용한 다음에는 이전 페이지로 돌아갈 수 없다.
    // href: 그대로 페이지 이동을 의미
    location.replace("http://localhost:8086/practiceBoard/usr/article/list");
}

function getCheckedOptions(){
    var editors = document.getElementsByName("editors");
    var uploaders = document.getElementsByName("uploaders");
    var downloaders = document.getElementsByName("downloaders");

    let checkedOpteions = [0, 0, 0];

    for(let i = 0; i < editors.length; i++){
        if(editors[i].checked){ 
            checkedOpteions[0] = Number(editors[i].id.split("_")[1]);
        }
    }
    for(let i = 0; i < uploaders.length; i++){
        if(uploaders[i].checked){ 
            checkedOpteions[1] = Number(uploaders[i].id.split("_")[1]);
        }
    }
    for(let i = 0; i < downloaders.length; i++){
        if(downloaders[i].checked){ 
            checkedOpteions[2] = Number(downloaders[i].id.split("_")[1]);
        }
    }

    return checkedOpteions;
}

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
                    alert("설정값 저장 완료")
                    goToListPage();
                }
            }else{
                console.error("------통신 실패------");
                console.error("req.status: " + req.status);
                console.error(xhttp.responseText);
            }
        }
    }
    
}

function setOptions(){
    // 체크된 옵션 가져오기
    let checkedOpteionArray = getCheckedOptions();
    // DB에 설정값 저장
    saveOptions(checkedOpteionArray);
}