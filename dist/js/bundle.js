/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.addEventListener('DOMContentLoaded', function () {

	const tabs = __webpack_require__(/*! ./parts/tabs */ "./src/js/parts/tabs.js"),
		timer = __webpack_require__(/*! ./parts/timer */ "./src/js/parts/timer.js"),
		modal = __webpack_require__(/*! ./parts/modal */ "./src/js/parts/modal.js"),
		form = __webpack_require__(/*! ./parts/form */ "./src/js/parts/form.js"),
		slider = __webpack_require__(/*! ./parts/slider */ "./src/js/parts/slider.js"),
		calculator = __webpack_require__(/*! ./parts/calculator */ "./src/js/parts/calculator.js");

	// Tabs
	const parentTabSelector = ".info-header",
		tabSelector = ".info-header-tab",
		contentBlockSelector = ".info-tabcontent";

	tabs(parentTabSelector, tabSelector, contentBlockSelector);

	// Timer
	timer();

	// Modal window
	modal();

	// Send form
	const modalForm = document.querySelector('.main-form'),
		contactForm = document.querySelector('#form');

	form(modalForm);
	form(contactForm);

	// Slider
	slider();

	// Calculator
	calculator();

});

/***/ }),

/***/ "./src/js/parts/calculator.js":
/*!************************************!*\
  !*** ./src/js/parts/calculator.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function calculator() {
	const persons = document.querySelectorAll('.counter-block-input')[0],
		restDays = document.querySelectorAll('.counter-block-input')[1],
		place = document.getElementById('select'),
		totalValue = document.getElementById('total');

	let personsSum = 0,
		daysSum = 0,
		total = 0;

	totalValue.innerHTML = 0;

	persons.addEventListener('input', function () {
		personsSum = +this.value;
		total = (daysSum * personsSum) * 1000;

		if (restDays.value == '' || persons.value == '') {
			totalValue.innerHTML = 0;
		} else {
			let t = total;
			totalValue.innerHTML = t * place.options[place.selectedIndex].value;
		}
	});

	restDays.addEventListener('input', function () {
		daysSum = +this.value;
		total = (daysSum * personsSum) * 1000;

		if (restDays.value == '' || persons.value == '') {
			totalValue.innerHTML = 0;
		} else {
			let t = total;
			totalValue.innerHTML = t * place.options[place.selectedIndex].value;
		}
	});

	place.addEventListener('change', function () {
		if (restDays.value == '' || persons.value == '') {
			totalValue.innerHTML = 0;
		} else {
			let t = total;
			totalValue.innerHTML = t * this.options[this.selectedIndex].value;
		}
	});
}

module.exports = calculator;

/***/ }),

/***/ "./src/js/parts/form.js":
/*!******************************!*\
  !*** ./src/js/parts/form.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function sendForm(form) {

	let message = {
		loading: 'Идёт загрузка...',
		success: 'Спасибо! Мы скоро свяжемся с вами...',
		failure: 'Произошла ошибка...'
	};

	const input = document.querySelectorAll('input');

	let statusMessage = document.createElement('div');
	statusMessage.classList.add('status');

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
			.finally(clearInput);
	});
}

module.exports = sendForm;


/***/ }),

/***/ "./src/js/parts/modal.js":
/*!*******************************!*\
  !*** ./src/js/parts/modal.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function modal(){
	const btnOpenModal = document.querySelectorAll('.description-btn'),
		moreBtn = document.querySelector(".more"),
		overlay = document.querySelector(".overlay"),
		closeBtn = document.querySelector(".popup-close");

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

	moreBtn.addEventListener("click", function () {
		openModal();
		this.classList.add("more-splash");
	});

	closeBtn.addEventListener("click", () => {
		closeModal();
		moreBtn.classList.remove("more-splash");
	});
}

module.exports = modal;

/***/ }),

/***/ "./src/js/parts/slider.js":
/*!********************************!*\
  !*** ./src/js/parts/slider.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function slider() {
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
}

module.exports = slider;

/***/ }),

/***/ "./src/js/parts/tabs.js":
/*!******************************!*\
  !*** ./src/js/parts/tabs.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function tabs(parent, tabs, content) {
	let info = document.querySelector(parent),
		tab = document.querySelectorAll(tabs),
		tabContent = document.querySelectorAll(content);

	function hideTabContent(a) {

		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove("show");
			tabContent[i].classList.add("hide");
		}
	}

	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains("hide")) {
			tabContent[b].classList.remove("hide");
			tabContent[b].classList.add("show");
		}
	}

	info.addEventListener("click", (event) => {
		let target = event.target;
		let classTab = tabs;

		if (tabs[0] == ".") {
			classTab = tabs.slice(1); // удаляем точку из tabs для возможности применения методов classList
		}

		if (target && target.classList.contains(classTab)) {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			}
		}
	});
}

module.exports = tabs;

/***/ }),

/***/ "./src/js/parts/timer.js":
/*!*******************************!*\
  !*** ./src/js/parts/timer.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function timer() {
	let diffTime = Math.abs(new Date().getTimezoneOffset() / 60);
	let deadline = `2020-05-15T00:00:00+0${diffTime}:00`;

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

		const timer = document.getElementById(id),
			days = timer.querySelector(".days"),
			hours = timer.querySelector(".hours"),
			minutes = timer.querySelector(".minutes"),
			seconds = timer.querySelector(".seconds");

		let timeInterval = setInterval(updateClock, 1000);

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
}

module.exports = timer;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map