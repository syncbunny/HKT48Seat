const QUERY_SELECTOR = 'body > div > main > div > div > div.box > div:nth-child(4) > div.prices.mt-3 > div:nth-child(2) > div.w-100.my-1 > div > span';


function target_element() {
	// TODO: 劇場公演以外は除外
	const el = document.querySelector(QUERY_SELECTOR);
	return el;
}

function display_seat() {
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

function edit() {
	const el = target_element();
	if (!el) {
		return;
	}

	el.style.cursor = 'pointer';
	el.addEventListener('click', display_seat);
	el.style.textDecoration = 'underline';
}

edit();
