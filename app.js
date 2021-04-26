const $list = document.querySelector('#list');

function getPopular() {
    fetch('recent.json')
        .then((response) => response.json())
        .then((data) => listcopy(data));
}
function listcopy(data) {
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
}

getPopular();
