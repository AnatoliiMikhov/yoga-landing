window.addEventListener("DOMContentLoaded", function () {
	"use strict";

	// код для табов
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
		info.addEventListener("click", function (event) {
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
	// funcName('parentTabSelector', 'tabSelector', 'contentBlockSelector');
	forTabsModule(".info-header", ".info-header-tab", ".info-tabcontent");
});
