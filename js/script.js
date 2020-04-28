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
	const btnOpenModal = document.querySelectorAll('.description-btn'),
		more = document.querySelector(".more"),
		overlay = document.querySelector(".overlay"),
		close = document.querySelector(".popup-close");

	function openModal() {
		overlay.style.display = "block";
		document.body.style.overflow = "hidden";
	}

	function closeModal() {
		overlay.style.display = "none";
		document.body.style.overflow = "";
	}

	btnOpenModal.forEach(btn => {
		btn.addEventListener('click', openModal);
	});

	more.addEventListener("click", function () {
		openModal();
		this.classList.add("more-splash");
	});

	close.addEventListener("click", () => {
		closeModal();
		more.classList.remove("more-splash");
	});
	// Modal END ==============================================================

	// Form JSON request Start ================================================
	// sending data from a forms.
	let message = {
		loading: 'Идёт загрузка...',
		success: 'Спасибо! Мы скоро свяжемся с вами...',
		failure: 'Произошла ошибка...'
	};

	let modalForm = document.querySelector('.main-form'),
		contactForm = document.querySelector('#form');

	let input = document.querySelectorAll('input');

	let statusMessage = document.createElement('div');
	statusMessage.classList.add('status');

	function sendForm(form) {

		form.addEventListener('submit', function (event) {
			event.preventDefault();
			this.appendChild(statusMessage);

			let formData = new FormData(this);

			function postData() {
				return new Promise(function (resolve, reject) {
					let request = new XMLHttpRequest();
					request.open('POST', 'server.php');
					request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

					request.onreadystatechange = function () {
						if (request.readyState < 4) {
							resolve();
						} else if (request.readyState === 4) {
							if (request.status == 200 && request.status < 300) {
								resolve();
							} else {
								reject();
							}
						}
					};

					let obj = {};
					formData.forEach(function (value, key) {
						obj[key] = value;
					});
					let json = JSON.stringify(obj);
					request.send(json);

				});
			}

			function clearInput() {
				for (let i = 0; i < input.length; i++) {
					input[i].value = "";
				}
			}

			postData(formData)
				.then(() => statusMessage.innerHTML = message.loading)
				.then(() => statusMessage.innerHTML = message.success)
				.catch(() => statusMessage.innerHTML = message.failure)
				.then(clearInput);
		});
	}

	sendForm(modalForm);
	sendForm(contactForm);

	// Form JSON request End ==================================================
	// ========================================================================

	// Slider Start ===========================================================
	// ========================================================================

	let slideIndex = 1;

	const slides = document.querySelectorAll('.slider-item'),
		prev = document.querySelector('.prev'),
		next = document.querySelector('.next'),
		dotsWrap = document.querySelector('.slider-dots'),
		dots = document.querySelectorAll('.dot');

	showSlides();

	function showSlides(n) {

		if (n > slides.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = slides.length;
		}

		slides.forEach((item) => item.style.display = 'none');

		dots.forEach((item) => item.classList.remove('dot-active'));

		slides[slideIndex - 1].style.display = 'block';
		dots[slideIndex - 1].classList.add('dot-active');
	}

	function plusSlides(n) {
		showSlides(slideIndex += n);
	}

	function currentSlide(n) {
		showSlides(slideIndex = n);
	}

	prev.addEventListener('click', function () {
		plusSlides(-1);
	});

	next.addEventListener('click', function () {
		plusSlides(1);
	});

	dotsWrap.addEventListener('click', function (event) {
		for (let i = 0; i < dots.length + 1; i++) {
			if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
				currentSlide(i);
			}
		}
	});

});
