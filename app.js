// 화면에 띄워준 list를 가져오기
const $contents = document.getElementById('contents');

// 더보기 버튼 showMoreBtn 가져오기
const $showMoreBtn = document.getElementById('showMoreBtn');

// tab id가져오기
const tabId = document.querySelectorAll('.nav>li');

//현재 보고있는 탭
let selecedTab = document.querySelector('.active');

//로딩 id 가져오기
const loading = document.getElementById('loading');

// 현재 선택한 tab의 API(JSON)정보를 가져오기
function getJSon(check) {
    let jsonName = selecedTab.id;
    fetch(`${jsonName}.json`)
        .then((response) => response.json())
        .then((data) => makeContents(data, check));
}

// 입력한 json정보를 화면(.list)안에 띄워주기 위한 DOM명령어 처리
function makeContents(data, check) {
    let count;
    if (check === false) {
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
        $contents.appendChild($li);
    }
}

// 더보기가 활성화된 경우 버튼 숨김
function btnDisplay(check) {
    if (check === true) {
        $showMoreBtn.style.display = 'inline-block';
    } else if (check === false) {
        $showMoreBtn.style.display = 'none';
    }
}

// 로딩 활성화/비활성화
function loadingDisplay(check) {
    if (check === true) {
        loading.style.display = 'block';
    } else if (check === false) {
        loading.style.display = 'none';
    }
}

// 탭 전환 함수
function changeTab(event) {
    let newSeletedTab = event.path[1];

    // 기존 탭 active 삭제
    selecedTab.classList.remove('active');

    // 선택한 탭 active 추가
    newSeletedTab.classList.add('active');

    // selectedTab 선택한탭으로 변경
    selecedTab = newSeletedTab;

    // 기존 컨텐츠 삭제
    let contents = document.querySelectorAll('#contents>li');
    for (let i = 0; i < contents.length; i++) {
        $contents.removeChild(contents[i]);
    }

    // // 해당 탭에 맞는 컨텐츠 추가
    btnDisplay(false);
    loadingDisplay(true);
    setTimeout(function () {
        getJSon(false);
        btnDisplay(true);
        loadingDisplay(false);
    }, 1000);
}
// 탭 이벤트 등록
for (let i = 0; i < tabId.length; i++) {
    tabId[i].addEventListener('click', changeTab);
}

// 더보기 버튼 이벤트 등록
$showMoreBtn.addEventListener('click', function () {
    btnDisplay(false);
    loadingDisplay(true);
    setTimeout(function () {
        loadingDisplay(false);
        getJSon(true);
    }, 1000);
});

//첫화면 로딩
btnDisplay(false);
loadingDisplay(true);
setTimeout(function () {
    getJSon(false);
    btnDisplay(true);
    loadingDisplay(false);
}, 1000);
