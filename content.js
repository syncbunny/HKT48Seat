const QUERY_SELECTOR = 'body > div > main > div > div > div.box > div:nth-child(4) > div.prices.mt-3 > div:nth-child(2) > div.w-100.my-1 > div > span';
const THEATER_SELECTOR = 'body > div > main > div > div > div.box > div:nth-child(4) > div:nth-child(4)';

function target_element() {
	// 劇場公演以外は除外
	const place = document.querySelector(THEATER_SELECTOR);
	if (!place) {
		return null;
	}
	if (!place.innerText) {
		return null;
	}
	if (!place.innerText.match(/HKT48劇場/)) {
		return null;
	}

	const el = document.querySelector(QUERY_SELECTOR);
	return el;
}

function display_seat(n) {
	// オーバーレイ準備
	const overlay = document.createElement('div');
	overlay.style.zIndex = 1;
	overlay.style.position = 'fixed';
	overlay.style.left = 0;
	overlay.style.top = 0;
	overlay.style.width = '100%';
	overlay.style.height = '100%';
	overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
	overlay.style.display = 'flex';
	overlay.style.justifyContent = 'center';
	overlay.style.alignItems = 'center';
	overlay.addEventListener('click', (evt) => {
		//evt.target.remove();
		overlay.remove();
	});

	// 座席表準備
	const seat = document.createElement('img');
	seat.src = chrome.runtime.getURL('images/HKT48_Seat.png');
	seat.style.width = 'auto';
	seat.style.height = 'auto';
	overlay.appendChild(seat);
	
	// 表示
	document.querySelector('body').appendChild(overlay);	
}

function parse_seat_no(s) {
	let ret = 0;	
	for (i = 0; i < s.length; i++) {
		c = s[i];
		n = null;
		switch(c) {
		case '０':
			n = 0;
			break;
		case '１':
			n = 1;
			break;
		case '２':
			n = 2;
			break;
		case '３':
			n = 3;
			break;
		case '４':
			n = 4;
			break;
		case '５':
			n = 5;
			break;
		case '６':
			n = 6;
			break;
		case '７':
			n = 7;
			break;
		case '８':
			n = 8;
			break;
		case '９':
			n = 9;
			break;
		}
		if (n !== null) {
			ret *= 10;
			ret += n;
		}
	}
	return ret;
}

function edit() {
	const el = target_element();
	if (!el) {
		return;
	}

	let seat_no = null;
	//seat_no = parse_seat_no(el.innerText);

	el.style.textDecoration = 'underline';
	el.style.cursor = 'pointer';
	el.addEventListener('click', display_seat);
	//console.log(seat_no);
}

edit();
