// 화면에 띄워준 list를 가져오기
const $list = document.getElementById('list');

// 더보기 버튼 showMoreBtn 가져오기
const $showMoreBtn = document.getElementById('showMoreBtn');

// 더보기 활성화 여부
let checkShowMore = false;

// tab id가져오기
let tabId = document.querySelectorAll('.nav>li');

//현재 보고있는 탭
let selecedTab = document.querySelector('.active');

// 현재 선택한 tab의 API(JSON)정보를 가져오기
function getJSon() {
    let jsonName = selecedTab.id;
    fetch(`${jsonName}.json`)
        .then((response) => response.json())
        .then((data) => makeContents(data, checkShowMore));
}

// 입력한 json정보를 화면(.list)안에 띄워주기 위한 DOM명령어 처리
function makeContents(data, checkShowMore) {
    let count;
    if (checkShowMore === false) {
        count = 0;
    } else {
        count = 10;
    }
    for (let i = count; i < count + 10; i++) {
        let url = data[i].url;
        let img = data[i].img;
        let title = data[i].title;
        let cp = data[i].cp;
        const $li = document.createElement('li');

        const $a = document.createElement('a');
        $a.href = url;

        const $span = document.createElement('span');
        $span.classList.add('imageSpan');

        const $img = document.createElement('img');
        $img.src = img;

        const $titleSpan = document.createElement('span');
        const $strong = document.createElement('strong');
        $strong.textContent = title;
        const $p = document.createElement('p');
        $p.textContent = cp;

        $span.appendChild($img);
        $a.appendChild($span);

        $titleSpan.appendChild($strong);
        $titleSpan.appendChild($p);
        $a.appendChild($titleSpan);

        $li.appendChild($a);
        $list.appendChild($li);
    }
}

// 더보기가 활성화된 경우 버튼 숨김
function btnDisplay() {
    if (checkShowMore === true) {
        $showMoreBtn.style.display = 'none';
    } else if (checkShowMore === false) {
        $showMoreBtn.style.display = 'inline-block';
    }
}

// 더보기 버튼 이벤트 등록
$showMoreBtn.addEventListener('click', function () {
    getJSon();
    checkShowMore = true;
    btnDisplay();
});

function addtabEvent() {
    for (let i = 0; i < tabId.length; i++) {
        tabId[i].addEventListener('click', function () {
            // 기존 탭 active 제거
            selecedTab.classList.remove('active');

            // 선택한 탭 active 추가
            tabId[i].classList.add('active');

            // selectedTab 선택한탭으로 변경
            selecedTab = tabId[i];

            // 기존 컨텐츠 삭제
            while ($list.hasChildNodes()) {
                $list.removeChild($list.firstChild);
            }
            checkShowMore = false;
            // 해당 탭에 맞는 컨텐츠 추가
            getJSon();
            btnDisplay();
        });
    }
}

getJSon();
addtabEvent();
