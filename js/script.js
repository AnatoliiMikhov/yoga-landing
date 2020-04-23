window.addEventListener("DOMContentLoaded", function () {
	"use strict";

	// Tabs code Start
	// function module for tabs
	function forTabsModule(parent, tabs, content) {
		let info = document.querySelector(parent), // получаем родителя
			tab = document.querySelectorAll(tabs), // получаем массив с табами
			tabContent = document.querySelectorAll(content); // получаем массив с блоками контента

		function hideTabContent(a) {
			// аргумент a - с какого элемента начинает работать код
			for (let i = a; i < tabContent.length; i++) {
				tabContent[i].classList.remove("show"); // удаляем у элемента с индексом i класс show
				tabContent[i].classList.add("hide"); // добавляем элем с инд i класс hide
			}
		}

		hideTabContent(1); // будут скрыты все элементы кроме элемента с индексом [0]

		function showTabContent(b) {
			if (tabContent[b].classList.contains("hide")) {
				// если есть класс hide
				tabContent[b].classList.remove("hide"); // remove class hide
				tabContent[b].classList.add("show"); // add class show
			}
		}

		info.addEventListener("click", (event) => {
			let target = event.target;
			let classTab = tabs;

			if (tabs[0] == ".") {
				classTab = tabs.slice(1); // удаляем точку из tabs для возможности применения методов classList
			}

			if (target && target.classList.contains(classTab)) {
				// если есть цель и у неё класс == classTab
				for (let i = 0; i < tab.length; i++) {
					// перебираем в цикле массив tab
					if (target == tab[i]) {
						// если цель target равна элементу tab с индексом i
						hideTabContent(0); // скрываем все элементы tabContent
						showTabContent(i); // показываем элемент tabContent с индексом i - tabContent[i]
						break; //выходим из цикла
					}
				}
			}
		});
	}

	let parentTabSelector = ".info-header",
		tabSelector = ".info-header-tab",
		contentBlockSelector = ".info-tabcontent";

	forTabsModule(parentTabSelector, tabSelector, contentBlockSelector);
	// Tabs Code END

	//	-	*	-	*	-	*	-	*	-	*	-	*	-	*	-	*	-	*	-	*	-	*	-	*	-	*	-	*
	//	-	*	-	*	-	*	-	*	-	*	-	*	-	*	-	*	-	*	-	*	-	*	-	*	-	*	-	*
	// Timer code Start
	let diffTime = Math.abs(new Date().getTimezoneOffset() / 60);
	let deadline = `2020-05-15T00:00:00+0${diffTime}:00`; // Deadline date

	function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / (1000 * 60)) % 60),
			hours = Math.floor((t / (1000 * 60 * 60)) % 24),
			days = Math.floor(t / (1000 * 60 * 60 * 24));

		return {
			total: t,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
			days: days,
		};
	}

	function setClock(id, endtime) {
		let timer = document.getElementById(id),
			days = timer.querySelector(".days"),
			hours = timer.querySelector(".hours"),
			minutes = timer.querySelector(".minutes"),
			seconds = timer.querySelector(".seconds"),
			timeInterval = setInterval(updateClock, 1000);

		function updateClock() {
			let t = getTimeRemaining(endtime);

			function addZero(num) {
				if (num <= 9) {
					return "0" + num;
				} else {
					return num;
				}
			}

			days.textContent = addZero(t.days);
			hours.textContent = addZero(t.hours);
			minutes.textContent = addZero(t.minutes);
			seconds.textContent = addZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
				days.textContent = "00";
				hours.textContent = "00";
				minutes.textContent = "00";
				seconds.textContent = "00";
			}
		}
	}

	setClock("timer", deadline);
	// Timer Code End =========================================================

	// Modal Start ============================================================
	const more = document.querySelector(".more"),
		overlay = document.querySelector(".overlay"),
		close = document.querySelector(".popup-close");

	more.addEventListener("click", function () {
		overlay.style.display = "block";
		this.classList.add("more-splash");
		document.body.style.overflow = "hidden";
	});

	close.addEventListener("click", () => {
		overlay.style.display = "none";
		more.classList.remove("more-splash");
		document.body.style.overflow = "";
	});
	// Modal END ==============================================================

	// Form JSON request Start ================================================
	let message = {
		loading: 'Идёт загрузка...',
		success: 'Спасибо! Мы скоро свяжемся с вами...',
		failure: 'Произошла ошибка...'
	};

	let form = document.querySelector('.main-form'),
		input = document.getElementsByTagName('input'),
		statusMessage = document.createElement('div');

	statusMessage.classList.add('status');

	form.addEventListener('submit', function (event) {
		event.preventDefault();
		form.appendChild(statusMessage);

		let request = new XMLHttpRequest();
		request.open('POST', 'server.php');
		request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

		let formData = new FormData(form);

		let obj = {};
		formData.forEach(function (value, key) {
			obj[key] = value;

		});
		let json = JSON.stringify(obj);

		request.send(json);

		request.addEventListener('readystatechange', function () {
			if (request.readyState < 4) {
				statusMessage.innerHTML = message.loading;
			} else if (request.readyState == 4 && request.status == 200) {
				statusMessage.innerHTML = message.success;
			} else {
				statusMessage.innerHTML = message.failure;
			}
		});

		for (let i = 0; i < input.length; i++) {
			input[i].value = "";
		}
	});
	// Form JSON request End ==================================================
});
