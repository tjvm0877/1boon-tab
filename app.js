// 화면에 띄워준 list를 가져오기
const $list = document.getElementById('list');

// 더보기 버튼 showMoreBtn 가져오기
const $showMoreBtn = document.getElementById('showMoreBtn');

let showmoreCheck = false;

// recent.json파일의 정보를 가져오기
function getPopular() {
    fetch('recent.json')
        .then((response) => response.json())
        .then((data) => makeList(data, showmoreCheck));
}

// 입력한 json정보를 화면(.list)안에 띄워주기 위한 DOM명령어 처리
function makeList(data, showmoreCheck) {
    if (showmoreCheck === false) {
        for (let i = 0; i < 10; i++) {
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
    } else {
        for (let i = 10; i < 20; i++) {
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
}

// 더보기 버튼 이벤트 등록, 보여주고 더보기 버튼은 숨김처리
$showMoreBtn.addEventListener('click', function () {
    showmoreCheck = true;
    getPopular();
    $showMoreBtn.style.display = 'none';
});

getPopular();
